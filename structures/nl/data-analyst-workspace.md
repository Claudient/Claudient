# Data-analist Werkruimte — Projectstructuur

> Voor data-analisten die SQL-queries uitvoeren, Python-gebaseerde exploratieve analyses doen, dashboards beheren en stakeholderrapporten opstellen via BigQuery of Snowflake, met dbt voor transformaties en Looker of Metabase voor BI.

## Stack

- **Data warehouse:** BigQuery of Snowflake
- **Transformaties:** dbt Core (of dbt Cloud)
- **BI / dashboards:** Looker of Metabase
- **Analyse:** Python 3.11+, pandas 2.x / polars 0.20+, Jupyter Lab 4.x
- **Notebooks:** JupyterLab, nbconvert (voor HTML-exports)
- **Versiebeheer:** Git + GitHub
- **Communicatie:** Slack
- **Pakketbeheer:** uv (Python), pip-tools voor vastgezette afhankelijkheden
- **Datakwaliteit:** Great Expectations of aangepaste SQL-assertiescripts
- **Planning:** dbt Cloud jobs, of cron + Makefile lokaal

## Mappenstructuur

```
my-analytics-workspace/
├── .claude/
│   ├── commands/                     # slash-commando's beschikbaar in dit project
│   │   ├── analyze.md                # /analyze — een dataset of vraag volledig verkennen
│   │   ├── sql-query.md              # /sql-query — SQL schrijven, optimaliseren en uitleggen
│   │   ├── dashboard-update.md       # /dashboard-update — dashboardlogica of SQL vernieuwen
│   │   ├── data-quality-check.md     # /data-quality-check — asserties uitvoeren, anomalieën vinden
│   │   ├── stakeholder-report.md     # /stakeholder-report — metrische gegevens omzetten naar narratief
│   │   └── explore.md                # /explore — vrije EDA op een tabel of dataset
│   ├── settings.json                 # hooks, MCP-serverreferenties, machtigingen
│   └── mcp.json                      # MCP-serverconfiguraties (BigQuery, Slack)
├── queries/                          # opgeslagen, versiebeheerd SQL per domein
│   ├── product/
│   │   ├── dau-wau-mau.sql           # query voor actieve-gebruikersmetrieken
│   │   ├── retention-cohorts.sql     # wekelijkse retentie per aanmeldcohort
│   │   └── funnel-conversion.sql     # stapsgewijze funnel met uitvalpercentages
│   ├── revenue/
│   │   ├── mrr-breakdown.sql         # MRR per plan, expansie, churn
│   │   ├── ltv-by-segment.sql        # klant-LTV gesegmenteerd per acquisitiekanaal
│   │   └── ar-aging.sql              # ouderdomsrapport debiteuren
│   ├── marketing/
│   │   ├── campaign-attribution.sql  # last-touch en lineaire attributie per kanaal
│   │   ├── cac-by-channel.sql        # klantacquisitiekosten per kanaal
│   │   └── email-engagement.sql      # open-/klikpercentages per campagne en segment
│   ├── operations/
│   │   ├── support-ticket-volume.sql # ticketvolume, SLA-overschrijdingspercentage, CSAT
│   │   └── eng-deploy-frequency.sql  # deploymentcadans en rollbackpercentage
│   └── _shared/
│       ├── date-spine.sql            # herbruikbaar datum-dimensie-CTE
│       └── user-spine.sql            # herbruikbaar gebruiker-dimensie-CTE
├── notebooks/                        # Jupyter-analysenotebooks
│   ├── 2026-05-product-drop-rca.ipynb        # oorzaakanalyse, productdaling mei 2026
│   ├── 2026-04-ltv-model-v2.ipynb            # LTV-modeliteratie en -validatie
│   ├── 2026-03-churn-predictors.ipynb        # verkenning van churnpredictoren
│   ├── templates/
│   │   ├── eda-template.ipynb        # standaard EDA-notebooksjabloon
│   │   └── ab-test-analysis.ipynb    # A/B-testresultatensjabloon met significantietoetsen
│   └── exports/                      # nbconvert HTML-exports voor delen
│       └── 2026-05-product-drop-rca.html
├── dashboards/                       # dashboardspecificaties en de bijbehorende SQL
│   ├── executive-weekly/
│   │   ├── spec.md                   # wat het dashboard toont, doelgroep, verversingsritme
│   │   ├── headline-metrics.sql      # KPI-query op topniveau
│   │   └── wow-trend.sql             # week-over-week trend met annotaties
│   ├── product-health/
│   │   ├── spec.md
│   │   ├── activation-funnel.sql
│   │   ├── feature-adoption.sql
│   │   └── nps-over-time.sql
│   └── marketing-performance/
│       ├── spec.md
│       ├── paid-overview.sql
│       └── organic-vs-paid.sql
├── reports/                          # stakeholderopleveringen — geëxporteerd of geschreven
│   ├── weekly/
│   │   ├── 2026-W22-business-review.md       # wekelijks bedrijfsrevieunarratief
│   │   └── 2026-W21-business-review.md
│   ├── monthly/
│   │   ├── 2026-05-monthly-review.md
│   │   └── 2026-04-monthly-review.md
│   └── ad-hoc/
│       ├── 2026-05-15-pricing-impact-analysis.md
│       └── 2026-04-20-q1-board-data-pack.md
├── data-quality/                     # kwaliteitscontroles en anomalielogboeken
│   ├── checks/
│   │   ├── orders-freshness.sql      # controleer of orders binnen 4u na dagafsluiting zijn geladen
│   │   ├── revenue-nulls.sql         # controleer of er geen nul-omzet is bij voltooide orders
│   │   ├── user-id-referential.sql   # controleer FK-integriteit tussen gebruikers en orders
│   │   └── duplicate-event-ids.sql   # controleer uniciteit van event_id in de gebeurtenistabel
│   ├── anomaly-log.md                # doorlopend logboek van gevonden anomalieën en oplossingstatus
│   └── runbook.md                    # wat te doen als een controle mislukt — escalatiepad
├── transforms/                       # dbt-modellen beheerd vanuit deze werkruimte
│   ├── dbt_project.yml               # projectnaam, modelpaden, standaard materialisaties
│   ├── profiles.yml                  # dbt-verbindingsprofielen (BigQuery / Snowflake)
│   ├── models/
│   │   ├── staging/
│   │   │   ├── stg_orders.sql        # schone, getypeerde orders uit ruwe data
│   │   │   ├── stg_users.sql         # schone gebruikers met deduplicatie
│   │   │   └── stg_events.sql        # schone productevenementen met geparseerde eigenschappen
│   │   ├── intermediate/
│   │   │   ├── int_user_sessions.sql # sessieconstructie vanuit gebeurtenissen
│   │   │   └── int_order_items.sql   # orderregels gekoppeld aan productcatalogus
│   │   └── marts/
│   │       ├── fct_orders.sql        # orders-facttabel voor rapportage
│   │       ├── fct_events.sql        # gebeurtenissen-facttabel voor productanalyse
│   │       ├── dim_users.sql         # gebruikersdimensie met segmenten en LTV-banden
│   │       └── dim_dates.sql         # datumdimensie voor alle tijdintelligentie
│   ├── tests/
│   │   ├── generic/                  # dbt generieke test-overschrijvingen
│   │   └── singular/
│   │       └── assert_revenue_positive.sql
│   └── macros/
│       ├── date_trunc_safe.sql       # null-veilige date_trunc-macro
│       └── fiscal_quarter.sql        # fiscaal kwartaal van het bedrijf vanuit kalenderdatum
├── docs/                             # datawoordenboek en metriekdefinities
│   ├── metric-definitions.md         # canonieke definities van alle gerapporteerde metrische waarden
│   ├── data-dictionary.md            # tabel- en kolombeschrijvingen voor sleuteldatasets
│   ├── schema-changelog.md           # overzicht van upstream schemawijzigingen en hun impact
│   └── onboarding.md                 # hoe een nieuwe analist vertrouwd raakt met deze werkruimte
├── requirements.txt                  # vastgezette Python-afhankelijkheden
├── pyproject.toml                    # projectmetadata en toolconfiguratie (ruff, black)
├── Makefile                          # veelgebruikte taken: dbt run, kwaliteitscontroles, notebookexport
├── .env.example                      # sjabloon voor omgevingsvariabelen — .env nooit committen
└── CLAUDE.md                         # projectinstructies voor Claude Code
```

