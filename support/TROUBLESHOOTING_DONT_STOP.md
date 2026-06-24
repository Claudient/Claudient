# Troubleshooting Guide: Don't Stop — Diagnose & Recover

This guide covers the three most common failure modes in UitKit workflows, agents, and Claude Code interactions. Each includes diagnosis steps and proven recovery paths.

---

## 1. Goal Not Progressing (Workflow Stalled, No Output)

### Symptoms
- Workflow starts but produces no visible output for 30+ seconds
- Agent spawned but never reports back
- Task appears "in_progress" indefinitely
- No errors in logs, just silence

### Diagnosis

**Step 1: Check hook execution**
```bash
cat ~/.claude/logs/hooks.log | tail -50
```
Look for:
- `hook_start` / `hook_end` timestamps
- Any `ERROR` or `FATAL` lines
- Hooks firing for unrelated events (noise in logs)

**Step 2: Check agent output**
```bash
ps aux | grep -E "claude|python|node" | grep -v grep
```
Verify the process is actually running (not hung). If hung, move to recovery.

**Step 3: Check for silent failures in tasks**
```bash
cat ~/.claude/task-queue.log | grep -A5 "in_progress"
```
Look for tasks marked `in_progress` with no completion timestamp.

**Step 4: Check token budget**
```bash
# If using a workflow orchestrator:
grep "token_budget" ~/.claude/workflows/current.log
grep "tokens_used" ~/.claude/workflows/current.log
```
If `tokens_used >= token_budget`, you've hit the ceiling (see issue #3).

### Recovery

**Option A: Resume with reduced scope**
1. Identify which step stalled (check task list: `TaskList`)
2. Create a new narrower task targeting just that step
3. Invoke with lower token budget or fewer parallel operations

**Option B: Restart with instrumentation**
```bash
# Enable debug logging
export CLAUDE_DEBUG=true
# Re-run the workflow with verbose output
npm run debug-workflow -- --workflow <name> --verbose
```

**Option C: Force-complete stalled tasks**
```bash
TaskUpdate
# Set status to "completed" for any task stuck > 5 minutes
# This unblocks dependent tasks (use only if you verified the upstream work)
```

---

## 2. Token Budget Exceeded (Mid-Workflow Cutoff)

### Symptoms
- Workflow halts mid-execution with no error message
- Response truncates mid-sentence
- Last output is incomplete JSON or malformed
- Agent says "token limit reached" or similar

### Diagnosis

**Step 1: Check estimated vs actual tokens**
```bash
# For current session:
curl -s http://localhost:8000/metrics | jq '.tokens'

# Or check the workflow log:
tail -100 ~/.claude/workflows/execution.log | grep -i token
```

**Step 2: Identify the expensive operation**
Common culprits:
- Large file reads (>50KB in one call)
- Deep git history traversals (`git log --all --graph`)
- Cartesian product searches (find + grep combinations)
- Recursive file reads without limits

**Step 3: Verify budget allocation**
Check workflow config:
```bash
cat ~/.claude/workflows/<name>.json | jq '.token_budget'
```

### Recovery

**Option A: Split the work**
1. Identify the token-expensive step
2. Create a follow-up workflow with a fresh token budget
3. Pass results via file or environment variable

Example:
```bash
# Workflow A: Initial analysis (token_budget: 50k)
# Output: findings.json

# Workflow B: Deep-dive on findings (token_budget: 100k)
# Input: findings.json from Workflow A
```

**Option B: Reduce input size**
```bash
# Instead of reading entire file:
head -500 large_file.txt | process

# Instead of full git history:
git log --max-count=20 --oneline

# Instead of recursive find:
find . -maxdepth 3 -type f
```

**Option C: Increase budget (if available)**
```bash
# In workflow config:
"token_budget": 200000  # increase from 100000
```
**Warning**: Higher budget = longer execution time and higher API cost.

