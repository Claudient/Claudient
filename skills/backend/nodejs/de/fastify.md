---
name: fastify
description: "Fastify REST API: Schema-First Validation, Plugin-Architektur, Hooks-Lifecycle, TypeScript, Pino Logging, JWT Auth, Swagger und Production-Patterns für High-Throughput Node.js Services"
---

# Fastify-Skill

## Wann zu Aktivieren
- Bau einer REST API mit Fastify
- Migrieren eines Express Service zu Fastify für Performance-Gewinne
- Hinzufügen von Schema Validation, JWT Auth oder Swagger Docs zu einer Fastify App
- Setup das Plugin/Encapsulation-Modell für einen Modular Fastify Service
- Schreiben von Tests mit `fastify.inject()` (keine Live HTTP Server)
- Jegliche Aufgabe, wo der Nutzer `fastify`, `@fastify/*` oder `fastify-plugin` referenziert

## Wann NICHT zu Nutzen
- Edge Deployments — nutze das hono Skill (Cloudflare Workers, Deno Deploy)
- Full-Stack Framework mit SSR — nutze nextjs oder remix Skill
- Der Nutzer möchte explizit Express Middleware-Ökosystem-Kompatibilität

## Instruktionen

### Projekt-Setup und Struktur

```
Setup ein Production-Ready Fastify Projekt mit TypeScript.

Sprache: TypeScript
Datenbank: [PostgreSQL / MongoDB / Keine]
Auth: [JWT / Keine]
Swagger: [Ja / Nein]

Verzeichnis-Struktur:
src/
  app.ts            ← Fastify Instanz + Plugin Registration (kein Listen hier)
  server.ts         ← Einstiegspunkt (Listen + Graceful Shutdown)
  plugins/
    sensible.ts     ← @fastify/sensible für Standard HTTP Errors
    jwt.ts          ← fastify-jwt Plugin (scoped Auth Decorator)
    swagger.ts      ← @fastify/swagger + @fastify/swagger-ui
  routes/
    index.ts        ← Route Aggregator
    users/
      index.ts      ← Users Route Definitionen mit JSON Schema
      schema.ts     ← TypeBox Schemas für Request/Response
  hooks/
    auth.ts         ← onRequest Hook für JWT Verifikation
  types/
    index.ts        ← Module Augmentation für Fastify Decorators

// src/app.ts
import Fastify from 'fastify'
import sensible from '@fastify/sensible'
import cors from '@fastify/cors'
import { jwtPlugin } from './plugins/jwt'
import { swaggerPlugin } from './plugins/swagger'
import { usersRoutes } from './routes/users'

export function buildApp(opts = {}) {
  const app = Fastify({
    logger: {
      level: process.env.LOG_LEVEL ?? 'info',
      // Pino redact — nichts Secrets loggen
      redact: ['req.headers.authorization', 'body.password'],
    },
    ajv: {
      customOptions: { removeAdditional: 'all', coerceTypes: true },
    },
    ...opts,
  })

  // Core Plugins
  app.register(sensible)
  app.register(cors, { origin: process.env.ALLOWED_ORIGINS?.split(',') ?? [] })

  // Auth + Docs
  app.register(jwtPlugin)
  app.register(swaggerPlugin)

  // Health Check — außerhalb Auth Scope
  app.get('/health', { schema: { hide: true } }, async () => ({ status: 'ok' }))

  // Versioned Routes
  app.register(usersRoutes, { prefix: '/api/v1/users' })

  return app
}

// src/server.ts
import { buildApp } from './app'

const app = buildApp()
const PORT = Number(process.env.PORT ?? 3000)

const start = async () => {
  try {
    await app.listen({ port: PORT, host: '0.0.0.0' })
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

// Graceful Shutdown
const stop = async () => {
  await app.close()
  process.exit(0)
}

process.on('SIGTERM', stop)
process.on('SIGINT', stop)

start()
```

### Schema-First Validation mit TypeBox

