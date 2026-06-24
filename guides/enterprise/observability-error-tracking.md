# Observability & Error Tracking with Sentry/Rollbar

Integrate Sentry or Rollbar into Claude Code environments for production-grade error tracking, grouping, deduplication, and release correlation. Covers client initialization, custom contexts, issue lifecycle, and compliance.

## When to Use

- Production deployments requiring error aggregation
- Multi-region/multi-environment systems needing centralized error tracking
- Teams needing error attribution, root cause analysis, and impact assessment
- Regulated environments (SOC 2, HIPAA) requiring error audit trails
- Complex systems where error patterns need analysis across versions

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│ Claude Code Execution Environment                          │
│                                                             │
│  Hooks / Tool Use:                                         │
│  ├─ PostToolUse: Capture execution outcomes               │
│  ├─ Session lifecycle: Track long-running tasks           │
│  └─ Errors: Catch/enrich exceptions before propagating    │
└────────────────┬────────────────────────────────────────────┘
                 │ (Initialize Sentry/Rollbar SDK)
                 │
┌────────────────▼────────────────────────────────────────────┐
│ Error Enrichment Layer                                      │
│                                                             │
│  ├─ Fingerprint function (error grouping logic)           │
│  ├─ Custom context injection (user, deployment, release)  │
│  ├─ Breadcrumb collection (tool calls, state changes)     │
│  └─ Deduplication (before/HTTP deduplication)            │
└────────────────┬────────────────────────────────────────────┘
                 │ (HTTP POST with auth)
                 │
┌────────────────▼────────────────────────────────────────────┐
│ Sentry / Rollbar Backend                                    │
│                                                             │
│  ├─ Error grouping (fuzzy matching, fingerprints)        │
│  ├─ Issue deduplication (database lookups)                │
│  ├─ Release tracking (correlation with git tags)         │
│  ├─ Custom dashboards & alerts                            │
│  └─ Compliance retention policies                         │
└─────────────────────────────────────────────────────────────┘
```

## Client Initialization

### Sentry Setup

#### Node.js / JavaScript

```javascript
// .claude/hooks/sentry-init.js
import * as Sentry from "@sentry/node";

export function initSentry() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN, // "https://key@sentry.io/project-id"
    environment: process.env.NODE_ENV || "development",
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
    
    // Release tracking (auto-fetched from git)
    release: getGitRelease(), // "my-app@1.2.3+build.456"
    dist: process.env.BUILD_ID || "local",
    
    // Custom integrations
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.OnUncaughtException(),
      new Sentry.Integrations.OnUnhandledRejection(),
    ],
    
    // Error filtering (reduce noise)
    beforeSend(event, hint) {
      if (event.exception) {
        const error = hint.originalException;
        
        // Ignore PII exposure from logs
        if (error?.message?.includes("password") ||
            error?.message?.includes("token")) {
          return null; // Drop event
        }
      }
      return event;
    },
  });
}

function getGitRelease() {
  const { execSync } = require("child_process");
  try {
    const tag = execSync("git describe --tags --abbrev=0").toString().trim();
    const commit = execSync("git rev-parse --short HEAD").toString().trim();
    return `${tag}+${commit}`;
  } catch {
    return "unknown";
  }
}

export function captureException(error, context = {}) {
  Sentry.captureException(error, { contexts: { custom: context } });
}

export function captureMessage(msg, level = "info", context = {}) {
  Sentry.captureMessage(msg, level, { contexts: { custom: context } });
}
```

#### Python

```python
# .claude/hooks/sentry_init.py
import sentry_sdk
from sentry_sdk.integrations.logging import LoggingIntegration
from sentry_sdk.integrations.flask import FlaskIntegration
import os
import subprocess

def init_sentry():
    sentry_sdk.init(
        dsn=os.getenv("SENTRY_DSN"),
        environment=os.getenv("ENV", "development"),
        traces_sample_rate=0.1 if os.getenv("ENV") == "production" else 1.0,
        
        # Release tracking
        release=get_git_release(),
        dist=os.getenv("BUILD_ID", "local"),
        
        integrations=[
            LoggingIntegration(
                level=logging.INFO,
                event_level=logging.ERROR
            ),
            FlaskIntegration(),
        ],
        
        # Error filtering
        before_send=filter_sensitive_data,
        
        # Profiling (for performance tracking)
        profiles_sample_rate=0.1 if os.getenv("ENV") == "production" else 1.0,
    )

