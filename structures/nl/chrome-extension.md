# Chrome-extensie — Projectstructuur

> Voor browserextensie-ontwikkelaars die Manifest v3 Chrome-extensies bouwen met Plasmo + TypeScript + React, waarbij de volledige cyclus van het schrijven van contentscripts tot publicatie in de Chrome Web Store wordt geoptimaliseerd.

## Stack

- **Framework:** Plasmo 0.90+ (build-tooling, hot reload, MV3-manifestgeneratie)
- **Taal:** TypeScript 5.4+
- **UI:** React 18 (popup-, opties- en newtab-pagina's)
- **Styling:** Tailwind CSS 3.4+ met de `@plasmohq/ui`-componentenbibliotheek
- **Achtergrond:** Service Worker via `background.ts` (Manifest v3 conform)
- **Contentscripts:** `contents/`-map met URL-patroon-gebaseerde autoregistratie
- **Opslag:** `@plasmohq/storage` (getypte wrapper over `chrome.storage.sync/local`)
- **Berichten:** `@plasmohq/messaging` (typeveilige popup ↔ background ↔ content RPC)
- **Testen:** Vitest 1.6+ met `@vitest/browser` voor DOM-testen
- **Linting:** ESLint 9 + `@typescript-eslint` + Prettier 3
- **CI:** GitHub Actions (build, testen, Chrome Web Store-publicatie via `tldraw/chrome-webstore-upload`)
- **Alternatieve build:** WXT 0.19+ (Plasmo-alternatief met betere HMR)

## Mappenstructuur

```
my-extension/
├── .claude/
│   ├── CLAUDE.md                             # Projectinstructies voor Claude Code
│   └── settings.json                         # Hooks, MCP-servers, rechten
├── .github/
│   └── workflows/
│       ├── ci.yml                            # Build + testen bij elke PR
│       └── publish.yml                       # Automatische publicatie naar Chrome Web Store bij release-tag
├── assets/
│   ├── icon.png                              # 512x512 bronpictogram (Plasmo schaalt automatisch)
│   ├── icon16.png                            # 16x16 werkbalkpictogram
│   ├── icon32.png                            # 32x32 werkbalkpictogram
│   ├── icon48.png                            # 48x48 extensiespagina-pictogram
│   └── icon128.png                           # 128x128 Chrome Web Store-pictogram
├── components/
│   ├── Button.tsx                            # Gedeelde UI-knop met Tailwind-varianten
│   ├── Toggle.tsx                            # Aan/uit-schakelaar voor instellingen
│   ├── StatusBadge.tsx                       # Actief/inactief statusindicator van de extensie
│   └── index.ts                              # Barrel-export voor alle componenten
├── contents/
│   ├── github-enhancer.tsx                   # Contentscript: draait alleen op github.com/*
│   ├── youtube-overlay.tsx                   # Contentscript: draait op youtube.com/watch
│   ├── all-pages.ts                          # Contentscript: draait op <all_urls>
│   └── inline/
│       └── github-inline.ts                  # Inline world contentscript (geen shadow DOM)
├── lib/
│   ├── storage.ts                            # Getypte chrome.storage-helpers via @plasmohq/storage
│   ├── messaging.ts                          # Berichttypedefinities voor alle RPC-kanalen
│   ├── constants.ts                          # Extensiebrede constanten (sleutels, URLs, standaardwaarden)
│   ├── permissions.ts                        # Runtime-rechtenaanvraag-helpers
│   └── utils.ts                              # Pure hulpfuncties (URL-parsing, throttle, etc.)
├── messages/
│   ├── getActiveTab.ts                       # Background-berichtafhandelaar: geeft actieve tab-info terug
│   ├── toggleFeature.ts                      # Background-berichtafhandelaar: functie aan/uitzetten
│   └── fetchData.ts                          # Background-berichtafhandelaar: geauthenticeerde fetch
├── tabs/
│   └── settings.tsx                          # Volledig scherm instellingstabblad (geopend via options_ui)
├── background.ts                             # Service worker-ingang — registreert listeners, alarmen
├── popup.tsx                                 # Browseractie-popup (320x480 UI)
├── options.tsx                               # Extensie-optiespagina
├── newtab.tsx                                # Nieuw tabblad-overschrijvingspagina (optioneel)
├── package.json                              # Afhankelijkheden, scripts (dev/build/package)
├── tsconfig.json                             # TypeScript-configuratie die Plasmo-standaardwaarden uitbreidt
├── tailwind.config.ts                        # Tailwind-configuratie met contentpaden voor alle .tsx
├── postcss.config.js                         # PostCSS voor Tailwind-verwerking
├── .env.example                              # API-sleutel-sjabloon (nooit .env committen)
├── .env.development                          # Alleen-ontwikkeling omgevingsvariabelen (API-basis-URL, debug-vlaggen)
├── .eslintrc.cjs                             # ESLint-configuratie met TypeScript- en React-regels
├── .prettierrc                               # Prettier-configuratie (enkele aanhalingstekens, 2-spatie-inspringing)
├── vitest.config.ts                          # Vitest-configuratie met Chrome API-mocks
├── vitest.setup.ts                           # Globale mocks: chrome.storage, chrome.runtime
└── __tests__/
    ├── lib/
    │   ├── storage.test.ts                   # Unittests voor opslag-helpers
    │   ├── messaging.test.ts                 # Unittests voor berichttypebewakers
    │   └── utils.test.ts                     # Unittests voor pure hulpfuncties
    ├── components/
    │   └── Toggle.test.tsx                   # Componenttesten met @testing-library/react
    └── background.test.ts                    # Service worker-logicatesten met gemockte Chrome-API's
```

## Toelichting op sleutelbestanden

| Pad | Doel |
|---|---|
| `background.ts` | Service worker: registreert `chrome.runtime.onMessage`-listeners, `chrome.alarms` en `chrome.tabs`-gebeurtenissen. Moet stateloos zijn tussen activaties — geen in-memory globals. |
| `popup.tsx` | React-root voor de browseractie-popup. Gebruikt `sendToBackground` van `@plasmohq/messaging` om background-handlers aan te roepen. Het mountpunt wordt automatisch gegenereerd door Plasmo. |
| `contents/github-enhancer.tsx` | Contentscript beperkt tot `github.com/*` via de `PlasmoCSConfig`-export van Plasmo. Injecteert React-UI in de DOM met `getInlineAnchor` of `getShadowHostId`. |
| `lib/storage.ts` | Getypte opslaglaag met `Storage` van `@plasmohq/storage`. Exporteert getypte getters/setters voor elke persistente sleutel — nooit `chrome.storage` direct aanroepen. |
| `lib/messaging.ts` | Gedeelde berichttypedefinities. Zowel de verzender (`sendToBackground`) als de afhandelaar (`onMessage`) importeren hiervandaan om typeveiligheid over contexten te garanderen. |
| `messages/fetchData.ts` | Background-afhandelaar voor geauthenticeerde API-aanroepen. Background heeft geen CORS-beperkingen — alle externe fetches lopen hier doorheen, nooit vanuit contentscripts. |
| `.github/workflows/publish.yml` | Zipt het `build/chrome-mv3-prod/`-artefact en uploadt het naar Chrome Web Store via `chrome-webstore-upload-cli` met de secrets `CLIENT_ID`, `CLIENT_SECRET`, `REFRESH_TOKEN`. |
| `vitest.setup.ts` | Mockt de volledige `chrome.*`-namespace met `vitest-chrome` zodat unittests in Node draaien zonder echte browser. |

## Snelle scaffold

```bash
# 1. Bootstrap met Plasmo
pnpm create plasmo my-extension --with-src
cd my-extension

# 2. Kern-Plasmo-pakketten toevoegen
pnpm add @plasmohq/storage @plasmohq/messaging @plasmohq/ui

# 3. Tailwind CSS toevoegen
pnpm add -D tailwindcss postcss autoprefixer
pnpx tailwindcss init -p

# 4. Teststack toevoegen
pnpm add -D vitest @vitest/coverage-v8 @testing-library/react @testing-library/user-event jsdom vitest-chrome

# 5. Mappenstructuur aanmaken
mkdir -p contents lib messages components assets tabs __tests__/{lib,components} .github/workflows .claude

# 6. Essentiële lib-bestanden aanmaken
touch lib/storage.ts lib/messaging.ts lib/constants.ts lib/permissions.ts lib/utils.ts

# 7. Berichtafhandelaars aanmaken
touch messages/getActiveTab.ts messages/toggleFeature.ts messages/fetchData.ts

# 8. GitHub Actions-workflows aanmaken
touch .github/workflows/ci.yml .github/workflows/publish.yml

# 9. Omgevingsbestanden aanmaken
touch .env.example .env.development
echo "PLASMO_PUBLIC_API_URL=https://api.example.com" >> .env.example

# 10. Vitest-configuratie en setup aanmaken
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

# 11. Scripts toevoegen aan package.json (Plasmo stelt dev/build in, voeg deze toe)
# "test": "vitest run"
# "test:watch": "vitest"
# "test:coverage": "vitest run --coverage"
# "lint": "eslint . --ext .ts,.tsx"
# "typecheck": "tsc --noEmit"

# 12. CLAUDE.md initialiseren
touch .claude/CLAUDE.md
```

## CLAUDE.md-sjabloon

```markdown
# Chrome-extensie — CLAUDE.md

## Beschrijving

Een Manifest v3 Chrome-extensie gebouwd met Plasmo, TypeScript, React en Tailwind CSS.
De extensie verbetert [doelwebsites/gebruiksscenario hier beschrijven].

## Stack

- Plasmo 0.90+ (build, manifestgeneratie, hot reload)
- TypeScript 5.4 + React 18 + Tailwind CSS 3.4
- @plasmohq/storage (getypte Chrome Storage-wrapper)
- @plasmohq/messaging (typeveilige cross-context RPC)
- Vitest 1.6 + vitest-chrome (unittests)
- GitHub Actions (CI + Chrome Web Store-publicatie)

## Lokaal uitvoeren

```bash
pnpm dev              # Plasmo dev-server starten met hot reload
# Onverpakt laden: chrome://extensions → Ontwikkelaarsmodus → Onverpakte extensie laden → build/chrome-mv3-dev/
pnpm build            # Productiebuild → build/chrome-mv3-prod/
pnpm package          # build/chrome-mv3-prod/ zippen voor Web Store-upload
pnpm test             # Vitest-unittests uitvoeren
pnpm typecheck        # tsc --noEmit (geen uitvoer, controleert alleen typen)
pnpm lint             # ESLint over alle .ts/.tsx-bestanden
```

## Een nieuw contentscript toevoegen

1. Maak `contents/mijn-script.tsx` (React) of `contents/mijn-script.ts` (vanilla) aan.
2. Exporteer `PlasmoCSConfig` om URL-matchpatronen te declareren:
   ```ts
   export const config: PlasmoCSConfig = {
     matches: ["https://example.com/*"],
     all_frames: false,
   }
   ```
3. Exporteer standaard je component (React) of voer inline logica uit (vanilla).
4. Plasmo registreert het script automatisch — geen handmatige manifestbewerking vereist.
5. Voor inline world-scripts (toegang tot JS-globals van de pagina): `world: "MAIN"` instellen in de configuratie.

## Berichten tussen contexten

Alle cross-context communicatie gebruikt @plasmohq/messaging. Typen leven in `lib/messaging.ts`.

Popup → Background (verzoek/antwoord):
```ts
// popup.tsx
import { sendToBackground } from "@plasmohq/messaging"
const result = await sendToBackground({ name: "fetchData", body: { url } })
```

Background-afhandelaar (`messages/fetchData.ts`):
```ts
import type { PlasmoMessaging } from "@plasmohq/messaging"
const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const data = await fetch(req.body.url).then(r => r.json())
  res.send({ data })
}
export default handler
```

Content → Background: gebruik `sendToBackground` van `@plasmohq/messaging/background`.
Background → Content: gebruik `chrome.tabs.sendMessage(tabId, payload)` — geen Plasmo RPC.

## Chrome Storage-patronen

Nooit `chrome.storage` direct aanroepen. Gebruik `lib/storage.ts`:
```ts
import { Storage } from "@plasmohq/storage"
const storage = new Storage({ area: "sync" }) // of "local"
await storage.set("featureEnabled", true)
const val = await storage.get<boolean>("featureEnabled")
```

Gebruik `sync` voor gebruikersvoorkeuren (5 MB-quota, synchronisatie over apparaten).
Gebruik `local` voor grote gecachte gegevens (onbeperkt quota, alleen apparaat).

## Rechtendeclaratieproces

1. Voeg de rechtenzin toe aan de `manifest`-sleutel in `package.json`:
   ```json
   "manifest": {
     "permissions": ["tabs", "storage", "scripting"],
     "host_permissions": ["https://example.com/*"]
   }
   ```
2. Voor optionele rechten: gebruik `chrome.permissions.request()` tijdens runtime via `lib/permissions.ts`.
3. Voer `pnpm build` uit en controleer het gegenereerde `build/chrome-mv3-prod/manifest.json`.
4. Documenteer waarom het recht nodig is in een opmerking — de Chrome Web Store-beoordeling vereist een motivatie.
5. Minimaliseer rechten — vraag alleen wat de huidige functie nodig heeft, niet toekomstige.

## Conventies

- Alle opslagsleutels zijn stringconstanten in `lib/constants.ts` — nooit sleutelstrings inline gebruiken.
- Alle externe fetches (naar externe API's) lopen via een background-berichtafhandelaar, niet via contentscripts.
- Contentscripts mogen geen Node.js-modules importeren — alleen browserkompatibelcode.
- Berichtafhandelaarbestanden in `messages/` moeten een enkele standaard-afhandelaar exporteren — geen benoemde exports.
- Tailwind-klassen gaan direct in JSX — geen CSS-modules, geen inline stijlen.
- Alle nieuwe functies moeten Vitest-unittests hebben vóór samenvoeging.

## Publicatiechecklist

- [ ] `version` in `package.json` verhogen (volgt semver)
- [ ] Winkelvermelding beschrijving bijwerken in `.github/store-listing.md`
- [ ] `pnpm build` uitvoeren en de verpakte extensie lokaal handmatig testen
- [ ] `pnpm test` uitvoeren — alle tests groen
- [ ] `pnpm typecheck` uitvoeren — geen typefouten
- [ ] Release taggen: `git tag v1.x.x && git push --tags`
- [ ] GitHub Actions `publish.yml` triggert automatisch en uploadt naar Web Store
- [ ] Indienen voor beoordeling in Chrome Developer Dashboard als rechten zijn gewijzigd
```

