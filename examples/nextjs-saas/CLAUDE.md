# CLAUDE.md — Next.js SaaS Project

This is a full-stack SaaS application. It provides authenticated users with a dashboard, subscription billing, and a core product feature. This file tells Claude Code how to work in this codebase.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| Database | PostgreSQL via Prisma |
| Auth | NextAuth v5 (Auth.js) |
| Payments | Stripe (subscriptions + webhooks) |
| UI | shadcn/ui + Tailwind CSS |
| Deployment | Vercel |
| Email | Resend |

---

## Key Commands

```bash
npm run dev          # Start dev server (port 3000)
npm run build        # Production build
npm run lint         # ESLint
npm run type-check   # tsc --noEmit

npx prisma db push   # Push schema changes to dev DB (no migration file)
npx prisma migrate dev --name <name>   # Create a migration file
npx prisma studio    # DB GUI
npx prisma db seed   # Seed dev data

stripe listen --forward-to localhost:3000/api/webhooks/stripe  # Forward Stripe events
```

---

## Architecture

```
app/
├── (auth)/           # Login, register, forgot-password pages
├── (dashboard)/      # Authenticated area — protected by middleware
│   ├── dashboard/    # Main dashboard
│   ├── settings/     # Account + billing settings
│   └── [feature]/    # Core product pages
├── api/
│   ├── auth/         # NextAuth route handler
│   └── webhooks/
│       └── stripe/   # Stripe webhook handler
├── layout.tsx        # Root layout — SessionProvider lives here
└── page.tsx          # Marketing landing page

lib/
├── auth.ts           # NextAuth config + session helpers
├── db.ts             # Prisma client singleton
├── stripe.ts         # Stripe client singleton
└── actions/          # Server Actions (all mutations go here)

prisma/
├── schema.prisma
└── seed.ts
```

---

## Core Patterns

### Accessing the session in a Server Component
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
All database mutations go in `lib/actions/`. Never `fetch()` your own API routes for mutations from Server Components.

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

export const runtime = 'edge'  // Stripe webhook handler runs on edge
```

### Adding a database query
```ts
// lib/db.ts — Prisma singleton (important: don't instantiate in every file)
import { PrismaClient } from '@prisma/client'
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const db = globalForPrisma.prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

// Usage in Server Component:
import { db } from '@/lib/db'
const posts = await db.post.findMany({ where: { userId: session.user.id } })
```

---

## Middleware — route protection
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

## Anti-Patterns — Do NOT

- **Never `fetch('/api/...')` from a Server Component** — call the function directly or use a Server Action.
- **Never put `STRIPE_SECRET_KEY` or `NEXTAUTH_SECRET` in a `NEXT_PUBLIC_` env var** — they'd be exposed to the browser.
- **Never use `useEffect` to load initial data** — use Server Components with `await db.query()` instead.
- **Never bypass the Server Action for mutations** — all writes go through `lib/actions/` so auth is always checked.
- **Never add `'use client'` to a component just to avoid a TypeScript error** — fix the type error instead.

---

## Environment Variables

Required in `.env`:
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

## Adding a New Feature

1. Add Prisma model to `prisma/schema.prisma`, run `npx prisma migrate dev --name add-feature`
2. Create `app/(dashboard)/[feature]/page.tsx` as a Server Component
3. Create `lib/actions/[feature].ts` for mutations
4. Add nav link to `components/sidebar.tsx`
5. Protect with middleware if needed (usually covered by the `/dashboard` matcher)


---

> **Work with us:** UitKit is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products and B2B solutions with developer communities.
> [uitbreiden.com](https://uitbreiden.com/) · [Reddit](https://www.reddit.com/r/uitbreiden/) · [YouTube](https://www.youtube.com/@UITBREIDEN)
