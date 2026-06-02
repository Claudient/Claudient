# Service REST API — Structure de projet

> Pour les ingénieurs backend qui construisent et maintiennent un service FastAPI en production — en optimisant le cycle complet, du modèle de domaine à l'endpoint déployé, testé et observable.

## Stack

- **Framework :** FastAPI 0.115+ (Python 3.12+)
- **ORM :** SQLAlchemy 2.0 (moteur async, `AsyncSession`, dataclasses mappées)
- **Migrations :** Alembic 1.13+ (autogenerate, modes online/offline)
- **Base de données :** PostgreSQL 16 (driver asyncpg)
- **Cache + broker :** Redis 7 (aioredis pour le cache, Redis Streams ou Lists pour le broker Celery)
- **Tâches de fond :** Celery 5.4+ avec broker redis://, backend de résultats optionnel
- **Validation :** Pydantic v2 (model_validator, field_validator, computed_field)
- **Auth :** python-jose (JWT RS256), passlib[bcrypt] (hachage de mot de passe), clé API via en-tête
- **Tests :** pytest 8+ avec pytest-asyncio, httpx (AsyncClient), factory-boy, pytest-cov
- **Conteneurisation :** Docker 25 (build multi-étapes), docker-compose v2
- **CI/CD :** GitHub Actions (lint → test → build → push → deploy)
- **Linting/formatage :** Ruff 0.4+ (remplace flake8 + isort + pyupgrade), mypy 1.10+
- **Observabilité :** structlog (logs JSON), OpenTelemetry SDK, Sentry SDK

## Arborescence du projet

