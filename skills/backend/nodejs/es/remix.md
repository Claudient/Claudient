---
name: remix
description: "Remix full-stack React: enrutamiento basado en archivo, loaders, acciones, mejora progresiva, gestión de sesión, rutas de recurso, límites de error, y patrones de despliegue de producción"
---

# Habilidad de Remix

## Cuándo activar
- Construyendo o extendiendo una aplicación Remix (`app/routes/`, `app/root.tsx`)
- Implementando obtención de datos con loaders o mutaciones con acciones
- Configurando autenticación basada en sesión, gestión de cookies o manejo de formularios en Remix
- Cableando rutas de recurso para APIs o webhooks en un proyecto Remix
- Cualquier tarea que referencie `useLoaderData`, `useActionData`, `Form`, `redirect` o `@remix-run/*`

## Cuándo NO usar
- El usuario quiere un SPA React puro sin renderización del lado del servidor — usa la habilidad react
- El usuario está en Next.js — usa la habilidad nextjs
- API solo del servidor (sin IU) — usa la habilidad express o fastify

## Instrucciones

### Configuración y estructura del proyecto

```
Configura un proyecto Remix 2.x de producción listo con TypeScript y Vite.

Tiempo de ejecución: [Node.js / Cloudflare Pages / Fly.io]
Autenticación: [cookie de sesión / ninguna]
Base de datos: [Prisma + PostgreSQL / Drizzle / ninguna]
Estilos: [Tailwind / CSS plano]

Estructura de directorios:
app/
  root.tsx              ← diseño raíz, límite de error global, meta
  entry.client.tsx      ← hidratación de navegador (raramente editado)
  entry.server.tsx      ← renderización del servidor (raramente editado)
  routes/
    _index.tsx          ← se renderiza en /
    dashboard.tsx       ← se renderiza en /dashboard (ruta de diseño)
    dashboard._index.tsx← se renderiza en /dashboard (hijo índice)
    users.$id.tsx       ← se renderiza en /users/:id
    api.webhook.tsx     ← ruta de recurso en /api/webhook (sin exportación de IU)
  lib/
    session.server.ts   ← fábrica de sesión de cookie (solo servidor)
    db.server.ts        ← singleton de cliente Prisma/Drizzle
    auth.server.ts      ← asistentes de inicio/cierre de sesión
  components/
    ui/                 ← componentes presentacionales compartidos
  styles/
    tailwind.css

// vite.config.ts
import { vitePlugin as remix } from '@remix-run/dev'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    remix({
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
  ],
})
```

### Loaders — obtención de datos del servidor

```
Implementa un loader para [ruta] que obtiene [datos] y maneja autenticación/errores.

Los loaders se ejecutan del lado del servidor en cada solicitud GET (navegación + actualización de datos).
Nunca se ejecutan en el navegador. Devuelve cualquier cosa serializable.

// app/routes/users.$id.tsx
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { requireUser } from '~/lib/auth.server'
import { db } from '~/lib/db.server'

export async function loader({ request, params }: LoaderFunctionArgs) {
  // Puerta de autenticación — lanza redirección a /login si no hay sesión
  const currentUser = await requireUser(request)

  const user = await db.user.findUnique({ where: { id: params.id } })

  // Lanza Response para activar el ErrorBoundary más cercano
  if (!user) throw new Response('User not found', { status: 404 })

  // Verificación de autorización
  if (currentUser.role !== 'admin' && currentUser.id !== user.id) {
    throw new Response('Forbidden', { status: 403 })
  }

  // Serializa — las fechas se convierten a cadenas, nunca pases instancias de clase
  return json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
    },
    isOwner: currentUser.id === user.id,
  })
}

export default function UserProfile() {
  // Completamente tipado — TypeScript infiere desde devuelto de loader
  const { user, isOwner } = useLoaderData<typeof loader>()

  return (
    <article>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      {isOwner && <a href="/settings">Edit profile</a>}
    </article>
  )
}
```

### Acciones — mutaciones y manejo de formularios

