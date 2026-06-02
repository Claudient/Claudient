# Chrome Extension — Projektstruktur

> Für Browser-Extension-Entwickler, die Manifest v3 Chrome Extensions mit Plasmo + TypeScript + React erstellen und den gesamten Zyklus von der Content Script-Entwicklung bis zur Veröffentlichung im Chrome Web Store optimieren.

## Stack

- **Framework:** Plasmo 0.90+ (Build-Tooling, Hot Reload, MV3-Manifest-Generierung)
- **Sprache:** TypeScript 5.4+
- **UI:** React 18 (Popup-, Options- und Newtab-Seiten)
- **Styling:** Tailwind CSS 3.4+ mit der `@plasmohq/ui`-Komponentenbibliothek
- **Hintergrund:** Service Worker via `background.ts` (Manifest v3 konform)
- **Content Scripts:** `contents/`-Verzeichnis mit URL-muster-basierter Autoregistrierung
- **Storage:** `@plasmohq/storage` (typisierter Wrapper über `chrome.storage.sync/local`)
- **Messaging:** `@plasmohq/messaging` (typsicheres Popup ↔ Background ↔ Content RPC)
- **Tests:** Vitest 1.6+ mit `@vitest/browser` für DOM-Tests
- **Linting:** ESLint 9 + `@typescript-eslint` + Prettier 3
- **CI:** GitHub Actions (Build, Test, Chrome Web Store Veröffentlichung via `tldraw/chrome-webstore-upload`)
- **Alternative Build:** WXT 0.19+ (Plasmo-Alternative mit besserem HMR)

## Verzeichnisstruktur

```
my-extension/
├── .claude/
│   ├── CLAUDE.md                             # Projektanweisungen für Claude Code
│   └── settings.json                         # Hooks, MCP-Server, Berechtigungen
├── .github/
│   └── workflows/
│       ├── ci.yml                            # Build + Tests bei jedem PR
│       └── publish.yml                       # Automatische Veröffentlichung im Chrome Web Store bei Release-Tag
├── assets/
│   ├── icon.png                              # 512x512 Quell-Icon (Plasmo skaliert automatisch)
│   ├── icon16.png                            # 16x16 Symbolleisten-Icon
│   ├── icon32.png                            # 32x32 Symbolleisten-Icon
│   ├── icon48.png                            # 48x48 Extensions-Seiten-Icon
│   └── icon128.png                           # 128x128 Chrome Web Store Icon
├── components/
│   ├── Button.tsx                            # Gemeinsamer UI-Button mit Tailwind-Varianten
│   ├── Toggle.tsx                            # Ein/Aus-Schalter für Einstellungen
│   ├── StatusBadge.tsx                       # Aktiv/Inaktiv-Statusanzeige der Extension
│   └── index.ts                              # Barrel-Export für alle Komponenten
├── contents/
│   ├── github-enhancer.tsx                   # Content Script: läuft nur auf github.com/*
│   ├── youtube-overlay.tsx                   # Content Script: läuft auf youtube.com/watch
│   ├── all-pages.ts                          # Content Script: läuft auf <all_urls>
│   └── inline/
│       └── github-inline.ts                  # Inline World Content Script (kein Shadow DOM)
├── lib/
│   ├── storage.ts                            # Typisierte chrome.storage-Helfer via @plasmohq/storage
│   ├── messaging.ts                          # Nachrichten-Typdefinitionen für alle RPC-Kanäle
│   ├── constants.ts                          # Extensionweite Konstanten (Schlüssel, URLs, Standardwerte)
│   ├── permissions.ts                        # Laufzeit-Berechtigungsanfrage-Helfer
│   └── utils.ts                              # Reine Hilfsfunktionen (URL-Parsing, Throttle, etc.)
├── messages/
│   ├── getActiveTab.ts                       # Background Message Handler: gibt aktive Tab-Infos zurück
│   ├── toggleFeature.ts                      # Background Message Handler: Funktion ein-/ausschalten
│   └── fetchData.ts                          # Background Message Handler: authentifizierter Fetch
├── tabs/
│   └── settings.tsx                          # Vollständige Einstellungsseite (geöffnet via options_ui)
├── background.ts                             # Service Worker Entry — registriert Listener, Alarme
├── popup.tsx                                 # Browser-Action-Popup (320x480 UI)
├── options.tsx                               # Extension-Optionsseite
├── newtab.tsx                                # Neuer-Tab-Überschreibungsseite (optional)
├── package.json                              # Abhängigkeiten, Scripts (dev/build/package)
├── tsconfig.json                             # TypeScript-Konfiguration, erweitert Plasmo-Standardwerte
├── tailwind.config.ts                        # Tailwind-Konfiguration mit Content-Pfaden für alle .tsx
├── postcss.config.js                         # PostCSS für Tailwind-Verarbeitung
├── .env.example                              # API-Schlüssel-Vorlage (niemals .env committen)
├── .env.development                          # Nur-Entwicklung Umgebungsvariablen (API-Basis-URL, Debug-Flags)
├── .eslintrc.cjs                             # ESLint-Konfiguration mit TypeScript- und React-Regeln
├── .prettierrc                               # Prettier-Konfiguration (einfache Anführungszeichen, 2-Leerzeichen-Einrückung)
├── vitest.config.ts                          # Vitest-Konfiguration mit Chrome-API-Mocks
├── vitest.setup.ts                           # Globale Mocks: chrome.storage, chrome.runtime
└── __tests__/
    ├── lib/
    │   ├── storage.test.ts                   # Unit-Tests für Storage-Helfer
    │   ├── messaging.test.ts                 # Unit-Tests für Nachrichten-Typ-Guards
    │   └── utils.test.ts                     # Unit-Tests für reine Hilfsfunktionen
    ├── components/
    │   └── Toggle.test.tsx                   # Komponenten-Tests mit @testing-library/react
    └── background.test.ts                    # Service Worker Logik-Tests mit gemockten Chrome-APIs
```

