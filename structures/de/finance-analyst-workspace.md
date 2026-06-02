# Finance Analyst / CFO Workspace — Projektstruktur

> Für einen Finanzanalysten oder CFO, der Finanzmodellierung, Monatsabschlüsse, Board-Unterlagen, Szenarioplanung und Investorenberichte verwaltet — alles aus einem einzigen Claude Code Workspace heraus.

## Stack

- Excel / Google Sheets — Drei-Abschluss-Modelle, DCF, Soll-Ist-Vergleich, Szenariomodelle
- QuickBooks, Xero oder NetSuite — Hauptbuch, Debitoren/Kreditoren, Buchungssätze, Saldenliste
- Notion oder Confluence — Bilanzierungsrichtlinien, Abschluss-Checklisten, Teamdokumentation
- Carta — Gesellschaftertabelle, Optionspool, Verwässerungsmodellierung, 409A-Daten
- Slack — Abstimmung beim Abschlussprozess, Board-Vorbereitung, Investorenkommunikation
- PowerPoint oder Google Slides — Board-Präsentationen, Investoren-Updates, Management-Reporting

## Verzeichnisstruktur

```
finance-analyst-workspace/
├── .claude/
│   ├── CLAUDE.md                              # Workspace-Anweisungen für Claude Code
│   ├── settings.json                          # Berechtigungen, Hooks, MCP-Konfiguration
│   └── commands/
│       ├── variance-analysis.md               # Periodenabweichungsbericht — Soll-Ist-Vergleich mit Kommentar
│       ├── model-update.md                    # Drei-Abschluss-Modell mit aktuellen Ist-Werten aktualisieren
│       ├── board-pack.md                      # Board-Unterlage zusammenstellen — Finanzen, KPIs, Narrative
│       ├── close-checklist.md                 # Monatsabschluss-Aufgabenliste mit Statusverfolgung
│       ├── scenario-model.md                  # Szenarioplanung — Basis-, optimistisches und pessimistisches Szenario
│       ├── investor-update.md                 # Investoren-Update-Brief — Kennzahlen, Narrative, Anfragen
│       └── budget-reforecast.md               # Quartalsforecast — rollierend 4 Quartale mit Annahmen
├── models/
│   ├── 3-statement/
│   │   ├── 3-statement-model-2025.xlsx        # Integriertes G&V-, Bilanz- und Cashflow-Modell
│   │   ├── 3-statement-model-2024.xlsx        # Vorjahresmodell — archivierte Referenz
│   │   ├── assumptions-log.md                 # Wesentliche Treiberannahmen und Änderungshistorie
│   │   └── monthly-actuals-feed.csv           # Export aus QuickBooks/Xero für Modellaktualisierungen
│   ├── dcf/
│   │   ├── dcf-model-current.xlsx             # Discounted-Cashflow-Modell — WACC, Restwert, IRR
│   │   ├── wacc-calculation.xlsx              # WACC-Berechnung — Eigenkapitalkosten, Fremdkapitalkosten, Beta
│   │   ├── sensitivity-table.xlsx             # Sensitivitätsanalyse Umsatzwachstum vs. EBITDA-Marge
│   │   └── dcf-assumptions.md                 # Begründung der DCF-Eingaben — Wachstum, Margen, WACC
│   ├── budget-vs-actual/
│   │   ├── bva-2025-ytd.xlsx                  # YTD-Soll-Ist-Vergleich nach Kostenstelle und Position
│   │   ├── bva-template.xlsx                  # Leere SIA-Vorlage für neue Perioden
│   │   ├── variance-commentary-jan-2025.md    # Abweichungskommentar — Management-Paket Januar 2025
│   │   ├── variance-commentary-feb-2025.md    # Abweichungskommentar — Management-Paket Februar 2025
│   │   ├── variance-commentary-mar-2025.md    # Abweichungskommentar — Management-Paket März 2025
│   │   └── variance-threshold-policy.md       # Richtlinie: ab welcher Abweichung ein Pflichtkommentar erforderlich ist
│   └── scenario/
│       ├── scenario-model-q2-2025.xlsx        # Basis-, optimistisches und pessimistisches Szenariomodell — Q2 2025
│       ├── scenario-model-q3-2025.xlsx        # Q3 2025 Szenariomodell — aktualisiert nach Abschluss
│       ├── macro-assumptions.md               # Externe Annahmen: Zinsen, FX, Marktbedingungen
│       └── scenario-summary-template.xlsx     # Einseitige Szenariozusammenfassung für Board und Investoren
├── reports/
│   ├── board-packs/
│   │   ├── board-pack-q1-2025.pptx            # Board-Unterlage Q1 2025 — Finanzen + KPIs + Narrative
│   │   ├── board-pack-q2-2025.pptx            # Board-Unterlage Q2 2025
│   │   ├── board-pack-template.pptx           # Mastervorlage — genehmigtes Layout und Corporate Design
│   │   └── board-pack-data-q2-2025.xlsx       # Unterstützende Datendatei für Diagramme der Q2-Board-Unterlage
│   ├── investor-updates/
│   │   ├── investor-update-may-2025.md        # Monatlicher Investoren-Update-Brief — Mai 2025
│   │   ├── investor-update-jun-2025.md        # Monatlicher Investoren-Update-Brief — Juni 2025
│   │   ├── investor-update-template.md        # Standardvorlage für Investoren-Update-Briefe
│   │   └── investor-list.md                   # Aktuelles Investorenregister — Namen, Beteiligungsquote, Kontakt
│   └── management-reporting/
│       ├── management-package-jan-2025.xlsx   # Monatliches Management-Paket Januar 2025
│       ├── management-package-feb-2025.xlsx   # Monatliches Management-Paket Februar 2025
│       ├── management-package-mar-2025.xlsx   # Monatliches Management-Paket März 2025
│       └── management-package-template.xlsx   # Standardvorlage für Management-Pakete
├── close/
│   ├── month-end-close-checklist.md           # Haupt-Monatsabschluss-Aufgabenliste mit Verantwortlichen
│   ├── close-calendar-2025.md                 # Hard-Close-Termine, Soft-Close-Termine, Board-Termine
│   ├── journal-entries/
│   │   ├── je-template.csv                    # Standard-Buchungssatz-Upload-Format für QuickBooks/Xero
│   │   ├── accruals-jan-2025.csv              # Abgrenzungsbuchungen für Januar 2025
│   │   ├── accruals-feb-2025.csv              # Abgrenzungsbuchungen für Februar 2025
│   │   ├── accruals-mar-2025.csv              # Abgrenzungsbuchungen für März 2025
│   │   └── prepaid-amortization-schedule.xlsx # Vorauszahlungsplan mit monatlicher Abschreibung
│   ├── reconciliations/
│   │   ├── bank-recon-jan-2025.xlsx           # Bankabstimmung — Januar 2025
│   │   ├── bank-recon-feb-2025.xlsx           # Bankabstimmung — Februar 2025
│   │   ├── ar-aging-jan-2025.xlsx             # Debitorenaltersliste — Januar 2025
│   │   ├── ar-aging-feb-2025.xlsx             # Debitorenaltersliste — Februar 2025
│   │   ├── intercompany-recon.xlsx            # Intercompany-Eliminierungen — falls zutreffend
│   │   └── gl-recon-checklist.md              # Hauptbuchkonto-Abstimmungs-Checkliste und Freigaben
│   └── trial-balance/
│       ├── tb-jan-2025.csv                    # Exportierte Saldenliste — Januar 2025
│       ├── tb-feb-2025.csv                    # Exportierte Saldenliste — Februar 2025
│       └── tb-mapping.xlsx                    # Zuordnung Kontenplan zu Abschlussposten
├── budgets/
│   ├── annual/
│   │   ├── budget-2025.xlsx                   # Vom Board genehmigter Jahresbudgetplan — GJ2025
│   │   ├── budget-2025-assumptions.md         # Begründung der GJ2025-Budgetpositionen
│   │   ├── budget-2026-draft.xlsx             # GJ2026-Budgetentwurf — in Bearbeitung
│   │   └── budget-approval-log.md             # Board-Genehmigungsdaten, Revisionshistorie, Unterzeichner
│   └── reforecasts/
│       ├── reforecast-q1-2025.xlsx            # Q1 2025 Reforecast — rollierender 4-Quartals-Überblick
│       ├── reforecast-q2-2025.xlsx            # Q2 2025 Reforecast
│       ├── reforecast-q3-2025.xlsx            # Q3 2025 Reforecast
│       └── reforecast-assumptions.md          # Laufendes Protokoll der Reforecast-Annahmeänderungen
├── compliance/
│   ├── audit/
│   │   ├── audit-prep-checklist.md            # Jahresabschluss-Prüfungsvorbereitung — PBC-Liste und Status
│   │   ├── pbc-2024.xlsx                      # Vom Mandanten erstellte Unterlagen — GJ2024-Prüfung
│   │   ├── audit-adjustments-2024.xlsx        # Vom Prüfer vorgeschlagene Korrekturen und Stellungnahmen
│   │   └── auditor-contact.md                 # Name des Prüfers, Prüfungsteam, Kontaktdaten
│   ├── tax/
│   │   ├── tax-calendar-2025.md               # Abgabefristen auf Bundes- und Landesebene — GJ2025
│   │   ├── r-and-d-credit-analysis.xlsx       # Qualifikationsanalyse für F&E-Steuergutschriften
│   │   ├── state-nexus-tracker.md             # Bundesstaaten mit Nexus — Registrierungs- und Einreichungsstatus
│   │   └── 83b-elections-log.md               # Protokoll der von Gründern/Mitarbeitern eingereichten 83(b)-Wahlen
│   └── regulatory/
│       ├── 409a-valuation-current.pdf         # Aktueller 409A-Bewertungsbericht
│       ├── 409a-history.md                    # 409A-Bewertungshistorie — Daten, Anbieter, Verkehrswerte
│       └── irs-correspondence/                # IRS-Bescheide und Antworten — eine Datei pro Bescheid
├── docs/
│   ├── accounting-policies.md                 # Formale Bilanzierungsrichtlinien — Umsatzrealisierung, Investitionen usw.
│   ├── chart-of-accounts.xlsx                 # Vollständiger Kontenplan mit Kontonummern, -arten und -beschreibungen
│   ├── revenue-recognition-policy.md          # Umsatzrealisierungsrichtlinie gemäß ASC 606
│   ├── expense-policy.md                      # Richtlinie für Mitarbeiterausgaben und Erstattungen
│   ├── equity-compensation-summary.md         # Optionspool, Gewährungen, Vesting-Pläne, Carta-Zusammenfassung
│   └── glossary.md                            # Glossar des Finanzteams — Abkürzungen und Definitionen
└── cap-table/
    ├── cap-table-current.xlsx                 # Aktuelle vollverwässerte Gesellschaftertabelle — synchronisiert aus Carta
    ├── option-pool-analysis.xlsx              # Analyse zur Ausreichlichkeit und Aufstockung des Optionspools
    ├── dilution-scenarios.xlsx                # Verwässerungsmodellierung — Series A, B, SAFE-Wandlungen
    └── 409a-strike-price-log.md              # Ausübungspreishistorie nach Gewährungsdatum
```

