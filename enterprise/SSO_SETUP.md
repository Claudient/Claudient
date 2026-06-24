# SSO & Identity Integration

Enterprise Edition integrates with SAML 2.0 and OpenID Connect (OIDC) identity providers. This guide covers setup with Okta, Azure AD, Ping Identity, and other common providers.

## Supported Protocols

- **SAML 2.0**: For enterprises with on-prem AD/IdP infrastructure
- **OpenID Connect**: For cloud identity (Okta, Auth0, Google Workspace, Azure)
- **LDAP (on-prem)**: Local directory sync via LDAP connector (Enterprise Cloud only)

## Architecture

Claude Code does not directly authenticate against an IdP. Instead:

1. **Cloud integration** (UitKit Cloud): Enterprise Cloud acts as the SAML/OIDC Service Provider (SP), manages sessions
2. **On-prem** (local `.claude/` hooks): Git config identity + optional JWT token validation via `pem`-format public key
3. **Hybrid**: Local Claude Code + UitKit Cloud session backend for audit/cost enforcement

## Setup: Okta (SAML 2.0)

### Step 1: Create SAML Application in Okta

1. Log in to Okta admin dashboard
2. **Applications** → **Create App Integration**
3. Choose **SAML 2.0**
4. Configure:
   - **Single sign on URL**: `https://cloud.uitkit.com/auth/saml/acs`
   - **Audience URI (Entity ID)**: `https://cloud.uitkit.com`
   - **Name ID Format**: Email address
   - **Application username**: `${user.email}`

### Step 2: Assign Users & Groups

- Add users/groups to the UitKit application in Okta
- Configure group membership claims (e.g., "Engineering", "Finance")

### Step 3: Configure UitKit Cloud

Provide Okta metadata XML to UitKit:

```bash
# Download metadata from Okta:
# Admin → Applications → UitKit → SAML 2.0 → Identity Provider metadata
curl https://company.okta.com/app/exk123abc/sso/saml/metadata > okta-metadata.xml

# Upload to UitKit Cloud:
curl -X POST https://api.uitkit.com/enterprise/sso/okta \
  -H "Authorization: Bearer $UITKIT_API_KEY" \
  -F "metadata=@okta-metadata.xml"
```

### Step 4: Test Login

```bash
# Claude Code will detect SAML requirement and prompt:
# "Please authenticate via Okta: https://cloud.uitkit.com/auth/okta?challenge=xyz"

# After Okta login, you'll receive a session token:
# UITKIT_SESSION_TOKEN=eyJ...
```

## Setup: Azure AD (OIDC)

### Step 1: Register Application in Azure

1. **Azure Portal** → **Azure Active Directory** → **App registrations** → **New registration**
2. Configure:
   - **Name**: UitKit
   - **Redirect URI**: `https://cloud.uitkit.com/auth/oidc/callback`
   - **Accounts in this organizational directory only**

### Step 2: Create Client Secret

1. **Certificates & secrets** → **New client secret**
2. Copy **Client ID** and **Client Secret**

### Step 3: Configure OIDC Scopes & Claims

1. **API permissions** → **Add a permission** → **Microsoft Graph**
   - Add: `email`, `profile`, `openid`
2. **Token configuration**:
   - Add optional claim: `groups` (in Access token)

### Step 4: Configure UitKit Cloud

```bash
curl -X POST https://api.uitkit.com/enterprise/sso/azure \
  -H "Authorization: Bearer $UITKIT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "client_id": "12345678-abcd-efgh-ijkl-mnopqrstuvwx",
    "client_secret": "~Xy-_your_secret_here",
    "tenant_id": "common",
    "scopes": ["email", "profile", "openid"],
    "groups_claim": "groups"
  }'
```

### Step 5: Test OIDC Flow

```bash
# Claude Code will prompt for Azure AD authentication
# Redirects to: https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/authorize
# After approval, receive ID token with email + groups
```

## Setup: On-Premises (Local JWT Validation)

For air-gapped deployments without cloud connectivity:

### Step 1: Generate RSA Keypair

Your IdP generates and signs JWT tokens. Obtain the **public key**:

```bash
# From your IdP (Keycloak, Ping, etc.), download the public key in PEM format:
# Example: https://keycloak.company.com/auth/realms/uitkit/protocol/openid-connect/certs

# Save to .claude/auth/public-key.pem
mkdir -p .claude/auth
curl https://your-idp.company.com/public-key.pem > .claude/auth/public-key.pem
```

### Step 2: Configure JWT Validation Hook

