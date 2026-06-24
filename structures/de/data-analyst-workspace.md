# Data-Analyst-Arbeitsbereich — Projektstruktur

> Für Datenanalysten, die SQL-Abfragen, Python-basierte explorative Analysen, Dashboard-Pflege und Stakeholder-Berichte gegen BigQuery oder Snowflake durchführen, mit dbt für Transformationen und Looker oder Metabase für BI.

## Stack

- **Data Warehouse:** BigQuery oder Snowflake
- **Transformationen:** dbt Core (oder dbt Cloud)
- **BI / Dashboards:** Looker oder Metabase
- **Analyse:** Python 3.11+, pandas 2.x / polars 0.20+, Jupyter Lab 4.x
- **Notebooks:** JupyterLab, nbconvert (für HTML-Exporte)
- **Versionskontrolle:** Git + GitHub
- **Kommunikation:** Slack
- **Paketverwaltung:** uv (Python), pip-tools für fixierte Abhängigkeiten
- **Datenqualität:** Great Expectations oder benutzerdefinierte SQL-Assertion-Skripte
- **Scheduling:** dbt Cloud Jobs oder cron + Makefile lokal

## Verzeichnisstruktur

```
my-analytics-workspace/
├── .claude/
│   ├── commands/                     # im Projekt verfügbare Slash-Befehle
│   │   ├── analyze.md                # /analyze — Datensatz oder Frage vollständig untersuchen
│   │   ├── sql-query.md              # /sql-query — SQL schreiben, optimieren und erklären
│   │   ├── dashboard-update.md       # /dashboard-update — Dashboard-Logik oder SQL aktualisieren
│   │   ├── data-quality-check.md     # /data-quality-check — Assertions ausführen, Anomalien finden
│   │   ├── stakeholder-report.md     # /stakeholder-report — Metriken in einen Bericht umwandeln
│   │   └── explore.md                # /explore — offene EDA auf einer Tabelle oder einem Datensatz
│   ├── settings.json                 # Hooks, MCP-Server-Referenzen, Berechtigungen
│   └── mcp.json                      # MCP-Server-Konfigurationen (BigQuery, Slack)
├── queries/                          # gespeichertes, versioniertes SQL nach Domäne
│   ├── product/
│   │   ├── dau-wau-mau.sql           # Abfrage für Metriken aktiver Nutzer
│   │   ├── retention-cohorts.sql     # wöchentliche Retention nach Anmelde-Kohorte
│   │   └── funnel-conversion.sql     # schrittweiser Funnel mit Abbruchraten
│   ├── revenue/
│   │   ├── mrr-breakdown.sql         # MRR nach Plan, Expansion, Churn
│   │   ├── ltv-by-segment.sql        # Kunden-LTV segmentiert nach Akquisitionskanal
│   │   └── ar-aging.sql              # Fälligkeitsbericht offener Forderungen
│   ├── marketing/
│   │   ├── campaign-attribution.sql  # Last-Touch- und lineare Attribution nach Kanal
│   │   ├── cac-by-channel.sql        # Kundenakquisitionskosten pro Kanal
│   │   └── email-engagement.sql      # Öffnungs-/Klickraten nach Kampagne und Segment
│   ├── operations/
│   │   ├── support-ticket-volume.sql # Ticket-Volumen, SLA-Überschreitungsrate, CSAT
│   │   └── eng-deploy-frequency.sql  # Deployment-Kadenz und Rollback-Rate
│   └── _shared/
│       ├── date-spine.sql            # wiederverwendbares Datumsdimensions-CTE
│       └── user-spine.sql            # wiederverwendbares Nutzerdimensions-CTE
├── notebooks/                        # Jupyter-Analyse-Notebooks
│   ├── 2026-05-product-drop-rca.ipynb        # Ursachenanalyse, Produkteinbruch Mai 2026
│   ├── 2026-04-ltv-model-v2.ipynb            # LTV-Modell-Iteration und -Validierung
│   ├── 2026-03-churn-predictors.ipynb        # Erkundung von Churn-Prädiktoren
│   ├── templates/
│   │   ├── eda-template.ipynb        # Standard-EDA-Notebook-Gerüst
│   │   └── ab-test-analysis.ipynb    # A/B-Test-Ergebnis-Template mit Signifikanztests
│   └── exports/                      # nbconvert-HTML-Exporte zum Teilen
│       └── 2026-05-product-drop-rca.html
├── dashboards/                       # Dashboard-Spezifikationen und zugrundeliegendes SQL
│   ├── executive-weekly/
│   │   ├── spec.md                   # Inhalt des Dashboards, Zielgruppe, Aktualisierungsrhythmus
│   │   ├── headline-metrics.sql      # KPI-Abfrage auf oberster Ebene
│   │   └── wow-trend.sql             # Wochenvergleich-Trend mit Anmerkungen
│   ├── product-health/
│   │   ├── spec.md
│   │   ├── activation-funnel.sql
│   │   ├── feature-adoption.sql
│   │   └── nps-over-time.sql
│   └── marketing-performance/
│       ├── spec.md
│       ├── paid-overview.sql
│       └── organic-vs-paid.sql
├── reports/                          # Stakeholder-Lieferables — exportiert oder verfasst
│   ├── weekly/
│   │   ├── 2026-W22-business-review.md       # wöchentlicher Geschäftsbericht
│   │   └── 2026-W21-business-review.md
│   ├── monthly/
│   │   ├── 2026-05-monthly-review.md
│   │   └── 2026-04-monthly-review.md
│   └── ad-hoc/
│       ├── 2026-05-15-pricing-impact-analysis.md
│       └── 2026-04-20-q1-board-data-pack.md
├── data-quality/                     # Qualitätsprüfungen und Anomalie-Protokolle
│   ├── checks/
│   │   ├── orders-freshness.sql      # sicherstellen, dass Bestellungen innerhalb von 4h nach Tagesabschluss geladen sind
│   │   ├── revenue-nulls.sql         # sicherstellen, dass abgeschlossene Bestellungen keinen Null-Umsatz haben
│   │   ├── user-id-referential.sql   # FK-Integrität zwischen Nutzern und Bestellungen prüfen
│   │   └── duplicate-event-ids.sql   # Eindeutigkeit von event_id in der Ereignistabelle prüfen
│   ├── anomaly-log.md                # fortlaufendes Protokoll gefundener Anomalien und Auflösungsstatus
│   └── runbook.md                    # Vorgehen bei fehlgeschlagenen Prüfungen — Eskalationspfad
├── transforms/                       # von diesem Arbeitsbereich verwaltete dbt-Modelle
│   ├── dbt_project.yml               # Projektname, Modellpfade, Materialisierungsstandards
│   ├── profiles.yml                  # dbt-Verbindungsprofile (BigQuery / Snowflake)
│   ├── models/
│   │   ├── staging/
│   │   │   ├── stg_orders.sql        # bereinigte, typisierte Bestellungen aus Rohdaten
│   │   │   ├── stg_users.sql         # bereinigte Nutzer mit Deduplizierung
│   │   │   └── stg_events.sql        # bereinigte Produktereignisse mit geparsten Eigenschaften
│   │   ├── intermediate/
│   │   │   ├── int_user_sessions.sql # Session-Konstruktion aus Ereignissen
│   │   │   └── int_order_items.sql   # Bestellpositionen verknüpft mit Produktkatalog
│   │   └── marts/
│   │       ├── fct_orders.sql        # Bestellungs-Faktentabelle für das Reporting
│   │       ├── fct_events.sql        # Ereignis-Faktentabelle für Produktanalysen
│   │       ├── dim_users.sql         # Nutzerdimension mit Segmenten und LTV-Bändern
│   │       └── dim_dates.sql         # Datumsdimension für alle Zeitintelligenz
│   ├── tests/
│   │   ├── generic/                  # dbt-Generic-Test-Überschreibungen
│   │   └── singular/
│   │       └── assert_revenue_positive.sql
│   └── macros/
│       ├── date_trunc_safe.sql       # null-sichere date_trunc-Makro
│       └── fiscal_quarter.sql        # Geschäftsquartal des Unternehmens aus dem Kalenderdatum
├── docs/                             # Datenwörterbuch und Metrik-Definitionen
│   ├── metric-definitions.md         # kanonische Definitionen aller berichteten Metriken
│   ├── data-dictionary.md            # Tabellen- und Spaltenbeschreibungen für wichtige Datensätze
│   ├── schema-changelog.md           # Aufzeichnung von Schema-Änderungen vorgelagerter Systeme und deren Auswirkungen
│   └── onboarding.md                 # wie ein neuer Analyst mit diesem Arbeitsbereich vertraut wird
├── requirements.txt                  # fixierte Python-Abhängigkeiten
├── pyproject.toml                    # Projektmetadaten und Tool-Konfiguration (ruff, black)
├── Makefile                          # häufige Aufgaben: dbt run, Qualitätsprüfungen, Notebook-Export
├── .env.example                      # Vorlage für Umgebungsvariablen — .env niemals committen
└── CLAUDE.md                         # Projektanweisungen für Claude Code
```