## Wichtige Dateien erklärt

| Pfad | Zweck |
|---|---|
| `.claude/commands/variance-analysis.md` | Slash-Befehl, der ein Periodenargument entgegennimmt (z. B. `may-2025`), die entsprechende SIA-Datei aus `models/budget-vs-actual/` liest und einen Abweichungskommentar auf Führungsebene mit positionsbezogenen Erläuterungen erstellt |
| `.claude/commands/board-pack.md` | Slash-Befehl, der die Finanzzahlen, KPI-Trends und die Szenariozusammenfassung des aktuellen Quartals zu einer boardgerechten Foliennarrative und Sprechernotizen zusammenstellt |
| `.claude/commands/close-checklist.md` | Slash-Befehl, der eine Monatsabschluss-Aufgabenliste mit vorausgefüllten Verantwortlichen, Fälligkeitsterminen und übertragenen Punkten aus dem vorigen Abschluss erstellt |
| `models/3-statement/3-statement-model-2025.xlsx` | Integriertes Finanzmodell — Ist-Wert-Updates fließen von der G&V über die Bilanz in den Cashflow; Quelle der Wahrheit für alle Berichte |
| `close/month-end-close-checklist.md` | Laufende Abschluss-Checkliste mit Aufgabenverantwortlichem, Status (offen/erledigt/blockiert) und Fälligkeitsdatum pro Schritt; wird in jedem Abschlusszyklus aktualisiert |
| `budgets/annual/budget-2025.xlsx` | Vom Board genehmigtes Betriebsbudget; nach Genehmigung nicht mehr ändern — Abweichungen werden gegen diese Basis erklärt |
| `compliance/audit/audit-prep-checklist.md` | PBC-Checkliste (vom Mandanten erstellte Unterlagen) für die Jahresabschlussprüfung; verfolgt den Dokumentenstatus und die Empfangsbestätigung des Prüfers |
| `reports/investor-updates/investor-update-template.md` | Standardformat für Investorenbriefe: Hauptkennzahlen, Narrative, wichtige Meilensteine, Anfragen — wird bei jedem monatlichen Update verwendet |
| `docs/chart-of-accounts.xlsx` | Maßgeblicher Kontenplan — jedes neue Konto, das in QuickBooks/Xero/NetSuite hinzugefügt wird, muss hier mit der korrekten Abschlusspositionszuordnung erfasst werden |
| `cap-table/cap-table-current.xlsx` | Vollverwässerte Gesellschaftertabelle aus Carta; Grundlage für Verwässerungsmodellierung, 409A-Eingaben und Board-Reporting |

