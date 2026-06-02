# Espace de travail Data Analyst — Structure de projet

> Pour les analystes de données effectuant des requêtes SQL, des analyses exploratoires en Python, la maintenance de tableaux de bord et des rapports pour les parties prenantes via BigQuery ou Snowflake, avec dbt pour les transformations et Looker ou Metabase pour la BI.

## Stack

- **Entrepôt de données :** BigQuery ou Snowflake
- **Transformations :** dbt Core (ou dbt Cloud)
- **BI / tableaux de bord :** Looker ou Metabase
- **Analyse :** Python 3.11+, pandas 2.x / polars 0.20+, Jupyter Lab 4.x
- **Notebooks :** JupyterLab, nbconvert (pour les exports HTML)
- **Contrôle de version :** Git + GitHub
- **Communication :** Slack
- **Gestion des paquets :** uv (Python), pip-tools pour les dépendances épinglées
- **Qualité des données :** Great Expectations ou scripts d'assertions SQL personnalisés
- **Planification :** jobs dbt Cloud, ou cron + Makefile en local

## Arborescence du projet

```
my-analytics-workspace/
├── .claude/
│   ├── commands/                     # commandes slash disponibles dans ce projet
│   │   ├── analyze.md                # /analyze — explorer un jeu de données ou une question de bout en bout
│   │   ├── sql-query.md              # /sql-query — écrire, optimiser et expliquer du SQL
│   │   ├── dashboard-update.md       # /dashboard-update — actualiser la logique ou le SQL d'un tableau de bord
│   │   ├── data-quality-check.md     # /data-quality-check — exécuter les assertions, détecter les anomalies
│   │   ├── stakeholder-report.md     # /stakeholder-report — transformer les métriques en récit
│   │   └── explore.md                # /explore — EDA libre sur une table ou un jeu de données
│   ├── settings.json                 # hooks, références serveurs MCP, permissions
│   └── mcp.json                      # configurations des serveurs MCP (BigQuery, Slack)
├── queries/                          # SQL sauvegardé et versionné par domaine
│   ├── product/
│   │   ├── dau-wau-mau.sql           # requête sur les métriques d'utilisateurs actifs
│   │   ├── retention-cohorts.sql     # rétention hebdomadaire par cohorte d'inscription
│   │   └── funnel-conversion.sql     # entonnoir étape par étape avec taux d'abandon
│   ├── revenue/
│   │   ├── mrr-breakdown.sql         # MRR par plan, expansion, désabonnement
│   │   ├── ltv-by-segment.sql        # LTV client segmentée par canal d'acquisition
│   │   └── ar-aging.sql              # rapport d'ancienneté des créances clients
│   ├── marketing/
│   │   ├── campaign-attribution.sql  # attribution dernier clic et attribution linéaire par canal
│   │   ├── cac-by-channel.sql        # coût d'acquisition client par canal
│   │   └── email-engagement.sql      # taux d'ouverture/clic par campagne et segment
│   ├── operations/
│   │   ├── support-ticket-volume.sql # volume de tickets, taux de dépassement SLA, CSAT
│   │   └── eng-deploy-frequency.sql  # cadence de déploiement et taux de rollback
│   └── _shared/
│       ├── date-spine.sql            # CTE de dimension date réutilisable
│       └── user-spine.sql            # CTE de dimension utilisateur réutilisable
├── notebooks/                        # notebooks d'analyse Jupyter
│   ├── 2026-05-product-drop-rca.ipynb        # analyse des causes racines, baisse produit mai 2026
│   ├── 2026-04-ltv-model-v2.ipynb            # itération et validation du modèle LTV
│   ├── 2026-03-churn-predictors.ipynb        # exploration des variables prédictives du churn
│   ├── templates/
│   │   ├── eda-template.ipynb        # squelette standard de notebook EDA
│   │   └── ab-test-analysis.ipynb    # template de résultats de test A/B avec tests de significativité
│   └── exports/                      # exports HTML nbconvert pour le partage
│       └── 2026-05-product-drop-rca.html
├── dashboards/                       # spécifications des tableaux de bord et SQL associé
│   ├── executive-weekly/
│   │   ├── spec.md                   # contenu du tableau de bord, audience, fréquence de mise à jour
│   │   ├── headline-metrics.sql      # requête des KPI principaux
│   │   └── wow-trend.sql             # tendance semaine sur semaine avec annotations
│   ├── product-health/
│   │   ├── spec.md
│   │   ├── activation-funnel.sql
│   │   ├── feature-adoption.sql
│   │   └── nps-over-time.sql
│   └── marketing-performance/
│       ├── spec.md
│       ├── paid-overview.sql
│       └── organic-vs-paid.sql
├── reports/                          # livrables pour les parties prenantes — exportés ou rédigés
│   ├── weekly/
│   │   ├── 2026-W22-business-review.md       # récit de la revue commerciale hebdomadaire
│   │   └── 2026-W21-business-review.md
│   ├── monthly/
│   │   ├── 2026-05-monthly-review.md
│   │   └── 2026-04-monthly-review.md
│   └── ad-hoc/
│       ├── 2026-05-15-pricing-impact-analysis.md
│       └── 2026-04-20-q1-board-data-pack.md
├── data-quality/                     # vérifications qualité et journaux d'anomalies
│   ├── checks/
│   │   ├── orders-freshness.sql      # vérifier que les commandes sont chargées dans les 4h suivant la clôture
│   │   ├── revenue-nulls.sql         # vérifier l'absence de revenus nuls sur les commandes complètes
│   │   ├── user-id-referential.sql   # vérifier l'intégrité FK entre utilisateurs et commandes
│   │   └── duplicate-event-ids.sql   # vérifier l'unicité de event_id dans la table des événements
│   ├── anomaly-log.md                # journal continu des anomalies détectées et de leur résolution
│   └── runbook.md                    # procédure en cas d'échec d'une vérification — escalade
├── transforms/                       # modèles dbt gérés depuis cet espace de travail
│   ├── dbt_project.yml               # nom du projet, chemins des modèles, matérialisations par défaut
│   ├── profiles.yml                  # profils de connexion dbt (BigQuery / Snowflake)
│   ├── models/
│   │   ├── staging/
│   │   │   ├── stg_orders.sql        # commandes nettoyées et typées depuis la source brute
│   │   │   ├── stg_users.sql         # utilisateurs nettoyés avec déduplication
│   │   │   └── stg_events.sql        # événements produit nettoyés avec propriétés parsées
│   │   ├── intermediate/
│   │   │   ├── int_user_sessions.sql # construction des sessions à partir des événements
│   │   │   └── int_order_items.sql   # lignes de commande jointes au catalogue produit
│   │   └── marts/
│   │       ├── fct_orders.sql        # table de faits commandes pour le reporting
│   │       ├── fct_events.sql        # table de faits événements pour l'analytique produit
│   │       ├── dim_users.sql         # dimension utilisateur avec segments et tranches LTV
│   │       └── dim_dates.sql         # dimension date pour toute l'intelligence temporelle
│   ├── tests/
│   │   ├── generic/                  # surcharges des tests génériques dbt
│   │   └── singular/
│   │       └── assert_revenue_positive.sql
│   └── macros/
│       ├── date_trunc_safe.sql       # macro date_trunc tolérante aux valeurs nulles
│       └── fiscal_quarter.sql        # trimestre fiscal de l'entreprise depuis la date calendaire
├── docs/                             # dictionnaire de données et définitions des métriques
│   ├── metric-definitions.md         # définitions canoniques de toutes les métriques reportées
│   ├── data-dictionary.md            # descriptions des tables et colonnes pour les jeux de données clés
│   ├── schema-changelog.md           # historique des changements de schéma en amont et leur impact
│   └── onboarding.md                 # comment un nouvel analyste prend en main cet espace de travail
├── requirements.txt                  # dépendances Python épinglées
├── pyproject.toml                    # métadonnées du projet et configuration des outils (ruff, black)
├── Makefile                          # tâches courantes : dbt run, vérifications qualité, export de notebooks
├── .env.example                      # modèle de variables d'environnement — ne jamais committer .env
└── CLAUDE.md                         # instructions du projet pour Claude Code
```

