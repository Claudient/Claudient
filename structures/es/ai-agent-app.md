# Aplicacion de Agente IA (Claude + MCP) — Estructura de Proyecto

> Para ingenieros que construyen sistemas de agentes IA en produccion sobre el Anthropic SDK — optimizando el ciclo completo desde la definicion de herramientas hasta el despliegue evaluado, observable y consciente del presupuesto de tokens.

## Stack

- **Lenguaje / entorno de ejecucion:** TypeScript 5.5+, Node.js 22 LTS
- **AI SDK:** @anthropic-ai/sdk 0.30+ (streaming, uso de herramientas, prompt caching)
- **Cliente MCP:** @modelcontextprotocol/sdk 1.x (StdioClientTransport, SSEClientTransport)
- **Validacion de esquemas:** Zod 3.23+ (esquemas de entrada de herramientas, contratos de solicitud/respuesta API)
- **Capa HTTP:** Hono 4.x en adaptador Node.js (o Express 4.x — intercambiable en src/api/)
- **ORM:** Drizzle ORM 0.31+ con drizzle-kit para migraciones
- **Base de datos:** PostgreSQL 16 (driver pg, pooling de conexiones via node-postgres)
- **Cache de conversacion:** Redis 7 (ioredis) — historial de mensajes con ventana deslizante, seguimiento del presupuesto de tokens
- **Testing:** Vitest 2.x (unitario + integracion), fixtures mock de @anthropic-ai/sdk para pruebas de agentes
- **Contenerizacion:** Docker 25 (compilacion multi-etapa), docker-compose v2 para dependencias locales
- **CI/CD:** GitHub Actions (typecheck → lint → test → build → push)
- **Linting / formateo:** ESLint 9 (flat config), Prettier 3
- **Observabilidad:** pino (logs JSON estructurados), OpenTelemetry Node.js SDK, Sentry Node SDK

## Arbol de directorios