## Schnelles Gerüst aufbauen

```bash
# Create the workspace root
mkdir -p finance-analyst-workspace
cd finance-analyst-workspace

# Create .claude structure
mkdir -p .claude/commands

# Create workspace directories
mkdir -p models/3-statement
mkdir -p models/dcf
mkdir -p models/budget-vs-actual
mkdir -p models/scenario
mkdir -p reports/board-packs
mkdir -p reports/investor-updates
mkdir -p reports/management-reporting
mkdir -p close/journal-entries
mkdir -p close/reconciliations
mkdir -p close/trial-balance
mkdir -p budgets/annual
mkdir -p budgets/reforecasts
mkdir -p compliance/audit
mkdir -p compliance/tax
mkdir -p compliance/regulatory/irs-correspondence
mkdir -p docs
mkdir -p cap-table

# Seed key files
touch models/3-statement/assumptions-log.md
touch models/budget-vs-actual/variance-threshold-policy.md
touch close/month-end-close-checklist.md
touch close/close-calendar-2025.md
touch close/gl-recon-checklist.md
touch close/reconciliations/gl-recon-checklist.md
touch budgets/annual/budget-2025-assumptions.md
touch budgets/annual/budget-approval-log.md
touch budgets/reforecasts/reforecast-assumptions.md
touch compliance/audit/audit-prep-checklist.md
touch compliance/tax/tax-calendar-2025.md
touch compliance/tax/state-nexus-tracker.md
touch docs/accounting-policies.md
touch docs/revenue-recognition-policy.md
touch docs/expense-policy.md
touch docs/equity-compensation-summary.md
touch docs/glossary.md
touch cap-table/409a-strike-price-log.md
touch reports/investor-updates/investor-update-template.md

# Seed .claude/commands
touch .claude/commands/variance-analysis.md
touch .claude/commands/model-update.md
touch .claude/commands/board-pack.md
touch .claude/commands/close-checklist.md
touch .claude/commands/scenario-model.md
touch .claude/commands/investor-update.md
touch .claude/commands/budget-reforecast.md

# Install Claude Code skills
npx claudient add skill finance/3-statement-model
npx claudient add skill finance/dcf-model
npx claudient add skill finance/budget-vs-actual
npx claudient add skill finance/board-pack-builder
npx claudient add skill finance/financial-plan
npx claudient add skill finance/gl-reconciler
npx claudient add skill finance/comps-analysis
npx claudient add skill productivity/investor-update
npx claudient add skill productivity/exec-briefing
```

