# Synthetic Uptime Monitoring

End-to-end synthetic monitoring for UitKit feature health. Automated probes execute every 5 minutes across distributed locations to detect degradation before user-facing impact.

---

## Overview

Synthetic monitoring supplements metrics and logs by executing real feature workflows from external vantage points. This catches:
- Network path failures (regional outages)
- Cold-start degradation
- API contract breaks
- Full critical path failures

| Probe Interval | 5 minutes (300s) |
|---|---|
| Alert latency | < 10 minutes to detect critical path failure |
| Minimum uptime SLO | 99.5% (22 minutes/month maximum downtime) |
| Scope | Core features: skill activation, agent execution, translation, plugin discovery |

---

## Probe Locations & Networks

Deploy probes across these regions for geographic redundancy:

### US - East Coast (us-east-1)
- **Endpoint**: `probe-us-east.uitkit.io:8443`
- **Region**: N. Virginia
- **Latency target**: < 100ms to primary API
- **DNS**: Amazon Route 53 (primary)
- **Network**: AWS us-east-1 public subnet
- **Health check**: TCP 8443 + HTTPS handshake
- **Fallback probe**: `backup-probe-us-east.uitkit.io`

### US - West Coast (us-west-2)
- **Endpoint**: `probe-us-west.uitkit.io:8443`
- **Region**: Oregon
- **Latency target**: < 80ms to primary API
- **DNS**: CloudFlare (secondary)
- **Network**: AWS us-west-2 public subnet
- **Health check**: TCP 8443 + certificate validation
- **Fallback probe**: `backup-probe-us-west.uitkit.io`

### Europe - Frankfurt (eu-central-1)
- **Endpoint**: `probe-eu-central.uitkit.io:8443`
- **Region**: Frankfurt, Germany
- **Latency target**: < 150ms to primary API
- **DNS**: Route 53 (secondary)
- **Network**: AWS eu-central-1 public subnet
- **Health check**: TCP 8443 + TLS validation
- **Fallback probe**: `backup-probe-eu-central.uitkit.io`

### APAC - Singapore (ap-southeast-1)
- **Endpoint**: `probe-ap-sg.uitkit.io:8443`
- **Region**: Singapore
- **Latency target**: < 180ms to primary API
- **DNS**: CloudFlare Asia (primary)
- **Network**: AWS ap-southeast-1 public subnet
- **Health check**: TCP 8443 + response time measurement
- **Fallback probe**: `backup-probe-ap-sg.uitkit.io`

---

## Test Scenarios

Each probe executes the following scenarios in sequence every 5 minutes:

### 1. Skill Discovery & Activation (30s timeout)

**Scenario**: Verify skill registry is accessible and skill metadata loads.

```
1. GET /api/v1/skills (fetch all skill definitions)
   - Expected: 200 OK, JSON array
   - SLA: < 500ms
   - Failure: Mark as CRITICAL

2. GET /api/v1/skills/{skillId}/definition (fetch single skill)
   - Expected: 200 OK, complete metadata
   - SLA: < 300ms
   - Failure: Mark as WARNING (partial failure)

3. POST /api/v1/skills/{skillId}/execute (cold-start execution)
   - Expected: 202 Accepted (async)
   - SLA: < 1000ms
   - Failure: Mark as CRITICAL
```

**Success criteria**: All 3 requests succeed within SLA.  
**Failure action**: Page on-call (CRITICAL) or create ticket (WARNING).

---

### 2. Agent Instantiation & Dispatch (45s timeout)

**Scenario**: Validate agent spawning and message routing.

```
1. GET /api/v1/agents (list all agents)
   - Expected: 200 OK, JSON array with agent definitions
   - SLA: < 400ms
   - Failure: Mark as CRITICAL

2. POST /api/v1/agents/{agentId}/spawn (create agent instance)
   - Expected: 201 Created with instance ID
   - SLA: < 2000ms
   - Failure: Mark as CRITICAL

3. POST /api/v1/agents/{instanceId}/message
   - Body: {"prompt": "list files in current directory", "timeout": 30}
   - Expected: 200 OK with agent response (streaming complete)
   - SLA: < 5000ms (includes execution time)
   - Failure: Mark as CRITICAL
```

