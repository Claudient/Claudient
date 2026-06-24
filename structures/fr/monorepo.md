# Monorepo (Turborepo + pnpm) — Structure de projet

> Pour les équipes TypeScript full-stack qui gèrent plusieurs applications et packages partagés dans un seul dépôt — en optimisant la cohérence des builds, la gestion atomique des versions et la CI parallèle sur chaque workspace.

## Stack

- **Orchestration des tâches :** Turborepo 2.x (cache distant, graphe de dépendances de pipeline)
- **Gestionnaire de packages :** pnpm 9.x avec workspaces (`pnpm-workspace.yaml`)
- **Langage :** TypeScript 5.x (mode strict sur tous les packages)
- **Application web :** Next.js 14 (App Router, RSC, Turbopack)
- **Site de documentation :** Astro 4.x (collections de contenu, MDX)
- **Bundler de packages :** tsup 8.x (sortie duale ESM + CJS pour les packages partagés)
- **Bibliothèque de composants :** React 18 + primitives Radix UI (dans `packages/ui`)
- **ORM base de données :** Prisma 5.x ou Drizzle ORM 0.30+ (dans `packages/database`)
- **Emails :** React Email 2.x + Resend SDK (dans `packages/emails`)
- **Versionnement :** Changesets 2.x (incréments de version sémantique + génération de CHANGELOG)
- **Linting :** ESLint 9.x avec une configuration flat partagée depuis `packages/config/eslint`
- **Formatage :** Prettier 3.x avec une configuration partagée depuis `packages/config/prettier`
- **Tests unitaires :** Vitest 1.x (chaque package/app exécute sa propre suite)
- **Tests E2E :** Playwright 1.x (s'exécute contre le build de staging d'`apps/web`)
- **CI/CD :** GitHub Actions (pipeline lint + typecheck + test + build + release)

## Arborescence des répertoires

