# Marketplace Stack Certification Criteria

This guide details the quantified criteria, quality rubrics, and measurement methodologies for UitKit Stack Certification.

## Overview

Stack certification has three tiers: Bronze, Silver, and Gold. Each tier has measurable criteria across five dimensions: code quality, user adoption, user satisfaction, maintenance, and documentation.

---

## Quality Score Calculation

Each stack receives a composite quality score (0-100) calculated as:

```
Quality Score = (0.20 × Code Quality) + (0.20 × Adoption) + (0.20 × Satisfaction) + (0.20 × Maintenance) + (0.20 × Documentation)
```

Score ranges:
- 80-100: Gold tier candidate
- 60-79: Silver tier candidate
- 40-59: Bronze tier candidate
- Below 40: Not eligible for certification

---

## 1. Code Quality (20%)

**Measurement:** Test coverage, linting compliance, dependency freshness, security audit results.

| Metric | Excellent (90-100) | Good (70-89) | Acceptable (50-69) | Poor (Below 50) |
|--------|-------------------|--------------|-------------------|-----------------|
| **Test Coverage** | 80%+ | 60-79% | 40-59% | Below 40% |
| **Linting** | No issues | ≤2 minor issues | 3-5 minor issues | 6+ issues or critical issues |
| **Dependencies** | All up-to-date; automated updates | 1-2 outdated; update plan in place | 3+ outdated; plan needed | 5+ severely outdated; critical vulnerabilities |
| **Security** | Annual audit; no issues | No known vulnerabilities | 1-2 low-severity issues | Unpatched vulnerabilities |

**Bronze requirement:** 50+ (acceptable) in each metric
**Silver requirement:** 70+ (good) in each metric
**Gold requirement:** 90+ (excellent) in each metric

---

## 2. User Adoption (20%)

**Measurement:** Install count, weekly active users, trending velocity, command usage.

| Metric | Gold | Silver | Bronze |
|--------|------|--------|--------|
| **Total Installs (90-day window)** | 200+ | 50+ | 10+ |
| **Weekly Active Users** | 25+ | 10+ | 3+ |
| **Trending Velocity** | +20% week-over-week | +10% week-over-week | Stable or growing |
| **Command/Skill Usage** | 70%+ features used regularly | 50%+ features used regularly | 30%+ features used |

**Adoption Score = (Installs / Target) × 25 + (WAU / Target) × 25 + (Velocity Bonus) + (Usage Bonus)**

Target installs: Bronze=10, Silver=50, Gold=200. If exceeded, capped at 100 points.

---

## 3. User Satisfaction (20%)

**Measurement:** Average rating, review sentiment, issue resolution rate, NPS.

| Metric | Gold | Silver | Bronze |
|--------|------|--------|--------|
| **Average Rating** | 4.5+ | 4.0+ | 3.5+ |
| **Review Count** | 20+ reviews | 10+ reviews | 5+ reviews |
| **Issue Resolution Rate** | 95%+ issues resolved | 85%+ issues resolved | 70%+ issues resolved |
| **Sentiment (Positive Reviews)** | 80%+ positive | 70%+ positive | 60%+ positive |
| **NPS (if available)** | 50+ | 40+ | 30+ |

**Satisfaction Score = (Rating × 25) + (Resolution Rate × 25) + (Sentiment × 25) + (NPS Bonus × 25)**

---

## 4. Maintenance (20%)

**Measurement:** Recency of updates, dependency freshness, issue response time, commit frequency.

| Metric | Gold | Silver | Bronze |
|--------|------|--------|--------|
| **Days Since Last Update** | 30 days | 90 days | 180 days |
| **Dependency Age** | 90% current versions | 80% current versions | 70% current versions |
| **Avg Issue Response Time** | 48 hours | 1 week | 2 weeks |
| **Commit Frequency** | Monthly or more | Quarterly or more | Bi-annual or more |
| **Critical Issues Outstanding** | 0 | 0 | 0 (older than 60 days) |

**Maintenance Score = (Recency Bonus × 25) + (Dependency Freshness × 25) + (Response Time × 25) + (Commit Frequency × 25)**

Response time scoring:
- ≤48 hours: 100 points
- ≤1 week: 80 points
- ≤2 weeks: 60 points
- >2 weeks: 40 points