## Erklärung der Schlüsseldateien

| Pfad | Zweck |
|---|---|
| `background.ts` | Service Worker: registriert `chrome.runtime.onMessage`-Listener, `chrome.alarms` und `chrome.tabs`-Ereignisse. Muss zwischen Aktivierungen zustandslos sein — keine In-Memory-Globals. |
| `popup.tsx` | React-Root für das Browser-Action-Popup. Verwendet `sendToBackground` von `@plasmohq/messaging`, um Background-Handler aufzurufen. Der Mount-Punkt wird von Plasmo auto-generiert. |
| `contents/github-enhancer.tsx` | Content Script beschränkt auf `github.com/*` via Plasmos `PlasmoCSConfig`-Export. Injiziert React-UI in den DOM mittels `getInlineAnchor` oder `getShadowHostId`. |
| `lib/storage.ts` | Typisierte Storage-Schicht mit `Storage` aus `@plasmohq/storage`. Exportiert typisierte Getter/Setter für jeden persistierten Schlüssel — niemals `chrome.storage` direkt aufrufen. |
| `lib/messaging.ts` | Gemeinsame Nachrichten-Typdefinitionen. Sender (`sendToBackground`) und Handler (`onMessage`) importieren von hier, um Typsicherheit über Kontexte hinweg zu gewährleisten. |
| `messages/fetchData.ts` | Background-seitiger Handler für authentifizierte API-Aufrufe. Background hat keine CORS-Beschränkungen — alle externen Fetches laufen hier durch, nie von Content Scripts. |
| `.github/workflows/publish.yml` | Zippt das `build/chrome-mv3-prod/`-Artefakt und lädt es via `chrome-webstore-upload-cli` mit den Secrets `CLIENT_ID`, `CLIENT_SECRET`, `REFRESH_TOKEN` in den Chrome Web Store hoch. |
| `vitest.setup.ts` | Mockt den gesamten `chrome.*`-Namespace mit `vitest-chrome`, sodass Unit-Tests in Node ohne echten Browser laufen. |

## Schnell-Scaffold

