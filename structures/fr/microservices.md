# Architecture Microservices — Structure de projet

> Pour les ingénieurs backend et les équipes DevOps qui exploitent une plateforme microservices basée sur Docker Compose en local et en staging, en optimisant le cycle quotidien d'ajout de services, de câblage des communications inter-services, d'exécution des migrations et de livraison des pipelines CI par service vers Kubernetes.

## Stack

- **Services (Python) :** FastAPI 0.111 + Pydantic v2 + SQLAlchemy 2.0 + Alembic — auth-service, user-service, notification-service
- **Services (Node.js) :** Express 4 + TypeScript 5.4 + Prisma 5 — gateway (passerelle API + couche de routage)
- **Bases de données :** PostgreSQL 16 — une base par service (isolation stricte des bases de données)
- **Cache + pub/sub :** Redis 7 (cache avec espace de clés par service, pub/sub pour les événements légers)
- **Messagerie asynchrone :** RabbitMQ 3.13 avec AMQP 0-9-1 (files durables, échanges en lettre morte)
- **Proxy inverse :** Traefik v3 (routage dynamique, terminaison TLS, middleware par service)
- **Observabilité :** Prometheus 2.51 + Grafana 10.4 (métriques) ; Jaeger 1.57 (backend de traces)
- **Traçage :** OpenTelemetry SDK (Python : opentelemetry-sdk 1.24 ; Node.js : @opentelemetry/sdk-node 0.51)
- **CI :** GitHub Actions — pipelines par service avec build matriciel, push Docker, lint Helm
- **Déploiement :** Charts Helm 3.14 par service, déployés sur Kubernetes (EKS ou GKE)
- **Auth service à service :** JWT interne signé avec un secret partagé (paire de clés RS256, rotation via secret Kubernetes)
- **Orchestration locale :** Docker Compose v2 avec profils (core, observability, messaging)

## Arborescence

