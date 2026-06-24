# Site de documentation (Astro + Starlight) — Structure du projet

> Pour les equipes de documentation technique qui publient des docs de reference MDX sur Astro 4 + Starlight, en optimisant le workflow ecriture-apercu-deploiement avec recherche plein texte et verification automatisee des liens.

## Stack

- **Framework :** Astro 4.x avec Starlight 0.23+ (theme de documentation)
- **Langage :** TypeScript 5.4+
- **Format de contenu :** MDX (`.mdx`) avec les collections de contenu Astro
- **Recherche :** Algolia DocSearch (base sur un crawler, gratuit pour les docs publiques)
- **Gestionnaire de paquets :** npm 10+ (ou pnpm 9+)
- **Deploiement :** Vercel (sortie site statique, CDN edge)
- **CI/CD :** GitHub Actions (`build-check.yml`, `broken-links.yml`)
- **Verification des liens :** Playwright 1.44+ (crawle le site rendu pour detecter les 404)
- **Bibliotheque de composants :** Composants MDX personnalises — `Callout`, `CodeTabs`, `Steps`, `ApiRef`
- **Coloration syntaxique :** Shiki (integre a Starlight) avec theme personnalise
- **Sitemap :** `@astrojs/sitemap` (genere automatiquement, consomme par le crawler Algolia)

## Arborescence du repertoire

```
docs-site/                                    # Racine de la documentation Astro + Starlight
├── .claude/
│   ├── CLAUDE.md                             # Instructions au niveau du depot pour Claude Code
│   ├── settings.json                         # Serveurs MCP, hooks, permissions
│   └── commands/
│       ├── new-doc.md                        # /new-doc — genere une nouvelle page MDX avec frontmatter
│       ├── add-callout.md                    # /add-callout — insere un bloc callout type au curseur
│       ├── check-links.md                    # /check-links — lance le verificateur de liens Playwright en local
│       ├── rebuild-index.md                  # /rebuild-index — declenche le crawler Algolia via l'API
│       └── update-sidebar.md                 # /update-sidebar — ajoute une entree de nav dans astro.config.mjs
├── .github/
│   └── workflows/
│       ├── build-check.yml                   # Construit le site Astro a chaque PR ; echoue sur les erreurs TS
│       └── broken-links.yml                  # Crawl Playwright de l'URL de preview ; bloque la fusion sur les 404
├── src/
│   ├── content/
│   │   ├── config.ts                         # Definitions des schemas de collections de contenu Astro
│   │   └── docs/                             # Toutes les pages de documentation se trouvent ici
│   │       ├── getting-started/
│   │       │   ├── index.mdx                 # Accueil : presentation du produit + demarrage rapide
│   │       │   ├── installation.mdx          # Etapes d'installation avec CodeTabs pour npm/pnpm/yarn
│   │       │   ├── authentication.mdx        # Configuration de l'auth — cles API, OAuth, variables d'environnement
│   │       │   └── first-request.mdx         # Hello world de bout en bout avec extrait executable
│   │       ├── guides/
│   │       │   ├── index.mdx                 # Accueil des guides avec grille de cartes
│   │       │   ├── error-handling.mdx
│   │       │   ├── pagination.mdx
│   │       │   ├── rate-limiting.mdx
│   │       │   ├── webhooks.mdx
│   │       │   └── sdk-migration.mdx         # Mise a niveau entre versions majeures du SDK
│   │       ├── api-reference/
│   │       │   ├── index.mdx                 # Vue d'ensemble de l'API : URL de base, versionnage, en-tete d'auth
│   │       │   ├── endpoints/
│   │       │   │   ├── users.mdx             # /users — operations CRUD avec onglets requete/reponse
│   │       │   │   ├── organizations.mdx
│   │       │   │   ├── webhooks.mdx
│   │       │   │   └── events.mdx
│   │       │   ├── objects/
│   │       │   │   ├── user-object.mdx       # Reference complete champ par champ avec types
│   │       │   │   ├── error-object.mdx
│   │       │   │   └── pagination-object.mdx
│   │       │   └── errors.mdx                # Tableau complet des codes d'erreur HTTP
│   │       └── tutorials/
│   │           ├── index.mdx                 # Accueil des tutoriels
│   │           ├── build-a-dashboard.mdx     # Multi-etapes avec le composant Steps
│   │           ├── sync-with-webhook.mdx
│   │           └── migrate-from-v1.mdx       # Guide de migration avec blocs de code style diff
│   ├── components/
│   │   ├── Callout.astro                     # Callout type : note | warning | danger | tip
│   │   ├── CodeTabs.astro                    # Bloc de code avec selecteur de langage (npm/pnpm/curl etc.)
│   │   ├── Steps.astro                       # Liste d'etapes numerotees avec compteur automatique
│   │   ├── ApiRef.astro                      # Bloc de signature d'endpoint : badge methode + URL
│   │   ├── ParamTable.astro                  # Tableau des parametres requete/reponse avec types
│   │   └── VersionBadge.astro                # Composant badge "Ajoute dans la v2.3"
│   ├── assets/
│   │   ├── diagrams/
│   │   │   ├── auth-flow.svg                 # Diagramme de sequence d'auth (modifiable dans Excalidraw)
│   │   │   ├── webhook-lifecycle.svg
│   │   │   └── data-model.svg
│   │   └── screenshots/
│   │       ├── dashboard-overview.png
│   │       └── api-key-screen.png
│   └── styles/
│       └── custom.css                        # Proprietes CSS personnalisees remplacant le theme Starlight
├── public/
│   ├── favicon.svg
│   ├── robots.txt                            # Autoriser tout ; pointe vers sitemap.xml
│   └── og-image.png                          # Image OpenGraph pour le partage sur les reseaux sociaux
├── tests/
│   └── links/
│       ├── broken-links.spec.ts              # Playwright : crawle le sitemap, verifie l'absence de 404/500
│       └── playwright.config.ts              # baseURL depuis la variable d'env PLAYWRIGHT_BASE_URL
├── scripts/
│   └── trigger-algolia-crawl.ts             # Appelle l'API Algolia Crawler pour reindexter ; execute apres le deploiement
├── astro.config.mjs                          # Config Starlight : sidebar, Algolia, liens sociaux, i18n
├── tsconfig.json                             # TypeScript strict ; alias de chemin @components, @assets
├── package.json                              # Scripts : dev, build, preview, typecheck, test:links
├── .env.example                              # ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_INDEX_NAME
└── .env.local                                # Substitutions locales (gitignore)
```