```
rest-api-service/
├── .github/
│   └── workflows/
│       ├── ci.yml                          # Vérifications PR : ruff, mypy, pytest, seuil de couverture
│       ├── cd-staging.yml                  # Déploiement en staging à la fusion sur main
│       └── cd-production.yml               # Déploiement en production sur push d'un tag de version
├── alembic/
│   ├── env.py                              # Configuration du moteur async, câblage de target_metadata
│   ├── script.py.mako                      # Modèle de fichier de migration (typé, horodaté)
│   └── versions/
│       ├── 0001_create_users.py            # Schéma initial : tables users + api_keys
│       ├── 0002_create_items.py            # Table items avec FK vers users
│       └── 0003_add_refresh_tokens.py      # Stockage des refresh tokens JWT
├── docker/
│   ├── Dockerfile                          # Multi-étapes : builder → runtime (utilisateur non-root)
│   ├── Dockerfile.worker                   # Image du worker Celery (partage src/, base allégée)
│   └── docker-compose.yml                  # Dev local : app + worker + postgres + redis
├── src/
│   ├── __init__.py
│   ├── main.py                             # Factory de l'app FastAPI, lifespan, middleware, routers
│   ├── api/
│   │   ├── __init__.py
│   │   ├── deps.py                         # Dépendances FastAPI partagées (get_session, get_current_user)
│   │   └── v1/
│   │       ├── __init__.py
│   │       ├── router.py                   # APIRouter agrégeant tous les routers de domaine v1
│   │       ├── auth/
│   │       │   ├── __init__.py
│   │       │   ├── router.py               # POST /auth/token, POST /auth/refresh, POST /auth/logout
│   │       │   └── api_keys.py             # POST /auth/api-keys, DELETE /auth/api-keys/{key_id}
│   │       ├── users/
│   │       │   ├── __init__.py
│   │       │   └── router.py               # GET /users/me, PATCH /users/me, GET /users/{id} (admin)
│   │       └── items/
│   │           ├── __init__.py
│   │           └── router.py               # CRUD /items, POST /items/{id}/publish (déclenchement de tâche async)
│   ├── core/
│   │   ├── __init__.py
│   │   ├── config.py                       # Paramètres via pydantic-settings : DB_URL, REDIS_URL, JWT_*
│   │   ├── database.py                     # AsyncEngine, AsyncSessionMaker, dépendance get_session
│   │   ├── redis.py                        # Factory de pool aioredis, helpers get/set/invalidate du cache
│   │   ├── security.py                     # Encodage/décodage JWT (RS256), génération/vérification clé API, bcrypt
│   │   ├── exceptions.py                   # Classes d'exceptions de domaine → mapping HTTPException FastAPI
│   │   ├── middleware.py                   # Injection RequestID, middleware de logging structuré
│   │   └── telemetry.py                    # Configuration OpenTelemetry SDK, init Sentry, config structlog
│   ├── models/
│   │   ├── __init__.py
│   │   ├── base.py                         # DeclarativeBase, TimestampMixin (created_at, updated_at)
│   │   ├── user.py                         # Dataclasses mappées User, ApiKey
│   │   ├── item.py                         # Dataclass mappée Item, enum ItemStatus
│   │   └── token.py                        # Dataclass mappée RefreshToken
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── common.py                       # Générique Paginated[T], ErrorDetail, SuccessEnvelope
│   │   ├── auth.py                         # TokenRequest, TokenResponse, ApiKeyCreate, ApiKeyOut
│   │   ├── user.py                         # UserCreate, UserOut, UserUpdate, UserPublic
│   │   └── item.py                         # ItemCreate, ItemOut, ItemUpdate, ItemListOut
│   ├── services/
│   │   ├── __init__.py
│   │   ├── auth_service.py                 # login(), refresh_token(), revoke_token(), verify_api_key()
│   │   ├── user_service.py                 # create_user(), get_user(), update_user(), get_by_email()
│   │   └── item_service.py                 # create_item(), list_items(), publish_item() (enfile une tâche)
│   └── workers/
│       ├── __init__.py
│       ├── celery_app.py                   # Factory de l'app Celery, config broker/backend, autodécouverte des tâches
│       ├── tasks/
│       │   ├── __init__.py
│       │   ├── item_tasks.py               # process_item_publish(), logique de retry, gestion DLQ
│       │   └── notification_tasks.py       # send_email_notification(), send_webhook()
│       └── schedules.py                    # Planning Celery beat : cleanup_expired_tokens (quotidien)
├── tests/
│   ├── conftest.py                         # Moteur async, DB de test, AsyncClient, factories de fixtures
│   ├── factories.py                        # factory-boy : UserFactory, ItemFactory, ApiKeyFactory
│   ├── unit/
│   │   ├── test_security.py                # Encodage/décodage JWT, hachage clé API, expiration des tokens
│   │   ├── test_auth_service.py            # login(), refresh, revoke — session DB mockée
│   │   ├── test_user_service.py            # create, get, update — session DB mockée
│   │   └── test_item_service.py            # CRUD, enfilement publish — session + Celery mockés
│   └── integration/
│       ├── test_auth_routes.py             # POST /auth/token cas nominal + cas d'erreur
│       ├── test_user_routes.py             # GET /users/me avec JWT réel, PATCH /users/me
│       ├── test_item_routes.py             # CRUD complet, pagination, vérifications d'ownership 403
│       └── test_api_key_auth.py            # Authentification end-to-end via en-tête X-API-Key
├── alembic.ini                             # Config Alembic : script_location, placeholder sqlalchemy.url
├── pyproject.toml                          # Source unique de vérité : dépendances, config ruff, mypy, pytest
├── .env.example                            # Toutes les variables d'environnement avec descriptions, sans valeurs réelles
├── .env.test                               # URLs DB/Redis pour pytest (versionné, sans secrets)
└── Makefile                                # Cibles : dev, test, migrate, lint, worker, build
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `src/main.py` | Factory de l'app FastAPI avec lifespan `@asynccontextmanager` pour l'initialisation du pool DB et Redis ; inclut tous les routers v1 ; enregistre les gestionnaires d'exceptions depuis `core/exceptions.py` |
| `src/core/config.py` | Classe `Settings` avec `pydantic-settings` lisant depuis l'environnement ; champs typés pour `DATABASE_URL`, `REDIS_URL`, `JWT_PRIVATE_KEY`, `JWT_PUBLIC_KEY`, `CELERY_BROKER_URL`, `SENTRY_DSN` |
| `src/core/security.py` | Signature/vérification JWT RS256 (`python-jose`) ; génération de clé API (token 32 octets), stockage SHA-256, comparaison en temps constant ; hachage/vérification bcrypt via `passlib` |
| `src/api/deps.py` | `Depends` FastAPI partagés : `get_session` (yield `AsyncSession`), `get_current_user` (décode le Bearer JWT ou l'en-tête X-API-Key), `require_admin` (vérification du rôle utilisateur) |
| `src/workers/celery_app.py` | App Celery câblée sur le broker Redis ; `task_always_eager=True` en environnement de test ; autodécouverte de `src.workers.tasks.*` ; sérialiseur de tâches configuré en JSON |
| `alembic/env.py` | Importe `src.models.base.Base.metadata` ; utilise `asyncio.run()` pour le mode online async d'Alembic ; lit `DATABASE_URL` depuis l'environnement afin que `alembic upgrade head` fonctionne en CI |
| `tests/conftest.py` | Crée une DB de test isolée (suppression/recréation du schéma par session) ; fournit la fixture `async_client` (`httpx.AsyncClient` contre l'app) ; injecte `db_session` avec rollback après chaque test |
| `pyproject.toml` | Source unique de vérité : `[project.dependencies]`, `[tool.ruff]` (sélection globale, liste d'exclusions), `[tool.mypy]` (strict), `[tool.pytest.ini_options]` (asyncio_mode=auto, paramètres de couverture) |

## Scaffold rapide

```bash
# Prérequis : Python 3.12+, Docker, uv (pip install uv)
PROJECT=rest-api-service
mkdir -p $PROJECT && cd $PROJECT

