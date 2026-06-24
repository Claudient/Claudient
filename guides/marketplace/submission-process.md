# Marketplace Submission Process

Step-by-step instructions for submitting your stack to the Claude Code Marketplace via GitHub.

---

## Overview

The submission process takes 1–2 weeks from pull request to publication. You'll use Git and GitHub to propose your stack, automated systems will validate it, and the review team will assess quality. If revisions are needed, you'll iterate and resubmit.

**Timeline:**
1. Fork and prepare (30 min)
2. Submit PR (5 min)
3. Automated checks (5 min)
4. Initial review (1–3 days)
5. Revisions (if needed) (3–5 days)
6. Merge and publish (1 day)

---

## Step 1: Fork the Repository

1. Navigate to https://github.com/tushar2704/UitKit
2. Click **Fork** in the top-right corner
3. Choose your GitHub account as the fork destination
4. Click **Create fork**

You now have your own copy of the repository.

---

## Step 2: Clone Your Fork Locally

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/UitKit.git
cd UitKit

# Add upstream remote for syncing
git remote add upstream https://github.com/tushar2704/UitKit.git
```

Replace `YOUR_USERNAME` with your GitHub handle.

---

## Step 3: Create Your Stack Directory

Create a directory for your stack in the `stacks/` folder:

```bash
# Ensure you're on main branch and synced
git checkout main
git pull upstream main

# Create stack directory
mkdir -p stacks/your-stack-name-stack

# Initialize subdirectories (as needed)
mkdir -p stacks/your-stack-name-stack/{skills,agents,guides,hooks,mcp,examples}

cd stacks/your-stack-name-stack
```

**Naming convention:**
- Folder name: `kebab-case-stack` (all lowercase, hyphens, ends with `-stack`)
- Examples: `backend-productivity-stack`, `data-pipeline-stack`, `security-hardening-stack`

---

## Step 4: Build Your Stack

Populate your stack directory with complete, tested content:

```
your-stack-name-stack/
├── CLAUDE.md                          # Required: stack manifest
├── README.md                          # Required: overview and quick start
├── LICENSE                            # Required: CC0-1.0 or open-source license
├── submission.json                    # Required: submission metadata
├── skills/
│   ├── skill-one.md
│   ├── skill-two.md
│   └── ...
├── agents/
│   ├── agent-one.md
│   └── ...
├── guides/
│   ├── guide-one.md
│   └── ...
├── hooks/
│   ├── hook-one.sh
│   └── hook-one.md
├── workflows/
│   └── workflow-one.md
├── mcp/
│   ├── service-one.json
│   └── service-one.md
└── examples/
    ├── example-one/
    │   ├── README.md
    │   └── [project files]
    └── ...
