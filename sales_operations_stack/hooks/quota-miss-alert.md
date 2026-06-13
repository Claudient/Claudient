# Quota Miss Alert Hook

## What This Hook Does

Daily monitoring hook that flags reps trending >20% below pro-rata quota target with early warning and suggested immediate actions. Alerts before quarter-end scramble.

## Settings.json Entry

```json
{
  "hooks": {
    "Scheduled": [
      {
        "time": "0 9 * * 1-5",
        "hooks": [
          {
            "type": "command",
            "command": "bash .claude/hooks/quota-miss-alert.sh"
          }
        ]
      }
    ]
  }
}
```

## Hook Script: quota-miss-alert.sh

```bash
#!/bin/bash
# Quota Miss Alert Hook for Sales Operations Stack
# Daily (weekday 9am) check: flags reps >20% below pro-rata quota
# Sends alert to STDOUT; no exit code required (informational hook)

ALERT_THRESHOLD=0.80  # 80% = 20% below target

# This script assumes you have a pipeline data file or API endpoint
# Example: Read from local CSV or query CRM API

# Placeholder: In production, fetch latest pipeline data
# For now, this is a template that sales ops would customize

echo "=== QUOTA MISS ALERT CHECK ==="
echo "Date: $(date)"
echo ""
echo "Checking for reps trending >20% below pro-rata quota..."
echo ""

# Example output (replace with actual CRM data):
# echo "⚠️  ALERT: Mike T trending at 64% of quota (needs $95K to hit 90%)"
# echo "⚠️  ALERT: David M trending at 80% of quota (borderline; needs $30K more)"
echo ""
echo "Run '/quota-tracker' for detailed analysis and recovery actions."
echo ""
```

## Behavior

**Daily check (weekday 9am):** Alerts on any rep trending >20% below pro-rata quota.

**No blocking:** This is informational; does not prevent any action.

## Setup Instructions

1. Create `.claude/hooks/` directory:
   ```bash
   mkdir -p .claude/hooks
   ```

2. Save the script above as `.claude/hooks/quota-miss-alert.sh`

3. Make executable:
   ```bash
   chmod +x .claude/hooks/quota-miss-alert.sh
   ```

4. Add settings.json entry to `.claude/settings.json` or `.claude/settings.local.json`

5. Customize script with your CRM API call or local data file path

6. Restart Claude Code

---

## Production Implementation Notes

In a real deployment, this hook would:
- Query your CRM API (Salesforce, HubSpot, etc.) daily
- Calculate pro-rata quota targets for current date
- Flag reps missing targets
- Send alert to Slack, email, or dashboard

Example API call (customize for your CRM):
```bash
REPS=$(curl -s "https://api.salesforce.com/v1/rep-quota?date=$(date +%Y-%m-%d)" \
  -H "Authorization: Bearer $SF_API_KEY")
```

---

Built with [Claudient](https://github.com/Claudient/Claudient)
