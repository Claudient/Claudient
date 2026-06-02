# Base de Connaissances RAG — Structure de Projet

> Pour les ingénieurs ML qui construisent et maintiennent un pipeline RAG en production — en optimisant le cycle complet depuis l'ingestion de documents bruts jusqu'à la génération augmentée par la récupération, avec évaluations et traçabilité.

## Stack

- **Langage :** Python 3.12+ géré via `uv`
- **Orchestration :** LangChain 0.3+ ou LlamaIndex 0.12+ (câblage du pipeline, composition des chaînes)
- **Base de données vectorielle :** Qdrant (auto-hébergé via Docker ou Qdrant Cloud) — support des vecteurs denses et épars
- **Embeddings :** OpenAI `text-embedding-3-large` (3072 dimensions) ou Cohere `embed-english-v3.0` (1024 dimensions, reranker inclus)
- **LLM (génération) :** Anthropic Claude 3.5 Sonnet via le SDK `anthropic` (mise en cache des prompts activée)
- **Analyse de documents :** Unstructured.io (`unstructured[all-docs]`) pour PDF, DOCX, HTML, PPTX, XLSX
- **API de requêtes :** FastAPI 0.115+ avec schémas Pydantic v2
- **Cache :** Redis 7 (cache sémantique au niveau requête, mémoïsation des embeddings)
- **Traçage + évaluation :** LangSmith (traçage de chaque appel de chaîne, exécution des évaluations RAGAS sur jeu doré en CI)
- **Framework d'évaluation :** RAGAS 0.2+ (fidélité, pertinence des réponses, rappel de contexte, précision de contexte)
- **Versionnage des données :** DVC 3.5+ (documents bruts, chunks traités, jeux dorés suivis en stockage distant)
- **Tests :** pytest 8+ avec pytest-asyncio, cassettes VCR pour les appels LLM
- **Conteneurisation :** Docker 25, docker-compose v2 (Qdrant + Redis + API)
- **CI/CD :** GitHub Actions (lint → tests unitaires → tests d'intégration → porte d'évaluation RAGAS → build)
- **Linting/formatage :** Ruff 0.4+, mypy 1.10+

## Arborescence du projet

