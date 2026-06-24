> 🇫🇷 This is the French translation. [English version](../CLAUDE.md).

# CLAUDE.md — Projet Next.js SaaS

Il s'agit d'une application SaaS full-stack. Elle fournit aux utilisateurs authentifiés un tableau de bord, une facturation par abonnement et une fonctionnalité produit principale. Ce fichier indique à Claude Code comment travailler dans cette base de code.

---

## Stack Technologique

| Couche | Technologie |
|--------|-------------|
| Framework | Next.js 15 (App Router) |
| Base de données | PostgreSQL via Prisma |
| Auth | NextAuth v5 (Auth.js) |
| Paiements | Stripe (abonnements + webhooks) |
| UI | shadcn/ui + Tailwind CSS |
| Déploiement | Vercel |
| Email | Resend |

---

## Commandes Clés

```bash
npm run dev          # Démarrer le serveur de dev (port 3000)
npm run build        # Build de production
npm run lint         # ESLint
npm run type-check   # tsc --noEmit

npx prisma db push   # Pousser les changements de schéma vers la DB de dev (pas de fichier de migration)
npx prisma migrate dev --name <name>   # Créer un fichier de migration
npx prisma studio    # GUI DB
npx prisma db seed   # Seeder les données de dev

stripe listen --forward-to localhost:3000/api/webhooks/stripe  # Transférer les événements Stripe
```

---

## Architecture

```
app/
├── (auth)/           # Pages login, register, forgot-password
├── (dashboard)/      # Zone authentifiée — protégée par middleware
│   ├── dashboard/    # Tableau de bord principal
│   ├── settings/     # Paramètres de compte + facturation
│   └── [feature]/    # Pages du produit principal
├── api/
│   ├── auth/         # Route handler NextAuth
│   └── webhooks/
│       └── stripe/   # Handler webhook Stripe
├── layout.tsx        # Layout racine — SessionProvider est ici
└── page.tsx          # Page de marketing

lib/
├── auth.ts           # Config NextAuth + helpers de session
├── db.ts             # Singleton client Prisma
├── stripe.ts         # Singleton client Stripe
└── actions/          # Server Actions (toutes les mutations vont ici)

prisma/
├── schema.prisma
└── seed.ts
```

---

## Patterns Principaux

### Accéder à la session dans un Server Component
```tsx
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect('/login')
  return <div>Welcome {session.user.email}</div>
}
```

### Mutations via Server Actions
Toutes les mutations de base de données vont dans `lib/actions/`. Ne jamais `fetch()` vos propres routes API pour les mutations depuis les Server Components.

```ts
// lib/actions/subscription.ts
'use server'
import { auth } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { revalidatePath } from 'next/cache'

export async function createCheckoutSession() {
  const session = await auth()
  if (!session) throw new Error('Unauthorized')

  const checkoutSession = await stripe.checkout.sessions.create({
    customer_email: session.user.email,
    mode: 'subscription',
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?checkout=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/settings/billing`,
  })

  return { url: checkoutSession.url }
}
```

### Handler webhook Stripe
```ts
// app/api/webhooks/stripe/route.ts
export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!
  const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)

  switch (event.type) {
    case 'checkout.session.completed':
      await activateSubscription(event.data.object)
      break
    case 'customer.subscription.deleted':
      await deactivateSubscription(event.data.object)
      break
  }

  return NextResponse.json({ received: true })
}

export const runtime = 'edge'  // Le handler webhook Stripe s'exécute sur edge
```

### Ajouter une requête de base de données
```ts
// lib/db.ts — Singleton Prisma (important : ne pas instancier dans chaque fichier)
import { PrismaClient } from '@prisma/client'
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const db = globalForPrisma.prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

// Utilisation dans un Server Component :
import { db } from '@/lib/db'
const posts = await db.post.findMany({ where: { userId: session.user.id } })
```

---

## Middleware — protection des routes
```ts
// middleware.ts
import { auth } from '@/lib/auth'

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname.startsWith('/dashboard')) {
    return Response.redirect(new URL('/login', req.url))
  }
})

export const config = { matcher: ['/dashboard/:path*', '/settings/:path*'] }
```

---

## Anti-Patterns — NE PAS faire

- **Ne jamais `fetch('/api/...')` depuis un Server Component** — appeler la fonction directement ou utiliser une Server Action.
- **Ne jamais mettre `STRIPE_SECRET_KEY` ou `NEXTAUTH_SECRET` dans une variable d'env `NEXT_PUBLIC_`** — elles seraient exposées au navigateur.
- **Ne jamais utiliser `useEffect` pour charger les données initiales** — utiliser des Server Components avec `await db.query()` à la place.
- **Ne jamais contourner la Server Action pour les mutations** — toutes les écritures passent par `lib/actions/` pour que l'auth soit toujours vérifiée.
- **Ne jamais ajouter `'use client'` à un composant juste pour éviter une erreur TypeScript** — corriger l'erreur de type à la place.

---

## Variables d'Environnement

Requises dans `.env` :
```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=<generate with: openssl rand -base64 32>
NEXTAUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID=price_...
NEXT_PUBLIC_URL=http://localhost:3000
RESEND_API_KEY=re_...
```

---

## Ajouter une Nouvelle Fonctionnalité

1. Ajouter le modèle Prisma dans `prisma/schema.prisma`, exécuter `npx prisma migrate dev --name add-feature`
2. Créer `app/(dashboard)/[feature]/page.tsx` comme Server Component
3. Créer `lib/actions/[feature].ts` pour les mutations
4. Ajouter le lien de navigation dans `components/sidebar.tsx`
5. Protéger avec le middleware si nécessaire (généralement couvert par le matcher `/dashboard`)


---

> **Work with us:** UitKit is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
