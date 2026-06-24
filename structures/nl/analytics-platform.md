# Analytics Platform — Projectstructuur

> Voor een data-engineering- en analyticsteam dat de volledige levenscyclus beheert, van ruwe broningestie tot geregisseerde BI-levering, met optimalisatie van pipeline-betrouwbaarheid, metrische consistentie en time-to-insight.

## Stack

- **Ingestie:** Fivetran (beheerde connectoren) of Airbyte 0.50+ (self-hosted, open-source connectoren)
- **Data warehouse:** BigQuery (Google Cloud) of Snowflake (Enterprise / Business Critical)
- **Transformaties:** dbt Core 1.8+ met dbt-bigquery- of dbt-snowflake-adapter
- **Documentatie + tests:** dbt docs, ingebouwde generieke dbt-tests + dbt-expectations, dbt-utils
- **Metrieklaag:** dbt Semantic Layer (MetricFlow 0.200+) met JDBC/ADBC-blootstelling
- **Datakwaliteit:** Soda Core 3.x (checks-as-code) of Great Expectations 0.18+ (GX Cloud)
- **BI / dashboards:** Looker (LookML) of Metabase 0.49+ (open-source)
- **Data-observabiliteit:** Monte Carlo of Bigeye (SaaS; verbindt met warehouse + dbt-manifest)
- **Orkestratie:** dbt Cloud Jobs of Apache Airflow 2.9+ (self-hosted) of Dagster 1.7+
- **Versiebeheer:** GitHub (dbt-project, dbt-profiles-template, CI-workflows)
- **Infrastructuur:** Terraform 1.8+ (BigQuery-datasets, Snowflake-warehouses, IAM, Fivetran-connectoren)
- **Alerting:** Slack (webhook-gebaseerde alerts van Soda, Monte Carlo, dbt Cloud)
- **Secrets:** Google Secret Manager of AWS Secrets Manager; gerefereerd in Terraform + dbt-profielen

## Directorystructuur

