# Data Pipeline (dbt + Airflow) — Projektstruktur

> Für Data Engineers, die eine produktive ELT-Pipeline betreiben — optimiert für den gesamten Zyklus von der Rohdatenaufnahme über dbt-Transformationen bis hin zu validierten, BI-bereiten Mart-Tabellen.

## Stack

- **Transformationen:** dbt Core 1.8+ (Python 3.11+, dbt-postgres oder dbt-bigquery Adapter)
- **Orchestrierung:** Apache Airflow 2.9+ (LocalExecutor für Entwicklung, CeleryExecutor für Produktion)
- **Warehouse:** PostgreSQL 16 oder BigQuery (Adapter austauschbar über profiles.yml)
- **Ingestion:** Airbyte 0.50+ (Verbindungskonfigurationen versioniert in airbyte/)
- **Datenqualität:** Great Expectations 0.18+ (Suites pro Mart, Airflow-Checkpoints)
- **Eigene Operatoren:** Python 3.11+ (Airflow-Plugins mit BaseOperator-Unterklassen)
- **Containerisierung:** Docker 25 + docker-compose v2 (Airflow Webserver, Scheduler, Worker, Triggerer)
- **CI/CD:** GitHub Actions (dbt compile + test bei PR, Deployment beim Merge in main)
- **BI:** Metabase 0.49+ (liest aus dem Mart-Schema; Semantic Layer über dbt-Exposures)
- **Secret-Verwaltung:** Airflow Connections + Variables (Produktion); .env-Dateien (lokale Entwicklung)

## Verzeichnisstruktur

