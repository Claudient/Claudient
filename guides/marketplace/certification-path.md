# Certification Path for Marketplace Stacks

Guidance for earning a certified badge on your published Claude Code Marketplace stack.

---

## What Certified Means

A certified stack has passed community vetting and is actively maintained by its author.

**Certified badge indicators:**
- Meets or exceeds quality standards
- Has been published and actively used
- Authors are responsive to bug reports and feature requests
- No critical unresolved issues
- Maintained across Claude Code version updates

**In the marketplace listing:**
A certified stack displays a ✓ badge next to its name:
```
✓ Your Stack Name
```

---

## Current Certified Stacks

As of this writing, the following official stacks are certified:

- Backend Productivity Stack
- Data Pipeline Stack
- Security Hardening Stack

---

## How to Earn Certification

To request certification for your published stack, all of the following must be true:

### 1. Published for 2+ Weeks

Your stack must be live in the marketplace for at least two weeks. This allows time for:
- Real usage to validate functionality
- Bug reports to surface
- Community feedback to accumulate

**How to check:** Review the merge date of your stack's PR in GitHub.

### 2. No Critical Unresolved Issues

All reported bugs must be either:
- Fixed and released
- Marked as "by design"
- Documented as a known limitation

**How to check:** Review open GitHub issues for your stack. Filter by label `critical` or `bug`.

### 3. Minimum 2 External Users

At least 2 people outside your organization must be using and benefiting from the stack.

**How to provide evidence:**
- Get written statements from external users describing how they use the stack
- Collect GitHub stars or "watching" counts
- Reference community feedback, support tickets, or testimonials
- Include email or GitHub handle of users with permission

**How to verify:**
- Check GitHub "Stargazers" list
- Ask community members via Discord/Slack to confirm usage
- Request testimonials from users

### 4. Active Maintenance

You must commit to ongoing support:
- Respond to GitHub issues within 1 week
- Update the stack when Claude Code releases major versions
- Fix reported bugs
- Keep examples and guides current
- Address deprecations in dependencies

**What active maintenance looks like:**
- GitHub issues have responses within 7 days
- Stack has been updated in the last 3 months (bug fixes, documentation, or Claude Code compatibility)
- Examples reference current Claude Code versions

---

## Annual Recertification

Once certified, you must maintain certification status annually:

1. **Every 12 months**, the Claude Code team reviews certified stacks
2. **Recertification checks:**
   - Stack is still actively maintained (commits in last 3 months)
   - No unresolved critical issues
   - Version compatibility with current Claude Code
   - Author is still responsive (issues/PRs get replies)

3. **If standards slip:**
   - You'll receive a 30-day notice
   - Fix the issues (update docs, resolve bugs, etc.)
   - Recertification is granted if standards are met

4. **If not maintained:**
   - Certification badge is removed
   - Stack remains published but is marked as "unmaintained"
   - Users are warned about lack of updates

---

## Requesting Certification

### Step 1: Prepare Your Evidence

Gather documentation of:
- **Published for 2+ weeks**: Screenshot of merge date or link to PR
- **No critical issues**: Screenshot of GitHub issues (sorted by `critical` label, all resolved)
- **External users**: Written statements or email addresses of 2+ users (with permission)
- **Active maintenance**: Log of recent commits or issue responses

### Step 2: Create a GitHub Issue

Navigate to the main UitKit repository and create an issue:

**Title:** `Certification request: Your Stack Name`

**Body:**
```markdown
## Certification Request

**Stack Name:** Your Stack Name
**Stack Repository:** [Link to stack in main repo]
**Author:** Your Name (@your-github-handle)

### Evidence

#### Published for 2+ Weeks
- Merged on: [Date]
- Link to merge PR: [URL]
- Days since merge: X

#### No Critical Issues
- Open critical issues: 0
- Recent issues resolved: [List 2-3 with dates]
- [Link to GitHub issues page filtered by critical]

#### External Users
1. **Name:** Alice Chen, **Role:** Backend Engineer at TechCorp
   - Email: alice@techcorp.com (permission granted ✓)
   - Testimonial: "This stack saved our team 5+ hours per week on debugging. The Docker tools are invaluable."

2. **Name:** Bob Martinez, **Role:** DevOps at StartupXYZ
   - Email: bob@startupxyz.com (permission granted ✓)
   - Testimonial: "Comprehensive and well-documented. Our entire team uses it."

#### Active Maintenance
- Last update: [Date]
- Recent commits:
  - [Commit message] (Date)
  - [Commit message] (Date)
- Issue response time: ~[X days] average
- Claude Code version compatibility: v1.8.0+

### Checklist
- [x] Stack published 2+ weeks ago
- [x] No unresolved critical issues
- [x] 2+ external users with documented feedback
- [x] Actively maintained with recent commits
- [x] Ready for annual recertification process
```

