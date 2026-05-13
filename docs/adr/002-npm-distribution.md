# ADR 002: npm Distribution from Day One

## Status
Accepted

## Context
Claudient needs to be installable by developers without requiring them to clone the full repository and manually copy files. Two distribution options were evaluated at the start of the project: git clone + manual copy, or npm package.

## Decision
Claudient will be distributed as an npm package (`claudient`) from the initial release.

The package exposes a CLI (`npx claudient add [category]`) that copies skill files to the user's `~/.claude/skills/` directory. No runtime dependencies are required — the package is a knowledge artifact, not a library.

The `package.json` is at the repo root. The `scripts/cli.js` handles installation logic.

## Consequences

**Positive:**
- Zero-friction installation: `npx claudient add all` works without cloning
- Versioned releases via npm — users can pin to a specific version
- Discoverable via `npm search claude-code`
- Consistent with how other Claude Code knowledge packages (e.g., everything-claude-code) are distributed
- CI can publish automatically on tag push

**Negative:**
- npm publish requires an npm account and token in CI
- Users must have Node.js ≥18 installed (reasonable assumption for developers)
- npm package includes all content — no per-skill lazy loading without additional tooling

**Mitigations:**
- `npx claudient add [category]` allows partial installs to keep it lightweight
- `.claude-plugin/plugin.json` provides a machine-readable manifest for future tooling

## Alternatives Considered

**Git clone only** — Lower setup cost initially, but high friction for users. No versioning, no partial installs. Rejected after user feedback.

**Homebrew formula** — macOS-first, adds maintenance overhead. Rejected for initial release; can be added later.

**VSCode extension** — Only covers one IDE. Claude Code works across IDEs and terminal. Rejected for initial release.