```
data-pipeline/
├── .github/
│   └── workflows/
│       ├── dbt-ci.yml                           # PR: dbt compile, dbt test --select state:modified+
│       └── deploy.yml                           # Merge nach main: dbt run --target prod, GE-Checkpoints
├── dbt/
│   ├── dbt_project.yml                          # Projektname, Version, Model-/Test-/Seed-Pfade, Variablen
│   ├── profiles.yml                             # dev/prod-Targets — NICHT EINCHECKEN (in .gitignore)
│   ├── packages.yml                             # dbt-utils, dbt-expectations, elementary-data
│   ├── sources.yml                              # Übergeordnete Source-Deklarationen (veraltet — in models/ verschieben)
│   ├── analyses/
│   │   ├── cohort_retention.sql                 # Ad-hoc-Analyse, kompiliert aber nicht materialisiert
│   │   └── revenue_reconciliation.sql           # Finanz-Abstimmungsabfrage, monatlich ausgeführt
│   ├── macros/
│   │   ├── generate_schema_name.sql             # Schema-Benennung überschreiben: env_prefix + custom_schema
│   │   ├── cents_to_dollars.sql                 # Makro zur Umrechnung von Geldeinheiten
│   │   ├── safe_divide.sql                      # Division mit Schutz vor Null-Divisor
│   │   ├── surrogate_key_from_columns.sql       # Wrapper für dbt_utils.generate_surrogate_key
│   │   └── current_timestamp_utc.sql            # Adapter-agnostisches UTC-Timestamp-Makro
│   ├── models/
│   │   ├── staging/
│   │   │   ├── _sources/
│   │   │   │   ├── src_stripe.yml               # Stripe-Source: Tabellen, Spalten, Aktualitätsprüfungen
│   │   │   │   ├── src_salesforce.yml           # Salesforce-Source: Accounts, Opportunities, Contacts
│   │   │   │   └── src_postgres_app.yml         # Anwendungs-DB-Source: Users, Orders, Events
│   │   │   ├── stripe/
│   │   │   │   ├── stg_stripe__charges.sql      # Umbenennen, casten, deduplizieren von stripe.charges
│   │   │   │   ├── stg_stripe__customers.sql    # Umbenennen, casten von stripe.customers
│   │   │   │   └── stg_stripe__invoices.sql     # Umbenennen, casten, abgeleitetes Statusfeld hinzufügen
│   │   │   ├── salesforce/
│   │   │   │   ├── stg_salesforce__accounts.sql      # CRM-Accounts normalisiert
│   │   │   │   ├── stg_salesforce__opportunities.sql  # Opportunity-Stage + Betrag normalisiert
│   │   │   │   └── stg_salesforce__contacts.sql       # Contacts mit FK zu Accounts
│   │   │   └── app/
│   │   │       ├── stg_app__users.sql           # Users mit geparster E-Mail-Domain, Anmeldequelle
│   │   │       ├── stg_app__orders.sql          # Orders mit Aufschlüsselung der Einzelpositionen
│   │   │       └── stg_app__events.sql          # Event-Stream: Seitenaufrufe, Feature-Nutzung
│   │   ├── intermediate/
│   │   │   ├── int_customer_orders.sql          # Join stg_app__orders + stg_stripe__charges
│   │   │   ├── int_user_activity_sessions.sql   # Event-Stream in Sessions unterteilen (30-Minuten-Regel)
│   │   │   ├── int_opportunity_stages.sql       # Salesforce-Stage-Verlauf mit Lag-Spalten
│   │   │   └── int_revenue_by_customer.sql      # Charges + Invoices pro customer_id aggregieren
│   │   └── marts/
│   │       ├── core/
│   │       │   ├── schema.yml                   # Beschreibungen + Tests für alle Core-Mart-Modelle
│   │       │   ├── dim_customers.sql            # SCD Typ 1 Kundendimension
│   │       │   ├── dim_products.sql             # Produktkatalog-Dimension
│   │       │   ├── fct_orders.sql               # Bestellgranulat-Faktentabelle (eine Zeile pro Bestellung)
│   │       │   └── fct_revenue.sql              # Umsatzgranulat (eine Zeile pro Charge/Rechnungsposition)
│   │       ├── finance/
│   │       │   ├── schema.yml                   # Finance-Mart-Beschreibungen + Tests
│   │       │   ├── fct_mrr.sql                  # Monatlich wiederkehrender Umsatz: Expansion/Kontraktion/Churn
│   │       │   └── fct_invoices_reconciled.sql  # Stripe-Rechnungen abgeglichen mit Salesforce-Opportunities
│   │       └── product/
│   │           ├── schema.yml                   # Product-Mart-Beschreibungen + Tests
│   │           ├── fct_feature_adoption.sql     # Feature-Nutzungsereignisse auf User-Feature-Granulat pivotiert
│   │           └── fct_retention_cohorts.sql    # Wöchentliche Kohortenretentionsmatrix
│   ├── seeds/
│   │   ├── exchange_rates.csv                   # Statische monatliche Wechselkurse für die Währungsumrechnung
│   │   └── country_codes.csv                    # ISO 3166-1 Alpha-2 zu Regions-Mapping
│   └── tests/
│       ├── assert_fct_orders_no_negative_revenue.sql   # Benutzerdefinierter Test: revenue >= 0
│       ├── assert_mrr_reconciles_to_stripe.sql         # MRR-Summe stimmt mit Stripe-Charges überein
│       └── assert_no_orphaned_order_customers.sql      # Jede customer_id in fct_orders ist in dim_customers
├── airflow/
│   ├── dags/
│   │   ├── ingest__stripe_daily.py              # Löst Airbyte-Stripe-Sync aus (täglich 02:00 UTC)
│   │   ├── ingest__salesforce_daily.py          # Löst Airbyte-Salesforce-Sync aus (täglich 03:00 UTC)
│   │   ├── transform__dbt_daily.py              # dbt run + dbt test vollständige Aktualisierung (täglich 05:00 UTC)
│   │   ├── transform__dbt_hourly_staging.py     # dbt run --select staging (stündlich, inkrementell)
│   │   ├── quality__ge_mart_checks.py           # Great Expectations Checkpoints nach dbt run
│   │   └── utils/
│   │       ├── __init__.py
│   │       ├── dag_factory.py                   # build_dbt_dag()-Hilfsfunktion: gemeinsame Retry- + Alert-Logik
│   │       └── slack_alerts.py                  # on_failure_callback: Benachrichtigung im #data-alerts-Kanal
│   ├── plugins/
│   │   ├── __init__.py
│   │   ├── dbt_operator.py                      # DbtRunOperator, DbtTestOperator, DbtSourceFreshnessOperator
│   │   ├── airbyte_operator.py                  # AirbyteTriggerSyncOperator mit Polling + Timeout
│   │   └── ge_operator.py                       # GreatExpectationsOperator als Wrapper für GE-Checkpoint-Ausführung
│   └── config/
│       ├── airflow.cfg                          # Zentrale Airflow-Konfiguration (in Produktion durch Umgebungsvariablen überschrieben)
│       └── webserver_config.py                  # Auth-Backend-Konfiguration (Google OAuth oder LDAP)
├── great_expectations/
│   ├── great_expectations.yml                   # GE-Projektkonfiguration: Datasource, Store-Backends
│   ├── expectations/
│   │   ├── dim_customers.json                   # Expectation Suite für den dim_customers-Mart
│   │   ├── fct_orders.json                      # Expectation Suite für den fct_orders-Mart
│   │   └── fct_mrr.json                         # Expectation Suite für den fct_mrr-Mart
│   └── checkpoints/
│       ├── dim_customers_checkpoint.yml         # Checkpoint: dim_customers-Suite ausführen, Ergebnisse speichern
│       ├── fct_orders_checkpoint.yml            # Checkpoint: fct_orders-Suite ausführen, Ergebnisse speichern
│       └── fct_mrr_checkpoint.yml               # Checkpoint: fct_mrr-Suite ausführen, Ergebnisse speichern
├── airbyte/
│   ├── connections/
│   │   ├── stripe_to_postgres.json              # Airbyte-Verbindungskonfiguration: Source, Ziel, Streams, Zeitplan
│   │   ├── salesforce_to_postgres.json          # Airbyte-Verbindungskonfiguration: Salesforce-CRM-Sync
│   │   └── app_postgres_to_warehouse.json       # CDC von der Anwendungs-DB ins Warehouse
│   └── README.md                                # Anleitung zur Anwendung der Verbindungskonfigurationen via Airbyte API
├── scripts/
│   ├── seed_dev_data.sh                         # Anonymisierte Snapshots ins Entwicklungs-Warehouse laden
│   ├── backfill_date_range.py                   # dbt run über einen historischen Datumsbereich auslösen
│   └── reconcile_stripe_mrr.sql                 # Ad-hoc-MRR-Abstimmung gegen das Stripe-Dashboard
├── docker/
│   ├── Dockerfile.airflow                       # Erweitert apache/airflow:2.9, installiert dbt + GE
│   └── docker-compose.yml                       # Airflow Webserver, Scheduler, Worker, Triggerer, PostgreSQL 16, Redis 7
├── .github/
│   └── workflows/                               # (siehe Anfang der Baumstruktur)
├── .env.example                                 # Alle Umgebungsvariablen mit Beschreibungen (keine echten Werte)
├── .gitignore                                   # Schließt profiles.yml, .env, target/, logs/, __pycache__ aus
├── Makefile                                     # Targets: dev, dbt-run, dbt-test, ge-check, lint, compile
└── requirements.txt                             # Übergeordnete Python-Abhängigkeiten: apache-airflow, dbt-core, great_expectations
```