```
microservices/
├── services/
│   ├── auth-service/                        # FastAPI — émet et valide les JWT, gère les sessions
│   │   ├── app/
│   │   │   ├── main.py                      # Fabrique d'app FastAPI, lifespan, enregistrement des routeurs
│   │   │   ├── api/
│   │   │   │   ├── v1/
│   │   │   │   │   ├── router.py            # Monte /auth, /token, /refresh, /revoke
│   │   │   │   │   ├── auth.py              # Handlers POST /auth/login, /auth/logout
│   │   │   │   │   └── token.py             # Handlers POST /token/refresh, /token/introspect
│   │   │   │   └── deps.py                  # Dépendances FastAPI : get_db, get_redis, require_internal
│   │   │   ├── core/
│   │   │   │   ├── config.py                # Paramètres via pydantic-settings (lecture du .env)
│   │   │   │   ├── jwt.py                   # Signature/vérification RS256, schéma de claims, logique d'expiration
│   │   │   │   ├── security.py              # Hachage de mot de passe Argon2, comparaison en temps constant
│   │   │   │   └── telemetry.py             # Init SDK OpenTelemetry, configuration de l'exporteur OTLP
│   │   │   ├── models/
│   │   │   │   ├── user.py                  # Modèles ORM SQLAlchemy : User, Session, RefreshToken
│   │   │   │   └── base.py                  # DeclarativeBase, mixin pk UUID, mixin timestamps
│   │   │   ├── schemas/
│   │   │   │   ├── auth.py                  # Pydantic : LoginRequest, TokenResponse, IntrospectResponse
│   │   │   │   └── token.py                 # Pydantic : RefreshRequest, InternalClaims
│   │   │   ├── services/
│   │   │   │   ├── auth_service.py          # Logique métier login/logout
│   │   │   │   └── token_service.py         # Émission, rafraîchissement et révocation de tokens
│   │   │   └── db/
│   │   │       └── session.py               # Moteur SQLAlchemy asynchrone + fabrique de sessions
│   │   ├── alembic/
│   │   │   ├── env.py                       # Env Alembic utilisant les métadonnées des modèles de l'app
│   │   │   ├── alembic.ini                  # URL DB lue depuis la variable d'env AUTH_DATABASE_URL
│   │   │   └── versions/                    # Scripts de migration (auto-générés + retouchés manuellement)
│   │   │       └── 0001_initial_schema.py   # Tables users, sessions, refresh_tokens
│   │   ├── tests/
│   │   │   ├── conftest.py                  # Fixtures pytest : DB de test, client async, mock Redis
│   │   │   ├── test_auth.py                 # Intégration : login, logout, mauvais mot de passe
│   │   │   └── test_token.py                # Unitaire : signature/vérification JWT, expiration, révocation
│   │   ├── Dockerfile                       # Multi-stage : builder (dépendances) + runtime (slim)
│   │   ├── pyproject.toml                   # Dépendances Poetry : fastapi, sqlalchemy, alembic, pydantic-settings
│   │   └── .env.example                     # AUTH_DATABASE_URL, REDIS_URL, JWT_PRIVATE_KEY_PATH
│   │
│   ├── user-service/                        # FastAPI — profils utilisateurs, préférences, gestion de compte
│   │   ├── app/
│   │   │   ├── main.py
│   │   │   ├── api/v1/
│   │   │   │   ├── router.py                # Monte /users, /profiles
│   │   │   │   ├── users.py                 # Handlers CRUD — GET/PATCH /users/{id}
│   │   │   │   └── deps.py                  # require_internal : valide le JWT de service entrant
│   │   │   ├── core/
│   │   │   │   ├── config.py
│   │   │   │   ├── messaging.py             # Éditeur RabbitMQ : événements user.created, user.updated
│   │   │   │   └── telemetry.py
│   │   │   ├── models/user.py               # Modèles ORM SQLAlchemy : User, Profile
│   │   │   ├── schemas/user.py              # Pydantic : UserResponse, UpdateRequest
│   │   │   └── db/session.py
│   │   ├── alembic/
│   │   │   ├── alembic.ini
│   │   │   ├── env.py
│   │   │   └── versions/
│   │   │       └── 0001_initial_schema.py
│   │   ├── tests/
│   │   │   ├── conftest.py
│   │   │   └── test_users.py
│   │   ├── Dockerfile
│   │   ├── pyproject.toml
│   │   └── .env.example                     # USER_DATABASE_URL, RABBITMQ_URL, REDIS_URL
│   │
│   ├── notification-service/                # FastAPI — email/SMS/push via consommateur RabbitMQ
│   │   ├── app/
│   │   │   ├── main.py                      # Démarre la boucle consommateur AMQP + endpoint de santé FastAPI
│   │   │   ├── consumers/
│   │   │   │   ├── user_events.py           # Écoute les files user.created, user.updated
│   │   │   │   └── notification_events.py   # Écoute la file notification.send
│   │   │   ├── core/
│   │   │   │   ├── config.py
│   │   │   │   ├── amqp.py                  # Pool de connexions aio_pika, configuration consommateur, config DLX
│   │   │   │   ├── email.py                 # Wrapper client API SendGrid
│   │   │   │   └── telemetry.py
│   │   │   ├── schemas/events.py            # Pydantic : UserCreatedEvent, NotificationSendEvent
│   │   │   └── services/
│   │   │       └── notification_service.py  # Route les événements vers le canal (email/SMS/push)
│   │   ├── tests/
│   │   │   ├── conftest.py
│   │   │   └── test_consumers.py
│   │   ├── Dockerfile
│   │   ├── pyproject.toml
│   │   └── .env.example                     # RABBITMQ_URL, SENDGRID_API_KEY
│   │
│   └── gateway/                             # Node.js + TypeScript — passerelle API, middleware d'auth, routage
│       ├── src/
│       │   ├── index.ts                     # Fabrique d'app Express, arrêt gracieux
│       │   ├── routes/
│       │   │   ├── auth.ts                  # Proxy : /api/v1/auth → auth-service:8001
│       │   │   ├── users.ts                 # Proxy : /api/v1/users → user-service:8002
│       │   │   └── health.ts               # GET /health, GET /ready — santé agrégée des services
│       │   ├── middleware/
│       │   │   ├── authenticate.ts          # Vérifie le JWT utilisateur entrant, attache les claims à la requête
│       │   │   ├── inject-service-token.ts  # Signe et injecte un JWT de service interne sur les requêtes proxiées
│       │   │   ├── rate-limit.ts            # Limitation de débit via Redis avec rate-limiter-flexible
│       │   │   └── request-id.ts            # Génère et propage l'en-tête X-Request-ID
│       │   ├── lib/
│       │   │   ├── proxy.ts                 # Fabrique http-proxy-middleware avec retry + disjoncteur
│       │   │   ├── jwt.ts                   # Vérification RS256 (clé publique), signature JWT interne (clé privée)
│       │   │   └── telemetry.ts             # Init SDK OpenTelemetry pour Node.js
│       │   └── config.ts                    # Configuration typée depuis l'env via zod
│       ├── tests/
│       │   ├── middleware.test.ts            # Jest : tests unitaires authenticate, inject-service-token
│       │   └── routes.test.ts               # Supertest : tests d'intégration du routage proxy
│       ├── Dockerfile
│       ├── tsconfig.json                    # strict: true, target: ES2022, moduleResolution: bundler
│       ├── package.json
│       └── .env.example                     # AUTH_SERVICE_URL, USER_SERVICE_URL, JWT_PUBLIC_KEY_PATH
│
├── infrastructure/
│   ├── docker-compose.yml                   # Services principaux : gateway, auth, user, notification + bases de données
│   ├── docker-compose.observability.yml     # Profil : prometheus, grafana, jaeger, otel-collector
│   ├── docker-compose.messaging.yml         # Profil : rabbitmq + interface de gestion
│   ├── docker-compose.prod.yml              # Surcharges production : pas de montages de volumes, limites de ressources
│   ├── traefik/
│   │   ├── traefik.yml                      # Config statique : points d'entrée (80, 443, dashboard 8080)
│   │   └── dynamic/
│   │       ├── services.yml                 # Règles de routage : Host + PathPrefix par service
│   │       └── middlewares.yml              # Définitions des middlewares stripPrefix, headers, rateLimit
│   ├── prometheus/
│   │   ├── prometheus.yml                   # Configs de scrape : tous les services sur /metrics, intervalle 15s
│   │   └── rules/
│   │       ├── service-alerts.yml           # Alertes : taux d'erreur élevé, latence p99, profondeur de file
│   │       └── infra-alerts.yml             # Alertes : saturation du pool de connexions DB, mémoire Redis
│   ├── grafana/
│   │   ├── provisioning/
│   │   │   ├── datasources/prometheus.yml   # Source de données Prometheus auto-provisionnée
│   │   │   └── dashboards/dashboards.yml    # Config du fournisseur de dashboards (basé sur fichiers)
│   │   └── dashboards/
│   │       ├── services-overview.json       # RPS par service, taux d'erreur, latence p50/p99
│   │       ├── rabbitmq.json                # Profondeur de file, débit de messages, nombre de consommateurs
│   │       └── postgres.json                # Pool de connexions, durée des requêtes, lag de réplication
│   └── otel-collector/
│       └── otel-collector.yml               # Reçoit OTLP (gRPC 4317), exporte vers Jaeger + Prometheus
│
├── helm/
│   ├── auth-service/                        # Chart Helm — reflète la structure du service pour tous les services
│   │   ├── Chart.yaml                       # Nom du chart, version, appVersion
│   │   ├── values.yaml                      # Défauts : replicas, image, ressources, env, ingress
│   │   ├── values.staging.yaml              # Surcharges staging : replicas=1, tag image depuis CI
│   │   ├── values.prod.yaml                 # Surcharges prod : replicas=3, PodDisruptionBudget
│   │   └── templates/
│   │       ├── deployment.yaml
│   │       ├── service.yaml
│   │       ├── ingress.yaml
│   │       ├── hpa.yaml                     # HorizontalPodAutoscaler (CPU + métriques personnalisées)
│   │       ├── configmap.yaml
│   │       └── secret.yaml                  # Annotation External Secrets Operator pour les secrets scellés
│   ├── user-service/
│   ├── notification-service/
│   └── gateway/
│
├── scripts/
│   ├── dev-up.sh                            # docker compose --profile core up -d ; lance le seed de la base
│   ├── dev-down.sh                          # docker compose down -v (supprime les volumes)
│   ├── migrate.sh                           # Exécute alembic upgrade head dans le conteneur en cours
│   ├── seed.sh                              # Insère des données de fixture dans toutes les bases de données pour le dev local
│   ├── generate-keys.sh                     # Génère une paire de clés RS256, écrit dans .keys/ (gitignored)
│   ├── deploy.sh                            # Encapsule helm upgrade --install avec le fichier values approprié
│   └── health-check.sh                      # Interroge tous les endpoints /health jusqu'à disponibilité ou timeout
│
├── .github/
│   └── workflows/
│       ├── auth-service.yml                 # Déclencheur : paths: services/auth-service/** — lint, test, build, push
│       ├── user-service.yml                 # Déclencheur : paths: services/user-service/**
│       ├── notification-service.yml         # Déclencheur : paths: services/notification-service/**
│       ├── gateway.yml                      # Déclencheur : paths: services/gateway/**
│       ├── helm-lint.yml                    # Déclencheur : paths: helm/** — helm lint + kubeval
│       └── integration-tests.yml            # Déclencheur : manuel + planifié — tests de fumée full stack
│
├── .keys/                                   # Gitignored — paire de clés RS256 pour le dev local uniquement
│   ├── private.pem
│   └── public.pem
│
├── .env                                     # Gitignored — secrets réels pour le dev local
├── .env.example                             # Toutes les variables requises pour tous les services, documentées
└── CLAUDE.md                                # Instructions pour Claude Code travaillant dans ce dépôt
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `infrastructure/docker-compose.yml` | Définit tous les services principaux avec des health checks, des réseaux nommés (`services-net`) et des conteneurs de base de données par service. Utilisez les flags `--profile` pour ajouter les stacks d'observabilité ou de messagerie sans les démarrer par défaut. |
| `services/gateway/src/middleware/inject-service-token.ts` | Signe un JWT RS256 interne (TTL court : 30s) et l'attache en tant que `X-Internal-Token` avant de proxier. Les services en aval valident ce token dans la dépendance FastAPI `require_internal` de `deps.py` pour rejeter les requêtes qui ne proviennent pas de la passerelle. |
| `services/auth-service/app/core/jwt.py` | Source de vérité unique pour la signature JWT (clé privée RS256) et la vérification (clé publique RS256). L'auth-service et la passerelle importent une logique équivalente — ce fichier est la référence Python. Maintenez le schéma de claims (`sub`, `iat`, `exp`, `jti`, `service`) en synchronisation avec `lib/jwt.ts` de la passerelle. |
| `infrastructure/traefik/dynamic/services.yml` | Associe les noms d'hôtes publics et les préfixes de chemin aux noms de services Docker. Lors de l'ajout d'un nouveau service, enregistrez son routeur et son service ici avant d'attendre que Traefik lui achemine du trafic. |
| `infrastructure/otel-collector/otel-collector.yml` | Récepteur OTLP centralisé. Tous les services exportent leurs traces ici via gRPC sur le port 4317. Le collecteur les distribue vers Jaeger (traces) et Prometheus (métriques via le connecteur spanmetrics). Ne modifiez pas la configuration des exporteurs sans coordination avec toutes les équipes de service. |
| `scripts/migrate.sh` | Exécute `alembic upgrade head` dans le conteneur du service déjà en cours d'exécution. Exécutez toujours ce script après avoir récupéré de nouvelles migrations ; n'appliquez jamais directement sur l'URL de la base de données de production sans une fenêtre de maintenance. |
| `.github/workflows/auth-service.yml` | Pipeline par service : exécute pytest avec `--cov`, construit l'image Docker taguée avec `sha-${{ github.sha }}`, pousse vers ECR, exécute `helm lint`, et déploie optionnellement en staging lors d'une fusion sur main. |
| `helm/auth-service/values.prod.yaml` | Surcharges spécifiques à la production : 3 replicas, limites de ressources (`cpu: 500m, memory: 512Mi`), PodDisruptionBudget minAvailable=2, et annotation External Secrets Operator pour les identifiants de base de données depuis AWS Secrets Manager. |

## Scaffold rapide

```bash
# Create the full microservices directory structure from scratch
BASE="$HOME/projects/microservices"
mkdir -p "$BASE"

