# Getting Started with Claude Code Marketplace

This guide is for first-time stack creators who want to build and submit a collection of skills, agents, hooks, workflows, or prompts to the Claude Code Marketplace.

---

## Who This Guide Is For

- You have 2+ Claude Code skills or tools you want to share
- You understand the uitkit repository structure
- You're comfortable with Git and GitHub pull requests
- You want to reach other Claude Code users with a curated, quality collection

This guide is NOT for:
- Single-skill submissions (use the skills/ directory in the main repository instead)
- Early-stage, untested content (test your work first)
- Commercial products seeking marketplace monetization (the marketplace is community-driven)

---

## What You'll Create

A **stack** is a published collection of Claude Code resources bundled for a specific domain or workflow.

**Example: Backend Productivity Stack**
```
backend-productivity-stack/
├── CLAUDE.md (manifest and description)
├── skills/
│   ├── api-contract-testing.md
│   ├── performance-profiling.md
│   └── docker-debugging.md
├── agents/
│   ├── sql-specialist.md
│   └── deployment-engineer.md
├── hooks/
│   └── pre-commit-checks.sh
├── guides/
│   ├── getting-started.md
│   └── performance-tuning.md
├── mcp/
│   ├── postgres-config.json
│   └── redis-config.json
└── submission.json
```

**What makes a quality stack:**
- 5-15 cohesive resources (not a kitchen sink)
- Clear target audience and domain
- Every skill has tested examples
- Every guide has concrete, runnable steps
- All resources follow uitkit standards
- 2+ external users have tested it

---

## 5-Step Walkthrough

### Step 1: Validate Your Idea

Before building, confirm your stack scope:

1. **Name it**: Pick a clear, descriptive name ending in `-stack`
   - Good: `customer-retention-stack`, `data-pipeline-stack`, `security-hardening-stack`
   - Avoid: `my-stuff`, `utils`, `awesome-tools`

2. **List your resources**: Draft a README of what's included
   - 5+ skills or agents
   - OR 3+ skills + 2+ guides/hooks/workflows
   - Each must be complete and tested

3. **Check for conflicts**: Search the marketplace for similar stacks
   - Related but different scope is OK (e.g., `python-backend-stack` + `javascript-backend-stack`)
   - Exact duplicates will not be accepted

4. **Target audience**: Who will use this? Be specific
   - "DevOps engineers using Docker + Kubernetes"
   - "SaaS founders managing churn metrics"
   - NOT just "developers" or "engineers"

### Step 2: Create Your Stack Directory

Fork the UitKit repository and create your stack folder:

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/UitKit.git
cd UitKit

# Create stack directory (main branch, not a feature branch yet)
mkdir -p stacks/your-stack-name-stack
cd stacks/your-stack-name-stack

