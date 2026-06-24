---
name: offline-validation
description: "Workflow to validate a UitKit stack for offline/air-gap readiness: map tools, classify dependencies, test each skill, document limitations"
updated: 2026-06-15
---

# Offline Validation Workflow

A step-by-step workflow for validating whether a UitKit stack can run fully offline (air-gapped). Determines offline-readiness percentage, identifies which skills work without network, classifies dependencies, and produces a compliance report.

---

## When to run this workflow

- Before deploying a stack to an air-gapped environment
- Auditing which stacks are safe for offline operation
- Preparing an enterprise offline deployment
- Validating that a new stack addition doesn't break offline compatibility
- Creating offline-safe stack profiles for your organization

---

## Success criteria

A stack is **offline-ready** when:

- All core skills run without external API calls
- All MCP dependencies are local (filesystem, git, bash, postgres, sqlite)
- No hardcoded references to external services (anthropic.com, GitHub, AWS, etc.)
- Audit trail shows zero external network calls
- Fallbacks exist for network-dependent features
- Documentation clearly lists offline limitations

---

## Workflow: Offline Validation (4 Phases)

### Phase 1: Map Tools and Dependencies (15 min)

**Goal:** Identify all tools, MCPs, APIs, and external services the stack depends on.

**Checklist:**

```markdown
- [ ] Collect all CLAUDE.md files from the stack
- [ ] List all skills in the stack
- [ ] Grep for external MCP references (mcp:github, mcp:slack, etc.)
- [ ] Grep for API calls (anthropic.com, AWS, GCP, Azure)
- [ ] Identify package managers (npm, pip, cargo, go)
- [ ] Document any shell commands that require network
```

**Commands:**

```bash
#!/bin/bash
# Phase 1: Map dependencies

STACK=$1  # e.g., "backend"
STACK_DIR="./${STACK}_stack"

echo "=== Phase 1: Map Tools and Dependencies ==="
echo ""

echo "1. Stack structure:"
find "$STACK_DIR" -name "CLAUDE.md" -o -name "*.md" | head -10

echo ""
echo "2. External MCP references:"
grep -r "mcp:" "$STACK_DIR" --include="*.md" | grep -oE "mcp:[a-zA-Z0-9_-]+" | sort -u

echo ""
echo "3. API references (external):"
grep -r "https://\|http://" "$STACK_DIR" --include="*.md" | grep -v ".git" | grep -E "anthropic|github\.com|aws|azure|gcp" | head -10

echo ""
echo "4. Skills list:"
if [[ -d "$STACK_DIR/skills" ]]; then
  ls "$STACK_DIR/skills"/*.md 2>/dev/null | xargs -I {} basename {} .md
else
  echo "(no skills directory)"
fi

echo ""
echo "[OK] Phase 1 complete. Document findings in OFFLINE_MAPPING.md"
```

**Output: OFFLINE_MAPPING.md**

```markdown
# Offline Validation: [STACK_NAME] Stack

## Dependencies Map

### External MCPs
- mcp:github — code repository access
- mcp:anthropic — Claude API calls

### External APIs
- anthropic.com/api/v1 — Claude language model
- github.com/api/v3 — repository operations

### External Services
- npm registry — package downloads
- pip index — package downloads

### Skills
- golang (offline-safe)
- docker (offline-safe)
- testing (offline-safe)
- codebase-onboarding (requires mcp:github)
- cicd (requires GitHub API)

### Package Managers
- go get (requires internet)
- npm install (requires internet)
```

---

### Phase 2: Classify Dependencies (10 min)

**Goal:** Label each dependency as offline-safe, offline-partial, or network-required.

**Classification rules:**

| Dependency Type | Offline-Safe | Offline-Partial | Network-Required |
|---|---|---|---|
| **MCP** | filesystem, git, bash, postgres, sqlite | docker (with cached images), kubernetes (local) | github, slack, linear, aws, anthropic |
| **API** | none | CloudFormation templates | Anthropic API, AWS SDK, GCP SDK |
| **Package** | built-in stdlib | vendored deps | remote registry downloads |
| **Skill** | local file ops, local testing | IaC, container build | live API integration |

