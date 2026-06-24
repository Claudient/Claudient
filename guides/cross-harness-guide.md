# Using UitKit Across AI Coding Tools

UitKit ships 262+ skills, 93+ agents, rules, hooks, and prompts. Most of this content was authored against Claude Code — but the majority of it is plain Markdown structured to be injected into any AI coding tool's context pipeline. This guide draws the line precisely between what is genuinely portable and what is hardwired to Claude Code's harness, then gives you concrete adaptation steps for Cursor, Windsurf, GitHub Copilot, OpenAI Codex CLI, and Gemini Code Assist.

Audience: senior developers who already know how to configure their tools and don't need hand-holding on basic concepts.

---

## The Portability Model

Before the per-tool breakdowns, you need the mental model. UitKit content falls into three portability classes:

**Class 1 — Fully portable.** Structured Markdown that shapes model behavior through in-context instruction. Works in any tool that accepts a system prompt or custom instructions file. No adaptation required beyond placement.

**Class 2 — Structurally portable, needs minor surgery.** Content that is valid Markdown and contains sound instructions, but references Claude Code-specific invocation syntax or tool names. Strip or rewrite those references and the rest transfers cleanly.

**Class 3 — Claude Code-only.** Features that depend on Claude Code's process model, event system, or plugin registry. Cannot be transplanted — these are harness features, not prompt features.

The table below maps UitKit's directory structure to these classes:

| Directory | Portability class | Portable as |
|---|---|---|
| `skills/` | Class 1–2 | Paste into tool's rules/instructions file |
| `rules/` | Class 1 | Paste directly into any rules file |
| `agents/` | Class 1–2 (partial) | System prompt for a dedicated AI chat session |
| `prompts/` | Class 1 | Use directly as a prompt or system message |
| `guides/` | Class 1 | Reference documentation — no adaptation needed |
| `workflows/` | Class 1–2 | Process documentation, paste as context |
| `hooks/` | Class 3 | Non-portable — Claude Code process hooks only |
| `.claude-plugin/` | Class 3 | Non-portable — Claude Code plugin registry only |
| `mcp/` | Class 3 | Non-portable — MCP protocol is Claude Code/Claude Desktop only |

---

## What Is Harness-Agnostic

### Skills as prompts

A skill file has four sections: `When to activate`, `When NOT to use`, `Instructions`, `Example`. None of these sections require Claude Code to be meaningful. The model reads the file as plain text and follows the `Instructions` regardless of which editor spawned the inference call.

The `Instructions` section is written in directive language — "always define a Pydantic model for request bodies", "never accept raw dicts" — which is exactly what system prompts do. The `When to activate` and `When NOT to use` sections act as self-scoping constraints that prevent the model from applying a skill in the wrong context. This is more useful in tools that load all rules simultaneously (Windsurf, Copilot) than in Claude Code, where you invoke skills on demand.

**What requires surgery:** Some skills reference slash command invocation (`/skill-name`), MCP tools (`mcp__tool_name`), or inline shell injection (`!git branch --show-current`). These are Class 2 — strip the references and the skill is clean.

**Example:** `skills/backend/python/fastapi.md` contains zero harness-specific syntax. Paste it verbatim into `.cursor/rules/fastapi.mdc` and it works. `skills/productivity/cursor-tandem.md` references Claude Code directly in its instructions — this one should stay in Claude Code.

### Agents as system prompts

UitKit agent files are structured persona definitions: `Purpose`, `Model guidance`, `Tools`, `When to delegate here`, `Example use case`. In Claude Code, these are passed to a `Task` tool invocation as the agent's operating brief. Outside Claude Code, the same content works as a dedicated system prompt for a focused AI session.

The key insight: the `Tools` section is the only part that references harness-specific mechanics. An agent like `agents/core/security-reviewer.md` specifies `Read`, `Bash`, `WebFetch` — Claude Code native tools. In Cursor or Copilot, those tool references mean nothing mechanically, but the constraints they express ("no Edit, Write, or destructive operations") remain valid instructions the model will follow.