## Wichtige Dateien erklärt

| Pfad | Zweck |
|---|---|
| `dbt/dbt_project.yml` | Definiert Projektname, dbt-Versionspin, Modellpfade, Materialisierungsstandards pro Schicht (staging=view, intermediate=ephemeral, marts=table) sowie `+schema`-Überschreibungen pro Ordner |
| `dbt/models/staging/_sources/src_stripe.yml` | Deklariert die rohe Stripe-Source mit Aktualitätsschwellenwerten auf Tabellenebene (`warn_after: 24h`, `error_after: 48h`); in Staging-Modellen als `{{ source('stripe', 'charges') }}` referenziert |
| `dbt/models/marts/core/schema.yml` | Beschreibungen und generische Tests auf Spaltenebene (`unique`, `not_null`, `relationships`, `accepted_values`) für alle Core-Mart-Modelle; treibt dbt docs und den Datenkatalog an |
| `airflow/dags/transform__dbt_daily.py` | Haupt-DAG für täglich: wartet via ExternalTaskSensor auf Ingestion-DAGs, führt DbtRunOperator (vollständige Mart-Aktualisierung), dann DbtTestOperator und anschließend quality__ge_mart_checks-DAG aus |
| `airflow/plugins/dbt_operator.py` | Benutzerdefinierter `DbtRunOperator` und `DbtTestOperator`; liest `DBT_PROJECT_DIR`, `DBT_PROFILES_DIR`, `DBT_TARGET` aus Airflow-Variablen; gibt dbt-Exit-Codes als Task-Fehler weiter |
| `great_expectations/expectations/fct_orders.json` | GE-Expectation-Suite für fct_orders: Zeilenzahl-Grenzen, `order_id`-Eindeutigkeit, `revenue_cents` nicht-negativ, referenzielle Vollständigkeit von `customer_id`, Aktualität von `order_date` |
| `.github/workflows/dbt-ci.yml` | Bei PR: dbt-State-Artefakt aus S3/GCS abrufen, `dbt compile` ausführen, `dbt test --select state:modified+ --defer --state ./state` ausführen, um nur geänderte Modelle und deren Downstream zu testen |
| `docker/docker-compose.yml` | Lokaler Airflow-Stack: Webserver auf :8080, Scheduler, Worker (CeleryExecutor), Triggerer, PostgreSQL 16 (Metadaten-DB + Entwicklungs-Warehouse), Redis 7 (Celery-Broker) |

## Schnell-Scaffold