**Success criteria**: Agent instantiation + message delivery + response < 5s.  
**Failure action**: Page on-call immediately.

---

### 3. Workflow Translation Pipeline (60s timeout)

**Scenario**: End-to-end workflow parsing, translation, and optimization.

```
1. POST /api/v1/workflows/translate
   - Body: { "source": "workflow.md", "targetLanguages": ["fr", "de", "es"] }
   - Expected: 200 OK with translations
   - SLA: < 8000ms
   - Failure: Mark as WARNING (non-critical path)

2. Validate response:
   - All 4 target languages present (en, fr, de, es)
   - Each translation valid JSON/YAML
   - File size within expected range (±20% of original)
   - No missing keys from original
   - SLA: < 500ms (parsing validation)
```

**Success criteria**: Translation completes in < 8s with all languages.  
**Failure action**: Create ticket (non-urgent workflow failure).

---

### 4. Plugin Discovery & Registry (30s timeout)

**Scenario**: Verify plugin marketplace is accessible and plugin metadata loads.

```
1. GET /api/v1/plugins/marketplace (fetch plugin catalog)
   - Expected: 200 OK with plugin list
   - SLA: < 800ms
   - Failure: Mark as WARNING

2. Validate response:
   - Minimum 5 plugins listed
   - Each plugin has: id, name, version, description, tags
   - Valid JSON schema
   - Registry file size > 50KB (populated)

3. GET /api/v1/plugins/{pluginId}/manifest (fetch single plugin manifest)
   - Expected: 200 OK with complete plugin metadata
   - SLA: < 400ms
   - Failure: Mark as WARNING
```

**Success criteria**: Marketplace accessible with >= 5 valid plugins.  
**Failure action**: Create ticket (marketplace offline).

---

### 5. Critical Path: E2E Feature Execution (90s timeout)

**Scenario**: Full end-to-end test spanning skill → agent → result.

```
1. Spawn agent:
   POST /api/v1/agents/general/spawn
   - Expected: 201 Created

2. Execute skill through agent:
   POST /api/v1/agents/{instanceId}/message
   - Body: {"prompt": "use the /code-review skill with --effort=low on ./sample.js"}
   - Expected: Agent executes skill, returns structured result
   - SLA: < 15000ms (agent execution + skill processing)
   - Failure: Mark as CRITICAL

3. Validate result:
   - Response contains structured findings (array of issues)
   - Each finding has: line, severity, description
   - Result size > 500 bytes (non-empty analysis)

4. Cleanup:
   DELETE /api/v1/agents/{instanceId}
   - Expected: 204 No Content
```

**Success criteria**: Full pipeline executes in < 15s with valid findings.  
**Failure action**: Page on-call (CRITICAL - core feature unavailable).

---

## Degradation Detection

Probes measure response time and error rate to trigger alerts:

### Latency-based Degradation

| Metric | Threshold | Severity | Action |
|---|---|---|---|
| Skill discovery > 1s | 2 consecutive failures | WARNING | Create ticket |
| Skill discovery > 2s | 3 consecutive failures | CRITICAL | Page on-call |
| Agent spawn > 3s | 2 consecutive failures | WARNING | Create ticket |
| Agent spawn > 5s | 2 consecutive failures | CRITICAL | Page on-call |
| E2E path > 20s | 2 consecutive failures | WARNING | Create ticket |
| E2E path > 30s | 2 consecutive failures | CRITICAL | Page on-call |

### Error Rate Degradation

