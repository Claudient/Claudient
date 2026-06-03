# Claude Code Settings Templates

Ready-to-use `settings.json` starter templates for Claude Code. Copy the one that fits your context, drop it in the right location, and adjust from there.

---

## Where settings.json lives

Claude Code loads settings from three locations, merged in this order (later overrides earlier):

| Location | Scope | Use case |
|---|---|---|
| `~/.claude/settings.json` | Global, all projects | Your personal defaults — model, theme, common allows |
| `.claude/settings.json` | Project, shared | Checked into source control — team-wide rules for this repo |
| `.claude/settings.local.json` | Project, local only | Your personal overrides for this repo — gitignored |

Gitignore `.claude/settings.local.json` in every repo. Use it for tokens, personal env vars, or overrides you do not want teammates to inherit.

---

## Templates

### `solo-dev.json`

**Audience:** Individual developer working on personal or side projects.

Relaxed `auto` mode with broad coverage of common dev commands: npm, node, python, pip, git, docker, curl, file operations. Secrets are denied at the read level (`.env`, `~/.ssh`, `~/.aws`) so Claude can never exfiltrate credentials even if prompted to. Destructive operations like `git push` and `npm publish` require confirmation. No sandbox overhead.

Drop this in `~/.claude/settings.json` as your global baseline.

---

### `team.json`

**Audience:** Engineering team working in a shared repository.

`plan` mode by default — Claude proposes before acting. Read access is broad; write access is scoped to `src/`, `tests/`, and `docs/`. Package manifest and CI config changes require explicit approval. Every Bash call is appended to `~/.claude/audit.log` for lightweight tracing. The `code-review` plugin is enabled so `/code-review` is available out of the box. Aggressive 14-day cleanup prevents transcript sprawl.

Check this in as `.claude/settings.json` in your monorepo.

---

### `security-hardened.json`

**Audience:** Security-sensitive projects, open-source maintainers, consultants handling client code.

Sandbox enabled with explicit allowlists for read and write paths. Network access restricted to three documentation domains. Credential directories (`~/.ssh`, `~/.aws`, `~/.gnupg`, `~/.kube`, `~/.config/gcloud`) are hard-denied at both the permission and sandbox layers. Dangerous shell patterns (`curl | bash`, `eval`, `rm -rf /`, `chmod 777`) are denied outright. `git push` requires confirmation. All Bash and WebFetch calls are logged to `~/.claude/security-audit.log`.

Use as `.claude/settings.json` in repos where a supply-chain incident would be severe.

---

### `enterprise.json`

**Audience:** Regulated environments, enterprise teams with compliance requirements.

Uses Haiku with `low` effort to keep token spend predictable. Sandbox enabled. Full audit trail written as JSONL to `~/.claude/enterprise-audit.jsonl` on every Bash call, WebFetch call, and session stop — suitable for feeding into a SIEM. The `security-review` plugin is enabled alongside `code-review`. Network limited to Anthropic, npm registry, and GitHub. All credential paths hard-denied. `CLAUDE_SPEND_LIMIT` env var set as a signal for cost-aware tooling.

Deploy via a managed configuration pipeline; do not let individual developers override this locally without a review gate.

---

### `minimal.json`

**Audience:** Anyone who wants the smallest footprint that is still useful.

Four fields: model, defaultMode (`ask` — Claude asks before every action), a short allow list covering npm scripts, basic git reads, and project file access, and a deny list covering `.env` and credential files. No hooks, no sandbox config, no extras. Start here and add only what you need.

---

## Permission Rule Syntax

Rules follow the pattern `"ToolName(argument-glob)"`. Evaluation order is **deny first, then ask, then allow** — a deny rule wins over any matching allow.

```json
"Bash(npm run *)"          // allow any npm run script
"Read(./.env)"             // match exact file
"Read(~/.ssh/*)"           // glob over directory
"WebFetch(domain:github.com)"  // domain-scoped fetch
"Write(./src/*)"           // writes inside src/
```

Common tool names: `Bash`, `Read`, `Write`, `Edit`, `WebFetch`, `WebSearch`, `mcp__<server>__<tool>`.

---

## Sandbox fields

```json
"sandbox": {
  "enabled": true,
  "filesystem": {
    "allowRead": ["./src"],
    "allowWrite": ["./src"],
    "denyRead": ["~/.ssh"]
  },
  "network": {
    "allowedDomains": ["docs.anthropic.com"]
  }
}
```

Sandbox is process-level isolation. When `enabled: true`, filesystem and network access outside the allowlists is blocked at the OS level, not just by policy.

---

## Quick-start

```bash
# Use minimal as your global default
cp minimal.json ~/.claude/settings.json

# Use team as your project default (checked in)
cp team.json /path/to/your/repo/.claude/settings.json

# Override locally without affecting teammates
cp solo-dev.json /path/to/your/repo/.claude/settings.local.json
```

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
