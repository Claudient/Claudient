# Application Agent IA (Claude + MCP) — Structure de Projet

> Pour les ingénieurs qui construisent des systèmes d'agents IA en production sur l'Anthropic SDK — en optimisant le cycle complet, de la définition des outils jusqu'au déploiement évalué, observable et respectueux du budget de tokens.

## Stack

- **Langage / runtime :** TypeScript 5.5+, Node.js 22 LTS
- **SDK IA :** @anthropic-ai/sdk 0.30+ (streaming, utilisation d'outils, prompt caching)
- **Client MCP :** @modelcontextprotocol/sdk 1.x (StdioClientTransport, SSEClientTransport)
- **Validation de schéma :** Zod 3.23+ (schémas d'entrée des outils, contrats requête/réponse API)
- **Couche HTTP :** Hono 4.x sur adaptateur Node.js (ou Express 4.x — permutable dans src/api/)
- **ORM :** Drizzle ORM 0.31+ avec drizzle-kit pour les migrations
- **Base de données :** PostgreSQL 16 (driver pg, pooling de connexions via node-postgres)
- **Cache de conversation :** Redis 7 (ioredis) — historique des messages en fenêtre glissante, suivi du budget de tokens
- **Tests :** Vitest 2.x (unitaires + intégration), fixtures mock @anthropic-ai/sdk pour les tests d'agents
- **Conteneurisation :** Docker 25 (build multi-étapes), docker-compose v2 pour les dépendances locales
- **CI/CD :** GitHub Actions (typecheck → lint → test → build → push)
- **Linting / formatage :** ESLint 9 (flat config), Prettier 3
- **Observabilité :** pino (logs JSON structurés), OpenTelemetry Node.js SDK, Sentry Node SDK

## Arborescence du projet

```
ai-agent-app/
├── .github/
│   └── workflows/
│       ├── ci.yml                              # typecheck, lint, vitest, seuil de couverture (80%)
│       ├── cd-staging.yml                      # Déploiement en staging lors d'un merge sur main
│       └── cd-production.yml                   # Déploiement sur push d'un tag semver
├── docker/
│   ├── Dockerfile                              # Multi-étapes : deps → build → runtime (non-root)
│   └── docker-compose.yml                      # Local : app + postgres + redis
├── drizzle/
│   ├── 0000_create_conversations.sql           # Tables conversations + messages
│   ├── 0001_create_tool_calls.sql              # Table d'audit tool_calls avec JSON entrée/sortie
│   ├── 0002_create_evals.sql                   # Tables eval_runs + eval_results
│   └── meta/
│       └── _journal.json                       # Journal de migration Drizzle (commité)
├── prompts/
│   ├── base-agent.md                           # Prompt système racine — persona, capacités, limites
│   ├── tool-use-agent.md                       # Variante du prompt système pour les tâches à fort usage d'outils
│   ├── summarization-agent.md                  # Prompt focalisé sur la summarisation de conversation
│   └── versions/
│       ├── base-agent@v1.md                    # Archive v1 — ne jamais supprimer, utilisé par les evals
│       ├── base-agent@v2.md                    # Archive v2
│       └── tool-use-agent@v1.md               # Archive tool-use v1
├── evals/
│   ├── golden/
│   │   ├── tool-selection.jsonl                # Jeu de données golden : entrée → appels d'outils attendus
│   │   ├── multi-turn-reasoning.jsonl          # Conversations multi-tours avec sorties attendues
│   │   └── edge-cases.jsonl                    # Refus, entrées ambiguës, épuisement du budget
│   ├── harness/
│   │   ├── runner.ts                           # Runner d'eval principal : charge le jeu golden, exécute l'agent
│   │   ├── scorer.ts                           # Fonctions de scoring : correspondance exacte + LLM-as-judge
│   │   ├── report.ts                           # Générateur de rapports Markdown + JSON
│   │   └── types.ts                            # Types EvalCase, EvalResult, ScoreBreakdown
│   └── results/
│       └── .gitkeep                            # Résultats commités par run d'eval (nommés par date+sha)
├── src/
│   ├── agents/
│   │   ├── base-agent.ts                       # Classe AgentRunner : orchestre la boucle d'outils + streaming
│   │   ├── tool-use-agent.ts                   # Étend BaseAgent avec un sous-ensemble d'outils préconfigurés
│   │   ├── summarization-agent.ts              # Agent de summarisation en un seul tour (sans outils)
│   │   └── types.ts                            # Types AgentConfig, AgentRunOptions, AgentResponse
│   ├── tools/
│   │   ├── index.ts                            # Registre central des outils : exporte le tableau TOOLS pour le SDK
│   │   ├── definitions/
│   │   │   ├── search-web.ts                   # Schéma Zod + ToolDefinition pour la recherche web
│   │   │   ├── read-file.ts                    # Schéma Zod + ToolDefinition pour les lectures de fichiers
│   │   │   ├── run-query.ts                    # Schéma Zod + ToolDefinition pour les requêtes SQL
│   │   │   ├── send-email.ts                   # Schéma Zod + ToolDefinition pour l'envoi d'e-mails
│   │   │   └── create-ticket.ts                # Schéma Zod + ToolDefinition pour les tickets Linear/Jira
│   │   └── implementations/
│   │       ├── search-web.ts                   # Implémentation réelle : appelle l'API Brave/Tavily
│   │       ├── read-file.ts                    # Lecture de fichier en sandbox avec liste d'autorisation de chemins
│   │       ├── run-query.ts                    # Exécute du SQL en lecture seule sur le pool pg
│   │       ├── send-email.ts                   # Appelle Resend/SendGrid avec destinataires validés
│   │       └── create-ticket.ts                # Mutation GraphQL Linear via @linear/sdk
│   ├── mcp/
│   │   ├── client.ts                           # Factory client MCP : StdioClientTransport + SSEClientTransport
│   │   ├── registry.ts                         # MCPServerRegistry : charge les serveurs depuis mcp.config.json
│   │   ├── tool-bridge.ts                      # Convertit les schémas d'outils MCP → ToolDefinition Anthropic SDK
│   │   └── mcp.config.json                     # Définitions des serveurs : commande, args, clés d'env
│   ├── api/
│   │   ├── index.ts                            # Factory de l'app Hono : enregistre les routes et middlewares
│   │   ├── middleware/
│   │   │   ├── auth.ts                         # Middleware de vérification Bearer token + clé API
│   │   │   ├── ratelimit.ts                    # Limiteur de débit Redis en fenêtre glissante
│   │   │   └── request-id.ts                   # Injection X-Request-ID + child logger pino
│   │   └── routes/
│   │       ├── chat.ts                         # POST /chat — invocation de l'agent sans streaming
│   │       ├── chat-stream.ts                  # POST /chat/stream — réponse SSE en streaming
│   │       ├── conversations.ts                # GET /conversations, GET /conversations/:id/messages
│   │       └── health.ts                       # GET /health (liveness), GET /health/ready (readiness)
│   ├── lib/
│   │   ├── anthropic.ts                        # Singleton client Anthropic avec en-têtes de cache de prompt
│   │   ├── conversation-manager.ts             # Charge/sauvegarde l'historique de conversation depuis Redis + Postgres
│   │   ├── token-counter.ts                    # Compte les tokens via le SDK beta, applique le budget par tour
│   │   ├── prompt-loader.ts                    # Charge un prompt versionné depuis prompts/ par nom + version
│   │   └── stream-handler.ts                   # Parse les chunks du flux SSE, émet des événements typés
│   ├── db/
│   │   ├── client.ts                           # Singleton client Drizzle sur pool node-postgres
│   │   ├── schema.ts                           # Toutes les définitions de tables Drizzle dans un seul fichier
│   │   └── queries/
│   │       ├── conversations.ts                # findById, create, listByUser, deleteById
│   │       ├── messages.ts                     # appendMessage, getHistory, pruneOldMessages
│   │       └── tool-calls.ts                   # logToolCall, getToolCallsForRun
│   ├── types/
│   │   ├── api.ts                              # Schémas Zod : ChatRequest, ChatResponse, SSEEvent
│   │   ├── conversation.ts                     # ConversationRow, MessageRow, enum MessageRole
│   │   └── tool.ts                             # ToolCallRow, ToolResult, ToolExecutionError
│   └── index.ts                                # Point d'entrée : init du registre MCP, démarrage du serveur Hono
├── tests/
│   ├── unit/
│   │   ├── agents/
│   │   │   ├── base-agent.test.ts              # Logique de la boucle d'outils, retry, conditions d'arrêt
│   │   │   └── token-budget.test.ts            # Application du budget, déclenchement de la summarisation
│   │   ├── tools/
│   │   │   ├── search-web.test.ts              # Validation du schéma, gestion des réponses API mockées
│   │   │   └── run-query.test.ts               # Protections contre l'injection SQL, application du mode lecture seule
│   │   └── lib/
│   │       ├── conversation-manager.test.ts    # Aller-retour Redis, élagage de l'historique
│   │       └── token-counter.test.ts           # Précision du comptage, logique de seuil du budget
│   └── integration/
│       ├── chat-route.test.ts                  # POST /chat de bout en bout avec le SDK Anthropic mocké
│       ├── stream-route.test.ts                # Exactitude du flux SSE, terminaison anticipée
│       └── agent-e2e.test.ts                   # Boucle d'agent complète avec outils réels (externes stubés)
├── .claude/
│   └── commands/
│       ├── add-tool.md                         # /add-tool : scaffolde une nouvelle définition + implémentation d'outil
│       ├── add-mcp-server.md                   # /add-mcp-server : ajoute un serveur dans mcp.config.json + bridge
│       ├── run-evals.md                        # /run-evals : exécute le harness sur le jeu golden, affiche les différences
│       ├── archive-prompt.md                   # /archive-prompt : copie le prompt courant dans versions/ avec un tag
│       └── token-budget-report.md              # /token-budget-report : interroge Redis pour les statistiques d'usage du budget
├── drizzle.config.ts                           # Config Drizzle Kit : chemin du schéma, répertoire de sortie, credentials pg
├── tsconfig.json                               # Mode strict, alias de chemins (@/* → src/*), cible ESNext
├── vitest.config.ts                            # Vitest : inclut tests/, alias, couverture via v8
├── eslint.config.js                            # Config flat ESLint : typescript-eslint recommended + règles personnalisées
├── .env.example                                # Toutes les variables d'env avec descriptions, sans valeurs réelles
├── .env.test                                   # URLs DB/Redis de test — commités, sans secrets
└── package.json                                # Scripts : dev, build, start, test, lint, db:migrate, eval
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `src/lib/anthropic.ts` | Singleton `Anthropic` configuré avec `anthropic-beta: prompt-caching-2024-07-31` ; encapsule `messages.create` et `messages.stream` avec injection automatique de `cache_control: { type: "ephemeral" }` sur le bloc du prompt système ; ré-exporte les types |
| `src/agents/base-agent.ts` | Classe `AgentRunner` qui gère la boucle d'outils agentique : appelle l'API, dispatche les résultats d'outils, vérifie le budget de tokens via `TokenCounter`, déclenche la summarisation à 70% du budget, s'arrête à 95% |
| `src/tools/index.ts` | Registre central qui assemble le tableau `TOOLS` transmis à `messages.create` ; importe tous les objets `ToolDefinition` depuis `definitions/` ; fournit le dispatcher `executeTool(name, input)` vers `implementations/` |
| `src/mcp/tool-bridge.ts` | Convertit un `ListToolsResult` MCP en objets `Tool[]` pour l'Anthropic SDK ; gère la coercition JSON Schema → Zod pour la validation à l'exécution des entrées d'outils MCP avant le dispatch |
| `src/lib/conversation-manager.ts` | Charge l'historique des messages depuis Redis (hot, 20 derniers tours) et se rabat sur Postgres pour les tours plus anciens ; écrit les nouveaux messages de manière atomique ; applique une éviction en fenêtre glissante par `conversationId` |
| `src/lib/token-counter.ts` | Utilise `client.beta.messages.countTokens` pour mesurer l'usage de tokens avant chaque appel API ; stocke les totaux cumulés par conversation dans Redis ; expose les helpers `isNearBudget(threshold)` et `mustSummarise()` |
| `drizzle/0001_create_tool_calls.sql` | Table d'audit capturant chaque invocation d'outil : `tool_name`, `input` (JSONB), `output` (JSONB), `duration_ms`, `error` — alimente le harness d'eval et les tableaux de bord d'observabilité |
| `evals/harness/runner.ts` | Charge les fichiers golden `.jsonl`, exécute chaque cas via l'agent avec un modèle et une version de prompt fixes, collecte les `AgentResponse`, les transmet à `scorer.ts` ; retourne un code d'erreur si le taux de réussite passe sous le seuil |

## Scaffold rapide

```bash
# Prérequis : Node.js 22+, Docker, pnpm (npm install -g pnpm)
PROJECT=ai-agent-app
mkdir -p $PROJECT && cd $PROJECT

# Init Node project
pnpm init
pnpm add @anthropic-ai/sdk @modelcontextprotocol/sdk zod hono \
  drizzle-orm pg ioredis pino \
  @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node \
  @sentry/node

pnpm add -D typescript @types/node @types/pg \
  vitest @vitest/coverage-v8 \
  drizzle-kit \
  eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser \
  prettier tsx

# Directory structure
mkdir -p .github/workflows
mkdir -p docker
mkdir -p drizzle/meta
mkdir -p prompts/versions
mkdir -p evals/golden evals/harness evals/results
mkdir -p src/agents src/tools/definitions src/tools/implementations
mkdir -p src/mcp
mkdir -p src/api/middleware src/api/routes
mkdir -p src/lib src/db/queries src/types
mkdir -p tests/unit/agents tests/unit/tools tests/unit/lib
mkdir -p tests/integration
mkdir -p .claude/commands

# Touch source files
touch src/index.ts
touch src/agents/base-agent.ts src/agents/tool-use-agent.ts
touch src/agents/summarization-agent.ts src/agents/types.ts
touch src/tools/index.ts
touch src/tools/definitions/search-web.ts src/tools/definitions/read-file.ts
touch src/tools/definitions/run-query.ts src/tools/definitions/send-email.ts
touch src/tools/definitions/create-ticket.ts
touch src/tools/implementations/search-web.ts src/tools/implementations/read-file.ts
touch src/tools/implementations/run-query.ts src/tools/implementations/send-email.ts
touch src/tools/implementations/create-ticket.ts
touch src/mcp/client.ts src/mcp/registry.ts src/mcp/tool-bridge.ts src/mcp/mcp.config.json
touch src/api/index.ts
touch src/api/middleware/auth.ts src/api/middleware/ratelimit.ts src/api/middleware/request-id.ts
touch src/api/routes/chat.ts src/api/routes/chat-stream.ts
touch src/api/routes/conversations.ts src/api/routes/health.ts
touch src/lib/anthropic.ts src/lib/conversation-manager.ts
touch src/lib/token-counter.ts src/lib/prompt-loader.ts src/lib/stream-handler.ts
touch src/db/client.ts src/db/schema.ts
touch src/db/queries/conversations.ts src/db/queries/messages.ts src/db/queries/tool-calls.ts
touch src/types/api.ts src/types/conversation.ts src/types/tool.ts
touch evals/harness/runner.ts evals/harness/scorer.ts
touch evals/harness/report.ts evals/harness/types.ts
touch tests/unit/agents/base-agent.test.ts tests/unit/agents/token-budget.test.ts
touch tests/unit/tools/search-web.test.ts tests/unit/tools/run-query.test.ts
touch tests/unit/lib/conversation-manager.test.ts tests/unit/lib/token-counter.test.ts
touch tests/integration/chat-route.test.ts tests/integration/stream-route.test.ts
touch tests/integration/agent-e2e.test.ts
touch prompts/base-agent.md prompts/tool-use-agent.md prompts/summarization-agent.md
touch .env.example .env.test

# tsconfig.json
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2022"],
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "exactOptionalPropertyTypes": true,
    "noUncheckedIndexedAccess": true,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] },
    "declaration": true,
    "sourceMap": true
  },
  "include": ["src/**/*", "evals/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
EOF

# drizzle.config.ts
cat > drizzle.config.ts << 'EOF'
import { defineConfig } from "drizzle-kit";
export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url: process.env.DATABASE_URL! },
});
EOF

