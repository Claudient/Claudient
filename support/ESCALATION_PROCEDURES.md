# Escalation Procedures

Critical incident response, on-call rotation, communication protocols, and root cause analysis playbook for UitKit.

---

## 1. On-Call Rotation

### Rotation Schedule

- **7-day rotations**: Each engineer owns one week of on-call duty
- **Primary on-call**: Responds within 30 minutes of alert
- **Secondary on-call**: Backup responder, assumes primary role if primary unavailable for >15 min
- **Schedule**: Posted in Slack #oncall-schedule, synced to calendar (google.com/calendar/oncall)
- **Handoff**: Fridays 9 AM UTC; outgoing brief incoming with active incidents and context

### Escalation Chain

```
Alert Triggered
    ↓
Primary On-Call (30 min SLA)
    ↓
Secondary On-Call (15 min escalation)
    ↓
Engineering Manager (5 min escalation)
    ↓
VP Engineering (immediate escalation for P0)
```

### On-Call Responsibilities

| Phase | Owner | Duration | SLA |
|-------|-------|----------|-----|
| Detection & Initial Response | Primary | 0–30 min | Page within 2 min |
| Diagnosis & Triage | Primary | 30–60 min | Classify severity within 15 min |
| Escalation Decision | Primary + Manager | 60–90 min | Escalate if unresolved |
| Full Mitigation | Primary + Team | Ongoing | P0: 2h; P1: 4h; P2: 24h |

### Notification Channels

1. **PagerDuty alerts** (real-time)
2. **SMS fallback** (5 min timeout)
3. **Slack #incidents** (all critical incidents)
4. **Email digest** (daily summary)

---

## 2. Severity Classification

Assigned at triage; used to determine response team, escalation chain, and communication cadence.

### P0 (Critical)

**Definition**: Complete service outage; customer-facing impact affecting >50% of user base.

- **Examples**: Authentication system down, database unreachable, payment processing failed
- **Response SLA**: Primary on-call responds within 5 minutes
- **Escalation**: VP + Engineering Manager + Primary
- **Communication**: Slack every 15 min; customer notification at 5 min
- **Target Resolution**: 2 hours (incident or workaround)

### P1 (High)

**Definition**: Major functionality impaired; <50% of user base affected or critical feature unavailable.

- **Examples**: Dashboard slow (>5s latency), feature toggle stuck, core API endpoint errors
- **Response SLA**: Primary on-call responds within 15 minutes
- **Escalation**: Engineering Manager if unresolved after 30 min
- **Communication**: Slack every 30 min; customer notification at 15 min
- **Target Resolution**: 4 hours (incident or rollback)

### P2 (Medium)

**Definition**: Non-critical feature degraded; workaround available or limited user impact.

- **Examples**: Reporting dashboard errors, UI glitches, non-essential API slow
- **Response SLA**: Primary on-call responds within 1 hour
- **Escalation**: Engineering Manager if unresolved after 4 hours
- **Communication**: Slack updates every 60 min; internal only (no external notification unless persistent >4h)
- **Target Resolution**: 24 hours (fix or documented workaround)

### P3 (Low)

**Definition**: Cosmetic or non-urgent issues; no customer impact.

- **Examples**: Typos, outdated help text, minor UI polish
- **Response SLA**: No on-call requirement; triaged during business hours
- **Communication**: Slack ticket; no escalation
- **Target Resolution**: Next sprint or backlog

---

## 3. Incident Response Playbook

### Phase 1: Detection & Initial Assessment (0–5 min)

**Goal**: Confirm incident, page on-call team, begin triage.

**Checklist:**

- [ ] Confirm alert is not a false positive (check monitoring dashboard)
- [ ] Verify customer impact: affected regions, services, user count
- [ ] Capture initial metrics: error rate, latency, error logs
- [ ] Assign Incident Commander (IC) — typically on-call primary
- [ ] Create incident Slack thread in #incidents
- [ ] Set status page to "Investigating"
- [ ] Page secondary on-call if severity appears P0
- [ ] Document initial hypothesis in incident thread

**Commands:**

```bash
# Create incident in monitoring system
incident create --severity P0 --service api-gateway --title "Auth service timeout"

# Export initial logs
log export --start="5m ago" --service="auth-service" > incident.log

# Check infrastructure health
infra health-check --all-regions
```

### Phase 2: Diagnosis & Escalation Decision (5–30 min)

**Goal**: Root cause hypothesis, escalation if needed, engage functional experts.

**Checklist:**