## CLAUDE.md-Vorlage

```markdown
# Finance Analyst / CFO Workspace

Dieser Workspace unterstützt den Finanzbetrieb: Modellaktualisierungen, Monatsabschluss, Board-Unterlagen,
Szenarioplanung, Investorenberichte und Prüfungsvorbereitung — alles gesteuert durch strukturierte Dateien und Slash-Befehle.

---

## Worum es geht

Ein strukturierter Claude Code Workspace für einen Finanzanalysten oder CFO. Jedes Verzeichnis entspricht einer
bestimmten Finanzfunktion. Claude Code liest Ist-Werte, Budgets und Richtliniendateien, um präzise,
organisationsspezifische Ergebnisse zu liefern — keine generischen Finanzempfehlungen.

---

## Stack

- Excel / Google Sheets — Finanzmodelle, SIA, Szenarien (Dateien in models/)
- QuickBooks / Xero / NetSuite — Hauptbuch, Debitoren/Kreditoren, Saldenliste (Exporte in close/trial-balance/)
- Notion / Confluence — Bilanzierungsrichtlinien, Abschlussdokumente (docs/)
- Carta — Gesellschaftertabelle und Eigenkapitaldaten (cap-table/)
- Slack — Abstimmung beim Abschluss, Investorenkommunikation (MCP: slack)
- PowerPoint / Google Slides — Board-Präsentationen, Investoren-Updates (reports/)

---

## Verzeichniskonventionen

- `models/` — Alle Finanzmodelle. Reine Ist-Wert-Exporte gehören nicht hierher, sondern nach close/.
- `close/` — Monatsabschluss-Artefakte. Ein Unterverzeichnis pro Prozessbereich: journal-entries/, reconciliations/, trial-balance/.
- `budgets/` — Vom Board genehmigtes Budget in budgets/annual/. Reforecasts in budgets/reforecasts/. Die genehmigte Budgetdatei darf nicht überschrieben werden.
- `reports/` — Ausgaben. Board-Unterlagen in board-packs/, Investorenbriefe in investor-updates/, Management-Pakete in management-reporting/.
- `compliance/` — Prüfungs-PBC, Steuererklärungen, behördliche Dokumente. Nur endgültige oder nahezu endgültige Dokumente hier ablegen.
- `docs/` — Richtliniendokumente und Referenzmaterial. accounting-policies.md und chart-of-accounts.xlsx aktuell halten.
- `cap-table/` — Carta-Exporte und Eigenkapitalmodellierung. cap-table-current.xlsx nach jeder Gewährung oder Finanzierungsrunde aktualisieren.

---

## Häufige Aufgaben — genaue Befehle

### Abweichungs- und Abschlussberichte
```
/variance-analysis may-2025   — Liest models/budget-vs-actual/bva-2025-ytd.xlsx, erstellt
                                positionsbezogenen Abweichungskommentar für die angegebene Periode
