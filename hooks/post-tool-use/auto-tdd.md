# Auto-TDD Hook

This hook automatically watches for file saves. If Claude Code edits a source file (e.g., `src/auth.ts`), the hook automatically attempts to find and run its corresponding test file (e.g., `src/auth.test.ts`) in the background.

## When it fires
Event: `PostToolUse`
Triggers after Claude Code successfully executes the `Replace` or `WriteFile` tools.

## What it does
1. Checks the modified file path.
2. If it's a source file (e.g., `.ts`, `.js`, `.py`, `.go`), it looks for a corresponding test file.
3. Runs the test suite strictly for that file.
4. If the test fails, it prints the stack trace. Claude Code will automatically ingest this stdout as part of the `PostToolUse` result, allowing Claude to self-heal without the user needing to copy-paste the error.

## `settings.json` Configuration
Add this to your project's `.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "command": "bash .claude/hooks/auto-tdd.sh \"$TOOL_NAME\" \"$TOOL_ARGS\"",
        "description": "Auto-TDD: Run tests for modified files"
      }
    ]
  }
}
```

## Setup Instructions
1. Copy the `auto-tdd.sh` script to `.claude/hooks/auto-tdd.sh`.
2. Make it executable: `chmod +x .claude/hooks/auto-tdd.sh`.
3. Update your `.claude/settings.json` as shown above.