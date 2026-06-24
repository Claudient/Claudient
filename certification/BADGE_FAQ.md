# UitKit Badge System — Frequently Asked Questions

---

## Getting Started

### Q: What's the difference between the badge levels?
**A:** 
- **Learner (🎓):** Entry-level for your first merged contribution. Recognizes you understand CLAUDE.md standards.
- **Contributor (🚀):** Active community member with 5+ contributions across multiple categories. Shows consistent quality.
- **Expert (🏆):** Domain authority with 20+ contributions, published guides, and mentorship activity. Demonstrates thought leadership.
- **Enterprise Partner (💼):** Reserved for organizations or individuals with formal partnership agreements.

### Q: Do I have to apply for each badge level?
**A:** 
- **Learner & Contributor:** Automatic awarding when requirements are met (system checks monthly).
- **Expert:** Invite-only OR you can submit an application after meeting base requirements (≥20 contributions).
- **Enterprise Partner:** By invitation only; requires partnership agreement.

### Q: How long does it take to get a badge?
**A:**
- **Learner:** First contribution → 2-4 weeks (after PR merge + review)
- **Contributor:** 3-6 months typical (depends on contribution velocity)
- **Expert:** 1-3 years (requires sustained engagement + mentorship)
- **Enterprise Partner:** 2-6 weeks (after agreement execution)

---

## Eligibility & Requirements

### Q: Can I get a Contributor badge immediately after my Learner badge?
**A:** No. You need:
- 4 more contributions (5 total)
- Contributions across ≥3 different directories/categories
- ≥50 reputation points
- At least 6 months of activity

Typically this takes 3-6 months of regular contributions.

### Q: What counts as a "contribution" for badge requirements?
**A:** Any merged PR to the main branch in these categories:
- Skill creation/enhancement
- Documentation/guides
- Workflow/agent definitions
- Bug fixes
- Theme/UI contributions
- Tool/CLI commands
- Translations

**Does NOT count:** Test-only changes, CI/CD tweaks, repo housekeeping (cleanup commits).

### Q: Can I contribute in just one category and still advance?
**A:** 
- **Learner:** Yes, any 1 contribution counts.
- **Contributor:** No, you need contributions in ≥3 different categories. This ensures broad community participation.
- **Expert:** Encouraged to have depth in 1-2 domains + breadth elsewhere.

### Q: What is "reputation score" and how do I track mine?
**A:** You earn points for various activities:
- Merged PR: +5 points
- Skill creation: +15 points
- Mentoring someone: +7 points
- Etc. (see BADGE_SYSTEM.md for full table)

**Track your score:** Run `npm run badge:score <github-username>`

### Q: Do my contributions need to be code, or can they be documentation?
**A:** Documentation counts equally! Examples:
- Writing a skill definition (counts as +15 points)
- Creating a workflow guide (counts as +8 points)
- Translating content to a new language (counts as +5 points per file)

All contributions are valued.

---

## Renewal

### Q: How often do I need to renew my badge?
**A:** Every 18 months. The system automatically checks your eligibility on the 1st of each month.

### Q: What happens if I don't renew?
**A:**
1. Month 15: Email notification that renewal window is open
2. Month 18: Automatic renewal if conditions met, OR
3. Month 18+: Warning email with requirements if conditions NOT met
4. Month 19: Badge marked "inactive" if still no renewal
5. Month 20: Badge removed from active profile (but historical record preserved)

You can reactivate by meeting requirements again.

### Q: What if I've been inactive but want to renew?
**A:** Submit a manual renewal application:
1. Run `npm run badge:apply-renewal <github-username>`
2. Provide evidence of contributions in past 18 months
3. Wait for maintainer review (2 weeks)
4. If approved: Badge restored

### Q: Can I renew early?
**A:** No, renewal checks happen at scheduled times (monthly on the 1st). But you can proactively contribute to ensure you meet requirements when the window opens.

### Q: What's the renewal requirement for each badge?

| Badge | Requirement |
|---|---|
| **Learner** | ≥1 new contribution in 18 months |
| **Contributor** | ≥3 contributions in past 18 months (any category) |
| **Expert** | ≥1 significant contribution per 6-month period (or active mentorship) |
| **Partner** | Active partnership agreement + annual review |

