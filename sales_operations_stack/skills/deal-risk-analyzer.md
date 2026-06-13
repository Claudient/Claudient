---
name: deal-risk-analyzer
description: Analyzes individual deal risk across 8 dimensions. Returns probability of close, bottleneck identification, competitive threat assessment, and recovery actions.
allowed-tools: Read, WebFetch, Write
effort: high
---

## When to activate

Before attempting to close a deal, when deal is stalled >30 days, or when rep requests guidance on complex/large opportunity. Use for deals with significant revenue impact or extended sales cycle.

## When NOT to use

Not for account research — use account-researcher skill. Not for pipeline summary — use pipeline-health-scorer. Not for initial qualification — use ICP qualifier from GTM stack.

## Risk Scoring Dimensions

### 1. Buyer Persona Fit (15 points)

Score: Does decision-maker match ideal champion profile?
- Perfect fit (primary use case, strong ROI case): 15 points
- Good fit (secondary use case, adequate ROI): 10 points
- Weak fit (nice-to-have, soft ROI): 5 points
- Poor fit (misaligned priority): 0 points

### 2. Buying Committee Health (20 points)

Map all stakeholders: champion, economic buyer, blocker, influencer. Score:
- Champion actively engaged + economic buyer aligned: 20 points
- Champion engaged, economic buyer neutral: 15 points
- Champion not yet identified: 10 points
- Committee fractured or hostile: 5 points
- Buying committee unknown/not engaged: 0 points

### 3. Competitive Threat (15 points)

Assess competitive risk from alternatives.
- No known competition: 15 points
- Internal build/status quo preferred by buyer: 10 points
- 1 competitor in evaluation: 8 points
- 2+ competitors; we're frontrunner: 5 points
- 2+ competitors; we're behind: 0 points

### 4. Deal Momentum (15 points)

Track buyer engagement velocity in past 30 days.
- Multiple touchpoints, buyer-initiated questions: 15 points
- Regular cadence; buyer responsive: 10 points
- Low activity; buyer slow to respond: 5 points
- Stalled >30 days; minimal contact: 0 points

### 5. Contract/Legal Status (15 points)

How far along in signature process?
- Signed, awaiting implementation: 15 points
- In negotiation, minor issues only: 10 points
- Legal review in progress; moderate issues: 5 points
- Contract not yet drafted: 2 points
- Contract rejected/blocked: 0 points

### 6. Financial Approval (10 points)

Is budget confirmed and approved?
- Budget approved in writing: 10 points
- Budget likely approved but not in writing: 7 points
- Budget contingent on approval process: 3 points
- Budget not yet requested: 0 points

### 7. Technical Fit (5 points)

Do technical requirements align with product?
- Full fit, no customization needed: 5 points
- Good fit, minimal customization: 3 points
- Fit possible with moderate customization: 1 point
- Poor fit or custom build required: 0 points

### 8. Timeline Alignment (5 points)

Does buyer close date match our forecast?
- Buyer-driven hard close date matches forecast: 5 points
- Flexible timeline; on track: 3 points
- Timeline uncertain or slipping: 1 point
- No timeline or open-ended: 0 points

---

## Deal Risk Report Template

```markdown
# Deal Risk Assessment — [Deal Name]

**Rep:** [Rep Name]  
**Company:** [Company]  
**Deal Value:** [Value]  
**Current Stage:** [Stage]  
**Days in Pipeline:** [Days]  

---

## Risk Scoring

| Dimension | Score | Details |
|-----------|-------|---------|
| Buyer Fit | [X]/15 | [Comment] |
| Buying Committee | [X]/20 | [Stakeholder map] |
| Competition | [X]/15 | [Competitor names + position] |
| Momentum | [X]/15 | [Last 3 activities + dates] |
| Contract Status | [X]/15 | [Current stage + issues] |
| Financial Approval | [X]/10 | [Budget status] |
| Technical Fit | [X]/5 | [Integration requirements] |
| Timeline | [X]/5 | [Expected close date] |

**Total Risk Score: [X]/100**

---

## Close Probability Forecast

Based on score + historical deal patterns:
- Score >80: 75–90% close probability
- Score 65–80: 50–65% close probability
- Score 50–65: 30–50% close probability
- Score <50: <30% close probability

**This Deal: [X]% probability**

---

## Bottleneck Identification

**Primary Blocker:** [Dimension with lowest score + why it matters]

**Secondary Blockers:** [List other <10-point dimensions]

---

## Competitive Threat Assessment

[If competitive risk detected, detail:]
- Competitor name + solution
- Buyer's stated preference + why
- Our differentiation angle
- Recovery strategy

---

## Recovery Actions (Priority Order)

1. [Action]: Specific task to improve risk score. Owner: [Name]. Deadline: [Date].
2. [Action]: [Task]. Owner: [Name]. Deadline: [Date].

---

## Recommendation

- **GO:** Close probability >65%. Proceed to close.
- **CAUTION:** Close probability 50–65%. Risk mitigation actions required before close attempt.
- **NO-GO:** Close probability <50%. Recommend staging or replacement deal.

---

## Next Review

[Date] — or trigger on: [Specific action, e.g., "buyer response", "legal revision"]
```