```bash
# Voraussetzungen: Python 3.11+, Docker, uv (pip install uv)
PROJECT=data-pipeline
mkdir -p $PROJECT && cd $PROJECT

# Python-Umgebung
uv init --python 3.11
uv add apache-airflow==2.9.* dbt-core==1.8.* dbt-postgres great_expectations==0.18.*

# dbt-Verzeichnisstruktur
mkdir -p dbt/models/staging/_sources
mkdir -p dbt/models/staging/stripe
mkdir -p dbt/models/staging/salesforce
mkdir -p dbt/models/staging/app
mkdir -p dbt/models/intermediate
mkdir -p dbt/models/marts/core
mkdir -p dbt/models/marts/finance
mkdir -p dbt/models/marts/product
mkdir -p dbt/macros
mkdir -p dbt/analyses
mkdir -p dbt/seeds
mkdir -p dbt/tests

# Airflow-Verzeichnisstruktur
mkdir -p airflow/dags/utils
mkdir -p airflow/plugins
mkdir -p airflow/config

# Great Expectations, Airbyte, Skripte, Docker, CI
mkdir -p great_expectations/expectations
mkdir -p great_expectations/checkpoints
mkdir -p airbyte/connections
mkdir -p scripts
mkdir -p docker
mkdir -p .github/workflows

# dbt-Projekt initialisieren
uv run dbt init dbt --skip-profile-setup 2>/dev/null || true

# dbt_project.yml schreiben
cat > dbt/dbt_project.yml << 'EOF'
name: 'data_pipeline'
version: '1.0.0'
config-version: 2
require-dbt-version: ">=1.8.0"

profile: 'data_pipeline'

model-paths: ["models"]
analysis-paths: ["analyses"]
test-paths: ["tests"]
seed-paths: ["seeds"]
macro-paths: ["macros"]

target-path: "target"
clean-targets: ["target", "dbt_packages"]

models:
  data_pipeline:
    staging:
      +materialized: view
      +schema: staging
    intermediate:
      +materialized: ephemeral
    marts:
      +materialized: table
      core:
        +schema: core
      finance:
        +schema: finance
      product:
        +schema: product
EOF

# packages.yml schreiben
cat > dbt/packages.yml << 'EOF'
packages:
  - package: dbt-labs/dbt_utils
    version: [">=1.2.0", "<2.0.0"]
  - package: calogica/dbt_expectations
    version: [">=0.10.0", "<1.0.0"]
  - package: elementary-data/elementary
    version: [">=0.14.0", "<1.0.0"]
EOF

# Wichtige Modelldateien anlegen
touch dbt/models/staging/_sources/src_stripe.yml
touch dbt/models/staging/_sources/src_salesforce.yml
touch dbt/models/staging/_sources/src_postgres_app.yml
touch dbt/models/staging/stripe/stg_stripe__charges.sql
touch dbt/models/staging/stripe/stg_stripe__customers.sql
touch dbt/models/staging/stripe/stg_stripe__invoices.sql
touch dbt/models/staging/salesforce/stg_salesforce__accounts.sql
touch dbt/models/staging/salesforce/stg_salesforce__opportunities.sql
touch dbt/models/staging/app/stg_app__users.sql
touch dbt/models/staging/app/stg_app__orders.sql
touch dbt/models/intermediate/int_customer_orders.sql
touch dbt/models/intermediate/int_revenue_by_customer.sql
touch dbt/models/marts/core/schema.yml
touch dbt/models/marts/core/dim_customers.sql
touch dbt/models/marts/core/fct_orders.sql
touch dbt/models/marts/finance/fct_mrr.sql
touch dbt/models/marts/product/fct_feature_adoption.sql
touch dbt/macros/generate_schema_name.sql
touch dbt/macros/cents_to_dollars.sql
touch dbt/macros/safe_divide.sql
touch dbt/macros/surrogate_key_from_columns.sql
touch dbt/macros/current_timestamp_utc.sql
touch dbt/seeds/exchange_rates.csv
touch dbt/seeds/country_codes.csv

# Airflow-Dateien anlegen
touch airflow/dags/ingest__stripe_daily.py
touch airflow/dags/ingest__salesforce_daily.py
touch airflow/dags/transform__dbt_daily.py
touch airflow/dags/transform__dbt_hourly_staging.py
touch airflow/dags/quality__ge_mart_checks.py
touch airflow/dags/utils/__init__.py
touch airflow/dags/utils/dag_factory.py
touch airflow/dags/utils/slack_alerts.py
touch airflow/plugins/__init__.py
touch airflow/plugins/dbt_operator.py
touch airflow/plugins/airbyte_operator.py
touch airflow/plugins/ge_operator.py

# GE-Dateien anlegen
touch great_expectations/great_expectations.yml
touch great_expectations/expectations/dim_customers.json
touch great_expectations/expectations/fct_orders.json
touch great_expectations/expectations/fct_mrr.json
touch great_expectations/checkpoints/dim_customers_checkpoint.yml
touch great_expectations/checkpoints/fct_orders_checkpoint.yml
touch great_expectations/checkpoints/fct_mrr_checkpoint.yml

# Airbyte-Verbindungskonfigurationen anlegen
touch airbyte/connections/stripe_to_postgres.json
touch airbyte/connections/salesforce_to_postgres.json
touch airbyte/connections/app_postgres_to_warehouse.json

# Skripte anlegen
touch scripts/seed_dev_data.sh
touch scripts/backfill_date_range.py
touch scripts/reconcile_stripe_mrr.sql

# docker-compose für lokalen Airflow-Stack
cat > docker/docker-compose.yml << 'EOF'
version: "3.9"
x-airflow-common: &airflow-common
  image: data-pipeline-airflow:local
  build:
    context: ..
    dockerfile: docker/Dockerfile.airflow
  environment:
    AIRFLOW__CORE__EXECUTOR: CeleryExecutor
    AIRFLOW__DATABASE__SQL_ALCHEMY_CONN: postgresql+psycopg2://airflow:airflow@postgres/airflow
    AIRFLOW__CELERY__BROKER_URL: redis://redis:6379/0
    AIRFLOW__CELERY__RESULT_BACKEND: db+postgresql://airflow:airflow@postgres/airflow
    AIRFLOW__CORE__FERNET_KEY: "${AIRFLOW_FERNET_KEY}"
    AIRFLOW__CORE__DAGS_ARE_PAUSED_AT_CREATION: "true"
    AIRFLOW__CORE__LOAD_EXAMPLES: "false"
    DBT_PROJECT_DIR: /opt/airflow/dbt
    DBT_PROFILES_DIR: /opt/airflow/dbt
    DBT_TARGET: dev
  volumes:
    - ./airflow/dags:/opt/airflow/dags
    - ./airflow/plugins:/opt/airflow/plugins
    - ./airflow/logs:/opt/airflow/logs
    - ./dbt:/opt/airflow/dbt
    - ./great_expectations:/opt/airflow/great_expectations
  depends_on:
    postgres:
      condition: service_healthy
    redis:
      condition: service_healthy

services:
  webserver:
    <<: *airflow-common
    command: webserver
    ports:
      - "8080:8080"
    healthcheck:
      test: ["CMD", "curl", "--fail", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 5

  scheduler:
    <<: *airflow-common
    command: scheduler

  worker:
    <<: *airflow-common
    command: celery worker

  triggerer:
    <<: *airflow-common
    command: triggerer

  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: airflow
      POSTGRES_PASSWORD: airflow
      POSTGRES_DB: airflow
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U airflow"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5

volumes:
  postgres_data:
EOF

# Makefile
cat > Makefile << 'EOF'
.PHONY: dev dbt-run dbt-test dbt-compile dbt-docs ge-check lint seed airflow-init

dev:
	docker compose -f docker/docker-compose.yml up -d
	docker compose -f docker/docker-compose.yml exec webserver airflow db migrate
	docker compose -f docker/docker-compose.yml exec webserver airflow users create \
	  --username admin --password admin --firstname Admin --lastname User \
	  --role Admin --email admin@example.com

dbt-compile:
	cd dbt && dbt compile --target dev

dbt-run:
	cd dbt && dbt run --target dev

dbt-test:
	cd dbt && dbt test --target dev

dbt-run-select:
	cd dbt && dbt run --select $(MODEL) --target dev

dbt-source-freshness:
	cd dbt && dbt source freshness --target dev

dbt-docs:
	cd dbt && dbt docs generate --target dev && dbt docs serve

ge-check:
	uv run great_expectations checkpoint run dim_customers_checkpoint
	uv run great_expectations checkpoint run fct_orders_checkpoint
	uv run great_expectations checkpoint run fct_mrr_checkpoint

seed:
	cd dbt && dbt seed --target dev

install-deps:
	cd dbt && dbt deps

lint:
	uv run sqlfluff lint dbt/models/ --dialect postgres
	uv run ruff check airflow/

backfill:
	uv run python scripts/backfill_date_range.py --start $(START) --end $(END)
EOF

touch .env.example .gitignore requirements.txt

# .gitignore
cat > .gitignore << 'EOF'
# dbt
dbt/profiles.yml
dbt/target/
dbt/dbt_packages/
dbt/logs/

# Python
__pycache__/
*.pyc
.venv/
.env

# Airflow
airflow/logs/

# GE
great_expectations/uncommitted/

# Lokal
.DS_Store
EOF

# UitKit-Skills installieren
npx uitkit add skill data-ml/de/stakeholder-report
npx uitkit add skill data-ml/dbt-model-builder
npx uitkit add skill data-ml/ge-suite-authoring
npx uitkit add skill data-ml/airflow-dag-builder
npx uitkit add skill data-ml/sql-query-optimizer
npx uitkit add skill git/pr-description
npx uitkit add skill productivity/test-generator

echo "Data-Pipeline-Scaffold abgeschlossen. Nächste Schritte:"
echo "  1. cp .env.example .env && AIRFLOW_FERNET_KEY, WAREHOUSE_URL usw. ausfüllen"
echo "  2. Warehouse-Zugangsdaten in dbt/profiles.yml eintragen (in .gitignore)"
echo "  3. make install-deps && make dev"
echo "  4. Airflow unter http://localhost:8080 öffnen"
```

