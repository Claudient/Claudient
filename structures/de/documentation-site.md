# Dokumentationswebsite (Astro + Starlight) — Projektstruktur

> Fur Entwicklerdokumentationsteams, die MDX-basierte Referenzdokumentation auf Astro 4 + Starlight veroffentlichen und dabei den Schreib-Vorschau-Bereitstellungs-Workflow mit Volltextsuche und automatisierter Linkpruefung optimieren.

## Stack

- **Framework:** Astro 4.x mit Starlight 0.23+ (Dokumentationsthema)
- **Sprache:** TypeScript 5.4+
- **Inhaltsformat:** MDX (`.mdx`) mit Astro Content Collections
- **Suche:** Algolia DocSearch (Crawler-basiert, kostenlos fur oeffentliche Dokumentationen)
- **Paketmanager:** npm 10+ (oder pnpm 9+)
- **Bereitstellung:** Vercel (statische Seitenausgabe, Edge CDN)
- **CI/CD:** GitHub Actions (`build-check.yml`, `broken-links.yml`)
- **Linkpruefung:** Playwright 1.44+ (crawlt die gerenderte Seite auf 404-Fehler)
- **Komponentenbibliothek:** Benutzerdefinierte MDX-Komponenten — `Callout`, `CodeTabs`, `Steps`, `ApiRef`
- **Syntaxhervorhebung:** Shiki (in Starlight integriert) mit benutzerdefiniertem Theme
- **Sitemap:** `@astrojs/sitemap` (automatisch generiert, vom Algolia Crawler verwendet)

## Verzeichnisbaum