# Initialisation du projet Python
uv init --python 3.12
uv add fastapi[standard] sqlalchemy[asyncio] asyncpg alembic \
    pydantic-settings pydantic[email] \
    python-jose[cryptography] passlib[bcrypt] \
    celery[redis] aioredis \
    structlog opentelemetry-sdk opentelemetry-instrumentation-fastapi sentry-sdk

uv add --dev pytest pytest-asyncio httpx factory-boy pytest-cov ruff mypy \
    types-passlib

# Structure des répertoires
mkdir -p .github/workflows
mkdir -p alembic/versions
mkdir -p docker
mkdir -p src/api/v1/auth src/api/v1/users src/api/v1/items
mkdir -p src/core src/models src/schemas src/services
mkdir -p src/workers/tasks
mkdir -p tests/unit tests/integration

# Création de tous les fichiers sources
touch src/__init__.py src/main.py
touch src/api/__init__.py src/api/deps.py
touch src/api/v1/__init__.py src/api/v1/router.py
touch src/api/v1/auth/__init__.py src/api/v1/auth/router.py src/api/v1/auth/api_keys.py
touch src/api/v1/users/__init__.py src/api/v1/users/router.py
touch src/api/v1/items/__init__.py src/api/v1/items/router.py
touch src/core/__init__.py src/core/config.py src/core/database.py
touch src/core/redis.py src/core/security.py src/core/exceptions.py
touch src/core/middleware.py src/core/telemetry.py
touch src/models/__init__.py src/models/base.py src/models/user.py
touch src/models/item.py src/models/token.py
touch src/schemas/__init__.py src/schemas/common.py src/schemas/auth.py
touch src/schemas/user.py src/schemas/item.py
touch src/services/__init__.py src/services/auth_service.py
touch src/services/user_service.py src/services/item_service.py
touch src/workers/__init__.py src/workers/celery_app.py src/workers/schedules.py
touch src/workers/tasks/__init__.py src/workers/tasks/item_tasks.py
touch src/workers/tasks/notification_tasks.py
touch tests/conftest.py tests/factories.py
touch tests/unit/test_security.py tests/unit/test_auth_service.py
touch tests/unit/test_user_service.py tests/unit/test_item_service.py
touch tests/integration/test_auth_routes.py tests/integration/test_user_routes.py
touch tests/integration/test_item_routes.py tests/integration/test_api_key_auth.py
touch alembic.ini alembic/env.py alembic/script.py.mako
touch .env.example .env.test Makefile

