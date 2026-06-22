# Swarm Sandbox CLI Guide

## Overview

`claudient swarm-sandbox` is a comprehensive CLI command for scaffolding, executing, validating, and managing multi-agent Claude Code sandboxes. It provides a fully isolated execution environment for orchestrating multiple specialized agents with structured task coordination.

## Installation

The swarm-sandbox command is built into Claudient. No additional setup required.

```bash
npx claudient swarm-sandbox --help
```

## Commands

### 1. `init` — Initialize Sandbox

Scaffold a new multi-agent sandbox environment with agent configurations and directory structure.

```bash
npx claudient swarm-sandbox init <name> [options]
```

**Options:**
- `--agents=N` — Number of agents to scaffold (1-20, default: 3)
- `--dry-run` — Preview changes without creating files
- `--verbose, -v` — Enable detailed debug output

**Example:**
```bash
npx claudient swarm-sandbox init my-research-swarm --agents=5
npx claudient swarm-sandbox init code-review-team --agents=3 --verbose
npx claudient swarm-sandbox init test-env --agents=2 --dry-run
```

**What it creates:**
- Sandbox root directory in `~/.claude/swarm-sandboxes/<name>/`
- Agent configuration files (`agents/agent-*.json`)
- Execution history directory (`executions/`)
- Logging directory (`logs/`)
- Artifact storage (`artifacts/`)
- Manifest file (`sandbox-manifest.json`)
- Sandbox config (`.sandboxrc`)

**Manifest structure:**
```json
{
  "id": "unique-sandbox-id",
  "name": "my-research-swarm",
  "createdAt": "2026-06-22T03:52:15Z",
  "status": "initialized",
  "config": {
    "agentCount": 5,
    "timeoutMs": 30000,
    "maxRetries": 3,
    "isolationLevel": "strict"
  },
  "agents": [
    { "id": "agent-1", "role": "specialist-1", "status": "idle" },
    { "id": "agent-2", "role": "specialist-2", "status": "idle" },
    ...
  ],
  "executions": [],
  "validations": [],
  "logs": []
}
```

---

### 2. `run` — Execute Sandbox

Orchestrate multi-agent task execution within the sandbox.

```bash
npx claudient swarm-sandbox run <name> [options]
```

**Options:**
- `--timeout=ms` — Execution timeout in milliseconds (default: 30000)
- `--report=json` — Output execution results as JSON (default: text)
- `--dry-run` — Preview execution without running agents
- `--verbose, -v` — Enable detailed debug output

**Example:**
```bash
npx claudient swarm-sandbox run my-research-swarm
npx claudient swarm-sandbox run my-research-swarm --timeout=60000 --report=json
npx claudient swarm-sandbox run code-review-team --verbose
npx claudient swarm-sandbox run test-env --dry-run
```

**Output (text mode):**
```
Execution Summary:
  ID: i4yocs1llumiqmpsmdm9s
  Status: completed
  Agents: 5
  Results: 5
```

**Output (JSON mode):**
```json
{
  "id": "execution-id",
  "startedAt": "2026-06-22T03:52:37.091Z",
  "agents": [
    {
      "agentId": "agent-1",
      "status": "completed",
      "output": {
        "analysis": "...",
        "confidence": 0.95,
        "timestamp": "2026-06-22T03:52:37.091Z"
      },
      "completedAt": "2026-06-22T03:52:37.091Z"
    }
  ],
  "results": [...],
  "completedAt": "2026-06-22T03:52:37.091Z",
  "status": "completed"
}
```

**Execution files saved to:**
- `executions/<execution-id>/execution.json` — Full execution log
- Manifest updated with execution entry

---

### 3. `validate` — Verify Sandbox Integrity

Perform comprehensive validation checks on sandbox structure, agent configurations, and execution history.

```bash
npx claudient swarm-sandbox validate <name> [options]
```

**Options:**
- `--report=json` — Output validation report as JSON (default: text)
- `--dry-run` — Skip report file writing
- `--verbose, -v` — Enable detailed debug output

