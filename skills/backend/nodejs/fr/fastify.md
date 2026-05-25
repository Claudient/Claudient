---
name: fastify
description: "Fastify REST API : validation schema-first, architecture de plugin, cycle de vie des hooks, TypeScript, Pino logging, JWT auth, Swagger, et motifs de production pour les services Node.js haute-débit"
---

# Skill Fastify

## Quand l'activer
- Construire une API REST avec Fastify
- Migrer un service Express vers Fastify pour les gains de performance
- Ajouter la validation de schema, JWT auth, ou les docs Swagger à une app Fastify
- Mettre en place le modèle plugin/encapsulation pour un service Fastify modulaire
- Écrire les tests avec `fastify.inject()` (pas de serveur HTTP live)
- N'importe quelle tâche où l'utilisateur référence `fastify`, `@fastify/*`, ou `fastify-plugin`

## Quand NE PAS l'utiliser
- Déploiements edge — utilisez la skill hono (Cloudflare Workers, Deno Deploy)
- Framework full-stack avec SSR — utilisez la skill nextjs ou remix
- L'utilisateur veut explicitement la compatibilité du middleware ecosystem Express

## Instructions

### Setup du projet et structure

```
Mettez en place un projet Fastify production-ready avec TypeScript.

Langue : TypeScript
Base de données : [PostgreSQL / MongoDB / none]
Auth : [JWT / none]
Swagger : [yes / no]

Structure de directory :
src/
  app.ts            ← instance Fastify + enregistrement de plugin (pas d'écoute ici)
  server.ts         ← point d'entrée (écoute + graceful shutdown)
  plugins/
    sensible.ts     ← @fastify/sensible pour les erreurs HTTP standard
    jwt.ts          ← fastify-jwt plugin (auth scoped decorator)
    swagger.ts      ← @fastify/swagger + @fastify/swagger-ui
  routes/
    index.ts        ← route aggregator
    users/
      index.ts      ← user route definitions avec JSON Schema
      schema.ts     ← TypeBox schemas pour request/response
  hooks/
    auth.ts         ← onRequest hook pour JWT verification
  types/
    index.ts        ← module augmentation pour fastify decorators

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
      // Pino redact — jamais log secrets
      redact: ['req.headers.authorization', 'body.password'],
    },
    ajv: {
      customOptions: { removeAdditional: 'all', coerceTypes: true },
    },
    ...opts,
  })

  // Core plugins
  app.register(sensible)
  app.register(cors, { origin: process.env.ALLOWED_ORIGINS?.split(',') ?? [] })

  // Auth + docs
  app.register(jwtPlugin)
  app.register(swaggerPlugin)

  // Health check — en dehors du scope auth
  app.get('/health', { schema: { hide: true } }, async () => ({ status: 'ok' }))

  // Routes versionnées
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

// Graceful shutdown
const stop = async () => {
  await app.close()
  process.exit(0)
}

process.on('SIGTERM', stop)
process.on('SIGINT', stop)

start()
```

### Validation schema-first avec TypeBox

```
Ajoutez les schemas TypeBox pour les routes [resource]. TypeBox génère à la fois
le TypeScript type et le JSON Schema pour Fastify AJV dans une déclaration.

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

export const UpdateUserBody = Type.Partial(
  Type.Pick(CreateUserBody, ['name', 'email'])
)

export const UserParams = Type.Object({
  id: Type.String({ format: 'uuid' }),
})

export const UserListQuery = Type.Object({
  page: Type.Optional(Type.Integer({ minimum: 1, default: 1 })),
  limit: Type.Optional(Type.Integer({ minimum: 1, maximum: 100, default: 20 })),
})

// Types TypeScript déduits — pas de duplication
export type User = Static<typeof UserSchema>
export type CreateUserBody = Static<typeof CreateUserBody>
export type UpdateUserBody = Static<typeof UpdateUserBody>
export type UserParams = Static<typeof UserParams>
export type UserListQuery = Static<typeof UserListQuery>

// src/routes/users/index.ts
import { FastifyPluginAsync } from 'fastify'
import {
  UserSchema, CreateUserBody, UpdateUserBody, UserParams, UserListQuery,
} from './schema'
import { Type } from '@sinclair/typebox'

export const usersRoutes: FastifyPluginAsync = async (app) => {
  // GET /users — public ou protégé selon onRequest hook ci-dessous
  app.get<{ Querystring: UserListQuery }>('/', {
    schema: {
      querystring: UserListQuery,
      response: {
        200: Type.Object({
          users: Type.Array(UserSchema),
          total: Type.Integer(),
          page: Type.Integer(),
        }),
      },
      tags: ['Users'],
    },
  }, async (req) => {
    const { page = 1, limit = 20 } = req.query
    // fetch from DB
    return { users: [], total: 0, page }
  })

  app.post<{ Body: CreateUserBody }>('/', {
    schema: {
      body: CreateUserBody,
      response: { 201: UserSchema },
      tags: ['Users'],
    },
  }, async (req, reply) => {
    // create user
    const user = { id: crypto.randomUUID(), ...req.body, role: 'user', createdAt: new Date().toISOString() }
    return reply.code(201).send(user)
  })

  app.get<{ Params: UserParams }>('/:id', {
    schema: { params: UserParams, response: { 200: UserSchema }, tags: ['Users'] },
  }, async (req, reply) => {
    const user = null // await db.findById(req.params.id)
    if (!user) throw reply.notFound(`User ${req.params.id} not found`)
    return user
  })

  app.patch<{ Params: UserParams; Body: UpdateUserBody }>('/:id', {
    schema: { params: UserParams, body: UpdateUserBody, response: { 200: UserSchema }, tags: ['Users'] },
  }, async (req, reply) => {
    const user = null // await db.updateById(req.params.id, req.body)
    if (!user) throw reply.notFound(`User ${req.params.id} not found`)
    return user
  })

  app.delete<{ Params: UserParams }>('/:id', {
    schema: { params: UserParams, response: { 204: Type.Null() }, tags: ['Users'] },
  }, async (req, reply) => {
    // await db.deleteById(req.params.id)
    return reply.code(204).send()
  })
}
```

