# Webhooks Reference

Comprehensive guide to webhook payload schemas, retry strategies, and signature verification for UitKit integrations.

---

## Overview

UitKit webhooks enable event-driven integrations across Claude Code environments. This document defines:

1. **Payload schemas** for each event type
2. **Retry strategies** and failure handling
3. **Signature verification** (HMAC-SHA256)
4. **Implementation patterns** for receiving webhooks
5. **Best practices** for production deployments

---

## Event Types

### theme.changed

Fired when the active theme changes in Claude Code (user switches themes, system preference changes, or theme is programmatically updated).

**Payload schema:**

```json
{
  "event": "theme.changed",
  "timestamp": "2026-06-22T14:30:45.123Z",
  "session_id": "sess_abc123def456",
  "project_dir": "/Users/dev/myproject",
  "theme": {
    "id": "dark-pro",
    "name": "Dark Pro",
    "mode": "dark",
    "colors": {
      "background": "#1e1e1e",
      "foreground": "#e0e0e0",
      "accent": "#007acc"
    },
    "previous": {
      "id": "light-default",
      "name": "Light Default",
      "mode": "light"
    }
  },
  "trigger": "user_selection",
  "metadata": {
    "workspace_id": "ws_001",
    "user_id": "usr_789xyz"
  }
}
```

**Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `event` | string | Always `"theme.changed"` |
| `timestamp` | ISO8601 | UTC timestamp of event |
| `session_id` | string | Claude Code session identifier |
| `project_dir` | string | Absolute path to project directory |
| `theme.id` | string | Unique identifier for the theme |
| `theme.name` | string | Human-readable theme name |
| `theme.mode` | string | `"light"` or `"dark"` |
| `theme.colors` | object | Color palette (varies by theme) |
| `theme.previous` | object | Previously active theme (nullable on first change) |
| `trigger` | string | `"user_selection"`, `"system_preference"`, or `"programmatic"` |
| `metadata` | object | Custom workspace/user context (optional) |

**Use cases:**

- Sync theme preference to a dashboard or IDE
- Trigger dark mode on connected displays
- Log theme changes for UX analytics
- Cascade theme updates to dependent services

---

### map.rendered

Fired when a visual map or diagram is generated and rendered (e.g., dependency graph, codebase structure visualization, architecture diagram).

**Payload schema:**

```json
{
  "event": "map.rendered",
  "timestamp": "2026-06-22T14:31:12.456Z",
  "session_id": "sess_abc123def456",
  "project_dir": "/Users/dev/myproject",
  "map": {
    "id": "map_dep_graph_001",
    "type": "dependency_graph",
    "title": "Project Dependency Graph",
    "format": "svg",
    "size_bytes": 45230,
    "dimensions": {
      "width": 1200,
      "height": 800
    },
    "node_count": 42,
    "edge_count": 67,
    "render_time_ms": 1230,
    "export_url": "file:///Users/dev/myproject/.claude/maps/dep_graph_001.svg",
    "data": {
      "nodes": [
        {
          "id": "auth.service",
          "label": "Auth Service",
          "type": "module",
          "dependencies": ["http.client", "crypto.utils"]
        },
        {
          "id": "http.client",
          "label": "HTTP Client",
          "type": "module",
          "dependencies": ["network.socket"]
        }
      ],
      "edges": [
        {
          "source": "auth.service",
          "target": "http.client",
          "weight": 1
        }
      ]
    }
  },
  "trigger": "user_request",
  "filters": {
    "depth": 3,
    "include_external": false
  }
}
```

**Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `event` | string | Always `"map.rendered"` |
| `timestamp` | ISO8601 | UTC timestamp of event |
| `session_id` | string | Claude Code session identifier |
| `project_dir` | string | Project root directory |
| `map.id` | string | Unique map instance identifier |
| `map.type` | string | `"dependency_graph"`, `"architecture"`, `"file_tree"`, `"dataflow"` |
| `map.title` | string | Human-readable map title |
| `map.format` | string | `"svg"`, `"json"`, `"png"` |
| `map.size_bytes` | number | Rendered output size in bytes |
| `map.dimensions` | object | Canvas dimensions `{width, height}` |
| `map.node_count` | number | Total nodes in graph |
| `map.edge_count` | number | Total edges/relationships |
| `map.render_time_ms` | number | Render duration in milliseconds |
| `map.export_url` | string | Local file path or remote URL |
| `map.data` | object | Complete graph data (nodes, edges) |
| `trigger` | string | `"user_request"`, `"auto_generated"`, `"scheduled"` |
| `filters` | object | Query parameters used (depth, include_external, etc.) |

