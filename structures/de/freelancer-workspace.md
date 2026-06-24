# Freelancer / Selbstständiger Berater Workspace — Projektstruktur

> Für Freelancer und selbstständige Berater, die Kundenprojekte, Angebotspipeline und administrative Aufgaben aus einem einzigen Workspace heraus steuern — mit Notion, FreshBooks, Cal.com, Loom, DocuSign und Stripe als Betriebsgrundlage.

## Stack

- **Notion** — Projektmanagement, Kundenwissensdatenbank, Lieferungsverfolgung, internes Wiki
- **FreshBooks** oder **Wave** — Rechnungsstellung, Ausgabenverfolgung, Steuervorauszahlungen, Zahlungsabgleich
- **Cal.com** oder **Calendly** — Kundenterminierung, Erstgesprächsbuchung, Pufferverwaltung
- **Loom** — Asynchrone Kundenupdates, Walkthrough-Aufzeichnungen, Übergabe von Lieferungen
- **DocuSign** — Vertragsabschluss, SOW-Unterzeichnung, NDA-Weiterleitung, Dokumentenverfolgung
- **Stripe** — Zahlungsabwicklung, wiederkehrende Retainer-Abrechnung, Auszahlungsverfolgung
- **Gmail** — Kundenkommunikation, Vertragsübermittlung, Rechnungsnachverfolgung, Neukundenakquise
- **Claude Code** — Angebotsentwürfe, SOW-Erstellung, Mahnmails, Statusberichte, Outreach-Sequenzen

## Verzeichnisstruktur

