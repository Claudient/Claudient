#!/usr/bin/env bash
# workspace-guardian.sh — PreToolUse hook to prevent accidental overwrites of critical files.
set -euo pipefail

INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')

# Only check file modification tools
if [[ "$TOOL_NAME" != "Replace" && "$TOOL_NAME" != "Write" && "$TOOL_NAME" != "Edit" && "$TOOL_NAME" != "Bash" ]]; then
  exit 0
fi

if [[ "$TOOL_NAME" == "Bash" ]]; then
  # Very basic check: if bash command contains 'echo ... > package.json' or similar
  COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
  if echo "$COMMAND" | grep -qE ">\s*(package\.json|\.env|\.github/workflows/.*|CLAUDE\.md)"; then
    jq -n \
      --arg cmd "$COMMAND" \
      '{
        decision: "block",
        reason: "🚨 WORKSPACE GUARDIAN: Attempted to overwrite a protected file via Bash (\($cmd)). Use the proper file edit tools or ask the user for explicit permission to modify infrastructure files."
      }'
    exit 0
  fi
  exit 0
fi

# For file tools, check the target file
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.file // .tool_input.TargetFile // empty')

if [[ -z "$FILE_PATH" ]]; then
  exit 0
fi

# Protected patterns
if [[ "$FILE_PATH" == *"package.json" || "$FILE_PATH" == *".env"* || "$FILE_PATH" == *".github/workflows/"* || "$FILE_PATH" == *"CLAUDE.md" ]]; then
  # Allow if a temporary unlock file exists
  if [[ -f ".uitkit-unlock" ]]; then
    if grep -q "$FILE_PATH" ".uitkit-unlock"; then
      exit 0
    fi
  fi

  jq -n \
    --arg file "$FILE_PATH" \
    '{
      decision: "block",
      reason: "🚨 WORKSPACE GUARDIAN: Attempted to edit protected infrastructure file \'\($file)\'. This file is locked to prevent accidental corruption. To edit this file, ask the user to run `npx uitkit guard unlock \($file)`."
    }'
  exit 0
fi

exit 0
