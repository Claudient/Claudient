# Founder / CEO Workspace — Projektstruktur

> Fur einen Startup-Grunder, der Strategie, Finanzierung, Einstellungen und den laufenden Betrieb verwaltet — Investoren-Updates, Board-Vorbereitung, Einstellungsentscheidungen, OKRs, Fundraising-Pipeline und Finanzubersicht aus einem einzigen Claude Code Workspace.

## Stack

- Notion — Strategiedokumente, Team-Wikis, OKRs, Board-Materialien
- Linear — Produkt-Roadmap, Sprint-Tracking, Engineering-Meilensteine
- HubSpot oder Attio — Investor-CRM, Pipeline-Phasen, Beziehungsmanagement
- Gusto oder Rippling — HR, Gehaltsabrechnung, Angebotsschreiben, Personalbestand
- Mercury — Geschaftsbanking, Cash-Flow, Ausgabenverfolgung
- Carta — Cap Table, Equity Grants, 409A-Bewertungen, SAFE/Note-Tracking
- Slack — Teamkommunikation, asynchrone Investoren-Updates, Einstellungskanale
- Google Workspace — E-Mail, geteilte Dokumente, Datenraum (Google Drive)

## Verzeichnisstruktur

```
founder-workspace/
├── .claude/
│   ├── CLAUDE.md                              # Workspace-Anweisungen fur Claude Code
│   ├── settings.json                          # Berechtigungen, Hooks, MCP-Server-Konfiguration
│   └── commands/
│       ├── investor-update.md                 # Wochentliches oder monatliches Investoren-Update-E-Mail entwerfen
│       ├── board-prep.md                      # Board-Deck-Narration, Agenda und Vorab-Lekture zusammenstellen
│       ├── hiring-decision.md                 # Kandidat bewerten, Scorecard-Zusammenfassung, Einstellungsempfehlung
│       ├── okr-review.md                      # Aktuelle OKRs bewerten, Blocker aufzeigen, Entwurf fur nachstes Quartal
│       ├── weekly-brief.md                    # CEO Weekly Brief — Erfolge, Versäumnisse, Prioritäten, Anfragen
│       ├── fundraising-status.md              # Fundraising-Pipeline-Snapshot, nachste Schritte, Runden-Gesundheit
│       └── competitive-pulse.md               # Wettbewerbslandschaft-Update — Signal-Triage, Reaktionsmemo
├── strategy/
│   ├── north-star-metric.md                   # Primäre Erfolgsmetrik, Definition, aktueller Wert, Zielwert
│   ├── company-okrs-2025.md                   # Jahres-OKRs — Ziele, Key Results, Verantwortliche, Bewertungen
│   ├── company-okrs-q3-2025.md                # Quartals-OKR-Set mit Notizen zur Halbzeit-Überprüfung
│   ├── annual-plan-2025.md                    # Jahresplan — Personalbestand, Budget, Meilensteine
│   ├── strategic-bets.md                      # 3–5 strategische Wetten mit Begrundung und Erfolgskriterien
│   ├── competitive-landscape.md               # Wettbewerber-Matrix — Positionierung, Preise, Stärken, Risiken
│   ├── market-map.md                          # TAM/SAM/SOM-Analyse, Segmentaufschlüsselung, Marktgröße
│   └── positioning-doc.md                     # ICP, Value Propositions, Differenzierung, Messaging-Säulen
├── fundraising/
│   ├── round-tracker.md                       # Aktueller Rundenstatus — Ziel, eingesammelt, Schlussdatum, Lead
│   ├── investor-pipeline.md                   # Vollständige Investorenliste — Phase, letzter Kontakt, nächster Schritt, Notizen
│   ├── term-sheet-tracker.md                  # Erhaltene Term Sheets — Konditionen, Vergleich, Entscheidungsprotokoll
│   ├── pitch-deck-v7.md                       # Aktuelle Pitch-Deck-Narration (Notion-Export oder Gliederung)
│   ├── data-room/
│   │   ├── data-room-index.md                 # Index aller Datenraum-Dokumente mit Zugriffsprotokoll
│   │   ├── cap-table-summary.md               # Carta Cap Table Snapshot — Eigentumeranteile, Verwässerungsmodell
│   │   ├── financial-model-q2-2025.xlsx       # Finanzmodell — P&L, Runway, Unit Economics
│   │   ├── corporate-docs-checklist.md        # Grundung, IP-Abtretung, 409A, Prüfungen — Statusliste
│   │   └── customer-references.md             # Referenzkunden — Kontakt, Tier, NPS, Verfügbarkeit
│   └── investor-crm/
│       ├── crm-export-2025-06.csv             # HubSpot/Attio Pipeline-Export — aktueller Snapshot
│       ├── warm-intros-needed.md              # Investoren, die eine personliche Empfehlung benötigen — wer kann sie vermitteln
│       └── post-meeting-notes/
│           ├── a16z-partner-2025-05-14.md     # Nachbereitungsnotizen — Stimmung, Fragen, nächster Schritt
│           ├── sequoia-scout-2025-05-21.md    # Nachbereitungsnotizen
│           └── notable-capital-2025-06-01.md  # Nachbereitungsnotizen
├── hiring/
│   ├── headcount-plan-2025.md                 # Board-genehmigter Personalplan — Rolle, Team, Quartal, Budget
│   ├── open-roles.md                          # Offene Stellen — JD-Status, Recruiter, Pipeline-Anzahl
│   ├── job-descriptions/
│   │   ├── head-of-growth.md                  # Stellenbeschreibung — Head of Growth / VP Marketing
│   │   ├── senior-engineer-fullstack.md       # Stellenbeschreibung — Senior Full-Stack Engineer
│   │   ├── chief-of-staff.md                  # Stellenbeschreibung — Chief of Staff / Operations Lead
│   │   └── account-executive.md               # Stellenbeschreibung — Account Executive (SMB)
│   ├── scorecards/
│   │   ├── scorecard-template.md              # Kanonische Interview-Scorecard-Vorlage
│   │   ├── eng-scorecard.md                   # Scorecard — Engineering-Rollen
│   │   ├── gtm-scorecard.md                   # Scorecard — Vertriebs- und Marketing-Rollen
│   │   └── leadership-scorecard.md            # Scorecard — Director- und VP-Ebene
│   ├── offer-templates/
│   │   ├── offer-letter-template.md           # Standard-Angebotsschreiben-Vorlage
│   │   ├── equity-grant-explainer.md          # Verständliche Equity-Erklärung fur Kandidaten
│   │   └── comp-bands-2025.md                 # Gehaltsbandbereiche nach Level und Funktion
│   └── pipeline-notes/
│       ├── active-candidates.md               # Aktuelle Kandidaten — Rolle, Phase, nächster Schritt, Entscheidungsdatum
│       └── offers-log.md                      # Angebotshistorie — Rolle, Vergutung, Equity, angenommen/abgelehnt
├── board/
│   ├── board-composition.md                   # Aktuelle Boardmitglieder — Firma, Sitzart, Amtszeit, Ausschüsse
│   ├── board-calendar-2025.md                 # Sitzungskalender, erwartete Teilnehmer, wiederkehrende Agenda
│   ├── materials/
│   │   ├── 2025-q1-board-deck.md              # Q1 Board-Deck-Narration und Kennzahlen
│   │   ├── 2025-q2-board-deck.md              # Q2 Board-Deck-Narration (aktuell)
│   │   └── ceo-letter-q2-2025.md              # CEO-Brief an das Board — offener Kontext und Anfragen
│   ├── minutes/
│   │   ├── minutes-2025-03-15.md              # Board-Sitzungsprotokoll — Q1-Überprüfung
│   │   └── minutes-2025-06-10.md              # Board-Sitzungsprotokoll — Q2-Überprüfung
│   └── resolutions/
│       ├── resolution-option-grant-2025-05.md # Board-Beschluss — Option-Pool-Gewährung
│       └── resolution-financing-2025-06.md    # Board-Beschluss — Finanzierungsgenehmigung
├── finance/
│   ├── runway-model.md                        # Runway-Analyse — Burn Rate, verbleibende Monate, Szenarien
│   ├── cash-flow-forecast-q3-2025.md          # 13-Wochen-Cashflow-Prognose
│   ├── unit-economics.md                      # CAC, LTV, Amortisationsdauer, Bruttomarge nach Segment
│   ├── monthly-financials/
│   │   ├── p-and-l-2025-05.md                 # Mai G&V — Ist-Zahlen vs. Budget
│   │   ├── p-and-l-2025-04.md                 # April G&V
│   │   └── balance-sheet-2025-05.md           # Mai Bilanz-Snapshot
│   ├── budget-2025.md                         # Jahresbudget — Opex, Personal, Capex nach Abteilung
│   └── mercury-transactions-2025-06.csv       # Mercury Bank-Export — Transaktionen des aktuellen Monats
├── product/
│   ├── product-roadmap-q3-2025.md             # Quartals-Roadmap — Initiativen, Verantwortliche, Meilensteine
│   ├── product-vision.md                      # 2-Jahres-Produktvision — wohin wir gehen und warum
│   ├── prds/
│   │   ├── prd-template.md                    # Kanonische PRD-Vorlage
│   │   ├── prd-onboarding-revamp.md           # PRD — Überarbeitung des Onboarding-Flows
│   │   └── prd-api-v2.md                      # PRD — Öffentliche API v2
│   ├── launch-plans/
│   │   ├── launch-api-v2.md                   # Launch-Plan — API v2 Go-to-Market
│   │   └── launch-mobile-app.md               # Launch-Plan — Mobile App Beta
│   └── metrics/
│       ├── product-kpis.md                    # Kern-Produkt-KPIs — DAU, Aktivierung, Retention, NPS
│       └── feature-adoption.md                # Feature-Adoptionsdaten und Erkenntnisse
└── comms/
    ├── investor-updates/
    │   ├── update-template.md                 # Investoren-Update-Vorlage — Erfolge, Metriken, Anfragen
    │   ├── update-2025-05.md                  # Mai Investoren-Update (versendet)
    │   └── update-2025-06-draft.md            # Juni Investoren-Update (Entwurf)
    ├── all-hands/
    │   ├── all-hands-template.md              # All-Hands-Agenda und Narrations-Vorlage
    │   ├── all-hands-2025-06-notes.md         # Juni All-Hands-Notizen und Q&A
    │   └── all-hands-2025-03-notes.md         # März All-Hands-Notizen
    └── external/
        ├── press-release-template.md          # PR-Vorlage fur Finanzierungsankündigungen und Launches
        └── founder-bio.md                     # Aktuelle Grunder-Biografie — Lang- und Kurzversion
```

