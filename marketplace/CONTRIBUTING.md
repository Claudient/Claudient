# Contributing to UitKit Marketplace

Thank you for building specialized stacks for Claude Code. This guide walks you through submission, review, and publication.

## Before You Start

1. **Review [VETTING.md](VETTING.md)** — Understand quality standards
2. **Review [PUBLISHER_GUIDELINES.md](PUBLISHER_GUIDELINES.md)** — Know the rules
3. **Check [README.md](README.md)** — Understand the marketplace structure
4. **Read [guides/marketplace/submission-process.md](../guides/marketplace/submission-process.md)** — Detailed technical walkthrough

## Stack Structure

Your stack must follow this structure:

```
your-stack-name/
├── README.md                 # Stack overview (required)
├── CLAUDE.md                 # Stack principles & guidance
├── STACK.json                # Metadata manifest (required)
├── skills/                   # Slash command definitions
│   ├── skill-one/
│   │   ├── SKILL.md
│   │   ├── examples/
│   │   └── fr/, de/, es/, nl/  (translations, optional)
│   └── skill-two/
├── agents/                   # Subagent definitions (optional)
├── hooks/                    # Event-triggered automations (optional)
├── mcp/                      # MCP server integrations (optional)
├── workflows/                # Multi-step processes (optional)
├── prompts/                  # Reusable templates (optional)
├── commands/                 # CLI extensions (optional)
├── examples/                 # Complete, working examples (optional)
└── session-log.md            # Session template (optional)
```

### README.md (Required)

Document your stack:

```markdown
# Stack Name

[1-2 sentence description]

## Overview

[Who is this for? What problems does it solve?]

## Components

- **Skills:** List of included skills with brief descriptions
- **Agents:** Any subagents included
- **Integrations:** MCP servers, external tools
- **Workflows:** Key workflows enabled by this stack

## Use Cases

[3-5 concrete examples of what users can do]

## Installation

\`\`\`bash
claude marketplace install your-stack-name
\`\`\`

## Quick Start

[Basic walkthrough; 2-3 steps]

## Directory Structure

[Brief explanation of included files]

## Examples

[Links to example files or session logs]
```

### CLAUDE.md (Recommended)

Define your stack's persona, tone, available skills, and operating procedures. Use the [CLAUDE.md template in agentic_ai_engineer_stack](../agentic_ai_engineer_stack/CLAUDE.md) as reference.

### STACK.json (Required)

Metadata manifest:

```json
{
  "id": "your-stack-name",
  "name": "Your Stack Name",
  "description": "One-line description (80 chars max)",
  "longDescription": "2-3 sentence explanation",
  "author": "Your Name <you@example.com>",
  "repository": "https://github.com/yourname/your-stack-repo",
  "license": "MIT",
  "version": "1.0.0",
  "minClaudeCodeVersion": "1.0.0",
  "category": "engineering",
  "tags": ["backend", "architecture", "api"],
  "skills": 3,
  "agents": 0,
  "workflows": 1,
  "languages": ["en", "fr", "de"],
  "certified": false,
  "keywords": ["api", "backend", "fastapi", "rest"],
  "links": {
    "docs": "https://github.com/yourname/your-stack-repo#readme",
    "issues": "https://github.com/yourname/your-stack-repo/issues",
    "discussions": "https://github.com/yourname/your-stack-repo/discussions"
  }
}
```

## Submission Process

### Step 1: Prepare Your Stack

1. **Clone the UitKit repository:**
   ```bash
   git clone https://github.com/uitkits/uitkit.git
   cd uitkit
   ```

2. **Create your stack directory:**
   ```bash
   mkdir your-stack-name
   cd your-stack-name
   ```

3. **Add required files:**
   - `README.md` (document scope, use cases, components)
   - `STACK.json` (metadata manifest)
   - `CLAUDE.md` (optional but recommended; defines persona and tone)

4. **Add content:**
   - At least 3 skills in `skills/`
   - Optional: agents, hooks, workflows, prompts, MCP configs
   - Optional: examples showing real usage

5. **Validate your stack:**
   ```bash
   # Check structure
   ls -la your-stack-name/

   # Verify README exists
   cat your-stack-name/README.md

   # Verify STACK.json
   cat your-stack-name/STACK.json
   ```

### Step 2: Test Locally

Install your stack in development and verify it works:

```bash
# Link your stack to Claude Code
ln -s "$(pwd)/your-stack-name" ~/.claude/marketplace/your-stack-name

# Verify in Claude Code
claude stack list

# Test at least one skill
# Start a Claude Code session and run: /<skill-name>
```

### Step 3: Prepare Your GitHub Repository

1. **Fork or create a GitHub repo** (must be public):
   ```bash
   git init your-stack-repo
   cd your-stack-repo
   git remote add origin https://github.com/yourname/your-stack-repo.git
   ```

2. **Add your stack files:**
   ```bash
   cp -r /path/to/your-stack-name/* .
   ```

3. **Create a LICENSE file** (MIT, Apache 2.0, or CC-BY-SA-4.0):
   ```bash
   # For MIT
   curl https://opensource.org/licenses/MIT -o LICENSE
   ```

