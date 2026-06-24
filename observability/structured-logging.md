# Structured Logging for UitKit

JSON logging schema for observability across UitKit services. All logs must follow this format for consistent ingestion into log aggregators (ELK, Datadog, CloudWatch).

---

## Log Levels

| Level | Use Case | Example |
|-------|----------|---------|
| `DEBUG` | Detailed diagnostic information, variable values, execution flow | Entering skill context, cache lookups, internal state transitions |
| `INFO` | Key business events, successful completions, state changes | Skill invocation started, workflow execution complete, token budget updated |
| `WARN` | Recoverable issues, performance degradation, threshold breaches | Slow API response (>1s), cache miss, skill unavailable but fallback available |
| `ERROR` | Errors requiring investigation, but system continues | Skill timeout after 3 retries, MCP call failed, parsing validation failed |
| `FATAL` | System halted, data loss, or unrecoverable state | Out of memory, database connection lost, cannot load config |

---

## Core Log Fields

Every log entry must include:

```json
{
  "timestamp": "2026-06-22T14:30:45.123Z",
  "level": "INFO",
  "service": "uitkit-api",
  "feature": "skill_execution",
  "user_id": "user_12345",
  "request_id": "req_abcd1234efgh5678",
  "correlation_id": "corr_xyz789",
  "environment": "production",
  "version": "1.2.0"
}
```

### Field Definitions

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `timestamp` | ISO 8601 | yes | UTC timestamp of log event | `"2026-06-22T14:30:45.123Z"` |
| `level` | string | yes | Log level: DEBUG, INFO, WARN, ERROR, FATAL | `"INFO"` |
| `service` | string | yes | Service generating log (api, workflow-engine, skill-engine, gateway) | `"uitkit-api"` |
| `feature` | string | yes | Feature area: skill_execution, dont_stop, svg_inspector, workflow, api, mcp | `"skill_execution"` |
| `user_id` | string | conditional | User ID if applicable; use "anonymous" for CLI | `"user_12345"` |
| `request_id` | string | yes | Unique request ID for tracing this specific request | `"req_abcd1234efgh5678"` |
| `correlation_id` | string | conditional | Trace across multiple services (same value in logs from chained calls) | `"corr_xyz789"` |
| `environment` | string | yes | Deployment environment: production, staging, development | `"production"` |
| `version` | string | yes | Service version | `"1.2.0"` |

---

## Feature-Specific Schemas

### 1. Skill Execution Logs

Log skill invocations, execution, results, and errors.

#### Start Event
```json
{
  "timestamp": "2026-06-22T14:30:45.123Z",
  "level": "INFO",
  "service": "skill-engine",
  "feature": "skill_execution",
  "user_id": "user_12345",
  "request_id": "req_abcd1234efgh5678",
  "correlation_id": "corr_xyz789",
  "environment": "production",
  "version": "1.2.0",
  "event": "skill_started",
  "skill_name": "deep-research",
  "skill_category": "ai-engineering",
  "skill_version": "2.1.0",
  "input_size_bytes": 245,
  "expected_duration_ms": 5000,
  "tags": ["async", "external-api"]
}
```

#### Success Event
```json
{
  "timestamp": "2026-06-22T14:30:52.456Z",
  "level": "INFO",
  "service": "skill-engine",
  "feature": "skill_execution",
  "user_id": "user_12345",
  "request_id": "req_abcd1234efgh5678",
  "correlation_id": "corr_xyz789",
  "environment": "production",
  "version": "1.2.0",
  "event": "skill_completed",
  "skill_name": "deep-research",
  "skill_category": "ai-engineering",
  "status": "success",
  "duration_ms": 7234,
  "output_size_bytes": 8192,
  "cache_hit": false,
  "tokens_used": 3456,
  "metrics": {
    "latency_p50_ms": 7234,
    "external_api_calls": 4,
    "external_api_time_ms": 5120
  }
}
```

