---
name: forecast-confidence-analyzer
description: Assesses forecast accuracy at rep, territory, and business unit level. Identifies rep bias patterns (optimism, sandbagging). Adjusts forecast confidence for exec visibility.
allowed-tools: Read, Write
effort: medium
---

## When to activate

Monthly before board/exec updates or quarterly earnings reviews. Use to adjust forecast confidence levels and identify reps with systematic bias.

## When NOT to use

Not for individual deal assessment — use deal-risk-analyzer. Not for rep performance — use quota-tracker. Not for account research — use account-researcher.

## Forecast Confidence Framework

### Historical Accuracy Calculation

For each rep, track:
- **Submitted forecast:** Rep's stated close probability 30/60/90 days prior
- **Actual close:** Did deal close, or slip?
- **Variance:** |Submitted − Actual| / Actual

**Example:**
- Rep forecasts $500K at 90% confidence for Q2 close
- Actual Q2 closes: $380K
- Variance: −24% (rep overforecasted)

### Bias Patterns

Identify systematic patterns:

**Optimism Bias:** Rep consistently submits >actual by 20%+. Adjust forecast down by 20%.

**Sandbagging:** Rep consistently submits <actual by 15%+. Adjust forecast up by 15%.

**Accurate:** Rep variance <±10%. Use submitted forecast as-is.

### Confidence Scoring (by Stage)

Map deal stage to close probability:

- **Prospecting:** 10% close probability
- **Discovery:** 25% close probability
- **Proposal:** 50% close probability
- **Negotiation:** 75% close probability
- **Contract:** 90% close probability

Adjust per rep's historical accuracy.

---

## Forecast Confidence Report

```markdown
# Forecast Confidence Analysis — [Period]

**Date:** [Date]  
**Period:** [Quarter/Month]  
**Confidence Adjusted By:** [Name]

---

## Summary

| Rep | Submitted Forecast | Confidence Adjustment | Adjusted Forecast | Notes |
|-----|-------------------|----------------------|------------------|-------|
| [Rep] | $[X] | [X]% | $[X] | [Bias pattern] |

---

## Historical Accuracy Analysis

| Rep | Past 4 Forecasts | Avg Variance | Bias Pattern | Adjustment |
|-----|------------------|--------------|--------------|------------|
| [Rep] | [List] | [%] | [Pattern] | [Adjustment] |

---

## Forecast-vs-Pipeline Reconciliation

| Rep | Forecast | Pipeline (Commit + Best Case) | Variance | Flag |
|-----|----------|------|----------|------|
| [Rep] | $[X] | $[X] | [%] | [Green/Yellow/Red] |

---

## Adjusted Forecast by Stage

| Stage | Count | Sum Value | Stage Close % | Adjusted Contribution |
|-------|-------|-----------|----------------|----------------------|
| Prospecting | [X] | $[X] | 10% | $[X] |
| Discovery | [X] | $[X] | 25% | $[X] |
| Proposal | [X] | $[X] | 50% | $[X] |
| Negotiation | [X] | $[X] | 75% | $[X] |
| Contract | [X] | $[X] | 90% | $[X] |

**Total Adjusted Forecast:** $[X]

---

## Board/Exec Forecast Recommendation

**Submitted Forecast:** $[X]  
**Adjusted Forecast (Confidence-Applied):** $[X]  
**Conservative Forecast (Downside Case):** $[X]  
**Risk Factors:**

- [Risk 1]: [Impact on forecast]
- [Risk 2]: [Impact on forecast]

---

## Next Forecast Cycle Coaching

| Rep | Focus Area | Action |
|-----|-----------|--------|
| [Rep] | [Pattern] | [Coaching action] |
```

---

## Example

# Forecast Confidence Analysis — Q2 2026

**Date:** 2026-06-12  
**Period:** Q2 2026  
**Confidence Adjusted By:** Sales Operations

---

## Summary

