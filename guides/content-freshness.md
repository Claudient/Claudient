---
name: content-freshness
description: "Maintenance SLA, staleness thresholds, and freshness procedures for UitKit content"
updated: 2026-06-15
---

# UitKit Content Freshness SLA

Maintenance standards and procedures for keeping UitKit content current and accurate. This guide defines staleness thresholds, what to check per content type, and the frontmatter update process.

---

## Staleness Thresholds

A file is considered **stale** when its `updated` date in YAML frontmatter is older than the threshold for its type:

| Content Type | Threshold | Reason |
|---|---|---|
| Skills (core productivity, testing, debugging) | 6 months | Core patterns change frequently with Claude model updates |
| Skills (domain-specific: backend, frontend, etc.) | 6 months | Tooling and best practices evolve rapidly |
| Agents (core roles: debugger, reviewer, etc.) | 6 months | Agent capabilities depend on Claude model capabilities |
| Guides (getting started, conceptual) | 9 months | Reference material is more stable than how-to |
| Guides (tool/framework specific) | 6 months | Tools and APIs change faster than concepts |
| Workflows (tactical: bug-investigation, code-review) | 6 months | These reflect current practices and tools |
| Workflows (strategic: onboarding, planning) | 9 months | Long-term processes are more stable |
| Prompts | 6 months | Prompt effectiveness degrades as model behavior shifts |
| ADRs / Rules (documented decisions) | 12 months | Decisions are meant to be long-lasting; review only when context changes |

**Global rule:** If it has an `updated` date and it's older than 6 months, add it to the refresh queue. Use the longer thresholds (9–12 months) only for truly non-technical content (historical examples, archived guides).

---

## Stale Content Indicators

A file is functionally stale even if its date is recent, if any of these apply:

### Skills
- Command syntax examples that no longer work (test in Claude Code)
- Tool names that have been renamed or removed
- Outdated screenshot or UI reference
- Hook trigger conditions that no longer exist
- Example that breaks in current Claude Code
- Mentions a deprecated feature or model name

### Agents
- Describes tools the agent no longer has access to
- References a model version that is no longer available
- Capability claims that no longer match reality
- Prompt examples that reflect old API behavior

### Guides
- Feature comparison table that has changed (e.g., model pricing, context windows)
- Installation instructions for a tool with a new major version
- Workflow steps that depend on a removed feature
- Outdated screenshot or interface reference
- References an old project structure or naming convention

### Workflows
- References a tool or skill that has been removed
- Parallel steps that depend on tools no longer available
- Example assumes a codebase structure that is no longer recommended
- Metric or SLA that is no longer relevant (outdated team sizes, traffic levels)

### All content types
- Dead links (404s to external resources)
- References to "upcoming" features that shipped long ago
- Examples using deprecated language/framework versions
- Ambiguous claims without supporting evidence

---

## Frontmatter Format

Every file in `skills/`, `agents/`, `guides/`, `workflows/`, `rules/`, and `prompts/` must have a YAML frontmatter block at the start:

```yaml
---
name: the-skill-name
description: "One-sentence purpose of this file"
updated: 2026-06-15
---
```

### Frontmatter rules

- **name:** kebab-case, matches the filename (without `.md`)
- **description:** ~50 characters, fits on one line, does not include the title
- **updated:** ISO 8601 date (`YYYY-MM-DD`), updated to today whenever you modify the file

**Example (skill file):**
```yaml
---
name: freshness-auditor
description: "Run freshness audits and generate prioritized refresh lists"
updated: 2026-06-15
---
```

**Example (workflow file):**
```yaml
---
name: freshness-refresh
description: "Quarterly maintenance sprint to audit and refresh stale content"
updated: 2026-06-15
---
```

### How to update frontmatter

When you modify a file:
1. Find the `---` block at the top
2. Change the `updated:` value to today's date in ISO format
3. Do not change `name` or `description` (those are stable identifiers)
4. Commit the file with the updated date

If a file is stale but still accurate, update only the `updated:` date to reset the staleness counter. This signals "freshness confirmed — content verified as current."

---

## What to Check Per Skill Type

### Productivity skills
- Run any command examples in a real Claude Code session — does it work?
- If the skill calls a slash command (e.g., `/code-review`), verify that command still exists
- If the skill references a hook or setting (e.g., `settings.json` configuration), verify it's still valid
- Check external tool links (npm, GitHub, docs) for 404s

### Domain skills (backend, frontend, ML, etc.)
- Verify framework/library version recommendations are still current
- Run code examples (if self-contained) to ensure syntax is valid
- Check if the tool or framework has released a major version and changed behavior
- Verify package names and import paths haven't changed

### Conceptual skills and guides
- Re-read the content with fresh eyes — is the explanation still clear and accurate?
- Check external links (tutorials, specs, standards) for 404s
- If the skill compares two options, verify both are still in common use
- If the skill describes a "best practice," verify it aligns with current industry consensus

### Agents
- Verify the agent's model recommendation (Haiku/Sonnet/Opus) is still appropriate for the task
- Check that the listed `tools:` still exist in Claude Code
- Re-read the `model guidance` section — does it still apply to the current Claude model?
- Verify any assumed agent capabilities haven't been removed

### Workflows
- Read the workflow steps — are all referenced tools, commands, and features still available?
- Check if any step depends on deprecated behavior
- Verify metrics or SLAs mentioned are still realistic
- If the workflow spawns agents, ensure the agent definitions still exist and haven't changed roles

### Rules
- Verify the rule is still being followed in the codebase
- If the rule references a tool or feature, verify it still exists
- Re-read the rationale — is it still valid?

---

## Freshness Check Workflow (For Individual Contributors)

When adding to or modifying a file:

1. **Update frontmatter:**
   ```yaml
   updated: [TODAY'S DATE IN YYYY-MM-DD FORMAT]
   ```

2. **Test if applicable:**
   - If the file includes commands, run them
   - If the file includes code, validate syntax
   - If the file references a feature, verify it exists

3. **Check links:**
   - External URLs in the file should not 404
   - Internal links (to other files in UitKit) should reference existing files

4. **Commit:**
   ```bash
   git add path/to/file.md
   git commit -m "chore: refresh [filename] — verify accuracy and update date"
   ```

---

## Quarterly Freshness Sprint

Every 3 months, run the full `/workflows/freshness-refresh` workflow:

1. **Generate a report:** `node scripts/generate-refresh-report.js`
2. **Triage files** by age and importance
3. **Spawn review agents** to verify content accuracy
4. **Apply updates** from agent reports
5. **Commit the batch** and reset the staleness counter

---

## SLA Targets

- **Core productivity skills:** 95% fresh (< 6 months old)
- **All other content:** 85% fresh
- **Missing frontmatter dates:** 0 (all files must have an `updated:` field)
- **Broken links:** 0 (CI check flagged immediately)

Monitor these metrics in the freshness report generated quarterly.

---

## Related content

- `/workflows/freshness-refresh` — quarterly maintenance sprint procedure
- `/skills/productivity/freshness-auditor` — run a freshness audit on demand
- `/scripts/check-freshness.js` — CLI tool to detect stale files
- `/scripts/generate-refresh-report.js` — generate detailed freshness report

---
