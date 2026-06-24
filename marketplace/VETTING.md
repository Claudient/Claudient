# UitKit Marketplace Vetting Criteria

This document defines the quality standards for stacks submitted to the UitKit Marketplace. All official stacks meet these criteria. Community stacks must meet baseline criteria to appear in the marketplace.

## Vetting Levels

### Baseline (Required for Marketplace Listing)

All stacks — official and community — must meet baseline criteria:

- **Structure:** Follows UitKit directory structure
- **Naming:** All files use kebab-case; directories are lowercase
- **Required files:** README.md, STACK.json present and valid
- **No prohibited content:** No proprietary secrets, licensed third-party IP, or unethical content
- **License:** MIT, Apache 2.0, CC-BY-SA-4.0, or equivalent
- **Repository:** Public GitHub repo (required for community stacks)
- **Code of conduct:** Alignment statement provided in PR

### Community (Additional Criteria for Community Stacks)

Community stacks undergo light review:

- **Completeness:** Solves at least one real problem end-to-end
- **Minimal skills:** At least 3 skills included
- **Documentation:** README explains use cases and provides a quick start
- **Examples:** At least 1 example or session log showing real usage
- **Accuracy:** Content is factually correct; tools/practices are current
- **Clarity:** Clear writing; no significant errors or ambiguity
- **Uniqueness:** Doesn't duplicate existing stacks without significant differentiation

### Official (High Bar for Official Certification)

Official stacks (UitKit-certified or promoted from community) meet higher standards:

- **Completeness:** End-to-end coverage of the domain; users can build end products
- **Breadth:** 5+ skills; multi-component architecture (skills + agents + workflows)
- **Excellence:** Consistently high quality across all components
- **Accuracy:** Reviewed by domain experts; best practices current
- **Examples:** Multiple comprehensive examples; session logs; real-world use cases
- **Documentation:** README, CLAUDE.md, in-line skill documentation all complete
- **Translations:** All content available in English; FR, DE recommended (ES, NL optional)
- **Maintenance:** Regular updates; responsive to issues and feedback
- **Adoption:** 100+ downloads in first 60 days
- **Ratings:** 4.5+ average user rating

## Review Process

### Automated Checks (Immediate)

When a PR is opened, the marketplace bot performs automated checks:

1. **Structure validation:**
   - Directory exists with correct name
   - Required files present: README.md, STACK.json
   - No extraneous files outside expected directories

2. **STACK.json validation:**
   - Valid JSON
   - Required fields: id, name, description, author, license, version
   - License is MIT, Apache-2.0, CC-BY-SA-4.0, or listed equivalent
   - Minimum skills count: 3

3. **File naming:**
   - All files follow kebab-case (no underscores, spaces, or CamelCase)
   - Directories are lowercase
   - STACK.json and README.md are capitalized correctly

4. **Content scanning:**
   - No API keys, credentials, or secrets
   - No flagged license types (GPL, proprietary, unlicensed third-party)
   - No prohibited content (hate speech, harassment, etc.)

**If automated checks fail:** PR is blocked; author must fix and push again.

### Human Review (3-5 business days)

A marketplace reviewer conducts substantive evaluation:

1. **Scope and domain:**
   - Does the stack serve a real, well-defined domain?
   - Is the use case clearly articulated?
   - Do skills cover key aspects of the domain?

2. **Completeness:**
   - Are all documented features actually implemented?
   - Are skills functional and self-contained?
   - Do examples work end-to-end?

3. **Accuracy:**
   - Is content factually correct?
   - Are tools/practices current (updated within last 12 months)?
   - Are there outdated or deprecated patterns?
   - Are claims about Claude or Claude Code accurate?

4. **Documentation quality:**
   - Is README clear and complete?
   - Do skills have clear instructions and examples?
   - Is CLAUDE.md (if present) internally consistent?
   - Are links valid and not broken?

5. **Code and content quality:**
   - Markdown is well-formatted
   - No typos or grammatical errors
   - Examples are runnable and instructive
   - No obviously problematic code (hardcoded credentials, security issues)

6. **User experience:**
   - Can a new user install and use the stack in 5 minutes?
   - Are CLI instructions clear and correct?
   - Do session logs or examples demonstrate value?

### Feedback and Revision

If review identifies issues:

1. **Minor:** Style, grammar, clarity → Author makes fixes
2. **Moderate:** Missing examples, unclear docs → Author adds content
3. **Major:** Accuracy concerns, incomplete implementation → Author revises and resubmits
4. **Blocker:** Prohibited content, licensing issues → PR rejected; author must fix fundamentally