| Component | Error Rate Threshold | Severity | Action |
|---|---|---|---|
| Skill API | > 5% (≥1 of 20 failures) | WARNING | Create ticket |
| Agent API | > 5% (≥1 of 20 failures) | CRITICAL | Page on-call |
| Translation API | > 10% (≥2 of 20 failures) | WARNING | Create ticket |
| Plugin registry | > 10% (≥2 of 20 failures) | WARNING | Create ticket |
| E2E path | > 3% (≥1 of 33 failures) | CRITICAL | Page on-call |

### Regional Outage Detection

If a single probe location fails all 5 scenarios (0% success rate) for 2+ consecutive intervals (10 minutes):
- **Severity**: WARNING (unless primary region)
- **Action**: Create ticket + notify #alerts
- **Escalation**: If primary region (us-east-1) fails, escalate to CRITICAL

If 2+ probe locations fail simultaneously:
- **Severity**: CRITICAL (likely upstream outage)
- **Action**: Page on-call immediately

---

## Probe Implementation

### Probe Agent Configuration

Each probe runs as a containerized agent with the following spec:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: syntheric-probe-us-east
  namespace: observability
  labels:
    app: synthetic-probe
    region: us-east-1
spec:
  containers:
  - name: probe
    image: uitkit/synthetic-probe:latest
    env:
    - name: PROBE_LOCATION
      value: "us-east-1"
    - name: TARGET_ENDPOINT
      value: "https://api.uitkit.io"
    - name: PROBE_INTERVAL_SECONDS
      value: "300"
    - name: ALERT_WEBHOOK
      value: "${PROMETHEUS_WEBHOOK_URL}"
    - name: LOG_LEVEL
      value: "info"
    resources:
      requests:
        cpu: 100m
        memory: 128Mi
      limits:
        cpu: 500m
        memory: 512Mi
    livenessProbe:
      httpGet:
        path: /health
        port: 8080
      initialDelaySeconds: 30
      periodSeconds: 60
  restartPolicy: Always
  nodeSelector:
    region: us-east-1
```

### Probe Script (Python)

```python
#!/usr/bin/env python3
"""
Synthetic uptime probe for UitKit.
Runs every 5 minutes to detect feature degradation.
"""

import time
import json
import logging
import sys
from typing import Dict, Tuple
import requests
from datetime import datetime
import os

logging.basicConfig(
    level=os.getenv("LOG_LEVEL", "info").upper(),
    format="%(asctime)s [%(levelname)s] %(message)s"
)
logger = logging.getLogger(__name__)

