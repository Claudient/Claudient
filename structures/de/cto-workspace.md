# CTO / VP Engineering Workspace — Projektstruktur

> Für einen CTO oder VP Engineering, der eine Entwicklungsorganisation leitet: Architekturentscheidungen, technische Roadmap, Einstellungen, Team-Gesundheit, Incident-Reviews, Lieferantenbewertung und Board-Reporting — alles gesteuert aus einem einzigen Claude Code Workspace.

## Stack

- Linear — Issues, Projektverfolgung, quartalsweise Roadmap
- GitHub — Code, PRs, Engineering-Metriken via GitHub Insights
- Datadog — Observability, SLOs, Incident-Monitoring, Dashboards
- PagerDuty — On-Call-Pläne, Incident-Benachrichtigungen, Postmortem-Auslöser
- Notion — Strategiedokumente, Team-Wikis, Entscheidungsprotokolle
- Lattice oder Leapsome — Performance-Reviews, 1:1-Notizen, Engagement-Umfragen
- Greenhouse — Stellenausschreibungen, Kandidaten-Pipelines, Interview-Scorecards
- Slack — Asynchrone Kommunikation, Incident-War-Rooms, Standups

## Verzeichnisbaum

```
cto-workspace/
├── .claude/
│   ├── CLAUDE.md                        # Workspace-Anweisungen für Claude Code
│   ├── settings.json                    # Berechtigungen, Hooks, MCP-Konfiguration
│   └── commands/
│       ├── arch-review.md               # Architektur-Review — Trade-off-Analyse, Risiken, ADR-Entwurf
│       ├── hiring-plan.md               # Stellenplan — Rollendefinition, Zeitplan, Budgetschätzung
│       ├── incident-review.md           # Postmortem-Vorlage — Zeitablauf, Grundursache, Maßnahmen
│       ├── team-health.md               # Team-Gesundheitsbild — Moral, Velocity, Fluktuationsrisiko
│       ├── vendor-eval.md               # Lieferantenbewertungsmatrix — Kriterienbewertung, Empfehlung
│       ├── eng-metrics.md               # Engineering-Metriken-Bericht — DORA, Cycle Time, Abdeckung
│       ├── board-update.md              # Board-Update — Tech-Gesundheit, Risiken, Roadmap-Fortschritt
│       └── build-vs-buy.md              # Build-vs-Buy-Analyse — Kosten, Risiko, Eigenentwicklung oder Zukauf
├── decisions/                           # Architecture Decision Records (ADRs)
│   ├── README.md                        # ADR-Index und Statuslegende
│   ├── adr-template.md                  # Kanonische ADR-Vorlage
│   ├── 0001-monorepo-vs-polyrepo.md     # Akzeptiert — Monorepo mit Turborepo
│   ├── 0002-service-mesh-selection.md   # Akzeptiert — Istio auf GKE
│   ├── 0003-event-streaming-platform.md # Akzeptiert — Kafka statt SQS wegen Reihenfolgegarantien
│   ├── 0004-auth-provider.md            # Vorgeschlagen — Auth0 vs. Clerk Vergleich
│   └── 0005-data-warehouse.md           # Entwurf — BigQuery vs. Snowflake
├── roadmap/
│   ├── q3-2025-tech-roadmap.md          # Quartals-Roadmap — Initiativen, Verantwortliche, Meilensteine
│   ├── q4-2025-tech-roadmap.md          # Entwurf für das nächste Quartal
│   ├── 2025-annual-tech-plan.md         # Jährliche Engineering-Strategie und Investitionsbereiche
│   ├── tech-vision-2026.md              # Vorausschauendes Visionsdokument für 18 Monate
│   └── initiative-tracker.md           # Aktive Initiativen mit Status und Blockierern
├── hiring/
│   ├── headcount-plan-2025.md           # Genehmigter Stellenplan, Budget, Zeitplan nach Rolle
│   ├── job-descriptions/
│   │   ├── staff-engineer.md            # Stellenbeschreibung — Staff Software Engineer
│   │   ├── senior-sre.md                # Stellenbeschreibung — Senior Site Reliability Engineer
│   │   ├── em-platform.md              # Stellenbeschreibung — Engineering Manager, Platform
│   │   └── principal-architect.md       # Stellenbeschreibung — Principal Architect
│   ├── interview-rubrics/
│   │   ├── system-design-rubric.md      # Bewertungsleitfaden für System-Design-Runden
│   │   ├── coding-rubric.md             # Bewertungsleitfaden für Coding-Runden
│   │   ├── leadership-rubric.md         # Bewertungsleitfaden für EM/Principal-Verhaltensinterviews
│   │   └── staff-calibration.md        # Kalibrierungsnotizen für das Staff-Level-Niveau
│   └── pipeline-notes/
│       ├── active-roles.md              # Aktuelle offene Stellen und Funnel-Metriken
│       └── offer-log.md                 # Angebotshistorie, Gehaltsrahmen, Annahmequoten
├── incidents/
│   ├── postmortem-template.md           # Kanonische Postmortem-Vorlage
│   ├── 2025-06-01-payments-outage.md    # P0 — Zahlungsdienst 47 Minuten ausgefallen
│   ├── 2025-05-14-data-pipeline-lag.md  # P1 — Aufnahmeverzögerung verursachte veraltete Dashboard-Daten
│   ├── 2025-04-22-cert-expiry.md        # P2 — TLS-Zertifikat auf Staging-Proxy abgelaufen
│   └── action-items-tracker.md         # Offene Folgeaufgaben aus allen Postmortems
├── metrics/
│   ├── eng-kpis-dashboard.md            # DORA-Metriken, Cycle Time, Deployment-Häufigkeit
│   ├── reliability-scorecard.md         # SLO-Erreichung pro Dienst, Error-Budget-Verbrauch
│   ├── on-call-burden.md               # Seiten pro Ingenieur, Falsch-Positiv-Rate, MTTRS
│   ├── pr-health.md                     # PR-Überprüfungszeit, veraltete PRs, Contributor-Verteilung
│   └── quarterly-report-q2-2025.md     # Quartalsweise zusammengestellte Metriken für das Board-Paket
├── org/
│   ├── team-structure.md                # Aktuelles Organigramm — Teams, Tech Leads, EMs
│   ├── capacity-plan-q3.md              # Analyse Stellenplan vs. Arbeitskapazität
│   ├── skill-matrix.md                  # Engineering-Kompetenzlandkarte nach Team
│   ├── succession-plan.md               # Schlüsselpersonenrisiken und Stellvertreter
│   └── team-health-surveys/
│       ├── q1-2025-results.md           # Lattice-Pulse-Ergebnisse und Themen
│       └── q2-2025-results.md           # Zusammenfassung der aktuellsten Umfrage
└── vendors/
    ├── evaluation-template.md           # Standard-Lieferantenbewertungsmatrix
    ├── datadog-vs-grafana-cloud.md      # Abgeschlossene Bewertung — Datadog gewählt
    ├── launchdarkly-vs-flagsmith.md     # Abgeschlossene Bewertung — LaunchDarkly gewählt
    ├── okta-vs-auth0.md                 # In Bearbeitung
    └── approved-vendor-list.md          # Aktuelle Lieferanten, Vertragsdaten, Verlängerungsverantwortliche
```