def get_git_release():
    try:
        tag = subprocess.check_output(
            ["git", "describe", "--tags", "--abbrev=0"],
            text=True, stderr=subprocess.DEVNULL
        ).strip()
        commit = subprocess.check_output(
            ["git", "rev-parse", "--short", "HEAD"],
            text=True, stderr=subprocess.DEVNULL
        ).strip()
        return f"{tag}+{commit}"
    except:
        return "unknown"

def filter_sensitive_data(event, hint):
    """Remove PII and secrets before sending"""
    if "exception" in event:
        exception = event["exception"]["values"][0]
        msg = exception.get("value", "")
        
        if any(kw in msg for kw in ["password", "token", "secret", "api_key"]):
            return None  # Drop event
    
    return event

def capture_exception(error, context=None):
    with sentry_sdk.push_scope() as scope:
        if context:
            for key, value in context.items():
                scope.set_context("custom", {key: value})
        sentry_sdk.capture_exception(error)

def capture_message(msg, level="info", context=None):
    with sentry_sdk.push_scope() as scope:
        if context:
            for key, value in context.items():
                scope.set_context("custom", {key: value})
        sentry_sdk.capture_message(msg, level=level)
```

### Rollbar Setup

#### Node.js

```javascript
// .claude/hooks/rollbar-init.js
const Rollbar = require("rollbar");

const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  environment: process.env.NODE_ENV || "development",
  
  // Release tracking
  codeVersion: getGitRelease(),
  
  // Custom payload
  payload: {
    platform: "node",
    notifier: {
      name: "uitkit-error-tracking",
      version: "1.0.0",
    },
  },
  
  // Batching and throttling
  maxItems: 100,
  itemsPerMinute: 60,
  
  // Error filtering
  checkIgnore: (isUncaught, args, payload) => {
    if (payload.body.trace) {
      const msg = payload.body.trace.frames[0]?.method || "";
      if (msg.includes("password") || msg.includes("token")) {
        return true; // Ignore
      }
    }
    return false;
  },
  
  // Transform before send
  transform: (payload) => {
    payload.data.custom = {
      execution_id: process.env.CLAUDE_EXECUTION_ID,
      session_id: process.env.CLAUDE_SESSION_ID,
      timestamp: new Date().toISOString(),
    };
    return payload;
  },
});

function getGitRelease() {
  const { execSync } = require("child_process");
  try {
    return execSync("git describe --tags").toString().trim();
  } catch {
    return "unknown";
  }
}

module.exports = rollbar;
```

## Error Grouping Strategy

### Fingerprinting (Deterministic Grouping)

Sentry and Rollbar use **fingerprints** to group similar errors. Define custom fingerprinting logic to override defaults.

#### Sentry Fingerprint Configuration

```javascript
// .claude/hooks/fingerprinting.js
export const fingerprintStrategies = {
  // Strategy 1: By exception type + message prefix
  byType: (event) => {
    const exc = event.exception?.values?.[0];
    if (!exc) return null;
    
    return [
      exc.type,
      exc.value.split("\n")[0].substring(0, 50), // First line, first 50 chars
    ];
  },
  
  // Strategy 2: By HTTP status code + endpoint
  byHttpStatus: (event) => {
    if (event.request?.url) {
      const url = new URL(event.request.url);
      return [
        event.tags?.["http.status_code"],
        url.pathname,
      ];
    }
    return null;
  },
  
  // Strategy 3: By tool name + error category
  byTool: (event) => {
    const tool = event.tags?.["claude.tool"] || "unknown";
    const category = event.tags?.["error.category"] || "generic";
    return [tool, category];
  },
  
  // Strategy 4: Custom context-based
  byContext: (event) => {
    const context = event.contexts?.custom || {};
    if (context.retry_attempt !== undefined) {
      // Group all retry failures under same issue
      return [context.error_type, "retry_failure"];
    }
    return null;
  },
};

