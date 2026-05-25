---
name: fastify
description: "API REST de Fastify: validación first-schema, arquitectura de plugin, ciclo de vida de hooks, TypeScript, registro Pino, autenticación JWT, Swagger, y patrones de producción para servicios Node.js de alto rendimiento"
---

# Habilidad de Fastify

## Cuándo activar
- Construyendo una API REST con Fastify
- Migrando un servicio Express a Fastify para ganancias de desempeño
- Agregando validación de esquema, autenticación JWT o documentos Swagger a una aplicación Fastify
- Configurando el modelo de plugin/encapsulación para un servicio Fastify modular
- Escribiendo pruebas con `fastify.inject()` (sin servidor HTTP en vivo)
- Cualquier tarea donde el usuario referencia `fastify`, `@fastify/*` o `fastify-plugin`

## Cuándo NO usar
- Despliegues en borde — usa la habilidad hono (Cloudflare Workers, Deno Deploy)
- Framework de pila completa con SSR — usa la habilidad nextjs o remix
- El usuario explícitamente quiere compatibilidad de ecosistema middleware Express

## Instrucciones

### Configuración y estructura del proyecto

```
Configura un proyecto Fastify de producción listo con TypeScript.

Lenguaje: TypeScript
Base de datos: [PostgreSQL / MongoDB / ninguno]
Autenticación: [JWT / ninguno]
Swagger: [sí / no]

Estructura de directorios:
src/
  app.ts            ← instancia Fastify + registro de plugin (no escuches aquí)
  server.ts         ← punto de entrada (escucha + apagado elegante)
  plugins/
    sensible.ts     ← @fastify/sensible para errores HTTP estándar
    jwt.ts          ← plugin fastify-jwt (autenticación limitada)
    swagger.ts      ← @fastify/swagger + @fastify/swagger-ui
  routes/
    index.ts        ← agregador de rutas
    users/
      index.ts      ← definiciones de rutas usuarios con JSON Schema
      schema.ts     ← esquemas TypeBox para solicitud/respuesta
  hooks/
    auth.ts         ← hook onRequest para verificación JWT
  types/
    index.ts        ← aumento de módulo para decoradores fastify

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
      // Redacción Pino — nunca registres secretos
      redact: ['req.headers.authorization', 'body.password'],
    },
    ajv: {
      customOptions: { removeAdditional: 'all', coerceTypes: true },
    },
    ...opts,
  })

  // Plugins principales
  app.register(sensible)
  app.register(cors, { origin: process.env.ALLOWED_ORIGINS?.split(',') ?? [] })

  // Autenticación + docs
  app.register(jwtPlugin)
  app.register(swaggerPlugin)

  // Health check — fuera del alcance de autenticación
  app.get('/health', { schema: { hide: true } }, async () => ({ status: 'ok' }))

  // Rutas versionadas
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

// Apagado elegante
const stop = async () => {
  await app.close()
  process.exit(0)
}

process.on('SIGTERM', stop)
process.on('SIGINT', stop)

start()
```

### Validación first-schema con TypeBox

```
Agrega esquemas TypeBox para rutas de [recurso]. TypeBox genera tanto el tipo
TypeScript como el JSON Schema para Fastify AJV en una declaración.

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

// Tipos TypeScript inferidos — sin duplicación
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
  // GET /users — público o protegido dependiendo de hook onRequest a continuación
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
    // obtén de BD
    return { users: [], total: 0, page }
  })

  app.post<{ Body: CreateUserBody }>('/', {
    schema: {
      body: CreateUserBody,
      response: { 201: UserSchema },
      tags: ['Users'],
    },
  }, async (req, reply) => {
    // crear usuario
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

### Arquitectura de plugin y encapsulación

```
Explica e implementa el modelo de encapsulación de plugin de Fastify.

Regla clave: plugins registrados con fastify-plugin() COMPARTEN sus decoradores y
hooks con el alcance padre. Plugins registrados sin ello están ENCAPSULADOS
(aislados — decoradores no visibles fuera).

Usa fastify-plugin cuando: estás agregando decoradores, configurando hooks, o registrando
infraestructura compartida (bd, jwt, redis) que rutas hermanas necesitan.
Omítalo cuando: estás registrando subgrupos de rutas que deben estar aislados.

// src/plugins/jwt.ts — plugin auth compartido (usa fastify-plugin)
import fp from 'fastify-plugin'
import fjwt from '@fastify/jwt'
import { FastifyPluginAsync, FastifyRequest } from 'fastify'

const jwtPlugin: FastifyPluginAsync = async (app) => {
  app.register(fjwt, { secret: process.env.JWT_SECRET! })

  // Decora solicitud con un método de autenticación que rutas pueden llamar
  app.decorate('authenticate', async (req: FastifyRequest) => {
    await req.jwtVerify()
  })
}

export default fp(jwtPlugin, { name: 'jwt' })

// src/types/index.ts — aumenta tipos Fastify para que TypeScript conozca decoradores
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

// Uso en alcance de ruta protegida (encapsulado — onRequest solo se dispara aquí)
app.register(async (protectedScope) => {
  protectedScope.addHook('onRequest', app.authenticate)

  protectedScope.get('/me', async (req) => {
    return req.user  // tipado: { sub, role, email }
  })
})
```

### Ciclo de vida de hooks

```
Agrega hooks Fastify para [problema transversal: logging / auth / rate limiting / transform].

Orden de hook:
  onRequest → preParsing → preValidation → preHandler → handler → preSerialization → onSend → onResponse
  onError se dispara en cualquier error no capturado en la cadena anterior.