## Wichtige Dateien erklärt

| Pfad | Zweck |
|---|---|
| `.claude/commands/arch-review.md` | Slash-Befehl, der Kontext aus `decisions/` abruft und eine strukturierte Trade-off-Analyse mit einem fertigen ADR-Entwurf erzeugt |
| `.claude/commands/board-update.md` | Slash-Befehl, der `metrics/quarterly-report-*.md` und `roadmap/` zu einer boardfähigen Tech-Gesundheitszusammenfassung kompiliert |
| `.claude/commands/incident-review.md` | Slash-Befehl, der aus einer PagerDuty-Incident-ID ein Postmortem gerüstet, den Zeitablauf befüllt und beteiligte Dienste auflistet |
| `decisions/adr-template.md` | Kanonische ADR-Vorlage: Kontext, Entscheidungstreiber, betrachtete Optionen, Entscheidung, Konsequenzen, Status |
| `roadmap/q3-2025-tech-roadmap.md` | Lebendige Quartals-Roadmap mit Initiativverantwortlichen, Meilensteinen, Abhängigkeiten und Risiken — wöchentlich aktualisiert |
| `metrics/eng-kpis-dashboard.md` | DORA-Metriken, Cycle Time, Deployment-Häufigkeit und Change-Failure-Rate aus GitHub + Datadog kompiliert |
| `org/capacity-plan-q3.md` | Stellenplan-vs.-Lieferkapazitätsmodell: Team-Velocity, geplante Arbeit, Lückenanalyse, Einstellungsbedarf |
| `incidents/postmortem-template.md` | Standardpostmortem mit Schweregrad, Zeitablauf, Grundursache, beitragenden Faktoren, Maßnahmen und Verantwortlichkeitszuweisung |
| `vendors/evaluation-template.md` | Gewichtete Bewertungsmatrix für Lieferantenbewertungen: Kriterien, Gewichtungen, Lieferantenbewertungen, Empfehlungsabschnitt |
| `hiring/headcount-plan-2025.md` | Board-genehmigter Stellenplan mit Rolle, Team, Startquartal, Vollkostenrechnung und Recruiting-Status pro Zeile |

