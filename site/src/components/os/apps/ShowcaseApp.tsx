import { useState } from "react";
import { Eyebrow } from "./ui";

interface Feature {
  id: string; icon: string; name: string; tagline: string;
  desc: string; how: string; example: string; color: string; category: string;
}
interface Category { id: string; label: string; color: string; audience: string; }

const CATEGORIES: Category[] = [
  { id: "cost", label: "Context & Cost Optimization", color: "#3fb950", audience: "CTOs & Power Users" },
  { id: "resilience", label: "Resilience & Zero-Hallucination", color: "#1d4aff", audience: "DevSecOps & QA Leads" },
  { id: "enterprise", label: "Enterprise Architecture", color: "#b62ad9", audience: "Architects & Staff Engineers" },
  { id: "swarms", label: "Multi-Agent Swarms", color: "#f54e00", audience: "Lead Developers" },
  { id: "context", label: "Environment & Context Engineering", color: "#f5b800", audience: "Onboarding & Daily Contributors" },
  { id: "zero-trust", label: "Zero-Trust & Compliance", color: "#ff5722", audience: "Security & Compliance Teams" },
  { id: "enterprise-intel", label: "Enterprise Intelligence", color: "#00bcd4", audience: "Platform & Architecture Leads" },
  { id: "multi-agent", label: "Multi-Agent & Federation", color: "#ff9800", audience: "DevOps & Infrastructure Teams" },
  { id: "creative", label: "Creative & Vibe Coding", color: "#e91e63", audience: "Frontend & Product Engineers" },
  { id: "ux", label: "UX & Developer Experience", color: "#7c4dff", audience: "Power Users & DX Teams" },
];