# Service directories (Python FastAPI services)
for svc in auth-service user-service notification-service; do
  mkdir -p "$BASE/services/$svc/app/api/v1"
  mkdir -p "$BASE/services/$svc/app/core"
  mkdir -p "$BASE/services/$svc/app/models"
  mkdir -p "$BASE/services/$svc/app/schemas"
  mkdir -p "$BASE/services/$svc/app/services"
  mkdir -p "$BASE/services/$svc/app/db"
  mkdir -p "$BASE/services/$svc/alembic/versions"
  mkdir -p "$BASE/services/$svc/tests"
  touch "$BASE/services/$svc/app/main.py"
  touch "$BASE/services/$svc/app/api/v1/router.py"
  touch "$BASE/services/$svc/app/api/v1/deps.py"
  touch "$BASE/services/$svc/app/core/config.py"
  touch "$BASE/services/$svc/app/core/telemetry.py"
  touch "$BASE/services/$svc/app/db/session.py"
  touch "$BASE/services/$svc/alembic/env.py"
  touch "$BASE/services/$svc/alembic/alembic.ini"
  touch "$BASE/services/$svc/tests/conftest.py"
  touch "$BASE/services/$svc/Dockerfile"
  touch "$BASE/services/$svc/pyproject.toml"
  touch "$BASE/services/$svc/.env.example"
