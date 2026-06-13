---
name: deal-governance-enforcer
description: Enforces deal governance standards: approval authority, risk assessment, customer suitability, contract status. Prevents deals from closing without proper compliance checks.
allowed-tools: Read, Write
effort: medium
---

## When to activate

Pre-close (before marking deal as closed-won in CRM), or when rep escalates deal with non-standard terms. Use to ensure legal, compliance, and risk standards are met.

## When NOT to use

Not for deal negotiation strategy — use deal-risk-analyzer. Not for individual rep coaching — use quota-tracker. Not for comp plan validation — use sales-compensation-auditor.

## Deal Governance Framework

### Approval Authority Gate

**By Deal Value:**
- <$25K: Rep signature authority
- $25K–$100K: Manager approval required
- $100K–$250K: Director approval required
- >$250K: VP or C-suite approval required

**Red Flag:** Deal bypasses approval authority.

### Risk Assessment Checklist

Before any close:
- Buyer suitability: Does customer fit ICP? Any GDPR/sanction concerns?
- Contract status: Is all signature authority present? Any legal holds?
- Payment terms: Are payment terms within policy (net 30/60/90)? Any extended payment plans?
- Customer health: Any red flags on customer financial stability?
- Integration risk: Does customer require customization? Is it scoped and resourced?

### Customer Suitability

Red flags:
- Prospect is in banned/sanctioned jurisdiction
- GDPR opt-out customer
- Customer has history of disputes or non-payment
- Customer is known competitor using data for competitive intel
- Deal requires ethical/privacy compromises

### Contract Status

Before marking closed:
- All required signatures obtained
- Signature authority verified
- Standard terms applied (no non-standard terms without legal review)
- Insurance/indemnity clauses reviewed
- Data processing agreements (if applicable) signed

---

## Deal Governance Checklist

```markdown
# Deal Governance Checklist — [Deal Name]

**Deal ID:** [ID]  
**Deal Value:** $[Value]  
**Rep:** [Name]  
**Close Date:** [Date]  

---

## Approval Authority

- Deal value: $[X]
- Required approval level: [Level]
- Approval obtained from: [Name/Title]
- Approval date: [Date]
- Status: [✓ APPROVED / ✗ PENDING]

---

## Risk Assessment

| Criterion | Status | Notes |
|-----------|--------|-------|
| Buyer suitability | ✓/✗ | [Notes] |
| GDPR/Sanctions check | ✓/✗ | [Notes] |
| Financial stability | ✓/✗ | [Notes] |
| Integration scope | ✓/✗ | [Notes] |
| Payment terms standard | ✓/✗ | [Notes] |

---

## Contract Status

- Signature authority verified: ✓/✗
- All required signatures obtained: ✓/✗
- Legal review completed: ✓/✗
- Non-standard terms: ✓/✗ (if yes, document)
- Insurance/indemnity reviewed: ✓/✗
- Data agreements signed (if applicable): ✓/✗

---

## Governance Sign-Off

- Sales Ops: [Signature] — Date: [Date]
- Manager: [Signature] — Date: [Date]
- Legal (if >$100K): [Signature] — Date: [Date]

---

## Status

[✓ CLEARED FOR CLOSE / ✗ BLOCKED — Reason: [Reason]]
```

---

## Example

# Deal Governance Checklist — Apex Industries Platform

**Deal ID:** DL-2026-0847  
**Deal Value:** $125,000 (3-year contract)  
**Rep:** Sarah K  
**Close Date:** 2026-06-12  

---

## Approval Authority

- Deal value: $125K
- Required approval level: Director (per policy: >$100K)
- Approval obtained from: John Martinez, VP Sales
- Approval date: 2026-06-11
- Status: ✓ APPROVED

---

## Risk Assessment

| Criterion | Status | Notes |
|-----------|--------|-------|
| Buyer suitability | ✓ | CIO + CFO are champions; manufacturing vertical strong fit |
| GDPR/Sanctions check | ✓ | Customer: Apex Industries, USA-based, no sanctions flags |
| Financial stability | ✓ | S&P rated; revenue $500M+; low bankruptcy risk |
| Integration scope | ✓ | Minimal customization; legacy system integration only (2-sprint effort, budgeted) |
| Payment terms standard | ✗ | **FLAG:** Customer requested Net 60 (vs. policy Net 30). Finance approved as exception; acceptable. |

---

## Contract Status

- Signature authority verified: ✓ (CIO + CFO + Contracts team confirmed)
- All required signatures obtained: ✓ (Executed contract in DocuSign; all parties signed 2026-06-11)
- Legal review completed: ✓ (Legal reviewed IP clause, indemnity; minor edits resolved)
- Non-standard terms: ✗ (Standard MSA with SLA addendum; no non-standard terms)
- Insurance/indemnity reviewed: ✓ (Standard tech liability coverage confirmed)
- Data agreements signed (if applicable): ✓ (DPA signed 2026-06-10)

---

## Governance Sign-Off

- Sales Ops (Review): Sarah Chen — Date: 2026-06-12 — Cleared
- Manager (Approval): John Martinez, VP Sales — Date: 2026-06-11 — Approved
- Legal (Review, >$100K): Rachel Goldman, General Counsel — Date: 2026-06-11 — Approved

---

## Status

✓ **CLEARED FOR CLOSE** — All governance criteria met. Deal safe to mark as Closed-Won in CRM. Implementation team: Schedule kickoff within 5 business days per contract.

---

Built with [Claudient](https://github.com/Claudient/Claudient)
