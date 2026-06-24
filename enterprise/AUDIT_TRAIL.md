# Audit Trail & Session Logging

Enterprise Edition captures a complete audit trail of all Claude Code actions for compliance, debugging, and forensics. This document specifies the schema, setup, and querying patterns.

## Overview

Every tool call, model decision, and session event is logged to a structured JSONL file (`.claude/logs/audit.log`) with encryption at rest on Enterprise Cloud deployments.

## Audit Log Schema

Each line is a valid JSON object with these fields:

```json
{
  "timestamp": "2026-06-15T14:23:45.123456Z",
  "session_id": "sess_abc123def456",
  "user_id": "user@company.com",
  "session_cost_usd": 0.042,
  "event_type": "tool_call",
  "tool_name": "Bash",
  "tool_input": {
    "command": "git status"
  },
  "tool_output": {
    "exit_code": 0,
    "stdout": "On branch main"
  },
  "duration_ms": 145,
  "context": {
    "branch": "main",
    "working_dir": "/Users/tushar/Desktop/UitKit",
    "model": "claude-haiku-4-5-20251001",
    "temperature": 1.0,
    "max_tokens": 1024
  },
  "compliance_flags": {
    "pii_detected": false,
    "cost_limit_exceeded": false,
    "rbac_violation": false,
    "rate_limited": false
  },
  "metadata": {
    "task_id": "task_xyz",
    "workflow_name": "security-review"
  }
}
```

### Field Definitions

| Field | Type | Description |
|-------|------|-------------|
| `timestamp` | ISO 8601 | UTC timestamp of event |
| `session_id` | string | Unique per Claude Code session |
| `user_id` | string | Logged-in user (from git config or $USER) |
| `session_cost_usd` | number | Cumulative session cost in USD |
| `event_type` | enum | `tool_call`, `model_call`, `session_start`, `session_end`, `error` |
| `tool_name` | string | Tool invoked: `Bash`, `Read`, `Write`, `Edit`, `Bash`, etc. |
| `tool_input` | object | Sanitized input (secrets removed) |
| `tool_output` | object | Output summary (first 1KB, sensitive data masked) |
| `duration_ms` | number | Wall-clock time for tool execution |
| `context.branch` | string | Current git branch |
| `context.working_dir` | string | Absolute working directory |
| `context.model` | string | Claude model identifier |
| `compliance_flags` | object | Boolean flags for compliance violations |
| `metadata` | object | Optional task ID, workflow name, tags |

## Sanitization Rules

To prevent accidental secret leakage:

1. **Secrets are removed**: API keys, passwords, tokens matching `(password|secret|token|key|api_key)` are redacted as `[REDACTED]`
2. **PII is masked**: Email addresses, phone numbers, SSNs become `[PII:EMAIL]`, `[PII:PHONE]`, etc.
3. **Command output is truncated**: Only first 1000 characters logged
4. **Filepaths are preserved**: Full paths logged for accountability (use .gitignore to exclude private dirs)

## Enabling Audit Logging

Add the audit-logger hook to your `settings.json`:

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
  }
}
```

Also configure the audit log location (default: `.claude/logs/audit.log`):

```bash
mkdir -p .claude/logs
echo ".claude/logs/" >> .gitignore
chmod 600 .claude/logs/audit.log  # Restrict read permissions
```

## Session Reconstruction

To rebuild a session from audit logs:

```bash
# Count tool calls
jq -s 'length' .claude/logs/audit.log

# Filter by tool type
jq 'select(.tool_name == "Bash")' .claude/logs/audit.log

# Export session timeline
jq '[.[] | {time: .timestamp, tool: .tool_name, cost: .session_cost_usd}]' .claude/logs/audit.log

# Find errors
jq 'select(.event_type == "error")' .claude/logs/audit.log

# Total session cost
jq '.[-1].session_cost_usd' .claude/logs/audit.log
```

## Compliance Queries

### GDPR Data Requests
Retrieve all actions by a user within a date range:
```bash
jq --arg user "user@company.com" --arg start "2026-06-01" --arg end "2026-06-30" \
  'select(.user_id == $user and .timestamp >= $start and .timestamp <= $end)' \
  .claude/logs/audit.log | jq -s > gdpr-request-$user.jsonl
```

### SOC 2 Type II Change Log
Export all file writes for change management audit:
```bash
jq 'select(.tool_name == "Write" or .tool_name == "Edit") | 
    {timestamp, user_id, file_path: .tool_input.file_path, action: .tool_name}' \
  .claude/logs/audit.log > soc2-changes.jsonl
```

### Cost Attribution
Sum costs by user:
```bash
jq 'select(.event_type == "session_end") | {user_id, cost: .session_cost_usd}' \
  .claude/logs/audit.log | jq -s 'group_by(.user_id) | map({user: .[0].user_id, total_cost: map(.cost) | add})'
```

## Encryption (Enterprise Cloud)

On UitKit Cloud:
- Audit logs are **encrypted at rest** with AES-256-GCM
- **In transit**: TLS 1.3, mutual authentication
- **Retention**: 7 years (configurable per compliance requirement)
- **Access**: Role-based, audit trail of audit log access itself

## Integration Points

### SIEM Integration
Export to Splunk, DataDog, or ELK:

```bash
# Ship to Splunk HTTP Event Collector
jq -Rs 'split("\n") | .[]' .claude/logs/audit.log | \
  while read line; do
    curl -X POST https://splunk.company.com:8088/services/collector \
      -H "Authorization: Splunk $SPLUNK_HEC_TOKEN" \
      -d "{\"event\": $line}"
  done
```

### Webhook Notifications
Post high-risk events (e.g., PII detected, cost exceeded) to Slack:

```bash
jq 'select(.compliance_flags.pii_detected == true or .compliance_flags.cost_limit_exceeded == true)' \
  .claude/logs/audit.log | \
  jq -Rs "curl -X POST $SLACK_WEBHOOK -H 'Content-Type: application/json' -d '{\"text\": \"Compliance alert: \(.)\"}'"
```

## Log Rotation

For long-running sessions, rotate daily:

```bash
# cron: 0 0 * * *
TIMESTAMP=$(date +%Y%m%d)
mv .claude/logs/audit.log .claude/logs/audit-${TIMESTAMP}.log.gz
gzip .claude/logs/audit-${TIMESTAMP}.log
# Archive to S3, Glacier, etc.
```

## Compliance Notes

- **HIPAA**: Audit logs satisfy "audit trail" requirement under 45 CFR §164.312(b)
- **SOC 2 Type II**: Supports CC6.1, CC7.1 (monitoring and logging controls)
- **GDPR**: Log retention aligns with data retention policies
- **PCI-DSS**: 3.2.1 compliant (restrictive access, encryption)

---

**Last updated**: 2026-06-15  
**Related files**: `SSO_SETUP.md`, `COMPLIANCE.md`
