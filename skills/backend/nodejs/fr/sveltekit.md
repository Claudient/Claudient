---
name: sveltekit
description: "SvelteKit full-stack framework : file-based routing, server et universal load functions, form actions avec progressive enhancement, hooks, route groups, adapters, et REST endpoints via +server.ts"
---

# Skill SvelteKit

## Quand l'activer
- Construire une application full-stack SvelteKit (pas seulement des composants Svelte)
- Setup de routing basé fichier avec `+page.svelte`, `+page.server.ts`, `+layout.svelte`
- Écriture des server load functions ou universal load functions
- Implémentation d'actions de form (défaut ou nommées) avec `use:enhance`
- Écriture de `hooks.server.ts` (`handle`, `handleFetch`, `handleError`)
- Création d'endpoints REST via `+server.ts`
- Protection de routes avec route groups comme `(auth)`
- Choix et configuration d'un adapter (Vercel, Cloudflare, Node)
- Utilisation de `$app/stores` (`page`, `navigating`, `updated`)

## Quand NE PAS l'utiliser
- Les questions pures de composant Svelte sans routing ou contexte serveur SvelteKit — utilisez la skill `svelte`
- Les projets React ou Next.js — utilisez la skill `nextjs`
- Sites statiques sans data needs serveur — utilisez Astro
- Les projets où la team est committed à React et le switching n'est pas une option

## Instructions

### Setup du projet

```bash
npm create svelte@latest my-app
# Choisissez: SvelteKit app (pas library)
# TypeScript: Yes
# ESLint + Prettier: Yes
cd my-app && npm install && npm run dev
```

### Structure de routing basée fichier

```
src/
├── routes/
│   ├── +layout.svelte          # root layout — enveloppe toutes les pages
│   ├── +layout.server.ts       # root server load — s'exécute sur chaque requête
│   ├── +page.svelte            # / (accueil)
│   ├── +page.server.ts         # server load + actions pour /
│   ├── (auth)/                 # route group — pas de segment URL ajouté
│   │   ├── +layout.server.ts   # guard: redirect si non connecté
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
│           └── +server.ts      # endpoint REST — pas une page
├── lib/
│   ├── components/
│   ├── server/                 # imports serveur-seulement (jamais envoyé au client)
│   │   ├── db.ts
│   │   └── auth.ts
│   └── utils.ts
└── hooks.server.ts             # global server middleware
```

### Load functions : server vs universal

```typescript
// +page.server.ts — SERVER LOAD
// S'exécute seulement sur le serveur. Peut accéder à DB, secrets, cookies.
// La valeur retournée est sérialisée et envoyée à la page.
import type { PageServerLoad } from './$types'
import { error } from '@sveltejs/kit'

export const load: PageServerLoad = async ({ params, locals, cookies }) => {
  if (!locals.user) error(401, 'Not authenticated')

  const post = await db.post.findUnique({ where: { slug: params.slug } })
  if (!post) error(404, 'Post not found')

  return { post }   // seulement data sérializable — pas instances de classe, pas functions
}
```

```typescript
// +page.ts — UNIVERSAL LOAD
// S'exécute sur le serveur (requête initiale) ET client (navigation).
// Ne peut pas accéder à DB ou secrets directement — doit appeler une API.
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch, params }) => {
  const res = await fetch(`/api/posts/${params.slug}`)
  if (!res.ok) throw new Error('Post not found')
  return { post: await res.json() }
}
```

Règle : utilisez `+page.server.ts` quand vous avez besoin de DB ou auth. Utilisez `+page.ts` seulement quand vous avez une API publique et avez besoin de re-fetching côté client sur navigation.

```svelte
<!-- +page.svelte — consuming load data -->
<script lang="ts">
  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()
</script>

<h1>{data.post.title}</h1>
<p>{data.post.body}</p>
```

Continuez avec les sections : Form actions, Hooks, Route groups, REST endpoints — chacune traduite comme ci-dessus.