### Q: If I lose my badge, can I earn it back?
**A:** Yes! If your badge expired due to inactivity, you can meet the requirements again and it will be automatically restored.

**Exception:** Badges revoked for code of conduct violations cannot be reearned for 12 months.

---

## Reputation & Scoring

### Q: How are reputation points calculated?
**A:** See BADGE_SYSTEM.md Reputation Scoring System table. Examples:
- Merged PR: +5 points
- Skill creation: +15 points
- Bug fix with tests: +10 points
- Mentoring session: +7 points

### Q: Do my points ever decrease?
**A:** Yes, two ways:
- **Activity decay:** Points expire after 24 months of inactivity in that category
- **Code violations:** -50 points for code of conduct violations
- **Rejected PR:** -10 points (first time), -25 points (repeat)

### Q: Can I check my reputation score?
**A:** Yes:
```bash
npm run badge:score <github-username>
```

Shows breakdown by category, recent activities, and path to next badge level.

---

## Badge Display & Verification

### Q: How do I add my badge to my GitHub profile?
**A:** Once awarded:
1. Go to https://uitkit.dev/badges/verify/USERNAME
2. Copy the badge markdown or SVG URL
3. Add to your GitHub bio or README:
```markdown
![UitKit Contributor Badge](https://uitkit.dev/badges/contributor-badge.svg)
```

### Q: How do I add my badge to LinkedIn?
**A:** 
1. Go to your LinkedIn profile
2. Add a "Credential" under licenses & certifications
3. Use URL: `https://uitkit.dev/badges/verify/USERNAME`
4. UitKit company profile will show the endorsement

### Q: Can I customize my badge appearance?
**A:** 
- **Contributor & Expert:** Can choose badge color from primary palette
- **Learner & Partner:** Standard colors only

Request customization in your renewal or during award process.

### Q: How can people verify my badge is real?
**A:** Each badge links to a verification page:
- Shows your GitHub profile link
- Lists your contributions in each category
- Shows expiration date + renewal status
- Links to your merged PRs for proof

URL format: `https://uitkit.dev/badges/verify/USERNAME`

---

## Special Cases & Exceptions

### Q: I contributed to another open source project, does it count?
**A:** No, badges are strictly for contributions to the UitKit repository.

### Q: What if my contribution was a large, complex project?
**A:** Complex contributions may earn bonus points:
- Major refactor: +20 points (instead of +5)
- New complex feature: +25 points (instead of +15)
- Published research/benchmark: +30 points

Request bonus point review when submitting complex PRs.

### Q: Can I get a badge in a language other than English?
**A:** 
- Badge certificates are available in: English, French, German, Dutch, Spanish
- Request language preference when applying for Expert badge or renewal

### Q: What if I'm contributing on behalf of my company?
**A:** 
- Badge goes to you individually (the contributor)
- If your company has strategic partnership: They can pursue Enterprise Partner badge separately

### Q: Can companies get badges?
**A:** Yes, via the Enterprise Partner tier. Requirements include:
- Formal partnership agreement
- Dedicated support/integration
- Long-term commitment (≥1 year)

Contact UitKit leadership: maintainers@uitkit.dev

### Q: What if I disagreed with a badge decision?
**A:** Submit an appeal:
1. Email: badges-appeal@uitkit.dev
2. Explain your reasoning with supporting evidence
3. Appeal reviewed by independent committee (3 people, not original reviewers)
4. Decision within 4 weeks

---

## Badges & Community Standing

### Q: Will losing my badge hurt my reputation?
**A:** 
- Expired badge (due to inactivity): Shows historical activity, no stigma
- Revoked badge (code of conduct): Serious indicator; noted on profile with reason
- Downgraded badge: Treated as renewal, not negative

### Q: Can badges be taken away?
**A:** Yes, but only for:
- Code of conduct violations (after review)
- Inactivity ≥24 months (automatic downgrade, reversible)
- Quality concerns (3+ rejected PRs, 6-month probation, then revocation)

Most expirations are simply automatic (non-renewal), not revocations.

### Q: If my badge expires, does my GitHub contribution history still show?
**A:** Yes! Your contributions remain on your GitHub profile and in UitKit's repository. Only the badge status changes. A badge expiration doesn't erase your work.

