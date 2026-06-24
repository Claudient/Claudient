# Enterprise Deployment Guide

Deploy Claude Code Enterprise in air-gapped, network-isolated environments for maximum security and compliance with regulated industries.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│ Developer Workstation / Jump Host                           │
│ (MacOS, Linux, or Windows WSL2)                            │
└────────────┬────────────────────────────────────────────────┘
             │
    Claude Code (Haiku model locally cached)
    ~/.claude/hooks/ (audit, PII scan, cost cap)
    .claude/logs/ (encrypted audit trail)
             │
┌────────────▼────────────────────────────────────────────────┐
│ Air-Gapped Network Zone (Isolated from Internet)           │
│                                                             │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ Local Git Repository                                  │ │
│ │ (company-internal, no external push)                 │ │
│ └────────────────────────────────────────────────────────┘ │
│                                                             │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ Project .claude/ directory                           │ │
│ │ .claude/hooks/                                       │ │
│ │   ├── audit-logger.sh (PostToolUse)                 │ │
│ │   ├── pii-scanner.sh (PreToolUse)                   │ │
│ │   └── cost-cap-enforcer.sh (Pre/Post)               │ │
│ │ .claude/logs/                                        │ │
│ │   ├── audit.log (encrypted)                         │ │
│ │   ├── pii-scan.log                                  │ │
│ │   └── cost.log                                       │ │
│ │ .claude/auth/                                        │ │
│ │   └── public-key.pem (for local JWT validation)     │ │
│ └────────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘

External (Optional):
┌──────────────────────────────────────────────────────────────┐
│ UitKit Cloud (Managed, for audit logging backend)        │
│ Receives encrypted logs via controlled API gateway          │
│ (Separate physical network zone, TLS mutual auth)           │
└──────────────────────────────────────────────────────────────┘
```

## Air-Gapped Deployment Checklist

### Pre-Deployment

- [ ] **Network isolation verified**: Workstations in DMZ with no internet access
- [ ] **Required tools installed**: Git, Python 3.8+, bash
- [ ] **Storage encrypted**: Full disk encryption (FileVault on Mac, LUKS on Linux)
- [ ] **No VPN/proxy**: All external network access disabled
- [ ] **Secrets prepared**: Company IdP public key, encryption keys

### Claude Code Installation

```bash
# 1. Install Claude Code (on air-gapped machine)
# Download from online machine, transfer via USB/air-gap bridge
# Verify checksum if available

# 2. Verify no external dependencies
which python3      # Should exist
which git          # Should exist
which bash         # Should exist

# 3. Test local operation (no network calls)
cd /path/to/project
claude code "hello"  # Should work without internet
```

### Settings Configuration

**`.claude/settings.json`** — Project-specific configuration:

```json
{
  "model": "claude-haiku-4-5-20251001",
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/audit-logger.sh",
            "async": true
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/pii-scanner.sh",
            "async": false
          },
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/cost-cap-enforcer.sh pre",
            "async": false
          }
        ]
      }
    ]
  },
  "auth": {
    "mode": "jwt",
    "public_key_path": "${CLAUDE_PROJECT_DIR}/.claude/auth/public-key.pem",
    "expected_issuer": "https://idp.company.com"
  },
  "audit": {
    "enabled": true,
    "log_file": "${CLAUDE_PROJECT_DIR}/.claude/logs/audit.log",
    "encryption": "aes256",
    "retention_days": 2555,
    "sanitize_secrets": true,
    "sanitize_pii": true
  },
  "security": {
    "pii_scanning": {
      "enabled": true,
      "action": "block",
      "block_list": ["email", "phone", "ssn", "credit_card", "api_key"]
    }
  },
  "cost_control": {
    "enabled": true,
    "session_cap_usd": 10.0,
    "alert_threshold_usd": 8.0,
    "hard_stop_at_cap": true
  }
}
```

### Hook Installation

```bash
# 1. Create hooks directory
mkdir -p .claude/hooks
chmod 700 .claude/hooks

# 2. Copy hook scripts
cp enterprise/hooks/audit-logger.sh .claude/hooks/
cp enterprise/hooks/pii-scanner.sh .claude/hooks/
cp enterprise/hooks/cost-cap-enforcer.sh .claude/hooks/