```
docs-site/                                    # Astro + Starlight Dokumentationswurzel
├── .claude/
│   ├── CLAUDE.md                             # Repository-Anweisungen fur Claude Code
│   ├── settings.json                         # MCP-Server, Hooks, Berechtigungen
│   └── commands/
│       ├── new-doc.md                        # /new-doc — neue MDX-Seite mit Frontmatter erstellen
│       ├── add-callout.md                    # /add-callout — typisierten Callout-Block am Cursor einfugen
│       ├── check-links.md                    # /check-links — Playwright-Linkprufer lokal ausfuhren
│       ├── rebuild-index.md                  # /rebuild-index — Algolia Crawler per API auslosen
│       └── update-sidebar.md                 # /update-sidebar — Nav-Eintrag zu astro.config.mjs hinzufugen
├── .github/
│   └── workflows/
│       ├── build-check.yml                   # Astro-Seite bei jedem PR erstellen; schlagt bei TS-Fehlern fehl
│       └── broken-links.yml                  # Playwright-Crawl der Vorschau-URL; blockiert Merge bei 404-Fehlern
├── src/
│   ├── content/
│   │   ├── config.ts                         # Astro Content Collection Schema-Definitionen
│   │   └── docs/                             # Alle Dokumentationsseiten befinden sich hier
│   │       ├── getting-started/
│   │       │   ├── index.mdx                 # Einstieg: Produktbeschreibung + Schnellstart
│   │       │   ├── installation.mdx          # Installationsschritte mit CodeTabs fur npm/pnpm/yarn
│   │       │   ├── authentication.mdx        # Auth-Einrichtung — API-Schlussel, OAuth, Umgebungsvariablen
│   │       │   └── first-request.mdx         # End-to-End Hello World mit ausfuhrbarem Codeausschnitt
│   │       ├── guides/
│   │       │   ├── index.mdx                 # Guides-Ubersicht mit Kachelraster
│   │       │   ├── error-handling.mdx
│   │       │   ├── pagination.mdx
│   │       │   ├── rate-limiting.mdx
│   │       │   ├── webhooks.mdx
│   │       │   └── sdk-migration.mdx         # Upgrade zwischen SDK-Hauptversionen
│   │       ├── api-reference/
│   │       │   ├── index.mdx                 # API-Ubersicht: Basis-URL, Versionierung, Auth-Header
│   │       │   ├── endpoints/
│   │       │   │   ├── users.mdx             # /users — CRUD-Operationen mit Anfrage-/Antwort-Tabs
│   │       │   │   ├── organizations.mdx
│   │       │   │   ├── webhooks.mdx
│   │       │   │   └── events.mdx
│   │       │   ├── objects/
│   │       │   │   ├── user-object.mdx       # Vollstandige Feldreferenz mit Typen
│   │       │   │   ├── error-object.mdx
│   │       │   │   └── pagination-object.mdx
│   │       │   └── errors.mdx                # Vollstandige HTTP-Fehlercode-Tabelle
│   │       └── tutorials/
│   │           ├── index.mdx                 # Tutorials-Ubersicht
│   │           ├── build-a-dashboard.mdx     # Mehrstufig mit Steps-Komponente
│   │           ├── sync-with-webhook.mdx
│   │           └── migrate-from-v1.mdx       # Migrationsleitfaden mit Diff-Stil-Codeblöcken
│   ├── components/
│   │   ├── Callout.astro                     # Typisierter Callout: note | warning | danger | tip
│   │   ├── CodeTabs.astro                    # Sprachumschalter-Codeblock (npm/pnpm/curl usw.)
│   │   ├── Steps.astro                       # Nummerierte Schritt-Liste mit automatischem Zahler
│   │   ├── ApiRef.astro                      # Endpunkt-Signaturblock: Methoden-Badge + URL
│   │   ├── ParamTable.astro                  # Anfrage-/Antwort-Parametertabelle mit Typen
│   │   └── VersionBadge.astro                # "Hinzugefugt in v2.3"-Badge-Komponente
│   ├── assets/
│   │   ├── diagrams/
│   │   │   ├── auth-flow.svg                 # Auth-Sequenzdiagramm (in Excalidraw bearbeitbar)
│   │   │   ├── webhook-lifecycle.svg
│   │   │   └── data-model.svg
│   │   └── screenshots/
│   │       ├── dashboard-overview.png
│   │       └── api-key-screen.png
│   └── styles/
│       └── custom.css                        # CSS-Benutzereigenschaften, die das Starlight-Theme uberschreiben
├── public/
│   ├── favicon.svg
│   ├── robots.txt                            # Alle erlauben; verweist auf sitemap.xml
│   └── og-image.png                          # OpenGraph-Bild fur Social Sharing
├── tests/
│   └── links/
│       ├── broken-links.spec.ts              # Playwright: Sitemap crawlen, keine 404/500 bestatigen
│       └── playwright.config.ts              # baseURL aus der Umgebungsvariable PLAYWRIGHT_BASE_URL
├── scripts/
│   └── trigger-algolia-crawl.ts             # Ruft die Algolia Crawler API zur Neuindizierung auf; nach dem Deploy ausfuhren
├── astro.config.mjs                          # Starlight-Konfiguration: Sidebar, Algolia, Social-Links, i18n
├── tsconfig.json                             # Striktes TypeScript; Pfad-Alias @components, @assets
├── package.json                              # Skripte: dev, build, preview, typecheck, test:links
├── .env.example                              # ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_INDEX_NAME
└── .env.local                                # Lokale Uberschreibungen (gitignore)
```

## Wichtige Dateien erlautert