// onRequest — ejecuta antes de análisis de cuerpo. Ideal para autenticación.
app.addHook('onRequest', async (req, reply) => {
  const token = req.headers.authorization?.slice(7)
  if (!token) throw reply.unauthorized('Bearer token required')
  req.user = app.jwt.verify(token)
})

// preHandler — el cuerpo es analizado y validado. Ideal para guardia lógica de negocio.
app.addHook('preHandler', async (req, reply) => {
  if (req.user.role !== 'admin' && req.method !== 'GET') {
    throw reply.forbidden('Write access requires admin role')
  }
})

// onSend — transforma o inspecciona el cuerpo de respuesta serializado.
app.addHook('onSend', async (req, reply, payload) => {
  reply.header('X-Request-Id', req.id)
  return payload  // debe devolver payload (o una versión modificada)
})

// onError — normalización global de errores.
app.addHook('onError', async (req, reply, error) => {
  req.log.error({ err: error, userId: req.user?.sub }, 'request error')
  // No mutes respuesta aquí — onError es solo para efectos secundarios
})

// Hook limitado — aplica solo a rutas en este bloque de plugin
app.register(async (scope) => {
  scope.addHook('preHandler', rateLimitHook)
  scope.post('/login', loginHandler)
  scope.post('/register', registerHandler)
})
```

### Pruebas con fastify.inject()

```
Escribe pruebas para [ruta o característica] usando fastify.inject() — no se requiere servidor HTTP.

// test/users.test.ts
import { test, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert/strict'
import { buildApp } from '../src/app'

let app: ReturnType<typeof buildApp>

beforeEach(async () => {
  app = buildApp({ logger: false })  // silencia registros en pruebas
  await app.ready()
})

afterEach(async () => {
  await app.close()
})

test('GET /api/v1/users — devuelve 200 con paginación', async () => {
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

test('POST /api/v1/users — valida cuerpo, devuelve 400 en email faltante', async () => {
  const res = await app.inject({
    method: 'POST',
    url: '/api/v1/users',
    payload: { name: 'Alice' },  // falta email y contraseña
  })

  assert.equal(res.statusCode, 400)
  const body = res.json()
  assert.equal(body.error, 'Bad Request')
})

test('GET /api/v1/users/:id — devuelve 404 para id desconocido', async () => {
  const res = await app.inject({
    method: 'GET',
    url: '/api/v1/users/00000000-0000-0000-0000-000000000000',
    headers: { authorization: `Bearer ${validToken}` },
  })

  assert.equal(res.statusCode, 404)
})

// Genera un JWT firmado para pruebas
const validToken = app.jwt.sign({ sub: 'test-user', role: 'user', email: 'test@example.com' })
```

### Documentación Swagger

```
Agrega Swagger UI a una aplicación Fastify.

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

// En rutas, agrega etiquetas y operationId para agrupación en la IU
app.get('/users', {
  schema: {
    tags: ['Users'],
    operationId: 'listUsers',
    summary: 'List all users',
    description: 'Returns paginated users. Requires admin role.',
  },
}, handler)

// Accede a JSON Swagger: GET /docs/json
// IU Swagger:          GET /docs
```

## Ejemplo

**Usuario:** Tengo una API Express haciendo ~8k req/s en una máquina de 4 núcleos. Quiero pasar a Fastify pero mantener la misma estructura de ruta y validación Zod que ya tengo.

**Plan de migración:**

1. Reemplaza el shell de aplicación Express:

```typescript
// Antes (Express)
import express from 'express'
const app = express()
app.use(express.json())

// Después (Fastify — análisis JSON incorporado, serialización ~2-3x más rápida)
import Fastify from 'fastify'
const app = Fastify({ logger: true })
```

2. Reemplaza esquemas Zod con TypeBox (integración AJV nativa de Fastify es más rápida que Zod para validación de solicitud; TypeBox te da tipos TypeScript gratis):

```typescript
// Antes (Zod)
const createUserSchema = z.object({ name: z.string().min(1), email: z.string().email() })

// Después (TypeBox — valida a velocidad AJV, aún tipado)
const CreateUserBody = Type.Object({
  name: Type.String({ minLength: 1 }),
  email: Type.String({ format: 'email' }),
})
```

3. Convierte rutas — esquema de ruta Fastify reemplaza middleware de validación:

```typescript
// Antes (Express + middleware de validación)
router.post('/', validate(createUserSchema), async (req, res) => {
  res.status(201).json(await createUser(req.body))
})

// Después (Fastify — esquema en opciones de ruta, no middleware necesario)
app.post<{ Body: CreateUserBody }>('/users', {
  schema: { body: CreateUserBody, response: { 201: UserSchema } },
}, async (req, reply) => {
  return reply.code(201).send(await createUser(req.body))
})
```

4. Reemplaza cadenas de middleware con hooks (limitados a rutas protegidas solo):

```typescript
app.register(async (protected) => {
  protected.addHook('onRequest', app.authenticate)
  protected.register(usersRoutes, { prefix: '/users' })
  protected.register(ordersRoutes, { prefix: '/orders' })
})
```

5. Prueba sin girar un servidor:

```bash
npm run test  # fastify.inject() — sin vinculación de puerto, ciclo de vida de solicitud completo
```

Resultado esperado: 16-20k req/s en la misma máquina de 4 núcleos, registros JSON estructurados a través de Pino, y documentos Swagger completos en `/docs`.
