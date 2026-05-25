---
name: remix
description: "Remix Full-Stack React: File-basiert Routing, Loaders, Actions, Progressive Enhancement, Session-Management, Resource-Routes, Error Boundaries und Production-Deployment-Patterns"
---

# Remix-Skill

## Wann zu Aktivieren
- Bau oder Erweiterung einer Remix-Anwendung
- Implementierung von Data-Fetching mit Loaders oder Mutations mit Actions
- Setup Session-basierter Auth, Cookie-Management oder Form-Handling in Remix
- Wiring von Resource-Routes für APIs oder Webhooks
- Jegliche Aufgabe, die `useLoaderData`, `useActionData`, `Form`, `redirect` oder `@remix-run/*` referenziert

## Wann NICHT zu Nutzen
- Der Nutzer möchte Pure React SPA ohne Server-Side Rendering — nutze React Skill
- Der Nutzer ist auf Next.js — nutze Nextjs Skill
- Server-Only API (keine UI) — nutze Express oder Fastify Skill

## Instruktionen

### Projekt-Setup und Struktur

```
Setup Production-Ready Remix 2.x Projekt mit TypeScript und Vite.

Runtime: [Node.js / Cloudflare Pages / Fly.io]
Auth: [Session Cookie / Keine]
Datenbank: [Prisma + PostgreSQL / Drizzle / Keine]
Styling: [Tailwind / Plain CSS]

Verzeichnis-Struktur:
app/
  root.tsx              ← Root Layout, Global Error Boundary, Meta
  entry.client.tsx      ← Browser Hydration (selten editiert)
  entry.server.tsx      ← Server Rendering (selten editiert)
  routes/
    _index.tsx          ← Rendert bei /
    dashboard.tsx       ← Layout Route
    dashboard._index.tsx← Rendert bei /dashboard (Index Child)
    users.$id.tsx       ← Rendert bei /users/:id
    api.webhook.tsx     ← Resource Route bei /api/webhook (keine UI Export)
  lib/
    session.server.ts   ← Cookie Session Factory (Server-Only)
    db.server.ts        ← Prisma/Drizzle Client Singleton
    auth.server.ts      ← Login/Logout Helpers
  components/
    ui/                 ← Shared Presentational Components
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

### Loaders — Server Data-Fetching

```
Implementiere einen Loader für [Route], der [Daten] fetcht und Auth/Errors handhabt.

Loaders laufen Server-seitig auf jedem GET-Request (Navigation + Datenbeschaffung).
Sie laufen nie im Browser. Gib alles Serialisierbar zurück.

// app/routes/users.$id.tsx
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { requireUser } from '~/lib/auth.server'
import { db } from '~/lib/db.server'

export async function loader({ request, params }: LoaderFunctionArgs) {
  // Auth Gate — Wirft Redirect zu /Login, wenn keine Session
  const currentUser = await requireUser(request)

  const user = await db.user.findUnique({ where: { id: params.id } })

  // Werfe Response, um den Nächsten ErrorBoundary zu triggern
  if (!user) throw new Response('Nicht gefunden', { status: 404 })

  // Authorization Check
  if (currentUser.role !== 'admin' && currentUser.id !== user.id) {
    throw new Response('Forbidden', { status: 403 })
  }

  // Serialisiere — Daten werden zu Strings, pass nie Class Instanzen
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
  // Vollständig getyptet — TypeScript ableiten vom Loader Rückgabe
  const { user, isOwner } = useLoaderData<typeof loader>()
  return <article>
    <h1>{user.name}</h1>
    {isOwner && <a href="/settings">Edit Profil</a>}
  </article>
}
```

### Actions — Mutations und Form-Handling

```
Implementiere eine Action für [Route], die [Erstelle / Update / Delete] mit Validierung handhabt.

Actions laufen Server-seitig auf POST/PUT/PATCH/DELETE. Sie sind die einzige Weise,
Daten in Remix zu mutieren. Gib json() mit Errors oder redirect() Erfolg zurück.