```

**Required files:**
- `CLAUDE.md` — Stack manifest following uitkit standards
- `README.md` — Overview, quick start, 100–200 lines
- `LICENSE` — CC0-1.0, MIT, Apache 2.0, or GPL 3.0
- `submission.json` — Submission metadata

**Optional but recommended:**
- `skills/` — 5+ skills or more
- `agents/` — 2+ agents
- `guides/` — 1–2 guides
- `hooks/` — Event-triggered automations
- `mcp/` — MCP server integrations
- `examples/` — Working example projects

See **getting-started.md** for detailed guidance on each resource type.

---

## Step 5: Create submission.json

At the root of your stack, create `submission.json`:

```json
{
  "name": "Your Stack Name",
  "slug": "your-stack-name-stack",
  "description": "A concise, one-sentence description of what this stack does.",
  "longDescription": "A detailed 2-3 sentence overview. What problem does it solve? Who uses it?",
  "version": "1.0.0",
  "author": {
    "name": "Your Full Name",
    "github": "your-github-username",
    "email": "you@example.com"
  },
  "license": "CC0-1.0",
  "repository": "https://github.com/YOUR_USERNAME/UitKit/tree/main/stacks/your-stack-name-stack",
  "keywords": [
    "keyword1",
    "keyword2",
    "keyword3"
  ],
  "minVersion": "1.8.0",
  "contents": {
    "skills": 5,
    "agents": 2,
    "guides": 2,
    "hooks": 1,
    "workflows": 0,
    "mcp": 2
  },
  "targetAudience": "Specific audience description. Who benefits most from this stack?",
  "useCases": [
    "Use case 1: Brief description",
    "Use case 2: Brief description"
  ],
  "testingNotes": "This stack has been tested with Claude Code v1.8.0+ on macOS and Linux. All skills have been validated in [describe environment].",
  "externalReviewers": [
    {
      "name": "Reviewer Name",
      "role": "Role or company",
      "feedback": "Summary of their feedback or a quote"
    },
    {
      "name": "Another Reviewer",
      "role": "Role or company",
      "feedback": "Their feedback"
    }
  ],
  "relatedStacks": [
    "backend-productivity-stack",
    "another-related-stack"
  ],
  "changelog": {
    "1.0.0": "Initial release"
  }
}
```

**Field explanations:**

| Field | Required | Notes |
|-------|----------|-------|
| `name` | Yes | Human-readable stack name |
| `slug` | Yes | URL-safe identifier (must match folder name) |
| `description` | Yes | One sentence |
| `longDescription` | Yes | 2–3 sentences |
| `version` | Yes | Semver format (1.0.0) |
| `author` | Yes | Your name, GitHub handle, email |
| `license` | Yes | CC0-1.0, MIT, Apache 2.0, or GPL 3.0 |
| `repository` | Yes | Link to your stack in the repository |
| `keywords` | No | 3–5 searchable tags |
| `minVersion` | Yes | Minimum Claude Code version required |
| `contents` | Yes | Count of resources in each category |
| `targetAudience` | Yes | Who is this for? Be specific. |
| `useCases` | Yes | 2–3 examples of how it's used |
| `testingNotes` | Yes | Where and how you tested |
| `externalReviewers` | Yes | 2+ external testers and their feedback |
| `relatedStacks` | No | Similar stacks in marketplace |
| `changelog` | Yes | Version history |

---

## Step 6: Create README.md

At the root of your stack, create `README.md`:

```markdown
# Your Stack Name

A one-line description.

## Overview

What does this stack do? Why would someone use it? (2–3 sentences)

## What's Included

- **5 Skills**: Brief description of what they do
- **2 Agents**: What domains they specialize in
- **2 Guides**: Topics covered
- **1 Hook**: What automation is provided
- **2 MCP Integrations**: External services integrated

## Quick Start

```bash
# Installation instructions (if any)

# Example: using your first skill
# Copy-paste here
```

## Target Audience

Specific description. Who benefits most?

## Getting Help

- Check the guides for step-by-step tutorials
- Review examples for working projects
- File issues on GitHub: [link]
```

---

## Step 7: Create LICENSE

At the root of your stack, create a `LICENSE` file. Recommended option:

**CC0-1.0 (Public Domain):**
```
Creative Commons Legal Code

CC0 1.0 Universal

This work is marked with CC0 1.0 Universal. To view a copy of this license,
visit http://creativecommons.org/publicdomain/zero/1.0/

See LICENSE file for full text.
```

Or use an existing open-source license:
- **MIT**: https://opensource.org/licenses/MIT
- **Apache 2.0**: https://opensource.org/licenses/Apache-2.0
- **GPL 3.0**: https://www.gnu.org/licenses/gpl-3.0.html

---

## Step 8: Commit and Push

```bash
# Stage all files
git add stacks/your-stack-name-stack/

# Commit with a clear message
git commit -m "feat: add your-stack-name-stack"

# Push to your fork
git push origin main
```

---

## Step 9: Open a Pull Request

1. Navigate to your fork: https://github.com/YOUR_USERNAME/UitKit
2. Click **Pull requests** tab
3. Click **New pull request**
4. Set:
   - Base repository: `tushar2704/UitKit`
   - Base branch: `main`
   - Head repository: `YOUR_USERNAME/UitKit`
   - Head branch: `main`
5. Click **Create pull request**

---

## Step 10: Complete the PR Description

Use this template:

```markdown
## Stack Submission

**Stack Name:** Your Stack Name
**Slug:** your-stack-name-stack
**Contents:** 5 skills, 2 agents, 2 guides, 1 hook, 2 MCP

### Overview

A brief description of what this stack does and the problem it solves.

### Target Audience

Specific audience description (e.g., "Backend engineers optimizing service performance").

### Quality Checklist

- [x] All files follow uitkit standards
- [x] Every skill has concrete, tested examples
- [x] Every agent has clear purpose and tool scoping
- [x] All guides are complete and tested
- [x] No placeholder or stub content
- [x] submission.json is complete and accurate
- [x] Tested by 2+ external users
- [x] Professional grammar and tone
- [x] README.md and LICENSE present