#### Error Event
```json
{
  "timestamp": "2026-06-22T14:30:55.789Z",
  "level": "ERROR",
  "service": "skill-engine",
  "feature": "skill_execution",
  "user_id": "user_12345",
  "request_id": "req_abcd1234efgh5678",
  "correlation_id": "corr_xyz789",
  "environment": "production",
  "version": "1.2.0",
  "event": "skill_error",
  "skill_name": "deep-research",
  "skill_category": "ai-engineering",
  "status": "error",
  "duration_ms": 3456,
  "error_code": "SKILL_TIMEOUT",
  "error_message": "Skill execution exceeded 30s timeout",
  "error_type": "timeout",
  "error_stack": "at executeSkill (skill-engine.js:145)\nat processRequest (api.js:89)",
  "retry_count": 2,
  "retry_backoff_ms": 1000,
  "will_retry": true,
  "severity": "high"
}
```

#### Timeout Event (with retry context)
```json
{
  "timestamp": "2026-06-22T14:30:50.123Z",
  "level": "WARN",
  "service": "skill-engine",
  "feature": "skill_execution",
  "user_id": "user_12345",
  "request_id": "req_abcd1234efgh5678",
  "correlation_id": "corr_xyz789",
  "environment": "production",
  "version": "1.2.0",
  "event": "skill_timeout",
  "skill_name": "deep-research",
  "skill_category": "ai-engineering",
  "timeout_ms": 30000,
  "actual_duration_ms": 30015,
  "progress": 0.65,
  "partial_output": true,
  "timeout_type": "hard",
  "retry_attempt": 1,
  "max_retries": 3
}
```

---

### 2. Don't Stop Token Budget Logs

Log token consumption, budget utilization, and budget exhaustion events.

#### Budget Update Event
```json
{
  "timestamp": "2026-06-22T14:35:12.345Z",
  "level": "INFO",
  "service": "token-manager",
  "feature": "dont_stop",
  "user_id": "user_12345",
  "request_id": "req_abcd1234efgh5678",
  "correlation_id": "corr_xyz789",
  "environment": "production",
  "version": "1.2.0",
  "event": "tokens_consumed",
  "model_id": "claude-opus-4-1",
  "tokens_input": 1500,
  "tokens_output": 3200,
  "tokens_total": 4700,
  "budget_period": "hourly",
  "budget_limit_tokens": 1000000,
  "budget_consumed_tokens": 645000,
  "budget_remaining_tokens": 355000,
  "budget_utilization_percent": 64.5,
  "operation_type": "skill_execution",
  "operation_id": "skill_deep-research"
}
```

#### Warning Threshold Event (at 80% utilization)
```json
{
  "timestamp": "2026-06-22T14:45:23.456Z",
  "level": "WARN",
  "service": "token-manager",
  "feature": "dont_stop",
  "user_id": "user_12345",
  "request_id": "req_abcd1234efgh5678",
  "correlation_id": "corr_xyz789",
  "environment": "production",
  "version": "1.2.0",
  "event": "budget_warning",
  "threshold_type": "utilization_percent",
  "threshold_value": 80,
  "budget_period": "hourly",
  "budget_limit_tokens": 1000000,
  "budget_consumed_tokens": 800000,
  "budget_remaining_tokens": 200000,
  "budget_utilization_percent": 80.0,
  "time_remaining_minutes": 15,
  "estimated_exhaustion_time": "2026-06-22T15:00:00Z",
  "action_recommended": "throttle_non_critical_operations"
}
```

#### Critical Threshold Event (at 95% utilization)
```json
{
  "timestamp": "2026-06-22T14:50:34.567Z",
  "level": "ERROR",
  "service": "token-manager",
  "feature": "dont_stop",
  "user_id": "user_12345",
  "request_id": "req_abcd1234efgh5678",
  "correlation_id": "corr_xyz789",
  "environment": "production",
  "version": "1.2.0",
  "event": "budget_critical",
  "threshold_type": "utilization_percent",
  "threshold_value": 95,
  "budget_period": "hourly",
  "budget_limit_tokens": 1000000,
  "budget_consumed_tokens": 950000,
  "budget_remaining_tokens": 50000,
  "budget_utilization_percent": 95.0,
  "time_remaining_minutes": 10,
  "estimated_exhaustion_time": "2026-06-22T14:55:00Z",
  "action_taken": "reject_new_requests",
  "rejected_request_id": "req_new9999",
  "error_code": "BUDGET_EXCEEDED"
}
```

