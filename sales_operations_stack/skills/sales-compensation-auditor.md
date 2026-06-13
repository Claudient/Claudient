---
name: sales-compensation-auditor
description: Validates sales commission calculations and compensation plan mechanics. Flags design gaps, forecasts commission impact of pipeline changes. Ensures plan fairness and risk mitigation.
allowed-tools: Read, Write
effort: high
---

## When to activate

Quarterly comp audits, after deal closes to verify commission accuracy, or when compensation plan changes. Use before announcing plan changes to reps.

## When NOT to use

Not for HR policy — coordinate with People Ops. Not for individual salary reviews — HR domain. Not for wholesale comp plan redesign — get leadership alignment first.

## Compensation Audit Framework

### 1. Commission Calculation Accuracy

Validate for each closed deal:
- Deal value matches CRM record
- Commission rate applied correctly (varies by tier/product/new vs. expansion)
- Quota credit allocated properly
- Accelerators/SPIFs applied correctly

### 2. Plan Mechanics Validation

Check for:
- Clear quota assignment to each rep
- Commission rates documented and applied consistently
- Accelerator thresholds clearly defined
- Clawback scenarios (if applicable)
- Cap/uncap rules (if any)

### 3. Fairness Analysis

Assess:
- Are comp ratios balanced (OTE / base ratio should be 50/50 to 70/30 typically)
- Do quota assignments fairly represent territory potential?
- Are accelerators achievable or unrealistic?
- Any unintended incentive misalignments?

### 4. Risk Identification

Flag:
- Comp liabilities (committed but unpaid commissions)
- Disputed commission calculations
- Plan design creating negative behaviors (e.g., deal pushing into next period)

### 5. Impact Modeling

Forecast comp costs under various scenarios:
- Base case: Known pipeline + expected close rate
- Upside case: Pipeline +20%, higher win rate
- Downside case: Pipeline −15%, lower win rate

---

## Compensation Audit Report

```markdown
# Sales Compensation Audit — [Quarter] [Year]

**Date:** [Date]  
**Scope:** [Sales team / region / rep]

---

## Calculation Accuracy Review

| Rep | # Deals Reviewed | Calculation Errors | Error Rate | Status |
|-----|------------------|------------------|-----------|--------|
| [Rep] | [X] | [X] | [%] | [Green/Red] |

---

## Plan Mechanics Validation

- Quota assignments: [✓ / ✗]
- Commission rates applied consistently: [✓ / ✗]
- Accelerator thresholds clear: [✓ / ✗]
- Clawback policies documented: [✓ / ✗]

---

## Fairness Analysis

- OTE composition breakdown: [X]% base / [X]% variable (healthy: 50/50 to 70/30)
- Quota fairness vs. territory potential: [Analysis]
- Accelerator achievability: [Analysis]
- Unintended incentive risks: [Analysis]

---

## Comp Liability & Risk

- Outstanding commissions (earned, not yet paid): $[X]
- Disputed calculations: [List]
- Plan design risks: [List]

---

## Impact Modeling

| Scenario | Pipeline | Close Rate | Projected Comp Cost | Notes |
|----------|----------|-----------|-------------------|-------|
| Base Case | $[X] | [%] | $[X] | Known pipeline, historical close rate |
| Upside | $[X] | [%] | $[X] | +20% pipeline, higher win rate |
| Downside | $[X] | [%] | $[X] | −15% pipeline, lower win rate |

---

## Recommendations

1. [Action] — Impact: [Impact].
2. [Action] — Impact: [Impact].

---

## Next Comp Review Date

[Date]
```

---

## Example

# Sales Compensation Audit — Q2 2026

**Date:** 2026-06-12  
**Scope:** Enterprise Sales Team (4 reps)

---

## Calculation Accuracy Review

| Rep | # Deals Reviewed | Calculation Errors | Error Rate | Status |
|-----|------------------|------------------|-----------|--------|
| Sarah K | 8 | 0 | 0% | Green |
| Mike T | 5 | 1 | 20% | Red |
| David M | 7 | 0 | 0% | Green |
| Jennifer L | 9 | 0 | 0% | Green |

**Finding:** Mike's error: CloudInc deal ($125K) was calculated as expansion rate (12%) instead of new business rate (15%). **Under-paid by $375.** Recommend manual comp adjustment + retraining on deal classification.

---

## Plan Mechanics Validation