## Belangrijke bestanden toegelicht

| Pad | Doel |
|---|---|
| `.claude/commands/analyze.md` | Slash-commando dat een datasetnaam en vraag ontvangt, EDA uitvoert en een gestructureerde bevinding met SQL en interpretatie teruggeeft |
| `.claude/commands/stakeholder-report.md` | Genereert een bedrijfsnarratief op basis van ruwe metrische cijfers — koptekst, drijfveren, anomalieën, aanbevelingen |
| `.claude/settings.json` | Configureert hooks (automatisch stagen van SQL bij schrijven, auditlog) en verwijst naar de BigQuery- en Slack-MCP-servers |
| `queries/_shared/date-spine.sql` | Gedeeld datum-dimensie-CTE waarnaar alle tijdreeksqueries verwijzen — wijzigingen werken overal door |
| `transforms/models/marts/fct_orders.sql` | Centrale orders-facttabel — de enige bron van waarheid voor omzet, transactieaantallen en AOV |
| `docs/metric-definitions.md` | Canonieke definities zodat Claude (en mensen) voor elke metriek dezelfde bedrijfslogica gebruiken |
| `data-quality/anomaly-log.md` | Doorlopend logboek van dataproblemen — Claude voegt vermeldingen toe wanneer /data-quality-check anomalieën vindt |
| `dashboards/executive-weekly/spec.md` | Dashboardspecificatie met doelgroep, verversingsschema, KPI-eigenaren en bekende beperkingen |

