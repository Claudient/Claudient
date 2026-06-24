# Role-Based Access Control (RBAC)

Enterprise Edition implements fine-grained RBAC to control which users can access which tools, stacks, and features. This document specifies the role model, permissions, and team management.

## Role Hierarchy

Roles are hierarchical. Higher roles inherit all permissions of lower roles.

```
┌─────────────────────────────────────────────┐
│ Admin                                       │
│ (Full access, manage users/roles, audit)   │
└──────────────────┬──────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
┌───────▼──────────┐  ┌──────▼─────────────┐
│ Security Officer │  │ Cost Controller    │
│ (Audit, RBAC)    │  │ (Budget enforce)   │
└───────┬──────────┘  └──────┬─────────────┘
        │                    │
        └────────┬───────────┘
                 │
        ┌────────▼────────┐
        │ Engineer        │
        │ (Basic tools)   │
        └────────┬────────┘
                 │
        ┌────────▼────────┐
        │ Viewer          │
        │ (Read-only)     │
        └─────────────────┘
```

## Role Definitions

### Viewer
**Base read-only role**

Permissions:
- `Read` — read files
- `Bash` (read-only) — `ls`, `cat`, `git status`
- View audit logs (own session only)
- View cost (own session only)

Use case: New team members, contractors, auditors reviewing code.

### Engineer
**Standard development role**

Inherits: Viewer

Additional permissions:
- `Write`, `Edit` — modify files
- `Bash` (all) — full shell access
- `Bash` tool calls (non-destructive): `git add`, `npm install`, etc.
- Spawn subagents (basic)
- Create/run tasks

Restrictions:
- Cannot modify RBAC or team assignments
- Cannot enable/disable hooks
- Cannot view other users' audit logs (only own)
- Cost cap: $5 USD per session (configurable)

Use case: Software engineers, developers, technical writers.

### Cost Controller
**Budget enforcement & reporting**

Inherits: Engineer

Additional permissions:
- `Read` audit logs (all users, all time)
- Enforce cost caps (global or per-user)
- Generate cost reports
- Export audit logs for billing/FinOps
- Spawn cost-monitoring agents

Restrictions:
- Cannot modify code files (read-only for `Write`/`Edit`)
- Cannot modify user permissions
- Cannot access SSO settings

Use case: Finance team, FinOps engineer, CFO.

### Security Officer
**Compliance & audit oversight**

Inherits: Engineer

Additional permissions:
- `Read` audit logs (all users, all time)
- Modify PII scanning rules
- Enable/disable compliance hooks
- Review RBAC assignments
- Spawn security-review agents
- Modify audit log retention policy

Restrictions:
- Cannot modify cost settings (read-only)
- Cannot delete audit logs
- Cannot disable logging entirely

Use case: Security team, compliance officer, risk management.

### Admin
**Full system access**

Inherits: All

Permissions:
- Modify RBAC: create/delete roles, assign users
- Manage teams and team stacks
- Enable/disable any hook
- Configure SSO, encryption, secrets
- Delete or archive audit logs
- Manage licenses and billing (Cloud)

Use case: System administrators, tech leads, operations.

## Default Role Assignments

When a user logs in for the first time:

| User Type | Default Role | How to Escalate |
|-----------|--------------|-----------------|
| SSO user with group "Engineering" | Engineer | Admin grants explicitly |
| SSO user with group "Security" | Security Officer | — |
| SSO user with group "Finance" | Cost Controller | — |
| SSO user (no group) | Viewer | Request from admin |
| Git user (local, no SSO) | Engineer | Set UITKIT_ROLE env var |

## Team Stack Management

Teams can own/restrict access to specific stacks.

### Define Team Ownership

```json
{
  "teams": {
    "platform-team": {
      "members": ["alice@company.com", "bob@company.com"],
      "role": "Engineer",
      "owned_stacks": [
        "devops_platform_stack",
        "infrastructure_as_code_stack",
        "kubernetes_stack"
      ],
      "cost_budget_usd": 500
    },
    "data-team": {
      "members": ["carol@company.com", "dave@company.com"],
      "role": "Engineer",
      "owned_stacks": [
        "data_engineer_stack",
        "database_admin_stack",
        "analytics_engineer_stack"
      ],
      "cost_budget_usd": 1000
    }
  }
}
```

### Stack-Level Permissions

When a user accesses a stack:

1. Check user role (Viewer < Engineer < Officer < Admin)
2. Check team membership: if user is member of stack's owner team, grant full access
3. Check tool whitelist: if stack restricts tools, enforce (e.g., "data team cannot use Bash")
4. Check cost: deduct from team budget + user budget

Example: Data team with restricted Bash

```json
{
  "stacks": {
    "database_admin_stack": {
      "owned_by": "data-team",
      "role_requirement": "Engineer",
      "restricted_tools": ["Bash"],
      "bash_whitelist": ["mysql", "psql", "pg_restore"],
      "cost_budget_usd": 2000
    }
  }
}
```

User "carol" from data-team:
- ✅ Can run `Bash` with `mysql` commands
- ✅ Can run `Read`, `Write`, `Edit`
- ❌ Cannot run arbitrary Bash (`find`, `rm`, etc.)
- ❌ Cannot access "platform-team" stacks

