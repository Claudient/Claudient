---
name: sveltekit
description: "SvelteKit Full-Stack Framework: File-basiert Routing, Server und Universal Load Funktionen, Form Actions mit Progressive Enhancement, Hooks, Route Groups, Adapters und REST Endpoints via +server.ts"
---

# SvelteKit-Skill

## Wann zu Aktivieren
- Bau einer Full-Stack SvelteKit-Anwendung (nicht nur Svelte Komponenten)
- Setup File-basierter Routing mit `+page.svelte`, `+page.server.ts`, `+layout.svelte`
- Schreiben von Server Load Funktionen oder Universal Load Funktionen
- Implementierung von Form Actions (default oder named) mit `use:enhance`
- Schreiben von `hooks.server.ts` (`handle`, `handleFetch`, `handleError`)
- Erstellen von REST Endpoints via `+server.ts`
- Schutz von Routes mit Route Groups wie `(auth)`
- Wählen und konfigurieren eines Adapters (Vercel, Cloudflare, Node)

## Wann NICHT zu Nutzen
- Reine Svelte Komponenten-Fragen ohne SvelteKit Routing oder Server Context — nutze Svelte Skill
- React oder Next.js Projekte — nutze Nextjs Skill
- Statische Sites ohne Server-seitige Daten-Anforderungen — nutze Astro
- Teams, die zu React committed sind und nicht Switching

## Instruktionen

### Projekt-Setup

```bash
npm create svelte@latest my-app
# Wähle: SvelteKit App (nicht Library)
# TypeScript: Ja
# ESLint + Prettier: Ja
cd my-app && npm install && npm run dev
```

### File-basiertes Routing Struktur

```
src/
├── routes/
│   ├── +layout.svelte          # Root Layout — Wraps alle Pages
│   ├── +layout.server.ts       # Root Server Load — Laufe auf jedem Request
│   ├── +page.svelte            # / (Home)
│   ├── +page.server.ts         # Server Load + Actions für /
│   ├── (auth)/                 # Route Group — keine URL Segment
│   │   ├── +layout.server.ts   # Guard: Redirect wenn nicht eingeloggt
│   │   ├── dashboard/
│   │   │   └── +page.svelte
│   │   └── settings/
│   │       └── +page.svelte
│   ├── blog/
│   │   ├── +page.svelte        # /blog
│   │   └── [slug]/
│   │       ├── +page.svelte    # /blog/[slug]
│   │       └── +page.server.ts
│   └── api/
│       └── users/
│           └── +server.ts      # REST Endpoint — nicht eine Page
├── lib/
│   ├── components/
│   ├── server/                 # Server-Only Imports (nie an Client)
│   │   ├── db.ts
│   │   └── auth.ts
│   └── utils.ts
└── hooks.server.ts             # Global Server Middleware
```

### Load Funktionen: Server vs Universal

```typescript
// +page.server.ts — SERVER LOAD
// Laufe nur auf Server. Kann DB, Secrets, Cookies zugreifen.
// Rückgabe-Wert wird serialisiert und zur Page gesendet.
import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ params, locals, cookies }) => {
  if (!locals.user) error(401, 'Nicht authentifiziert')

  const post = await db.post.findUnique({ where: { slug: params.slug } })
  if (!post) error(404, 'Post nicht gefunden')

  return { post }   // Nur serialisierbar Daten
}
```

```typescript
// +page.ts — UNIVERSAL LOAD
// Laufe auf Server (initial Request) UND Client (Navigation).
// Kann nicht direkt DB oder Secrets zugreifen — muss einen API rufen.
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch, params }) => {
  const res = await fetch(`/api/posts/${params.slug}`)
  if (!res.ok) throw new Error('Post nicht gefunden')
  return { post: await res.json() }
}
```

Regel: Nutze `+page.server.ts`, wenn du DB oder Auth brauchst. Nutze `+page.ts`, nur wenn du einen Öffentlich API hast und Client-Seitig Re-Fetching auf Navigation brauchst.

### Form Actions

```typescript
// src/routes/posts/new/+page.server.ts
import type { Actions, PageServerLoad } from './$types'
import { fail, redirect } from '@sveltejs/kit'
import { z } from 'zod'

const PostSchema = z.object({
  title: z.string().min(1).max(200),
  body: z.string().min(10),
})

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) redirect(303, '/login')
  return {}
}

export const actions: Actions = {
  // Default Action — genannt, wenn Form keine `action` Attribut hat
  default: async ({ request, locals }) => {
    if (!locals.user) return fail(401, { message: 'Nicht authentifiziert' })

    const data = Object.fromEntries(await request.formData())
    const parsed = PostSchema.safeParse(data)

    if (!parsed.success) {
      return fail(422, {
        errors: parsed.error.flatten().fieldErrors,
        values: data,
      })
    }

    const post = await db.post.create({
      data: { ...parsed.data, authorId: locals.user.id },
    })

    redirect(303, `/blog/${post.slug}`)
  },
}
```

