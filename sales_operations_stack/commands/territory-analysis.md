---
description: Quarterly territory review analyzing quota fairness, account distribution, revenue concentration, coverage gaps, and realignment recommendations. Ensures balanced workload and growth potential.
---

# /territory-analysis

## What This Does

Runs the territory-optimizer skill to assess territory design and fairness. Analyzes account distribution, quota balance, revenue concentration risk, and identifies realignment opportunities.

## Steps Claude Follows

1. Ask for: Territory assignments (rep names, assigned accounts, account ARR/potential, assigned quotas)
2. Ask for: Recent closed deals and pipeline (to assess revenue potential accuracy)
3. Calculate territory balance scorecard: quota fairness, revenue potential, account count, concentration risk
4. Identify coverage gaps (uncovered accounts, geographic gaps, industry gaps)
5. Assess concentration risk for each territory (top 5 accounts as % of revenue)
6. Analyze new business vs. expansion pipeline mix by territory
7. Identify fairness issues (quota >130% of territory potential, or <70%)
8. Propose specific rebalancing actions (account moves, new territory, quota adjustments)
9. Compile implementation timeline and change management notes
10. Return recommendations with expected impact

## Output Format

- **Territory Balance Scorecard:** Table with quota, potential, account count, concentration
- **Fairness Assessment:** Variance metrics; flag if >15% imbalance
- **Coverage Gaps:** List of uncovered accounts, geographic gaps, industry opportunities
- **Concentration Risk Analysis:** High-risk territories with mitigation strategy
- **Rebalancing Recommendations:** Specific account moves + rationale + expected impact
- **Implementation Timeline:** Week-by-week plan for territory transitions
- **Change Management Notes:** How to message to reps

## Usage

```
/territory-analysis
```

Then provide:
- Territory assignments (CSV or list)
- Account data (account names, ARR, assigned reps)
- Quota targets by rep
- Optional: Historical closed-deal data (to validate territory potential)

## Typical Run Time

~15 minutes from data provision to recommendations.

---

Built with [Claudient](https://github.com/Claudient/Claudient)
