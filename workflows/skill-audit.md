# Skill Audit Workflow

Systematically audit the UitKit skill collection for coverage gaps, orphaned skills, over-connected nodes, and maintenance issues. Run this workflow after significant skill additions or periodically (e.g., quarterly) to ensure the collection remains coherent.

---

## When to use this workflow

- After adding 5+ new skills (check for redundancy and integration)
- Before a major release (ensure all skills are healthy and well-connected)
- When refactoring the skill directory structure
- To plan skill deprecation or consolidation
- To identify skills that need documentation updates
- During onboarding a new skill curator to understand the current state

---

## Prerequisites

- Access to the UitKit repository root
- Node.js installed (for running `scripts/dependency-graph.js`)
- jq installed (for JSON querying) — optional but recommended
- Text editor or IDE for reading skill files

---

## Step 1 — Baseline the graph

Generate the full dependency graph and stats:

```bash
cd /path/to/uitkit
node scripts/dependency-graph.js --json > /tmp/skill-graph.json
node scripts/dependency-graph.js --stats > /tmp/skill-stats.txt
```

Review the stats output to understand the current scale:

```bash
cat /tmp/skill-stats.txt
```

Example output:
```
Dependency Graph Stats:

  Total skills/agents: 427
  Nodes with references: 189
  Total edges: 512
  Orphan nodes (no refs): 238

  Top 10 most connected:
    prompt-engineering: 24 references
    agent-handoff: 18 references
    ...
```

**Note what to look for:**
- **Orphan ratio**: >50% orphans suggests loose integration or many domain-specific skills (OK). <10% suggests everything is tightly coupled (potential over-integration).
- **Total edges**: More edges generally indicate a well-connected collection (good discoverability). But >1000 edges might signal redundancy.

---

## Step 2 — Identify orphaned skills

Skills with zero cross-references are candidates for review:

```bash
jq 'to_entries[] | select(.value | length == 0) | .key' /tmp/skill-graph.json > /tmp/orphans.txt
```

Then cross-check against the full skill inventory:

```bash
find skills agents -name '*.md' | grep -v -E '/(fr|de|es|nl)/' | sed 's|.*/||;s|\.md$||' | sort > /tmp/all-skills.txt
comm -13 <(sort /tmp/orphans.txt) /tmp/all-skills.txt > /tmp/referenced-skills.txt
```

For each orphaned skill, open the file and determine:

1. **Is it intentionally isolated?** (domain-specific, standalone tutorial)
   - Keep it; document why in a comment at the top
2. **Should it be referenced elsewhere?** (utility skill that supports other skills)
   - Add mentions to 2–3 related skills
3. **Should it be archived?** (outdated, superseded by another skill)
   - Move to `skills/archived/` and note the reason

**Action items:**
- Update any skill files to reference isolated utility skills
- Move obsolete skills to a deprecation directory
- Add a comment to intentionally-isolated skills explaining why

---

## Step 3 — Identify high-degree nodes (hubs)

Skills referenced by many others are critical infrastructure. Analyze and verify them:

```bash
jq 'to_entries | map({name: .key, out: (.value | length)}) | sort_by(.out) | reverse | .[0:20]' /tmp/skill-graph.json
```

For the top 10–15 hub skills, evaluate:

1. **Are they well-maintained?** Check the `updated:` field in the frontmatter.
   - Last updated >6 months ago? Flag for a refresh review.
2. **Is their scope still accurate?** Given all the skills that depend on them, do they cover the right territory?
   - If many skills reference a skill for different reasons, it might need to be split.
3. **Are they overly broad?** If a skill references 15+ other skills, it might be trying to do too much.
   - Consider breaking it into 2–3 more focused skills.

**Example findings:**
```
Hub Skills Analysis:

skill: prompt-engineering (referenced by 24 skills)
  Last updated: 2026-06-10 ✓ (recent)
  Scope: Foundational prompt techniques (appropriate)
  Action: None — healthy hub

skill: agent-handoff (referenced by 18 skills)
  Last updated: 2026-03-15 ⚠ (3+ months old)
  Scope: Structured handoff protocol (appropriate)
  Action: Schedule a refresh review within 2 weeks

skill: ray-distributed-computing (referenced by 14 skills, references 22 others)
  Last updated: 2026-04-01
  Scope: Distributed computing with Ray (broad)
  Action: Audit scope — consider splitting into ray-basics and ray-advanced
```

**Action items:**
- Schedule refresh reviews for hubs with stale dates
- Plan decomposition of overly-broad hubs
- Verify hub skill descriptions are accurate and discoverable

---

## Step 4 — Detect density clusters

Group skills by directory and calculate local density to find well-integrated domains:

```bash
# Count skills and edges per category
for dir in skills/*/; do
  category=$(basename "$dir")
  skill_count=$(find "$dir" -name '*.md' ! -path '*/fr/*' ! -path '*/de/*' ! -path '*/es/*' ! -path '*/nl/*' | wc -l)
  echo "$category: $skill_count skills"
done
```

Then manually analyze the dependency patterns within each category using the interactive visualizer:

```bash
node scripts/visualize-graph.js < /tmp/skill-graph.json > /tmp/graph.html
# Open /tmp/graph.html in a browser, look for clusters
```

**What to look for:**
- **Tight clusters** (many internal edges, few external edges): Well-scoped domain (good)
- **Star pattern** (one central skill, many peripheral): Suggests a foundational skill with many applications (good, but monitor for bloat)
- **Isolated clusters** (no edges to/from other categories): May indicate a specialized domain or missing integration

**Action items:**
- Document the purpose of each cluster
- If a cluster is isolated, consider whether cross-domain skills should reference it
- If a cluster is very large (20+ skills), consider whether to split it

---

## Step 5 — Check for missing cross-references

Identify skills that seem related but don't reference each other. Use semantic/manual matching:

```bash
# Example: skills/ai-engineering/* should form a connected sub-graph
# Extract the sub-graph
jq 'with_entries(select(.key | startswith("agent-") or startswith("prompt-")))' /tmp/skill-graph.json
```

Manually review: if two skills in the same domain don't reference each other, is that correct, or should they be linked?

**Example:**
```json
{
  "agent-handoff": ["session-handoff", "agent-tracing"],
  "agent-memory": ["agent-handoff"],
  "agent-teams": ["agent-handoff"]
}
```

Do `agent-memory` and `agent-teams` know about each other? If both are multi-agent concepts, they probably should cross-reference.

**Action items:**
- Add missing cross-references between semantically related skills
- Document the reason for intentional gaps (e.g., "they're alternatives, not complements")

---

## Step 6 — Audit skill quality and coverage

For a sample of 10–15 skills across different categories, open each file and verify:

1. **Frontmatter**: Does it have `name`, `description`, `updated` fields?
   - Check date is within the last year
2. **Structure**: Does it follow the UitKit format (When to activate, When NOT to use, Instructions, Example)?
3. **Clarity**: Is the skill description clear and actionable?
4. **Examples**: Is there a concrete, runnable example?

Use this checklist:

```
Skill Audit Checklist:

[ ] Frontmatter complete (name, description, updated)
[ ] Updated within past 12 months
[ ] Follows standard structure (When/When NOT/Instructions/Example)
[ ] Description is clear and unambiguous
[ ] Instructions are actionable (not just theory)
[ ] Example is concrete and runnable
[ ] Links to related skills are accurate
[ ] No dead references to skills that don't exist
```

For any failures, file issues or PRs to update the skills.

---

## Step 7 — Generate the audit report

Compile findings into a structured report:

```markdown
# Skill Audit Report — [DATE]

## Summary

- Total skills: {N}
- Skills with references: {M} ({pct}%)
- Orphaned skills: {O}
- Hub skills (top 10): {list}
- Average degree: {avg}

## Findings

### Critical Issues
- [Issue]: {description}
  Action: {required}
- [Issue]: {description}
  Action: {required}

### Medium Priority
- [Issue]: {description}
  Action: {recommended}

### Low Priority / Suggestions
- [Suggestion]: {description}
  Action: {optional}

## Recommendations

1. {Highest impact action}
2. {Next}
3. {Then}

## Timeline

- Immediate (this sprint): {critical issues}
- This quarter: {medium priority}
- Backlog: {low priority, nice-to-haves}
```

---

## Step 8 — Plan remediation

For each finding, assign an owner and deadline. Update the UitKit roadmap or backlog:

**Example:**

| Issue | Priority | Owner | Deadline | Status |
|-------|----------|-------|----------|--------|
| Refresh `prompt-engineering` (last updated 3 months ago) | Medium | @curator-a | 2 weeks | Not started |
| Add cross-references between `agent-memory` and `agent-teams` | Low | @curator-b | Next month | Not started |
| Archive `deprecated-skill-x` | Low | @curator-a | 2 weeks | Not started |

---

## Output & Artifacts

Save the following:

1. `/tmp/skill-graph.json` — Full dependency graph (JSON)
2. `/tmp/skill-stats.txt` — Stats summary
3. `/tmp/graph.html` — Interactive visualization
4. `AUDIT-REPORT-{DATE}.md` — Audit findings and recommendations
5. GitHub issues or PRs for any required actions

Share the report with the team and track remediation via GitHub issues.

---

## Frequency

- **After major skill additions** (5+ new skills): Run immediately
- **Quarterly**: Run as part of maintenance cadence
- **Before releases**: Run to ensure quality baseline

Expected duration: 2–3 hours for a collection of 100+ skills.

---

## Integration with CI/CD

Add a pre-commit check to catch obvious issues:

```bash
#!/bin/bash
# .git/hooks/pre-commit

# Check for orphaned skills (skills with zero references might be unintentional)
orphans=$(node scripts/dependency-graph.js --json | jq '[to_entries[] | select(.value | length == 0) | .key] | length')
if [ "$orphans" -gt 10 ]; then
  echo "Warning: $orphans orphaned skills detected. Consider running the skill-audit workflow."
fi
```

Or run in a GitHub Actions workflow on a schedule:

```yaml
name: Skill Audit
on:
  schedule:
    - cron: '0 9 * * 0'  # Weekly on Sunday

jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: node scripts/dependency-graph.js --stats
```

---
