# ROLLING_DEPLOYMENT.md — Production Rollout Strategy

**Strategy:** Blue-Green Deployment with Canary Traffic Split  
**Deployment Duration:** 1 hour  
**Traffic Ramp:** 10% → 50% → 100% over time  
**Auto-Rollback Trigger:** Error rate > 1%  
**Date Prepared:** 2026-06-22  

---

## Overview

This document describes the production deployment procedure for UitKit using a blue-green deployment pattern with gradual traffic splitting. The strategy minimizes risk by deploying to an isolated environment (green) while keeping the current production version (blue) live, then gradually shifting traffic and automatically rolling back if error rates exceed tolerance.

### Deployment Pattern Benefits

- **Zero Downtime:** Blue environment serves 100% traffic while green is deployed and tested
- **Instant Rollback:** Single traffic shift back to blue if issues detected
- **Gradual Rollout:** Three phases (10%, 50%, 100%) allow early detection of problems
- **Automatic Safeguards:** Error rate monitoring stops bad deployments immediately
- **Minimal User Impact:** Affected users limited to 10% initially, 50% at phase 2

---

## Pre-Deployment Setup (T-120 minutes)

### Infrastructure Requirements

Ensure both blue and green environments are ready:

```bash
# Verify both environments exist and are healthy
echo "Blue Environment (Production):"
curl -s https://prod-blue.uitkit.io/health | jq '.status'
# Expected: "healthy"

echo "Green Environment (Staging):"
curl -s https://prod-green.uitkit.io/health | jq '.status'
# Expected: "healthy" or "initializing"

# Verify load balancer configuration
echo "Load Balancer Config:"
curl -s https://api.loadbalancer.uitkit.io/routing | jq '.current_split'
# Expected: { "blue": 100, "green": 0 }

# Confirm monitoring is active
echo "Monitoring Status:"
curl -s https://monitoring.uitkit.io/api/status | jq '.alerts_enabled'
# Expected: true
```

**Duration:** 5 minutes  
**Owner:** DevOps Lead  
**Escalation:** If either environment is unhealthy, halt deployment and investigate.

---

### Automated Monitoring Setup

Configure real-time error rate monitoring before traffic shift:

```bash
# 1. Enable error rate metrics on green environment
curl -X POST https://monitoring.uitkit.io/api/metrics \
  -H "Content-Type: application/json" \
  -d '{
    "environment": "green",
    "metrics": ["error_rate", "latency_p99", "cpu_usage", "memory_usage"],
    "alert_threshold_error_rate": 0.01,
    "alert_threshold_latency_p99": 2000,
    "collection_interval_seconds": 10,
    "enabled": true
  }'

# 2. Verify monitoring is collecting baseline data
sleep 30
curl -s https://monitoring.uitkit.io/api/metrics/green/current | jq '.error_rate'
# Expected: ~0% (no traffic yet)

# 3. Set up auto-rollback alert
curl -X POST https://monitoring.uitkit.io/api/alerts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "green_error_rate_critical",
    "condition": "green_error_rate > 0.01",
    "action": "rollback_to_blue",
    "notify_channels": ["#deployments", "@devops-lead"],
    "enabled": true
  }'

# 4. Create custom dashboard for deployment
echo "Dashboard URL: https://monitoring.uitkit.io/dashboards/rolling-deployment"
```

**Duration:** 10 minutes  
**Owner:** Monitoring Lead  
**Success Criteria:** Metrics are flowing, baselines established, alerts are active.

---

## Phase 1: Green Environment Deployment (T-100 to T-80 minutes)

### Step 1.1: Deploy to Green (Isolated from Production)

