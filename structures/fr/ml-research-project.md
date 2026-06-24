# Projet de recherche ML — Structure de projet

> Pour les chercheurs en ML et les data scientists qui conduisent des expériences reproductibles — optimisant le cycle allant des données brutes jusqu'à l'ingénierie des variables, l'entraînement des modèles, le suivi MLflow et les artefacts versionnés avec DVC.

## Stack

- **Python :** 3.12 (géré via `uv`)
- **Gestion des dépendances :** uv 0.4+ (remplace pip/venv ; fichier de verrouillage `uv.lock`)
- **Notebooks :** JupyterLab 4.2+ (lancé via `make lab`)
- **Suivi des expériences + registre de modèles :** MLflow 2.14+ (`mlruns/` en local ou URI de suivi distant)
- **Versionnage des données :** DVC 3.50+ (remotes : S3 / GCS / local ; `data/` et `models/` suivis)
- **Gestion de la configuration :** Hydra 1.3 + OmegaConf (configs YAML composées par run d'expérience)
- **Deep learning :** PyTorch 2.3+ (optionnel : à remplacer par scikit-learn 1.5 pour le ML classique)
- **ML classique :** scikit-learn 1.5, xgboost 2.1, lightgbm 4.3
- **Manipulation des données :** pandas 2.2, polars 0.20+, numpy 1.26
- **Visualisation :** matplotlib 3.9, seaborn 0.13, plotly 5.22
- **Tests :** pytest 8+ avec pytest-cov, nbval (tests de régression sur les notebooks)
- **Linting/formatage :** Ruff 0.4+, mypy 1.10 (src/ uniquement)
- **Hooks pre-commit :** pre-commit 3.7 (ruff, mypy, nbstripout, detect-secrets)
- **CI :** GitHub Actions (lint → test → vérification DVC repro sur les PRs)
- **Exécuteur de tâches :** Makefile (lab, train, evaluate, dvc-pull, lint, test)

## Arborescence du projet

```
ml-research-project/
├── .github/
│   └── workflows/
│       ├── ci.yml                              # PR : ruff, mypy, pytest, tests smoke nbval
│       └── dvc-repro-check.yml                 # Sur PR : dvc repro --dry sur les stages modifiés
├── .dvc/
│   ├── config                                  # URL du remote DVC, paramètres d'authentification
│   └── .gitignore                              # Ignore le cache DVC
├── configs/
│   ├── config.yaml                             # Config Hydra racine : liste des defaults
│   ├── data/
│   │   ├── raw_tabular.yaml                    # raw_path, target_col, id_col, date_col
│   │   └── image_dataset.yaml                  # image_dir, resize, channels, flag augment
│   ├── features/
│   │   ├── baseline_features.yaml              # Liste des variables pour le run baseline
│   │   └── engineered_features.yaml            # Variables polynomiales, d'interaction et de décalage
│   ├── model/
│   │   ├── logistic_regression.yaml            # C, solver, max_iter, class_weight
│   │   ├── xgboost.yaml                        # n_estimators, max_depth, lr, subsample
│   │   ├── lightgbm.yaml                       # num_leaves, min_child_samples, lambda_l1
│   │   └── pytorch_mlp.yaml                    # hidden_dims, dropout, activation, batch_norm
│   ├── training/
│   │   ├── default.yaml                        # epochs, batch_size, optimizer, scheduler
│   │   ├── fast_debug.yaml                     # max_samples : 1000, epochs : 2 (vérification rapide)
│   │   └── full_run.yaml                       # Jeu de données complet, early stopping, cv_folds : 5
│   └── experiment/
│       ├── baseline.yaml                       # Compose : data/raw_tabular + model/logistic_regression + training/default
│       ├── xgb_sweep.yaml                      # Compose : data/raw_tabular + model/xgboost + training/full_run
│       └── mlp_ablation.yaml                   # Compose : data/raw_tabular + model/pytorch_mlp + training/full_run
├── data/
│   ├── .gitignore                              # Ignore tous les fichiers de données (gérés par DVC)
│   ├── raw/
│   │   ├── dataset.csv.dvc                     # Pointeur DVC vers le jeu de données brut dans le remote
│   │   └── dataset.csv                         # Non commité ; récupéré via dvc pull
│   ├── processed/
│   │   ├── train.parquet.dvc                   # Pointeur DVC : nettoyé, divisé, encodé
│   │   ├── val.parquet.dvc
│   │   └── test.parquet.dvc
│   └── external/
│       └── reference_labels.csv.dvc            # Table de référence tierce (suivie par DVC)
├── models/
│   ├── .gitignore                              # Ignore tous les fichiers d'artefacts
│   ├── baseline_lr/
│   │   ├── model.pkl.dvc                       # Pointeur DVC vers le pipeline sklearn sérialisé
│   │   └── metadata.json                       # run_id, mlflow_uri, train_date, snapshot des métriques
│   ├── xgb_v1/
│   │   ├── model.pkl.dvc
│   │   └── metadata.json
│   └── best/
│       └── model.pkl.dvc                       # Lien symbolique/copie de l'artefact du modèle champion actuel
├── notebooks/
│   ├── 01_eda.ipynb                            # Analyse exploratoire : distributions, valeurs manquantes, corrélations
│   ├── 02_baseline.ipynb                       # Pipeline baseline : régression logistique, matrice de confusion, courbe PR
│   ├── 03_experiments/
│   │   ├── 03a_xgboost_tuning.ipynb           # Balayage d'hyperparamètres XGBoost, importance des variables
│   │   ├── 03b_feature_engineering.ipynb       # Variables de décalage, interactions, encodage par la cible
│   │   └── 03c_error_analysis.ipynb            # Analyse des erreurs par segment, exemples les plus difficiles
│   ├── 04_model_comparison.ipynb               # Requête MLflow : comparaison de tous les runs, tracé du front de Pareto
│   └── 05_production_readiness.ipynb           # Benchmark de latence, courbe de calibration, sélection du seuil
├── reports/
│   ├── figures/
│   │   ├── eda_distributions.png               # Généré par 01_eda.ipynb
│   │   ├── roc_curves.png                      # Généré par 02_baseline.ipynb
│   │   ├── feature_importance.png              # Généré par 03a_xgboost_tuning.ipynb
│   │   └── model_comparison_pareto.png         # Généré par 04_model_comparison.ipynb
│   └── metrics/
│       ├── baseline_eval.json                  # {"accuracy": 0.82, "f1": 0.79, "auc": 0.87}
│       └── xgb_eval.json                       # Indexé par mlflow run_id pour la traçabilité
├── src/
│   ├── __init__.py
│   ├── data/
│   │   ├── __init__.py
│   │   ├── loader.py                           # load_raw(), load_processed() — retourne un DataFrame polars
│   │   ├── splitter.py                         # temporal_split(), stratified_split() — compatible sklearn
│   │   ├── validator.py                        # Vérifications de schéma great_expectations sur les données ingérées
│   │   └── pipeline.py                         # Stage DVC : raw → processed (appelé par dvc.yaml)
│   ├── features/
│   │   ├── __init__.py
│   │   ├── encoders.py                         # TargetEncoder, FrequencyEncoder (sklearn TransformerMixin)
│   │   ├── lag_features.py                     # add_lag_features(df, cols, windows) pour les tâches de séries temporelles
│   │   ├── interactions.py                     # add_polynomial_features(), add_ratio_features()
│   │   └── selector.py                         # Wrapper BorutaPy, helper de classement mutual_info_classif
│   ├── models/
│   │   ├── __init__.py
│   │   ├── base.py                             # ABC BaseModel : fit(), predict(), predict_proba(), get_params()
│   │   ├── sklearn_model.py                    # SklearnModel encapsule Pipeline ; journalise dans MLflow à fit()
│   │   ├── xgb_model.py                        # XGBModel avec early stopping, eval_set, mlflow.xgboost.autolog()
│   │   ├── lgbm_model.py                       # LGBMModel avec bascule dart/gbdt, callback log_evaluation
│   │   └── pytorch_model.py                    # MLPClassifier (nn.Module) + Trainer avec AMP, gradient clipping
│   └── evaluation/
│       ├── __init__.py
│       ├── metrics.py                          # compute_metrics(y_true, y_pred) → dict ; journalise dans le run MLflow actif
│       ├── calibration.py                      # reliability_diagram(), expected_calibration_error()
│       ├── explainability.py                   # Valeurs SHAP, graphiques en cascade, graphiques de dépendance
│       └── report.py                           # generate_eval_report() → sauvegarde le JSON dans reports/metrics/
├── tests/
│   ├── conftest.py                             # Fixtures partagées : tiny_df (10 lignes polars), tmp_mlflow_tracking_uri
│   ├── data/
│   │   ├── test_loader.py                      # load_raw/load_processed avec des fichiers parquet de fixture locaux
│   │   ├── test_splitter.py                    # Taille du split, stratification, assertions d'absence de fuite
│   │   └── test_validator.py                   # Les vérifications de schéma réussissent sur une fixture valide ; échouent sur une entrée corrompue
│   ├── features/
│   │   ├── test_encoders.py                    # TargetEncoder fit/transform, inverse, gestion des catégories inconnues
│   │   ├── test_lag_features.py                # Fenêtre de décalage correcte, pas d'anticipation sur un df trié
│   │   └── test_selector.py                    # Le sélecteur retourne un sous-ensemble de colonnes, déterministe sur la graine
│   ├── models/
│   │   ├── test_sklearn_model.py               # fit() journalise un run dans l'URI MLflow tmp ; predict() retourne la forme correcte
│   │   ├── test_xgb_model.py                   # L'early stopping s'arrête ; le run MLflow est créé
│   │   └── test_pytorch_model.py               # Forme de la passe avant, la boucle d'entraînement ne plante pas sur tiny_df
│   └── evaluation/
│       ├── test_metrics.py                     # compute_metrics retourne les clés attendues ; valeurs dans [0,1]
│       └── test_report.py                      # generate_eval_report écrit du JSON valide dans un chemin tmp
├── dvc.yaml                                    # Stages du pipeline DVC : prepare → featurize → train → evaluate
├── dvc.lock                                    # Checksums verrouillés pour toutes les sorties des stages DVC
├── Makefile                                    # Cibles : lab, train, evaluate, dvc-pull, lint, test, repro
├── pyproject.toml                              # Toutes les dépendances, config ruff, config mypy, config pytest, tool.uv
├── .pre-commit-config.yaml                     # Hooks ruff, mypy, nbstripout, detect-secrets
├── .env.example                                # MLFLOW_TRACKING_URI, DVC_REMOTE_URL, clés AWS_* / GCS_*
├── mlruns/                                     # Répertoire de suivi MLflow local (.gitignored sauf .gitkeep)
└── .gitignore                                  # data/, models/, mlruns/, __pycache__, .ipynb_checkpoints
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `dvc.yaml` | Déclare les stages du pipeline DVC (`prepare`, `featurize`, `train`, `evaluate`) ; chaque stage spécifie `cmd`, `deps`, `params` et `outs` ; `dvc repro` exécute le pipeline complet en ignorant les stages inchangés |
| `configs/experiment/baseline.yaml` | Liste Hydra defaults qui compose `data/raw_tabular`, `model/logistic_regression` et `training/default` ; transmise à `src/models/sklearn_model.py` via `@hydra.main(config_path="../../configs", config_name="experiment/baseline")` |
| `src/models/base.py` | Classe de base abstraite implémentée par tous les wrappers de modèles ; garantit que chaque modèle expose `fit()`, `predict()`, `predict_proba()` et `get_params()` pour que l'évaluation et les stages DVC soient indépendants du modèle |
| `src/evaluation/metrics.py` | `compute_metrics(y_true, y_pred, y_proba)` calcule l'accuracy, le F1, le ROC-AUC et la log-loss ; journalise chacun via `mlflow.log_metric()` sur le run actif de l'appelant ; retourne le dict pour la sérialisation JSON |
| `src/data/pipeline.py` | Point d'entrée du stage DVC `prepare` ; lit `data/raw/dataset.csv`, valide le schéma via `validator.py`, applique les étapes de nettoyage, écrit `data/processed/train|val|test.parquet` |
| `pyproject.toml` | Source de vérité unique : `[project.dependencies]`, `[tool.ruff]` (select E/F/I/UP, ignores par fichier pour les notebooks), `[tool.mypy]` (strict, `src/` uniquement), `[tool.pytest.ini_options]` (cov=src, testpaths=tests) |
| `Makefile` | Exécuteur de tâches canonique : `make train` lance l'expérience Hydra+MLflow ; `make dvc-pull` récupère les données distantes ; `make lab` lance JupyterLab ; `make repro` exécute `dvc repro` |
| `.pre-commit-config.yaml` | Exécute `nbstripout` (supprime les sorties des notebooks avant le commit), `detect-secrets` (bloque les commits contenant des credentials), `ruff` (formatage + lint), `mypy` (vérification de types pour `src/`) |

## Mise en place rapide

```bash
# Prérequis : Python 3.12+, uv (pip install uv), DVC (pip install dvc[s3])
PROJECT=ml-research-project
mkdir -p $PROJECT && cd $PROJECT

# Initialisation du projet Python avec uv
uv init --python 3.12
uv add mlflow==2.14 dvc hydra-core omegaconf \
    torch torchvision scikit-learn xgboost lightgbm \
    pandas polars numpy matplotlib seaborn plotly \
    shap great-expectations

uv add --dev pytest pytest-cov nbval ruff mypy pre-commit \
    jupyterlab ipywidgets nbstripout detect-secrets

# Structure des répertoires
mkdir -p .github/workflows
mkdir -p .dvc
mkdir -p configs/data configs/features configs/model configs/training configs/experiment
mkdir -p data/raw data/processed data/external
mkdir -p models/baseline_lr models/xgb_v1 models/best
mkdir -p notebooks/03_experiments
mkdir -p reports/figures reports/metrics
mkdir -p src/data src/features src/models src/evaluation
mkdir -p tests/data tests/features tests/models tests/evaluation
mkdir -p mlruns

# Création des fichiers sources
touch src/__init__.py
touch src/data/__init__.py src/data/loader.py src/data/splitter.py src/data/validator.py src/data/pipeline.py
touch src/features/__init__.py src/features/encoders.py src/features/lag_features.py src/features/interactions.py src/features/selector.py
touch src/models/__init__.py src/models/base.py src/models/sklearn_model.py src/models/xgb_model.py src/models/lgbm_model.py src/models/pytorch_model.py
touch src/evaluation/__init__.py src/evaluation/metrics.py src/evaluation/calibration.py src/evaluation/explainability.py src/evaluation/report.py

# Création des fichiers de tests
touch tests/conftest.py
touch tests/data/test_loader.py tests/data/test_splitter.py tests/data/test_validator.py
touch tests/features/test_encoders.py tests/features/test_lag_features.py tests/features/test_selector.py
touch tests/models/test_sklearn_model.py tests/models/test_xgb_model.py tests/models/test_pytorch_model.py
touch tests/evaluation/test_metrics.py tests/evaluation/test_report.py

# Initialisation DVC
dvc init
dvc remote add -d myremote s3://your-bucket/ml-research-project  # à remplacer par GCS/local si besoin

# .gitignore pour les données et mlruns
cat > .gitignore << 'EOF'
data/raw/*.csv
data/raw/*.parquet
data/processed/
data/external/*.csv
models/*/model.pkl
models/best/
mlruns/
__pycache__/
.ipynb_checkpoints/
*.pyc
.env
.mypy_cache/
.ruff_cache/
EOF

# .gitkeep pour mlruns afin que le répertoire soit suivi
touch mlruns/.gitkeep

# Squelette du pipeline DVC
cat > dvc.yaml << 'EOF'
stages:
  prepare:
    cmd: uv run python src/data/pipeline.py
    deps:
      - src/data/pipeline.py
      - src/data/loader.py
      - src/data/validator.py
      - data/raw/dataset.csv
    params:
      - configs/data/raw_tabular.yaml:
    outs:
      - data/processed/train.parquet
      - data/processed/val.parquet
      - data/processed/test.parquet

  featurize:
    cmd: uv run python src/features/selector.py
    deps:
      - src/features/
      - data/processed/train.parquet
    params:
      - configs/features/baseline_features.yaml:
    outs:
      - data/processed/train_features.parquet
      - data/processed/val_features.parquet

  train:
    cmd: uv run python -m src.models.sklearn_model
    deps:
      - src/models/sklearn_model.py
      - src/models/base.py
      - data/processed/train_features.parquet
    params:
      - configs/model/logistic_regression.yaml:
      - configs/training/default.yaml:
    outs:
      - models/baseline_lr/model.pkl

  evaluate:
    cmd: uv run python -m src.evaluation.report
    deps:
      - src/evaluation/
      - models/baseline_lr/model.pkl
      - data/processed/val_features.parquet
      - data/processed/test.parquet
    outs:
      - reports/metrics/baseline_eval.json
EOF

# Makefile
cat > Makefile << 'EOF'
.PHONY: lab train evaluate dvc-pull dvc-push repro lint test clean

lab:
	uv run jupyter lab --notebook-dir=notebooks/

train:
	uv run python -m hydra_plugins.experiment +experiment=baseline

evaluate:
	uv run python -m src.evaluation.report

dvc-pull:
	dvc pull

dvc-push:
	dvc push

repro:
	dvc repro

lint:
	uv run ruff check src/ tests/
	uv run ruff format --check src/ tests/
	uv run mypy src/

format:
	uv run ruff format src/ tests/
	uv run ruff check --fix src/ tests/

test:
	uv run pytest tests/ --cov=src --cov-report=term-missing --cov-fail-under=75

nbtest:
	uv run pytest --nbval notebooks/01_eda.ipynb notebooks/02_baseline.ipynb

clean:
	find . -type d -name __pycache__ -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete
	rm -rf .mypy_cache .ruff_cache
EOF

# Configuration pre-commit
cat > .pre-commit-config.yaml << 'EOF'
repos:
  - repo: https://github.com/kynan/nbstripout
    rev: 0.7.1
    hooks:
      - id: nbstripout
  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.5.0
    hooks:
      - id: detect-secrets
        args: ["--baseline", ".secrets.baseline"]
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.4.10
    hooks:
      - id: ruff
        args: [--fix]
      - id: ruff-format
  - repo: https://github.com/pre-commit/mirrors-mypy
    rev: v1.10.0
    hooks:
      - id: mypy
        files: ^src/
        additional_dependencies: [types-all]
EOF

uv run pre-commit install

# GitHub Actions CI
cat > .github/workflows/ci.yml << 'EOF'
name: CI
on: [pull_request]
jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: astral-sh/setup-uv@v2
        with:
          python-version: "3.12"
      - run: uv sync --all-extras
      - run: uv run ruff check src/ tests/
      - run: uv run ruff format --check src/ tests/
      - run: uv run mypy src/
      - run: uv run pytest tests/ --cov=src --cov-fail-under=75
EOF

# .env.example
cat > .env.example << 'EOF'
# Suivi MLflow (définir sur une URI distante pour une utilisation en équipe, ex. http://mlflow-server:5000)
MLFLOW_TRACKING_URI=mlruns

# Credentials du remote DVC (exemple S3)
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1

# Credentials du remote DVC (exemple GCS — alternative à S3)
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json

# Optionnel : nom de l'expérience MLflow (par défaut "Default")
MLFLOW_EXPERIMENT_NAME=ml-research-project
EOF

# Installation des skills UitKit
npx uitkit add skill data-ml/experiment-tracker
npx uitkit add skill data-ml/dvc-pipeline
npx uitkit add skill data-ml/model-evaluator
npx uitkit add skill data-ml/feature-engineer
npx uitkit add skill backend/python/hydra-config
npx uitkit add skill productivity/notebook-reviewer
npx uitkit add skill productivity/test-generator

echo "Mise en place du projet ML terminée. Étapes suivantes :"
echo "  1. cp .env.example .env && modifier .env avec vos credentials DVC remote"
echo "  2. dvc pull  # récupérer les données depuis le remote"
echo "  3. make lab  # ouvrir JupyterLab"
echo "  4. make repro  # exécuter le pipeline DVC complet"
```

## Template CLAUDE.md

```markdown
# Projet de recherche ML

Base de code ML reproductible utilisant Hydra (configuration), MLflow (suivi) et DVC (versionnage des données et des modèles).
Toutes les expériences sont suivies dans MLflow. Toutes les données et artefacts de modèles sont versionnés avec DVC.
Le code source se trouve dans src/ ; les notebooks dans notebooks/ ; les configurations dans configs/.

## Stack

- Python 3.12, uv (gestionnaire de paquets, fichier de verrouillage à uv.lock)
- JupyterLab 4.2 — notebooks/ — lancer avec `make lab`
- MLflow 2.14 — suivi des expériences + registre de modèles — en local dans mlruns/ ou en distant via MLFLOW_TRACKING_URI
- DVC 3.50 — data/ et models/ sont suivis par DVC ; ne jamais commiter ces fichiers directement
- Hydra 1.3 — répertoire configs/ ; composer les configs d'expérience via la liste des defaults
- PyTorch 2.3 (src/models/pytorch_model.py) et scikit-learn 1.5 (src/models/sklearn_model.py)
- pandas 2.2, polars 0.20, numpy 1.26
- pytest 8 + pytest-cov + nbval ; les tests se trouvent dans tests/

## Exécuter une expérience

### Étape 1 : Récupérer les données depuis le remote DVC
```bash
dvc pull                                     # récupérer data/ et models/ depuis le remote DVC
# ou récupérer un chemin spécifique :
dvc pull data/raw/dataset.csv.dvc
```

### Étape 2 : Exécuter via Hydra + MLflow (recommandé)
```bash
# Exécuter l'expérience baseline (compose configs/experiment/baseline.yaml)
uv run python -m src.models.sklearn_model +experiment=baseline

# Exécuter XGBoost avec des overrides
uv run python -m src.models.xgb_model +experiment=xgb_sweep model.xgboost.max_depth=8

# Exécuter avec la config fast_debug (1000 échantillons, 2 epochs — vérification rapide)
uv run python -m src.models.sklearn_model +experiment=baseline training=fast_debug

# Balayage multirun (syntaxe Hydra sweep)
uv run python -m src.models.xgb_model +experiment=xgb_sweep \
    model.xgboost.max_depth=4,6,8 \
    model.xgboost.n_estimators=100,200 --multirun
```

Le script d'expérience doit appeler `mlflow.set_experiment(cfg.experiment_name)` et
`mlflow.start_run()` avant l'entraînement. Toutes les valeurs de config Hydra doivent être
journalisées via `mlflow.log_params(OmegaConf.to_container(cfg, resolve=True))`.

### Étape 3 : Exécuter le pipeline DVC (données → variables → entraînement → évaluation)
```bash
make repro        # exécute dvc repro — ignore les stages inchangés
dvc repro -f      # forcer la réexécution de tous les stages
dvc status        # afficher les stages obsolètes
```

### Étape 4 : Visualiser les résultats dans l'interface MLflow
```bash
uv run mlflow ui --port 5001
# naviguer vers http://localhost:5001
# filtrer par nom d'expérience, trier par val_auc
```

## Cibles Makefile

| Cible | Commande | Rôle |
|---|---|---|
| `make lab` | `uv run jupyter lab --notebook-dir=notebooks/` | Ouvrir JupyterLab |
| `make train` | Expérience Hydra + MLflow | Exécuter l'expérience configurée |
| `make evaluate` | `uv run python -m src.evaluation.report` | Évaluer le modèle champion |
| `make dvc-pull` | `dvc pull` | Récupérer tous les fichiers suivis par DVC |
| `make dvc-push` | `dvc push` | Pousser les nouveaux artefacts vers le remote |
| `make repro` | `dvc repro` | Réexécuter les stages DVC obsolètes |
| `make lint` | ruff + mypy | Vérifier src/ et tests/ |
| `make format` | ruff format + fix | Formater automatiquement src/ et tests/ |
| `make test` | pytest --cov=src | Exécuter les tests avec seuil de couverture (75%) |
| `make nbtest` | pytest --nbval | Tests de régression sur les notebooks clés |
| `make clean` | rm __pycache__, caches | Supprimer les artefacts de build |

## Conventions de nommage des notebooks

- Préfixer avec un numéro de séquence à deux chiffres : `01_`, `02_`, `03_`
- Les sous-expériences dans `03_experiments/` utilisent des suffixes alphabétiques : `03a_`, `03b_`
- Tous les notebooks doivent être vidés de leurs sorties avant le commit (`nbstripout` s'exécute via pre-commit)
- Les notebooks ne sont pas la source de vérité pour la logique des modèles — déplacer le code réutilisable vers src/ après le prototypage
- Utiliser `%autoreload 2` dans la première cellule pour prendre en compte les modifications en direct de src/ sans redémarrer le kernel
- Journaliser tous les résultats clés dans MLflow depuis les notebooks en utilisant `mlflow.log_metric()` / `mlflow.log_artifact()`

## Protocole d'évaluation des modèles

1. **Ne jamais évaluer sur le jeu de test pendant le développement.** Jeu de validation uniquement. Le jeu de test est réservé à la sélection finale du modèle.
2. Appeler `src.evaluation.metrics.compute_metrics(y_true, y_pred, y_proba)` pour journaliser les métriques dans MLflow.
3. Vérifier la calibration : `src.evaluation.calibration.reliability_diagram()` avant de promouvoir un modèle.
4. Générer les valeurs SHAP pour le modèle champion : `src.evaluation.explainability`.
5. Sauvegarder le rapport d'évaluation : `src.evaluation.report.generate_eval_report()` écrit dans `reports/metrics/<run_id>.json`.
6. Enregistrer le champion dans le registre de modèles MLflow :
   ```python
   mlflow.register_model(f"runs:/{run_id}/model", "ChampionModel")
   ```
7. Pousser l'artefact du modèle vers le remote DVC : `dvc push models/best/model.pkl.dvc`

## Ajouter un nouveau modèle

1. Créer `src/models/<name>_model.py` en implémentant `BaseModel` (depuis `src/models/base.py`)
2. Ajouter une config Hydra : `configs/model/<name>.yaml` avec tous les hyperparamètres
3. Créer une config d'expérience : `configs/experiment/<name>_experiment.yaml` composant data + model + training
4. Ajouter un stage DVC dans `dvc.yaml` pour les étapes train + evaluate du nouveau modèle
5. Écrire les tests dans `tests/models/test_<name>_model.py` — au minimum : fit() journalise un run, predict() retourne la forme correcte

## Règles de workflow DVC

- Ne jamais `git add data/` ou `git add models/` — toujours utiliser `dvc add` pour ces chemins
- Après l'ajout d'un nouveau fichier de données : `dvc add data/raw/newfile.csv && git add data/raw/newfile.csv.dvc .gitignore && dvc push`
- Après l'entraînement d'un nouveau modèle : `dvc add models/<name>/model.pkl && dvc push`
- `dvc.lock` est commité et suit les checksums exacts — toujours le commiter avec les changements de code qui réentraînent un modèle

## Ce qu'il ne faut pas faire

- Ne pas importer depuis les notebooks dans src/ — les notebooks consomment src/, pas l'inverse
- Ne pas coder en dur les chemins de fichiers — utiliser cfg.data.raw_path depuis la config Hydra
- Ne pas journaliser avec print() pendant l'entraînement — utiliser le logging Python ou les tags MLflow
- Ne pas commiter les fichiers data/ ou models/ directement — DVC doit les gérer
- Ne pas commiter les sorties des notebooks — nbstripout dans pre-commit s'en charge
- Ne pas évaluer sur le jeu de test avant la sélection finale du modèle
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
        "/path/to/ml-research-project"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "sqlite": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sqlite", "--db-path", "mlruns/mlflow.db"],
      "description": "Interroger directement la base de données SQLite de suivi MLflow lors de l'utilisation de l'URI locale sqlite:///mlruns/mlflow.db"
    },
    "aws": {
      "command": "npx",
      "args": ["-y", "@aws/mcp-server-core"],
      "env": {
        "AWS_ACCESS_KEY_ID": "${AWS_ACCESS_KEY_ID}",
        "AWS_SECRET_ACCESS_KEY": "${AWS_SECRET_ACCESS_KEY}",
        "AWS_DEFAULT_REGION": "${AWS_DEFAULT_REGION}"
      },
      "description": "Inspecter et gérer les données DVC distantes sur S3"
    },
    "jupyter": {
      "command": "npx",
      "args": ["-y", "@jupyterlab/mcp-server"],
      "env": {
        "JUPYTER_TOKEN": "${JUPYTER_TOKEN}",
        "JUPYTER_BASE_URL": "http://localhost:8888"
      },
      "description": "Lire et exécuter des cellules de notebooks via une instance JupyterLab en cours d'exécution"
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
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$FILE\" == *.py && \"$FILE\" == */src/* ]]; then uv run ruff format \"$FILE\" 2>/dev/null || true; uv run ruff check --fix \"$FILE\" 2>/dev/null || true; fi'"
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
            "command": "bash -c 'CMD=\"$CLAUDE_TOOL_INPUT_COMMAND\"; if echo \"$CMD\" | grep -q \"git add\" && echo \"$CMD\" | grep -qE \"data/|models/\"; then echo \"[HOOK] Avertissement : tentative de git add sur un chemin suivi par DVC. Utiliser dvc add à la place.\" >&2; exit 1; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'cd \"${CLAUDE_PROJECT_DIR:-$PWD}\" && STALE=$(dvc status 2>/dev/null | grep -v \"^Data and pipelines are up to date\" | head -5); if [ -n \"$STALE\" ]; then echo \"[Rappel] Le pipeline DVC a des stages obsolètes — exécuter make repro pour synchroniser :\"; echo \"$STALE\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Skills à installer

```bash
npx uitkit add skill data-ml/experiment-tracker
npx uitkit add skill data-ml/dvc-pipeline
npx uitkit add skill data-ml/model-evaluator
npx uitkit add skill data-ml/feature-engineer
npx uitkit add skill data-ml/stakeholder-report
npx uitkit add skill backend/python/hydra-config
npx uitkit add skill productivity/notebook-reviewer
npx uitkit add skill productivity/test-generator
npx uitkit add skill git/pr-description
```

## Références

- [Guide de recherche ML](../guides/for-ml-researchers.md)
- [Workflow de suivi des expériences](../workflows/ml-experiment-tracking.md)