// Usage in Sentry SDK
export function captureWithFingerprint(error, strategy = "byType") {
  const event = fingerprintStrategies[strategy]({
    exception: { values: [{ type: error.constructor.name, value: error.message }] },
    tags: error.tags || {},
  });
  
  Sentry.captureException(error, {
    fingerprint: event || ["{{ default }}"],
  });
}
```

#### Rollbar Fingerprint (via Transform)

```javascript
// .claude/hooks/rollbar-init.js
const rollbar = new Rollbar({
  // ... other config ...
  
  transform: (payload) => {
    const body = payload.body;
    
    if (body.trace) {
      const frames = body.trace.frames || [];
      const lastFrame = frames[frames.length - 1];
      
      // Fingerprint: function + line number + exception type
      body.fingerprint = [
        lastFrame?.method || "unknown",
        lastFrame?.lineno || -1,
        body.trace.exception?.class || "Error",
      ].join(":");
    }
    
    return payload;
  },
});
```

### Exception Patterns for Claude Code

| Pattern | Fingerprint Approach | Example |
|---------|----------------------|---------|
| Tool timeout | `[tool_name, "timeout"]` | `["Bash", "timeout"]` → grouped |
| Network error | `["network", status_code]` | `["network", 503]` → separate from 500 |
| Parsing error | `[parser_type, error_line_range]` | `["json_parser", "lines_1_50"]` |
| Auth failure | `["auth", token_type]` | `["auth", "jwt_expired"]` |
| Resource exhaustion | `["resource", resource_type]` | `["resource", "disk_space"]` |

## Custom Contexts & Metadata

### User Context

```javascript
// Set when session starts or user identified
Sentry.setUser({
  id: process.env.CLAUDE_USER_ID || "anonymous",
  email: process.env.UITKIT_USER_EMAIL,
  username: process.env.USER,
  organization: process.env.CLAUDE_ORG_ID,
  ip_address: process.env.CLIENT_IP,
});

// Or with Rollbar
rollbar.configure({
  payload: {
    person: {
      id: process.env.CLAUDE_USER_ID || "anonymous",
      email: process.env.UITKIT_USER_EMAIL,
      username: process.env.USER,
    },
  },
});
```

### Deployment Context

```javascript
// Hook: capture deployment info at session start
export function setDeploymentContext() {
  Sentry.setContext("deployment", {
    environment: process.env.NODE_ENV,
    region: process.env.REGION || "us-east-1",
    namespace: process.env.KUBE_NAMESPACE,
    pod_name: process.env.HOSTNAME,
    instance_id: process.env.INSTANCE_ID,
    vpc_id: process.env.VPC_ID,
  });
}
```

### Tool Execution Context

```javascript
// .claude/hooks/post-tool-use.js
import * as Sentry from "@sentry/node";

export function onToolUseComplete(toolData) {
  const {
    tool_name,
    input,
    output,
    duration_ms,
    status, // "success" | "error" | "timeout"
    token_usage,
  } = toolData;
  
  Sentry.setContext("tool_execution", {
    tool: tool_name,
    duration_ms,
    status,
    input_size: JSON.stringify(input).length,
    output_size: JSON.stringify(output).length,
    tokens_used: token_usage,
  });
  
  // Log as breadcrumb for future errors
  Sentry.addBreadcrumb({
    category: "tool-use",
    message: `${tool_name} ${status}`,
    level: status === "error" ? "error" : "info",
    data: {
      tool_name,
      duration_ms,
      status,
    },
    timestamp: Date.now() / 1000,
  });
}
```

### Release & Version Correlation

```javascript
// .claude/hooks/release-context.js
export function setReleaseContext() {
  const packageJson = require("../package.json");
  const gitInfo = getGitInfo();
  
  Sentry.setTag("service.version", packageJson.version);
  Sentry.setTag("git.commit", gitInfo.commit);
  Sentry.setTag("git.branch", gitInfo.branch);
  Sentry.setTag("git.tag", gitInfo.tag);
  
  Sentry.setContext("release", {
    version: packageJson.version,
    commit: gitInfo.commit,
    branch: gitInfo.branch,
    author: gitInfo.author,
    timestamp: gitInfo.timestamp,
    changelog_url: `https://github.com/org/repo/releases/tag/${gitInfo.tag}`,
  });
}

function getGitInfo() {
  const { execSync } = require("child_process");
  return {
    commit: execSync("git rev-parse HEAD").toString().trim(),
    branch: execSync("git rev-parse --abbrev-ref HEAD").toString().trim(),
    tag: execSync("git describe --tags --abbrev=0").toString().trim(),
    author: execSync("git log -1 --format=%an").toString().trim(),
    timestamp: execSync("git log -1 --format=%aI").toString().trim(),
  };
}
```

## Issue Deduplication

### Before-Send Deduplication (Client-Side)

Reduce duplicate event transmission before sending to backend.

```javascript
// .claude/hooks/dedup.js
const errorCache = new Map();

