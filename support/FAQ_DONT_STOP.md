# FAQ: Goals, Interruption, Resumption & Workflows

Frequently asked questions about managing multi-step goals, interrupting/resuming workflows, token budget handling, combining objectives, and team approval processes in Claude Code.

---

## Goal Management & Interruption

### Q: Can I interrupt a goal mid-execution without losing progress?

**A:** Yes. Interruption behavior depends on the goal's execution model:

```
STREAMING GOALS (real-time):
- Ctrl+C or close shell → Goal immediately paused
- State saved to .claude/goal-state/{goal_id}/checkpoint.json
- Can resume with: /goal resume <goal_id>

BATCH/SCHEDULED GOALS:
- Stop signal processed at next checkpoint
- All intermediate work preserved
- Resume picks up from last checkpoint

WORKFLOW GOALS (multi-agent):
- Running agents are notified of pause
- Current task completes (not aborted mid-operation)
- Resume restarts remaining workflow steps
```

Example workflow interruption:

```yaml
# Workflow: deploy-pipeline
steps:
  - name: build       # ← Complete
  - name: test        # ← In progress → Paused
  - name: deploy      # ← Queued
  - name: smoke-test  # ← Queued

# Interrupt received during "test"
# test continues to completion, then pauses
# Resume restarts from "deploy"
```

### Q: How do I know if a goal was interrupted or completed?

**A:** Check goal status:

```bash
/goal status <goal_id>

# Output example:
# {
#   "id": "goal_abc123",
#   "name": "refactor-api",
#   "status": "interrupted",     # or "completed", "failed", "running"
#   "progress": "35/50 steps",
#   "interrupted_at": "2026-06-22T14:32:10Z",
#   "reason": "User pressed Ctrl+C",
#   "last_checkpoint": "step_23_api_validation.json",
#   "can_resume": true
# }
```

### Q: What gets lost when I interrupt a goal?

**A:** Only uncommitted changes in the current working task are lost:

```
PRESERVED:
✓ Completed steps and their outputs
✓ Intermediate files written to disk
✓ Git commits already pushed
✓ Environment state from completed steps
✓ Logs and execution history

LOST:
✗ In-progress computation (e.g., LLM inference at moment of interrupt)
✗ Uncommitted code changes (if in edit mode)
✗ Temporary files (unless marked for preservation)
✗ Cached memory not yet serialized
```

To protect uncommitted work:

```bash
# Before interrupting, commit:
git add -A
git commit -m "WIP: checkpoint before interrupt"

# Then safely interrupt
# On resume, branch is intact
```

### Q: Can I interrupt only a specific agent in a workflow?

**A:** Yes, use targeted pause:

```bash
# Pause entire workflow
/goal pause <goal_id>

# Pause specific agent (continues others)
/goal pause-agent <goal_id> --agent worker_3

# Resume agent
/goal resume-agent <goal_id> --agent worker_3
```

Workflow execution continues around paused agents. Use this for:
- Debugging one agent without stopping the pipeline
- Waiting for external approval on one step
- Throttling a resource-heavy agent

---

## Resumption & Checkpoint Recovery

### Q: How do I resume a goal after a system crash?

**A:** Goals are automatically recoverable from checkpoints:

```bash
# View interrupted goals
/goal list --status interrupted

# Resume from last checkpoint
/goal resume <goal_id>

# Or resume with modifications
/goal resume <goal_id> --skip-steps deploy,smoke-test
```

Recovery process:

```
1. Load last checkpoint: .claude/goal-state/{goal_id}/checkpoint.json
2. Verify disk state hasn't changed
3. Restore workspace to checkpoint state
4. Resume from step {last_completed + 1}
5. Update logs with "Resumed from crash"
```

### Q: Can I manually edit a checkpoint before resuming?

**A:** Yes, for advanced recovery scenarios:

```bash
# Export checkpoint for inspection
/goal export-checkpoint <goal_id> --output ./my_checkpoint.json

# Edit checkpoint (if you know what you're doing)
# Modify variables, skip steps, adjust state...

# Validate checkpoint integrity
/goal validate-checkpoint ./my_checkpoint.json

# Import and resume
/goal resume <goal_id> --from ./my_checkpoint.json
```

Checkpoint format:

```json
{
  "goal_id": "goal_abc123",
  "step_index": 23,
  "timestamp": "2026-06-22T14:32:10Z",
  "workspace_state": {
    "cwd": "/path/to/project",
    "git_branch": "feature/api-refactor",
    "git_commit": "a1b2c3d4e5f6g7h8"
  },
  "variables": {
    "api_version": "v2",
    "endpoints": [...]
  },
  "completed_steps": [0, 1, 2, ..., 22],
  "pending_steps": [23, 24, 25, ...]
}
```

### Q: How long are checkpoint histories retained?

**A:** Retention policy:

```
Default: 30 days
Per-goal override:
  /goal set-retention <goal_id> --days 90

Checkpoint cleanup:
  /goal clean-checkpoints --older-than 45d

Max checkpoints per goal: 100
(Oldest auto-deleted when limit exceeded)
```

### Q: Can I roll back a goal to a previous checkpoint?

**A:** Yes, using checkpoint history:

```bash
# List all checkpoints for goal
/goal list-checkpoints <goal_id>

# Output:
# Checkpoint 1: step_5 (2026-06-22 10:00:00) ← Earliest
# Checkpoint 2: step_15 (2026-06-22 12:30:00)
# Checkpoint 3: step_23 (2026-06-22 14:32:10) ← Latest

# Roll back to earlier checkpoint
/goal rollback <goal_id> --checkpoint 2

# Confirm changes before executing
/goal rollback <goal_id> --checkpoint 2 --dry-run
# Shows what will be undone and redone

# Execute rollback
/goal rollback <goal_id> --checkpoint 2 --force
```

Rollback behavior:

```
1. Revert workspace to checkpoint 2 state
2. Undo all changes between checkpoint 2 and current
3. Resume execution from step 16
4. Previous outputs preserved in .claude/rollbacks/goal_abc123/
```

---

## Token Budget & Resource Constraints

### Q: What happens when a goal runs out of tokens mid-execution?

**A:** Goals are interrupted at a safe checkpoint and require explicit action:

```
Scenario: Goal consuming 95% of token budget mid-step

Behavior:
1. LLM call completes (partial response allowed)
2. Goal marked as "paused-low-tokens"
3. Current work saved to checkpoint
4. Status message: "Token budget low. Resume after reset or upgrade."

Options:
a) Wait for daily token reset (if available)
b) Upgrade token limits (premium account)
c) Resume with reduced scope (skip heavy-compute steps)
d) Cancel and start fresh on next quota period
```

Check token status:

```bash
/goal status <goal_id> --include-tokens

# Output:
# {
#   "goal_id": "goal_abc123",
#   "status": "paused-low-tokens",
#   "tokens": {
#     "allocated": 100000,
#     "used": 95000,
#     "remaining": 5000,
#     "usage_by_step": {...}
#   },
#   "quota_reset": "2026-06-23T00:00:00Z"
# }
```

### Q: How do I estimate tokens needed for a goal before running it?

**A:** Use the dry-run estimator:

```bash
/goal dry-run <goal_def_file> --estimate-tokens

# Output:
# Estimated token usage: 45,000 (±15%)
# Breakdown:
#   - Code analysis: 12,000
#   - LLM inference (5 calls): 20,000
#   - Git operations: 2,000
#   - Other: 11,000
#
# Your budget: 100,000
# Margin: 55,000 (55%)
# Status: SAFE TO RUN
```

### Q: Can I pause a goal to avoid hitting token limit, then resume later?

**A:** Yes, this is a common pattern:

```bash
# Proactively pause when 80% of tokens consumed
/goal pause <goal_id> --when-tokens-percent 80

# Goal auto-pauses at 80% usage
# Manually resume next day after quota reset
/goal resume <goal_id> --after-quota-reset
```

Token-aware workflow:

```yaml
# goal: large-refactor
name: large-refactor
token_budget: 100000
pause_at_percent: 80
steps:
  - name: analyze-codebase
    token_estimate: 15000
  - name: plan-refactor
    token_estimate: 10000
  - name: implement-changes      # ← Might trigger pause
    token_estimate: 50000
  - name: test-and-validate
    token_estimate: 20000
```

### Q: What if a single step exceeds remaining token budget?

**A:** Goal enters a hold state:

```
Scenario: Step requires 30,000 tokens but only 25,000 remaining

Behavior:
1. Step not executed
2. Goal paused with status "awaiting-tokens"
3. Options presented:
   a) Skip step (if optional)
   b) Reduce step scope (e.g., analyze fewer files)
   c) Split step into smaller chunks
   d) Wait for quota reset
   e) Purchase token top-up

# Auto-skip optional steps
/goal resume <goal_id> --auto-skip-over-budget

# Or split into smaller steps
/goal split-step <goal_id> --step 3 --chunks 2
```

