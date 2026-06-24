# OpenAPI Specifications

This directory contains OpenAPI 3.1.0 specifications for UitKit's REST APIs.

## Available APIs

### swarm-sandbox-api.yaml

**Swarm Sandbox API** — Multi-agent orchestration with async job handling, webhooks, and resource-isolated execution.

**Key Features:**
- **Async Job Creation** — Create and queue jobs for agent/topology execution
- **Job Control** — Stop, pause, resume running jobs
- **Status Polling** — Real-time status queries with progress tracking
- **Event Streaming** — Server-Sent Events (SSE) for live job updates
- **Webhook Callbacks** — Register endpoints for job completion notifications
- **Log Streaming** — JSONL log retrieval with filtering by worker/level
- **Topology Management** — Load/unload swarm topologies (sequential, fan-out/fan-in, hierarchical, mesh)

**Base URLs:**
- Development: `http://localhost:3001/api`
- Production: `https://sandbox.uitkit.io/api`

**Main Endpoints:**

| Method | Path | Description |
|--------|------|-------------|
| POST | `/jobs` | Create and queue a new job |
| GET | `/jobs/{jobId}` | Get job status and results |
| POST | `/jobs/{jobId}/stop` | Stop running job |
| POST | `/jobs/{jobId}/pause` | Pause job execution |
| POST | `/jobs/{jobId}/resume` | Resume paused job |
| GET | `/jobs/{jobId}/logs` | Stream job logs (JSONL) |
| GET | `/jobs/{jobId}/events` | Subscribe to job events (SSE) |
| GET | `/status` | Get sandbox health and statistics |
| GET | `/status/jobs` | List jobs with filtering |
| POST | `/webhooks` | Register webhook callback |
| GET | `/webhooks/{webhookId}` | Get webhook details |
| DELETE | `/webhooks/{webhookId}` | Delete webhook |
| POST | `/webhooks/{webhookId}/test` | Send test event |
| POST | `/topologies` | Load a swarm topology |
| GET | `/topologies` | List loaded topologies |
| DELETE | `/topologies/{topologyName}` | Unload topology |

**Key Schemas:**

- **CreateJobRequest** — Job submission payload with agent/topology, input, timeout, priority, webhooks
- **JobStatus** — Current job state with progress, results, resource usage, errors
- **JobEvent** — Real-time events (queued, started, completed, failed, stopped)
- **TopologyConfig** — Swarm topology definition (agents, edges, coordinator)
- **WebhookRegistration** — Webhook endpoint configuration with filters and retry policy

**Example: Simple Agent Job**

```bash
curl -X POST http://localhost:3001/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "agent_name": "echo-agent",
    "input": {"message": "hello"},
    "timeout_ms": 30000,
    "webhook_url": "https://webhook.example.com/complete"
  }'
```

Response (HTTP 202):
```json
{
  "job_id": "job-abc123",
  "status": "queued",
  "created_at": "2026-06-22T14:30:00Z",
  "queue_position": 0,
  "estimated_start_time": "2026-06-22T14:30:05Z"
}
```

**Example: Pipeline Topology Job**

```bash
curl -X POST http://localhost:3001/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "topology_name": "data-pipeline",
    "input": {"data": [1, 2, 3]},
    "timeout_ms": 120000,
    "priority": "high",
    "webhook_events": ["completed", "failed", "progress_update"]
  }'
```

**Async Job Handling:**

1. **Submission** — POST `/jobs` returns immediately with `job_id` (HTTP 202)
2. **Polling** — GET `/jobs/{jobId}` to check status
3. **Events** — GET `/jobs/{jobId}/events` for real-time updates (SSE)
4. **Webhooks** — Receive HTTP POST callback when job completes/fails
5. **Logs** — GET `/jobs/{jobId}/logs` to retrieve full execution logs

**Webhook Callback Format:**

When registered with `webhook_url`, job completion triggers:
```json
{
  "event_type": "job_completed",
  "job_id": "job-abc123",
  "timestamp": "2026-06-22T14:35:00Z",
  "data": {
    "status": "completed",
    "result": {
      "output": "processed data",
      "metrics": {"duration_ms": 5432, "workers_used": 4}
    },
    "resource_usage": {
      "cpu_percent": 45.2,
      "memory_mb": 512,
      "duration_ms": 5432
    }
  }
}
```

On failure:
```json
{
  "event_type": "job_failed",
  "job_id": "job-abc124",
  "timestamp": "2026-06-22T14:35:30Z",
  "data": {
    "status": "failed",
    "error": {
      "code": "TIMEOUT",
      "message": "Job exceeded maximum execution time",
      "details": {"timeout_ms": 30000, "elapsed_ms": 31500}
    }
  }
}
```

**Job Lifecycle:**