export function beforeSend(event) {
  // Generate cache key from exception signature
  const key = generateCacheKey(event);
  
  const lastSeen = errorCache.get(key);
  const now = Date.now();
  
  // Only send if not seen in last 30 seconds
  if (lastSeen && now - lastSeen < 30000) {
    console.log(`[Dedup] Dropped duplicate error: ${key}`);
    return null; // Skip sending
  }
  
  errorCache.set(key, now);
  
  // Cleanup old entries (every 1000 events)
  if (errorCache.size > 1000) {
    const cutoff = now - 300000; // 5 minutes
    for (const [k, v] of errorCache.entries()) {
      if (v < cutoff) errorCache.delete(k);
    }
  }
  
  return event;
}

function generateCacheKey(event) {
  // Combine: exception type + message + filename + lineno
  const exc = event.exception?.values?.[0];
  const frame = exc?.stacktrace?.frames?.[exc.stacktrace.frames.length - 1];
  
  if (!exc) return "unknown";
  
  return [
    exc.type,
    exc.value.split("\n")[0].substring(0, 100),
    frame?.filename,
    frame?.lineno,
  ]
    .filter(Boolean)
    .join("|");
}
```

### Server-Side Deduplication (Sentry/Rollbar)

Backends automatically deduplicate, but configure retention policies:

```json
{
  "sentry": {
    "grouping": {
      "algorithm": "v3", // Latest grouping logic
      "custom_fingerprints": true,
      "grouping_enhancements": [
        {
          "matcher": "error.type:TimeoutError",
          "fingerprint": ["{{ error.type }}", "{{ error.module }}"]
        }
      ]
    },
    "alert_rules": [
      {
        "name": "High-volume error burst",
        "condition": "event.count > 100 in 1m",
        "action": "create_alert",
        "notify": ["slack:#errors", "email:oncall@company.com"]
      }
    ]
  }
}
```

### Duplicate Prevention via Context

```javascript
// Prevent same error from being reported multiple times in one session
export const sessionErrorTracker = {
  errors: new Set(),
  
  isDuplicate(error) {
    const sig = `${error.constructor.name}:${error.message}`;
    if (this.errors.has(sig)) return true;
    this.errors.add(sig);
    return false;
  },
  
  clear() {
    this.errors.clear();
  },
};

export function captureExceptionOnce(error, context) {
  if (!sessionErrorTracker.isDuplicate(error)) {
    Sentry.captureException(error, { contexts: { custom: context } });
  }
}
```

## Breadcrumb Collection

Breadcrumbs provide context for errors by tracking events leading up to failure.

```javascript
// .claude/hooks/breadcrumb-collector.js
import * as Sentry from "@sentry/node";

export class BreadcrumbCollector {
  constructor(maxBreadcrumbs = 100) {
    this.maxBreadcrumbs = maxBreadcrumbs;
    this.breadcrumbs = [];
  }
  
  // Tool execution breadcrumb
  captureToolExecution(toolName, input, output, duration) {
    Sentry.addBreadcrumb({
      category: "tool-execution",
      message: `Executed ${toolName}`,
      level: "debug",
      data: {
        tool: toolName,
        input_preview: JSON.stringify(input).substring(0, 200),
        output_size: JSON.stringify(output).length,
        duration_ms: duration,
      },
    });
  }
  
  // Environment state breadcrumb
  captureEnvironmentState(state) {
    Sentry.addBreadcrumb({
      category: "environment",
      message: "Environment state snapshot",
      level: "info",
      data: {
        memory_mb: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        uptime_sec: process.uptime(),
        node_version: process.version,
        ...state,
      },
    });
  }
  
  // API call breadcrumb
  captureHttpRequest(method, url, statusCode, duration) {
    Sentry.addBreadcrumb({
      category: "http",
      message: `${method} ${url}`,
      level: statusCode >= 400 ? "warning" : "info",
      data: {
        method,
        url,
        status_code: statusCode,
        duration_ms: duration,
      },
    });
  }
  
  // Retry attempt breadcrumb
  captureRetry(attempt, maxAttempts, lastError) {
    Sentry.addBreadcrumb({
      category: "retry",
      message: `Retry attempt ${attempt}/${maxAttempts}`,
      level: "warning",
      data: {
        attempt,
        max_attempts: maxAttempts,
        last_error: lastError?.message,
      },
    });
  }
  
