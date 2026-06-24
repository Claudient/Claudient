# Account Executive Workspace — Projektstruktur

> Für einen quota-tragenden AE, der Enterprise- oder Mid-Market-Pipeline von Anfang bis Abschluss managt — von der Discovery bis zum Close — mit Salesforce, Gong, DocuSign, Clari und Seismic als operativem Stack.

## Stack

- **Salesforce** — CRM, Opportunity-Management, Aktivitätsprotokollierung, Forecast-Kategorie-Tracking
- **Gong** — Gesprächsaufzeichnung, Deal-Risikobewertung, Transkript-Export, Rep-Analysen
- **DocuSign** — Vertragsweiterleitung, Envelope-Tracking, eSignatur-Audit-Trail
- **Clari** oder **Bowtie** — KI-gestützte Prognosen, Pipeline-Rollup, Revenue Intelligence
- **Seismic** oder **Highspot** — Content-Management, Pitch Decks, ROI-Kalkulatoren, Battlecards
- **LinkedIn Sales Navigator** — Executive Mapping, Account-Expansion, Signal-Tracking
- **Slack** — Deal Rooms, Manager-Threads, CS-Übergabe-Kanäle
- **Claude Code** — MEDDPICC-Bewertung, RFP-Entwurf, MSP-Erstellung, QBR-Vorbereitung, Forecast-Vorbereitung

## Verzeichnisstruktur

```
ae-workspace/
├── .claude/
│   ├── CLAUDE.md                        # Workspace-Anweisungen (Vorlage unten einfügen)
│   ├── settings.json                    # MCP-Server, Hooks, Berechtigungen
│   └── commands/
│       ├── deal-review.md               # /deal-review — MEDDPICC-Bewertung + Risiko-Flags pro Deal
│       ├── exec-alignment.md            # /exec-alignment — Stakeholder-Map, Executive-Outreach-Entwürfe
│       ├── proposal-draft.md            # /proposal-draft — vollständiges Angebot oder RFP-Abschnitt
│       ├── qbr-prep.md                  # /qbr-prep — QBR-Deck-Gliederung, Kennzahlen, Narrativ
│       ├── negotiation-prep.md          # /negotiation-prep — BATNA-Analyse, Konzessionsmatrix
│       ├── forecast-update.md           # /forecast-update — wöchentlicher Commit/Best Case Roll-up
│       └── close-plan.md               # /close-plan — gegenseitiger Aktionsplan, Meilenstein-Tabelle
├── deals/
│   ├── _template/                       # Leerer Deal-Ordner — beim Öffnen einer neuen Opportunity kopieren
│   │   ├── discovery-notes.md           # Rohe Gesprächsnotizen, Qualifikationskriterien, MEDDPICC-Entwurf
│   │   ├── exec-map.md                  # Stakeholder-Map — Name, Titel, Rolle, Stimmung, letzter Kontakt
│   │   ├── close-plan.md               # Gegenseitiger Aktionsplan mit Terminen und Verantwortlichen beider Seiten
│   │   ├── gong-transcripts/            # Exportierte Gong-Gesprächstranskripte (Klartext)
│   │   │   └── .gitkeep
│   │   └── rfp-responses/               # RFP-Abschnittsentwürfe und finale Antworten
│   │       └── .gitkeep
│   ├── acme-corp/
│   │   ├── discovery-notes.md
│   │   ├── exec-map.md
│   │   ├── close-plan.md
│   │   ├── meddpicc-scores.md           # Laufende MEDDPICC-Bewertungshistorie (nach jeder Review aktualisiert)
│   │   ├── negotiation-log.md           # Konzessionshistorie, Redlines, Deal-Desk-Notizen
│   │   ├── gong-transcripts/
│   │   │   ├── 2026-05-14-discovery.txt
│   │   │   ├── 2026-05-28-demo.txt
│   │   │   └── 2026-06-01-negotiation.txt
│   │   └── rfp-responses/
│   │       ├── section-3-security.md
│   │       ├── section-5-integrations.md
│   │       └── executive-summary.md
│   ├── beta-industries/
│   │   ├── discovery-notes.md
│   │   ├── exec-map.md
│   │   └── close-plan.md
│   └── gamma-systems/
│       ├── discovery-notes.md
│       ├── exec-map.md
│       ├── close-plan.md
│       └── gong-transcripts/
│           └── 2026-06-02-eval-review.txt
├── templates/
│   ├── proposal-template.md             # Wiederverwendbare Angebotsstruktur — Executive Summary, ROI, Konditionen
│   ├── rfp-response-template.md         # RFP-Antwortgerüst — Anforderung, Antwort, Nachweis
│   ├── close-plan-template.md           # Gegenseitiger Aktionsplan mit Standard-Meilensteinphasen
│   ├── mutual-action-plan.md            # MAP für späte Deal-Phasen — Meilensteine, Verantwortliche, Termine
│   ├── executive-outreach-template.md   # Kalt-/Warm-Outreach an Economic Buyer oder C-Suite
│   ├── qbr-deck-outline.md              # QBR-Folienstruktur — Business Review, Ziele, nächstes Quartal
│   └── champion-enablement-package.md   # Internes Verkaufspaket für den Champion zur internen Weitergabe
├── competitive/
│   ├── battlecard-competitor-a.md       # Positionierung Wettbewerber A, Einwände, Gewinnthemen
│   ├── battlecard-competitor-b.md       # Positionierung Wettbewerber B, Einwände, Gewinnthemen
│   ├── competitive-positioning.md       # Übergeordnetes Differenzierungsnarrativ — quartalsweise aktualisiert
│   └── win-loss-notes.md               # Laufendes Protokoll von gewonnenen/verlorenen Deals pro Wettbewerber
├── metrics/
│   ├── quota-tracker.md                 # Wöchentliche Quota-Erreichung: abgeschlossen, Pipeline, Lücke zum Ziel
│   ├── pipeline-health.md              # Coverage Ratio, Phasenverteilung, Liste alter Deals
│   ├── forecast-log.md                 # Wöchentliches Commit vs. tatsächlich — Forecast-Genauigkeitshistorie
│   └── deal-cycle-benchmarks.md        # Durchschnittliche Tage pro Phase, Abschlussquoten nach Segment/Größe
└── scratch/
    ├── weekly-prep.md                   # Entwurfsbereich für Forecast-Call und Deal-Review-Vorbereitung
    └── call-notes-staging.md            # Rohe Post-Call-Notizen bevor sie in den Deal-Ordner wandern
```