## Fichiers clés expliqués

| Chemin | Objectif |
|---|---|
| `.claude/commands/analyze.md` | Commande slash qui prend le nom d'un jeu de données et une question, exécute une EDA et retourne un constat structuré avec SQL et interprétation |
| `.claude/commands/stakeholder-report.md` | Génère un récit métier à partir de chiffres bruts — titre, moteurs, anomalies, recommandations |
| `.claude/settings.json` | Configure les hooks (auto-staging du SQL à l'écriture, journal d'audit) et référence les serveurs MCP BigQuery et Slack |
| `queries/_shared/date-spine.sql` | CTE de dimension date partagée, référencée dans toutes les requêtes temporelles — toute modification se propage partout |
| `transforms/models/marts/fct_orders.sql` | Table de faits commandes centrale — source de vérité pour le revenu, le nombre de transactions et l'AOV |
| `docs/metric-definitions.md` | Définitions canoniques pour que Claude (et les humains) utilisent la même logique métier pour chaque métrique |
| `data-quality/anomaly-log.md` | Journal continu des problèmes de données — Claude y ajoute des entrées lorsque /data-quality-check détecte des anomalies |
| `dashboards/executive-weekly/spec.md` | Spécification du tableau de bord incluant l'audience, le calendrier de mise à jour, les responsables des KPI et les limitations connues |

