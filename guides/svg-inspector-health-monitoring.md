# SVG Inspector Health Monitoring Integration Guide

**Document Version:** 1.0  
**Updated:** 2026-06-22

---

## Quick Start

### 1. Add to Express Server

```javascript
const express = require('express');
const healthCheck = require('../middleware/svg-inspector-health-check');

const app = express();

// Add health check middleware and routes
app.use(healthCheck.middleware);
app.use('/health-check', healthCheck.routes());

// Your other routes...
app.listen(8080, () => {
  console.log('Server running with health checks on port 8080');
});
```

### 2. Test Endpoints

```bash
# Quick health check
curl http://localhost:8080/health-check/health

# Readiness check
curl http://localhost:8080/health-check/ready

# Full status
curl http://localhost:8080/health-check/status

# Performance metrics
curl http://localhost:8080/health-check/metrics/rendering?nodes=10000
curl http://localhost:8080/health-check/metrics/memory?scale=100k
```

---

## Monitoring Setup

### Kubernetes Configuration

Add to your `deployment.yaml`:

```yaml
spec:
  containers:
    - name: svg-inspector
      image: svg-inspector:latest
      ports:
        - containerPort: 8080
      
      # Liveness probe: container alive?
      livenessProbe:
        httpGet:
          path: /health-check/health
          port: 8080
        initialDelaySeconds: 10
        periodSeconds: 10
        timeoutSeconds: 5
        failureThreshold: 3
      
      # Readiness probe: ready to accept traffic?
      readinessProbe:
        httpGet:
          path: /health-check/ready
          port: 8080
        initialDelaySeconds: 5
        periodSeconds: 5
        timeoutSeconds: 3
        failureThreshold: 2

      # Resource requests/limits
      resources:
        requests:
          cpu: 100m
          memory: 128Mi
        limits:
          cpu: 500m
          memory: 512Mi
```

### Docker Compose Configuration

```yaml
version: '3.8'
services:
  svg-inspector:
    image: svg-inspector:latest
    ports:
      - "8080:8080"
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health-check/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

### Prometheus Configuration

Add to `prometheus.yml`:

```yaml
scrape_configs:
  - job_name: 'svg-inspector'
    static_configs:
      - targets: ['localhost:8080']
    metrics_path: '/health-check/metrics/prometheus'
    scrape_interval: 15s
    scrape_timeout: 10s
```

### Grafana Dashboard

Create a dashboard with these queries:

```
# Request rate (5-min average)
rate(svg_inspector_request_total[5m])

# Error rate
rate(svg_inspector_request_total{status="error"}[5m]) / rate(svg_inspector_request_total[5m])

# Latency p99
svg_inspector_request_latency_ms{quantile="0.99"}

# Memory usage
svg_inspector_memory_heap_mb

# Rendering performance
svg_inspector_render_time_10k_ms
```

---

## Alert Configuration

### AlertManager Rules

Create `alerts.yml`:

```yaml
groups:
  - name: svg_inspector
    interval: 30s
    rules:
      # Critical alerts
      - alert: SVGInspectorDown
        expr: up{job="svg-inspector"} == 0
        for: 2m
        annotations:
          summary: "SVG Inspector is down"
          severity: critical
      
      - alert: HighErrorRate
        expr: |
          (rate(svg_inspector_request_total{status="error"}[5m]) / 
           rate(svg_inspector_request_total[5m])) > 0.005
        for: 5m
        annotations:
          summary: "Error rate exceeds 0.5%"
          severity: warning
      
      # Performance alerts
      - alert: SlowRendering
        expr: svg_inspector_render_time_10k_ms > 25
        for: 10m
        annotations:
          summary: "10K node rendering > 25ms"
          severity: warning
      
      - alert: HighMemory
        expr: svg_inspector_memory_heap_mb > 200
        for: 5m
        annotations:
          summary: "Heap memory > 200MB"
          severity: warning
      
      # Availability alerts
      - alert: LowUptime
        expr: svg_inspector_uptime_seconds < 600
        for: 5m
        annotations:
          summary: "Service uptime < 10 minutes"
          severity: warning
```

---

## Health Check Scripts

### Bash Health Monitor

```bash
#!/bin/bash
# monitor.sh

HOST="${1:-localhost}"
PORT="${2:-8080}"
CHECK_INTERVAL="${3:-30}"

