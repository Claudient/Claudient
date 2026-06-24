# AI Agent Application (Claude + MCP) — Projektstruktur

> Für Entwickler, die produktive KI-Agentensysteme auf dem Anthropic SDK aufbauen — optimiert für den vollständigen Zyklus von der Tool-Definition bis zur evaluierten, beobachtbaren und token-budgetbewussten Bereitstellung.

## Stack

- **Sprache / Laufzeit:** TypeScript 5.5+, Node.js 22 LTS
- **AI SDK:** @anthropic-ai/sdk 0.30+ (Streaming, Tool Use, Prompt Caching)
- **MCP-Client:** @modelcontextprotocol/sdk 1.x (StdioClientTransport, SSEClientTransport)
- **Schema-Validierung:** Zod 3.23+ (Tool-Input-Schemas, API-Request/Response-Verträge)
- **HTTP-Schicht:** Hono 4.x auf Node.js-Adapter (oder Express 4.x — austauschbar in src/api/)
- **ORM:** Drizzle ORM 0.31+ mit drizzle-kit für Migrationen
- **Datenbank:** PostgreSQL 16 (pg-Treiber, Connection Pooling via node-postgres)
- **Konversations-Cache:** Redis 7 (ioredis) — Sliding-Window-Nachrichtenverlauf, Token-Budget-Tracking
- **Tests:** Vitest 2.x (Unit + Integration), @anthropic-ai/sdk Mock-Fixtures für Agenten-Tests
- **Containerisierung:** Docker 25 (Multi-Stage-Build), docker-compose v2 für lokale Abhängigkeiten
- **CI/CD:** GitHub Actions (typecheck → lint → test → build → push)
- **Linting / Formatierung:** ESLint 9 (Flat Config), Prettier 3
- **Observability:** pino (strukturierte JSON-Logs), OpenTelemetry Node.js SDK, Sentry Node SDK

## Verzeichnisstruktur

