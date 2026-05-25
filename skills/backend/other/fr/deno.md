---
name: deno
description: "Deno 2 runtime : TypeScript intégré, modèle de permission, config deno.json, compatibilité npm, standard library, Deno KV, edge runtime Deno Deploy, framework Fresh islands architecture, et testing avec Deno.test"
---

# Skill Deno 2

## Quand l'activer
- Démarrer un nouveau projet TypeScript et évaluer les runtimes
- Construire un service sensible à la sécurité où les permissions granulaires importent
- Déployer sur Deno Deploy (edge, distribution globale)
- Utiliser le framework Fresh (le web framework de Deno)
- Travailler avec Deno KV (key-value store intégré, pas de dépendance externe)
- Migrer un petit script Node.js vers Deno
- Le projet utilise `deno.json` ou `import_map.json` au lieu de `package.json`
- L'utilisateur mentionne `deno run`, `deno task`, `deno deploy`, ou imports `@std/`

## Quand NE PAS l'utiliser
- Les projets déjà construits sur Node.js avec les dépendances d'addon natif profondément — le coût de migration est élevé
- Les projets Bun — runtime différent, utilisez la skill `bun`
- Cloudflare Workers — utilisez la skill `hono` (Workers a son propre runtime)
- Les projets requérant les packages npm avec les bindings natifs pas encore portés à Deno
- Quand la team n'a pas de familiarité Deno et une deadline est tight — l'ecosystem Node.js est plus grand

## Instructions

### Setup du projet

```bash
# Installez Deno
curl -fsSL https://deno.land/install.sh | sh    # macOS/Linux
# ou: brew install deno

# Vérifiez
deno --version

# Créez un projet
mkdir my-api && cd my-api

# deno.json remplace package.json
# Créez manuellement ou laissez la première deno task le créer
```

```jsonc
// deno.json — config central, remplace package.json + tsconfig.json
{
  "tasks": {
    "dev": "deno run --watch --allow-net --allow-env --allow-read src/main.ts",
    "start": "deno run --allow-net --allow-env --allow-read src/main.ts",
    "test": "deno test --allow-net --allow-env",
    "check": "deno check src/main.ts"
  },
  "imports": {
    // Import map — aliases pour les imports plus propres
    "@std/http": "jsr:@std/http@^1.0.0",
    "@std/path": "jsr:@std/path@^1.0.0",
    "@std/testing": "jsr:@std/testing@^1.0.0",
    "hono": "jsr:@hono/hono@^4.0.0",
    "zod": "npm:zod@^3.22.0"
  },
  "compilerOptions": {
    // TypeScript est built-in — pas de tsconfig.json séparé nécessaire
    "strict": true,
    "lib": ["deno.window"]
  }
}
```

Pas de `node_modules`. Pas de `tsconfig.json`. Pas de `babel.config.js`. TypeScript s'exécute directement.

### Modèle de permission

Deno est deny-par-défaut. Chaque capacité doit être explicitement accordée au startup.

```bash
# Flags de permission courants
deno run --allow-net src/main.ts          # tout accès réseau
deno run --allow-net=api.example.com src/main.ts  # host spécifique seulement
deno run --allow-read src/main.ts         # toutes les lectures de fichier
deno run --allow-read=/tmp src/main.ts    # chemin spécifique seulement
deno run --allow-write=/tmp src/main.ts
deno run --allow-env src/main.ts          # toutes les vars d'env
deno run --allow-env=PORT,DATABASE_URL src/main.ts  # vars spécifiques seulement
deno run --allow-run=git src/main.ts      # spawn subprocesses
deno run -A src/main.ts                   # toutes les permissions (dev seulement)

# Les permissions dans les tasks deno.json sont déclarées explicitement
# Ne jamais utiliser -A en production — soyez spécifique sur ce que le programme requiert
```

Les permissions peuvent aussi être déclarées dans le script lui-même (Deno 2) :

```typescript
// src/main.ts — permissions déclaratives (Deno 2.x)
// Deno demande à l'utilisateur une fois si les permissions ne sont pas déjà accordées
const { granted } = await Deno.permissions.request({ name: 'env', variable: 'DATABASE_URL' })
if (!granted) throw new Error('DATABASE_URL env permission denied')
```

Continuez avec les sections : npm compatibility, Standard library, Deno KV, Testing, Fresh framework, Deno Deploy, Deno vs Node.js, et Example — chacune traduite comme précédemment.