```
ai-agent-app/
├── .github/
│   └── workflows/
│       ├── ci.yml                              # typecheck, lint, vitest, umbral de cobertura (80%)
│       ├── cd-staging.yml                      # Push a staging al mergear en main
│       └── cd-production.yml                   # Despliegue al hacer push de etiqueta semver
├── docker/
│   ├── Dockerfile                              # Multi-etapa: deps → build → runtime (sin root)
│   └── docker-compose.yml                      # Local: app + postgres + redis
├── drizzle/
│   ├── 0000_create_conversations.sql           # tablas conversations + messages
│   ├── 0001_create_tool_calls.sql              # tabla de auditoria tool_calls con JSON entrada/salida
│   ├── 0002_create_evals.sql                   # tablas eval_runs + eval_results
│   └── meta/
│       └── _journal.json                       # Diario de migraciones Drizzle (commiteado)
├── prompts/
│   ├── base-agent.md                           # Prompt de sistema raiz — persona, capacidades, limites
│   ├── tool-use-agent.md                       # Variante de prompt de sistema para tareas de uso intensivo de herramientas
│   ├── summarization-agent.md                  # Prompt enfocado para resumir conversaciones
│   └── versions/
│       ├── base-agent@v1.md                    # v1 archivada — nunca eliminar, usada por evals
│       ├── base-agent@v2.md                    # v2 archivada
│       └── tool-use-agent@v1.md               # v1 archivada de tool-use
├── evals/
│   ├── golden/
│   │   ├── tool-selection.jsonl                # Dataset dorado: entrada → llamadas de herramienta esperadas
│   │   ├── multi-turn-reasoning.jsonl          # Conversaciones multi-turno con salidas esperadas
│   │   └── edge-cases.jsonl                    # Rechazos, entradas ambiguas, agotamiento de presupuesto
│   ├── harness/
│   │   ├── runner.ts                           # Ejecutor principal de eval: carga conjunto dorado, ejecuta agente
│   │   ├── scorer.ts                           # Funciones de puntuacion: coincidencia exacta + LLM-como-juez
│   │   ├── report.ts                           # Generador de informes en Markdown + JSON
│   │   └── types.ts                            # Tipos EvalCase, EvalResult, ScoreBreakdown
│   └── results/
│       └── .gitkeep                            # Resultados commiteados por ejecucion de eval (nombrados por fecha+sha)
├── src/
│   ├── agents/
│   │   ├── base-agent.ts                       # Clase AgentRunner: orquesta el bucle de herramientas + streaming
│   │   ├── tool-use-agent.ts                   # Extiende BaseAgent con subconjunto de herramientas preconfigurado
│   │   ├── summarization-agent.ts              # Agente de resumen de un solo turno (sin herramientas)
│   │   └── types.ts                            # Tipos AgentConfig, AgentRunOptions, AgentResponse
│   ├── tools/
│   │   ├── index.ts                            # Registro central de herramientas: exporta array TOOLS para el SDK
│   │   ├── definitions/
│   │   │   ├── search-web.ts                   # Esquema Zod + ToolDefinition para busqueda web
│   │   │   ├── read-file.ts                    # Esquema Zod + ToolDefinition para lecturas del sistema de archivos
│   │   │   ├── run-query.ts                    # Esquema Zod + ToolDefinition para consultas SQL
│   │   │   ├── send-email.ts                   # Esquema Zod + ToolDefinition para envio de correos
│   │   │   └── create-ticket.ts                # Esquema Zod + ToolDefinition para tickets de Linear/Jira
│   │   └── implementations/
│   │       ├── search-web.ts                   # Implementacion real: llama a la API de busqueda Brave/Tavily
│   │       ├── read-file.ts                    # Lectura del sistema de archivos en sandbox con lista de rutas permitidas
│   │       ├── run-query.ts                    # Ejecuta SQL de solo lectura contra el pool pg
│   │       ├── send-email.ts                   # Llama a Resend/SendGrid con destinatarios validados
│   │       └── create-ticket.ts                # Mutacion GraphQL de Linear via @linear/sdk
│   ├── mcp/
│   │   ├── client.ts                           # Fabrica de cliente MCP: StdioClientTransport + SSEClientTransport
│   │   ├── registry.ts                         # MCPServerRegistry: carga servidores desde mcp.config.json
│   │   ├── tool-bridge.ts                      # Convierte esquemas de herramientas MCP → ToolDefinition del Anthropic SDK
│   │   └── mcp.config.json                     # Definiciones de servidores: command, args, claves de entorno
│   ├── api/
│   │   ├── index.ts                            # Fabrica de app Hono: registra rutas y middleware
│   │   ├── middleware/
│   │   │   ├── auth.ts                         # Middleware de verificacion de token Bearer + clave API
│   │   │   ├── ratelimit.ts                    # Limitador de tasa con ventana deslizante en Redis
│   │   │   └── request-id.ts                   # Inyeccion de X-Request-ID + logger hijo de pino
│   │   └── routes/
│   │       ├── chat.ts                         # POST /chat — invocacion de agente sin streaming
│   │       ├── chat-stream.ts                  # POST /chat/stream — respuesta SSE en streaming
│   │       ├── conversations.ts                # GET /conversations, GET /conversations/:id/messages
│   │       └── health.ts                       # GET /health (liveness), GET /health/ready (readiness)
│   ├── lib/
│   │   ├── anthropic.ts                        # Cliente Anthropic singleton con cabeceras de cache de prompt
│   │   ├── conversation-manager.ts             # Carga/guarda historial de conversacion desde Redis + Postgres
│   │   ├── token-counter.ts                    # Cuenta tokens via SDK beta, aplica presupuesto por turno
│   │   ├── prompt-loader.ts                    # Carga prompt versionado desde prompts/ por nombre + version
│   │   └── stream-handler.ts                   # Parsea chunks de stream SSE, emite eventos tipados
│   ├── db/
│   │   ├── client.ts                           # Singleton de cliente Drizzle sobre pool node-postgres
│   │   ├── schema.ts                           # Todas las definiciones de tablas Drizzle en un solo archivo
│   │   └── queries/
│   │       ├── conversations.ts                # findById, create, listByUser, deleteById
│   │       ├── messages.ts                     # appendMessage, getHistory, pruneOldMessages
│   │       └── tool-calls.ts                   # logToolCall, getToolCallsForRun
│   ├── types/
│   │   ├── api.ts                              # Esquemas Zod: ChatRequest, ChatResponse, SSEEvent
│   │   ├── conversation.ts                     # ConversationRow, MessageRow, enumeracion MessageRole
│   │   └── tool.ts                             # ToolCallRow, ToolResult, ToolExecutionError
│   └── index.ts                                # Punto de entrada: inicializa registro MCP, arranca servidor Hono
├── tests/
│   ├── unit/
│   │   ├── agents/
│   │   │   ├── base-agent.test.ts              # Logica del bucle de herramientas, reintentos, condiciones de parada
│   │   │   └── token-budget.test.ts            # Aplicacion del presupuesto, disparo de resumen
│   │   ├── tools/
│   │   │   ├── search-web.test.ts              # Validacion de esquemas, manejo de respuesta API simulada
│   │   │   └── run-query.test.ts               # Protecciones contra inyeccion SQL, aplicacion de solo lectura
│   │   └── lib/
│   │       ├── conversation-manager.test.ts    # Round-trip en Redis, poda del historial
│   │       └── token-counter.test.ts           # Precision de conteo, logica de umbral de presupuesto
│   └── integration/
│       ├── chat-route.test.ts                  # POST /chat extremo a extremo con Anthropic SDK simulado
│       ├── stream-route.test.ts                # Correctitud del stream SSE, terminacion anticipada
│       └── agent-e2e.test.ts                   # Bucle completo del agente con herramientas reales (externos stubbeados)
├── .claude/
│   └── commands/
│       ├── add-tool.md                         # /add-tool: andamiaje de nueva definicion + implementacion de herramienta
│       ├── add-mcp-server.md                   # /add-mcp-server: agrega servidor a mcp.config.json + bridge
│       ├── run-evals.md                        # /run-evals: ejecuta harness contra conjunto dorado, muestra diferencias
│       ├── archive-prompt.md                   # /archive-prompt: copia prompt actual a versions/ con etiqueta
│       └── token-budget-report.md              # /token-budget-report: consulta Redis para estadisticas de uso del presupuesto
├── drizzle.config.ts                           # Config de Drizzle Kit: ruta de schema, dir de salida, credenciales pg
├── tsconfig.json                               # Modo estricto, alias de rutas (@/* → src/*), target ESNext
├── vitest.config.ts                            # Vitest: incluye tests/, alias, cobertura via v8
├── eslint.config.js                            # ESLint flat config: typescript-eslint recomendado + personalizado
├── .env.example                                # Todas las variables de entorno con descripciones, sin valores reales
├── .env.test                                   # URLs de BD/Redis para pruebas — commiteado, sin secretos
└── package.json                                # Scripts: dev, build, start, test, lint, db:migrate, eval
```