| Pfad | Zweck |
|---|---|
| `astro.config.mjs` | Einzige Wahrheitsquelle fur Starlight: Sidebar-Baum, Algolia DocSearch-Konfigurationsschlussel, Social-Links, Favicon, Standardgebietsschema; Sidebar-Eintrage mussen den Dateinamen in `src/content/docs/` entsprechen |
| `src/content/config.ts` | Definiert das `docs`-Content-Collection-Schema mit `docsSchema()` aus `@astrojs/starlight/schema`; hier erweitern, um benutzerdefinierte Frontmatter-Felder wie `version`, `status` oder `apiMethod` hinzuzufugen |
| `src/components/Callout.astro` | Rendert gestylte Callout-Blocke; akzeptiert die `type`-Prop (`note` | `warning` | `danger` | `tip`); in MDX verwendet als `<Callout type="warning">Text</Callout>` |
| `src/components/CodeTabs.astro` | Codeblock mit Tab-Wechsel; akzeptiert ein Array von `{ label, lang, code }`-Objekten; speichert die Tab-Auswahl per `data-persist-tab`-Attribut im localStorage |
| `src/components/Steps.astro` | Geordnete Liste mit CSS-Zahler-Reset; Kinder sind normaler Slot-Inhalt; vermeidet manuelle Nummerierung in MDX |
| `tests/links/broken-links.spec.ts` | Ruft `sitemap.xml` ab, extrahiert alle `<loc>`-URLs, besucht jede mit Playwright, stellt sicher dass `response.status() < 400`; in CI gegen Vercel Vorschau-URL ausfuhren |
| `scripts/trigger-algolia-crawl.ts` | Sendet POST an `https://crawler.algolia.com/api/1/crawlers/{crawlerId}/reindex` mit Basic-Auth unter Verwendung von `ALGOLIA_APP_ID` + `ALGOLIA_API_KEY`; nach jedem Produktions-Deploy ausfuhren |
| `.github/workflows/broken-links.yml` | Wird bei `pull_request` ausgelost; deployt zur Vercel-Vorschau via `vercel deploy --prebuilt`, setzt `PLAYWRIGHT_BASE_URL`, fuhrt `npm run test:links` aus; veroffentlicht Ergebnisse als PR-Check |

## Schnelles Scaffolding

```bash
# Voraussetzungen: Node 20+, npm 10+

# Astro + Starlight Projekt erstellen
npm create astro@latest docs-site -- --template starlight
cd docs-site

# Playwright fur die Linkpruefung installieren
npm install --save-dev @playwright/test
npx playwright install chromium

# Algolia-Suche installieren (Starlight-Plugin)
npm install @astrojs/starlight

# Sitemap-Integration installieren (benotigt fur Algolia Crawler und Playwright)
npm install @astrojs/sitemap

# Inhaltsverzeichnisstruktur erstellen
mkdir -p src/content/docs/getting-started
mkdir -p src/content/docs/guides
mkdir -p src/content/docs/api-reference/endpoints
mkdir -p src/content/docs/api-reference/objects
mkdir -p src/content/docs/tutorials

# Komponentendateien erstellen
mkdir -p src/components src/assets/diagrams src/assets/screenshots src/styles

touch src/components/Callout.astro
touch src/components/CodeTabs.astro
touch src/components/Steps.astro
touch src/components/ApiRef.astro
touch src/components/ParamTable.astro
touch src/components/VersionBadge.astro
touch src/styles/custom.css

# Playwright-Teststruktur erstellen
mkdir -p tests/links
touch tests/links/broken-links.spec.ts
touch tests/links/playwright.config.ts

# Post-Deploy-Skripte erstellen
mkdir -p scripts
touch scripts/trigger-algolia-crawl.ts

# GitHub Actions Workflows erstellen
mkdir -p .github/workflows
touch .github/workflows/build-check.yml
touch .github/workflows/broken-links.yml

# Offentliche Assets erstellen
touch public/robots.txt public/og-image.png

# Claude Code Konfiguration erstellen
mkdir -p .claude/commands
touch .claude/CLAUDE.md .claude/settings.json
touch .claude/commands/new-doc.md
touch .claude/commands/add-callout.md
touch .claude/commands/check-links.md
touch .claude/commands/rebuild-index.md
touch .claude/commands/update-sidebar.md

# Umgebungsdateien erstellen
touch .env.example .env.local

# UitKit Skills installieren
npx uitkit add skill productivity/doc-site-builder
npx uitkit add skill devops-infra/cicd
npx uitkit add skill devops-infra/vercel

echo "Astro + Starlight Dokumentationsseite erstellt. Starten mit: npm run dev"
```

## CLAUDE.md Vorlage