  // State transition breadcrumb
  captureStateTransition(from, to, reason) {
    Sentry.addBreadcrumb({
      category: "state",
      message: `${from} → ${to}`,
      level: "info",
      data: {
        from_state: from,
        to_state: to,
        reason,
      },
    });
  }
}
```

## Release Tracking & Version Correlation

### Automatic Release Detection

```javascript
// .claude/hooks/release-manager.js
import { execSync } from "child_process";

export class ReleaseManager {
  constructor() {
    this.releaseInfo = this.detectRelease();
  }
  
  detectRelease() {
    const sources = [
      this.fromGitTag,
      this.fromPackageJson,
      this.fromEnvironment,
      this.fromGitCommit,
    ];
    
    for (const source of sources) {
      const release = source.call(this);
      if (release) return release;
    }
    
    return "unknown";
  }
  
  fromGitTag() {
    try {
      const tag = execSync("git describe --tags --abbrev=0", {
        encoding: "utf8",
      }).trim();
      const commit = execSync("git rev-parse --short HEAD", {
        encoding: "utf8",
      }).trim();
      return `${tag}+${commit}`;
    } catch {
      return null;
    }
  }
  
  fromPackageJson() {
    try {
      const pkg = require("../package.json");
      return pkg.version;
    } catch {
      return null;
    }
  }
  
  fromEnvironment() {
    return process.env.RELEASE_VERSION || process.env.APP_VERSION || null;
  }
  
  fromGitCommit() {
    try {
      return execSync("git rev-parse --short HEAD", {
        encoding: "utf8",
      }).trim();
    } catch {
      return null;
    }
  }
  
  // Register release with Sentry
  register() {
    const Sentry = require("@sentry/node");
    Sentry.captureMessage("Release registered", "info", {
      contexts: {
        release: this.releaseInfo,
      },
    });
  }
  
  // Create release deployment markers
  async markDeployment(environment, url) {
    const releaseApi = `https://${process.env.SENTRY_ORG}.sentry.io/api/0/organizations/${process.env.SENTRY_ORG}/releases/${this.releaseInfo}/deploys/`;
    
    return fetch(releaseApi, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.SENTRY_AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        environment,
        url,
        name: `Deploy to ${environment}`,
        dateStarted: new Date().toISOString(),
        dateFinished: new Date().toISOString(),
      }),
    });
  }
}
```

### Release Correlation with Errors

```javascript
// In Sentry dashboard: issues filtered by release
// Group errors by deployment: "Show issues first appearing in v1.2.3"

Sentry.setTag("release.deployment_date", new Date().toISOString());
Sentry.setTag("release.environment", process.env.DEPLOYMENT_ENV);
Sentry.setTag("release.rollout_percentage", process.env.CANARY_PERCENTAGE || 100);

// Automatic error correlation
Sentry.captureException(error, {
  tags: {
    "affected_version": "1.2.3",
    "regression_suspect": "commit-abc123",
  },
});
```

## Alert Configuration

### Sentry Alerts

```json
{
  "alert_rules": [
    {
      "name": "Critical errors in production",
      "condition": {
        "filter": "is:unresolved environment:production level:error",
        "threshold": 10,
        "timeframe": "5m"
      },
      "actions": [
        "notify:slack:#critical-errors",
        "notify:email:oncall@company.com",
        "notify:opsgenie"
      ],
      "enabled": true
    },
    {
      "name": "New error type detected",
      "condition": {
        "filter": "error.type:*Error",
        "event_property": "first_seen",
        "value": "today"
      },
      "actions": ["notify:slack:#errors"],
      "enabled": true
    },
    {
      "name": "Error rate spike",
      "condition": {
        "filter": "environment:production",
        "comparison": "percent_increase",
        "threshold": 50,
        "timeframe": "1h"
      },
      "actions": ["notify:slack:#incidents"],
      "enabled": true
    }
  ]
}
```

### Rollbar Alerts

```javascript
// .claude/hooks/rollbar-alerts.js
const rollbar = require("./rollbar-init.js");