- [ ] Review error messages, stack traces, recent deployments
- [ ] Check for infrastructure changes (deployments, config pushes, dependency updates)
- [ ] Pull metrics: CPU, memory, disk, network, database connections
- [ ] Query recent code changes (git log, deployment history)
- [ ] Assess customer communication need (>5 min = notify)
- [ ] Decide: Quick rollback vs. root cause debugging
- [ ] Escalate if diagnosis unclear after 15 min
- [ ] Update status page with more detail
- [ ] Notify affected customers via email/in-app banner

**Commands:**

```bash
# Recent deployments
deployment history --since="30m ago"

# Git changes to affected service
git log --oneline --since="3h ago" -- src/auth/

# Database performance
db stats --slow-queries
db connections --threshold=100

# Compare metrics to baseline
metrics compare --baseline=24h --current
```

### Phase 3: Mitigation (30–120 min)

**Goal**: Apply fix or workaround; validate resolution.

**Mitigation Options (in priority order):**

1. **Rollback** (5–10 min): If incident coincides with recent deploy
   ```bash
   deployment rollback --service auth-service --count=1
   # Wait 2 min for health checks
   healthcheck verify --service auth-service
   ```

2. **Kill switch / Feature toggle** (2–5 min): Disable problematic feature
   ```bash
   feature toggle off --key problematic_feature --reason "P0 incident"
   # Notify #incidents of toggle status
   ```

3. **Configuration hot-fix** (5–15 min): Adjust timeouts, cache TTL, rate limits
   ```bash
   config set --service api-gateway --key timeout_ms --value 10000
   config apply --validate
   ```

4. **Database intervention** (10–20 min): Kill stuck queries, scale capacity
   ```bash
   db kill-query --id <query_id>
   db scale --pool_size 200 --replicas 3
   ```

5. **Code fix & redeploy** (15–60 min): Last resort; requires review & validation
   ```bash
   git checkout -b fix/p0-incident
   # Make changes, test locally
   git commit -am "Fix: P0 incident description"
   deployment create --service auth --commit <sha> --canary=10%
   ```

### Phase 4: Validation & Communication (120+ min)

**Goal**: Confirm resolution, update stakeholders, begin RCA.

**Checklist:**

- [ ] Verify metrics return to baseline (error rate <0.01%, latency <500ms)
- [ ] Run synthetic tests from multiple regions
- [ ] Execute incident rollback test (if fix requires rapid rollback capability)
- [ ] Update status page: "Resolved"
- [ ] Send customer notification email with timeline & cause
- [ ] Post incident summary in Slack with metrics screenshot
- [ ] Schedule RCA meeting within 24 hours
- [ ] Create follow-up tickets for preventive measures
- [ ] Archive incident logs

**Customer Notification Template:**

```
Subject: [RESOLVED] Service Incident on June 22, 2–4 AM UTC

We experienced a 2-hour outage affecting authentication services.

Timeline:
2:00 AM - Alert triggered, incident declared
2:05 AM - Root cause identified: database connection pool exhaustion
2:45 AM - Mitigation applied: connection pool scaled from 50 to 200
2:50 AM - Service restored and validated
4:00 AM - Full monitoring resumed

Impact:
- 45 min of 100% unavailability
- Approximately 8,000 users affected
- Zero data loss

Cause:
A recent database optimization introduced a connection leak in the auth service. 
The leak exhausted available connections during peak load.

Prevention:
- Added connection pool monitoring alerting (triggers at 80% utilization)
- Automated connection leak detection in CI
- Increased pool size baseline from 50 to 150 connections

We sincerely apologize for the disruption. Questions? Reply to this email.
```

---

## 4. Customer Communication Templates

### Template A: Initial Notification (at 5 min if P0)

```
🚨 Incident Alert

We've detected an issue affecting [service/region]. Our team is investigating.
More updates in 15 minutes. Real-time status: [link to status page]
```

**Channels**: Email, in-app banner, SMS for critical customers

**Frequency**: Every 15 min until resolved

---

### Template B: Interim Update (30+ min unresolved)

```
Update on [Service] Incident (Ongoing)

Current Status: We've identified the root cause and are applying a fix.
- Issue: [brief technical description]
- Affected Users: ~[N]% of [region/feature]
- Estimated Resolution: [time or ETA if known]

We'll update again at [time] or immediately if resolved.
Status page: [link]
```

**Frequency**: Every 30 min

---

### Template C: Resolution Notification (incident closed)

```
✅ All Clear: [Service] Incident Resolved

The [Service] incident has been fully resolved as of [timestamp].

Timeline:
- Started: [time] UTC
- Root Cause: [1-sentence explanation]
- Duration: [minutes]

We've implemented [immediate fix or workaround].
Full RCA and prevention plan: [link to follow-up ticket]

Our apologies for the disruption.
```