### Q: How do token limits interact with concurrent goals?

**A:** Tokens are pooled at account level:

```
Total token budget: 100,000 / day

Goal A (data-pipeline):   Running, used 45,000
Goal B (code-review):     Running, used 30,000
Goal C (documentation):   Queued

Available for Goal C: 100,000 - 45,000 - 30,000 = 25,000

If Goal C requires >25,000:
  - Queued with status "waiting-for-tokens"
  - Executes when other goals complete
  - Or Goal C pauses when Goal A/B finish
```

Monitor token sharing:

```bash
/goal list --include-tokens

# Output:
# Budget: 100,000 total
# ├─ Goal A (data-pipeline): 45,000 (45%)
# ├─ Goal B (code-review): 30,000 (30%)
# └─ Available: 25,000 (25%)
```

---

## Combining & Composing Goals

### Q: Can I run multiple goals concurrently?

**A:** Yes, with token/resource constraints:

```bash
# Start goal A
/goal run refactor-api.yaml &

# Start goal B (different task)
/goal run update-docs.yaml &

# Monitor both
/goal list --running

# Both execute concurrently, sharing token budget
```

Concurrency model:

```
Tokens: Shared pool (watch for contention)
Workspace: Isolated per-goal (can operate on same repo safely)
Sandboxes: Separate (no cross-goal file conflicts)
Git: Safe (each goal has own branch if needed)
```

### Q: How do I chain goals (one depends on another)?

**A:** Use goal dependencies:

```yaml
# goal: release-pipeline
name: release-pipeline
type: sequential

goals:
  - id: build
    goal_file: ./goals/build.yaml
    
  - id: test
    goal_file: ./goals/test.yaml
    depends_on: [build]           # ← Wait for build to complete
    
  - id: deploy-staging
    goal_file: ./goals/deploy-staging.yaml
    depends_on: [test]
    approval_required: true       # ← Requires manual approval
    
  - id: smoke-test-staging
    goal_file: ./goals/smoke-test.yaml
    depends_on: [deploy-staging]
    
  - id: deploy-prod
    goal_file: ./goals/deploy-prod.yaml
    depends_on: [smoke-test-staging]
    approval_required: true       # ← Manual approval before prod

# Run entire pipeline
/goal run release-pipeline.yaml

# Monitor execution
/goal status release-pipeline --watch
```

### Q: Can I combine outputs from multiple goals?

**A:** Yes, using output bindings:

```yaml
# goal: multi-step-report
name: generate-report

goals:
  - id: collect-metrics
    goal_file: ./goals/metrics.yaml
    outputs:
      - name: metrics_json
        path: ./output/metrics.json
  
  - id: collect-logs
    goal_file: ./goals/logs.yaml
    outputs:
      - name: logs_archive
        path: ./output/logs.tar.gz

  - id: generate-report
    goal_file: ./goals/report.yaml
    depends_on: [collect-metrics, collect-logs]
    # Access previous outputs
    inputs:
      - from: collect-metrics
        output: metrics_json
        as: /tmp/metrics.json
      - from: collect-logs
        output: logs_archive
        as: /tmp/logs.tar.gz
```

In the report goal:

```bash
# Inputs available at specified paths
cat /tmp/metrics.json
tar -tzf /tmp/logs.tar.gz
```

### Q: Can I run the same goal multiple times with different parameters?

**A:** Yes, using goal templates:

```yaml
# goal: test-matrix
name: test-across-versions

variables:
  python_versions: [3.8, 3.9, 3.10, 3.11]
  database_types: [postgres, mysql]

steps:
  - name: run-test-matrix
    # Creates cross-product: 4 versions × 2 databases = 8 runs
    foreach:
      - var: python_versions
      - var: database_types
    goal_file: ./goals/test.yaml
    params:
      py_version: "{{ python_versions }}"
      db_type: "{{ database_types }}"
```

Execute:

```bash
/goal run test-matrix.yaml

# Automatically spawns 8 concurrent goal instances
# Each with different parameters
# Collects results when all complete
```

---

## Team Workflows & Approval

### Q: What is the team approval workflow for goals?

**A:** Multi-step approval process:

```yaml
# goal: production-deploy
name: production-deploy
approval_policy:
  required_for: [deploy, post-deploy-cleanup]
  approvers: [team-lead, devops-engineer]
  min_approvals: 2
  timeout: 3600  # 1 hour to approve

steps:
  - name: build-artifacts
    # No approval needed
  
  - name: deploy
    # Requires approval before executing
    approval_required: true
    
  - name: smoke-test
    # No approval needed
    
  - name: post-deploy-cleanup
    approval_required: true
```

Execution flow:

```
1. Goal starts, runs through build-artifacts
2. Pauses before "deploy" step
3. Sends approval request to [team-lead, devops-engineer]
4. Waits for 2 approvals (or 1 hour timeout)
5. On approval: continues to deploy
6. After deploy: pauses again before post-deploy-cleanup
7. Requires new approval round
8. On approval: executes cleanup
9. Goal complete
```

### Q: How do I request approval for a goal?

**A:** Approval is automatic if configured; manual approval via:

```bash
# Check pending approvals
/goal approvals

# Output:
# PENDING APPROVALS:
# 1. Goal: production-deploy
#    Step: deploy
#    Requested by: alice@company.com
#    Requested at: 2026-06-22 14:22:10
#    Approvers: [team-lead, devops-engineer]
#    Approvals: 1/2

# View details
/goal approval-details <goal_id> <step_name>

# Approve (if authorized)
/goal approve <goal_id> <step_name> --reason "Looks good, metrics normal"

# Reject
/goal reject <goal_id> <step_name> --reason "Wait for on-call sync"
```

### Q: Can I set up conditional approvals (e.g., skip if test passed)?

**A:** Yes, using conditional approval rules:

```yaml
# goal: auto-deploy-safe-changes
name: auto-deploy-safe-changes
approval_policy:
  rules:
    - step: deploy-staging
      # No approval needed (safe environment)
    
    - step: deploy-prod
      # Conditional approval
      approval_required: true
      unless:
        - all_tests_pass: true
        - no_breaking_changes: true
        - coverage_increase: true
      approvers: [team-lead]
```

Execution:

```
1. Run tests
2. If all_tests_pass AND coverage_increase → Skip approval
3. Else → Require approval before deploy-prod
```

### Q: How do I notify team members about approval requests?

**A:** Notifications are automatic; configure channels:

```yaml
# In project settings
approval_notifications:
  enabled: true
  channels:
    - slack:
        webhook: https://hooks.slack.com/...
        mentions: [@team-lead, @devops]
    - email:
        to: [team-lead@company.com, devops@company.com]
        template: standard
    - pagerduty:
        escalation_policy: prod-deploy
```

Example Slack message:

```
🔔 Approval Requested: production-deploy / deploy

Requested by: alice@company.com
Requires: 2 approvals from [team-lead, devops-engineer]

Requested at: 2026-06-22 14:22:10
Timeout: 2026-06-22 15:22:10 (1 hour)

[View Details] [Approve] [Reject]
```

### Q: What if an approver doesn't respond in time?

**A:** Configurable timeout behavior:

```yaml
approval_policy:
  timeout: 3600  # 1 hour
  timeout_action: fail      # or "auto-approve", "escalate"
  
  escalation:
    after_timeout: true
    escalate_to: manager
    retry_attempts: 2
```

Timeout scenarios:

```
Scenario A: timeout_action = fail
1. Approval request sent
2. 1 hour passes, no response
3. Goal fails with status "approval-timeout"
4. Option to retry or cancel

Scenario B: timeout_action = auto-approve
1. Approval request sent
2. 1 hour passes, no response
3. Auto-approved (useful for non-critical steps)
4. Goal continues

Scenario C: timeout_action = escalate
1. Approval request sent
2. 1 hour passes, no response
3. Escalates to manager (higher level approver)
4. Manager must approve within new timeout
```

### Q: Can multiple teams approve a single goal?

**A:** Yes, using approval groups:

```yaml
# goal: major-feature-release
name: major-feature-release
approval_policy:
  groups:
    - name: technical-review
      approvers: [senior-engineer-1, senior-engineer-2]
      min_approvals: 1
      
    - name: product-review
      approvers: [product-manager, product-lead]
      min_approvals: 2
      
    - name: security-review
      approvers: [security-engineer]
      min_approvals: 1
  
  all_groups_must_approve: true  # ← All groups required

steps:
  - name: deploy
    approval_required: true
```

Execution:

```
Approval request triggers 3 groups simultaneously:
- Technical review: needs 1/2
- Product review: needs 2/2
- Security review: needs 1/1

Goal waits for ALL groups to approve before proceeding.
```