```
analytics-platform/                          # Monorepo-root — versiebeheer in GitHub
├── .claude/
│   ├── CLAUDE.md                            # Instructies op repository-niveau voor Claude Code
│   ├── settings.json                        # MCP-servers, hooks, machtigingen
│   └── commands/
│       ├── new-model.md                     # /new-model — staging-/mart-dbt-model + tests genereren
│       ├── run-quality.md                   # /run-quality — Soda-checks uitvoeren tegen een dataset
│       ├── publish-dashboard.md             # /publish-dashboard — Looker-LookML- of Metabase-workflow
│       ├── data-incident.md                 # /data-incident — incident-triage-runbook-prompt
│       └── seed-refresh.md                  # /seed-refresh — dbt-seeds herladen vanuit bron-CSV's
├── .github/
│   └── workflows/
│       ├── ci.yml                           # dbt compile + test bij PR tegen CI-target
│       ├── slim-ci.yml                      # dbt build --select state:modified+ (Slim CI)
│       └── deploy.yml                       # Productie-dbt-run geactiveerd bij merge naar main
├── terraform/                               # Infrastructuur als code
│   ├── environments/
│   │   ├── prod/
│   │   │   ├── main.tf                      # BigQuery / Snowflake productie-resources
│   │   │   ├── variables.tf
│   │   │   └── terraform.tfvars.example     # Voorbeeldvariabelewaarden — echte tfvars worden genegeerd door git
│   │   └── dev/
│   │       ├── main.tf                      # Dev-/staging-warehouse-resources
│   │       └── variables.tf
│   ├── modules/
│   │   ├── bigquery/
│   │   │   ├── datasets.tf                  # Raw-, staging-, marts-, metrics-datasets + IAM
│   │   │   └── service_accounts.tf          # Serviceaccounts voor dbt-runner, Fivetran, Looker
│   │   ├── snowflake/
│   │   │   ├── warehouses.tf                # Virtuele warehouses per workload (ETL, BI, ad-hoc)
│   │   │   ├── databases.tf                 # RAW-, DEV-, PROD-databases + rollen
│   │   │   └── grants.tf                    # Rolgebaseerde rechten: transformer, reporter, loader
│   │   ├── fivetran/
│   │   │   └── connectors.tf                # Fivetran-connectorbronnen (provider: fivetran/fivetran)
│   │   └── iam/
│   │       └── roles.tf                     # IAM-bindingen op basis van het principe van minimale rechten
│   └── README.md                            # Terraform-gebruik + state-backend-instelling
├── dbt/                                     # dbt Core-projectroot
│   ├── dbt_project.yml                      # Projectnaam, versie, modelpaden, standaardvariabelen
│   ├── profiles.yml.template                # Profieltemplate — het echte profiles.yml wordt genegeerd door git
│   ├── packages.yml                         # dbt-utils, dbt-expectations, dbt-date, codegen
│   ├── selectors.yml                        # Benoemde selectors: nightly, finance, marketing
│   ├── seeds/
│   │   ├── country_codes.csv                # Statische referentie: ISO-landcodes
│   │   ├── currency_rates.csv               # Maandelijkse wisselkoersen voor financiële normalisatie
│   │   └── product_taxonomy.csv             # Interne product-/SKU-taxonomie-mapping
│   ├── macros/
│   │   ├── generate_schema_name.sql         # Aangepaste schema-routing per omgeving + target
│   │   ├── cents_to_dollars.sql             # Macro voor valuta-eenheidsconversie
│   │   ├── surrogate_key.sql                # Omhult dbt_utils.generate_surrogate_key
│   │   ├── not_null_proportion.sql          # Aangepaste test: null-percentage in kolom < drempelwaarde
│   │   └── freshness_check.sql              # Macro om maximale rijleeftijd in uren te controleren
│   ├── models/
│   │   ├── staging/                         # 1:1 met brontabellen — alleen lichte opschoning
│   │   │   ├── stripe/
│   │   │   │   ├── _stripe__sources.yml     # Brondefinities + versheidsdrempelwaarden
│   │   │   │   ├── _stripe__models.yml      # Kolomniveau-documentatie + generieke tests voor alle staging-modellen
│   │   │   │   ├── stg_stripe__customers.sql
│   │   │   │   ├── stg_stripe__subscriptions.sql
│   │   │   │   ├── stg_stripe__invoices.sql
│   │   │   │   └── stg_stripe__events.sql
│   │   │   ├── salesforce/
│   │   │   │   ├── _salesforce__sources.yml
│   │   │   │   ├── _salesforce__models.yml
│   │   │   │   ├── stg_salesforce__accounts.sql
│   │   │   │   ├── stg_salesforce__opportunities.sql
│   │   │   │   └── stg_salesforce__contacts.sql
│   │   │   ├── hubspot/
│   │   │   │   ├── _hubspot__sources.yml
│   │   │   │   ├── _hubspot__models.yml
│   │   │   │   ├── stg_hubspot__contacts.sql
│   │   │   │   └── stg_hubspot__deals.sql
│   │   │   └── app_db/                      # Productiedatabasereplica (via Fivetran/Airbyte)
│   │   │       ├── _app_db__sources.yml
│   │   │       ├── _app_db__models.yml
│   │   │       ├── stg_app_db__users.sql
│   │   │       ├── stg_app_db__events.sql
│   │   │       └── stg_app_db__orders.sql
│   │   ├── intermediate/                    # Bedrijfslogica-joins — niet direct blootgesteld aan BI
│   │   │   ├── int_customer_subscriptions.sql   # Gecombineerde klant- + abonnementsgeschiedenis
│   │   │   ├── int_revenue_recognized.sql        # ASC 606 opbrengstverantwoordingsschema-berekening
│   │   │   └── int_user_sessions.sql             # Gesessioneerde gebeurtenisstroom
│   │   └── marts/                           # Definitieve analyticklare modellen blootgesteld aan BI
│   │       ├── core/
│   │       │   ├── _core__models.yml        # Documentatie + tests voor alle core-mart-modellen
│   │       │   ├── dim_customers.sql        # Klantdimensie met attributen + segmenten
│   │       │   ├── dim_products.sql         # Producthierarchie vanuit taxonomie-seed
│   │       │   ├── fct_orders.sql           # Bestellingsfeiten met alle vreemde sleutels + metriek
│   │       │   └── fct_subscriptions.sql    # Abonnementslevenscyclus-gebeurtenissen
│   │       ├── finance/
│   │       │   ├── _finance__models.yml
│   │       │   ├── fct_mrr.sql              # Maandelijks terugkerende omzet per account
│   │       │   ├── fct_arr_movements.sql    # ARR-waterval: nieuw, uitbreiding, churn, inkrimping
│   │       │   └── fct_invoices.sql         # Omzet op factuurniveau met verantwoordingsschema
│   │       └── marketing/
│   │           ├── _marketing__models.yml
│   │           ├── fct_campaigns.sql        # Campagneprestaties: uitgaven, conversies, CAC
│   │           └── fct_attribution.sql      # Multi-touch-attributiemodel
│   ├── metrics/                             # dbt Semantic Layer MetricFlow-definities
│   │   ├── mrr.yml                          # MRR-metriek: meting, dimensies, tijdgranulariteiten
│   │   ├── arr.yml                          # ARR-metriek met filters
│   │   ├── customer_count.yml               # Aantal actieve klanten per segment
│   │   └── cac.yml                          # Klantacquisitiekosten-metriek
│   ├── analyses/                            # Ad-hoc-SQL opgeslagen als dbt-analyses (niet gematerialiseerd)
│   │   └── churn_cohort_analysis.sql        # Cohortretentieanalyse voor kwartaalreviews
│   └── tests/                               # Enkelvoudige datatests (complexe logica, niet generiek)
│       ├── assert_mrr_nonnegative.sql       # MRR mag nooit negatief zijn op accountniveau
│       └── assert_no_duplicate_orders.sql   # Bestelling-ID's moeten uniek zijn over alle bronnen
├── quality/                                 # Datakwaliteitscontroles (Soda of Great Expectations)
│   ├── soda/
│   │   ├── configuration.yml                # Soda Cloud-verbinding + warehouse-inloggegevens
│   │   ├── checks/
│   │   │   ├── staging/
│   │   │   │   ├── stripe_customers.yml     # Versheids-, volledigheids- en formaatcontroles
│   │   │   │   └── salesforce_accounts.yml
│   │   │   └── marts/
│   │   │       ├── fct_mrr.yml              # Omzetnauwkeurigheidscontroles ten opzichte van de bron
│   │   │       └── dim_customers.yml        # PK-uniciteit, referentiële integriteit
│   │   └── scan.sh                          # Ingangspunt: soda scan -d warehouse -c config
│   └── great_expectations/                  # Alternatief: GX Cloud-configuratie
│       ├── great_expectations.yml           # Datasource: BigQuery- of Snowflake-verbinding
│       └── expectations/
│           ├── fct_orders_suite.json        # Expectation suite voor de bestellingsfeitentabel
│           └── dim_customers_suite.json
├── observability/                           # Monte Carlo / Bigeye-configuratie + alertroutering
│   ├── monte_carlo/
│   │   └── monitors.yml                     # Versheids- + volumemonitoren op tabelniveau
│   └── alerts/
│       └── slack_routing.yml                # Alerternstmapping → Slack-kanaal
├── docs/                                    # Aanvullende documentatie
│   ├── data-dictionary.md                   # Bedrijfsglossarium: canonieke metriekdefinities
│   ├── lineage.md                           # Bron-naar-BI-lineagekaart voor sleuteltabellen
│   ├── incident-response.md                 # Datakwaliteitsincident-runbook
│   └── onboarding.md                        # Onboardinggids voor nieuwe data-engineers
├── scripts/
│   ├── bootstrap_dev.sh                     # Lokaal dbt-profiel + warehouse-dev-schema instellen
│   └── validate_manifest.py                 # dbt manifest.json analyseren om dekkingsdrempelwaarden te controleren
├── .env.example                             # Alle vereiste omgevingsvariabelen gedocumenteerd met commentaar
└── .gitignore                               # profiles.yml, target/, dbt_packages/, *.tfvars
```