class SyntheticProbe:
    def __init__(self, target_endpoint: str, location: str):
        self.endpoint = target_endpoint
        self.location = location
        self.results = {}
        self.session = requests.Session()
        self.session.timeout = 30
        
    def probe_skill_discovery(self) -> Tuple[bool, float]:
        """Test skill discovery API (30s timeout)."""
        start = time.time()
        try:
            r = self.session.get(f"{self.endpoint}/api/v1/skills", timeout=5)
            elapsed = time.time() - start
            
            if r.status_code != 200:
                logger.warning(f"Skill discovery returned {r.status_code}")
                return False, elapsed
            
            data = r.json()
            if not isinstance(data, list) or len(data) == 0:
                logger.warning("Skill discovery returned empty list")
                return False, elapsed
            
            # Fetch a single skill definition
            skill_id = data[0].get("id")
            r2 = self.session.get(
                f"{self.endpoint}/api/v1/skills/{skill_id}/definition",
                timeout=2
            )
            elapsed_single = time.time() - start
            
            if r2.status_code != 200:
                logger.warning(f"Single skill fetch returned {r2.status_code}")
                return False, elapsed_single
            
            return True, elapsed
        except Exception as e:
            elapsed = time.time() - start
            logger.error(f"Skill discovery exception: {e}")
            return False, elapsed
    
    def probe_agent_instantiation(self) -> Tuple[bool, float]:
        """Test agent spawn and message delivery (45s timeout)."""
        start = time.time()
        try:
            # Spawn agent
            r = self.session.post(
                f"{self.endpoint}/api/v1/agents/general/spawn",
                json={"context": "synthetic-probe"},
                timeout=3
            )
            
            if r.status_code != 201:
                logger.warning(f"Agent spawn returned {r.status_code}")
                return False, time.time() - start
            
            instance_id = r.json().get("instance_id")
            if not instance_id:
                logger.warning("Agent spawn response missing instance_id")
                return False, time.time() - start
            
            # Send message to agent
            r2 = self.session.post(
                f"{self.endpoint}/api/v1/agents/{instance_id}/message",
                json={"prompt": "list files in current directory", "timeout": 5},
                timeout=10
            )
            
            elapsed = time.time() - start
            
            if r2.status_code != 200:
                logger.warning(f"Agent message returned {r2.status_code}")
                return False, elapsed
            
            return True, elapsed
        except Exception as e:
            elapsed = time.time() - start
            logger.error(f"Agent instantiation exception: {e}")
            return False, elapsed
    
    def probe_translation_pipeline(self) -> Tuple[bool, float]:
        """Test workflow translation (60s timeout)."""
        start = time.time()
        try:
            payload = {
                "source": "test workflow",
                "targetLanguages": ["fr", "de", "es"]
            }
            
            r = self.session.post(
                f"{self.endpoint}/api/v1/workflows/translate",
                json=payload,
                timeout=10
            )
            
            elapsed = time.time() - start
            
            if r.status_code != 200:
                logger.warning(f"Translation returned {r.status_code}")
                return False, elapsed
            
            data = r.json()
            required_langs = {"en", "fr", "de", "es"}
            present_langs = set(data.keys())
            
            if not required_langs.issubset(present_langs):
                logger.warning(f"Missing translations: {required_langs - present_langs}")
                return False, elapsed
            
            return True, elapsed
        except Exception as e:
            elapsed = time.time() - start
            logger.error(f"Translation pipeline exception: {e}")
            return False, elapsed
    
    def probe_plugin_discovery(self) -> Tuple[bool, float]:
        """Test plugin marketplace (30s timeout)."""
        start = time.time()
        try:
            r = self.session.get(
                f"{self.endpoint}/api/v1/plugins/marketplace",
                timeout=5
            )
            
            elapsed = time.time() - start
            
            if r.status_code != 200:
                logger.warning(f"Plugin discovery returned {r.status_code}")
                return False, elapsed
            
            data = r.json()
            plugins = data.get("plugins", [])
            
            if len(plugins) < 5:
                logger.warning(f"Plugin marketplace has only {len(plugins)} plugins")
                return False, elapsed
            
            # Fetch a single plugin manifest
            plugin_id = plugins[0].get("id")
            r2 = self.session.get(
                f"{self.endpoint}/api/v1/plugins/{plugin_id}/manifest",
                timeout=2
            )
            
            if r2.status_code != 200:
                logger.warning(f"Plugin manifest returned {r2.status_code}")
                return False, elapsed
            
            return True, elapsed
        except Exception as e:
            elapsed = time.time() - start
            logger.error(f"Plugin discovery exception: {e}")
            return False, elapsed
    
    def probe_critical_path(self) -> Tuple[bool, float]:
        """Full E2E: skill → agent → result (90s timeout)."""
        start = time.time()
        try:
            # Spawn agent
            r = self.session.post(
                f"{self.endpoint}/api/v1/agents/general/spawn",
                json={"context": "e2e-test"},
                timeout=3
            )
            
            if r.status_code != 201:
                logger.warning(f"E2E agent spawn returned {r.status_code}")
                return False, time.time() - start
            
            instance_id = r.json().get("instance_id")
            
            # Execute skill through agent
            r2 = self.session.post(
                f"{self.endpoint}/api/v1/agents/{instance_id}/message",
                json={"prompt": "use /code-review with --effort=low on ./sample.js"},
                timeout=20
            )
            
            elapsed = time.time() - start
            
            if r2.status_code != 200:
                logger.warning(f"E2E skill execution returned {r2.status_code}")
                return False, elapsed
            
            response = r2.json()
            findings = response.get("findings", [])
            
            if not isinstance(findings, list):
                logger.warning("E2E response missing findings array")
                return False, elapsed
            
            return True, elapsed
        except Exception as e:
            elapsed = time.time() - start
            logger.error(f"Critical path exception: {e}")
            return False, elapsed
    
    def run(self):
        """Execute all probes and emit metrics."""
        timestamp = datetime.utcnow().isoformat()
        
        logger.info(f"Starting probe cycle at {timestamp}")
        
        tests = [
            ("skill_discovery", self.probe_skill_discovery, 30),
            ("agent_instantiation", self.probe_agent_instantiation, 45),
            ("translation_pipeline", self.probe_translation_pipeline, 60),
            ("plugin_discovery", self.probe_plugin_discovery, 30),
            ("critical_path", self.probe_critical_path, 90),
        ]
        
        for test_name, test_func, timeout in tests:
            try:
                success, duration = test_func()
                self.results[test_name] = {
                    "success": success,
                    "duration_seconds": round(duration, 3),
                    "timestamp": timestamp,
                    "location": self.location
                }
                
                status_str = "PASS" if success else "FAIL"
                logger.info(f"{test_name}: {status_str} ({duration:.3f}s)")
                
                # Emit Prometheus metric
                self._emit_metric(test_name, success, duration)
                
            except Exception as e:
                logger.error(f"Probe {test_name} crashed: {e}")
                self.results[test_name] = {
                    "success": False,
                    "error": str(e),
                    "timestamp": timestamp,
                    "location": self.location
                }
        
        self._emit_summary()
        return self.results
    
    def _emit_metric(self, test_name: str, success: bool, duration: float):
        """Emit Prometheus metric to webhook."""
        metric_name = f"syntheric_probe_{test_name}"
        
        try:
            webhook_url = os.getenv("ALERT_WEBHOOK")
            if not webhook_url:
                return
            
            payload = {
                "metric": metric_name,
                "value": 1 if success else 0,
                "duration": duration,
                "location": self.location,
                "timestamp": datetime.utcnow().timestamp()
            }
            
            requests.post(webhook_url, json=payload, timeout=5)
        except Exception as e:
            logger.error(f"Failed to emit metric: {e}")
    
    def _emit_summary(self):
        """Log summary and check for alerts."""
        success_count = sum(1 for r in self.results.values() if r.get("success"))
        total_count = len(self.results)
        success_rate = (success_count / total_count * 100) if total_count > 0 else 0
        
        logger.info(f"Probe cycle complete: {success_rate:.1f}% success rate")
        
        if success_rate < 80:
            logger.warning(f"DEGRADATION DETECTED: {success_rate:.1f}% success")
        
        if success_rate < 50:
            logger.critical(f"CRITICAL OUTAGE: {success_rate:.1f}% success")