const FEATURES: Feature[] = [
  // ── Cost & Optimization ──
  { id: "claudeignore", icon: "🚫", name: ".claudeignore Templates", tagline: "Token cost reduction",
    desc: "Optimized ignore templates for Node, Python, and Go that prevent Claude from reading lockfiles and noise.",
    how: "Drop a .claudeignore template into your repo root. /setup-ignore auto-detects your stack and generates optimized patterns.",
    example: "$ /setup-ignore\n→ Detected: Node.js + TypeScript\n→ Generated .claudeignore (node_modules, dist, *.map)\n→ Token cost reduced by ~60%",
    color: "#3fb950", category: "cost" },
  { id: "save-state", icon: "💾", name: "Context Compactor", tagline: "Infinite memory, zero bloat",
    desc: "Synthesizes a massive chat history into a single CLAUDE_STATE.md so users can clear context without losing their place.",
    how: "/save-state compresses your entire session — decisions, edits, architecture — into a portable markdown file.",
    example: "$ /save-state\n→ Analyzing 47 messages, 12 files edited...\n→ Created CLAUDE_STATE.md (85 lines)\n→ Context compacted! Add @CLAUDE_STATE.md to resume.",
    color: "#3fb950", category: "cost" },
  { id: "caveman", icon: "🦴", name: "Caveman Mode", tagline: "Pure execution, zero filler",
    desc: "Enforces a strict DSL that forbids conversational English. Strips all chatbot behavior for raw code execution.",
    how: "Activates via /caveman + PreToolUse hook. Claude outputs only structured JSON actions at a fraction of the token cost.",
    example: "$ /caveman\n→ Caveman Mode activated 🦴\n→ Output: {\"action\":\"write\",\"file\":\"auth.ts\"}\n→ Token savings: 73%",
    color: "#3fb950", category: "cost" },

  // ── Resilience & Zero-Hallucination ──
  { id: "shadow-compiler", icon: "👻", name: "Shadow Compiler", tagline: "Zero-hallucination type safety",
    desc: "Silently runs the project's compiler after every edit. Catches errors before the task is marked complete.",
    how: "PostToolUse hook fires after every file write. Runs tsc --noEmit, cargo check, or ruff check. Feeds errors back for auto-correction.",
    example: "// Claude edits auth.ts\n// Shadow Compiler: ✗ Property 'usre' does not exist\n// Claude fixes it before you notice.",
    color: "#1d4aff", category: "resilience" },
  { id: "safe-commit", icon: "🛡️", name: "Safe Commit Hook", tagline: "If it hits GitHub, it works",
    desc: "Forces Claude to run local tests and linters before executing a commit. Blocks dirty code from reaching the repo.",
    how: "Intercepts git commit via PreToolUse hook. Runs test suite, linter, type checker. If any fail, commit is blocked.",
    example: "$ git commit -m \"add auth\"\n→ Safe Commit: ✓ ESLint  ✗ vitest — 2 failing\n→ BLOCKED. Fixing... All passed. Committing.",
    color: "#1d4aff", category: "resilience" },
  { id: "spec-enforcer", icon: "📐", name: "Spec-First Enforcer", tagline: "Total architectural compliance",
    desc: "Reads SPEC.md and physically blocks Claude from executing actions that violate the approved architecture.",
    how: "PreToolUse hook intercepts every Bash/Write. Compares against SPEC.md. Non-compliant actions rejected with citation.",
    example: "// Claude: ALTER TABLE users DROP COLUMN email\n// Spec Enforcer: ✗ BLOCKED — SPEC.md §4.2: email is immutable.",
    color: "#1d4aff", category: "resilience" },
  { id: "chaos-monkey", icon: "🐒", name: "Chaos Monkey", tagline: "AI designed to break your code",
    desc: "Adversarial agent swarm that rewrites tests to simulate network drops, race conditions, and massive payloads.",
    how: "/chaos-test spawns adversarial agents that inject failure modes: delays, concurrent writes, null returns, permission errors.",
    example: "$ /chaos-test src/api/payments.ts\n→ 5 chaos agents spawned\n→ 2/5 scenarios broke your code. Fix?",
    color: "#1d4aff", category: "resilience" },

  // ── Enterprise Architecture ──
  { id: "grill-me", icon: "🔥", name: "Grill Me", tagline: "Staff Engineer interrogation",
    desc: "Refuses to write code until Claude has ruthlessly interrogated the user on edge cases and security.",
    how: "/grill-me activates a Socratic loop. After 10+ rounds of questions, produces a hardened SPEC.md.",
    example: "$ /grill-me Build a payment webhook\n→ Q1: Duplicate Stripe events?\n→ Q2: Idempotency key strategy?\n→ ... 12 questions → Generated SPEC.md",
    color: "#b62ad9", category: "enterprise" },
  { id: "stunt-double", icon: "🎬", name: "Stunt Double", tagline: "True AI Test-Driven Development",
    desc: "Orchestrates a test-engineer agent to write failing tests, then an implementation-engineer to make them pass.",
    how: "/stunt-double spawns two agents sequentially: TestEngineer writes tests, ImplementationEngineer writes minimal code.",
    example: "$ /stunt-double Add rate limiter\n→ Phase 1: 8 failing tests\n→ Phase 2: All 8 passing ✓",
    color: "#b62ad9", category: "enterprise" },
  { id: "architect-mason", icon: "🏗️", name: "Architect / Mason", tagline: "Opus blueprints, Haiku bricks",
    desc: "Expensive model designs the architecture, cheap model implements the boilerplate at minimal cost.",
    how: "/architect uses Opus for ARCHITECTURE.md. /mason uses Haiku to implement each file rapidly.",
    example: "$ /architect Design notification system\n→ ARCHITECTURE.md (200 lines, 5 files)\n$ /mason implement → ✓ ($0.03)",
    color: "#b62ad9", category: "enterprise" },
  { id: "adr", icon: "📋", name: "ADR Generator", tagline: "Never lose the why",
    desc: "Generates standardized Architectural Decision Records when major systemic changes are detected.",
    how: "/adr detects architectural pivots and generates ADR files following the Michael Nygard format.",
    example: "$ /adr → Detected: REST to GraphQL\n→ docs/adr/003-graphql-migration.md\n  Status: ACCEPTED",
    color: "#b62ad9", category: "enterprise" },
  { id: "blast-radius", icon: "💥", name: "Blast Radius Analyzer", tagline: "Map what you'll break",
    desc: "AST-traces downstream imports before a breaking change, generating a visual impact map.",
    how: "/blast-radius parses the AST, traces import chains, generates a dependency graph of affected files.",
    example: "$ /blast-radius src/utils/auth.ts\n→ 14 files depend on auth.ts\n→ 3 critical paths identified",
    color: "#b62ad9", category: "enterprise" },
  { id: "legacy-strangler", icon: "🌿", name: "Legacy Strangler", tagline: "Don't rewrite. Strangle.",
    desc: "Prevents Big Bang rewrites. Builds facades and extracts microservices safely from legacy monoliths.",
    how: "/strangle analyzes the monolith, identifies bounded contexts, creates a strangler fig plan.",
    example: "$ /strangle orders.ts (2,400 lines)\n→ 4 bounded contexts identified\n→ Phase 1: Extracting Order Creation...",
    color: "#b62ad9", category: "enterprise" },

  // ── Multi-Agent Swarms ──
  { id: "night-shift", icon: "🌙", name: "Night Shift", tagline: "Autonomous batch processor",
    desc: "Queues hundreds of files and manages its own API rate limits via notification hooks.",
    how: "Creates BATCH_QUEUE.md, processes each file, marks done, handles rate limits. Designed for 3+ hour unsupervised sessions.",
    example: "$ /night-shift Migrate .js to TypeScript\n→ 50 files queued\n→ 1/50: auth.js → auth.ts ✓\n→ Rate limit hit. Sleeping 60s...",
    color: "#f54e00", category: "swarms" },
  { id: "hive-swarm", icon: "🐝", name: "Hive Orchestrator", tagline: "Virtual engineering department",
    desc: "Master routing agent that breaks epics into sub-tasks and spawns specialized subagents.",
    how: "/hive-swarm decomposes an epic into a task graph, assigns to specialist agents, orchestrates with dependency management.",
    example: "$ /hive-swarm Build user dashboard\n→ 6 tasks: backend, frontend, security, integration\n→ Spawning agents...",
    color: "#f54e00", category: "swarms" },
  { id: "tribunal", icon: "⚖️", name: "Tribunal Review", tagline: "3-agent adversarial PR review",
    desc: "Spawns Hacker, Performance Junkie, and Senior Pedant to audit a PR from every angle.",
    how: "Orchestrator spawns three adversarial personas. Each reviews the same diff. Results synthesized into one review.",
    example: "$ /tribunal auth.js\n⚖️ 🛡️ Hacker: Timing attack L42\n⚡ Perf: N+1 query in lookup\n📐 Pedant: console.log L88",
    color: "#f54e00", category: "swarms" },
  { id: "sweeper", icon: "🧹", name: "Codebase Sweeper", tagline: "The janitor you never pay",
    desc: "Low-cost background agent that continuously hunts dead code, unused imports, and stale comments.",
    how: "/sweep runs AST analysis to find unused exports, dead imports, resolved TODOs. Removes silently.",
    example: "$ /sweep → Scanning 340 files...\n→ 23 dead imports, 8 TODOs, 4 unused exports\n→ Cleaned 35 items. -200 lines of debt.",
    color: "#f54e00", category: "swarms" },
  { id: "bisect-bug", icon: "🔬", name: "Time-Travel Debugger", tagline: "Git bisect automated bug finder",
    desc: "Writes a test script and jumps through Git history to find the exact commit that broke the code.",
    how: "Writes deterministic test, runs git bisect, identifies offending commit, reads diff, proposes fix.",
    example: "$ /bisect-bug Login returns 500\n→ git bisect through 47 commits...\n→ Found! Commit f9e8d7c: removed await before DB call",
    color: "#f54e00", category: "swarms" },

  // ── Environment & Context Engineering ──
  { id: "auto-tdd", icon: "🧪", name: "Auto-TDD Hook", tagline: "Instant test feedback",
    desc: "Watches for file saves and runs the corresponding test file in the background, feeding results to Claude.",
    how: "PostToolUse hook maps source files to test files. When src/auth.ts is saved, auto-runs tests/auth.test.ts.",
    example: "// Edit src/auth.ts\n// Auto-TDD: ✓ verifyToken  ✗ refreshToken\n// Claude sees the failure and fixes it.",
    color: "#f5b800", category: "context" },
  { id: "dev-doctor", icon: "🩺", name: "Dev Doctor", tagline: "Environment diagnostics",
    desc: "Diagnoses ECONNREFUSED errors by checking Docker, port conflicts, .env drift, and common issues.",
    how: "/dev-doctor runs a diagnostic checklist: Docker? Port? .env? Node version? Database?",
    example: "$ /dev-doctor\n→ ✓ Node v20.11  ✗ Port 3000 occupied\n→ ✗ .env missing DATABASE_URL\n→ 3 issues. Auto-fix? [Y/n]",
    color: "#f5b800", category: "context" },
  { id: "jit-context", icon: "💉", name: "JIT Context Injector", tagline: "Just-in-time dependency injection",
    desc: "Dynamically finds and injects downstream dependency signatures before Claude edits a core file.",
    how: "PreToolUse hook detects target file, AST-traces imports, extracts type signatures, injects as context.",
    example: "// About to edit src/api/users.ts\n// JIT: Detected 4 imports → Injected signatures\n// db.query<T>(), auth.verifyToken()...",
    color: "#f5b800", category: "context" },

  // ── Zero-Trust & Compliance (NEW) ──
  { id: "constitution", icon: "📜", name: "Constitution Guardrail", tagline: "Hard enforcement of soft rules",
    desc: "Physically blocks code that violates CONSTITUTION.md. Turns guidelines into architectural enforcements.",
    how: "PreToolUse hook reads CONSTITUTION.md, intercepts every code write. Violations are rejected with a citation to the violated article.",
    example: "// Claude: Add user email to public API\n// Constitution: ✗ BLOCKED — Art.3: PII must not appear in public responses.\n// Rewriting with anonymization...",
    color: "#ff5722", category: "zero-trust" },
  { id: "auditor", icon: "🔍", name: "The Auditor", tagline: "Code vs spec verification",
    desc: "Side-by-side comparison of final code against the original SPEC.md. Guarantees AI didn't go rogue.",
    how: "/audit-spec compares every implementation file against SPEC.md sections. Generates a compliance report with deviations.",
    example: "$ /audit-spec\n→ Comparing 12 files vs SPEC.md...\n→ 11/12 compliant\n→ Deviation: auth.ts §2.1 — missing rate limit\n→ Fix deviation?",
    color: "#ff5722", category: "zero-trust" },
  { id: "shadow-pr", icon: "👤", name: "Ghost in the Machine", tagline: "Shadow PRs for continuous quality",
    desc: "Background routine that generates a refactored 'ideal' version of recent edits. Non-intrusive architectural mentoring.",
    how: "PostToolUse routine watches edits, generates a shadow branch with cleaner patterns. Review at your leisure.",
    example: "// You edit 5 files for a feature\n// Ghost: Generated shadow-patch-001\n→ Suggests: extract shared util, DRY 3 duplications\n→ Apply? [Y/n]",
    color: "#ff5722", category: "zero-trust" },
  { id: "interrogator", icon: "🕵️", name: "The Interrogator", tagline: "Automated issue triaging",
    desc: "Comments on vague GitHub/Linear tickets to extract reproduction steps automatically.",
    how: "/triage-issue reads the ticket, identifies missing info, and posts a structured comment asking for repro steps, environment, logs.",
    example: "$ /triage-issue #342\n→ Analyzing: 'Login is broken'\n→ Missing: browser, OS, error logs, steps\n→ Posted comment: 4 clarifying questions",
    color: "#ff5722", category: "zero-trust" },
  { id: "archaeologist", icon: "🏺", name: "The Archaeologist", tagline: "Semantic context engine",
    desc: "Local vector-based search for conceptual code finding. Instant onboarding into massive codebases.",
    how: "/find-concept builds a local embedding index of the repo. Query by concept, not just keyword.",
    example: "$ /find-concept \"how do we handle auth tokens?\"\n→ Found 8 relevant files across 3 modules\n→ Top: src/auth/jwt.ts (score: 0.94)",
    color: "#ff5722", category: "zero-trust" },
  { id: "compliance-agent", icon: "✅", name: "Specify Wizard", tagline: "Spec Kit automation",
    desc: "Interactive skill that generates GitHub-compliant specs using Grill Me logic. Automates formal engineering.",
    how: "/specify walks through structured questions, generates SPEC.md, ARCHITECTURE.md, and ADR in one session.",
    example: "$ /specify New payment gateway\n→ 15 questions answered\n→ Generated: SPEC.md, ARCH.md, ADR-004\n→ Ready for /mason implement",
    color: "#ff5722", category: "zero-trust" },

  // ── Enterprise Intelligence (NEW) ──
  { id: "historian", icon: "📜", name: "The Historian", tagline: "Self-writing documentation",
    desc: "Background hook that watches for edits in core directories and queues automatic ARCHITECTURE.md rewrites.",
    how: "PostToolUse hook monitors critical paths. When src/api/* or src/db/* changes, updates ARCHITECTURE.md.",
    example: "// You edit src/api/payments.ts\n// Historian: new endpoint POST /refunds\n→ Added §4.3 Refund Flow (12 lines)",
    color: "#00bcd4", category: "enterprise-intel" },
  { id: "sonar", icon: "🗺️", name: "Sonar Codebase Cartographer", tagline: "AST-powered repo mapping",
    desc: "AST/signature extraction for massive repos. Gives Claude an exact map instead of guessing from context.",
    how: "/map-repo builds an AST index of all public APIs, types, and relationships. Stores in .claudient/map.json.",
    example: "$ /map-repo\n→ Scanning 2,400 files...\n→ Indexed: 340 APIs, 180 types, 90 interfaces\n→ Context map ready. Claude now has full repo vision.",
    color: "#00bcd4", category: "enterprise-intel" },
  { id: "prophet", icon: "🔮", name: "The Prophet", tagline: "Predictive tech debt analyzer",
    desc: "Analyzes Git hotspots to predict which files will cause the next production outage.",
    how: "/prophet correlates git blame density, change frequency, and test coverage to predict fragile files.",
    example: "$ /prophet\n→ Analyzing 6 months of git history...\n→ 🔴 HIGH RISK: src/api/payments.ts (47 changes, 30% coverage)\n→ 🟡 MEDIUM: src/utils/auth.ts (22 changes)",
    color: "#00bcd4", category: "enterprise-intel" },
  { id: "invariant", icon: "🧬", name: "Invariant Discovery", tagline: "Unwritten team conventions",
    desc: "Analyzes Git history to extract unwritten team conventions — the rules of the road that aren't documented.",
    how: "/discover-invariants scans commit patterns, PR reviews, and code style to surface implicit team agreements.",
    example: "$ /discover-invariants\n→ 3 months of history analyzed\n→ Found 12 invariants:\n  1. Always use async/await (never .then)\n  2. DB queries always in repositories/\n  3. No console.log in production code",
    color: "#00bcd4", category: "enterprise-intel" },
  { id: "oracle", icon: "🎱", name: "The Oracle", tagline: "Pre-mortem prediction",
    desc: "Simulates edge cases against a PR to predict specific production failure modes before merge.",
    how: "/oracle-pr reads the diff, generates adversarial test scenarios: high load, race conditions, null inputs.",
    example: "$ /oracle-pr #128\n→ Simulating 15 edge cases...\n→ 🔴 FAIL: 10K concurrent users → deadlock in order.ts\n→ 🟡 WARN: null response from payment API",
    color: "#00bcd4", category: "enterprise-intel" },
  { id: "graph-context", icon: "🕸️", name: "Graph-Augmented Context", tagline: "Knowledge graph for repos",
    desc: "Maps the repository as a Knowledge Graph instead of a flat file list. Understands inheritance and data flow.",
    how: "/build-graph creates a SQLite-backed knowledge graph of code relationships. Claude queries it for precise context.",
    example: "$ /build-graph\n→ Building knowledge graph...\n→ 1,200 nodes, 3,400 edges\n→ Claude: \"Show me all handlers that touch User\"\n→ 8 handlers found across 4 modules",
    color: "#00bcd4", category: "enterprise-intel" },
  { id: "recursive-reflection", icon: "🪞", name: "Recursive Reflection", tagline: "Self-healing workflows",
    desc: "PostToolUse hook that forces Claude to reflect on its own code by running it against a Judge model.",
    how: "After every tool use, a lightweight Judge model reviews the output. If issues found, Claude self-corrects before returning.",
    example: "// Claude writes function\n// Judge: ✗ Missing null check on user param\n// Claude: Self-correcting...\n// Final output: validated and clean",
    color: "#00bcd4", category: "enterprise-intel" },

  // ── Multi-Agent & Federation (NEW) ──
  { id: "architect-federation", icon: "🌐", name: "Architect / Mason Federation", tagline: "Dual-model orchestration at scale",
    desc: "Expensive model designs, cheap model builds — orchestrated across multiple files with dependency tracking.",
    how: "/federation takes an epic, Architect creates full blueprint, Mason agents implement each file in parallel.",
    example: "$ /federation Build notification system\n→ Architect: 8 files planned, dependency graph ready\n→ Mason agents: 8 parallel implementations\n→ All done in 45 seconds ($0.12 total)",
    color: "#ff9800", category: "multi-agent" },
  { id: "cross-talk", icon: "📡", name: "Cross-Talk", tagline: "Agent federation protocol",
    desc: "Allows a local Claude session to query a colleague's Claude session. Collective team hive-mind.",
    how: "/cross-talk connects to a teammate's session via MCP. Query their context, share findings, coordinate.",
    example: "$ /cross-talk @alice \"What auth pattern are you using?\"\n→ Alice's session: JWT with refresh tokens, RSA-256\n→ Shall I adopt the same pattern?",
    color: "#ff9800", category: "multi-agent" },
  { id: "dba-box", icon: "🗄️", name: "DBA-in-a-Box", tagline: "Production query auditor",
    desc: "Uses MCP to run EXPLAIN ANALYZE on a replica before writing migrations. Prevents bad queries hitting prod.",
    how: "PreToolUse hook intercepts migration files. Runs EXPLAIN ANALYZE on replica. Blocks queries with full table scans.",
    example: "// Claude: CREATE INDEX ON orders(user_id, created_at)\n// DBA-in-a-Box: Running EXPLAIN on replica...\n→ ⚠️ Sequential scan detected on 2M rows\n→ Suggestion: Add partial index WHERE status = 'active'",
    color: "#ff9800", category: "multi-agent" },
  { id: "incident-cmdr", icon: "🚨", name: "Incident Commander", tagline: "PagerDuty autonomy",
    desc: "Wakes up on PagerDuty alerts, reads logs, rolls back deployments, drafts post-mortems.",
    how: "Webhook triggers on PagerDuty alert. Reads CloudWatch/Datadog logs, identifies root cause, executes rollback playbook.",
    example: "⏰ PagerDuty: 500 errors spike\n→ Incident Commander activated\n→ Reading logs... found: deployment abc123\n→ Rolling back to previous version...\n→ Drafting post-mortem...",
    color: "#ff9800", category: "multi-agent" },
  { id: "self-healing-ci", icon: "🩹", name: "Self-Healing CI Pipeline", tagline: "Auto-patch failing tests",
    desc: "GitHub Action that automatically patches and pushes fixes for failing CI tests.",
    how: "On CI failure, spawns a repair agent that reads the error, patches the code, pushes a fix commit, re-triggers CI.",
    example: "CI: ✗ test_auth.py — AssertionError\n→ Self-Healing CI activated\n→ Agent: updated expected value (line 42)\n→ Pushed fix commit → CI: ✓ All passing",
    color: "#ff9800", category: "multi-agent" },
  { id: "mcp-discovery", icon: "🔌", name: "MCP Dynamic Discovery", tagline: "Zero-config integrations",
    desc: "Scans the user's system for available MCP servers and automatically wires them into the active session.",
    how: "/discover-mcp scans localhost, Docker, and common ports. Auto-generates MCP configs for found services.",
    example: "$ /discover-mcp\n→ Scanning system...\n→ Found: PostgreSQL (5432), Redis (6379), Figma MCP\n→ Auto-generated 3 MCP configs\n→ Connected and ready",
    color: "#ff9800", category: "multi-agent" },

  // ── Creative & Vibe Coding (NEW) ──
  { id: "vibe-verify", icon: "🎨", name: "Vibe & Verify", tagline: "Adversarial UI loop",
    desc: "Vibe-Maker builds UI, Skeptic audits for accessibility, responsiveness, and edge cases. Polished pixels guaranteed.",
    how: "/vibe spawns two agents: Vibe-Maker generates React components, Skeptic runs WCAG audit and mobile-responsiveness checks.",
    example: "$ /vibe Build a pricing page\n→ Vibe-Maker: 3-tier pricing cards ✨\n→ Skeptic: ✗ Mobile overflow at 320px\n→ Vibe-Maker: Fixed. ✓ WCAG AA ✓ Responsive",
    color: "#e91e63", category: "creative" },
  { id: "figma-bridge", icon: "🎭", name: "Figma-to-Code Bridge", tagline: "Design to React in seconds",
    desc: "Uses Figma MCP to autonomously build React components from JSON design trees.",
    how: "/figma-to-code reads Figma design tree via MCP, maps to React components, generates styled JSX with Tailwind.",
    example: "$ /figma-to-code Frame \"Hero Section\"\n→ Reading Figma tree... 12 layers detected\n→ Generated: HeroSection.tsx (48 lines)\n→ Tailwind classes applied ✓  Responsive ✓",
    color: "#e91e63", category: "creative" },
  { id: "artifact", icon: "📦", name: "The Artifact", tagline: "Self-documenting spec flow",
    desc: "Every prompt generates a versioned Artifact that acts as single source of truth. Code is just a renderable output.",
    how: "/artifact creates a Spec Kit-compatible versioned document. Edit the Artifact → Claudient regenerates the code.",
    example: "$ /artifact Build user settings page\n→ Generated Artifact v1.0 (spec + acceptance criteria)\n→ Code rendered from Artifact\n→ Business change? Edit Artifact → Code regenerates",
    color: "#e91e63", category: "creative" },
  { id: "atomic-commit", icon: "📌", name: "Atomic Commit Hook", tagline: "Micro-versioning for AI edits",
    desc: "Auto-commits successfully tested code after every AI edit. Instant rollbacks without untangling files.",
    how: "PostToolUse hook: after tests pass, creates a micro-commit. If the next edit breaks things, git revert to last good state.",
    example: "// Claude edits 5 files\n// Hook: ✓ tests pass → commit ai-edit-001\n// Claude edits again → ✗ tests fail\n// Hook: auto-revert to ai-edit-001 ✓",
    color: "#e91e63", category: "creative" },
  { id: "design-extract", icon: "🎯", name: "Design System Extraction", tagline: "Tokens from any design",
    desc: "Extracts design tokens from Figma/designs, generates component libraries and theme mappings.",
    how: "/extract-tokens reads Figma file, extracts colors, spacing, typography, shadows. Generates CSS variables + Tailwind config.",
    example: "$ /extract-tokens Figma URL\n→ Extracted: 24 colors, 8 spacing, 6 typography\n→ Generated: tokens.css + tailwind.extend.js\n→ Theme mapping: 100% coverage",
    color: "#e91e63", category: "creative" },

  // ── UX & Developer Experience (NEW) ──
  { id: "pulse-statusline", icon: "💓", name: "The Pulse Statusline", tagline: "Dynamic real-time dashboard",
    desc: "Live statusline showing swarm status, context budget, session cost, and map density on the Claude terminal floor.",
    how: "Installs as a statusline config. Renders real-time metrics with color-coded indicators.",
    example: "Swarm: 2 active | Density: 84% | Budget: $0.42 | CTX: [▓▓▓▓░░] 62%",
    color: "#7c4dff", category: "ux" },
  { id: "matrix-theme", icon: "🖥️", name: "The Matrix Theme Pack", tagline: "Premium aesthetic UX",
    desc: "Brand-aligned high-contrast themes: Claudient Neon, Ghost Shell. For senior power users.",
    how: "Install via /theme matrix-neon. Applies color scheme to statusline, terminal, and Claude Code UI.",
    example: "$ /theme matrix-neon\n→ Applied: Claudient Neon theme\n→ Terminal: green-on-black with syntax highlighting\n→ Statusline: matching neon accents",
    color: "#7c4dff", category: "ux" },
  { id: "power-keybindings", icon: "⚡", name: "Power-User Keybindings", tagline: "Ergonomic speed",
    desc: "Shortcut map for high-frequency skills: Doctor, Save-State, Grill-Me. Professional AI engineer ergonomics.",
    how: "Install keybindings.json. Maps Ctrl+D to doctor, Ctrl+S to save-state, Ctrl+G to grill-me.",
    example: "Ctrl+D → claudient doctor (instant)\nCtrl+G → /grill-me (interrogation mode)\nCtrl+Shift+S → /save-state (compact & resume)",
    color: "#7c4dff", category: "ux" },
  { id: "shell-aliases", icon: "🐚", name: "High-Speed Shell Aliases", tagline: "Claudient as standalone platform",
    desc: "Short-circuit CLI commands: cx, cxd, cxa. Reduces friction and reinforces Claudient as a platform.",
    how: "Add to .bashrc/.zshrc. cx = claudient, cxd = claudient doctor, cxa = claudient audit.",
    example: "$ cx doctor   (≡ claudient doctor)\n$ cx score    (≡ claudient score)\n$ cxa         (≡ claudient audit --full)",
    color: "#7c4dff", category: "ux" },
];