## CLAUDE.md-Vorlage

```markdown
# Data Pipeline — dbt + Airflow

Produktive ELT-Pipeline: Airbyte nimmt Rohdaten auf, dbt transformiert sie durch Staging-,
Intermediate- und Mart-Schichten, Great Expectations validiert die Mart-Qualität, und Airflow
orchestriert den gesamten täglichen und stündlichen Zeitplan.

## Stack

- dbt Core 1.8+ (dbt-postgres Adapter für lokal/Staging, dbt-bigquery für Produktion)
- Apache Airflow 2.9+ (CeleryExecutor in Produktion, LocalExecutor in Entwicklung)
- PostgreSQL 16 (Entwicklungs- + Staging-Warehouse) / BigQuery (Produktions-Warehouse)
- Great Expectations 0.18+ — Expectation Suites pro Mart, als Airflow-Tasks ausgeführt
- Airbyte 0.50+ — Verbindungskonfigurationen versioniert in airbyte/connections/
- sqlfluff (SQL-Linting), ruff (Python-Linting für DAGs und Plugins)

## Schichtenkonventionen für Modelle

Immer dem Muster source → staging → intermediate → mart folgen. Schichten nie überspringen.

| Schicht | Pfad | Materialisierung | Regel |
|---|---|---|---|
| Staging | models/staging/<source>/ | view | Ein Modell pro Source-Tabelle. Nur umbenennen, casten und deduplizieren. Keine Joins. |
| Intermediate | models/intermediate/ | ephemeral | Business-Logic-Joins. Keine direkten Source-Referenzen — nur Staging-Refs. |
| Marts | models/marts/<domain>/ | table | Von BI abfragbar. dim_-Präfix für Dimensionen, fct_ für Fakten. |

Namensschema: `stg_<source>__<table>.sql` (doppelter Unterstrich trennt Source von Tabelle).
Beispiele: `stg_stripe__charges.sql`, `stg_salesforce__opportunities.sql`.

## Neues dbt-Modell hinzufügen (genaue Schritte)

### 1. Source deklarieren (falls neue Source-Tabelle)

In `dbt/models/staging/_sources/src_<source>.yml` eintragen:

```yaml
sources:
  - name: stripe
    database: "{{ env_var('WAREHOUSE_DB') }}"
    schema: raw_stripe
    freshness:
      warn_after: {count: 24, period: hour}
      error_after: {count: 48, period: hour}
    tables:
      - name: charges
        loaded_at_field: created