# Init Alembic (génère alembic.ini — puis déplacer les fichiers)
uv run alembic init alembic 2>/dev/null || true

# docker-compose pour le dev local
cat > docker/docker-compose.yml << 'EOF'
version: "3.9"
services:
  app:
    build:
      context: ..
      dockerfile: docker/Dockerfile
    ports:
      - "8000:8000"
    env_file: ../.env
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy

  worker:
    build:
      context: ..
      dockerfile: docker/Dockerfile.worker
    env_file: ../.env
    depends_on:
      - redis
      - postgres

  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: app_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app"]
      interval: 5s
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

volumes:
  postgres_data:
EOF

# Makefile
cat > Makefile << 'EOF'
.PHONY: dev test lint migrate worker build

dev:
	docker compose -f docker/docker-compose.yml up

test:
	uv run pytest tests/ --cov=src --cov-report=term-missing --cov-fail-under=80

lint:
	uv run ruff check src/ tests/
	uv run ruff format --check src/ tests/
	uv run mypy src/

migrate:
	uv run alembic upgrade head

makemigration:
	uv run alembic revision --autogenerate -m "$(msg)"

worker:
	uv run celery -A src.workers.celery_app worker --loglevel=info

beat:
	uv run celery -A src.workers.celery_app beat --loglevel=info

build:
	docker build -f docker/Dockerfile -t rest-api-service:local .
EOF

# Installation des skills Claudient
npx claudient add skill backend/python/fastapi-crud
npx claudient add skill backend/python/sqlalchemy-patterns
npx claudient add skill backend/python/celery-task
npx claudient add skill backend/auth/jwt-api-key
npx claudient add skill backend/python/alembic-migration
npx claudient add skill productivity/test-generator
npx claudient add skill productivity/security-audit
npx claudient add skill git/pr-description

echo "REST API service scaffold complete. Next: cp .env.example .env && make dev"
```

## Modèle CLAUDE.md

```markdown
# Service REST API

API REST de production construite avec FastAPI, SQLAlchemy 2.0 (async) et Celery.
Ce code suit une architecture en couches par domaine : models → schemas → services → routers.
Tous les accès DB sont asynchrones. Les tâches de fond s'exécutent dans des workers Celery dédiés.

## Stack

- FastAPI 0.115+ (Python 3.12) — factory de l'app dans src/main.py
- SQLAlchemy 2.0 async — modèles dans src/models/, session dans src/core/database.py
- Alembic 1.13 — migrations dans alembic/versions/, exécutées via `make migrate`
- PostgreSQL 16 (driver asyncpg) — DATABASE_URL dans .env
- Redis 7 — REDIS_URL dans .env ; utilisé pour le cache (aioredis) et le broker Celery
- Celery 5.4 — workers dans src/workers/ ; tâches autodécouvertes depuis src/workers/tasks/
- Pydantic v2 — schémas requête/réponse dans src/schemas/
- Auth : JWT RS256 (python-jose) + en-tête X-API-Key (SHA-256 stocké dans la table api_keys)
- Tests : pytest-asyncio, httpx AsyncClient, factory-boy, DB de test isolée par session

## Ajouter un endpoint (étapes précises)

1. **Modèle** — ajouter ou mettre à jour `src/models/<domaine>.py` (dataclass mappée SQLAlchemy)
2. **Migration** — `make makemigration msg="add_<colonne_ou_table>"` puis relire le fichier généré
3. **Schéma** — ajouter les modèles Pydantic requête/réponse dans `src/schemas/<domaine>.py`
4. **Service** — ajouter la fonction de logique métier dans `src/services/<domaine>_service.py`
   - Accepter `AsyncSession` comme premier argument ; ne jamais importer `get_session` ici
   - Lever des exceptions de domaine depuis `src/core/exceptions.py`, pas HTTPException
