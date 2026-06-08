# CLAUDE.md — Multi-Agent Claude App with MCP (Annotated Example)
> Orchestrated Claude agent system with MCP tool servers, shared memory, and inter-agent delegation — shows how to coordinate multiple AI actors without letting them drift or conflict.

<!-- ANNOTATION: The opening paragraph does two things at once: it names the execution model (orchestrator + specialists) and it pre-empts the most common mistake — treating this like a single-agent app. Claude needs to know it is working inside a system, not as the sole actor. -->
This is a multi-agent application built on the Anthropic SDK. A root orchestrator agent decomposes work and delegates to specialist subagents. Subagents communicate via structured handoff schemas, not free-form text. All agents share a common MCP toolset. Python 3.12. Dependency management via uv.

## Stack

<!-- ANNOTATION: Listing MCP servers by name here is critical. Without this, Claude will not know which tools are available at runtime and may hallucinate tool names or try to use unavailable capabilities. Each MCP entry should name the server and its transport. -->
- `anthropic` SDK 0.28+ (not LangChain — we use the raw SDK with tool use)
- MCP servers in use:
  - `filesystem` (stdio) — read/write workspace files
  - `postgres` (stdio) — direct DB queries, read-only for subagents
  - `brave-search` (http) — web search for research agents
  - `github` (http) — PR/issue access for the dev-ops agent
- `redis-py` 5.x — agent memory and job queue
- PostgreSQL 16 — persistent state, task ledger
- FastAPI 0.115 — thin HTTP layer exposing agent triggers
- `pydantic` v2 — all inter-agent schemas
- `pytest` + `pytest-asyncio` — test harness

## Project Structure

```
agents/
  orchestrator.py      # Root agent — decomposes tasks, delegates, resolves conflicts
  research.py          # Searches web, retrieves docs, summarizes findings
  coder.py             # Writes and edits code, runs tests via tool use
  reviewer.py          # Reviews diffs, checks against rules, returns structured verdict
  ops.py               # GitHub, CI, deployment actions
schemas/
  handoff.py           # Pydantic models for inter-agent message passing
  tool_results.py      # Typed wrappers around MCP tool outputs
memory/
  short_term.py        # Redis-backed working context per task
  long_term.py         # Postgres-backed persistent facts and decisions
mcp/
  config.json          # MCP server definitions loaded at startup
prompts/
  system/              # One system prompt file per agent
  tools/               # Tool description overrides
tasks/
  ledger.py            # Task state machine: pending → running → done | failed
tests/
  unit/
  integration/         # Tests that spin up real MCP servers against a test DB
```

## Agent Orchestration Rules

<!-- ANNOTATION: This is the most important section in a multi-agent CLAUDE.md. Without explicit rules about who calls whom and what the contract looks like, agents accumulate informal patterns that break under load. The orchestrator-first rule prevents agents from bypassing coordination. -->
- The orchestrator is the only agent that spawns subagents — subagents do not call each other directly
- Every delegation is a structured `HandoffMessage` (see `schemas/handoff.py`) — no raw string passing between agents
- Subagents return a `HandoffResult` with `status`, `output`, and `confidence` — the orchestrator decides what to do with low-confidence results
- If a subagent cannot complete its task, it returns `status="blocked"` with a reason — it does not retry independently
- The orchestrator tracks all active subagent calls in the task ledger — no fire-and-forget delegation

## MCP Tool Use Patterns

<!-- ANNOTATION: MCP tool availability varies by agent role. Defining per-agent tool access here prevents the orchestrator from accidentally mutating the filesystem directly, and prevents subagents from making unreviewed external calls. This is a security and correctness boundary, not just a convention. -->
- The orchestrator has access to: `postgres` (read-only), `brave-search`
- The `coder` agent has access to: `filesystem` (read/write), `postgres` (read-only)
- The `ops` agent has access to: `github`, `filesystem` (read-only)
- The `reviewer` agent has access to: `filesystem` (read-only), `postgres` (read-only)
- No subagent has write access to `postgres` — all DB writes go through `tasks/ledger.py`
- Tool calls must be retried with exponential backoff on `ToolUseError` — do not surface tool errors to the user immediately

## Memory Architecture

<!-- ANNOTATION: The distinction between short-term and long-term memory is architectural, not stylistic. Without this section, Claude will either store everything in one place (causing context bloat) or store nothing (causing agents to repeat work). The Redis/Postgres split reflects TTL and durability requirements. -->
- Short-term memory (Redis, TTL 1 hour): working context for the current task — scratch notes, intermediate results, partial outputs
- Long-term memory (Postgres, `memory.facts` table): decisions, user preferences, resolved ambiguities — written only when a task closes successfully
- Agents read short-term memory at task start and write to it freely during execution
- Only the orchestrator writes to long-term memory, and only on explicit task completion
- Do not store raw LLM responses in memory — store structured facts extracted from them