**Commands:**

```bash
#!/bin/bash
# Phase 2: Classify dependencies

STACK=$1
MAPPING_FILE="OFFLINE_MAPPING.md"

cat > "${STACK}_OFFLINE_CLASSIFICATION.json" <<EOF
{
  "stack": "$STACK",
  "classification": {
    "external_mcps": {
      "mcp:github": "network-required",
      "mcp:anthropic": "network-required"
    },
    "offline_safe_mcps": [
      "mcp:filesystem",
      "mcp:git",
      "mcp:bash"
    ],
    "offline_safe_skills": [],
    "network_required_skills": [],
    "offline_percentage": 0
  },
  "remediation": [
    "Replace mcp:github with local git clone",
    "Replace mcp:anthropic with local Ollama",
    "Cache npm packages locally before deployment"
  ]
}
EOF

# Classify each skill
echo "Classifying skills..."
for skill in ${STACK}_stack/skills/*.md; do
  skill_name=$(basename "$skill" .md)
  
  # Check for network indicators
  if grep -q "mcp:github\|mcp:anthropic\|API\|https://" "$skill"; then
    echo "  $skill_name: NETWORK_REQUIRED"
  elif grep -q "mcp:filesystem\|mcp:git\|local" "$skill"; then
    echo "  $skill_name: OFFLINE_SAFE"
  else
    echo "  $skill_name: UNKNOWN (inspect manually)"
  fi
done

echo "[OK] Phase 2 complete. Review ${STACK}_OFFLINE_CLASSIFICATION.json"
```

**Output: [STACK_NAME]_OFFLINE_CLASSIFICATION.json**

```json
{
  "stack": "backend",
  "classification": {
    "total_skills": 8,
    "offline_safe_skills": 5,
    "network_required_skills": 3,
    "offline_percentage": 62.5,
    "skills": {
      "golang": "offline-safe",
      "dockerfile": "offline-safe",
      "testing": "offline-safe",
      "codebase-onboarding": "network-required",
      "cicd": "network-required",
      "aws-architect": "offline-partial"
    }
  },
  "remediation": [
    "Pre-cache docker images",
    "Use local git instead of mcp:github",
    "Replace AWS SDK calls with CloudFormation templates"
  ]
}
```

---

### Phase 3: Test Each Skill Offline (30 min)

**Goal:** Verify each offline-safe skill actually works without network.

**Setup:**

```bash
#!/bin/bash
# Phase 3 Setup: Configure test environment

# 1. Start local MCP servers
echo "[*] Starting local MCP servers..."
mcp server filesystem &
mcp server git &
mcp server bash &

# 2. Set offline mode
export DISABLE_EXTERNAL_MCP=true
export OFFLINE_MODE=true
export API_URL=http://127.0.0.1:11434/v1
export MODEL=ollama:llama2

# 3. Verify network is not available (simulated)
export NETWORK_UNAVAILABLE=true

# 4. Create test project
mkdir -p /tmp/offline-test
cd /tmp/offline-test
git init
echo "test" > test.txt

echo "[OK] Test environment ready"
```

**Test each offline-safe skill:**

```bash
#!/bin/bash
# Phase 3: Test skills

STACK=$1
SKILLS_DIR="${STACK}_stack/skills"

test_skill() {
  skill_file=$1
  skill_name=$(basename "$skill_file" .md)
  
  echo "Testing: $skill_name"
  
  # Extract example from skill file
  example=$(sed -n '/## Example/,/^## /p' "$skill_file" | head -20)
  
  if [[ -z "$example" ]]; then
    echo "  [SKIP] No example found"
    return 0
  fi
  
  # Run example with offline mode
  if timeout 30 claude "$example" --offline 2>&1 | grep -q "error\|fail\|FAIL"; then
    echo "  [FAIL] Skill failed in offline mode"
    return 1
  else
    echo "  [PASS] Skill works offline"
    return 0
  fi
}

# Test all offline-safe skills
offline_safe_skills=$(jq -r '.classification.offline_safe_skills[]' "${STACK}_OFFLINE_CLASSIFICATION.json")

for skill in $offline_safe_skills; do
  test_skill "${SKILLS_DIR}/${skill}.md"
done

echo "[OK] Phase 3 complete. Review test results."
```