```
Füge TypeBox Schemas zu [Resource] Routes hinzu. TypeBox generiert sowohl den TypeScript Type als auch das JSON Schema für Fastify AJV in einer Deklaration.

// src/routes/users/schema.ts
import { Type, Static } from '@sinclair/typebox'

export const UserSchema = Type.Object({
  id: Type.String({ format: 'uuid' }),
  name: Type.String({ minLength: 1, maxLength: 100 }),
  email: Type.String({ format: 'email' }),
  role: Type.Union([Type.Literal('admin'), Type.Literal('user')]),
  createdAt: Type.String({ format: 'date-time' }),
})

export const CreateUserBody = Type.Object({
  name: Type.String({ minLength: 1, maxLength: 100 }),
  email: Type.String({ format: 'email' }),
  password: Type.String({ minLength: 8 }),
})

// Inferred TypeScript Types — keine Duplizierung
export type User = Static<typeof UserSchema>
export type CreateUserBody = Static<typeof CreateUserBody>

// src/routes/users/index.ts
import { FastifyPluginAsync } from 'fastify'
import { UserSchema, CreateUserBody } from './schema'

export const usersRoutes: FastifyPluginAsync = async (app) => {
  app.post<{ Body: CreateUserBody }>('/', {
    schema: { body: CreateUserBody, response: { 201: UserSchema } },
  }, async (req, reply) => {
    const user = { id: crypto.randomUUID(), ...req.body, role: 'user', createdAt: new Date().toISOString() }
    return reply.code(201).send(user)
  })
}
```

### Plugin-Architektur und Encapsulation

```
Erkläre und implementiere das Fastify Plugin-Encapsulation-Modell.

Schlüssel-Regel: Plugins, die mit fastify-plugin() registriert werden, TEILEN ihre Decorators und Hooks mit dem Parent Scope. Plugins, die ohne registriert werden, sind ENCAPSULATED (isoliert — Decorators nicht sichtbar außen).

Nutze fastify-plugin, wenn: Du Decorators hinzufügst, Hooks setzt oder Shared Infrastructure (DB, JWT, Redis) registrierst, die Sibling Routes brauchen.
Weglassen, wenn: Du Route Sub-Groups registrierst, die isoliert sein sollten.

// src/plugins/jwt.ts — Shared Auth Plugin (nutzt fastify-plugin)
import fp from 'fastify-plugin'
import fjwt from '@fastify/jwt'

const jwtPlugin = async (app) => {
  app.register(fjwt, { secret: process.env.JWT_SECRET! })
  app.decorate('authenticate', async (req) => {
    await req.jwtVerify()
  })
}

export default fp(jwtPlugin, { name: 'jwt' })

// Nutze die Plugin mit Encapsulation:
app.register(async (protectedScope) => {
  protectedScope.addHook('onRequest', app.authenticate)
  protectedScope.get('/me', async (req) => {
    return req.user
  })
})
```

### Hooks Lifecycle

```
Fastify Hook Order:
onRequest → preParsing → preValidation → preHandler → handler → preSerialization → onSend → onResponse
onError fires auf jeden Uncaught Error.

// onRequest — vor Body Parsing. Ideal für Auth.
app.addHook('onRequest', async (req, reply) => {
  const token = req.headers.authorization?.slice(7)
  if (!token) throw reply.unauthorized('Bearer Token erforderlich')
  req.user = app.jwt.verify(token)
})

// preHandler — Body geparst und validiert. Ideal für Business-Logic Guards.
app.addHook('preHandler', async (req, reply) => {
  if (req.user.role !== 'admin') {
    throw reply.forbidden('Admin-Rolle erforderlich')
  }
})
```

### Testen mit fastify.inject()

```
Schreibe Tests mit fastify.inject() — keine HTTP Server erforderlich.

// test/users.test.ts
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildApp } from '../src/app'

test('GET /api/v1/users — returns 200 with pagination', async () => {
  const app = buildApp({ logger: false })
  await app.ready()
  
  const res = await app.inject({
    method: 'GET',
    url: '/api/v1/users?page=1&limit=5',
    headers: { authorization: `Bearer ${validToken}` },
  })

  assert.equal(res.statusCode, 200)
  const body = res.json()
  assert.ok(Array.isArray(body.users))
})

await app.close()
```

## Beispiel

User migriert von Express zu Fastify mit gleichem Route-Struktur und Zod Validation.

Migration:
1. Ersetze Express App-Shell mit Fastify
2. Ersetze Zod mit TypeBox (Fastify's Native AJV Integration ist schneller)
3. Konvertiere Routes — Fastify Route Schema ersetzt Validation Middleware
4. Ersetze Middleware-Chains mit Scoped Hooks

Ergebnis: 16-20k req/s auf der gleichen Hardware, strukturiert JSON Logs via Pino, volle Swagger Docs bei `/docs`.