// app/routes/users.new.tsx
import { json, redirect, ActionFunctionArgs } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import { z } from 'zod'

const CreateUserSchema = z.object({
  name: z.string().min(1, 'Name erforderlich').max(100),
  email: z.string().email('Ungültig Email'),
  role: z.enum(['admin', 'user']),
})

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const raw = Object.fromEntries(formData)

  const result = CreateUserSchema.safeParse(raw)
  if (!result.success) {
    return json(
      { errors: result.error.flatten().fieldErrors, values: raw },
      { status: 422 }
    )
  }

  const user = await db.user.create({ data: result.data })
  return redirect(`/users/${user.id}`)
}

export default function NewUser() {
  const data = useActionData<typeof action>()
  
  return (
    <Form method="post">
      <input name="name" defaultValue={data?.values?.name} />
      {data?.errors?.name && <p>{data.errors.name[0]}</p>}
      {/* ... weitere Felder ... */}
      <button type="submit">Erstellen</button>
    </Form>
  )
}
```

### Session-Management und Authentication

```
Implementiere Cookie-basiertes Session Auth in Remix.

// app/lib/session.server.ts
import { createCookieSessionStorage, redirect } from '@remix-run/node'

type SessionData = { userId: string; role: string }

const { getSession, commitSession, destroySession } = createCookieSessionStorage<SessionData>({
  cookie: {
    name: '__session',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,  // 30 Tage
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET!],
    secure: process.env.NODE_ENV === 'production',
  },
})

export { getSession, commitSession, destroySession }

// app/lib/auth.server.ts
import { getSession, commitSession } from './session.server'
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
```

### Resource-Routes

```
Erstelle eine Resource-Route für [Webhook / API-Endpoint / File-Download].

Resource-Routes haben keine Default Export (keine UI). Sie antwortem mit beliebigen Response Objekten.

// app/routes/api.webhook.stripe.ts
import { ActionFunctionArgs } from '@remix-run/node'
import Stripe from 'stripe'

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const sig = request.headers.get('stripe-signature')!
  const body = await request.text()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return new Response('Webhook Signatur ungültig', { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutComplete(event.data.object)
      break
  }

  return new Response('ok', { status: 200 })
}
```

### Error-Boundaries

```
Füge Error-Boundaries auf Route-Level für [Route] hinzu.

// Route-Level Error-Boundary — erfasst Loader/Action Errors nur für diese Route
export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div className="error-container">
        <h1>{error.status} {error.statusText}</h1>
        <p>{error.data}</p>
        <a href="/">Geh nach Hause</a>
      </div>
    )
  }

  const message = error instanceof Error ? error.message : 'Unbekannter Fehler'
  return (
    <div className="error-container">
      <h1>Etwas ist schiefgelaufen</h1>
      <p>{message}</p>
    </div>
  )
}

// app/root.tsx — erfasst alles nicht erfasst von einer Route-Boundary
export function ErrorBoundary() {
  const error = useRouteError()
  return (
    <html lang="de">
      <head><title>Fehler</title></head>
      <body>
        <h1>Anwendung Fehler</h1>
        {isRouteErrorResponse(error) ? (
          <p>{error.status}: {error.data}</p>
        ) : (
          <p>Ein unerwarteter Fehler ist aufgetreten</p>
        )}
      </body>
    </html>
  )
}
```

## Beispiel

User baut eine Kontakt-Liste CRUD-App in Remix. Benötigt: Liste alle, Erstelle neue, Editiere bestehend, Lösche. Auth ist Out-of-Scope.

Implementierung — vier Route-Dateien + Loaders + Actions + Error Boundaries.

Funktioniert ohne JavaScript aktiviert (Progressive Enhancement). Mit JS, Remix intercept die Form-Submit, laufe die Action via `fetch`, und revalidiere die Loader-Daten — keine Volle Page-Reload.
