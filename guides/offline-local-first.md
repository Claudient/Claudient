---
name: offline-local-first
description: "Offline and local-first mode: running UitKit in air-gapped environments, offline-safe stacks, fallback patterns, and what requires network connectivity"
updated: 2026-06-15
---

# Offline and Local-First Mode Guide

This guide covers running UitKit, its stacks, and Claude Code workflows in air-gapped, offline, and low-connectivity environments. It distinguishes between capabilities that work offline and those that require network access, and documents fallback patterns for disconnected scenarios.

---

## Overview

UitKit is designed to integrate with Claude Code and external tools (Claude API, MCP servers, cloud platforms). However, many workflows can run offline with:

1. **Local model serving** (Claude via local API proxy)
2. **Offline-safe stacks** (skills that don't require network MCP servers or external APIs)
3. **Cached knowledge** (CLAUDE.md, documentation, prompt templates)
4. **Disconnected tools** (local CLI, git, shell, file operations)

This guide identifies which UitKit components work offline and how to configure them.

---

## What Works Offline

### Core UitKit Capabilities (Fully Offline)

- **Guides, skills, agents, workflows, prompts** — all Markdown documentation and patterns
- **Git operations** — cloning, committing, branching (local repo only)
- **File read/write** — any local filesystem operation
- **Bash/shell scripting** — local commands, environment setup
- **Code editing and review** — analysis of local code
- **Templates and checklists** — offline prompt patterns

### Offline-Safe Stacks

The following stacks can run fully offline with no external API or MCP calls:

- **Backend (Go, Rust, C++)** — build tools, compilation, testing (no cloud deployment)
- **Data/ML** — local training, feature engineering, analysis (no cloud inference)
- **DevOps/Infra** — infrastructure-as-code, local k8s, Docker (no external registries)
- **Frontend** — local build, SSG generation, offline component testing
- **Git workflows** — version control, local CI (using local runners)
- **Productivity/Automation** — local CLI scripts, shell workflows
- **Database** — local instances (PostgreSQL, Redis, SQLite) — no cloud queries
- **Computer use** — local UI automation, OCR, desktop scripting

### Offline-Safe MCP Servers

If you're running MCP locally, these servers have no external dependencies:

- `filesystem` — local file operations
- `git` — local git repo access
- `postgres` — local database (requires running instance)
- `sqlite` — embedded database
- `bash` — shell commands on local machine
- Custom local MCPs (any user-built MCP server running on localhost)

---

## What Requires Network

### UitKit Features That Need Internet

- **Claude API calls** — any skill/agent that invokes Claude (requires Anthropic API key and network access)
- **External MCP servers** — remote servers (GitHub, Linear, Slack, etc.)
- **Cloud deployments** — AWS, GCP, Azure (requires cloud API access)
- **Package registries** — npm, PyPI, Maven (requires package download)
- **Web scraping/fetching** — any skill that fetches external URLs
- **Email, Slack, webhooks** — external notification channels
- **DNS, public APIs** — any external HTTP/HTTPS call

### Non-Offline Stacks

The following stacks require network for full functionality:

- **GTM/Growth** — market research, analytics, social media integrations
- **Legal/Compliance** — regulatory databases, API integrations
- **Product/Marketing** — analytics, CMS integration, external tools
- **Finance** — banking APIs, payment processors, market data
- **AI-Engineering** — cloud model APIs, vector databases, inference services

---

## Setting Up Offline Mode

### 1. Local Model Serving

To use Claude models offline, run a local API proxy that caches or self-hosts Claude:

**Option A: Anthropic Proxy (Claude API locally)**

```bash
# Requires: internet for one-time setup, then local serving
# Proxy Claude API through a local endpoint
git clone https://github.com/anthropic-ai/python-sdk
cd python-sdk

# Set up local caching proxy (requires anthropic package)
pip install anthropic
python -m anthropic.proxy --host 127.0.0.1 --port 8000
```

Then configure UitKit to use local endpoint:

```json
{
  "model": "claude-3-5-haiku-20241022",
  "apiUrl": "http://127.0.0.1:8000/v1"
}
```

**Option B: Ollama or Local LLM**

For completely offline operation, use a local LLM:

```bash
brew install ollama  # macOS
# or download from https://ollama.ai

ollama run llama2  # download and run locally
```

Configure Claude Code to use Ollama:

```json
{
  "model": "llama2",
  "apiUrl": "http://127.0.0.1:11434/v1"
}
```

**Tradeoff:** Local models have reduced quality compared to Claude 3.5, but enable fully offline operation.

### 2. Offline MCP Configuration

Disable external MCPs and register only local servers:

**.claude/settings.json**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "mcp",
      "args": ["server", "filesystem"]
    },
    "git": {
      "command": "mcp",
      "args": ["server", "git"]
    }
  },
  "disableExternalMcp": true,
  "mcpTimeout": 5000
}
```

Environment variable to disable all external MCP:

```bash
export DISABLE_EXTERNAL_MCP=true
export MCP_SERVERS=filesystem,git  # comma-separated list
```

### 3. Clone UitKit Locally

Download the entire UitKit repository for offline access:

```bash
git clone https://github.com/tushar2704/UitKit.git /opt/uitkit
export UITKIT_PATH=/opt/uitkit

