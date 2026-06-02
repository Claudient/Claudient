# Pipeline de données (dbt + Airflow) — Structure de projet

> Pour les ingénieurs de données qui maintiennent un pipeline ELT en production — optimisant le cycle complet depuis l'ingestion brute jusqu'aux tables de mart validées et prêtes pour la BI, en passant par les transformations dbt.

## Stack

- **Transformations :** dbt Core 1.8+ (Python 3.11+, adaptateur dbt-postgres ou dbt-bigquery)
- **Orchestration :** Apache Airflow 2.9+ (LocalExecutor en dev, CeleryExecutor en prod)
- **Entrepôt :** PostgreSQL 16 ou BigQuery (adaptateur configurable via profiles.yml)
- **Ingestion :** Airbyte 0.50+ (configurations de connexion versionnées dans airbyte/)
- **Qualité des données :** Great Expectations 0.18+ (suites par mart, points de contrôle Airflow)
- **Opérateurs personnalisés :** Python 3.11+ (plugins Airflow avec sous-classes BaseOperator)
- **Conteneurisation :** Docker 25 + docker-compose v2 (webserver, scheduler, worker, triggerer Airflow)
- **CI/CD :** GitHub Actions (dbt compile + test sur PR, déploiement à la fusion sur main)
- **BI :** Metabase 0.49+ (lecture depuis le schéma mart ; couche sémantique via dbt exposures)
- **Gestion des secrets :** Connexions Airflow + Variables (prod) ; fichiers .env (dev local)

## Arborescence du projet