export const alertRules = {
  // Critical error threshold
  criticalErrorCount: {
    level: "critical",
    occurrences_in_time_period: 10,
    time_period: 300, // 5 minutes
    actions: ["assign_to_owner", "notify:slack", "create_incident"],
  },
  
  // New error type
  newErrorType: {
    level: "error",
    is_new: true,
    actions: ["notify:slack:#errors"],
  },
  
  // Specific tool failure
  toolFailure: {
    filter: { "context.custom.tool": "Bash" },
    occurrence_threshold: 5,
    time_period: 600,
    actions: ["notify:slack", "page_on_call"],
  },
};
```

## Compliance & Data Retention

### Sensitive Data Filtering

```javascript
// .claude/hooks/compliance-filter.js
export function sanitizeSensitiveData(event) {
  const sensitivePatterns = [
    /password\s*[:=]\s*[^\s]+/gi,
    /api[_-]?key\s*[:=]\s*[^\s]+/gi,
    /token\s*[:=]\s*[^\s]+/gi,
    /secret\s*[:=]\s*[^\s]+/gi,
    /\b\d{4}[\s-]?\d{4}[\s-]?\d{4}[\s-]?\d{4}\b/g, // Credit card
    /\b\d{3}[-]?\d{2}[-]?\d{4}\b/g, // SSN
    /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g, // Email
    /\+?[1-9]\d{1,14}/g, // Phone (E.164)
  ];
  
  const sanitize = (str) => {
    if (typeof str !== "string") return str;
    
    let sanitized = str;
    for (const pattern of sensitivePatterns) {
      sanitized = sanitized.replace(pattern, "[REDACTED]");
    }
    return sanitized;
  };
  
  // Sanitize message
  if (event.exception?.values?.[0]) {
    event.exception.values[0].value = sanitize(
      event.exception.values[0].value
    );
  }
  
  // Sanitize breadcrumbs
  if (event.breadcrumbs) {
    event.breadcrumbs = event.breadcrumbs.map((bc) => ({
      ...bc,
      message: sanitize(bc.message),
      data: Object.fromEntries(
        Object.entries(bc.data || {}).map(([k, v]) => [
          k,
          typeof v === "string" ? sanitize(v) : v,
        ])
      ),
    }));
  }
  
  // Sanitize request/response
  if (event.request) {
    event.request.url = sanitize(event.request.url);
    if (event.request.headers) {
      event.request.headers = Object.fromEntries(
        Object.entries(event.request.headers).map(([k, v]) => [
          k,
          sanitize(v),
        ])
      );
    }
  }
  
  return event;
}
```

### Retention Policies (GDPR/CCPA)

```json
{
  "data_retention": {
    "default_retention_days": 90,
    "high_severity_retention_days": 365,
    "pii_retention_days": 30,
    "production_retention_days": 180,
    "development_retention_days": 7,
    "compliance": {
      "gdpr_enabled": true,
      "ccpa_enabled": true,
      "right_to_deletion": true,
      "automatic_pii_anonymization_after_days": 30
    }
  }
}
```

### Audit Trail Integration

```javascript
// .claude/hooks/compliance-audit.js
export function logErrorToAuditTrail(event) {
  const auditEntry = {
    timestamp: new Date().toISOString(),
    event_type: "error_captured",
    error_id: event.event_id,
    error_type: event.exception?.values?.[0]?.type,
    severity: event.level,
    user_id: event.user?.id,
    environment: event.environment,
    fingerprint: event.fingerprint,
    retention_expires: calculateRetentionDate(event.level),
  };
  
  // Write to immutable audit log
  fs.appendFileSync(
    ".claude/logs/error-audit.jsonl",
    JSON.stringify(auditEntry) + "\n"
  );
}

function calculateRetentionDate(level) {
  const days = level === "fatal" ? 365 : level === "error" ? 90 : 30;
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
}
```

## Integration with Claude Code Hooks

### PostToolUse Hook Integration

```bash
#!/bin/bash
# .claude/hooks/post-tool-use.sh

# Capture tool execution metrics
TOOL_NAME="$1"
TOOL_STATUS="$2"
DURATION_MS="$3"
ERROR_MSG="$4"

if [[ "$TOOL_STATUS" == "error" ]]; then
  node -e "
    const sentry = require('./sentry-init.js');
    sentry.captureMessage('Tool execution failed: $TOOL_NAME', 'error', {
      tool_name: '$TOOL_NAME',
      duration_ms: $DURATION_MS,
      error: '$ERROR_MSG'
    });
  "
fi

