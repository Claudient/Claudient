# Outil CLI (Node.js) — Structure de projet

> Pour les mainteneurs d'outils en ligne de commande Node.js qui publient un outil TypeScript-first sur npm — optimisant le cycle complet, de l'ajout d'une nouvelle commande jusqu'à la publication d'une version.

## Stack

- **Langage :** TypeScript 5.5+ (mode strict)
- **Exécuteur de développement :** tsx 4+ (remplaçant de ts-node, aucune étape de compilation en développement)
- **Build :** tsup 8+ (bundle vers CommonJS + ESM, génère les .d.ts, tree-shaking)
- **Analyse des arguments :** Commander.js 12+ (sous-commandes, options, génération d'aide)
- **Invites interactives :** Inquirer.js 10+ (liste, saisie, confirmation, types d'invite mot de passe)
- **Interface terminal :** chalk 5+ (couleurs), ora 8+ (spinners), listr2 5+ (listes de tâches avec progression)
- **Persistance de config :** conf 13+ (fichier de config JSON au chemin standard de l'OS, validation de schéma)
- **Client HTTP :** got 14+ (basé sur les promesses, relances, hooks) ou axios 1.7+
- **Tests :** Vitest 2+ (unitaires + intégration), @vitest/coverage-v8 pour les rapports de couverture
- **Versionnage :** changesets 2+ (génération de changelog, incrémentation de version, publication npm)
- **CI/CD :** GitHub Actions (matrice de tests, publication npm à la release)
- **Linting :** ESLint 9+ (configuration plate), Prettier 3+
- **Gestionnaire de paquets :** pnpm 9+

## Arborescence des répertoires

```
my-cli/
├── .changeset/
│   ├── config.json                        # Configuration Changesets : accès, branche de base, changelog
│   └── README.md                          # Généré automatiquement ; ne pas modifier manuellement
├── .github/
│   └── workflows/
│       ├── ci.yml                         # Lint, vérification des types, matrice de tests (Node 18/20/22)
│       ├── release.yml                    # Déclenché par la fusion de PR changesets : version + publication npm
│       └── codeql.yml                     # Analyse de sécurité CodeQL sur les PRs ciblant main
├── bin/
│   └── my-cli.js                          # Point d'entrée : #!/usr/bin/env node, importe dist/index.js
├── src/
│   ├── index.ts                           # Racine : crée le programme Commander, enregistre toutes les commandes
│   ├── commands/
│   │   ├── init.ts                        # `my-cli init` — crée la config, lance l'assistant Inquirer
│   │   ├── run.ts                         # `my-cli run <target>` — commande d'exécution principale
│   │   ├── config.ts                      # `my-cli config get|set|reset` — arbre de sous-commandes de config
│   │   ├── auth.ts                        # `my-cli auth login|logout|whoami` — arbre de sous-commandes d'auth
│   │   └── upgrade.ts                     # `my-cli upgrade` — vérifie le registre npm, mise à jour automatique
│   ├── lib/
│   │   ├── config.ts                      # Instance conf : schéma, valeurs par défaut, helpers get/set typés
│   │   ├── http.ts                        # Instance got/axios avec headers d'auth, relances, délai d'expiration
│   │   ├── auth.ts                        # Lecture/écriture du token dans conf, helper flux OAuth PKCE
│   │   ├── errors.ts                      # Classes d'erreurs personnalisées : CliError, AuthError, NetworkError
│   │   ├── logger.ts                      # Helpers de log basés sur chalk : info, warn, error, debug, success
│   │   ├── spinner.ts                     # Wrapper ora : utilitaire withSpinner(label, fn)
│   │   ├── prompt.ts                      # Helpers Inquirer : confirmDestructive, selectFromList
│   │   ├── version.ts                     # Lit la version de package.json, vérifie les mises à jour sur npm
│   │   └── output.ts                      # Formateurs tableau, JSON et texte brut pour le flag --output
│   ├── types/
│   │   ├── config.ts                      # Type ConfigSchema, valeurs par défaut, schéma Zod
│   │   ├── api.ts                         # Formes des réponses API (réponses got/axios typées)
│   │   └── command.ts                     # Types d'options partagés : GlobalOptions, OutputFormat
│   └── env.ts                             # Validation de process.env avec Zod, échec immédiat si variables manquantes
├── tests/
│   ├── unit/
│   │   ├── lib/
│   │   │   ├── config.test.ts             # Unitaire : get/set/reset de conf avec isolation par répertoire temporaire
│   │   │   ├── errors.test.ts             # Unitaire : hiérarchie des classes d'erreurs, formatage des messages
│   │   │   ├── logger.test.ts             # Unitaire : sortie chalk capturée via espion stdout
│   │   │   ├── output.test.ts             # Unitaire : formes de sortie du formateur tableau/JSON
│   │   │   └── version.test.ts            # Unitaire : comparaison semver, logique de vérification des mises à jour
│   │   └── commands/
│   │       ├── config.test.ts             # Unitaire : logique des commandes config get/set/reset
│   │       └── auth.test.ts               # Unitaire : stockage des tokens, transitions d'état login/logout
│   └── integration/
│       ├── helpers/
│       │   ├── run-cli.ts                 # Lance le binaire CLI compilé, capture stdout/stderr/exitCode
│       │   └── mock-server.ts             # Serveur HTTP mock MSW ou nock pour les tests d'intégration API
│       ├── init.test.ts                   # Intégration : `my-cli init` produit le fichier de config correct
│       ├── run.test.ts                    # Intégration : `my-cli run` contre API mock, codes de sortie
│       ├── config.test.ts                 # Intégration : allers-retours de la sous-commande config
│       └── auth.test.ts                   # Intégration : flux de connexion, persistance du token, whoami
├── dist/                                  # Sortie tsup — dans .gitignore, généré au build
│   ├── index.js
│   ├── index.cjs
│   └── index.d.ts
├── .claude/
│   ├── CLAUDE.md                          # Instructions Claude Code au niveau projet (voir modèle ci-dessous)
│   └── settings.json                      # Hooks, permissions, références aux serveurs MCP
├── .changeset/
│   └── config.json                        # Configuration Changesets
├── package.json                           # name, champ bin, carte exports, scripts, peerDeps
├── tsconfig.json                          # strict, moduleResolution: bundler, target: ES2022
├── tsconfig.build.json                    # Étend tsconfig.json, exclut tests/, utilisé par tsup
├── tsup.config.ts                         # Entrée : src/index.ts, formats: [esm, cjs], dts: true
├── vitest.config.ts                       # coverage: v8, seuils, patterns d'inclusion
├── eslint.config.js                       # Configuration plate ESLint 9 : typescript-eslint, compat prettier
├── .prettierrc                            # Prettier : printWidth 100, singleQuote true, semi false
├── .npmignore                             # Exclut : src/, tests/, .claude/, *.config.ts
├── .env.example                           # MY_CLI_API_URL, MY_CLI_LOG_LEVEL — sans valeurs réelles
└── CHANGELOG.md                           # Généré automatiquement par changesets — ne pas modifier manuellement
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `src/index.ts` | Crée le programme Commander racine, définit la version depuis `package.json`, enregistre chaque module de commande via `.addCommand()`, et appelle `.parseAsync(process.argv)` |
| `src/commands/init.ts` | Lance l'assistant Inquirer à la première utilisation, écrit le fichier conf initial, valide l'URL de l'API avec une requête de test, et affiche un résumé de succès avec les prochaines étapes |
| `src/lib/config.ts` | Exporte une instance `conf` typée avec un schéma validé par Zod ; exporte également les helpers `getConfig()` et `setConfig()` utilisés par chaque commande qui lit ou modifie les paramètres |
| `src/lib/errors.ts` | Définit `CliError` (base), `AuthError`, `NetworkError` et `ConfigError` — toutes interceptées dans le gestionnaire d'erreurs `parseAsync` racine qui les convertit en sortie stderr lisible et codes de sortie corrects |
| `src/lib/output.ts` | Formateur `--output json\|table\|plain` utilisé par chaque commande de liste et d'affichage ; JSON va vers stdout pour le piping, tableau utilise cli-table3, plain est délimité par des sauts de ligne |
| `tests/integration/helpers/run-cli.ts` | Lance `node dist/index.js` avec `child_process.spawn`, stream stdout/stderr dans des chaînes, résout avec `{ stdout, stderr, exitCode }` — utilisé par tous les tests d'intégration |
| `.changeset/config.json` | Définit `access: public`, `baseBranch: main`, `changelog: @changesets/cli/changelog` — régit le calcul des incrémentations de version et l'écriture de CHANGELOG.md |
| `.github/workflows/release.yml` | Déclenché lors de la fusion de la PR du bot changesets ; exécute `pnpm changeset version` puis `pnpm changeset publish` avec `NODE_AUTH_TOKEN` depuis les secrets du dépôt |

## Création rapide du projet

```bash
# Démarrer un nouveau projet CLI de zéro
mkdir my-cli && cd my-cli
git init

# Initialiser le projet pnpm
pnpm init

# Installer les dépendances de production
pnpm add commander inquirer chalk ora listr2 conf got

# Installer les dépendances de développement
pnpm add -D typescript tsx tsup vitest @vitest/coverage-v8 \
  @types/node @types/inquirer \
  eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser \
  prettier eslint-config-prettier \
  @changesets/cli

# Créer la structure des répertoires
mkdir -p src/commands src/lib src/types
mkdir -p tests/unit/lib tests/unit/commands
mkdir -p tests/integration/helpers
mkdir -p bin dist .changeset .github/workflows .claude

# Point d'entrée
echo '#!/usr/bin/env node' > bin/my-cli.js
echo 'import("../dist/index.js")' >> bin/my-cli.js
chmod +x bin/my-cli.js

# Créer les fichiers source
touch src/index.ts
touch src/commands/init.ts src/commands/run.ts src/commands/config.ts
touch src/commands/auth.ts src/commands/upgrade.ts
touch src/lib/config.ts src/lib/http.ts src/lib/auth.ts
touch src/lib/errors.ts src/lib/logger.ts src/lib/spinner.ts
touch src/lib/prompt.ts src/lib/version.ts src/lib/output.ts
touch src/types/config.ts src/types/api.ts src/types/command.ts
touch src/env.ts
touch tests/integration/helpers/run-cli.ts tests/integration/helpers/mock-server.ts
touch tests/integration/init.test.ts tests/integration/run.test.ts
touch tests/integration/config.test.ts tests/integration/auth.test.ts
touch tests/unit/lib/config.test.ts tests/unit/lib/errors.test.ts
touch tests/unit/lib/logger.test.ts tests/unit/lib/output.test.ts
touch .env.example .npmignore

# Écrire tsconfig
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "rootDir": "src",
    "declaration": true
  },
  "include": ["src"]
}
EOF

cat > tsconfig.build.json << 'EOF'
{
  "extends": "./tsconfig.json",
  "exclude": ["tests", "**/*.test.ts"]
}
EOF

# Écrire la config tsup
cat > tsup.config.ts << 'EOF'
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  target: 'node18',
})
EOF