## Wichtige Dateien erläutert

| Pfad | Zweck |
|---|---|
| `.claude/commands/investor-update.md` | Slash-Befehl, der `finance/runway-model.md`, `strategy/company-okrs-q3-2025.md` und `comms/investor-updates/update-template.md` liest, um ein vollständiges Investoren-Update mit Metriken, Erfolgen, Versäumnissen und Anfragen zu entwerfen |
| `.claude/commands/board-prep.md` | Slash-Befehl, der `finance/monthly-financials/`, `strategy/company-okrs-*.md` und `product/product-roadmap-*.md` zu einer Board-Narration und Agenda zusammenfasst |
| `.claude/commands/fundraising-status.md` | Slash-Befehl, der `fundraising/investor-pipeline.md` und `fundraising/round-tracker.md` liest, um einen Pipeline-Gesundheits-Snapshot und empfohlene nächste Schritte zu erstellen |
| `fundraising/data-room/financial-model-q2-2025.xlsx` | Maßgebliches Finanzmodell — G&V, Runway, Unit Economics und Personalplan; referenziert in Board-Decks und Due-Diligence-Prozessen |
| `strategy/company-okrs-2025.md` | Jahres-OKR-Dokument mit Quartalsaufschlüsselung, Key-Result-Verantwortlichen und Bewertungsschema — wird quartalsweise aktualisiert |
| `finance/runway-model.md` | Aktuelle Runway-Analyse mit aktueller Burn Rate, Kassenbestand, Einstellungsszenarien und Monaten bis zur Nulllinie fur jedes Burn-Level |
| `hiring/comp-bands-2025.md` | Interne Gehaltsbandbereiche nach Funktion und Level — zur Überprüfung von Angeboten und fur die Personalbudgetplanung |
| `board/materials/ceo-letter-q2-2025.md` | Offener CEO-Brief an das Board — Kontext hinter den Metriken, Risiken und explizite Anfragen, die nicht im Deck enthalten sind |
| `fundraising/investor-pipeline.md` | Vollständige Investoren-Tracking-Liste mit Phase, letztem Kontaktdatum, Beziehungsverantwortlichem, Warm-Intro-Status und nächster Aktion |
| `comms/investor-updates/update-template.md` | Kanonisches Investoren-Update-Format — Metrik-Tabelle, Geschäftshöhepunkte, Team-Updates, Finanzen und Anfragen-Abschnitt |