done

# Gateway (Node.js + TypeScript)
mkdir -p "$BASE/services/gateway/src/routes"
mkdir -p "$BASE/services/gateway/src/middleware"
mkdir -p "$BASE/services/gateway/src/lib"
mkdir -p "$BASE/services/gateway/tests"
touch "$BASE/services/gateway/src/index.ts"
touch "$BASE/services/gateway/src/config.ts"
touch "$BASE/services/gateway/src/routes/auth.ts"
touch "$BASE/services/gateway/src/routes/users.ts"
touch "$BASE/services/gateway/src/routes/health.ts"
touch "$BASE/services/gateway/src/middleware/authenticate.ts"
touch "$BASE/services/gateway/src/middleware/inject-service-token.ts"
touch "$BASE/services/gateway/src/middleware/rate-limit.ts"
touch "$BASE/services/gateway/src/middleware/request-id.ts"
touch "$BASE/services/gateway/src/lib/proxy.ts"
touch "$BASE/services/gateway/src/lib/jwt.ts"
touch "$BASE/services/gateway/src/lib/telemetry.ts"
touch "$BASE/services/gateway/tsconfig.json"
touch "$BASE/services/gateway/package.json"
touch "$BASE/services/gateway/Dockerfile"
touch "$BASE/services/gateway/.env.example"