# vitest.config.ts
cat > vitest.config.ts << 'EOF'
import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    coverage: { provider: "v8", thresholds: { lines: 80 } },
  },
  resolve: { alias: { "@": new URL("./src", import.meta.url).pathname } },
});
EOF

# docker-compose pour le développement local
cat > docker/docker-compose.yml << 'EOF'
version: "3.9"
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: agent
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: agent_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U agent"]
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

# Section scripts de package.json (à fusionner avec la sortie de pnpm init)
cat > package.json << 'EOF'
{
  "name": "ai-agent-app",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc --noEmit false",
    "start": "node dist/index.js",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "lint": "eslint src/ tests/ --max-warnings 0",
    "typecheck": "tsc --noEmit",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:studio": "drizzle-kit studio",
    "db:push": "drizzle-kit push",
    "eval": "tsx evals/harness/runner.ts",
    "infra:up": "docker compose -f docker/docker-compose.yml up -d",
    "infra:down": "docker compose -f docker/docker-compose.yml down"
  }
}
EOF

# Stubs .claude/commands
cat > .claude/commands/add-tool.md << 'EOF'
Create a new tool with name $ARGUMENTS.
1. Add src/tools/definitions/$ARGUMENTS.ts with Zod schema + ToolDefinition export.
2. Add src/tools/implementations/$ARGUMENTS.ts with the implementation.
3. Register both in src/tools/index.ts.
4. Add tests/unit/tools/$ARGUMENTS.test.ts with happy path + validation error cases.
EOF