## Scaffold rapide

```bash
# Créer le répertoire de l'espace de travail et y entrer
mkdir my-analytics-workspace && cd my-analytics-workspace
git init

# Créer les répertoires de config Claude Code et les fichiers de commandes
mkdir -p .claude/commands .claude/logs

# Répertoires principaux de l'espace de travail
mkdir -p queries/{product,revenue,marketing,operations,_shared}
mkdir -p notebooks/{templates,exports}
mkdir -p dashboards/{executive-weekly,product-health,marketing-performance}
mkdir -p reports/{weekly,monthly,ad-hoc}
mkdir -p data-quality/checks
mkdir -p transforms/models/{staging,intermediate,marts}
mkdir -p transforms/{tests/singular,tests/generic,macros}
mkdir -p docs

# Créer des fichiers vides pour que les répertoires soient suivis par git
touch queries/product/dau-wau-mau.sql
touch queries/revenue/mrr-breakdown.sql
touch queries/_shared/{date-spine.sql,user-spine.sql}
touch data-quality/anomaly-log.md data-quality/runbook.md
touch docs/{metric-definitions.md,data-dictionary.md,schema-changelog.md}

# Environnement Python
python3 -m venv .venv
source .venv/bin/activate
pip install uv
uv pip install pandas polars jupyterlab nbconvert great-expectations dbt-bigquery sqlfluff ruff black

# Geler les dépendances
pip freeze > requirements.txt

# Initialisation du projet dbt (choisir bigquery ou snowflake)
dbt init transforms

# Créer .env.example
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

# Installer les skills Claude Code
npx claudient add skill data-ml/sql
npx claudient add skill data-ml/pandas-polars
npx claudient add skill data-ml/dashboard-narrator
npx claudient add skill data-ml/data-quality-checker
npx claudient add skill data-ml/stakeholder-report
npx claudient add skill data-ml/dbt-data-pipelines
npx claudient add skill data-ml/synthetic-data

git add .
git commit -m "chore: initial data analyst workspace scaffold"
```

## Modèle CLAUDE.md

