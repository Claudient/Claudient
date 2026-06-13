---
name: pipeline-health-scorer
description: Scores overall pipeline health across 10 dimensions. Identifies at-risk deals, quota shortfalls, and velocity issues. Returns health report with color-coded risk matrix and recovery actions.
allowed-tools: Read, WebFetch, Write
effort: medium
---

## When to activate

Weekly pipeline reviews, monthly board preparation, or on-demand when sales leadership requests visibility. Run this before any forecast or quota discussions. Requires access to CRM pipeline export (CSV or JSON).

## When NOT to use

Not for individual deal qualification — use deal-risk-analyzer for that. Not for account research — use GTM stack account-researcher. Not as a substitute for real-time CRM dashboard; use for periodic deep analysis and trend identification.

## Health Scoring Framework

Score pipeline on 10 dimensions. Each returns 0–100. Aggregate to overall health score.

### 1. Pipeline Coverage Ratio (25 points)

**Definition:** Total open pipeline value / annual quota target.

**Formula:** (Sum of all open opportunities) / Annual Quota Target

**Target Range:** 3.5x to 4.5x (industry standard: 3x to 5x)

**Scoring:**
- 5.0x or higher = 100 points (exceptional)
- 4.5x to 5.0x = 90 points (strong)
- 4.0x to 4.5x = 85 points (healthy)
- 3.5x to 4.0x = 75 points (adequate)
- 3.0x to 3.5x = 60 points (warning)
- 2.5x to 3.0x = 40 points (at risk)
- Below 2.5x = 20 points (critical)

### 2. Win Rate by Stage (20 points)

**Definition:** Closed-Won / (Closed-Won + Closed-Lost) by opportunity stage.

**Expected by Stage:**
- Discovery: 40–60%
- Qualification: 50–70%
- Proposal: 60–80%
- Negotiation: 70–90%
- Contract: 85–95%

**Scoring:**
- All stages within range = 100 points
- 1 stage outside range = 85 points
- 2 stages outside range = 70 points
- 3+ stages outside range = 40 points

**Red Flag:** If Discovery win rate <40%, prospects aren't being properly qualified. If Contract stage <85%, deal closure is stalling in final phase.

### 3. Sales Cycle Velocity (15 points)

**Definition:** Average days from opportunity creation to close (for closed deals in past 90 days).

**Calculation:** Sum of (Close Date - Created Date) for closed deals / count of closed deals (past 90 days)

**Target Range:** Varies by product / deal size. Baseline to your company standard.
- Example Enterprise SaaS: 150–210 days acceptable
- Example SMB/Commercial: 45–90 days acceptable

**Scoring:**
- Within 10% of benchmark = 100 points
- 10–20% above benchmark = 80 points
- 20–30% above benchmark = 60 points
- 30–50% above benchmark = 40 points
- 50%+ above benchmark = 20 points

**Red Flag:** Cycle time creeping up = early sign of market saturation, buyer hesitancy, or process breakdown.

### 4. Deal Size Distribution (15 points)

**Definition:** Average deal size vs. target ACV; monitor for compression or unhealthy concentration.

**Calculation:**
- Avg Deal Size (Current) / Target ACV
- Concentration: Largest 3 deals / Total Pipeline %

**Target:**
- Avg deal size: 90–110% of target ACV
- Concentration: Largest 3 deals should be <30% of total

**Scoring:**
- Deal size 100% of target, concentration <25% = 100 points
- Deal size 95–105% of target, concentration <30% = 85 points
- Deal size 85–95% of target, concentration <40% = 70 points
- Deal size <85% of target or concentration >40% = 40 points
- Deal size <75% of target + concentration >50% = 20 points

**Red Flag:** Avg deal size collapsing = quota will miss unless volume increases. Heavy concentration = revenue cliff risk if one deal slips.

### 5. Forecast Accuracy (15 points)

**Definition:** Compare rep-submitted forecast vs. actual pipeline; measure bias and drift.

**Calculation:**
- Rep-submitted pipeline for 90-day close / Actual pipeline in Commit + Best Case stages
- Variance = |Submitted - Actual| / Actual

**Target Variance:** ±15% (acceptable range)

**Scoring:**
- Variance 0–10% = 100 points (excellent rep calibration)
- Variance 10–15% = 85 points (acceptable)
- Variance 15–25% = 65 points (needs coaching)
- Variance 25–40% = 40 points (poor forecast discipline)
- Variance >40% = 20 points (unreliable; likely forecast miss)

**Red Flag:** Rep consistently overforecasts (optimism bias) or underforecasts (sandbagging). Either breaks planning.

### 6. Pipeline by Stage Distribution (10 points)

**Definition:** Ensure healthy flow through stages; flag bottlenecks.

**Healthy Distribution (adjust to your process):**
- Early Stage (Prospecting + Discovery): 40–50%
- Mid Stage (Qualification + Proposal): 30–40%
- Late Stage (Negotiation + Contract): 10–20%

**Scoring:**
- Matches healthy distribution = 100 points
- ±5% variance per stage = 85 points
- ±10% variance per stage = 70 points
- ±15% variance per stage = 50 points
- >15% variance or stalled stage = 20 points

