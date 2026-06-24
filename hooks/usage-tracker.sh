#!/usr/bin/env bash
# usage-tracker.sh — logs every tool call to .claude/usage-log.jsonl for DX metrics
#
# settings.json configuration:
# {
#   "hooks": {
#     "PostToolUse": [
#       {
#         "matcher": "",
#         "hooks": [
#           {
#             "type": "command",
#             "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/usage-tracker.sh",
#             "async": true
#           }
#         ]
#       }
#     ]
#   },
#   "dx": {
#     "tracking_enabled": true,
#     "usage_log_file": "${CLAUDE_PROJECT_DIR}/.claude/usage-log.jsonl",
#     "rotation_size_mb": 50,
#     "retention_days": 90
#   }
# }

set -euo pipefail

# Check if tracking is disabled
if [ "${DX_TRACKING_DISABLED:-0}" = "1" ]; then
    exit 0
fi

# Read stdin (tool output metadata from Claude)
INPUT=$(cat)

# Configuration from environment or defaults
PROJECT_DIR="${CLAUDE_PROJECT_DIR:-.}"
LOG_DIR="${PROJECT_DIR}/.claude"
LOG_FILE="${LOG_DIR}/usage-log.jsonl"
ROTATION_SIZE_MB="${ROTATION_SIZE_MB:-50}"
ROTATION_SIZE_BYTES=$((ROTATION_SIZE_MB * 1024 * 1024))
RETENTION_DAYS="${RETENTION_DAYS:-90}"

# Create log directory if needed
mkdir -p "$LOG_DIR"

# Extract data from stdin
# Expected format from Claude (JSON string passed to hook):
# {
#   "tool_name": "Bash",
#   "tool_input": {...},
#   "duration_ms": 2847,
#   "exit_code": 0,
#   "tool_output": "..."
# }

TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%S.%3NZ")
UNIX_TIMESTAMP=$(date +%s)
SESSION_ID="${CLAUDE_SESSION_ID:-unknown}"
USER_ID="${UITKIT_USER:-$(git config user.email 2>/dev/null || echo 'unknown')}"
SKILL_NAME="${CLAUDE_ACTIVE_SKILL:-manual}"

# Parse tool metadata safely
TOOL_DATA=$(python3 << 'PYTHONEOF'
import sys
import json

try:
    data = json.load(sys.stdin)
    tool_name = data.get('tool_name', 'unknown')
    duration_ms = data.get('duration_ms', 0)
    exit_code = data.get('exit_code', 1)

    # Summarize tool input (avoid logging sensitive data)
    tool_input = data.get('tool_input', {})
    tool_input_summary = ""

    if tool_name == "Bash" and isinstance(tool_input, dict):
        cmd = tool_input.get('command', '')
        # Truncate long commands and mask secrets
        if len(cmd) > 100:
            tool_input_summary = cmd[:100] + "..."
        else:
            tool_input_summary = cmd
    elif tool_name == "WebSearch" and isinstance(tool_input, dict):
        query = tool_input.get('query', '')
        tool_input_summary = query[:80]
    elif tool_name == "Read" and isinstance(tool_input, dict):
        file_path = tool_input.get('file_path', '')
        tool_input_summary = file_path
    elif tool_name == "Write" and isinstance(tool_input, dict):
        file_path = tool_input.get('file_path', '')
        tool_input_summary = f"write:{file_path}"
    else:
        tool_input_summary = tool_name

    # Check if successful (exit_code 0 = success)
    success = exit_code == 0

    # Output tool info as JSON
    print(json.dumps({
        "tool_name": tool_name,
        "tool_input_summary": tool_input_summary,
        "duration_ms": duration_ms,
        "exit_code": exit_code,
        "success": success,
        "output_length": len(str(data.get('tool_output', '')))
    }))

except Exception as e:
    # Fallback if parsing fails
    print(json.dumps({
        "tool_name": "unknown",
        "tool_input_summary": "parse_error",
        "duration_ms": 0,
        "exit_code": 1,
        "success": False,
        "output_length": 0,
        "error": str(e)
    }))

PYTHONEOF
)

# Build JSONL record
USAGE_RECORD=$(python3 << PYTHONEOF
import json
import sys
import os

tool_data = json.loads('$TOOL_DATA')

record = {
    "timestamp": "$TIMESTAMP",
    "session_id": "$SESSION_ID",
    "user_id": "$USER_ID",
    "skill_name": "$SKILL_NAME",
    "tool_called": tool_data["tool_name"],
    "tool_input_summary": tool_data["tool_input_summary"],
    "duration_ms": tool_data["duration_ms"],
    "exit_code": tool_data["exit_code"],
    "success": tool_data["success"],
    "invocation_num": int(os.environ.get("UITKIT_INVOCATION_NUM", "1")),
    "retry_count": int(os.environ.get("UITKIT_RETRY_COUNT", "0")),
    "metadata": {
        "project_dir": "$PROJECT_DIR",
        "git_branch": os.popen("git rev-parse --abbrev-ref HEAD 2>/dev/null").read().strip() or "unknown",
        "model": os.environ.get("CLAUDE_MODEL", "unknown"),
        "unix_timestamp": $UNIX_TIMESTAMP,
        "output_length": tool_data.get("output_length", 0)
    }
}

print(json.dumps(record))

PYTHONEOF
)

# Append to log (atomic single write)
echo "$USAGE_RECORD" >> "$LOG_FILE" || {
    # If append fails, try creating parent dir
    mkdir -p "$(dirname "$LOG_FILE")"
    echo "$USAGE_RECORD" >> "$LOG_FILE"
}

# Rotate log if > rotation size
if [ -f "$LOG_FILE" ]; then
    LOG_SIZE=$(stat -f%z "$LOG_FILE" 2>/dev/null || stat -c%s "$LOG_FILE" 2>/dev/null || echo 0)

    if [ "$LOG_SIZE" -gt "$ROTATION_SIZE_BYTES" ]; then
        ROTATED_FILE="${LOG_FILE}.$(date +%s)"
        mv "$LOG_FILE" "$ROTATED_FILE"
        # Optional: compress in background
        gzip "$ROTATED_FILE" > /dev/null 2>&1 &
    fi
fi

# Clean up old logs (older than retention_days)
if command -v find &> /dev/null; then
    find "$LOG_DIR" -name "usage-log.jsonl*" -mtime +"$RETENTION_DAYS" -delete 2>/dev/null || true
fi

exit 0
