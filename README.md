# Claudient

> The definitive knowledge base for Claude Code — skills, agents, hooks, workflows, prompts, and patterns that multiply what you can build.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Languages](https://img.shields.io/badge/languages-EN%20%7C%20FR%20%7C%20DE%20%7C%20NL%20%7C%20ES-blue)](#translations)

**Claudient** is not a tool. It is a *knowledge system* — a community-maintained collection of everything you can drop into your Claude Code environment to immediately work faster, smarter, and with less friction.

---

## Why Claudient?

Claude Code is powerful out of the box. But the gap between "it works" and "it works at 10x" is filled with patterns most developers never discover on their own: the right skill for a task, a hook that enforces quality automatically, an agent that handles an entire domain, a workflow that turns a vague goal into shipped code.

Claudient collects all of that in one place — organized, searchable, and ready to use.

| | Everything-claude-code | **Claudient** |
|---|---|---|
| C#/.NET coverage | None | Full |
| Kubernetes / Terraform | Sparse | Dedicated skill sets |
| GraphQL / Prisma | None | Full |
| ML / Data Engineering | Limited | dbt, Spark, MLflow, PyTorch |
| Fintech / Payments | None | Stripe, payment flows |
| End-to-end workflows | None | 5 complete workflows |
| Skill authoring guide | None | First-class guide |
| Prompt templates | None | Full library |
| Token optimization | Scattered across 3 docs | Single authoritative guide |
| Languages | 8 (inconsistent) | EN · FR · DE · NL · ES |

---

## What's Inside

```
Claudient/
│
├── guides/              Deep-dive documentation
│   ├── getting-started.md
│   ├── skill-authoring.md
│   ├── token-optimization.md
│   ├── memory-management.md
│   ├── security.md
│   ├── agent-orchestration.md
│   └── hooks-cookbook.md
│
├── skills/              Slash command skill definitions
│   ├── ai-engineering/
│   ├── backend/         python · nodejs · go · rust · java · dotnet · php
│   ├── frontend/        react · vue · mobile
│   ├── data-ml/         pandas · pytorch · mlflow · dbt · spark
│   ├── devops-infra/    kubernetes · terraform · docker · github-actions · cloud
│   ├── database/        postgresql · mongodb · redis · graphql
│   ├── security/        appsec · devsecops · compliance
│   ├── finance-payments/
│   └── content-docs/
│
├── agents/              Specialized subagent definitions
│   ├── core/            planner · architect · reviewer · security
│   ├── build-resolvers/ language-specific error resolvers
│   └── domain/          database · devops · ml specialists
│
├── hooks/               Event-triggered automations
│   ├── pre-tool-use/
│   ├── post-tool-use/
│   └── lifecycle/
│
├── rules/               Always-follow guidelines
│   ├── common/
│   └── language-specific/
│
├── workflows/           End-to-end multi-skill workflows
│   ├── feature-development.md
│   ├── debugging-session.md
│   ├── code-review.md
│   ├── refactor-safely.md
│   └── new-project-bootstrap.md
│
├── prompts/             High-value prompt templates
│   ├── system-prompts/
│   ├── project-starters/
│   └── task-specific/
│
├── mcp/                 MCP configs and recommended servers
└── examples/            Complete working project references
```

---

## Quick Start

**No installation required.** Clone the repo and copy what you need into your project.

```bash
git clone https://github.com/Claudient/Claudient.git
```

**To use a skill** — copy the `.md` file into `.claude/commands/` in your project:

```bash
cp Claudient/skills/backend/python/fastapi.md your-project/.claude/commands/
```

Then trigger it in Claude Code with `/fastapi`.

**To use an agent** — reference it in your Claude session using the `subagent_type` parameter in your Agent tool calls.

**To use a hook** — add the hook JSON to the `hooks` array in your `.claude/settings.json`.

**To use a rule** — copy the content into your `CLAUDE.md`.

See [guides/getting-started.md](guides/getting-started.md) for a 5-minute setup walkthrough.

---

## Guides

| Guide | What it covers |
|---|---|
| [Getting Started](guides/getting-started.md) | Setup, first skill, first hook — 5 minutes |
| [Skill Authoring](guides/skill-authoring.md) | How to write a skill that actually works |
| [Token Optimization](guides/token-optimization.md) | Model selection, context math, cost reduction |
| [Memory Management](guides/memory-management.md) | Session persistence, compaction strategies |
| [Security](guides/security.md) | Isolation, approval boundaries, sanitization |
| [Agent Orchestration](guides/agent-orchestration.md) | Sub-agent patterns, parallelization |
| [Hooks Cookbook](guides/hooks-cookbook.md) | Hook patterns with real examples |

---

## Translations

All guides and documentation are available in:

- [English](guides/) (primary)
- [Français](guides/fr/)
- [Deutsch](guides/de/)
- [Nederlands](guides/nl/)
- [Español](guides/es/)

Skills, agents, and hooks remain in English — they are code-adjacent and translation adds noise without value.

---

## Contributing

Claudient grows through community contributions. Every skill, agent, hook, and workflow in this repo was written by someone who solved a real problem.

See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add your own — including the skill template, quality checklist, and review process.

---

## License

MIT — use freely, attribution appreciated.
