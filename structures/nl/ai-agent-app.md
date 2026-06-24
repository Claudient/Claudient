# AI Agent-applicatie (Claude + MCP) — Projectstructuur

> Voor engineers die productie-AI-agentsystemen bouwen op de Anthropic SDK — met optimalisatie van de volledige cyclus van tooldefinitie tot geëvalueerde, observeerbare en tokenbudget-bewuste deployment.

## Stack

- **Taal / runtime:** TypeScript 5.5+, Node.js 22 LTS
- **AI SDK:** @anthropic-ai/sdk 0.30+ (streaming, tool use, prompt caching)
- **MCP client:** @modelcontextprotocol/sdk 1.x (StdioClientTransport, SSEClientTransport)
- **Schemavalidatie:** Zod 3.23+ (tool-invoerschema's, API-verzoek/antwoord-contracten)
- **HTTP-laag:** Hono 4.x op Node.js-adapter (of Express 4.x — vervangen in src/api/)
- **ORM:** Drizzle ORM 0.31+ met drizzle-kit voor migraties
- **Database:** PostgreSQL 16 (pg driver, verbindingspooling via node-postgres)
- **Conversatiecache:** Redis 7 (ioredis) — berichtgeschiedenis met sliding window, tokenbudgetbeheer
- **Testen:** Vitest 2.x (unit + integratie), @anthropic-ai/sdk mock fixtures voor agentests
- **Containerisatie:** Docker 25 (multi-stage build), docker-compose v2 voor lokale afhankelijkheden
- **CI/CD:** GitHub Actions (typecheck → lint → test → build → push)
- **Linting / opmaak:** ESLint 9 (flat config), Prettier 3
- **Observeerbaarheid:** pino (gestructureerde JSON-logs), OpenTelemetry Node.js SDK, Sentry Node SDK

## Directorystructuur

```
ai-agent-app/
├── .github/
│   └── workflows/
│       ├── ci.yml                              # typecheck, lint, vitest, coverage-gate (80%)
│       ├── cd-staging.yml                      # Push naar staging bij merge naar main
│       └── cd-production.yml                   # Deploy bij semver tag push
├── docker/
│   ├── Dockerfile                              # Multi-stage: deps → build → runtime (non-root)
│   └── docker-compose.yml                      # Lokaal: app + postgres + redis
├── drizzle/
│   ├── 0000_create_conversations.sql           # conversations + messages tabellen
│   ├── 0001_create_tool_calls.sql              # tool_calls audit-tabel met input/output JSON
│   ├── 0002_create_evals.sql                   # eval_runs + eval_results tabellen
│   └── meta/
│       └── _journal.json                       # Drizzle migratiejournal (gecommit)
├── prompts/
│   ├── base-agent.md                           # Basis systeemprompt — persona, mogelijkheden, grenzen
│   ├── tool-use-agent.md                       # Systeempromptvariant voor intensieve tool-use taken
│   ├── summarization-agent.md                  # Gerichte prompt voor conversatiesamenvatting
│   └── versions/
│       ├── base-agent@v1.md                    # Gearchiveerde v1 — nooit verwijderen, gebruikt door evals
│       ├── base-agent@v2.md                    # Gearchiveerde v2
│       └── tool-use-agent@v1.md               # Gearchiveerde tool-use v1
├── evals/
│   ├── golden/
│   │   ├── tool-selection.jsonl                # Golden dataset: invoer → verwachte toolaanroepen
│   │   ├── multi-turn-reasoning.jsonl          # Multi-turn gesprekken met verwachte uitvoer
│   │   └── edge-cases.jsonl                    # Weigeringen, ambigue invoer, budgetuitputting
│   ├── harness/
│   │   ├── runner.ts                           # Hoofd eval-runner: laadt golden set, draait agent
│   │   ├── scorer.ts                           # Exacte-match + LLM-as-judge scoringsfuncties
│   │   ├── report.ts                           # Markdown + JSON rapportgenerator
│   │   └── types.ts                            # EvalCase, EvalResult, ScoreBreakdown types
│   └── results/
│       └── .gitkeep                            # Resultaten gecommit per eval-run (naam op datum+sha)
├── src/
│   ├── agents/
│   │   ├── base-agent.ts                       # AgentRunner klasse: orkestreert toollus + streaming
│   │   ├── tool-use-agent.ts                   # Breidt BaseAgent uit met vooraf geconfigureerde toolset
│   │   ├── summarization-agent.ts              # Single-turn samenvattingsagent (geen tools)
│   │   └── types.ts                            # AgentConfig, AgentRunOptions, AgentResponse types
│   ├── tools/
│   │   ├── index.ts                            # Centraal toolregister: exporteert TOOLS-array voor SDK
│   │   ├── definitions/
│   │   │   ├── search-web.ts                   # Zod-schema + ToolDefinition voor webzoekopdracht
│   │   │   ├── read-file.ts                    # Zod-schema + ToolDefinition voor bestandssysteemlezing
│   │   │   ├── run-query.ts                    # Zod-schema + ToolDefinition voor SQL-query's
│   │   │   ├── send-email.ts                   # Zod-schema + ToolDefinition voor e-mailverzending
│   │   │   └── create-ticket.ts                # Zod-schema + ToolDefinition voor Linear/Jira tickets
│   │   └── implementations/
│   │       ├── search-web.ts                   # Daadwerkelijke implementatie: roept Brave/Tavily search API aan
│   │       ├── read-file.ts                    # Sandboxed bestandssysteemlezing met padtoegangslijst
│   │       ├── run-query.ts                    # Voert alleen-lezen SQL uit tegen pg pool
│   │       ├── send-email.ts                   # Roept Resend/SendGrid aan met gevalideerde ontvangers
│   │       └── create-ticket.ts                # Linear GraphQL-mutatie via @linear/sdk
│   ├── mcp/
│   │   ├── client.ts                           # MCP client factory: StdioClientTransport + SSEClientTransport
│   │   ├── registry.ts                         # MCPServerRegistry: laadt servers vanuit mcp.config.json
│   │   ├── tool-bridge.ts                      # Converteert MCP-toolschema's → Anthropic SDK ToolDefinition
│   │   └── mcp.config.json                     # Serverdefinities: command, args, env-sleutels
│   ├── api/
│   │   ├── index.ts                            # Hono app factory: registreert routes, middleware
│   │   ├── middleware/
│   │   │   ├── auth.ts                         # Bearer token + API-sleutelverificatiemiddleware
│   │   │   ├── ratelimit.ts                    # Redis sliding-window snelheidsbegrenzer
│   │   │   └── request-id.ts                   # X-Request-ID injectie + pino child logger
│   │   └── routes/
│   │       ├── chat.ts                         # POST /chat — niet-streamende agentaanroep
│   │       ├── chat-stream.ts                  # POST /chat/stream — SSE streamingrespons
│   │       ├── conversations.ts                # GET /conversations, GET /conversations/:id/messages
│   │       └── health.ts                       # GET /health (liveness), GET /health/ready (readiness)
│   ├── lib/
│   │   ├── anthropic.ts                        # Singleton Anthropic-client met prompt-cache-headers
│   │   ├── conversation-manager.ts             # Laad/sla conversatiegeschiedenis op vanuit Redis + Postgres
│   │   ├── token-counter.ts                    # Tel tokens via SDK beta, handhaaf budget per beurt
│   │   ├── prompt-loader.ts                    # Laad versioned prompt uit prompts/ op naam + versie
│   │   └── stream-handler.ts                   # Parseer SSE-streamchunks, emit getypeerde events
│   ├── db/
│   │   ├── client.ts                           # Drizzle client singleton over node-postgres pool
│   │   ├── schema.ts                           # Alle Drizzle-tabeldefinities in één bestand
│   │   └── queries/
│   │       ├── conversations.ts                # findById, create, listByUser, deleteById
│   │       ├── messages.ts                     # appendMessage, getHistory, pruneOldMessages
│   │       └── tool-calls.ts                   # logToolCall, getToolCallsForRun
│   ├── types/
│   │   ├── api.ts                              # Zod-schema's: ChatRequest, ChatResponse, SSEEvent
│   │   ├── conversation.ts                     # ConversationRow, MessageRow, MessageRole enum
│   │   └── tool.ts                             # ToolCallRow, ToolResult, ToolExecutionError
│   └── index.ts                                # Ingangspunt: initialiseer MCP-register, start Hono-server
├── tests/
│   ├── unit/
│   │   ├── agents/
│   │   │   ├── base-agent.test.ts              # Toollus-logica, hertry, stopvoorwaarden
│   │   │   └── token-budget.test.ts            # Budgethandhaving, samenvattingstrigger
│   │   ├── tools/
│   │   │   ├── search-web.test.ts              # Schemavalidatie, verwerking van nep-API-respons
│   │   │   └── run-query.test.ts               # SQL-injectiebescherming, alleen-lezen-handhaving
│   │   └── lib/
│   │       ├── conversation-manager.test.ts    # Redis round-trip, geschiedenis snoeien
│   │       └── token-counter.test.ts           # Telnauwkeurigheid, drempellogica voor budget
│   └── integration/
│       ├── chat-route.test.ts                  # POST /chat end-to-end met nep Anthropic SDK
│       ├── stream-route.test.ts                # SSE-stream correctheid, vroegtijdige beëindiging
│       └── agent-e2e.test.ts                   # Volledige agentlus met echte tools (gestubde extern)
├── .claude/
│   └── commands/
│       ├── add-tool.md                         # /add-tool: genereer nieuwe tooldefinitie + implementatie
│       ├── add-mcp-server.md                   # /add-mcp-server: voeg server toe aan mcp.config.json + bridge
│       ├── run-evals.md                        # /run-evals: voer harness uit tegen golden set, toon diff
│       ├── archive-prompt.md                   # /archive-prompt: kopieer huidige prompt naar versions/ met tag
│       └── token-budget-report.md              # /token-budget-report: bevraag Redis voor budgetgebruiksstatistieken
├── drizzle.config.ts                           # Drizzle Kit config: schemapad, uitvoermap, pg-credentials
├── tsconfig.json                               # Stricte modus, padalias (@/* → src/*), ESNext target
├── vitest.config.ts                            # Vitest: include tests/, alias, coverage via v8
├── eslint.config.js                            # ESLint flat config: typescript-eslint recommended + eigen regels
├── .env.example                                # Alle omgevingsvariabelen met beschrijvingen, geen echte waarden
├── .env.test                                   # Test DB/Redis URL's — gecommit, geen geheimen
└── package.json                                # Scripts: dev, build, start, test, lint, db:migrate, eval
```

## Kernbestanden toegelicht

| Pad | Doel |
|---|---|
| `src/lib/anthropic.ts` | Singleton `Anthropic`-client geconfigureerd met `anthropic-beta: prompt-caching-2024-07-31`; omhult `messages.create` en `messages.stream` met automatische `cache_control: { type: "ephemeral" }` injectie op het systeempromptblok; herexporteert types |
| `src/agents/base-agent.ts` | `AgentRunner`-klasse die de agentische toollus beheert: roept de API aan, verzendt toolresultaten, controleert tokenbudget via `TokenCounter`, triggert samenvatting bij 70% en stopt bij 95% |
| `src/tools/index.ts` | Centraal register dat de `TOOLS`-array samenstelt die wordt doorgegeven aan `messages.create`; importeert alle `ToolDefinition`-objecten uit `definitions/`; biedt `executeTool(name, input)` dispatcher naar `implementations/` |
| `src/mcp/tool-bridge.ts` | Converteert een MCP `ListToolsResult` naar Anthropic SDK `Tool[]`-objecten; verwerkt JSON Schema → Zod-coercitie voor runtimevalidatie van MCP-toolinvoer vóór dispatch |
| `src/lib/conversation-manager.ts` | Laadt berichtgeschiedenis uit Redis (hot, laatste 20 beurten) en valt terug op Postgres voor oudere beurten; schrijft nieuwe berichten atomair; handhaaft sliding-window-uitwijking op basis van `conversationId` |
| `src/lib/token-counter.ts` | Gebruikt `client.beta.messages.countTokens` om tokengebruik te meten vóór elke API-aanroep; slaat lopende totalen per gesprek op in Redis; biedt `isNearBudget(threshold)` en `mustSummarise()` hulpfuncties |
| `drizzle/0001_create_tool_calls.sql` | Audittabel die elke toolaanroep vastlegt: `tool_name`, `input` (JSONB), `output` (JSONB), `duration_ms`, `error` — voedt de eval-harness en observeerbaarheidsdashboards |
| `evals/harness/runner.ts` | Laadt `.jsonl` golden-bestanden, voert elk geval uit via de agent met een vast model en promptversie, verzamelt `AgentResponse`, geeft door aan `scorer.ts`; sluit af met niet-nul als het slagingspercentage onder de drempel valt |

## Snelle scaffold

```bash
# Vereisten: Node.js 22+, Docker, pnpm (npm install -g pnpm)
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

# Directorystructuur
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

# Bronbestanden aanmaken
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

# docker-compose voor lokale ontwikkeling
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

# package.json scripts sectie (samenvoegen met pnpm init uitvoer)
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

# .claude/commands stubs
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

echo "Scaffold voltooid. Volgende stap: pnpm install && pnpm infra:up && pnpm db:migrate"
```

## CLAUDE.md sjabloon

```markdown
# AI Agent-applicatie (Claude + MCP)

Productie-AI-agent gebouwd op de Anthropic SDK met tool use, MCP-serverintegratie,
geheugen voor gesprekken, tokenbudgetbeheer en een eval-harness.
Alle agentlogica bevindt zich in src/agents/. Tools leven in src/tools/. MCP-configuratie in src/mcp/.

## Stack

- @anthropic-ai/sdk 0.30+ — messages.create + messages.stream; prompt caching ingeschakeld
- @modelcontextprotocol/sdk 1.x — StdioClientTransport voor lokale servers, SSEClientTransport voor externe servers
- Zod 3.23 — alle tool-invoerschema's gedefinieerd in src/tools/definitions/; gevalideerd vóór dispatch
- Hono 4 op Node.js — HTTP API in src/api/; streaming via SSE op POST /chat/stream
- Drizzle ORM 0.31 + PostgreSQL 16 — schema in src/db/schema.ts; migraties in drizzle/
- ioredis — conversatiecache in src/lib/conversation-manager.ts; tokenbudget in src/lib/token-counter.ts
- Vitest 2 — unit tests met nep Anthropic SDK; integratietests met stub toolimplementaties

## Een nieuw tool toevoegen (exacte stappen)

1. **Definieer het schema** — maak `src/tools/definitions/<tool-name>.ts` aan:
   - Exporteer een `const toolDefinition: Tool` (Anthropic SDK type)
   - Definieer invoerschema als een Zod-object; exporteer als `<ToolName>Input`
   - Gebruik `zodToJsonSchema` uit `zod-to-json-schema` voor het veld `input_schema`

2. **Schrijf de implementatie** — maak `src/tools/implementations/<tool-name>.ts` aan:
   - Exporteer `async function execute(input: <ToolName>Input): Promise<string>`
   - Parseer en valideer invoer met `<ToolName>Input.parse(raw)` bovenaan
   - Retourneer een gewone string (JSON-geserialiseerd bij gestructureerde data)
   - Gooi `ToolExecutionError` uit `src/types/tool.ts` bij fout (niet generieke Error)

3. **Registreer** — in `src/tools/index.ts`:
   - Importeer de definitie en voeg toe aan de `TOOLS`-array
   - Voeg een `case "<tool-name>":` branch toe in de `executeTool()` switch

4. **Test** — maak `tests/unit/tools/<tool-name>.test.ts` aan:
   - Test het happy path, Zod-validatieweigering en ToolExecutionError-doorgifte
   - Mock alle externe API-aanroepen; maak nooit echte netwerkoproepen in unit tests

## Een MCP-server toevoegen

1. Voeg het serveritem toe aan `src/mcp/mcp.config.json`:
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
2. Voeg de vereiste omgevingsvariabele toe aan `.env.example` met een beschrijving.
3. De `MCPServerRegistry` in `src/mcp/registry.ts` laadt automatisch bij opstarten — geen codewijziging nodig.
4. `tool-bridge.ts` converteert de MCP-toollijst automatisch naar Anthropic `Tool[]`-objecten.
5. Verifieer met: `pnpm dev` en vervolgens `curl -X POST /health/ready` — de MCP-server moet verschijnen in de readiness-check uitvoer.

## Promptversiebeheerconventie

- Actieve prompts staan in `prompts/<name>.md` — bewerk deze voor live wijzigingen.
- Vóór elke promptwijziging die eval-resultaten beïnvloedt, voer `/archive-prompt <name>` uit om de huidige versie vast te leggen in `prompts/versions/<name>@<tag>.md`.
- Golden eval-gevallen verwijzen naar een specifieke versie in hun header: `{ "prompt_version": "base-agent@v2" }`.
- De eval-harness (`evals/harness/runner.ts`) laadt het versioned bestand — nooit het live `prompts/`-bestand.
- Promptopmaak in `.md`-bestanden: gewone tekst systeemprompt, geen frontmatter, geen Markdown-koppen. De `prompt-loader.ts` leest het bestand ongewijzigd.

## Gebruik van de eval-harness

```bash
# Voer volledige eval-suite uit tegen huidige prompts en model
pnpm eval

# Voer uit tegen een specifiek golden-bestand
pnpm eval -- --golden evals/golden/tool-selection.jsonl

# Voer uit tegen een specifieke promptversie (leest uit prompts/versions/)
pnpm eval -- --prompt base-agent@v2

# Vergelijk twee runs
diff evals/results/<oud>.json evals/results/<nieuw>.json | jq .

# CI-gate: mislukt als slagingspercentage < 90%
pnpm eval -- --threshold 0.90
```

Golden dataset-formaat (`.jsonl`, één JSON-object per regel):
```json
{ "id": "ts-001", "prompt_version": "base-agent@v2", "input": [{"role": "user", "content": "Search for Q3 revenue data"}], "expected_tools": ["search-web"], "expected_output_contains": ["revenue"] }
```

Scoring: exacte toolnaam-match scoort 1,0; LLM-as-judge op uitvoerinhoud scoort 0,0–1,0.
Eindscore per geval = 0,5 * tool_score + 0,5 * output_score.

## Tokenbudgetbeheer

De `TokenCounter` in `src/lib/token-counter.ts` handhaaft een configureerbaar budget per gesprek.

```typescript
// Standaardbudgetten (overschrijfbaar via env)
MAX_CONVERSATION_TOKENS=100000   // Harde limiet per gesprek
SUMMARISE_THRESHOLD=0.70         // Samenvatting triggeren bij 70%
REFUSE_THRESHOLD=0.95            // Nieuwe beurten weigeren bij 95%
```

Wanneer `isNearBudget(0.70)` true retourneert, roept de agent `summarization-agent.ts` aan
om de geschiedenis samen te vatten tot één assistentbericht vóór voortzetting.

Wanneer `mustSummarise()` (>95%) true retourneert, wordt de API-aanroep geblokkeerd en ontvangt
de aanroeper een `429 Token budget exhausted`-respons met de `Retry-After`-header ingesteld
op het moment waarop het gesprek opnieuw instelt (standaard dagelijks).

Controleer gebruik per gesprek: `GET /conversations/:id` retourneert `token_usage` in de respons.

## Streaming versus niet-streaming

Gebruik `POST /chat/stream` (SSE) wanneer:
- Respons meer dan 2 seconden kan duren (de meeste multi-tool agentrunners)
- Client een browser of CLI is die SSE kan verwerken
- Je toolaanroepvoortgangsgebeurtenissen wilt vóór de uiteindelijke respons

Gebruik `POST /chat` (niet-streaming) wanneer:
- Aanroeper een server-naar-server-integratie is die een JSON-body verwacht
- Respons naar verwachting kort is (enkele toolaanroep, eenvoudige vraag/antwoord)
- Je de volledige respons nodig hebt voor logging vóór terugkeer naar de client

Streamingimplementatie: `src/lib/stream-handler.ts` omhult `client.messages.stream()`,
emitteert getypeerde `SSEEvent`-objecten (`tool_start`, `tool_result`, `text_delta`, `done`),
en flusht via Hono's `streamSSE`-helper. Niet-streaming gebruikt `client.messages.create()`
en wacht op het volledige `Message`-object.

## De stack lokaal uitvoeren

```bash
pnpm infra:up          # Start PostgreSQL + Redis in Docker
pnpm db:migrate        # Pas Drizzle-migraties toe
pnpm dev               # Start Hono-server met tsx watch op :3000
pnpm test              # Voer Vitest-suite uit
pnpm test:coverage     # Coveragerapport (doel: 80%)
pnpm eval              # Voer eval-harness uit tegen golden datasets
pnpm db:studio         # Open Drizzle Studio op localhost:4983
```

## Wat niet te doen

- Roep `client.messages.create` niet rechtstreeks aan in routes — gebruik altijd `AgentRunner`
- Sla Zod-validatie op toolinvoer niet over — `executeTool()` valideert vóór dispatch, nooit erna
- Sla ruwe gesprekberichten niet alleen op in Redis — flush altijd naar Postgres via `conversation-manager.ts`
- Bewerk geen bestanden in `prompts/versions/` — dit zijn onveranderlijke archieven waarvan de eval-harness afhankelijk is
- Voeg geen tools toe die schrijfbewerkingen uitvoeren (DB-schrijfacties, e-mailverzending) zonder een dry_run-parameter
- Gebruik `model: "claude-opus-4-5"` niet voor evals — pin altijd op `claude-sonnet-4-5` om kosten te beheersen
```

## MCP-servers

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

## Te installeren skills

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

## Gerelateerd

- [Handleiding voor het bouwen van AI-agents](../guides/building-ai-agents.md)
- [Anthropic Tool Use Workflow](../workflows/anthropic-tool-use.md)