```
freelancer-workspace/
├── .claude/
│   ├── CLAUDE.md                            # Workspace-Anweisungen (Vorlage unten einfügen)
│   ├── settings.json                        # MCP-Server, Hooks, Berechtigungen
│   └── commands/
│       ├── proposal-draft.md                # /proposal-draft — vollständiges Angebot aus Kundenbrief
│       ├── scope-of-work.md                 # /scope-of-work — SOW mit Lieferungen, Zeitplan, Zahlung
│       ├── invoice-chase.md                 # /invoice-chase — Mahnsequenz für überfällige Rechnungen
│       ├── status-report.md                 # /status-report — wöchentlicher oder meilensteinbezogener Kundenbericht
│       ├── client-onboard.md                # /client-onboard — Onboarding-Checkliste + Willkommenskommunikation
│       ├── new-business.md                  # /new-business — Kaltakquise oder Warm-Follow-up-Sequenz
│       └── weekly-wrap.md                   # /weekly-wrap — persönliche Wochenrückschau + Plan für die nächste Woche
├── clients/
│   ├── _template/                           # Diesen Ordner kopieren, wenn ein neuer Kunde gewonnen wird
│   │   ├── brief.md                         # Erster Kundenbrief — Ziele, Zeitplan, Budget, Ansprechpartner
│   │   ├── contract.md                      # Vertragszusammenfassung — wesentliche Bedingungen, Zahlungsplan, Kündigung
│   │   ├── sow.md                           # Leistungsbeschreibung — Lieferungen, Meilensteine, Abnahmekriterien
│   │   ├── onboarding-checklist.md          # Zugänge erteilt, Tools eingerichtet, Kickoff abgehalten, Assets erhalten
│   │   ├── status-log.md                    # Laufendes Protokoll der gesendeten Wochen-/Meilensteinberichte
│   │   ├── comms-log.md                     # E-Mail-Threads, Anrufe, Entscheidungen — nur relevante Austausche
│   │   ├── deliverables/                    # Alle an diesen Kunden gelieferten Arbeitsergebnisse
│   │   │   └── .gitkeep
│   │   └── invoices/                        # Rechnungsunterlagen für diesen Kunden
│   │       └── .gitkeep
│   ├── acme-redesign/                       # Aktiver Kunde: Acme Corp Website-Redesign
│   │   ├── brief.md
│   │   ├── contract.md
│   │   ├── sow.md
│   │   ├── onboarding-checklist.md
│   │   ├── status-log.md
│   │   ├── comms-log.md
│   │   ├── deliverables/
│   │   │   ├── 2026-04-15-wireframes-v1.pdf
│   │   │   ├── 2026-05-01-wireframes-v2-revised.pdf
│   │   │   └── 2026-06-01-final-handoff.zip
│   │   └── invoices/
│   │       ├── inv-001-deposit.md           # Rechnungseintrag: Nummer, Betrag, Sendedatum, Zahlungsdatum
│   │       ├── inv-002-milestone-1.md
│   │       └── inv-003-final.md
│   ├── beta-corp-strategy/                  # Aktiver Kunde: Beta Corp fraktionaler Strategieauftrag
│   │   ├── brief.md
│   │   ├── contract.md
│   │   ├── sow.md
│   │   ├── status-log.md
│   │   ├── comms-log.md
│   │   ├── deliverables/
│   │   │   ├── 2026-05-10-market-analysis.md
│   │   │   └── 2026-06-01-go-to-market-plan.md
│   │   └── invoices/
│   │       ├── inv-001-may-retainer.md
│   │       └── inv-002-jun-retainer.md
│   └── gamma-startup/                       # Abgeschlossener Kunde — Archiv zur Referenz
│       ├── brief.md
│       ├── contract.md
│       ├── sow.md
│       ├── status-log.md
│       ├── comms-log.md
│       ├── deliverables/
│       │   └── 2026-03-20-final-report.md
│       └── invoices/
│           ├── inv-001-deposit.md
│           └── inv-002-completion.md
├── proposals/
│   ├── active/                              # Gesendete Angebote, noch nicht unterzeichnet oder abgelehnt
│   │   ├── 2026-05-28-delta-inc-brand-refresh.md
│   │   └── 2026-06-01-epsilon-co-growth-strategy.md
│   ├── won/                                 # Unterzeichnete Angebote — hierher verschieben, wenn Vertrag abgeschlossen
│   │   ├── 2026-04-01-acme-redesign.md
│   │   └── 2026-03-10-beta-corp-strategy.md
│   └── lost/                               # Abgelehnte oder nicht beantwortete Angebote — für Musteranalysen aufbewahren
│       ├── 2026-02-14-zeta-app-proposal.md
│       └── 2026-01-20-eta-audit-proposal.md
├── templates/
│   ├── proposal-template.md                 # Wiederverwendbares Angebot: Problemstellung, Ansatz, Lieferungen, Preisgestaltung
│   ├── sow-template.md                      # SOW: Leistungsumfang, Zeitplan, Meilensteine, Zahlungsplan, Ausschlüsse
│   ├── contract-template.md                 # Rahmendienstleistungsvertrag: IP, Vertraulichkeit, Zahlung, Kündigung
│   ├── invoice-template.md                  # Rechnungsformat: Positionen, Zahlungsbedingungen, Bank-/Stripe-Details
│   ├── nda-template.md                      # Gegenseitige NDA für Gespräche vor Angebotserstellung
│   ├── onboarding-welcome-email.md          # Erste E-Mail an neuen Kunden nach Vertragsunterzeichnung
│   └── status-report-template.md           # Wochenstatus: diese Woche erledigt, nächste Woche, Blocker, ausstehende Entscheidungen
├── business-dev/
│   ├── prospect-list.md                     # Firmenname, Kontakt, Quelle, Status, letzter Kontakt, nächste Aktion
│   ├── outreach-log.md                      # Datum, Interessent, Nachrichtentyp, Antwort, Follow-up-Datum
│   ├── referral-partners.md                 # Personen, die Aufträge vermitteln — Beziehungsnotizen, letztes Dankeschön
│   └── positioning-notes.md                 # ICP-Definition, Nische, wesentliche Alleinstellungsmerkmale, Belege
├── finance/
│   ├── income-tracker.md                    # Monatlich: fakturiert, eingegangen, ausstehend — je Kunde
│   ├── expense-log.md                       # Datum, Anbieter, Kategorie, Betrag — für steuerliche Abzugsverfolgung
│   ├── tax-estimate.md                      # Quartalsweise Steuervorauszahlungsberechnung und Zahlungsprotokoll
│   ├── rate-card.md                         # Aktuelle Sätze: stündlich, projektbasiert, Retainer — mit Aktualisierungsdatum
│   └── cash-flow-forecast.md               # 90-Tage-Vorschau: erwartete Einnahmen, bekannte Ausgaben, Puffer
└── ops/
    ├── onboarding-sop.md                    # Schritt-für-Schritt-Prozess vom unterzeichneten Vertrag bis zum Kickoff
    ├── tools-and-access.md                  # Alle verwendeten Tools, Login, Plantarif, monatliche Kosten, Verlängerungsdatum
    ├── subcontractors.md                    # Vertrauenswürdige Subunternehmer: Name, Fachgebiet, Satz, Verfügbarkeit, bisherige Arbeit
    └── working-hours-policy.md             # Reaktions-SLAs, Abwesenheitsregelung, Notfallkontaktregeln
```

