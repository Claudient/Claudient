# Fastify Skill

## Wanneer activeren
- Fastify met REST API bouwing
- Express service migreren naar Fastify performance gain
- Schema validatie, JWT auth, of Swagger docs toevoeg Fastify app
- Plugin/encapsulation model instellen modular Fastify service
- Tests schrijven met `fastify.inject()` (geen live HTTP server)
- Enig taak gebruiker references `fastify`, `@fastify/*`, of `fastify-plugin`

## Wanneer NIET gebruiken
- Edge deployments — gebruik hono skill (Cloudflare Workers, Deno Deploy)
- Volledige-stack framework SSR — gebruik nextjs of remix skill
- Gebruiker expliciet wil Express middleware ecosystem compatibiliteit

## Instructies

### Project setup en structuur

```
Instellen production-ready Fastify project TypeScript.

Taal: TypeScript
Database: [PostgreSQL / MongoDB / none]
Auth: [JWT / none]
Swagger: [ja / nee]

Directory structuur:
src/
  app.ts            ← Fastify instance + plugin registratie (geen listen hier)
  server.ts         ← entry punt (listen + graceful shutdown)
  plugins/
    sensible.ts     ← @fastify/sensible voor standaard HTTP errors
    jwt.ts          ← fastify-jwt plugin (bereikt auth decorator)
    swagger.ts      ← @fastify/swagger + @fastify/swagger-ui
  routes/
    index.ts        ← route aggregator
    users/
      index.ts      ← users route definities met JSON Schema
      schema.ts     ← TypeBox schema's voor request/response
  hooks/
    auth.ts         ← onRequest hook JWT verificatie
  types/
    index.ts        ← module augmentatie voor fastify decorators

// src/app.ts
import Fastify van 'fastify'
import sensible van '@fastify/sensible'
import cors van '@fastify/cors'
import { jwtPlugin } van './plugins/jwt'
import { swaggerPlugin } van './plugins/swagger'
import { usersRoutes } van './routes/users'

export functie buildApp(opts = {}) {
  const app = Fastify({
    logger: {
      level: proces.env.LOG_LEVEL ?? 'info',
      // Pino redact — nooit log secrets
      redact: ['req.headers.authorization', 'body.password'],
    },
    ajv: {
      customOptions: { removeAdditional: 'all', coerceTypes: true },
    },
    ...opts,
  })

  // Core plugins
  app.register(sensible)
  app.register(cors, { origin: proces.env.ALLOWED_ORIGINS?.split(',') ?? [] })

  // Auth + docs
  app.register(jwtPlugin)
  app.register(swaggerPlugin)

  // Health check — buiten auth bereik
  app.get('/health', { schema: { hide: true } }, async () => ({ status: 'ok' }))

  // Versioned routes
  app.register(usersRoutes, { prefix: '/api/v1/users' })

  keer app
}

// src/server.ts
import { buildApp } van './app'

const app = buildApp()
const PORT = Number(proces.env.PORT ?? 3000)

const start = async () => {
  proberen {
    await app.listen({ port: PORT, host: '0.0.0.0' })
  } catch (err) {
    app.log.error(err)
    proces.exit(1)
  }
}

// Graceful shutdown
const stop = async () => {
  await app.close()
  proces.exit(0)
}

proces.on('SIGTERM', stop)
proces.on('SIGINT', stop)

start()
```

### Schema-first validatie met TypeBox