---

## Example

# Deal Risk Assessment — Apex Industries Platform Implementation

**Rep:** Sarah K  
**Company:** Apex Industries (mfg)  
**Deal Value:** $125K (3-year contract)  
**Current Stage:** Negotiation  
**Days in Pipeline:** 54 days  

---

## Risk Scoring

| Dimension | Score | Details |
|-----------|-------|---------|
| Buyer Fit | 12/15 | CIO is champion; strong platform consolidation mandate |
| Buying Committee | 14/20 | CIO aligned, CFO engaged, COO (budget blocker) neutral |
| Competition | 8/15 | Competing against legacy system (internal build). CIO prefers modern platform approach. |
| Momentum | 10/15 | Last touchpoint: CIO question 6 days ago. Weekly cadence established. |
| Contract Status | 7/15 | Draft sent; legal reviewing. Two minor clauses in negotiation (IP, indemnity). |
| Financial Approval | 6/10 | Budget allocated to digital transformation; CFO approved in principle, not written. |
| Technical Fit | 4/5 | Minimal customization. Legacy system integration may require engineering effort (1-2 sprints). |
| Timeline | 3/5 | CIO targeting Q3 implementation; we're forecasting 60-day close. No written deadline. |

**Total Risk Score: 64/100**

---

## Close Probability Forecast

**This Deal: 52% probability**

Reasoning: Buyer persona strong, committee mostly aligned, but contract negotiation and budget sign-off are moving slowly. CIO pushing hard but COO (budget owner) hasn't explicitly approved. Legacy system alternative keeps buyer anchored to cheaper option.

---

## Bottleneck Identification

**Primary Blocker:** Financial approval (6/10). CFO verbal support, but no written PO. Budget authority unclear if >$100K threshold triggers approval board. **Impact:** If approval board required, adds 2–4 weeks.

**Secondary Blockers:**
- Contract negotiation (7/15). IP clause and indemnity negotiation stalled. Legal debate over customization risk.
- Timeline clarity (3/5). Buyer says "Q3 ready" but no hard go-live date. Implementation dependencies unclear.

---

## Competitive Threat Assessment

**Competitor:** Internal build (legacy platform enhancement)
**Buyer's Stated Preference:** "Explore modern platform approach; keep legacy as fallback"
**Risk Level:** Medium — if negotiation stalls, CIO will pivot to internal team for faster, cheaper solution.
**Our Differentiation:**
- 90-day faster go-live than custom build
- Eliminate 3 integration points with existing stack
- Proven compliance for manufacturing vertical

**Recovery:** Propose 30-day pilot phase at reduced price ($40K) to de-risk internal build argument. Positions us as faster + less risk.

---

## Recovery Actions (Priority Order)

1. **Unblock Financial Approval:** Schedule CFO call (Sarah to set up) this week. Goal: Written approval or PO threshold clarity. Owner: Sarah K. Deadline: Wednesday.

2. **Resolve Contract Friction:** Legal review of IP/indemnity with customer's counsel. Flag: Are we willing to accept liability for legacy integration issues? This may require pricing adjustment. Owner: Sales Manager + Legal. Deadline: Friday.

3. **Harden Timeline:** Email CIO + CFO: "To hit Q3 implementation, we need go-live date by [date] and PO by [date]. Are we tracking?" Makes implicit timeline explicit. Owner: Sarah K. Deadline: Thursday.

4. **Pilot Proposal (Backup Plan):** If deal stalls in next 2 weeks, pitch $40K 30-day pilot. Reduces buyer's risk, shows platform value, increases stickiness for upsell. Owner: Sarah K. Deadline: If no progress by June 19.

---

## Recommendation

**CAUTION** — Deal at 52% close probability. Greenlight Sarah to pursue close, BUT require weekly check-ins. If any blocker unresolved by June 26, escalate to VP for decision: pilot-down vs. push to next quarter.

---

## Next Review

2026-06-19 — or trigger on: CFO response, contract revision, buyer request for pilot

---

Built with [Claudient](https://github.com/Claudient/Claudient)
