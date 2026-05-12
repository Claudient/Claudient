# Hooks Cookbook

Real, ready-to-use hook patterns for automating quality, safety, and observability in Claude Code.

---

## Hook Fundamentals

Hooks are shell scripts or commands that Claude Code executes automatically in response to events. They run outside Claude's context — they are real shell processes, not Claude instructions.

**Hook events:**
| Event | When it fires |
|---|---|
| `SessionStart` | When a Claude Code session begins |
| `PreToolUse` | Before any tool call executes |
| `PostToolUse` | After any tool call completes |
| `PreCompact` | Before context compaction fires |
| `PostCompact` | After context compaction completes |
| `Stop` | When Claude finishes responding |
| `Notification` | When Claude sends a desktop notification |

**Hook configuration location:** `.claude/settings.json` (project) or `~/.claude/settings.json` (user-level)

**Basic hook structure:**
```json
{
  "hooks": {
    "EventName": [
      {
        "matcher": "ToolName",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/your-script.sh",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

**Matcher:** Filters which tool calls trigger the hook. Empty string `""` matches all. `"Bash"` matches only Bash tool calls. `"Write|Edit"` matches Write or Edit.

---

## Recipe 1 — Prettier Auto-Format on File Write

Automatically formats files after Claude writes or edits them. No more "please run prettier" prompts.

**settings.json:**
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write ${tool_input.file_path}",
            "async": true
          }
        ]
      }
    ]
  }
}
```

**Notes:**
- `async: true` runs formatting in the background — Claude doesn't wait for it
- Only runs on Write and Edit tool calls
- `${tool_input.file_path}` is the path of the file that was written

---

## Recipe 2 — Block Dangerous Shell Commands

Prevent Claude from running destructive commands even if it decides to try.

**.claude/hooks/block-dangerous.sh:**
```bash
#!/usr/bin/env bash
# Reads the tool input from stdin as JSON
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('command',''))")

# Block patterns
BLOCKED_PATTERNS=("rm -rf" "sudo " "| bash" "| sh" "curl.*| " "wget.*| " "git push --force" "git reset --hard" "DROP TABLE" "truncate ")

for pattern in "${BLOCKED_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qi "$pattern"; then
    echo "BLOCKED: command matches dangerous pattern '$pattern'" >&2
    exit 2  # Exit code 2 = block the tool call
  fi
done

exit 0  # Allow
```

**settings.json:**
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/block-dangerous.sh",
            "timeout": 5
          }
        ]
      }
    ]
  }
}
```

**Exit codes:** `0` = allow, `1` = warn (Claude sees the output but continues), `2` = block (tool call is cancelled).

---

## Recipe 3 — Audit Log Every Tool Call

Log every tool call with timestamp, tool name, and input summary. Essential for debugging and security auditing.

**.claude/hooks/audit-log.sh:**
```bash
#!/usr/bin/env bash
INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_name','unknown'))" 2>/dev/null)
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
LOG_FILE="${CLAUDE_PROJECT_DIR}/.claude/logs/audit.log"

mkdir -p "$(dirname "$LOG_FILE")"
echo "${TIMESTAMP} | ${TOOL_NAME} | $(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); inp=d.get('tool_input',{}); print(str(inp)[:200])" 2>/dev/null)" >> "$LOG_FILE"
```

**settings.json:**
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/audit-log.sh",
            "async": true
          }
        ]
      }
    ]
  }
}
```

Add `.claude/logs/` to `.gitignore`.

---

## Recipe 4 — Pre-Compact Session Saver

Before compaction fires, save the current session state so context survives.

**.claude/hooks/pre-compact-save.sh:**
```bash
#!/usr/bin/env bash
MEMORY_FILE="${CLAUDE_PROJECT_DIR}/.claude/memory/session-state.md"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

mkdir -p "$(dirname "$MEMORY_FILE")"

cat >> "$MEMORY_FILE" << EOF

---
## Session snapshot: ${TIMESTAMP}
[Claude will append a summary here during PreCompact]
EOF
```

**settings.json:**
```json
{
  "hooks": {
    "PreCompact": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/pre-compact-save.sh"
          }
        ]
      }
    ]
  }
}
```

Pair this with a CLAUDE.md instruction: "When PreCompact fires, summarize: current task, files changed, open decisions, next steps — append to `.claude/memory/session-state.md`."

---

## Recipe 5 — Cost Tracker