**Document test results:**

```markdown
## Test Results

### golang
- Status: PASS
- Test: Build and compile Go binary locally
- Duration: 5s
- External calls: 0

### dockerfile
- Status: PASS
- Test: Build Docker image from cached base
- Duration: 8s
- External calls: 0

### testing
- Status: PASS
- Test: Run unit tests locally
- Duration: 3s
- External calls: 0

### codebase-onboarding
- Status: FAIL (expected)
- Reason: Requires mcp:github
- Fallback: Use `git clone` + local CLAUDE.md instead

### cicd
- Status: FAIL (expected)
- Reason: Requires GitHub API
- Fallback: Use local GitHub Actions runners only
```

---

### Phase 4: Document Limitations & Produce Report (10 min)

**Goal:** Create an offline-readiness report with clear limitations and fallbacks.

**Report template:**

```markdown
# Offline-Readiness Report: [STACK_NAME] Stack

**Generated:** [DATE]  
**Offline Percentage:** [X]%  
**Status:** [READY / READY_WITH_LIMITATIONS / NOT_READY]  

## Summary

This stack is [X]% offline-ready. [Details]

## Offline-Safe Skills

| Skill | Status | Notes |
|---|---|---|
| golang | ✅ READY | 100% offline, no external calls |
| dockerfile | ✅ READY | Works with cached images |
| testing | ✅ READY | Local test execution |

## Partially Offline Skills

| Skill | Status | Notes | Fallback |
|---|---|---|---|
| aws-architect | ⚠️ PARTIAL | IaC templates work; API calls don't | Use LocalStack or cached templates |
| cicd | ⚠️ PARTIAL | Local runners only; cloud runners unavailable | GitHub Enterprise Server on-prem |

## Network-Required Skills

| Skill | Status | Notes | Fallback |
|---|---|---|---|
| codebase-onboarding | ❌ UNAVAILABLE | Requires mcp:github + Anthropic API | Manual code review + offline CLAUDE.md |
| anthropic-integration | ❌ UNAVAILABLE | Requires Anthropic API | Use local LLM (Ollama, vLLM) |

## Deployment Checklist for Offline

```bash
- [ ] All base images pre-cached in Docker
- [ ] All npm packages in local cache
- [ ] All git repos cloned locally
- [ ] DISABLE_EXTERNAL_MCP=true set
- [ ] Local LLM (Ollama) running
- [ ] Audit logging configured
- [ ] Firewall egress rules verified (DROP by default)
```

## Known Limitations

1. GitHub integration unavailable — use local git clone instead
2. Anthropic API unavailable — use Ollama (Llama 2, Mistral)
3. AWS API unavailable — use CloudFormation templates with LocalStack
4. Package downloads unavailable — use pre-cached packages
5. Live analytics unavailable — local data only

## Offline Stack Profile

Use this stack in air-gapped environments with these restrictions:

```bash
export DISABLE_EXTERNAL_MCP=true
export API_URL=http://127.0.0.1:11434/v1
export MODEL=ollama:llama2

# Available commands:
claude --stack [STACK_NAME] --offline "task"

# Unavailable:
# - GitHub repository operations
# - Claude API calls
# - AWS API operations
# - Package downloads
```

## Next Steps

1. [Deploy using air-gap-deployment.md skill](../skills/devops-infra/air-gap-deployment.md)
2. [Enterprise setup: AIR_GAP.md](../enterprise/AIR_GAP.md)
3. [Running offline: offline-local-first.md](../guides/offline-local-first.md)
```

**Commands to generate report:**