## Permission Matrix

| Permission | Viewer | Engineer | Cost Ctrl | Security | Admin |
|------------|--------|----------|-----------|----------|-------|
| Read files | ✅ | ✅ | ✅ | ✅ | ✅ |
| Write/Edit | ❌ | ✅ | ❌ | ✅ | ✅ |
| Bash (safe) | ✅ | ✅ | ✅ | ✅ | ✅ |
| Bash (all) | ❌ | ✅ | ❌ | ✅ | ✅ |
| View own logs | ✅ | ✅ | ✅ | ✅ | ✅ |
| View all logs | ❌ | ❌ | ✅ | ✅ | ✅ |
| Modify RBAC | ❌ | ❌ | ❌ | ❌ | ✅ |
| Manage teams | ❌ | ❌ | ❌ | ❌ | ✅ |
| Configure SSO | ❌ | ❌ | ❌ | ❌ | ✅ |
| Enforce costs | ❌ | ❌ | ✅ | ❌ | ✅ |
| Modify compliance | ❌ | ❌ | ❌ | ✅ | ✅ |
| Spawn agents | ✅* | ✅ | ✅* | ✅ | ✅ |
| Delete logs | ❌ | ❌ | ❌ | ❌ | ✅ |

*Viewer and Cost Controller can spawn read-only agents only.

## Assigning Roles

### Via SSO (Recommended)

Configure in settings.json:

```json
{
  "sso": {
    "group_mapping": {
      "okta_group:Engineering": "role:engineer",
      "okta_group:Security": "role:security-officer",
      "okta_group:Finance": "role:cost-controller",
      "okta_group:Admins": "role:admin"
    }
  }
}
```

When user logs in, their roles are automatically assigned based on IdP group membership.

### Via Git Config (Local)

For on-prem without SSO:

```bash
# Assign a user to a role
git config --global uitkit.role engineer
git config --global uitkit.team platform-team
```

Or set environment variable:

```bash
export UITKIT_ROLE=engineer
export UITKIT_TEAM=platform-team
```

### Via API (UitKit Cloud)

```bash
curl -X POST https://api.uitkit.com/enterprise/users/alice%40company.com/role \
  -H "Authorization: Bearer $UITKIT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "role": "security-officer",
    "team": "security-team"
  }'
```

## RBAC Violation Responses

When a user attempts an action they don't have permission for:

### By Role

| Violation | Viewer | Engineer | Cost Ctrl | Security | Admin |
|-----------|--------|----------|-----------|----------|-------|
| Write file | 🚫 Block | — | 🚫 Block | — | — |
| Bash (restricted) | 🚫 Block | 🚫 Block | 🚫 Block | — | — |
| View other's logs | 🚫 Block | 🚫 Block | — | — | — |
| Modify RBAC | 🚫 Block | 🚫 Block | 🚫 Block | 🚫 Block | — |

### Enforcement Mechanism

Violations are caught by the `rbac-enforcer.sh` hook (PreToolUse):

```bash
# Hook checks user role against tool
# If denied, prints error and exits

echo "ERROR: User 'viewer@company.com' cannot use 'Write' tool (requires Engineer+ role)"
exit 1
```

The tool call is never executed. Session logs include the violation attempt for audit.

## Delegated Administration

Admins can delegate specific responsibilities:

### Security Officer Delegation

An admin can create a custom role:

```json
{
  "roles": {
    "pii-reviewer": {
      "inherits": "security-officer",
      "permissions": [
        "audit_logs.read",
        "pii_scanning.config",
        "incident_response.report"
      ],
      "restrictions": [
        "cannot:delete_logs",
        "cannot:modify_encryption"
      ]
    }
  }
}
```

Then assign to a team member:

```bash
git config --global uitkit.role pii-reviewer
```

### Cost Controller Delegation

Finance manager can be limited to budget enforcement only:

```json
{
  "roles": {
    "budget-manager": {
      "inherits": "viewer",
      "permissions": [
        "audit_logs.read",
        "costs.enforce",
        "costs.report",
        "agent.spawn:cost-controller"
      ]
    }
  }
}
```

## Auditing RBAC Changes

Every RBAC change is logged:

```json
{
  "timestamp": "2026-06-15T14:00:00Z",
  "event_type": "rbac_change",
  "actor": "admin@company.com",
  "action": "assign_role",
  "target_user": "carol@company.com",
  "new_role": "security-officer",
  "previous_role": "engineer"
}
```

Query all RBAC changes:

```bash
jq 'select(.event_type == "rbac_change")' .claude/logs/audit.log
```

## Compliance Benefits

- **SOC 2 Type II**: RBAC demonstrates logical access control (CC6.1)
- **GDPR**: Role restrictions prevent unauthorized data access (Article 32)
- **HIPAA**: Segregation of duties between engineers, security, finance
- **ISO 27001**: Access control policy (A.9.1)

---

**Last updated**: 2026-06-15  
**Related files**: `AUDIT_TRAIL.md`, `SSO_SETUP.md`, `COMPLIANCE.md`