---

## Badges & Benefits

### Q: What do I actually get with each badge?
**A:**
- **Learner:** Profile badge, email certificate, swag (one-time), community profile listing
- **Contributor:** Enhanced badge, priority PR review (48-hour SLA), exclusive office hours, conference speaking slots, premium swag
- **Expert:** Gold badge, featured homepage, press release, monthly stipend (optional), advisory board access
- **Partner:** Company logo placement, co-marketing, dedicated support, revenue sharing (optional)

### Q: Is there a cost to maintain a badge?
**A:** No. Badges are free. You just need to meet contribution requirements for renewal.

### Q: Can I earn swag multiple times?
**A:** 
- **Learner:** One-time (stickers, t-shirt)
- **Contributor:** Once per renewal (different items each cycle)
- **Expert:** Annually (custom merchandise)

### Q: Is there a stipend for Expert badge?
**A:** Possible, but optional. Expert badges can request monthly stipend (if approved by leadership), typically $50-200/month depending on contribution level. Must be actively contributing.

---

## Troubleshooting

### Q: I have 5 contributions but my badge hasn't been awarded yet. Why?
**A:** Check:
1. Are all 5 merged to `main` branch? (Not draft/PR stage)
2. Do they span ≥3 different directories? (e.g., skills/, workflows/, community/)
3. Is your account ≥6 months old?
4. Any code of conduct violations?

If all pass: System checks on the 1st of each month. You should see your badge then.

### Q: The badge verification page shows my name but says "unverified". What's wrong?
**A:** 
- This appears during the 2-week verification window after your PR merge
- Should resolve automatically; if not, contact: badges-support@uitkit.dev

### Q: My badge disappeared! Where did it go?
**A:** Check renewal status:
```bash
npm run badge:status <github-username>
```

If expired: You can reactivate by meeting renewal requirements and submitting a manual renewal application.

### Q: I'm a maintainer. How do I award badges to others?
**A:** See BADGE_ADMINISTRATION.md for admin commands and procedures.

### Q: Can I export or backup my badge?
**A:** Yes:
```bash
npm run badge:export <github-username>
```

Generates:
- PDF certificate
- PNG/SVG badge images
- JSON profile data
- Verification link

---

## Enterprise & Partnership

### Q: How does the Enterprise Partner badge work?
**A:** Different from community badges. Enterprise Partners:
- Must sign formal partnership agreement
- Can be Technology, Reseller, Educational, or Sponsor tier
- Earn logo placement, co-marketing, and revenue sharing opportunities
- Renew annually (not 18 months)

Contact: partnerships@uitkit.dev

### Q: Can an individual be an Enterprise Partner?
**A:** Yes, if you've commercialized UitKit or integrated it into a business (e.g., consulting practice, SaaS product). Requires agreement and annual review.

### Q: What's the difference between Expert and Enterprise Partner badges?
**A:**
- **Expert:** Community recognition, earned through contributions
- **Enterprise Partner:** Commercial partnership, formal agreement required

An Expert can also become a Partner (and have both badges).

---

## Contact & Support

### Need help?
- **General questions:** GitHub Discussions or community Discord
- **Technical issues:** badges-support@uitkit.dev
- **Appeals:** badges-appeal@uitkit.dev
- **Partnerships:** partnerships@uitkit.dev
- **Admin/maintainer questions:** maintainers@uitkit.dev

### Last Updated
June 22, 2026

### Feedback
Have ideas to improve the badge system? File an issue or discussion in the UitKit repository.

---

## Quick Reference

| Question | Answer | Link |
|---|---|---|
| How do I get started? | Make your first contribution | [CONTRIBUTION_GUIDE.md](../community/CONTRIBUTION_GUIDE.md) |
| What are the requirements? | See full badge specs | [BADGE_SYSTEM.md](BADGE_SYSTEM.md) |
| How do I renew? | Submit application or wait for auto-check | [RENEWAL_CHECKLIST.md](RENEWAL_CHECKLIST.md) |
| How do I verify a badge? | Visit verification URL | https://uitkit.dev/badges/ |
| Who are our Expert contributors? | Browse showcase wall | [SHOWCASE_WALL.md](../community/SHOWCASE_WALL.md) |