```

### 2. Staging-Modell schreiben

Datei: `dbt/models/staging/stripe/stg_stripe__charges.sql`

```sql
with source as (
    select * from {{ source('stripe', 'charges') }}
),
renamed as (
    select
        id                              as charge_id,
        customer                        as customer_id,
        amount                          as amount_cents,
        currency,
        status,
        cast(created as timestamp)      as created_at,
        _airbyte_extracted_at           as ingested_at
    from source
    where _airbyte_normalized_at is not null  -- unvollständige Syncs ausschließen
)
select * from renamed
```

### 3. Intermediate-Modell schreiben (falls benötigt)

Datei: `dbt/models/intermediate/int_customer_orders.sql`
- Nur Staging-Modelle referenzieren: `{{ ref('stg_stripe__charges') }}`
- Keine direkten `{{ source() }}`-Aufrufe in der Intermediate-Schicht

### 4. Mart-Modell schreiben

Datei: `dbt/models/marts/core/fct_orders.sql`
- Intermediate oder Staging referenzieren: `{{ ref('int_customer_orders') }}`
- Surrogate Key hinzufügen: `{{ dbt_utils.generate_surrogate_key(['order_id', 'created_at']) }}`
- Alle Spalten in `dbt/models/marts/core/schema.yml` dokumentieren

### 5. Tests zu schema.yml hinzufügen

```yaml
models:
  - name: fct_orders
    description: "Eine Zeile pro Bestellung. Granulat: order_id."
    columns:
      - name: order_id
        description: "Natürlicher Schlüssel aus der Anwendungs-DB."
        tests:
          - unique
          - not_null
      - name: revenue_cents
        tests:
          - not_null
          - dbt_expectations.expect_column_values_to_be_between:
              min_value: 0
```

### 6. Lokal ausführen und testen

```bash
# Kompilieren zur Syntaxprüfung
make dbt-compile

# Nur das neue Modell und seine Upstream-Abhängigkeiten ausführen
cd dbt && dbt run --select +fct_orders --target dev