### Q: How do I audit approval decisions?

**A:** Approval logs are automatically maintained:

```bash
# View approval history
/goal approval-log <goal_id>

# Output:
# Approval History for: production-deploy
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# Step: deploy
# │
# ├─ Requested at: 2026-06-22 14:22:10
# │  Requested by: alice@company.com
# │  Required: 2 approvals from [team-lead, devops-engineer]
# │
# ├─ Approved by: bob@company.com (team-lead)
# │  Time: 2026-06-22 14:24:33
# │  Reason: "Metrics look good"
# │
# ├─ Approved by: charlie@company.com (devops-engineer)
# │  Time: 2026-06-22 14:25:01
# │  Reason: "Deployment slot available"
# │
# └─ Proceeded at: 2026-06-22 14:25:05

# Export approval audit trail
/goal export-audit <goal_id> --format json --output ./audit.json
```

---

## Complex Scenarios

### Q: How do I resume a multi-agent workflow where one agent failed?

**A:** Retry specific agents or skip to next step:

```bash
# Get workflow status
/goal status <goal_id> --detailed

# Output:
# Workflow: data-pipeline
# Status: paused-agent-failure
# ├─ Agent: data-extractor (COMPLETED)
# ├─ Agent: data-validator (FAILED)
# │  Error: "Schema mismatch on field X"
# ├─ Agent: data-transformer (PENDING)
# └─ Agent: data-loader (PENDING)

# Option A: Retry failed agent
/goal retry-agent <goal_id> --agent data-validator

# Option B: Skip failed agent and continue
/goal skip-agent <goal_id> --agent data-validator --proceed-to data-transformer

# Option C: Modify input and retry
/goal retry-agent <goal_id> --agent data-validator --override-input input.json
```

### Q: Can I pause to manually inspect intermediate results, then resume?

**A:** Yes, this is a common debugging workflow:

```bash
# Run goal but pause after step N
/goal run refactor.yaml --pause-after-step 5

# Goal completes steps 1-5, then pauses
# Outputs available at .claude/goal-state/{goal_id}/outputs/

# Inspect outputs
cat .claude/goal-state/goal_abc123/outputs/step_5/refactored_api.py

# Make manual adjustments if needed
vim .claude/goal-state/goal_abc123/outputs/step_5/refactored_api.py

# Resume execution with your manual edits
/goal resume <goal_id> --use-local-outputs
```

### Q: How do I combine goals with human-in-the-loop approval?

**A:** Use approval steps with manual interventions:

```yaml
# goal: ai-assisted-code-review
name: ai-assisted-code-review

steps:
  - name: analyze-pr
    # AI analyzes pull request
    
  - name: wait-for-human-review
    type: approval
    approvers: [human-reviewer]
    message: "AI analysis complete. Please review suggestions."
    
  - name: apply-suggestions
    # Apply approved suggestions
    depends_on: [wait-for-human-review]
    
  - name: final-check
    # AI validates final state
```

### Q: Can I pause a workflow, modify goals, and resume?

**A:** No, but you can checkpoint and restart with modifications:

```bash
# Current workflow paused
/goal status workflow_xyz

# Export current state (for your records)
/goal export-state workflow_xyz --output ./state_backup.json

# Cancel current workflow
/goal cancel workflow_xyz --keep-outputs

# Modify workflow definition
vim release-pipeline.yaml  # Change approvers, add step, etc.

# Start fresh workflow
/goal run release-pipeline.yaml

# Outputs from cancelled workflow still available for reference
```

---

## Performance & Optimization

### Q: How do I run goals with reduced scope to save tokens?

**A:** Use step skipping and parameters:

```bash
# Run with optional steps skipped
/goal run refactor.yaml --skip-steps analyze-coverage,generate-report

# Or use parameters to reduce scope
/goal run refactor.yaml --param "analyze_dirs=[src/api]" --param "affected_files_only=true"

# Dry-run to see what executes
/goal dry-run refactor.yaml --skip-steps analyze-coverage --estimate-tokens
```

### Q: Can I parallelize independent steps to finish faster?

**A:** Yes, define parallel execution:

```yaml
# goal: multi-file-refactor
name: multi-file-refactor

steps:
  - name: analyze-all-files
    # This completes before parallelization
    
  - name: refactor-in-parallel
    # Process multiple files concurrently
    foreach:
      - var: files
        parallel: true           # ← Run in parallel
        max_workers: 4           # ← Max 4 concurrent
    steps:
      - name: refactor-file
        file: "{{ files }}"
```

