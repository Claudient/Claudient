# Compliance & Certifications

This document outlines UitKit Enterprise Edition's compliance posture, certifications, and alignment with regulatory frameworks.

## SOC 2 Type II

**Status**: Attestation available for UitKit Cloud deployments

UitKit Cloud is audited annually by a third-party CPA firm. The report covers:

- **CC6 — Logical and Physical Access Controls**: User authentication (SSO), API key management, audit log access
- **CC7 — System Monitoring**: Continuous logging of all tool calls, cost enforcement, anomaly detection
- **CC8 — Change Management**: File write audit trail, approval workflows, rollback capabilities
- **CC9 — Risk Mitigation**: Cost caps prevent runaway spend; PII scanning prevents data exposure

**How to access**: Request `SOC 2 Type II Report` from sales@uitkit.com (NDA required)

**Scope**: UitKit Cloud infrastructure and managed deployments only. On-prem `.claude/` hooks are customer-managed.

## ISO 27001

**Status**: Certification in progress (Q3 2026)

UitKit is implementing ISO 27001 Information Security Management System (ISMS) covering:

- **A.5**: Organization of information security (roles, responsibilities)
- **A.6**: Human resource security (staff screening, awareness training)
- **A.7**: Asset management (inventory, classification)
- **A.9**: Access control (RBAC, authentication, encryption)
- **A.10**: Cryptography (data at rest, in transit)
- **A.12**: Operations security (change management, backup)
- **A.13**: Communications security (TLS 1.3, mutual auth)
- **A.14**: System acquisition and development (code review, secure SDLC)
- **A.15**: Supplier relationships (third-party audits)
- **A.16**: Information security incident management (incident response, RTO/RPO)

**Target**: August 2026 certification

## GDPR Compliance

### Data Processing Agreement (DPA)

When using UitKit Cloud, a Data Processing Addendum (DPA) applies:

- UitKit acts as a **Data Processor** (you are the Controller)
- EU Standard Contractual Clauses (SCCs) included
- Sub-processors listed and approved
- Data transfers to US require additional safeguards (Adequacy Decision, BCRs, or SCCs)

**How to get**: Included with enterprise license. Request from sales@uitkit.com.

### Your Responsibilities

As a controller using Claude Code + UitKit Cloud:

1. **Data minimization**: Avoid processing personal data unnecessarily. Audit logs are minimized (see AUDIT_TRAIL.md sanitization rules).
2. **Consent**: Ensure employees/users consent to Claude Code processing their work (via employment agreement or separate notice).
3. **Right to erasure**: Users can request deletion of their audit logs. UitKit Cloud supports bulk deletion via API.
4. **Data retention**: Set audit log retention to match your policy (default: 7 years for compliance, but configurable down to 30 days).
5. **Breach notification**: If Claude Code processes PII and a breach occurs, notify your DPA within 72 hours. UitKit will assist with forensics.

### Key Features for GDPR

- **Audit logging**: Satisfies accountability principle (Article 5.2)
- **PII scanning**: Prevents accidental exposure (Article 32 security measures)
- **Data deletion API**: Support right to erasure (Article 17)
- **Role-based access**: Restrict who can access audit logs (principle of least privilege, Article 32)
- **Encryption**: Data in transit (TLS 1.3) and at rest (AES-256-GCM) on Cloud
- **DPA**: Standard contract terms for lawful processing (Article 28)

## HIPAA

**Status**: HIPAA compliance available for UitKit Cloud (Business Associate Agreement required)

If processing Protected Health Information (PHI):

1. **Request BAA**: UitKit will sign Business Associate Agreement per 45 CFR §164.308(b)
2. **Enable encryption**: 
   - Audit logs encrypted at rest (AES-256-GCM)
   - TLS 1.3 in transit
   - Set `encryption_at_rest: true` in settings.json
3. **Audit trail**: All access to PHI is logged. Set audit log retention to match your policy (typically 6 years for covered entities).
4. **Access controls**: Use RBAC to limit who can access Claude Code. Enforce MFA + SAML SSO.
5. **Incident response**: UitKit supports forensic log export for breach notification analysis.

**Not covered**: On-prem deployments (you are responsible for HIPAA compliance of your `.claude/` hooks and logs).

### Checklist for HIPAA Deployments

- [ ] BAA signed with UitKit
- [ ] UitKit Cloud enabled (not on-prem)
- [ ] Encryption at rest enabled
- [ ] TLS 1.3 for all network traffic
- [ ] SAML SSO configured (MFA required)
- [ ] Audit logging enabled with 6-year retention
- [ ] PII scanning enabled (detect PHI in inputs)
- [ ] Cost cap enforcer deployed (prevent accidental bulk operations)
- [ ] Staff training: only submit necessary PHI to Claude Code
- [ ] Incident response plan: escalation path if Claude Code processes unauthorized PHI

## PCI-DSS

**Status**: Not in scope for UitKit (Claude Code should never process cardholder data)

If you work with payment data:

1. **Do NOT process cardholder data** in Claude Code sessions. Claude Code + UitKit logs are not PCI-DSS compliant.
2. **Use PII scanning**: Enable to detect and block card numbers (regex: `\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b`)
3. **Tokenization**: Replace card numbers with tokens before sending to Claude Code.
4. **Audit separately**: If a file containing PII is accidentally processed, audit logs are available for incident response (see AUDIT_TRAIL.md).

## FedRAMP (Government Contractors)

**Status**: FedRAMP Authorized deployment coming Q4 2026

For US government contractors:

- UitKit Cloud is pursuing **FedRAMP Moderate** authorization
- Air-gapped on-prem deployment available now (no external network calls)
- Supports NIST SP 800-53 controls (AC-2, AU-2, AU-12, etc.)

**Current capabilities** (available today):
- Local audit logging (no cloud dependency)
- Encrypted audit logs via `.claude/` hooks
- SAML 2.0 integration with on-prem IdP
- No external API calls (hooks are local bash scripts)
- Cost enforcement via local hooks

**Future** (Q4 2026):
- FedRAMP Authorized Cloud environment
- FISMA compliance dashboard
- Incident response integration with FedRAMP portal

## EU AI Act Compliance

**Status**: Alignment with EU AI Regulation (2024/1689)

Claude Code is an **AI system** under the regulation. UitKit implements:

### High-Risk Categories (Annex III)

Claude Code is **not** high-risk itself (it's a development tool, not autonomous decision-making). However, if you use it to build high-risk AI systems:

1. **Transparency**: Audit logs document all decisions Claude made during development
2. **Human oversight**: RBAC ensures security officer reviews before deployment
3. **Data quality**: PII scanning prevents training on personal data
4. **Documentation**: Audit trail serves as compliance documentation

### Obligations for Users

If you use Claude Code to develop a high-risk AI system:

- [ ] Conduct impact assessment (DPIA equivalent)
- [ ] Document Claude Code's role in system development
- [ ] Maintain audit trail for regulatory inspection
- [ ] Provide transparency to end-users ("This system was developed with AI assistance")

### Key Features

- **Audit trail** (AI Act Article 5.2a): Complete log of Claude Code decisions
- **Transparency** (Article 6): Explain why specific tools were used
- **Data governance** (Article 10): PII scanning prevents biased/non-consented data
- **Bias monitoring** (Article 15): Cost allocation and access control prevent discrimination

## SOX (Sarbanes-Oxley)

**Status**: Useful for finance/audit teams

If your company is publicly traded:

1. **IT General Controls (ITGCs)**: UitKit satisfies change management (audit trail of file edits), access control (RBAC), and segregation of duties (cost controller agent).
2. **Financial system changes**: Log all changes to accounting systems. Audit trail includes who ran what command when.
3. **Documentation**: Export audit logs for audit committee review (see AUDIT_TRAIL.md querying examples).

**Useful reports**:
- **Change log**: `jq 'select(.tool_name == "Write" or .tool_name == "Edit")' .claude/logs/audit.log`
- **Who changed what**: Group by user_id, filter by tool
- **Cost attribution**: Track which team member's code cost how much

## PII Detection Rules

UitKit's built-in PII scanner detects:

| Type | Regex | Action |
|------|-------|--------|
| Email | `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}` | Block / Flag |
| Phone | `(\+?1)?[-.\s]?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}` | Block / Flag |
| SSN | `\d{3}-\d{2}-\d{4}` | Block / Flag |
| Credit Card | `\b\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}\b` | Block / Flag |
| Passport | `[A-Z0-9]{6,9}` | Flag (high false positive) |
| API Key | `(api|secret|token)[-_]?key[-_]?[=:]\s*[A-Za-z0-9_-]{20,}` | Block |

Configure in settings.json:

```json
{
  "security": {
    "pii_scanning": {
      "enabled": true,
      "action": "block",
      "custom_patterns": [
        {
          "name": "company_employee_id",
          "regex": "EMP[0-9]{6}",
          "action": "flag"
        }
      ]
    }
  }
}
```

## Compliance Audit Checklist

Use this when preparing for external audit:

- [ ] SSO configured (audit identity management)
- [ ] Audit logging enabled (7+ year retention)
- [ ] Encryption enabled (TLS 1.3, AES-256 at rest)
- [ ] RBAC configured (roles, permissions, team assignments)
- [ ] PII scanning enabled (detects sensitive data)
- [ ] Cost caps enforced (prevents resource abuse)
- [ ] Incident response plan documented (escalation, forensics)
- [ ] Staff training completed (data handling, compliance requirements)
- [ ] DPA/BAA signed (if using UitKit Cloud)
- [ ] Audit logs retained per policy (export, archive, delete on schedule)

---

**Last updated**: 2026-06-15  
**Contact**: compliance@uitkit.com  
**Related files**: `AUDIT_TRAIL.md`, `RBAC.md`, `SSO_SETUP.md`