## Wichtige Dateien erklärt

| Pfad | Zweck |
|---|---|
| `.claude/commands/proposal-draft.md` | Slash-Befehl, der einen Kundenbrief entgegennimmt und ein vollständiges Angebot erstellt — Problemstellung, vorgeschlagener Ansatz, Lieferungsliste, Zeitplan und Preisoptionen |
| `.claude/commands/scope-of-work.md` | Slash-Befehl, der ein vereinbartes Angebot in eine rechtlich strukturierte Leistungsbeschreibung mit Meilensteinen, Abnahmekriterien, Zahlungsauslösern und expliziten Ausschlüssen umwandelt |
| `.claude/commands/invoice-chase.md` | Slash-Befehl, der eine gestufte Mahnsequenz (freundliche Erinnerung, formelle Anfrage, Eskalation) für überfällige Rechnungen erstellt — benötigt Rechnungsnummer, Betrag und Tage überfällig |
| `.claude/commands/status-report.md` | Slash-Befehl, der aus einer Liste erledigter Aufgaben, Blockern und nächsten Schritten einen prägnanten Kundenstatusbericht erstellt — formatiert für E-Mail oder Notion |
| `.claude/commands/client-onboard.md` | Slash-Befehl, der eine Onboarding-Checkliste erstellt und die Willkommens-E-Mail, Kickoff-Agenda und Zugriffsanforderungsliste für einen neu gewonnenen Kunden entwirft |
| `clients/_template/` | Leere Ordnerstruktur zum Kopieren bei Beginn eines neuen Kundenprojekts — gewährleistet konsistente Dokumentation über alle Kundenprojekte hinweg |
| `finance/income-tracker.md` | Monatliches Hauptbuch für fakturierte vs. eingegangene Beträge je Kunde — die zentrale Datenquelle für Umsatz und ausstehende Forderungen |
| `ops/onboarding-sop.md` | Wiederholbarer Schritt-für-Schritt-Prozess vom unterzeichneten Vertrag bis zum Kickoff-Gespräch — stellt sicher, dass kein Zugriffsschritt, kein Anmeldedaten- oder Kommunikationsschritt vergessen wird |

## Schnelles Aufsetzen

```bash
# Workspace-Stammverzeichnis anlegen
mkdir -p freelancer-workspace

# .claude-Struktur anlegen
mkdir -p freelancer-workspace/.claude/commands

# Kundenvorlage anlegen
mkdir -p freelancer-workspace/clients/_template/deliverables
mkdir -p freelancer-workspace/clients/_template/invoices
touch freelancer-workspace/clients/_template/deliverables/.gitkeep
touch freelancer-workspace/clients/_template/invoices/.gitkeep
touch freelancer-workspace/clients/_template/brief.md
touch freelancer-workspace/clients/_template/contract.md
touch freelancer-workspace/clients/_template/sow.md
touch freelancer-workspace/clients/_template/onboarding-checklist.md
touch freelancer-workspace/clients/_template/status-log.md
touch freelancer-workspace/clients/_template/comms-log.md

# Aktive Kundenverzeichnisse anlegen
mkdir -p freelancer-workspace/clients/acme-redesign/deliverables
mkdir -p freelancer-workspace/clients/acme-redesign/invoices
mkdir -p freelancer-workspace/clients/beta-corp-strategy/deliverables
mkdir -p freelancer-workspace/clients/beta-corp-strategy/invoices

# Angebotsverzeichnisse anlegen
mkdir -p freelancer-workspace/proposals/active
mkdir -p freelancer-workspace/proposals/won
mkdir -p freelancer-workspace/proposals/lost

# Vorlagenverzeichnis anlegen
mkdir -p freelancer-workspace/templates

# Verzeichnisse für business-dev, finance und ops anlegen
mkdir -p freelancer-workspace/business-dev
mkdir -p freelancer-workspace/finance
mkdir -p freelancer-workspace/ops

# Wichtige Dateien erstellen
touch freelancer-workspace/finance/income-tracker.md
touch freelancer-workspace/finance/expense-log.md
touch freelancer-workspace/finance/tax-estimate.md
touch freelancer-workspace/finance/rate-card.md
touch freelancer-workspace/finance/cash-flow-forecast.md
touch freelancer-workspace/business-dev/prospect-list.md
touch freelancer-workspace/business-dev/outreach-log.md
touch freelancer-workspace/ops/onboarding-sop.md
touch freelancer-workspace/ops/tools-and-access.md

# Freelancer-/Kleinunternehmen-Skills installieren
npx uitkit add skill small-business/freelancer-proposal
npx uitkit add skill small-business/scope-of-work
npx uitkit add skill small-business/invoice-chaser
npx uitkit add skill small-business/client-status-report
npx uitkit add skill small-business/cold-outreach

# Befehlsstubs in .claude/commands/ kopieren
npx uitkit add skill small-business/freelancer-proposal --output freelancer-workspace/.claude/commands/proposal-draft.md
npx uitkit add skill small-business/scope-of-work --output freelancer-workspace/.claude/commands/scope-of-work.md
npx uitkit add skill small-business/invoice-chaser --output freelancer-workspace/.claude/commands/invoice-chase.md
npx uitkit add skill small-business/client-status-report --output freelancer-workspace/.claude/commands/status-report.md
npx uitkit add skill small-business/cold-outreach --output freelancer-workspace/.claude/commands/new-business.md
```