```
rag-knowledge-base/
├── .github/
│   └── workflows/
│       ├── ci.yml                                  # ruff, mypy, pytest, porte d'évaluation RAGAS sur PR
│       ├── ingest.yml                              # Pull DVC manuel/planifié + ré-ingestion
│       └── cd-production.yml                       # Build + déploiement API sur push de tag de version
├── .dvc/
│   ├── config                                      # Remote DVC : bucket S3/GCS pour docs bruts + chunks
│   └── .gitignore
├── configs/
│   ├── chunking.yaml                               # chunk_size, chunk_overlap, stratégie de découpage par type de document
│   ├── retrieval.yaml                              # top_k, score_threshold, alpha hybride (mélange dense/épars)
│   ├── embeddings.yaml                             # fournisseur, modèle, batch_size, config de retry
│   └── generation.yaml                             # modèle, max_tokens, température, version du prompt
├── data/
│   ├── raw/                                        # Documents sources (suivis par DVC, non commités)
│   │   ├── pdfs/                                   # Fichiers sources PDF
│   │   ├── docx/                                   # Documents Word
│   │   └── html/                                   # Fichiers HTML extraits du web
│   ├── processed/                                  # Sortie parsée et découpée (suivie par DVC)
│   │   ├── chunks/                                 # Fichiers JSONL : {id, text, metadata, source_doc}
│   │   └── embeddings/                             # Vecteurs d'embedding mis en cache (numpy .npy ou parquet)
│   └── evaluation/
│       ├── golden_set.jsonl                        # Paires QR de référence pour l'évaluation RAGAS
│       └── golden_set_v2.jsonl                     # Jeux dorés versionnés — ne jamais écraser, uniquement en ajout
├── docker/
│   ├── Dockerfile                                  # Multi-étapes : builder (uv install) → runtime (non-root)
│   └── docker-compose.yml                          # Qdrant + Redis + service API avec vérifications de santé
├── prompts/
│   ├── rag_system_v1.txt                           # Prompt système v1 : rôle, format de citation, règles de refus
│   ├── rag_system_v2.txt                           # Prompt système v2 : mis à jour avec sortie structurée
│   └── query_rewrite.txt                           # Prompt pour l'étape HyDE / expansion de requête
├── src/
│   ├── __init__.py
│   ├── api/
│   │   ├── __init__.py
│   │   ├── main.py                                 # Fabrique d'application FastAPI, lifespan, enregistrement des routeurs
│   │   ├── deps.py                                 # Dépendances partagées : get_retriever, get_llm_client
│   │   ├── schemas.py                              # QueryRequest, QueryResponse, CitedSource, HealthResponse
│   │   └── routes/
│   │       ├── __init__.py
│   │       ├── query.py                            # POST /query — endpoint du pipeline RAG complet
│   │       ├── ingest.py                           # POST /ingest — déclenche un job d'ingestion de documents
│   │       └── health.py                           # GET /health, GET /health/qdrant, GET /health/redis
│   ├── ingestion/
│   │   ├── __init__.py
│   │   ├── loaders/
│   │   │   ├── __init__.py
│   │   │   ├── base.py                             # Classe abstraite DocumentLoader avec load() -> list[Document]
│   │   │   ├── pdf_loader.py                       # Parser PDF Unstructured.io avec gestion des tableaux/images
│   │   │   ├── docx_loader.py                      # Parser DOCX Unstructured.io, hiérarchie des titres préservée
│   │   │   ├── html_loader.py                      # BeautifulSoup + Unstructured.io pour le contenu web
│   │   │   └── loader_registry.py                  # Correspondance extension → loader, fabrique get_loader(path)
│   │   ├── chunkers/
│   │   │   ├── __init__.py
│   │   │   ├── base.py                             # Classe abstraite TextChunker avec chunk() -> list[Chunk]
│   │   │   ├── recursive_chunker.py                # Wrapper LangChain RecursiveCharacterTextSplitter
│   │   │   ├── semantic_chunker.py                 # Détection de frontières de phrases basée sur les embeddings
│   │   │   └── chunker_factory.py                  # Retourne le chunker selon la clé de stratégie dans configs/chunking.yaml
│   │   ├── embedders/
│   │   │   ├── __init__.py
│   │   │   ├── base.py                             # Classe abstraite Embedder avec embed_batch() -> list[list[float]]
│   │   │   ├── openai_embedder.py                  # OpenAI text-embedding-3-large, en lot, avec retry
│   │   │   ├── cohere_embedder.py                  # Cohere embed-english-v3.0, input_type=search_document
│   │   │   └── cached_embedder.py                  # Wrapper Redis : SHA-256(text) → vecteur mis en cache
│   │   └── pipeline.py                             # IngestionPipeline : charger → découper → embedder → upsert dans Qdrant
│   ├── retrieval/
│   │   ├── __init__.py
│   │   ├── qdrant_client.py                        # Fabrique de client Qdrant async, initialisation de collection, helpers d'upsert
│   │   ├── dense_retriever.py                      # Recherche ANN cosinus, top_k, filtre score_threshold
│   │   ├── sparse_retriever.py                     # Vecteurs épars BM25 (support des vecteurs épars Qdrant)
│   │   ├── hybrid_retriever.py                     # Fusion RRF des résultats denses + épars, réglage alpha
│   │   ├── reranker.py                             # Cohere rerank-english-v3.0 ou reranker cross-encoder
│   │   └── query_pipeline.py                       # QueryPipeline : expansion → récupération → reranking → retour des chunks
│   ├── generation/
│   │   ├── __init__.py
│   │   ├── llm_client.py                           # Client SDK Anthropic avec mise en cache des prompts (cache_control)
│   │   ├── prompt_loader.py                        # Charge les templates de prompts depuis prompts/ par tag de version
│   │   ├── citation_builder.py                     # Construit les citations en ligne [1], [2] à partir des chunks récupérés
│   │   └── rag_chain.py                            # Chaîne RAG complète : query_pipeline + llm_client + citations
│   └── evaluation/
│       ├── __init__.py
│       ├── ragas_runner.py                         # Exécute les métriques RAGAS sur golden_set.jsonl, produit un rapport JSON
│       ├── metrics.py                              # Wrappers faithfulness, answer_relevancy, context_recall
│       └── golden_set_builder.py                   # Outil CLI pour générer/étendre golden_set.jsonl via LLM
├── tests/
│   ├── conftest.py                                 # Fixtures Pytest : mock Qdrant, mock embedder, mock LLM
│   ├── cassettes/                                  # Cassettes VCR pour les appels API LLM/embedding enregistrés
│   ├── unit/
│   │   ├── test_pdf_loader.py                      # Sortie du parser Unstructured.io, extraction de tableaux
│   │   ├── test_recursive_chunker.py               # Conditions limites taille/chevauchement des chunks
│   │   ├── test_semantic_chunker.py                # Détection de frontières de phrases sur cas limites
│   │   ├── test_hybrid_retriever.py                # Logique de fusion RRF, alpha=0 (dense uniquement), alpha=1 (épars)
│   │   ├── test_citation_builder.py                # Attribution des index de citation, déduplication
│   │   └── test_cached_embedder.py                 # Hit/miss du cache, format des clés Redis
│   └── integration/
│       ├── test_ingestion_pipeline.py              # De bout en bout : chargement PDF → découpage → embedding → upsert Qdrant
│       ├── test_query_pipeline.py                  # De bout en bout : requête → récupération → reranking → chunks top
│       ├── test_rag_chain.py                       # Chaîne complète avec réponse Claude mockée, vérification des citations
│       └── test_api_query.py                       # POST /query via httpx AsyncClient, validation du schéma
├── scripts/
│   ├── ingest_docs.py                              # CLI : python scripts/ingest_docs.py --source data/raw/pdfs/
│   ├── build_golden_set.py                         # CLI : génère N paires QR à partir des chunks via Claude
│   ├── run_evals.py                                # CLI : exécute RAGAS, affiche le rapport, quitte avec code 1 si sous le seuil
│   └── migrate_collection.py                       # Migration de collection Qdrant : recréation avec nouvelles dimensions vectorielles
├── pyproject.toml                                  # Toutes les dépendances, config ruff, config mypy, config pytest
├── .env.example                                    # Toutes les variables d'environnement avec descriptions, sans valeurs réelles
├── .env.test                                       # Environnement de test : endpoints mock, aucune clé API réelle nécessaire
├── dvc.yaml                                        # Étapes du pipeline DVC : charger → découper → embedder → indexer
├── dvc.lock                                        # Hachages des étapes DVC verrouillés (commités)
├── Makefile                                        # Cibles : dev, ingest, test, eval, lint, build
└── README.md                                       # Configuration, vue d'ensemble de l'architecture, tableau des résultats d'évaluation
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `src/ingestion/pipeline.py` | Orchestre charger → découper → embedder → upsert ; lit la stratégie depuis `configs/chunking.yaml` ; prend en charge l'ingestion incrémentale (ignore les hachages de documents déjà indexés stockés dans le payload Qdrant) |
| `src/retrieval/hybrid_retriever.py` | Combine les résultats ANN dense et BM25 épars de Qdrant via la Fusion à Rang Réciproque ; le paramètre `alpha` (0–1) contrôle le poids dense/épars, chargé depuis `configs/retrieval.yaml` |
| `src/generation/llm_client.py` | Client SDK Anthropic avec `cache_control` sur le prompt système et les blocs de contexte récupérés ; suit `cache_creation_input_tokens` vs `cache_read_input_tokens` dans les traces LangSmith |
| `src/generation/rag_chain.py` | RAG de bout en bout : appelle `QueryPipeline`, formate les chunks récupérés en contexte mis en cache, appelle Claude, exécute `citation_builder`, retourne `QueryResponse` avec citations en ligne |
| `configs/chunking.yaml` | Stratégie de découpage par type de document : `chunk_size`, `chunk_overlap`, découpage (`recursive` ou `semantic`), `min_chunk_length` pour éliminer le bruit ; source de vérité des paramètres d'ingestion |
| `configs/retrieval.yaml` | `top_k` (avant reranking), `rerank_top_n` (après reranking), `score_threshold`, `alpha` hybride, `enable_hyde` (expansion de requête avec embedding de document hypothétique) |
| `data/evaluation/golden_set.jsonl` | Paires QR versionnées : `{question, ground_truth_answer, ground_truth_contexts}` ; jamais mutées en place — ajouter les nouvelles versions sous `golden_set_v2.jsonl` |
| `src/evaluation/ragas_runner.py` | Charge le jeu doré, exécute la chaîne RAG complète par question, transmet les prédictions aux métriques RAGAS, écrit `eval_report.json` ; la CI lit ce fichier et échoue si la fidélité est < 0,80 |

## Scaffold rapide

```bash
# Prérequis : Python 3.12+, Docker, uv (pip install uv), DVC (pip install dvc[s3])
PROJECT=rag-knowledge-base
mkdir -p $PROJECT && cd $PROJECT