# Tests für das Modell ausführen
cd dbt && dbt test --select fct_orders --target dev

# Source-Aktualität prüfen
make dbt-source-freshness
```

## dbt-Tests ausführen

```bash
# Alle Tests ausführen
make dbt-test

# Tests für ein bestimmtes Modell ausführen
cd dbt && dbt test --select stg_stripe__charges --target dev

# Tests für ein Modell und alle Downstream-Modelle ausführen
cd dbt && dbt test --select stg_stripe__charges+ --target dev

# Nur benutzerdefinierte Singular-Tests ausführen
cd dbt && dbt test --select test_type:singular --target dev

# Nur generische (Schema-)Tests ausführen
cd dbt && dbt test --select test_type:generic --target dev

# CI-Modus: Nur geänderte Modelle und Downstream testen
cd dbt && dbt test --select state:modified+ --defer --state ./state --target dev
```

## Great Expectations Suite erstellen

Neue Suite für einen Mart anlegen, der noch keine hat:

```bash
# Neue Suite interaktiv initialisieren
uv run great_expectations suite new

# Oder programmatisch erstellen:
uv run great_expectations suite edit fct_orders
```

Wichtige Expectations, die immer pro Mart-Modell enthalten sein sollten:
- `expect_table_row_count_to_be_between` — Minimum basierend auf bekanntem Tagesvolumen setzen
- `expect_column_values_to_not_be_null` — alle NOT-NULL-Spalten
- `expect_column_values_to_be_unique` — Primärschlüsselspalte
- `expect_column_values_to_be_between` — Geldbeträge (min=0)
- `expect_column_values_to_be_of_type` — kritische Typzusicherungen

Nach dem Schreiben der Suite einen Checkpoint anlegen:

```yaml
# great_expectations/checkpoints/fct_orders_checkpoint.yml
name: fct_orders_checkpoint
config_version: 1
class_name: SimpleCheckpoint
validations:
  - batch_request:
      datasource_name: warehouse
      data_connector_name: default_inferred_data_connector_name
      data_asset_name: marts.core.fct_orders
    expectation_suite_name: fct_orders
```

Ausführen:
```bash
uv run great_expectations checkpoint run fct_orders_checkpoint
```

## DAG-Namenskonventionen

DAG-ID-Format: `<domain>__<beschreibung>_<takt>`
Beispiele:
- `ingest__stripe_daily` — Stripe-Airbyte-Sync, täglich
- `transform__dbt_daily` — Vollständige dbt-Mart-Aktualisierung, täglich
- `transform__dbt_hourly_staging` — Nur Staging-Modelle, stündlich
- `quality__ge_mart_checks` — GE-Checkpoints nach dbt run

Regeln:
- Domain-Präfix: `ingest`, `transform`, `quality`, `export`, `alert`
- Doppelter Unterstrich trennt Domain von Beschreibung
- `_daily`, `_hourly`, `_weekly` als Suffix für geplante DAGs
- Standard-Retry: 2 Versuche, 5-Minuten-Verzögerung, email_on_failure=False (Slack-Callback verwenden)
- Alle DAGs müssen `owner`, `start_date`, `tags` in `default_args` setzen

Retry- und Alert-Muster in jedem DAG:

```python
from airflow.utils.dates import days_ago
from airflow.dags.utils.slack_alerts import task_fail_slack_alert

default_args = {
    "owner": "data-engineering",
    "retries": 2,
    "retry_delay": timedelta(minutes=5),
    "on_failure_callback": task_fail_slack_alert,
    "email_on_failure": False,
}

with DAG(
    dag_id="transform__dbt_daily",
    default_args=default_args,
    schedule_interval="0 5 * * *",
    start_date=days_ago(1),
    catchup=False,
    tags=["dbt", "transform", "daily"],
) as dag:
    ...