# Écrire la config vitest
cat > vitest.config.ts << 'EOF'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**'],
      thresholds: { lines: 80, functions: 80, branches: 75 },
    },
    include: ['tests/**/*.test.ts'],
  },
})
EOF

# Ajouter les scripts dans package.json (modification manuelle requise pour les champs bin + exports)
# Scripts principaux à ajouter :
# "build": "tsup"
# "dev": "tsx src/index.ts"
# "test": "vitest run"
# "test:watch": "vitest"
# "test:coverage": "vitest run --coverage"
# "lint": "eslint src tests"
# "typecheck": "tsc --noEmit"
# "release": "changeset publish"
# "version": "changeset version"

# Initialiser changesets
pnpm changeset init

# Ajouter CLAUDE.md
touch .claude/CLAUDE.md

echo "Projet CLI créé. Modifiez package.json pour ajouter les champs bin, exports et scripts."
```

## Modèle CLAUDE.md

```markdown
# my-cli — Instructions Claude Code

Il s'agit d'un outil CLI Node.js de production écrit en TypeScript. Il est publié sur npm et
utilisé par les développeurs pour interagir avec l'API My CLI depuis le terminal. La base de code
suit une structure stricte une-commande-par-fichier ; chaque nouvelle fonctionnalité est un nouveau
fichier de commande.