/close-checklist              — Erstellt Monatsabschluss-Aufgabenliste mit Verantwortlichen und Fälligkeitsterminen
/model-update                 — Aktualisiert Drei-Abschluss-Modell mit dem neuesten Saldenlisten-Export
```

### Board- und Investorenberichte
```
/board-pack                   — Stellt Finanzzahlen, KPIs und Szenariozusammenfassung des aktuellen
                                Quartals zu Board-Foliennarrative und Sprechernotizen zusammen
/investor-update              — Entwirft monatlichen Investoren-Update-Brief auf Basis aktueller
                                Kennzahlen und Meilensteinfortschritt
```

### Budgetierung und Szenarioplanung
```
/budget-reforecast            — Erstellt rollierenden 4-Quartals-Reforecast mit Annahmenänderungsprotokoll
/scenario-model               — Generiert Basis-, optimistische und pessimistische Szenarioergebnisse aus Treiberingaben
```

---

## Konventionen, die Claude einhalten muss

- Die vom Board genehmigte Budgetdatei (budgets/annual/budget-2025.xlsx) ist schreibgeschützt. Niemals Änderungen daran vorschlagen.
- Abweichungskommentare müssen die spezifische Position, den Betrag in Dollar und den Prozentsatz angeben. Niemals vage Kommentare wie "höher als erwartet" schreiben.
- Bei der Erstellung von Investoren-Updates zuerst Kennzahlen aus management-reporting/ verwenden. Keine Zahlen schätzen.
- Buchungssätze müssen dem Format in close/journal-entries/je-template.csv entsprechen, bevor Uploads vorgeschlagen werden.
- Der Kontenplan ist die maßgebliche Quelle für Kontonummern. Wenn ein neues Konto benötigt wird, dies explizit vermerken und den Controller zur Ergänzung auffordern.
- 409A-Ausübungspreise in cap-table/409a-strike-price-log.md sind vertraulich — nicht in Board-Unterlagen aufnehmen, sofern nicht ausdrücklich angewiesen.
- Prüfungs-PBC-Dokumente in compliance/audit/ sind vertraulich. Dateiinhalte nicht in investorengerichteten Ausgaben referenzieren.
- Bei Modellaktualisierungen Annahmeänderungen stets in models/3-statement/assumptions-log.md mit Datum und Begründung protokollieren.
- Reforecast-Dateien müssen einen Änderungsprotokoll-Abschnitt enthalten. Niemals eine frühere Reforecast-Datei überschreiben — stattdessen eine neue versionierte Datei erstellen.
- Alle Abweichungsschwellenwerte, die einen Pflichtkommentar auslösen, sind in models/budget-vs-actual/variance-threshold-policy.md definiert.
```