4. **Commit and push:**
   ```bash
   git add .
   git commit -m "feat: initial stack submission"
   git push -u origin main
   ```

### Step 4: Open a PR Against UitKit

1. **Fork `github.com/uitkits/uitkit`** (if not already done)

2. **Clone your fork:**
   ```bash
   git clone https://github.com/yourname/uitkit.git
   cd uitkit
   ```

3. **Create a feature branch:**
   ```bash
   git checkout -b add/your-stack-name
   ```

4. **Copy your stack into the marketplace:**
   ```bash
   cp -r /path/to/your-stack-name .
   git add your-stack-name/
   ```

5. **Commit with a clear message:**
   ```bash
   git commit -m "feat: add Your Stack Name

   - Purpose: [One sentence]
   - Components: [X skills, Y agents, Z workflows]
   - Category: engineering
   - Repository: https://github.com/yourname/your-stack-repo
   
   Closes #<issue-number> (if applicable)"
   ```

6. **Push and open a PR:**
   ```bash
   git push -u origin add/your-stack-name
   ```

   **PR Title:**
   ```
   feat: add Your Stack Name to marketplace
   ```

   **PR Description:**
   ```markdown
   ## Stack Submission

   **Stack ID:** your-stack-name  
   **Author:** Your Name <you@example.com>  
   **Category:** engineering  
   **Repository:** https://github.com/yourname/your-stack-repo  
   **License:** MIT  

   ## Overview
   [2-3 sentence description]

   ## Components
   - [X skills]
   - [Y agents]
   - [Z workflows]

   ## Checklist
   - [ ] README.md documents the stack
   - [ ] STACK.json is complete and valid
   - [ ] All content is accurate and current
   - [ ] No proprietary or licensed third-party content
   - [ ] Aligned with UitKit code of conduct
   - [ ] All files follow naming conventions (kebab-case)
   - [ ] Examples or session logs included
   - [ ] Public GitHub repository linked
   - [ ] License file included (MIT/Apache-2.0/CC-BY-SA-4.0)
   ```

## Review Timeline

### Initial Review (1-3 days)
- Automated checks: structure, naming, STACK.json validity
- Content check: no prohibited content, license valid
- If issues: reviewer will request changes

### Substantive Review (3-5 days)
- Quality check: accuracy, completeness, examples
- Domain expertise: alignment with best practices
- Usability: clarity, documentation, workflow

### Approval
- Stack approved and merged
- Appears in marketplace within 24 hours
- Your GitHub repo linked in stack details

### Total Timeline: 5-7 business days

## Quality Standards

See [VETTING.md](VETTING.md) for full criteria. Quick checklist:

- [ ] **Completeness:** Stack covers the domain end-to-end
- [ ] **Accuracy:** Best practices are current (as of publication date)
- [ ] **Examples:** At least 2 concrete examples or session logs
- [ ] **Documentation:** Every skill has a clear purpose and instructions
- [ ] **Naming:** All files follow kebab-case conventions
- [ ] **No errors:** No typos, broken links, or outdated references

## Translations (Optional)

Translations boost discoverability and help global users. Optional for initial submission:

- **English:** Required (always)
- **French (fr/):** Highly recommended
- **German (de/):** Recommended
- **Spanish (es/):** Recommended
- **Dutch (nl/):** Optional

Translations go in language subdirectories alongside English files:

```
skills/your-skill/
├── SKILL.md                # English
├── fr/
│   └── SKILL.md           # French
├── de/
│   └── SKILL.md           # German
└── es/
    └── SKILL.md           # Spanish
```

## After Approval

### Maintenance

- **Respond to issues** within 2 weeks
- **Update stack** when tools or practices change
- **Announce deprecations** 60 days before removal
- **Keep repository public** and documented

### Certification

After 60 days and 100+ installs, apply for official certification:
- Email `marketplace@uitkit.dev`
- Include stack name and GitHub repo
- Core team evaluates and responds within 5 business days

## Publishing Best Practices

1. **Version your stack:** Use semantic versioning (1.0.0, 1.1.0, 2.0.0)
2. **Keep GitHub repo in sync** with UitKit marketplace version
3. **Tag releases** on GitHub corresponding to marketplace versions
4. **Write changelogs** documenting updates
5. **Respond to users** in GitHub discussions and issues
6. **Monitor ratings** and improve based on feedback

## Support & Questions

- **Marketplace questions:** `marketplace@uitkit.dev`
- **Stack structure:** See [CLAUDE.md template](../agentic_ai_engineer_stack/CLAUDE.md)
- **Technical issues:** [GitHub Discussions](https://github.com/uitkits/uitkit/discussions)
- **Community help:** [Discord](https://join.uitkit.dev)

## Code of Conduct

All submissions must align with UitKit's [Code of Conduct](../.github/CODE_OF_CONDUCT.md):
- Respectful, inclusive language
- No harassment, discrimination, or hate speech
- Professional, ethical content
- Respect intellectual property and licensing

---

Thank you for contributing to UitKit. We're excited to see what you build.

**Questions? Email marketplace@uitkit.dev or join our [Discord](https://join.uitkit.dev).**
