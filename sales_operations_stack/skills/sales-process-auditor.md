---
name: sales-process-auditor
description: Reviews deal progression against standard playbook. Flags deals stalled in stages, identifies bottleneck stages, ensures stage gates met. Improves forecast accuracy and pipeline health.
allowed-tools: Read, Write
effort: medium
---

## When to activate

Monthly after pipeline review or when reps request guidance on stuck deals. Use to identify process bottlenecks and coach reps on stage progression.

## When NOT to use

Not for individual deal risk — use deal-risk-analyzer. Not for rep performance coaching — use quota-tracker. Not for territory design — use territory-optimizer.

## Sales Process Audit Framework

### Standard Sales Stages

Define clear stage definitions and exit criteria:

**Prospecting** → **Discovery** → **Qualification** → **Proposal** → **Negotiation** → **Contract** → **Closed-Won**

Each stage requires:
- **Minimum information level:** What must be true to advance?
- **Key stakeholders:** Who must be engaged?
- **Activity required:** What must happen before advancing?
- **Typical timeline:** How long should deal spend in stage?

### Stage Gate Criteria

Example (customize to your process):

| Stage | Entry Criteria | Exit Criteria | Typical Days | Bottleneck Risk |
|-------|----------------|---------------|--------------|-----------------|
| **Prospecting** | Lead sourced | Pain point confirmed via call | 7–14 | Low |
| **Discovery** | Initial call completed | Buyer confirms budget + timeline | 14–21 | Medium |
| **Qualification** | Budget/timeline confirmed | Buyer ready for demo/proposal | 7–14 | High |
| **Proposal** | Demo completed | Proposal sent + next review date scheduled | 14–21 | High |
| **Negotiation** | Proposal reviewed | Contract negotiated + signed | 21–45 | High |
| **Contract** | Fully executed agreement | Implementation kickoff scheduled | 5–7 | Low |

### Deal Stall Detection

Identify stalled deals:
- **Stalled:** No activity (no call, email, or activity logged) for 30+ days
- **Red flag:** Deal unchanged in CRM for 30+ days without manager comment

**Recovery:** Require rep to either re-engage buyer or close deal out.

### Bottleneck Stage Identification

Analyze:
- **Average days per stage:** Where are deals spending most time?
- **Win rate by stage:** Which stage has lowest close rate?
- **Deals stuck in stage:** Which stage has oldest average age?

---

## Sales Process Audit Report

```markdown
# Sales Process Audit — [Month] [Year]

**Date:** [Date]  
**Period:** [Month/Quarter]  

---

## Sales Funnel Summary

| Stage | Deal Count | Sum Value | Avg Days in Stage | Win Rate | Days Since Update |
|-------|-----------|-----------|------------------|----------|------------------|
| Prospecting | [X] | $[X] | [X] days | [X]% | [X] days |
| Discovery | [X] | $[X] | [X] days | [X]% | [X] days |
| Qualification | [X] | $[X] | [X] days | [X]% | [X] days |
| Proposal | [X] | $[X] | [X] days | [X]% | [X] days |
| Negotiation | [X] | $[X] | [X] days | [X]% | [X] days |
| Contract | [X] | $[X] | [X] days | [X]% | [X] days |

---

## Bottleneck Analysis

### Longest Average Days Per Stage

**[Stage Name]** — Avg [X] days (target: [X] days)

**Root causes identified:**
- [Cause 1]: [Example deals]
- [Cause 2]: [Example deals]

**Recommended actions:**
1. [Action] — Owner: [Name]. Deadline: [Date].
2. [Action] — Owner: [Name]. Deadline: [Date].

---

## Stalled Deals (No Activity >30 Days)

| Deal | Rep | Stage | Days Stalled | Last Update | Status |
|------|-----|-------|-------------|------------|--------|
| [Deal] | [Rep] | [Stage] | [X] | [Date] | [Stalled] |

**Total Stalled Value:** $[X] ([%] of pipeline)

**Recovery Actions:** (Per deal)

---

## Stage Gate Compliance

| Stage | Gate Criteria Met | Compliance % | Issues |
|-------|------------------|--------------|--------|
| [Stage] | [Criteria] | [%] | [Issues] |

---

## Win Rate by Stage Analysis

| Stage | Historical Win Rate | Current Period Win Rate | Variance | Risk |
|-------|-------------------|----------------------|----------|------|
| [Stage] | [%] | [%] | [%] | [Color] |

---

## Recommendations

1. [Action] — Impact: [Expected impact].
2. [Action] — Impact: [Expected impact].

---

## Next Audit Date

[Date]
```

---

## Example

# Sales Process Audit — June 2026

**Date:** 2026-06-12  
**Period:** Q2 2026  

---

## Sales Funnel Summary

| Stage | Deal Count | Sum Value | Avg Days in Stage | Win Rate | Days Since Update |
|-------|-----------|-----------|------------------|----------|------------------|
| Prospecting | 24 | $185K | 9 days | 65% | 2 days |
| Discovery | 18 | $210K | 12 days | 58% | 4 days |
| Qualification | 16 | $240K | 8 days | 72% | 3 days |
| Proposal | 22 | $360K | 24 days | 45% | 6 days |
| Negotiation | 15 | $380K | 35 days | 67% | 8 days |
| Contract | 6 | $190K | 5 days | 85% | 1 day |