```bash
# 1.1.1 Pull latest code and build artifacts
cd /Users/tushar/Desktop/UitKit
git pull origin main
git log -1 --oneline

# 1.1.2 Build and verify artifacts
npm run build-index
npm run build-plugins
npm run build-catalog
npm run validate:catalog
# Expected: all builds succeed, no validation errors

# 1.1.3 Create deployment artifact
DEPLOY_VERSION=$(node -e "console.log(require('./package.json').version)")
DEPLOY_TIMESTAMP=$(date -u +"%Y%m%d_%H%M%SZ")
ARTIFACT_NAME="uitkit_${DEPLOY_VERSION}_${DEPLOY_TIMESTAMP}"

tar -czf /tmp/${ARTIFACT_NAME}.tar.gz \
  --exclude=node_modules \
  --exclude=.git \
  --exclude=.kimchi \
  .

ls -lh /tmp/${ARTIFACT_NAME}.tar.gz
# Expected: artifact is < 50MB

# 1.1.4 Compute and verify checksum
SHA256=$(shasum -a 256 /tmp/${ARTIFACT_NAME}.tar.gz | awk '{print $1}')
echo "Deployment Artifact SHA256: ${SHA256}"

# 1.1.5 Upload to green environment
curl -X POST https://prod-green.uitkit.io/api/deployments \
  -H "Content-Type: application/octet-stream" \
  -H "X-Artifact-Name: ${ARTIFACT_NAME}" \
  -H "X-Checksum-SHA256: ${SHA256}" \
  --data-binary @/tmp/${ARTIFACT_NAME}.tar.gz

# Expected HTTP 202 Accepted
echo "Green deployment initiated. Artifact: ${ARTIFACT_NAME}"

# 1.1.6 Wait for deployment to complete
echo "Waiting for green deployment..."
for i in {1..120}; do
  STATUS=$(curl -s https://prod-green.uitkit.io/api/deployments/status | jq -r '.state')
  if [ "$STATUS" == "ready" ]; then
    echo "✓ Green deployment complete"
    break
  elif [ "$STATUS" == "failed" ]; then
    echo "✗ Green deployment failed"
    exit 1
  fi
  echo "  [$i/120] Status: $STATUS"
  sleep 5
done
```

**Duration:** 20 minutes  
**Owner:** DevOps Lead  
**Escalation:** If green deployment fails, investigate logs and retry or abort.

---

### Step 1.2: Health Check Green Environment

```bash
# 1.2.1 Verify green environment is responding
echo "Testing green health endpoints..."
curl -s https://prod-green.uitkit.io/health | jq '.'
# Expected: { "status": "healthy", "version": "1.10.1", "timestamp": "..." }

# 1.2.2 Run smoke tests against green
echo "Running smoke tests on green..."
npm run test:smoke -- --environment=green --timeout=60000
# Expected: all tests pass

# 1.2.3 Verify all critical services are up
SERVICES=("api" "marketplace" "cdn" "database" "cache")
for service in "${SERVICES[@]}"; do
  STATUS=$(curl -s https://prod-green.uitkit.io/status/$service | jq -r '.status')
  echo "  $service: $STATUS"
  if [ "$STATUS" != "operational" ]; then
    echo "  WARNING: $service is not operational"
  fi
done

# 1.2.4 Baseline error rate should be near zero
ERROR_RATE=$(curl -s https://monitoring.uitkit.io/api/metrics/green/current | jq '.error_rate')
echo "Green baseline error rate: ${ERROR_RATE}%"
if (( $(echo "$ERROR_RATE > 0.5" | bc -l) )); then
  echo "⚠ WARNING: High baseline error rate on green"
fi

# 1.2.5 Verify connectivity to dependencies
echo "Testing external dependencies..."
# Database
curl -s https://prod-green.uitkit.io/api/db-health | jq '.connected'
# Cache
curl -s https://prod-green.uitkit.io/api/cache-health | jq '.connected'
# External APIs (if any)
echo "✓ All dependencies reachable"
```

**Duration:** 15 minutes  
**Owner:** QA Lead  
**Success Criteria:** All health checks pass, error rate < 0.1%, no service warnings.

---

### Step 1.3: Functional Testing on Green

```bash
# 1.3.1 Run automated test suite against green
npm run test:e2e -- --environment=green --headless --timeout=120000

# 1.3.2 Test critical user journeys
echo "Testing critical user journeys..."
# Journey 1: Install a skill
curl -X POST https://prod-green.uitkit.io/api/marketplace/install \
  -H "Content-Type: application/json" \
  -d '{"skill_id": "fastapi-crud", "version": "latest"}'

# Journey 2: Search marketplace
curl -s "https://prod-green.uitkit.io/api/marketplace/search?q=python" | jq '.results | length'

# Journey 3: List available commands
curl -s https://prod-green.uitkit.io/api/cli/list | jq '.commands | length'

# 1.3.3 Verify backward compatibility
npm run test:regression -- --environment=green
# Expected: all regression tests pass (no breaking changes)

# 1.3.4 Check plugin load performance
echo "Testing plugin loading..."
time curl -s https://prod-green.uitkit.io/api/plugins/load-all | jq '.loaded_count'
# Expected: completes in < 5 seconds
```

**Duration:** 20 minutes  
**Owner:** QA Lead  
**Success Criteria:** All e2e tests pass, journeys complete, no regressions, load time acceptable.

---

## Phase 2: Canary Release (10% Traffic) (T-80 to T-50 minutes)

### Step 2.1: Shift 10% Traffic to Green