## Sleutelbestanden uitgelegd

| Pad | Doel |
|---|---|
| `dbt/dbt_project.yml` | Projectconfiguratie: standaard modelmateriaaliseringswaarden per map (staging → view, marts → table), variabelestandaarden voor omgevingsspecifieke logica, doelpad |
| `dbt/macros/generate_schema_name.sql` | Overschrijft dbt's standaard schemanaamgeving zodat dev-runs in een gebruikerspecifiek schema terechtkomen (bijv. `dbt_alice`) in plaats van gedeelde schema's te overschrijven |
| `dbt/models/staging/stripe/_stripe__sources.yml` | Declareert de ruwe Stripe-tabellen als dbt-bronnen met versheidsdrempelwaarden; versheidsfouten van bronnen blokkeren downstream-runs in CI |
| `dbt/metrics/mrr.yml` | MetricFlow Semantic Model-definitie: verwijst naar `fct_mrr`, definieert de `mrr`-meting, ondersteunde dimensies (customer_segment, plan) en tijdgranulariteiten (dag, maand, kwartaal) |
| `quality/soda/checks/marts/fct_mrr.yml` | Soda-checks na dbt: controleert of MRR-som overeenkomt met verwachte tolerantie ten opzichte van de vorige dag, geen nullwaarden in sleutelkolommen, geen negatieve waarden — stuurt Slack-alert bij falen |
| `terraform/modules/bigquery/datasets.tf` | Maakt `raw`-, `staging`-, `marts`- en `metrics`-BigQuery-datasets aan met juist IAM: Fivetran writer → alleen raw; dbt-serviceaccount → staging + marts; Looker → marts + metrics alleen-lezen |
| `dbt/selectors.yml` | Benoemde selectors staan `dbt build --selector nightly` toe om de volledige DAG uit te voeren en `--selector finance` om alleen finance-mart-modellen + hun upstream-afhankelijkheden uit te voeren |
| `.github/workflows/slim-ci.yml` | Gebruikt dbt's Slim CI: vergelijkt het `manifest.json` van de PR met het productie-manifestartefact om alleen in de PR gewijzigde modellen te bouwen en te testen, wat de CI-runtime met 60–80 % vermindert |
| `observability/alerts/slack_routing.yml` | Koppelt alerternstigniveaus aan Slack-kanalen: critical → #data-incidents, warning → #data-quality, info → #data-observability; voorkomt alertmoeheid |
| `docs/data-dictionary.md` | Canonieke definities voor alle bedrijfsmetriek: MRR, ARR, CAC, churn — gerefereerd in dbt-modelbeschrijvingen en Looker-LookML-labels om consistentie te waarborgen |