```bash
# 1. Bootstrap mit Plasmo
pnpm create plasmo my-extension --with-src
cd my-extension

# 2. Kern-Plasmo-Pakete hinzufügen
pnpm add @plasmohq/storage @plasmohq/messaging @plasmohq/ui

# 3. Tailwind CSS hinzufügen
pnpm add -D tailwindcss postcss autoprefixer
pnpx tailwindcss init -p

# 4. Test-Stack hinzufügen
pnpm add -D vitest @vitest/coverage-v8 @testing-library/react @testing-library/user-event jsdom vitest-chrome

# 5. Verzeichnisstruktur erstellen
mkdir -p contents lib messages components assets tabs __tests__/{lib,components} .github/workflows .claude

# 6. Wesentliche lib-Dateien erstellen
touch lib/storage.ts lib/messaging.ts lib/constants.ts lib/permissions.ts lib/utils.ts

# 7. Message Handler erstellen
touch messages/getActiveTab.ts messages/toggleFeature.ts messages/fetchData.ts

# 8. GitHub Actions Workflows erstellen
touch .github/workflows/ci.yml .github/workflows/publish.yml

# 9. Umgebungsdateien erstellen
touch .env.example .env.development
echo "PLASMO_PUBLIC_API_URL=https://api.example.com" >> .env.example

# 10. Vitest-Konfiguration und Setup erstellen
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

# 11. Scripts zu package.json hinzufügen (Plasmo setzt dev/build, diese ergänzen)
# "test": "vitest run"
# "test:watch": "vitest"
# "test:coverage": "vitest run --coverage"
# "lint": "eslint . --ext .ts,.tsx"
# "typecheck": "tsc --noEmit"

# 12. CLAUDE.md initialisieren
touch .claude/CLAUDE.md
```

## CLAUDE.md-Vorlage

```markdown
# Chrome Extension — CLAUDE.md

## Beschreibung

Eine Manifest v3 Chrome Extension, gebaut mit Plasmo, TypeScript, React und Tailwind CSS.
Die Extension verbessert [Zielwebseiten/Anwendungsfall hier beschreiben].

## Stack

- Plasmo 0.90+ (Build, Manifest-Generierung, Hot Reload)
- TypeScript 5.4 + React 18 + Tailwind CSS 3.4
- @plasmohq/storage (typisierter Chrome Storage Wrapper)
- @plasmohq/messaging (typsicheres kontextübergreifendes RPC)
- Vitest 1.6 + vitest-chrome (Unit-Tests)
- GitHub Actions (CI + Chrome Web Store Veröffentlichung)

## Lokal ausführen

```bash
pnpm dev              # Plasmo Dev-Server mit Hot Reload starten
# Ungepackt laden: chrome://extensions → Entwicklermodus → Ungepackte Erweiterung laden → build/chrome-mv3-dev/
pnpm build            # Produktions-Build → build/chrome-mv3-prod/
pnpm package          # build/chrome-mv3-prod/ für Web Store Upload zippen
pnpm test             # Vitest Unit-Tests ausführen
pnpm typecheck        # tsc --noEmit (keine Ausgabe, prüft nur Typen)
pnpm lint             # ESLint über alle .ts/.tsx-Dateien
```

## Neues Content Script hinzufügen

1. `contents/mein-script.tsx` (React) oder `contents/mein-script.ts` (vanilla) erstellen.
2. `PlasmoCSConfig` exportieren, um URL-Match-Patterns zu deklarieren:
   ```ts
   export const config: PlasmoCSConfig = {
     matches: ["https://example.com/*"],
     all_frames: false,
   }
   ```
3. Komponente als Default-Export (React) oder Inline-Logik ausführen (vanilla).
4. Plasmo registriert das Script automatisch — keine manuelle Manifest-Bearbeitung erforderlich.
5. Für Inline World Scripts (Zugriff auf JS-Globals der Seite): `world: "MAIN"` in der Konfiguration setzen.

## Messaging zwischen Kontexten

Die gesamte kontextübergreifende Kommunikation verwendet @plasmohq/messaging. Typen liegen in `lib/messaging.ts`.

Popup → Background (Request/Response):
```ts
// popup.tsx
import { sendToBackground } from "@plasmohq/messaging"
const result = await sendToBackground({ name: "fetchData", body: { url } })
```

Background Handler (`messages/fetchData.ts`):
```ts
import type { PlasmoMessaging } from "@plasmohq/messaging"
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const data = await fetch(req.body.url).then(r => r.json())
  res.send({ data })
}
export default handler
```

Content → Background: `sendToBackground` aus `@plasmohq/messaging/background` verwenden.
Background → Content: `chrome.tabs.sendMessage(tabId, payload)` verwenden — kein Plasmo RPC.

## Chrome Storage Muster

`chrome.storage` niemals direkt aufrufen. `lib/storage.ts` verwenden:
```ts
import { Storage } from "@plasmohq/storage"
const storage = new Storage({ area: "sync" }) // oder "local"
await storage.set("featureEnabled", true)
const val = await storage.get<boolean>("featureEnabled")
```

`sync` für Benutzereinstellungen verwenden (5 MB Kontingent, geräteübergreifende Synchronisierung).
`local` für große gecachte Daten verwenden (unbegrenztes Kontingent, nur gerätespezifisch).

## Berechtigungs-Deklarationsprozess

1. Den Berechtigungs-String zum `manifest`-Schlüssel in `package.json` hinzufügen:
   ```json
   "manifest": {
     "permissions": ["tabs", "storage", "scripting"],
     "host_permissions": ["https://example.com/*"]
   }
   ```
2. Für optionale Berechtigungen `chrome.permissions.request()` zur Laufzeit via `lib/permissions.ts` verwenden.
3. `pnpm build` ausführen und das generierte `build/chrome-mv3-prod/manifest.json` prüfen.
4. Dokumentieren, warum die Berechtigung benötigt wird — die Chrome Web Store-Prüfung erfordert eine Begründung.
5. Berechtigungen minimieren — nur anfordern, was die aktuelle Funktion braucht, nicht zukünftige.

## Konventionen

- Alle Storage-Schlüssel sind String-Konstanten in `lib/constants.ts` — niemals Schlüssel-Strings inlinen.
- Alle externen Fetches (zu Drittanbieter-APIs) laufen durch einen Background Message Handler, nicht Content Scripts.
- Content Scripts dürfen keine Node.js-Module importieren — nur browserkompatibler Code.
- Message Handler-Dateien in `messages/` müssen einen einzigen Default-Handler exportieren — keine benannten Exports.
- Tailwind-Klassen gehen direkt in JSX — keine CSS-Module, keine Inline-Styles.
- Alle neuen Funktionen müssen vor dem Merge Vitest Unit-Tests haben.

## Veröffentlichungs-Checkliste

- [ ] `version` in `package.json` erhöhen (folgt Semver)
- [ ] Store-Listing-Beschreibung in `.github/store-listing.md` aktualisieren
- [ ] `pnpm build` ausführen und die gepackte Extension lokal manuell testen
- [ ] `pnpm test` ausführen — alle Tests grün
- [ ] `pnpm typecheck` ausführen — keine Typfehler
- [ ] Release taggen: `git tag v1.x.x && git push --tags`
- [ ] GitHub Actions `publish.yml` löst automatisch aus und lädt in den Web Store hoch
- [ ] Zur Überprüfung im Chrome Developer Dashboard einreichen, wenn Berechtigungen geändert wurden
```

