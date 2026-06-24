# UitKit Marketplace

The official hub for discovering, sharing, and installing expert stacks for Claude Code. UitKit transforms Claude into specialized professionals across engineering, data, business, operations, and creative domains.

## What is UitKit?

UitKit is a curated marketplace of **specialized stacks** — complete knowledge systems bundled with skills, agents, hooks, workflows, and prompts. Each stack equips Claude Code with expert-level guidance for a specific profession or domain.

Think of a stack as a persona with muscle memory: domain expertise, best practices, tool integrations, and runnable patterns designed by practitioners.

## Official vs Community Stacks

### Official Stacks (Certified)

Maintained by the UitKit core team. They meet our quality bar:
- **Completeness:** End-to-end coverage of the domain
- **Accuracy:** Reviewed against current best practices and tools (as of last update)
- **Examples:** Runnable workflows, concrete use cases
- **Maintenance:** Updated regularly; deprecations announced ahead of time
- **Badge:** Certified by UitKit — appears in marketplace UI

**Current official stacks:** 50+, spanning engineering, data, business, operations, marketing, product, and specialized domains.

### Community Stacks

Built and maintained by community members. They offer niche expertise and fresh perspectives:
- **Author-curated:** Reflects their personal methodology and tools
- **Licensing:** MIT, Apache 2.0, CC-BY-SA-4.0, or equivalent
- **Review:** Vetted for quality and alignment with UitKit code of conduct
- **Badge:** Community badge — indicates community authorship
- **Discoverability:** Featured by download count, recency, user ratings

## How to Browse & Discover

### Browse by Category

Stacks are organized by domain:

- **Engineering** — Backend, frontend, API, databases, infrastructure, DevOps, platform engineering
- **Data** — Analytics, data engineering, ML, analytics engineering, data science
- **Business** — Finance, operations, GTM, sales, business development, consulting
- **Marketing & GTM** — Content, campaigns, SEO, analytics, growth, brand
- **Product** — Product management, user research, design, product operations
- **Operations** — HR, recruiting, project management, legal, compliance
- **Specialized** — Bio research, blockchain, legal tech, security, automation
- **Content Creator** — Writing, podcasting, video production, design

### Search & Filter

- By domain (e.g., "backend")
- By role (e.g., "platform engineer")
- By language (en, fr, de, es, nl)
- By certification (official only)
- By rating and downloads
- By date added (newest first)

### Featured Stacks

Curated every month. Includes:
- **New releases** — Latest professional stacks
- **Trending** — Popular among users this month
- **Staff picks** — Recommended by core team
- **High-quality** — Consistently 4.5+ stars
- **8 official 2026 stacks** — Latest professional expertise domains

## Install a Stack

### Via CLI

```bash
# Browse marketplace
claude marketplace browse

# Install an official stack
claude marketplace install agentic-ai-engineer-stack

# Install a community stack (requires verification)
claude marketplace install <author>/<stack-name>

# List installed stacks
claude stack list
```

### Via Claude Code Editor

1. Open Marketplace panel (cmd+k, "marketplace")
2. Search or browse by category
3. Click "Install" on any stack
4. Verify permissions and installation

### What Gets Installed

- **Skills** — Slash commands (`.md` files in `skills/`)
- **Agents** — Subagent definitions (`agents/`)
- **Hooks** — Event-triggered automations (`hooks/`)
- **MCP** — Tool integrations (`mcp/`)
- **Workflows** — Multi-step processes (`workflows/`)
- **Prompts** — Reusable templates (`prompts/`)
- **Commands** — CLI extensions (`commands/`)

Stacks install to `~/.claude/marketplace/<stack-id>/` and are automatically indexed.

## Submit Your Stack

Have a domain expertise? Share it with the community.

### Submission Checklist

- [ ] Stack follows UitKit structure (see below)
- [ ] README documents the stack's scope and use cases
- [ ] Minimum 3 skills or agents included
- [ ] Examples or session logs showing real usage
- [ ] All content is in English (translations optional for acceptance)
- [ ] Code of conduct compliance statement
- [ ] Licensing declared (MIT, Apache 2.0, CC-BY-SA-4.0, or equivalent)
- [ ] No proprietary, confidential, or licensed third-party content
- [ ] GitHub repository (public, documented)

