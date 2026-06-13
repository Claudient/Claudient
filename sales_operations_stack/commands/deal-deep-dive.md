---
description: Single-deal risk assessment covering buyer fit, buying committee, competition, momentum, contract status, and close probability forecast. Returns risk score and recovery actions.
---

# /deal-deep-dive

## What This Does

Runs the deal-risk-analyzer skill to assess an individual opportunity. Scores deal on 8 dimensions, maps buying committee, assesses competitive threats, forecasts close probability, and identifies bottlenecks.

## Steps Claude Follows

1. Ask for: Deal details (name, company, value, stage, days in pipeline, key contacts)
2. Ask for: Buyer persona info (champion name/title, economic buyer, blockers, influencers)
3. Score 8 risk dimensions: buyer fit, committee health, competition, momentum, contract, financial approval, tech fit, timeline
4. Calculate overall risk score (0–100)
5. Forecast close probability based on score + historical patterns
6. Identify primary and secondary blockers
7. If competitive threat detected: detail competitor + differentiation strategy
8. Compile recovery actions (owner, deadline, expected impact)
9. Return recommendation: GO / CAUTION / NO-GO with next steps

## Output Format

- **Risk Scoring:** Table with each dimension, score, details
- **Close Probability Forecast:** X% with reasoning
- **Bottleneck Identification:** Primary and secondary blockers with impact
- **Competitive Threat Assessment:** (If applicable) Competitor name, buyer's stated preference, our differentiation
- **Recovery Actions:** Prioritized list with owner and deadline
- **Recommendation:** GO (>65%), CAUTION (50–65%), NO-GO (<50%)
- **Next Review Date:** Date or trigger event

## Usage

```
/deal-deep-dive [opportunity-id or deal-name]
```

Then provide deal details when prompted.

## Typical Run Time

~10 minutes from deal info to analysis.

---

Built with [Claudient](https://github.com/Claudient/Claudient)