**Map types:**

- **dependency_graph** — Package/module dependencies with import paths
- **architecture** — High-level system architecture and component relationships
- **file_tree** — Directory structure and file organization
- **dataflow** — Data flow between services/modules

**Use cases:**

- Save rendered maps to a knowledge base or wiki
- Display architecture diagrams in documentation
- Archive snapshots of codebase structure over time
- Integrate with diagram generation tools (Miro, Figma)
- Trigger CI/CD pipeline visualization updates

---

### sandbox.completed

Fired when a sandboxed execution (test run, script execution, or isolated environment task) finishes.

**Payload schema:**

```json
{
  "event": "sandbox.completed",
  "timestamp": "2026-06-22T14:32:55.789Z",
  "session_id": "sess_abc123def456",
  "project_dir": "/Users/dev/myproject",
  "sandbox": {
    "id": "sbx_test_run_001",
    "type": "test",
    "name": "Unit Tests - Auth Module",
    "status": "success",
    "exit_code": 0,
    "duration_ms": 4250,
    "started_at": "2026-06-22T14:32:50.539Z",
    "completed_at": "2026-06-22T14:32:55.789Z",
    "command": "npm test -- auth.test.ts",
    "environment": {
      "runtime": "node",
      "version": "20.11.0",
      "vars": {
        "NODE_ENV": "test",
        "DEBUG": "false"
      }
    },
    "resources": {
      "memory_peak_mb": 256,
      "cpu_percent": 78,
      "disk_usage_mb": 45
    },
    "output": {
      "stdout": "PASS auth.test.ts\n  Auth Module\n    ✓ should authenticate valid credentials (125ms)\n    ✓ should reject invalid credentials (98ms)\n  Tests: 2 passed, 0 failed",
      "stderr": "",
      "exit_reason": "success"
    },
    "coverage": {
      "statements": 87.5,
      "branches": 82.0,
      "functions": 90.0,
      "lines": 87.5
    },
    "artifacts": [
      {
        "name": "test-report.json",
        "type": "report",
        "path": "/tmp/sbx_001/test-report.json",
        "size_bytes": 8192
      },
      {
        "name": "coverage.html",
        "type": "coverage",
        "path": "/tmp/sbx_001/coverage.html",
        "size_bytes": 125000
      }
    ]
  },
  "trigger": "user_action",
  "tags": ["test", "auth-module", "precommit"],
  "metadata": {
    "git_branch": "feat/auth-improvements",
    "commit_sha": "a1b2c3d4e5f6",
    "pr_number": 42
  }
}
```

**Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `event` | string | Always `"sandbox.completed"` |
| `timestamp` | ISO8601 | UTC timestamp of completion |
| `session_id` | string | Claude Code session identifier |
| `project_dir` | string | Project root directory |
| `sandbox.id` | string | Unique sandbox execution identifier |
| `sandbox.type` | string | `"test"`, `"script"`, `"build"`, `"lint"`, `"typecheck"` |
| `sandbox.name` | string | Human-readable execution name |
| `sandbox.status` | string | `"success"`, `"failure"`, `"timeout"`, `"cancelled"` |
| `sandbox.exit_code` | number | Process exit code (0 = success) |
| `sandbox.duration_ms` | number | Total execution time in milliseconds |
| `sandbox.started_at` | ISO8601 | Start timestamp |
| `sandbox.completed_at` | ISO8601 | Completion timestamp |
| `sandbox.command` | string | Full command executed |
| `sandbox.environment.runtime` | string | Runtime (`"node"`, `"python"`, `"ruby"`, etc.) |
| `sandbox.environment.version` | string | Runtime version |
| `sandbox.environment.vars` | object | Key environment variables |
| `sandbox.resources.memory_peak_mb` | number | Peak memory usage |
| `sandbox.resources.cpu_percent` | number | Average CPU utilization |
| `sandbox.resources.disk_usage_mb` | number | Disk space consumed |
| `sandbox.output.stdout` | string | Standard output (up to 100KB) |
| `sandbox.output.stderr` | string | Standard error output |
| `sandbox.output.exit_reason` | string | Human-readable exit reason |
| `sandbox.coverage.*` | number | Code coverage percentages (if available) |
| `sandbox.artifacts[]` | array | Generated files (reports, logs, artifacts) |
| `trigger` | string | `"user_action"`, `"pre_commit"`, `"ci_workflow"`, `"scheduled"` |
| `tags[]` | array | Arbitrary tags for filtering/routing |
| `metadata` | object | Git/CI context (branch, commit, PR, etc.) |

