# Customer Success Manager Workspace — Projektstruktur

> Ein Claude Code Workspace für CSMs, die ein Kundenportfolio verwalten: Onboarding, Gesundheitsüberwachung, QBR-Durchführung, Identifikation von Expansionsmöglichkeiten, Churn-Prävention und Renewal-Tracking — alles gesteuert durch Slash-Befehle und kontobezogenen Kontext.

## Stack

- **Gainsight** (CS-Plattform) oder **ChurnZero** — Health Scores, Success Plans, automatisierte Playbooks
- **Salesforce** oder **HubSpot** — CRM, Opportunities- und Renewal-Pipeline, Kontohierarchie
- **Zendesk** oder **Intercom** — Support-Ticketvolumen und Stimmungssignale
- **Zoom** — Kundengespräche; Aufzeichnungen und Transkripte werden in Kontonotizen übernommen
- **Slack** — interne CS-Team-Koordination und Slack Connect-Kanäle für Kunden
- **Notion** — CS-Playbooks, Vorlagen für gemeinsame Aktionspläne, Onboarding-Runbooks

## Verzeichnisstruktur

```
cs-workspace/
├── .claude/
│   ├── CLAUDE.md                          # Workspace-Anweisungen für Claude Code
│   ├── settings.json                      # MCP-Server, Hooks, Berechtigungen
│   └── commands/
│       ├── onboarding-plan.md             # /onboarding-plan <customer-name> — 30/60/90-Tage-Plan
│       ├── qbr-prep.md                    # /qbr-prep — erstellt QBR-Gliederung und Gesprächspunkte
│       ├── health-check.md                # /health-check — liest Gesundheitsdaten, zeigt gefährdete Konten
│       ├── expansion-brief.md             # /expansion-brief — identifiziert Upsell-Signale pro Konto
│       ├── churn-risk.md                  # /churn-risk — Churn-Signal-Analyse mit Response-Playbook
│       ├── renewal-prep.md                # /renewal-prep — Renewal-Bereitschaftsdokument mit kommerziellem Kontext
│       └── nps-follow-up.md              # /nps-follow-up — entwirft Follow-up-E-Mails nach NPS-Score-Band
├── customers/
│   ├── _template/                         # diesen Ordner beim Onboarding eines neuen Kontos kopieren
│   │   ├── health-data.md                 # Health-Score-Protokoll: Signale, Scores, Stufe (Green/Yellow/Red)
│   │   ├── meeting-notes/
│   │   │   └── YYYY-MM-DD-kickoff.md      # eine Datei pro Meeting, benannt nach Datum und Typ
│   │   ├── success-plan.md                # gemeinsamer Erfolgsplan: Ziele, Meilensteine, Verantwortliche, Termine
│   │   └── renewal-tracker.md             # Renewal-Datum, ARR, Expansionshistorie, Renewal-Bereitschaft
│   ├── acme-corp/
│   │   ├── health-data.md                 # aktuelle Gesundheitsstufe: Yellow; zuletzt aktualisiert: 2026-05-28
│   │   ├── meeting-notes/
│   │   │   ├── 2026-01-15-kickoff.md
│   │   │   ├── 2026-03-10-qbr-q1.md
│   │   │   └── 2026-05-20-expansion-call.md
│   │   ├── success-plan.md                # vereinbarte Ziele: 80 % Seat-Aktivierung bis Q2, 3 Integrationen live
│   │   └── renewal-tracker.md             # Renewal am 2026-09-01, 48K$ ARR, 1 offene Expansionsmöglichkeit
│   ├── brightpath-inc/
│   │   ├── health-data.md                 # aktuelle Gesundheitsstufe: Red; Churn-Risiko: hoch
│   │   ├── meeting-notes/
│   │   │   ├── 2026-02-03-kickoff.md
│   │   │   └── 2026-04-18-save-call.md
│   │   ├── success-plan.md
│   │   └── renewal-tracker.md             # Renewal am 2026-07-15, 12K$ ARR, gefährdet
│   └── novex-solutions/
│       ├── health-data.md                 # aktuelle Gesundheitsstufe: Green; Expansionskandidat
│       ├── meeting-notes/
│       │   ├── 2026-01-22-kickoff.md
│       │   ├── 2026-04-05-qbr-q1.md
│       │   └── 2026-05-30-expansion-brief.md
│       ├── success-plan.md
│       └── renewal-tracker.md             # Renewal am 2026-12-01, 72K$ ARR, Expansion in Bearbeitung
├── playbooks/
│   ├── onboarding.md                      # vollständiger 30/60/90-Tage-Onboarding-Runbook mit Eskalationsauslösern
│   ├── expansion.md                       # Upsell-Vorgehen: Signale, Timing, Gesprächsleitfäden, Einwandbehandlung
│   ├── churn-save.md                      # Retention-Playbook nach Churn-Signal-Stufe und verbleibenden Tagen bis Renewal
│   └── qbr-delivery.md                   # QBR-Moderationsleitfaden: Agenda, Regeln, Follow-up-Kadenz
├── templates/
│   ├── success-plan-template.md           # gemeinsamer Erfolgsplan: Ziele, KPIs, Meilensteine, Verantwortliche
│   ├── mutual-action-plan.md              # MAP für Onboarding: Aufgaben von Kunde und CSM nebeneinander
│   ├── ebr-deck-outline.md               # Executive Business Review Deck-Struktur (6 Folien)
│   └── renewal-proposal.md               # Renewal-Angebot: Wertübersicht, Preisgestaltung, nächste Schritte
└── metrics/
    ├── book-health-dashboard.md           # alle Konten: Name, ARR, Stufe, Renewal-Datum, letzter Kontakt
    └── renewal-pipeline.md               # Renewals in den nächsten 90/60/30 Tagen mit Bereitschafts-Score
```