### Step 3: Review and Approval

The Claude Code team will:
1. Verify your evidence (typically 3–5 days)
2. Check the stack yourself
3. Approve or request clarifications

If approved, your stack receives the certified badge within 1 week.

---

## Maintaining Certification

Once certified:

1. **Continue standard maintenance:**
   - Respond to issues within 1 week
   - Release bug fixes promptly
   - Update examples for major Claude Code versions

2. **Document updates:**
   - Keep CHANGELOG.md current in your stack
   - Tag releases in GitHub with semantic versioning

3. **Annual recertification:**
   - Around the 12-month anniversary, you'll be notified
   - Provide a simple checklist showing ongoing maintenance
   - Renewal is automatic if standards are met

---

## Loss of Certification

Your certified badge is removed if:

1. **Unresolved critical issues persist for 2+ weeks**
   - Example: Security vulnerability not patched
   - Solution: Fix the issue and request revalidation

2. **No maintenance for 3+ months**
   - Example: No commits, issues not replied to
   - Solution: Resume maintenance and request revalidation

3. **Incompatibility with current Claude Code**
   - Example: Stack requires deprecated features
   - Solution: Update to current Claude Code API and resubmit

4. **Author becomes unresponsive (>2 weeks on issues/PRs)**
   - Example: Multiple unanswered questions from users
   - Solution: Designate a maintainer or update response time expectations

**Revalidation process:**
If your certification is removed:
1. You'll receive a 30-day notice with specific issues
2. Fix the issues
3. Request revalidation using the same GitHub issue process
4. You'll be recertified or given additional feedback

---

## Benefits of Certification

Certified stacks receive:
- ✓ Badge in the marketplace
- Prominent listing in "Certified Stacks" category
- Feature in the Claude Code newsletter (occasionally)
- Community trust and visibility
- Right to display "Claude Code Certified" in your marketing materials

---

## FAQ

**Q: Do I have to get certified?**
A: No. Certification is optional. Non-certified stacks are still published and available. Certification just provides an extra trust signal to users.

**Q: Can I request certification before 2 weeks?**
A: No. The 2-week minimum ensures real-world usage and feedback. Reach out at 1.5 weeks if you have evidence of early adoption.

**Q: What counts as "active maintenance"?**
A: At minimum, responses to GitHub issues within 7 days and compatibility updates within 4 weeks of a Claude Code major release.

**Q: What if I stop maintaining my stack?**
A: The badge is removed after 3 months of no commits or issue responses. You can request it back once maintenance resumes.

**Q: Can my certification be revoked mid-year?**
A: Only if a critical unresolved issue exists for 2+ weeks. Annual recertification happens on a fixed schedule.

**Q: What if someone else takes over maintenance?**
A: Update the author/maintainer field in submission.json. The new maintainer must agree to certification terms.

**Q: Can I request an exception to the 2-week rule?**
A: Yes, for official UitKit stacks or high-profile community contributions. Request in writing to the Claude Code team.

**Q: How do I know if my stack has been selected for annual review?**
A: You'll receive a GitHub issue notification 30 days before recertification deadline. No action needed if all is well — it's automatic renewal.

---

## Contacts

- **Certification questions**: Create a GitHub issue with the label `certification`
- **Community support**: Claude Code community Slack/Discord (linked in main README)
- **Escalations**: Email team@uitkit.ai

---

## Example: Path to Certification

**Timeline:**

| Date | Event |
|------|-------|
| Jan 15 | Stack published to marketplace |
| Jan 20 | First external user reports success |
| Feb 1 | Second external user provides feedback |
| Feb 15 | 2-week minimum met; author requests certification |
| Feb 20 | Team reviews evidence and approves |
| Feb 25 | Certified badge published |
| Feb 26+ | Annual maintenance cycle begins |
| Feb 26 annually | Recertification reviewed |

This timeline assumes no critical issues and consistent maintenance.

---

Congratulations on publishing your stack! Certification is within reach with continued focus on quality and community support.
