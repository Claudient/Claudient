# UitKit Quality Standards

To maintain UitKit as the premier knowledge base for Claude Code, all skills, agents, and hooks are audited and tiered based on their quality.

## Skill Tiers

Every skill in the `skills/` directory is automatically audited by `scripts/audit-skills.js` and assigned a tier.

### 🥇 Gold Tier (The Standard)
These are production-ready, highly dependable skills. To achieve Gold status, a skill must have:
- Valid frontmatter (`name`, `description`).
- All 4 required sections: `## When to activate`, `## When NOT to use`, `## Instructions`, `## Example`.
- A minimum word count of **150 words**.

### 🥈 Silver Tier
These are good skills that need minor improvements. They must have:
- Valid frontmatter.
- At least 3 of the 4 required sections.
- A minimum word count of **50 words**.

### 🥉 Bronze Tier
These are basic skills that need major work. They are often missing critical context, examples, or are too short to provide meaningful value.

## Contribution Guidelines

1. **Use the Template**: Always start new skills using `templates/skill-template.md`.
2. **Be Specific**: Claude Code works best with precise instructions, not vague generalities. Provide code snippets, workflow structures, and clear "do" and "don't" boundaries.
3. **Provide Examples**: Always provide a concrete scenario or prompt where the skill shines.
4. **Pass Validation**: Your pull request will fail if `npm run validate:frontmatter` detects missing metadata.

## Review Process
Maintainers review PRs within 24-48 hours. Skills submitted at the Bronze tier may be requested for revision or marked as draft until they reach Silver or Gold.