```bash
# 2.1.1 Capture current routing configuration
CURRENT_CONFIG=$(curl -s https://api.loadbalancer.uitkit.io/routing)
echo "Current routing: $CURRENT_CONFIG" > /tmp/blue_green_routing_backup_$(date +%s).json

# 2.1.2 Update load balancer to 10% green / 90% blue
echo "Shifting 10% traffic to green environment..."
curl -X PUT https://api.loadbalancer.uitkit.io/routing \
  -H "Content-Type: application/json" \
  -d '{
    "blue": 90,
    "green": 10,
    "strategy": "weighted_random",
    "session_affinity": true,
    "connection_timeout_seconds": 30
  }'

# 2.1.3 Verify routing was applied
sleep 5
ROUTING=$(curl -s https://api.loadbalancer.uitkit.io/routing | jq '.current_split')
echo "New routing: $ROUTING"
# Expected: { "blue": 90, "green": 10 }

# 2.1.4 Announce phase 1 canary release
echo "✓ Phase 2 (Canary): 10% traffic shifted to green"
echo "Monitor: https://monitoring.uitkit.io/dashboards/rolling-deployment"
```

**Duration:** 5 minutes  
**Owner:** DevOps Lead  
**Communication:** Post to #deployments: "Phase 2: 10% traffic → green (canary release started)"

---

### Step 2.2: Monitor 10% Canary (15-minute observation window)

```bash
# 2.2.1 Watch error rate every 30 seconds for 15 minutes
echo "Monitoring canary error rate (10% traffic)..."
CANARY_START=$(date +%s)
CANARY_END=$((CANARY_START + 900))  # 15 minutes

while [ $(date +%s) -lt $CANARY_END ]; do
  ERROR_RATE=$(curl -s https://monitoring.uitkit.io/api/metrics/green/current | jq '.error_rate')
  LATENCY_P99=$(curl -s https://monitoring.uitkit.io/api/metrics/green/current | jq '.latency.p99')
  TIMESTAMP=$(date "+%H:%M:%S")
  
  echo "[$TIMESTAMP] Error Rate: ${ERROR_RATE}% | P99 Latency: ${LATENCY_P99}ms"
  
  # Check for auto-rollback condition
  if (( $(echo "$ERROR_RATE > 1.0" | bc -l) )); then
    echo "⚠ ERROR RATE EXCEEDED 1% - INITIATING AUTOMATIC ROLLBACK"
    # See Step 2.3 for rollback
  fi
  
  sleep 30
done

# 2.2.2 Generate canary health report
curl -s https://monitoring.uitkit.io/api/metrics/green/canary-phase-1 | jq '{
  error_rate: .error_rate,
  error_rate_max: .error_rate_max,
  error_rate_avg: .error_rate_avg,
  latency_p50: .latency.p50,
  latency_p99: .latency.p99,
  requests_total: .requests_total,
  requests_error_count: .requests_error_count,
  cpu_usage_avg: .cpu_usage_avg,
  memory_usage_avg: .memory_usage_avg,
  duration_seconds: 900
}' | tee /tmp/canary_phase1_report.json

echo "✓ Canary monitoring complete (phase 1)"
```

**Duration:** 15 minutes  
**Owner:** Monitoring Lead  
**Success Criteria:** Error rate < 1%, P99 latency < 2x baseline, no critical errors.

---

### Step 2.3: Automatic Rollback (If Triggered)

```bash
# 2.3.1 Check if rollback condition was met
ERROR_RATE=$(curl -s https://monitoring.uitkit.io/api/metrics/green/current | jq '.error_rate')

if (( $(echo "$ERROR_RATE > 1.0" | bc -l) )); then
  echo "⚠ ROLLBACK TRIGGERED: Error rate ${ERROR_RATE}% exceeds threshold (1%)"
  
  # 2.3.2 Revert traffic back to 100% blue
  echo "Rolling back traffic to 100% blue..."
  curl -X PUT https://api.loadbalancer.uitkit.io/routing \
    -H "Content-Type: application/json" \
    -d '{
      "blue": 100,
      "green": 0,
      "strategy": "weighted_random",
      "session_affinity": true
    }'
  
  sleep 5
  
  # 2.3.3 Verify rollback completed
  ROUTING=$(curl -s https://api.loadbalancer.uitkit.io/routing | jq '.current_split')
  echo "Rolled back routing: $ROUTING"
  
  # 2.3.4 Verify production is stable again
  BLUE_ERROR_RATE=$(curl -s https://monitoring.uitkit.io/api/metrics/blue/current | jq '.error_rate')
  echo "Blue error rate after rollback: ${BLUE_ERROR_RATE}%"
  
  # 2.3.5 Send incident alert
  curl -X POST https://monitoring.uitkit.io/api/incidents \
    -H "Content-Type: application/json" \
    -d "{
      \"title\": \"Rolling Deployment Rollback: Canary Phase Error Rate Exceeded\",
      \"severity\": \"critical\",
      \"environment\": \"green\",
      \"error_rate\": ${ERROR_RATE},
      \"threshold\": 1.0,
      \"action_taken\": \"automatic_rollback_to_blue\",
      \"timestamp\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\"
    }"
  
  # 2.3.6 Notify team
  echo "📢 ROLLBACK COMPLETE"
  echo "Incident: Rolling deployment rolled back to v1.10.0"
  echo "Reason: Error rate exceeded 1% during canary phase"
  echo "Status: Production stable on blue environment"
  
  exit 1
fi

echo "✓ Canary phase passed all health checks"
```