**Option D: Use streaming or pagination**
```bash
# For large responses, enable streaming:
curl --stream http://localhost:8000/api/work

# For file processing, chunk it:
split -l 1000 large_file.txt chunk_
# Process each chunk separately
```

---

## 3. Task Stuck in Loop (Infinite Retry, Repeated State)

### Symptoms
- Same task retries indefinitely (loop counter visible in logs)
- Output repeats identically across cycles
- CPU/memory usage climbs over time
- Process never terminates without manual intervention

### Diagnosis

**Step 1: Identify the looping task**
```bash
# Check which task is repeating:
grep "retry" ~/.claude/task-queue.log | tail -20
grep "attempt" ~/.claude/task-queue.log | tail -20

# Count occurrences of the same task ID:
grep "task_id=ABC123" ~/.claude/task-queue.log | wc -l
```

**Step 2: Check the retry condition**
```bash
# In CLAUDE.md or .claude/settings.json:
cat CLAUDE.md | grep -A10 "retry"
cat .claude/settings.json | jq '.hooks[] | select(.trigger | contains("retry"))'
```

**Step 3: Verify the exit condition**
Common loop-causing patterns:
- Task depends on itself (circular dependency)
- No terminal state defined (task never reaches `completed` or `failed`)
- Retry condition never resolves (e.g., waiting for external API that never responds)

**Step 4: Check for blocking dependencies**
```bash
TaskList  # Look for tasks with circular "blockedBy" references
TaskGet <task_id>  # Inspect full dependency graph
```

### Recovery

**Option A: Break the loop immediately**
```bash
# Force-kill the stuck process:
pkill -f "claude.*<workflow_name>"

# Or in a more targeted way:
TaskStop <task_id>
```

**Option B: Fix the exit condition**
1. Open the task or hook that's looping
2. Add an explicit counter or time-based exit:

```javascript
// Example: Add max-retry limit
if (attempts > 5) {
  task.status = "failed";  // Force exit
  return;
}
```

3. Or add a timeout:
```bash
# In shell script:
timeout 30 ./retry-loop.sh  # Kill after 30s
```

**Option C: Remove circular dependency**
```bash
TaskUpdate
# Remove the circular blockedBy reference:
{
  "taskId": "ABC123",
  "addBlockedBy": []  // Clear dependencies
}
```

**Option D: Implement a state change**
If the loop is "waiting for external event", add a timeout fallback:

```javascript
// Instead of infinite retry:
if (Date.now() - startTime > 60000) {  // 60s timeout
  console.log("Timeout reached, proceeding with fallback");
  return fallbackValue;
}
```

---

## General Recovery Checklist

Use this when none of the above fits:

- [ ] Check logs: `~/.claude/logs/` (most recent file)
- [ ] Check task state: `TaskList` — any stuck tasks?
- [ ] Check for hanging processes: `ps aux | grep claude`
- [ ] Review recent commits: `git log --oneline -10`
- [ ] Restart the daemon: `pkill -f "claude"; npm run dev`
- [ ] Clear cache: `rm -rf ~/.claude/cache/*`
- [ ] Re-read the CLAUDE.md rules (behavior may have changed)
- [ ] Check memory file for context: `cat ~/.claude/projects/*/memory/MEMORY.md`

---

## Escalation Path

If none of the above resolves the issue:

1. **Collect logs**: `tar -czf debug-logs.tar.gz ~/.claude/logs/`
2. **Describe the state**: Run `npm run debug-info` and attach output
3. **File an issue** with:
   - Exact reproduction steps
   - Debug logs
   - Task/workflow config (redacted)
   - What you tried from this guide

---

## Prevention Tips

- Set `max_retries: 3` in task definitions (prevents infinite loops)
- Use `timeout` on all external API calls
- Define clear terminal states (`completed`, `failed`, `skipped`)
- Monitor token usage in workflows (`token_budget` should be >30% headroom)
- Test workflows in dry-run mode before production use
- Use `TaskCreate` with explicit `blockedBy` to avoid circular deps
- Log state transitions (helps with future diagnosis)