## Snelle opzet

```bash
# Werkruimtemap aanmaken en erin navigeren
mkdir my-analytics-workspace && cd my-analytics-workspace
git init

# Claude Code-configuratiemappen en commandobestanden aanmaken
mkdir -p .claude/commands .claude/logs

# Hoofdmappen van de werkruimte
mkdir -p queries/{product,revenue,marketing,operations,_shared}
mkdir -p notebooks/{templates,exports}
mkdir -p dashboards/{executive-weekly,product-health,marketing-performance}
mkdir -p reports/{weekly,monthly,ad-hoc}
mkdir -p data-quality/checks
mkdir -p transforms/models/{staging,intermediate,marts}
mkdir -p transforms/{tests/singular,tests/generic,macros}
mkdir -p docs

# Lege bestanden aanmaken zodat mappen worden bijgehouden in git
touch queries/product/dau-wau-mau.sql
touch queries/revenue/mrr-breakdown.sql
touch queries/_shared/{date-spine.sql,user-spine.sql}
touch data-quality/anomaly-log.md data-quality/runbook.md
touch docs/{metric-definitions.md,data-dictionary.md,schema-changelog.md}

# Python-omgeving
python3 -m venv .venv
source .venv/bin/activate
pip install uv
uv pip install pandas polars jupyterlab nbconvert great-expectations dbt-bigquery sqlfluff ruff black

# Afhankelijkheden vastleggen
pip freeze > requirements.txt

# dbt-project initialiseren (kies bigquery of snowflake)
dbt init transforms

# .env.example aanmaken
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

# Claude Code-skills installeren
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

## CLAUDE.md-sjabloon

```markdown
# Data-analist Werkruimte

Dit is een data-analistwerkruimte voor exploratieve analyse, dashboardbeheer,
ad-hocverzoeken en stakeholderrapportage. De enige bron van waarheid voor alle
metrische waarden staat in het BigQuery/Snowflake-datawarehouse. dbt beheert de
transformaties. Looker/Metabase is de BI-laag. Mart-laag dbt-modellen niet aanpassen
zonder de afhankelijkheden van downstream-dashboards te begrijpen.

---

## Stack

- Data warehouse: BigQuery (project: `your-gcp-project`) of Snowflake
- Transformaties: dbt Core, modellen in `transforms/`
- BI: Looker / Metabase (dashboardspecificaties in `dashboards/`)
- Analyse: Python 3.11, pandas 2.x / polars 0.20, JupyterLab 4
- Versiebeheer: Git + GitHub

