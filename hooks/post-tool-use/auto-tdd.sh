#!/bin/bash

# auto-tdd.sh
# Runs corresponding test files after Claude Code edits a source file.

TOOL_NAME="$1"
TOOL_ARGS="$2"

# Only care about file modification tools
if [[ "$TOOL_NAME" != "Replace" && "$TOOL_NAME" != "WriteFile" ]]; then
  exit 0
fi

# Extract the file path from the JSON arguments (crude extraction for bash)
FILE_PATH=$(echo "$TOOL_ARGS" | grep -o '"file_path": *"[^"]*"' | cut -d'"' -f4)

if [[ -z "$FILE_PATH" ]]; then
  exit 0
fi

# Determine test file based on ecosystem
TEST_FILE=""
TEST_CMD=""

if [[ "$FILE_PATH" == *.ts || "$FILE_PATH" == *.js || "$FILE_PATH" == *.tsx || "$FILE_PATH" == *.jsx ]]; then
  # JavaScript/TypeScript: Look for .test.ts or .spec.ts
  BASE_NAME="${FILE_PATH%.*}"
  EXT="${FILE_PATH##*.}"
  
  if [ -f "${BASE_NAME}.test.${EXT}" ]; then
    TEST_FILE="${BASE_NAME}.test.${EXT}"
  elif [ -f "${BASE_NAME}.spec.${EXT}" ]; then
    TEST_FILE="${BASE_NAME}.spec.${EXT}"
  fi

  if [[ -n "$TEST_FILE" ]]; then
    if [ -f "package.json" ] && grep -q '"jest"' "package.json"; then
      TEST_CMD="npx jest $TEST_FILE"
    elif [ -f "package.json" ] && grep -q '"vitest"' "package.json"; then
      TEST_CMD="npx vitest run $TEST_FILE"
    else
      TEST_CMD="npm test -- $TEST_FILE"
    fi
  fi

elif [[ "$FILE_PATH" == *.py ]]; then
  # Python: Look for test_<name>.py
  DIR_NAME=$(dirname "$FILE_PATH")
  BASE_NAME=$(basename "$FILE_PATH")
  TEST_FILE="$DIR_NAME/test_$BASE_NAME"
  
  if [ -f "$TEST_FILE" ]; then
    if command -v pytest &> /dev/null; then
      TEST_CMD="pytest $TEST_FILE"
    else
      TEST_CMD="python -m unittest $TEST_FILE"
    fi
  fi
fi

# Run the test if we found one
if [[ -n "$TEST_CMD" ]]; then
  echo "🧪 Auto-TDD: Modified $FILE_PATH. Running tests..."
  echo "> $TEST_CMD"
  
  OUTPUT=$($TEST_CMD 2>&1)
  EXIT_CODE=$?
  
  if [ $EXIT_CODE -ne 0 ]; then
    echo "❌ Tests Failed!"
    echo "$OUTPUT"
    echo "Claude: Please fix the errors above."
  else
    echo "✅ Tests Passed!"
  fi
fi