Estimate token costs per session and log them.

**.claude/hooks/cost-tracker.sh:**
```bash
#!/usr/bin/env bash
INPUT=$(cat)
COST_FILE="${CLAUDE_PROJECT_DIR}/.claude/logs/costs.log"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

mkdir -p "$(dirname "$COST_FILE")"

# Extract usage data if available
USAGE=$(echo "$INPUT" | python3 -c "
import sys, json
d = json.load(sys.stdin)
usage = d.get('usage', {})
inp = usage.get('input_tokens', 0)
out = usage.get('output_tokens', 0)
print(f'input={inp} output={out}')
" 2>/dev/null || echo "usage=unavailable")

echo "${TIMESTAMP} | ${USAGE}" >> "$COST_FILE"
```

**settings.json:**
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/cost-tracker.sh",
            "async": true
          }
        ]
      }
    ]
  }
}
```

---

## Recipe 6 — TypeScript Type Check on Edit

Run `tsc --noEmit` after Claude edits TypeScript files. Catch type errors before they compound.

**settings.json:**
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'echo \"${tool_input.file_path}\" | grep -q \"\\.tsx\\?$\" && npx tsc --noEmit 2>&1 | head -20 || true'",
            "async": false,
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

Set `async: false` so Claude sees the type errors and can fix them immediately.

---

## Recipe 7 — Git Push Reminder

Remind Claude to confirm before any git push operation.

**.claude/hooks/git-push-confirm.sh:**
```bash
#!/usr/bin/env bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('command',''))" 2>/dev/null)

if echo "$COMMAND" | grep -q "git push"; then
  echo "⚠️  About to push to remote. Confirm this is intentional." >&2
  exit 1  # Warn — Claude sees this and should ask user before proceeding
fi

exit 0
```

**settings.json:**
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/git-push-confirm.sh"
          }
        ]
      }
    ]
  }
}
```

---

## Recipe 8 — Session Start Context Loader

At session start, automatically remind Claude to read key context files.

**.claude/hooks/session-start.sh:**
```bash
#!/usr/bin/env bash
# Output text that gets prepended to Claude's context at session start
MEMORY_FILE="${CLAUDE_PROJECT_DIR}/.claude/memory/session-state.md"

if [ -f "$MEMORY_FILE" ]; then
  echo "Previous session state found at .claude/memory/session-state.md — read it before starting work."
fi

if [ -f "${CLAUDE_PROJECT_DIR}/CONTEXT.md" ]; then
  echo "Domain glossary available at CONTEXT.md — read it for project terminology."
fi
```

**settings.json:**
```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/session-start.sh"
          }
        ]
      }
    ]
  }
}
```

---

## Combining Hooks

Hooks compose — you can have multiple hooks on the same event, each with different matchers.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          { "type": "command", "command": "npx prettier --write ${tool_input.file_path}", "async": true }
        ]
      },
      {
        "matcher": "Write|Edit",
        "hooks": [
          { "type": "command", "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/tsc-check.sh", "async": false }
        ]
      },
      {
        "matcher": "",
        "hooks": [
          { "type": "command", "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/audit-log.sh", "async": true }
        ]
      }
    ]
  }
}
```

This runs: prettier (async) + TypeScript check (sync, Claude waits) + audit log (async) on every file write.

---

## Troubleshooting Hooks

**Hook not firing:**
- Check the event name is exact: `PreToolUse`, `PostToolUse`, `SessionStart`, `PreCompact`
- Check the script is executable: `chmod +x .claude/hooks/your-script.sh`
- Check the path uses `${CLAUDE_PROJECT_DIR}` correctly

**Hook blocking everything:**
- If your hook exits with `2` on every call, all tool calls are blocked
- Add logging to the hook to see what input it's receiving
- Test the hook manually: `echo '{"tool_name":"Bash","tool_input":{"command":"ls"}}' | bash .claude/hooks/your-script.sh`

**Hook running but output not visible:**
- Stdout from async hooks is discarded. Use stderr (`>&2`) for messages you want to see.
- For sync hooks, stdout is shown to Claude; stderr is shown to the user.

---

## Work With Us

Claudient is backed by [Uitbreiden](https://uitbreiden.com/) — we build AI products with developer communities and deliver B2B AI solutions. If you need custom hook systems, automated quality gates, or production-grade Claude Code automation for your team — we build this for clients.

**[uitbreiden.com](https://uitbreiden.com/)**