Add to `settings.json`:

```json
{
  "hooks": {
    "SessionStart": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/jwt-validator.sh",
            "async": false
          }
        ]
      }
    ]
  },
  "auth": {
    "mode": "jwt",
    "public_key_path": "${CLAUDE_PROJECT_DIR}/.claude/auth/public-key.pem",
    "expected_issuer": "https://your-idp.company.com",
    "expected_audience": "uitkit"
  }
}
```

### Step 3: Pass JWT at Session Start

Users must provide a valid JWT token:

```bash
# Option A: Environment variable
export UITKIT_TOKEN=$(curl -X POST https://your-idp.company.com/token \
  -d "grant_type=client_credentials&client_id=$CLIENT_ID&client_secret=$CLIENT_SECRET")

# Option B: From git config (if IdP integrated with git)
# (Git credential providers can supply JWT)

# Option C: Interactive login (if OAuth2 provider)
# Claude Code will prompt: "Please authenticate"
```

## Role Mapping

After successful authentication, map IdP groups to Claude Code roles:

### Okta Group Mapping

```json
{
  "sso": {
    "okta": {
      "group_mapping": {
        "okta_group:Engineering": "role:engineer",
        "okta_group:Security": "role:security-officer",
        "okta_group:Finance": "role:cost-controller",
        "okta_group:Admins": "role:admin"
      }
    }
  }
}
```

### Azure AD Group Mapping

```json
{
  "sso": {
    "azure": {
      "group_mapping": {
        "00000000-0000-0000-0000-000000000001": "role:engineer",
        "00000000-0000-0000-0000-000000000002": "role:security-officer"
      }
    }
  }
}
```

## User Provisioning

### Just-In-Time (JIT) Provisioning

When a user logs in via SSO for the first time:

1. IdP claims are validated
2. User record created in UitKit with:
   - Email from `email` claim
   - Name from `name` claim
   - Roles from `groups` claim (mapped via group_mapping)
3. User is assigned default permissions (e.g., "engineer" can run Bash, Read, Write)

### SCIM Provisioning (UitKit Cloud only)

Sync users from Okta/Azure automatically:

```bash
curl -X POST https://api.uitkit.com/enterprise/scim/config \
  -H "Authorization: Bearer $UITKIT_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "enabled": true,
    "provider": "okta",
    "scim_endpoint": "https://cloud.uitkit.com/scim/v2",
    "bearer_token": "scim_secret_token_here"
  }'
```

## Troubleshooting

### SAML Assertion Validation Fails

**Error**: `SAML response signature invalid`

- Ensure Okta certificate hasn't rotated (check metadata)
- Verify system clock is synchronized (NTP)
- Check SP assertion consumer service URL matches exactly

### OIDC Token Expires

**Error**: `JWT expired`

- Claude Code should refresh tokens automatically
- If not, set `token_refresh_interval: 300` (seconds) in settings.json
- Ensure IdP allows offline access for refresh tokens

### User Groups Not Mapped

**Error**: `User has no assigned roles`

- Verify group claim is included in token: `jq -R 'split(".") | .[1] | @base64d | fromjson' <<< $TOKEN`
- Check group name matches exactly in `group_mapping`
- Ensure user is assigned group in IdP (Okta/Azure)

### On-Prem JWT Validation Fails

**Error**: `JWT signature verification failed`

- Download latest public key from IdP
- Verify PEM format: should start with `-----BEGIN PUBLIC KEY-----`
- Test locally: `echo $TOKEN | jq -R 'split(".") | .[1] | @base64d | fromjson'`

## Security Best Practices

1. **Use HTTPS only**: All redirects and callbacks over TLS 1.3
2. **Validate certificate pins** (optional): Pin IdP certificate to prevent MITM
3. **Rotate secrets**: Client secrets, JWTs, API keys on schedule
4. **Disable basic auth**: Turn off password authentication once SSO is deployed
5. **Monitor IdP logs**: Alert on failed auth attempts, suspicious token usage
6. **Audit group changes**: Log when groups are modified in IdP (affects Claude Code roles)

## Compliance Notes

- **SAML 2.0 support** satisfies single sign-on requirement for SOC 2 Type II (AC-2.1)
- **OIDC federation** aligns with NIST SP 800-63-3 (digital identity guidelines)
- **Audit logging** of authentication events for HIPAA, GDPR compliance (see AUDIT_TRAIL.md)

---

**Last updated**: 2026-06-15  
**Related files**: `RBAC.md`, `COMPLIANCE.md`
