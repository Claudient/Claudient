# UitKit Publisher Guidelines

Rules and expectations for all stack authors publishing to the UitKit Marketplace — official and community.

## Licensing Requirements

### Required: Open Source License

All stacks must use an open source license that permits free use, modification, and redistribution:

**Recommended licenses** (in order of preference):
- **MIT** — Permissive; allows commercial use; simple and clear
- **Apache 2.0** — Permissive; includes explicit patent grant; good for companies
- **CC-BY-SA-4.0** — Attribution required; derivative works must use same license; good for content

**Acceptable licenses:**
- GNU LGPL 2.1+ (permissive component-level)
- ISC License
- BSD 2-Clause or 3-Clause
- WTFPL (humor license, legally valid)
- Any license approved by [OSI](https://opensource.org/licenses/) or [Creative Commons](https://creativecommons.org/about/cclicenses/)

**Prohibited licenses:**
- GNU GPL v2/v3 (requires derivative works to be GPL; incompatible with permissive licenses)
- Proprietary, commercial, or unlicensed code
- Any license restricting commercial use or redistribution

### Include LICENSE File

Your stack repository **must** include a `LICENSE` file at the root:

```
your-stack-repo/
├── LICENSE                   # Copy of your chosen license
├── README.md
├── STACK.json
└── ...
```

**To add a license:**

```bash
# MIT
curl https://opensource.org/licenses/MIT > LICENSE

# Apache 2.0
curl https://www.apache.org/licenses/LICENSE-2.0.txt > LICENSE

# CC-BY-SA-4.0
curl https://creativecommons.org/licenses/by-sa/4.0/legalcode.en > LICENSE
```

Commit and push the LICENSE file.

## Repository Requirements

### Public & Documented

Your stack must have a **public GitHub repository** (or equivalent) with:

1. **Clear README** explaining:
   - What the stack does
   - Who it's for
   - How to install and use it
   - Links to any external docs

2. **LICENSE file** (required; see above)

3. **Open issues/discussions** (GitHub Issues or Discussions enabled for user feedback)

4. **Code of conduct** alignment statement (see below)

5. **Contact information** for support (email, GitHub profile, or link to contact page)

### Keep Repository Public

Once published, the repository **must remain public**. Deleting or making private after publication:

- Violates the open source license terms
- May result in your stack being removed from the marketplace
- Can lead to author banning

**Exception:** You can archive a repository if you announce deprecation 60 days in advance and provide a migration path.

### Maintenance

You agree to:

- **Respond to issues** within 2 weeks
- **Fix critical bugs** promptly (within 1 week)
- **Update outdated content** within 60 days of notification
- **Maintain repository** — keep README, examples, and links current

If a stack is unmaintained for 6+ months:
- Marketplace team will attempt to contact you
- If unresponsive for 3 more months, stack may be marked as "inactive"
- After 12 months of inactivity, stack may be delisted

## Code of Conduct Alignment

All stacks must align with ethical and inclusive standards.

### Required Statement

Include this in your stack's PR description:

```
I affirm that this stack:
- Contains no hate speech, harassment, or discriminatory content
- Respects intellectual property and is properly licensed
- Promotes ethical use of AI and Claude Code
- Aligns with UitKit's Code of Conduct
```

### Standards

Your stack content must:

- **Be inclusive:** Use respectful, gender-neutral language; avoid stereotypes
- **Be ethical:** No content promoting fraud, hacking, manipulation, or harm
- **Respect IP:** All third-party content is properly attributed and licensed
- **Avoid discrimination:** No content based on race, gender, sexual orientation, disability, religion, etc.
- **Be professional:** Language appropriate for a professional, diverse audience

### Consequences

Violation of code of conduct:

- **First offense:** Author is warned; content flagged for review
- **Second offense:** Stack is delisted from marketplace
- **Third offense:** Author is banned from publishing to marketplace

## Trademark & Branding Rules

### Your Stack Name

You own the naming of your stack. Rules:

- **Unique:** Don't use names of existing stacks without differentiation
- **Clear:** Name should reflect the domain (e.g., "Senior Backend Engineer," "Analytics Engineer")
- **Avoid:** No impersonation of existing brands or misleading names
- **Avoid:** No aggressive marketing language ("BEST EVER", "ONLY REAL")

### Mentioning Third-Party Products

When referencing tools, frameworks, or products:

- **Give credit:** "Built for FastAPI" or "Integrates with dbt"
- **Don't misrepresent:** "Pairs well with PostgreSQL" ≠ "PostgreSQL-approved"
- **Avoid false endorsement:** Don't claim official endorsements without permission
- **Use trademarks correctly:** Proper capitalization and attribution (e.g., "Kubernetes®")

### UitKit Branding

If you reference UitKit in your stack:

- **Accurate:** Use "UitKit Marketplace" or "Claude Code" correctly
- **Attribution:** Mention where the stack is published and link to marketplace
- **No impersonation:** Don't present your stack as "official UitKit" unless certified
- **Community badge:** Use the community badge logo (provided by marketplace team)

## Royalty & Profit Sharing

### No Royalties or Revenue Sharing

The UitKit Marketplace is **non-commercial**. Stack authors receive:

- **No monetary payment** from marketplace installs
- **No royalties** from UitKit
- **No revenue share** with UitKit

Stacks are contributed freely to the open source ecosystem.

### You Can Monetize Separately

However, you may:

1. **Offer paid consulting or training** around your stack (independently)
2. **Sell enterprise support** or SLAs for your stack
3. **Create paid courses or guides** (separate from the stack itself)
4. **Accept voluntary donations** (GitHub Sponsors, Ko-fi, etc.)
5. **Use your stack as a portfolio piece** for hiring, freelance, or consulting

**Transparency:** If you offer paid services related to your stack, disclose this in your README so users know paid options exist.

## Attribution & Credit

### Giving Credit

If your stack builds on or modifies another open source stack:

1. **Link to original:** Include a link to the original repository
2. **Explain differences:** Document what you changed or added
3. **Respect licenses:** Ensure your license is compatible with the original

Example:

```markdown
## Built On

This stack builds on the original [Senior Backend Engineer Stack](https://github.com/uitkits/senior-backend-engineer) 
with added support for event-driven architecture and CQRS patterns.
```

### Receiving Credit

When others build on your stack:

- They must include a link to your repository
- They must include your license in their derivative work
- They must document what they changed or added

**License compatibility:** If someone modifies your MIT-licensed stack, they can relicense it under MIT, Apache 2.0, or GPL (but then all derivatives must be GPL). For CC-BY-SA-4.0, derivatives must also use CC-BY-SA-4.0.

## Content Standards

### What's Allowed

- Technical guidance and best practices
- Code snippets and examples (in markdown)
- Links to external resources
- Personal methodology and opinions (labeled as such)
- Workflows, prompts, and skill definitions

### What's Not Allowed

- Proprietary or licensed code without permission
- Client work or confidential information
- Third-party proprietary prompts without attribution
- Marketing materials disguised as guides
- Misinformation or deliberately inaccurate content

### Accuracy & Recency

You agree to keep your stack current:

- **Update tools:** If a framework or best practice changes, update your stack within 90 days
- **Mark outdated content:** Use deprecation notices for older patterns
- **Test examples:** Ensure examples work with current tool versions
- **Cite sources:** Link to documentation or research for claims

If inaccuracies are reported:
- You should fix them promptly (within 2 weeks)
- Marketplace team may flag stack as "needs update" if ignored
- Stack may be delisted if misinformation is egregious

## Multi-Author Stacks

### Joint Ownership

If multiple authors contribute to a single stack:

1. **Designate a lead author** (responsible party)
2. **List all contributors** in README and STACK.json
3. **Agree on decision-making:** How are updates approved?
4. **Share contact info:** Include all authors' emails

Example STACK.json:

```json
{
  "author": "Alice Smith <alice@example.com>",
  "contributors": [
    "Bob Jones <bob@example.com>",
    "Carol Chen <carol@example.com>"
  ],
  "license": "MIT"
}
```

### Contributor Rights

All contributors agree to:
- The chosen open source license
- The code of conduct
- The publisher guidelines

## Dispute Resolution

### Licensing Disputes

If someone claims you've violated their license:

1. Marketplace team notifies you and provides details
2. You have **14 days to respond** with evidence of compliance
3. If unresolved, marketplace team conducts an audit
4. If violation is confirmed, stack is temporarily delisted pending resolution
5. Once resolved, stack is reinstated

### Content Disputes

If someone claims inaccuracy or plagiarism:

1. Provide explanation within 2 weeks
2. Marketplace team may request additional proof or sources
3. If content is clearly plagiarized or inaccurate, author must remediate
4. If author doesn't respond or disputes validly, stack may be delisted

### Code of Conduct Violations

If someone reports harmful content:

1. Marketplace team reviews the report
2. Author is given 7 days to respond or remove problematic content
3. If substantiated and not remediated, stack is delisted
4. Author may appeal within 14 days

## FAQ

**Q: Can I change my stack's license after publishing?**  
A: No. Existing versions remain under the original license. You can change the license for future versions only, but existing users can still use prior versions under the old license.

**Q: What if I want to stop maintaining my stack?**  
A: Archive your repository and announce deprecation in the marketplace. Provide a migration path (link to similar stack or successor).

**Q: Can I include a "sponsored by" or "powered by" badge?**  
A: Yes, as long as no false endorsement is implied. Ensure the sponsor/power-by claim is factually accurate.

**Q: Can I link to my commercial product from my stack?**  
A: Yes, as long as the stack itself is open and freely usable. Label commercial links clearly (e.g., "Sponsored: [product name]").

**Q: What if UitKit changes these guidelines?**  
A: Changes are announced 30 days in advance. Existing stacks grandfathered in; new submissions follow updated guidelines.

---

**Questions? Email marketplace@uitkit.dev or post to [GitHub Discussions](https://github.com/uitkits/uitkit/discussions).**

**Last updated:** June 15, 2026