```
data-pipeline/
├── .github/
│   └── workflows/
│       ├── dbt-ci.yml                           # PR : dbt compile, dbt test --select state:modified+
│       └── deploy.yml                           # Fusion sur main : dbt run --target prod, points de contrôle GE
├── dbt/
│   ├── dbt_project.yml                          # Nom du projet, version, chemins des modèles/tests/seeds, variables
│   ├── profiles.yml                             # Cibles dev/prod — NE PAS COMMITTER (dans .gitignore)
│   ├── packages.yml                             # dbt-utils, dbt-expectations, elementary-data
│   ├── sources.yml                              # Déclarations de sources de premier niveau (obsolète — déplacer vers models/)
│   ├── analyses/
│   │   ├── cohort_retention.sql                 # Analyse ad-hoc compilée mais non matérialisée
│   │   └── revenue_reconciliation.sql           # Requête de validation financière exécutée mensuellement
│   ├── macros/
│   │   ├── generate_schema_name.sql             # Surcharge du nommage de schéma : env_prefix + custom_schema
│   │   ├── cents_to_dollars.sql                 # Macro de conversion d'unité monétaire
│   │   ├── safe_divide.sql                      # Division avec protection contre les dénominateurs nuls
│   │   ├── surrogate_key_from_columns.sql       # Encapsule dbt_utils.generate_surrogate_key
│   │   └── current_timestamp_utc.sql            # Macro d'horodatage UTC indépendante de l'adaptateur
│   ├── models/
│   │   ├── staging/
│   │   │   ├── _sources/
│   │   │   │   ├── src_stripe.yml               # Source Stripe : tables, colonnes, contrôles de fraîcheur
│   │   │   │   ├── src_salesforce.yml           # Source Salesforce : comptes, opportunités, contacts
│   │   │   │   └── src_postgres_app.yml         # Source DB applicative : utilisateurs, commandes, événements
│   │   │   ├── stripe/
│   │   │   │   ├── stg_stripe__charges.sql      # Renommage, cast, déduplication de stripe.charges brut
│   │   │   │   ├── stg_stripe__customers.sql    # Renommage, cast de stripe.customers brut
│   │   │   │   └── stg_stripe__invoices.sql     # Renommage, cast, ajout d'un champ de statut dérivé
│   │   │   ├── salesforce/
│   │   │   │   ├── stg_salesforce__accounts.sql      # Comptes CRM normalisés
│   │   │   │   ├── stg_salesforce__opportunities.sql  # Étape et montant de l'opportunité normalisés
│   │   │   │   └── stg_salesforce__contacts.sql       # Contacts avec FK vers les comptes
│   │   │   └── app/
│   │   │       ├── stg_app__users.sql           # Utilisateurs avec domaine email analysé, source d'inscription
│   │   │       ├── stg_app__orders.sql          # Commandes avec dépliage des lignes
│   │   │       └── stg_app__events.sql          # Flux d'événements : pages vues, utilisation des fonctionnalités
│   │   ├── intermediate/
│   │   │   ├── int_customer_orders.sql          # Jointure stg_app__orders + stg_stripe__charges
│   │   │   ├── int_user_activity_sessions.sql   # Sessionisation du flux d'événements (règle d'écart 30 min)
│   │   │   ├── int_opportunity_stages.sql       # Historique des étapes Salesforce avec colonnes de décalage
│   │   │   └── int_revenue_by_customer.sql      # Agrégation des charges + factures par customer_id
│   │   └── marts/
│   │       ├── core/
│   │       │   ├── schema.yml                   # Descriptions + tests pour tous les modèles de mart core
│   │       │   ├── dim_customers.sql            # Dimension client SCD Type 1
│   │       │   ├── dim_products.sql             # Dimension catalogue produits
│   │       │   ├── fct_orders.sql               # Table de faits au grain commande (une ligne par commande)
│   │       │   └── fct_revenue.sql              # Grain revenus (une ligne par ligne de charge/facture)
│   │       ├── finance/
│   │       │   ├── schema.yml                   # Descriptions + tests du mart finance
│   │       │   ├── fct_mrr.sql                  # Revenus récurrents mensuels : expansion/contraction/attrition
│   │       │   └── fct_invoices_reconciled.sql  # Factures Stripe rapprochées des opportunités Salesforce
│   │       └── product/
│   │           ├── schema.yml                   # Descriptions + tests du mart produit
│   │           ├── fct_feature_adoption.sql     # Événements d'utilisation des fonctionnalités pivotés au grain utilisateur-fonctionnalité
│   │           └── fct_retention_cohorts.sql    # Matrice de rétention par cohorte hebdomadaire
│   ├── seeds/
│   │   ├── exchange_rates.csv                   # Taux de change mensuels statiques pour la conversion de devises
│   │   └── country_codes.csv                    # Correspondance code ISO 3166-1 alpha-2 vers région
│   └── tests/
│       ├── assert_fct_orders_no_negative_revenue.sql   # Test singulier personnalisé : revenue >= 0
│       ├── assert_mrr_reconciles_to_stripe.sql         # Le total MRR correspond à la somme des charges Stripe
│       └── assert_no_orphaned_order_customers.sql      # Chaque customer_id de fct_orders existe dans dim_customers
├── airflow/
│   ├── dags/
│   │   ├── ingest__stripe_daily.py              # Déclenche la synchronisation Airbyte Stripe (quotidien 02:00 UTC)
│   │   ├── ingest__salesforce_daily.py          # Déclenche la synchronisation Airbyte Salesforce (quotidien 03:00 UTC)
│   │   ├── transform__dbt_daily.py              # dbt run + dbt test actualisation complète (quotidien 05:00 UTC)
│   │   ├── transform__dbt_hourly_staging.py     # dbt run --select staging (horaire, incrémental)
│   │   ├── quality__ge_mart_checks.py           # Points de contrôle Great Expectations après dbt run
│   │   └── utils/
│   │       ├── __init__.py
│   │       ├── dag_factory.py                   # Aide build_dbt_dag() : logique partagée de retry et d'alerte
│   │       └── slack_alerts.py                  # on_failure_callback : publication sur le canal #data-alerts
│   ├── plugins/
│   │   ├── __init__.py
│   │   ├── dbt_operator.py                      # DbtRunOperator, DbtTestOperator, DbtSourceFreshnessOperator
│   │   ├── airbyte_operator.py                  # AirbyteTriggerSyncOperator avec sondage + délai d'expiration
│   │   └── ge_operator.py                       # GreatExpectationsOperator encapsulant l'exécution du point de contrôle GE
│   └── config/
│       ├── airflow.cfg                          # Configuration Airflow principale (surchargée par les variables d'env en prod)
│       └── webserver_config.py                  # Config du backend d'authentification (Google OAuth ou LDAP)
├── great_expectations/
│   ├── great_expectations.yml                   # Config projet GE : source de données, backends de stockage
│   ├── expectations/
│   │   ├── dim_customers.json                   # Suite d'expectations pour le mart dim_customers
│   │   ├── fct_orders.json                      # Suite d'expectations pour le mart fct_orders
│   │   └── fct_mrr.json                         # Suite d'expectations pour le mart fct_mrr
│   └── checkpoints/
│       ├── dim_customers_checkpoint.yml         # Point de contrôle : exécution de la suite dim_customers, stockage des résultats
│       ├── fct_orders_checkpoint.yml            # Point de contrôle : exécution de la suite fct_orders, stockage des résultats
│       └── fct_mrr_checkpoint.yml               # Point de contrôle : exécution de la suite fct_mrr, stockage des résultats
├── airbyte/
│   ├── connections/
│   │   ├── stripe_to_postgres.json              # Config de connexion Airbyte : source, dest, streams, planification
│   │   ├── salesforce_to_postgres.json          # Config de connexion Airbyte : synchronisation CRM Salesforce
│   │   └── app_postgres_to_warehouse.json       # CDC depuis la DB applicative vers l'entrepôt
│   └── README.md                                # Comment appliquer les configurations de connexion via l'API Airbyte
├── scripts/
│   ├── seed_dev_data.sh                         # Chargement de snapshots anonymisés dans l'entrepôt de dev
│   ├── backfill_date_range.py                   # Déclenchement de dbt run sur une plage de dates historiques
│   └── reconcile_stripe_mrr.sql                 # Rapprochement MRR ad-hoc avec le tableau de bord Stripe
├── docker/
│   ├── Dockerfile.airflow                       # Étend apache/airflow:2.9, installe dbt + GE
│   └── docker-compose.yml                       # Stack Airflow locale : webserver, scheduler, worker, triggerer, postgres, redis
├── .github/
│   └── workflows/                               # (voir le haut de l'arborescence)
├── .env.example                                 # Toutes les variables d'env avec descriptions (sans valeurs réelles)
├── .gitignore                                   # Exclut profiles.yml, .env, target/, logs/, __pycache__
├── Makefile                                     # Cibles : dev, dbt-run, dbt-test, ge-check, lint, compile
└── requirements.txt                             # Dépendances Python principales : apache-airflow, dbt-core, great_expectations
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `dbt/dbt_project.yml` | Définit le nom du projet, la version dbt épinglée, les chemins des modèles, les valeurs par défaut de matérialisation par couche (staging=view, intermediate=ephemeral, marts=table), et les surcharges `+schema` par dossier |
| `dbt/models/staging/_sources/src_stripe.yml` | Déclare la source Stripe brute avec des seuils de fraîcheur au niveau des tables (`warn_after: 24h`, `error_after: 48h`) ; référencée comme `{{ source('stripe', 'charges') }}` dans les modèles de staging |
| `dbt/models/marts/core/schema.yml` | Descriptions au niveau des colonnes et tests génériques (`unique`, `not_null`, `relationships`, `accepted_values`) pour tous les modèles de mart core ; alimente la documentation dbt et le catalogue de données |
| `airflow/dags/transform__dbt_daily.py` | DAG quotidien principal : attend les DAGs d'ingestion via ExternalTaskSensor, exécute DbtRunOperator (actualisation complète des marts), puis DbtTestOperator, puis déclenche le DAG quality__ge_mart_checks |
| `airflow/plugins/dbt_operator.py` | `DbtRunOperator` et `DbtTestOperator` personnalisés ; lit `DBT_PROJECT_DIR`, `DBT_PROFILES_DIR`, `DBT_TARGET` depuis les Variables Airflow ; remonte les codes de sortie dbt comme échecs de tâches |
| `great_expectations/expectations/fct_orders.json` | Suite d'expectations GE pour fct_orders : bornes du nombre de lignes, unicité de `order_id`, non-négativité de `revenue_cents`, complétude référentielle de `customer_id`, fraîcheur de `order_date` |
| `.github/workflows/dbt-ci.yml` | Sur PR : récupère l'artefact d'état dbt depuis S3/GCS, exécute `dbt compile`, exécute `dbt test --select state:modified+ --defer --state ./state` pour tester uniquement les modèles modifiés et leurs dépendances aval |
| `docker/docker-compose.yml` | Stack Airflow locale : webserver sur :8080, scheduler, worker (CeleryExecutor), triggerer, PostgreSQL 16 (DB de métadonnées + entrepôt de dev), Redis 7 (broker Celery) |

## Initialisation rapide

```bash
# Prérequis : Python 3.11+, Docker, uv (pip install uv)
PROJECT=data-pipeline
mkdir -p $PROJECT && cd $PROJECT