## System Prompt Management

<!-- ANNOTATION: Keeping system prompts in files rather than code strings is a deliberate choice that makes diffs reviewable and prompts editable without touching Python. This also enables per-environment overrides. Mention it so Claude never inlines a system prompt in Python source. -->
- System prompts live in `prompts/system/<agent-name>.md` — never inline them in Python
- Tool descriptions live in `prompts/tools/<tool-name>.md` — loaded and injected at agent init
- The orchestrator system prompt includes the full list of available subagents and their capabilities
- Do not modify system prompts to patch a bug — fix the underlying logic or schema instead

## Anthropic SDK Patterns

<!-- ANNOTATION: Using the raw Anthropic SDK instead of LangChain means Claude needs explicit guidance on the correct tool use loop. Without this, it may write the tool loop incorrectly (e.g., not re-submitting tool results) or use a LangChain pattern that does not apply here. -->
- Use `client.messages.create()` with `tools=` for all agent calls — not LangChain, not instructor
- The tool use loop: send message → check `stop_reason == "tool_use"` → execute tools → submit `tool_result` blocks → repeat
- Use `stream=True` with `client.messages.stream()` only for user-facing outputs — internal agent calls use non-streaming
- Model assignments: orchestrator uses `claude-opus-4-5`, subagents use `claude-sonnet-4-5`, fast classifiers use `claude-haiku-4-5`
- Always set `max_tokens` explicitly per agent — defaults are too high for subagents and too low for the orchestrator

## Inter-Agent Schema Contracts

<!-- ANNOTATION: Pydantic schemas as contracts between agents is the pattern that prevents the system from degrading into a chain of string-parsing hacks. Calling this out explicitly — and forbidding free-form text handoffs — sets a firm expectation for any new agent work. -->
- All messages between agents use Pydantic v2 models from `schemas/handoff.py`
- `HandoffMessage` fields: `task_id`, `agent_target`, `instructions`, `context`, `tool_grants`
- `HandoffResult` fields: `task_id`, `status`, `output`, `confidence`, `tool_calls_made`
- Do not add fields to these schemas without updating all agents that consume them
- Validate all incoming `HandoffMessage` objects at agent entry — reject malformed inputs before processing

## Task Ledger Rules

- Every task has a unique `task_id` (UUID) assigned by the orchestrator at creation
- State machine: `pending` → `running` → `done` | `failed` | `blocked`
- Subagents update their own task record to `done` or `failed` — the orchestrator reads this, it does not poll
- Failed tasks include a `failure_reason` — do not silently swallow errors
- The ledger is the source of truth for task status — do not infer state from Redis keys

## What Not To Do

<!-- ANNOTATION: The prohibitions here target the failure modes specific to multi-agent systems: agents talking to each other directly, bypassing the schema contract, writing to shared state without coordination, and using high-cost models for cheap tasks. Each item maps to a real class of bugs in orchestrated LLM apps. -->
- Do not let subagents call each other — all delegation goes through the orchestrator
- Do not pass raw LLM output text as a `HandoffMessage` — always extract a structured result first
- Do not give all agents access to all MCP tools — tool grants are per-agent and per-task
- Do not use `claude-opus-4-5` for subagents that do simple extraction or classification — use Haiku
- Do not write to long-term memory mid-task — only commit facts when the task closes successfully
- Do not retry a failed subagent call more than twice — escalate to the orchestrator after two failures
- Do not store API keys in `mcp/config.json` — use environment variables and reference them with `${ENV_VAR}` syntax

## Environment Variables

```
ANTHROPIC_API_KEY        # Required by all agents
DATABASE_URL             # Postgres connection string (asyncpg)
REDIS_URL                # Short-term memory and job queue
GITHUB_TOKEN             # Used by ops agent via MCP github server
BRAVE_API_KEY            # Used by research agent via MCP brave-search server
ENVIRONMENT              # development | staging | production
MCP_CONFIG_PATH          # Path to mcp/config.json (default: ./mcp/config.json)
```

## Testing Multi-Agent Flows

<!-- ANNOTATION: Integration testing multi-agent systems is non-obvious. This section prevents the two common bad patterns: mocking so aggressively that tests miss real coordination bugs, and running live against production MCP servers in CI. The middle path — real MCP servers, stubbed LLM — is the right default. -->
- Unit tests mock MCP tool calls and LLM responses — test schema validation and routing logic, not model behavior
- Integration tests spin up real MCP stdio servers (filesystem, postgres test DB) with `subprocess` — do not mock at the MCP layer in integration tests
- Use `FakeAnthropic` (test double in `tests/fakes.py`) to stub LLM responses — never hit the real API in CI
- Test the full orchestrator → subagent → ledger → result cycle in at least one integration test per agent
- Run integration tests against a throwaway Postgres database seeded with fixtures — never the dev or staging DB

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