# Infrastructure
mkdir -p "$BASE/infrastructure/traefik/dynamic"
mkdir -p "$BASE/infrastructure/prometheus/rules"
mkdir -p "$BASE/infrastructure/grafana/provisioning/datasources"
mkdir -p "$BASE/infrastructure/grafana/provisioning/dashboards"
mkdir -p "$BASE/infrastructure/grafana/dashboards"
mkdir -p "$BASE/infrastructure/otel-collector"
touch "$BASE/infrastructure/docker-compose.yml"
touch "$BASE/infrastructure/docker-compose.observability.yml"
touch "$BASE/infrastructure/docker-compose.messaging.yml"
touch "$BASE/infrastructure/docker-compose.prod.yml"
touch "$BASE/infrastructure/traefik/traefik.yml"
touch "$BASE/infrastructure/traefik/dynamic/services.yml"
touch "$BASE/infrastructure/traefik/dynamic/middlewares.yml"
touch "$BASE/infrastructure/prometheus/prometheus.yml"
touch "$BASE/infrastructure/prometheus/rules/service-alerts.yml"
touch "$BASE/infrastructure/prometheus/rules/infra-alerts.yml"
touch "$BASE/infrastructure/grafana/provisioning/datasources/prometheus.yml"
touch "$BASE/infrastructure/grafana/provisioning/dashboards/dashboards.yml"
touch "$BASE/infrastructure/grafana/dashboards/services-overview.json"
touch "$BASE/infrastructure/otel-collector/otel-collector.yml"

# Helm charts
for svc in auth-service user-service notification-service gateway; do
  mkdir -p "$BASE/helm/$svc/templates"
  touch "$BASE/helm/$svc/Chart.yaml"
  touch "$BASE/helm/$svc/values.yaml"
  touch "$BASE/helm/$svc/values.staging.yaml"
  touch "$BASE/helm/$svc/values.prod.yaml"
  for tmpl in deployment service ingress hpa configmap secret; do
    touch "$BASE/helm/$svc/templates/$tmpl.yaml"
  done