---

## Bottleneck Analysis

### Longest Average Days Per Stage

**Proposal Stage** — Avg 24 days (target: 14 days) — **RED FLAG**

**Root causes identified:**
- **Demo scheduling delays (40% of variance):** Buyers take 5–7 days to confirm demo window after initial interest. Recommend: Book demo 48 hours after Qualification stage entry, not after interest.
- **Proposal customization (35% of variance):** Reps waiting for exact customer requirements before sending proposal. Recommend: Send standard proposal at Discovery stage; customize at Proposal gate, not before.
- **Legal review (25% of variance):** Customer's legal team slow to review MSA. Recommend: Pre-flight legal at Discovery stage; use boilerplate MSA that requires minimal revision.

**Recommended actions:**
1. **Implement "Demo-on-Demand" scheduling:** Reps book demo slot at end of Discovery call, not days later. Expected impact: −5 days per deal.
2. **Standardize proposal template:** Use 80% boilerplate + 20% customization. Expected impact: −4 days per deal.
3. **Pre-flight MSA with customer legal at Qualification stage:** Get legal resource identified early. Expected impact: −3 days in Negotiation stage.

---

## Stalled Deals (No Activity >30 Days)

| Deal | Rep | Stage | Days Stalled | Last Update | Status |
|------|-----|-------|-------------|------------|--------|
| Vertex Systems | David M | Qualification | 54 days | 2026-04-19 | Stalled |
| TechFlow Pilot | Mike T | Proposal | 38 days | 2026-05-05 | Stalled |
| Acme Expansion | Sarah K | Negotiation | 32 days | 2026-05-11 | Stalled |
| CloudInc Platform | Jennifer L | Discovery | 31 days | 2026-05-12 | Stalled |

**Total Stalled Value:** $178K (6.2% of pipeline)

**Recovery Actions:**

1. **Vertex Systems ($32K)** — David M to re-engage CIO within 48 hours. If no response in 7 days, close deal out. Owner: David M. Deadline: June 14.
2. **TechFlow Pilot ($28K)** — Mike T to offer free POC to accelerate: reset Proposal stage timeline. Owner: Mike T + Manager. Deadline: June 15.
3. **Acme Expansion ($45K)** — Sarah K to escalate to her CFO contact; obtain commitment on signature authority. Owner: Sarah K. Deadline: June 14.
4. **CloudInc Platform ($38K)** — Jennifer L to schedule discovery follow-up call with alternate buyer (if primary contact unavailable). Owner: Jennifer L. Deadline: June 13.

---

## Stage Gate Compliance

| Stage | Gate Criteria Met | Compliance % | Issues |
|-------|------------------|--------------|--------|
| Prospecting → Discovery | "Pain point confirmed via call" | 88% | 3 deals advanced without call documentation |
| Discovery → Qualification | "Budget + timeline confirmed" | 92% | 1 deal missing budget confirmation (amount TBD) |
| Qualification → Proposal | "Buyer ready for demo" | 78% | 4 deals sent proposals without demo (risky; low win rate) |
| Proposal → Negotiation | "Proposal sent + next review scheduled" | 95% | 1 deal missing follow-up date |
| Negotiation → Contract | "Contract negotiated" | 100% | All contract deals have signed MSA |

**Key Finding:** Low compliance in Qualification → Proposal (78%). Reps skipping demo, going straight to proposal. These deals have 45% win rate (vs. 72% for demo-first deals). **Recommend:** Enforce demo gate before proposal.

---

## Win Rate by Stage Analysis

| Stage | Historical Win Rate | Current Period Win Rate | Variance | Risk |
|-------|-------------------|----------------------|----------|------|
| Prospecting | 60% | 65% | +5% | Green |
| Discovery | 55% | 58% | +3% | Green |
| Qualification | 70% | 72% | +2% | Green |
| Proposal | 50% | 45% | −5% | Yellow |
| Negotiation | 68% | 67% | −1% | Green |
| Contract | 90% | 85% | −5% | Green (expected variance) |

**Finding:** Proposal stage win rate down 5%. Likely due to reps skipping demo gate (low engagement, lower close). See Stage Gate Compliance finding above.

---

## Recommendations

1. **Enforce Demo Gate Before Proposal**
   - Rule: Every deal must include buyer demo before proposal sent.
   - Impact: Should raise Proposal win rate from 45% to ~55% (+$40K revenue impact per quarter).
   - Owner: Sales Manager. Deadline: Next week; monitor compliance.

2. **Reduce Proposal Stage Time by −10 Days**
   - Implement: Demo-on-demand scheduling (−5 days), standardize proposal template (−4 days), pre-flight MSA (−3 days).
   - Impact: Faster cycle time, improved cash flow, higher buyer engagement.
   - Owner: Sales Manager. Deadline: June 30 (pilot with 2 reps).

3. **Activate Stall Recovery Actions**
   - Owner: Individual reps (per deal above).
   - Deadline: 1 week.
   - Expected recovery: $100–120K of the $178K stalled (assumes 60–70% recovery rate).

---

## Next Audit Date

2026-07-10 (1 month) — or trigger on: >15% of pipeline stalled, win rate <40% in any stage

---

Built with [Claudient](https://github.com/Claudient/Claudient)