5. **Router** — ajouter la route dans `src/api/v1/<domaine>/router.py`
   - Injecter les dépendances via `Depends(get_current_user)`, `Depends(get_session)`
   - Appeler la fonction de service ; intercepter les exceptions de domaine ; retourner le schéma
6. **Test** — ajouter un test unitaire dans `tests/unit/test_<domaine>_service.py` (session mockée)
   et un test d'intégration dans `tests/integration/test_<domaine>_routes.py` (DB réelle)

## Exécuter les migrations

```bash
# Appliquer toutes les migrations en attente
make migrate

# Générer une nouvelle migration depuis les changements de modèles
make makemigration msg="add_status_to_items"

# Rétrograder d'une révision
uv run alembic downgrade -1

# Afficher la révision courante
uv run alembic current
```

Règles de migration :
- Ne jamais supprimer une colonne dans le même PR qui retire le code l'utilisant — déploiement en deux étapes
- Toujours tester `alembic downgrade -1` localement avant de pousser
- Migrations sur grandes tables (>1M lignes) : ajouter les index avec CONCURRENTLY, utiliser batch_alter_table

## Écrire une tâche Celery

Les tâches se trouvent dans `src/workers/tasks/<domaine>_tasks.py`.

```python
from src.workers.celery_app import celery_app
from src.core.database import AsyncSessionMaker
import asyncio

@celery_app.task(bind=True, max_retries=3, default_retry_delay=60)
def process_item_publish(self, item_id: int) -> None:
    async def _run():
        async with AsyncSessionMaker() as session:
            # appeler les fonctions de service ici
            pass
    try:
        asyncio.run(_run())
    except Exception as exc:
        raise self.retry(exc=exc)
```

Enfilement depuis un service :
```python
from src.workers.tasks.item_tasks import process_item_publish
process_item_publish.delay(item.id)
```

## Patterns d'authentification

### JWT (token Bearer)
- Émission : `POST /auth/token` avec email + mot de passe → retourne `access_token` + `refresh_token`
- Vérification : dépendance `get_current_user` dans `src/api/deps.py` décode le JWT RS256
- Rotation : `POST /auth/refresh` avec refresh_token → nouvel access_token
- Révocation : stocker le hash du refresh token dans la table `refresh_tokens` ; vérifier à chaque rafraîchissement

### Clé API (en-tête X-API-Key)
- Émission : `POST /auth/api-keys` (utilisateur authentifié) → retourne la clé brute une seule fois, stocke le SHA-256
- Vérification : `get_current_user` se replie sur l'en-tête X-API-Key ; hache et compare
- Révocation : `DELETE /auth/api-keys/{key_id}` — suppression douce ou définitive de la ligne

## Patterns SQLAlchemy courants

**Requête async avec jointure :**
```python
stmt = select(Item).where(Item.owner_id == user_id).options(selectinload(Item.tags))
result = await session.execute(stmt)
items = result.scalars().all()
```

**Liste paginée :**
```python
stmt = select(Item).offset(skip).limit(limit).order_by(Item.created_at.desc())
count_stmt = select(func.count()).select_from(Item).where(Item.owner_id == user_id)
total = (await session.execute(count_stmt)).scalar_one()
```

**Upsert :**
```python
from sqlalchemy.dialects.postgresql import insert
stmt = insert(Item).values(**data).on_conflict_do_update(
    index_elements=["slug"], set_={"title": data["title"], "updated_at": func.now()}
)
await session.execute(stmt)
```

## Lancer les tests