done

# Scripts
mkdir -p "$BASE/scripts"
for script in dev-up dev-down migrate seed generate-keys deploy health-check; do
  touch "$BASE/scripts/$script.sh"
  chmod +x "$BASE/scripts/$script.sh"
done

# GitHub Actions
mkdir -p "$BASE/.github/workflows"
for wf in auth-service user-service notification-service gateway helm-lint integration-tests; do
  touch "$BASE/.github/workflows/$wf.yml"
done

# Root files
mkdir -p "$BASE/.keys"
echo ".keys/\n.env" > "$BASE/.gitignore"
touch "$BASE/.env.example"
touch "$BASE/CLAUDE.md"

# Generate local RS256 keypair for service-to-service auth
bash "$BASE/scripts/generate-keys.sh" 2>/dev/null || \
  openssl genrsa -out "$BASE/.keys/private.pem" 2048 && \
  openssl rsa -in "$BASE/.keys/private.pem" -pubout -out "$BASE/.keys/public.pem"

echo "Microservices scaffold created at $BASE"

# Install relevant skills
npx claudient add skill devops-infra/docker-compose-local-dev
npx claudient add skill devops-infra/k8s-deployment
npx claudient add skill devops-infra/helm-chart
npx claudient add skill devops-infra/oncall-runbook
npx claudient add skill backend/fastapi-crud
npx claudient add skill backend/alembic-migration
npx claudient add skill backend/rabbitmq-consumer
npx claudient add skill devops-infra/capacity-planner
```

## Modèle CLAUDE.md

```markdown
# Plateforme Microservices — CLAUDE.md

Ce dépôt contient quatre services (auth-service, user-service, notification-service, gateway),
une infrastructure partagée (Docker Compose, Traefik, Prometheus, Grafana, RabbitMQ), et des charts Helm
pour le déploiement sur Kubernetes. Les modifications sur un service sont isolées — chacun possède sa propre
base de données, son pipeline CI et son Dockerfile.

## Stack

- auth-service: FastAPI 0.111, PostgreSQL 16 (auth_db), Redis 7, migrations Alembic
- user-service: FastAPI 0.111, PostgreSQL 16 (user_db), éditeur RabbitMQ, migrations Alembic
- notification-service: FastAPI 0.111, consommateur RabbitMQ via aio_pika, SendGrid
- gateway: Express 4, TypeScript 5.4, http-proxy-middleware, validation JWT RS256
- Proxy inverse : Traefik v3 — tout le trafic public y transite ; aucun service n'expose de ports directement
- Observabilité : Prometheus + Grafana + Jaeger via OpenTelemetry (OTLP gRPC port 4317)
- Messagerie asynchrone : Files durables RabbitMQ avec échanges en lettre morte sur toutes les files consommateurs
- Déploiement : Charts Helm 3.14 par service ; values.staging.yaml et values.prod.yaml par environnement

## Lancer la stack complète en local

```bash
# Démarrer les services principaux (les quatre services + bases par service + Redis + Traefik)
./scripts/dev-up.sh

# Démarrer avec la stack d'observabilité (ajoute Prometheus, Grafana, Jaeger, collecteur OTEL)
docker compose -f infrastructure/docker-compose.yml \
               -f infrastructure/docker-compose.observability.yml up -d

# Démarrer avec la messagerie (ajoute RabbitMQ + interface de gestion sur http://localhost:15672)
docker compose -f infrastructure/docker-compose.yml \
               -f infrastructure/docker-compose.messaging.yml up -d

# Vérifier que tous les services sont sains
./scripts/health-check.sh

# Arrêter (supprime les volumes — réinitialise toutes les bases de données)
./scripts/dev-down.sh
```

Les services sont accessibles via Traefik sur http://localhost:80 :
- POST http://localhost/api/v1/auth/login
- GET  http://localhost/api/v1/users/{id}
- GET  http://localhost/health

## Ajouter un nouveau service

1. Copier services/auth-service/ comme modèle : cp -r services/auth-service services/my-service
2. Mettre à jour services/my-service/app/core/config.py avec les variables d'env du nouveau service
3. Ajouter un nouveau conteneur de base de données dans infrastructure/docker-compose.yml (my_service_db: postgres:16)
4. Enregistrer le service dans infrastructure/docker-compose.yml sous services:
   - Construire depuis services/my-service/Dockerfile
   - Connecter à services-net, depends_on la base de données