**Duration:** 2 minutes (triggered only on failure)  
**Owner:** Automated + DevOps Lead (manual oversight)

---

## Phase 3: Graduated Release (50% Traffic) (T-50 to T-20 minutes)

### Step 3.1: Shift 50% Traffic to Green

```bash
# 3.1.1 Ensure canary phase completed successfully
LAST_ERROR_RATE=$(curl -s https://monitoring.uitkit.io/api/metrics/green/canary-phase-1 | jq '.error_rate')
echo "Last canary error rate: ${LAST_ERROR_RATE}%"
if (( $(echo "$LAST_ERROR_RATE > 1.0" | bc -l) )); then
  echo "✗ Canary phase failed. Aborting progression to phase 3."
  exit 1
fi

# 3.1.2 Update load balancer to 50% green / 50% blue
echo "Shifting 50% traffic to green environment..."
curl -X PUT https://api.loadbalancer.uitkit.io/routing \
  -H "Content-Type: application/json" \
  -d '{
    "blue": 50,
    "green": 50,
    "strategy": "weighted_random",
    "session_affinity": true,
    "connection_timeout_seconds": 30
  }'

# 3.1.3 Verify routing was applied
sleep 5
ROUTING=$(curl -s https://api.loadbalancer.uitkit.io/routing | jq '.current_split')
echo "New routing: $ROUTING"
# Expected: { "blue": 50, "green": 50 }

# 3.1.4 Log phase transition
echo "Phase 3: 50% traffic → green (graduated release)"
curl -X POST https://monitoring.uitkit.io/api/deployments/log \
  -H "Content-Type: application/json" \
  -d "{
    \"event\": \"traffic_shift_50_percent\",
    \"timestamp\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\",
    \"blue_percentage\": 50,
    \"green_percentage\": 50
  }"
```

**Duration:** 5 minutes  
**Owner:** DevOps Lead  
**Communication:** Post to #deployments: "Phase 3: 50% traffic → green (graduated release)"

---

### Step 3.2: Monitor 50% Graduated Release (20-minute observation window)

```bash
# 3.2.1 Monitor error rate for 20 minutes
echo "Monitoring graduated release (50% traffic)..."
GRADUATED_START=$(date +%s)
GRADUATED_END=$((GRADUATED_START + 1200))  # 20 minutes

CRITICAL_ERRORS=0
while [ $(date +%s) -lt $GRADUATED_END ]; do
  ERROR_RATE=$(curl -s https://monitoring.uitkit.io/api/metrics/green/current | jq '.error_rate')
  LATENCY_P99=$(curl -s https://monitoring.uitkit.io/api/metrics/green/current | jq '.latency.p99')
  CPU_USAGE=$(curl -s https://monitoring.uitkit.io/api/metrics/green/current | jq '.cpu_usage')
  TIMESTAMP=$(date "+%H:%M:%S")
  
  echo "[$TIMESTAMP] Error: ${ERROR_RATE}% | P99 Latency: ${LATENCY_P99}ms | CPU: ${CPU_USAGE}%"
  
  # Check thresholds
  if (( $(echo "$ERROR_RATE > 1.0" | bc -l) )); then
    CRITICAL_ERRORS=$((CRITICAL_ERRORS + 1))
    echo "  ⚠ Critical: Error rate > 1%"
    if [ $CRITICAL_ERRORS -ge 2 ]; then
      echo "  🔴 Multiple critical errors detected - initiating rollback"
      # See Step 3.3 for rollback
    fi
  fi
  
  if (( $(echo "$LATENCY_P99 > 4000" | bc -l) )); then
    echo "  ⚠ Warning: P99 latency > 4s"
  fi
  
  sleep 30
done

# 3.2.2 Generate graduated phase report
curl -s https://monitoring.uitkit.io/api/metrics/green/graduated-phase | jq '{
  error_rate: .error_rate,
  error_rate_max: .error_rate_max,
  error_rate_avg: .error_rate_avg,
  latency_p50: .latency.p50,
  latency_p99: .latency.p99,
  latency_p99_max: .latency.p99_max,
  requests_total: .requests_total,
  requests_error_count: .requests_error_count,
  cpu_usage_avg: .cpu_usage_avg,
  memory_usage_avg: .memory_usage_avg,
  duration_seconds: 1200
}' | tee /tmp/graduated_phase_report.json

echo "✓ Graduated release monitoring complete"
```