```
ai-agent-app/
├── .github/
│   └── workflows/
│       ├── ci.yml                              # Typecheck, Lint, Vitest, Coverage-Gate (80%)
│       ├── cd-staging.yml                      # Push auf Staging bei Merge in main
│       └── cd-production.yml                   # Deployment bei Semver-Tag-Push
├── docker/
│   ├── Dockerfile                              # Multi-Stage: deps → build → runtime (non-root)
│   └── docker-compose.yml                      # Lokal: app + postgres + redis
├── drizzle/
│   ├── 0000_create_conversations.sql           # Tabellen conversations + messages
│   ├── 0001_create_tool_calls.sql              # Audit-Tabelle tool_calls mit input/output JSON
│   ├── 0002_create_evals.sql                   # Tabellen eval_runs + eval_results
│   └── meta/
│       └── _journal.json                       # Drizzle-Migrations-Journal (eingecheckt)
├── prompts/
│   ├── base-agent.md                           # Haupt-System-Prompt — Persona, Fähigkeiten, Grenzen
│   ├── tool-use-agent.md                       # System-Prompt-Variante für aufgabenintensiven Tool-Einsatz
│   ├── summarization-agent.md                  # Fokussierter Prompt zur Konversationszusammenfassung
│   └── versions/
│       ├── base-agent@v1.md                    # Archiviertes v1 — niemals löschen, wird von Evals genutzt
│       ├── base-agent@v2.md                    # Archiviertes v2
│       └── tool-use-agent@v1.md               # Archiviertes Tool-Use v1
├── evals/
│   ├── golden/
│   │   ├── tool-selection.jsonl                # Goldener Datensatz: Input → erwartete Tool-Aufrufe
│   │   ├── multi-turn-reasoning.jsonl          # Mehrstufige Konversationen mit erwarteten Ausgaben
│   │   └── edge-cases.jsonl                    # Ablehnungen, mehrdeutige Eingaben, Budget-Erschöpfung
│   ├── harness/
│   │   ├── runner.ts                           # Haupt-Eval-Runner: lädt Golden-Set, führt Agenten aus
│   │   ├── scorer.ts                           # Exact-Match + LLM-als-Richter Bewertungsfunktionen
│   │   ├── report.ts                           # Markdown + JSON Report-Generator
│   │   └── types.ts                            # Typen: EvalCase, EvalResult, ScoreBreakdown
│   └── results/
│       └── .gitkeep                            # Ergebnisse werden pro Eval-Lauf eingecheckt (benannt nach Datum+SHA)
├── src/
│   ├── agents/
│   │   ├── base-agent.ts                       # Klasse AgentRunner: orchestriert Tool-Loop + Streaming
│   │   ├── tool-use-agent.ts                   # Erweitert BaseAgent mit vorkonfigurierter Tool-Teilmenge
│   │   ├── summarization-agent.ts              # Einzelschritt-Zusammenfassungs-Agent (ohne Tools)
│   │   └── types.ts                            # Typen: AgentConfig, AgentRunOptions, AgentResponse
│   ├── tools/
│   │   ├── index.ts                            # Zentrales Tool-Register: exportiert TOOLS-Array für das SDK
│   │   ├── definitions/
│   │   │   ├── search-web.ts                   # Zod-Schema + ToolDefinition für Web-Suche
│   │   │   ├── read-file.ts                    # Zod-Schema + ToolDefinition für Dateisystem-Lesezugriffe
│   │   │   ├── run-query.ts                    # Zod-Schema + ToolDefinition für SQL-Abfragen
│   │   │   ├── send-email.ts                   # Zod-Schema + ToolDefinition für E-Mail-Versand
│   │   │   └── create-ticket.ts                # Zod-Schema + ToolDefinition für Linear/Jira-Tickets
│   │   └── implementations/
│   │       ├── search-web.ts                   # Eigentliche Implementierung: ruft Brave/Tavily-Such-API auf
│   │       ├── read-file.ts                    # Sandbox-Dateisystem-Lesezugriff mit Pfad-Allowlist
│   │       ├── run-query.ts                    # Führt schreibgeschützte SQL-Abfragen gegen pg-Pool aus
│   │       ├── send-email.ts                   # Ruft Resend/SendGrid mit validierten Empfängern auf
│   │       └── create-ticket.ts                # Linear-GraphQL-Mutation via @linear/sdk
│   ├── mcp/
│   │   ├── client.ts                           # MCP-Client-Factory: StdioClientTransport + SSEClientTransport
│   │   ├── registry.ts                         # MCPServerRegistry: lädt Server aus mcp.config.json
│   │   ├── tool-bridge.ts                      # Konvertiert MCP-Tool-Schemas → Anthropic SDK ToolDefinition
│   │   └── mcp.config.json                     # Server-Definitionen: command, args, env-Keys
│   ├── api/
│   │   ├── index.ts                            # Hono-App-Factory: registriert Routen und Middleware
│   │   ├── middleware/
│   │   │   ├── auth.ts                         # Bearer-Token + API-Key-Verifikations-Middleware
│   │   │   ├── ratelimit.ts                    # Redis Sliding-Window Rate-Limiter
│   │   │   └── request-id.ts                   # X-Request-ID-Injektion + pino-Child-Logger
│   │   └── routes/
│   │       ├── chat.ts                         # POST /chat — nicht-streamende Agenten-Ausführung
│   │       ├── chat-stream.ts                  # POST /chat/stream — SSE-Streaming-Antwort
│   │       ├── conversations.ts                # GET /conversations, GET /conversations/:id/messages
│   │       └── health.ts                       # GET /health (Liveness), GET /health/ready (Readiness)
│   ├── lib/
│   │   ├── anthropic.ts                        # Singleton Anthropic-Client mit Prompt-Cache-Headern
│   │   ├── conversation-manager.ts             # Konversationsverlauf aus Redis + Postgres laden/speichern
│   │   ├── token-counter.ts                    # Token via SDK-Beta zählen, Budget pro Turn durchsetzen
│   │   ├── prompt-loader.ts                    # Versionierten Prompt aus prompts/ nach Name + Version laden
│   │   └── stream-handler.ts                   # SSE-Stream-Chunks parsen, typisierte Events emittieren
│   ├── db/
│   │   ├── client.ts                           # Drizzle-Client-Singleton über node-postgres-Pool
│   │   ├── schema.ts                           # Alle Drizzle-Tabellendefinitionen in einer Datei
│   │   └── queries/
│   │       ├── conversations.ts                # findById, create, listByUser, deleteById
│   │       ├── messages.ts                     # appendMessage, getHistory, pruneOldMessages
│   │       └── tool-calls.ts                   # logToolCall, getToolCallsForRun
│   ├── types/
│   │   ├── api.ts                              # Zod-Schemas: ChatRequest, ChatResponse, SSEEvent
│   │   ├── conversation.ts                     # ConversationRow, MessageRow, MessageRole-Enum
│   │   └── tool.ts                             # ToolCallRow, ToolResult, ToolExecutionError
│   └── index.ts                                # Einstiegspunkt: MCP-Registry initialisieren, Hono-Server starten
├── tests/
│   ├── unit/
│   │   ├── agents/
│   │   │   ├── base-agent.test.ts              # Tool-Loop-Logik, Retry, Abbruchbedingungen
│   │   │   └── token-budget.test.ts            # Budget-Durchsetzung, Zusammenfassungs-Auslöser
│   │   ├── tools/
│   │   │   ├── search-web.test.ts              # Schema-Validierung, Mock-API-Antwortverarbeitung
│   │   │   └── run-query.test.ts               # SQL-Injection-Schutz, Schreibschutz-Durchsetzung
│   │   └── lib/
│   │       ├── conversation-manager.test.ts    # Redis-Roundtrip, Verlaufs-Pruning
│   │       └── token-counter.test.ts           # Zählgenauigkeit, Budget-Schwellenwert-Logik
│   └── integration/
│       ├── chat-route.test.ts                  # POST /chat End-to-End mit gemocktem Anthropic SDK
│       ├── stream-route.test.ts                # SSE-Stream-Korrektheit, vorzeitige Beendigung
│       └── agent-e2e.test.ts                   # Vollständiger Agenten-Loop mit echten Tools (gestubte Externe)
├── .claude/
│   └── commands/
│       ├── add-tool.md                         # /add-tool: neues Tool-Definition + Implementierung einrichten
│       ├── add-mcp-server.md                   # /add-mcp-server: Server zu mcp.config.json + Bridge hinzufügen
│       ├── run-evals.md                        # /run-evals: Harness gegen Golden-Set ausführen, Diff anzeigen
│       ├── archive-prompt.md                   # /archive-prompt: aktuellen Prompt nach versions/ mit Tag kopieren
│       └── token-budget-report.md              # /token-budget-report: Redis nach Budget-Nutzungsstatistiken abfragen
├── drizzle.config.ts                           # Drizzle-Kit-Konfiguration: Schema-Pfad, Ausgabeverzeichnis, pg-Zugangsdaten
├── tsconfig.json                               # Strict-Modus, Pfad-Alias (@/* → src/*), ESNext-Ziel
├── vitest.config.ts                            # Vitest: tests/ einschließen, Alias, Coverage via v8
├── eslint.config.js                            # ESLint Flat Config: typescript-eslint recommended + eigene Regeln
├── .env.example                                # Alle Umgebungsvariablen mit Beschreibungen, keine echten Werte
├── .env.test                                   # Test-DB/Redis-URLs — eingecheckt, keine Secrets
└── package.json                                # Scripts: dev, build, start, test, lint, db:migrate, eval
```

