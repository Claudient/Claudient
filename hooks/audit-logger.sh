#!/usr/bin/env bash
# audit-logger.sh — logs every tool call with metadata for compliance auditing
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
#             "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/audit-logger.sh",
#             "async": true
#           }
#         ]
#       }
#     ]
#   },
#   "audit": {
#     "enabled": true,
#     "log_file": "${CLAUDE_PROJECT_DIR}/.claude/logs/audit.log",
#     "encryption": "aes256",
#     "retention_days": 2555,
#     "sanitize_secrets": true,
#     "sanitize_pii": true
#   }
# }

set -euo pipefail

INPUT=$(cat)
LOG_DIR="${CLAUDE_PROJECT_DIR:-$(pwd)}/.claude/logs"
LOG_FILE="${LOG_DIR}/audit.log"
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%S.%3NZ")
UNIX_TIMESTAMP=$(date +%s)

# Create log directory with restricted permissions
mkdir -p "$LOG_DIR"
chmod 700 "$LOG_DIR"

# Extract JSON fields safely
TOOL_NAME=$(echo "$INPUT" | python3 -c "
import sys, json
try:
    d = json.load(sys.stdin)
    print(d.get('tool_name', 'unknown'))
except:
    print('unknown')
" 2>/dev/null || echo "unknown")

USER_ID="${UITKIT_USER:-$(git config user.email 2>/dev/null || echo 'unknown')}"
SESSION_ID="${UITKIT_SESSION_ID:-unknown}"
SESSION_COST="${UITKIT_SESSION_COST:-0.0}"

# Sanitize input: remove secrets and PII
SANITIZED_INPUT=$(echo "$INPUT" | python3 << 'PYTHONEOF'
import sys, json, re

try:
    d = json.load(sys.stdin)
    tool_input = d.get('tool_input', {})

    # Pattern for secrets: api_key, password, secret, token, etc.
    secret_patterns = [
        r'(password|secret|token|api_key|api-key|apikey|auth_token|authorization)',
        r'(private_key|ssh_key|signing_key)',
        r'(aws_secret|azure_key|gcp_key)',
    ]

    # Pattern for PII
    pii_patterns = [
        (r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', '[PII:EMAIL]'),
        (r'\b\d{3}[- ]?\d{3}[- ]?\d{4}\b', '[PII:PHONE]'),
        (r'\b\d{3}-\d{2}-\d{4}\b', '[PII:SSN]'),
        (r'\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b', '[PII:CARD]'),
    ]

    # Redact secrets
    input_str = json.dumps(tool_input)
    for pattern in secret_patterns:
        input_str = re.sub(pattern + r'["\']?\s*[:=]\s*["\']?[^"\s,}]+',
                          r'\1=[REDACTED]', input_str, flags=re.IGNORECASE)

    # Redact PII
    for pii_pattern, replacement in pii_patterns:
        input_str = re.sub(pii_pattern, replacement, input_str)

    print(input_str)
except:
    print('{}')
PYTHONEOF
)

# Check for PII in input
PII_DETECTED="false"
if echo "$SANITIZED_INPUT" | grep -qE "\[PII:"; then
    PII_DETECTED="true"
fi

# Build JSONL record
AUDIT_RECORD=$(python3 << PYTHONEOF
import json, sys
from datetime import datetime

record = {
    "timestamp": "$TIMESTAMP",
    "session_id": "$SESSION_ID",
    "user_id": "$USER_ID",
    "session_cost_usd": float("$SESSION_COST"),
    "event_type": "tool_call",
    "tool_name": "$TOOL_NAME",
    "tool_input": json.loads('$SANITIZED_INPUT' or '{}'),
    "duration_ms": 0,
    "compliance_flags": {
        "pii_detected": $PII_DETECTED,
        "cost_limit_exceeded": False,
        "rbac_violation": False,
        "rate_limited": False
    },
    "metadata": {
        "unix_timestamp": $UNIX_TIMESTAMP
    }
}

print(json.dumps(record))
PYTHONEOF
)

# Append to log (atomic write)
echo "$AUDIT_RECORD" >> "$LOG_FILE"

# Rotate log if > 100MB
LOG_SIZE=$(stat -f%z "$LOG_FILE" 2>/dev/null || stat -c%s "$LOG_FILE" 2>/dev/null || echo 0)
if [ "$LOG_SIZE" -gt 104857600 ]; then
    ROTATED_FILE="${LOG_FILE}.$(date +%s)"
    mv "$LOG_FILE" "$ROTATED_FILE"
    # Optional: compress and archive
    gzip "$ROTATED_FILE" &
fi

exit 0