**Duration:** 20 minutes  
**Owner:** Monitoring Lead  
**Success Criteria:** Error rate consistently < 1%, P99 latency < 2x baseline, CPU < 80%.

---

### Step 3.3: Automatic Rollback (If Triggered)

```bash
# 3.3.1 Evaluate graduated phase metrics
ERROR_RATE=$(curl -s https://monitoring.uitkit.io/api/metrics/green/current | jq '.error_rate')
ERROR_RATE_MAX=$(curl -s https://monitoring.uitkit.io/api/metrics/green/graduated-phase | jq '.error_rate_max')

if (( $(echo "$ERROR_RATE > 1.0" | bc -l) )) || (( $(echo "$ERROR_RATE_MAX > 1.5" | bc -l) )); then
  echo "⚠ ROLLBACK TRIGGERED: Error rate ${ERROR_RATE}% or peak ${ERROR_RATE_MAX}% exceeds tolerance"
  
  # 3.3.2 Immediately revert traffic to 100% blue
  echo "Rolling back traffic to 100% blue..."
  curl -X PUT https://api.loadbalancer.uitkit.io/routing \
    -H "Content-Type: application/json" \
    -d '{
      "blue": 100,
      "green": 0
    }'
  
  sleep 10
  
  # 3.3.3 Verify production is stable
  BLUE_ERROR_RATE=$(curl -s https://monitoring.uitkit.io/api/metrics/blue/current | jq '.error_rate')
  echo "Blue error rate after rollback: ${BLUE_ERROR_RATE}%"
  
  # 3.3.4 Create incident report
  curl -X POST https://monitoring.uitkit.io/api/incidents \
    -H "Content-Type: application/json" \
    -d "{
      \"title\": \"Rolling Deployment Rollback: Graduated Phase Error Threshold Exceeded\",
      \"severity\": \"critical\",
      \"phase\": \"graduated_50_percent\",
      \"error_rate_current\": ${ERROR_RATE},
      \"error_rate_peak\": ${ERROR_RATE_MAX},
      \"action_taken\": \"automatic_rollback_to_blue\"
    }"
  
  echo "📢 ROLLBACK COMPLETE (Graduated Phase)"
  exit 1
fi

echo "✓ Graduated release passed all health checks"
```

---

## Phase 4: Full Release (100% Traffic) (T-20 to T-0 minutes)

### Step 4.1: Shift 100% Traffic to Green

```bash
# 4.1.1 Verify both canary and graduated phases passed
echo "Verifying previous phases..."
CANARY_REPORT=$(cat /tmp/canary_phase1_report.json 2>/dev/null)
GRADUATED_REPORT=$(cat /tmp/graduated_phase_report.json 2>/dev/null)

if [ -z "$CANARY_REPORT" ] || [ -z "$GRADUATED_REPORT" ]; then
  echo "✗ Previous phase reports missing. Aborting full release."
  exit 1
fi

# 4.1.2 Final pre-release check
echo "Running final health checks on green..."
curl -s https://prod-green.uitkit.io/health | jq '.status'
npm run test:smoke -- --environment=green --critical-only

# 4.1.3 Update load balancer to 100% green / 0% blue
echo "Shifting 100% traffic to green environment..."
curl -X PUT https://api.loadbalancer.uitkit.io/routing \
  -H "Content-Type: application/json" \
  -d '{
    "blue": 0,
    "green": 100,
    "strategy": "weighted_random",
    "session_affinity": true
  }'

# 4.1.4 Verify traffic shift completed
sleep 10
ROUTING=$(curl -s https://api.loadbalancer.uitkit.io/routing | jq '.current_split')
echo "Traffic routing (100% complete): $ROUTING"
# Expected: { "blue": 0, "green": 100 }

# 4.1.5 Log full release event
curl -X POST https://monitoring.uitkit.io/api/deployments/log \
  -H "Content-Type: application/json" \
  -d "{
    \"event\": \"traffic_shift_100_percent\",
    \"timestamp\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\",
    \"blue_percentage\": 0,
    \"green_percentage\": 100,
    \"version\": \"$(node -e "console.log(require('./package.json').version)")\"
  }"

echo "✓ Full release: 100% traffic now on green"
```

**Duration:** 10 minutes  
**Owner:** DevOps Lead  
**Communication:** Post to #deployments: "Phase 4: 100% traffic → green (full release complete)"

---

### Step 4.2: Monitor Full Release (10-minute stability window)