```markdown
# Dokumentationswebsite

Astro 4 + Starlight Entwicklerdokumentationswebsite. Inhalte befinden sich in src/content/docs/
als MDX-Dateien. Die Sidebar-Navigation ist in astro.config.mjs definiert. Die Suche wird von
Algolia DocSearch (Crawler-basiert) angetrieben. Bereitstellung auf Vercel aus dem main-Branch
via GitHub Actions.

## Stack

- Astro 4.x + Starlight 0.23+ (Dokumentationsthema)
- TypeScript 5.4 (strikter Modus)
- MDX-Inhalte mit Astro Content Collections
- Benutzerdefinierte Astro-Komponenten: Callout, CodeTabs, Steps, ApiRef, ParamTable, VersionBadge
- Algolia DocSearch (Index nach dem Deploy per Crawler API neu aufgebaut)
- Vercel (statische Ausgabe, Vorschau-Deploys pro PR)
- GitHub Actions: build-check.yml (TS + Astro Build), broken-links.yml (Playwright)
- Playwright 1.44+ fur Linkpruefung gegen Vorschau-URLs

## Neue Dokumentationsseite hinzufugen — genaue Schritte

1. MDX-Datei im richtigen Themenordner unter src/content/docs/ erstellen:
   - Einsteiger-Konzepte → getting-started/
   - Anleitungen → guides/
   - Endpunkt- und Objektreferenz → api-reference/endpoints/ oder api-reference/objects/
   - Schritt-fur-Schritt-Walkthroughs → tutorials/
2. Pflichtfelder im Frontmatter hinzufugen: title, description, sidebar.order (wenn Reihenfolge wichtig)
3. Sidebar-Eintrag in astro.config.mjs unter starlight > sidebar > items hinzufugen
4. Den Slash-Befehl /new-doc verwenden, um Frontmatter und Abschnittsstruktur zu generieren
5. npm run dev ausfuhren und prufen, dass die Seite am erwarteten URL-Pfad angezeigt wird
6. npm run typecheck ausfuhren, um TypeScript-Fehler in MDX-Komponenten zu erkennen

## MDX-Komponentenbibliothek

Alle Komponenten werden am Anfang der MDX-Datei importiert:
  import Callout from '@components/Callout.astro'
  import CodeTabs from '@components/CodeTabs.astro'
  import Steps from '@components/Steps.astro'

Callout-Typen: note | warning | danger | tip
  <Callout type="warning">Dies bricht in v2 — vor dem Upgrade migrieren.</Callout>

CodeTabs — sprachbeschriftete Tabs fur mehrsprachige Codeausschnitte:
  <CodeTabs tabs={[
    { label: "npm", lang: "bash", code: "npm install @acme/sdk" },
    { label: "pnpm", lang: "bash", code: "pnpm add @acme/sdk" },
    { label: "curl", lang: "bash", code: "curl https://api.acme.com/v1/users" }
  ]} />

Steps — automatisch nummerierte geordnete Liste:
  <Steps>
    <p>SDK installieren.</p>
    <p>API-Schlussel in der Umgebung setzen.</p>
    <p>Erste Anfrage stellen.</p>
  </Steps>

ApiRef — Endpunkt-Signatur-Header:
  <ApiRef method="POST" path="/v1/users" />

KEINE rohen HTML-geordneten Listen fur Schrittfolgen verwenden — Steps verwenden.
KEIN <div class="callout"> manuell schreiben — Callout verwenden.

## Sidebar-Navigationskonfiguration

Die Sidebar wird in astro.config.mjs innerhalb des starlight()-Plugins konfiguriert:

  starlight({
    sidebar: [
      {
        label: 'Erste Schritte',
        items: [
          { label: 'Ubersicht', link: '/getting-started/' },
          { label: 'Installation', link: '/getting-started/installation/' },
        ],
      },
      {
        label: 'API-Referenz',
        autogenerate: { directory: 'api-reference' },
      },
    ],
  })

autogenerate fur grosse Abschnitte verwenden (api-reference, tutorials).
Explizite items[] fur Abschnitte verwenden, bei denen die Reihenfolge wichtig ist (getting-started, guides).
Das Frontmatter-Feld sidebar.order steuert die Sortierreihenfolge in autogenerierten Gruppen.

## Befehle ausfuhren

# Lokaler Dev-Server mit Hot Reload
npm run dev

# Vollstandiger Produktionsbuild (erkennt fehlerhafte Importe und TS-Fehler)
npm run build

# Produktionsbuild lokal in der Vorschau anzeigen
npm run preview

# Typen prufen ohne zu bauen
npm run typecheck

# Playwright-Linkprufer gegen lokale Vorschau ausfuhren
PLAYWRIGHT_BASE_URL=http://localhost:4321 npm run test:links

# Algolia-Neuindizierung auslosen (benotigt ALGOLIA_APP_ID, ALGOLIA_API_KEY, ALGOLIA_CRAWLER_ID)
npx tsx scripts/trigger-algolia-crawl.ts

## Algolia Index-Neuaufbau

Der Algolia DocSearch Index wird uber die Algolia Crawler API neu aufgebaut, nicht uber den JavaScript-Client.
Auslosebedingungen:
- Automatisch: scripts/trigger-algolia-crawl.ts wird in broken-links.yml nach dem Produktionsdeploy ausgefuhrt
- Manuell: den Slash-Befehl /rebuild-index ausfuhren oder das Skript direkt aufrufen
- Inhalte NICHT direkt in den Algolia Index pushen — den Crawler das von der Live-Seite ubernehmen lassen

Erforderliche Umgebungsvariablen fur das Skript:
  ALGOLIA_APP_ID=xxx
  ALGOLIA_API_KEY=xxx          # Crawler API-Schlussel, NICHT der reine Such-Frontend-Schlussel
  ALGOLIA_CRAWLER_ID=xxx       # Im Algolia Crawler-Dashboard zu finden
  ALGOLIA_INDEX_NAME=docs

## Bereitstellung

- Jeder Push auf main lost automatisch einen Vercel-Produktionsdeploy aus
- Jeder PR erhalt eine Vercel-Vorschau-Deploy-URL
- broken-links.yml wartet auf den Vorschau-Deploy und fuhrt dann Playwright dagegen aus
- Keinen PR mergen, wenn broken-links.yml fehlschlagt
- Produktions-URL wird in PLAYWRIGHT_BASE_URL im broken-links.yml Workflow gesetzt

## Frontmatter-Konventionen

Jede Seite muss enthalten:
  ---
  title: "Titel wie er in der Sidebar und im <h1> erscheint"
  description: "Ein Satz — in Suchergebnissen und OG-Meta angezeigt"
  ---

Optional:
  sidebar:
    order: 2                   # Steuert die Position in autogenerierten Gruppen
    label: "Kurzer Sidebar-Name"  # Falls vom Titel abweichend
  version: "2.1"               # API-Version, die diese Seite dokumentiert

## Was nicht zu tun ist

- Keine Sidebar-Eintrage hinzufugen, die keine entsprechende MDX-Datei haben — Starlight schlagt beim Build fehl
- Keine rohen HTML-Tabellen fur Parameterdokumentation schreiben — ParamTable-Komponente verwenden
- Keine Bilder in src/content/ ablegen — in src/assets/ ablegen und in MDX importieren
- .env.local oder Dateien mit echten Algolia API-Schlusseln nicht committen
- Algolia Index nicht manuell bearbeiten — nur der Crawler soll darin schreiben
```

## MCP-Server

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

## Empfohlene Hooks

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
            "command": "bash -c 'f=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$f\" == */astro.config.mjs ]]; then echo \"[HOOK] astro.config.mjs geandert — prufen, ob Sidebar mit Dateien in src/content/docs/ ubereinstimmt, und ausfuhren: npm run build\" >&2; fi'"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_COMMAND\" | grep -q \"trigger-algolia-crawl\"; then echo \"[HOOK] Algolia-Neuindizierung ausgelost — sicherstellen, dass die Seite bereitgestellt ist und ALGOLIA_CRAWLER_ID gesetzt ist\" >&2; fi'"
          }
        ]
      }
    ]
  }
}
```

## Zu installierende Skills

```bash
npx uitkit add skill productivity/doc-site-builder
npx uitkit add skill devops-infra/cicd
npx uitkit add skill devops-infra/vercel
npx uitkit add skill testing/playwright
```

## Verwandte Ressourcen

- [Leitfaden technisches Schreiben](../guides/technical-writing.md)
- [Dokumentations-Workflow](../workflows/doc-publishing.md)
