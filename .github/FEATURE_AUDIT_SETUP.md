# Feature Audit CI Setup Guide

## What Was Created

This document describes the CI workflow generated for feature validation on every commit.

### Files Created

1. **.github/workflows/feature-audit.yml** (Main workflow)
   - GitHub Actions CI configuration
   - 6 parallel validation jobs
   - Automated PR commenting
   - Feature audit reporting

2. **scripts/validate-features.js** (Feature validation script)
   - Validates feature-presence.txt structure
   - Checks file references
   - Ensures format consistency
   - Generates categorized statistics

3. **test/features/validate-features.js** (Integration test suite)
   - Tests feature system integration
   - Validates skill/agent/hook registration
   - Checks JSON and markdown validity
   - Comprehensive feature coverage analysis

4. **.github/FEATURE_AUDIT.md** (Detailed documentation)
   - Complete workflow reference
   - Job descriptions
   - Trigger conditions
   - Local testing guide
   - Troubleshooting tips

5. **.github/workflows/README.md** (Workflows directory index)
   - Overview of all workflows
   - Quick reference guide
   - Common tasks
   - Status monitoring

## How It Works

### Trigger Events

The workflow runs automatically on:

- **Push** to `main` or `master` when these files change:
  ```
  feature-*.txt
  skills/**
  agents/**
  hooks/**
  workflows/**
  scripts/validate-*.js
  test/**
  ```

- **Pull Request** to `main` or `master` with same filters

### Validation Jobs (Run in Parallel)

1. **Feature Presence Validation**
   - Checks format: `ID | CATEGORY | NAME | STATUS | FILES`
   - Validates status values (PRESENT, MISSING, DEPRECATED)
   - Compares line counts between presence and inventory files

2. **JSON & Schema Validation**
   - Parses all JSON files (except keybindings)
   - Validates audit-schema.json structure
   - Reports malformed files

3. **Markdown Structure Check**
   - Validates skill/agent/hook frontmatter
   - Verifies file path references
   - Checks markdown link integrity

4. **Feature Integration Tests**
   - Runs CLI smoke tests (npm test)
   - Executes feature-specific tests
   - Validates workspace stacks
   - Checks 61+ features registered

5. **Feature Completeness Analysis**
   - Counts features by status
   - Generates category breakdown
   - Reports missing or deprecated features

6. **Generate Audit Report**
   - Creates audit summary report
   - Posts results as PR comment
   - Includes commit SHA and timestamp

## Feature File Format

### feature-presence.txt

Pipe-separated with 5 columns (required):

```
ID | CATEGORY | FEATURE_NAME | STATUS | FILE_REFERENCES
1  | cost     | .claudeignore Templates | PRESENT | ./claudeignore-templates/node.claudeignore, ./claudeignore-templates/go.claudeignore
```

**Status Values:**
- `PRESENT` - Fully implemented and available
- `MISSING` - Documented but not yet implemented
- `DEPRECATED` - Marked for removal

### feature-inventory.txt

Simple listing (auto-generated):

```
ID | CATEGORY | FEATURE_NAME | STATUS
1  | cost     | .claudeignore Templates | PRESENT
```

## Local Testing

### Run Feature Validation
```bash
node scripts/validate-features.js
```

Output:
- Feature counts by category
- File reference validation
- Consistency checks
- Detailed summary

### Run Integration Tests
```bash
node test/features/validate-features.js
```

Tests:
- Feature presence structure
- Skills registration (413 found)
- Agents registration (207 found)
- Hooks registration (206 found)
- Workflows structure (56 found)
- JSON validity (critical files)
- Markdown format

### Full Validation Suite
```bash
npm run validate
npm run validate:catalog
npm run validate:stacks
npm test
```

## CI Results

### On Push
1. Workflow runs automatically
2. All 6 jobs execute in parallel
3. Results visible in Actions tab
4. Status badge in PR/commit

### On Pull Request
1. Workflow runs on PR creation/update
2. Audit results posted as PR comment
3. Full details in Actions logs
4. Allows early detection of issues

## Monitoring Features

The workflow tracks **61 features** across **10 categories**:

| Category | Count | Examples |
|----------|-------|----------|
| cost | 4 | .claudeignore, Context Compactor, Caveman Mode |
| resilience | 7 | Shadow Compiler, Safe Commit, Spec Enforcer |
| enterprise | 8 | Architect/Mason, ADR Generator, Council |
| swarms | 5 | Night Shift, Hive Orchestrator, Tribunal |
| context | 3 | Auto-TDD, Dev Doctor, JIT Context |
| zero-trust | 10 | Constitution, Auditor, Interrogator |
| enterprise-intel | 8 | The Historian, Prophet, Oracle |
| multi-agent | 6 | Incident Commander, Self-Healing CI, DBA-in-a-Box |
| creative | 5 | Vibe & Verify, Figma Bridge, Design Extract |
| ux | 5 | Pulse Statusline, Matrix Theme, Keybindings |

