---
name: air-gap
description: "Enterprise air-gap deployment: no external network calls, local model serving, approved tool list, network audit requirements"
updated: 2026-06-15
---

# Enterprise Air-Gap Deployment Guide

This document covers deploying UitKit and Claude Code in fully isolated (air-gapped) enterprise networks with zero external connectivity. It includes security controls, tool whitelisting, local model serving, and audit trails for compliance.

---

## Scope

**Air-gap environment:** A network that is completely isolated from the internet and external services. No outbound HTTP/HTTPS calls, no API access to cloud services, no remote MCP server connections.

**Compliance goals:**
- Zero external API calls
- No data exfiltration (logs, code, credentials)
- Full audit trail of all Claude Code operations
- Approved tools and MCPs only
- Local model serving with no external inference

---

## Prerequisites

### Network Requirements

1. **Completely isolated network** — no internet gateway, no VPN to cloud
2. **Local API proxy** — running on internal servers (Claude API proxy or local LLM)
3. **Internal package mirrors** — npm, PyPI, Maven with cached packages
4. **Local MCP servers** — git, filesystem, custom internal MCPs only
5. **Audit logging infrastructure** — centralized log collection (ELK, Splunk, etc.)

### Approved Infrastructure

- **Operating Systems:** Ubuntu 22.04 LTS, CentOS 8, macOS 12+, Windows Server 2022
- **Container Runtime:** Docker CE or Podman (offline-installable)
- **CI/CD:** Jenkins, GitLab Runner (local only), or GitHub Enterprise Server (on-prem)
- **Model Serving:** Ollama (local LLM), vLLM, or Claude API proxy (cached locally)
- **Logging:** ELK Stack, Splunk, or rsyslog with local syslog server

---

## Part 1: Network Isolation & Verification

### 1.1 Network Audit

Before deploying Claude Code in air-gap, verify zero external connectivity:

```bash
#!/bin/bash
# enterprise/audit-network-isolation.sh

echo "[*] Auditing network isolation..."

# Test outbound connectivity
declare -a EXTERNAL_SERVICES=(
  "api.anthropic.com:443"
  "github.com:443"
  "hub.docker.com:443"
  "registry.npmjs.org:443"
  "pypi.org:443"
  "8.8.8.8:53"  # Google DNS
)

for service in "${EXTERNAL_SERVICES[@]}"; do
  if timeout 2 bash -c "cat < /dev/null > /dev/tcp/${service%:*}/${service#*:}" 2>/dev/null; then
    echo "[FAIL] External connection available: $service"
    exit 1
  else
    echo "[PASS] Blocked: $service"
  fi
done

# Verify firewall rules
echo "[*] Verifying firewall rules..."
sudo iptables -L -n | grep "REJECT\|DROP" | grep -E "out|eth0" && echo "[PASS] Egress filtering enabled"

# Check DNS resolution (should fail for external domains)
if ! nslookup anthropic.com 2>/dev/null | grep -q "Address"; then
  echo "[PASS] External DNS resolution blocked"
else
  echo "[FAIL] External DNS resolution available"
  exit 1
fi

echo "[OK] Network is properly isolated"
```

Run before deployment:

```bash
bash enterprise/audit-network-isolation.sh
```

### 1.2 Egress Firewall Rules

Restrict all outbound traffic. Only allow internal services:

**iptables rules:**

```bash
#!/bin/bash
# enterprise/setup-firewall.sh

# Default deny all outbound
sudo iptables -P OUTPUT DROP

# Allow outbound to internal services only
sudo iptables -A OUTPUT -d 10.0.0.0/8 -j ACCEPT        # RFC1918 internal
sudo iptables -A OUTPUT -d 172.16.0.0/12 -j ACCEPT     # RFC1918 internal
sudo iptables -A OUTPUT -d 192.168.0.0/16 -j ACCEPT    # RFC1918 internal
sudo iptables -A OUTPUT -d 127.0.0.1 -j ACCEPT         # localhost

# Allow internal DNS (if applicable)
sudo iptables -A OUTPUT -d <INTERNAL_DNS_IP> -p udp --dport 53 -j ACCEPT

# Allow internal NTP (if applicable)
sudo iptables -A OUTPUT -d <INTERNAL_NTP_IP> -p udp --dport 123 -j ACCEPT

# Deny everything else
sudo iptables -A OUTPUT -j REJECT --reject-with icmp-net-unreachable

# Persist rules
sudo iptables-save > /etc/iptables/rules.v4
```