## MCP-Server

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-filesystem", "/Users/you/my-extension"],
      "description": "Extension-Quelldateien lesen/schreiben"
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      },
      "description": "PRs öffnen, CI-Logs lesen, Releases verwalten"
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server"],
      "description": "Chrome mit geladener Extension für End-to-End-Verifizierung steuern"
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
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "cd /Users/you/my-extension && pnpm lint --fix --quiet 2>&1 | tail -5",
            "description": "Lint-Fehler nach jedem Datei-Write automatisch beheben"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "cd /Users/you/my-extension && pnpm typecheck 2>&1 | grep -E 'error TS' | head -10",
            "description": "TypeScript-Fehler unmittelbar nach Datei-Writes anzeigen"
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
            "description": "Claude daran erinnern, den typisierten Storage-Wrapper vor jeder Bash-Ausführung zu verwenden"
          }
        ]
      }
    ]
  }
}
```

## Zu installierende Skills

```bash
npx claudient add skill devops-infra/github-actions-ci
npx claudient add skill frontend/react-component
npx claudient add skill frontend/tailwind-ui
npx claudient add skill devops-infra/release-management
npx claudient add workflow chrome-extension-publish
```

## Verwandte Ressourcen

- [../guides/chrome-extension-messaging.md](../guides/chrome-extension-messaging.md)
- [../guides/plasmo-getting-started.md](../guides/plasmo-getting-started.md)
- [../workflows/chrome-extension-publish.md](../workflows/chrome-extension-publish.md)
- [../workflows/content-script-rollout.md](../workflows/content-script-rollout.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