## Schnell-Scaffold

```bash
# Workspace-Wurzel erstellen
mkdir -p cto-workspace
cd cto-workspace

# .claude-Struktur erstellen
mkdir -p .claude/commands

# Workspace-Verzeichnisse erstellen
mkdir -p decisions
mkdir -p roadmap
mkdir -p hiring/job-descriptions
mkdir -p hiring/interview-rubrics
mkdir -p hiring/pipeline-notes
mkdir -p incidents
mkdir -p metrics
mkdir -p org/team-health-surveys
mkdir -p vendors

# Schlüsseldateien anlegen
touch decisions/README.md decisions/adr-template.md
touch roadmap/initiative-tracker.md
touch hiring/headcount-plan-2025.md
touch incidents/postmortem-template.md incidents/action-items-tracker.md
touch metrics/eng-kpis-dashboard.md metrics/reliability-scorecard.md
touch org/team-structure.md org/capacity-plan-q3.md org/skill-matrix.md
touch vendors/evaluation-template.md vendors/approved-vendor-list.md

# Claude Code Skills installieren
npx uitkit add skill productivity/engineering-strategy
npx uitkit add skill productivity/adr-writer
npx uitkit add skill productivity/tech-debt-tracker
npx uitkit add skill productivity/build-optimization
npx uitkit add skill productivity/vendor-evaluator
npx uitkit add skill devops-infra/platform-engineering
npx uitkit add skill devops-infra/monorepo

# Slash-Befehle installieren
npx uitkit add command arch-review
npx uitkit add command hiring-plan
npx uitkit add command incident-review
npx uitkit add command team-health
npx uitkit add command vendor-eval
npx uitkit add command eng-metrics
npx uitkit add command board-update
npx uitkit add command build-vs-buy
```

## CLAUDE.md-Vorlage