---

## Metriekdefinities

Alle metriekdefinities zijn canoniek vastgelegd in `docs/metric-definitions.md`.
Een metriek nooit anders berekenen dan daar is gedefinieerd.
Als een stakeholder een getal vraagt dat in strijd is met deze definities, dit signaleren.

---

## Veelgebruikte taken en exacte commando's

| Taak | Commando |
|---|---|
| Een dataset verkennen of een vraag beantwoorden | `/analyze <table_or_dataset> — <question>` |
| Een SQL-query schrijven of debuggen | `/sql-query <beschrijf wat u nodig heeft>` |
| De onderliggende SQL van een dashboard bijwerken | `/dashboard-update <dashboard-name>` |
| Datakwaliteitscontroles uitvoeren op een tabel | `/data-quality-check <table_name>` |
| Een stakeholderrapport schrijven op basis van metrische waarden | `/stakeholder-report <context of plak metrische waarden>` |
| Vrije EDA op een nieuwe tabel | `/explore <table_name>` |

---

## SQL-conventies

- Alle queries gebruiken CTE's — geen subquery-nesting dieper dan twee niveaus
- Datumfilters gebruiken altijd `DATE_TRUNC` met expliciete granulariteit (dag, week, maand)
- BigQuery: backtick-identifiers gebruiken — `` `project.dataset.table` ``
- Snowflake: dubbele aanhalingstekens gebruiken waar het schema hoofdlettergevoelig is
- Vensterfuncties hebben de voorkeur boven self-joins voor lopende totalen en rangschikkingen
- Elke query opgeslagen in `queries/` moet een commentaarblok hebben: doel, granulariteit, eigenaar

---

## dbt-conventies

- Stagingmodellen: `stg_<source>_<entity>.sql` — alleen opschonen en typeren
- Intermediate modellen: `int_<description>.sql` — joins en sessievorming
- Martmodellen: `fct_<entity>.sql` en `dim_<entity>.sql` — rapportageklaar
- Alle martmodellen moeten dbt-tests hebben: `not_null`, `unique` op primaire sleutels
- Kolomnamen van marts niet wijzigen zonder `docs/metric-definitions.md` bij te werken

---

## Notebookconventies

- Bestandsnaamformaat: `YYYY-MM-<slug>.ipynb` (bijv. `2026-05-ltv-deep-dive.ipynb`)
- Eerste cel: markdown — doel, eigenaar, datum, beantwoorde kernvragen
- Laatste cel: markdown — samenvatting van bevindingen en aanbevolen acties
- Exporteren naar HTML vóór het delen: `jupyter nbconvert --to html <notebook>`

---

## Datakwaliteit

- Alle gevonden anomalieën moeten worden toegevoegd aan `data-quality/anomaly-log.md`
- Formaat: datum, tabel, probleembeschrijving, impact, oplossingstatus
- Als een controle in `data-quality/checks/` mislukt, volg `data-quality/runbook.md`

---

## Verboden

- `.env` niet committen — gebruik alleen `.env.example`
- `docs/metric-definitions.md` niet wijzigen zonder teamreview
- Geen notebooks aanmaken buiten `notebooks/` — exports gaan naar `notebooks/exports/`
- Geen destructieve SQL (DELETE, TRUNCATE, DROP) uitvoeren zonder een tweede bevestiging
```

## MCP-servers

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

## Aanbevolen hooks

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

## Te installeren skills

```bash
npx uitkit add skill data-ml/sql
npx uitkit add skill data-ml/pandas-polars
npx uitkit add skill data-ml/dashboard-narrator
npx uitkit add skill data-ml/data-quality-checker
npx uitkit add skill data-ml/stakeholder-report
npx uitkit add skill data-ml/dbt-data-pipelines
npx uitkit add skill data-ml/synthetic-data
```

## Gerelateerde bronnen

- [Gids: Claude voor data-analisten](../guides/for-data-analyst.md)
- [Workflow: Daterapportage](../workflows/data-reporting.md)