## Schlüsseldateien erklärt

| Pfad | Zweck |
|---|---|
| `src/lib/anthropic.ts` | Singleton `Anthropic`-Client, konfiguriert mit `anthropic-beta: prompt-caching-2024-07-31`; kapselt `messages.create` und `messages.stream` mit automatischer `cache_control: { type: "ephemeral" }`-Injektion im System-Prompt-Block; re-exportiert Typen |
| `src/agents/base-agent.ts` | Klasse `AgentRunner`, die den agentischen Tool-Loop besitzt: ruft die API auf, verarbeitet Tool-Ergebnisse, prüft das Token-Budget via `TokenCounter`, löst Zusammenfassung bei 70% aus, stoppt bei 95% |
| `src/tools/index.ts` | Zentrales Register, das das `TOOLS`-Array für `messages.create` zusammenstellt; importiert alle `ToolDefinition`-Objekte aus `definitions/`; stellt `executeTool(name, input)`-Dispatcher nach `implementations/` bereit |
| `src/mcp/tool-bridge.ts` | Konvertiert ein MCP-`ListToolsResult` in Anthropic SDK `Tool[]`-Objekte; behandelt JSON-Schema → Zod-Koersion für Laufzeitvalidierung von MCP-Tool-Eingaben vor dem Dispatch |
| `src/lib/conversation-manager.ts` | Lädt den Nachrichtenverlauf aus Redis (heiß, letzte 20 Runden) und fällt auf Postgres für ältere Runden zurück; schreibt neue Nachrichten atomar; erzwingt Sliding-Window-Eviction auf Basis der `conversationId` |
| `src/lib/token-counter.ts` | Nutzt `client.beta.messages.countTokens`, um den Token-Verbrauch vor jedem API-Aufruf zu messen; speichert laufende Gesamtzahlen pro Konversation in Redis; stellt `isNearBudget(threshold)` und `mustSummarise()`-Hilfsfunktionen bereit |
| `drizzle/0001_create_tool_calls.sql` | Audit-Tabelle, die jeden Tool-Aufruf erfasst: `tool_name`, `input` (JSONB), `output` (JSONB), `duration_ms`, `error` — versorgt den Eval-Harness und Observability-Dashboards |
| `evals/harness/runner.ts` | Lädt `.jsonl`-Golden-Dateien, führt jeden Fall durch den Agenten mit festem Modell und Prompt-Version aus, sammelt `AgentResponse`, übergibt an `scorer.ts`; gibt einen Fehlercode zurück, wenn die Bestehensquote unter den Schwellenwert fällt |