#### Budget Exhaustion Event
```json
{
  "timestamp": "2026-06-22T14:55:00.789Z",
  "level": "FATAL",
  "service": "token-manager",
  "feature": "dont_stop",
  "user_id": "user_12345",
  "request_id": "req_abcd1234efgh5678",
  "correlation_id": "corr_xyz789",
  "environment": "production",
  "version": "1.2.0",
  "event": "budget_exhausted",
  "budget_period": "hourly",
  "budget_limit_tokens": 1000000,
  "budget_consumed_tokens": 1000000,
  "budget_utilization_percent": 100.0,
  "total_duration_minutes": 60,
  "in_period_since": "2026-06-22T13:55:00Z",
  "waiting_for_reset": true,
  "reset_time": "2026-06-22T15:55:00Z",
  "minutes_until_reset": 60,
  "rejected_request_id": "req_pending5555",
  "queued_requests": 23
}
```

#### Budget Reset Event
```json
{
  "timestamp": "2026-06-22T15:55:00.000Z",
  "level": "INFO",
  "service": "token-manager",
  "feature": "dont_stop",
  "user_id": "user_12345",
  "request_id": "req_reset0001",
  "correlation_id": "corr_xyz789",
  "environment": "production",
  "version": "1.2.0",
  "event": "budget_reset",
  "budget_period": "hourly",
  "budget_limit_tokens": 1000000,
  "previous_consumed_tokens": 1000000,
  "current_consumed_tokens": 0,
  "previous_budget_utilization_percent": 100.0,
  "current_budget_utilization_percent": 0.0,
  "pending_requests_processed": 23,
  "period_start": "2026-06-22T15:55:00Z",
  "period_end": "2026-06-22T16:55:00Z"
}
```

---

### 3. SVG Inspector Rendering Logs

Log SVG rendering operations, performance metrics, and errors.

#### Rendering Start Event
```json
{
  "timestamp": "2026-06-22T14:32:10.234Z",
  "level": "DEBUG",
  "service": "svg-inspector",
  "feature": "svg_inspector",
  "user_id": "user_12345",
  "request_id": "req_abcd1234efgh5678",
  "correlation_id": "corr_xyz789",
  "environment": "production",
  "version": "1.2.0",
  "event": "render_started",
  "svg_id": "svg_audit_report_001",
  "svg_size_bytes": 1245000,
  "svg_elements": 15000,
  "svg_complexity": "high",
  "rendering_mode": "batch",
  "output_format": "png",
  "target_width_px": 1920,
  "target_height_px": 1080,
  "quality_setting": "high"
}
```

#### Rendering Success Event
```json
{
  "timestamp": "2026-06-22T14:32:15.890Z",
  "level": "INFO",
  "service": "svg-inspector",
  "feature": "svg_inspector",
  "user_id": "user_12345",
  "request_id": "req_abcd1234efgh5678",
  "correlation_id": "corr_xyz789",
  "environment": "production",
  "version": "1.2.0",
  "event": "render_completed",
  "svg_id": "svg_audit_report_001",
  "status": "success",
  "duration_ms": 5656,
  "duration_category": "normal",
  "rendering_mode": "batch",
  "output_format": "png",
  "output_size_bytes": 245000,
  "compression_ratio": 0.197,
  "quality_setting": "high",
  "color_space": "srgb",
  "dpi": 96,
  "memory_peak_mb": 245,
  "memory_avg_mb": 180,
  "cache_used": false,
  "optimization_applied": ["minify_paths", "remove_redundant_styles"],
  "metrics": {
    "layout_time_ms": 1200,
    "render_time_ms": 3890,
    "export_time_ms": 566,
    "optimization_time_ms": 200
  }
}
```