**Red Flag:** Too much in Prospecting = long sales cycle ahead. Too much in Negotiation = execution risk if too many are stalled there.

### 7. Quota Attainment Trajectory (10 points)

**Definition:** Are reps on track to hit quota? Project quarter-end.

**Calculation:**
- (Deals closed YTD + pipeline value) / Quota target = % projected attainment
- If >100%, on track. If <100%, flag degree of miss.

**Scoring:**
- Projected >110% = 100 points (overachieving)
- Projected 100–110% = 90 points (on track)
- Projected 90–100% = 75 points (at risk; needs recovery)
- Projected 80–90% = 50 points (significant miss likely)
- Projected <80% = 20 points (critical; needs intervention)

### 8. Win Rate Trending (5 points)

**Definition:** Is win rate stable or declining? Month-over-month or quarter-over-quarter.

**Calculation:**
- Current 90-day win rate vs. Prior 90-day win rate
- Trend: (Current - Prior) / Prior

**Scoring:**
- Stable or improving (trend >−2%) = 100 points
- Slight decline (−2% to −5%) = 80 points
- Moderate decline (−5% to −10%) = 60 points
- Steep decline (−10% to −20%) = 40 points
- Severe decline (>−20%) = 20 points

**Red Flag:** Sharp win rate drop = market saturation, competitive pressure, or sales process issue.

### 9. Deal Age Distribution (5 points)

**Definition:** Monitor for stalled deals; flag those not advancing.

**Calculation:**
- % of deals unchanged in CRM for 30+ days
- Red flag: >20% of pipeline stalled

**Scoring:**
- <10% stalled = 100 points
- 10–15% stalled = 80 points
- 15–25% stalled = 50 points
- 25–35% stalled = 25 points
- >35% stalled = 10 points

### 10. Territory Quota Balance (5 points)

**Definition:** Are quotas fairly distributed across territories? Monitor for sandbagging or overloading.

**Calculation:**
- Standard deviation of (Territory Quota / Territory Revenue Potential)
- Target: <15% variance

**Scoring:**
- Variance <10% = 100 points (balanced)
- Variance 10–15% = 85 points (acceptable)
- Variance 15–20% = 65 points (unfair; needs rebalance)
- Variance >20% = 30 points (critical imbalance)

---

## Execution Checklist

1. Export pipeline from CRM (last 90 days of closed deals + all open opportunities)
2. Validate data: check for orphaned records, stale deals, stage inflation
3. Score each dimension; calculate weighted aggregate
4. Identify bottom 3 dimensions; these are priority recovery areas
5. Flag individual deals with close probability <50% or age >45 days
6. Forecast quarter-end attainment by rep
7. Generate risk matrix: likelihood × impact for top 10 at-risk deals
8. Write recommendations: specific action, owner, deadline

---

## Output Template

```markdown
# Pipeline Health Report — [Date]

## Overall Health Score

**Score: [X/100]** ([Green/Yellow/Red])

---

## Dimension Breakdown

| Dimension | Score | Target | Status | Trend |
|-----------|-------|--------|--------|-------|
| Coverage Ratio | [X]/100 | 3.5–4.5x | [Green/Yellow/Red] | [↑/→/↓] |
| Win Rate | [X]/100 | By stage | [Green/Yellow/Red] | [↑/→/↓] |
| Sales Cycle | [X]/100 | [X] days | [Green/Yellow/Red] | [↑/→/↓] |
| Deal Size | [X]/100 | [X]K ACV | [Green/Yellow/Red] | [↑/→/↓] |
| Forecast Accuracy | [X]/100 | ±15% | [Green/Yellow/Red] | [↑/→/↓] |
| Stage Distribution | [X]/100 | [X]% / [X]% | [Green/Yellow/Red] | [↑/→/↓] |
| Quota Trajectory | [X]/100 | >100% | [Green/Yellow/Red] | [↑/→/↓] |
| Win Rate Trend | [X]/100 | Stable | [Green/Yellow/Red] | [↑/→/↓] |
| Deal Age | [X]/100 | <10% stalled | [Green/Yellow/Red] | [↑/→/↓] |
| Territory Balance | [X]/100 | <15% variance | [Green/Yellow/Red] | [↑/→/↓] |

---

## Critical Findings

### Red Flags (Immediate Action Required)
- [Finding 1]: [Impact]. [Recommended action]. Owner: [Name]. Deadline: [Date].
- [Finding 2]: [Impact]. [Recommended action]. Owner: [Name]. Deadline: [Date].

### Yellow Flags (This Week/Month)
- [Finding 1]: [Impact]. [Recommended action].
- [Finding 2]: [Impact]. [Recommended action].

---

## At-Risk Deals (Close Probability <50%)

| Deal | Rep | Stage | Value | Days Open | Risk Factor | Recovery Action |
|------|-----|-------|-------|-----------|-------------|-----------------|
| [Deal Name] | [Rep] | [Stage] | [Value] | [Days] | [Factor] | [Action] |

---

## Quota Attainment Forecast (Quarter End)

| Rep | YTD Closed | Pipeline | Total Projected | Quota | % Projected | Status |
|-----|-----------|----------|-----------------|-------|------------|--------|
| [Rep Name] | [Value] | [Value] | [Value] | [Quota] | [%] | [Green/Yellow/Red] |

---

## Recovery Actions (Priority Order)

1. [Action]: [Specific task]. Owner: [Name]. Deadline: [Date]. Expected impact: [Value/Win %].
2. [Action]: [Specific task]. Owner: [Name]. Deadline: [Date]. Expected impact: [Value/Win %].

---

## Next Review Date

[Date] — or trigger on: [Specific event, e.g., "deal slip notice", "quota miss forecast"]
```