## Wichtige Dateien erklärt

| Pfad | Zweck |
|---|---|
| `.claude/commands/deal-review.md` | Slash-Befehl, der einen Deal-Namen und Kontext entgegennimmt und eine bewertete MEDDPICC-Einschätzung, Risiko-Flags und eine empfohlene Forecast-Kategorie zurückgibt |
| `.claude/commands/exec-alignment.md` | Slash-Befehl zur Abbildung des Buying Committee, Bewertung der Stimmung jedes Stakeholders und Entwurf von Executive-Multi-Threading-Outreach |
| `.claude/commands/proposal-draft.md` | Slash-Befehl, der ein vollständiges Angebot oder einen spezifischen RFP-Abschnitt erstellt — nimmt Käuferkriterien und Produktdifferenziatoren als Eingabe |
| `.claude/commands/negotiation-prep.md` | Slash-Befehl für BATNA-Analyse, Konzessionsmatrix und Ausstiegsbedingungen vor einem kommerziellen Verhandlungsgespräch |
| `deals/_template/` | Leere Ordnerstruktur zum Kopieren, wenn eine neue Opportunity in die Pipeline qualifiziert wird — sorgt für einheitliche Dokumentation über alle Deals |
| `deals/acme-corp/meddpicc-scores.md` | Laufende MEDDPICC-Bewertungshistorie, die nach jeder Deal-Review aktualisiert wird — verfolgt Bewertungsdrift und Risikomuster über den Deal-Zyklus |
| `templates/mutual-action-plan.md` | Käuferseitiger gemeinsamer Plan, der in der Evaluierungsphase geteilt wird — Meilensteine, gegenseitige Verpflichtungen und vereinbartes Abschlussdatum |
| `metrics/forecast-log.md` | Wöchentliches Commit vs. tatsächlich abgeschlossen — dient zur Verfolgung der Forecast-Genauigkeit über die Zeit und zur Erkennung von Sandbagging oder Übercommitment-Mustern |

## Schnell-Scaffold