## Wichtige Dateien erklärt

| Pfad | Zweck |
|---|---|
| `.claude/commands/onboarding-plan.md` | Slash-Befehl, der `$ARGUMENTS` als Kundennamen übernimmt, den Kontoordner liest und einen maßgeschneiderten 30/60/90-Tage-Onboarding-Plan mit spezifischen Meilensteinen erstellt |
| `.claude/commands/health-check.md` | Liest alle `customers/*/health-data.md`-Dateien und zeigt Konten nach Stufe an — gibt eine priorisierte Aktionsliste mit empfohlenen nächsten Schritten pro gefährdetem Konto aus |
| `.claude/commands/churn-risk.md` | Verknüpft Gesundheitsdaten, Tage seit dem letzten Kontaktpunkt, Renewal-Datum und Support-Ticket-Signale, um einen Churn-Risiko-Brief mit Response-Playbook zu erstellen |
| `.claude/commands/renewal-prep.md` | Liest `renewal-tracker.md`, `success-plan.md` und Meeting-Notizen des Zielkontos, um ein Renewal-Bereitschaftsdokument mit kommerziellem Kontext und offenen Risiken zu erstellen |
| `customers/_template/` | Kanonische Ordnerstruktur, die beim Onboarding eines neuen Kontos kopiert wird — gewährleistet Konsistenz im gesamten Portfolio |
| `metrics/book-health-dashboard.md` | Einheitliche Übersicht aller Konten mit ARR, Gesundheitsstufe, Renewal-Datum und letztem CSM-Kontaktpunkt — die verbindliche Quelle für die wöchentliche CS-Team-Review |
| `playbooks/churn-save.md` | Retention-Playbook segmentiert nach Signal-Typ (Nutzungsrückgang, Wechsel des Executive Sponsors, überfällige Rechnung) und verbleibenden Tagen bis Renewal, mit spezifischen Gesprächsleitfäden und Eskalationspfaden |
| `templates/ebr-deck-outline.md` | Executive Business Review Deck-Struktur: Geschäftszusammenfassung, gelieferter Wert, Metriken vs. Ziele, Roadmap, offene Punkte, nächste Schritte — bereit zum kontobezogenen Befüllen |