### Architecture de plugin et encapsulation

```
Expliquez et implémentez le modèle d'encapsulation de plugin Fastify.

Règle clé : les plugins enregistrés avec fastify-plugin() PARTAGENT leurs decorators et
hooks avec la portée parent. Les plugins enregistrés sans le sont ENCAPSULÉS
(isolés — decorators non visibles en dehors).

Utilisez fastify-plugin quand : vous ajoutez des decorators, définissez des hooks, ou enregistrez
l'infrastructure partagée (db, jwt, redis) que les routes siblings ont besoin.
Omettez-le quand : vous enregistrez les sous-groupes de route qui devraient être isolés.

// src/plugins/jwt.ts — plugin auth partagé (utilise fastify-plugin)
import fp from 'fastify-plugin'
import fjwt from '@fastify/jwt'
import { FastifyPluginAsync, FastifyRequest } from 'fastify'

const jwtPlugin: FastifyPluginAsync = async (app) => {
  app.register(fjwt, { secret: process.env.JWT_SECRET! })

  // Décorez la requête avec une méthode auth que les routes peuvent appeler
  app.decorate('authenticate', async (req: FastifyRequest) => {
    await req.jwtVerify()
  })
}

export default fp(jwtPlugin, { name: 'jwt' })

// src/types/index.ts — augmentez les types Fastify pour que TypeScript sache sur les decorators
import { FastifyRequest } from 'fastify'
declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (req: FastifyRequest) => Promise<void>
  }
}
declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: { sub: string; role: string; email: string }
    user: { sub: string; role: string; email: string }
  }
}

// Usage dans une portée de route protégée (encapsulée — onRequest tire seulement ici)
app.register(async (protectedScope) => {
  protectedScope.addHook('onRequest', app.authenticate)

  protectedScope.get('/me', async (req) => {
    return req.user  // typé: { sub, role, email }
  })
})
```

### Cycle de vie des hooks

```
Ajoutez les hooks Fastify pour [concern transversal : logging / auth / rate limiting / transform].

Ordre des hooks :
  onRequest → preParsing → preValidation → preHandler → handler → preSerialization → onSend → onResponse
  onError se déclenche sur n'importe quelle erreur non-catchée dans la chaîne ci-dessus.

// onRequest — s'exécute avant le parsing du body. Idéal pour l'auth.
app.addHook('onRequest', async (req, reply) => {
  const token = req.headers.authorization?.slice(7)
  if (!token) throw reply.unauthorized('Bearer token required')
  req.user = app.jwt.verify(token)
})

// preHandler — body est parsé et validé. Idéal pour les gardes de logique métier.
app.addHook('preHandler', async (req, reply) => {
  if (req.user.role !== 'admin' && req.method !== 'GET') {
    throw reply.forbidden('Write access requires admin role')
  }
})

// onSend — transformez ou inspectez la payload de réponse sérialisée.
app.addHook('onSend', async (req, reply, payload) => {
  reply.header('X-Request-Id', req.id)
  return payload  // doit retourner payload (ou une version modifiée)
})

// onError — normalisation d'erreur globale.
app.addHook('onError', async (req, reply, error) => {
  req.log.error({ err: error, userId: req.user?.sub }, 'request error')
  // Ne mutez pas reply ici — onError est pour les side effects seulement
})

// Hook scoped — s'applique seulement aux routes dans ce bloc de plugin
app.register(async (scope) => {
  scope.addHook('preHandler', rateLimitHook)
  scope.post('/login', loginHandler)
  scope.post('/register', registerHandler)
})
```