---

### Template D: Post-Incident Apology (24h after high-impact)

```
Post-Incident Update: What Happened & What We're Doing

Yesterday's 2-hour outage impacted many of you. We failed to meet our reliability commitments.

Why It Happened:
[Detailed cause; don't blame individuals or single factors]

What Changed:
[3–5 concrete preventive measures committed to]

Timeline for Prevention:
- Week 1: Alerting improvements [ETA]
- Week 2: Circuit breaker pattern [ETA]
- Week 3: Load shedding graceful degradation [ETA]

Questions? Reach out to support@uitkit.com

Thank you for your patience.
```

---

## 5. Root Cause Analysis (RCA) Process

### Scheduling

- **P0**: RCA meeting within 24 hours of incident close
- **P1**: RCA meeting within 48 hours
- **P2**: RCA documented asynchronously, meeting optional
- **P3**: No RCA required

### RCA Meeting Agenda (60 min)

1. **Timeline Review** (10 min): Confirm incident phases, decisions, actions taken
2. **Root Cause Deep Dive** (20 min): Technical post-mortem, dependency chain
3. **Blameless Discussion** (15 min): Process gaps, monitoring blindspots, why prevention failed
4. **Prevention Plan** (15 min): Assign action items, prioritize, commit to timelines

### Participants

- Incident Commander
- Primary responder(s)
- Service owner
- Engineering Manager
- (Optional) Peer engineer from unrelated team for fresh perspective

### RCA Output Template

**Document location**: `/incident-reports/RCA-2026-06-22-auth-outage.md`

```markdown
# RCA: Authentication Service Outage (2026-06-22)

## Executive Summary
2-hour outage, 45 min of complete unavailability, 8,000 users affected.
Root cause: Connection pool leak in recent database optimization.

## Timeline
| Time (UTC) | Event | Action Owner |
|---|---|---|
| 02:00 | Alerts fire | Primary on-call |
| 02:05 | P0 declared | IC |
| 02:45 | Pool scaling applied | DB team |
| 02:50 | Verification complete | IC |

## Technical Root Cause
Connection objects not properly returned to pool after failed auth attempts.
Introduced in commit abc123 (database query optimization).

### Why Prevention Failed
- Connection leak detection not in CI
- Pool utilization alerting set to 95% (should be 80%)
- No automated regression test for connection pool behavior

## Prevention Actions
| Action | Owner | Due Date | Priority |
|---|---|---|---|
| Add connection pool monitoring alerting | DB team | 2026-06-29 | P0 |
| Implement automated leak detection test | QA | 2026-06-26 | P0 |
| Audit all connection management code | DB team | 2026-07-06 | P1 |
| Load test with 3x peak traffic | QA | 2026-07-10 | P1 |

## Lessons Learned
1. Database optimizations need connection pool regression testing
2. Alerting thresholds tuned too high for capacity headroom
3. Cross-team communication during incident was slow; improved IC handoff needed

## Appendix: Metrics
- Error rate spike: 2:00–2:50 AM (100% error rate)
- Latency baseline: 200 ms → peak 5000 ms
- Database connections: 40–200 (pool limit 50 before scaling)
```

### Action Items Tracking

All action items created in GitHub/Jira with labels: `incident-prevention`, `rca-2026-06-22`

```bash
# Example ticket creation
issue create \
  --title "Add connection pool monitoring alert" \
  --assignee db-team-lead \
  --due-date 2026-06-29 \
  --labels incident-prevention,rca-2026-06-22 \
  --description "Alert when pool utilization >80%. Link: [RCA doc]"
```

---

## 6. Handoff & Shift Change

### Pre-Handoff (Friday 8:55 AM UTC)

**Outgoing on-call:**

- [ ] Update incident status in handoff doc
- [ ] List all open incidents with owners
- [ ] Note any known flaky alerts or false positives
- [ ] Highlight recent deployments or risky changes
- [ ] Share personal contact for urgent escalation (24h post-handoff)

**Incoming on-call:**

- [ ] Review handoff doc (5 min read)
- [ ] Ask clarifying questions (5 min)
- [ ] Confirm PagerDuty is updated with new primary
- [ ] Test SMS notification
- [ ] Confirm Slack access to #oncall-schedule, #incidents

### Handoff Template

