# Community Stacks — UitKit

Welcome to the community contribution hub. This directory contains submission guidelines, review processes, and templates for sharing your custom Claude Code stacks with the UitKit community.

---

## What Are Community Stacks?

Community stacks are domain-specific toolkits contributed by Claude Code users—including skills, agents, hooks, prompts, and workflows—that extend UitKit's functionality. Examples:

- **Sales Engineer Stack:** Tools for technical sales, objection handling, deal analysis
- **Legal Document Review Stack:** Contract analysis, compliance checking, redaction workflows
- **Data Science Stack:** Exploratory analysis, model evaluation, reproducibility templates
- **DevOps Stack:** Incident response, infrastructure audit, deployment checklists

Each stack follows UitKit's standards (CLAUDE.md structure, skill format, documentation clarity) and is available for installation via the UitKit marketplace.

---

## Why Contribute a Stack?

**For you:**
- Share domain expertise with a global audience of Claude Code users
- Build visibility and reputation as a specialist
- Get feedback from experienced practitioners in your field
- Maintain long-term support for your tools (community help + official maintenance)

**For the community:**
- Accelerate specialized workflows (lawyers, engineers, PMs don't start from scratch)
- Learn best practices from curated examples
- Reduce duplicated effort across the ecosystem
- Build a shared library of high-quality templates

**For UitKit:**
- Grow the knowledge system with vetted, community-led contributions
- Maintain quality by centralizing review and testing
- Empower users to solve domain-specific problems faster

---

## Getting Started

### Step 1: Check the Prerequisites

Before submitting, ensure your stack meets these requirements:

- **Structure:** Follows UitKit's directory layout (CLAUDE.md, README.md, skills/, hooks/, etc.)
- **CLAUDE.md:** Defines stack identity, persona, skills table, commands, hooks, and domain frameworks
- **Skills:** Each skill has a SKILL.md file with When to activate, When NOT to use, Instructions, and Example sections
- **Documentation:** All files are clear, written for senior developers, no placeholder content
- **No application code:** Stack is configuration + documentation only (no `src/`, `app/`, or runtime code)
- **Language:** English-only for initial submission (translations handled by community managers)

### Step 2: Review the Guidelines

Read `guides/marketplace/getting-started.md` for a walkthrough of:
- Skill design patterns
- CLAUDE.md structure and requirements
- How to write clear, actionable instructions
- Testing your stack locally before submission

### Step 3: Use the Template

Start with `community/template/stack-template/` as your boilerplate:
- Copy the template directory
- Rename to your stack name (kebab-case)
- Edit CLAUDE.md to define your stack's identity and domain
- Create or adapt skills for your use case
- Fill in submission.json with metadata

### Step 4: Test Your Stack

Before submitting:
1. Verify all SKILL.md files have complete sections (When to activate, Instructions, Example)
2. Test examples in the example section—they must be runnable
3. Check that all cross-references (links between skills, commands, hooks) are valid
4. Ensure CLAUDE.md tone is consistent (senior developer audience, no filler)
5. Run a linter on markdown files (check for typos, formatting)

### Step 5: Submit Your Stack

**Via GitHub:**
1. Fork the UitKit repository
2. Create a feature branch: `git checkout -b stacks/your-stack-name`
3. Add your stack directory to the repo root
4. Include a completed `submission.json` file in the stack root
5. Create a pull request with a summary of:
   - What the stack does (1-2 sentences)
   - Which skills it includes
   - Who it's designed for
   - Any translations planned

**Review time:** 1-2 weeks (automated checks first, then manual review by UitKit maintainers)

---

## Submission Review Process

### Automated Checks (24 hours)
Before manual review begins, your submission is validated for:
- ✓ File structure (CLAUDE.md, README.md, skills/ present)
- ✓ Frontmatter and metadata (valid YAML, submission.json schema)
- ✓ Markdown syntax (valid format, no broken links)
- ✓ File naming (kebab-case for files and directories)
- ✓ No application code (no src/, bin/, dist/ directories)

**If checks fail:** You'll get a detailed error report. Fix and push again.

### Manual Review (1-2 weeks)
See `REVIEW_CHECKLIST.md` for the full criteria. Reviewers check:
- **Content completeness:** All required sections in CLAUDE.md and skills
- **Quality:** Instructions are specific and actionable, not generic
- **Examples:** Each skill example is concrete and runnable (not placeholder)
- **Accuracy:** Descriptions match actual functionality; no misleading claims
- **Clarity:** No typos, grammar errors; tone consistent throughout
- **Completeness:** README covers when/how to use the stack

**If feedback is needed:** Reviewers will comment on the PR. You can push updates; they'll re-review.

**When approved:** PR is merged, stack is added to the marketplace, and you're credited as author.

---

## Submission Metadata (submission.json)

Every stack must include a `submission.json` file with the following fields:

```json
{
  "name": "legal-document-review",
  "displayName": "Legal Document Review",
  "description": "Tools for contract analysis, compliance checking, and redaction workflows for in-house counsel and legal teams.",
  "category": "Legal",
  "tags": ["contracts", "compliance", "document-review", "redaction", "negotiation"],
  "author": {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "github": "janesmith"
  },
  "license": "MIT",
  "repository": "https://github.com/janesmith/uitkit-legal-stack",
  "version": "1.0.0",
  "minimumClaudeVersion": "2026-01",
  "keywords": ["legal", "contracts", "compliance", "document-review"],
  "skills": [
    "contract-analysis",
    "compliance-check",
    "redaction-workflow"
  ]
}
```

**Field definitions:**
- **name:** Kebab-case identifier (unique across UitKit)
- **displayName:** Human-readable name for marketplace
- **description:** 1-2 sentences on what the stack does and who it's for
- **category:** One of: Legal, Sales, Engineering, Product, Marketing, Operations, Data, Compliance, Other
- **tags:** 3-5 searchable keywords (lowercase, hyphenated)
- **author:** Your name, email, GitHub handle (credit attribution)
- **license:** MIT, Apache-2.0, GPL-3.0, or CC-BY-4.0 (open-source recommended)
- **repository:** GitHub repo URL (if open-source) or "private" (for community-only)
- **version:** Semantic versioning (start with 1.0.0)
- **minimumClaudeVersion:** Oldest Claude Code version your stack supports
- **keywords:** Search terms for marketplace discovery
- **skills:** List of skill names included in the stack

---

## Code of Conduct

By submitting a community stack, you agree to:

1. **Accuracy:** All claims about functionality are truthful and verifiable
2. **No malware:** Your stack contains no hidden, malicious, or harmful code (automation, analytics, etc.)
3. **Respect:** You respect the UitKit code of conduct and community guidelines
4. **Attribution:** You credit all sources, inspiration, and prior art
5. **Maintenance:** You're responsive to bug reports and pull requests for 3+ months post-launch (or transfer maintenance to a co-maintainer)
6. **Community spirit:** You contribute in the spirit of helping others, not for personal profit or promotion

Violations may result in stack removal and contributor suspension.

---

## Attribution & Credit

**In UitKit marketplace:**
- Your name appears as the stack author
- Your GitHub profile is linked for discovery
- Stack README includes a "Maintained by [Author]" disclaimer

**In documentation:**
- Original stack creators are credited in CHANGELOG.md when updates are merged
- If someone forks your stack, credit the original author in their submission

**Maintenance handoff:**
- If you can no longer maintain your stack, you can:
  - Transfer it to a co-maintainer or community member
  - Mark it as "archived" (read-only; community can fork)
  - Request removal from the marketplace

---

## Examples of Strong Submissions

### Example 1: Sales Engineer Stack
```
Directory: sales_engineer_stack/
├── CLAUDE.md (identity: SalesEng team lead; frameworks: deal analysis, objection handling)
├── README.md (when to use, 4 skills, 2 commands)
├── skills/
│   ├── deal-analysis/SKILL.md (When/why to use, ROI calculator, example deal)
│   ├── objection-handling/SKILL.md (common objections, counter-frameworks, example)
│   ├── feature-positioning/SKILL.md (positioning by customer segment, examples)
│   └── proposal-generator/SKILL.md (template-based proposal, worked example)
├── commands/
│   └── deal-sizing.sh (estimates deal size from company profile)
└── submission.json (all fields filled)
```

**Why it's strong:**
- Clear domain focus (sales engineering, not generic "sales")
- Concrete examples for every skill (real deal, actual objections)
- Actionable instructions (not "use AI to analyze"; shows specific steps)
- Commands are useful workflows, not afterthoughts

### Example 2: DevOps Platform Stack
```
Directory: devops_platform_stack/
├── CLAUDE.md (identity: SRE/DevOps lead; framework: incident response)
├── README.md (3 core skills, hooks for monitoring)
├── skills/
│   ├── incident-response/SKILL.md (detection → triage → mitigation → postmortem)
│   ├── infrastructure-audit/SKILL.md (security, performance, cost checks)
│   └── deployment-validation/SKILL.md (smoke tests, rollback strategy)
├── hooks/
│   ├── alert-aggregator.sh (scans monitoring for critical alerts)
│   └── deployment-notifier.sh (notifies on deployment completion)
└── submission.json (well-populated)
```

**Why it's strong:**
- Hooks are real automations (not just examples)
- Skills follow a clear workflow (incident response steps in sequence)
- README links to infrastructure decision frameworks
- Examples include actual alerts and playbooks

---

## FAQ

**Q: Can my stack promote a commercial product or service?**  
A: No. UitKit is open-source and community-focused. If your stack is tied to a paid SaaS product, it can be included only if it's useful to non-customers too. Obvious advertising will be rejected.

**Q: How often can I update my stack?**  
A: As often as needed. Submit via PR; we'll review and merge within 1-2 weeks. We recommend batching updates (monthly or quarterly) unless there's a bug fix.

**Q: Can I include external dependencies or MCP connections?**  
A: Yes, but document them clearly in CLAUDE.md and provide setup instructions. If the dependency is paid or proprietary, note that in the README.

**Q: What if my stack isn't translated yet?**  
A: Submit in English. Community managers or volunteers may add translations (DE, ES, FR, NL) after publication. You can also contribute translations in a follow-up PR.

**Q: Can I include hooks that modify files outside the stack directory?**  
A: Not recommended. Hooks should be isolated to the stack directory or user's project (via explicit opt-in). Modifying global configs without user consent will be rejected.

**Q: How do I handle feedback from reviewers?**  
A: Respond to PR comments with clarifications or code changes. We're collaborative—if you disagree with feedback, discuss it in the comment thread. The goal is to improve the stack together.

---

## Support & Maintenance

**After your stack is published:**
- GitHub issues and PRs on your repository (if public)
- Community discussions on the UitKit forum
- UitKit maintainers monitor for major bugs and security issues

**If you need help:**
- Ask in the #community-stacks channel (if applicable)
- Open an issue on the main UitKit repo (for infrastructure problems)
- Email the maintainers directly (contact info in CLAUDE.md)

**Deprecation & Sunset:**
- If a stack becomes unmaintained for 6+ months, UitKit may:
  - Mark it as "archived" (read-only)
  - Recommend community forks as alternatives
  - Remove it from the primary marketplace (keep in archive)

---

## Next Steps

1. Read `guides/marketplace/getting-started.md` for skill design patterns
2. Copy `community/template/stack-template/` and customize
3. Follow the checklist in `community/REVIEW_CHECKLIST.md`
4. Test your stack locally (examples must run)
5. Submit via PR with a filled `submission.json`

**Questions?** Check the FAQ above or open a discussion issue.

---

**Last updated:** June 15, 2026 | **Maintained by:** UitKit Community Team