while true; do
  echo "=== SVG Inspector Health Check ==="
  echo "Timestamp: $(date)"
  
  # Health check
  HEALTH=$(curl -s "http://$HOST:$PORT/health-check/health")
  STATUS=$(echo $HEALTH | jq -r '.status')
  echo "✓ Health: $STATUS"
  
  # Readiness check
  READY=$(curl -s "http://$HOST:$PORT/health-check/ready")
  READY_STATE=$(echo $READY | jq -r '.ready')
  echo "✓ Ready: $READY_STATE"
  
  # Memory
  MEM=$(curl -s "http://$HOST:$PORT/health-check/metrics/memory?scale=100k")
  HEAP=$(echo $MEM | jq -r '.memory.heap_used_mb')
  echo "✓ Memory: ${HEAP}MB"
  
  # Uptime
  STATUS_FULL=$(curl -s "http://$HOST:$PORT/health-check/status")
  UPTIME=$(echo $STATUS_FULL | jq -r '.service.uptime_seconds')
  echo "✓ Uptime: ${UPTIME}s"
  
  # Error rate
  ERRORS=$(curl -s "http://$HOST:$PORT/health-check/metrics/errors?time_window=3600")
  ERROR_RATE=$(echo $ERRORS | jq -r '.error_metrics.error_rate')
  echo "✓ Error Rate: ${ERROR_RATE} (target: 0.005)"
  
  echo ""
  sleep "$CHECK_INTERVAL"
done
```

Run it:
```bash
chmod +x monitor.sh
./monitor.sh localhost 8080 30  # Check every 30 seconds
```

### Performance Baseline Collection

```bash
#!/bin/bash
# collect-baseline.sh

HOST="${1:-localhost}"
PORT="${2:-8080}"
OUTPUT="baseline-$(date +%s).json"

echo "Collecting baseline metrics..."

# Render performance across scales
echo '{"benchmarks": [' > "$OUTPUT"

for NODES in 1000 10000 100000; do
  METRIC=$(curl -s "http://$HOST:$PORT/health-check/metrics/rendering?nodes=$NODES&runs=5")
  echo "$METRIC," >> "$OUTPUT"
done

# Memory at scales
for SCALE in 1k 10k 100k; do
  METRIC=$(curl -s "http://$HOST:$PORT/health-check/metrics/memory?scale=$SCALE")
  echo "$METRIC," >> "$OUTPUT"
done

# Uptime
METRIC=$(curl -s "http://$HOST:$PORT/health-check/metrics/uptime?days=7")
echo "$METRIC" >> "$OUTPUT"

echo ']}' >> "$OUTPUT"

echo "Baseline saved to: $OUTPUT"
```

---

## Interpreting Results

### Health Status

| Status | Meaning | Action |
|--------|---------|--------|
| `healthy` | Service running normally | None |
| `unhealthy` | Service degraded or down | Investigate errors; check logs |

### Ready Status

| Status | Meaning | Action |
|--------|---------|--------|
| `true` | Ready for requests | Normal operation |
| `false` | Not accepting traffic | Wait or restart |

### SLO Status

| Status | Meaning | Action |
|--------|---------|--------|
| `pass` | Meeting SLO targets | Continue monitoring |
| `fail` | Violating SLO targets | Scale up; investigate bottleneck |
| `at_risk` | Close to SLO breach | Investigate trend; prepare scaling |

### Performance Interpretation

**Rendering Performance:**
- 1K nodes: < 1.0ms = excellent
- 10K nodes: < 10.0ms = good
- 100K nodes: < 150.0ms = acceptable

**Pan/Zoom:**
- Any scale: < 1.0μs = real-time

**Memory:**
- Heap < 50% = excellent
- Heap 50-80% = good
- Heap > 90% = risky (readiness fails)

**Click Detection:**
- < 0.01ms = sub-millisecond = excellent

**Error Rate:**
- < 0.1% = excellent
- 0.1-0.5% = acceptable
- > 0.5% = alert

---

## Troubleshooting

### Service Down

```bash
# Check if service is responding
curl -v http://localhost:8080/health-check/health

# Check server logs
docker logs svg-inspector

# Check memory
curl http://localhost:8080/health-check/metrics/memory?scale=100k | jq '.memory'

