# Bibliothèque Open Source (TypeScript) — Structure de projet

> Pour les auteurs de bibliothèques TypeScript publiant sur NPM, afin d'optimiser le flux de travail de la création à la publication : d'un nouvel export à une publication versionnée, avec contrôle de taille, en double format.

## Stack

- **Langage :** TypeScript 5.x (mode strict, `exactOptionalPropertyTypes`, `noUncheckedIndexedAccess`)
- **Build :** tsup 8.x — sortie duale ESM + CJS, génération de `.d.ts`, source maps
- **Outil de test :** Vitest 2.x — tests unitaires, couverture via V8, snapshots en ligne
- **Linter/Formateur :** Biome 1.x — outil unique remplaçant ESLint + Prettier ; aucune divergence de configuration
- **Gestion des versions :** Changesets 2.x — fichiers changeset par PR, CHANGELOG.md automatisé, `npm publish`
- **CI/CD :** GitHub Actions — `ci.yml` (vérification des types + lint + tests sur PR), `release.yml` (publication lors de la fusion sur la branche de release)
- **Mises à jour des dépendances :** Renovate — PRs groupées pour les mises à jour mineures/correctifs, PRs individuelles pour les majeures, verrouillage des devDependencies
- **Taille du bundle :** size-limit 11.x — budget ESM et CJS appliqué en CI ; la PR échoue si le budget est dépassé
- **Documentation API :** TypeDoc 0.26.x — génère du HTML à partir des commentaires TSDoc ; déployé sur GitHub Pages
- **Gestionnaire de paquets :** pnpm 9+

## Arborescence du projet

