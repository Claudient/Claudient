# Extension Chrome — Structure de projet

> Pour les développeurs d'extensions de navigateur qui créent des extensions Chrome Manifest v3 avec Plasmo + TypeScript + React, en optimisant le cycle complet depuis la rédaction des scripts de contenu jusqu'à la publication sur le Chrome Web Store.

## Stack technique

- **Framework :** Plasmo 0.90+ (outillage de build, rechargement à chaud, génération du manifeste MV3)
- **Langage :** TypeScript 5.4+
- **Interface :** React 18 (pages popup, options, newtab)
- **Style :** Tailwind CSS 3.4+ avec la bibliothèque de composants `@plasmohq/ui`
- **Arrière-plan :** Service Worker via `background.ts` (conforme Manifest v3)
- **Scripts de contenu :** répertoire `contents/` avec enregistrement automatique basé sur les patterns d'URL
- **Stockage :** `@plasmohq/storage` (enveloppe typée autour de `chrome.storage.sync/local`)
- **Messagerie :** `@plasmohq/messaging` (RPC type-safe popup ↔ background ↔ content)
- **Tests :** Vitest 1.6+ avec `@vitest/browser` pour les tests DOM
- **Linting :** ESLint 9 + `@typescript-eslint` + Prettier 3
- **CI :** GitHub Actions (build, test, publication sur le Chrome Web Store via `tldraw/chrome-webstore-upload`)
- **Alternative de build :** WXT 0.19+ (alternative à Plasmo avec un meilleur HMR)

## Arborescence du projet

```
my-extension/
├── .claude/
│   ├── CLAUDE.md                             # Instructions du projet pour Claude Code
│   └── settings.json                         # Hooks, serveurs MCP, permissions
├── .github/
│   └── workflows/
│       ├── ci.yml                            # Build + tests sur chaque PR
│       └── publish.yml                       # Publication automatique sur le Chrome Web Store lors d'un tag de release
├── assets/
│   ├── icon.png                              # Icône source 512x512 (Plasmo redimensionne automatiquement)
│   ├── icon16.png                            # Icône barre d'outils 16x16
│   ├── icon32.png                            # Icône barre d'outils 32x32
│   ├── icon48.png                            # Icône page des extensions 48x48
│   └── icon128.png                           # Icône Chrome Web Store 128x128
├── components/
│   ├── Button.tsx                            # Bouton UI partagé avec variantes Tailwind
│   ├── Toggle.tsx                            # Interrupteur activé/désactivé pour les paramètres
│   ├── StatusBadge.tsx                       # Indicateur d'état actif/inactif de l'extension
│   └── index.ts                              # Export barrel pour tous les composants
├── contents/
│   ├── github-enhancer.tsx                   # Script de contenu : s'exécute uniquement sur github.com/*
│   ├── youtube-overlay.tsx                   # Script de contenu : s'exécute sur youtube.com/watch
│   ├── all-pages.ts                          # Script de contenu : s'exécute sur <all_urls>
│   └── inline/
│       └── github-inline.ts                  # Script de contenu inline world (sans shadow DOM)
├── lib/
│   ├── storage.ts                            # Helpers chrome.storage typés via @plasmohq/storage
│   ├── messaging.ts                          # Définitions des types de messages pour tous les canaux RPC
│   ├── constants.ts                          # Constantes globales de l'extension (clés, URLs, valeurs par défaut)
│   ├── permissions.ts                        # Helpers pour les demandes de permissions à l'exécution
│   └── utils.ts                              # Fonctions utilitaires pures (analyse d'URL, throttle, etc.)
├── messages/
│   ├── getActiveTab.ts                       # Gestionnaire de messages background : retourne les infos de l'onglet actif
│   ├── toggleFeature.ts                      # Gestionnaire de messages background : active/désactive une fonctionnalité
│   └── fetchData.ts                          # Gestionnaire de messages background : requête authentifiée
├── tabs/
│   └── settings.tsx                          # Onglet paramètres pleine page (ouvert via options_ui)
├── background.ts                             # Point d'entrée du service worker — enregistre les écouteurs, alarmes
├── popup.tsx                                 # Popup de l'action navigateur (interface 320x480)
├── options.tsx                               # Page d'options de l'extension
├── newtab.tsx                                # Page de remplacement du nouvel onglet (optionnel)
├── package.json                              # Dépendances, scripts (dev/build/package)
├── tsconfig.json                             # Configuration TypeScript étendant les valeurs par défaut Plasmo
├── tailwind.config.ts                        # Configuration Tailwind avec chemins de contenu pour tous les .tsx
├── postcss.config.js                         # PostCSS pour le traitement Tailwind
├── .env.example                              # Modèle de clés API (ne jamais committer .env)
├── .env.development                          # Variables d'environnement de développement (URL de base API, flags de debug)
├── .eslintrc.cjs                             # Configuration ESLint avec règles TypeScript et React
├── .prettierrc                               # Configuration Prettier (guillemets simples, indentation 2 espaces)
├── vitest.config.ts                          # Configuration Vitest avec mocks de l'API Chrome
├── vitest.setup.ts                           # Mocks globaux : chrome.storage, chrome.runtime
└── __tests__/
    ├── lib/
    │   ├── storage.test.ts                   # Tests unitaires pour les helpers de stockage
    │   ├── messaging.test.ts                 # Tests unitaires pour les gardes de types de messages
    │   └── utils.test.ts                     # Tests unitaires pour les utilitaires purs
    ├── components/
    │   └── Toggle.test.tsx                   # Tests de composants avec @testing-library/react
    └── background.test.ts                    # Tests de logique du service worker avec les APIs Chrome mockées
```