## CLAUDE.md-Vorlage

```markdown
# Freelancer Workspace — Claude Code Anweisungen

## Was das hier ist

Dies ist das Arbeitsverzeichnis eines freiberuflichen Beraters, der Kundenprojekte, Angebote,
Rechnungsstellung und Geschäftsentwicklung verwaltet. Kundenprojekte liegen unter clients/, offene Angebote
unter proposals/active/, wiederverwendbare Dokumente unter templates/ und Finanzunterlagen unter finance/.
Alle Angebotsentwürfe, SOW-Erstellungen, Rechnungsnachverfolgung, Statusberichte und Outreach laufen
über Claude Code Slash-Befehle.

## Stack

- Notion — Projektverfolgung je Kunde; Notion-Seiten-URL in clients/<name>/brief.md verlinken
- FreshBooks / Wave — Rechnungsstellung und Buchhaltung; Rechnungsnummern und Zahlungsdaten in clients/<name>/invoices/ protokollieren
- Cal.com / Calendly — Terminierung; Buchungslink in onboarding-welcome-email.md und Angeboten einfügen
- Loom — Asynchrone Updates; Loom-URLs in Statusberichte an Kunden einbetten
- DocuSign — Vertrags- und SOW-Unterzeichnung; Umschlag-IDs in clients/<name>/contract.md protokollieren
- Stripe — Zahlungsabwicklung; Stripe-Zahlungs-IDs in clients/<name>/invoices/-Dateien protokollieren
- Gmail — Alle Kundenkommunikation; relevante Entscheidungen und Vereinbarungen in clients/<name>/comms-log.md protokollieren

## Häufige Aufgaben und exakte Befehle

### Angebot aus Kundenbrief erstellen
```
/proposal-draft

Client: [Firmenname]
Contact: [Name, Titel, E-Mail]
Brief: [Brief einfügen oder Anfrage ausführlich beschreiben]
Budget range: [$X–$Y oder "TBD"]
Timeline: [angestrebtes Startdatum und Dauer]
My angle: [was ich mitbringe, das mich von einem Generalisten unterscheidet]
```

### Leistungsbeschreibung aus unterzeichnetem Angebot erstellen
```
/scope-of-work

Client: [Firmenname]
Project: [Projektname]
Agreed deliverables: [exakt auflisten, was vereinbart wurde]
Timeline: [Startdatum, Meilensteindaten, Enddatum]
Payment schedule: [Anzahlung %, Meilenstein %, Abschluss %]
Exclusions: [alles, was explizit außerhalb des Umfangs liegt]
```

### Rechnungsmahnung verfassen
```
/invoice-chase

Client: [Firmenname]
Invoice number: [INV-XXX]
Amount: [$X]
Due date: [Datum]
Days overdue: [N]
Prior contact: [Wurde bereits nachgefasst? Wann?]
Tone: [freundlich / bestimmt / letzte Mahnung]
```

### Kundenstatusbericht senden
```
/status-report

Client: [Firmenname]
Period: [Woche vom / Meilenstein: X]
Completed this period: [Stichpunktliste]
In progress: [was gerade läuft]
Blockers: [was ich von ihnen benötige]
Next period plan: [was als nächstes passiert]
Format: [E-Mail / Notion-Update / Loom-Skript]
```

### Neuen Kunden onboarden
```
/client-onboard