cat > .claude/commands/run-evals.md << 'EOF'
Run the eval harness: pnpm eval -- --golden evals/golden/ --prompt $ARGUMENTS --output evals/results/$(date +%Y%m%d)-$(git rev-parse --short HEAD).json
Print pass rate and any regressions vs the previous result file.
EOF

cat > .claude/commands/archive-prompt.md << 'EOF'
Archive the current prompt file at prompts/$ARGUMENTS.md to prompts/versions/$ARGUMENTS@$(git describe --tags --abbrev=0 2>/dev/null || echo v0).md
Then confirm the prompts/versions/ entry is referenced in the eval golden set header.
EOF

echo "Scaffold terminé. Prochaine étape : pnpm install && pnpm infra:up && pnpm db:migrate"
```

## Template CLAUDE.md

```markdown
# Application Agent IA (Claude + MCP)

Agent IA en production construit sur l'Anthropic SDK avec utilisation d'outils, intégration de serveurs MCP,
mémoire de conversation, gestion du budget de tokens et un harness d'évaluation.
Toute la logique d'agent se trouve dans src/agents/. Les outils sont dans src/tools/. La config MCP dans src/mcp/.

## Stack

- @anthropic-ai/sdk 0.30+ — messages.create + messages.stream ; prompt caching activé
- @modelcontextprotocol/sdk 1.x — StdioClientTransport pour les serveurs locaux, SSEClientTransport pour les serveurs distants
- Zod 3.23 — tous les schémas d'entrée des outils définis dans src/tools/definitions/ ; validés avant le dispatch
- Hono 4 sur Node.js — API HTTP dans src/api/ ; streaming via SSE sur POST /chat/stream
- Drizzle ORM 0.31 + PostgreSQL 16 — schéma dans src/db/schema.ts ; migrations dans drizzle/
- ioredis — cache de conversation dans src/lib/conversation-manager.ts ; budget de tokens dans src/lib/token-counter.ts
- Vitest 2 — tests unitaires mockant l'Anthropic SDK ; tests d'intégration avec implémentations d'outils stubées