## Explication des fichiers clés

| Chemin | Rôle |
|---|---|
| `background.ts` | Service worker : enregistre les écouteurs `chrome.runtime.onMessage`, les `chrome.alarms` et les événements `chrome.tabs`. Doit être sans état entre les activations — pas de variables globales en mémoire. |
| `popup.tsx` | Racine React pour la popup de l'action navigateur. Utilise `sendToBackground` de `@plasmohq/messaging` pour appeler les gestionnaires background. Le point de montage est auto-généré par Plasmo. |
| `contents/github-enhancer.tsx` | Script de contenu limité à `github.com/*` via l'export `PlasmoCSConfig` de Plasmo. Injecte une interface React dans le DOM en utilisant `getInlineAnchor` ou `getShadowHostId`. |
| `lib/storage.ts` | Couche de stockage typée utilisant `Storage` de `@plasmohq/storage`. Exporte des getters/setters typés pour chaque clé persistée — ne jamais appeler `chrome.storage` directement. |
| `lib/messaging.ts` | Définitions partagées des types de messages. L'émetteur (`sendToBackground`) et le gestionnaire (`onMessage`) importent depuis ici pour garantir la sécurité des types entre les contextes. |
| `messages/fetchData.ts` | Gestionnaire côté background pour les appels API authentifiés. Le background n'a pas de restrictions CORS — toutes les requêtes externes passent par ici, jamais depuis les scripts de contenu. |
| `.github/workflows/publish.yml` | Compresse l'artefact `build/chrome-mv3-prod/` et le télécharge sur le Chrome Web Store via `chrome-webstore-upload-cli` en utilisant les secrets `CLIENT_ID`, `CLIENT_SECRET`, `REFRESH_TOKEN`. |
| `vitest.setup.ts` | Mocke l'ensemble du namespace `chrome.*` en utilisant `vitest-chrome` afin que les tests unitaires s'exécutent dans Node sans vrai navigateur. |

## Mise en place rapide