---

## Part 2: Local Model Serving

### 2.1 Ollama Deployment (Recommended)

Ollama provides local LLM inference with no external dependencies:

**Install Ollama:**

```bash
# macOS
brew install ollama

# Linux (download from https://ollama.ai)
curl -fsSL https://ollama.ai/install.sh | sh

# Docker (for air-gapped systems)
docker load < ollama-docker.tar
docker run -d --name ollama -p 11434:11434 ollama:latest
```

**Pull models locally (requires internet once):**

```bash
# Before air-gap: pull models with internet access
ollama pull llama2
ollama pull mistral
ollama pull neural-chat

# List available models
ollama list

# Export models for offline transfer
ollama export llama2 > llama2.gguf
```

**Configure Claude Code to use Ollama:**

**.claude/settings.json**

```json
{
  "models": {
    "default": "ollama:llama2",
    "advanced": "ollama:mistral",
    "coding": "ollama:neural-chat"
  },
  "apiUrl": "http://127.0.0.1:11434/v1",
  "apiKey": "offline",
  "disableExternalMcp": true,
  "timeout": 300000
}
```

### 2.2 vLLM Deployment (High Performance)

For higher throughput, deploy vLLM:

**Docker setup:**

```bash
docker pull vllm/vllm-openai
docker run -d \
  --name vllm \
  --gpus all \
  -p 8000:8000 \
  vllm/vllm-openai:latest \
  --model /models/llama2 \
  --served-model-name llama2 \
  --gpu-memory-utilization 0.9
```

**Configure Claude Code:**

```json
{
  "apiUrl": "http://127.0.0.1:8000/v1",
  "model": "llama2",
  "apiKey": "fake-offline-key"
}
```

### 2.3 Claude API Proxy (Cached Responses)

If you have pre-cached Claude responses, run a local proxy:

**Setup:**

```bash
git clone https://github.com/anthropic-ai/python-sdk
cd python-sdk
pip install -e .

# Create cache store
mkdir -p /var/cache/claude-proxy

# Run proxy
python -m anthropic.proxy \
  --host 127.0.0.1 \
  --port 8000 \
  --cache-dir /var/cache/claude-proxy
```

---

## Part 3: Approved Tools & MCPs

### 3.1 Offline-Safe MCP Whitelist

Only these MCPs are allowed in air-gap environments:

| MCP Server | Status | Configuration |
|---|---|---|
| `filesystem` | ✅ Approved | Local file operations |
| `git` | ✅ Approved | Local git repositories |
| `bash` | ✅ Approved | Local shell commands (with restrictions) |
| `postgres` | ✅ Approved | Local PostgreSQL instance |
| `sqlite` | ✅ Approved | Embedded database |
| All external MCPs | ❌ Blocked | GitHub, Slack, Linear, etc. |

### 3.2 MCP Configuration for Air-Gap

**.claude/settings.json**

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "mcp",
      "args": ["server", "filesystem"],
      "disabled": false
    },
    "git": {
      "command": "mcp",
      "args": ["server", "git"],
      "disabled": false
    },
    "bash": {
      "command": "mcp",
      "args": ["server", "bash"],
      "disabled": false,
      "env": {
        "ALLOWED_COMMANDS": "cd,ls,find,grep,cat,echo,git,npm,pip"
      }
    },
    "postgres": {
      "command": "mcp",
      "args": ["server", "postgres"],
      "disabled": false,
      "env": {
        "DATABASE_URL": "postgresql://localhost/uitkit"
      }
    }
  },
  "disableExternalMcp": true,
  "mcpTimeout": 5000
}
```

### 3.3 Bash Command Whitelist

Restrict shell commands to approved set:

```bash
# enterprise/bash-whitelist.sh