## Archivos clave explicados

| Ruta | Proposito |
|---|---|
| `src/lib/anthropic.ts` | Cliente `Anthropic` singleton configurado con `anthropic-beta: prompt-caching-2024-07-31`; envuelve `messages.create` y `messages.stream` con inyeccion automatica de `cache_control: { type: "ephemeral" }` en el bloque del prompt de sistema; re-exporta tipos |
| `src/agents/base-agent.ts` | Clase `AgentRunner` que posee el bucle agentico de herramientas: llama a la API, despacha resultados de herramientas, verifica el presupuesto de tokens via `TokenCounter`, dispara el resumen cuando el presupuesto llega al 70%, se detiene al 95% |
| `src/tools/index.ts` | Registro central que ensambla el array `TOOLS` pasado a `messages.create`; importa todos los objetos `ToolDefinition` desde `definitions/`; proporciona el despachador `executeTool(name, input)` hacia `implementations/` |
| `src/mcp/tool-bridge.ts` | Convierte un `ListToolsResult` de MCP en objetos `Tool[]` del Anthropic SDK; maneja la coercion de JSON Schema → Zod para validacion en tiempo de ejecucion de las entradas de herramientas MCP antes del despacho |
| `src/lib/conversation-manager.ts` | Carga el historial de mensajes desde Redis (caliente, ultimos 20 turnos) y recurre a Postgres para turnos mas antiguos; escribe nuevos mensajes atomicamente; aplica desalojo con ventana deslizante con clave en `conversationId` |
| `src/lib/token-counter.ts` | Usa `client.beta.messages.countTokens` para medir el uso de tokens antes de cada llamada API; almacena totales acumulados por conversacion en Redis; expone los helpers `isNearBudget(threshold)` y `mustSummarise()` |
| `drizzle/0001_create_tool_calls.sql` | Tabla de auditoria que captura cada invocacion de herramienta: `tool_name`, `input` (JSONB), `output` (JSONB), `duration_ms`, `error` — alimenta el harness de evals y los paneles de observabilidad |
| `evals/harness/runner.ts` | Carga archivos dorados `.jsonl`, ejecuta cada caso a traves del agente con un modelo y version de prompt fijos, recopila `AgentResponse`, pasa a `scorer.ts`; sale con codigo distinto de cero si la tasa de aciertos cae por debajo del umbral |

## Andamiaje rapido

```bash
# Prerequisitos: Node.js 22+, Docker, pnpm (npm install -g pnpm)
PROJECT=ai-agent-app
mkdir -p $PROJECT && cd $PROJECT

# Inicializar proyecto Node
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

# Estructura de directorios
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

# Crear archivos fuente
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

# docker-compose para desarrollo local
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

# seccion scripts de package.json (fusionar con la salida de pnpm init)
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

# stubs de .claude/commands
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

echo "Andamiaje completo. Siguiente: pnpm install && pnpm infra:up && pnpm db:migrate"
```