---

## Example

# Pipeline Health Report — 2026-06-12

## Overall Health Score

**Score: 72/100** (Yellow) — Coverage is strong, but deal stall and forecast drift are dragging score down.

---

## Dimension Breakdown

| Dimension | Score | Target | Status | Trend |
|-----------|-------|--------|--------|-------|
| Coverage Ratio | 85/100 | 3.5–4.5x | Green | ↑ |
| Win Rate | 80/100 | By stage | Green | → |
| Sales Cycle | 65/100 | 150–180d | Yellow | ↓ |
| Deal Size | 75/100 | 15K ACV | Yellow | ↓ |
| Forecast Accuracy | 60/100 | ±15% | Yellow | ↓ |
| Stage Distribution | 70/100 | 45/35/20 | Yellow | ↓ |
| Quota Trajectory | 85/100 | >100% | Green | → |
| Win Rate Trend | 65/100 | Stable | Yellow | ↓ |
| Deal Age | 50/100 | <10% stalled | Red | ↓ |
| Territory Balance | 80/100 | <15% variance | Green | → |

---

## Critical Findings

### Red Flags (Immediate Action Required)
- **Deal Stall Crisis:** 28% of pipeline unchanged for 30+ days (vs. healthy <10%). This is inflating forecast and hiding true close probability. **Action:** Run deal-risk-analyzer on stalled deals; schedule rep check-ins to re-qualify or close out. Owner: Sales Manager. Deadline: EOW.
- **Forecast Drift:** Reps submitted $4.2M forecast; actual Best Case + Commit stage totals $3.1M. +35% variance signals optimism bias. **Action:** Coaching session with top overforecasters; tighten forecast submission process. Owner: Sales VP. Deadline: Next forecast cycle.

### Yellow Flags (This Week/Month)
- **Sales Cycle Elongating:** Avg cycle time up 22% YoY (from 155d to 189d). Deal size dropping suggests mix shift to smaller accounts with same sales cycle. **Action:** Analyze deal mix; identify if competitive losses increasing. Owner: Sales Ops. Deadline: Next review.
- **Deal Size Compression:** Avg ACV down 12% QoQ ($16.8K → $14.8K). Quota will miss unless rep volume increases by 15%. **Action:** Validate deal-size pricing strategy; check if competitive pricing escalating. Owner: Sales Manager + Product. Deadline: 2 weeks.

---

## At-Risk Deals (Close Probability <50%)

| Deal | Rep | Stage | Value | Days Open | Risk Factor | Recovery Action |
|------|-----|-------|-------|-----------|-------------|-----------------|
| Acme Corp Expansion | Sarah K | Negotiation | 45K | 67 | No engagement in 20d; CFO delayed approval | Escalate to SVP; offer payment flexibility |
| TechFlow Pilot | Mike T | Proposal | 28K | 54 | Quiet; no follow-up activity since last email | Manual rep outreach; offer proof of concept reduction |
| Vertex Systems | David M | Qualification | 32K | 78 | Deal age >60d; low engagement score | Re-qualify or close out; no recovery action planned |

---

## Quota Attainment Forecast (Quarter End)

| Rep | YTD Closed | Pipeline | Total Projected | Quota | % Projected | Status |
|-----|-----------|----------|-----------------|-------|------------|--------|
| Sarah K | 210K | 125K | 335K | 300K | 112% | Green |
| Mike T | 145K | 78K | 223K | 300K | 74% | Red |
| David M | 180K | 92K | 272K | 300K | 91% | Yellow |
| Team Total | 535K | 295K | 830K | 900K | 92% | Yellow |

---

## Recovery Actions (Priority Order)

1. **De-stall Pipeline:** Re-qualify or close out 28% stalled deals (avg value $18K). Expected: recover 30% of stalled value ($150K). Owner: Sales Manager. Deadline: EOW.
2. **Coach Mike T:** Only 23% of rep's pipeline likely to close. Schedule 1:1; assess activity levels, proposal quality, buyer engagement. Identify 3 deals for recovery actions. Owner: Sales Manager. Deadline: 3 days.
3. **Tighten Forecast Discipline:** Implement weekly pipeline validation; reps must justify >20% variance to forecast. Owner: Sales VP. Deadline: Next cycle.

---

## Next Review Date

2026-06-19 (1 week) — or trigger on: quota miss forecast changes to <90%

---

Built with [Claudient](https://github.com/Claudient/Claudient)
