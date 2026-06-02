# Application Web SaaS — Structure de projet

> Pour une équipe d'ingénierie full-stack SaaS qui livre des fonctionnalités sur un monorepo Next.js 14 + Supabase + Stripe, en optimisant le flux de travail du cahier des charges à la production.

## Stack

- **Framework :** Next.js 14 (App Router, Server Components, Server Actions)
- **Langage :** TypeScript 5.4+
- **Monorepo :** Turborepo 2.x avec les workspaces pnpm
- **Gestionnaire de paquets :** pnpm 9+
- **Auth + Base de données :** Supabase (PostgreSQL 15, authentification GoTrue, Row Level Security)
- **ORM :** Drizzle ORM 0.30+ avec `drizzle-kit` pour les migrations
- **Facturation :** Stripe 14+ (Abonnements, Portail client, webhooks)
- **Déploiement :** Vercel (application web), Supabase Cloud (base de données + auth)
- **Styles :** Tailwind CSS 3.4 + shadcn/ui (primitives Radix UI)
- **Email :** React Email + Resend
- **Tests unitaires :** Vitest 1.x
- **Tests E2E :** Playwright 1.44+
- **CI/CD :** GitHub Actions (`ci.yml`, `preview.yml`, `release.yml`)
- **Supabase local :** Docker Compose (supabase/docker)

## Arborescence