## Schnelles Grundgerüst

```bash
# Create the workspace root
mkdir -p founder-workspace
cd founder-workspace

# Create .claude structure
mkdir -p .claude/commands

# Create all workspace directories
mkdir -p strategy
mkdir -p fundraising/data-room
mkdir -p fundraising/investor-crm/post-meeting-notes
mkdir -p hiring/job-descriptions
mkdir -p hiring/scorecards
mkdir -p hiring/offer-templates
mkdir -p hiring/pipeline-notes
mkdir -p board/materials
mkdir -p board/minutes
mkdir -p board/resolutions
mkdir -p finance/monthly-financials
mkdir -p product/prds
mkdir -p product/launch-plans
mkdir -p product/metrics
mkdir -p comms/investor-updates
mkdir -p comms/all-hands
mkdir -p comms/external

# Seed key files
touch strategy/north-star-metric.md
touch strategy/company-okrs-2025.md
touch strategy/competitive-landscape.md
touch fundraising/round-tracker.md
touch fundraising/investor-pipeline.md
touch fundraising/term-sheet-tracker.md
touch fundraising/data-room/data-room-index.md
touch hiring/headcount-plan-2025.md
touch hiring/open-roles.md
touch hiring/scorecards/scorecard-template.md
touch hiring/offer-templates/comp-bands-2025.md
touch hiring/pipeline-notes/active-candidates.md
touch board/board-composition.md
touch board/board-calendar-2025.md
touch finance/runway-model.md
touch finance/cash-flow-forecast-q3-2025.md
touch finance/unit-economics.md
touch finance/budget-2025.md
touch product/product-roadmap-q3-2025.md
touch product/product-vision.md
touch product/prds/prd-template.md
touch product/metrics/product-kpis.md
touch comms/investor-updates/update-template.md
touch comms/all-hands/all-hands-template.md

# Install Claude Code skills
npx uitkit add skill productivity/founder-weekly-review
npx uitkit add skill productivity/investor-update
npx uitkit add skill productivity/exec-briefing
npx uitkit add skill productivity/engineering-strategy
npx uitkit add skill finance/pitch-deck
npx uitkit add skill finance/financial-plan
npx uitkit add skill small-business/cash-flow-forecast
npx uitkit add skill small-business/hiring-pipeline

# Install slash commands
npx uitkit add command investor-update
npx uitkit add command board-prep
npx uitkit add command hiring-decision
npx uitkit add command okr-review
npx uitkit add command weekly-brief
npx uitkit add command fundraising-status
npx uitkit add command competitive-pulse
```

