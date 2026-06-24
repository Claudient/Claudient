# Enterprise Edition

UitKit Enterprise Edition extends Claude Code with production-grade security, compliance, and governance features for regulated industries and high-security deployments.

## Key Features vs. OSS

| Feature | OSS | Enterprise |
|---------|-----|-----------|
| Audit logging | Manual setup | Built-in, encrypted JSONL output |
| Session replay | No | Full session audit trail with replay capability |
| PII detection | No | Pre-tool scanning, regex + ML patterns |
| Cost enforcement | No | Per-session caps, budget alerts, overage blocks |
| Role-based access (RBAC) | No | User/team roles, tool whitelisting, stack permissions |
| SSO integration | No | SAML 2.0, OIDC, Active Directory |
| Compliance artifacts | No | SOC 2 Type II reports, ISO 27001 attestation |
| Security hardening | Basic | Air-gapped deployment, network isolation, secret scanning |
| Managed agents | Basic | Enterprise security officer, cost controller agents |
| SLA guarantees | No | 99.99% uptime, 24/7 support, incident response |

## Who Should Use Enterprise

- **Financial services**: Banks, fintech, insurance — GDPR, SOX, PCI-DSS requirements
- **Healthcare**: HIPAA-regulated systems, EHR integration, audit trails
- **Government contractors**: FedRAMP, CJIS, EAR compliance
- **Large enterprises**: Multi-team deployments, cost control, security governance
- **Data-sensitive orgs**: Medical research, biotech, sensitive IP environments

## Architecture

Enterprise is deployed as:
- **Local deployment**: Air-gapped `.claude` hooks with encrypted audit logs
- **Managed cloud**: Full session audit, role isolation, compliance reporting (UitKit Cloud)
- **Hybrid**: Local compute + cloud audit backend (coming Q3 2026)

## Files in This Directory

- **README.md** — This file; feature overview and deployment options
- **AUDIT_TRAIL.md** — Audit log schema, structured logging format, enabling session capture
- **SSO_SETUP.md** — SAML 2.0 and OIDC configuration for enterprise identity providers
- **COMPLIANCE.md** — Certification notes: SOC 2 Type II, ISO 27001, GDPR alignment, EU AI Act compliance
- **RBAC.md** — Role-based access control: user roles, tool permissions, team stack management

## Quick Start

### Deploy audit logging (5 minutes)
```bash
cp hooks/enterprise/audit-logger.sh .claude/hooks/
chmod +x .claude/hooks/audit-logger.sh
# Add settings.json config (see enterprise/AUDIT_TRAIL.md)
```

### Enable PII scanning (3 minutes)
```bash
cp hooks/enterprise/pii-scanner.sh .claude/hooks/
# Add pre-tool-use hook to settings.json
```

### Set up SSO (30 minutes)
Follow SAML 2.0 or OIDC instructions in **SSO_SETUP.md** with your IdP (Okta, Azure AD, Ping, etc.).

### Enforce cost caps (2 minutes)
```bash
cp hooks/enterprise/cost-cap-enforcer.sh .claude/hooks/
# Set MAX_SESSION_COST and ALERT_THRESHOLD in settings.json
```

## Support & Certification

- **SOC 2 Type II attestation**: Available upon request for UitKit Cloud deployments
- **ISO 27001 scope**: Enterprise deployment environments
- **GDPR Data Processing Agreement**: Included with enterprise license
- **Support**: security@uitkit.com, 24/7 incident response

## Licensing

Enterprise Edition is available under a commercial license. Features may be:
- **Per-seat**: Team pricing, annual renewal
- **Deployment**: On-prem, air-gapped (FedRAMP-ready)
- **Cloud**: Managed UitKit Cloud with compliance reporting

Contact sales@uitkit.com for pricing.

---

**Last updated**: 2026-06-15  
**Model guidance**: Haiku (documentation), Opus (security reviews)