```bash
#!/bin/bash
# Phase 4: Generate final report

STACK=$1
CLASSIFICATION_FILE="${STACK}_OFFLINE_CLASSIFICATION.json"
REPORT_FILE="${STACK}_OFFLINE_READINESS_REPORT.md"

# Calculate offline percentage
offline_pct=$(jq '.classification.offline_percentage' "$CLASSIFICATION_FILE")

# Determine readiness status
if (( $(echo "$offline_pct > 70" | bc -l) )); then
  status="READY"
elif (( $(echo "$offline_pct > 30" | bc -l) )); then
  status="READY_WITH_LIMITATIONS"
else
  status="NOT_READY"
fi

# Generate report
cat > "$REPORT_FILE" <<EOF
# Offline-Readiness Report: $STACK Stack

**Generated:** $(date)
**Offline Percentage:** ${offline_pct}%
**Status:** $status

[Full report details...]
EOF

echo "[OK] Report generated: $REPORT_FILE"
echo ""
echo "Summary:"
echo "  Offline Percentage: ${offline_pct}%"
echo "  Status: $status"
echo "  Report: $REPORT_FILE"
```

---

## Workflow Execution (Full Example)

```bash
#!/bin/bash
# Complete offline validation workflow

STACK="backend"

echo "=== Offline Validation Workflow ==="
echo "Stack: $STACK"
echo ""

# Phase 1: Map dependencies
echo "[Phase 1] Mapping dependencies..."
bash phase1-map-dependencies.sh "$STACK"
echo ""

# Phase 2: Classify
echo "[Phase 2] Classifying dependencies..."
bash phase2-classify-dependencies.sh "$STACK"
echo ""

# Phase 3: Test offline
echo "[Phase 3] Testing offline skills..."
bash phase3-test-skills.sh "$STACK"
echo ""

# Phase 4: Generate report
echo "[Phase 4] Generating offline-readiness report..."
bash phase4-generate-report.sh "$STACK"
echo ""

echo "=== Workflow Complete ==="
ls -la "${STACK}_OFFLINE"*
cat "${STACK}_OFFLINE_READINESS_REPORT.md"
```

---

## Integration with Offline-Validator Agent

Once validation completes, delegate to the `offline-validator` agent for detailed analysis:

```bash
/offline-validator

Stack: backend
Mapping file: backend_OFFLINE_MAPPING.md
Classification file: backend_OFFLINE_CLASSIFICATION.json
Test results: backend_TEST_RESULTS.md

Produce:
1. Detailed offline limitations document
2. Fallback patterns for each network-required feature
3. Recommended deployment configuration
4. Security hardening checklist
```

---

## Troubleshooting the Workflow

**Issue: "Skill failed in offline mode"**

Check the skill's CLAUDE.md for hidden external dependencies:

```bash
grep -E "anthropic|github|AWS|API" ${STACK}_stack/skills/skill-name.md
```

**Issue: "Offline percentage doesn't match manual count"**

Verify the classification logic:

```bash
jq '.classification' ${STACK}_OFFLINE_CLASSIFICATION.json
```

**Issue: "MCP server timeout during testing"**

Increase timeout or verify local MCPs are running:

```bash
lsof -i :8000  # check if MCP running
export MCP_TIMEOUT=10000  # increase timeout
```

---

## Summary

**Offline validation workflow steps:**

1. **Phase 1 (Map)** — Extract all external dependencies from stack
2. **Phase 2 (Classify)** — Label each as offline-safe, partial, or network-required
3. **Phase 3 (Test)** — Run each offline-safe skill in isolation
4. **Phase 4 (Document)** — Generate offline-readiness report with fallbacks

**Outputs:**

- `[STACK]_OFFLINE_MAPPING.md` — dependency map
- `[STACK]_OFFLINE_CLASSIFICATION.json` — classified dependencies
- `[STACK]_TEST_RESULTS.md` — test results
- `[STACK]_OFFLINE_READINESS_REPORT.md` — final compliance report

**Next:** Use the `offline-validator` agent for detailed analysis, or `air-gap-deployment` skill for enterprise deployment.
