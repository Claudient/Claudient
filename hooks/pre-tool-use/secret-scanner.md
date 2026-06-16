# Secret Scanner Hook

This hook scans the arguments of Claude Code tools *before* they execute to prevent accidental hardcoding or logging of sensitive credentials.

## When it fires
Event: `PreToolUse`
Triggers immediately before Claude Code executes a tool (especially `Replace`, `WriteFile`, or `Bash`).

## What it does
1. Intercepts the proposed tool arguments (e.g., the content to be written to a file or the shell command to be run).
2. Uses regex patterns to scan for high-risk secrets, including:
    *   AWS Access Keys (`AKIA...`)
    *   Stripe Secret Keys (`sk_live_...`)
    *   Generic API keys and private RSA keys.
3. If a secret is detected, the hook forcefully aborts the tool execution and returns a severe warning to Claude's context window.
4. Claude will receive the failure notification and must rewrite the file/command using environment variables (e.g., `process.env.STRIPE_KEY`) instead of hardcoded strings.

## `settings.json` Configuration
Add this to your project's `.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "command": "bash .claude/hooks/secret-scanner.sh \"$TOOL_NAME\" \"$TOOL_ARGS\"",
        "description": "Security: Block hardcoded secrets"
      }
    ]
  }
}
```

## Setup Instructions
1. Copy the `secret-scanner.sh` script to `.claude/hooks/secret-scanner.sh`.
2. Make it executable: `chmod +x .claude/hooks/secret-scanner.sh`.
3. Update your `.claude/settings.json` as shown above.