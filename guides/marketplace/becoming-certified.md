# Getting Your Stack Certified

This guide walks you through the step-by-step process of certifying your stack in the UitKit Marketplace.

## Prerequisites

Before applying for certification, ensure your stack:

1. **Is already published** in the UitKit Marketplace with positive feedback
2. **Meets baseline criteria** (see VETTING.md)
3. **Has a GitHub repository** (public, active, maintained)
4. **Meets minimum requirements** for your target tier:
   - Bronze: 10+ installs, 3.5+ rating
   - Silver: 50+ installs, 4.0+ rating, 6+ months active development
   - Gold: 200+ installs, 4.5+ rating, official maintainer endorsement

---

## Step 1: Evaluate Your Stack

Use the quality rubric in [certification-criteria.md](./certification-criteria.md) to assess your stack's readiness.

### Checklist

**Code Quality**
- [ ] Test coverage 50%+ (accept) or 70%+ (silver) or 90%+ (gold)
- [ ] Linting passes; no critical issues
- [ ] Dependencies updated within last 3 months
- [ ] No known security vulnerabilities

**Adoption**
- [ ] Bronze: 10+ installs
- [ ] Silver: 50+ installs over 90 days
- [ ] Gold: 200+ installs over 180 days

**Satisfaction**
- [ ] Bronze: 3.5+ rating (5+ reviews)
- [ ] Silver: 4.0+ rating (10+ reviews)
- [ ] Gold: 4.5+ rating (20+ reviews)

**Maintenance**
- [ ] Updated within last 6 months (bronze), 3 months (silver), 1 month (gold)
- [ ] Average issue response time acceptable
- [ ] No critical issues outstanding

**Documentation**
- [ ] README complete and clear
- [ ] At least 1 example (bronze), 2+ (silver), 3+ (gold)
- [ ] CLAUDE.md present and accurate
- [ ] Silver/Gold: At least one additional language

---

## Step 2: Calculate Your Quality Score

Use the methodology in [certification-criteria.md](./certification-criteria.md):

```
Quality Score = (0.20 × Code Quality) + (0.20 × Adoption) + (0.20 × Satisfaction) + (0.20 × Maintenance) + (0.20 × Documentation)
```

Record scores for each dimension:

| Dimension | Score (0-100) |
|-----------|---------------|
| Code Quality | ___ |
| Adoption | ___ |
| Satisfaction | ___ |
| Maintenance | ___ |
| Documentation | ___ |
| **Composite Score** | **___** |

**Tier Eligibility:**
- 80-100 → Gold candidate
- 60-79 → Silver candidate
- 40-59 → Bronze candidate

---

## Step 3: Prepare Certification Materials

Create a document containing:

### A. Stack Summary
- Stack name and ID
- GitHub repository URL
- Installation count (with source: npm, GitHub, or marketplace tracking)
- Current average rating and review count
- List of key features/skills

### B. Evidence of Quality
- Links to 2+ community reviews or testimonials
- GitHub activity log (last 6 months)
- List of resolved issues (with response times)
- Test coverage report (if available)

### C. Maintenance Commitment
- Author(s) name(s)
- Commitment level: Bronze/Silver/Gold
- Estimated maintenance hours per month
- Support channels (GitHub Issues, Discord, email, etc.)
- Plan for handling critical issues

### D. Unique Value Proposition
- Brief explanation of what makes this stack valuable
- How it differs from similar stacks
- Evidence of community adoption

### E. SLA Compliance Statement

**For Bronze:**
"I commit to responding to all issues within 2 weeks and fixing critical bugs within 2 weeks."

**For Silver:**
"I commit to responding to all issues within 1 week and fixing critical bugs within 2 weeks. I will maintain monthly or quarterly release cadence."

**For Gold:**
"I commit to responding to all issues within 48 hours and fixing critical bugs within 5 business days. I will maintain monthly releases and conduct annual security audits."

---

## Step 4: Request Certification Review

Send an email to **marketplace@uitkit.dev** with subject line:

```
Certification Request: [Stack Name] - [Tier] Tier
```

Include:
1. All materials from Step 3
2. Your calculated quality score breakdown
3. Link to this stack's marketplace listing
4. Any additional context or notes

**Response timeline:** Core team will acknowledge within 3 business days and begin review.

---

## Step 5: Respond to Core Team Feedback

Core team may request:

**Additional Information:**
- Clarifications on metrics
- Additional examples or documentation
- Security audit or dependency report

**Minor Updates:**
- Documentation improvements
- Example additions
- README clarity enhancements

**Conditional Approval:**
- Meet specific metrics before final approval
- Fix identified issues and reapply

**Reapply After Improvements:**
If denied, you can reapply after:
- Addressing feedback (2+ weeks minimum)
- Improving weak areas
- Building additional adoption (if needed)

---

## Step 6: Certification Approval

Upon approval:

1. **Marketplace listing updated** with certification badge
2. **Certified stacks index** updated (marketplace/certified/README.md)
3. **Tier designation published:**
   - Bronze: Listed in certified stacks
   - Silver: Featured in "Recommended" category
   - Gold: Featured on marketplace homepage

4. **Author notified** with:
   - Certification badge asset (PNG, SVG)
   - Certificate of certification
   - Press release template (optional)
   - Marketing assets

---

## Step 7: Maintain Your Certification

### Ongoing Responsibilities

**Bronze (every 6 months):**
- Keep average rating above 3.5
- Maintain at least 10 installs
- Respond to issues within 2 weeks
- Recertify to maintain badge

**Silver (every 12 months):**
- Keep average rating above 4.0
- Maintain at least 50 installs
- Publish quarterly updates
- Respond to issues within 1 week
- Recertify to maintain badge

**Gold (every 24 months):**
- Keep average rating above 4.5
- Maintain at least 200 installs
- Publish monthly updates
- Respond to issues within 48 hours
- Conduct annual security audit
- Recertify to maintain badge

### Annual Recertification Process

**30 days before expiration date:**
- You'll receive recertification notice
- Verify current metrics still meet tier requirements
- Submit recertification confirmation to marketplace@uitkit.dev

**If metrics have declined:**
- Stack may be downgraded one tier
- You'll have 60 days to improve and appeal
- If not improved, certification is revoked

---

## Certification Renewal

Your certification badge remains valid until expiration date. Near-term renewal (within 60 days) can be triggered by:
- Significant feature addition
- Major maintenance milestone
- Request for tier upgrade

Renewal process is same as initial certification.

---

## Tier Upgrades

To upgrade from Bronze to Silver or Silver to Gold:

1. Ensure new metrics meet target tier
2. Send upgrade request to marketplace@uitkit.dev with updated quality score
3. Core team verifies metrics (2-3 business days)
4. Upon approval, listing and badge are updated

---

## Decertification and Appeals

If your certification is revoked:

1. **Reason notification:** You'll receive detailed explanation
2. **Appeal window:** 2 weeks to provide additional context
3. **Appeal review:** Independent core team member reviews decision
4. **Reapplication:** Available after 6 months of improvements

---

## Questions?

- **Certification criteria:** See [certification-criteria.md](./certification-criteria.md)
- **Tier details:** See [../CERTIFICATION.md](../CERTIFICATION.md)
- **General questions:** marketplace@uitkit.dev
- **Community discussion:** [GitHub Discussions](https://github.com/uitkits/uitkit/discussions)

---

**Last updated:** June 15, 2026