```
Implementa una acción para [ruta] que maneja [crear / actualizar / eliminar] con validación.

Las acciones se ejecutan del lado del servidor en POST/PUT/PATCH/DELETE. Son la única forma
de mutar datos en Remix. Devuelve json() con errores o redirect() en éxito.

// app/routes/users.new.tsx
import { json, redirect, ActionFunctionArgs } from '@remix-run/node'
import { Form, useActionData, useNavigation } from '@remix-run/react'
import { requireUser } from '~/lib/auth.server'
import { db } from '~/lib/db.server'
import { z } from 'zod'

const CreateUserSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email'),
  role: z.enum(['admin', 'user']),
})

export async function action({ request }: ActionFunctionArgs) {
  await requireUser(request)

  const formData = await request.formData()
  const raw = Object.fromEntries(formData)

  const result = CreateUserSchema.safeParse(raw)
  if (!result.success) {
    // Devuelve errores — useActionData recoge estos sin recarga de página
    return json(
      { errors: result.error.flatten().fieldErrors, values: raw },
      { status: 422 }
    )
  }

  const { name, email, role } = result.data

  try {
    const user = await db.user.create({ data: { name, email, role } })
    // Redirige al nuevo recurso — activa un GET para limpiar el formulario
    return redirect(`/users/${user.id}`)
  } catch (err: any) {
    if (err.code === 'P2002') {  // Restricción única Prisma
      return json({ errors: { email: ['Email already registered'] }, values: raw }, { status: 409 })
    }
    throw err  // sin manejar — activa ErrorBoundary
  }
}

export default function NewUser() {
  const data = useActionData<typeof action>()
  const nav = useNavigation()
  const isSubmitting = nav.state === 'submitting'

  return (
    // Remix Form envía a la acción de la misma ruta por defecto
    <Form method="post">
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" defaultValue={data?.values?.name as string} />
        {data?.errors?.name && <p className="error">{data.errors.name[0]}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" defaultValue={data?.values?.email as string} />
        {data?.errors?.email && <p className="error">{data.errors.email[0]}</p>}
      </div>

      <select name="role" defaultValue="user">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Creating...' : 'Create user'}
      </button>
    </Form>
  )
}
```

### Gestión de sesión y autenticación

```
Implementa autenticación de sesión basada en cookie en Remix.

// app/lib/session.server.ts
import { createCookieSessionStorage, redirect } from '@remix-run/node'

type SessionData = { userId: string; role: string }
type SessionFlashData = { error: string }

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>({
    cookie: {
      name: '__session',
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 30,  // 30 días
      path: '/',
      sameSite: 'lax',
      secrets: [process.env.SESSION_SECRET!],
      secure: process.env.NODE_ENV === 'production',
    },
  })

export { getSession, commitSession, destroySession }

// app/lib/auth.server.ts
import { getSession, commitSession, destroySession } from './session.server'
import { db } from './db.server'
import bcrypt from 'bcryptjs'

export async function requireUser(request: Request) {
  const session = await getSession(request.headers.get('Cookie'))
  const userId = session.get('userId')
  if (!userId) throw redirect('/login')

  const user = await db.user.findUnique({ where: { id: userId } })
  if (!user) throw redirect('/login')

  return user
}

export async function login(email: string, password: string) {
  const user = await db.user.findUnique({ where: { email } })
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return null
  }
  return user
}

// app/routes/login.tsx — acción de inicio de sesión
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const user = await login(email, password)
  if (!user) {
    return json({ error: 'Invalid credentials' }, { status: 401 })
  }

  const session = await getSession(request.headers.get('Cookie'))
  session.set('userId', user.id)
  session.set('role', user.role)

  return redirect('/dashboard', {
    headers: { 'Set-Cookie': await commitSession(session) },
  })
}

// app/routes/logout.tsx — acción de cierre de sesión (sin IU necesaria)
export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get('Cookie'))
  return redirect('/login', {
    headers: { 'Set-Cookie': await destroySession(session) },
  })
}
```

### Rutas de recurso

```
Crea una ruta de recurso para [webhook / punto final de API / descarga de archivo].

Las rutas de recurso no tienen exportación predeterminada (sin IU). Responden con
objetos Response arbitrarios — JSON, binario, redirecciones o webhooks.

// app/routes/api.users.ts — punto final REST en /api/users
import { json, LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node'

export async function loader({ request }: LoaderFunctionArgs) {
  // Puede ser llamado desde fetch() en navegador o servicios externos
  const users = await db.user.findMany({ select: { id: true, name: true, email: true } })
  return json(users)
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }
  const body = await request.json()
  // ... maneja POST
  return json({ created: true }, { status: 201 })
}

// app/routes/api.webhook.stripe.ts — webhook en /api/webhook/stripe
import Stripe from 'stripe'

export async function action({ request }: ActionFunctionArgs) {
  const sig = request.headers.get('stripe-signature')!
  const body = await request.text()  // texto sin procesar para verificación de firma

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return new Response('Webhook signature invalid', { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutComplete(event.data.object)
      break
  }

  return new Response('ok', { status: 200 })
}

// app/routes/files.$key.ts — descarga de archivo en /files/:key
export async function loader({ params }: LoaderFunctionArgs) {
  const file = await storage.get(params.key)
  if (!file) return new Response('Not found', { status: 404 })

  return new Response(file.stream(), {
    headers: {
      'Content-Type': file.contentType,
      'Content-Disposition': `attachment; filename="${file.name}"`,
    },
  })
}
```

### Límites de error

```
Agrega límites de error a nivel de ruta para [ruta].

// Límite de error a nivel de ruta — captura errores de loader/acción solo para esta ruta
// El diseño padre permanece montado (sin bloqueo de página completa)
export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    // Response lanzada — error HTTP estructurado desde loader/acción
    return (
      <div className="error-container">
        <h1>{error.status} {error.statusText}</h1>
        <p>{error.data}</p>
        <a href="/">Go home</a>
      </div>
    )
  }

  // Error JS no manejado — error es una instancia de Error
  const message = error instanceof Error ? error.message : 'Unknown error'
  return (
    <div className="error-container">
      <h1>Something went wrong</h1>
      <p>{message}</p>
    </div>
  )
}

// app/root.tsx — captura todo no capturado por un límite de ruta
export function ErrorBoundary() {
  const error = useRouteError()
  return (
    <html lang="en">
      <head><title>Error</title></head>
      <body>
        <h1>Application error</h1>
        {isRouteErrorResponse(error) ? (
          <p>{error.status}: {error.data}</p>
        ) : (
          <p>An unexpected error occurred</p>
        )}
      </body>
    </html>
  )
}
```