```
                    [Queue]
                       |
                       v
[queued] -> [running] -> [paused] (pause/resume)
               |            |
               +-> [stopped] (manual stop)
               |
               +-> [completed] (success)
               |
               +-> [failed] (error/timeout)
```

**Status Polling Example:**

```bash
job_id="job-abc123"
while true; do
  status=$(curl -s http://localhost:3001/api/jobs/$job_id | jq -r '.status')
  case $status in
    completed|failed|stopped)
      echo "Job finished: $status"
      curl -s http://localhost:3001/api/jobs/$job_id | jq '.result'
      break
      ;;
    *)
      echo "Job in progress: $status"
      sleep 2
      ;;
  esac
done
```

**Log Streaming Example:**

```bash
# Get logs from all workers
curl -s http://localhost:3001/api/jobs/{jobId}/logs | jq '.'

# Get error logs from specific worker
curl -s "http://localhost:3001/api/jobs/{jobId}/logs?worker=processor&level=error"

# Follow logs in real-time (SSE)
curl -s "http://localhost:3001/api/jobs/{jobId}/logs?follow=true"
```

**Topology Management:**

```bash
# Load a sequential pipeline topology
curl -X POST http://localhost:3001/api/topologies \
  -H "Content-Type: application/json" \
  -d '{
    "topology_type": "sequential",
    "topology_name": "data-pipeline",
    "agents": [
      {"name": "validator", "template": "input-validator"},
      {"name": "processor", "template": "data-transform"},
      {"name": "enricher", "template": "knowledge-enricher"}
    ],
    "flow": [
      {"from": "validator", "to": "processor", "on": "success"},
      {"from": "processor", "to": "enricher", "on": "success"}
    ]
  }'

# List loaded topologies
curl http://localhost:3001/api/topologies

# Unload topology
curl -X DELETE http://localhost:3001/api/topologies/data-pipeline
```

**Webhook Registration:**

```bash
curl -X POST http://localhost:3001/api/webhooks \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://webhook.example.com/jobs",
    "events": ["completed", "failed", "progress_update"],
    "job_filter": {
      "labels": {"env": "prod"},
      "topologies": ["data-pipeline"]
    },
    "headers": {
      "Authorization": "Bearer token123",
      "X-Custom-Header": "value"
    },
    "retry_policy": {
      "max_retries": 3,
      "backoff_ms": 1000,
      "backoff_multiplier": 2
    }
  }'
```

**Error Handling:**

The API returns structured errors with codes, messages, and context:

```json
{
  "error": {
    "code": "TIMEOUT",
    "message": "Job exceeded maximum execution time",
    "details": {
      "job_id": "job-abc123",
      "timeout_ms": 30000,
      "elapsed_ms": 31500
    },
    "request_id": "req-xyz789"
  }
}
```

Common error codes:
- `TIMEOUT` — Job/tool exceeded time limit
- `RESOURCE_LIMIT` — CPU, memory, or disk limit exceeded
- `AGENT_CRASHED` — Worker process terminated unexpectedly
- `NETWORK_ERROR` — Connection or DNS failure
- `VALIDATION_ERROR` — Invalid input or configuration
- `SANDBOX_ERROR` — Sandbox internal error

## Using the APIs

### OpenAPI Clients

Generate client libraries for your language:

**JavaScript/TypeScript:**
```bash
npx openapi-generator-cli generate \
  -i openapi/swarm-sandbox-api.yaml \
  -g typescript-fetch \
  -o ./generated/swarm-client
```

**Python:**
```bash
openapi-generator-cli generate \
  -i openapi/swarm-sandbox-api.yaml \
  -g python-client \
  -o ./generated/swarm_client
```

**Go:**
```bash
openapi-generator-cli generate \
  -i openapi/swarm-sandbox-api.yaml \
  -g go-client \
  -o ./generated/swarm-client
```

### API Documentation

View interactive API documentation:

```bash
# Swagger UI
npm install -g swagger-ui-express
swagger-ui openapi/swarm-sandbox-api.yaml

# ReDoc
npm install -g redoc-cli
redoc-cli serve openapi/swarm-sandbox-api.yaml
```

### Validation

Validate the YAML against OpenAPI 3.1.0 spec:

```bash
# Using openapi-generator
openapi-generator-cli validate -i openapi/swarm-sandbox-api.yaml

# Using spectral (Postman's spec linter)
npm install -g @stoplight/spectral-cli
spectral lint openapi/swarm-sandbox-api.yaml
```

## Notes

- All timestamps are ISO 8601 format (UTC)
- All durations are in milliseconds
- Job IDs are opaque strings; do not parse
- Webhooks support custom headers and retry policies
- Log levels: debug, info, warn, error
- Resource limits: timeout 1s–5min, concurrency per sandbox enforced
