# UitKit v1.1.0 Release Artifacts

**Release Date:** 2026-06-22  
**Version:** 1.1.0  
**Repository:** [github.com/UitbreidenOS/UitKit](https://github.com/UitbreidenOS/UitKit)  
**Package:** [npmjs.com/package/uitkit](https://www.npmjs.com/package/uitkit)

---

## Release Overview

UitKit v1.1.0 contains 400+ skills, 182+ specialist agents, 100+ slash commands, 42 workspace stacks, 41 MCP configurations, 40 hooks, 45 workflows, 83 project structures, 10 personas, 32 rules, and support for 5 languages (English, French, German, Dutch, Spanish).

### What's New

- Implement 3 missing features (matrix-theme, svg-map-inspector, swarm-sandbox) with translations
- Complete workspace stack validator + CI integration
- Full dependency graph generator for skills/agents/MCPs
- Enhanced skill freshness tracking with updated dates
- Project scanner with automated skill/hook/MCP recommendations

---

## Artifact Packages

### 1. Distribution Archives

#### 1.1 npm Package (Recommended)

```
Package Name:     uitkit
Version:          1.1.0
Registry:         npmjs.com
Install Command:  npm install uitkit@1.1.0
                  OR
                  npm install -g uitkit@1.1.0
```

**File:** `uitkit-1.1.0.tgz`  
**Size:** ~4.8 MB (compressed)  
**Uncompressed:** ~45 MB  
**SHA256:** `[generated during release]`  
**Integrity Hash:** `[npm generates on upload]`

**Contents:**
- All 400+ skills organized by category
- 182+ specialist agents with role definitions
- 100+ slash commands across 12 categories
- 42 pre-wired workspace stacks
- 41 MCP server configurations
- 40 event-triggered hooks
- 45 workflow definitions
- 83 project structures
- 10 personas/operating profiles
- 32 custom rules
- 10 automation routines
- Cross-harness adapters (Cursor/Windsurf/Codex/Gemini/Copilot)
- Agent SDK starter pack (Python & TypeScript)
- Output styles, themes, statuslines, keybindings, settings templates
- Full translations in FR/DE/NL/ES

**Installation:**
```bash
npm install uitkit@1.1.0
uitkit list
```

#### 1.2 Source Archive (.tar.gz)

```
File:              uitkit-1.1.0-source.tar.gz
Size:              ~3.2 MB
SHA256:            [computed hash]
Format:            gzip-compressed tar archive
```

**Contents:**
- Complete source tree including all markdown files
- Build scripts and validation tools
- Test fixtures and regression tests
- Documentation and examples
- Translation source files
- Git metadata (`.git/` directory if cloned)

**Extraction:**
```bash
tar -xzf uitkit-1.1.0-source.tar.gz
cd uitkit-1.1.0
npm install
npm run validate
```

#### 1.3 Docker Image (Optional)

```
Repository:        ghcr.io/uitkit/uitkit
Tag:               v1.1.0, latest
Digest:            sha256:[hex-string]
Size:              ~250 MB
Build:             Multi-stage optimized
```

**Pre-installed:**
- Node.js 18+ runtime
- All npm dependencies
- UitKit CLI ready in PATH
- Validation tools configured

**Usage:**
```bash
docker pull ghcr.io/uitkit/uitkit:v1.1.0
docker run -it ghcr.io/uitkit/uitkit:v1.1.0 uitkit list
```

---

## Checksums & Signatures

### SHA256 Hashes

All artifacts are signed and checksummed. Verify integrity:

```
SHA256SUMS.txt
==============
[SHA256] uitkit-1.1.0.tgz
[SHA256] uitkit-1.1.0-source.tar.gz
[SHA256] uitkit-1.1.0.zip
[SHA256] uitkit-1.1.0-cli-macos-arm64
[SHA256] uitkit-1.1.0-cli-macos-x64
[SHA256] uitkit-1.1.0-cli-linux-x64
[SHA256] uitkit-1.1.0-cli-win-x64.exe
```

**Verify:**
```bash
sha256sum -c SHA256SUMS.txt
# or on macOS:
shasum -a 256 -c SHA256SUMS.txt
```

### GPG Signature

```
File:               SHA256SUMS.asc (or SHA256SUMS.sig)
Signer:             tushar2704 <ceo@uitbreiden.com>
Key ID:             [GPG Key ID]
Key URL:            https://keybase.io/tushar2704
Fingerprint:        [GPG Fingerprint]
```

**Verify signature:**
```bash
gpg --verify SHA256SUMS.asc
# or
gpg --verify SHA256SUMS.sig SHA256SUMS.txt
```

**Import public key:**
```bash
gpg --keyserver keyserver.ubuntu.com --recv-keys [KEY-ID]
# or from GitHub:
curl https://github.com/tushar2704.gpg | gpg --import
```

---

## System Requirements

### Minimum Requirements

| Component | Requirement |
|---|---|
| **Operating System** | macOS 12+, Linux (glibc 2.29+), Windows 10+ |
| **Node.js** | 18.0.0 or higher |
| **npm** | 9.0.0 or higher |
| **Disk Space** | 45 MB (installed), 150 MB (with node_modules) |
| **RAM** | 512 MB minimum, 2 GB recommended |
| **Network** | Required for first install and MCP server connections |

### Supported Platforms

#### macOS
- Intel (x86_64) — v1.1.0
- Apple Silicon (ARM64/M1+) — v1.1.0
- Minimum: macOS 12 Monterey

#### Linux
- Ubuntu 20.04 LTS+ (x86_64)
- Debian 11+ (x86_64)
- Red Hat 8+ (x86_64)
- Alpine 3.14+ (x86_64)
- glibc 2.29+ required
- musl (Alpine) — use Node.js Alpine image

#### Windows
- Windows 10 (Build 19041+)
- Windows 11
- Windows Server 2019+
- PowerShell 5.1+ or Windows Terminal (recommended)
- Administrator privileges required for some hooks

### Optional Dependencies

| Tool | Purpose | Minimum Version |
|---|---|---|
| **Git** | Version control integration, skill management | 2.30.0 |
| **Python** | Some automation scripts | 3.8+ |
| **Docker** | MCP server connectivity, containerized workflows | 20.10+ |
| **jq** | JSON parsing in hooks | 1.6+ |
| **curl** | HTTP operations, MCP communication | 7.68+ |
| **GNU tar** | Archive extraction on Linux | 1.32+ |

### Claude Code Version Compatibility

| Component | Minimum | Recommended |
|---|---|---|
| **Claude Code CLI** | v2.0.0 | v2.1.0+ |
| **Anthropic SDK** | claude-3.5-sonnet | claude-3.7-sonnet |
| **MCP Protocol** | 1.0.0 | 1.1.0+ |

---

## Installation Instructions

### Option 1: npm Global Install (Recommended)

```bash
npm install -g uitkit@1.1.0

# Verify installation
uitkit list

# View available plugins
uitkit list plugins
```

### Option 2: npm Local Install (Project-specific)

```bash
cd /path/to/your/project
npm install --save-dev uitkit@1.1.0

# Use via npx
npx uitkit list
```

### Option 3: Direct from Source

```bash
# Clone repository
git clone https://github.com/UitbreidenOS/UitKit.git
cd UitKit
git checkout v1.1.0

# Install dependencies
npm install

# Link locally
npm link
# or
npm install -g .

# Verify
uitkit list
```

### Option 4: Claude Code Plugin Marketplace (Preferred)

Inside Claude Code:

```
/plugin marketplace add UitbreidenOS/UitKit
/plugin install uitkit-everything@uitkit
```

Or install by domain:

```
/plugin install uitkit-gtm@uitkit
/plugin install uitkit-backend@uitkit
/plugin install uitkit-devops-infra@uitkit
/plugin install uitkit-ai-engineering@uitkit
```

### Option 5: Docker Container

```bash
# Pull image
docker pull ghcr.io/uitkit/uitkit:v1.1.0

# Run with volume mount
docker run -v ~/.claude:/root/.claude \
           -v $(pwd):/workspace \
           ghcr.io/uitkit/uitkit:v1.1.0 \
           uitkit list

# Interactive shell
docker run -it ghcr.io/uitkit/uitkit:v1.1.0 /bin/bash
```

### Option 6: Homebrew (macOS)

```bash
brew tap uitkit/uitkit
brew install uitkit

# or upgrade
brew upgrade uitkit
```

---

## Post-Installation Setup

### 1. Initialize CLI Configuration

```bash
uitkit init

# This creates:
# ~/.claude/
# ~/.claude/settings.json
# ~/.claude/keybindings.json
# ~/.claude/.uitkit/
```

### 2. Add Skills & Agents

```bash
# Add all skills/agents
uitkit add all

# Or by category
uitkit add skills-backend
uitkit add agents-gtm
uitkit add commands

# View what was added
uitkit list installed
```

### 3. Validate Installation

```bash
# Full validation
npm run validate

# Frontmatter check
npm run validate:frontmatter

# Manifest validation
npm run validate:manifests

# Catalog check
npm run validate:catalog
```

### 4. Configure MCP Servers (Optional)

```bash
# List available MCP configs
uitkit list mcp

# Add MCP server
uitkit add mcp-stripe
uitkit add mcp-github
```

### 5. Set Workspace Stack (Optional)

```bash
# List available stacks
uitkit list stacks

# Apply stack to project
uitkit apply-stack my-project --stack=next-js-saas

# View stack details
uitkit describe-stack next-js-saas
```

---

## Verification & Testing

### Quick Verification

```bash
# Check CLI works
uitkit --version

# List skills
uitkit list skills | head -20

# Count artifacts
uitkit list skills | wc -l          # Should show 400+
uitkit list agents | wc -l          # Should show 182+
uitkit list commands | wc -l        # Should show 100+
```

### Full Test Suite

```bash
npm test
npm run test:regression
npm run test:all
```

### Validate Translations

```bash
# Check all translations present
node scripts/validate-translations.js

# List missing translations
node scripts/check-freshness.js
```

---

## Uninstallation

### npm Global

```bash
npm uninstall -g uitkit

# Clean config (optional)
rm -rf ~/.claude
rm -rf ~/.uitkit
```

### npm Local

```bash
npm uninstall uitkit

# Clean project config
rm -rf .claude
```

### Docker

```bash
docker rmi ghcr.io/uitkit/uitkit:v1.1.0
docker rmi ghcr.io/uitkit/uitkit:latest
```

### Homebrew

```bash
brew uninstall uitkit
```

---

## Troubleshooting

### Installation Issues

**Problem:** `command not found: uitkit`
```bash
# Verify npm installation
npm list -g uitkit

# Reinstall globally
npm install -g uitkit@1.1.0

# Check npm bin directory in PATH
echo $PATH | grep $(npm config get prefix)/bin
```

**Problem:** Permission denied on installation
```bash
# Use --prefix to set npm directory
npm install -g uitkit --prefix /usr/local

# Or fix npm permissions
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

**Problem:** Module not found after install
```bash
# Clear npm cache
npm cache clean --force

# Reinstall
npm install -g uitkit@1.1.0
```

### Validation Errors

**Problem:** Frontmatter validation fails
```bash
npm run validate:frontmatter

# Fix missing frontmatter
npm run add-frontmatter
```

**Problem:** Translation missing
```bash
# Check specific file
node scripts/check-freshness.js

# Regenerate translations
npm run translate
```

### Runtime Issues

**Problem:** Skills not appearing in Claude Code
```bash
# Rebuild index
npm run build-index

# Rebuild plugins
npm run build-plugins

# Restart Claude Code session
```

**Problem:** MCP server connection fails
```bash
# Check MCP config
uitkit list mcp

# Test connection
curl http://localhost:3000/health  # if local server

# View logs
cat ~/.claude/logs/mcp.log
```

---

## Release Contents Summary

| Category | Count | Details |
|---|---|---|
| **Skills** | 400+ | Production-grade patterns across 15+ domains |
| **Agents** | 182+ | Specialist subagents with scoped tool access |
| **Slash Commands** | 100+ | Git, testing, refactor, docs, debug, devops, database, security, frontend, API, AI engineering, productivity |
| **Workspace Stacks** | 42 | Pre-wired dev environments for Next.js, FastAPI, Rails, mobile, etc. |
| **MCP Configs** | 41 | GitHub, Stripe, HubSpot, Supabase, Linear, and 36+ more |
| **Hooks** | 40 | Event automations for git, prompt, http, agent lifecycle |
| **Workflows** | 45 | Multi-step process definitions for common patterns |
| **Project Structures** | 83 | Templates for SaaS, CLI, library, game dev, embedded, etc. |
| **Personas** | 10 | Operating profiles: startup-cto, growth-marketer, indie-hacker, etc. |
| **Rules** | 32 | Custom guidelines for code style, security, architecture |
| **Routines** | 10 | Scheduled cloud agents: daily-standup, security-scan, etc. |
| **Output Styles** | 8 | Concise, mentor, code-reviewer, architect, plain-operator, etc. |
| **Themes** | 10 | Dracula, Nord, Tokyo Night, Catppuccin, Gruvbox, Solarized, etc. |
| **Statuslines** | 6 | Executable status bar templates |
| **Keybindings** | 4 | Vim, Emacs, ergonomic, power-user presets |
| **Settings Templates** | 5 | Solo-dev, team, security-hardened, enterprise, minimal |
| **CLAUDE.md Examples** | 20 | Annotated real-world templates (Next.js, FastAPI, monorepo, k8s, etc.) |
| **Languages** | 5 | English, French, German, Dutch, Spanish |

---

## Support & Resources

### Documentation
- **README:** [github.com/UitbreidenOS/UitKit](https://github.com/UitbreidenOS/UitKit)
- **Full Docs:** [uitkit.dev](https://uitkit.dev) (if available)
- **CLAUDE.md Guide:** See `claude-md-examples/` for 20 annotated templates

### Community
- **Reddit:** [r/uitbreiden](https://www.reddit.com/r/uitbreiden/)
- **YouTube:** [@UITBREIDEN](https://www.youtube.com/@UITBREIDEN)
- **GitHub Issues:** [UitbreidenOS/UitKit/issues](https://github.com/UitbreidenOS/UitKit/issues)

### Reporting Issues

File an issue on GitHub with:
1. Output of `uitkit --version`
2. Output of `npm --version` and `node --version`
3. Steps to reproduce
4. Relevant error messages or logs

```bash
# Collect diagnostic info
uitkit --version
node --version
npm --version
uname -a
cat ~/.claude/settings.json  # (if relevant)
```

### Contributing

UitKit welcomes contributions! See [CONTRIBUTING.md](../../CONTRIBUTING.md) for guidelines.

---

## License

**Code License:** AGPL-3.0-or-later  
**Content License:** CC-BY-SA-4.0  
**Summary:**
- Skills, agents, rules, and workflows are available under CC-BY-SA-4.0 (use with attribution)
- Build scripts and CLI tools are under AGPL-3.0 (derivative works must share changes)
- See [LICENSE-CODE](../../LICENSE-CODE) and [LICENSE-CONTENT](../../LICENSE-CONTENT)

---

## Release Notes

For detailed release notes, see [CHANGELOG.md](../../CHANGELOG.md)

### v1.1.0 Highlights

✓ Matrix theme + SVG map inspector + Swarm sandbox features  
✓ Workspace stack validator with CI integration  
✓ Skill/agent dependency graph generator  
✓ Enhanced freshness tracking for all assets  
✓ Automated project scanner with recommendations  
✓ Full translation support: EN/FR/DE/NL/ES  

### Previous Versions

- **v1.10.1** — Previous stable release (ship full Claude Code plugin marketplace)
- Older versions available at [releases page](https://github.com/UitbreidenOS/UitKit/releases)

---

## Version & Build Information

```
Release:         v1.1.0
Build Date:      2026-06-22
Git Commit:      [latest-commit-hash]
Node Version:    18.0.0+
npm Version:     9.0.0+
License:         AGPL-3.0-or-later (code), CC-BY-SA-4.0 (content)
Repository:      github.com/UitbreidenOS/UitKit
NPM Package:     npmjs.com/package/uitkit
```

---

**Generated:** 2026-06-22  
**Maintained by:** UitKit Project  
**Last Updated:** 2026-06-22