## Wichtige Dateien erklärt

| Pfad | Zweck |
|---|---|
| `.claude/commands/analyze.md` | Slash-Befehl, der einen Datensatznamen und eine Frage entgegennimmt, eine EDA durchführt und einen strukturierten Befund mit SQL und Interpretation zurückgibt |
| `.claude/commands/stakeholder-report.md` | Erstellt einen Geschäftsbericht aus rohen Metrik-Zahlen — Überschrift, Treiber, Anomalien, Empfehlungen |
| `.claude/settings.json` | Konfiguriert Hooks (automatisches Staging von SQL beim Schreiben, Audit-Log) und referenziert die BigQuery- und Slack-MCP-Server |
| `queries/_shared/date-spine.sql` | Gemeinsames Datumsdimensions-CTE, das in allen Zeitreihenabfragen referenziert wird — Änderungen wirken sich überall aus |
| `transforms/models/marts/fct_orders.sql` | Zentrale Bestellungs-Faktentabelle — die einzige Quelle der Wahrheit für Umsatz, Transaktionsanzahl und AOV |
| `docs/metric-definitions.md` | Kanonische Definitionen, damit Claude (und Menschen) für jede Metrik dieselbe Geschäftslogik verwenden |
| `data-quality/anomaly-log.md` | Fortlaufendes Protokoll von Datenproblemen — Claude ergänzt es, wenn /data-quality-check Anomalien findet |
| `dashboards/executive-weekly/spec.md` | Dashboard-Spezifikation mit Zielgruppe, Aktualisierungsplan, KPI-Verantwortlichen und bekannten Einschränkungen |