# Environnement Python
uv init --python 3.11
uv add apache-airflow==2.9.* dbt-core==1.8.* dbt-postgres great_expectations==0.18.*

# Structure du répertoire dbt
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

# Structure du répertoire Airflow
mkdir -p airflow/dags/utils
mkdir -p airflow/plugins
mkdir -p airflow/config

# Great Expectations, Airbyte, scripts, docker, CI
mkdir -p great_expectations/expectations
mkdir -p great_expectations/checkpoints
mkdir -p airbyte/connections
mkdir -p scripts
mkdir -p docker
mkdir -p .github/workflows

# Initialisation du projet dbt
uv run dbt init dbt --skip-profile-setup 2>/dev/null || true

# Écriture de dbt_project.yml
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

# Écriture de packages.yml
cat > dbt/packages.yml << 'EOF'
packages:
  - package: dbt-labs/dbt_utils
    version: [">=1.2.0", "<2.0.0"]
  - package: calogica/dbt_expectations
    version: [">=0.10.0", "<1.0.0"]
  - package: elementary-data/elementary
    version: [">=0.14.0", "<1.0.0"]
EOF

# Création des fichiers de modèles clés
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

# Création des fichiers Airflow
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

# Création des fichiers GE
touch great_expectations/great_expectations.yml
touch great_expectations/expectations/dim_customers.json
touch great_expectations/expectations/fct_orders.json
touch great_expectations/expectations/fct_mrr.json
touch great_expectations/checkpoints/dim_customers_checkpoint.yml
touch great_expectations/checkpoints/fct_orders_checkpoint.yml
touch great_expectations/checkpoints/fct_mrr_checkpoint.yml