---

## 5. Documentation (20%)

**Measurement:** README completeness, example quality, inline comments, clarity, accuracy.

| Component | Excellent (90-100) | Good (70-89) | Acceptable (50-69) | Poor (Below 50) |
|-----------|-------------------|--------------|-------------------|-----------------|
| **README** | Complete sections; clear use cases; installation 5 min | Most sections present; some gaps; 10 min install | Basic info present; unclear sections; 15+ min | Incomplete; confusing; non-functional |
| **Examples** | 3+ comprehensive examples with explanations | 2 working examples; some explanation | 1 example; minimal explanation | Examples missing or non-functional |
| **CLAUDE.md** | Clear instructions; all features explained | Most instructions present; some gaps | Basic instructions; incomplete | Missing or unclear |
| **Code Comments** | Functions/algorithms documented; intent clear | Key sections commented | Sparse comments | No meaningful comments |
| **Accuracy** | Current best practices; no errors | Minor outdated elements; mostly accurate | Some outdated patterns; minor inaccuracies | Significantly out-of-date; major errors |

**Documentation Score = (README × 25) + (Examples × 25) + (CLAUDE.md × 25) + (Comments × 15) + (Accuracy × 10)**

---

## Usage Thresholds

### Installation Minimums

Certification requires minimum install counts over a measurement window:

**Bronze:** 10+ installs (any period)
**Silver:** 50+ installs over 90 days
**Gold:** 200+ installs over 180 days

Installs are tracked via:
- npm package downloads (for CLI-based stacks)
- GitHub repository clones
- Claude Code marketplace install tracking
- Direct author-reported installations (with verification)

### Rating Minimums

**Bronze:** 3.5+ average (5+ reviews required for calculation)
**Silver:** 4.0+ average (10+ reviews required for calculation)
**Gold:** 4.5+ average (20+ reviews required for calculation)

Ratings are normalized to 5-point scale. Review count must meet minimum before score is considered valid.

### Activity Thresholds

**Bronze:** Updated within 6 months
**Silver:** Updated within 3 months
**Gold:** Updated within 1 month

Updates include:
- Code commits to main branch
- Documentation updates
- Dependency bumps
- Issue responses

---

## Maintenance SLAs

### Bronze SLA

- Responds to all issues within 2 weeks
- Critical bugs fixed within 2 weeks
- Breaking dependency updates applied within 1 month
- Documentation updates within 2 weeks of API changes

### Silver SLA

- Responds to all issues within 1 week
- Critical bugs fixed within 2 weeks
- All dependency updates evaluated within 2 weeks
- Documentation kept current with feature changes
- Monthly or quarterly releases

### Gold SLA

- Responds to all issues within 48 hours
- Critical bugs fixed within 5 business days
- All dependency updates evaluated and applied within 1 week
- Documentation kept in sync with code (within 1 week)
- Monthly releases or active development
- Proactive security audits (annual minimum)

---

## Measurement Period

**Initial Certification:** Based on last 90 days of activity
**Recertification:** Based on 365-day rolling window

---

## Edge Cases

### New Stacks

Stacks less than 90 days old can request Bronze certification if:
- Code quality score is 50+
- Documentation is complete
- Manual review confirms quality

Install-based criteria are waived for first 90 days.

### Language and Localization

English documentation is mandatory for all tiers.

**Silver and Gold:** Require at least one additional language (FR, DE, ES, or NL)

### Community vs. Official Stacks

Certification criteria are identical regardless of maintenance model. Official status (tushar2704 maintainer) does not grant automatic certification.

---

## Audit and Verification

Core team conducts spot audits:
- Download and test stack functionality
- Verify install count and ratings
- Review recent commits and issue responses
- Confirm documentation accuracy
- Security scan for common vulnerabilities

Audits occur:
- Before initial certification approval
- Quarterly for Gold-tier stacks
- Annually for Silver-tier stacks
- Every 18 months for Bronze-tier stacks

---

## Appeals

If a stack is denied certification or downgraded:

1. Author can request clarification (within 1 week)
2. Core team provides detailed score breakdown
3. Author may reapply after addressing identified issues (after 2 weeks)
4. If unsatisfied with feedback, escalate to marketplace@uitkit.dev for independent review

---

**Last updated:** June 15, 2026