## Quick Scaffold

```bash
# Voraussetzungen: Node.js 22+, Docker, pnpm (npm install -g pnpm)
PROJECT=ai-agent-app
mkdir -p $PROJECT && cd $PROJECT

# Node-Projekt initialisieren
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

# Verzeichnisstruktur
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

# Quelldateien anlegen
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

# docker-compose für lokale Entwicklung
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

# Scripts-Abschnitt von package.json (in pnpm-init-Ausgabe einmergen)
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

# .claude/commands Stubs
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

echo "Scaffold abgeschlossen. Weiter mit: pnpm install && pnpm infra:up && pnpm db:migrate"
```

## CLAUDE.md-Vorlage

```markdown
# AI Agent Application (Claude + MCP)

Produktiver KI-Agent auf Basis des Anthropic SDK mit Tool Use, MCP-Server-Integration,
Konversationsgedächtnis, Token-Budget-Verwaltung und einem Eval-Harness.
Die gesamte Agenten-Logik liegt in src/agents/. Tools in src/tools/. MCP-Konfiguration in src/mcp/.

## Stack

- @anthropic-ai/sdk 0.30+ — messages.create + messages.stream; Prompt Caching aktiviert
- @modelcontextprotocol/sdk 1.x — StdioClientTransport für lokale Server, SSEClientTransport für Remote
- Zod 3.23 — alle Tool-Input-Schemas in src/tools/definitions/ definiert; vor dem Dispatch validiert
- Hono 4 auf Node.js — HTTP-API in src/api/; Streaming via SSE auf POST /chat/stream
- Drizzle ORM 0.31 + PostgreSQL 16 — Schema in src/db/schema.ts; Migrationen in drizzle/
- ioredis — Konversations-Cache in src/lib/conversation-manager.ts; Token-Budget in src/lib/token-counter.ts
- Vitest 2 — Unit-Tests mit gemocktem Anthropic SDK; Integrationstests mit gestubten Tool-Implementierungen

## Neues Tool hinzufügen (genaue Schritte)

1. **Schema definieren** — `src/tools/definitions/<tool-name>.ts` erstellen:
   - Ein `const toolDefinition: Tool` (Anthropic-SDK-Typ) exportieren
   - Input-Schema als Zod-Objekt definieren; als `<ToolName>Input` exportieren
   - `zodToJsonSchema` aus `zod-to-json-schema` für das Feld `input_schema` verwenden

2. **Implementierung schreiben** — `src/tools/implementations/<tool-name>.ts` erstellen:
   - `async function execute(input: <ToolName>Input): Promise<string>` exportieren
   - Eingabe am Anfang mit `<ToolName>Input.parse(raw)` parsen und validieren
   - Einen einfachen String zurückgeben (JSON-serialisiert bei strukturierten Daten)
   - Bei Fehler `ToolExecutionError` aus `src/types/tool.ts` werfen (kein generischer Error)

3. **Registrieren** — in `src/tools/index.ts`:
   - Definition importieren und zum `TOOLS`-Array hinzufügen
   - Einen `case "<tool-name>":` Branch in `executeTool()` Switch ergänzen

4. **Testen** — `tests/unit/tools/<tool-name>.test.ts` erstellen:
   - Happy-Path, Zod-Validierungsablehnung und ToolExecutionError-Weitergabe testen
   - Alle externen API-Aufrufe mocken; in Unit-Tests niemals echte Netzwerkaufrufe machen

## MCP-Server hinzufügen

1. Server-Eintrag in `src/mcp/mcp.config.json` ergänzen:
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
2. Die erforderliche Umgebungsvariable mit Beschreibung in `.env.example` eintragen.
3. Die `MCPServerRegistry` in `src/mcp/registry.ts` lädt beim Start automatisch — keine Code-Änderung nötig.
4. `tool-bridge.ts` konvertiert die MCP-Tool-Liste automatisch in Anthropic `Tool[]`-Objekte.
5. Prüfen mit: `pnpm dev`, dann `curl -X POST /health/ready` — der MCP-Server muss in der Readiness-Check-Ausgabe erscheinen.

## Prompt-Versionierungskonvention

- Aktive Prompts liegen unter `prompts/<name>.md` — diese für Live-Änderungen bearbeiten.
- Vor jeder Prompt-Änderung, die Eval-Ergebnisse beeinflusst, `/archive-prompt <name>` ausführen, um die aktuelle Version nach `prompts/versions/<name>@<tag>.md` zu sichern.
- Golden-Eval-Fälle referenzieren eine bestimmte Version in ihrem Header: `{ "prompt_version": "base-agent@v2" }`.
- Der Eval-Harness (`evals/harness/runner.ts`) lädt die versionierte Datei — niemals die Live-Datei aus `prompts/`.
- Prompt-Format in `.md`-Dateien: reiner Text als System-Prompt, kein Frontmatter, keine Markdown-Überschriften. `prompt-loader.ts` liest die Datei unverändert ein.

## Eval-Harness verwenden

```bash
# Vollständige Eval-Suite gegen aktuelle Prompts und Modell ausführen
pnpm eval