# Check error rate
curl http://localhost:8080/health-check/metrics/errors | jq '.error_metrics'
```

### Slow Rendering

```bash
# Check rendering performance
curl http://localhost:8080/health-check/metrics/rendering?nodes=10000&runs=10

# Check if close to memory limit
curl http://localhost:8080/health-check/metrics/memory?scale=100k | jq '.slo'

# Monitor uptime (recent restart?)
curl http://localhost:8080/health-check/status | jq '.service.uptime_seconds'
```

### High Memory Usage

```bash
# Get detailed memory breakdown
curl http://localhost:8080/health-check/metrics/memory?scale=100k

# Check if garbage collection is needed
curl http://localhost:8080/health-check/status | jq '.memory.gc_count'

# Force scaling down or restart if > 90% heap used
curl http://localhost:8080/health-check/ready | jq '.memory_percent'
```

### High Error Rate

```bash
# Get error breakdown
curl http://localhost:8080/health-check/metrics/errors?time_window=3600

# Get full status for comparison
curl http://localhost:8080/health-check/status | jq '.requests'

# Check server logs for specific error messages
docker logs svg-inspector | tail -50 | grep -i error
```

---

## Integration Testing

### Unit Tests

```javascript
const healthCheck = require('../middleware/svg-inspector-health-check');

describe('SVG Inspector Health Check', () => {
  beforeEach(() => {
    healthCheck.resetState();
  });

  it('should track request metrics', () => {
    healthCheck.recordRequest(200, 5.2, '/test');
    const state = healthCheck.getState();
    
    expect(state.requestMetrics.total).toBe(1);
    expect(state.requestMetrics.success).toBe(1);
    expect(state.requestMetrics.latencies).toContain(5.2);
  });

  it('should calculate stats correctly', () => {
    const values = [1, 2, 3, 4, 5];
    const stats = healthCheck.calculateStats(values);
    
    expect(stats.mean).toBe(3);
    expect(stats.median).toBe(3);
    expect(stats.min).toBe(1);
    expect(stats.max).toBe(5);
  });

  it('should get memory stats', () => {
    const mem = healthCheck.getMemoryStats();
    
    expect(mem).toHaveProperty('heap_used_mb');
    expect(mem).toHaveProperty('heap_total_mb');
    expect(mem).toHaveProperty('rss_mb');
  });
});
```

### Integration Tests

```javascript
const request = require('supertest');
const express = require('express');
const healthCheck = require('../middleware/svg-inspector-health-check');

describe('SVG Inspector Health Endpoints', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(healthCheck.middleware);
    app.use('/health-check', healthCheck.routes());
  });

  it('GET /health should return healthy status', async () => {
    const res = await request(app).get('/health-check/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('healthy');
  });

  it('GET /ready should return ready state', async () => {
    const res = await request(app).get('/health-check/ready');
    expect(res.status).toBe(200);
    expect(res.body.ready).toBe(true);
  });

  it('GET /status should include performance metrics', async () => {
    const res = await request(app).get('/health-check/status');
    expect(res.status).toBe(200);
    expect(res.body.performance).toBeDefined();
    expect(res.body.requests).toBeDefined();
  });

  it('GET /metrics/rendering should return benchmark results', async () => {
    const res = await request(app)
      .get('/health-check/metrics/rendering?nodes=10000&runs=5');
    expect(res.status).toBe(200);
    expect(res.body.benchmark).toBe('rendering');
    expect(res.body.slo.status).toBe('pass');
  });
});
```

---

## Production Deployment Checklist

- [ ] Health check middleware integrated into server
- [ ] All 9 endpoints implemented and tested
- [ ] Kubernetes probes configured (liveness + readiness)
- [ ] Prometheus metrics enabled for scraping
- [ ] Grafana dashboards created
- [ ] Alert rules configured in AlertManager
- [ ] Runbooks created for common alerts
- [ ] Health check baseline established
- [ ] Monitoring and alerting tested
- [ ] Documentation updated for ops team

---

## Related Documentation

- **Endpoints Reference:** `/health-check-endpoints.md`
- **Middleware Code:** `/middleware/svg-inspector-health-check.js`
- **Performance Report:** `/benchmarks/SVG_INSPECTOR_PERFORMANCE_REPORT.md`
- **CLI Tool:** `/scripts/uitkit-svg-inspector.js`

