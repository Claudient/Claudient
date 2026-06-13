# Deal Approval Gate Hook

## What This Hook Does

Blocks CRM writes for deals exceeding $50K value without explicit approval authority confirmation and risk assessment sign-off. Prevents deals from closing without proper governance.

## Settings.json Entry

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write.*crm|Write.*pipeline",
        "hooks": [
          {
            "type": "command",
            "command": "bash .claude/hooks/deal-approval-gate.sh"
          }
        ]
      }
    ]
  }
}
```

## Hook Script: deal-approval-gate.sh

```bash
#!/bin/bash
# Deal Approval Gate for Sales Operations Stack
# Blocks CRM writes for deals >$50K without approval confirmation
# Exit 1 if gate blocked, 0 to allow

APPROVAL_THRESHOLD=50000

# Parse deal value from tool output (expected: JSON with deal_value field)
DEAL_VALUE=$(echo "$CLAUDE_TOOL_OUTPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('deal_value',0))" 2>/dev/null)

# If deal value missing or <threshold, allow (low-risk)
if [ -z "$DEAL_VALUE" ] || [ $(echo "$DEAL_VALUE < $APPROVAL_THRESHOLD" | bc) -eq 1 ]; then
  exit 0
fi

# Check for approval flag in tool output
APPROVAL=$(echo "$CLAUDE_TOOL_OUTPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('approval_authority',''))" 2>/dev/null)

if [ -z "$APPROVAL" ] || [ "$APPROVAL" != "APPROVED" ]; then
  echo "❌ DEAL APPROVAL GATE: Deal value \$$DEAL_VALUE exceeds \$$APPROVAL_THRESHOLD threshold"
  echo ""
  echo "This deal requires explicit approval before CRM close."
  echo ""
  echo "Required: Sales VP/Director sign-off + risk assessment."
  echo "Add 'approval_authority: APPROVED' to deal record before close."
  exit 1
fi

exit 0
```

## Behavior

**On blocked deal:** Prints approval requirement notice. Prevents CRM write. Requires explicit approval_authority flag.

**On approved deal:** Silent — CRM write proceeds.

## Setup Instructions

1. Create `.claude/hooks/` directory in your project root:
   ```bash
   mkdir -p .claude/hooks
   ```

2. Save the script above as `.claude/hooks/deal-approval-gate.sh`

3. Make executable:
   ```bash
   chmod +x .claude/hooks/deal-approval-gate.sh
   ```

4. Add settings.json entry to `.claude/settings.json` or `.claude/settings.local.json`

5. Restart Claude Code for hook to activate

---

Built with [Claudient](https://github.com/Claudient/Claudient)