Client: [Firmenname]
Contact: [Name, Titel]
Project: [Projektname]
Start date: [Datum]
Tools to grant access: [Notion, Slack, Figma, Drive — zutreffendes auflisten]
First deliverable due: [Datum und was es ist]
```

### Outreach für neuen Interessenten verfassen
```
/new-business

Prospect: [Firmenname und Beschreibung]
Contact: [Name, Titel]
Source: [wie ich sie kenne oder gefunden habe]
Angle: [warum ich jetzt Kontakt aufnehme — Auslöser, Empfehlung, Inhalt]
Ask: [Erstgespräch, Antwort, Intro — auf eine Sache beschränken]
Tone: [warm / kalt / Follow-up auf vorherigen Kontakt]
```

### Wochenrückschau durchführen
```
/weekly-wrap

Week of: [Datum]
Client work done: [je Kunde auflisten]
Proposals sent: [Liste]
Invoices sent / collected: [Liste]
Business dev actions: [gesendeter Outreach, geführte Gespräche]
Next week priorities: [Top 3]
Blockers or concerns: [alles, was einen beschäftigt]
```

## Einzuhaltende Konventionen

- Jeder neue Kunde muss vor dem Kickoff-Gespräch einen Ordner unter clients/ haben — _template/ kopieren
- SOW-Dateien in clients/<name>/sow.md sind die verbindliche Vertragsquelle — Leistungsumfang nie aus dem Gedächtnis beschreiben
- Rechnungseinträge in clients/<name>/invoices/ müssen enthalten: Rechnungsnummer, Betrag, Sendedatum, Zahlungsdatum (oder "ausstehend")
- Angebote gehen beim Versand nach proposals/active/ — innerhalb von 48 Stunden nach Ergebnis zu won/ oder lost/ verschieben
- Alle Outreach-Versuche werden am selben Tag des Versands in business-dev/outreach-log.md protokolliert
- finance/income-tracker.md wird am letzten Freitag eines jeden Monats aktualisiert — keine Ausnahmen
- finance/expense-log.md wird wöchentlich aktualisiert — alles über 20 € für steuerliche Zwecke erfassen
- Stundensatz in finance/rate-card.md zeigt immer das letzte Aktualisierungsdatum — vierteljährlich überprüfen
```

## MCP-Server

```json
{
  "mcpServers": {
    "google-drive": {
      "command": "npx",
      "args": ["-y", "@googleapis/mcp-server-google-drive"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-google-oauth-client-id",
        "GOOGLE_CLIENT_SECRET": "your-google-oauth-client-secret",
        "GOOGLE_REFRESH_TOKEN": "your-google-refresh-token"
      }
    },
    "gmail": {
      "command": "npx",
      "args": ["-y", "@googleapis/mcp-server-gmail"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-google-oauth-client-id",
        "GOOGLE_CLIENT_SECRET": "your-google-oauth-client-secret",
        "GOOGLE_REFRESH_TOKEN": "your-google-refresh-token"
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
        "/Users/your-username/freelancer-workspace"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"proposals/active/\"; then echo \"[hook] Proposal saved to active/ — log it in business-dev/outreach-log.md with the date sent and prospect contact\"; fi'"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"clients/.*/sow.md\"; then echo \"[hook] Writing SOW — confirm client folder has brief.md and contract.md before finalising scope\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'TODAY=$(date +%A); if [ \"$TODAY\" = \"Friday\" ]; then echo \"[reminder] Friday — run /weekly-wrap and check finance/income-tracker.md for any outstanding invoices\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Skills installieren

```bash
# Kern-Freelancer-Skills
npx uitkit add skill small-business/freelancer-proposal
npx uitkit add skill small-business/scope-of-work
npx uitkit add skill small-business/invoice-chaser
npx uitkit add skill small-business/client-status-report
npx uitkit add skill small-business/cold-outreach

# Ergänzende Produktivitäts-Skills
npx uitkit add skill productivity/stakeholder-comms
npx uitkit add skill productivity/process-mapper
npx uitkit add skill productivity/vendor-evaluator

# Alle small-business-Skills auf einmal installieren
npx uitkit add skills small-business
```

## Verwandte Ressourcen

- [Freelancer-Leitfaden](../guides/for-freelancer.md)
- [Kunden-Onboarding-Workflow](../workflows/client-onboarding.md)
- [Angebot-zu-Vertrag-Workflow](../workflows/proposal-to-contract.md)