## Maintenance

### Adding Features
1. Add entry to `feature-presence.txt`
2. Add to `feature-inventory.txt`
3. Update file references
4. Commit and push
5. Workflow validates automatically

### Updating Status
```
# Edit feature-presence.txt
61 | ux | Dashboard Launcher | PRESENT → DEPRECATED

git commit -m "mark feature deprecated"
git push
```

### Regenerating Files
```bash
# If script exists
node scripts/regenerate-features.js

# Or manually verify
npm run list > feature-audit.log
```

## CI Failure Handling

### Common Failures

| Error | Fix |
|-------|-----|
| `feature-presence.txt not found` | Create file with proper format |
| `Invalid status` | Use PRESENT, MISSING, or DEPRECATED |
| `Missing file references` | Update paths to repo root |
| `Line count mismatch` | Sync presence.txt with inventory.txt |
| `Tests failed` | Check for code errors in features |

### Debug Locally
```bash
# Run failing validation
node scripts/validate-features.js

# Check test output
node test/features/validate-features.js

# View detailed logs
npm test -- --verbose
```

### Fix and Rerun
```bash
# Correct issues
nano feature-presence.txt

# Validate locally
node scripts/validate-features.js

# Commit and push
git commit -m "fix: correct feature references"
git push
# Workflow runs automatically
```

## Integration with Existing CI

The feature audit workflow complements existing CI:

- **validate.yml** - Markdown lint, link checks, freshness
- **uitkit-ci.yml** - Core validation, catalog checks, CLI tests
- **feature-audit.yml** - Feature catalog, schema, integration (NEW)

Together they provide comprehensive quality assurance for:
- Content accuracy and formatting
- System integrity and consistency
- Feature metadata correctness
- Integration validation

## Environment & Requirements

### Workflow Environment
- **OS:** Ubuntu latest
- **Node.js:** 20
- **npm:** Auto-installed
- **Runtime:** ~2-3 minutes total

### Required Files
- `feature-presence.txt` - Feature catalog
- `feature-inventory.txt` - Feature listing
- `scripts/validate-*.js` - Validation scripts
- `test/features/validate-features.js` - Integration tests

### Optional Files
- `enterprise/audit-schema.json` - Audit schema validation
- `.claude/settings.local.json` - Configuration validation

## Permissions & Security

### Workflow Permissions
```yaml
permissions:
  contents: read           # Read repo files
  pull-requests: write     # Post PR comments
```

### No Secrets Required
- Workflow is read-only on repository
- No API keys or credentials needed
- Safe for public repositories
- No external dependencies

## Troubleshooting

### Workflow Won't Run
- Check branch name (main/master)
- Verify files match trigger paths
- Check workflow YAML syntax
- View Actions tab for errors

### False Positives
- Some JSON files have comments (allowed)
- Keybindings excluded from strict validation
- File paths must be relative to repo root
- Presence/inventory line counts must match

### Debug Info
```bash
# View workflow details
cat .github/workflows/feature-audit.yml

# Run validation locally
node scripts/validate-features.js

# Run tests with verbose output
node test/features/validate-features.js
```

## Next Steps

1. **Verify Locally**
   ```bash
   node scripts/validate-features.js
   node test/features/validate-features.js
   npm test
   ```

2. **Commit Setup**
   ```bash
   git add .github/workflows/feature-audit.yml
   git add scripts/validate-features.js
   git add test/features/validate-features.js
   git add .github/FEATURE_AUDIT.md
   git add .github/workflows/README.md
   git commit -m "ci: add feature audit GitHub Actions workflow"
   ```

3. **Push to Remote**
   ```bash
   git push origin main
   ```

4. **Monitor First Run**
   - View Actions tab
   - Check PR comments
   - Review audit report

5. **Update Documentation**
   - Link to workflow from README.md
   - Update CI/CD section
   - Add feature maintenance guide

## References

- [Feature Audit Workflow](./FEATURE_AUDIT.md)
- [Workflows Directory](./README.md)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [UitKit CLAUDE.md](../CLAUDE.md)

---

**Setup Complete!** The feature audit CI workflow is ready to validate every commit.
