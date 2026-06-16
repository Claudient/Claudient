#!/bin/bash

# memory-injector.sh
# Injects relevant project memories before Claude modifies code.

TOOL_NAME="$1"
TOOL_ARGS="$2"

MEMORY_FILE="docs/MEMORY_BANK.md"

# Only care about file modification tools
if [[ "$TOOL_NAME" != "Replace" && "$TOOL_NAME" != "WriteFile" ]]; then
  exit 0
fi

if [ ! -f "$MEMORY_FILE" ]; then
  exit 0
fi

# Extract the file path being modified
FILE_PATH=$(echo "$TOOL_ARGS" | grep -o '"file_path": *"[^"]*"' | cut -d'"' -f4)
FILE_NAME=$(basename "$FILE_PATH")

# Search the memory bank for the filename or extension
# This is a rudimentary semantic search using grep
MATCHES=$(grep -i -C 2 "$FILE_NAME" "$MEMORY_FILE")

if [[ -n "$MATCHES" ]]; then
  echo "🧠 PROJECT MEMORY RECALLED for $FILE_NAME:"
  echo "----------------------------------------"
  echo "$MATCHES"
  echo "----------------------------------------"
  echo "Claude: Please ensure your proposed changes adhere to these historical project rules."
fi

# We exit 0 to allow the tool to proceed, but the echo output 
# is captured by Claude Code's hook system and injected into context.
exit 0