# Initialisation du projet Python
uv init --python 3.12

# Dépendances principales
uv add fastapi[standard] pydantic[email] \
    anthropic \
    langchain langchain-openai langchain-cohere langchain-community \
    llama-index llama-index-embeddings-openai llama-index-embeddings-cohere \
    qdrant-client \
    openai cohere \
    "unstructured[all-docs]" \
    redis aioredis \
    langsmith ragas \
    dvc "dvc[s3]" \
    pyyaml python-dotenv \
    httpx structlog

uv add --dev pytest pytest-asyncio pytest-recording vcrpy \
    httpx ruff mypy types-redis

# Structure des répertoires
mkdir -p .github/workflows
mkdir -p .dvc
mkdir -p configs
mkdir -p data/raw/{pdfs,docx,html}
mkdir -p data/processed/{chunks,embeddings}
mkdir -p data/evaluation
mkdir -p docker
mkdir -p prompts
mkdir -p src/api/routes
mkdir -p src/ingestion/{loaders,chunkers,embedders}
mkdir -p src/retrieval
mkdir -p src/generation
mkdir -p src/evaluation
mkdir -p tests/{unit,integration,cassettes}
mkdir -p scripts

# Créer tous les fichiers sources
touch src/__init__.py
touch src/api/__init__.py src/api/main.py src/api/deps.py src/api/schemas.py
touch src/api/routes/__init__.py src/api/routes/query.py
touch src/api/routes/ingest.py src/api/routes/health.py
touch src/ingestion/__init__.py src/ingestion/pipeline.py
touch src/ingestion/loaders/__init__.py src/ingestion/loaders/base.py
touch src/ingestion/loaders/pdf_loader.py src/ingestion/loaders/docx_loader.py
touch src/ingestion/loaders/html_loader.py src/ingestion/loaders/loader_registry.py
touch src/ingestion/chunkers/__init__.py src/ingestion/chunkers/base.py
touch src/ingestion/chunkers/recursive_chunker.py src/ingestion/chunkers/semantic_chunker.py
touch src/ingestion/chunkers/chunker_factory.py
touch src/ingestion/embedders/__init__.py src/ingestion/embedders/base.py
touch src/ingestion/embedders/openai_embedder.py src/ingestion/embedders/cohere_embedder.py
touch src/ingestion/embedders/cached_embedder.py
touch src/retrieval/__init__.py src/retrieval/qdrant_client.py
touch src/retrieval/dense_retriever.py src/retrieval/sparse_retriever.py
touch src/retrieval/hybrid_retriever.py src/retrieval/reranker.py src/retrieval/query_pipeline.py
touch src/generation/__init__.py src/generation/llm_client.py
touch src/generation/prompt_loader.py src/generation/citation_builder.py src/generation/rag_chain.py
touch src/evaluation/__init__.py src/evaluation/ragas_runner.py
touch src/evaluation/metrics.py src/evaluation/golden_set_builder.py
touch tests/conftest.py
touch tests/unit/test_pdf_loader.py tests/unit/test_recursive_chunker.py
touch tests/unit/test_semantic_chunker.py tests/unit/test_hybrid_retriever.py
touch tests/unit/test_citation_builder.py tests/unit/test_cached_embedder.py
touch tests/integration/test_ingestion_pipeline.py tests/integration/test_query_pipeline.py
touch tests/integration/test_rag_chain.py tests/integration/test_api_query.py
touch scripts/ingest_docs.py scripts/build_golden_set.py
touch scripts/run_evals.py scripts/migrate_collection.py
touch .env.example .env.test dvc.yaml