# Verify offline access
ls /opt/uitkit/guides/offline-local-first.md
```

Point Claude Code to local UitKit:

```bash
--project /opt/uitkit
```

### 4. Cache API Responses

If you need one-time internet access, cache responses for offline use:

```bash
# Before going offline: fetch and cache
claude --project . --cache-responses=true \
  "Generate all patterns for {backend,devops,data-ml}/*.md"

# Goes offline with cached knowledge
claude --offline-only --project .
```

---

## Offline-First Stack Configuration

### Using an Offline Stack

Example: **Backend Engineer Stack (Fully Offline)**

```bash
# Ensure only offline-safe MCPs are enabled
export DISABLE_EXTERNAL_MCP=true
export MCP_SERVERS=filesystem,git

# Load the stack
claude --stack backend \
       --project /opt/uitkit \
       "Build a Go API server with tests and Docker image"
```

All skills in the `backend` stack work without external calls:
- `golang` — local compiler
- `dockerfile` — local container build
- `testing` — local test framework
- `postgres` — local database instance

### Offline Validation Checklist

Before declaring a stack "offline-ready," run through:

```markdown
- [ ] All MCP servers are local (filesystem, git, localhost-bound)
- [ ] No API calls to external services (Claude, cloud platforms, SaaS)
- [ ] No package downloads (all deps cached locally)
- [ ] No web scraping or URL fetching
- [ ] All commands can run with `DISABLE_EXTERNAL_MCP=true`
- [ ] CLAUDE.md lists external dependencies clearly
```

---

## Fallback Patterns for Low Connectivity

When network is intermittent or unreliable:

### 1. Retry with Exponential Backoff

```bash
# .claude/hooks/mcp-retry.sh
for attempt in {1..5}; do
  timeout 5 mcp-call "$@" && exit 0
  sleep $((2 ** attempt))
done
exit 1
```

### 2. Cache-First Lookup

```bash
# Check local cache before making API call
if [[ -f ~/.claude/cache/$QUERY_HASH ]]; then
  cat ~/.claude/cache/$QUERY_HASH
else
  # Make call and cache
  result=$(mcp-call "$@")
  echo "$result" > ~/.claude/cache/$QUERY_HASH
  echo "$result"
fi
```

### 3. Graceful Degradation

Offline-safe skills should detect unavailable MCP and provide fallback:

```markdown
# Example: AWS Architect Skill

## When to activate
- Designing AWS architecture

## When NOT to use
- No internet and AWS credentials unavailable
- Fallback: use CloudFormation templates from local cache

## Instructions

### Offline mode
If AWS API is unavailable, use pre-generated CloudFormation templates:

\`\`\`bash
if ! aws ec2 describe-instances &>/dev/null; then
  echo "AWS API unavailable. Using cached templates."
  cat /opt/uitkit/cache/cf-templates/*.json
fi
\`\`\`
```

### 4. Batch Operations During Online Windows

Collect offline work and sync when network is available:

```bash
# Offline: queue commands
echo "claude --stack backend 'implement feature X'" >> ~/.claude/queue.txt
echo "claude --stack devops 'deploy to staging'" >> ~/.claude/queue.txt

# When online: drain queue
while read cmd; do
  eval "$cmd"
done < ~/.claude/queue.txt
rm ~/.claude/queue.txt
```