### Testing Summary

**Personal Testing:**
- [x] Used all skills in real work
- [x] Delegated to all agents
- [x] Followed all guides end-to-end
- [x] Triggered all hooks

**External Testing:**
- [x] Tested by Alice Chen (backend engineer at TechCorp)
  - Feedback: "Saved us time with the Docker debugging workflow"
- [x] Tested by Bob Martinez (DevOps at StartupXYZ)
  - Feedback: "Great comprehensive set of tools"

### Links

- [View submission.json](./stacks/your-stack-name-stack/submission.json)
- [View CLAUDE.md](./stacks/your-stack-name-stack/CLAUDE.md)
```

---

## Step 11: Automated Checks

When you create the PR, GitHub Actions automatically runs:

1. **Syntax validation**: Checks JSON files are valid, directory structure is correct
2. **File structure**: Verifies required files (CLAUDE.md, submission.json, LICENSE) exist
3. **Markdown linting**: Checks for formatting issues

If checks fail:
1. Review the error messages
2. Fix the issues locally
3. Commit and push the fixes
4. The PR automatically updates

---

## Step 12: Human Review

The maintainers review your submission (1–3 days). They check:

1. **Quality standards**: Do resources meet the published standards?
2. **Completeness**: Are all sections filled out with real content?
3. **Testing**: Is there evidence of external testing?
4. **Scope**: Is the stack focused and coherent?
5. **Documentation**: Are instructions clear and examples working?

---

## Step 13: Address Feedback

If reviewers request changes:

1. Review the comments on the PR
2. Make the requested revisions locally
3. Commit and push your changes
4. Reply to each comment confirming the fix
5. Reviewers re-check

Typical revisions take 3–5 days.

---

## Step 14: Merge and Publish

Once approved:

1. Maintainers merge your PR to `main`
2. Your stack is automatically published to the marketplace
3. You receive a confirmation notification
4. Your stack is now available for download

---

## After Publication

**Maintenance responsibilities:**

- Respond to GitHub issues (bugs, questions) within 1 week
- Update your stack when Claude Code releases major versions
- Keep examples and guides current
- Provide bug fixes as needed

**Earn certified badge (optional):**

After 2+ weeks with no issues, 2+ external users, and active maintenance, you can request certification. See **certification-path.md**.

---

## Troubleshooting

### PR checks fail with "Invalid JSON in submission.json"

**Fix**: Use an online JSON validator (jsonlint.com) to find the syntax error. Common issues:
- Trailing comma in arrays or objects
- Missing closing bracket
- Unescaped quotes in strings

### PR checks fail with "Missing required file: CLAUDE.md"

**Fix**: Ensure these files exist at the root of your stack:
- `CLAUDE.md`
- `submission.json`
- `LICENSE`
- `README.md`

### "Review is taking longer than expected"

The review team reviews stacks in order received. Typical time is 1–2 weeks. If you haven't heard in 3 weeks, comment on the PR asking for an update.

### I need to update my stack after it's published

**Minor updates (typos, small fixes):** Submit a PR with your changes. These merge quickly.

**Major updates (new skills, restructuring):** Comment on the original GitHub issue (created when your stack was merged). Discuss the scope and get approval before implementing.

---

## Questions?

- **Before submission**: Review **getting-started.md** and **stack-quality-standards.md**
- **General questions**: Check the FAQ in **getting-started.md**
- **Troubleshooting**: Comment on your PR; maintainers will help
- **Community**: Join the community Slack/Discord (linked in main README)

---

## Checklist: Before You Click "Create Pull Request"

- [ ] Stack directory is named `your-stack-name-stack` (kebab-case, ends with `-stack`)
- [ ] `CLAUDE.md` is present and complete
- [ ] `README.md` is present with overview and quick start
- [ ] `LICENSE` file is present (CC0-1.0 or compatible)
- [ ] `submission.json` is valid JSON and complete
- [ ] All skills follow the format and have working examples
- [ ] All agents have clear purpose and are tested
- [ ] All guides are complete and tested
- [ ] No stub or placeholder content
- [ ] You have tested personally
- [ ] 2+ external people have tested and provided feedback
- [ ] Grammar and tone are professional
- [ ] All file names are kebab-case
- [ ] You've synced with upstream before pushing (`git pull upstream main`)

Good luck with your submission!