```svelte
<!-- src/routes/posts/new/+page.svelte -->
<script lang="ts">
  import { enhance } from '$app/forms'
  let { form } = $props()
</script>

<form method="POST" use:enhance>
  <label>
    Titel
    <input name="title" value={form?.values?.title ?? ''} />
    {#if form?.errors?.title}
      <span class="error">{form.errors.title[0]}</span>
    {/if}
  </label>
  <button type="submit">Publish</button>
</form>
```

`use:enhance` Intercept die Form-Submit, handhabt Response via JavaScript, und aktualisiert `form` Prop — keine Volle Page-Reload. Fallback zu Native Form-Submission, wenn JS nicht verfügbar ist.

### Hooks: hooks.server.ts

```typescript
// src/hooks.server.ts
import type { Handle, HandleFetch, HandleServerError } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks'

const authHandle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get('session')

  if (token) {
    const user = await validateSession(token)
    event.locals.user = user ?? null
  } else {
    event.locals.user = null
  }

  return resolve(event)
}

export const handle = sequence(authHandle)

export const handleFetch: HandleFetch = async ({ request, fetch }) => {
  // Attach Auth zu Outgoing Server-Seitig Fetch Calls
  request.headers.set('Authorization', `Bearer ${process.env.INTERNAL_API_KEY}`)
  return fetch(request)
}
```

Erkläre `App.Locals` in `src/app.d.ts`:

```typescript
declare global {
  namespace App {
    interface Locals {
      user: { id: string; email: string; role: string } | null
    }
  }
}
```

### Route Groups: (auth) Geschützt Routes

```typescript
// src/routes/(auth)/+layout.server.ts
// Jede Route innen (auth)/ erbt dieser Guard
import type { LayoutServerLoad } from './$types'
import { redirect } from '@sveltejs/kit'

export const load: LayoutServerLoad = async ({ locals }) => {
  if (!locals.user) redirect(303, '/login')
  return { user: locals.user }
}
```

Der `(auth)` Ordner-Name erscheint nicht in der URL. `/dashboard`, `/settings` und `/profile` sind alle geschützt ohne Per-Page Boilerplate.

### REST Endpoints: +server.ts

```typescript
// src/routes/api/users/+server.ts
import type { RequestHandler } from './$types'
import { json, error } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ url, locals }) => {
  if (!locals.user) error(401, 'Unauthorized')

  const page = Number(url.searchParams.get('page') ?? 1)
  const users = await db.user.findMany({ skip: (page - 1) * 20, take: 20 })
  return json({ users, page })
}

export const POST: RequestHandler = async ({ request, locals }) => {
  if (locals.user?.role !== 'admin') error(403, 'Forbidden')

  const body = await request.json()
  const user = await db.user.create({ data: body })
  return json(user, { status: 201 })
}
```

### SvelteKit Stores ($app/stores)

```svelte
<script lang="ts">
  import { page, navigating, updated } from '$app/stores'

  $: currentPath = $page.url.pathname
  $: user = $page.data.user          // Daten vom Root Layout Load
  $: isLoading = $navigating !== null

  // updated — true wenn eine neue App Version deployed ist
  // Poll: updated.check() — gibt True, wenn neue Version existiert
</script>

{#if $navigating}
  <div class="progress-bar" />
{/if}

<nav>
  <a href="/" class:active={currentPath === '/'}>Home</a>
  {#if $page.data.user}
    <a href="/dashboard">Dashboard</a>
  {:else}
    <a href="/login">Login</a>
  {/if}
</nav>
```

### Adapters

```bash
# Vercel (Auto-Detect SvelteKit Projekte)
npm install -D @sveltejs/adapter-vercel

# Cloudflare Pages
npm install -D @sveltejs/adapter-cloudflare

# Node.js (Self-Hosted, Docker)
npm install -D @sveltejs/adapter-node
```

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-vercel'    // Swap wie erforderlich
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter(),
    // Vercel: Zero Config
    // Cloudflare: adapter({ routes: { include: ['/*'], exclude: ['<all>'] } })
    // Node: adapter({ out: 'build' }) — Dann `node build`
  },
}
```

## Beispiel

Build authentifiziertes Blog CRUD App in SvelteKit. Nutzer müssen eingeloggt sein, um Posts zu erstellen oder zu editieren. Die Post-Liste ist öffentlich. Nutze Form Actions mit Validierung, nicht Client-Seitig Fetch.

Erwartet Output:
- `src/hooks.server.ts` — liest Session Cookie, setzt `locals.user`
- `src/app.d.ts` — erklärt `App.Locals` mit `user` Typ
- `src/routes/(auth)/+layout.server.ts` — Redirect Unauthenticated Nutzer zu `/login`
- `src/routes/login/+page.server.ts` — Default Action: Verify Credentials, Setze Cookie, Redirect
- `src/routes/blog/+page.server.ts` — Server Load Gibt alle publizierten Posts (öffentlich)
- `src/routes/(auth)/blog/new/+page.server.ts` — Load (Auth Guard geerbt), `default` Action mit Zod Validierung + `fail()`, Auf Erfolg `redirect(303, '/blog')`
- `svelte.config.js` — adapter-vercel (oder adapter-node für Docker)