## Snelle scaffolding

```bash
# Vereisten: Python 3.11+, pip of pipx, Terraform 1.8+, GitHub CLI

# Projectroot aanmaken en daarin navigeren
mkdir analytics-platform && cd analytics-platform
git init

# Python-virtuele-omgeving voor dbt instellen
python -m venv .venv && source .venv/bin/activate

# dbt Core installeren met uw warehouse-adapter
pip install dbt-core==1.8.* dbt-bigquery==1.8.*
# OF voor Snowflake:
# pip install dbt-core==1.8.* dbt-snowflake==1.8.*

# Soda Core installeren
pip install soda-core-bigquery==3.*
# OF voor Snowflake: pip install soda-core-snowflake==3.*

# Afhankelijkheden opslaan
pip freeze > requirements.txt

# dbt-project initialiseren
dbt init dbt --skip-profile-setup
cd dbt

# dbt-pakketten installeren
cat > packages.yml <<'EOF'
packages:
  - package: dbt-labs/dbt_utils
    version: [">=1.1.0", "<2.0.0"]
  - package: calogica/dbt_expectations
    version: [">=0.10.0", "<1.0.0"]
  - package: dbt-labs/codegen
    version: [">=0.12.0", "<1.0.0"]
  - package: calogica/dbt_date
    version: [">=0.10.0", "<1.0.0"]
EOF
dbt deps
cd ..

# Directorystructuur aanmaken
mkdir -p dbt/models/staging/{stripe,salesforce,hubspot,app_db}
mkdir -p dbt/models/intermediate
mkdir -p dbt/models/marts/{core,finance,marketing}
mkdir -p dbt/metrics dbt/analyses dbt/tests dbt/seeds dbt/macros
mkdir -p quality/soda/checks/{staging,marts}
mkdir -p quality/great_expectations/expectations
mkdir -p observability/{monte_carlo,alerts}
mkdir -p terraform/environments/{prod,dev}
mkdir -p terraform/modules/{bigquery,snowflake,fivetran,iam}
mkdir -p docs scripts
mkdir -p .github/workflows
mkdir -p .claude/commands

# Terraform initialiseren
cd terraform && terraform init && cd ..

# .env.example aanmaken
cat > .env.example <<'EOF'
# BigQuery
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
BQ_PROJECT=your-gcp-project-id
BQ_DATASET_RAW=raw
BQ_DATASET_STAGING=staging
BQ_DATASET_MARTS=marts

# Snowflake (alternatief)
SNOWFLAKE_ACCOUNT=yourorg-youraccountname
SNOWFLAKE_USER=dbt_runner
SNOWFLAKE_PRIVATE_KEY_PATH=/path/to/rsa_key.p8
SNOWFLAKE_DATABASE=PROD
SNOWFLAKE_WAREHOUSE=TRANSFORMING

# dbt
DBT_TARGET=dev
DBT_PROFILES_DIR=~/.dbt

# Soda
SODA_API_KEY_ID=your-soda-api-key-id
SODA_API_KEY_SECRET=your-soda-api-key-secret

# Slack-alerting
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx/yyy/zzz
SLACK_CHANNEL_INCIDENTS=#data-incidents

# Monte Carlo
MONTECARLO_API_KEY_ID=your-mc-key-id
MONTECARLO_API_TOKEN=your-mc-token

# Terraform-state
TF_STATE_BUCKET=your-terraform-state-bucket
EOF

# .gitignore aanmaken
cat > .gitignore <<'EOF'
.venv/
dbt/target/
dbt/dbt_packages/
dbt/logs/
profiles.yml
*.tfvars
!*.tfvars.example
.env
*.credentials.json
__pycache__/
.DS_Store
EOF

# Claude Code configureren
touch .claude/CLAUDE.md .claude/settings.json
touch .claude/commands/new-model.md
touch .claude/commands/run-quality.md
touch .claude/commands/publish-dashboard.md
touch .claude/commands/data-incident.md

# UitKit-skills installeren
npx uitkit add skill data-ml/sql
npx uitkit add skill data-ml/dbt-data-pipelines
npx uitkit add skill data-ml/data-quality-checker
npx uitkit add skill data-ml/dashboard-narrator
npx uitkit add skill data-ml/stakeholder-report
npx uitkit add skill devops-infra/terraform
npx uitkit add skill devops-infra/cicd

echo "Analytics-platform opgezet. Volgende stap: profiles.yml configureren, Terraform-backend instellen, dan uitvoeren: dbt debug"
```