# Création des configurations de connexion Airbyte
touch airbyte/connections/stripe_to_postgres.json
touch airbyte/connections/salesforce_to_postgres.json
touch airbyte/connections/app_postgres_to_warehouse.json

# Création des scripts
touch scripts/seed_dev_data.sh
touch scripts/backfill_date_range.py
touch scripts/reconcile_stripe_mrr.sql

# docker-compose pour Airflow local
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

# Local
.DS_Store
EOF

# Installation des compétences Claudient
npx claudient add skill data-ml/de/stakeholder-report
npx claudient add skill data-ml/dbt-model-builder
npx claudient add skill data-ml/ge-suite-authoring
npx claudient add skill data-ml/airflow-dag-builder
npx claudient add skill data-ml/sql-query-optimizer
npx claudient add skill git/pr-description
npx claudient add skill productivity/test-generator

echo "Initialisation du pipeline de données terminée. Prochaines étapes :"
echo "  1. cp .env.example .env && renseigner AIRFLOW_FERNET_KEY, WAREHOUSE_URL, etc."
echo "  2. Ajouter les identifiants d'entrepôt dans dbt/profiles.yml (dans .gitignore)"
echo "  3. make install-deps && make dev"
echo "  4. Ouvrir Airflow sur http://localhost:8080"
```

## Modèle CLAUDE.md

```markdown
# Pipeline de données — dbt + Airflow

Pipeline ELT en production : Airbyte ingère les données brutes, dbt les transforme à travers
les couches staging → intermediate → mart, Great Expectations valide la qualité des marts,
et Airflow orchestre le planning complet quotidien et horaire.

## Stack

- dbt Core 1.8+ (adaptateur dbt-postgres pour local/staging, dbt-bigquery pour prod)
- Apache Airflow 2.9+ (CeleryExecutor en prod, LocalExecutor en dev)
- PostgreSQL 16 (entrepôt dev + staging) / BigQuery (entrepôt de production)
- Great Expectations 0.18+ — suites d'expectations par mart, exécutées comme tâches Airflow
- Airbyte 0.50+ — configurations de connexion versionnées dans airbyte/connections/
- sqlfluff (linting SQL), ruff (linting Python pour les DAGs et plugins)

## Conventions de couches de modèles

Toujours suivre le schéma source → staging → intermediate → mart. Ne jamais sauter de couches.

| Couche | Emplacement | Matérialisation | Règle |
|---|---|---|---|
| Staging | models/staging/<source>/ | view | Un modèle par table source. Renommage + cast + déduplication uniquement. Pas de jointures. |
| Intermediate | models/intermediate/ | ephemeral | Jointures de logique métier. Pas de références de source directes — uniquement des refs vers le staging. |
| Marts | models/marts/<domaine>/ | table | Interrogeable par la BI. Préfixe dim_ pour les dimensions, fct_ pour les faits. |

Schéma de nommage : `stg_<source>__<table>.sql` (double tiret bas séparant la source de la table).
Exemples : `stg_stripe__charges.sql`, `stg_salesforce__opportunities.sql`.

## Ajout d'un nouveau modèle dbt (étapes exactes)

### 1. Déclarer la source (si nouvelle table source)