**Practical use:** Open a new Cursor Composer window or a Gemini chat thread. Paste the agent's `Purpose` + `Instructions from Prompt template` as the system prompt. You now have a session-scoped specialist without any Claude Code dependency.

### Rules files

Everything in `rules/` is unconditionally portable. Rules are plain Markdown design guidelines (`rules/common/security.md`, `rules/common/testing.md`, etc.). They contain no harness mechanics — just written conventions the model follows. These are what you'd write by hand in any tool's instructions file.

Use them directly:
- Cursor: `.cursor/rules/security.mdc`
- Copilot: concatenate into `.github/copilot-instructions.md`
- Windsurf: paste into `.windsurfrules`
- Codex: include in `AGENTS.md`

### CLAUDE.md as a universal project context file

The CLAUDE.md pattern — a Markdown file at the project root or directory level that specifies conventions, architecture decisions, and behavioral constraints — is supported by every major AI coding tool under different names. The content transfers with a file rename:

| Tool | Equivalent file |
|---|---|
| Claude Code | `CLAUDE.md` |
| OpenAI Codex CLI | `AGENTS.md` |
| Cursor | `.cursor/rules/project-context.mdc` (with `alwaysApply: true`) |
| Windsurf | `.windsurfrules` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Gemini Code Assist | `.gemini/context.md` (or project-level system prompt) |
| Zed | `.zed/settings.json` → `"system_prompt"` |

The UitKit `CLAUDE.md` in this repo (`/CLAUDE.md`) is a real example of this pattern. Strip the Claude Code-specific sections (plugin registry references, hook configuration notes) and what remains is a project context file valid for any tool.

---

## What Is Claude Code-Specific

### The plugin marketplace and `.claude-plugin/`

The `.claude-plugin/marketplace.json` + `plugin.json` registry is Claude Code-only. It is the mechanism by which `claude install uitkit` resolves packages, copies files to `.claude/skills/`, and registers slash commands. No other tool has a comparable install protocol.

**There is no equivalent in Cursor, Windsurf, Copilot, or Codex.** You cannot `cursor install uitkit` or `copilot install uitkit`. File placement in those tools is manual — copy the Markdown files you want into the appropriate location.

### Hooks (`.claude/settings.json` events)

Hooks (`PreToolUse`, `PostToolUse`, `SessionStart`, `Stop`, `Notification`, `PreCompact`) are Claude Code process events. They execute shell scripts or commands when Claude Code performs specific actions. The entire `hooks/` directory is Class 3.

**Specific hooks and their alternatives:**

`hooks/pre-tool-use/secret-scanner.sh` — runs before every Bash tool call to scan for secrets in the command string. In Cursor, the equivalent is a pre-commit hook (`.githooks/pre-commit`) — different trigger, same goal, Git-managed not AI-managed.

`hooks/pre-tool-use/block-dangerous.sh` — blocks shell commands matching a denylist. No equivalent in Cursor/Copilot/Codex — those tools don't expose tool-level interception.

`hooks/post-tool-use/bug-logger.sh` — logs tool calls to a file after each execution. In other tools, add logging to your existing observability stack; the AI session has no event API to hook into.

`hooks/lifecycle/session-start.sh` — injects project context at session initialization. The nearest equivalent is a persistent system prompt (Cursor's `alwaysApply: true` rule, or Copilot's `copilot-instructions.md`).

`hooks/notification/` — Claude Code desktop notification hooks. Not applicable in web-based tools; irrelevant for Copilot which manages its own notification surface.

### Slash command auto-invocation (`/skill-name`)

In Claude Code, placing a file at `.claude/skills/fastapi.md` creates a `/fastapi` slash command. Typing `/fastapi` loads the skill into context immediately. This on-demand invocation is Claude Code-specific — other tools do not have a slash command registry backed by local Markdown files.

The functional replacement in other tools is passive loading: the skill is always present in the system prompt (either via glob scoping in Cursor or static inclusion in the rules file). This is less precise but workable for frequently-used skills.