export function ShowcaseApp() {
  const [selected, setSelected] = useState(FEATURES[0]);
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const filtered = activeCat ? FEATURES.filter((f) => f.category === activeCat) : FEATURES;

  return (
    <div className="flex h-full">
      <div className="w-[220px] border-r border-hairline bg-cream/50 p-3 overflow-y-auto shrink-0">
        <Eyebrow color="#f54e00">Showcase · {FEATURES.length} Features</Eyebrow>
        <div className="mt-3 space-y-3">
          {CATEGORIES.map((cat) => (
            <div key={cat.id}>
              <button
                onClick={() => setActiveCat(activeCat === cat.id ? null : cat.id)}
                className={`w-full text-left flex items-center gap-1.5 rounded-md px-2 py-1.5 text-[11px] font-bold uppercase tracking-wider transition ${activeCat === cat.id ? "bg-white text-ink shadow-sm" : "text-mute hover:text-body"}`}
              >
                <span className="size-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                {cat.label}
              </button>
              <div className="ml-1 mt-0.5 space-y-0.5">
                {FEATURES.filter((f) => f.category === cat.id).map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelected(f)}
                    className={`w-full text-left rounded-md px-2 py-1.5 text-[11.5px] transition ${selected.id === f.id ? "bg-white font-bold text-ink shadow-sm" : "text-body hover:bg-white/50"}`}
                  >
                    <span className="mr-1">{f.icon}</span>{f.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 p-5 overflow-y-auto">
        <div className="flex items-center gap-3 mb-5">
          <div className="grid place-items-center size-12 rounded-xl text-2xl" style={{ backgroundColor: selected.color + "1a" }}>
            {selected.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full" style={{ backgroundColor: selected.color }} />
              <span className="text-[11px] font-bold uppercase tracking-wider text-mute">
                {CATEGORIES.find((c) => c.id === selected.category)?.label}
              </span>
            </div>
            <Eyebrow color={selected.color}>{selected.tagline}</Eyebrow>
            <h2 className="text-xl font-bold text-ink">{selected.name}</h2>
          </div>
        </div>
        <p className="text-[14px] text-body leading-relaxed mb-5">{selected.desc}</p>
        <div className="mb-5">
          <div className="text-[12px] font-bold text-mute uppercase tracking-wider mb-2">How it works</div>
          <p className="text-[13px] text-body leading-relaxed">{selected.how}</p>
        </div>
        <div className="mb-5">
          <div className="text-[12px] font-bold text-mute uppercase tracking-wider mb-2">Example</div>
          <pre className="rounded-lg bg-code-bg text-code-text p-4 text-[11px] font-mono leading-relaxed whitespace-pre-wrap overflow-x-auto">
            {selected.example}
          </pre>
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-md border border-hairline bg-cream px-2.5 py-1 text-[11px] text-mute">
          Target: {CATEGORIES.find((c) => c.id === selected.category)?.audience}
        </div>
      </div>
    </div>
  );
}