## Explication des fichiers cles

| Chemin | Role |
|---|---|
| `astro.config.mjs` | Source de verite unique pour Starlight : arborescence de la sidebar, cles de config Algolia DocSearch, liens sociaux, favicon, locale par defaut ; les entrees de la sidebar doivent correspondre aux noms de fichiers dans `src/content/docs/` |
| `src/content/config.ts` | Definit le schema de la collection de contenu `docs` en utilisant `docsSchema()` depuis `@astrojs/starlight/schema` ; a etendre ici pour ajouter des champs frontmatter personnalises comme `version`, `status` ou `apiMethod` |
| `src/components/Callout.astro` | Affiche des blocs callout styles ; accepte la prop `type` (`note` | `warning` | `danger` | `tip`) ; utilise en MDX comme `<Callout type="warning">texte</Callout>` |
| `src/components/CodeTabs.astro` | Bloc de code avec onglets ; accepte un tableau d'objets `{ label, lang, code }` ; persiste la selection d'onglet dans localStorage via l'attribut `data-persist-tab` |
| `src/components/Steps.astro` | Liste ordonnee avec reinitialisation du compteur CSS ; les enfants sont du contenu de slot ordinaire ; evite la numerotation manuelle en MDX |
| `tests/links/broken-links.spec.ts` | Recupere `sitemap.xml`, extrait toutes les URL `<loc>`, visite chacune avec Playwright, verifie que `response.status() < 400` ; execute contre l'URL de preview Vercel en CI |
| `scripts/trigger-algolia-crawl.ts` | Envoie un POST a `https://crawler.algolia.com/api/1/crawlers/{crawlerId}/reindex` avec auth Basic en utilisant `ALGOLIA_APP_ID` + `ALGOLIA_API_KEY` ; execute apres chaque deploiement en production |
| `.github/workflows/broken-links.yml` | Declenche sur `pull_request` ; deploie sur Vercel preview via `vercel deploy --prebuilt`, definit `PLAYWRIGHT_BASE_URL`, execute `npm run test:links` ; publie les resultats comme verification de PR |

## Scaffold rapide