```
my-ts-library/                          # Racine de la bibliothèque publiée
├── .changeset/
│   ├── config.json                     # Changesets : accès, branche de base, format du changelog
│   └── README.md                       # Instructions pour rédiger les changesets (ne pas supprimer)
├── .claude/
│   ├── settings.json                   # Serveurs MCP, hooks, permissions
│   └── commands/
│       ├── new-export.md               # /new-export — génère src/ + tests/ + export dans index.ts
│       ├── add-changeset.md            # /add-changeset — exécute pnpm changeset et remplit le résumé
│       ├── size-check.md               # /size-check — exécute size-limit et explique quels exports ont grossi
│       └── typedoc-preview.md          # /typedoc-preview — génère la doc et l'ouvre dans le navigateur
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                      # Contrôle PR : vérification des types, biome check, vitest, size-limit
│   │   └── release.yml                 # Déclenché au push sur main : changesets/action publie sur NPM
│   └── renovate.json                   # Configuration Renovate : correctifs groupés, PRs majeures séparées
├── docs/
│   ├── getting-started.md              # Guide d'installation et de première utilisation
│   ├── api-reference.md                # Référence API rédigée à la main (TypeDoc couvre les signatures)
│   └── migration/
│       └── v1-to-v2.md                 # Guide de migration pour les changements cassants
├── examples/
│   ├── README.md                       # Comment exécuter les exemples
│   ├── basic-usage/
│   │   ├── package.json                # {"type":"module"} + dépendance locale via file:
│   │   └── index.ts                    # Importe depuis "../dist" — teste la sortie de build réelle
│   ├── cjs-usage/
│   │   ├── package.json                # {"type":"commonjs"} — valide que l'export CJS fonctionne
│   │   └── index.js
│   └── advanced/
│       ├── package.json
│       └── index.ts                    # Illustre des patterns de configuration avancés
├── src/
│   ├── index.ts                        # Point d'entrée du paquet : réexporte toute la surface d'API publique
│   ├── core/
│   │   ├── index.ts                    # Réexports pour le sous-module core
│   │   ├── client.ts                   # Classe / fonction principale — l'export central
│   │   ├── client.types.ts             # Interfaces et types TypeScript exportés
│   │   └── defaults.ts                 # Valeurs de configuration par défaut
│   ├── utils/
│   │   ├── index.ts
│   │   ├── validation.ts               # Utilitaires de validation des entrées (non exportés publiquement)
│   │   └── formatting.ts              # Utilitaires de formatage de chaînes et données
│   ├── errors/
│   │   ├── index.ts
│   │   └── errors.ts                   # Classes d'erreur typées étendant Error
│   └── internal/
│       └── symbols.ts                  # Symboles privés — NON réexportés depuis src/index.ts
├── tests/
│   ├── core/
│   │   ├── client.test.ts              # Tests unitaires miroirs de src/core/client.ts
│   │   └── client.types.test-d.ts     # Tests au niveau des types avec expect-type (style tsd)
│   ├── utils/
│   │   ├── validation.test.ts
│   │   └── formatting.test.ts
│   ├── errors/
│   │   └── errors.test.ts
│   ├── fixtures/
│   │   └── sample-data.ts              # Fixtures de test partagées — à importer dans les fichiers de test
│   └── integration/
│       └── roundtrip.test.ts           # De bout en bout : la sortie de build consommée par un vrai import
├── dist/                               # Sortie compilée — dans .gitignore, publiée sur NPM
│   ├── index.js                        # Point d'entrée CJS
│   ├── index.mjs                       # Point d'entrée ESM
│   ├── index.d.ts                      # Point d'entrée des déclarations de types
│   └── ...                             # Fichiers .js/.mjs/.d.ts par module générés par tsup
├── typedoc-out/                        # Sortie HTML de TypeDoc — dans .gitignore
├── .biome.json                         # Règles de lint et formatage Biome (remplace .eslintrc + .prettierrc)
├── .gitignore                          # dist/, typedoc-out/, node_modules/, coverage/
├── .npmignore                          # Exclut src/, tests/, docs/ du tarball NPM
├── tsconfig.json                       # Base : strict, cible ES2022, moduleResolution bundler
├── tsconfig.build.json                 # Étend la base ; exclut tests/ ; utilisé par tsup
├── tsup.config.ts                      # Entrée : src/index.ts ; format : esm+cjs ; dts : true
├── vitest.config.ts                    # Couverture : v8, inclut : src/**, exclut : src/internal/
├── .size-limit.json                    # Budget par export : ESM <= 5 ko, CJS <= 6 ko (gzip)
├── typedoc.json                        # entryPoints : src/index.ts ; out : typedoc-out/
├── CHANGELOG.md                        # Généré automatiquement par changesets — ne pas modifier manuellement
├── LICENSE
├── README.md
└── package.json                        # carte des exports, files, engines, peerDependencies
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `tsup.config.ts` | Déclare `entry: ['src/index.ts']`, `format: ['esm', 'cjs']`, `dts: true`, `sourcemap: true`, `clean: true` ; doit correspondre exactement à la carte `exports` dans `package.json` |
| `tsconfig.build.json` | Étend `tsconfig.json` ; définit `exclude: ['tests/**', 'examples/**']` pour que TypeDoc et tsup ignorent les types de test ; jamais utilisé pour l'IDE local — uniquement pour la CI et tsup |
| `.changeset/config.json` | Définit `access: "public"`, `baseBranch: "main"`, `changelog: "@changesets/cli/changelog"` ; contrôle quels paquets sont mis à jour ensemble |
| `.size-limit.json` | Chaque entrée définit `path`, `import` (export nommé à mesurer), `limit` en octets ; la CI rejette la PR si un import dépasse son budget |
| `src/index.ts` | Source de vérité unique pour la surface d'API publique ; tout symbole exporté ici est publié — rien dans `src/internal/` ne doit y apparaître |
| `package.json` | Contient la carte `exports` avec les conditions `import`/`require`/`types`, `files: ["dist"]`, `engines: { "node": ">=18" }` et `sideEffects: false` |
| `.github/workflows/release.yml` | Exécute `changesets/action` avec `publish: pnpm release` ; crée la release GitHub et publie sur NPM de façon atomique lors de la fusion d'une PR de version |
| `vitest.config.ts` | Définit `coverage.provider: 'v8'`, `coverage.include: ['src/**']`, `coverage.exclude: ['src/internal/**']`, `coverage.thresholds.lines: 90` |

## Scaffold rapide

```bash
# Prérequis : Node 20+, pnpm 9+