## Schnelles Gerüst

```bash
# Arbeitsbereichsverzeichnis erstellen und einsteigen
mkdir my-analytics-workspace && cd my-analytics-workspace
git init

# Claude Code-Konfigurationsverzeichnisse und Befehlsdateien erstellen
mkdir -p .claude/commands .claude/logs

# Hauptverzeichnisse des Arbeitsbereichs
mkdir -p queries/{product,revenue,marketing,operations,_shared}
mkdir -p notebooks/{templates,exports}
mkdir -p dashboards/{executive-weekly,product-health,marketing-performance}
mkdir -p reports/{weekly,monthly,ad-hoc}
mkdir -p data-quality/checks
mkdir -p transforms/models/{staging,intermediate,marts}
mkdir -p transforms/{tests/singular,tests/generic,macros}
mkdir -p docs

# Platzhalter-Dateien anlegen, damit Verzeichnisse in git verfolgt werden
touch queries/product/dau-wau-mau.sql
touch queries/revenue/mrr-breakdown.sql
touch queries/_shared/{date-spine.sql,user-spine.sql}
touch data-quality/anomaly-log.md data-quality/runbook.md
touch docs/{metric-definitions.md,data-dictionary.md,schema-changelog.md}

# Python-Umgebung
python3 -m venv .venv
source .venv/bin/activate
pip install uv
uv pip install pandas polars jupyterlab nbconvert great-expectations dbt-bigquery sqlfluff ruff black

# Abhängigkeiten einfrieren
pip freeze > requirements.txt

# dbt-Projekt initialisieren (bigquery oder snowflake wählen)
dbt init transforms

# .env.example erstellen
cat > .env.example <<'EOF'
BIGQUERY_PROJECT=your-gcp-project-id
BIGQUERY_DATASET=analytics
SNOWFLAKE_ACCOUNT=your-account.region
SNOWFLAKE_USER=analyst@company.com
SNOWFLAKE_DATABASE=ANALYTICS
SNOWFLAKE_SCHEMA=PUBLIC
SLACK_BOT_TOKEN=xoxb-your-token
SLACK_TEAM_ID=T0XXXXXXXXX
EOF

# .gitignore
cat > .gitignore <<'EOF'
.env
.venv/
__pycache__/
*.pyc
.ipynb_checkpoints/
notebooks/exports/*.html
transforms/target/
transforms/dbt_packages/
transforms/logs/
.DS_Store
EOF

# Claude Code Skills installieren
npx uitkit add skill data-ml/sql
npx uitkit add skill data-ml/pandas-polars
npx uitkit add skill data-ml/dashboard-narrator
npx uitkit add skill data-ml/data-quality-checker
npx uitkit add skill data-ml/stakeholder-report
npx uitkit add skill data-ml/dbt-data-pipelines
npx uitkit add skill data-ml/synthetic-data

git add .
git commit -m "chore: initial data analyst workspace scaffold"
```

