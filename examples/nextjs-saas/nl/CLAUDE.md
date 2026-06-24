> 🇳🇱 Dit is de Nederlandse vertaling. [Engelse versie](../CLAUDE.md).

# CLAUDE.md — Next.js SaaS Project

Dit is een full-stack SaaS-applicatie. Het biedt geauthenticeerde gebruikers een dashboard, abonnementsfacturering en een kernproductfunctie. Dit bestand vertelt Claude Code hoe te werken in deze codebase.

---

## Tech Stack

| Laag | Technologie |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Database | PostgreSQL via Prisma |
| Auth | NextAuth v5 (Auth.js) |
| Betalingen | Stripe (abonnementen + webhooks) |
| UI | shadcn/ui + Tailwind CSS |
| Deployment | Vercel |
| E-mail | Resend |

---

## Sleutelcommando's

```bash
npm run dev          # Start dev-server (poort 3000)
npm run build        # Productiebuild
npm run lint         # ESLint
npm run type-check   # tsc --noEmit

npx prisma db push   # Schema-wijzigingen naar dev-DB pushen (geen migratiebestand)
npx prisma migrate dev --name <name>   # Een migratiebestand aanmaken
npx prisma studio    # DB GUI
npx prisma db seed   # Dev-data seeden

stripe listen --forward-to localhost:3000/api/webhooks/stripe  # Stripe-events doorsturen
```

---

## Architectuur

```
app/
├── (auth)/           # Login-, registratie-, wachtwoord-vergeten-pagina's
├── (dashboard)/      # Geauthenticeerd gebied — beveiligd door middleware
│   ├── dashboard/    # Hoofddashboard
│   ├── settings/     # Account- en factureringsinstellingen
│   └── [feature]/    # Kernproductpagina's
├── api/
│   ├── auth/         # NextAuth route handler
│   └── webhooks/
│       └── stripe/   # Stripe webhook handler
├── layout.tsx        # Root layout — SessionProvider leeft hier
└── page.tsx          # Marketing-landingspagina

lib/
├── auth.ts           # NextAuth-configuratie + sessiehulpers
├── db.ts             # Prisma client singleton
├── stripe.ts         # Stripe client singleton
└── actions/          # Server Actions (alle mutaties gaan hier)

prisma/
├── schema.prisma
└── seed.ts
```

---

## Kernpatronen

### De sessie benaderen in een Server Component
```tsx
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await auth()
  if (!session) redirect('/login')
  return <div>Welkom {session.user.email}</div>
}
```

### Mutaties via Server Actions
Alle databasemutaties gaan in `lib/actions/`. Nooit `fetch()` je eigen API-routes voor mutaties vanuit Server Components.

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

### Stripe webhook handler
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

export const runtime = 'edge'  // Stripe webhook handler draait op edge
```

### Een databasequery toevoegen
```ts
// lib/db.ts — Prisma singleton (belangrijk: instantieer niet in elk bestand)
import { PrismaClient } from '@prisma/client'
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const db = globalForPrisma.prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

// Gebruik in Server Component:
import { db } from '@/lib/db'
const posts = await db.post.findMany({ where: { userId: session.user.id } })
```

---

## Middleware — routebeveiliging
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

## Antipatronen — NIET doen

- **Nooit `fetch('/api/...')` vanuit een Server Component** — roep de functie direct aan of gebruik een Server Action.
- **Nooit `STRIPE_SECRET_KEY` of `NEXTAUTH_SECRET` in een `NEXT_PUBLIC_`-omgevingsvariabele** — ze zouden blootgesteld worden aan de browser.
- **Nooit `useEffect` gebruiken om initiële data te laden** — gebruik Server Components met `await db.query()` in plaats daarvan.
- **Nooit de Server Action omzeilen voor mutaties** — alle schrijfacties gaan via `lib/actions/` zodat auth altijd wordt gecontroleerd.
- **Nooit `'use client'` toevoegen aan een component alleen om een TypeScript-fout te vermijden** — herstel de typefout in plaats daarvan.

---

## Omgevingsvariabelen

Vereist in `.env`:
```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=<genereer met: openssl rand -base64 32>
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

## Een nieuwe feature toevoegen

1. Voeg Prisma-model toe aan `prisma/schema.prisma`, voer `npx prisma migrate dev --name add-feature` uit
2. Maak `app/(dashboard)/[feature]/page.tsx` aan als Server Component
3. Maak `lib/actions/[feature].ts` aan voor mutaties
4. Voeg nav-link toe aan `components/sidebar.tsx`
5. Beveilig met middleware indien nodig (meestal gedekt door de `/dashboard`-matcher)


---

> **Work with us:** UitKit is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