**Sandbox types:**

- **test** — Unit, integration, or E2E test runs
- **script** — General script execution
- **build** — Compilation or build process
- **lint** — Linting and formatting checks
- **typecheck** — Type checking (TypeScript, Mypy, etc.)

**Use cases:**

- Post test results to CI/CD system or dashboard
- Send Slack notifications on test failures
- Archive test reports and coverage data
- Trigger downstream workflows on completion
- Track performance metrics over time
- Block merges if coverage drops below threshold

---

## Retry Strategy

### Retry Policy

The UitKit webhook dispatcher implements exponential backoff with jitter:

| Attempt | Delay | Max Wait |
|---------|-------|----------|
| 1 (Initial) | Immediate | N/A |
| 2 | 2 seconds | + 0-1s jitter |
| 3 | 4 seconds | + 0-2s jitter |
| 4 | 8 seconds | + 0-4s jitter |
| 5 | 16 seconds | + 0-8s jitter |
| 6 | 32 seconds | + 0-16s jitter |

**Max retries:** 5 (total delivery attempts: 6)  
**Total delivery window:** ~63 seconds (plus jitter)

### Failure Conditions

Webhooks are retried on:
- HTTP 5xx responses (server errors)
- Network timeouts (default: 30 seconds)
- DNS resolution failures
- Connection refused
- SSL/TLS handshake errors

Webhooks are NOT retried on:
- HTTP 4xx responses (client errors) — fix configuration and redeploy
- Signature verification failure — webhook is discarded
- Event parsing error — webhook is logged but not retried

### Handling Retries Safely

**Implement idempotency:**

```typescript
// Always check if event was already processed
async function handleWebhook(event: WebhookEvent) {
  const exists = await redis.exists(`webhook:processed:${event.id}`)
  if (exists) {
    return NextResponse.json({ received: true })
  }

  try {
    await processEvent(event)
    // Mark as processed with 24-hour TTL (covers retry window + buffer)
    await redis.setex(`webhook:processed:${event.id}`, 86400, '1')
  } catch (err) {
    // Return 5xx to trigger retry
    return NextResponse.json(
      { error: 'Processing failed' },
      { status: 500 }
    )
  }
}
```

**Graceful degradation:**

```python
# Process high-priority events synchronously, defer non-critical work
async def handle_webhook(event: dict):
    # Always return 200 quickly
    asyncio.create_task(background_processing(event))
    return {"received": True}

async def background_processing(event: dict):
    # Retry logic here; failure won't affect webhook response
    try:
        await sync_to_external_system(event)
    except Exception as e:
        logger.error(f"Background processing failed: {e}")
        # Re-raise to be handled by application-level retry
        raise
```

---

## Signature Verification

### Overview

All UitKit webhooks are signed with **HMAC-SHA256**. Verify every webhook before processing to prevent spoofing attacks.

### Verification Process

1. Extract the `X-UitKit-Signature` header
2. Extract the `X-UitKit-Timestamp` header
3. Reconstruct the signed payload: `${timestamp}.${raw_body}`
4. Compute HMAC-SHA256 using your webhook secret
5. Compare using timing-safe comparison
6. Reject if older than 5 minutes (replay attack prevention)

### Implementation

**Node.js / TypeScript:**