```
saas-web-app/                             # Racine du monorepo Turborepo
├── .claude/
│   ├── CLAUDE.md                         # Instructions Claude Code au niveau du dépôt
│   ├── settings.json                     # Serveurs MCP, hooks, permissions
│   └── commands/
│       ├── new-feature.md                # /new-feature — spec → UI → route → migration → test
│       ├── add-migration.md              # /add-migration — changement de schéma Drizzle + migration SQL
│       ├── stripe-webhook.md             # /stripe-webhook — scaffold d'un nouveau gestionnaire d'événements Stripe
│       ├── rls-policy.md                 # /rls-policy — génération de politique RLS pour une nouvelle table
│       └── env-audit.md                  # /env-audit — diff entre .env.example et les variables d'env réelles
├── .github/
│   └── workflows/
│       ├── ci.yml                        # Vérification des types, lint, tests unitaires sur chaque PR
│       ├── preview.yml                   # Déploiement de preview Vercel + tests Playwright de fumée
│       └── release.yml                   # Déploiement en production déclenché par un tag semver
├── apps/
│   └── web/                              # Application Next.js 14
│       ├── app/                          # Racine de l'App Router
│       │   ├── (auth)/                   # Groupe de routes — pas de layout shell persistant
│       │   │   ├── login/
│       │   │   │   └── page.tsx          # Page de connexion avec magic link / OAuth Supabase
│       │   │   ├── signup/
│       │   │   │   └── page.tsx
│       │   │   └── callback/
│       │   │       └── route.ts          # Gestionnaire du callback d'authentification Supabase
│       │   ├── (app)/                    # Groupe de routes — shell applicatif authentifié
│       │   │   ├── layout.tsx            # Shell avec barre latérale + navigation haute, lit la session côté serveur
│       │   │   ├── dashboard/
│       │   │   │   └── page.tsx
│       │   │   ├── settings/
│       │   │   │   ├── page.tsx          # Paramètres du profil utilisateur
│       │   │   │   └── billing/
│       │   │   │       └── page.tsx      # Redirection vers le Portail client Stripe
│       │   │   └── [feature]/            # Route spécifique à une fonctionnalité — ajoutez les nouvelles fonctionnalités ici
│       │   │       ├── page.tsx
│       │   │       └── actions.ts        # Server Actions pour cette fonctionnalité
│       │   ├── api/
│       │   │   ├── webhooks/
│       │   │   │   └── stripe/
│       │   │   │       └── route.ts      # Récepteur de webhook Stripe (corps brut, vérification de signature)
│       │   │   └── health/
│       │   │       └── route.ts          # Vérification de disponibilité — retourne 200 + ping DB
│       │   ├── layout.tsx                # Layout racine : polices, ThemeProvider, Toaster
│       │   └── globals.css               # Directives Tailwind + propriétés CSS personnalisées
│       ├── components/
│       │   ├── ui/                       # Composants générés par shadcn/ui (ne pas modifier manuellement)
│       │   │   ├── button.tsx
│       │   │   ├── dialog.tsx
│       │   │   ├── form.tsx
│       │   │   └── table.tsx
│       │   ├── features/                 # Composants composites spécifiques aux fonctionnalités
│       │   │   └── billing/
│       │   │       ├── PricingTable.tsx
│       │   │       └── SubscriptionBadge.tsx
│       │   └── layout/
│       │       ├── Sidebar.tsx
│       │       └── TopNav.tsx
│       ├── lib/
│       │   ├── supabase/
│       │   │   ├── client.ts             # Client Supabase navigateur (singleton)
│       │   │   ├── server.ts             # Client Supabase serveur (basé sur les cookies)
│       │   │   └── middleware.ts         # Ré-export pour l'import dans middleware.ts
│       │   ├── stripe/
│       │   │   ├── client.ts             # Instance du SDK Stripe
│       │   │   ├── plans.ts              # IDs de plans, IDs de prix par environnement
│       │   │   └── webhooks.ts           # constructEvent + gestionnaires d'événements typés
│       │   ├── db/
│       │   │   └── index.ts              # Instance Drizzle db (ré-export depuis packages/database)
│       │   └── utils.ts                  # cn(), formatCurrency(), absoluteUrl()
│       ├── middleware.ts                  # Garde d'authentification : protège les routes (app), rafraîchit la session
│       ├── next.config.ts                # Domaines d'images, validation des variables d'env, redirections
│       ├── tailwind.config.ts            # Étend la configuration Tailwind partagée
│       ├── tsconfig.json                 # Étend le tsconfig racine, alias de chemins (@/)
│       └── package.json
├── packages/
│   ├── database/                         # Schéma Drizzle, migrations, seed
│   │   ├── src/
│   │   │   ├── schema/
│   │   │   │   ├── users.ts              # Table users — miroir de auth.users via trigger
│   │   │   │   ├── subscriptions.ts      # État des abonnements Stripe par utilisateur/org
│   │   │   │   ├── organizations.ts      # Modèle Org pour les fonctionnalités multi-tenant
│   │   │   │   └── index.ts              # Ré-exporte toutes les tables du schéma
│   │   │   ├── db.ts                     # Instance Drizzle : postgres() + drizzle(schema)
│   │   │   └── index.ts                  # Point d'entrée public du paquet
│   │   ├── migrations/
│   │   │   ├── 0001_create_users.sql
│   │   │   ├── 0002_create_subscriptions.sql
│   │   │   └── meta/
│   │   │       └── _journal.json         # Journal de migration Drizzle (ne pas modifier manuellement)
│   │   ├── drizzle.config.ts             # URL de la DB depuis env, out: ./migrations, schema: ./src/schema
│   │   ├── tsconfig.json
│   │   └── package.json
│   ├── emails/                           # Templates React Email
│   │   ├── src/
│   │   │   ├── WelcomeEmail.tsx          # Envoyé à l'inscription
│   │   │   ├── TrialEndingEmail.tsx      # Envoyé 7 jours avant l'expiration de l'essai
│   │   │   └── InvoicePaidEmail.tsx      # Envoyé lors d'un invoice.payment_succeeded Stripe
│   │   ├── emails/                       # Répertoire de prévisualisation dev (react-email dev)
│   │   └── package.json
│   └── ui/                              # Bibliothèque de composants React partagés
│       ├── src/
│       │   ├── components/
│       │   │   └── Logo.tsx
│       │   └── index.ts
│       ├── tailwind.config.ts            # Configuration Tailwind de base — étendue par les applications
│       └── package.json
├── supabase/                             # Configuration du projet Supabase
│   ├── migrations/                       # Migrations SQL Supabase (triggers d'auth, politiques RLS)
│   │   ├── 20240101000000_init.sql       # Initialisation du schéma de départ
│   │   └── 20240215000000_rls_policies.sql
│   ├── seed.sql                          # Données de dev local : utilisateurs de test, plans, orgs
│   └── config.toml                       # Configuration du projet Supabase CLI (project_id, ports)
├── docker-compose.yml                    # Stack Supabase locale : db, studio, inbucket, auth
├── turbo.json                            # Pipeline : build, dev, test, lint — configuration du cache
├── .env.example                          # Toutes les variables d'env requises documentées avec descriptions
├── .env.local                            # Surcharges de dev local (gitignored)
├── pnpm-workspace.yaml                   # Globs du workspace : apps/*, packages/*
├── tsconfig.json                         # tsconfig racine : strict, alias de chemins, composite
└── package.json                          # Racine : devDependencies, turbo, scripts
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `apps/web/middleware.ts` | Rafraîchissement de la session Supabase + protection des routes via `createServerClient` ; redirige les utilisateurs non authentifiés des routes `(app)` vers `/login` |
| `packages/database/drizzle.config.ts` | Indique à `drizzle-kit` où trouver le schéma et où écrire les migrations ; l'URL de la base de données doit être `DATABASE_URL` (connexion directe, pas le pooler) |
| `apps/web/api/webhooks/stripe/route.ts` | Vérifie la signature Stripe avec `stripe.webhooks.constructEvent`, dispatche vers des fonctions gestionnaires typées par type d'événement, retourne 200 rapidement |
| `packages/database/migrations/meta/_journal.json` | Registre interne des migrations Drizzle — ne jamais modifier à la main ; toujours utiliser `pnpm db:generate` pour créer de nouvelles migrations |
| `turbo.json` | Définit le graphe de tâches : `build` dépend de `^build` ; `dev` n'a pas de cache ; `test` s'exécute après `build` ; active le cache distant pour la CI |
| `supabase/config.toml` | Configuration Supabase CLI pour la stack locale : affectation des ports, fournisseurs d'auth activés, redirection SMTP vers Inbucket |
| `.env.example` | Source de vérité unique pour toutes les variables d'environnement — toute nouvelle variable doit être ajoutée ici avec un commentaire avant la fusion |
| `.github/workflows/ci.yml` | Exécute `pnpm turbo typecheck lint test` en parallèle via le pipeline Turborepo ; publie les vérifications en échec sous forme d'annotations sur la PR |

## Scaffold rapide

```bash
# Prérequis : Node 20+, pnpm 9+, Docker Desktop en cours d'exécution