# Configurations par défaut
cat > configs/chunking.yaml << 'EOF'
default:
  strategy: recursive
  chunk_size: 1000
  chunk_overlap: 200
  min_chunk_length: 50

pdf:
  strategy: recursive
  chunk_size: 800
  chunk_overlap: 150
  min_chunk_length: 40

html:
  strategy: semantic
  chunk_size: 600
  chunk_overlap: 100
  min_chunk_length: 30
EOF

cat > configs/retrieval.yaml << 'EOF'
top_k: 20
rerank_top_n: 5
score_threshold: 0.65
hybrid_alpha: 0.7
enable_hyde: false
enable_query_expansion: false
EOF

cat > configs/embeddings.yaml << 'EOF'
provider: openai
model: text-embedding-3-large
dimensions: 3072
batch_size: 100
max_retries: 3
retry_delay: 1.0
EOF

cat > configs/generation.yaml << 'EOF'
model: claude-3-5-sonnet-20241022
max_tokens: 2048
temperature: 0.1
prompt_version: v2
enable_prompt_caching: true
EOF

# docker-compose
cat > docker/docker-compose.yml << 'EOF'
version: "3.9"
services:
  qdrant:
    image: qdrant/qdrant:v1.9.2
    ports:
      - "6333:6333"
      - "6334:6334"
    volumes:
      - qdrant_storage:/qdrant/storage
    healthcheck:
      test: ["CMD-SHELL", "curl -sf http://localhost:6333/healthz || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 5s
      timeout: 3s
      retries: 5

  api:
    build:
      context: ..
      dockerfile: docker/Dockerfile
    ports:
      - "8000:8000"
    env_file: ../.env
    depends_on:
      qdrant:
        condition: service_healthy
      redis:
        condition: service_healthy

volumes:
  qdrant_storage:
EOF

# Makefile
cat > Makefile << 'EOF'
.PHONY: dev ingest test eval lint build

dev:
	docker compose -f docker/docker-compose.yml up qdrant redis -d
	uv run uvicorn src.api.main:app --reload --port 8000

ingest:
	uv run python scripts/ingest_docs.py --source data/raw/

test:
	uv run pytest tests/ --cov=src --cov-report=term-missing --cov-fail-under=75

test-unit:
	uv run pytest tests/unit/ -v

test-integration:
	uv run pytest tests/integration/ -v

eval:
	uv run python scripts/run_evals.py --golden-set data/evaluation/golden_set.jsonl

build-golden:
	uv run python scripts/build_golden_set.py --n 50 --output data/evaluation/golden_set.jsonl

lint:
	uv run ruff check src/ tests/ scripts/
	uv run ruff format --check src/ tests/ scripts/
	uv run mypy src/

build:
	docker build -f docker/Dockerfile -t rag-knowledge-base:local .

dvc-pull:
	dvc pull data/raw data/processed
EOF

# Initialisation DVC
dvc init 2>/dev/null || true
dvc run -n ingest -d data/raw/ -o data/processed/chunks/ \
  "python scripts/ingest_docs.py --source data/raw/" 2>/dev/null || true

# Installation des skills Claudient
npx claudient add skill data-ml/rag-pipeline
npx claudient add skill data-ml/vector-db-ops
npx claudient add skill data-ml/embedding-strategy
npx claudient add skill data-ml/ragas-eval
npx claudient add skill backend/python/fastapi-crud
npx claudient add skill backend/python/async-patterns
npx claudient add skill productivity/test-generator

echo "Scaffold de la base de connaissances RAG terminé. Prochaine étape : cp .env.example .env && make dev"
```

## Template CLAUDE.md

```markdown
# Base de Connaissances RAG

Pipeline RAG en production : ingestion de documents → stockage vectoriel → récupération hybride → génération alimentée par Claude avec citations.
Stack : Python 3.12 + uv, LangChain/LlamaIndex, Qdrant, FastAPI, OpenAI Embeddings, Anthropic Claude, Unstructured.io, Redis, LangSmith, RAGAS.
Tous les paramètres du pipeline (taille des chunks, top_k de récupération, alpha hybride) se trouvent dans configs/ — ne pas les coder en dur.

## Stack

- Ingestion : Unstructured.io (`unstructured[all-docs]`) parse les docs bruts → chunkers dans src/ingestion/chunkers/
- Embeddings : OpenAI `text-embedding-3-large` (3072 dimensions) via src/ingestion/embedders/openai_embedder.py
- Base vectorielle : Qdrant — collection `documents`, vecteurs denses + épars, port 6333
- Récupération : Hybride (ANN dense + BM25 épars) avec fusion RRF, puis reranker Cohere
- Génération : Anthropic Claude 3.5 Sonnet via src/generation/llm_client.py avec mise en cache des prompts
- Cache : Redis sur le port 6379 — vecteurs d'embedding mis en cache par SHA-256(text), résultats de requêtes mis en cache par hash(query+params)
- Traçage : LangSmith — chaque appel de chaîne tracé ; définir LANGSMITH_API_KEY + LANGSMITH_PROJECT dans .env
- Évaluations : RAGAS — exécuter via `make eval` ; la CI échoue si la fidélité est < 0,80

## Ingestion d'un nouveau type de document

1. Créer `src/ingestion/loaders/<type>_loader.py` en étendant `DocumentLoader` dans `loaders/base.py`
2. Implémenter `load(path: str) -> list[Document]` avec Unstructured.io :
   ```python
   from unstructured.partition.<type> import partition_<type>
   elements = partition_<type>(filename=path, include_metadata=True)
   ```
3. Enregistrer dans `src/ingestion/loaders/loader_registry.py` :
   ```python
   LOADER_REGISTRY[".ext"] = MyTypeLoader
   ```
4. Ajouter les valeurs de découpage par défaut pour le nouveau type dans `configs/chunking.yaml` sous une nouvelle clé correspondant à l'extension
5. Exécuter le test d'intégration : `uv run pytest tests/integration/test_ingestion_pipeline.py -k "new_type"`

Pris en charge nativement : .pdf, .docx, .html — tous via Unstructured.io avec préservation des tableaux et des titres.

## Ajustement de la taille et du chevauchement des chunks

Les paramètres se trouvent dans `configs/chunking.yaml`. Les modifier là — ne jamais les coder en dur dans le code source.

Compromis :
- Chunks plus petits (400–600 tokens) : meilleure précision de récupération, risque de perdre le contexte inter-phrases
- Chunks plus grands (1000–1500 tokens) : plus de contexte par chunk récupéré, précision moindre, coût en tokens plus élevé
- Chevauchement (100–200 tokens) : évite la perte d'information aux frontières ; augmenter si les réponses sont tronquées
- Chunker sémantique : à utiliser pour le contenu conversationnel ou narratif ; le récursif fonctionne mieux pour les documents structurés

Après avoir modifié les paramètres de découpage, vous DEVEZ ré-ingérer tous les documents — les vecteurs Qdrant existants ne sont plus comparables.
Supprimer la collection et relancer : `make ingest`

Pour trouver les paramètres optimaux : construire un jeu doré, exécuter RAGAS avec différentes configurations, comparer les scores `context_recall`.

## Configuration de la recherche hybride

L'alpha hybride se trouve dans `configs/retrieval.yaml` → `hybrid_alpha` (0,0 à 1,0).
- `alpha=1.0` — dense pur (sémantique, basé sur les embeddings) ; idéal pour les requêtes en langage naturel
- `alpha=0.0` — épars pur (mots-clés BM25) ; idéal pour la correspondance exacte de termes (codes produits, noms)
- `alpha=0.7` — valeur par défaut recommandée : orientée sémantique avec boost par mots-clés

Pour régler alpha empiriquement :
```bash
# Exécuter les évaluations à différentes valeurs d'alpha et comparer context_precision
for alpha in 0.5 0.6 0.7 0.8 0.9; do
  RETRIEVAL_ALPHA=$alpha uv run python scripts/run_evals.py --golden-set data/evaluation/golden_set.jsonl \
    --output eval_results/alpha_${alpha}.json
done
```

Les vecteurs épars doivent être générés au moment de l'ingestion via le modèle épars FastEmbed de Qdrant.
Si vous avez activé `enable_sparse` après l'ingestion, supprimer la collection et ré-ingérer.

## Exécution des évaluations RAGAS

```bash
# Exécuter sur le jeu doré actuel
make eval

# Exécuter et produire un rapport JSON
uv run python scripts/run_evals.py \
  --golden-set data/evaluation/golden_set.jsonl \
  --output eval_report.json

# Construire un jeu doré plus large (nécessite ANTHROPIC_API_KEY)
make build-golden

# Exécuter les évaluations avec une configuration de récupération spécifique
RETRIEVAL_TOP_K=10 RERANK_TOP_N=3 uv run python scripts/run_evals.py
```

Métriques RAGAS suivies :
- `faithfulness` — les affirmations dans la réponse sont-elles étayées par le contexte récupéré ? (seuil CI : >=0,80)
- `answer_relevancy` — la réponse traite-t-elle la question ? (seuil CI : >=0,75)
- `context_recall` — les contextes de référence sont-ils récupérés ? (seuil CI : >=0,70)
- `context_precision` — les chunks récupérés sont-ils tous pertinents ? (informatif, pas de porte)

## Versionnage des templates de prompts

Les fichiers de prompts se trouvent dans `prompts/` sous forme de texte brut. Ils sont versionnés par nom de fichier : `rag_system_v1.txt`, `rag_system_v2.txt`.
`configs/generation.yaml` → `prompt_version` contrôle la version chargée par `src/generation/prompt_loader.py`.

Règles :
- Ne jamais éditer un fichier de prompt en place après qu'il ait été utilisé en production — créer une nouvelle version
- Inclure la version du prompt dans les métadonnées de trace LangSmith afin que les évaluations soient liées au prompt qui les a générées
- Lors du changement de version de prompt, exécuter les évaluations RAGAS sur les deux versions avant de changer la configuration en production
- La mise en cache des prompts (cache_control Anthropic) est appliquée au bloc de prompt système — modifier le prompt système invalide le cache ; préférer éditer les instructions du tour utilisateur pour les ajustements

## Mise en cache des prompts Claude

`src/generation/llm_client.py` applique `cache_control: {"type": "ephemeral"}` à :
1. Le bloc de prompt système (chargé depuis `prompts/rag_system_v{n}.txt`)
2. Le bloc de contexte récupéré (chunks formatés en une seule chaîne)

TTL du cache : 5 minutes (par défaut Anthropic). Les hits du cache économisent ~80% du coût des tokens d'entrée.
Vérifier l'efficacité du cache dans LangSmith : chercher `cache_read_input_tokens` dans les métadonnées de trace.
Si cache_read_input_tokens / total_input_tokens < 0,5 sur des requêtes répétées, l'ordre du contexte est peut-être non déterministe — trier les chunks par score avant le formatage.

## Variables d'environnement

Toutes les variables requises se trouvent dans `.env.example`. Les plus critiques :
- `OPENAI_API_KEY` — pour les embeddings OpenAI (text-embedding-3-large)
- `COHERE_API_KEY` — pour le reranker Cohere (rerank-english-v3.0)
- `ANTHROPIC_API_KEY` — pour la génération Claude
- `QDRANT_URL` — `http://localhost:6333` en local, ou URL Qdrant Cloud
- `QDRANT_API_KEY` — nécessaire uniquement pour Qdrant Cloud
- `QDRANT_COLLECTION` — nom de la collection, `documents` par défaut
- `REDIS_URL` — `redis://localhost:6379/0`
- `LANGSMITH_API_KEY` — traçage LangSmith (définir à n'importe quelle valeur pour désactiver : LANGCHAIN_TRACING_V2=false)
- `LANGSMITH_PROJECT` — nom du projet dans le tableau de bord LangSmith
- `EMBEDDING_PROVIDER` — `openai` ou `cohere`

## Exécution des tests

```bash
make test                                 # suite complète avec couverture
uv run pytest tests/unit/ -v              # tests unitaires uniquement (sans appels externes)
uv run pytest tests/integration/ -v      # tests d'intégration (nécessite Qdrant + Redis en cours d'exécution)
uv run pytest -k "test_hybrid" -v        # filtrer par nom
uv run pytest --lf                        # relancer les derniers échecs
uv run pytest --record-mode=none          # utiliser les cassettes VCR, sans appels API en direct
```

## Ce qu'il ne faut pas faire

- Ne pas coder en dur chunk_size, top_k ou alpha — toujours lire depuis configs/
- Ne pas muter golden_set.jsonl en place — créer un nouveau fichier de version
- Ne pas éditer les fichiers de prompts déjà utilisés en production — ajouter une nouvelle version
- Ne pas désactiver le traçage LangSmith dans les tests d'intégration — définir LANGCHAIN_TRACING_V2=false dans .env.test
- Ne pas faire d'upsert dans Qdrant sans vérifier le hachage du document existant dans le payload (idempotence)
- Ne pas modifier les dimensions des embeddings sans supprimer et recréer la collection Qdrant
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
        "/path/to/rag-knowledge-base"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "qdrant": {
      "command": "npx",
      "args": ["-y", "mcp-server-qdrant"],
      "env": {
        "QDRANT_URL": "${QDRANT_URL}",
        "QDRANT_API_KEY": "${QDRANT_API_KEY}",
        "COLLECTION_NAME": "${QDRANT_COLLECTION}"
      }
    },
    "redis": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-redis"],
      "env": {
        "REDIS_URL": "${REDIS_URL}"
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
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$FILE\" == *.py ]]; then uv run ruff format \"$FILE\" 2>/dev/null || true; uv run ruff check --fix \"$FILE\" 2>/dev/null || true; fi'"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$FILE\" == configs/chunking.yaml || \"$FILE\" == configs/retrieval.yaml || \"$FILE\" == configs/embeddings.yaml ]]; then echo \"[HOOK] Config modifiée : $FILE — pensez à ré-ingérer les documents si chunking.yaml ou embeddings.yaml a été modifié.\" >&2; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'cd \"${CLAUDE_PROJECT_DIR:-$PWD}\" && EVAL=$(ls eval_report.json 2>/dev/null); if [ -n \"$EVAL\" ]; then FAITH=$(python3 -c \"import json; d=json.load(open(\\\"eval_report.json\\\")); print(d.get(\\\"faithfulness\\\", \\\"?\\\"))\" 2>/dev/null); echo \"[Rappel] Dernier score de fidélité RAGAS : $FAITH (seuil : 0,80). Exécuter make eval pour actualiser.\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Skills à installer

```bash
npx claudient add skill data-ml/rag-pipeline
npx claudient add skill data-ml/vector-db-ops
npx claudient add skill data-ml/embedding-strategy
npx claudient add skill data-ml/ragas-eval
npx claudient add skill data-ml/chunking-strategy
npx claudient add skill backend/python/fastapi-crud
npx claudient add skill backend/python/async-patterns
npx claudient add skill productivity/test-generator
npx claudient add skill productivity/security-audit
npx claudient add skill git/pr-description
```

## Connexes

- [Guide du Pipeline RAG](../guides/rag-pipeline.md)
- [Opérations sur la Base de Données Vectorielle](../guides/vector-db-ops.md)
- [Workflow d'Ingestion de Documents](../workflows/document-ingestion.md)
- [Workflow d'Évaluation RAGAS](../workflows/ragas-evaluation.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