## Schnell-Scaffold

```bash
# Workspace-Root erstellen
mkdir -p cs-workspace/.claude/commands

# Kundenkonto-Vorlage erstellen
mkdir -p cs-workspace/customers/_template/meeting-notes

# Verzeichnisse für Playbooks, Templates und Metriken erstellen
mkdir -p cs-workspace/playbooks
mkdir -p cs-workspace/templates
mkdir -p cs-workspace/metrics

# Slash-Befehlsdateien anlegen
touch cs-workspace/.claude/commands/onboarding-plan.md
touch cs-workspace/.claude/commands/qbr-prep.md
touch cs-workspace/.claude/commands/health-check.md
touch cs-workspace/.claude/commands/expansion-brief.md
touch cs-workspace/.claude/commands/churn-risk.md
touch cs-workspace/.claude/commands/renewal-prep.md
touch cs-workspace/.claude/commands/nps-follow-up.md

# Kunden-Template-Dateien anlegen
touch cs-workspace/customers/_template/health-data.md
touch cs-workspace/customers/_template/success-plan.md
touch cs-workspace/customers/_template/renewal-tracker.md

# Metrik-Dateien anlegen
touch cs-workspace/metrics/book-health-dashboard.md
touch cs-workspace/metrics/renewal-pipeline.md

# Playbook-Dateien anlegen
touch cs-workspace/playbooks/onboarding.md
touch cs-workspace/playbooks/expansion.md
touch cs-workspace/playbooks/churn-save.md
touch cs-workspace/playbooks/qbr-delivery.md

# Template-Dateien anlegen
touch cs-workspace/templates/success-plan-template.md
touch cs-workspace/templates/mutual-action-plan.md
touch cs-workspace/templates/ebr-deck-outline.md
touch cs-workspace/templates/renewal-proposal.md

# CS-Skills installieren
npx uitkit add skill gtm/customer-success
npx uitkit add skill gtm/mutual-success-plan
npx uitkit add skill gtm/qbr-builder
npx uitkit add skill gtm/health-score-analyzer
npx uitkit add skill gtm/expansion-playbook
npx uitkit add skill gtm/churn-prevention

# Beispielkonto aus der Vorlage erstellen
cp -r cs-workspace/customers/_template cs-workspace/customers/acme-corp
```

## CLAUDE.md-Vorlage