if __name__ == "__main__":
    target = os.getenv("TARGET_ENDPOINT", "https://api.uitkit.io")
    location = os.getenv("PROBE_LOCATION", "unknown")
    
    probe = SyntheticProbe(target, location)
    results = probe.run()
    
    print(json.dumps(results, indent=2))
    
    # Exit with error if any probe failed
    if not all(r.get("success") for r in results.values()):
        sys.exit(1)
```

---

## Alert Configuration

Probe results feed into Prometheus via webhook. Add these alert rules to `ALERTING_RULES.yaml`:

```yaml
- alert: SyntheticProbeHighFailureRate
  expr: |
    (
      1 - (
        count(syntheric_probe_success{location=~"us-east-1|us-west-2|eu-central-1|ap-southeast-1"}) /
        count(syntheric_probe_attempted{location=~"us-east-1|us-west-2|eu-central-1|ap-southeast-1"})
      )
    ) > 0.05
  for: 5m
  labels:
    severity: warning
    component: observability
  annotations:
    summary: "Synthetic probe failure rate > 5% in {{ $labels.location }}"
    description: "Probe success rate is {{ $value | humanizePercentage }}"

- alert: SyntheticProbeLatencyDegradation
  expr: |
    (
      syntheric_probe_duration_seconds{test="critical_path"} > 20
    )
  for: 2m
  labels:
    severity: warning
    component: observability
  annotations:
    summary: "Critical path latency > 20s in {{ $labels.location }}"
    description: "Observed {{ $value | humanizeDuration }} latency"

