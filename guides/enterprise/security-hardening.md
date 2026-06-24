# Enterprise Security Hardening Checklist

Complete security hardening checklist for production Claude Code Enterprise deployments. Use this for security reviews, compliance audits, and incident response planning.

## Network & Isolation

- [ ] **Air-gapped network**: Workstations have NO internet access (verified via `netstat`, `iptables`)
- [ ] **No VPN/proxy**: All external network calls disabled (`grep -r "proxy" ~/.claude/settings.json` returns nothing)
- [ ] **Network policy**: Firewall rules restrict outbound traffic (whitelist only essential services)
- [ ] **USB policy**: Physical security for air-gap bridges (USB restricted to specific devices)
- [ ] **No wireless**: WiFi/Bluetooth disabled on sensitive workstations (lsof -i for verification)

## Authentication & Authorization

- [ ] **SSO configured**: SAML 2.0 or OIDC setup complete (see `enterprise/SSO_SETUP.md`)
- [ ] **MFA enforced**: Multi-factor authentication mandatory for all users
- [ ] **JWT validation**: Local JWT validation for on-prem deployments (public key in `.claude/auth/`)
- [ ] **RBAC deployed**: Role-based access control configured in settings.json
- [ ] **No default passwords**: All credentials rotated after deployment
- [ ] **Session timeout**: Idle sessions timeout after 30 minutes (configurable)
- [ ] **Certificate pinning**: TLS certificate pinning enabled (if using managed UitKit Cloud)

## Secrets & Encryption

- [ ] **No secrets in code**: `.gitignore` includes `.env`, `secrets/`, `credentials/`
- [ ] **Secrets manager integrated**: AWS Secrets Manager, HashiCorp Vault, or equivalent in use
- [ ] **Encryption keys stored offline**: Master keys in secure vault, not on disk
- [ ] **Encryption at rest enabled**: Audit logs encrypted with AES-256-GCM
- [ ] **Encryption in transit**: TLS 1.3 enforced for all network communication
- [ ] **Key rotation**: Schedule for quarterly key rotation
- [ ] **Public key infrastructure**: X.509 certificates from trusted CA (not self-signed in production)

## Audit Logging & Monitoring

- [ ] **Audit logging enabled**: `hooks.PostToolUse` configured for `audit-logger.sh`
- [ ] **Log retention**: Audit logs retained for 7+ years per compliance requirement
- [ ] **Log immutability**: Logs marked read-only after 24 hours (prevent modification)
- [ ] **Log encryption**: Audit logs encrypted at rest and in transit
- [ ] **Log backup**: Daily backups to secure, air-gapped storage
- [ ] **SIEM integration**: Audit logs shipped to Splunk/DataDog/ELK if applicable
- [ ] **Anomaly detection**: Alert on suspicious patterns (e.g., repeated PII detection)
- [ ] **Log review cadence**: Security team reviews logs weekly minimum

## PII & Data Protection

- [ ] **PII scanner enabled**: `security.pii_scanning` configured with action: "block"
- [ ] **Pattern coverage**: Scanner detects emails, phones, SSNs, credit cards, API keys
- [ ] **Custom patterns**: Organization-specific PII patterns added (e.g., employee ID)
- [ ] **Sanitization rules**: Secrets removed from audit logs automatically
- [ ] **Data minimization**: Claude Code only processes necessary project data
- [ ] **No local caching**: Claude Code disables local model caching (if using cloud API)
- [ ] **GDPR compliance**: Data retention policy documented and enforced

## Cost Control & Resource Enforcement