**Gotcha:** In Claude Code, you can have 50 skills installed and invoke only the one you need at a given moment, keeping token usage tight. In Cursor/Windsurf/Copilot, all loaded rules contribute to the system prompt on every request. This difference affects how many skills you should install simultaneously in non-Claude-Code tools.

### The `SKILL.md` frontmatter auto-invocation

Skills with a YAML frontmatter block containing `description` and trigger `globs` can be auto-invoked by Claude Code's harness when the pattern matches:

```yaml
---
name: fastapi
description: "FastAPI app structure, async routes, Pydantic models..."
globs: ["**/*.py"]
---
```

This frontmatter is read by Claude Code's skill resolver. Cursor uses a nearly identical mechanism (`description` and `globs` in `.mdc` frontmatter) — but it is Cursor's own format, not Claude Code's. Windsurf, Copilot, and Codex do not read frontmatter at all; they treat the file as plain text.

---

## Adaptation Steps Per Tool

### Cursor

Cursor is structurally the closest to Claude Code for skill portability. Its `.cursor/rules/` directory with `.mdc` frontmatter is a direct analog to Claude Code's `.claude/skills/` directory.

**Step 1 — Convert the skill file**

```bash
# From the UitKit skills directory
cp skills/backend/python/fastapi.md your-project/.cursor/rules/fastapi.mdc
```

**Step 2 — Add MDC frontmatter**

Open the `.mdc` file and prepend:

```
---
description: FastAPI endpoint patterns — activate when building or modifying FastAPI routes, Pydantic models, or SQLAlchemy async sessions
globs: ["**/*.py", "**/routes/**", "**/api/**"]
alwaysApply: false
---
```

Map the skill's `When to activate` section to the `description` field. Map file patterns mentioned in `When to activate` to `globs`. Keep `alwaysApply: false` unless the skill should apply to every file in the project (use this only for project-wide standards from `rules/`, not task-specific skills).

**Step 3 — Strip harness-specific syntax**

Search the skill body for:
- Lines containing `/skill-name` (slash command references)
- Lines containing `mcp__` (MCP tool references)
- Lines containing `!command` (shell injection syntax)
- Sections referencing Claude Code agents (`Task` tool, `subagent_type`)

Remove or rewrite these. If a skill says "use `/security-audit` after each PR", rewrite it as "run a security audit checklist covering OWASP Top 10 after each PR".

**Step 4 — Install rules files**

Rules from `rules/common/` install as global Cursor rules. These apply regardless of open file, so set `alwaysApply: true`:

```bash
cp rules/common/security.md ~/.cursor/rules/security.mdc
# Add frontmatter:
# alwaysApply: true
# description: Security coding standards — always enforced
```

**Step 5 — Convert agents to Composer personas**

For each `agents/` file you want to use in Cursor:
1. Open Cursor Composer
2. Create a new chat
3. Paste the agent's `Purpose` as the opening system instruction
4. Paste the `Prompt template` (if present) as the first user turn
5. The agent's `Model guidance` section tells you which model tier to use — map Claude model tiers to Cursor's available models accordingly

**Gotcha:** Cursor's rule scoping uses OR logic for `globs`. A rule with `globs: ["**/*.py"]` fires for any Python file regardless of directory. If you install both a `fastapi.mdc` and a `django.mdc`, both fire for `.py` files. Use the `When NOT to use` section to let the model self-select — or add more specific glob patterns like `"**/fastapi_app/**/*.py"` if your project has a clear directory boundary.

**Gotcha:** `.cursorrules` (legacy single file) is loaded for every request with no scoping. It is suitable only for universal project standards. Do not paste multiple UitKit skills into `.cursorrules` — use `.cursor/rules/` with separate `.mdc` files.

**High-value UitKit content for Cursor:**

- All `skills/backend/` files — framework-specific patterns apply at file-open time
- All `rules/common/` files — coding standards enforce consistently
- `skills/git/commit-writer.md`, `skills/git/pr-description.md` — git workflow skills that Cursor's diff panel benefits from
- `skills/productivity/code-review.md`, `skills/productivity/refactor.md` — inline code quality tasks
- `agents/core/security-reviewer.md` — paste as a Composer system prompt before reviewing auth code