#### Rendering Slow Event (warning threshold: 10s)
```json
{
  "timestamp": "2026-06-22T14:33:20.123Z",
  "level": "WARN",
  "service": "svg-inspector",
  "feature": "svg_inspector",
  "user_id": "user_12345",
  "request_id": "req_abcd1234efgh5678",
  "correlation_id": "corr_xyz789",
  "environment": "production",
  "version": "1.2.0",
  "event": "render_slow",
  "svg_id": "svg_complex_chart_042",
  "duration_ms": 12345,
  "duration_category": "slow",
  "threshold_ms": 10000,
  "exceeds_threshold_ms": 2345,
  "exceeds_threshold_percent": 23.4,
  "svg_size_bytes": 5000000,
  "svg_elements": 45000,
  "svg_complexity": "very_high",
  "rendering_mode": "streaming",
  "output_format": "png",
  "memory_peak_mb": 512,
  "memory_avg_mb": 450,
  "color_space": "rgba",
  "probable_cause": "high_element_count",
  "recommendations": [
    "optimize_svg_structure",
    "reduce_element_count",
    "use_simpler_filters"
  ],
  "metrics": {
    "layout_time_ms": 4500,
    "render_time_ms": 7200,
    "export_time_ms": 645
  }
}
```

#### Rendering Critical Event (error threshold: >30s)
```json
{
  "timestamp": "2026-06-22T14:34:45.456Z",
  "level": "ERROR",
  "service": "svg-inspector",
  "feature": "svg_inspector",
  "user_id": "user_12345",
  "request_id": "req_abcd1234efgh5678",
  "correlation_id": "corr_xyz789",
  "environment": "production",
  "version": "1.2.0",
  "event": "render_critical",
  "svg_id": "svg_pathological_case_999",
  "duration_ms": 35000,
  "duration_category": "critical",
  "threshold_ms": 30000,
  "exceeds_threshold_ms": 5000,
  "exceeds_threshold_percent": 16.7,
  "svg_size_bytes": 50000000,
  "svg_elements": 500000,
  "svg_complexity": "pathological",
  "rendering_mode": "batch",
  "memory_peak_mb": 2048,
  "memory_avg_mb": 1800,
  "killed_by_timeout": false,
  "status": "success_but_slow",
  "probable_cause": "massive_element_count",
  "recommendations": [
    "split_svg_into_layers",
    "render_in_streaming_mode",
    "pre_optimize_svg"
  ],
  "metrics": {
    "layout_time_ms": 15000,
    "render_time_ms": 18000,
    "export_time_ms": 2000
  }
}
```

#### Rendering Error Event
```json
{
  "timestamp": "2026-06-22T14:35:10.789Z",
  "level": "ERROR",
  "service": "svg-inspector",
  "feature": "svg_inspector",
  "user_id": "user_12345",
  "request_id": "req_abcd1234efgh5678",
  "correlation_id": "corr_xyz789",
  "environment": "production",
  "version": "1.2.0",
  "event": "render_error",
  "svg_id": "svg_malformed_005",
  "status": "error",
  "duration_ms": 245,
  "error_code": "INVALID_SVG",
  "error_message": "Missing required 'viewBox' attribute",
  "error_type": "validation",
  "error_context": {
    "line": 12,
    "column": 5,
    "element": "svg",
    "attribute": "viewBox"
  },
  "svg_size_bytes": 125000,
  "rendering_mode": "batch",
  "output_format": "png",
  "will_retry": false,
  "user_action_required": true,
  "error_code_docs": "https://docs.example.com/svg-errors/invalid-svg"
}
```

#### Rendering Timeout Event
```json
{
  "timestamp": "2026-06-22T14:36:20.012Z",
  "level": "ERROR",
  "service": "svg-inspector",
  "feature": "svg_inspector",
  "user_id": "user_12345",
  "request_id": "req_abcd1234efgh5678",
  "correlation_id": "corr_xyz789",
  "environment": "production",
  "version": "1.2.0",
  "event": "render_timeout",
  "svg_id": "svg_hanging_process_888",
  "timeout_ms": 60000,
  "actual_duration_ms": 60001,
  "status": "timeout",
  "rendering_mode": "batch",
  "svg_size_bytes": 100000000,
  "svg_elements": 1000000,
  "svg_complexity": "pathological",
  "progress_percent": 45,
  "partial_output": false,
  "memory_peak_mb": 4096,
  "memory_limit_mb": 4096,
  "probable_cause": "infinite_loop_in_rendering",
  "killed_by_memory_limit": false,
  "killed_by_timeout": true,
  "will_retry": false,
  "fallback_action": "return_placeholder",
  "error_code": "RENDER_TIMEOUT"
}
```