```bash
# Workspace-Verzeichnis erstellen
mkdir -p ae-workspace

# .claude-Struktur erstellen
mkdir -p ae-workspace/.claude/commands

# Deal-Verzeichnisse erstellen
mkdir -p ae-workspace/deals/_template/gong-transcripts
mkdir -p ae-workspace/deals/_template/rfp-responses
mkdir -p ae-workspace/deals/acme-corp/gong-transcripts
mkdir -p ae-workspace/deals/acme-corp/rfp-responses
mkdir -p ae-workspace/deals/beta-industries
mkdir -p ae-workspace/deals/gamma-systems/gong-transcripts

# Template-, Competitive-, Metrics- und Scratch-Verzeichnisse erstellen
mkdir -p ae-workspace/templates
mkdir -p ae-workspace/competitive
mkdir -p ae-workspace/metrics
mkdir -p ae-workspace/scratch

# .gitkeep-Platzhalter anlegen
touch ae-workspace/deals/_template/gong-transcripts/.gitkeep
touch ae-workspace/deals/_template/rfp-responses/.gitkeep

# GTM-Skills installieren
npx uitkit add skill gtm/deal-desk
npx uitkit add skill gtm/deal-review
npx uitkit add skill gtm/rfp-responder
npx uitkit add skill gtm/commercial-forecaster
npx uitkit add skill gtm/qbr-builder
npx uitkit add skill gtm/channel-economics
npx uitkit add skill gtm/champion-builder
npx uitkit add skill gtm/mutual-success-plan

# Befehls-Stubs in .claude/commands/ kopieren
npx uitkit add skill gtm/deal-review --output ae-workspace/.claude/commands/deal-review.md
npx uitkit add skill gtm/rfp-responder --output ae-workspace/.claude/commands/proposal-draft.md
npx uitkit add skill gtm/qbr-builder --output ae-workspace/.claude/commands/qbr-prep.md
npx uitkit add skill gtm/commercial-forecaster --output ae-workspace/.claude/commands/forecast-update.md
npx uitkit add skill gtm/mutual-success-plan --output ae-workspace/.claude/commands/close-plan.md
```

## CLAUDE.md-Vorlage

```markdown
# AE Workspace — Claude Code Anweisungen

## Was dies ist

Dies ist das Arbeitsverzeichnis für einen Account Executive, der eine quota-tragende Pipeline managt.
Deals werden in deals/ verfolgt, Vorlagen befinden sich in templates/ und Wettbewerbsinformationen in competitive/.
Alle MEDDPICC-Bewertungen, Forecasting, RFP-Entwürfe und QBR-Vorbereitungen erfolgen über Claude Code Skills.

## Stack

- Salesforce — CRM der Aufzeichnung (Opportunity, Kontakt, Aktivität)
- Gong — Gesprächsintelligenz; Transkripte exportiert nach deals/<account>/gong-transcripts/
- DocuSign — Vertragsweiterleitung; Envelope-IDs in deals/<account>/negotiation-log.md verfolgen
- Clari — Forecast-Rollup; wöchentliche Snapshots in metrics/forecast-log.md protokolliert
- Seismic — Content-Repository; Deck-Namen und Versionen in Angeboten referenzieren
- LinkedIn Sales Navigator — Executive Mapping; Kontakte in exec-map.md dokumentieren
- Slack — Deal-Room-Updates; relevante Threads in Deal-Ordner-Kontext einfügen

## Häufige Aufgaben und genaue Befehle

### Deal mit MEDDPICC bewerten
```
/deal-review

Deal: [Deal-Name]
Stage: [Phase]
ACV: $[Betrag]
Close date: [Datum]
Context: [Discovery-Notizen oder Gong-Transkript einfügen]
```

### Angebot oder RFP-Abschnitt entwerfen
```
/proposal-draft

RFP question: [wortgetreu einfügen]
Buyer priority: [spezifischer Schmerzpunkt, auf den diese Frage abzielt]
Our differentiator: [was wir haben, was Wettbewerber nicht haben]
Word limit: [falls angegeben]
```

### Gegenseitigen Aktionsplan erstellen
```
/close-plan

Deal: [Name], ACV: $[Betrag], Target close: [Datum]
Champion: [Name, Titel], Economic buyer: [Name, Titel]
Remaining steps: [was beide Seiten noch tun müssen vor der Unterschrift]
```

### Für Forecast-Call vorbereiten
```
/forecast-update

My pipeline: [Deal-Liste mit Phase, ACV, Abschlussdatum, Forecast-Kategorie einfügen]
Weekly quota: $[X] new ARR
Flag: deals at risk in Commit, Best Case deals ready to promote, deals to defer
```

### QBR vorbereiten
```
/qbr-prep

