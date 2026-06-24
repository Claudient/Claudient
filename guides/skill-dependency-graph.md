# Skill Dependency Graph Guide

This guide explains how to analyze and visualize the relationships between skills and agents in UitKit using the dependency graph tools.

---

## Overview

The UitKit repository is a network of skills and agents. Over time, skills reference each other — either by name, functionality, or context. Understanding these dependencies helps you:

- **Identify clusters**: which skills work together
- **Spot orphans**: skills no one references (candidates for archival)
- **Detect brittleness**: skills with too many incoming edges (widely depended on, high risk if changed)
- **Plan refactoring**: merge or extract skills to reduce coupling

The dependency graph tools scan all `.md` files in `skills/` and `agents/` directories, detect cross-references by name matching, and produce three output formats: Mermaid diagrams, JSON adjacency lists, and summary statistics.

---

## The Core Script: `scripts/dependency-graph.js`

This Node.js script walks the `skills/` and `agents/` directories and builds a graph of skill-to-skill and agent-to-agent references.

### How it works

1. **Collects all names**: Reads every `.md` file in `skills/` and `agents/`, extracting filenames (kebab-case, converted to lowercase) as node identifiers.
2. **Finds references**: For each file, scans its content (case-insensitive) for mentions of other skills or agents using regex word-boundary matching.
3. **Builds adjacency list**: Maps each skill/agent name to the set of skills/agents it references.
4. **Outputs**: Produces Mermaid diagram, JSON, or stats depending on flags.

### Usage

```bash
# Mermaid diagram (default) — limited to top 50 edges
node scripts/dependency-graph.js

# JSON adjacency list — all edges
node scripts/dependency-graph.js --json

# Summary statistics only
node scripts/dependency-graph.js --stats
```

### Output Formats

#### Mermaid Diagram Output

```
graph LR
    agent_handoff["agent handoff"] --> session_handoff["session handoff"]
    skill_composition["skill composition"] --> agent_handoff["agent handoff"]
    ...
    %% ... showing top 50 of 237 edges
```

Copy-paste this into a Markdown code block (use ` ```mermaid ... ``` `) to render an interactive left-to-right flowchart in GitHub, Obsidian, or any Markdown viewer with Mermaid support.

**Note**: The Mermaid output is capped at 50 edges to avoid overwhelming diagrams. Use `--json` for the complete graph.

#### JSON Output

```json
{
  "agent-handoff": ["session-handoff", "agent-tracing"],
  "skill-composition": ["agent-handoff"],
  "rag-architect": ["prompt-caching", "llm-eval"],
  ...
}
```

Each key is a skill/agent name; the value is a sorted array of skills/agents it references. Use this for programmatic analysis or feeding into visualization tools.

#### Stats Output

```
Dependency Graph Stats:

  Total skills/agents: 427
  Nodes with references: 189
  Total edges: 512
  Orphan nodes (no refs): 238

  Top 10 most connected:
    prompt-engineering: 24 references
    agent-handoff: 18 references
    claude-api: 16 references
    llm-eval: 14 references
    ...
```

Provides a summary view: total nodes, how many have dependencies, edge count, orphan count, and the top 10 most-referenced skills/agents.

---

## Using the Interactive Visualizer: `scripts/visualize-graph.js`

For interactive exploration, use the D3.js force-directed graph visualizer.

### Usage

```bash
# Generate JSON from dependency-graph, pipe to visualizer
node scripts/dependency-graph.js --json | node scripts/visualize-graph.js

# Or save JSON first, then visualize
node scripts/dependency-graph.js --json > /tmp/graph.json
node scripts/visualize-graph.js < /tmp/graph.json
```

This outputs a self-contained HTML file with an interactive D3.js force-directed graph. Open it in a web browser to:

- **Drag nodes** to explore the network
- **Zoom and pan** to navigate
- **Hover over nodes** to highlight connections
- **Click nodes** to pin/unpin them
- **See node degree** (in-degree and out-degree) in tooltips

The HTML includes all dependencies embedded (no external requests) and is suitable for presentations or sharing with team members.

---

## Common Workflows

### Find all skills that depend on a given skill

Query the JSON output:

```bash
node scripts/dependency-graph.js --json | jq 'to_entries[] | select(.value[] == "prompt-caching") | .key'
```

This returns all skills that reference `prompt-caching`.

### Identify highly connected nodes (hub skills)

```bash
node scripts/dependency-graph.js --json | jq 'to_entries | map({name: .key, count: (.value | length)}) | sort_by(.count) | reverse | .[0:10]'
```

Top 10 skills by outbound references.

### Find orphaned skills (no dependencies)

```bash
node scripts/dependency-graph.js --json | jq 'to_entries[] | select(.value | length == 0) | .key'
```

These may be standalone skills, specialized domain skills, or candidates for archival if they are not actively maintained.

### Check for circular dependencies

Manually inspect the graph or use the interactive visualizer to spot cycles. Note: the current implementation detects direct references only; true circular dependency detection (A → B → A) would require graph traversal.

---

## Interpreting Results

### High out-degree (many outbound edges)

A skill that references many others. Examples:
- `agent-handoff` (references `session-handoff`, `agent-tracing`, etc.) — a skill that combines multiple concepts
- `skill-composition` — a guide or meta-skill describing how to combine other skills

**Action**: Check that references are necessary. Consolidate if there is duplication.

### High in-degree (many inbound edges)

A skill that many others reference. Examples:
- `prompt-engineering` (referenced by many higher-level skills)
- `claude-api` (foundational for SDK skills)

**Action**: Treat as stable core infrastructure. Changes here have wide impact — review carefully.

### Isolated nodes (zero edges)

A skill with no cross-references to other skills. Examples:
- Domain-specific skills (e.g., `photography-studio` in `skills/small-business/`)
- Newly added skills not yet integrated
- Standalone tutorials

**Action**: Not necessarily bad. Isolation can indicate domain specialization. But if it's a utility skill, consider whether it should be referenced elsewhere.

---

## Updating Dependencies (Manual)

The graph is built from **textual references** in file content. When you:

1. **Rename a skill file** (e.g., `foo.md` → `bar.md`): All existing references to "foo" break automatically. Update any files that mention `foo` to use `bar`.
2. **Add a new reference**: Mention the other skill by name in your file's content. The next graph build will detect it.
3. **Remove a reference**: Delete the mention. The next graph build will remove the edge.

No explicit dependency manifest is needed — the graph infers from content.

---

## Integration with CI/CD

Add a pre-commit or CI check to validate the dependency graph:

```bash
# Detect circular dependencies or isolated skills
node scripts/dependency-graph.js --stats | grep "Orphan nodes"
```

Or use the `/skill-audit` workflow (see `workflows/skill-audit.md`) to run a full dependency audit as part of your review process.

---

## Example: Analyzing Skill Composition

Suppose you want to understand the structure of the `skill-composition` guide:

```bash
node scripts/dependency-graph.js --json | jq '.["skill-composition"]'
```

Output:
```json
["agent-handoff", "agent-memory", "llm-eval", "prompt-engineering"]
```

The `skill-composition` guide references four core skills. You now know the learning path: read those four skills, then return to `skill-composition` for how to combine them.

---

## Troubleshooting

**Graph is empty or has very few edges**: Ensure you're running from the repo root (`/Users/tushar/Desktop/UitKit`). The script looks for `skills/` and `agents/` relative to the repo root.

**False positives (incorrectly detected references)**: The matching is case-insensitive and uses word boundaries. Strings like "agent" match "agent-handoff" (correct) but might also match "agent_supervisor" if not careful. Review the actual skill file content to confirm the reference is intentional.

**Missing a skill in the graph**: The script only indexes `.md` files in `skills/` and `agents/` directories. Guides, workflows, and other directories are not indexed (this is intentional — the graph focuses on the skill/agent core). If a skill is missing, verify it is in the correct directory.

---

## Next Steps

- Run `/skill-discovery` (see `skills/ai-engineering/skill-discovery.md`) to find related skills interactively.
- Run the `skill-audit` workflow (`workflows/skill-audit.md`) to identify coverage gaps and over-connected nodes.
- Use the interactive visualizer (`scripts/visualize-graph.js`) to explore the network in real time.