```bash
# 1. Bootstrap avec Plasmo
pnpm create plasmo my-extension --with-src
cd my-extension

# 2. Ajouter les packages Plasmo essentiels
pnpm add @plasmohq/storage @plasmohq/messaging @plasmohq/ui

# 3. Ajouter Tailwind CSS
pnpm add -D tailwindcss postcss autoprefixer
pnpx tailwindcss init -p

# 4. Ajouter la stack de tests
pnpm add -D vitest @vitest/coverage-v8 @testing-library/react @testing-library/user-event jsdom vitest-chrome

# 5. Créer la structure de répertoires
mkdir -p contents lib messages components assets tabs __tests__/{lib,components} .github/workflows .claude

# 6. Créer les fichiers lib essentiels
touch lib/storage.ts lib/messaging.ts lib/constants.ts lib/permissions.ts lib/utils.ts

# 7. Créer les gestionnaires de messages
touch messages/getActiveTab.ts messages/toggleFeature.ts messages/fetchData.ts

# 8. Créer les workflows GitHub Actions
touch .github/workflows/ci.yml .github/workflows/publish.yml

# 9. Créer les fichiers d'environnement
touch .env.example .env.development
echo "PLASMO_PUBLIC_API_URL=https://api.example.com" >> .env.example

# 10. Créer la configuration et le setup Vitest
cat > vitest.config.ts << 'EOF'
import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
  },
})
EOF

cat > vitest.setup.ts << 'EOF'
import { vi } from "vitest"
import "vitest-chrome"
EOF

# 11. Ajouter les scripts dans package.json (Plasmo configure dev/build, ajouter ceux-ci)
# "test": "vitest run"
# "test:watch": "vitest"
# "test:coverage": "vitest run --coverage"
# "lint": "eslint . --ext .ts,.tsx"
# "typecheck": "tsc --noEmit"

# 12. Initialiser CLAUDE.md
touch .claude/CLAUDE.md
```

## Modèle CLAUDE.md

```markdown
# Extension Chrome — CLAUDE.md

## Description

Une extension Chrome Manifest v3 construite avec Plasmo, TypeScript, React et Tailwind CSS.
L'extension améliore [décrire les sites cibles/le cas d'usage ici].

## Stack technique

- Plasmo 0.90+ (build, génération du manifeste, rechargement à chaud)
- TypeScript 5.4 + React 18 + Tailwind CSS 3.4
- @plasmohq/storage (enveloppe typée de Chrome Storage)
- @plasmohq/messaging (RPC type-safe entre contextes)
- Vitest 1.6 + vitest-chrome (tests unitaires)
- GitHub Actions (CI + publication Chrome Web Store)

## Exécution en local

```bash
pnpm dev              # Démarrer le serveur de développement Plasmo avec rechargement à chaud
# Charger non empaqueté : chrome://extensions → Mode développeur → Charger l'extension non empaquetée → build/chrome-mv3-dev/
pnpm build            # Build de production → build/chrome-mv3-prod/
pnpm package          # Compresser build/chrome-mv3-prod/ pour l'upload sur le Web Store
pnpm test             # Exécuter les tests unitaires Vitest
pnpm typecheck        # tsc --noEmit (aucune sortie, vérifie uniquement les types)
pnpm lint             # ESLint sur tous les fichiers .ts/.tsx
```

## Ajout d'un nouveau script de contenu

1. Créer `contents/mon-script.tsx` (React) ou `contents/mon-script.ts` (vanilla).
2. Exporter `PlasmoCSConfig` pour déclarer les patterns de correspondance d'URL :
   ```ts
   export const config: PlasmoCSConfig = {
     matches: ["https://example.com/*"],
     all_frames: false,
   }
   ```
3. Exporter par défaut votre composant (React) ou exécuter la logique inline (vanilla).
4. Plasmo enregistre automatiquement le script — aucune édition manuelle du manifeste requise.
5. Pour les scripts inline world (accès aux globals JS de la page) : définir `world: "MAIN"` dans la config.

## Messagerie entre contextes

Toute communication inter-contextes utilise @plasmohq/messaging. Les types résident dans `lib/messaging.ts`.

Popup → Background (requête/réponse) :
```ts
// popup.tsx
import { sendToBackground } from "@plasmohq/messaging"
const result = await sendToBackground({ name: "fetchData", body: { url } })
```

Gestionnaire background (`messages/fetchData.ts`) :
```ts
import type { PlasmoMessaging } from "@plasmohq/messaging"
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const data = await fetch(req.body.url).then(r => r.json())
  res.send({ data })
}
export default handler
```

Content → Background : utiliser `sendToBackground` depuis `@plasmohq/messaging/background`.
Background → Content : utiliser `chrome.tabs.sendMessage(tabId, payload)` — pas de RPC Plasmo.

## Patterns de stockage Chrome

Ne jamais appeler `chrome.storage` directement. Utiliser `lib/storage.ts` :
```ts
import { Storage } from "@plasmohq/storage"
const storage = new Storage({ area: "sync" }) // ou "local"
await storage.set("featureEnabled", true)
const val = await storage.get<boolean>("featureEnabled")
```

Utiliser `sync` pour les préférences utilisateur (quota 5 Mo, synchronisé entre appareils).
Utiliser `local` pour les données en cache volumineuses (quota illimité, appareil uniquement).

## Processus de déclaration des permissions

1. Ajouter la chaîne de permission à la clé `manifest` dans `package.json` :
   ```json
   "manifest": {
     "permissions": ["tabs", "storage", "scripting"],
     "host_permissions": ["https://example.com/*"]
   }
   ```
2. Pour les permissions optionnelles, utiliser `chrome.permissions.request()` à l'exécution via `lib/permissions.ts`.
3. Exécuter `pnpm build` et vérifier le `build/chrome-mv3-prod/manifest.json` généré.
4. Documenter pourquoi la permission est nécessaire dans un commentaire — l'examen du Chrome Web Store exige une justification.
5. Minimiser les permissions — ne demander que ce dont la fonctionnalité actuelle a besoin, pas les futures.

## Conventions

- Toutes les clés de stockage sont des constantes de type string dans `lib/constants.ts` — ne jamais inliner les chaînes de clés.
- Toutes les requêtes externes (vers des API tierces) passent par un gestionnaire de messages background, pas les scripts de contenu.
- Les scripts de contenu ne peuvent pas importer de modules Node.js — uniquement du code compatible navigateur.
- Les fichiers de gestionnaires de messages dans `messages/` doivent exporter un seul gestionnaire par défaut — pas d'exports nommés.
- Les classes Tailwind vont directement dans le JSX — pas de modules CSS, pas de styles inline.
- Toutes les nouvelles fonctionnalités doivent avoir des tests unitaires Vitest avant la fusion.

## Liste de vérification pour la publication

- [ ] Incrémenter `version` dans `package.json` (suit semver)
- [ ] Mettre à jour la description de la fiche sur le store dans `.github/store-listing.md`
- [ ] Exécuter `pnpm build` et tester manuellement l'extension packagée en local
- [ ] Exécuter `pnpm test` — tous les tests au vert
- [ ] Exécuter `pnpm typecheck` — aucune erreur de type
- [ ] Tagger la release : `git tag v1.x.x && git push --tags`
- [ ] GitHub Actions `publish.yml` se déclenche automatiquement et télécharge sur le Web Store
- [ ] Soumettre à la révision dans le Chrome Developer Dashboard si les permissions ont changé
```