```markdown
# On-Call Handoff: Week of June 23, 2026

**Outgoing**: alice@uitkit.com
**Incoming**: bob@uitkit.com
**Backup**: charlie@uitkit.com (Friday 9 AM → Monday 9 AM)

## Active Incidents
None currently active.

## Recent Issues (Last 7 Days)
- 2026-06-22 02:00 UTC: Auth service outage (P0, resolved)
  - Status: RCA scheduled for 2026-06-23 10 AM UTC
  - Owner: alice
  - Risk: Connection pool exhaustion may recur; watch metrics

## Risky Changes (Last 48h)
- Deployment: api-gateway v2.4.1 (2026-06-21)
  - Includes load balancer config change; watch latency metrics
  - If issues: rollback command pre-tested in #dev-alerts

## Known Flaky Alerts
- `database-replica-lag-high` fires intermittently; likely false positive pending investigation
- Expected: 2–3 false alerts per week; safe to acknowledge and snooze 30 min

## Escalation Contacts
- VP Engineering: vp@uitkit.com (emergency only, 9 AM–5 PM)
- Database Team Lead: db-lead@uitkit.com (pool issues)
- Frontend Team Lead: frontend-lead@uitkit.com (UI crashes)

## Questions?
Ping alice in Slack or call +1-555-0123 (available until Friday 10 AM UTC).
```

---

## 7. Escalation Checklist

**Use when incident unresolved after:**
- P0: 30 minutes
- P1: 4 hours
- P2: 8 hours

```markdown
## Escalation Checklist

- [ ] Confirm primary on-call has been actively troubleshooting (not stuck)
- [ ] Verify secondary on-call is informed and standing by
- [ ] Check if issue is known (search RCA database & #incidents)
- [ ] Decide: Do we need different expertise? (DB, infra, frontend, etc.)
- [ ] Brief Engineering Manager with current hypothesis & stuck points
- [ ] Page specialist team on-call if needed (e.g., database oncall)
- [ ] Update status page and customer notification (escalation = longer impact)
- [ ] If >2h unresolved, consider: Feature toggle, rollback, or graceful degradation
- [ ] Post escalation summary in #incidents (what changed, who involved)
```

---

## 8. Post-Incident Review Cycle

### Weekly Incident Review (Tuesdays 10 AM UTC)

**Attendees**: Engineering Manager, IC leads, rotating on-call (learn perspective)

**Agenda**:

1. P0/P1 incidents from past week: 5 min each
2. Trend analysis: MTTR, MTBF, top services
3. Action item closure: Track prevention tickets
4. On-call feedback: Pain points, process improvements

**Output**: Update `/incident-data/weekly-summary.md`

---

### Monthly Incident Metrics

**Track and review:**

- Total incidents: P0, P1, P2 count
- Mean time to first response (MTTR)
- Mean time to resolution (MTTR)
- Customer impact: Affected users × duration
- Prevention action closure rate

**Goal**: <2 P0 incidents per month, <8 hour average MTBF for P1+

---

## 9. Tools & Access

### Required Tooling

| Tool | Purpose | Access |
|---|---|---|
| PagerDuty | On-call scheduling, alerting | All engineers |
| Slack #incidents | Real-time incident thread | All engineers |
| Monitoring dashboard | Metrics, infrastructure health | All engineers |
| Logs (ELK/Datadog) | Error traces, debugging | All engineers |
| Deployment system | Rollback, kill switches | Primary on-call + Manager |
| Status page | External customer comms | Manager + IC |
| GitHub/RCA docs | Incident history, RCA archive | All engineers |

### Setup Commands

```bash
# Verify PagerDuty access
oncall status

# Test alert channels
alert test --channel slack
alert test --channel sms

# Access logs
logs tail --service auth-service --since 1h

# Check deployment permissions
deployment validate-permissions
```

---

## 10. Glossary

- **IC (Incident Commander)**: Primary on-call taking lead on diagnosis & decisions
- **P0/P1/P2**: Severity classifications (see Section 2)
- **MTTR**: Mean time to respond (alert → human acknowledgment)
- **MTBF**: Mean time between failures (incident close → next incident)
- **Rollback**: Reverting to previous deploy or config state
- **Kill switch**: Feature toggle to instantly disable problematic code path
- **RCA**: Root cause analysis; blameless post-incident review
- **Handoff**: Shift change between on-call rotations

---

## References & Updates

- **Last Updated**: 2026-06-22
- **Review Cycle**: Quarterly (update after major incidents or tooling changes)
- **Maintainer**: Engineering Manager (@incident-team)
- **Related Docs**: 
  - `/incident-reports/` — Historical RCA database
  - `/monitoring/ALERTING_RULES.md` — Alert thresholds & definitions
  - `/monitoring/DASHBOARDS.md` — Key metrics dashboards