Ajouter dans `dbt/models/staging/_sources/src_<source>.yml` :

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

### 2. Écrire le modèle de staging

Fichier : `dbt/models/staging/stripe/stg_stripe__charges.sql`

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
    where _airbyte_normalized_at is not null  -- exclure les synchronisations partielles
)
select * from renamed
```

### 3. Écrire le modèle intermédiaire (si nécessaire)

Fichier : `dbt/models/intermediate/int_customer_orders.sql`
- Référencer uniquement les modèles de staging : `{{ ref('stg_stripe__charges') }}`
- Pas d'appels directs à `{{ source() }}` dans la couche intermédiaire

### 4. Écrire le modèle de mart

Fichier : `dbt/models/marts/core/fct_orders.sql`
- Référencer l'intermédiaire ou le staging : `{{ ref('int_customer_orders') }}`
- Ajouter une clé de substitution : `{{ dbt_utils.generate_surrogate_key(['order_id', 'created_at']) }}`
- Documenter toutes les colonnes dans `dbt/models/marts/core/schema.yml`

### 5. Ajouter des tests à schema.yml

```yaml
models:
  - name: fct_orders
    description: "Une ligne par commande. Grain : order_id."
    columns:
      - name: order_id
        description: "Clé naturelle depuis la DB applicative."
        tests:
          - unique
          - not_null
      - name: revenue_cents
        tests:
          - not_null
          - dbt_expectations.expect_column_values_to_be_between:
              min_value: 0
```

### 6. Exécuter et tester localement

```bash
# Compiler pour vérifier la syntaxe
make dbt-compile

# Exécuter uniquement votre nouveau modèle et ses dépendances amont
cd dbt && dbt run --select +fct_orders --target dev

# Exécuter les tests pour votre modèle
cd dbt && dbt test --select fct_orders --target dev

# Vérifier la fraîcheur des sources
make dbt-source-freshness
```

## Exécution des tests dbt

```bash
# Exécuter tous les tests
make dbt-test

# Exécuter les tests pour un modèle spécifique
cd dbt && dbt test --select stg_stripe__charges --target dev

# Exécuter les tests pour un modèle et toutes ses dépendances aval
cd dbt && dbt test --select stg_stripe__charges+ --target dev

# Exécuter uniquement les tests singuliers personnalisés
cd dbt && dbt test --select test_type:singular --target dev

# Exécuter uniquement les tests génériques (schéma)
cd dbt && dbt test --select test_type:generic --target dev

# Mode CI : tester uniquement les modèles modifiés et leurs dépendances aval
cd dbt && dbt test --select state:modified+ --defer --state ./state --target dev
```

## Création d'une suite Great Expectations

Créer une nouvelle suite pour un mart qui n'en a pas encore :

```bash
# Initialiser une nouvelle suite de manière interactive
uv run great_expectations suite new