# 3. Make executable
chmod +x .claude/hooks/*.sh

# 4. Create log directories
mkdir -p .claude/logs
chmod 700 .claude/logs
mkdir -p .claude/auth

# 5. Add to .gitignore
echo ".claude/logs/" >> .gitignore
echo ".claude/.cost-state" >> .gitignore
```

### Authentication Setup

For local JWT validation (no external IdP calls):

```bash
# 1. Obtain public key from company IdP
# (e.g., Keycloak, Ping, Okta)
curl https://idp.company.com/public-key.pem > .claude/auth/public-key.pem

# 2. Verify key format
openssl rsa -in .claude/auth/public-key.pem -pubin -text -noout

# 3. Restrict permissions
chmod 400 .claude/auth/public-key.pem

# 4. Users obtain JWT token at session start:
# export UITKIT_TOKEN=$(curl -X POST https://idp.company.com/token \
#   -d "grant_type=client_credentials&client_id=..&client_secret=..")
```

## Compliance Configuration

### SOC 2 Type II

For audit purposes, configure:

```json
{
  "audit": {
    "retention_days": 2555,
    "immutable": true,
    "backup_location": "/mnt/air-gap-backup/audit-logs"
  }
}
```

Then implement backup procedure:

```bash
#!/bin/bash
# Daily audit log backup (cron: 0 22 * * *)

BACKUP_DIR="/mnt/secure-nas/uitkit-backups/$(date +%Y/%m)"
mkdir -p "$BACKUP_DIR"
cp .claude/logs/audit.log "$BACKUP_DIR/audit-$(date +%Y%m%d).log"
chmod 400 "$BACKUP_DIR/audit-$(date +%Y%m%d).log"
```

### HIPAA

If processing PHI:

```json
{
  "audit": {
    "encryption": "aes256",
    "encryption_key_path": "${CLAUDE_PROJECT_DIR}/.claude/.audit-key"
  },
  "security": {
    "pii_scanning": {
      "enabled": true,
      "action": "block"
    }
  }
}
```

Generate encryption key (once, then secure):

```bash
openssl rand -hex 32 > .claude/.audit-key
chmod 400 .claude/.audit-key
# Store backup in offline safe/vault
```

### FedRAMP

For government contractors:

```json
{
  "audit": {
    "enabled": true,
    "retention_days": 2555,
    "immutable": true,
    "fips_encryption": true
  },
  "security": {
    "isolation_level": "air_gapped",
    "nist_controls": ["AC-2", "AU-2", "AU-12", "SC-7"]
  }
}
```

## Troubleshooting

### Issue: Hooks not executing

**Symptom**: Audit logs not being created

**Diagnosis**:
```bash
# Check if hooks are in PATH
ls -la .claude/hooks/
file .claude/hooks/audit-logger.sh  # Should be "bash script"

# Test hook manually
echo '{"tool_name":"Bash"}' | bash .claude/hooks/audit-logger.sh

# Check settings.json syntax
jq . .claude/settings.json  # Should be valid JSON
```

**Solution**:
```bash
chmod +x .claude/hooks/*.sh
# Verify hook command path in settings.json uses ${CLAUDE_PROJECT_DIR}
```

### Issue: PII scanner blocking legitimate data

**Symptom**: False positives on passport numbers, internal IDs

**Solution**:
```json
{
  "security": {
    "pii_scanning": {
      "warn_list": ["passport"],
      "block_list": ["email", "phone", "ssn", "credit_card", "api_key"]
    }
  }
}
```

### Issue: Cost logs not updating

**Symptom**: `cost.log` file exists but empty, `.cost-state` not growing

**Solution**:
```bash
# Verify hook syntax
bash -n .claude/hooks/cost-cap-enforcer.sh

# Test manually
echo '{"tool_name":"Read"}' | bash .claude/hooks/cost-cap-enforcer.sh post

# Check file permissions
ls -la .claude/logs/
chmod 600 .claude/logs/*
```

## Best Practices

1. **Log rotation**: Set up cron job to archive logs monthly
2. **Audit review**: Security team reviews logs weekly
3. **Access control**: Only authorized personnel can access `.claude/logs/`
4. **Encryption keys**: Store in offline vault, rotate annually
5. **Testing**: Run compliance tests before going live
6. **Documentation**: Maintain runbook for incident response
7. **Training**: Ensure all developers understand air-gap restrictions

## Migration from OSS to Enterprise

```bash
# 1. Backup existing project
cp -r /path/to/project /path/to/project.backup

# 2. Install enterprise hooks
mkdir -p .claude/hooks
cp enterprise/hooks/* .claude/hooks/
chmod +x .claude/hooks/*.sh

# 3. Update settings.json
# Merge enterprise config into existing settings

# 4. Initialize directories
mkdir -p .claude/logs .claude/auth
chmod 700 .claude/logs .claude/auth

# 5. Test
claude code "test execution"  # Should create audit.log entries

# 6. Verify audit log format
jq . .claude/logs/audit.log  # Should be valid JSONL
```

---

**Last updated**: 2026-06-15  
**Related**: `enterprise/AUDIT_TRAIL.md`, `enterprise/COMPLIANCE.md`, `enterprise/RBAC.md`
