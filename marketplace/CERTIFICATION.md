# UitKit Stack Certification Tiers

This document defines the certification levels for stacks in the UitKit Marketplace. Certified stacks have met quantified quality standards and maintenance commitments.

## Certification Tiers

### Bronze Tier

**Criteria:**
- Passes all automated validation checks
- Completes human review with no blockers
- Author commits to 6-month maintenance period

**Benefits:**
- Bronze certification badge displayed in marketplace
- Stack listed in certified stacks index
- Priority in search results
- Included in featured rotations

**Maintenance SLA:**
- Responds to critical bug reports within 2 weeks
- Addresses breaking dependency updates within 1 month
- Updates documentation for API changes within 2 weeks

**Expiration:** 6 months from certification date

---

### Silver Tier

**Criteria:**
- Meets all Bronze tier requirements
- Minimum 50 installs over 90 days
- Average user rating 4.0 or higher
- No critical issues outstanding for more than 1 month
- Last update within 6 months of certification request

**Benefits:**
- Silver certification badge (higher prominence)
- Featured in "Trending" and "Recommended" categories
- Listed in Silver-tier certified stacks index
- Eligibility for partnership opportunities
- Core team co-maintenance offer (optional)

**Maintenance SLA:**
- Responds to all issues within 1 week
- Critical bugs resolved within 2 weeks
- Dependency updates evaluated and applied within 2 weeks
- Regular updates (minimum monthly activity)

**Expiration:** 12 months from certification date

---

### Gold Tier

**Criteria:**
- Meets all Silver tier requirements
- Minimum 200 installs over 180 days
- Average user rating 4.5 or higher
- Official maintainer endorsement (official UitKit team member or verified community maintainer with track record)
- Comprehensive documentation and examples
- Multi-language support (minimum: English + 1 additional language)

**Benefits:**
- Gold certification badge (highest prominence)
- Featured prominently in marketplace homepage
- Listed in Gold-tier certified stacks index
- Exclusive marketing and promotion support
- Direct access to core team for feature requests and support
- Eligibility for revenue sharing (if applicable)

**Maintenance SLA:**
- Responds to all issues within 48 hours
- Critical bugs resolved within 5 business days
- Dependency updates evaluated and applied within 1 week
- Quarterly updates (minimum)
- Proactive security audits (annual)

**Expiration:** 24 months from certification date

---

## Quality Score Calculation

Each stack receives a composite quality score (0-100) based on:

| Metric | Weight | Measurement |
|--------|--------|-------------|
| Code Quality | 20% | Test coverage, linting, documentation completeness |
| User Adoption | 20% | Install count, weekly active users, trending velocity |
| User Satisfaction | 20% | Average rating, review sentiment, issue resolution rate |
| Maintenance | 20% | Days since last update, dependency freshness, issue response time |
| Documentation | 20% | Completeness, clarity, example quality, accuracy |

**Score Interpretation:**
- 80-100: Gold tier candidate
- 60-79: Silver tier candidate
- 40-59: Bronze tier candidate
- Below 40: Not eligible for certification

---

## Recertification

All certified stacks undergo annual recertification:

**Bronze stacks:**
- Must maintain minimum install count (10)
- Average rating stays above 3.5
- No unresolved critical issues
- Author confirms intent to maintain

**Silver stacks:**
- Must maintain minimum install count (50)
- Average rating stays above 4.0
- Quarterly updates required
- Issue response SLA maintained

**Gold stacks:**
- Must maintain minimum install count (200)
- Average rating stays above 4.5
- Monthly updates required
- Issue response SLA maintained
- Maintainer endorsement renewed

If a stack fails recertification, it is downgraded one tier. If it fails at Bronze tier, certification is revoked.

---

## Decertification

Certification is immediately revoked if:

1. **Code of conduct violation:** Prohibited content discovered in stack or author conduct
2. **Critical security issue:** Unpatched vulnerability affecting user systems
3. **Licensing violation:** Use of incompatible or undisclosed licenses
4. **Abandoned:** No author response for 3 months after recertification review
5. **Hostile maintenance:** Author actively prevents improvements or ignores critical issues

Revoked stacks are delisted from certified indexes but remain in marketplace (if no violations). Authors can apply for re-certification after 6 months.

---

## Certification Process

See [becoming-certified.md](../guides/marketplace/becoming-certified.md) for the step-by-step certification workflow.

See [certification-criteria.md](../guides/marketplace/certification-criteria.md) for detailed quality rubrics and measurement methodologies.

---

**Last updated:** June 15, 2026