## Plantilla CLAUDE.md

```markdown
# Aplicacion de Agente IA (Claude + MCP)

Agente IA de produccion construido sobre el Anthropic SDK con uso de herramientas, integracion de servidor MCP,
memoria de conversacion, gestion del presupuesto de tokens y un harness de evaluacion.
Toda la logica del agente esta en src/agents/. Las herramientas viven en src/tools/. La config MCP en src/mcp/.

## Stack

- @anthropic-ai/sdk 0.30+ — messages.create + messages.stream; prompt caching habilitado
- @modelcontextprotocol/sdk 1.x — StdioClientTransport para servidores locales, SSEClientTransport para remotos
- Zod 3.23 — todos los esquemas de entrada de herramientas definidos en src/tools/definitions/; validados antes del despacho
- Hono 4 en Node.js — API HTTP en src/api/; streaming via SSE en POST /chat/stream
- Drizzle ORM 0.31 + PostgreSQL 16 — schema en src/db/schema.ts; migraciones en drizzle/
- ioredis — cache de conversacion en src/lib/conversation-manager.ts; presupuesto de tokens en src/lib/token-counter.ts
- Vitest 2 — pruebas unitarias simulando el Anthropic SDK; pruebas de integracion con implementaciones de herramientas stub

## Agregar una nueva herramienta (pasos exactos)

1. **Definir el esquema** — crear `src/tools/definitions/<nombre-herramienta>.ts`:
   - Exportar un `const toolDefinition: Tool` (tipo del Anthropic SDK)
   - Definir el esquema de entrada como un objeto Zod; exportar como `<NombreHerramienta>Input`
   - Usar `zodToJsonSchema` de `zod-to-json-schema` para el campo `input_schema`

2. **Escribir la implementacion** — crear `src/tools/implementations/<nombre-herramienta>.ts`:
   - Exportar `async function execute(input: <NombreHerramienta>Input): Promise<string>`
   - Parsear y validar la entrada con `<NombreHerramienta>Input.parse(raw)` al principio
   - Devolver una cadena de texto plano (serializada en JSON si son datos estructurados)
   - Lanzar `ToolExecutionError` de `src/types/tool.ts` en caso de fallo (no un Error generico)

3. **Registrar** — en `src/tools/index.ts`:
   - Importar la definicion y agregarla al array `TOOLS`
   - Agregar una rama `case "<nombre-herramienta>":` en el switch de `executeTool()`

4. **Probar** — crear `tests/unit/tools/<nombre-herramienta>.test.ts`:
   - Probar el caso exitoso, el rechazo de validacion Zod y la propagacion de ToolExecutionError
   - Simular todas las llamadas a API externas; nunca hacer llamadas de red reales en pruebas unitarias

## Agregar un servidor MCP

1. Agregar la entrada del servidor a `src/mcp/mcp.config.json`:
   ```json
   {
     "servers": {
       "<nombre-servidor>": {
         "transport": "stdio",
         "command": "npx",
         "args": ["-y", "@org/mcp-server-name"],
         "env": { "API_KEY": "${MCP_SERVER_API_KEY}" }
       }
     }
   }
   ```
2. Agregar la variable de entorno requerida a `.env.example` con una descripcion.
3. El `MCPServerRegistry` en `src/mcp/registry.ts` se carga automaticamente al iniciar — no se necesitan cambios de codigo.
4. `tool-bridge.ts` convierte la lista de herramientas MCP a objetos `Tool[]` de Anthropic automaticamente.
5. Verificar con: `pnpm dev` luego `curl -X POST /health/ready` — el servidor MCP debe aparecer en la salida de la verificacion de disponibilidad.

## Convencion de versionado de prompts

- Los prompts activos viven en `prompts/<nombre>.md` — editarlos para cambios en vivo.
- Antes de cualquier cambio de prompt que afecte los resultados de eval, ejecutar `/archive-prompt <nombre>` para capturar la version actual en `prompts/versions/<nombre>@<etiqueta>.md`.
- Los casos dorados de eval referencian una version especifica en su cabecera: `{ "prompt_version": "base-agent@v2" }`.
- El harness de eval (`evals/harness/runner.ts`) carga el archivo versionado — nunca el archivo `prompts/` activo.
- Formato del prompt dentro de los archivos `.md`: texto plano del prompt de sistema, sin frontmatter, sin cabeceras markdown. El `prompt-loader.ts` lee el archivo tal como esta.

## Uso del harness de eval

```bash
# Ejecutar suite completa de eval contra prompts y modelo actuales
pnpm eval