## Ajouter un nouvel outil (étapes exactes)

1. **Définir le schéma** — créer `src/tools/definitions/<tool-name>.ts` :
   - Exporter un `const toolDefinition: Tool` (type Anthropic SDK)
   - Définir le schéma d'entrée comme objet Zod ; exporter sous `<ToolName>Input`
   - Utiliser `zodToJsonSchema` de `zod-to-json-schema` pour le champ `input_schema`

2. **Écrire l'implémentation** — créer `src/tools/implementations/<tool-name>.ts` :
   - Exporter `async function execute(input: <ToolName>Input): Promise<string>`
   - Parser et valider l'entrée avec `<ToolName>Input.parse(raw)` en début de fonction
   - Retourner une chaîne simple (sérialisée en JSON si données structurées)
   - Lever `ToolExecutionError` depuis `src/types/tool.ts` en cas d'échec (pas d'Error générique)

3. **Enregistrer** — dans `src/tools/index.ts` :
   - Importer la définition et l'ajouter au tableau `TOOLS`
   - Ajouter une branche `case "<tool-name>":` dans le switch `executeTool()`

4. **Tester** — créer `tests/unit/tools/<tool-name>.test.ts` :
   - Tester le cas nominal, le rejet de validation Zod, et la propagation de ToolExecutionError
   - Mocker tous les appels d'API externes ; ne jamais faire de vrais appels réseau dans les tests unitaires