Authors have **2 weeks to respond** to feedback. Stalled PRs may be closed.

### Approval

Once approved:

1. Stack is merged into main
2. STACK.json is indexed
3. Stack appears in marketplace within 24 hours
4. Author is notified; feedback summary is provided

## Certified Official Stacks

Official stacks are marked with a "Certified" badge in the marketplace.

### Promotion Criteria

A community stack becomes officially certified when:

- **Adoption:** 100+ installs over 60 days
- **Quality:** 4.5+ average rating; no critical issues reported
- **Maintenance:** Author has made updates within last 90 days
- **Completeness:** Stack covers domain end-to-end
- **Accuracy:** No errors identified in review; content is current
- **Support:** Author responds to issues within 2 weeks

### Certification Process

1. Author emails `marketplace@uitkit.dev` with stack name and GitHub repo
2. Core team evaluates stack using certification criteria
3. If approved: official badge is added; stack is moved to official section
4. Core team may offer to co-maintain (optional)

### Recertification

Official stacks are recertified annually:

- [ ] Content is still accurate
- [ ] Stack has been maintained (updates within 12 months)
- [ ] Average rating remains 4.5+
- [ ] No unresolved critical issues

If a stack fails recertification, the author is notified and given 60 days to update before demotion.

## What Gets Rejected

Stacks are rejected if they:

1. **Violate licensing:**
   - Use GPL without appropriate disclosure
   - Embed proprietary or licensed code without permission
   - Use third-party content without attribution

2. **Contain prohibited content:**
   - Hardcoded secrets, API keys, credentials
   - Hate speech, harassment, or discriminatory content
   - Illegal content (hacking, fraud, etc.)
   - Unethical manipulation or deception

3. **Fail quality bar:**
   - Fewer than 3 skills
   - No README or invalid STACK.json
   - Examples don't work
   - Content is significantly inaccurate or outdated

4. **Duplicate existing stacks:**
   - Same domain and use cases as existing stack
   - No meaningful differentiation or improvement

5. **Out of scope:**
   - Marketing materials or blog posts
   - Incomplete work-in-progress stacks
   - Stacks for proprietary platforms (not Claude Code)

## Reviewer Guidelines

Reviewers evaluate stacks holistically:

- **Assume good faith:** Authors are experts in their domain
- **Be constructive:** Offer suggestions, not just criticism
- **Respect voice:** Don't rewrite style; focus on accuracy and clarity
- **Check facts:** Verify claims about tools, practices, Claude features
- **Test examples:** Run at least 1 example to confirm it works
- **Respond promptly:** Provide feedback within 5 business days

## Appealing a Decision

If a stack is rejected or a review decision is disputed:

1. Author can request clarification from reviewer (within 1 week of decision)
2. If unsatisfied, author can escalate to `marketplace@uitkit.dev`
3. Escalation is reviewed by 2 core team members (5 business days)
4. Decision is final; no further appeals accepted

## Certification

Once a stack is published in the marketplace, it becomes eligible for certification. Certification is a **distinct recognition** from the initial marketplace review and indicates ongoing quality and maintenance commitment.

### About Certification

Certification has three tiers:

- **Bronze:** Stack passes validation and human review; author commits to maintenance SLA
- **Silver:** Stack has 50+ installs, 4.0+ rating, and meets additional quality criteria
- **Gold:** Stack has 200+ installs, 4.5+ rating, and is endorsed by official maintainers

Certification is **optional** — stacks can remain published without certification. However, certified stacks receive special badging and prominence in the marketplace.

### Certification Process

See [CERTIFICATION.md](./CERTIFICATION.md) for certification tier details and requirements.

For step-by-step certification instructions, see [guides/marketplace/becoming-certified.md](../guides/marketplace/becoming-certified.md).

For detailed quality criteria and measurement methodology, see [guides/marketplace/certification-criteria.md](../guides/marketplace/certification-criteria.md).

### Current Certified Stacks

See [marketplace/certified/README.md](./certified/README.md) for the index of all certified stacks by tier.

---

## Dispute Resolution

If issues arise post-publication:

- **Bug reports:** Author should fix within 2 weeks
- **Accuracy disputes:** Resolved by core team; decision is final
- **Licensing disputes:** Legal review; stack may be removed if unresolved
- **Code of conduct violations:** Stack is removed; author banned from resubmitting

## Questions?

- **Vetting questions:** marketplace@uitkit.dev
- **Process questions:** [GitHub Discussions](https://github.com/uitkits/uitkit/discussions)
- **Community support:** [Discord](https://join.uitkit.dev)

---

**Last updated:** June 15, 2026