## Stack

- TypeScript 5.5 (mode strict, moduleResolution: bundler)
- Commander.js 12 pour l'analyse des arguments et les arbres de sous-commandes
- Inquirer.js 10 pour les invites interactives (assistant de première exécution, confirmations destructives)
- chalk 5 + ora 8 + listr2 5 pour toutes les sorties terminal
- conf 13 pour la persistance de la config (fichier de config au chemin standard de l'OS — voir src/lib/config.ts)
- got 14 pour HTTP avec relances, délai d'expiration et injection d'en-têtes d'auth
- Vitest 2 pour tous les tests (unitaires + intégration)
- tsup 8 pour compiler dist/ (sortie duale ESM + CJS)
- changesets 2 pour le versionnage, la génération de changelog et la publication npm

## Ajouter une nouvelle commande

1. Créer `src/commands/<nom-commande>.ts`
2. Exporter une `Command` de Commander.js avec `.name()`, `.description()`, `.option()` et `.action()`
3. L'importer et l'enregistrer dans `src/index.ts` via `program.addCommand(maCommande)`
4. Ajouter des tests unitaires dans `tests/unit/commands/<nom-commande>.test.ts`
5. Ajouter des tests d'intégration dans `tests/integration/<nom-commande>.test.ts` en utilisant `run-cli.ts`
6. Exécuter `pnpm build && pnpm test` avant d'ouvrir une PR

Les fonctions d'action de commande doivent :
- Utiliser `src/lib/logger.ts` pour toutes les sorties (jamais `console.log` directement)
- Utiliser `withSpinner()` de `src/lib/spinner.ts` pour toute opération asynchrone de plus de ~300ms
- Lever des erreurs typées de `src/lib/errors.ts` — ne jamais lever une `Error` brute
- Respecter le flag global `--output json|table|plain` via `src/lib/output.ts`
- Quitter avec le code 0 en cas de succès, 1 en cas d'erreur utilisateur, 2 en cas d'erreur système/réseau

## Tester la sortie CLI

Les tests d'intégration lancent le binaire compilé. Toujours exécuter `pnpm build` avant les tests d'intégration.

```ts
// Modèle tests/integration/helpers/run-cli.ts
const { stdout, stderr, exitCode } = await runCli(['run', '--target', 'foo'])
expect(exitCode).toBe(0)
expect(stdout).toContain('Success')
```

Les tests unitaires pour les commandes mockent `src/lib/config.ts` et `src/lib/http.ts` au niveau du module.
Ne jamais tester les codes couleur chalk directement — supprimer l'ANSI avant d'asserter sur les chaînes de sortie.

Exécuter les tests :
- `pnpm test` — suite complète unitaires + intégration
- `pnpm test:watch` — mode surveillance pendant le développement
- `pnpm test:coverage` — génère le rapport de couverture dans coverage/

Seuil de couverture : 80% de lignes, 80% de fonctions, 75% de branches. La CI échoue en dessous du seuil.

## Flux de release avec changesets

1. Apporter les modifications sur une branche de fonctionnalité
2. Exécuter `pnpm changeset` — sélectionner le type d'incrément (patch/minor/major), rédiger l'entrée de changelog
3. Committer le fichier `.changeset/<nom-aléatoire>.md` généré avec vos modifications de code
4. Ouvrir une PR — le bot GitHub changesets commentera avec le résumé de la release
5. Après la fusion de la PR sur main, le bot ouvre automatiquement une PR "Version Packages"
6. Réviser et fusionner la PR Version Packages — cela déclenche `release.yml`
7. `release.yml` exécute `pnpm changeset publish` qui incrémente `package.json`, met à jour
   `CHANGELOG.md`, crée un tag git, et publie sur npm

Ne jamais modifier `CHANGELOG.md` manuellement ni incrémenter la version de `package.json` — changesets en est responsable.
Ne jamais exécuter `pnpm changeset publish` en local — seule la CI exécute ceci avec le secret `NODE_AUTH_TOKEN`.

## Emplacement et schéma du fichier de config

L'instance conf se trouve dans `src/lib/config.ts`. La config est stockée à :
- macOS : `~/Library/Preferences/my-cli-nodejs/config.json`
- Linux : `~/.config/my-cli-nodejs/config.json`
- Windows : `%APPDATA%\my-cli-nodejs\Config\config.json`

Schéma de config (défini dans `src/types/config.ts`) :
- `apiUrl` (string, requis) — URL de base pour l'API My CLI
- `authToken` (string, optionnel) — token bearer issu de `my-cli auth login`
- `outputFormat` (enum : json|table|plain, défaut : table)
- `logLevel` (enum : debug|info|warn|error, défaut : info)
- `updateCheckInterval` (number, défaut : 86400) — secondes entre les vérifications de mises à jour npm

Utiliser `my-cli config get <clé>` et `my-cli config set <clé> <valeur>` pour inspecter et modifier.
Exécuter `my-cli config reset` pour effacer le fichier de config et relancer l'assistant d'initialisation.

## Conventions

- Toutes les sorties passent par `src/lib/logger.ts` — pas de `console.log` nu
- Les appels HTTP passent par l'instance got de `src/lib/http.ts` — ne jamais importer got directement
- Le spinner enveloppe chaque opération asynchrone : `withSpinner('Chargement...', () => http.get(...))`
- Les opérations destructives nécessitent `await confirmDestructive(message)` avant exécution
- Le flag `--dry-run` sur toute commande mutante doit être géré et doit éviter l'appel HTTP
- Chaque commande qui liste des ressources supporte `--output json|table|plain`
- Ne jamais stocker de secrets dans le fichier conf en clair au-delà du token d'auth — utiliser le trousseau pour les données sensibles

## Ce qu'il ne faut pas faire

- Ne pas ajouter de `console.log` — utiliser logger.info/warn/error
- Ne pas committer dist/ — il est généré par la CI avant la publication
- Ne pas omettre la confirmation Inquirer pour une commande qui supprime ou écrase des données
- Ne pas ajouter une commande sans l'enregistrer dans src/index.ts
- Ne pas fusionner sans une entrée changeset si la modification affecte le comportement publié
```

## Serveurs MCP

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/yourname/my-cli"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "npm": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-npm"],
      "env": {}
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
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$FILE\" == *.ts ]]; then npx prettier --write \"$FILE\" 2>/dev/null && npx eslint --fix \"$FILE\" 2>/dev/null || true; fi'"
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
            "command": "bash -c 'CMD=\"$CLAUDE_TOOL_INPUT_COMMAND\"; if echo \"$CMD\" | grep -q \"changeset publish\"; then echo \"[HOOK] Ne pas exécuter changeset publish en local — ceci s'\''exécute uniquement en CI via release.yml.\" >&2; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if git -C \"$PWD\" diff --name-only 2>/dev/null | grep -q \"^src/\"; then echo \"Rappel : src/ contient des modifications non commitées. Exécutez pnpm build && pnpm test avant de committer.\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Skills à installer

```bash
npx claudient add skill productivity/code-review
npx claudient add skill productivity/test-generator
npx claudient add skill git/pr-description
npx claudient add skill productivity/refactor
npx claudient add skill productivity/changelog-writer
npx claudient add skill productivity/tech-interview-kit
npx claudient add skill devops-infra/oncall-runbook
```

## Ressources associées

- [Guide de publication d'un CLI](../guides/publishing-cli.md)
- [Flux de release Changesets](../workflows/changesets-release.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