## Ajouter un serveur MCP

1. Ajouter l'entrée du serveur dans `src/mcp/mcp.config.json` :
   ```json
   {
     "servers": {
       "<server-name>": {
         "transport": "stdio",
         "command": "npx",
         "args": ["-y", "@org/mcp-server-name"],
         "env": { "API_KEY": "${MCP_SERVER_API_KEY}" }
       }
     }
   }
   ```
2. Ajouter la variable d'env requise dans `.env.example` avec une description.
3. Le `MCPServerRegistry` dans `src/mcp/registry.ts` se charge automatiquement au démarrage — aucun changement de code nécessaire.
4. `tool-bridge.ts` convertit la liste d'outils MCP en objets `Tool[]` Anthropic automatiquement.
5. Vérifier avec : `pnpm dev` puis `curl -X POST /health/ready` — le serveur MCP doit apparaître dans la sortie du bilan de disponibilité.

## Convention de versionnage des prompts

- Les prompts actifs se trouvent dans `prompts/<name>.md` — modifier ces fichiers pour les changements en production.
- Avant tout changement de prompt affectant les résultats d'eval, exécuter `/archive-prompt <name>` pour prendre un instantané de la version courante dans `prompts/versions/<name>@<tag>.md`.
- Les cas d'eval golden référencent une version spécifique dans leur en-tête : `{ "prompt_version": "base-agent@v2" }`.
- Le harness d'eval (`evals/harness/runner.ts`) charge le fichier versionné — jamais le fichier live dans `prompts/`.
- Format des prompts dans les fichiers `.md` : texte brut du prompt système, sans frontmatter, sans en-têtes markdown. `prompt-loader.ts` lit le fichier tel quel.