## CLAUDE.md Vorlage

```markdown
# Founder / CEO Workspace

Dieser Workspace unterstützt einen Startup-Grunder bei der Verwaltung von Strategie, Fundraising,
Einstellungen und dem Tagesgeschäft. Claude Code liest den Kontext aus strukturierten Dateien in
diesem Repository, um präzise, unternehmensspezifische Ausgaben zu erstellen — keine generischen
Startup-Ratschläge.

---

## Was das hier ist

Ein Claude Code Workspace fur einen Grunder oder CEO. Jedes Verzeichnis entspricht einer
Kernverantwortlichkeit: Fundraising-Pipeline, Board-Management, Einstellungen, Finanzgesundheit,
Produkt-Roadmap und externe Kommunikation. Claude liest aus diesen Dateien und schreibt Entwürfe,
Analysen und Entscheidungen in dieselbe Struktur zurück.

---

## Stack

- Notion — Strategiedokumente, Team-Wikis, OKRs (MCP: notion)
- Linear — Produkt-Roadmap und Sprint-Tracking (MCP: linear)
- HubSpot oder Attio — Investor-CRM und Fundraising-Pipeline
- Gusto oder Rippling — HR, Gehaltsabrechnung und Angebotsmanagement
- Mercury — Geschaftsbanking und Cash-Flow
- Carta — Cap Table, Equity Grants und SAFE-Tracking
- Slack — Teamkommunikation und asynchrone Investoren-Updates (MCP: slack)
- Google Workspace — Datenraum (Drive), E-Mail, geteilte Dokumente

---

## Verzeichniskonventionen

- `strategy/` — Unternehmens-OKRs, North Star, Jahresplan, Wettbewerbslandschaft. OKR-Dateien
  werden nach Jahr und Quartal benannt. Alte OKR-Dateien niemals löschen — sie sind das
  Bewertungsprotokoll.
- `fundraising/` — Runden-Tracker, Investoren-Pipeline und Datenraum. `investor-pipeline.md` ist
  die einzige Quelle der Wahrheit fur alle Investorenbeziehungen. Nachbereitungsnotizen kommen in
  `investor-crm/post-meeting-notes/` mit dem Namen `firm-YYYY-MM-DD.md`.
- `hiring/` — Alle Einstellungsunterlagen. Gehaltsbandbereiche in
  `offer-templates/comp-bands-2025.md` sind vertraulich — niemals in Board-Decks oder
  Investoren-Updates aufnehmen.
- `board/` — Board-Materialien, Protokolle und Beschlüsse. Protokolle werden nach jeder Sitzung
  abgelegt. Beschlüsse erfordern die Unterschrift eines Boardmitglieds vor der Ablage.
- `finance/` — Runway-Modell, Cash-Flow, G&V und Budget. `runway-model.md` wird bei jeder
  Änderung der Burn Rate oder des Personalbestands aktualisiert. Monatliche G&V-Dateien werden
  als `p-and-l-YYYY-MM.md` benannt.
- `product/` — Roadmap, PRDs und Launch-Pläne. Ein PRD pro Feature. Roadmap-Dateien werden nach
  Quartal benannt. `product-vision.md` ist ein stabiles 2-Jahres-Dokument, kein Sprint-Plan.
- `comms/` — Investoren-Updates und All-Hands-Notizen. Versendete Investoren-Updates werden nie
  bearbeitet. Entwürfe erhalten das Suffix `-draft.md` bis zur Versendung.

---

## Häufige Aufgaben — genaue Befehle

### Fundraising
```
/investor-update       — Investoren-Update aus Metriken, OKRs und den Highlights des letzten Monats entwerfen
/fundraising-status    — Pipeline-Snapshot: Phasen, ins Stocken geratene Deals, nächste Aktionen, Runden-Gesundheit
```

### Board-Management
```
/board-prep            — Board-Deck-Narration, Agenda, CEO-Brief und Vorab-Leseliste zusammenstellen
```

### Einstellungen
```
/hiring-decision       — Kandidaten bewerten: Scorecard-Zusammenfassung, Einstellungsempfehlung
```

### Strategie und OKRs
```
/okr-review            — Aktuelle OKRs bewerten, Blocker aufzeigen, Ziele fur nächstes Quartal entwerfen
/competitive-pulse     — Wettbewerbssignale triagieren, Landscape-Dokument aktualisieren, Reaktionsmemo entwerfen
```

### Wochentlicher Rhythmus
```
/weekly-brief          — CEO Weekly Brief: Erfolge, Versäumnisse, Top-Prioritäten, Blocker, Anfragen
```

---

## Konventionen, die Claude einhalten muss

- Finanzzahlen ausschließlich aus `finance/runway-model.md` und `finance/monthly-financials/`
  beziehen. Zahlen nicht erfinden oder schätzen.
- Pipeline-Phasen in `fundraising/investor-pipeline.md` sind die einzige Quelle der Wahrheit.
  In Fundraising-Statusberichten nicht widersprechen.
- Gehaltsbandbereiche in `hiring/offer-templates/comp-bands-2025.md` sind vertraulich. Niemals
  in Investoren-Updates, Board-Decks oder Dokumenten aufnehmen, die den Workspace verlassen.
- OKR-Bewertungen verwenden eine Skala von 0,0–1,0. 0,7 ist ein starkes Ergebnis. 1,0 bedeutet,
  dass das Ziel zu niedrig gesetzt war.
- Board-Materialien werden 5 Werktage vor jedem Sitzungstermin in
  `board/board-calendar-2025.md` entworfen.
- Nachbereitungsnotizen zu Investorentreffen müssen enthalten: Stimmung (positiv/neutral/zurückhaltend),
  gestellte Schlüsselfragen, geäußerte Einwände sowie den expliziten nächsten Schritt mit
  Verantwortlichem und Datum.
- Alle Investoren-Updates folgen der Vorlage unter `comms/investor-updates/update-template.md`.
  Abschnittsreihenfolge nicht ändern und den Anfragen-Abschnitt nicht weglassen.
```