Quarter: Q[X] [JAHR]
Closed won: $[X] ARR, [N] deals
Pipeline entering Q[X+1]: $[Y] ARR across [N] deals
Top 3 wins: [Deal-Namen und warum sie abgeschlossen wurden]
Top risk: [Was ist die größte Lücke zur nächsten Quartal-Quota?]
```

### Executives vor Multi-Threading kartieren
```
/exec-alignment

Account: [Unternehmen]
Known contacts: [Liste mit Titeln und letzten Interaktionen]
Target: [Titel des Executives, den ich erreichen muss — CEO, CFO, CTO, etc.]
Ask: [Was ich von ihnen brauche — Executive Sponsor, Unterzeichner, technische Freigabe]
```

### Für ein Verhandlungsgespräch vorbereiten
```
/negotiation-prep

Deal: [Name], ACV: $[Listenpreis], Offered: $[aktuelles Angebot]
Concessions already made: [Liste]
Buyer's stated blockers: [Preis / Konditionen / Zeitplan / Beschaffungsprozess]
Walk-away condition: [die Grenze, die ich nicht überschreiten werde]
```

## Einzuhaltende Konventionen

- Jeder Deal-Ordner muss discovery-notes.md, exec-map.md und close-plan.md enthalten, bevor der Deal als Evaluation markiert wird
- MEDDPICC-Bewertungen befinden sich in deals/<account>/meddpicc-scores.md — nach jeder Deal-Review anhängen, niemals überschreiben
- Gong-Transkripte kommen in deals/<account>/gong-transcripts/ als reine .txt-Dateien, benannt YYYY-MM-DD-[thema].txt
- Forecast-Protokoll wird jeden Freitag in metrics/forecast-log.md aktualisiert — Commit-Gesamt, Best Case-Gesamt, tatsächlich abgeschlossen
- Verhandlungskonzessionen werden chronologisch in deals/<account>/negotiation-log.md protokolliert
- Alle Angebote und RFP-Antworten werden vor dem Versand in deals/<account>/rfp-responses/ gespeichert
- Wettbewerbs-Battlecards in competitive/ werden zu Beginn jedes Quartals geprüft und aktualisiert
```

## MCP-Server

```json
{
  "mcpServers": {
    "salesforce": {
      "command": "npx",
      "args": ["-y", "@salesforce/mcp-server"],
      "env": {
        "SF_LOGIN_URL": "https://login.salesforce.com",
        "SF_USERNAME": "your-sf-username@company.com",
        "SF_PASSWORD": "your-sf-password",
        "SF_TOKEN": "your-security-token"
      }
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@slack/mcp-server"],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-your-slack-bot-token",
        "SLACK_TEAM_ID": "T0XXXXXXXXX"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropic-ai/mcp-server-filesystem",
        "/Users/your-username/ae-workspace"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"meddpicc-scores.md\"; then echo \"[hook] MEDDPICC score updated at $(date +%Y-%m-%dT%H:%M) — check forecast-log.md for weekly roll-up\"; fi'"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"close-plan.md\"; then echo \"[hook] Writing close plan — confirm exec-map.md and discovery-notes.md are current before sharing with buyer\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'TODAY=$(date +%A); if [ \"$TODAY\" = \"Friday\" ]; then echo \"[reminder] Friday — update metrics/forecast-log.md with this week Commit vs. actual before EOD\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Zu installierende Skills

```bash
# Kern-AE-Deal-Management-Skills
npx uitkit add skill gtm/deal-desk
npx uitkit add skill gtm/deal-review
npx uitkit add skill gtm/rfp-responder
npx uitkit add skill gtm/commercial-forecaster
npx uitkit add skill gtm/qbr-builder
npx uitkit add skill gtm/channel-economics
npx uitkit add skill gtm/champion-builder
npx uitkit add skill gtm/mutual-success-plan

# Unterstützende GTM-Skills
npx uitkit add skill gtm/crm-hygiene
npx uitkit add skill gtm/revenue-operations
npx uitkit add skill gtm/expansion-playbook
npx uitkit add skill gtm/email-automation

# Alle GTM-Skills auf einmal installieren
npx uitkit add skills gtm
```

## Verwandte Ressourcen

- [Account Executive Leitfaden](../guides/for-account-executive.md)
- [AE Deal-Zyklus-Workflow](../workflows/ae-deal-cycle.md)
- [Deal-Screening-Workflow](../workflows/deal-screening.md)
