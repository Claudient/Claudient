#!/usr/bin/env bash
# cost-cap-enforcer.sh — enforces session cost limits to prevent runaway spending
#
# settings.json configuration:
# {
#   "hooks": {
#     "PreToolUse": [
#       {
#         "matcher": "",
#         "hooks": [
#           {
#             "type": "command",
#             "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/cost-cap-enforcer.sh",
#             "async": false
#           }
#         ]
#       }
#     ],
#     "PostToolUse": [
#       {
#         "matcher": "",
#         "hooks": [
#           {
#             "type": "command",
#             "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/cost-cap-enforcer.sh post",
#             "async": true
#           }
#        ]
#       }
#     ]
#   },
#   "cost_control": {
#     "enabled": true,
#     "session_cap_usd": 10.0,
#     "alert_threshold_usd": 8.0,
#     "hard_stop_at_cap": true,
#     "log_file": "${CLAUDE_PROJECT_DIR}/.claude/logs/cost.log"
#   }
# }

set -euo pipefail

LOG_FILE="${CLAUDE_PROJECT_DIR:-$(pwd)}/.claude/logs/cost.log"
STATE_FILE="${CLAUDE_PROJECT_DIR:-$(pwd)}/.claude/.cost-state"

# Read configuration from environment or set defaults
MAX_SESSION_COST="${UITKIT_SESSION_CAP:-10.0}"
ALERT_THRESHOLD="${UITKIT_ALERT_THRESHOLD:-8.0}"
HARD_STOP="${UITKIT_HARD_STOP:-true}"

mkdir -p "$(dirname "$LOG_FILE")"
mkdir -p "$(dirname "$STATE_FILE")"

# Initialize state file if not exists
if [ ! -f "$STATE_FILE" ]; then
    cat > "$STATE_FILE" << EOF
{
  "session_start_time": $(date +%s),
  "total_cost_usd": 0.0,
  "tool_count": 0,
  "alert_sent": false
}
EOF
fi

# Read current state
STATE=$(cat "$STATE_FILE" 2>/dev/null || echo '{}')
CURRENT_COST=$(echo "$STATE" | python3 -c "import sys, json; print(json.load(sys.stdin).get('total_cost_usd', 0.0))" 2>/dev/null || echo "0.0")
ALERT_SENT=$(echo "$STATE" | python3 -c "import sys, json; print(json.load(sys.stdin).get('alert_sent', False))" 2>/dev/null || echo "false")

# Determine if this is PreToolUse or PostToolUse
MODE="${1:-pre}"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

if [ "$MODE" = "pre" ]; then
    # PreToolUse: check if we're at or over the cap
    CURRENT_COST_FLOAT=$(echo "$CURRENT_COST" | awk '{print $0}')
    MAX_COST_FLOAT=$(echo "$MAX_SESSION_COST" | awk '{print $0}')

    # Use bc for floating point comparison if available
    if command -v bc &>/dev/null; then
        IS_OVER_CAP=$(echo "$CURRENT_COST_FLOAT >= $MAX_COST_FLOAT" | bc)
        IS_NEAR_THRESHOLD=$(echo "$CURRENT_COST_FLOAT >= $ALERT_THRESHOLD" | bc)
    else
        # Fallback to integer comparison (scale to cents)
        COST_CENTS=$(echo "$CURRENT_COST_FLOAT * 100" | awk '{printf "%.0f\n", $0}')
        CAP_CENTS=$(echo "$MAX_COST_FLOAT * 100" | awk '{printf "%.0f\n", $0}')
        THRESHOLD_CENTS=$(echo "$ALERT_THRESHOLD * 100" | awk '{printf "%.0f\n", $0}')

        if [ "$COST_CENTS" -ge "$CAP_CENTS" ]; then
            IS_OVER_CAP=1
        else
            IS_OVER_CAP=0
        fi

        if [ "$COST_CENTS" -ge "$THRESHOLD_CENTS" ]; then
            IS_NEAR_THRESHOLD=1
        else
            IS_NEAR_THRESHOLD=0
        fi
    fi

    # Log current state
    echo "${TIMESTAMP} | COST CHECK | Current: \$$CURRENT_COST | Cap: \$$MAX_SESSION_COST | Status: $([ "$IS_OVER_CAP" -eq 1 ] && echo 'OVER_CAP' || echo 'OK')" >> "$LOG_FILE"

    # If over cap and hard stop enabled, block tool
    if [ "$IS_OVER_CAP" -eq 1 ] && [ "$HARD_STOP" = "true" ]; then
        echo "ERROR: Session cost limit exceeded"
        echo "Current session cost: \$$CURRENT_COST"
        echo "Session cap: \$$MAX_SESSION_COST"
        echo ""
        echo "This tool call is blocked by cost enforcement."
        echo "Options:"
        echo "  1. Increase UITKIT_SESSION_CAP in environment"
        echo "  2. Start a new session"
        echo "  3. Contact your account manager for higher limits"
        exit 1
    fi

    # Alert if near threshold
    if [ "$IS_NEAR_THRESHOLD" -eq 1 ] && [ "$ALERT_SENT" = "false" ]; then
        PERCENTAGE=$(echo "scale=1; $CURRENT_COST_FLOAT / $MAX_COST_FLOAT * 100" | bc 2>/dev/null || echo "unknown")
        echo "WARNING: Approaching session cost limit"
        echo "Current: \$$CURRENT_COST (${PERCENTAGE}% of \$$MAX_SESSION_COST)"
        echo ""

        # Update alert flag
        python3 << PYTHONEOF
import json, sys
state = json.loads('''$STATE''')
state['alert_sent'] = True
with open('$STATE_FILE', 'w') as f:
    json.dump(state, f)
PYTHONEOF
    fi

elif [ "$MODE" = "post" ]; then
    # PostToolUse: update cost based on tool call result
    INPUT=$(cat)

    # Extract tool name
    TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // "unknown"' 2>/dev/null || echo "unknown")

    # Estimate cost based on tool (rough model)
    # In production, this would integrate with actual pricing from Claude API
    TOOL_COST=0.001  # Default 0.1 cent per tool

    case "$TOOL_NAME" in
        "Bash")
            TOOL_COST=0.002  # Command execution is slightly more expensive
            ;;
        "Read")
            TOOL_COST=0.001
            ;;
        "Write")
            TOOL_COST=0.001
            ;;
        "Edit")
            TOOL_COST=0.001
            ;;
        "WebFetch" | "WebSearch")
            TOOL_COST=0.005  # API calls are more expensive
            ;;
        "NotebookEdit")
            TOOL_COST=0.003
            ;;
        *)
            TOOL_COST=0.001
            ;;
    esac

    # Update state
    python3 << PYTHONEOF
import json, sys
from datetime import datetime

state = json.loads('''$STATE''')
state['total_cost_usd'] = float(state.get('total_cost_usd', 0.0)) + $TOOL_COST
state['tool_count'] = int(state.get('tool_count', 0)) + 1
state['last_tool'] = '$TOOL_NAME'
state['last_update'] = '$TIMESTAMP'

with open('$STATE_FILE', 'w') as f:
    json.dump(state, f)

sys.exit(0)
PYTHONEOF

    # Log the update
    NEW_COST=$(python3 -c "import json; d = json.load(open('$STATE_FILE')); print(d.get('total_cost_usd', 0))" 2>/dev/null || echo "$CURRENT_COST")
    echo "${TIMESTAMP} | COST UPDATE | Tool: ${TOOL_NAME} | Added: \$$TOOL_COST | Total: \$$NEW_COST" >> "$LOG_FILE"
fi

exit 0