```bash
# Prerequis : Node 20+, npm 10+

# Creer un projet Astro + Starlight
npm create astro@latest docs-site -- --template starlight
cd docs-site

# Installer Playwright pour la verification des liens
npm install --save-dev @playwright/test
npx playwright install chromium

# Installer la recherche Algolia (plugin Starlight)
npm install @astrojs/starlight

# Installer l'integration sitemap (necessaire pour le crawler Algolia et Playwright)
npm install @astrojs/sitemap

# Creer la structure des repertoires de contenu
mkdir -p src/content/docs/getting-started
mkdir -p src/content/docs/guides
mkdir -p src/content/docs/api-reference/endpoints
mkdir -p src/content/docs/api-reference/objects
mkdir -p src/content/docs/tutorials

# Creer les fichiers de composants
mkdir -p src/components src/assets/diagrams src/assets/screenshots src/styles

touch src/components/Callout.astro
touch src/components/CodeTabs.astro
touch src/components/Steps.astro
touch src/components/ApiRef.astro
touch src/components/ParamTable.astro
touch src/components/VersionBadge.astro
touch src/styles/custom.css

# Creer la structure des tests Playwright
mkdir -p tests/links
touch tests/links/broken-links.spec.ts
touch tests/links/playwright.config.ts

# Creer les scripts post-deploiement
mkdir -p scripts
touch scripts/trigger-algolia-crawl.ts

# Creer les workflows GitHub Actions
mkdir -p .github/workflows
touch .github/workflows/build-check.yml
touch .github/workflows/broken-links.yml

# Creer les assets publics
touch public/robots.txt public/og-image.png

# Creer la config Claude Code
mkdir -p .claude/commands
touch .claude/CLAUDE.md .claude/settings.json
touch .claude/commands/new-doc.md
touch .claude/commands/add-callout.md
touch .claude/commands/check-links.md
touch .claude/commands/rebuild-index.md
touch .claude/commands/update-sidebar.md

# Creer les fichiers d'environnement
touch .env.example .env.local

# Installer les skills UitKit
npx uitkit add skill productivity/doc-site-builder
npx uitkit add skill devops-infra/cicd
npx uitkit add skill devops-infra/vercel

echo "Site de documentation Astro + Starlight genere. Lancer : npm run dev"
```

## Modele CLAUDE.md