---

## Common Error Codes

### Skill Execution
| Code | Message | Retry | Action |
|------|---------|-------|--------|
| `SKILL_NOT_FOUND` | Skill does not exist | No | Log, return 404 |
| `SKILL_TIMEOUT` | Execution exceeded timeout | Yes | Retry with backoff |
| `SKILL_VALIDATION_FAILED` | Input validation failed | No | Return validation error |
| `SKILL_PERMISSION_DENIED` | User lacks permission | No | Return 403 |
| `SKILL_EXTERNAL_API_ERROR` | External dependency failed | Yes | Retry with backoff |
| `SKILL_OUT_OF_MEMORY` | Memory allocation failed | No | Return 507 |

### Don't Stop
| Code | Message | Retry | Action |
|------|---------|-------|--------|
| `BUDGET_EXCEEDED` | Token budget exhausted | No | Queue for next period |
| `BUDGET_WARNING` | Budget utilization threshold | No | Log warning, continue |
| `MODEL_NOT_FOUND` | Model ID unrecognized | No | Log, return error |
| `TOKEN_COUNT_MISMATCH` | Counted tokens != actual | No | Log discrepancy, investigate |

### SVG Inspector
| Code | Message | Retry | Action |
|------|---------|-------|--------|
| `INVALID_SVG` | SVG schema violation | No | Return validation error |
| `UNSUPPORTED_FEATURE` | SVG feature not supported | No | Log, return error |
| `RENDER_TIMEOUT` | Rendering exceeded timeout | No | Return placeholder |
| `RENDER_OOM` | Out of memory during render | No | Return placeholder |
| `FILE_NOT_FOUND` | SVG file missing | No | Return 404 |
| `FILE_TOO_LARGE` | SVG exceeds size limit | No | Return 413 |

---

## Correlation & Tracing

Use `correlation_id` to link logs across the entire request lifecycle:

```
[API Request] → correlation_id: corr_xyz789
  ↓
[Skill Execution] → correlation_id: corr_xyz789
  ↓
[Token Budget Check] → correlation_id: corr_xyz789
  ↓
[SVG Rendering] → correlation_id: corr_xyz789
  ↓
[Log Aggregator] displays all 4 log entries under one trace
```

When spawning child requests (e.g., skill calls MCP server), propagate `correlation_id` to maintain trace continuity.

---

## Ingestion & Query Examples

### Elasticsearch/ELK
```json
{
  "query": {
    "bool": {
      "must": [
        { "match": { "feature": "skill_execution" } },
        { "match": { "status": "error" } },
        { "range": { "timestamp": { "gte": "now-1h" } } }
      ]
    }
  }
}
```

### Datadog
```
@feature:skill_execution @status:error @duration_ms:>10000 -@retry_count:0
```

### CloudWatch Insights
```
fields @timestamp, @message, error_code, duration_ms, user_id
| filter feature = "dont_stop" and @message like /budget/
| stats count() as error_count by error_code
```

---

## Performance Targets

| Feature | Metric | Target | Warning | Critical |
|---------|--------|--------|---------|----------|
| Skill Execution | Duration | <5s | >5s | >30s |
| Skill Execution | Error Rate | <1% | >1% | >5% |
| Don't Stop | Budget Utilization | <50% | >80% | >95% |
| SVG Inspector | Render Time | <5s | >10s | >30s |
| SVG Inspector | Memory Usage | <500MB | >1GB | >2GB |

---

## Best Practices

1. **Always include `request_id`** — enables request tracing.
2. **Use `correlation_id` for cross-service calls** — links distributed traces.
3. **Log at decision points** — before/after retries, threshold checks, state transitions.
4. **Include context in errors** — error_code, error_message, stack trace, retry info.
5. **Sanitize sensitive data** — never log passwords, API keys, or personal data.
6. **Use millisecond precision** — `duration_ms` not `duration_s`.
7. **Structured fields, not strings** — use JSON objects, not formatted text.
8. **Keep log size <2KB** — avoid bloat, trim unnecessary context.