ALLOWED_COMMANDS=(
  "cd" "ls" "find" "grep" "cat" "echo" "pwd"
  "git" "npm" "pip" "python" "node" "go" "cargo"
  "docker" "docker-compose" "kubectl"
  "curl" "wget"  # Only for internal URLs
  "jq" "yq" "sed" "awk"
  "ssh" "scp"    # Only to internal hosts
)

# Reject commands containing:
BLOCKED_PATTERNS=(
  "curl http.*anthropic.com"
  "pip install.*--index-url.*https://"
  "npm install.*--registry.*https://"
  "|.*nc.*-l"     # reverse shell
  ">&.*\/dev\/tcp" # outbound connection
)
```

Hook this into `.claude/hooks/validate-bash.sh`:

```bash
#!/bin/bash
# .claude/hooks/validate-bash.sh

COMMAND="$1"

# Check whitelist
for allowed in "${ALLOWED_COMMANDS[@]}"; do
  if [[ "$COMMAND" == "$allowed"* ]]; then
    # Check blocked patterns
    for pattern in "${BLOCKED_PATTERNS[@]}"; do
      if [[ "$COMMAND" =~ $pattern ]]; then
        echo "[BLOCKED] Command violates security policy: $COMMAND" >&2
        exit 1
      fi
    done
    exit 0
  fi
done

echo "[BLOCKED] Command not whitelisted: $COMMAND" >&2
exit 1
```

---

## Part 4: Audit & Logging

### 4.1 Centralized Audit Trail

All Claude Code operations must be logged for compliance:

**.claude/settings.json**

```json
{
  "logging": {
    "enabled": true,
    "level": "INFO",
    "format": "json",
    "outputs": [
      "file:///var/log/uitkit/operations.log",
      "syslog://127.0.0.1:514"
    ]
  },
  "audit": {
    "enabled": true,
    "trackBashCommands": true,
    "trackFileAccess": true,
    "trackMcpCalls": true,
    "retentionDays": 365
  }
}
```

### 4.2 Audit Log Schema

Every operation must log:

```json
{
  "timestamp": "2026-06-15T14:23:45.123Z",
  "user": "alice.smith",
  "action": "bash_command_executed",
  "details": {
    "command": "cd /opt/project && npm run build",
    "working_directory": "/opt/project",
    "exit_code": 0,
    "duration_ms": 1234
  },
  "security": {
    "network_isolation_verified": true,
    "external_calls_attempted": 0,
    "whitelist_check": "PASSED"
  }
}
```

### 4.3 Log Forwarding Setup

Send logs to central syslog server:

```bash
#!/bin/bash
# enterprise/setup-log-forwarding.sh

# Install rsyslog if not present
sudo apt-get install -y rsyslog

# Configure syslog forwarding
sudo tee /etc/rsyslog.d/10-uitkit-forward.conf > /dev/null <<EOF
# Forward UitKit logs to central server
:programname, isequal, "uitkit" @@<INTERNAL_SYSLOG_SERVER>:514

# Also store locally for audit
:programname, isequal, "uitkit" /var/log/uitkit/operations.log
EOF

# Restart rsyslog
sudo systemctl restart rsyslog

# Verify
tail -f /var/log/uitkit/operations.log
```

### 4.4 Compliance Report Generation

Generate audit reports for compliance reviews:

```bash
#!/bin/bash
# enterprise/generate-compliance-report.sh

REPORT_DATE=$(date +%Y-%m-%d)
REPORT_FILE="audit-report-${REPORT_DATE}.json"

jq -s '
{
  report_date: $REPORT_DATE,
  period: {
    start: (map(.timestamp) | min),
    end: (map(.timestamp) | max)
  },
  summary: {
    total_commands: length,
    failed_commands: map(select(.details.exit_code != 0)) | length,
    external_calls_attempted: map(.security.external_calls_attempted) | add
  },
  failed_operations: map(select(.details.exit_code != 0)),
  network_violations: map(select(.security.external_calls_attempted > 0))
}' \
  /var/log/uitkit/operations.log > "$REPORT_FILE"

