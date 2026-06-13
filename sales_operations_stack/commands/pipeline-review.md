---
description: Comprehensive weekly/monthly pipeline health report covering all 10 dimensions, at-risk deals, quota trajectory, and recovery actions. Output saved to reports/ directory.
---

# /pipeline-review

## What This Does

Runs the pipeline-health-scorer skill to generate a complete pipeline assessment. Scores pipeline on 10 dimensions, identifies at-risk deals, forecasts quarter-end attainment, and surfaces priority recovery actions.

## Steps Claude Follows

1. Ask for: Sales data export (CSV or JSON with pipeline + closed deals from past 90 days)
2. Validate data: Check for orphaned records, stale deals, stage inflation
3. Run pipeline-health-scorer on full dimensions
4. Flag bottom 3 dimensions for priority focus
5. Identify deals with close probability <50% or age >45 days
6. Project quarter-end attainment by rep; flag quota misses
7. Generate risk matrix for top 10 at-risk deals
8. Compile recovery actions (owner, deadline, expected impact)
9. Save report to `reports/pipeline-{date}.md`
10. Display summary: Overall health score, critical findings, next review date

## Output Format

- **Overall Health Score:** X/100 with Red/Yellow/Green status
- **Dimension Breakdown:** Table with each dimension, score, target, status, trend
- **Critical Findings:** Top 2–3 findings with impact + recommended action
- **At-Risk Deals:** List of deals <50% close probability with recovery strategy
- **Quota Trajectory:** Rep-by-rep forecast with projection to quarter-end
- **Recovery Actions:** Prioritized list with owner, deadline, expected impact
- **Next Review Date:** Scheduled date or trigger

## Usage

```
/pipeline-review
```

Then provide:
- Sales data file (pipeline + closed deals, CSV or JSON)
- Current quarter information (Q2 2026, etc.)
- Any known market/team conditions (hiring, new competitor, etc.)

## Typical Run Time

~10–15 minutes from data provision to saved report.

---

Built with [Claudient](https://github.com/Claudient/Claudient)