# Créer le monorepo avec Turborepo
npx create-turbo@latest saas-web-app --package-manager pnpm
cd saas-web-app

# Ajouter l'application Next.js
pnpm dlx create-next-app@14 apps/web \
  --typescript --tailwind --app --no-src-dir \
  --import-alias "@/*" --no-git

# Ajouter les paquets partagés
mkdir -p packages/database/src/schema packages/database/migrations/meta
mkdir -p packages/emails/src packages/emails/emails
mkdir -p packages/ui/src/components

# Installer Drizzle dans le paquet database
pnpm --filter @repo/database add drizzle-orm postgres
pnpm --filter @repo/database add -D drizzle-kit

# Installer Supabase dans l'application web
pnpm --filter web add @supabase/supabase-js @supabase/ssr

# Installer Stripe dans l'application web
pnpm --filter web add stripe @stripe/stripe-js

# Installer React Email + Resend dans le paquet emails
pnpm --filter @repo/emails add react-email @react-email/components resend

# Installer shadcn/ui dans l'application web
pnpm dlx shadcn-ui@latest init --cwd apps/web
pnpm dlx shadcn-ui@latest add button dialog form table --cwd apps/web

# Installer les outils de test
pnpm --filter web add -D vitest @vitejs/plugin-react playwright @playwright/test

# Initialiser la stack Supabase locale
pnpm add -D supabase --workspace-root
pnpm supabase init
pnpm supabase start   # démarre les conteneurs Docker

# Créer les workflows GitHub Actions
mkdir -p .github/workflows
touch .github/workflows/ci.yml .github/workflows/preview.yml .github/workflows/release.yml