### Q: What's the recommended way to debug token usage?

**A:** Enable token tracing:

```bash
# Run with detailed token logging
/goal run refactor.yaml --trace-tokens --log-level debug

# View token breakdown
cat .claude/goal-state/goal_abc123/token-report.json

# Output:
# {
#   "total_tokens": 45000,
#   "steps": [
#     {
#       "step": "analyze",
#       "tokens_used": 15000,
#       "llm_calls": 3,
#       "tokens_per_call": [5000, 5000, 5000]
#     },
#     {
#       "step": "implement",
#       "tokens_used": 25000,
#       "llm_calls": 1,
#       "tokens_per_call": [25000]
#     }
#   ]
# }
```

---

## Troubleshooting

### Q: Goal resumed but workspace state seems wrong?

**A:** Verify checkpoint integrity:

```bash
# Check workspace match
/goal check-workspace <goal_id>

# Output:
# Workspace check for: goal_abc123
# ├─ Working directory: /Users/tushar/Desktop/UitKit ✓
# ├─ Git branch: feature/api-refactor ✓
# ├─ Git commit: a1b2c3d4e5f6g7h8 ✓
# ├─ Staged changes: none ✓
# └─ Unstaged changes: DETECTED ⚠
#
# WARNING: Unstaged changes exist that weren't in checkpoint
# Options:
#   a) Commit changes: git add -A && git commit -m "..."
#   b) Discard changes: git restore .
#   c) Force resume anyway: /goal resume --force

# Restore workspace to checkpoint state
/goal restore-workspace <goal_id>
```

### Q: Approval request not received by team?

**A:** Check notification configuration:

```bash
# Verify notification channels
/goal config show-approvals

# Test notification delivery
/goal test-notification --channel slack
/goal test-notification --channel email

# Re-send notification
/goal approval-notify <goal_id> <step_name> --retry
```

### Q: Token estimate was wrong, goal ran out early?

**A:** Adjust future estimates:

```bash
# View actual vs estimated
/goal token-report <goal_id>

# Output:
# Estimated: 45,000
# Actual: 52,000
# Variance: +7,000 (15.6%)

# Update goal definition with new estimate
/goal update-estimate <goal_id> --new-estimate 60000

# Future runs use improved estimate
```

---

## Best Practices

### Q: What's the recommended approval strategy for production deploys?

**A:** Use tiered approval:

```yaml
approval_policy:
  # Staging deployment: single reviewer
  staging:
    approvers: [on-call-engineer]
    min_approvals: 1
  
  # Production deployment: multiple reviewers + time window
  production:
    approvers: [team-lead, devops-engineer, product-manager]
    min_approvals: 2
    require_all_approvers_groups:
      - technical: [team-lead, devops-engineer]
      - product: [product-manager]
    earliest_deployment: "business-hours"  # Not on weekend
    notification:
      slack: @channel  # Broadcast to team
```

### Q: How should I structure goals for maximum reusability?

**A:** Use templates and parameters:

```yaml
# Template goal: generic-deploy
name: "{{ deployment_name }}-deploy"
parameters:
  - name: environment
    type: enum
    values: [staging, prod]
  - name: version
    type: string
  - name: approvers
    type: list
    default: [team-lead]

approval_policy:
  approvers: "{{ approvers }}"

steps:
  - name: deploy-to-{{ environment }}
    params:
      version: "{{ version }}"
```

Use template:

```bash
/goal run deploy.yaml \
  --param deployment_name=api \
  --param environment=prod \
  --param version=2.5.0 \
  --param approvers=[alice,bob,charlie]
```

### Q: What's the best way to handle goal failures?

**A:** Use recovery rules:

```yaml
# goal: robust-deploy
failure_recovery:
  rules:
    - step: deploy
      on_failure: rollback
      retry: 2
      timeout: 300
    
    - step: smoke-test
      on_failure: escalate
      escalate_to: team-lead
      alert: pagerduty
```

Manual recovery:

```bash
# On failure, review status
/goal status <goal_id> --include-logs

# Option A: Retry step
/goal retry-step <goal_id> --step deploy

# Option B: Manual fix, then resume
# (fix issue manually)
git add -A && git commit -m "Manual fix for deploy"
/goal resume <goal_id> --force-retry
```