## Serveurs MCP

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-filesystem", "/Users/you/my-extension"],
      "description": "Lire/écrire les fichiers source de l'extension"
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      },
      "description": "Ouvrir des PRs, lire les logs CI, gérer les releases"
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server"],
      "description": "Piloter Chrome avec l'extension chargée pour la vérification end-to-end"
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
            "command": "cd /Users/you/my-extension && pnpm lint --fix --quiet 2>&1 | tail -5",
            "description": "Corriger automatiquement les erreurs de lint après chaque écriture de fichier"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "cd /Users/you/my-extension && pnpm typecheck 2>&1 | grep -E 'error TS' | head -10",
            "description": "Afficher immédiatement les erreurs TypeScript après l'écriture de fichiers"
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
            "command": "echo 'Reminder: never call chrome.storage directly — use lib/storage.ts'",
            "description": "Rappeler à Claude d'utiliser l'enveloppe de stockage typée avant toute exécution bash"
          }
        ]
      }
    ]
  }
}
```

## Skills à installer

```bash
npx claudient add skill devops-infra/github-actions-ci
npx claudient add skill frontend/react-component
npx claudient add skill frontend/tailwind-ui
npx claudient add skill devops-infra/release-management
npx claudient add workflow chrome-extension-publish
```

## Ressources associées

- [../guides/chrome-extension-messaging.md](../guides/chrome-extension-messaging.md)
- [../guides/plasmo-getting-started.md](../guides/plasmo-getting-started.md)
- [../workflows/chrome-extension-publish.md](../workflows/chrome-extension-publish.md)
- [../workflows/content-script-rollout.md](../workflows/content-script-rollout.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