# Ou créer de façon programmatique :
uv run great_expectations suite edit fct_orders
```

Expectations clés à toujours inclure par modèle de mart :
- `expect_table_row_count_to_be_between` — définir le minimum selon le volume quotidien connu
- `expect_column_values_to_not_be_null` — toutes les colonnes NOT NULL
- `expect_column_values_to_be_unique` — colonne de clé primaire
- `expect_column_values_to_be_between` — montants monétaires (min=0)
- `expect_column_values_to_be_of_type` — assertions de type critique

Après l'écriture de la suite, créer un point de contrôle :

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

L'exécuter :
```bash
uv run great_expectations checkpoint run fct_orders_checkpoint
```

## Conventions de nommage des DAGs

Format d'identifiant de DAG : `<domaine>__<description>_<cadence>`
Exemples :
- `ingest__stripe_daily` — synchronisation Airbyte Stripe, exécutée quotidiennement
- `transform__dbt_daily` — actualisation complète des marts dbt, exécutée quotidiennement
- `transform__dbt_hourly_staging` — modèles de staging uniquement, exécutés toutes les heures
- `quality__ge_mart_checks` — points de contrôle GE après dbt run

Règles :
- Préfixe de domaine : `ingest`, `transform`, `quality`, `export`, `alert`
- Double tiret bas séparant le domaine de la description
- Suffixe `_daily`, `_hourly`, `_weekly` pour les DAGs planifiés
- Retry par défaut : 2 tentatives, délai de 5 minutes, email_on_failure=False (utiliser le callback Slack)
- Tous les DAGs doivent définir `owner`, `start_date`, `tags` dans `default_args`

Schéma de retry et d'alerte dans chaque DAG :

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

## Processus de déploiement

Sur PR (dbt-ci.yml) :
1. Récupération de l'artefact d'état dbt depuis GCS/S3 (dernier run en prod)
2. `dbt compile` — échec rapide sur les erreurs de syntaxe
3. `dbt test --select state:modified+ --defer --state ./state` — test des modèles modifiés + dépendances aval uniquement

À la fusion sur main (deploy.yml) :
1. `dbt run --target prod` — actualisation complète des marts
2. `dbt test --target prod` — tous les tests sur les données fraîches
3. `great_expectations checkpoint run` — tous les points de contrôle des marts
4. Téléversement du nouvel artefact d'état dbt vers GCS/S3 (utilisé par le prochain run CI de PR)
5. Déclenchement du DAG Airflow via l'API REST pour marquer le prochain run planifié comme débloqué

## Variables d'environnement

- `WAREHOUSE_URL` — `postgresql+psycopg2://user:pass@host/db` (dev/staging)
- `WAREHOUSE_DB` — nom de la base de données (utilisé dans les déclarations de source via env_var)
- `DBT_PROJECT_DIR` — chemin absolu vers le répertoire dbt/
- `DBT_PROFILES_DIR` — répertoire contenant profiles.yml (dans .gitignore)
- `DBT_TARGET` — `dev`, `staging`, ou `prod`
- `AIRFLOW_FERNET_KEY` — clé base64 URL-safe de 32 octets (générer : `python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"`)
- `AIRBYTE_API_URL` — `http://localhost:8000` (dev) ou hôte Airbyte de production
- `AIRBYTE_API_KEY` — jeton API de l'espace de travail Airbyte
- `SLACK_WEBHOOK_URL` — Webhook entrant pour le canal #data-alerts
- `GE_DATA_DOCS_SITE` — URL S3/GCS où la documentation des données GE est publiée

## Ce qu'il ne faut pas faire

- Ne pas utiliser `{{ source() }}` dans les modèles intermédiaires ou les marts — uniquement dans le staging
- Ne pas écrire de jointures dans les modèles de staging — une table source en entrée, un modèle de staging en sortie
- Ne pas omettre les entrées schema.yml pour les colonnes des marts — la documentation et les tests en dépendent tous deux
- Ne pas ajouter `LIMIT` aux modèles de marts — utiliser des variables dbt pour le sampling en dev si nécessaire
- Ne pas nommer les DAGs avec des espaces ou en CamelCase — toujours en snake_case avec le préfixe domaine__
- Ne pas coder en dur les identifiants de l'entrepôt dans profiles.yml — utiliser des appels env_var()
- Ne pas exécuter `dbt run --full-refresh` en prod sans avoir préalablement posté un message sur le canal d'incident
```

## Serveurs MCP

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

## Hooks recommandés

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
            "command": "bash -c 'CMD=\"$CLAUDE_TOOL_INPUT_COMMAND\"; if echo \"$CMD\" | grep -qE \"dbt run.*--full-refresh\"; then echo \"[HOOK] AVERTISSEMENT : --full-refresh supprimera et recrééra toutes les tables. Confirmez que c'est intentionnel pour la cible : $(echo $CMD | grep -oP -- \"--target \\S+\" || echo dev).\" >&2; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'cd \"${CLAUDE_PROJECT_DIR:-$PWD}/dbt\" 2>/dev/null || exit 0; SCHEMA_MISSING=$(find models/marts -name \"schema.yml\" | wc -l); MART_DIRS=$(find models/marts -mindepth 1 -maxdepth 1 -type d | wc -l); if [ \"$SCHEMA_MISSING\" -lt \"$MART_DIRS\" ]; then echo \"[Rappel] Certains sous-répertoires de mart manquent de schema.yml — ajouter les descriptions de colonnes et les tests avant d'ouvrir une PR.\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Compétences à installer

```bash
npx claudient add skill data-ml/dbt-model-builder
npx claudient add skill data-ml/ge-suite-authoring
npx claudient add skill data-ml/airflow-dag-builder
npx claudient add skill data-ml/sql-query-optimizer
npx claudient add skill data-ml/de/stakeholder-report
npx claudient add skill productivity/test-generator
npx claudient add skill git/pr-description
npx claudient add skill devops-infra/de/oncall-runbook
```

## Liens connexes

- [Guide d'ingénierie des données](../guides/for-data-engineers.md)
- [Processus de développement de modèles dbt](../workflows/dbt-model-development.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