```

## Deploy-Workflow

Bei PR (dbt-ci.yml):
1. dbt-State-Artefakt aus GCS/S3 abrufen (letzter Produktionslauf)
2. `dbt compile` — bei Syntaxfehlern sofort abbrechen
3. `dbt test --select state:modified+ --defer --state ./state` — nur geänderte + Downstream testen

Beim Merge in main (deploy.yml):
1. `dbt run --target prod` — vollständige Mart-Aktualisierung
2. `dbt test --target prod` — alle Tests auf frischen Daten
3. `great_expectations checkpoint run` — alle Mart-Checkpoints
4. Neues dbt-State-Artefakt nach GCS/S3 hochladen (wird vom nächsten PR-CI-Lauf verwendet)
5. Airflow-DAG via REST API auslösen, um den nächsten geplanten Lauf als freigegeben zu markieren

## Umgebungsvariablen

- `WAREHOUSE_URL` — `postgresql+psycopg2://user:pass@host/db` (Entwicklung/Staging)
- `WAREHOUSE_DB` — Datenbankname (in Source-Deklarationen via env_var verwendet)
- `DBT_PROJECT_DIR` — Absoluter Pfad zum dbt/-Verzeichnis
- `DBT_PROFILES_DIR` — Verzeichnis mit profiles.yml (in .gitignore)
- `DBT_TARGET` — `dev`, `staging` oder `prod`
- `AIRFLOW_FERNET_KEY` — 32-Byte URL-sicherer Base64-Schlüssel (generieren: `python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"`)
- `AIRBYTE_API_URL` — `http://localhost:8000` (Entwicklung) oder produktiver Airbyte-Host
- `AIRBYTE_API_KEY` — Airbyte-Workspace-API-Token
- `SLACK_WEBHOOK_URL` — Eingehender Webhook für den #data-alerts-Kanal
- `GE_DATA_DOCS_SITE` — S3/GCS-URL, unter der GE Data Docs veröffentlicht werden

## Was nicht zu tun ist

- `{{ source() }}` nicht in Intermediate- oder Mart-Modellen verwenden — nur in Staging
- Keine Joins in Staging-Modellen schreiben — eine Source-Tabelle rein, ein Staging-Modell raus
- Keine schema.yml-Einträge für Mart-Spalten auslassen — Docs und Tests benötigen sie beide
- Kein `LIMIT` zu Mart-Modellen hinzufügen — dbt-Variablen für Dev-Sampling verwenden, falls nötig
- DAGs nicht mit Leerzeichen oder CamelCase benennen — immer snake_case mit domain__-Präfix
- Keine Warehouse-Zugangsdaten in profiles.yml hardcoden — env_var()-Aufrufe verwenden
- `dbt run --full-refresh` nicht in Produktion ausführen, ohne vorher eine Nachricht im Incident-Kanal zu hinterlassen
```

## MCP-Server

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/path/to/data-pipeline"
      ]
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "${WAREHOUSE_URL}"
      }
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "bigquery": {
      "command": "npx",
      "args": ["-y", "@motherduck/mcp-server-motherduck"],
      "env": {
        "motherduck_token": "${MOTHERDUCK_TOKEN}"
      }
    },
    "airflow": {
      "command": "npx",
      "args": ["-y", "@apache-airflow/mcp-server"],
      "env": {
        "AIRFLOW_BASE_URL": "${AIRFLOW_API_URL}",
        "AIRFLOW_USERNAME": "${AIRFLOW_USERNAME}",
        "AIRFLOW_PASSWORD": "${AIRFLOW_PASSWORD}"
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
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$FILE\" == *.sql ]]; then uv run sqlfluff fix --dialect postgres \"$FILE\" 2>/dev/null || true; fi; if [[ \"$FILE\" == *.py ]] && echo \"$FILE\" | grep -q \"airflow/\"; then uv run ruff format \"$FILE\" 2>/dev/null || true; uv run ruff check --fix \"$FILE\" 2>/dev/null || true; fi'"
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
            "command": "bash -c 'CMD=\"$CLAUDE_TOOL_INPUT_COMMAND\"; if echo \"$CMD\" | grep -qE \"dbt run.*--full-refresh\"; then echo \"[HOOK] WARNUNG: --full-refresh löscht und erstellt alle Tabellen neu. Bitte bestätigen, dass dies für das Target beabsichtigt ist: $(echo $CMD | grep -oP -- \"--target \\S+\" || echo dev).\" >&2; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'cd \"${CLAUDE_PROJECT_DIR:-$PWD}/dbt\" 2>/dev/null || exit 0; SCHEMA_MISSING=$(find models/marts -name \"schema.yml\" | wc -l); MART_DIRS=$(find models/marts -mindepth 1 -maxdepth 1 -type d | wc -l); if [ \"$SCHEMA_MISSING\" -lt \"$MART_DIRS\" ]; then echo \"[Hinweis] Einige Mart-Unterverzeichnisse haben keine schema.yml — Spaltenbeschreibungen und Tests vor dem PR-Öffnen hinzufügen.\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Zu installierende Skills

```bash
npx uitkit add skill data-ml/dbt-model-builder
npx uitkit add skill data-ml/ge-suite-authoring
npx uitkit add skill data-ml/airflow-dag-builder
npx uitkit add skill data-ml/sql-query-optimizer
npx uitkit add skill data-ml/de/stakeholder-report
npx uitkit add skill productivity/test-generator
npx uitkit add skill git/pr-description
npx uitkit add skill devops-infra/de/oncall-runbook
```

## Verwandte Ressourcen

- [Leitfaden für Data Engineers](../guides/for-data-engineers.md)
- [dbt-Modell-Entwicklungsworkflow](../workflows/dbt-model-development.md)