# Créer la configuration Claude Code
mkdir -p .claude/commands
touch .claude/CLAUDE.md .claude/settings.json
touch .claude/commands/new-feature.md
touch .claude/commands/add-migration.md
touch .claude/commands/stripe-webhook.md
touch .claude/commands/rls-policy.md
touch .claude/commands/env-audit.md

# Créer le .env.example
touch .env.example .env.local

# Installer les skills Claudient
npx claudient add skill backend/nextjs-app-router
npx claudient add skill backend/drizzle-orm
npx claudient add skill backend/supabase-rls
npx claudient add skill backend/stripe-webhooks
npx claudient add skill frontend/shadcn-ui
npx claudient add skill testing/vitest
npx claudient add skill testing/playwright
npx claudient add skill devops-infra/cicd

echo "Monorepo SaaS scaffoldé. Lancez : pnpm dev"
```

## Template CLAUDE.md

```markdown
# Application Web SaaS

Produit SaaS full-stack sur un monorepo Turborepo. Next.js 14 App Router pour le frontend,
Supabase pour l'auth et PostgreSQL, Drizzle ORM pour la gestion du schéma, Stripe pour la facturation,
déployé sur Vercel. Toutes les modifications doivent passer la CI avant d'être fusionnées.

## Stack

- Next.js 14 (App Router, Server Components, Server Actions)
- TypeScript 5.4, pnpm 9, Turborepo 2
- Supabase (auth + PostgreSQL 15 avec RLS)
- Drizzle ORM 0.30 + drizzle-kit (migrations)
- Stripe 14 (Abonnements, webhooks, Portail client)
- Tailwind CSS 3.4 + shadcn/ui
- React Email + Resend
- Vitest (unitaire), Playwright (E2E)
- GitHub Actions CI/CD → Vercel

## Organisation du monorepo

- `apps/web/` — Application Next.js ; tout le code orienté utilisateur est ici
- `packages/database/` — Schéma Drizzle + migrations ; partagé par toutes les applications
- `packages/emails/` — Templates React Email ; rendus et envoyés via Resend
- `packages/ui/` — Composants partagés (Logo, etc.) ; pas shadcn/ui, ceux-ci sont dans apps/web
- `supabase/` — Migrations SQL pour les politiques RLS et les triggers d'auth ; configuration Supabase CLI

## Ajout d'une nouvelle fonctionnalité — étapes exactes

1. Écrire un bref commentaire de spec en haut du fichier concerné ou un `_SPEC.md` dans le répertoire de la fonctionnalité
2. Construire l'UI dans `apps/web/app/(app)/[feature]/page.tsx`
3. Ajouter les Server Actions dans `apps/web/app/(app)/[feature]/actions.ts`
4. Ajouter ou étendre le schéma Drizzle dans `packages/database/src/schema/`
5. Exécuter `pnpm db:generate` pour créer le SQL de migration, puis `pnpm db:migrate`
6. Ajouter les politiques RLS dans `supabase/migrations/` si la table est scopée à l'utilisateur
7. Écrire les tests unitaires avec Vitest ; ajouter un test E2E dans `apps/web/e2e/` si orienté utilisateur
8. Utiliser la commande slash `/new-feature` pour scaffolder le boilerplate des étapes 2 à 7

## Exécution des migrations de base de données

```bash
# Générer une migration depuis un changement de schéma
pnpm --filter @repo/database run db:generate

# Appliquer au Supabase local (Docker)
pnpm --filter @repo/database run db:migrate

# Pousser les migrations SQL Supabase (RLS, triggers)
pnpm supabase db push

# Réinitialiser la DB locale et re-seeder
pnpm supabase db reset
```

## Conventions Drizzle

- Toujours importer `db` depuis `@repo/database`, ne jamais instancier directement dans `apps/`
- Utiliser `.returning()` sur insert/update — Drizzle ne retourne pas les lignes par défaut
- Transactions : `db.transaction(async (tx) => { ... })` — passer `tx` à tous les appels imbriqués
- Relations : définir avec `relations()` dans le fichier de schéma, interroger avec `db.query.*`
- Ne jamais exécuter du SQL brut depuis `apps/` — écrire une fonction de requête dans `packages/database/src/`