```
my-monorepo/
├── .changeset/                          # Fichiers de métadonnées des changesets
│   ├── config.json                      # Config changeset : baseBranch, access, changelog
│   └── README.md                        # Généré automatiquement par changeset init
├── .github/
│   └── workflows/
│       ├── ci.yml                       # Vérifications PR : lint, typecheck, test, build
│       ├── release.yml                  # Déclenché sur push vers main : publie les packages
│       └── preview.yml                  # Déploiement de prévisualisation Vercel/Cloudflare sur PR
├── .claude/
│   ├── settings.json                    # Serveurs MCP, hooks, permissions
│   └── commands/
│       ├── add-package.md               # /add-package — génère une nouvelle entrée dans packages/
│       ├── add-app.md                   # /add-app — génère une nouvelle entrée dans apps/
│       ├── changeset.md                 # /changeset — guide le choix du type de bump et écrit le fichier changeset
│       ├── turbo-graph.md               # /turbo-graph — explique l'ordre du pipeline pour une tâche donnée
│       └── sync-configs.md              # /sync-configs — propage les modifications de config sur tous les workspaces
├── apps/
│   ├── web/                             # Application Next.js 14 (App Router)
│   │   ├── .env.local                   # Variables d'environnement locales (gitignored)
│   │   ├── .env.example                 # Modèle de variables d'environnement versionné
│   │   ├── next.config.ts               # Config Next.js — transpilePackages pour les dépendances workspace
│   │   ├── tsconfig.json                # Étend ../../packages/config/typescript/nextjs.json
│   │   ├── package.json                 # name: "@acme/web", scripts: dev/build/start/lint
│   │   ├── vitest.config.ts             # Config des tests unitaires (environnement jsdom)
│   │   ├── playwright.config.ts         # Config E2E — baseURL, projets (chromium/firefox/webkit)
│   │   ├── public/                      # Ressources statiques
│   │   └── src/
│   │       ├── app/                     # Racine de l'App Router Next.js
│   │       │   ├── layout.tsx           # Layout racine — polices, providers, métadonnées
│   │       │   ├── page.tsx             # Page d'accueil (RSC)
│   │       │   ├── (auth)/              # Groupe de routes : login, signup, forgot-password
│   │       │   ├── (dashboard)/         # Groupe de routes : pages protégées par middleware
│   │       │   └── api/                 # Gestionnaires de routes
│   │       │       ├── health/route.ts  # GET /api/health — vérification de disponibilité
│   │       │       └── webhooks/        # Gestionnaires de webhooks Stripe, Resend, GitHub
│   │       ├── components/              # Composants locaux à l'app (non partagés)
│   │       ├── hooks/                   # Hooks React personnalisés
│   │       ├── lib/                     # Utilitaires : auth.ts, db.ts, stripe.ts
│   │       └── tests/
│   │           ├── unit/                # Tests unitaires Vitest
│   │           └── e2e/                 # Specs Playwright
│   └── docs/                            # Site de documentation Astro 4
│       ├── astro.config.ts              # Config Astro : mdx(), sitemap(), starlight()
│       ├── tsconfig.json                # Étend ../../packages/config/typescript/base.json
│       ├── package.json                 # name: "@acme/docs"
│       └── src/
│           ├── content/
│           │   ├── config.ts            # Schémas des collections de contenu
│           │   └── docs/                # Pages de documentation MDX
│           ├── components/              # Composants Astro/React pour la doc
│           └── pages/                   # Routes basées sur les fichiers (index, 404, blog)
├── packages/
│   ├── ui/                              # Bibliothèque de composants React partagés
│   │   ├── package.json                 # name: "@acme/ui", carte d'exports pour chaque composant
│   │   ├── tsconfig.json                # Étend ../config/typescript/react-library.json
│   │   ├── tsup.config.ts               # Génère ESM + CJS + .d.ts pour chaque point d'entrée
│   │   ├── vitest.config.ts             # Tests unitaires de composants (jsdom)
│   │   └── src/
│   │       ├── index.ts                 # Ré-exporte tous les composants publics
│   │       ├── button/
│   │       │   ├── button.tsx           # Primitive Button (Radix Slot)
│   │       │   ├── button.test.tsx      # Tests Vitest + Testing Library
│   │       │   └── index.ts             # Export nommé
│   │       ├── dialog/
│   │       ├── input/
│   │       ├── table/
│   │       └── theme/
│   │           ├── tokens.ts            # Tokens de design (couleurs, espacements, rayons)
│   │           └── provider.tsx         # ThemeProvider encapsulant les variables CSS
│   ├── database/                        # Schéma et client Prisma / Drizzle
│   │   ├── package.json                 # name: "@acme/database"
│   │   ├── tsconfig.json
│   │   ├── drizzle.config.ts            # Connexion DB, chemin du schéma, répertoire de sortie des migrations
│   │   ├── src/
│   │   │   ├── index.ts                 # Exports : client db, schéma, helpers
│   │   │   ├── client.ts                # Initialisation du client Drizzle (neon/postgres)
│   │   │   ├── schema/
│   │   │   │   ├── users.ts             # Définition de la table users
│   │   │   │   ├── posts.ts             # Définition de la table posts
│   │   │   │   └── index.ts             # Ré-export barrel
│   │   │   └── migrations/              # Fichiers de migration SQL (générés par drizzle-kit)
│   │   └── seed.ts                      # Script de seed de développement : pnpm --filter database db:seed
│   ├── emails/                          # Templates React Email + intégration Resend
│   │   ├── package.json                 # name: "@acme/emails"
│   │   ├── tsconfig.json
│   │   ├── tsup.config.ts
│   │   └── src/
│   │       ├── index.ts                 # Exporte le helper sendEmail() et tous les templates
│   │       ├── client.ts                # Client Resend SDK
│   │       ├── templates/
│   │       │   ├── welcome.tsx          # Email de bienvenue (React Email)
│   │       │   ├── reset-password.tsx   # Email de réinitialisation de mot de passe
│   │       │   └── invoice.tsx          # Email de facture / reçu
│   │       └── utils/
│   │           └── render.ts            # Wrapper render() avec fallback texte brut
│   └── config/                          # Configurations d'outils partagées — aucun code d'exécution
│       ├── package.json                 # name: "@acme/config"
│       ├── eslint/
│       │   ├── index.js                 # Config flat de base : typescript, import, jsx-a11y
│       │   ├── next.js                  # Étend la base + next/core-web-vitals
│       │   └── react-library.js         # Étend la base pour les libs React non-Next
│       ├── typescript/
│       │   ├── base.json                # Base TS stricte : noUncheckedIndexedAccess, exactOptionalPropertyTypes
│       │   ├── nextjs.json              # Étend la base + types du plugin Next.js
│       │   └── react-library.json       # Étend la base pour les builds de bibliothèques (bundler moduleResolution)
│       └── prettier/
│           └── index.js                 # Config Prettier partagée (printWidth 100, singleQuote)
├── turbo.json                           # Pipeline : tâches build, lint, test, typecheck, dev
├── pnpm-workspace.yaml                  # Globs de workspace : apps/*, packages/*
├── package.json                         # Package racine : private, scripts (lint, build, test, release)
├── .eslintrc.js                         # ESLint racine étendant @acme/config/eslint
├── .prettierrc.js                       # Prettier racine étendant @acme/config/prettier
└── .gitignore                           # node_modules, .turbo, dist, .next, .env.local
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `turbo.json` | Définit le graphe de dépendances des tâches — `build` dépend du `build` en amont, `test` dépend de `build`, `dev` exécute toutes les apps en parallèle sans cache |
| `pnpm-workspace.yaml` | Déclare les packages du workspace (`apps/*`, `packages/*`) pour que pnpm lie les dépendances locales par symlink |
| `.changeset/config.json` | Configure changeset : `baseBranch: "main"`, `access: "restricted"` pour les packages privés, `changelog: "@changesets/changelog-github"` |
| `packages/config/typescript/base.json` | Source de vérité unique pour la rigueur TS — tous les autres tsconfigs étendent celui-ci |
| `packages/config/eslint/index.js` | Config ESLint flat partagée, importée par chaque `eslint.config.js` de workspace |
| `apps/web/next.config.ts` | Doit lister `transpilePackages: ["@acme/ui"]` pour que Next.js compile le JSX du workspace |
| `packages/database/drizzle.config.ts` | Pointe drizzle-kit vers le répertoire de schéma et l'URL DB cible ; utilisé par `db:generate` et `db:migrate` |
| `.github/workflows/release.yml` | Exécute `changeset publish` après `pnpm build` sur main — publie uniquement les packages avec des changesets en attente |

## Initialisation rapide

```bash
# 1. Initialise repo and workspace
mkdir my-monorepo && cd my-monorepo
git init
pnpm init

# 2. Install Turborepo
pnpm add -D turbo --workspace-root

# 3. Create workspace config
cat > pnpm-workspace.yaml << 'EOF'
packages:
  - "apps/*"
  - "packages/*"
EOF

# 4. Scaffold directory structure
mkdir -p apps/web apps/docs
mkdir -p packages/ui/src packages/database/src/schema packages/database/src/migrations
mkdir -p packages/emails/src/templates packages/config/eslint packages/config/typescript packages/config/prettier
mkdir -p .changeset .github/workflows .claude/commands

# 5. Create each workspace package.json
echo '{"name":"@acme/web","version":"0.0.1","private":true,"scripts":{"dev":"next dev","build":"next build","lint":"eslint ."}}' > apps/web/package.json
echo '{"name":"@acme/docs","version":"0.0.1","private":true,"scripts":{"dev":"astro dev","build":"astro build"}}' > apps/docs/package.json
echo '{"name":"@acme/ui","version":"0.0.1","main":"./dist/index.js","types":"./dist/index.d.ts","scripts":{"build":"tsup"}}' > packages/ui/package.json
echo '{"name":"@acme/database","version":"0.0.1","scripts":{"db:generate":"drizzle-kit generate","db:migrate":"drizzle-kit migrate","db:seed":"tsx seed.ts"}}' > packages/database/package.json
echo '{"name":"@acme/emails","version":"0.0.1","scripts":{"build":"tsup"}}' > packages/emails/package.json
echo '{"name":"@acme/config","version":"0.0.1","private":true}' > packages/config/package.json

# 6. Initialise Changesets
pnpm dlx @changesets/cli init

# 7. Install root dev dependencies
pnpm add -D typescript eslint prettier vitest playwright -w

# 8. Install workspace-specific deps
pnpm --filter @acme/web add next react react-dom @acme/ui @acme/database
pnpm --filter @acme/web add -D @acme/config tsup vitest
pnpm --filter @acme/docs add astro
pnpm --filter @acme/ui add react radix-ui
pnpm --filter @acme/ui add -D tsup vitest @testing-library/react
pnpm --filter @acme/database add drizzle-orm @neondatabase/serverless
pnpm --filter @acme/database add -D drizzle-kit tsx
pnpm --filter @acme/emails add react-email @react-email/components resend
pnpm --filter @acme/emails add -D tsup

# 9. Add UitKit project commands
npx uitkit add command add-package
npx uitkit add command add-app
npx uitkit add command changeset-guide
```

## Modèle CLAUDE.md

```markdown
# My Monorepo

This is a Turborepo + pnpm monorepo containing multiple apps and shared packages.
All packages are TypeScript strict. Never create files outside apps/ or packages/ without updating this file.

## Stack

- Turborepo 2.x — task orchestration and remote caching
- pnpm 9.x — package manager with workspaces
- TypeScript 5.x strict — all packages
- Next.js 14 (App Router) — apps/web
- Astro 4.x — apps/docs
- tsup — packages/ui and packages/emails build
- Drizzle ORM + Neon — packages/database
- React Email + Resend — packages/emails
- Changesets — versioning and changelog
- Vitest — unit tests in every package
- Playwright — E2E tests in apps/web

## Common tasks

```bash
# Run all apps in dev mode (parallel, via Turborepo)
pnpm dev

# Build everything in correct dependency order
pnpm build

# Run all unit tests
pnpm test

# Run Playwright E2E against apps/web
pnpm --filter @acme/web test:e2e

# Typecheck the entire monorepo
pnpm typecheck

# Lint everything
pnpm lint

# Add a new dependency to a specific workspace
pnpm --filter @acme/web add zod

# Add a shared workspace package as a dependency
pnpm --filter @acme/web add @acme/ui

# Generate a DB migration after schema change
pnpm --filter @acme/database db:generate

# Run migrations against the target DB
pnpm --filter @acme/database db:migrate

# Create a changeset for a package change
pnpm changeset

# Version all packages with pending changesets (CI only)
pnpm changeset version

# Publish packages to npm (CI only, runs in release.yml)
pnpm changeset publish
```

## Adding a new package

1. Create `packages/<name>/` with `package.json` (name: `@acme/<name>`)
2. Add a `tsconfig.json` extending `../../packages/config/typescript/base.json`
3. Add a `tsup.config.ts` if the package produces a build artifact
4. Add the package to the `build` pipeline in `turbo.json` if it has a build step
5. Run `pnpm install` from the repo root to register the workspace
6. Add the package as a dependency in any consumer with `pnpm --filter @acme/<consumer> add @acme/<name>`

## Adding a new app

1. Create `apps/<name>/` with a `package.json` (name: `@acme/<name>`)
2. Add a `tsconfig.json` extending the appropriate config from `packages/config/typescript/`
3. Register `dev`, `build`, `lint`, `typecheck` scripts in `package.json`
4. Update `turbo.json` pipeline if the app has non-standard task dependencies
5. Add a Vercel project or Cloudflare Pages project for deployments

## Changeset release workflow

1. Make code changes across one or more packages
2. Run `pnpm changeset` — select affected packages and bump type (patch/minor/major)
3. Commit the generated `.changeset/<hash>.md` file alongside code changes
4. When the PR merges to main, the `release.yml` workflow runs `changeset version` then `changeset publish`
5. The workflow creates a "Version Packages" PR if packages need version bumps

## Shared config inheritance

- TypeScript: every tsconfig.json has `"extends": "../../packages/config/typescript/<variant>.json"`
- ESLint: every eslint.config.js imports from `@acme/config/eslint/<variant>`
- Prettier: root `.prettierrc.js` exports `require("@acme/config/prettier")`
- Never override `strict`, `noUncheckedIndexedAccess`, or `exactOptionalPropertyTypes` — file a discussion first

## Turborepo pipeline rules

- `build` outputs to `dist/` and `.next/` — these are cached by Turborepo
- `test` depends on `^build` — all upstream packages must build before tests run
- `lint` and `typecheck` run in parallel with no upstream dependency
- `dev` has `"cache": false` and `"persistent": true` — it never caches and keeps running
- Add new tasks to `turbo.json` before adding scripts to package.json

## Conventions

- Package names must follow `@acme/<name>` — no exceptions
- All exports must go through a barrel `src/index.ts` — no deep imports from consumers
- Database schema changes require a migration file — never edit existing migration SQL
- Environment variables live in `apps/web/.env.local` (gitignored) and `.env.example` (committed)
- React components in packages/ui must be server-component-compatible (no use client unless necessary)
```

## Serveurs MCP

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-filesystem", "/Users/you/my-monorepo"],
      "description": "Read/write access to the full monorepo tree"
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      },
      "description": "Create PRs, read issues, review Actions run logs"
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "${DATABASE_URL}"],
      "description": "Query the Neon/Postgres database directly for schema inspection and data debugging"
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
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "node -e \"const f=process.env.CLAUDE_TOOL_RESULT_FILE_PATH; if(f&&(f.endsWith('.ts')||f.endsWith('.tsx')))require('child_process').execSync('pnpm prettier --write '+f,{stdio:'inherit'})\"",
            "description": "Auto-format TypeScript/TSX files with Prettier immediately after Claude writes them"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "node -e \"const f=process.env.CLAUDE_TOOL_RESULT_FILE_PATH; if(f&&f.includes('packages/database/src/schema'))console.log('REMINDER: schema changed — run: pnpm --filter @acme/database db:generate')\"",
            "description": "Remind developer to generate a migration whenever a Drizzle schema file is written"
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
            "command": "node -e \"const i=JSON.parse(process.env.CLAUDE_TOOL_INPUT||'{}'); if((i.command||'').includes('npm install')||( i.command||'').includes('yarn add'))process.exit(1)\"",
            "description": "Block npm install and yarn add — enforce pnpm as the only package manager"
          }
        ]
      }
    ]
  }
}
```

## Skills à installer

```bash
# TypeScript and Node.js development
npx uitkit add skill backend/typescript/tsup-library
npx uitkit add skill backend/typescript/strict-tsconfig

# Next.js app development
npx uitkit add skill frontend/nextjs/app-router
npx uitkit add skill frontend/nextjs/server-components

# Database and migrations
npx uitkit add skill backend/database/drizzle-schema
npx uitkit add skill backend/database/migrations-workflow

# Testing
npx uitkit add skill testing/vitest-unit
npx uitkit add skill testing/playwright-e2e

# Monorepo and CI
npx uitkit add skill devops/turborepo-pipeline
npx uitkit add skill devops/changesets-release
npx uitkit add skill devops/github-actions-ci

# Code quality
npx uitkit add skill productivity/code-review
npx uitkit add skill productivity/pr-description
```

## Ressources associées

- [Guide des pipelines Turborepo](../guides/turborepo-pipelines.md)
- [Workflow de release Changeset](../workflows/changeset-release.md)
- [Guide de configuration TypeScript partagée](../guides/shared-tsconfig.md)
- [Gestion des dépendances de workspace pnpm](../guides/pnpm-workspaces.md)