```markdown
# Espace de travail Data Analyst

Cet espace de travail est destiné à l'analyse exploratoire, la maintenance des tableaux
de bord, les demandes ponctuelles et les rapports pour les parties prenantes. La source
de vérité pour toutes les métriques est dans l'entrepôt de données BigQuery/Snowflake.
dbt gère les transformations. Looker/Metabase constitue la couche BI. Ne pas modifier
les modèles dbt de la couche mart sans comprendre les dépendances des tableaux de bord
en aval.

---

## Stack

- Entrepôt de données : BigQuery (projet : `your-gcp-project`) ou Snowflake
- Transformations : dbt Core, modèles dans `transforms/`
- BI : Looker / Metabase (spécifications des tableaux de bord dans `dashboards/`)
- Analyse : Python 3.11, pandas 2.x / polars 0.20, JupyterLab 4
- Contrôle de version : Git + GitHub

---

## Définitions des métriques

Toutes les définitions de métriques font référence dans `docs/metric-definitions.md`.
Ne jamais calculer une métrique différemment de ce qui y est défini.
Si une partie prenante demande un chiffre en contradiction avec ces définitions, le signaler.

---

## Tâches courantes et commandes exactes

| Tâche | Commande |
|---|---|
| Explorer un jeu de données ou répondre à une question | `/analyze <table_or_dataset> — <question>` |
| Écrire ou déboguer une requête SQL | `/sql-query <décrire ce dont vous avez besoin>` |
| Mettre à jour le SQL d'un tableau de bord | `/dashboard-update <dashboard-name>` |
| Exécuter des vérifications qualité sur une table | `/data-quality-check <table_name>` |
| Rédiger un rapport pour les parties prenantes à partir de métriques | `/stakeholder-report <contexte ou métriques à coller>` |
| EDA libre sur une nouvelle table | `/explore <table_name>` |

---

## Conventions SQL

- Toutes les requêtes utilisent des CTE — pas d'imbrication de sous-requêtes au-delà de deux niveaux
- Les filtres de dates utilisent toujours `DATE_TRUNC` avec une granularité explicite (jour, semaine, mois)
- BigQuery : utiliser les identifiants avec backtick — `` `project.dataset.table` ``
- Snowflake : utiliser les identifiants entre guillemets doubles lorsque le schéma est sensible à la casse
- Les fonctions de fenêtrage sont préférées aux auto-jointures pour les totaux cumulatifs et les classements
- Toute requête sauvegardée dans `queries/` doit avoir un bloc de commentaires : objectif, granularité, responsable

---

## Conventions dbt

- Modèles staging : `stg_<source>_<entity>.sql` — nettoyage et typage uniquement
- Modèles intermediate : `int_<description>.sql` — jointures et sessionisation
- Modèles mart : `fct_<entity>.sql` et `dim_<entity>.sql` — prêts pour le reporting
- Tous les modèles mart doivent avoir des tests dbt : `not_null`, `unique` sur les clés primaires
- Ne pas renommer les colonnes des marts sans mettre à jour `docs/metric-definitions.md`

---

## Conventions pour les notebooks

- Format du nom de fichier : `YYYY-MM-<slug>.ipynb` (ex. `2026-05-ltv-deep-dive.ipynb`)
- Première cellule : markdown — objectif, responsable, date, questions clés traitées
- Dernière cellule : markdown — synthèse des résultats et actions recommandées
- Exporter en HTML avant de partager : `jupyter nbconvert --to html <notebook>`

---

## Qualité des données

- Toutes les anomalies détectées doivent être ajoutées à `data-quality/anomaly-log.md`
- Format : date, table, description du problème, impact, statut de résolution
- En cas d'échec d'une vérification dans `data-quality/checks/`, suivre `data-quality/runbook.md`

---

## À ne pas faire

- Ne pas committer `.env` — utiliser uniquement `.env.example`
- Ne pas modifier `docs/metric-definitions.md` sans revue de l'équipe
- Ne pas créer de notebooks en dehors de `notebooks/` — les exports vont dans `notebooks/exports/`
- Ne pas exécuter de SQL destructif (DELETE, TRUNCATE, DROP) sans une deuxième confirmation
```

## Serveurs MCP

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

## Skills à installer

```bash
npx claudient add skill data-ml/sql
npx claudient add skill data-ml/pandas-polars
npx claudient add skill data-ml/dashboard-narrator
npx claudient add skill data-ml/data-quality-checker
npx claudient add skill data-ml/stakeholder-report
npx claudient add skill data-ml/dbt-data-pipelines
npx claudient add skill data-ml/synthetic-data
```

## Ressources associées

- [Guide : Claude pour les analystes de données](../guides/for-data-analyst.md)
- [Workflow : Reporting de données](../workflows/data-reporting.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
