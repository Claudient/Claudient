# Memory Injector Hook

This hook injects project-specific learned lessons into Claude's context just before it attempts to modify files, creating a self-improving feedback loop.

## When it fires
Event: `PreToolUse`
Triggers when Claude Code is about to use the `Replace`, `WriteFile`, or `Bash` tools.

## What it does
1. Checks if a `docs/MEMORY_BANK.md` file exists in the project.
2. If it does, the hook reads the memory bank.
3. (Optional enhancement: It greps the memory bank for keywords matching the current `$TOOL_ARGS` or file paths to only inject relevant memories).
4. It intercepts the tool execution gracefully, appending a reminder from the memory bank directly into Claude's context, ensuring Claude adheres to previously established project rules before writing the code.

## `settings.json` Configuration
Add this to your project's `.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "command": "bash .claude/hooks/memory-injector.sh \"$TOOL_NAME\" \"$TOOL_ARGS\"",
        "description": "Self-Learning: Inject project memories"
      }
    ]
  }
}
```

## Setup Instructions
1. Copy the `memory-injector.sh` script to `.claude/hooks/memory-injector.sh`.
2. Make it executable: `chmod +x .claude/hooks/memory-injector.sh`.
3. Update your `.claude/settings.json` as shown above.