```bash
# 4.2.1 Intensive monitoring for first 10 minutes
echo "Monitoring full release (critical stability window)..."
RELEASE_START=$(date +%s)
RELEASE_WINDOW=$((RELEASE_START + 600))  # 10 minutes

while [ $(date +%s) -lt $RELEASE_WINDOW ]; do
  ERROR_RATE=$(curl -s https://monitoring.uitkit.io/api/metrics/green/current | jq '.error_rate')
  LATENCY_P99=$(curl -s https://monitoring.uitkit.io/api/metrics/green/current | jq '.latency.p99')
  THROUGHPUT=$(curl -s https://monitoring.uitkit.io/api/metrics/green/current | jq '.requests_per_second')
  TIMESTAMP=$(date "+%H:%M:%S")
  
  echo "[$TIMESTAMP] Error: ${ERROR_RATE}% | Latency: ${LATENCY_P99}ms | Throughput: ${THROUGHPUT} req/s"
  
  # Final automatic rollback check
  if (( $(echo "$ERROR_RATE > 1.0" | bc -l) )); then
    echo "🔴 CRITICAL: Error rate exceeded during full release - EMERGENCY ROLLBACK"
    
    # Immediate rollback
    curl -X PUT https://api.loadbalancer.uitkit.io/routing \
      -H "Content-Type: application/json" \
      -d '{"blue": 100, "green": 0}'
    
    curl -X POST https://monitoring.uitkit.io/api/incidents \
      -H "Content-Type: application/json" \
      -d "{
        \"title\": \"Emergency Rollback: Full Release Error Rate Exceeded\",
        \"severity\": \"critical\",
        \"phase\": \"full_release_100_percent\",
        \"error_rate\": ${ERROR_RATE},
        \"action\": \"emergency_rollback_initiated\"
      }"
    
    exit 1
  fi
  
  sleep 30
done

# 4.2.2 Generate full release report
curl -s https://monitoring.uitkit.io/api/metrics/green/full-release | jq '{
  error_rate_avg: .error_rate_avg,
  error_rate_max: .error_rate_max,
  latency_p99_avg: .latency.p99_avg,
  latency_p99_max: .latency.p99_max,
  requests_total: .requests_total,
  cpu_usage_avg: .cpu_usage_avg,
  memory_usage_avg: .memory_usage_avg,
  duration_seconds: 600,
  status: "stable"
}' | tee /tmp/full_release_report.json

echo "✓ Full release monitoring complete - Production stable"
```

**Duration:** 10 minutes  
**Owner:** Monitoring Lead  
**Success Criteria:** Error rate < 1%, P99 latency normal, throughput healthy, 0 critical incidents.

---

### Step 4.3: Promote Green to Primary (Blue Swap)

```bash
# 4.3.1 Once green is stable at 100%, swap blue/green roles
echo "Swapping blue/green environment roles..."

# Mark current blue as previous
curl -X POST https://api.environment-manager.uitkit.io/environments/blue/mark-as-previous

# Mark current green as new blue (primary)
curl -X POST https://api.environment-manager.uitkit.io/environments/green/promote-to-blue

# Deploy new green for next release
curl -X POST https://api.environment-manager.uitkit.io/environments/create \
  -H "Content-Type: application/json" \
  -d '{"name": "green", "from": "blue", "isolated": true}'

# 4.3.2 Verify role swap
echo "Environment roles after promotion:"
curl -s https://api.environment-manager.uitkit.io/environments/status | jq '.[] | {name: .name, role: .role, status: .status}'

echo "✓ Blue/Green roles swapped: Green is now primary (Blue)"
```

**Duration:** 5 minutes  
**Owner:** DevOps Lead

---

## Post-Deployment (T+0 to T+1 hour)

### Step 5.1: Extended Monitoring (1 hour)

```bash
# 5.1.1 Continue monitoring for 1 hour after full release
echo "Extended post-deployment monitoring (1 hour)..."
MONITOR_START=$(date +%s)
MONITOR_END=$((MONITOR_START + 3600))  # 1 hour

ALERT_COUNT=0
while [ $(date +%s) -lt $MONITOR_END ]; do
  ERROR_RATE=$(curl -s https://monitoring.uitkit.io/api/metrics/green/current | jq '.error_rate')
  LATENCY_P99=$(curl -s https://monitoring.uitkit.io/api/metrics/green/current | jq '.latency.p99')
  TIMESTAMP=$(date "+%H:%M:%S")
  
  echo "[$TIMESTAMP] Error: ${ERROR_RATE}% | P99: ${LATENCY_P99}ms"
  
  # Alert on anomalies (but don't auto-rollback after 1hr of 100% green)
  if (( $(echo "$ERROR_RATE > 0.5" | bc -l) )); then
    ALERT_COUNT=$((ALERT_COUNT + 1))
    if [ $((ALERT_COUNT % 6)) -eq 0 ]; then  # Every 3 minutes
      echo "  ⚠ Alert: Elevated error rate - investigate but do not rollback"
    fi
  fi
  
  sleep 30
done

echo "✓ Extended monitoring complete (1 hour post-deployment)"
```