### Step-by-Step Submission

1. **Prepare your stack** following the UitKit directory structure
2. **Write a README** documenting scope, components, and use cases
3. **Create a `STACK.json` manifest** with metadata (see CONTRIBUTING.md)
4. **Open a PR** against `github.com/uitkits/uitkit` (see instructions in CONTRIBUTING.md)
5. **Await review** — typically 5-7 business days
6. **Publish** — once approved, your stack appears in the marketplace

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed submission guide.

## Get Certified

Your community stack can become **officially certified** if it meets UitKit's quality bar.

### Certification Criteria

- **Usage:** 100+ installs over 60 days
- **Quality:** 4.5+ average rating; no critical issues reported
- **Maintenance:** Updates within last 90 days
- **Completeness:** Covers the domain end-to-end; users can build end products with it
- **Accuracy:** No major errors or outdated practices
- **Support:** Author responds to issues within 2 weeks

### Certification Process

1. Email `marketplace@uitkit.dev` with stack name and GitHub repo
2. Core team evaluates stack against criteria
3. If approved: official badge added; stack moved to official section
4. Ongoing: Annual recertification required

Certified stacks get:
- Official badge on marketplace
- Featured in discovery and curated lists
- Priority in search results
- Ongoing support from UitKit core team

## Popular Stacks (Official)

### Engineering
- **Agentic AI Engineer** — Agent design, multi-agent orchestration, observability
- **Senior Backend Engineer** — Architecture, databases, APIs, performance
- **Platform Engineer** — Infrastructure as code, CI/CD, Kubernetes
- **Distributed Systems Engineer** — Consensus, fault tolerance, distributed databases
- **Cloud Architect** — AWS/GCP/Azure design, scalability, security

### Data
- **Data Engineer** — Pipelines, warehousing, real-time processing
- **Analytics Engineer** — dbt, SQL, metrics, BI
- **Data Scientist** — ML workflows, experimentation, model evaluation

### Business & Operations
- **Product Manager** — Requirements, roadmaps, go-to-market
- **Sales Operations** — Processes, enablement, forecasting
- **Business Consultant** — Strategy, operations, GTM

### Specialized
- **AI Compliance & Risk** — Regulatory frameworks, audit trails, compliance
- **Security Engineer** — Threat modeling, incident response, secure design
- **Technical Writer** — Documentation systems, API docs, knowledge bases

## Guidelines & Support

- **[CONTRIBUTING.md](CONTRIBUTING.md)** — How to submit a stack
- **[VETTING.md](VETTING.md)** — Quality standards and review process
- **[PUBLISHER_GUIDELINES.md](PUBLISHER_GUIDELINES.md)** — Rules for community publishers
- **[CATEGORIES.json](categories.json)** — Official category definitions
- **[FEATURED.json](featured.json)** — Current featured stacks

## FAQs

**Q: Is UitKit marketplace free?**  
A: Yes. Installation and use are free. Optional: donate to support community authors.

**Q: Can I sell a stack?**  
A: Not through the official marketplace. Community stacks are free. (You can sell a service or consulting around your stack.)

**Q: What if I find a bug in an official stack?**  
A: File an issue on GitHub. Official stacks are maintained by the core team.

**Q: Can I translate a community stack?**  
A: Yes. Translations are always welcome. Open a PR with translations in `fr/`, `de/`, `es/`, `nl/` subdirectories.

**Q: Can I fork and modify a stack?**  
A: Yes, if licensed under MIT, Apache 2.0, or CC-BY-SA-4.0. Respect the license terms; give credit to original author.

**Q: How often do official stacks get updated?**  
A: Major updates quarterly; security/critical fixes as needed. Authors announce deprecations 60 days in advance.

## Community

- **Discord:** [join.uitkit.dev](https://join.uitkit.dev)
- **GitHub Discussions:** [github.com/uitkits/uitkit/discussions](https://github.com/uitkits/uitkit/discussions)
- **Issues & Bugs:** [github.com/uitkits/uitkit/issues](https://github.com/uitkits/uitkit/issues)
- **Twitter:** [@uitkit](https://twitter.com/uitkit)

---

**Built by [UitKit](https://github.com/uitkits/uitkit) · [uitbreiden.com](https://uitbreiden.com/)**

Last updated: June 15, 2026