---

### Windsurf

Windsurf (Codeium's editor) uses a single `.windsurfrules` file per project. No scoping, no file-level activation — the entire file loads for every request.

**Step 1 — Curate, don't dump**

Windsurf's single-file architecture means context budget management is your responsibility. Do not paste all 262+ skills into `.windsurfrules`. The model's attention will diffuse across irrelevant content.

Optimal approach: select 2–4 skills most relevant to the current workstream. Rotate them as the work shifts.

**Step 2 — Structure the file**

```markdown
<!-- .windsurfrules -->

# Project: [Your Project Name]
[2-3 sentences describing the project's stack and architecture]

---

# Coding Standards

[Paste content of rules/common/security.md]
[Paste content of rules/common/testing.md]

---

# FastAPI Patterns

[Paste content of skills/backend/python/fastapi.md — without frontmatter]

---

# Database Migrations

[Paste content of skills/database/postgresql.md — without frontmatter]
```

**Step 3 — Rely on When NOT to use**

Since Windsurf loads everything, the `When NOT to use` sections are doing critical work. Do not strip them. The model reads these to decide when to ignore a skill's `Instructions`. A skill without a `When NOT to use` section will interfere with tasks it was not designed for.

**Step 4 — Agents in Windsurf**

Windsurf's Cascade AI does not support multi-agent delegation. Use agents as session-scoped system prompts — open a new Cascade conversation, paste the agent definition as opening context, then ask your question.

```
[Paste agents/core/security-reviewer.md]

Now review the following file for security issues:
[paste file content]
```

**Gotcha:** Windsurf has no equivalent to Claude Code's `subagent_type` field. Skills that depend on agent delegation (some skills in `skills/productivity/` reference spawning subagents) will not execute multi-agent flows. The model will attempt to handle everything in a single pass, which is usually sufficient for the task but without the parallelism or specialization benefits.

**Gotcha:** `.windsurfrules` has a practical size limit — very large files (8,000+ characters) may be truncated depending on the Codeium backend's context handling. Keep the file under 6,000 characters for reliable inclusion.

**High-value UitKit content for Windsurf:**

- `rules/common/` — all rules files are compact and universally applicable
- `skills/backend/` — the framework you're actively developing against
- `skills/devops-infra/docker.md`, `skills/devops-infra/github-actions.md` — infra tasks Windsurf handles well
- `skills/git/commit-writer.md` — Windsurf's commit workflow benefits from this

---

### GitHub Copilot

Copilot's instruction surface is intentionally minimal: one file, `.github/copilot-instructions.md`, applied to all Copilot interactions in the repository.

**Step 1 — Create the instructions file**

```bash
mkdir -p .github
touch .github/copilot-instructions.md
```

**Step 2 — Curate for the project**

Copilot works best with tight, actionable instructions. Unlike Claude Code or Cursor, Copilot handles shorter context fragments — a 1,000-character focused skill outperforms a 4,000-character exhaustive one.

For a FastAPI project:

```markdown
# Project Context

Python FastAPI project with PostgreSQL (asyncpg), SQLAlchemy async, Pydantic v2.

# Coding Standards

- Always define Pydantic models for request/response bodies — never accept raw dicts
- Use async def for all route handlers — no sync routes
- SQLAlchemy models in models/, Pydantic schemas in schemas/
- Parameterized queries only — no string-concatenated SQL
- HTTPException with correct status codes: 422 validation, 404 not found, 409 conflict
- Tests use pytest-asyncio with AsyncClient from httpx

# Security

- Validate all inputs at the API boundary
- Never log passwords, tokens, or keys
- Authorization checks must reference request.state.user — not query params
- Use parameterized queries or ORM exclusively

# Not applicable

- Do not apply FastAPI patterns to CLI scripts, notebooks, or non-HTTP code
```

This is a distilled combination of `skills/backend/python/fastapi.md` + `rules/common/security.md`, edited down to the highest-signal content.

**Step 3 — Character budget**

Copilot applies a soft cap of approximately 8,000 characters to `copilot-instructions.md`. For multi-technology projects, prioritize:
1. Project context (stack, architecture) — 200–400 characters
2. The two most frequently used skill instruction sets — 800–1,500 characters each
3. Universal rules (security, testing, commit conventions) — 200–400 characters each

Do not paste full skill files including their `When to activate`, `When NOT to use`, and `Example` sections. Copilot does not need these for auto-complete behavior — extract only the `Instructions` section.

**Step 4 — Agents as chat context**

Copilot Chat (VS Code extension) supports a system prompt-like pattern via `#` references in the chat. There is no native system prompt injection, but pasting an agent definition at the top of a Copilot Chat thread effectively scopes the session:

```
Act as a security reviewer using this operating brief:

[Paste agents/core/security-reviewer.md content]

Now review: [paste code]
```

**Gotcha:** Copilot's inline autocomplete is not governed by `copilot-instructions.md` in all contexts — the file primarily affects Copilot Chat behavior and some inline suggestion behavior. Do not expect strict adherence to coding style rules in autocomplete suggestions the way you would in a chat completion.

**Gotcha:** Copilot operates on GPT-4-class models under the hood. Some Claude-specific patterns in UitKit skills (extended thinking syntax, subagent delegation instructions) will be silently ignored rather than executed. Strip them — they add noise.

**High-value UitKit content for Copilot:**

- `rules/common/security.md` — Copilot's Chat mode respects security constraints well
- `rules/common/testing.md` — guides test file generation toward project conventions
- `skills/git/commit-writer.md` (Instructions section only) — Copilot's commit message suggestions improve significantly
- `skills/backend/` (Instructions section only, one per language) — framework-specific patterns work reliably

---

### OpenAI Codex CLI

Codex CLI is the terminal AI agent that operates via `codex` commands. Its context model is the closest to Claude Code of all non-Anthropic tools — it reads `AGENTS.md` at session start, supports directory-level overrides in monorepos, and accepts `--context` flags for one-off skill injection.

**Step 1 — Create AGENTS.md from CLAUDE.md**

Copy the UitKit `CLAUDE.md` pattern to `AGENTS.md` in your project:

```bash
cp CLAUDE.md AGENTS.md
```

Then edit `AGENTS.md`:
- Remove the `Plugin marketplace` and `hooks` configuration references
- Remove any `!command` inline injections
- Rename Claude Code-specific terminology ("slash command", "MCP tool") to plain instructions

**Step 2 — Install skills via --context flag for one-off tasks**

Test skills before committing them to `AGENTS.md`:

```bash
codex --context skills/backend/python/fastapi.md "Add a POST /users endpoint with JWT auth"
codex --context skills/devops-infra/docker.md "Write a Dockerfile for this FastAPI app"
codex --context skills/git/pr-description.md "Write a PR description for the current diff"
```

The `--context` flag prepends file content to the system prompt for that invocation only. This is equivalent to Claude Code's one-shot `/skill-name` invocation.

**Step 3 — Monorepo per-service skill assignment**

Like CLAUDE.md, `AGENTS.md` supports directory-level overrides. A file at `services/api/AGENTS.md` applies only when Codex operates in that subtree:

```
services/
├── api/
│   ├── AGENTS.md          # FastAPI + PostgreSQL skills
│   └── src/
├── workers/
│   ├── AGENTS.md          # Celery + Redis skills
│   └── src/
└── AGENTS.md              # Monorepo-wide conventions
```

This mirrors the Claude Code pattern exactly. Convert each service's Claude Code skill configuration to `AGENTS.md` equivalents using the skill file content directly.

**Step 4 — Agent definitions as AGENTS.md sections**

Codex CLI does not have a multi-agent delegation protocol, but you can scope a session to an agent's behavior by structuring `AGENTS.md` as:

```markdown
# Operating Role

You are a security reviewer. Do not modify any files. Report findings only.

[Paste the Prompt template section from agents/core/security-reviewer.md]
```

**Gotcha:** Codex CLI operates on OpenAI's model family. Claude-specific instruction patterns (like `