## MCP-Server

```json
{
  "mcpServers": {
    "quickbooks": {
      "command": "npx",
      "args": ["-y", "@intuit/mcp-server-quickbooks"],
      "env": {
        "QB_CLIENT_ID": "${QB_CLIENT_ID}",
        "QB_CLIENT_SECRET": "${QB_CLIENT_SECRET}",
        "QB_REALM_ID": "${QB_REALM_ID}",
        "QB_ACCESS_TOKEN": "${QB_ACCESS_TOKEN}"
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
        "/Users/you/finance-analyst-workspace"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"models/budget-vs-actual/\"; then echo \"[BvA hook] Variance file updated — confirm variance-threshold-policy.md has been checked for mandatory commentary requirements.\"; fi'"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"budgets/annual/budget-2025\"; then echo \"[Budget guard] STOP — the approved annual budget file is read-only. Write to budgets/reforecasts/ instead.\"; exit 1; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'echo \"[Session end] If you updated a model, confirm assumption changes are logged in models/3-statement/assumptions-log.md. If you drafted a close document, confirm it is linked in close/month-end-close-checklist.md.\"'"
          }
        ]
      }
    ]
  }
}
```

## Zu installierende Skills

```bash
npx claudient add skill finance/3-statement-model
npx claudient add skill finance/dcf-model
npx claudient add skill finance/budget-vs-actual
npx claudient add skill finance/board-pack-builder
npx claudient add skill finance/financial-plan
npx claudient add skill finance/gl-reconciler
npx claudient add skill finance/comps-analysis
npx claudient add skill productivity/investor-update
npx claudient add skill productivity/exec-briefing
npx claudient add skill productivity/stakeholder-comms
npx claudient add skill data-ml/stakeholder-report
```

## Verwandte Inhalte

- [Leitfaden: Claude für Finanzanalysten und CFOs](../guides/for-finance-analyst.md)
- [Workflow: Monatsabschluss](../workflows/month-end-close.md)
- [Workflow: Vorbereitung der Board-Unterlagen](../workflows/board-pack-prep.md)
- [Workflow: Jahresbudgetierung](../workflows/annual-budgeting.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