## Utilisation du harness d'évaluation

```bash
# Exécuter la suite complète d'evals avec les prompts et le modèle courants
pnpm eval

# Exécuter sur un fichier golden spécifique
pnpm eval -- --golden evals/golden/tool-selection.jsonl

# Exécuter avec une version de prompt spécifique (lit depuis prompts/versions/)
pnpm eval -- --prompt base-agent@v2

# Comparer deux runs
diff evals/results/<old>.json evals/results/<new>.json | jq .

# Seuil CI : échoue si le taux de réussite est inférieur à 90%
pnpm eval -- --threshold 0.90
```

Format du jeu de données golden (`.jsonl`, un objet JSON par ligne) :
```json
{ "id": "ts-001", "prompt_version": "base-agent@v2", "input": [{"role": "user", "content": "Search for Q3 revenue data"}], "expected_tools": ["search-web"], "expected_output_contains": ["revenue"] }
```

Scoring : correspondance exacte du nom d'outil = 1.0 ; LLM-as-judge sur le contenu de la sortie = 0.0–1.0.
Score final du cas = 0.5 * tool_score + 0.5 * output_score.

## Gestion du budget de tokens

Le `TokenCounter` dans `src/lib/token-counter.ts` applique un budget configurable par conversation.

```typescript
// Budgets par défaut (à surcharger via env)
MAX_CONVERSATION_TOKENS=100000   // Limite absolue par conversation
SUMMARISE_THRESHOLD=0.70         // Déclencher la summarisation à 70%
REFUSE_THRESHOLD=0.95            // Refuser les nouveaux tours à 95%
```

Lorsque `isNearBudget(0.70)` retourne true, l'agent appelle `summarization-agent.ts`
pour compresser l'historique en un seul message assistant avant de continuer.

Lorsque `mustSummarise()` (>95%) retourne true, l'appel API est bloqué et l'appelant
reçoit une réponse `429 Token budget exhausted` avec l'en-tête `Retry-After` indiquant
la date de réinitialisation de la conversation (quotidienne par défaut).

Vérifier l'usage par conversation : `GET /conversations/:id` retourne `token_usage` dans la réponse.

## Streaming vs non-streaming