- [ ] **Cost cap enforcer deployed**: `hooks.PreToolUse` and `hooks.PostToolUse` configured
- [ ] **Session caps**: Per-session cost limit set to $10 USD (or organization's policy)
- [ ] **Team budgets**: Monthly budgets defined per team (platform, data, etc.)
- [ ] **Spend alerts**: Notifications at 80% threshold
- [ ] **Hard stops**: Cost cap enforcer blocks execution when limit reached
- [ ] **Cost attribution**: All spend tracked by user and team for chargeback
- [ ] **FinOps review**: Finance team reviews spend reports monthly

## File Access & Secrets Scanning

- [ ] **Secrets scanning**: Pre-commit hook scans for hardcoded secrets (optional: pre-tool hook)
- [ ] **File permissions**: Project directories have restricted permissions (`chmod 700`)
- [ ] **Log directory isolation**: `.claude/logs/` readable only by owner
- [ ] **No sensitive files in project**: No `.pem`, `.key`, `.crt` files checked in
- [ ] **Masked file paths**: Sensitive paths excluded from logs (via .gitignore, .claudeignore)
- [ ] **Read access control**: PII files restricted to need-to-know users (RBAC)

## Compliance & Policy

- [ ] **Security policy documented**: Written policies for data handling, access control, incident response
- [ ] **Acceptable use policy**: Employees acknowledge Claude Code usage restrictions
- [ ] **Incident response plan**: Defined escalation path and forensics procedure
- [ ] **Change management**: All production changes reviewed and logged
- [ ] **Segregation of duties**: No single person can approve and deploy changes
- [ ] **Compliance certifications**: SOC 2 Type II, ISO 27001 (or planned) documented
- [ ] **Audit support**: Internal auditors have access to compliance artifacts
- [ ] **DPA/BAA signed**: Data processing agreement and business associate agreement current

## Infrastructure & Deployment

- [ ] **Workstation hardening**: OS patched, antivirus/EDR enabled, unused services disabled
- [ ] **Git access control**: SSH keys configured, no password auth enabled
- [ ] **Code review process**: All changes reviewed before merge to main
- [ ] **Dependency scanning**: `npm audit` or equivalent run on each commit
- [ ] **Supply chain verification**: Third-party libraries scanned for vulnerabilities
- [ ] **Backup procedures**: Project and audit logs backed up daily
- [ ] **Disaster recovery**: RTO/RPO documented (e.g., RTO 4 hours, RPO 1 hour)
- [ ] **Access logging**: All access to sensitive systems logged and monitored

## Incident Response

- [ ] **Incident response team identified**: Named contacts for security, compliance, legal
- [ ] **Escalation contacts**: Documented phone numbers, email addresses, on-call schedule
- [ ] **Breach notification procedure**: Steps and timelines documented (GDPR 72 hours)
- [ ] **Forensics capability**: Tools available to extract and analyze audit logs
- [ ] **Communication plan**: Internal announcement and external notification templates prepared
- [ ] **Mock incident drill**: Quarterly practice drill (read actual logs, run through response)
- [ ] **Post-incident review**: Blameless retrospective process documented

## Personnel & Training

- [ ] **Security training**: All developers complete annual security awareness training
- [ ] **Claude Code training**: Team knows how to use PII scanner, audit logs, cost controls
- [ ] **Role-specific training**: Security officers trained on audit log analysis
- [ ] **Contractor vetting**: Third parties sign NDAs before accessing project
- [ ] **Onboarding checklist**: New users must complete security checklist
- [ ] **Offboarding checklist**: Departing users' access revoked, logins disabled
- [ ] **Secret rotation**: Shared API keys rotated when users leave

## Compliance-Specific Checklists

### SOC 2 Type II

- [ ] CC6.1: Logical access controls (RBAC, MFA)
- [ ] CC6.2: Prior to issuing system credentials (background checks, training)
- [ ] CC7.1: To satisfy the entity's objectives relative to operational and financial performance (monitoring, logging)
- [ ] CC8.1: Make changes to production systems (change mgmt, audit trail)
- [ ] A1: Entity obtains or generates, uses, and communicates relevant, quality information
- [ ] A1.2: Obtains information from external sources

### HIPAA (if processing PHI)

- [ ] 45 CFR §164.308(a)(3): Workforce security (access control, identity management)
- [ ] 45 CFR §164.312(b): Audit controls (comprehensive audit trail)
- [ ] 45 CFR §164.312(a)(2)(i): Access controls (unique user identification)
- [ ] 45 CFR §164.306: Security standards (risk assessment, risk management plan)
- [ ] 45 CFR §164.308(a)(1): Risk analysis, risk management

### GDPR

- [ ] Article 5: Data protection principles (lawfulness, fairness, purpose limitation, data minimization)
- [ ] Article 32: Security of processing (encryption, confidentiality, integrity)
- [ ] Article 33: Breach notification (72 hours, documentation)
- [ ] Article 34: Communication of breach (notify affected individuals)
- [ ] Article 35: DPIA (Data Protection Impact Assessment)

### CCPA

- [ ] Consumer rights (access, deletion, opt-out)
- [ ] Vendor requirements (non-selling of personal information)
- [ ] Opt-in for minors (under 16 requires parent consent)
- [ ] Right to non-discrimination (no penalty for exercising rights)

## Testing & Validation

### Manual Tests

```bash
# 1. Verify air-gap isolation
netstat -an | grep ESTABLISHED  # Should show NONE or only local connections

# 2. Test audit logging
claude code "test"
jq . .claude/logs/audit.log  # Should be valid JSONL

# 3. Test PII detection
# Try: Read a file with email addresses
# Should be BLOCKED or WARNED

# 4. Test cost capping
export UITKIT_SESSION_CAP=0.01  # Very low cap
claude code "test"  # Should block after first tool call

# 5. Verify RBAC
# Login as "viewer" role, try to Write file
# Should receive permission error

# 6. Check encryption
file .claude/logs/audit.log  # Should show encryption info
```

### Automated Tests (CI/CD Integration)

```bash
#!/bin/bash
# security-check.sh

# Scan for hardcoded secrets
git log -p | grep -i "password\|secret\|api_key" && echo "FAIL: Secrets found" && exit 1

# Check .gitignore
grep -E "\.env|secrets|credentials" .gitignore || echo "FAIL: Secrets not ignored" && exit 1

# Verify hooks are installed
[ -x .claude/hooks/audit-logger.sh ] || echo "FAIL: audit-logger.sh not executable" && exit 1
[ -x .claude/hooks/pii-scanner.sh ] || echo "FAIL: pii-scanner.sh not executable" && exit 1

# Validate settings.json
jq . .claude/settings.json > /dev/null || echo "FAIL: settings.json invalid JSON" && exit 1

# Check encryption is enabled
jq '.audit.encryption' .claude/settings.json | grep -q aes256 || echo "FAIL: Encryption disabled" && exit 1

echo "PASS: All security checks passed"
```

## Post-Deployment

- [ ] **Baseline created**: Capture audit logs, permissions, configuration for comparison
- [ ] **Monitoring enabled**: Alert on anomalies, policy violations, cost spikes
- [ ] **Documentation updated**: Runbooks, incident response, security procedures current
- [ ] **Team notifications**: All users informed of security policies, audit logging
- [ ] **Initial audit**: First week logs reviewed for any issues
- [ ] **Executive briefing**: Security posture presented to leadership

## Annual Review

- [ ] **Vulnerability assessment**: Penetration test or security audit performed
- [ ] **Log retention review**: Ensure audit logs retained per policy
- [ ] **Compliance audit**: External SOC 2 / ISO 27001 audit completed
- [ ] **Key rotation**: Encryption keys, API secrets rotated
- [ ] **Policy updates**: Security policies reviewed and updated if needed
- [ ] **Training refresh**: Annual security training completed by all staff
- [ ] **Incident retrospective**: Any security incidents reviewed and lessons learned

---

**Last updated**: 2026-06-15  
**Related files**: `enterprise/COMPLIANCE.md`, `enterprise/RBAC.md`, `guides/enterprise/deployment-guide.md`