---

## Network Detection and Auto-Fallback

### Detect Network Availability

```bash
#!/bin/bash
# ~/.claude/hooks/network-check.sh

if ping -c 1 8.8.8.8 &>/dev/null; then
  export NETWORK_AVAILABLE=true
  export MCP_TIMEOUT=5
else
  export NETWORK_AVAILABLE=false
  export DISABLE_EXTERNAL_MCP=true
  export MCP_TIMEOUT=1
fi
```

Hook to run on startup:

```json
{
  "hooks": {
    "before:startup": {
      "command": "bash",
      "args": ["~/.claude/hooks/network-check.sh"]
    }
  }
}
```

### Auto-Select Stack Based on Connectivity

```bash
#!/bin/bash
# Select offline-safe stack if no network

if [[ "$NETWORK_AVAILABLE" == "false" ]]; then
  STACK="backend"  # offline-safe default
else
  STACK="gtm"  # requires network
fi

claude --stack "$STACK" "$@"
```

---

## Offline-Safe Stacks — Quick Reference

| Stack | Offline? | Notes |
|---|---|---|
| **Backend (Go, Rust, C++)** | ✅ Full | Requires local compiler; no cloud deployment |
| **Data/ML** | ✅ Full | Local training only; no cloud inference |
| **DevOps/Infra** | ⚠️ Partial | IaC works offline; cloud deployment requires API |
| **Frontend** | ✅ Full | Local build and testing; SSG generation |
| **Database** | ✅ Full | Requires local instance running |
| **Productivity** | ✅ Full | Local automation, shell scripts |
| **Git** | ✅ Full | Local version control only |
| **Computer Use** | ✅ Full | Local desktop automation |
| **Finance** | ❌ None | Requires banking/market APIs |
| **GTM/Growth** | ❌ None | Requires analytics, market data APIs |
| **Legal/Compliance** | ❌ None | Requires regulatory databases |
| **AI-Engineering** | ⚠️ Partial | Local models only; cloud inference unavailable |

---

## Offline Documentation Structure

When working offline, navigate UitKit's documentation structure:

```
/opt/uitkit
├── guides/offline-local-first.md       ← You are here
├── enterprise/AIR_GAP.md               ← Deployment guide
├── skills/devops-infra/air-gap-deployment.md
├── workflows/offline-validation.md
├── agents/roles/offline-validator.md
├── guides/                             ← All human-readable docs
├── skills/                             ← All skill patterns
├── agents/                             ← All agent definitions
└── workflows/                          ← All workflow patterns
```

Read from `/opt/uitkit` (not from git remote) when offline.

---

## Troubleshooting Offline Mode

### Symptom: "MCP server not responding"

```bash
# Check if local MCP is running
lsof -i :8000  # if using local proxy

# Force offline mode
export DISABLE_EXTERNAL_MCP=true
export OFFLINE_MODE=true
claude --project /opt/uitkit "test query"
```

### Symptom: "API key not found"

When offline, Claude Code cannot reach Anthropic API. Use local model:

```bash
# Use Ollama instead
export MODEL=llama2
export API_URL=http://127.0.0.1:11434/v1
claude "test query"
```

### Symptom: "Package not found"

If npm/pip tries to fetch from remote registry:

```bash
# Use local cache only
npm ci --prefer-offline --no-audit
pip install --no-index --find-links ./cache -r requirements.txt
```

---

## Summary

**Offline-first principles for UitKit:**

1. **Local-first dependencies** — cache everything; network is optional
2. **Graceful degradation** — detect unavailable MCP; provide fallbacks
3. **Filesystem and git are your friends** — they work without network
4. **Offline-safe stacks** — backend, data/ML, devops (partial), frontend, database, productivity
5. **Network-dependent stacks** — GTM, finance, legal, AI-engineering (partial)
6. **Local model serving** — Ollama, local LLM proxies for offline Claude
7. **Documentation as fallback** — all CLAUDE.md, guides, and patterns are offline-accessible

**For enterprise deployments**, see `enterprise/AIR_GAP.md`.

**For validation workflows**, see `workflows/offline-validation.md`.

**For detailed air-gap deployment**, see `skills/devops-infra/air-gap-deployment.md`.
