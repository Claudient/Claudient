# Deal Stall Detector Hook

## What This Hook Does

Daily monitoring hook that identifies deals unchanged in CRM for 30+ days. Flags as stalled; suggests re-engagement or closeout plan. Prevents pipeline inflation from dead deals.

## Settings.json Entry

```json
{
  "hooks": {
    "Scheduled": [
      {
        "time": "0 8 * * *",
        "hooks": [
          {
            "type": "command",
            "command": "bash .claude/hooks/deal-stall-detector.sh"
          }
        ]
      }
    ]
  }
}
```

## Hook Script: deal-stall-detector.sh

```bash
#!/bin/bash
# Deal Stall Detector Hook for Sales Operations Stack
# Daily check: identifies deals unchanged >30 days in CRM
# Flags for re-engagement or closeout

STALL_THRESHOLD_DAYS=30

echo "=== DAILY DEAL STALL DETECTION ==="
echo "Date: $(date)"
echo ""
echo "Scanning pipeline for stalled deals (no activity >$STALL_THRESHOLD_DAYS days)..."
echo ""

# Placeholder: Production version would query CRM for deals unchanged >30 days
# Example alerts:
# echo "⚠️  STALLED: Vertex Systems (David M) — 54 days, Qualification stage"
# echo "⚠️  STALLED: TechFlow Pilot (Mike T) — 38 days, Proposal stage"
# echo "⚠️  STALLED: CloudInc Platform (Jennifer L) — 31 days, Discovery stage"

echo ""
echo "Recovery action required: Re-engage buyer or close out deal."
echo "Run '/deal-deep-dive [deal-name]' for recovery strategy."
echo ""
```

## Behavior

**Daily check (8am):** Scans for deals with no activity >30 days.

**Alert on stall:** Flags deal with age + stage.

**No blocking:** Informational; does not prevent actions.

## Setup Instructions

1. Create `.claude/hooks/` directory:
   ```bash
   mkdir -p .claude/hooks
   ```

2. Save the script above as `.claude/hooks/deal-stall-detector.sh`

3. Make executable:
   ```bash
   chmod +x .claude/hooks/deal-stall-detector.sh
   ```

4. Add settings.json entry to `.claude/settings.json` or `.claude/settings.local.json`

5. Customize script with your CRM query logic

6. Restart Claude Code

---

## Production Implementation Notes

Query your CRM for:
- Deals with last_activity_date < (today − 30 days)
- Deal name, rep, stage, value, days since last update
- Alert reps + managers for re-engagement
- Flag for closeout if no re-engagement within 7 days

Example CRM query:
```bash
STALLED=$(curl -s "https://crm.example.com/v1/opportunities" \
  -H "Authorization: Bearer $API_KEY" \
  -d "filter=last_activity < $(date -d '30 days ago' +%s)")
```

---

Built with [Claudient](https://github.com/Claudient/Claudient)