- alert: SyntheticProbeCriticalOutage
  expr: |
    (
      count(syntheric_probe_success{location=~"us-east-1|us-west-2|eu-central-1|ap-southeast-1"}) == 0
    ) > 2
  for: 1m
  labels:
    severity: critical
    component: observability
  annotations:
    summary: "Multiple probe locations reporting 0% success"
    description: "{{ $value }} locations unable to reach API"
```

---

## Runbook: Probe Failure Response

### 1. Identify Scope

- Check which probe locations are affected (single vs. multiple)
- Check which scenarios are failing (skill vs. agent vs. E2E)
- Check if error rate is gradual degradation or sudden drop

### 2. Investigate

```bash
# Check probe pod logs
kubectl logs -n observability pod/syntheric-probe-us-east --tail=100

# Check probe metrics
curl -s http://prometheus:9090/api/v1/query \
  --data-urlencode 'query=syntheric_probe_duration_seconds' | jq

# Check connectivity to API
curl -v https://api.uitkit.io/health

# Check for recent deployments
kubectl get events -n default --sort-by='.lastTimestamp'
```

### 3. Escalate

- **Single location, skill/plugin scenario**: Create ticket, monitor (non-critical)
- **Single location, agent/E2E scenario**: Page on-call, check agent service health
- **Multiple locations, any scenario**: Page on-call immediately, check API upstream

### 4. Verify Recovery

After deploying fix:

```bash
# Run probe cycle manually
kubectl exec -it pod/syntheric-probe-us-east -n observability -- \
  /app/probe.py

# Watch probe metrics return to baseline
watch -n 5 'curl -s http://prometheus:9090/api/v1/query \
  --data-urlencode "query=syntheric_probe_success" | jq'
```

---

## Tuning & Maintenance

### Adjust Thresholds

Edit probe scenarios in `probe.py`:

```python
# Increase skill discovery SLA from 500ms to 1000ms
if elapsed > 1.0:
    logger.warning(...)
```

Redeploy probes:
```bash
docker build -t uitkit/synthetic-probe:latest .
docker push uitkit/synthetic-probe:latest
kubectl rollout restart deployment/syntheric-probe -n observability
```

### Add New Scenario

1. Add method to `SyntheticProbe` class in `probe.py`
2. Add to `tests` list in `run()` method
3. Update Prometheus alert rules in `ALERTING_RULES.yaml`
4. Redeploy probes
5. Document in this file under **Test Scenarios**

### Disable Probe Location

To drain traffic from a failing probe location:

```bash
kubectl patch pod syntheric-probe-us-east -p '{"spec":{"nodeSelector":{"disabled":"true"}}}'
```

To re-enable:

```bash
kubectl patch pod syntheric-probe-us-east -p '{"spec":{"nodeSelector":{"disabled":null}}}'
```

---

## SLA Target

- **Availability**: 99.5% uptime (22 minutes/month allowed downtime)
- **Detection latency**: < 10 minutes to page on-call
- **False positive rate**: < 5% (no alert flapping)
- **Probe overhead**: < 5MB memory, < 100m CPU per location

---

## Related Documentation

- [ALERTING_RULES.yaml](./ALERTING_RULES.yaml) — Prometheus alert rules for all components
- [METRICS_DEFINITIONS.yaml](./METRICS_DEFINITIONS.yaml) — Complete metric schema
- [README.md](./README.md) — Observability overview
- `../workflows/incident-response.md` — Runbook for on-call response
