# Hook: Cost Cap Enforcer

Monitors and enforces session cost limits to prevent runaway spending. Blocks tool execution if the cumulative session cost exceeds the configured cap. Logs all cost updates for billing and FinOps tracking.

## Events
`PreToolUse` — fires before tool call (blocking check)  
`PostToolUse` — fires after tool call (cost accumulation)

## settings.json entry

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/cost-cap-enforcer.sh pre",
            "async": false
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/cost-cap-enforcer.sh post",
            "async": true
          }
        ]
      }
    ]
  },
  "cost_control": {
    "enabled": true,
    "session_cap_usd": 10.0,
    "alert_threshold_usd": 8.0,
    "hard_stop_at_cap": true,
    "log_file": "${CLAUDE_PROJECT_DIR}/.claude/logs/cost.log"
  }
}
```

## What it does

### Pre-Tool Phase

Before each tool call, checks if session cost is at or over the cap:

- If **cost >= cap** and `hard_stop_at_cap: true`:
  - ❌ **BLOCK** the tool call with error message
  - User must increase cap or start new session
- If **cost >= alert_threshold** (80% of cap):
  - ⚠️ **WARN** the user (sent once per session)
  - Allow tool to proceed

### Post-Tool Phase

After each tool executes, accumulates cost:

- Estimate cost based on tool type (Bash = $0.002, Read = $0.001, WebFetch = $0.005, etc.)
- Update `.claude/.cost-state` JSON file with running total
- Log to `.claude/logs/cost.log` for audit and FinOps

Example pre-execution block:

```
ERROR: Session cost limit exceeded
Current session cost: $10.50
Session cap: $10.00

This tool call is blocked by cost enforcement.
Options:
  1. Increase UITKIT_SESSION_CAP in environment
  2. Start a new session
  3. Contact your account manager for higher limits
```

Example warning:

```
WARNING: Approaching session cost limit
Current: $8.25 (82.5% of $10.00)
```

## Cost Model

Current cost estimation (can be replaced with actual API pricing):

| Tool | Cost (USD) |
|------|-----------|
| Bash | $0.002 |
| Read | $0.001 |
| Write | $0.001 |
| Edit | $0.001 |
| WebFetch / WebSearch | $0.005 |
| NotebookEdit | $0.003 |
| Other | $0.001 |

In production with UitKit Cloud, actual costs from Claude API would be used.

## Setup

```bash
cp hooks/cost-cap-enforcer.sh .claude/hooks/
chmod +x .claude/hooks/cost-cap-enforcer.sh
mkdir -p .claude/logs
echo ".claude/logs/" >> .gitignore
```

## Configuration

Set via environment variables or settings.json:

```bash
# Environment variables (session-specific)
export UITKIT_SESSION_CAP=25.0          # Cap at $25
export UITKIT_ALERT_THRESHOLD=20.0      # Warn at $20 (80%)
export UITKIT_HARD_STOP=true            # Block when cap reached

# Or in settings.json (project-wide)
{
  "cost_control": {
    "session_cap_usd": 10.0,
    "alert_threshold_usd": 8.0,
    "hard_stop_at_cap": true
  }
}
```

## Query Examples

View cost log:

```bash
cat .claude/logs/cost.log
```

Cost timeline:

```bash
grep "COST UPDATE" .claude/logs/cost.log
```

Current session cost:

```bash
jq '.total_cost_usd' .claude/.cost-state
```

Cost by tool type:

```bash
grep "COST UPDATE" .claude/logs/cost.log | awk '{print $8}' | sort | uniq -c
```

## Team Budget Management

For UitKit Cloud deployments, set team budgets in settings.json:

```json
{
  "teams": {
    "platform-team": {
      "members": ["alice@company.com", "bob@company.com"],
      "monthly_budget_usd": 500
    },
    "data-team": {
      "members": ["carol@company.com"],
      "monthly_budget_usd": 1000
    }
  }
}
```

Then cost-cap-enforcer will:
1. Check personal session cap (default: $10)
2. Check team monthly cap (accumulated across team members' sessions)
3. Block if either is exceeded

## Compliance Benefits

- **Runaway cost prevention**: Never spend more than intended on a session
- **Team budget tracking**: FinOps teams can monitor cost attribution
- **Audit trail**: All cost decisions logged for SOX/compliance review
- **Forecasting**: Historical cost data enables session budget planning

## Advanced: Custom Pricing

To integrate with your actual Claude API pricing:

Create a `cost-pricer.py` that returns JSON:

```python
#!/usr/bin/env python3
import sys, json

tool_name = sys.argv[1]  # "Bash", "Read", etc.

pricing = {
    "Bash": 0.002,
    "Read": 0.001,
    "Write": 0.003,
    "WebFetch": 0.01,
    # ... custom rates
}

print(json.dumps({"cost_usd": pricing.get(tool_name, 0.001)}))
```

Then modify the script to call: `TOOL_COST=$(python3 cost-pricer.py $TOOL_NAME)`

---