### Rutas anidadas y diseños

```
Configura rutas anidadas con diseño compartido y outlet para [área de característica].

// app/routes/dashboard.tsx — ruta de diseño (renderiza shell + Outlet)
import { Outlet, NavLink, useLoaderData } from '@remix-run/react'

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request)
  return json({ user: { name: user.name, role: user.role } })
}

export default function DashboardLayout() {
  const { user } = useLoaderData<typeof loader>()
  return (
    <div className="dashboard">
      <nav>
        <span>{user.name}</span>
        <NavLink to="/dashboard">Overview</NavLink>
        <NavLink to="/dashboard/users">Users</NavLink>
        {user.role === 'admin' && <NavLink to="/dashboard/settings">Settings</NavLink>}
      </nav>
      <main>
        <Outlet />  {/* las rutas hijo se renderizan aquí */}
      </main>
    </div>
  )
}

// Archivos de ruta que se renderizan dentro de este diseño:
// app/routes/dashboard._index.tsx   → /dashboard
// app/routes/dashboard.users.tsx    → /dashboard/users
// app/routes/dashboard.settings.tsx → /dashboard/settings

// El loader de diseño (requireUser) se ejecuta en CADA navegación de ruta hijo —
// sin prop drilling, cada ruta obtiene exactamente lo que necesita.
```

## Ejemplo

**Usuario:** Construye una aplicación Remix CRUD para una lista de contactos. Necesita: enumerar todos los contactos, crear nuevo, editar existente, eliminar. Autenticación está fuera de alcance.

**Implementación — cuatro archivos de ruta:**

```typescript
// app/routes/contacts._index.tsx — enumera + elimina
import { json, ActionFunctionArgs } from '@remix-run/node'
import { useLoaderData, Form, Link } from '@remix-run/react'
import { db } from '~/lib/db.server'

export async function loader() {
  const contacts = await db.contact.findMany({ orderBy: { name: 'asc' } })
  return json({ contacts })
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const intent = formData.get('intent')
  const id = formData.get('id') as string

  if (intent === 'delete') {
    await db.contact.delete({ where: { id } })
  }
  return json({ ok: true })
}

export default function ContactsList() {
  const { contacts } = useLoaderData<typeof loader>()
  return (
    <div>
      <h1>Contacts</h1>
      <Link to="new">Add contact</Link>
      <ul>
        {contacts.map((c) => (
          <li key={c.id}>
            <Link to={c.id}>{c.name}</Link> — {c.email}
            <Form method="post" style={{ display: 'inline' }}>
              <input type="hidden" name="id" value={c.id} />
              <button name="intent" value="delete" type="submit">Delete</button>
            </Form>
          </li>
        ))}
      </ul>
    </div>
  )
}

// app/routes/contacts.new.tsx — crear
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const name = formData.get('name') as string
  const email = formData.get('email') as string

  if (!name || !email) return json({ error: 'Name and email required' }, { status: 422 })

  const contact = await db.contact.create({ data: { name, email } })
  return redirect(`/contacts/${contact.id}`)
}

export default function NewContact() {
  const data = useActionData<typeof action>()
  return (
    <Form method="post">
      {data?.error && <p>{data.error}</p>}
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <button type="submit">Save</button>
    </Form>
  )
}

// app/routes/contacts.$id.tsx — ver + editar
export async function loader({ params }: LoaderFunctionArgs) {
  const contact = await db.contact.findUnique({ where: { id: params.id } })
  if (!contact) throw new Response('Not found', { status: 404 })
  return json({ contact })
}

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData()
  const name = formData.get('name') as string
  const email = formData.get('email') as string

  await db.contact.update({ where: { id: params.id }, data: { name, email } })
  return redirect(`/contacts/${params.id}`)
}

export default function ContactDetail() {
  const { contact } = useLoaderData<typeof loader>()
  const nav = useNavigation()

  return (
    <Form method="post">
      <input name="name" defaultValue={contact.name} required />
      <input name="email" type="email" defaultValue={contact.email} required />
      <button type="submit" disabled={nav.state === 'submitting'}>
        {nav.state === 'submitting' ? 'Saving...' : 'Save changes'}
      </button>
    </Form>
  )
}

export { ErrorBoundary } from '~/components/RouteErrorBoundary'
```

Esto funciona sin JavaScript habilitado (mejora progresiva). Con JS, Remix intercepta el envío de formulario, ejecuta la acción a través de `fetch`, y revalida los datos del loader — sin recarga de página completa.