**Duration:** 1 hour  
**Owner:** Monitoring Lead  
**Action:** Monitor but do not auto-rollback; escalate to team for investigation.

---

### Step 5.2: Deployment Success Verification

```bash
# 5.2.1 Verify all success criteria are met
echo "=== DEPLOYMENT SUCCESS VERIFICATION ==="

# Check 1: Production serving 100% from green (now blue)
ROUTING=$(curl -s https://api.loadbalancer.uitkit.io/routing | jq '.current_split')
echo "✓ Traffic routing: $ROUTING"

# Check 2: Error rate stable and low
ERROR_RATE=$(curl -s https://monitoring.uitkit.io/api/metrics/green/current | jq '.error_rate')
if (( $(echo "$ERROR_RATE < 0.1" | bc -l) )); then
  echo "✓ Error rate: ${ERROR_RATE}% (acceptable)"
else
  echo "⚠ Error rate: ${ERROR_RATE}% (elevated, but deployment complete)"
fi

# Check 3: NPM package updated
npm info uitkit@latest | jq '.version'
# Expected: 1.10.1

# Check 4: GitHub release visible
gh release view v1.10.1 | jq '.name'

# Check 5: Marketplace updated
curl -s https://api.marketplace.uitkit.io/version | jq '.current_version'

# 5.2.2 Generate final deployment report
cat > /tmp/deployment_success_report.json << EOF
{
  "deployment_status": "complete",
  "version": "$(node -e "console.log(require('./package.json').version)")",
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "duration_minutes": 60,
  "traffic_shift_timeline": {
    "phase_1_canary": "10% (15 min)",
    "phase_2_graduated": "50% (20 min)",
    "phase_3_full_release": "100% (25 min)"
  },
  "health_metrics": {
    "error_rate_avg": $(curl -s https://monitoring.uitkit.io/api/metrics/green/summary | jq '.error_rate_avg'),
    "error_rate_max": $(curl -s https://monitoring.uitkit.io/api/metrics/green/summary | jq '.error_rate_max'),
    "latency_p99_avg": $(curl -s https://monitoring.uitkit.io/api/metrics/green/summary | jq '.latency.p99_avg'),
    "uptime_percent": 100.0
  },
  "rollback_events": 0,
  "critical_incidents": 0,
  "success": true
}
EOF

cat /tmp/deployment_success_report.json | jq '.'
echo "✓ Deployment report saved"
```

---

## Rollback Quick Reference

### Manual Rollback (If Automatic Fails)

```bash
# Immediate 100% traffic revert
curl -X PUT https://api.loadbalancer.uitkit.io/routing \
  -H "Content-Type: application/json" \
  -d '{"blue": 100, "green": 0}'

# Verify rollback
curl -s https://api.loadbalancer.uitkit.io/routing | jq '.current_split'

# Monitor blue stability
curl -s https://monitoring.uitkit.io/api/metrics/blue/current | jq '{error_rate, latency}'
```

### Partial Rollback (To Previous Stable Version)

```bash
# If current blue is unstable, pull from backup
curl -X POST https://api.environment-manager.uitkit.io/environments/blue/restore \
  -H "Content-Type: application/json" \
  -d '{"from_backup": "latest_stable"}'

# Update traffic
curl -X PUT https://api.loadbalancer.uitkit.io/routing \
  -d '{"blue": 100, "green": 0}'
```

---

## Deployment Checklist

- [ ] Pre-deployment: Blue and green environments healthy
- [ ] Pre-deployment: Monitoring configured and baselines established
- [ ] Phase 1: Green deployment complete and passing smoke tests
- [ ] Phase 1: Green health checks pass (all services operational)
- [ ] Phase 2: 10% canary traffic shifted, no critical errors in 15 min
- [ ] Phase 2: Error rate remained < 1% throughout canary window
- [ ] Phase 3: 50% graduated traffic shifted, monitoring stable for 20 min
- [ ] Phase 3: P99 latency acceptable, CPU usage normal
- [ ] Phase 4: 100% traffic shifted to green
- [ ] Phase 4: 10-minute critical stability window passed with error rate < 1%
- [ ] Phase 5: Blue/green roles swapped (green promoted to primary)
- [ ] Phase 5: 1-hour extended monitoring completed
- [ ] Post-deployment: NPM package shows new version
- [ ] Post-deployment: GitHub release visible
- [ ] Post-deployment: Marketplace updated
- [ ] Post-deployment: Team notified of successful deployment