## CLAUDE.md-Vorlage

```markdown
# Data-Analyst-Arbeitsbereich

Dies ist ein Data-Analyst-Arbeitsbereich für explorative Analysen, Dashboard-Pflege,
Ad-hoc-Anfragen und Stakeholder-Berichte. Die einzige Quelle der Wahrheit für alle
Metriken ist das BigQuery/Snowflake-Data-Warehouse. dbt verwaltet die Transformationen.
Looker/Metabase ist die BI-Schicht. Mart-Schicht-dbt-Modelle nicht ändern, ohne die
nachgelagerten Dashboard-Abhängigkeiten zu verstehen.

---

## Stack

- Data Warehouse: BigQuery (Projekt: `your-gcp-project`) oder Snowflake
- Transformationen: dbt Core, Modelle in `transforms/`
- BI: Looker / Metabase (Dashboard-Spezifikationen in `dashboards/`)
- Analyse: Python 3.11, pandas 2.x / polars 0.20, JupyterLab 4
- Versionskontrolle: Git + GitHub

---

## Metrik-Definitionen

Alle Metrik-Definitionen sind kanonisch in `docs/metric-definitions.md`.
Eine Metrik niemals abweichend von den dort definierten Formeln berechnen.
Wenn ein Stakeholder eine Zahl anfragt, die diesen Definitionen widerspricht, darauf hinweisen.

---

## Häufige Aufgaben und exakte Befehle

| Aufgabe | Befehl |
|---|---|
| Datensatz erkunden oder Frage beantworten | `/analyze <table_or_dataset> — <question>` |
| SQL-Abfrage schreiben oder debuggen | `/sql-query <beschreiben Sie, was Sie benötigen>` |
| Zugrunde liegendes SQL eines Dashboards aktualisieren | `/dashboard-update <dashboard-name>` |
| Datenqualitätsprüfungen auf einer Tabelle ausführen | `/data-quality-check <table_name>` |
| Stakeholder-Bericht aus Metriken erstellen | `/stakeholder-report <Kontext oder Metriken einfügen>` |
| Offene EDA auf einer neuen Tabelle | `/explore <table_name>` |

---

## SQL-Konventionen

- Alle Abfragen verwenden CTEs — keine Unterabfragen-Verschachtelung über zwei Ebenen hinaus
- Datumsfilter verwenden immer `DATE_TRUNC` mit expliziter Granularität (Tag, Woche, Monat)
- BigQuery: Backtick-Bezeichner verwenden — `` `project.dataset.table` ``
- Snowflake: Doppelte Anführungszeichen verwenden, wenn das Schema zwischen Groß- und Kleinschreibung unterscheidet
- Fensterfunktionen gegenüber Self-Joins für laufende Summen und Rankings bevorzugen
- Jede in `queries/` gespeicherte Abfrage muss einen Kommentarblock haben: Zweck, Granularität, Verantwortlicher

---

## dbt-Konventionen

- Staging-Modelle: `stg_<source>_<entity>.sql` — nur bereinigen und typisieren
- Intermediate-Modelle: `int_<description>.sql` — Joins und Sessionisierung
- Mart-Modelle: `fct_<entity>.sql` und `dim_<entity>.sql` — bereit für das Reporting
- Alle Mart-Modelle müssen dbt-Tests haben: `not_null`, `unique` auf Primärschlüsseln
- Mart-Spaltennamen nicht ändern, ohne `docs/metric-definitions.md` zu aktualisieren

---

## Notebook-Konventionen

- Dateinamenformat: `YYYY-MM-<slug>.ipynb` (z.B. `2026-05-ltv-deep-dive.ipynb`)
- Erste Zelle: Markdown — Zweck, Verantwortlicher, Datum, beantwortete Schlüsselfragen
- Letzte Zelle: Markdown — Ergebniszusammenfassung und empfohlene Maßnahmen
- Vor dem Teilen in HTML exportieren: `jupyter nbconvert --to html <notebook>`

---

## Datenqualität

- Alle gefundenen Anomalien müssen an `data-quality/anomaly-log.md` angehängt werden
- Format: Datum, Tabelle, Problembeschreibung, Auswirkung, Auflösungsstatus
- Wenn eine Prüfung in `data-quality/checks/` fehlschlägt, `data-quality/runbook.md` befolgen

---

## Verboten

- `.env` nicht committen — nur `.env.example` verwenden
- `docs/metric-definitions.md` nicht ohne Team-Review ändern
- Keine Notebooks außerhalb von `notebooks/` erstellen — Exporte gehören nach `notebooks/exports/`
- Kein destruktives SQL (DELETE, TRUNCATE, DROP) ohne zweite Bestätigung ausführen
```