echo "Compliance report: $REPORT_FILE"
```

---

## Part 5: Deployment Checklist

### Pre-Deployment Security Checklist

```markdown
## Network Isolation
- [ ] Network audit completed (audit-network-isolation.sh passed)
- [ ] Firewall rules configured (setup-firewall.sh applied)
- [ ] Egress filtering enabled (iptables DROP default)
- [ ] No internet gateway in network segment
- [ ] No VPN connections to external networks

## Model Serving
- [ ] Local LLM running (Ollama, vLLM, or proxy)
- [ ] Claude Code configured to use local model
- [ ] API fallbacks configured
- [ ] Model update procedure documented

## MCP & Tools
- [ ] Only approved MCPs enabled
- [ ] External MCPs disabled (DISABLE_EXTERNAL_MCP=true)
- [ ] Bash whitelist configured
- [ ] Command validation hooks installed

## Audit & Logging
- [ ] Audit logging enabled
- [ ] Central log forwarding configured
- [ ] Log retention policy set (365+ days)
- [ ] Compliance report generation tested
- [ ] Log integrity monitoring in place

## Documentation
- [ ] Air-gap deployment guide available offline
- [ ] Incident response procedures documented
- [ ] Offline stack list provided to users
- [ ] Approved command list distributed
```

### Post-Deployment Validation

```bash
#!/bin/bash
# enterprise/validate-air-gap.sh

echo "[*] Validating air-gap deployment..."

# 1. Test network isolation
bash enterprise/audit-network-isolation.sh || exit 1

# 2. Test local model
curl -s http://127.0.0.1:11434/api/tags | grep -q "name" && echo "[PASS] Local LLM running"

# 3. Test approved MCPs
claude --help | grep -q "mcp" && echo "[PASS] MCP support available"

# 4. Test audit logging
tail -5 /var/log/uitkit/operations.log | grep -q "timestamp" && echo "[PASS] Audit logging working"

# 5. Test Claude Code with air-gap settings
export DISABLE_EXTERNAL_MCP=true
claude --version && echo "[PASS] Claude Code running in air-gap mode"

echo "[OK] Air-gap deployment validation complete"
```

---

## Part 6: Troubleshooting & Recovery

### Issue: "Connection refused" on local model

```bash
# Verify local model is running
lsof -i :11434 | grep -q LISTEN && echo "Ollama running" || ollama serve

# Check firewall isn't blocking localhost
sudo iptables -L | grep "127.0.0.1" | grep "ACCEPT"
```

### Issue: "External call attempted" in audit log

Investigation procedure:

```bash
# Find the offending operation
grep "external_calls_attempted.*> 0" /var/log/uitkit/operations.log | head -1

# Identify the command
grep -B5 "external_calls_attempted" /var/log/uitkit/operations.log | grep "command"

# Verify MCP server didn't attempt external call
journalctl -u mcp-server --since "1 hour ago" | grep -i "connect\|http"
```

### Issue: Model quality is poor (local LLM)

Consider these improvements:

1. **Use larger model:** `ollama pull mistral` or `llama2-13b`
2. **Enable GPU acceleration:** `--gpus all` in docker config
3. **Reduce latency:** Use vLLM instead of Ollama
4. **Batch requests:** Queue and process during off-hours

---

## Summary

**Air-gap security controls:**

1. **Network isolation:** Verify zero external connectivity; firewall DROP egress
2. **Local model serving:** Ollama or vLLM for inference; no external APIs
3. **MCP whitelist:** Only filesystem, git, bash, postgres, sqlite allowed
4. **Bash restrictions:** Command whitelist, blocked patterns, validation hooks
5. **Audit trail:** JSON logging, centralized forwarding, compliance reports
6. **Deployment checklist:** Pre-flight and post-flight validation

**For offline operation without air-gap**, see `guides/offline-local-first.md`.

**For stack validation**, see `workflows/offline-validation.md`.