**Example:**
```bash
npx claudient swarm-sandbox validate my-research-swarm
npx claudient swarm-sandbox validate my-research-swarm --report=json
npx claudient swarm-sandbox validate code-review-team --verbose
```

**Validation Checks:**
1. **Manifest Integrity** — Validates required fields and metadata
2. **Directory Structure** — Verifies all required subdirectories exist
3. **Agent Configurations** — Confirms all agent config files are present
4. **Execution History** — Confirms execution logs are accessible

**Output (text mode):**
```
Validation Results:
  Manifest Integrity: PASSED
    - ID: iat2ypwnccn7f5upx8du
    - Agents: 5
  Directory Structure: PASSED
    - agents: exists
    - executions: exists
    - logs: exists
    - artifacts: exists
  Agent Configurations: PASSED
    - agent-1: ok
    - agent-2: ok
    - agent-3: ok
    - agent-4: ok
    - agent-5: ok
  Execution History: PASSED
    - Total executions: 1
    - Last execution: i4yocs1llumiqmpsmdm9s
```

**Report saved to:**
- `logs/validation-<timestamp>.json` — Timestamped validation report

---

### 4. `cleanup` — Remove Sandbox

Safely remove a sandbox and all associated resources.

```bash
npx claudient swarm-sandbox cleanup <name> [options]
```

**Options:**
- `--dry-run` — Preview deletion without removing files
- `--verbose, -v` — Enable detailed debug output

**Example:**
```bash
npx claudient swarm-sandbox cleanup my-research-swarm
npx claudient swarm-sandbox cleanup code-review-team --dry-run --verbose
npx claudient swarm-sandbox cleanup test-env --verbose
```

**Removes:**
- Entire sandbox directory: `~/.claude/swarm-sandboxes/<name>/`
- All agent configurations
- All execution history
- All logs and artifacts

---

## Agent Configuration Files

Each agent receives a JSON configuration file at `agents/agent-<id>.json`:

```json
{
  "id": "agent-1",
  "role": "specialist-1",
  "model": "claude-haiku-4-5-20251001",
  "systemPrompt": "You are a specialist-1 in a multi-agent collaboration swarm.\nYour responsibilities:\n- Execute domain-specific tasks with precision\n- Provide structured output for downstream validation\n- Report errors transparently and propose recovery steps\n- Respect timeout and resource constraints\n- Coordinate with other agents via shared context",
  "capabilities": ["analysis", "validation", "coordination"],
  "maxTokens": 8000,
  "temperature": 0.7
}
```

**Customization:** Agent configs can be edited post-initialization to customize:
- System prompts
- Model selection
- Token limits
- Temperature for inference variability
- Capabilities list

---

## Sandbox Directory Structure

```
~/.claude/swarm-sandboxes/
├── <sandbox-name>/
│   ├── .sandboxrc                    # Sandbox configuration
│   ├── sandbox-manifest.json         # Manifest (agents, executions, status)
│   ├── agents/
│   │   ├── agent-1.json
│   │   ├── agent-2.json
│   │   └── ...
│   ├── executions/
│   │   ├── <execution-id-1>/
│   │   │   └── execution.json
│   │   └── <execution-id-2>/
│   │       └── execution.json
│   ├── logs/
│   │   ├── validation-<timestamp>.json
│   │   └── ...
│   └── artifacts/
│       └── (agent output artifacts)
```

---

## Use Cases

### 1. Multi-Agent Code Review

```bash
npx claudient swarm-sandbox init code-review-team --agents=3
npx claudient swarm-sandbox run code-review-team --timeout=60000 --report=json
npx claudient swarm-sandbox validate code-review-team
```

### 2. Parallel Research Tasks

```bash
npx claudient swarm-sandbox init research-swarm --agents=5
npx claudient swarm-sandbox run research-swarm --timeout=120000 --verbose
```

### 3. Validation & Testing