## MCP-Server

```json
{
  "mcpServers": {
    "bigquery": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-bigquery"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "/path/to/service-account-key.json",
        "BIGQUERY_PROJECT": "your-gcp-project-id",
        "BIGQUERY_DATASET": "analytics"
      }
    },
    "snowflake": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-snowflake"],
      "env": {
        "SNOWFLAKE_ACCOUNT": "your-account.region",
        "SNOWFLAKE_USER": "analyst@company.com",
        "SNOWFLAKE_PASSWORD": "your-password",
        "SNOWFLAKE_DATABASE": "ANALYTICS",
        "SNOWFLAKE_SCHEMA": "PUBLIC",
        "SNOWFLAKE_WAREHOUSE": "COMPUTE_WH"
      }
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-your-bot-token-here",
        "SLACK_TEAM_ID": "T0XXXXXXXXX"
      }
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
            "command": "bash -c 'if [[ \"$CLAUDE_TOOL_INPUT_FILE_PATH\" == *.sql ]]; then sqlfluff fix --dialect bigquery \"$CLAUDE_TOOL_INPUT_FILE_PATH\" --quiet; fi'",
            "async": true
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if [[ \"$CLAUDE_TOOL_INPUT_FILE_PATH\" == */data-quality/anomaly-log.md ]]; then git add \"$CLAUDE_TOOL_INPUT_FILE_PATH\"; fi'",
            "async": true
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_COMMAND\" | grep -qiE \"(DELETE|TRUNCATE|DROP TABLE|DROP VIEW)\"; then echo \"DESTRUCTIVE SQL DETECTED — confirm intent before proceeding\" >&2; exit 1; fi'"
          }
        ]
      }
    ]
  }
}
```

## Zu installierende Skills

```bash
npx uitkit add skill data-ml/sql
npx uitkit add skill data-ml/pandas-polars
npx uitkit add skill data-ml/dashboard-narrator
npx uitkit add skill data-ml/data-quality-checker
npx uitkit add skill data-ml/stakeholder-report
npx uitkit add skill data-ml/dbt-data-pipelines
npx uitkit add skill data-ml/synthetic-data
```

## Verwandte Ressourcen

- [Leitfaden: Claude für Datenanalysten](../guides/for-data-analyst.md)
- [Workflow: Daten-Reporting](../workflows/data-reporting.md)
