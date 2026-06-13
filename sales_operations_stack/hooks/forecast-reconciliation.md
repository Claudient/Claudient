# Forecast Reconciliation Hook

## What This Hook Does

Weekly check that reconciles rep-submitted forecast vs. actual pipeline sum (Commit + Best Case stages). Flags >25% variance; escalates to manager for revalidation.

## Settings.json Entry

```json
{
  "hooks": {
    "Scheduled": [
      {
        "time": "0 10 * * 1",
        "hooks": [
          {
            "type": "command",
            "command": "bash .claude/hooks/forecast-reconciliation.sh"
          }
        ]
      }
    ]
  }
}
```

## Hook Script: forecast-reconciliation.sh

```bash
#!/bin/bash
# Forecast Reconciliation Hook for Sales Operations Stack
# Weekly (Monday 10am) check: compares rep forecast vs. pipeline sum
# Flags >25% variance for manager review

VARIANCE_THRESHOLD=0.25  # 25% variance triggers alert

echo "=== WEEKLY FORECAST RECONCILIATION ==="
echo "Date: $(date)"
echo ""
echo "Reconciling rep forecasts vs. pipeline (Commit + Best Case)..."
echo ""

# Placeholder: Production version would query CRM and forecast system
# Example alerts:
# echo "⚠️  Mike T: Forecast $225K | Pipeline $155K | Variance: -31% (ESCALATE)"
# echo "✓ Sarah K: Forecast $310K | Pipeline $295K | Variance: -5% (OK)"
# echo "⚠️  Jennifer L: Forecast $320K | Pipeline $335K | Variance: +5% (CONSERVATIVE)"

echo ""
echo "Run '/forecast-confidence-analyzer' for detailed accuracy analysis."
echo ""
```

## Behavior

**Weekly check (Monday 10am):** Compares forecast submissions vs. actual pipeline.

**Alert on >25% variance:** Flags reps for manager review.

**No blocking:** Informational; does not prevent actions.

## Setup Instructions

1. Create `.claude/hooks/` directory:
   ```bash
   mkdir -p .claude/hooks
   ```

2. Save the script above as `.claude/hooks/forecast-reconciliation.sh`

3. Make executable:
   ```bash
   chmod +x .claude/hooks/forecast-reconciliation.sh
   ```

4. Add settings.json entry to `.claude/settings.json` or `.claude/settings.local.json`

5. Customize script with your CRM query logic

6. Restart Claude Code

---

## Production Implementation Notes

Connect to your CRM to:
- Query rep forecast submissions (from forecast system or spreadsheet)
- Sum actual pipeline by rep in Commit + Best Case stages
- Calculate variance: |Submitted − Actual| / Actual
- Alert if >25% variance
- Escalate to manager for revalidation

Example CRM query structure:
```bash
FORECAST=$(curl -s "https://crm.example.com/v1/reps/forecasts?date=$(date +%Y-%m-%d)")
PIPELINE=$(curl -s "https://crm.example.com/v1/opportunities?stage=commit,bestcase")
```

---

Built with [Claudient](https://github.com/Claudient/Claudient)