- Quota assignments: ✓ (Documented in CRM, sync'd to payroll)
- Commission rates applied consistently: ✗ (Expansion vs. new business rates not always clear from deal tagging)
- Accelerator thresholds clear: ✓ (110%+ = 1.5x multiplier on overages)
- Clawback policies documented: ✗ (No formal clawback policy; recommend adding for >90-day extended close dates)

---

## Fairness Analysis

**OTE Composition:**
- Sarah K: $150K base + $150K target variable = 50/50 (Healthy)
- Mike T: $150K base + $150K target variable = 50/50 (Healthy)
- David M: $175K base + $150K target variable = 54/46 (Healthy — reflects seniority)
- Jennifer L: $155K base + $155K target variable = 50/50 (Healthy)

**Quota Fairness vs. Territory Potential:** (See territory-optimizer report) Mike's territory is 70% of quota — compensation plan is creating perverse incentive. Rep is being held to $300K quota with only $210K territory potential. Recommend quota adjustment to $225K to align with territory.

**Accelerator Achievability:** 110% accelerator threshold is reasonable. Current projections: Sarah at 101%, Mike at 71%, David at 91%, Jennifer at 101%. Good distribution — not setting reps up for failure.

**Unintended Incentive Risks:**
- New business rates (15%) > expansion rates (12%). Incentives are pushing reps away from existing account growth. Recommend increasing expansion rate to 13–14%.
- Cliff at period end: No partial-month credit for deals signed 30+ days into next month. Creates incentive to push deals into current quarter even if buyer not ready. Recommend implementing 50% credit for next-month closes.

---

## Comp Liability & Risk

**Outstanding Commissions (Earned, Unpaid):**
- Sarah K: $18K (from May closes, paying in June)
- Mike T: $10.5K (from May closes)
- David M: $15.2K (from May closes)
- Jennifer L: $20.1K (from May closes)
- **Total:** $63.8K (normal, 1-month lag is acceptable)

**Disputed Calculations:**
- Mike T CloudInc deal: $375 under-pay (detailed above; recommend manual adjustment)

**Plan Design Risks:**
- Clawback policy absent: If rep leaves mid-month after commission-generating close, unclear if commission is vested. Recommend: All commissions vested on deal close date.
- New business vs. expansion tagging inconsistent: Leading to classification errors. Recommend: Auto-tag in CRM based on account age (existing = expansion, new = new business).

---

## Impact Modeling

| Scenario | Pipeline | Close Rate | Projected Comp Cost | Notes |
|----------|----------|-----------|-------------------|-------|
| Base Case | $830K | 58% | $180K | Known pipeline, team historical close rate (58%) |
| Upside (+20% pipeline, +5% close rate) | $996K | 63% | $218K | Strong execution; pipeline growth |
| Downside (−15% pipeline, −8% close rate) | $705K | 50% | $142K | Market softening; deal stalls |

**Quarterly comp cost budgeted at:** $200K. Current trajectory: $180K (base case) is within budget. Upside scenario ($218K) would exceed budget by $18K — flag to finance if pipeline accelerates.

---

## Recommendations

1. **Increase Expansion Commission Rate to 13%**
   - Current: 12% (new business 15%)
   - Rationale: Current spread incentivizes new logo chasing over profitable expansion. Closing spread to 2% points encourages existing account growth.
   - Impact: ~$8K additional comp cost/quarter, but better account retention + expansion focus.

2. **Implement 50% Credit for Next-Period Closes**
   - Rationale: Eliminates artificial quarter-end pressure. Rep gets credit in period deal closes, plus 50% in signing period.
   - Impact: Reduces perverse incentive to rush unprepared deals.

3. **Auto-Tag New vs. Expansion in CRM**
   - Rule: Account created >12 months ago = expansion. Account created <12 months = new business.
   - Rationale: Eliminates manual classification errors (current error rate: 20% for Mike T).
   - Impact: Improves accuracy; reduces disputes.

4. **Adjust Mike T's Quota to $225K**
   - Rationale: Territory potential is only $210K; current $300K quota is demoralizing and driving poor behaviors.
   - Impact: Aligns comp incentives with territory reality; likely improves close rate and rep morale.

5. **Formalize Clawback Policy**
   - Recommend: All commissions vested on deal close date (no clawback if rep departs).
   - Rationale: Clarity reduces disputes; fair to reps.

---

## Next Comp Review Date

Q3 2026 (September) — or trigger on: Comp plan change, new rep onboarding

---

Built with [Claudient](https://github.com/Claudient/Claudient)