mkdir my-ts-library && cd my-ts-library
pnpm init

# Installer TypeScript + outils de build
pnpm add -D typescript@5 tsup@8 @types/node

# Installer Biome (remplace ESLint + Prettier)
pnpm add -D @biomejs/biome
pnpm biome init

# Installer Vitest + couverture
pnpm add -D vitest@2 @vitest/coverage-v8

# Installer changesets
pnpm add -D @changesets/cli
pnpm changeset init

# Installer size-limit
pnpm add -D size-limit @size-limit/preset-small-lib

# Installer TypeDoc
pnpm add -D typedoc@0.26

# Installer la configuration Renovate (locale au projet)
pnpm add -D renovate

# Créer les répertoires sources
mkdir -p src/core src/utils src/errors src/internal
mkdir -p tests/core tests/utils tests/errors tests/fixtures tests/integration
mkdir -p docs/migration
mkdir -p examples/basic-usage examples/cjs-usage examples/advanced
mkdir -p .changeset .claude/commands .github/workflows

# Créer les fichiers de configuration
touch tsconfig.json tsconfig.build.json tsup.config.ts vitest.config.ts
touch .biome.json .size-limit.json typedoc.json
touch .gitignore .npmignore
touch src/index.ts src/core/index.ts src/core/client.ts
touch src/core/client.types.ts src/utils/index.ts src/errors/index.ts
touch tests/core/client.test.ts tests/fixtures/sample-data.ts
touch .github/workflows/ci.yml .github/workflows/release.yml
touch .github/renovate.json

# Ajouter dist/ et les répertoires générés dans .gitignore
printf 'dist/\ntypedoc-out/\ncoverage/\nnode_modules/\n*.tsbuildinfo\n' >> .gitignore

# Ajouter la carte exports à package.json (à éditer manuellement après le scaffold)
node -e "
const pkg = require('./package.json');
pkg.exports = {
  '.': {
    import: './dist/index.mjs',
    require: './dist/index.js',
    types: './dist/index.d.ts'
  }
};
pkg.files = ['dist'];
pkg.engines = { node: '>=18' };
pkg.sideEffects = false;
pkg.scripts = {
  build: 'tsup',
  dev: 'tsup --watch',
  typecheck: 'tsc --noEmit',
  lint: 'biome check .',
  'lint:fix': 'biome check --write .',
  test: 'vitest run',
  'test:watch': 'vitest',
  'test:coverage': 'vitest run --coverage',
  'size': 'size-limit',
  docs: 'typedoc',
  release: 'changeset publish'
};
require('fs').writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
"

# Créer la configuration Claude Code
touch .claude/settings.json
touch .claude/commands/new-export.md
touch .claude/commands/add-changeset.md
touch .claude/commands/size-check.md
touch .claude/commands/typedoc-preview.md

# Installer les skills Claudient
npx claudient add skill productivity/doc-site-builder
npx claudient add skill testing/vitest
npx claudient add skill devops-infra/cicd

echo "Scaffold de bibliothèque open source terminé. Exécutez : pnpm install && pnpm build"
```

## Modèle CLAUDE.md

```markdown
# my-ts-library

Bibliothèque TypeScript publiée sur NPM en tant que paquet dual ESM + CJS. Toute l'API publique
se trouve dans src/index.ts. Les tests reflètent la structure de src/ sous tests/. Les releases sont
gérées par changesets — ne jamais modifier la version dans package.json manuellement.

## Stack