# Log to local audit
echo "{\"tool\":\"$TOOL_NAME\",\"status\":\"$TOOL_STATUS\",\"duration_ms\":$DURATION_MS}" >> .claude/logs/tools.jsonl
```

### Session Lifecycle Hooks

```javascript
// .claude/hooks/session-lifecycle.js
import { captureMessage, setDeploymentContext } from "./sentry-init.js";

export function onSessionStart(sessionId) {
  setDeploymentContext();
  
  captureMessage("Claude Code session started", "info", {
    session_id: sessionId,
    user: process.env.USER,
    start_time: new Date().toISOString(),
  });
}

export function onSessionEnd(sessionId, duration, toolsUsed, errorCount) {
  captureMessage("Claude Code session ended", "info", {
    session_id: sessionId,
    duration_sec: duration,
    tools_used: toolsUsed,
    error_count: errorCount,
    end_time: new Date().toISOString(),
  });
}
```

## Troubleshooting

### Events Not Appearing in Sentry/Rollbar

**Symptoms**: No events captured, DSN configured correctly

**Diagnosis**:
```bash
# Check DSN is valid
echo $SENTRY_DSN
# Should be: https://key@sentry.io/project-id

# Verify network connectivity
curl -X POST https://sentry.io/api/0/projects/... -v

# Check beforeSend filter
node -e "
  const Sentry = require('@sentry/node');
  Sentry.init({ dsn: process.env.SENTRY_DSN });
  try { throw new Error('test'); } catch(e) { Sentry.captureException(e); }
  Sentry.close(2000).then(() => console.log('sent'));
"
```

**Solutions**:
- Verify DSN has write access (check token permissions)
- Disable `beforeSend` filters temporarily
- Check firewall/proxy blocking egress
- Ensure environment variable exists: `env | grep SENTRY`

### Duplicate Events Flooding Dashboard

**Symptoms**: Same error grouped 100+ times per minute

**Solutions**:
```javascript
// 1. Enable client-side deduplication
import { beforeSend } from "./dedup.js";
Sentry.init({ beforeSend });

// 2. Configure server-side grouping
// Sentry dashboard → Project Settings → Grouping
// Set Algorithm: "v3" with custom fingerprints

// 3. Add rate limiting
Sentry.init({
  maxBreadcrumbs: 50,
  maxValueLength: 1024,
  attachStacktrace: false, // Reduce payload size
});

// 4. Batch events
Sentry.init({
  transport: new Sentry.Transport({
    flush: true,
    flushInterval: 5000, // Send every 5 seconds
    maxQueue: 30,
  }),
});
```

### PII Exposure in Error Messages

**Symptoms**: Passwords, tokens, emails visible in Sentry

**Solution**:
```javascript
// Always sanitize before sending
Sentry.init({
  beforeSend: (event, hint) => {
    return sanitizeSensitiveData(event);
  },
});

// Test
Sentry.captureMessage("Auth failed: user@example.com");
// Should show in Sentry as: "Auth failed: [REDACTED]"
```

### Release Correlation Not Working

**Symptoms**: "First seen in..." shows "unknown" release

**Solution**:
```javascript
// Ensure release is set before first event
import { ReleaseManager } from "./release-manager.js";

const rm = new ReleaseManager();
Sentry.init({
  release: rm.releaseInfo, // Set early
});

// Verify
Sentry.setTag("release", rm.releaseInfo);
```

## Best Practices Checklist

- [ ] Initialize error tracking on app startup, before any tool use
- [ ] Implement custom fingerprinting for deterministic error grouping
- [ ] Add deployment context (environment, region, version) to every error
- [ ] Collect breadcrumbs for tool executions and state transitions
- [ ] Sanitize sensitive data (passwords, tokens, PII) before sending
- [ ] Set up alerts for critical error thresholds (>10 errors in 5m)
- [ ] Configure release tracking with git tags and commit hashes
- [ ] Implement client-side deduplication to reduce noise
- [ ] Review grouping algorithm settings monthly
- [ ] Audit retention policies against compliance requirements
- [ ] Test error capture in staging before production rollout
- [ ] Monitor error volume trends week-over-week
- [ ] Document error response procedures (who responds, SLA)
- [ ] Use source maps for minified JavaScript stack traces
- [ ] Correlate errors with deployment events in timeline view

---

**Last updated**: 2026-06-22  
**Related**: `enterprise/disaster-recovery.md`, `enterprise/deployment-guide.md`, `enterprise/security-hardening.md`