5. Ajouter les règles de routage dans infrastructure/traefik/dynamic/services.yml
6. Créer un chart Helm : cp -r helm/auth-service helm/my-service ; mettre à jour Chart.yaml + values.yaml
7. Créer un workflow GitHub Actions : cp .github/workflows/auth-service.yml .github/workflows/my-service.yml
   - Mettre à jour le filtre `paths:` vers services/my-service/**
8. Ajouter les entrées .env.example pour les variables d'env requises du nouveau service
9. Exécuter ./scripts/generate-keys.sh si le service doit émettre des JWT internes
10. Écrire la migration Alembic initiale et l'exécuter : ./scripts/migrate.sh my-service

## Communication inter-services

### Synchrone (REST via gateway)

Tous les appels synchrones des clients passent par la passerelle. La passerelle :
1. Vérifie le JWT utilisateur (clé publique RS256 depuis .keys/public.pem)
2. Signe un JWT de service interne (clé privée RS256, TTL 30s, claims : {sub: "gateway", service: "gateway"})
3. L'attache en tant qu'en-tête X-Internal-Token avant de proxier

Les services en aval valident X-Internal-Token dans leur dépendance FastAPI `require_internal`.
Les appels REST directs de service à service (sans passer par la passerelle) doivent également utiliser un JWT interne signé.

### Asynchrone (RabbitMQ)

Les échanges suivent le schéma : {service}.events (ex. : user.events, auth.events).
Les clés de routage suivent : {service}.{entity}.{action} (ex. : user.account.created).

Publication (exemple user-service) :
```python
# core/messaging.py
await channel.default_exchange.publish(
    aio_pika.Message(
        body=UserCreatedEvent(user_id=str(user.id)).model_dump_json().encode(),
        delivery_mode=aio_pika.DeliveryMode.PERSISTENT,
        content_type="application/json",
    ),
    routing_key="user.account.created",
)
```

Consommation (exemple notification-service) :
- Déclarer la file avec x-dead-letter-exchange pointant vers {service}.events.dlx
- Toujours ack après un traitement réussi ; nack (requeue=False) en cas d'erreurs irrécupérables
- Consommateurs idempotents uniquement — les messages peuvent être redistribués après un crash

## Exécuter les migrations

```bash
# Exécuter les migrations en attente pour un service spécifique
./scripts/migrate.sh auth-service     # exécute alembic upgrade head dans le conteneur
./scripts/migrate.sh user-service

# Générer une nouvelle migration (après modification des modèles SQLAlchemy)
docker exec auth-service alembic revision --autogenerate -m "add_refresh_token_table"

# Inspecter l'état actuel des migrations
docker exec auth-service alembic current
docker exec auth-service alembic history --verbose
```

Règles de migration :
- Chaque migration doit être rétrocompatible — l'ancienne version du service doit encore fonctionner avec elle
- Ne jamais faire DROP COLUMN dans le même PR qui supprime la colonne du modèle ORM
- Pour les grandes tables (>1M lignes) : utiliser CREATE INDEX CONCURRENTLY, jamais un simple CREATE INDEX
- Toujours ajouter un commentaire SQL de rollback en tête de chaque fichier de version de migration

## Auth service à service

La paire de clés RS256 dans .keys/ est utilisée pour toute signature de JWT interne :
- private.pem : la passerelle et tout service émettant des tokens internes signent avec cette clé
- public.pem : tous les services en aval vérifient avec cette clé

En dev local, .keys/ est monté en volume dans tous les conteneurs.
En staging/prod, la paire de clés est stockée dans AWS Secrets Manager et injectée via des secrets Kubernetes.

Pour effectuer une rotation de la paire de clés :
1. Générer une nouvelle paire : ./scripts/generate-keys.sh
2. Déployer la nouvelle clé publique sur tous les services en premier (ils acceptent l'ancienne et la nouvelle pendant la fenêtre de rotation)
3. Déployer la nouvelle clé privée vers la passerelle/les émetteurs
4. Retirer l'ancienne clé publique des vérificateurs après l'expiration de tous les tokens en transit (TTL max : 30s)

## Observabilité

- Métriques : tous les services exposent GET /metrics (scrape Prometheus) ; voir infrastructure/prometheus/prometheus.yml
- Traces : tous les services exportent OTLP gRPC vers otel-collector:4317 ; visualiser les traces dans Jaeger sur http://localhost:16686
- Dashboards : Grafana sur http://localhost:3000 (admin/admin en local) ; dashboards auto-provisionnés depuis infrastructure/grafana/dashboards/
- Alertes : définies dans infrastructure/prometheus/rules/ ; déclenchent vers PagerDuty en production

## Pipelines CI

Chaque service dispose de son propre fichier de workflow dans .github/workflows/ :
- Déclenché par filtre de chemin : modifications sur services/{name}/** ou helm/{name}/**
- Étapes : checkout → configuration du langage (Python 3.12 / Node 20) → lint → test → build Docker → push vers ECR → helm lint
- Lors d'une fusion sur main : ajoute une étape de déploiement en staging (helm upgrade --install avec values.staging.yaml)
- Tags d'image : sha-${{ github.sha }} — ne jamais utiliser `latest` comme tag de déploiement

## Conventions

- Nommage des bases de données : {service_name}_db (ex. : auth_db, user_db) — ne jamais partager une base entre services
- Nommage des files : {service}.{entity}.{action} — toujours inclure les trois segments
- Claims JWT internes : toujours inclure {sub, iat, exp, jti, service} — ne jamais supprimer jti (pour la prévention des rejeux)
- Variables d'env : ALL_CAPS_SNAKE_CASE ; toujours ajouter dans .env.example avec un commentaire descriptif
- Ports (dev local) : gateway=8000, auth-service=8001, user-service=8002, notification-service=8003
- Dashboard Traefik : http://localhost:8080 (local uniquement, ne jamais exposer en production)
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
        "${HOME}/projects/microservices"
      ]
    },
    "docker": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-docker"],
      "env": {
        "DOCKER_HOST": "unix:///var/run/docker.sock"
      }
    },
    "postgres-auth": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://dev:dev@localhost:5433/auth_db"
      }
    },
    "postgres-user": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "postgresql://dev:dev@localhost:5434/user_db"
      }
    },
    "prometheus": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-prometheus"],
      "env": {
        "PROMETHEUS_URL": "http://localhost:9090"
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
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; EXT=\"${FILE##*.}\"; if [[ \"$EXT\" == \"py\" ]]; then ruff format \"$FILE\" 2>/dev/null && ruff check --fix --select I \"$FILE\" 2>/dev/null || true; elif [[ \"$EXT\" == \"ts\" || \"$EXT\" == \"tsx\" ]]; then npx prettier --write \"$FILE\" 2>/dev/null || true; elif [[ \"$EXT\" == \"yml\" || \"$EXT\" == \"yaml\" ]]; then which yamllint &>/dev/null && yamllint -d relaxed \"$FILE\" 2>/dev/null || true; fi'"
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
            "command": "bash -c 'CMD=\"$CLAUDE_TOOL_INPUT_COMMAND\"; if echo \"$CMD\" | grep -qE \"alembic upgrade|migrate\\.sh\"; then echo \"[HOOK] Migration detected — confirm the target service DB is running and a backup exists before proceeding.\" >&2; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'REPO=\"$PWD\"; if docker compose -f \"$REPO/infrastructure/docker-compose.yml\" ps --quiet 2>/dev/null | grep -q .; then echo \"[REMINDER] Docker Compose stack is still running. Run ./scripts/dev-down.sh when finished to free resources.\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Skills à installer

```bash
npx claudient add skill devops-infra/docker-compose-local-dev
npx claudient add skill devops-infra/k8s-deployment
npx claudient add skill devops-infra/helm-chart
npx claudient add skill devops-infra/oncall-runbook
npx claudient add skill devops-infra/capacity-planner
npx claudient add skill backend/fastapi-crud
npx claudient add skill backend/alembic-migration
npx claudient add skill backend/rabbitmq-consumer
npx claudient add skill data-ml/stakeholder-report
npx claudient add skill productivity/engineering-strategy
```

## Liens connexes

- [Guide DevOps & Infrastructure](../guides/for-devops-sre.md)
- [Workflow Docker Compose en développement local](../workflows/docker-compose-local-dev.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