```typescript
import crypto from 'crypto'
import { NextRequest, NextResponse } from 'next/server'

const WEBHOOK_SECRET = process.env.UITKIT_WEBHOOK_SECRET!
const TIMESTAMP_TOLERANCE = 300 // 5 minutes in seconds

export async function POST(req: NextRequest) {
  const body = await req.text()  // CRITICAL: raw body before parsing
  const signature = req.headers.get('x-uitkit-signature') ?? ''
  const timestamp = req.headers.get('x-uitkit-timestamp') ?? ''

  // Verify signature
  if (!verifySignature(body, signature, timestamp, WEBHOOK_SECRET)) {
    console.error('Webhook signature verification failed')
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // Parse after verification
  const event = JSON.parse(body)

  // Handle event
  try {
    await handleEvent(event)
    return NextResponse.json({ received: true })
  } catch (err) {
    console.error(`Event handler failed: ${err}`)
    return NextResponse.json(
      { error: 'Processing failed' },
      { status: 500 }
    )
  }
}

function verifySignature(
  body: string,
  signature: string,
  timestamp: string,
  secret: string
): boolean {
  // Validate timestamp (prevent replay attacks)
  const ts = parseInt(timestamp, 10)
  if (isNaN(ts)) return false

  const now = Math.floor(Date.now() / 1000)
  if (Math.abs(now - ts) > TIMESTAMP_TOLERANCE) {
    console.error('Webhook timestamp outside tolerance window')
    return false
  }

  // Reconstruct signed payload
  const signedPayload = `${timestamp}.${body}`

  // Compute expected signature
  const expected = crypto
    .createHmac('sha256', secret)
    .update(signedPayload, 'utf8')
    .digest('hex')

  // Timing-safe comparison (prevents timing attacks)
  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expected, 'hex')
    )
  } catch {
    return false  // length mismatch or invalid hex
  }
}
```

**Python / FastAPI:**

```python
import hmac
import hashlib
import time
from fastapi import Request, HTTPException, APIRouter
from fastapi.responses import JSONResponse

router = APIRouter()

WEBHOOK_SECRET = os.environ["UITKIT_WEBHOOK_SECRET"].encode()
TIMESTAMP_TOLERANCE = 300  # 5 minutes

@router.post("/webhooks/uitkit")
async def handle_webhook(request: Request):
    body = await request.body()  # raw bytes — essential
    signature = request.headers.get("x-uitkit-signature", "")
    timestamp = request.headers.get("x-uitkit-timestamp", "")

    if not verify_signature(body, signature, timestamp, WEBHOOK_SECRET):
        raise HTTPException(status_code=401, detail="Unauthorized")

    event = json.loads(body)

    try:
        await process_event(event)
        return JSONResponse({"received": True})
    except Exception as e:
        logger.error(f"Event processing failed: {e}")
        raise HTTPException(status_code=500, detail="Processing failed")

def verify_signature(
    body: bytes,
    signature: str,
    timestamp: str,
    secret: bytes
) -> bool:
    """Verify HMAC-SHA256 webhook signature."""
    try:
        ts = int(timestamp)
    except ValueError:
        return False

    # Timestamp validation (replay attack prevention)
    now = int(time.time())
    if abs(now - ts) > TIMESTAMP_TOLERANCE:
        logger.warning("Webhook timestamp outside tolerance")
        return False

    # Reconstruct signed payload
    signed_payload = f"{timestamp}.{body.decode('utf-8')}".encode()

    # Compute expected signature
    expected = hmac.new(
        secret,
        signed_payload,
        hashlib.sha256
    ).hexdigest()

    # Timing-safe comparison
    return hmac.compare_digest(signature, expected)
```

**Go:**

```go
package main

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"io"
	"net/http"
	"strconv"
	"time"
)

const TIMESTAMP_TOLERANCE = 300 // 5 minutes

func verifySignature(
	body []byte,
	signature string,
	timestamp string,
	secret string,
) bool {
	// Parse timestamp
	ts, err := strconv.ParseInt(timestamp, 10, 64)
	if err != nil {
		return false
	}

	// Validate timestamp window
	now := time.Now().Unix()
	if absInt64(now-ts) > TIMESTAMP_TOLERANCE {
		return false
	}

	// Reconstruct signed payload
	signedPayload := timestamp + "." + string(body)

	// Compute expected signature
	mac := hmac.New(sha256.New, []byte(secret))
	mac.Write([]byte(signedPayload))
	expected := hex.EncodeToString(mac.Sum(nil))

	// Timing-safe comparison
	return hmac.Equal(
		[]byte(signature),
		[]byte(expected),
	)
}

func handleWebhook(w http.ResponseWriter, r *http.Request) {
	body, _ := io.ReadAll(r.Body)
	signature := r.Header.Get("X-UitKit-Signature")
	timestamp := r.Header.Get("X-UitKit-Timestamp")

	if !verifySignature(body, signature, timestamp, os.Getenv("UITKIT_WEBHOOK_SECRET")) {
		http.Error(w, "Unauthorized", http.StatusUnauthorized)
		return
	}

	// Process event...
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	io.WriteString(w, `{"received": true}`)
}
```