```bash
make test                          # suite complète avec couverture
uv run pytest tests/unit/          # tests unitaires uniquement (sans DB)
uv run pytest tests/integration/   # tests d'intégration (nécessite .env.test)
uv run pytest -k "test_auth" -v    # filtrage par nom
uv run pytest --lf                 # relancer uniquement les derniers échecs
```

La DB de test est recréée à chaque session. `.env.test` doit contenir `TEST_DATABASE_URL`
pointant vers une base de données séparée (pas la DB de développement).

## Variables d'environnement

Toutes les variables requises se trouvent dans `.env.example`. Les essentielles :
- `DATABASE_URL` — format asyncpg : `postgresql+asyncpg://user:pass@host/db`
- `REDIS_URL` — `redis://localhost:6379/0`
- `JWT_PRIVATE_KEY` — PEM RS256 (générer avec : `openssl genrsa 2048`)
- `JWT_PUBLIC_KEY` — clé publique PEM correspondante
- `JWT_ALGORITHM` — toujours `RS256`
- `ACCESS_TOKEN_EXPIRE_MINUTES` — 15 (court ; s'appuyer sur le rafraîchissement)
- `REFRESH_TOKEN_EXPIRE_DAYS` — 30
- `CELERY_BROKER_URL` — `redis://localhost:6379/1` (index DB différent du cache)
- `SENTRY_DSN` — optionnel ; l'initialisation Sentry est ignorée si non défini

## Ce qu'il ne faut pas faire

- Ne pas importer AsyncSession directement dans les routers — utiliser Depends(get_session)
- Ne pas lever HTTPException depuis la couche service — lever des exceptions de domaine depuis core/exceptions.py
- Ne pas utiliser les patterns SQLAlchemy synchrones (session.query()) — utiliser select() + await
- Ne pas valider des migrations avec --autogenerate sans relire le fichier généré
- Ne pas stocker les clés API en clair — toujours hacher en SHA-256 avant d'écrire en DB
- Ne pas exécuter les tâches Celery de façon synchrone dans les handlers de requête — toujours utiliser .delay() ou .apply_async()
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
        "/path/to/rest-api-service"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "${DATABASE_URL}"
      }
    },
    "sentry": {
      "command": "npx",
      "args": ["-y", "@sentry/mcp-server"],
      "env": {
        "SENTRY_AUTH_TOKEN": "${SENTRY_AUTH_TOKEN}",
        "SENTRY_ORG": "${SENTRY_ORG}",
        "SENTRY_PROJECT": "${SENTRY_PROJECT}"
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
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'CMD=\"$CLAUDE_TOOL_INPUT_COMMAND\"; if echo \"$CMD\" | grep -qE \"alembic (upgrade|downgrade)\"; then echo \"[HOOK] Running migration: $CMD\" >&2; fi; if echo \"$CMD\" | grep -q \"alembic upgrade\" && ! echo \"$CMD\" | grep -q \"head\"; then echo \"[HOOK] Warning: alembic upgrade target is not head — confirm this is intentional.\" >&2; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'cd \"${CLAUDE_PROJECT_DIR:-$PWD}\" && PENDING=$(uv run alembic history --verbose 2>/dev/null | grep \"(head)\" | wc -l | tr -d \" \"); CURRENT=$(uv run alembic current 2>/dev/null | grep \"(head)\"); if [ -z \"$CURRENT\" ]; then echo \"[Reminder] Unapplied migrations detected — run make migrate before testing.\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Skills à installer

```bash
npx claudient add skill backend/python/fastapi-crud
npx claudient add skill backend/python/sqlalchemy-patterns
npx claudient add skill backend/python/celery-task
npx claudient add skill backend/auth/jwt-api-key
npx claudient add skill backend/python/alembic-migration
npx claudient add skill backend/python/pydantic-v2
npx claudient add skill productivity/test-generator
npx claudient add skill productivity/security-audit
npx claudient add skill git/pr-description
```

## Liens utiles

- [Guide Python Backend](../guides/for-backend-python.md)
- [Workflow de développement d'endpoints API](../workflows/api-endpoint-development.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