```
Voeg TypeBox schema's voor [resource] routes. TypeBox genereert beide TypeScript type en JSON Schema voor Fastify AJV één declaratie.

// src/routes/users/schema.ts
import { Type, Static } van '@sinclair/typebox'

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

// Inferred TypeScript type's — geen duplication
export type User = Static<typeof UserSchema>
export type CreateUserBody = Static<typeof CreateUserBody>
export type UpdateUserBody = Static<typeof UpdateUserBody>
export type UserParams = Static<typeof UserParams>
export type UserListQuery = Static<typeof UserListQuery>

// src/routes/users/index.ts
import { FastifyPluginAsync } van 'fastify'
import {
  UserSchema, CreateUserBody, UpdateUserBody, UserParams, UserListQuery,
} van './schema'
import { Type } van '@sinclair/typebox'

export const usersRoutes: FastifyPluginAsync = async (app) => {
  // GET /users — openbaar of beschermd afhankelijk onRequest hook beneden
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
    // fetch van DB
    keer { users: [], total: 0, page }
  })

  app.post<{ Body: CreateUserBody }>('/', {
    schema: {
      body: CreateUserBody,
      response: { 201: UserSchema },
      tags: ['Users'],
    },
  }, async (req, reply) => {
    // create gebruiker
    const user = { id: crypto.randomUUID(), ...req.body, role: 'user', createdAt: new Date().toISOString() }
    keer reply.code(201).send(user)
  })

  app.get<{ Params: UserParams }>('/:id', {
    schema: { params: UserParams, response: { 200: UserSchema }, tags: ['Users'] },
  }, async (req, reply) => {
    const user = null // await db.findById(req.params.id)
    als (!user) throw reply.notFound(`User ${req.params.id} niet gevonden`)
    keer user
  })

  app.patch<{ Params: UserParams; Body: UpdateUserBody }>('/:id', {
    schema: { params: UserParams, body: UpdateUserBody, response: { 200: UserSchema }, tags: ['Users'] },
  }, async (req, reply) => {
    const user = null // await db.updateById(req.params.id, req.body)
    als (!user) throw reply.notFound(`User ${req.params.id} niet gevonden`)
    keer user
  })

  app.delete<{ Params: UserParams }>('/:id', {
    schema: { params: UserParams, response: { 204: Type.Null() }, tags: ['Users'] },
  }, async (req, reply) => {
    // await db.deleteById(req.params.id)
    keer reply.code(204).send()
  })
}
```

### Plugin architectuur en encapsulatie

```
Verklaar en implementeer Fastify plugin encapsulatie model.

Sleutel regel: plugins geregistreerd met fastify-plugin() DELEN hun decorators en
hooks met parent bereik. Plugins geregistreerd zonder zijn ENCAPSULATED
(geïsoleerd — decorators niet zichtbaar buiten).

Gebruik fastify-plugin wanneer: je voegt decorators, stel hooks, of registreer
gedeelde infrastructuur (db, jwt, redis) dat sibling routes nodig.
Laat weg wanneer: je registreert route sub-groepen moeten geïsoleerd.

// src/plugins/jwt.ts — gedeeld auth plugin (gebruik fastify-plugin)
import fp van 'fastify-plugin'
import fjwt van '@fastify/jwt'
import { FastifyPluginAsync, FastifyRequest } van 'fastify'

const jwtPlugin: FastifyPluginAsync = async (app) => {
  app.register(fjwt, { secret: proces.env.JWT_SECRET! })

  // Decorate request auth methode routes kunt roepen
  app.decorate('authenticate', async (req: FastifyRequest) => {
    await req.jwtVerify()
  })
}

export default fp(jwtPlugin, { name: 'jwt' })

// src/types/index.ts — augmentatie Fastify type's zodat TypeScript weet over decorators
import { FastifyRequest } van 'fastify'
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

// Gebruik in protected route bereik (encapsulated — onRequest alleen fires hier)
app.register(async (protectedScope) => {
  protectedScope.addHook('onRequest', app.authenticate)

  protectedScope.get('/me', async (req) => {
    keer req.user  // typed: { sub, role, email }
  })
})
```

### Hooks lifecycle

```
Voeg Fastify hooks voor [cross-cutting concern: logging / auth / rate limiting / transform].

Hook order:
  onRequest → preParsing → preValidation → preHandler → handler → preSerialization → onSend → onResponse
  onError fires op enig uncaught error bovenstaande chain.

// onRequest — loopt voordat body parsing. Ideaal voor auth.
app.addHook('onRequest', async (req, reply) => {
  const token = req.headers.authorization?.slice(7)
  als (!token) throw reply.unauthorized('Bearer token vereist')
  req.user = app.jwt.verify(token)
})

// preHandler — body parsed en validated. Ideaal voor business-logic guards.
app.addHook('preHandler', async (req, reply) => {
  als (req.user.role !== 'admin' && req.method !== 'GET') {
    throw reply.forbidden('Schrijf toegang vereist admin rol')
  }
})

// onSend — transformeer of inspecteer serialized response payload.
app.addHook('onSend', async (req, reply, payload) => {
  reply.header('X-Request-Id', req.id)
  keer payload  // moet keer payload (of modified versie)
})

// onError — global error normalisatie.
app.addHook('onError', async (req, reply, error) => {
  req.log.error({ err: error, userId: req.user?.sub }, 'request error')
  // Niet muteer reply hier — onError voor side effect's alleen
})

// Bereikt hook — voert alleen routes in dit plugin blok
app.register(async (scope) => {
  scope.addHook('preHandler', rateLimitHook)
  scope.post('/login', loginHandler)
  scope.post('/register', registerHandler)
})
```