| Rep | Submitted Forecast | Confidence Adjustment | Adjusted Forecast | Notes |
|-----|-------------------|----------------------|------------------|-------|
| Sarah K | 310K | +5% | 325K | Slight optimism; historically accurate |
| Mike T | 225K | −25% | 169K | Severe optimism bias; 4 consecutive misses |
| David M | 290K | −8% | 267K | Slight underestimation; conservative bias |
| Jennifer L | 320K | 0% | 320K | Very accurate; no adjustment needed |

---

## Historical Accuracy Analysis

| Rep | Past 4 Forecasts | Avg Variance | Bias Pattern | Adjustment |
|-----|------------------|--------------|--------------|------------|
| Sarah K | Q1: +8% / Q4: −2% / Q3: +5% / Q2: +3% | +3.5% | Slight optimism | +5% (average her optimism) |
| Mike T | Q1: +34% / Q4: +28% / Q3: +31% / Q2: +22% | +28.75% | **Severe optimism bias** | −25% (harsh but necessary) |
| David M | Q1: −5% / Q4: −8% / Q3: −6% / Q2: −10% | −7.25% | Conservative bias | −8% (apply her conservative pattern) |
| Jennifer L | Q1: +1% / Q4: −2% / Q3: +0% / Q2: +1% | +0% | **Highly accurate** | 0% (no adjustment) |

**Finding:** Mike's forecast is unreliable. Recommend: Tighter weekly forecast discipline, manual validation of his forecast starting next week.

---

## Forecast-vs-Pipeline Reconciliation

| Rep | Forecast | Pipeline (Commit + Best Case) | Variance | Flag |
|-----|----------|------|----------|------|
| Sarah K | 310K | 295K | −5% | Green |
| Mike T | 225K | 155K | −31% | Red |
| David M | 290K | 310K | +7% | Green |
| Jennifer L | 320K | 335K | +5% | Green |

**Mike T Critical Finding:** Forecast is $225K but his Commit + Best Case pipeline totals only $155K. Forecast exceeds available pipeline by $70K (45% shortfall). **This is unrealistic and signals deal inflation in forecast.** Recommend: Override his forecast to $155K (using stage-based probability).

---

## Adjusted Forecast by Stage

| Stage | Count | Sum Value | Stage Close % | Adjusted Contribution |
|-------|-------|-----------|----------------|----------------------|
| Prospecting | 8 | $95K | 10% | $9.5K |
| Discovery | 12 | $185K | 25% | $46.25K |
| Proposal | 18 | $425K | 50% | $212.5K |
| Negotiation | 15 | $380K | 75% | $285K |
| Contract | 6 | $190K | 90% | $171K |

**Total Adjusted Forecast:** $724.25K

---

## Board/Exec Forecast Recommendation

**Submitted Forecast:** $1,145K  
**Adjusted Forecast (Confidence-Applied):** $724K (−37% adjustment)  
**Conservative Forecast (Downside Case):** $615K (−15% from adjusted)  

**Key Insight:** Submitted forecast is optimistic due to Mike T's bias. Adjusted forecast reflects confidence calibration and stage-based probabilities. Conservative case accounts for deal slips in Proposal stage (historical 40% slip rate).

**Risk Factors:**

- **Mike T Forecast Reliability (−$70K impact):** His forecast exceeds available pipeline. Recommend conservative adjustment or 1:1 revalidation before board report.
- **Negotiation Stage Slippage (−$95K impact):** 15 deals in Negotiation; historical data shows 40% slip to next period. Factored into conservative case.
- **Deal Age (−$50K impact):** 8 deals >60 days in pipeline without stage progression. These are lower-probability carries.

---

## Next Forecast Cycle Coaching

| Rep | Focus Area | Action |
|-----|-----------|--------|
| Sarah K | Maintain accuracy | Recognize performance; use as mentor model |
| Mike T | Forecast discipline | 1:1 coaching on pipeline realism; weekly validation; consider pip if pattern continues |
| David M | Confidence in forecast | Encourage rep to forecast higher; she's historically conservative + hitting/exceeding targets |
| Jennifer L | Maintain excellence | Continue current practices; consider for forecasting oversight role |

---

Built with [Claudient](https://github.com/Claudient/Claudient)