## CLAUDE.md-template

```markdown
# Analytics Platform

Data-engineering-monorepo voor de volledige analytics-stack: Fivetran/Airbyte voor ingestie,
BigQuery of Snowflake als warehouse, dbt Core 1.8 voor transformaties en metriek,
Soda voor datakwaliteitscontroles, en Looker of Metabase voor BI-levering.
Monte Carlo of Bigeye verzorgt de observabiliteit. Alle infrastructuur wordt beheerd met Terraform.

## Stack

- dbt Core 1.8 + dbt-bigquery- of dbt-snowflake-adapter
- Warehouse: BigQuery (Google Cloud) of Snowflake
- Ingestie: Fivetran (beheerd) of Airbyte (self-hosted)
- Datakwaliteit: Soda Core 3.x (checks-as-code YAML)
- Metriek: dbt Semantic Layer met MetricFlow
- Observabiliteit: Monte Carlo of Bigeye
- BI: Looker (LookML) of Metabase
- Orkestratie: dbt Cloud Jobs of Airflow 2.9+ of Dagster 1.7
- Infrastructuur: Terraform 1.8
- Alerting: Slack-webhooks
- CI/CD: GitHub Actions (slim CI bij PR, volledige run bij merge naar main)

## Projectindeling

- `dbt/models/staging/` — 1:1 met ruwe brontabellen; alleen hernoemen, casten, samenvoegen — geen joins
- `dbt/models/intermediate/` — bedrijfslogica-joins; niet blootgesteld aan BI
- `dbt/models/marts/` — definitieve consumentgerichte tabellen; blootgesteld aan Looker / Metabase
- `dbt/metrics/` — MetricFlow Semantic Model-definities
- `dbt/macros/` — herbruikbare Jinja-macro's; altijd invoer en uitvoer documenteren
- `dbt/seeds/` — statische referentie-CSV's; alleen voor traag veranderende lookupdata
- `quality/soda/` — Soda-checks na dbt uitgevoerd tegen mart-tabellen
- `terraform/` — alle infrastructuur hier gedefinieerd; geen handmatige consolewij zigingen
- `observability/` — Monte Carlo-monitorconfiguraties en Slack-alertroutering

## Nieuw dbt-model toevoegen — exacte stappen

1. De juiste laag bepalen: staging (raw 1:1), intermediate (samengevoegde bedrijfslogica) of mart (BI-gereed)
2. Voor staging: `dbt run-operation codegen.generate_source` uitvoeren om het bron-YAML te genereren
3. Het SQL-bestand in de juiste submap aanmaken conform de naamgevingsconventie:
   - Staging: `stg_{source}__{entity}.sql`
   - Intermediate: `int_{description}.sql`
   - Mart: `fct_{fact_name}.sql` of `dim_{dimension_name}.sql`
4. Het model toevoegen aan het bijbehorende `_models.yml`-bestand met beschrijving en kolomniveau-documentatie
5. Minimaal toevoegen: `not_null`- + `unique`-tests op de primaire sleutel; `accepted_values` op enum-kolommen
6. Voor marts: een bijbehorend Soda-checkbestand toevoegen in `quality/soda/checks/marts/`
7. Lokaal uitvoeren: `dbt build --select +your_model_name+ --target dev`
8. Verifiëren met: `dbt test --select your_model_name`
9. De slash-opdracht `/new-model` gebruiken om SQL + YAML-boilerplate te genereren

## Datakwaliteitscontroles uitvoeren

```bash
# Soda-checks uitvoeren voor een specifieke dataset
cd quality/soda
soda scan -d bigquery -c configuration.yml checks/marts/fct_mrr.yml