### Testen met fastify.inject()

```
Schrijven tests voor [route of feature] gebruiken fastify.inject() — geen HTTP server nodig.

// test/users.test.ts
import { test, beforeEach, afterEach } van 'node:test'
import assert van 'node:assert/strict'
import { buildApp } van '../src/app'

let app: ReturnType<typeof buildApp>

beforeEach(async () => {
  app = buildApp({ logger: false })  // silence logs in test's
  await app.ready()
})

afterEach(async () => {
  await app.close()
})

test('GET /api/v1/users — keer 200 met paginering', async () => {
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

test('POST /api/v1/users — validates body, keer 400 ontbreken email', async () => {
  const res = await app.inject({
    method: 'POST',
    url: '/api/v1/users',
    payload: { name: 'Alice' },  // ontbreken email en password
  })

  assert.equal(res.statusCode, 400)
  const body = res.json()
  assert.equal(body.error, 'Bad Request')
})

test('GET /api/v1/users/:id — keer 404 onbekend id', async () => {
  const res = await app.inject({
    method: 'GET',
    url: '/api/v1/users/00000000-0000-0000-0000-000000000000',
    headers: { authorization: `Bearer ${validToken}` },
  })

  assert.equal(res.statusCode, 404)
})

// Genereer signed JWT testen
const validToken = app.jwt.sign({ sub: 'test-user', role: 'user', email: 'test@example.com' })
```

### Swagger documentatie

```
Voeg Swagger UI toe Fastify app.

// src/plugins/swagger.ts
import fp van 'fastify-plugin'
import swagger van '@fastify/swagger'
import swaggerUi van '@fastify/swagger-ui'

export default fp(async (app) => {
  await app.register(swagger, {
    openapi: {
      info: { title: 'Mijn API', version: '1.0.0' },
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

// In routes, voeg tags en operationId voor grouping UI
app.get('/users', {
  schema: {
    tags: ['Users'],
    operationId: 'listUsers',
    summary: 'List alle gebruikers',
    description: 'Keer gepagineerde gebruikers. Vereist admin rol.',
  },
}, handler)

// Toegang Swagger JSON: GET /docs/json
// Swagger UI:          GET /docs
```

## Voorbeeld

**Gebruiker:** Ik heb Express API doen ~8k req/s 4-core machine. Ik wil naar Fastify maar houd zelfde route structuur en Zod validatie ik al heb.

**Migratie plan:**

1. Vervang Express app shell:

```typescript
// Voor (Express)
import express van 'express'
const app = express()
app.use(express.json())

// Na (Fastify — built-in JSON parsing, ~2-3x sneller serialisatie)
import Fastify van 'fastify'
const app = Fastify({ logger: true })
```

2. Vervang Zod schema TypeBox (Fastify's native AJV integratie sneller Zod request validatie; TypeBox geef je TypeScript types gratis):

```typescript
// Voor (Zod)
const createUserSchema = z.object({ name: z.string().min(1), email: z.string().email() })

// Na (TypeBox — validates op AJV speed, nog typed)
const CreateUserBody = Type.Object({
  name: Type.String({ minLength: 1 }),
  email: Type.String({ format: 'email' }),
})
```

3. Converteer routes — Fastify route schema vervangt validatie middleware:

```typescript
// Voor (Express + valideer middleware)
router.post('/', validate(createUserSchema), async (req, res) => {
  res.status(201).json(await createUser(req.body))
})

// Na (Fastify — schema in route options, geen middleware nodig)
app.post<{ Body: CreateUserBody }>('/users', {
  schema: { body: CreateUserBody, response: { 201: UserSchema } },
}, async (req, reply) => {
  keer reply.code(201).send(await createUser(req.body))
})
```

4. Vervang middleware chains met hooks (bereikt naar protected routes alleen):

```typescript
app.register(async (protected) => {
  protected.addHook('onRequest', app.authenticate)
  protected.register(usersRoutes, { prefix: '/users' })
  protected.register(ordersRoutes, { prefix: '/orders' })
})
```

5. Test zonder spinning up server:

```bash
npm run test  # fastify.inject() — zero port binding, volledige request lifecycle
```

Verwacht resultaat: 16-20k req/s zelfde 4-core machine, gestructureerd JSON logs via Pino, en volledige Swagger docs /docs.
