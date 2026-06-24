---
name: freshness-refresh
description: "Quarterly content maintenance sprint to audit and refresh stale files"
updated: 2026-06-15
---

# Freshness Refresh Workflow

Quarterly content maintenance sprint — systematically audit UitKit files for staleness, spawn review agents per category, and refresh stale content with updated information and frontmatter.

## When to use

Use this workflow:
- **Quarterly** (every 3 months from last refresh date)
- **Before certification renewal** — ensure all content is current and defensible
- **After major Claude model release** — guide changes may be outdated
- **Triggered by CI** — when `check-freshness.js` flags >20% stale files

## Phase 1: Generate freshness report (30 minutes)

Run the freshness audit script to identify stale files:

```bash
npm run check:freshness
node scripts/generate-refresh-report.js > FRESHNESS_REPORT.md
```

This produces:
- Count of fresh vs stale files by category (skills, agents, guides, workflows, etc.)
- Sorted list of files by age, with last-updated date
- Estimated time to refresh each file
- Grouping by category for parallel review assignment

**Stale threshold:** 6 months old (configurable in `check-freshness.js`)

## Phase 2: Triage and prioritize (1 hour)

Read `FRESHNESS_REPORT.md` and categorize stale files:

**Tier 1 (refresh immediately):**
- Core skills (debugging, testing, auth, deployment)
- Frequently-used guides (getting started, workflows)
- Agent definitions referenced in workflows
- Files with >12 months staleness

**Tier 2 (refresh within 2 weeks):**
- Stack-specific skills and guides
- Less-used workflows
- Agent examples
- Files with 6–12 months staleness

**Tier 3 (review, may keep as-is):**
- Deprecated or rarely-used skills
- Historical examples
- Archived stacks
- Files that are still accurate despite age

Create a text document listing which files fall into each tier for agent assignment.

## Phase 3: Spawn review agents in parallel

For each Tier 1 and Tier 2 file, spawn a review agent with a specific mandate. Run agents in parallel (not sequentially):

### Agent assignment template

```
File: [path/to/file.md]
Category: [skills|agents|guides|workflows]
Last updated: [date]
Age: [N months]

Task:
1. Read the current file content carefully.
2. Check whether the content is still accurate relative to Claude Code as of June 2026.
3. Identify any outdated information:
   - Command syntax that has changed
   - Features that are no longer available or have been renamed
   - Deprecated tools or patterns
   - Examples that no longer work
4. If >30% of content is inaccurate or outdated:
   - Propose rewrites for affected sections
   - Update the frontmatter "updated" field to today's date
5. If content is still accurate:
   - Confirm freshness in your report
   - Update the "updated" field anyway to reset the staleness counter

Report format:
- Status: [Fresh | Needs Minor Updates | Needs Major Rewrite]
- Key changes (if any): [list of outdated sections and proposed fixes]
- Updated frontmatter (copy-paste ready)
```

Spawn one agent per file (or one agent per 3–5 related files if reviewing guides in a batch).

## Phase 4: Consolidate and apply updates (2 hours)

After all agents report:

1. **Collect all proposed updates** — paste all agent outputs into a single document
2. **Group by file** — organize all changes for each file together
3. **Review conflicts** — if two agents propose different changes to the same file, decide which is correct
4. **Apply updates sequentially:**
   - Update frontmatter: set `updated: YYYY-MM-DD` (today's date)
   - Apply all content changes from agent reports
   - Fix any formatting issues introduced during rewrites
   - If an agent proposed a major rewrite, read it aloud to verify clarity

5. **Commit the batch:**
   ```bash
   git add -A
   git commit -m "chore: quarterly freshness refresh — $(date +%Y-Q%q)
   
   Reviewed and updated $(X) files across skills, guides, agents, workflows.
   
   - Updated frontmatter timestamps to reset staleness counters
   - Refreshed outdated examples and command syntax
   - Verified accuracy against Claude Code as of June 2026
   
   See FRESHNESS_REPORT.md for audit results."
   ```

## Phase 5: Verify and validate (1 hour)

- **Run CI checks:**
  ```bash
  npm run check:freshness      # Verify all files now have valid dates
  npm run build-catalog        # Ensure no build errors
  npm test                     # Run any linting/validation
  ```

- **Spot-check 3 random updated files** — read them to confirm agent changes were applied correctly

- **If any files failed CI**, fix them immediately (missing dates, invalid YAML, etc.)

## Phase 6: Close the sprint

- **Archive FRESHNESS_REPORT.md:**
  ```bash
  mkdir -p ./maintenance/reports
  mv FRESHNESS_REPORT.md ./maintenance/reports/freshness-$(date +%Y-%m-%d).md
  ```

- **Update maintenance calendar:** Document the refresh date in your project memory or README

- **Next refresh:** Schedule the same workflow for 3 months from today

## Related content

- `/guides/content-freshness` — SLA and maintenance standards
- `/skills/productivity/freshness-auditor` — skill for running freshness checks before certification
- `/scripts/generate-refresh-report.js` — generates the freshness report
- `/scripts/check-freshness.js` — core freshness detection logic

---