# Gegen eine bestimmte Golden-Datei ausführen
pnpm eval -- --golden evals/golden/tool-selection.jsonl

# Gegen eine bestimmte Prompt-Version ausführen (liest aus prompts/versions/)
pnpm eval -- --prompt base-agent@v2

# Zwei Läufe vergleichen
diff evals/results/<old>.json evals/results/<new>.json | jq .

# CI-Gate: schlägt fehl, wenn Bestehensquote < 90%
pnpm eval -- --threshold 0.90
```

Golden-Dataset-Format (`.jsonl`, ein JSON-Objekt pro Zeile):
```json
{ "id": "ts-001", "prompt_version": "base-agent@v2", "input": [{"role": "user", "content": "Search for Q3 revenue data"}], "expected_tools": ["search-web"], "expected_output_contains": ["revenue"] }
```

Bewertung: exakter Tool-Name-Treffer ergibt 1,0; LLM-als-Richter für Ausgabeinhalt ergibt 0,0–1,0.
Gesamtfall-Bewertung = 0,5 * tool_score + 0,5 * output_score.

## Token-Budget-Verwaltung

Der `TokenCounter` in `src/lib/token-counter.ts` setzt ein konfigurierbares Budget pro Konversation durch.

```typescript
// Standardbudgets (über Umgebungsvariablen überschreibbar)
MAX_CONVERSATION_TOKENS=100000   // Hartes Limit pro Konversation
SUMMARISE_THRESHOLD=0.70         // Zusammenfassung bei 70% auslösen
REFUSE_THRESHOLD=0.95            // Neue Turns bei 95% ablehnen
```

Wenn `isNearBudget(0.70)` true zurückgibt, ruft der Agent `summarization-agent.ts` auf,
um den Verlauf in eine einzelne Assistenten-Nachricht zu komprimieren, bevor er fortfährt.

Wenn `mustSummarise()` (>95%) true zurückgibt, wird der API-Aufruf blockiert und der Aufrufer
erhält eine `429 Token budget exhausted`-Antwort mit dem `Retry-After`-Header, der angibt,
wann die Konversation zurückgesetzt wird (standardmäßig täglich).

Verbrauch pro Konversation prüfen: `GET /conversations/:id` gibt `token_usage` in der Antwort zurück.

## Streaming vs. Nicht-Streaming

`POST /chat/stream` (SSE) verwenden, wenn:
- Die Antwort voraussichtlich länger als 2 Sekunden dauert (die meisten Multi-Tool-Agenten-Läufe)
- Der Client ein Browser oder eine CLI ist, der/die SSE verarbeiten kann
- Tool-Call-Fortschrittsereignisse vor der finalen Antwort gewünscht sind

`POST /chat` (Nicht-Streaming) verwenden, wenn:
- Der Aufrufer eine Server-zu-Server-Integration ist, die einen JSON-Body erwartet
- Die Antwort voraussichtlich kurz ist (einzelner Tool-Aufruf, einfaches Q&A)
- Die vollständige Antwort für das Logging benötigt wird, bevor sie an den Client zurückgegeben wird

Streaming-Implementierung: `src/lib/stream-handler.ts` kapselt `client.messages.stream()`,
emittiert typisierte `SSEEvent`-Objekte (`tool_start`, `tool_result`, `text_delta`, `done`)
und sendet sie via Honos `streamSSE`-Hilfsfunktion. Nicht-Streaming nutzt `client.messages.create()`
und wartet auf das vollständige `Message`-Objekt.

## Stack lokal ausführen

```bash
pnpm infra:up          # PostgreSQL + Redis in Docker starten
pnpm db:migrate        # Drizzle-Migrationen anwenden
pnpm dev               # Hono-Server mit tsx watch auf :3000 starten
pnpm test              # Vitest-Suite ausführen
pnpm test:coverage     # Coverage-Report (Ziel: 80%)
pnpm eval              # Eval-Harness gegen Golden-Datasets ausführen
pnpm db:studio         # Drizzle Studio auf localhost:4983 öffnen
```

## Was nicht zu tun ist

- `client.messages.create` nicht direkt in Routen aufrufen — immer über `AgentRunner` gehen
- Zod-Validierung bei Tool-Eingaben nicht überspringen — `executeTool()` validiert vor dem Dispatch, niemals danach
- Konversations-Nachrichten nicht ausschließlich in Redis speichern — immer via `conversation-manager.ts` nach Postgres flushen
- Dateien in `prompts/versions/` nicht bearbeiten — sie sind unveränderliche Archive; der Eval-Harness hängt davon ab
- Keine Tools hinzufügen, die Schreiboperationen (DB-Schreibzugriffe, E-Mail-Versand) ohne `dry_run`-Parameter durchführen
- Für Evals nicht `model: "claude-opus-4-5"` verwenden — immer auf `claude-sonnet-4-5` pinnen, um Kosten zu kontrollieren
```

## MCP-Server

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

## Empfohlene Hooks

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

## Zu installierende Skills

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

## Verwandte Ressourcen

- [Building AI Agents Guide](../guides/building-ai-agents.md)
- [Anthropic Tool Use Workflow](../workflows/anthropic-tool-use.md)