# Initialize subdirectories as needed
mkdir -p skills agents guides hooks mcp examples
```

Naming: `kebab-case-stack` — all lowercase, hyphens, no underscores.

### Step 3: Build Your Stack

Populate each directory with complete, tested content:

**Skills** (`skills/*.md`):
- Write to the uitkit skill format (see template below)
- Include at least one concrete, runnable example
- Test each skill yourself in Claude Code
- No stubs or "coming soon"

**Agents** (`agents/*.md`):
- Use the uitkit agent format
- Define model guidance (Haiku/Sonnet/Opus)
- Specify tool subset
- Include trigger conditions

**Guides** (`guides/*.md`):
- 100–500 lines per guide
- Step-by-step instructions with code blocks
- Real-world examples from your domain
- No placeholder sections

**Hooks** (`hooks/*.sh` or `.py`):
- Include the exact `settings.json` entry as a JSON code block
- Setup instructions
- Clear documentation of when/why it fires

**MCP configs** (`mcp/*.json`):
- Valid JSON, tested with Claude Code
- Installation and usage instructions in a companion `.md` file

**Examples** (`examples/`):
- Working projects or stubs demonstrating stack usage
- README with step-by-step setup

### Step 4: Create submission.json

At the root of your stack, create `submission.json`:

```json
{
  "name": "Backend Productivity Stack",
  "slug": "backend-productivity-stack",
  "description": "A curated collection of tools for diagnosing and optimizing backend services. Includes Docker debugging, SQL profiling, API contract testing, and performance monitoring.",
  "version": "1.0.0",
  "author": {
    "name": "Your Name",
    "github": "your-github-username",
    "email": "you@example.com"
  },
  "license": "CC0-1.0",
  "keywords": ["backend", "performance", "debugging", "docker", "sql", "profiling"],
  "minVersion": "1.8.0",
  "contents": {
    "skills": 5,
    "agents": 2,
    "guides": 2,
    "hooks": 1,
    "mcp": 2
  },
  "targetAudience": "Backend engineers and DevOps specialists optimizing service performance and troubleshooting production issues.",
  "testingNotes": "This stack has been tested with Claude Code v1.8.0+ on macOS, Linux, and Windows. All skills have been validated in production environments.",
  "feedback": [
    {
      "tester": "Alice Chen",
      "role": "Backend Engineer at TechCorp",
      "feedback": "Saved us 2 hours per deployment with the Docker debugging workflow."
    }
  ]
}
```

### Step 5: Submit via Pull Request

1. **Commit and push**:
   ```bash
   git add stacks/your-stack-name-stack/
   git commit -m "feat: add your-stack-name-stack"
   git push origin main
   ```

2. **Open a PR** to the main UitKit repository:
   - Base branch: `main`
   - Title: `feat: add your-stack-name-stack`
   - Description:
     ```
     ## Stack Submission
     
     **Name:** Your Stack Name
     **Slug:** your-stack-name-stack
     **Contents:** 5 skills, 2 agents, 2 guides, 1 hook
     
     **Target Audience:** Backend engineers and DevOps specialists
     
     **Overview:**
     A brief description of what this stack does and why it matters.
     
     **Quality Checklist:**
     - [x] All files follow uitkit standards
     - [x] Every skill and agent has concrete examples
     - [x] Tested by 2+ external users
     - [x] No placeholder or stub content
     - [x] submission.json is complete and accurate
     
     **Feedback:**
     - Alice Chen (Backend Engineer): [quote or reference to feedback]
     - Bob Martinez (DevOps): [quote or reference to feedback]
     ```

3. **Automated checks** run (syntax validation, file structure).

4. **Review team** examines your submission (1–2 weeks).

5. **Iterate** on feedback if requested.

6. **Merge and publish** — your stack appears in the marketplace!

---

## Next Steps

- Review **stack-quality-standards.md** before submitting
- Check **submission-process.md** for detailed GitHub workflow
- Look at **certification-path.md** if you want to earn a certified badge later

---

## FAQ

**Q: How many resources does a stack need?**
A: Minimum 5 total: either 5+ skills, or 3+ skills + 2+ guides/hooks/workflows. Quality over quantity — a focused 6-item stack beats an unfocused 20-item stack.

**Q: Can I include translations?**
A: Yes. If you translate your stack to French, German, Dutch, or Spanish, follow the directory structure: `skills/fr/`, `agents/de/`, etc. Translations are optional for initial submission; you can add them post-launch.

**Q: What license should I use?**
A: CC0-1.0 (public domain) is recommended. MIT, Apache 2.0, and GPL 3.0 are also accepted. Do not use proprietary licenses.

**Q: How do I know if my stack is "tested enough"?**
A: You should have used every skill and agent in real work. If possible, get 2+ external people to try it and provide feedback. (See feedback field in submission.json.)

**Q: Can I update my stack after it's published?**
A: Yes. Submit a pull request with your changes. Minor updates (bug fixes, typos, clarifications) merge quickly. Major updates (new skills, restructuring) go through review.

**Q: What if my stack needs community support or maintenance?**
A: Join the community Slack/Discord (linked in the main README). Answer questions, file bugs, and keep your stack up to date. Stacks abandoned for 6+ months may be archived.

**Q: Can I sell my stack or charge for support?**
A: The stack itself is free and open-source. You can offer paid support, consulting, or training on top — but the stack code remains free.

**Q: How long does review take?**
A: 1–2 weeks for initial feedback. If revisions are needed, plan for another week per iteration. Certified stacks get priority.

**Q: What if my submission is rejected?**
A: You'll receive specific feedback. Most rejections are fixable (missing examples, stub content, unclear scope). Revise and resubmit.