### Headers Reference

| Header | Value | Description |
|--------|-------|-------------|
| `X-UitKit-Signature` | hex string | HMAC-SHA256 of `timestamp.body` |
| `X-UitKit-Timestamp` | unix seconds | Event timestamp for replay prevention |
| `X-UitKit-Event-ID` | UUID | Unique event identifier for idempotency |
| `X-UitKit-Event-Type` | string | `"theme.changed"`, `"map.rendered"`, `"sandbox.completed"` |
| `Content-Type` | `application/json` | Always JSON |

---

## Configuration

### Environment Variables

Store webhook secrets in environment variables, never in source code:

```bash
# .env
UITKIT_WEBHOOK_SECRET=whsec_abc123def456xyz...
UITKIT_WEBHOOK_URL=https://your-api.example.com/webhooks/uitkit

# Optional: for observability
UITKIT_WEBHOOK_TIMEOUT=30
UITKIT_WEBHOOK_RETRY_MAX=5
```

### settings.json Entry

Register webhook endpoints in Claude Code settings:

```json
{
  "webhooks": {
    "outgoing": [
      {
        "event": "theme.changed",
        "url": "https://your-dashboard.example.com/webhooks/theme",
        "enabled": true,
        "headers": {
          "Authorization": "Bearer ${UITKIT_WEBHOOK_SECRET}"
        }
      },
      {
        "event": "sandbox.completed",
        "url": "https://your-ci.example.com/webhooks/test-results",
        "enabled": true,
        "filter": {
          "type": ["test", "build"]
        }
      }
    ]
  }
}
```

---

## Best Practices

### 1. Always Verify Signatures

Never skip signature verification, even in development:

```typescript
// ✅ Good
if (!verifySignature(body, sig, ts, secret)) return 401

// ❌ Never
// Skip signature check in dev
if (process.env.NODE_ENV !== 'development') {
  if (!verifySignature(...)) return 401
}
```

### 2. Process Webhooks Asynchronously

Return 200 immediately; process in background:

```typescript
export async function POST(req: NextRequest) {
  const event = await parseAndVerifyWebhook(req)

  // Queue for async processing
  await queue.add('webhook-handler', event)

  // Return immediately
  return NextResponse.json({ received: true })
}
```

### 3. Implement Idempotency

Always check if event was already processed:

```typescript
const eventKey = `webhook:${event.id}`
if (await cache.exists(eventKey)) {
  return NextResponse.json({ received: true })
}
await cache.setex(eventKey, 86400, '1')
await processEvent(event)
```

### 4. Use Exponential Backoff for Retries

When your endpoint needs to call external services:

```typescript
async function processWebhookWithRetry(
  event: WebhookEvent,
  maxRetries = 3,
) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await externalService.process(event)
    } catch (err) {
      if (i === maxRetries - 1) throw err
      const delay = Math.pow(2, i) * 1000 + Math.random() * 1000
      await sleep(delay)
    }
  }
}
```

### 5. Log All Webhooks (Before Processing)

Log raw webhook data for audit trails and debugging:

```typescript
logger.info('Webhook received', {
  event: event.event,
  id: event.id || 'unknown',
  timestamp: event.timestamp,
  project: event.project_dir,
})

try {
  await handleEvent(event)
  logger.info('Webhook processed', { id: event.id })
} catch (err) {
  logger.error('Webhook processing failed', { id: event.id, error: err })
  throw err
}
```

### 6. Monitor Webhook Queue

Set up alerts for webhook failures:

```typescript
// In your monitoring/alerting system
const failureRate = failedWebhooks / totalWebhooks
if (failureRate > 0.05) {
  alert('Webhook failure rate > 5%')
}

// Track delivery time
metrics.histogram('webhook.delivery_time', deliveryTime)
metrics.gauge('webhook.queue_depth', queueDepth)
```

### 7. Rate Limit Webhook Processing

Prevent cascading failures by limiting concurrent processing:

```typescript
// Use a semaphore or queue with concurrency limit
const queue = new PQueue({ concurrency: 5 })

export async function POST(req: NextRequest) {
  const event = await parseAndVerifyWebhook(req)
  queue.add(() => handleEvent(event))
  return NextResponse.json({ received: true })
}
```

### 8. Document Webhook Contracts

Keep payload documentation in sync with implementation:

```typescript
/**
 * sandbox.completed webhook payload
 *
 * Fired when a sandboxed execution completes.
 * 
 * @see https://docs.example.com/webhooks#sandbox-completed
 * @example
 * {
 *   "event": "sandbox.completed",
 *   "sandbox": { "id": "sbx_001", "status": "success", ... }
 * }
 */
async function handleSandboxCompleted(event: SandboxCompletedEvent) {
  // ...
}
```

---

## Testing Webhooks Locally

### Using curl

```bash
# Generate timestamp and signature
TIMESTAMP=$(date +%s)
SECRET="whsec_test_secret_abc123"
PAYLOAD='{"event":"test","id":"evt_123"}'
SIGNED_STRING="$TIMESTAMP.$PAYLOAD"

SIGNATURE=$(echo -n "$SIGNED_STRING" | \
  openssl dgst -sha256 -hmac "$SECRET" | \
  sed 's/^.* //')

# Send test webhook
curl -X POST http://localhost:3000/webhooks/uitkit \
  -H "Content-Type: application/json" \
  -H "X-UitKit-Signature: $SIGNATURE" \
  -H "X-UitKit-Timestamp: $TIMESTAMP" \
  -d "$PAYLOAD"
```

### Using webhook.cool or ngrok

```bash
# Expose local endpoint
ngrok http 3000

# Configure webhook URL in test dashboard
# https://webhook.cool or similar service

# Trigger test events and monitor local server logs
```

### Unit Tests

```typescript
describe('webhook signature verification', () => {
  it('should verify valid signatures', () => {
    const secret = 'test_secret'
    const timestamp = '1686920000'
    const body = '{"event":"test"}'
    const signed = `${timestamp}.${body}`

    const sig = crypto
      .createHmac('sha256', secret)
      .update(signed, 'utf8')
      .digest('hex')

    const result = verifySignature(body, sig, timestamp, secret)
    expect(result).toBe(true)
  })

  it('should reject old timestamps', () => {
    const oldTimestamp = Math.floor(Date.now() / 1000) - 600 // 10 minutes ago
    const result = verifySignature(body, sig, String(oldTimestamp), secret)
    expect(result).toBe(false)
  })
})
```

---

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| "Signature verification failed" | Wrong secret, body not raw, incorrect format | Verify `X-UitKit-Secret` is correct; ensure `req.text()` or `request.body()` is used before parsing |
| "Event processed twice" | No idempotency check | Add cache lookup on `event.id` before processing |
| "Webhooks stop arriving" | Endpoint returning 4xx | Check logs; 4xx responses are not retried |
| "Webhooks delayed" | Network congestion, slow handler | Return 200 immediately; process async |
| "Wrong event type" | Event routing misconfigured | Verify `X-UitKit-Event-Type` header matches filter |
| "Missing fields in payload" | Payload schema version mismatch | Check UitKit version; schemas are stable within major versions |

---

## Compliance

### Data Privacy

- Webhook payloads may contain project paths, file names, or environment variables
- Sanitize logs before shipping to third-party observability platforms
- Use encryption (TLS) for all webhook endpoints
- Implement access controls for webhook dashboards

### Security

- Never log webhook signatures or secrets
- Rotate webhook secrets periodically
- Use separate endpoints for each event type when possible
- Implement rate limiting on webhook receivers
- Monitor for webhook replay attacks

### Retention

- Log all webhook attempts (success and failure) for 7+ days
- Retain signature verification logs for audit purposes
- Archive payload data per your data retention policy
- Purge processed event IDs after 24 hours (covers retry window)

---

## Additional Resources

- [Webhook Security Skill](../plugins/uitkit-finance-payments/skills/webhooks/SKILL.md) — Detailed patterns for Stripe, GitHub, Svix
- [HTTP Hook Documentation](../hooks/advanced/http-hook-webhook.md) — Claude Code outbound webhook configuration
- [Event Reference](./EVENTS.md) — Full list of available events and schemas (if exists)

---

**Last updated:** 2026-06-22  
**Version:** 1.0  
**Status:** Stable