### Test avec fastify.inject()

```
Écrivez les tests pour [route ou feature] utilisant fastify.inject() — pas de serveur HTTP nécessaire.

// test/users.test.ts
import { test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert/strict'
import { buildApp } from '../src/app'

let app: ReturnType<typeof buildApp>

beforeEach(async () => {
  app = buildApp({ logger: false })  // silence logs in tests
  await app.ready()
})

afterEach(async () => {
  await app.close()
})

test('GET /api/v1/users — retourne 200 avec pagination', async () => {
  const res = await app.inject({
    method: 'GET',
    url: '/api/v1/users?page=1&limit=5',
    headers: { authorization: `Bearer ${validToken}` },
  })

  assert.equal(res.statusCode, 200)
  const body = res.json()
  assert.ok(Array.isArray(body.users))
  assert.equal(body.page, 1)
})

test('POST /api/v1/users — valide body, retourne 400 sur email manquant', async () => {
  const res = await app.inject({
    method: 'POST',
    url: '/api/v1/users',
    payload: { name: 'Alice' },  // missing email and password
  })

  assert.equal(res.statusCode, 400)
  const body = res.json()
  assert.equal(body.error, 'Bad Request')
})

test('GET /api/v1/users/:id — retourne 404 pour id inconnu', async () => {
  const res = await app.inject({
    method: 'GET',
    url: '/api/v1/users/00000000-0000-0000-0000-000000000000',
    headers: { authorization: `Bearer ${validToken}` },
  })

  assert.equal(res.statusCode, 404)
})

// Générez un JWT signé pour les tests
const validToken = app.jwt.sign({ sub: 'test-user', role: 'user', email: 'test@example.com' })
```

### Documentation Swagger

```
Ajoutez l'UI Swagger à une app Fastify.

// src/plugins/swagger.ts
import fp from 'fastify-plugin'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'

export default fp(async (app) => {
  await app.register(swagger, {
    openapi: {
      info: { title: 'My API', version: '1.0.0' },
      components: {
        securitySchemes: {
          bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        },
      },
      security: [{ bearerAuth: [] }],
    },
  })

  await app.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: { deepLinking: true },
    staticCSP: true,
  })
})

// Dans les routes, ajoutez les tags et operationId pour le grouping dans l'UI
app.get('/users', {
  schema: {
    tags: ['Users'],
    operationId: 'listUsers',
    summary: 'List all users',
    description: 'Returns paginated users. Requires admin role.',
  },
}, handler)

// Accédez à JSON Swagger : GET /docs/json
// UI Swagger :          GET /docs
```

## Exemple

**Utilisateur :** J'ai une API Express faisant ~8k req/s sur une machine 4-core. Je veux passer à Fastify mais garder la même structure de route et la validation Zod que j'ai déjà.

**Plan de migration :**

1. Remplacez le shell de l'app Express :

```typescript
// Avant (Express)
import express from 'express'
const app = express()
app.use(express.json())

// Après (Fastify — parsing JSON built-in, ~2-3x plus rapide sérialisation)
import Fastify from 'fastify'
const app = Fastify({ logger: true })
```

2. Remplacez les schemas Zod avec TypeBox (l'intégration AJV native de Fastify est plus rapide que Zod pour la validation de requête; TypeBox vous donne les types TypeScript gratuitement) :

```typescript
// Avant (Zod)
const createUserSchema = z.object({ name: z.string().min(1), email: z.string().email() })

// Après (TypeBox — valide à la vitesse d'AJV, toujours typé)
const CreateUserBody = Type.Object({
  name: Type.String({ minLength: 1 }),
  email: Type.String({ format: 'email' }),
})
```

3. Convertissez les routes — la route Fastify schema remplace le middleware de validation :

```typescript
// Avant (Express + validate middleware)
router.post('/', validate(createUserSchema), async (req, res) => {
  res.status(201).json(await createUser(req.body))
})

// Après (Fastify — schema dans les options de route, pas de middleware nécessaire)
app.post<{ Body: CreateUserBody }>('/users', {
  schema: { body: CreateUserBody, response: { 201: UserSchema } },
}, async (req, reply) => {
  return reply.code(201).send(await createUser(req.body))
})
```

4. Remplacez les chaînes de middleware avec des hooks (scoped aux routes protégées seulement) :

```typescript
app.register(async (protected) => {
  protected.addHook('onRequest', app.authenticate)
  protected.register(usersRoutes, { prefix: '/users' })
  protected.register(ordersRoutes, { prefix: '/orders' })
})
```

5. Testez sans tourner un serveur :

```bash
npm run test  # fastify.inject() — zéro binding de port, cycle de requête complet
```

Résultat attendu : 16-20k req/s sur la même machine 4-core, logs JSON structurés via Pino, et docs Swagger complets à `/docs`.