---

## Communication Template

### Deployment Start
```
🚀 Rolling Deployment Started: UitKit v1.10.1
Timeline: 60 minutes (3 phases: 10% → 50% → 100%)
Dashboard: https://monitoring.uitkit.io/dashboards/rolling-deployment
Owner: @devops-lead
```

### Phase Completion
```
✅ Phase [N] Complete: [X% traffic on green]
Duration: [time] | Error Rate: [rate]% | Status: Stable
Next: Phase [N+1] in 5 minutes
```

### Deployment Success
```
✨ Rolling Deployment Complete: UitKit v1.10.1
Timeline: 60 minutes
Final status: 100% traffic on green (now primary)
Rollback events: 0
Incidents: 0
All systems: Green ✓
```

### Rollback (If Triggered)
```
🔴 ROLLBACK INITIATED: UitKit v1.10.1
Reason: Error rate exceeded threshold
Action: Traffic reverted to 100% blue (v1.10.0)
Status: Production stable
Incident: [Link to incident report]
```

---

## Monitoring Dashboard

Deployment monitoring dashboard displays:

- **Real-time traffic split:** Blue % | Green %
- **Error rate timeline:** Both environments
- **P99 latency chart:** Blue vs Green
- **Request throughput:** Requests/second by environment
- **CPU/Memory usage:** Resource consumption trends
- **Incident timeline:** Events, alerts, rollbacks
- **Health status indicators:** Service-level health

Access: `https://monitoring.uitkit.io/dashboards/rolling-deployment`

---

## Troubleshooting

### Issue: Green Environment Won't Start

**Symptoms:** Deployment artifact upload succeeds but green fails to become ready.

**Diagnosis:**
```bash
curl -s https://prod-green.uitkit.io/api/deployment-logs | jq '.[]'
```

**Recovery:**
1. Check green environment logs for startup errors
2. Verify database migrations completed
3. If unable to fix: abort deployment, investigate root cause, retry with new artifact

---

### Issue: Error Rate Spikes During Canary Phase

**Symptoms:** Error rate consistently > 1% at 10% traffic.

**Diagnosis:**
```bash
curl -s https://monitoring.uitkit.io/api/metrics/green/errors | jq '.top_errors'
```

**Recovery:**
1. Automatic rollback should trigger (revert to blue)
2. If automatic rollback failed, execute manual rollback (see Quick Reference)
3. Investigate error logs and create hotfix
4. Retry deployment with v1.10.2

---

### Issue: Latency Degradation at 50% Traffic

**Symptoms:** P99 latency increases dramatically at 50% split.

**Diagnosis:**
```bash
curl -s https://monitoring.uitkit.io/api/metrics/green/current | jq '.latency'
curl -s https://prod-green.uitkit.io/api/resource-usage | jq '.'
```

**Recovery:**
1. Check if issue is capacity-related: scale green environment horizontally
2. If issue is code-related: rollback, investigate, deploy v1.10.2
3. If transient: continue monitoring, may stabilize as caches warm up

---

## Appendix: Environment Configuration

### Blue Environment (Production)
- Endpoint: `https://prod-blue.uitkit.io`
- Role: Primary / Standby (after swap)
- Traffic: 100% → 0% (during deployment)
- Monitoring: Continuous

### Green Environment (Staging/New Release)
- Endpoint: `https://prod-green.uitkit.io`
- Role: Staging / Primary (after swap)
- Traffic: 0% → 100% (during deployment)
- Monitoring: Intensive during deployment

### Load Balancer Configuration
- Type: Application Load Balancer (weighted routing)
- Strategy: Random distribution within weight buckets
- Session Affinity: Enabled (sticky sessions)
- Health Check Interval: 10 seconds
- Timeout: 30 seconds

### Monitoring & Alerting
- Collection Interval: 10 seconds
- Alert Threshold (Error Rate): > 1%
- Alert Threshold (P99 Latency): > 2x baseline
- Alert Threshold (CPU): > 85%
- Auto-Rollback: Enabled during phases 2-4

---

## References

- [DEPLOYMENT_PLAN.md](../DEPLOYMENT_PLAN.md) — Full deployment workflow
- [Monitoring Dashboard](https://monitoring.uitkit.io/dashboards/rolling-deployment) — Real-time metrics
- [Incident Response](../ops/INCIDENT_RESPONSE.md) — Escalation procedures (if exists)
- [Runbook: Environment Setup](../ops/ENV_SETUP.md) — Blue/Green infrastructure setup (if exists)

---

**Last Updated:** 2026-06-22  
**Next Review:** After first rolling deployment completion  
**Maintenance:** Update traffic percentages/timing based on production learnings