```markdown
# CS Workspace — Claude Code Anweisungen

## Was dieser Workspace ist

Dies ist ein Customer Success Manager Workspace. Er enthält Kontodaten, Gesundheitssignale,
Playbooks und Vorlagen für die Verwaltung eines Kundenportfolios. Claude Code agiert hier als
CS-Analyst und Texter — liest den Kontokontext und erstellt maßgeschneiderte Deliverables.

Alle Kontodaten sind lokal und vertraulich. Spezifische Kontodaten dürfen niemals in Ausgaben
enthalten sein, die diesen Workspace verlassen.

## Stack

- CS-Plattform: Gainsight (oder ChurnZero) — Health Scores, Success Plans, automatisierte Prozesse
- CRM: HubSpot (oder Salesforce) — Renewal-Pipeline, Kontohierarchie, ARR
- Support: Zendesk — Ticketvolumen und Stimmungssignale in health-data.md-Dateien
- Calls: Zoom — Meeting-Transkripte gespeichert in customers/<account>/meeting-notes/
- Zusammenarbeit: Slack, Notion

## Häufige Aufgaben und exakte Befehle

Neuen Kunden onboarden:
  /onboarding-plan <customer-name>
  → Liest customers/<customer-name>/ und erstellt einen 30/60/90-Tage-Plan

Gesundheitscheck über das gesamte Portfolio:
  /health-check
  → Liest alle customers/*/health-data.md und gibt eine priorisierte Aktionsliste nach Stufe aus

Auf ein QBR vorbereiten:
  /qbr-prep
  → Fragt nach Kundenname, liest den Kontoordner, erstellt QBR-Agenda und Gesprächspunkte

Expansionsmöglichkeiten identifizieren:
  /expansion-brief
  → Liest Gesundheitsdaten und Meeting-Notizen; zeigt Expansionssignale pro Konto

Churn-Risiko bewerten:
  /churn-risk
  → Verknüpft Gesundheitsstufe, Renewal-Datum, letzten Kontaktpunkt und Support-Signale

Auf ein Renewal vorbereiten:
  /renewal-prep
  → Liest renewal-tracker.md und success-plan.md; erstellt Renewal-Bereitschaftsdokument

NPS-Antworten nachfassen:
  /nps-follow-up
  → Fragt nach NPS-Score und Verbatim; entwirft Follow-up-E-Mail nach Score-Band

## Workspace-Konventionen

- Ein Ordner pro Konto unter customers/ — immer aus _template/ erstellt
- Gesundheitsdateien verwenden drei Stufen: Green / Yellow / Red — nach jedem Gespräch aktualisieren
- Meeting-Notizen werden benannt als YYYY-MM-DD-<type>.md (kickoff, qbr, expansion-call, save-call)
- Der Renewal-Tracker wird nach jedem kommerziellen Gespräch aktualisiert
- book-health-dashboard.md in metrics/ ist die verbindliche Quelle für die wöchentliche Team-Review

## Konto-Gesundheitsstufen

Green (Score 7-10): quartalsweiser Kontakt, nach Expansionssignalen suchen
Yellow (Score 4-6): monatliches Check-in, Blocker identifizieren und beseitigen
Red (Score 1-3): wöchentliches Engagement, nach 5 Tagen ohne Antwort an CS-Lead eskalieren

## Verbote

- Keine Inhalte erstellen, die dokumentierten Kundenerfolgs-Kriterien widersprechen
- Keine Expansion vorschlagen, bevor ein Kunde die Gesundheitsstufe Green erreicht hat
- Keine generischen QBR-Vorlagen verwenden — immer zuerst den Kontoordner lesen
- Daten aus customers/ dürfen nicht in ein Remote-Git-Repository committed werden
```

## MCP-Server

```json
{
  "mcpServers": {
    "hubspot": {
      "command": "npx",
      "args": ["-y", "@hubspot/mcp-server"],
      "env": {
        "HUBSPOT_ACCESS_TOKEN": "${HUBSPOT_ACCESS_TOKEN}"
      }
    },
    "salesforce": {
      "command": "npx",
      "args": ["-y", "@salesforce/mcp-server"],
      "env": {
        "SF_USERNAME": "${SF_USERNAME}",
        "SF_PASSWORD": "${SF_PASSWORD}",
        "SF_SECURITY_TOKEN": "${SF_SECURITY_TOKEN}",
        "SF_LOGIN_URL": "https://login.salesforce.com"
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
        "/Users/$USER/cs-workspace/customers",
        "/Users/$USER/cs-workspace/metrics"
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
            "command": "grep -q 'health tier:' \"$CLAUDE_TOOL_RESULT_FILE\" && echo '[health-check] Health tier updated — consider refreshing book-health-dashboard.md' || true"
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
            "command": "if echo \"$CLAUDE_TOOL_INPUT\" | grep -q 'customers/'; then echo '[cs-workspace] Writing to account folder — confirm account name matches directory'; fi"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "echo '[cs-workspace] Session ended. Reminder: update book-health-dashboard.md if any health tiers changed this session.'"
          }
        ]
      }
    ]
  }
}
```

## Zu installierende Skills

```bash
npx uitkit add skill gtm/customer-success
npx uitkit add skill gtm/mutual-success-plan
npx uitkit add skill gtm/qbr-builder
npx uitkit add skill gtm/health-score-analyzer
npx uitkit add skill gtm/expansion-playbook
npx uitkit add skill gtm/churn-prevention
```

## Verwandte Ressourcen

- [Customer Success Guide](../guides/for-customer-success.md)
- [QBR-Durchführungs-Workflow](../workflows/qbr-delivery.md)