```markdown
# CTO / VP Engineering Workspace

Dieser Workspace unterstützt die technische Führungsarbeit: Architekturentscheidungen, technische Roadmap,
Einstellungen, Team-Gesundheit, Incident-Reviews, Lieferantenbewertung und Board-Reporting.

---

## Was das ist

Ein strukturierter Claude Code Workspace für einen CTO oder VP Engineering. Jedes Verzeichnis entspricht einer
spezifischen Führungsverantwortung. Claude Code liest Kontext aus diesen Dateien, um präzise,
organisationsspezifische Ergebnisse zu erzeugen — keine allgemeinen Ratschläge.

---

## Stack

- Linear — Issues und quartalsweise Roadmap (MCP: linear)
- GitHub — Code, PRs, Org-Metriken (MCP: github)
- Datadog — SLOs, Observability, On-Call-Daten
- PagerDuty — Incident-Benachrichtigungen und Postmortem-Auslöser
- Notion — Strategiedokumente und Team-Wikis
- Lattice / Leapsome — Performance-Reviews und Engagement-Umfragen
- Greenhouse — Recruiting-Pipeline und Interview-Scorecards
- Slack — Asynchrone Kommunikation und Incident-War-Rooms (MCP: slack)

---

## Verzeichniskonventionen

- `decisions/` — Alle ADRs befinden sich hier. Sequenzielle IDs verwenden (0001, 0002). Status: Vorgeschlagen | Akzeptiert | Veraltet | Abgelöst.
- `roadmap/` — Eine Datei pro Quartal. Nach Quartalsende archivieren. `initiative-tracker.md` bleibt aktuell.
- `hiring/` — Stellenbeschreibungen in `job-descriptions/`, Interview-Rubrics in `interview-rubrics/`. Keine persönlichen Kandidatendaten hier ablegen.
- `incidents/` — Eine Datei pro Incident. Dateinamenformat: `YYYY-MM-DD-kurzbeschreibung.md`. Maßnahmen immer in `action-items-tracker.md` eintragen.
- `metrics/` — Rohe Metrik-Snapshots und kompilierte Berichte. Quartalsberichte fließen direkt in Board-Updates ein.
- `org/` — Teamstruktur, Kapazitätspläne, Skill-Matrix. `team-structure.md` bei jedem Berichtswechsel aktualisieren.
- `vendors/` — Eine Bewertungsdatei pro Entscheidung. Abgeschlossene Bewertungen archivieren; `approved-vendor-list.md` aktuell halten.

---

## Häufige Aufgaben — genaue Befehle

### Architekturentscheidungen
```
/arch-review — Entscheidungskontext einfügen. Claude erstellt eine Trade-off-Analyse und einen ADR, bereit zum Einreichen in decisions/.
/adr-writer  — ADR von Grund auf erstellen. Fordert Kontext, Optionen und Konsequenzen an.
```

### Einstellungen
```
/hiring-plan    — Erstellt Rollendefinition, Interviewstruktur und Stellenplanrechtfertigung für eine neue Position.
/tech-interview-kit — Generiert Coding-Aufgaben, System-Design-Aufgaben und Bewertungsrubrics für eine bestimmte Rolle.
```

### Incidents
```
/incident-review — PagerDuty-Incident-ID oder Zeitablauf einfügen. Generiert Postmortem-Entwurf mit Grundursache und Maßnahmen.
```

### Team-Gesundheit
```
/team-health — Fasst Umfrageergebnisse, Fluktuationssignale und Moralindikatoren zu einem Führungsaktionsplan zusammen.
```

### Lieferanten
```
/vendor-eval   — Strukturierte Lieferantenbewertung nach gewichteten Kriterien. Erstellt ein Empfehlungs-Memo.
/build-vs-buy  — Eigenentwicklung-oder-Zukauf-Analyse: Kosten, Risiko, strategische Passung, Time-to-Value, Empfehlung.
```

### Metriken und Reporting
```
/eng-metrics   — Kompiliert DORA-Metriken, Cycle Time und SLO-Daten in einen Engineering-Gesundheitsbericht.
/board-update  — Stellt quartalsweise Tech-Gesundheitszusammenfassung, Roadmap-Fortschritt und Risikoregister für das Board zusammen.
```

---

## Konventionen, die Claude einhalten muss

- Bei der ADR-Erstellung immer die Vorlage unter `decisions/adr-template.md` verwenden — keine eigene Struktur erfinden.
- Bei Metriken zuerst aus `metrics/`-Dateien beziehen. Keine Zahlen erfinden.
- Postmortems sind schuldlos. In `incidents/` niemals einem Einzelnen die Schuld zuweisen.
- Stellenplan- und Vergütungsdaten in `hiring/headcount-plan-2025.md` sind vertraulich — nicht in Board-Updates aufnehmen, sofern nicht ausdrücklich gewünscht.
- Roadmap-Meilensteine in `roadmap/` sind die maßgebliche Quelle — in Zusammenfassungen nicht widersprechen.
- Alle Lieferantenbewertungen müssen eine gewichtete Bewertungstabelle vor einer Empfehlung enthalten.
```

## MCP-Server

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
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
        "/Users/you/cto-workspace"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"decisions/\"; then echo \"[ADR hook] New decision filed — update decisions/README.md index\"; fi'"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"incidents/\" && ! echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"postmortem-template\"; then echo \"[Incident hook] Filing incident — ensure action items are added to incidents/action-items-tracker.md\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'echo \"[Session end] If you drafted an ADR or postmortem, confirm it has been filed and linked from the relevant index file.\"'"
          }
        ]
      }
    ]
  }
}
```

## Zu installierende Skills

```bash
npx uitkit add skill productivity/engineering-strategy
npx uitkit add skill productivity/adr-writer
npx uitkit add skill productivity/tech-debt-tracker
npx uitkit add skill productivity/build-optimization
npx uitkit add skill productivity/vendor-evaluator
npx uitkit add skill productivity/tech-interview-kit
npx uitkit add skill productivity/exec-briefing
npx uitkit add skill devops-infra/platform-engineering
npx uitkit add skill devops-infra/monorepo
npx uitkit add skill devops-infra/oncall-runbook
npx uitkit add skill devops-infra/capacity-planner
```

## Verwandte Inhalte

- [Leitfaden: Claude für CTOs und Tech Leads](../guides/for-cto.md)
- [Workflow: CTO Weekly](../workflows/cto-weekly.md)
- [Workflow: Incident Response](../workflows/incident-response.md)
- [Workflow: Recruiting Pipeline](../workflows/recruiting-pipeline.md)