```bash
npx claudient swarm-sandbox init test-validation --agents=4
npx claudient swarm-sandbox run test-validation --report=json > results.json
npx claudient swarm-sandbox validate test-validation --report=json
```

### 4. Dry-Run Testing

```bash
# Preview without creating
npx claudient swarm-sandbox init dry-test --agents=2 --dry-run

# Preview without running
npx claudient swarm-sandbox run dry-test --dry-run

# Safe cleanup preview
npx claudient swarm-sandbox cleanup dry-test --dry-run
```

---

## Environment Variables & Configuration

Sandboxes store persistent state in `~/.claude/swarm-sandboxes/`:

- **Location:** `$HOME/.claude/swarm-sandboxes/<name>/`
- **Manifest:** `sandbox-manifest.json` (read/write)
- **Configs:** `.sandboxrc` (read-only after init)
- **Isolation level:** Filesystem-based (strict)
- **Persistence:** JSON (portable, version-controllable)

---

## Error Handling

**Invalid sandbox name:**
```
Error: Sandbox name must be lowercase alphanumeric with hyphens/underscores
```

**Sandbox doesn't exist:**
```
Error: Sandbox "name" not found at ~/.claude/swarm-sandboxes/name
```

**Agent count out of range:**
```
Error: --agents must be between 1 and 20
```

**Missing manifest:**
```
Error: Invalid sandbox: missing sandbox-manifest.json
```

---

## Advanced Workflows

### Export Execution Results

```bash
npx claudient swarm-sandbox run my-sandbox --report=json > execution.json
cat execution.json | jq '.results[] | {agentId, status, confidence: .result.confidence}'
```

### Chain Multiple Runs

```bash
for i in {1..3}; do
  npx claudient swarm-sandbox run my-sandbox --report=json >> results-$i.json
done
```

### Audit Trail

```bash
# View execution history
cat ~/.claude/swarm-sandboxes/my-sandbox/sandbox-manifest.json | jq '.executions'

# View validation reports
ls -la ~/.claude/swarm-sandboxes/my-sandbox/logs/
```

---

## Performance Notes

- **Init:** ~50ms per agent (minimal I/O)
- **Run:** ~100ms overhead + agent execution time
- **Validate:** ~20ms + manifest parsing
- **Cleanup:** ~50ms per file (recursive deletion)

Default timeout: **30 seconds** (adjust per workload)

---

## Integration with Claude Code Workflows

Swarm sandboxes integrate with Claude Code's multi-agent orchestration:

```bash
# Spawn sandbox in CI/CD
npx claudient swarm-sandbox init ci-agents --agents=5
npx claudient swarm-sandbox run ci-agents --timeout=60000 --report=json > ci-results.json

# Validate before cleanup
npx claudient swarm-sandbox validate ci-agents
npx claudient swarm-sandbox cleanup ci-agents
```

---

## Troubleshooting

**Sandbox not found:**
```bash
npx claudient swarm-sandbox validate my-sandbox
# List existing sandboxes
ls -la ~/.claude/swarm-sandboxes/
```

**Validation failures:**
```bash
npx claudient swarm-sandbox validate my-sandbox --verbose
# Review detailed check output
cat ~/.claude/swarm-sandboxes/my-sandbox/logs/validation-*.json
```

**Cleanup issues:**
```bash
# Preview deletion first
npx claudient swarm-sandbox cleanup my-sandbox --dry-run --verbose

# Then execute
npx claudient swarm-sandbox cleanup my-sandbox --verbose
```

---

## Summary

| Command | Purpose | Key Options |
|---------|---------|------------|
| `init` | Scaffold sandbox environment | `--agents=N`, `--dry-run`, `--verbose` |
| `run` | Execute agents | `--timeout=ms`, `--report=json`, `--dry-run` |
| `validate` | Verify integrity | `--report=json`, `--verbose`, `--dry-run` |
| `cleanup` | Remove sandbox | `--dry-run`, `--verbose` |

All operations respect `--verbose` for debug output and support both text and JSON reporting formats for integration with external tools and scripts.