## MCP-Server

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-notion"],
      "env": {
        "NOTION_API_KEY": "${NOTION_API_KEY}"
      }
    },
    "linear": {
      "command": "npx",
      "args": ["-y", "@linear/mcp-server"],
      "env": {
        "LINEAR_API_KEY": "${LINEAR_API_KEY}"
      }
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "${SLACK_BOT_TOKEN}",
        "SLACK_TEAM_ID": "${SLACK_TEAM_ID}"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropic-ai/mcp-server-filesystem",
        "/Users/you/founder-workspace"
      ]
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"comms/investor-updates/\" && ! echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"draft\"; then echo \"[Investor update hook] Investor update filed — confirm it has been sent to your investor list and archived.\"; fi'"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"hiring/offer-templates/comp-bands\"; then echo \"[Confidential hook] WARNING: comp-bands-2025.md is confidential. Confirm this output is not destined for an investor or board document.\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'echo \"[Session end] If you updated fundraising/investor-pipeline.md or finance/runway-model.md, confirm the changes are saved and reflect the current date.\"'"
          }
        ]
      }
    ]
  }
}
```

## Zu installierende Skills

```bash
npx uitkit add skill productivity/founder-weekly-review
npx uitkit add skill productivity/investor-update
npx uitkit add skill productivity/exec-briefing
npx uitkit add skill productivity/engineering-strategy
npx uitkit add skill productivity/process-mapper
npx uitkit add skill productivity/comp-benchmarker
npx uitkit add skill finance/pitch-deck
npx uitkit add skill finance/financial-plan
npx uitkit add skill small-business/cash-flow-forecast
npx uitkit add skill small-business/hiring-pipeline
```

## Verwandte Ressourcen

- [Leitfaden: Claude fur Grunder und CEOs](../guides/for-founder.md)
- [Workflow: Fundraising-Pipeline](../workflows/fundraising-pipeline.md)
- [Workflow: Board-Meeting-Vorbereitung](../workflows/board-meeting-prep.md)
- [Workflow: Wochentliche CEO-Überprüfung](../workflows/founder-weekly-review.md)