Utiliser `POST /chat/stream` (SSE) quand :
- La réponse peut dépasser 2 secondes (la plupart des runs d'agents multi-outils)
- Le client est un navigateur ou un CLI capable de consommer du SSE
- On souhaite des événements de progression des appels d'outils avant la réponse finale

Utiliser `POST /chat` (non-streaming) quand :
- L'appelant est une intégration serveur-à-serveur attendant un corps JSON
- La réponse devrait être courte (appel d'outil unique, Q&R simple)
- La réponse complète doit être enregistrée avant d'être retournée au client

Implémentation du streaming : `src/lib/stream-handler.ts` encapsule `client.messages.stream()`,
émet des objets `SSEEvent` typés (`tool_start`, `tool_result`, `text_delta`, `done`),
et les envoie via le helper `streamSSE` de Hono. Le non-streaming utilise `client.messages.create()`
et attend l'objet `Message` complet.

## Lancer la stack en local

```bash
pnpm infra:up          # Démarrer PostgreSQL + Redis dans Docker
pnpm db:migrate        # Appliquer les migrations Drizzle
pnpm dev               # Démarrer le serveur Hono avec tsx watch sur :3000
pnpm test              # Exécuter la suite Vitest
pnpm test:coverage     # Rapport de couverture (cible : 80%)
pnpm eval              # Exécuter le harness d'eval sur les jeux de données golden
pnpm db:studio         # Ouvrir Drizzle Studio sur localhost:4983
```

## Ce qu'il ne faut pas faire

- Ne pas appeler `client.messages.create` directement dans les routes — toujours passer par `AgentRunner`
- Ne pas sauter la validation Zod sur les entrées des outils — `executeTool()` valide avant le dispatch, jamais après
- Ne pas stocker les messages de conversation bruts uniquement dans Redis — toujours vider vers Postgres via `conversation-manager.ts`
- Ne pas modifier les fichiers dans `prompts/versions/` — ce sont des archives immuables ; le harness d'eval en dépend
- Ne pas ajouter d'outils effectuant des opérations d'écriture (écritures en DB, envois d'e-mails) sans paramètre dry_run
- Ne pas utiliser `model: "claude-opus-4-5"` pour les evals — toujours épingler sur `claude-sonnet-4-5` pour maîtriser les coûts
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
        "/path/to/ai-agent-app"
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
    "brave-search": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-brave-search"],
      "env": {
        "BRAVE_API_KEY": "${BRAVE_API_KEY}"
      }
    },
    "linear": {
      "command": "npx",
      "args": ["-y", "@linear/mcp-server"],
      "env": {
        "LINEAR_API_KEY": "${LINEAR_API_KEY}"
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
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$FILE\" == *.ts ]]; then npx prettier --write \"$FILE\" 2>/dev/null || true; npx eslint --fix \"$FILE\" 2>/dev/null || true; fi'"
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
            "command": "bash -c 'CMD=\"$CLAUDE_TOOL_INPUT_COMMAND\"; if echo \"$CMD\" | grep -qE \"pnpm eval|tsx evals\"; then echo \"[HOOK] Eval run starting — ensure ANTHROPIC_API_KEY is set and infra is up.\" >&2; if [ -z \"$ANTHROPIC_API_KEY\" ]; then echo \"[ERROR] ANTHROPIC_API_KEY not set. Evals will fail.\" >&2; exit 1; fi; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'cd \"${CLAUDE_PROJECT_DIR:-$PWD}\" && UNTYPED=$(npx tsc --noEmit 2>&1 | grep -c \"error TS\" || true); if [ \"$UNTYPED\" -gt 0 ]; then echo \"[Reminder] $UNTYPED TypeScript error(s) detected — run pnpm typecheck to review.\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Skills à installer

```bash
npx uitkit add skill backend/typescript/hono-api
npx uitkit add skill backend/typescript/drizzle-orm
npx uitkit add skill backend/typescript/zod-schemas
npx uitkit add skill data-ml/ai/anthropic-tool-use
npx uitkit add skill data-ml/ai/mcp-server-integration
npx uitkit add skill data-ml/ai/prompt-versioning
npx uitkit add skill data-ml/ai/eval-harness
npx uitkit add skill productivity/test-generator
npx uitkit add skill productivity/security-audit
npx uitkit add skill git/pr-description
```

## Voir aussi

- [Building AI Agents Guide](../guides/building-ai-agents.md)
- [Anthropic Tool Use Workflow](../workflows/anthropic-tool-use.md)