## MCP-servers

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-filesystem", "/Users/you/my-extension"],
      "description": "Extensiebronstanden lezen/schrijven"
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      },
      "description": "PR's openen, CI-logs lezen, releases beheren"
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@executeautomation/playwright-mcp-server"],
      "description": "Chrome aansturen met de geladen extensie voor end-to-end verificatie"
    }
  }
}
```

## Aanbevolen hooks

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
            "description": "Lint-fouten automatisch corrigeren na elke bestandsschrijving"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "cd /Users/you/my-extension && pnpm typecheck 2>&1 | grep -E 'error TS' | head -10",
            "description": "TypeScript-fouten direct tonen na bestandsschrijvingen"
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
            "description": "Claude herinneren de getypte opslag-wrapper te gebruiken voor elke bash-uitvoering"
          }
        ]
      }
    ]
  }
}
```

## Te installeren skills

```bash
npx uitkit add skill devops-infra/github-actions-ci
npx uitkit add skill frontend/react-component
npx uitkit add skill frontend/tailwind-ui
npx uitkit add skill devops-infra/release-management
npx uitkit add workflow chrome-extension-publish
```

## Gerelateerde bronnen

- [../guides/chrome-extension-messaging.md](../guides/chrome-extension-messaging.md)
- [../guides/plasmo-getting-started.md](../guides/plasmo-getting-started.md)
- [../workflows/chrome-extension-publish.md](../workflows/chrome-extension-publish.md)
- [../workflows/content-script-rollout.md](../workflows/content-script-rollout.md)