- TypeScript 5.x (strict, exactOptionalPropertyTypes, noUncheckedIndexedAccess)
- tsup 8 — build dual ESM + CJS, génération de .d.ts, source maps
- Vitest 2 — tests unitaires + couverture V8 ; seuil : 90 % de couverture des lignes
- Biome 1 — lint et formatage (remplace ESLint + Prettier ; une seule config, une seule commande)
- Changesets 2 — les fichiers changeset par PR alimentent CHANGELOG.md et la publication NPM
- size-limit 11 — budget de taille du bundle appliqué en CI
- TypeDoc 0.26 — documentation API depuis les commentaires TSDoc, déployée sur GitHub Pages
- GitHub Actions : ci.yml (contrôle PR), release.yml (publication NPM lors de la fusion sur main)
- Renovate — PRs de dépendances automatisées (mineures/correctifs groupés, majeures individuelles)

## Ajouter un nouvel export — étapes exactes

1. Créer l'implémentation dans le bon sous-répertoire de src/
   - Logique : src/core/, src/utils/, ou un nouveau répertoire src/[feature]/
   - Types uniquement : ajouter à un fichier *.types.ts existant ou créer [feature].types.ts
   - Utilitaires internes (non publics) : src/internal/ — NE PAS réexporter depuis src/index.ts
2. Rédiger un bloc de commentaire TSDoc sur chaque symbole exporté (TypeDoc les analyse)
3. Ajouter l'export dans src/index.ts
4. Créer le fichier de test correspondant dans tests/[même-chemin]/[nom-fichier].test.ts
5. Exécuter pnpm typecheck — corriger toutes les erreurs de types avant de continuer
6. Exécuter pnpm lint:fix — Biome corrige automatiquement la plupart des problèmes de style
7. Exécuter pnpm test:coverage — vérifier que la couverture reste au-dessus de 90 %
8. Exécuter pnpm build — vérifier que tsup génère dist/ sans erreur
9. Exécuter pnpm size — vérifier que le nouvel export est dans le budget (modifier .size-limit.json si
   la portée a été intentionnellement étendue ; le justifier dans la description de la PR)
10. Utiliser la commande slash /new-export pour générer automatiquement les étapes 1 à 4

## Flux de release avec changesets

Toute PR qui modifie le comportement public (nouvel export, correction de bug, changement cassant)
nécessite un fichier changeset. Règles de versionnement : patch pour les corrections, minor pour les nouvelles
fonctionnalités (rétrocompatibles), major pour les changements cassants.

```bash
# Créer un changeset interactif — à exécuter avant de pousser votre branche
pnpm changeset

# Après la fusion des PRs sur main, changesets/action crée une "Version PR"
# qui met à jour package.json et CHANGELOG.md. Fusionner cette PR pour publier sur NPM.

# Aperçu à sec de ce qui serait publié
pnpm changeset status

# Publication manuelle d'urgence (uniquement si release.yml de GitHub Actions est cassé)
pnpm build && pnpm changeset publish
```

Ne jamais modifier CHANGELOG.md manuellement. Ne jamais exécuter npm version ni modifier package.json
manuellement. changesets/action s'en charge.

## Écrire des tests

- Refléter la structure de src/ : src/core/client.ts -> tests/core/client.test.ts
- Importer uniquement depuis les chemins src/, jamais depuis dist/
- Utiliser les globaux Vitest (describe, it, expect) — aucun import nécessaire (configuré dans vitest.config.ts)
- Les fixtures partagées se trouvent dans tests/fixtures/sample-data.ts — les compléter, ne pas dupliquer
- Tests au niveau des types : tests/core/[nom].test-d.ts avec expectTypeOf de vitest
- Exécuter en mode watch pendant le développement : pnpm test:watch
- La couverture doit rester à 90 % des lignes dans src/ au minimum — la CI échoue sinon

## Discipline sur la taille du bundle

- .size-limit.json définit un budget pour chaque export nommé (gzip, ESM)
- Exécuter pnpm size localement avant de pousser toute PR qui ajoute du nouveau code
- Si un nouvel export a réellement besoin de plus d'octets, mettre à jour .size-limit.json et
  expliquer le compromis dans la description de la PR
