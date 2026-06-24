# Hook: Enterprise Audit Logger

Records all tool calls with full metadata for compliance, security audits, and forensics. Sanitizes secrets and detects PII patterns automatically.

## Event
`PostToolUse` — fires after every tool call completes

## settings.json entry

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/audit-logger.sh",
            "async": true
          }
        ]
      }
    ]
  },
  "audit": {
    "enabled": true,
    "log_file": "${CLAUDE_PROJECT_DIR}/.claude/logs/audit.log",
    "encryption": "aes256",
    "retention_days": 2555,
    "sanitize_secrets": true,
    "sanitize_pii": true
  }
}
```

## What it does

Appends a JSON line to `.claude/logs/audit.log` for every tool call with:

- **Timestamp** (ISO 8601 UTC)
- **Session ID** and user email
- **Tool name** and sanitized input
- **Session cost** (cumulative USD)
- **Compliance flags**: PII detected, cost limit exceeded, RBAC violation
- **Metadata**: git branch, working directory, model, temperature

Example record:

```json
{
  "timestamp": "2026-06-15T14:23:45.123Z",
  "session_id": "sess_abc123",
  "user_id": "alice@company.com",
  "session_cost_usd": 0.042,
  "event_type": "tool_call",
  "tool_name": "Bash",
  "tool_input": {"command": "git status"},
  "duration_ms": 145,
  "compliance_flags": {
    "pii_detected": false,
    "cost_limit_exceeded": false,
    "rbac_violation": false,
    "rate_limited": false
  },
  "metadata": {
    "unix_timestamp": 1718456625
  }
}
```

## Features

- **Automatic sanitization**: Removes secrets matching `password|secret|token|api_key|aws_secret|private_key` patterns
- **PII detection**: Masks emails, phone numbers, SSNs, credit cards
- **Log rotation**: Automatically rotates logs when they exceed 100MB
- **Restricted permissions**: Log directory created with `chmod 700` (owner-only)
- **Minimal overhead**: Async hook doesn't block Claude Code execution
- **Timestamping**: Captures both ISO 8601 and Unix timestamps

## Setup

```bash
cp hooks/audit-logger.sh .claude/hooks/
chmod +x .claude/hooks/audit-logger.sh
mkdir -p .claude/logs
chmod 700 .claude/logs
echo ".claude/logs/" >> .gitignore
```

## Query Examples

See `enterprise/AUDIT_TRAIL.md` for detailed querying, SIEM integration, and compliance examples.

**Count tool calls**:
```bash
jq -s 'length' .claude/logs/audit.log
```

**Find errors**:
```bash
jq 'select(.compliance_flags.pii_detected == true)' .claude/logs/audit.log
```

**Total session cost**:
```bash
jq '.[-1].session_cost_usd' .claude/logs/audit.log
```

## Compliance Support

- **SOC 2 Type II**: Satisfies CC7.1 (system monitoring)
- **HIPAA**: Audit trail for healthcare deployments
- **GDPR**: User activity log for data subject access requests
- **GDPR right to erasure**: Can delete logs for specific user/date range

## Environment Variables

Set at session start to customize behavior:

- `UITKIT_USER` — override user email (default: git config user.email)
- `UITKIT_SESSION_ID` — provide custom session ID (default: auto-generated)
- `UITKIT_SESSION_COST` — track cumulative cost

---