```markdown
# Site de documentation

Site de documentation developpeur Astro 4 + Starlight. Le contenu se trouve dans src/content/docs/
sous forme de fichiers MDX. La navigation dans la sidebar est definie dans astro.config.mjs. La recherche
est propulsee par Algolia DocSearch (base sur un crawler). Deploye sur Vercel depuis la branche main
via GitHub Actions.

## Stack

- Astro 4.x + Starlight 0.23+ (theme de documentation)
- TypeScript 5.4 (mode strict)
- Contenu MDX avec collections de contenu Astro
- Composants Astro personnalises : Callout, CodeTabs, Steps, ApiRef, ParamTable, VersionBadge
- Algolia DocSearch (index reconstruit via l'API crawler apres le deploiement)
- Vercel (sortie statique, deploys de preview par PR)
- GitHub Actions : build-check.yml (build TS + Astro), broken-links.yml (Playwright)
- Playwright 1.44+ pour la verification des liens sur les URLs de preview

## Ajouter une nouvelle page de documentation — etapes exactes

1. Creer le fichier MDX dans le bon dossier thematique sous src/content/docs/ :
   - Concepts de demarrage → getting-started/
   - Guides pratiques → guides/
   - Reference des endpoints et objets → api-reference/endpoints/ ou api-reference/objects/
   - Tutoriels pas a pas → tutorials/
2. Ajouter le frontmatter obligatoire : title, description, sidebar.order (si l'ordre est important)
3. Ajouter une entree dans la sidebar de astro.config.mjs sous starlight > sidebar > items
4. Utiliser la commande slash /new-doc pour generer le frontmatter et la structure des sections
5. Executer npm run dev et verifier que la page s'affiche a l'URL attendu
6. Executer npm run typecheck pour detecter les erreurs TypeScript dans les composants MDX

## Bibliotheque de composants MDX

Tous les composants sont importes en haut du fichier MDX :
  import Callout from '@components/Callout.astro'
  import CodeTabs from '@components/CodeTabs.astro'
  import Steps from '@components/Steps.astro'

Types de Callout : note | warning | danger | tip
  <Callout type="warning">Cela casse dans la v2 — migrez avant de mettre a niveau.</Callout>

CodeTabs — onglets labellises par langage pour les extraits multi-langages :
  <CodeTabs tabs={[
    { label: "npm", lang: "bash", code: "npm install @acme/sdk" },
    { label: "pnpm", lang: "bash", code: "pnpm add @acme/sdk" },
    { label: "curl", lang: "bash", code: "curl https://api.acme.com/v1/users" }
  ]} />

Steps — liste ordonnee avec numerotation automatique :
  <Steps>
    <p>Installer le SDK.</p>
    <p>Definir votre cle API dans l'environnement.</p>
    <p>Effectuer votre premiere requete.</p>
  </Steps>

ApiRef — en-tete de signature d'endpoint :
  <ApiRef method="POST" path="/v1/users" />

NE PAS utiliser des listes ordonnees HTML brutes pour les sequences d'etapes — utiliser Steps.
NE PAS ecrire <div class="callout"> manuellement — utiliser Callout.

## Configuration de la navigation de la sidebar

La sidebar est configuree dans astro.config.mjs a l'interieur du plugin starlight() :

  starlight({
    sidebar: [
      {
        label: 'Demarrage',
        items: [
          { label: 'Vue d\'ensemble', link: '/getting-started/' },
          { label: 'Installation', link: '/getting-started/installation/' },
        ],
      },
      {
        label: 'Reference API',
        autogenerate: { directory: 'api-reference' },
      },
    ],
  })

Utiliser autogenerate pour les grandes sections (api-reference, tutorials).
Utiliser items[] explicites pour les sections ou l'ordre est important (getting-started, guides).
Le champ frontmatter sidebar.order controle l'ordre de tri dans les groupes autogeneres.

## Execution des commandes

# Serveur de dev local avec rechargement a chaud
npm run dev

# Build de production complet (detecte les imports casses et les erreurs TS)
npm run build

# Apercu du build de production en local
npm run preview

# Verification des types sans build
npm run typecheck

# Lancer le verificateur de liens Playwright contre l'apercu local
PLAYWRIGHT_BASE_URL=http://localhost:4321 npm run test:links

# Declencher la reindeaxation Algolia (necessite ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_CRAWLER_ID)
npx tsx scripts/trigger-algolia-crawl.ts

## Reconstruction de l'index Algolia

L'index Algolia DocSearch est reconstruit via l'API Algolia Crawler, pas le client JavaScript.
Conditions de declenchement :
- Automatiquement : scripts/trigger-algolia-crawl.ts s'execute dans broken-links.yml apres le deploiement en production
- Manuellement : executer la commande slash /rebuild-index ou invoquer le script directement
- NE PAS pousser du contenu directement dans l'index Algolia — laisser le crawler le faire depuis le site en ligne

Variables d'environnement requises pour le script :
  ALGOLIA_APP_ID=xxx
  ALGOLIA_API_KEY=xxx          # Cle API Crawler, PAS la cle frontend search-only
  ALGOLIA_CRAWLER_ID=xxx       # Disponible dans le tableau de bord Algolia Crawler
  ALGOLIA_INDEX_NAME=docs

## Deploiement

- Chaque push sur main declenche automatiquement un deploiement de production Vercel
- Chaque PR obtient une URL de deploy de preview Vercel
- broken-links.yml attend le deploy de preview, puis execute Playwright dessus
- Ne pas fusionner une PR si broken-links.yml echoue
- L'URL de production est definie dans PLAYWRIGHT_BASE_URL dans le workflow broken-links.yml

## Conventions de frontmatter

Chaque page doit avoir :
  ---
  title: "Titre tel qu'il apparait dans la sidebar et le <h1>"
  description: "Une phrase — affichee dans les resultats de recherche et les metadonnees OG"
  ---

Optionnel :
  sidebar:
    order: 2                   # Controle la position dans les groupes autogeneres
    label: "Nom court de la sidebar"  # Si different du titre
  version: "2.1"               # Version de l'API documentee sur cette page

## Ce qu'il ne faut pas faire

- Ne pas ajouter des entrees dans la sidebar sans fichier MDX correspondant — Starlight echoue au build
- Ne pas ecrire des tables HTML brutes pour la documentation des parametres — utiliser le composant ParamTable
- Ne pas mettre des images dans src/content/ — les placer dans src/assets/ et les importer en MDX
- Ne pas commiter .env.local ni aucun fichier contenant de vraies cles API Algolia
- Ne pas modifier manuellement l'index Algolia — seul le crawler doit y ecrire
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
        "/Users/yourname/docs-site/src"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server"]
    }
  }
}
```

## Hooks recommandes

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'f=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$f\" == *.mdx || \"$f\" == *.md ]]; then npx prettier --write --parser mdx \"$f\" 2>/dev/null || true; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'f=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$f\" == */astro.config.mjs ]]; then echo \"[HOOK] astro.config.mjs modifie — verifier que la sidebar correspond aux fichiers dans src/content/docs/ et executer : npm run build\" >&2; fi'"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_COMMAND\" | grep -q \"trigger-algolia-crawl\"; then echo \"[HOOK] Reindexation Algolia declenchee — s\'assurer que le site est deploye et que ALGOLIA_CRAWLER_ID est defini\" >&2; fi'"
          }
        ]
      }
    ]
  }
}
```

## Skills a installer

```bash
npx uitkit add skill productivity/doc-site-builder
npx uitkit add skill devops-infra/cicd
npx uitkit add skill devops-infra/vercel
npx uitkit add skill testing/playwright
```

## En lien

- [Guide de redaction technique](../guides/technical-writing.md)
- [Workflow de publication de documentation](../workflows/doc-publishing.md)