## Gestion des webhooks Stripe

- Le gestionnaire se trouve dans `apps/web/app/api/webhooks/stripe/route.ts`
- Doit lire le corps brut : `await req.text()` — ne pas utiliser `req.json()`
- Vérifier avec `stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)`
- Chaque type d'événement a sa propre fonction gestionnaire ; importer depuis `lib/stripe/webhooks.ts`
- Retourner `{ received: true }` avec le statut 200 immédiatement après la vérification
- Idempotence : vérifier si l'événement a déjà été traité avant d'écrire en DB
- Utiliser la commande slash `/stripe-webhook` pour scaffolder un nouveau gestionnaire d'événements

## Variables d'environnement par environnement

| Variable | Local | Preview | Production |
|---|---|---|---|
| `DATABASE_URL` | URL Docker Compose | DB de branche Supabase | DB principale Supabase |
| `NEXT_PUBLIC_SUPABASE_URL` | http://localhost:54321 | URL du projet de preview | URL du projet de production |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé anon locale | Clé anon de preview | Clé anon de production |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role local | Service role de preview | Service role de production |
| `STRIPE_SECRET_KEY` | `sk_test_...` | `sk_test_...` | `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | Secret de l'écouteur local CLI | Secret webhook Vercel | Secret webhook Vercel |
| `RESEND_API_KEY` | Clé de test ou ignoré | Clé de test | Clé de production |

Toutes les variables d'env doivent figurer dans `.env.example` avec un commentaire descriptif avant la fusion.

## Conventions d'authentification

- `middleware.ts` dans `apps/web/` gère le rafraîchissement de session et la protection des routes
- Composants serveur : utiliser `createServerClient` depuis `@supabase/ssr` avec le cookie store
- Composants client : utiliser `createBrowserClient` depuis `@supabase/ssr`
- Ne jamais accéder à `supabase.auth.getUser()` dans un composant client pour des données protégées
- RLS est la dernière couche de sécurité — toujours écrire des politiques pour les nouvelles tables

## Ce qu'il ne faut pas faire

- Ne pas importer depuis `packages/database` dans `packages/ui` ou `packages/emails`
- Ne pas utiliser `drizzle-kit push` en production — toujours générer des migrations
- Ne pas appeler l'API Stripe directement depuis des composants client — utiliser les Server Actions
- Ne pas commiter `.env.local` ni aucun fichier contenant de vraies clés API
- Ne pas modifier `packages/database/migrations/meta/_journal.json` à la main
```

## Serveurs MCP

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/yourname/saas-web-app"
      ]
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://postgres:postgres@localhost:54322/postgres"
      }
    },
    "stripe": {
      "command": "npx",
      "args": ["-y", "@stripe/mcp-server"],
      "env": {
        "STRIPE_SECRET_KEY": "${STRIPE_SECRET_KEY}"
      }
    }
  }
}
```

## Hooks recommandés

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'f=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$f\" == *.tsx || \"$f\" == *.ts ]]; then npx prettier --write \"$f\" 2>/dev/null || true; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'f=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$f\" == */schema/*.ts && \"$f\" == */packages/database/* ]]; then echo \"[HOOK] Schema changed — remember to run: pnpm --filter @repo/database run db:generate\" >&2; fi'"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_COMMAND\" | grep -q \"db:migrate\"; then echo \"[HOOK] Running migration — ensure local Supabase is running: pnpm supabase status\" >&2; fi'"
          }
        ]
      }
    ]
  }
}
```

## Skills à installer

```bash
npx claudient add skill backend/nextjs-app-router
npx claudient add skill backend/drizzle-orm
npx claudient add skill backend/supabase-rls
npx claudient add skill backend/stripe-webhooks
npx claudient add skill frontend/shadcn-ui
npx claudient add skill frontend/react-email
npx claudient add skill testing/vitest
npx claudient add skill testing/playwright
npx claudient add skill devops-infra/cicd
npx claudient add skill devops-infra/vercel
```

## Ressources associées

- [Guide Next.js Full-Stack](../guides/nextjs-app-router.md)
- [Workflow d'intégration Stripe](../workflows/stripe-billing.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