- Ne jamais importer de dépendances tierces sans vérifier leur taille au préalable :
  utiliser bundlephobia.com ou pnpm why pour évaluer l'impact
- Garder src/internal/ pour les utilitaires qui sont élagués du build public (tree-shaking)

## Exécuter les exemples

Les exemples importent depuis la sortie locale dist/ — toujours builder d'abord.

```bash
# Builder la bibliothèque
pnpm build

# Exécuter l'exemple ESM
cd examples/basic-usage && pnpm install && pnpm tsx index.ts

# Exécuter l'exemple CJS
cd examples/cjs-usage && pnpm install && node index.js

# Exécuter l'exemple avancé
cd examples/advanced && pnpm install && pnpm tsx index.ts
```

Si un exemple échoue après un build, le contrat d'API publique est peut-être cassé.
Traiter les échecs d'exemples comme des échecs de tests.

## Commandes courantes

| Commande | Ce qu'elle fait |
|---|---|
| pnpm build | tsup : compile + émet .d.ts + source maps vers dist/ |
| pnpm typecheck | tsc --noEmit sur tsconfig.json (tous les fichiers, tests inclus) |
| pnpm lint | biome check . — rapport uniquement |
| pnpm lint:fix | biome check --write . — applique les corrections automatiques sûres |
| pnpm test | vitest run — passe unique, sans watch |
| pnpm test:coverage | vitest run --coverage — ouvre le rapport HTML dans coverage/ |
| pnpm size | size-limit — compare le build actuel aux budgets dans .size-limit.json |
| pnpm docs | typedoc — écrit le HTML dans typedoc-out/ |
| pnpm changeset | Interactif : rédige un nouveau fichier changeset dans .changeset/ |
| pnpm changeset status | Aperçu des mises à jour de version et entrées de changelog en attente |

## Ce qu'il ne faut pas faire

- Ne pas exporter de symboles depuis src/internal/ — ils ne font pas partie de l'API publique
- Ne pas modifier CHANGELOG.md ni incrémenter la version dans package.json manuellement
- Ne pas commiter dist/ — il est dans .gitignore et généré par la CI avant publication
- Ne pas ajouter de dépendances sans évaluer l'impact sur la taille du bundle
- Ne pas utiliser ESLint ou Prettier — Biome gère les deux ; les ajouter crée des conflits
- Ne pas omettre d'écrire un changeset pour une PR qui touche src/ — la CI vous le rappellera
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
        "/Users/yourname/my-ts-library/src",
        "/Users/yourname/my-ts-library/tests"
      ]
    },
    "npm": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-filesystem"],
      "env": {
        "NPM_TOKEN": "${NPM_TOKEN}"
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
            "command": "bash -c 'f=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$f\" == *.ts && \"$f\" != *.test.ts && \"$f\" != *.test-d.ts ]]; then cd /Users/yourname/my-ts-library && npx biome check --write \"$f\" 2>/dev/null || true; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'f=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$f\" == */src/index.ts ]]; then echo \"[HOOK] src/index.ts mis à jour — exécuter : pnpm build && pnpm size pour vérifier les exports et le budget\" >&2; fi'"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_COMMAND\" | grep -q \"changeset publish\"; then echo \"[HOOK] Publication manuelle détectée — vérifier que dist/ est à jour : exécuter pnpm build d abord\" >&2; fi'"
          }
        ]
      }
    ]
  }
}
```

## Skills à installer

```bash
npx claudient add skill testing/vitest
npx claudient add skill devops-infra/cicd
npx claudient add skill productivity/doc-site-builder
npx claudient add skill productivity/changelog-writer
npx claudient add skill productivity/vendor-evaluator
```

## Références

- [Guide Bibliothèque TypeScript](../guides/typescript-library.md)
- [Workflow de release Changesets](../workflows/changesets-release.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