# Ejecutar contra un archivo dorado especifico
pnpm eval -- --golden evals/golden/tool-selection.jsonl

# Ejecutar contra una version especifica de prompt (lee desde prompts/versions/)
pnpm eval -- --prompt base-agent@v2

# Comparar dos ejecuciones
diff evals/results/<antiguo>.json evals/results/<nuevo>.json | jq .

# Puerta CI: falla si la tasa de aciertos < 90%
pnpm eval -- --threshold 0.90
```

Formato del dataset dorado (`.jsonl`, un objeto JSON por linea):
```json
{ "id": "ts-001", "prompt_version": "base-agent@v2", "input": [{"role": "user", "content": "Search for Q3 revenue data"}], "expected_tools": ["search-web"], "expected_output_contains": ["revenue"] }
```

Puntuacion: coincidencia exacta de nombre de herramienta puntua 1.0; LLM-como-juez en el contenido de salida puntua 0.0–1.0.
Puntuacion final del caso = 0.5 * puntuacion_herramienta + 0.5 * puntuacion_salida.

## Gestion del presupuesto de tokens

El `TokenCounter` en `src/lib/token-counter.ts` aplica un presupuesto configurable por conversacion.

```typescript
// Presupuestos por defecto (anular via entorno)
MAX_CONVERSATION_TOKENS=100000   // Limite estricto por conversacion
SUMMARISE_THRESHOLD=0.70         // Disparar resumen al 70%
REFUSE_THRESHOLD=0.95            // Rechazar nuevos turnos al 95%
```

Cuando `isNearBudget(0.70)` devuelve true, el agente llama a `summarization-agent.ts`
para comprimir el historial en un unico mensaje de asistente antes de continuar.

Cuando `mustSummarise()` (>95%) devuelve true, la llamada API queda bloqueada y el llamador
recibe una respuesta `429 Token budget exhausted` con la cabecera `Retry-After` establecida
a cuando se reinicia la conversacion (diariamente por defecto).

Verificar el uso por conversacion: `GET /conversations/:id` devuelve `token_usage` en la respuesta.

## Streaming vs sin streaming

Usar `POST /chat/stream` (SSE) cuando:
- La respuesta puede superar 2 segundos (la mayoria de ejecuciones de agente con multiples herramientas)
- El cliente es un navegador o CLI que puede consumir SSE
- Se quieren eventos de progreso de llamadas a herramientas antes de la respuesta final

Usar `POST /chat` (sin streaming) cuando:
- El llamador es una integracion servidor-a-servidor que espera un cuerpo JSON
- Se espera que la respuesta sea corta (una sola llamada a herramienta, Q&A simple)
- Se necesita la respuesta completa para registrarla antes de devolverla al cliente

Implementacion del streaming: `src/lib/stream-handler.ts` envuelve `client.messages.stream()`,
emite objetos `SSEEvent` tipados (`tool_start`, `tool_result`, `text_delta`, `done`),
y hace flush via el helper `streamSSE` de Hono. Sin streaming usa `client.messages.create()`
y espera el objeto `Message` completo.

## Ejecutar el stack localmente

```bash
pnpm infra:up          # Iniciar PostgreSQL + Redis en Docker
pnpm db:migrate        # Aplicar migraciones Drizzle
pnpm dev               # Iniciar servidor Hono con tsx watch en :3000
pnpm test              # Ejecutar suite Vitest
pnpm test:coverage     # Informe de cobertura (objetivo: 80%)
pnpm eval              # Ejecutar harness de eval contra datasets dorados
pnpm db:studio         # Abrir Drizzle Studio en localhost:4983
```

## Que no hacer

- No llamar a `client.messages.create` directamente en las rutas — siempre ir a traves de `AgentRunner`
- No omitir la validacion Zod en las entradas de herramientas — `executeTool()` valida antes del despacho, nunca despues
- No almacenar los mensajes de conversacion en bruto solo en Redis — siempre hacer flush a Postgres via `conversation-manager.ts`
- No editar archivos en `prompts/versions/` — son archivos inmutables; el harness de eval depende de ellos
- No agregar herramientas que realicen operaciones de escritura (escrituras en BD, envios de correo) sin un parametro dry_run
- No usar `model: "claude-opus-4-5"` para evals — siempre fijar a `claude-sonnet-4-5` para controlar costos
```

## Servidores MCP

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

## Hooks recomendados

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

## Skills a instalar

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

## Relacionado

- [Guia para Construir Agentes IA](../guides/building-ai-agents.md)
- [Workflow de Uso de Herramientas Anthropic](../workflows/anthropic-tool-use.md)
