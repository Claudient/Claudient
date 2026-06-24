# Plateforme Analytics — Structure de Projet

> Pour une équipe data engineering et analytics gérant le cycle de vie complet, de l'ingestion des sources brutes à la livraison BI gouvernée, en optimisant la fiabilité des pipelines, la cohérence des métriques et le délai d'obtention des insights.

## Stack

- **Ingestion :** Fivetran (connecteurs gérés) ou Airbyte 0.50+ (auto-hébergé, connecteurs open-source)
- **Entrepôt de données :** BigQuery (Google Cloud) ou Snowflake (Enterprise / Business Critical)
- **Transformations :** dbt Core 1.8+ avec adaptateur dbt-bigquery ou dbt-snowflake
- **Documentation + tests :** dbt docs, tests génériques intégrés dbt + dbt-expectations, dbt-utils
- **Couche métrique :** dbt Semantic Layer (MetricFlow 0.200+) avec exposition JDBC/ADBC
- **Qualité des données :** Soda Core 3.x (checks-as-code) ou Great Expectations 0.18+ (GX Cloud)
- **BI / tableaux de bord :** Looker (LookML) ou Metabase 0.49+ (open-source)
- **Observabilité des données :** Monte Carlo ou Bigeye (SaaS ; se connecte à l'entrepôt + manifest dbt)
- **Orchestration :** dbt Cloud Jobs ou Apache Airflow 2.9+ (auto-hébergé) ou Dagster 1.7+
- **Contrôle de version :** GitHub (projet dbt, modèle dbt profiles, workflows CI)
- **Infrastructure :** Terraform 1.8+ (datasets BigQuery, warehouses Snowflake, IAM, connecteurs Fivetran)
- **Alertes :** Slack (alertes via webhook depuis Soda, Monte Carlo, dbt Cloud)
- **Secrets :** Google Secret Manager ou AWS Secrets Manager ; référencés dans Terraform + dbt profiles

## Arborescence de répertoires

```
analytics-platform/                          # Racine du monorepo — versionné dans GitHub
├── .claude/
│   ├── CLAUDE.md                            # Instructions au niveau du dépôt pour Claude Code
│   ├── settings.json                        # Serveurs MCP, hooks, permissions
│   └── commands/
│       ├── new-model.md                     # /new-model — générer un modèle dbt staging/mart + tests
│       ├── run-quality.md                   # /run-quality — exécuter les checks Soda sur un dataset
│       ├── publish-dashboard.md             # /publish-dashboard — flux LookML Looker ou Metabase
│       ├── data-incident.md                 # /data-incident — invite de triage d'incident
│       └── seed-refresh.md                  # /seed-refresh — recharger les seeds dbt depuis les CSV source
├── .github/
│   └── workflows/
│       ├── ci.yml                           # Compilation + test dbt sur PR contre la cible CI
│       ├── slim-ci.yml                      # dbt build --select state:modified+ (Slim CI)
│       └── deploy.yml                       # Exécution dbt en production déclenchée lors du merge sur main
├── terraform/                               # Infrastructure as code
│   ├── environments/
│   │   ├── prod/
│   │   │   ├── main.tf                      # Ressources BigQuery / Snowflake en production
│   │   │   ├── variables.tf
│   │   │   └── terraform.tfvars.example     # Exemple de valeurs de variables — tfvars réels ignorés par git
│   │   └── dev/
│   │       ├── main.tf                      # Ressources d'entrepôt dev/staging
│   │       └── variables.tf
│   ├── modules/
│   │   ├── bigquery/
│   │   │   ├── datasets.tf                  # Datasets raw, staging, marts, metrics + IAM
│   │   │   └── service_accounts.tf          # Comptes de service dbt, Fivetran, Looker
│   │   ├── snowflake/
│   │   │   ├── warehouses.tf                # Virtual warehouses par charge de travail (ETL, BI, ad-hoc)
│   │   │   ├── databases.tf                 # Bases de données RAW, DEV, PROD + rôles
│   │   │   └── grants.tf                    # Droits basés sur les rôles : transformer, reporter, loader
│   │   ├── fivetran/
│   │   │   └── connectors.tf                # Ressources de connecteurs Fivetran (provider: fivetran/fivetran)
│   │   └── iam/
│   │       └── roles.tf                     # Liaisons IAM selon le principe du moindre privilège
│   └── README.md                            # Utilisation de Terraform + configuration du backend d'état
├── dbt/                                     # Racine du projet dbt Core
│   ├── dbt_project.yml                      # Nom du projet, version, chemins des modèles, valeurs par défaut des variables
│   ├── profiles.yml.template                # Modèle de profil — le profiles.yml réel est ignoré par git
│   ├── packages.yml                         # dbt-utils, dbt-expectations, dbt-date, codegen
│   ├── selectors.yml                        # Sélecteurs nommés : nightly, finance, marketing
│   ├── seeds/
│   │   ├── country_codes.csv                # Référence statique : codes pays ISO
│   │   ├── currency_rates.csv               # Taux de change mensuels pour la normalisation financière
│   │   └── product_taxonomy.csv             # Mapping interne de taxonomie produit/SKU
│   ├── macros/
│   │   ├── generate_schema_name.sql         # Routage de schéma personnalisé par environnement + cible
│   │   ├── cents_to_dollars.sql             # Macro de conversion d'unités monétaires
│   │   ├── surrogate_key.sql                # Encapsule dbt_utils.generate_surrogate_key
│   │   ├── not_null_proportion.sql          # Test personnalisé : assertion du taux de nulls < seuil
│   │   └── freshness_check.sql              # Macro pour vérifier l'âge maximum des lignes en heures
│   ├── models/
│   │   ├── staging/                         # 1:1 avec les tables sources — nettoyage léger uniquement
│   │   │   ├── stripe/
│   │   │   │   ├── _stripe__sources.yml     # Définitions des sources + seuils de fraîcheur
│   │   │   │   ├── _stripe__models.yml      # Docs au niveau des colonnes + tests génériques pour tous les modèles staging
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
│   │   │   └── app_db/                      # Réplica de la base de données de production (via Fivetran/Airbyte)
│   │   │       ├── _app_db__sources.yml
│   │   │       ├── _app_db__models.yml
│   │   │       ├── stg_app_db__users.sql
│   │   │       ├── stg_app_db__events.sql
│   │   │       └── stg_app_db__orders.sql
│   │   ├── intermediate/                    # Jointures métier — non exposées directement à la BI
│   │   │   ├── int_customer_subscriptions.sql   # Client joint + historique des abonnements
│   │   │   ├── int_revenue_recognized.sql        # Calcul du calendrier de reconnaissance des revenus ASC 606
│   │   │   └── int_user_sessions.sql             # Flux d'événements sessionisé
│   │   └── marts/                           # Modèles finaux prêts pour l'analyse, exposés à la BI
│   │       ├── core/
│   │       │   ├── _core__models.yml        # Docs + tests pour tous les modèles core
│   │       │   ├── dim_customers.sql        # Dimension client avec attributs + segments
│   │       │   ├── dim_products.sql         # Hiérarchie produit depuis la seed de taxonomie
│   │       │   ├── fct_orders.sql           # Fait commandes avec toutes les clés étrangères + métriques
│   │       │   └── fct_subscriptions.sql    # Événements du cycle de vie des abonnements
│   │       ├── finance/
│   │       │   ├── _finance__models.yml
│   │       │   ├── fct_mrr.sql              # Revenu récurrent mensuel par compte
│   │       │   ├── fct_arr_movements.sql    # Cascade ARR : nouveau, expansion, churn, contraction
│   │       │   └── fct_invoices.sql         # Revenus au niveau facture avec calendrier de reconnaissance
│   │       └── marketing/
│   │           ├── _marketing__models.yml
│   │           ├── fct_campaigns.sql        # Performance des campagnes : dépenses, conversions, CAC
│   │           └── fct_attribution.sql      # Modèle d'attribution multi-touch
│   ├── metrics/                             # Définitions MetricFlow pour le dbt Semantic Layer
│   │   ├── mrr.yml                          # Métrique MRR : mesure, dimensions, granularités temporelles
│   │   ├── arr.yml                          # Métrique ARR avec filtres
│   │   ├── customer_count.yml               # Nombre de clients actifs par segment
│   │   └── cac.yml                          # Métrique du coût d'acquisition client
│   ├── analyses/                            # SQL ad-hoc sauvegardé comme analyses dbt (non matérialisé)
│   │   └── churn_cohort_analysis.sql        # Analyse de rétention par cohorte pour les bilans trimestriels
│   └── tests/                               # Tests de données singuliers (logique complexe, non génériques)
│       ├── assert_mrr_nonnegative.sql       # Le MRR ne doit jamais être négatif au niveau du compte
│       └── assert_no_duplicate_orders.sql   # Les IDs de commandes doivent être uniques dans toutes les sources
├── quality/                                 # Checks de qualité des données (Soda ou Great Expectations)
│   ├── soda/
│   │   ├── configuration.yml                # Connexion Soda Cloud + identifiants d'entrepôt
│   │   ├── checks/
│   │   │   ├── staging/
│   │   │   │   ├── stripe_customers.yml     # Checks de fraîcheur, complétude et format
│   │   │   │   └── salesforce_accounts.yml
│   │   │   └── marts/
│   │   │       ├── fct_mrr.yml              # Checks de précision des revenus vs source
│   │   │       └── dim_customers.yml        # Unicité PK, intégrité référentielle
│   │   └── scan.sh                          # Point d'entrée : soda scan -d warehouse -c config
│   └── great_expectations/                  # Alternative : configuration GX Cloud
│       ├── great_expectations.yml           # Datasource : connexion BigQuery ou Snowflake
│       └── expectations/
│           ├── fct_orders_suite.json        # Suite d'attentes pour le fait commandes
│           └── dim_customers_suite.json
├── observability/                           # Configuration Monte Carlo / Bigeye + routage des alertes
│   ├── monte_carlo/
│   │   └── monitors.yml                     # Moniteurs de fraîcheur + volume au niveau des tables
│   └── alerts/
│       └── slack_routing.yml                # Mapping sévérité des alertes → canal Slack
├── docs/                                    # Documentation complémentaire
│   ├── data-dictionary.md                   # Glossaire métier : définitions canoniques des métriques
│   ├── lineage.md                           # Carte de lignage source-vers-BI pour les tables clés
│   ├── incident-response.md                 # Runbook de gestion des incidents de qualité des données
│   └── onboarding.md                        # Guide d'intégration pour les nouveaux data engineers
├── scripts/
│   ├── bootstrap_dev.sh                     # Configurer le profil dbt local + schéma dev de l'entrepôt
│   └── validate_manifest.py                 # Analyser manifest.json dbt pour vérifier les seuils de couverture
├── .env.example                             # Toutes les variables d'environnement requises documentées avec commentaires
└── .gitignore                               # profiles.yml, target/, dbt_packages/, *.tfvars
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `dbt/dbt_project.yml` | Configuration au niveau du projet : valeurs par défaut de matérialisation des modèles par dossier (staging → view, marts → table), valeurs par défaut des variables pour la logique spécifique à l'environnement, chemin cible |
| `dbt/macros/generate_schema_name.sql` | Remplace le nommage de schéma par défaut de dbt afin que les exécutions dev atterrissent dans un schéma propre à l'utilisateur (ex. `dbt_alice`) plutôt que d'écraser les schémas partagés |
| `dbt/models/staging/stripe/_stripe__sources.yml` | Déclare les tables Stripe brutes comme sources dbt avec des seuils de fraîcheur ; les échecs de fraîcheur des sources bloquent les exécutions en aval dans la CI |
| `dbt/metrics/mrr.yml` | Définition du modèle sémantique MetricFlow : référence `fct_mrr`, définit la mesure `mrr`, les dimensions supportées (customer_segment, plan) et les granularités temporelles (jour, mois, trimestre) |
| `quality/soda/checks/marts/fct_mrr.yml` | Checks Soda exécutés après dbt : vérifie que la somme du MRR correspond à la tolérance attendue vs le jour précédent, absence de nulls dans les colonnes clés, absence de valeurs négatives — alerte Slack en cas d'échec |
| `terraform/modules/bigquery/datasets.tf` | Crée les datasets BigQuery `raw`, `staging`, `marts` et `metrics` avec le bon IAM : Fivetran writer → raw uniquement ; compte de service dbt → staging + marts ; Looker → marts + metrics en lecture seule |
| `dbt/selectors.yml` | Les sélecteurs nommés permettent à `dbt build --selector nightly` d'exécuter le DAG complet et à `--selector finance` d'exécuter uniquement les modèles du mart finance + leurs dépendances en amont |
| `.github/workflows/slim-ci.yml` | Utilise le Slim CI de dbt : compare le `manifest.json` de la PR avec l'artefact manifest de production pour ne construire et tester que les modèles modifiés dans la PR, réduisant le temps de CI de 60 à 80 % |
| `observability/alerts/slack_routing.yml` | Mappe les niveaux de sévérité des alertes aux canaux Slack : critical → #data-incidents, warning → #data-quality, info → #data-observability ; évite la fatigue des alertes |
| `docs/data-dictionary.md` | Définitions canoniques pour toutes les métriques métier : MRR, ARR, CAC, churn — référencées dans les descriptions des modèles dbt et les libellés LookML de Looker pour assurer la cohérence |

## Scaffold rapide

```bash
# Prérequis : Python 3.11+, pip ou pipx, Terraform 1.8+, GitHub CLI

# Créer la racine du projet et y entrer
mkdir analytics-platform && cd analytics-platform
git init

# Configurer l'environnement virtuel Python pour dbt
python -m venv .venv && source .venv/bin/activate

# Installer dbt Core avec l'adaptateur de votre entrepôt
pip install dbt-core==1.8.* dbt-bigquery==1.8.*
# OU pour Snowflake :
# pip install dbt-core==1.8.* dbt-snowflake==1.8.*

# Installer Soda Core
pip install soda-core-bigquery==3.*
# OU pour Snowflake : pip install soda-core-snowflake==3.*

# Sauvegarder les dépendances
pip freeze > requirements.txt

# Initialiser le projet dbt
dbt init dbt --skip-profile-setup
cd dbt

# Installer les packages dbt
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

# Créer la structure de répertoires
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

# Initialiser Terraform
cd terraform && terraform init && cd ..

# Créer .env.example
cat > .env.example <<'EOF'
# BigQuery
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
BQ_PROJECT=your-gcp-project-id
BQ_DATASET_RAW=raw
BQ_DATASET_STAGING=staging
BQ_DATASET_MARTS=marts

# Snowflake (alternative)
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

# Alertes Slack
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx/yyy/zzz
SLACK_CHANNEL_INCIDENTS=#data-incidents

# Monte Carlo
MONTECARLO_API_KEY_ID=your-mc-key-id
MONTECARLO_API_TOKEN=your-mc-token

# État Terraform
TF_STATE_BUCKET=your-terraform-state-bucket
EOF

# Créer .gitignore
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

# Configurer Claude Code
touch .claude/CLAUDE.md .claude/settings.json
touch .claude/commands/new-model.md
touch .claude/commands/run-quality.md
touch .claude/commands/publish-dashboard.md
touch .claude/commands/data-incident.md

# Installer les skills UitKit
npx uitkit add skill data-ml/sql
npx uitkit add skill data-ml/dbt-data-pipelines
npx uitkit add skill data-ml/data-quality-checker
npx uitkit add skill data-ml/dashboard-narrator
npx uitkit add skill data-ml/stakeholder-report
npx uitkit add skill devops-infra/terraform
npx uitkit add skill devops-infra/cicd

echo "Plateforme analytics générée. Prochaines étapes : configurer profiles.yml, configurer le backend Terraform, exécuter : dbt debug"
```

## Modèle CLAUDE.md

```markdown
# Plateforme Analytics

Monorepo de data engineering gérant la stack analytics complète : Fivetran/Airbyte pour l'ingestion,
BigQuery ou Snowflake comme entrepôt, dbt Core 1.8 pour les transformations et les métriques,
Soda pour les checks de qualité des données, et Looker ou Metabase pour la livraison BI.
Monte Carlo ou Bigeye assure l'observabilité. Toute l'infrastructure est gérée par Terraform.

## Stack

- dbt Core 1.8 + adaptateur dbt-bigquery ou dbt-snowflake
- Entrepôt : BigQuery (Google Cloud) ou Snowflake
- Ingestion : Fivetran (géré) ou Airbyte (auto-hébergé)
- Qualité des données : Soda Core 3.x (checks-as-code YAML)
- Métriques : dbt Semantic Layer avec MetricFlow
- Observabilité : Monte Carlo ou Bigeye
- BI : Looker (LookML) ou Metabase
- Orchestration : dbt Cloud Jobs ou Airflow 2.9+ ou Dagster 1.7
- Infrastructure : Terraform 1.8
- Alertes : webhooks Slack
- CI/CD : GitHub Actions (slim CI sur PR, exécution complète lors du merge sur main)

## Organisation du projet

- `dbt/models/staging/` — 1:1 avec les tables sources brutes ; uniquement renommer, caster, coalesceer — pas de jointures
- `dbt/models/intermediate/` — jointures métier ; non exposées à la BI
- `dbt/models/marts/` — tables finales orientées consommateurs ; exposées à Looker / Metabase
- `dbt/metrics/` — définitions de modèles sémantiques MetricFlow
- `dbt/macros/` — macros Jinja réutilisables ; toujours documenter les entrées et sorties
- `dbt/seeds/` — CSV de référence statiques ; uniquement pour les données de référence à évolution lente
- `quality/soda/` — checks Soda exécutés après dbt sur les tables mart
- `terraform/` — toute l'infrastructure définie ici ; pas de modifications manuelles dans la console
- `observability/` — configurations des moniteurs Monte Carlo et routage des alertes Slack

## Ajouter un nouveau modèle dbt — étapes exactes

1. Déterminer la bonne couche : staging (raw 1:1), intermediate (logique métier jointe) ou mart (prêt pour la BI)
2. Pour staging : exécuter `dbt run-operation codegen.generate_source` pour générer le YAML source
3. Créer le fichier SQL dans le bon sous-répertoire en respectant la convention de nommage :
   - Staging : `stg_{source}__{entity}.sql`
   - Intermediate : `int_{description}.sql`
   - Mart : `fct_{fact_name}.sql` ou `dim_{dimension_name}.sql`
4. Ajouter le modèle au fichier `_models.yml` correspondant avec description et docs au niveau colonne
5. Ajouter au minimum : tests `not_null` + `unique` sur la clé primaire ; `accepted_values` sur les colonnes enum
6. Pour les marts : ajouter un fichier de check Soda correspondant dans `quality/soda/checks/marts/`
7. Exécuter localement : `dbt build --select +your_model_name+ --target dev`
8. Vérifier avec : `dbt test --select your_model_name`
9. Utiliser la commande slash `/new-model` pour générer le boilerplate SQL + YAML

## Exécuter les checks de qualité des données

```bash
# Exécuter les checks Soda pour un dataset spécifique
cd quality/soda
soda scan -d bigquery -c configuration.yml checks/marts/fct_mrr.yml

# Exécuter tous les checks staging
soda scan -d bigquery -c configuration.yml checks/staging/

# Exécuter tous les checks mart (typiquement après la fin de dbt build)
soda scan -d bigquery -c configuration.yml checks/marts/

# Utiliser la commande slash /run-quality pour une exécution guidée par Claude
```

La configuration Soda attend `SODA_API_KEY_ID` et `SODA_API_KEY_SECRET` dans l'environnement.
Les checks échoués envoient des alertes Slack via le webhook configuré dans `observability/alerts/slack_routing.yml`.

## Publier un tableau de bord Looker

1. Ajouter ou mettre à jour les fichiers de vue LookML référençant le modèle mart
2. Définir les explores dans le fichier modèle avec les jointures et filtres d'accès appropriés
3. Créer ou mettre à jour le fichier LookML de tableau de bord dans `looker/dashboards/`
4. Exécuter `lookml-linter` localement avant de pousser
5. Merger sur main — Looker tire depuis la branche GitHub connectée automatiquement
6. Valider dans l'IDE Looker : le validateur de contenu doit passer sans erreurs
7. Pour Metabase : se connecter directement à la table mart, créer une question, sauvegarder dans une collection
8. Utiliser la commande slash `/publish-dashboard` pour un scaffold LookML guidé

## dbt Semantic Layer / MetricFlow

- Les définitions de métriques se trouvent dans `dbt/metrics/*.yml` — pas dans les fichiers YAML des modèles
- Chaque métrique doit référencer un modèle sémantique (la table mart sous-jacente)
- Granularités temporelles supportées : `day`, `week`, `month`, `quarter`, `year`
- Tester les métriques localement : `dbt sl query --metrics mrr --group-by metric_time__month`
- Métriques exposées à Looker via la connexion JDBC du dbt Semantic Layer ; ne pas dupliquer dans LookML
- Ajouter une métrique : définir en YAML, exécuter `dbt sl validate`, puis `dbt sl generate-metrics-docs`

## Conventions des variables d'environnement

| Variable | Rôle | Où définir |
|---|---|---|
| `GOOGLE_APPLICATION_CREDENTIALS` | Chemin vers le JSON du compte de service BigQuery | ~/.zshrc local, secret CI |
| `SNOWFLAKE_PRIVATE_KEY_PATH` | Chemin vers la clé RSA pour l'auth Snowflake | ~/.zshrc local, secret CI |
| `DBT_TARGET` | Cible dbt active : `dev`, `ci` ou `prod` | Défini par invocation ou dans l'env CI |
| `SODA_API_KEY_ID` / `SODA_API_KEY_SECRET` | Authentification Soda Cloud | Secret CI, .env local |
| `SLACK_WEBHOOK_URL` | Webhook entrant Slack pour les alertes qualité | Secret CI, .env local |
| `MONTECARLO_API_KEY_ID` / `MONTECARLO_API_TOKEN` | Accès API Monte Carlo | Secret CI |
| `TF_STATE_BUCKET` | Bucket GCS ou S3 pour l'état distant Terraform | Secret CI |

Ne jamais committer les fichiers `.env`, `profiles.yml` ou `*.tfvars` contenant de vraies credentials.
Toutes les variables doivent être documentées dans `.env.example` avant le merge.

## Modèle de contrôle d'accès

- **Couche raw :** le compte de service Fivetran a l'accès en écriture ; pas d'utilisateurs humains
- **Staging + marts :** le compte de service dbt runner a l'accès en écriture ; les comptes de service Looker / Metabase ont l'accès en lecture
- **Schémas dev :** chaque ingénieur a son propre schéma (`dbt_<username>`) ; isolé via la macro `generate_schema_name`
- **Schémas de production :** seul le runner dbt Cloud / CI peut écrire ; appliqué via IAM / grants Snowflake
- **Terraform :** les changements d'infrastructure nécessitent une révision de PR ; `terraform apply` s'exécute uniquement dans la CI lors du merge sur main
- **Looker :** l'accès au contenu est contrôlé par des groupes Looker mappés aux rôles de l'équipe data

## Réponse aux incidents de qualité des données

1. **Déclenchement d'une alerte** (check Soda ou Monte Carlo) : apparaît dans le canal Slack #data-incidents
2. **Triage** (< 15 min) : utiliser la commande slash `/data-incident` pour exécuter l'invite de triage guidé
3. **Identifier la portée** : vérifier la lignage du manifest dbt pour trouver tous les modèles en aval + tableaux de bord affectés
4. **Mise en quarantaine** : si les données sont erronées en production, ajouter un filtre `where false` au modèle mart affecté et redéployer pour empêcher les consommateurs BI de voir de mauvaises données
5. **Cause racine** : vérifier la fraîcheur des sources (`dbt source freshness`), les comptages de lignes dans les tables brutes, le statut du connecteur Fivetran
6. **Correction** : corriger le problème dans la source amont ou la logique dbt ; exécuter `dbt build --select +affected_model+`
7. **Relancer les checks de qualité** : `soda scan` sur les tables affectées avant de lever la quarantaine
8. **Post-mortem** : documenter dans `docs/incident-response.md` avec la chronologie, la cause racine et les mesures de prévention
9. **Notifier les parties prenantes** : utiliser la skill `/stakeholder-report` pour générer un résumé d'incident

## Workflow Terraform

```bash
# Planifier les changements (toujours avant d'appliquer)
cd terraform/environments/prod
terraform init -backend-config="bucket=${TF_STATE_BUCKET}"
terraform plan -out=tfplan

# Appliquer (CI uniquement pour la production ; l'environnement dev local est acceptable)
terraform apply tfplan

# Ne jamais utiliser terraform apply sans fichier de plan en production
```

## Stratégie de matérialisation des modèles dbt

- `staging/` → `view` (économique, toujours frais, pas de coût de stockage)
- `intermediate/` → `ephemeral` ou `view` (selon la complexité des requêtes)
- `marts/core/` → `table` (rafraîchi à chaque exécution ; petites tables sous 10M lignes)
- `marts/finance/`, `marts/marketing/` → `incremental` pour les grandes tables de faits (> 10M lignes)
- `metrics/` → géré par MetricFlow ; ne pas définir la matérialisation manuellement

## Ce qu'il ne faut pas faire

- Ne pas joindre des modèles staging entre eux — les jointures appartiennent aux couches intermediate ou mart
- Ne pas coder en dur les noms d'entrepôt ou de dataset dans le SQL — utiliser `{{ target.schema }}` et `{{ ref() }}`
- Ne pas exécuter `dbt run` en production sans exécuter `dbt test` immédiatement après
- Ne pas modifier `dbt/target/manifest.json` manuellement — c'est un artefact généré
- Ne pas appliquer des changements Terraform en production sans un plan approuvé via PR
- Ne pas accorder l'accès à la couche raw aux outils BI — Looker et Metabase ne doivent lire que depuis les marts
- Ne pas ajouter une métrique dans le LookML de Looker si elle est déjà définie dans le dbt Semantic Layer
```

## Serveurs MCP

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

## Skills à installer

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

## Liens connexes

- [Guide dbt Data Pipelines](../guides/dbt-data-pipelines.md)
- [Workflow Qualité des Données](../workflows/data-quality-pipeline.md)
- [Workflow Rapport aux Parties Prenantes](../workflows/stakeholder-reporting.md)
- [Structure Infrastructure as Code](./infrastructure-as-code.md)
- [Structure Pipeline de Données](./data-pipeline.md)