# Alle staging-checks uitvoeren
soda scan -d bigquery -c configuration.yml checks/staging/

# Alle mart-checks uitvoeren (doorgaans na voltooiing van dbt build)
soda scan -d bigquery -c configuration.yml checks/marts/

# De slash-opdracht /run-quality gebruiken voor door Claude begeleide checkuitvoering
```

De Soda-configuratie verwacht `SODA_API_KEY_ID` en `SODA_API_KEY_SECRET` in de omgeving.
Gefaalde checks sturen Slack-alerts via de webhook geconfigureerd in `observability/alerts/slack_routing.yml`.

## Een Looker-dashboard publiceren

1. LookML-viewbestanden die het mart-model refereren toevoegen of bijwerken
2. Explores in het modelbestand definiëren met passende joins en toegangsfilters
3. Het dashboard-LookML-bestand aanmaken of bijwerken in `looker/dashboards/`
4. `lookml-linter` lokaal uitvoeren voor het pushen
5. Samenvoegen naar main — Looker haalt automatisch op van de verbonden GitHub-branch
6. Valideren in de Looker IDE: Content Validator moet slagen met nul fouten
7. Voor Metabase: direct verbinden met de mart-tabel, vraag opbouwen, opslaan in collectie
8. De slash-opdracht `/publish-dashboard` gebruiken voor begeleide LookML-scaffolding

## dbt Semantic Layer / MetricFlow

- Metriekdefinities staan in `dbt/metrics/*.yml` — niet in model-YAML-bestanden
- Elke metriek moet verwijzen naar een semantisch model (de onderliggende mart-tabel)
- Ondersteunde tijdgranulariteiten: `day`, `week`, `month`, `quarter`, `year`
- Metriek lokaal testen: `dbt sl query --metrics mrr --group-by metric_time__month`
- Metriek blootgesteld aan Looker via de dbt Semantic Layer JDBC-verbinding; niet dupliceren in LookML
- Metriek toevoegen: definiëren in YAML, `dbt sl validate` uitvoeren, dan `dbt sl generate-metrics-docs`

## Conventies voor omgevingsvariabelen

| Variabele | Doel | Waar instellen |
|---|---|---|
| `GOOGLE_APPLICATION_CREDENTIALS` | Pad naar BigQuery-serviceaccount-JSON | Lokaal ~/.zshrc, CI-secret |
| `SNOWFLAKE_PRIVATE_KEY_PATH` | Pad naar RSA-sleutel voor Snowflake-auth | Lokaal ~/.zshrc, CI-secret |
| `DBT_TARGET` | Actief dbt-target: `dev`, `ci` of `prod` | Per aanroep ingesteld of in CI-omgeving |
| `SODA_API_KEY_ID` / `SODA_API_KEY_SECRET` | Soda Cloud-authenticatie | CI-secret, lokale .env |
| `SLACK_WEBHOOK_URL` | Slack-inkomende webhook voor kwaliteitsalerts | CI-secret, lokale .env |
| `MONTECARLO_API_KEY_ID` / `MONTECARLO_API_TOKEN` | Monte Carlo API-toegang | CI-secret |
| `TF_STATE_BUCKET` | GCS- of S3-bucket voor Terraform-remote-state | CI-secret |

Nooit `.env`-, `profiles.yml`- of `*.tfvars`-bestanden met echte inloggegevens committen.
Alle variabelen moeten gedocumenteerd zijn in `.env.example` voor het samenvoegen.

## Toegangsbeheermodel

- **Raw-laag:** Fivetran-serviceaccount heeft schrijftoegang; geen menselijke gebruikers
- **Staging + marts:** dbt-runner-serviceaccount heeft schrijftoegang; Looker / Metabase-serviceaccounts hebben leestoegang
- **Dev-schema's:** elke engineer heeft zijn eigen schema (`dbt_<username>`); geïsoleerd via de `generate_schema_name`-macro
- **Productieschema's:** alleen de dbt Cloud / CI-runner kan schrijven; afgedwongen via IAM / Snowflake-grants
- **Terraform:** infrastructuurwijzigingen vereisen PR-beoordeling; `terraform apply` draait alleen in CI bij merge naar main
- **Looker:** contenttoegang beheerd via Looker-groepen gekoppeld aan datateamrollen

## Incidentrespons bij datakwaliteitsfouten

1. **Alert geactiveerd** (Soda-check of Monte Carlo): verschijnt in Slack-kanaal #data-incidents
2. **Triage** (< 15 min): de slash-opdracht `/data-incident` gebruiken om de begeleide triageprompt uit te voeren
3. **Reikwijdte identificeren**: dbt-manifestlineage controleren om alle getroffen downstream-modellen + dashboards te vinden
4. **Quarantaine**: als data onjuist is in productie, een `where false`-filter toevoegen aan het getroffen mart-model en opnieuw deployen om te voorkomen dat BI-consumenten slechte data zien
5. **Grondoorzaak**: bronversheid controleren (`dbt source freshness`), rijtellingen in ruwe tabellen, Fivetran-connectorstatus
6. **Oplossen**: het upstream-bronprobleem of de dbt-logica corrigeren; `dbt build --select +affected_model+` uitvoeren
7. **Kwaliteitscontroles opnieuw uitvoeren**: `soda scan` tegen getroffen tabellen voor het opheffen van quarantaine
8. **Postmortem**: documenteren in `docs/incident-response.md` met tijdlijn, grondoorzaak en preventiemaatregelen
9. **Stakeholders informeren**: de `/stakeholder-report`-skill gebruiken om een incidentsamenvatting te genereren

## Terraform-workflow

```bash
# Wijzigingen plannen (altijd voor toepassen)
cd terraform/environments/prod
terraform init -backend-config="bucket=${TF_STATE_BUCKET}"
terraform plan -out=tfplan

# Toepassen (alleen CI voor productie; lokale dev-omgeving is acceptabel)
terraform apply tfplan

# Nooit terraform apply gebruiken zonder planbestand in productie
```

## dbt-modelmateriaaliseringsstrategie

- `staging/` → `view` (goedkoop, altijd vers, geen opslagkosten)
- `intermediate/` → `ephemeral` of `view` (afhankelijk van querycomplexiteit)
- `marts/core/` → `table` (bij elke run vernieuwd; kleine tabellen onder 10M rijen)
- `marts/finance/`, `marts/marketing/` → `incremental` voor grote feitentabellen (> 10M rijen)
- `metrics/` → beheerd door MetricFlow; materialisatie niet handmatig instellen

## Wat niet te doen

- Geen joins tussen staging-modellen — joins horen in de intermediate- of mart-laag
- Geen hardgecodeerde warehouse- of datasetnamen in SQL — `{{ target.schema }}` en `{{ ref() }}` gebruiken
- Geen `dbt run` in productie zonder onmiddellijk daarna `dbt test` uit te voeren
- `dbt/target/manifest.json` niet handmatig wijzigen — het is een gegenereerd artefact
- Geen Terraform-wijzigingen in productie toepassen zonder een via PR goedgekeurd plan
- Geen raw-laag-toegang verlenen aan BI-tools — Looker en Metabase mogen alleen lezen vanuit marts
- Geen metriek toevoegen aan Looker LookML als deze al is gedefinieerd in de dbt Semantic Layer
```

## MCP-servers

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
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/yourname/analytics-platform"
      ]
    },
    "bigquery": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-bigquery"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "${GOOGLE_APPLICATION_CREDENTIALS}",
        "BIGQUERY_PROJECT": "${BQ_PROJECT}"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "${POSTGRES_CONNECTION_STRING}"
      }
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "${SLACK_BOT_TOKEN}"
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
            "command": "bash -c 'f=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$f\" == */dbt/models/*.sql ]]; then echo \"[HOOK] dbt model written — run: dbt compile --select $(basename $f .sql) to verify Jinja renders\" >&2; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'f=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$f\" == */dbt/metrics/*.yml ]]; then echo \"[HOOK] MetricFlow metric written — validate with: dbt sl validate\" >&2; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'f=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$f\" == */terraform/*.tf ]]; then echo \"[HOOK] Terraform file changed — run: terraform validate && terraform plan\" >&2; fi'"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_COMMAND\" | grep -qE \"dbt run|dbt build\" && echo \"$CLAUDE_TOOL_INPUT_COMMAND\" | grep -qv \"\\-\\-target dev\"; then echo \"[HOOK] WARNING: running dbt without --target dev — confirm this is intentional\" >&2; fi'"
          }
        ]
      },
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_COMMAND\" | grep -q \"terraform apply\" && echo \"$CLAUDE_TOOL_INPUT_COMMAND\" | grep -qv \"tfplan\"; then echo \"[HOOK] BLOCKED: always run terraform plan first and apply with a plan file\" >&2; exit 1; fi'"
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
npx uitkit add skill data-ml/dbt-data-pipelines
npx uitkit add skill data-ml/data-quality-checker
npx uitkit add skill data-ml/dashboard-narrator
npx uitkit add skill data-ml/stakeholder-report
npx uitkit add skill devops-infra/terraform
npx uitkit add skill devops-infra/cicd
npx uitkit add skill productivity/stakeholder-comms
```

## Gerelateerde bronnen

- [dbt Data Pipelines Guide](../guides/dbt-data-pipelines.md)
- [Datakwaliteits-workflow](../workflows/data-quality-pipeline.md)
- [Stakeholder-rapportage-workflow](../workflows/stakeholder-reporting.md)
- [Infrastructuur als Code-structuur](./infrastructure-as-code.md)
- [Datapipeline-structuur](./data-pipeline.md)
