# ADR 001: Five-Language Translation Scope

## Status
Accepted

## Context
UitKit targets developers globally. A significant portion of Claude Code users are non-native English speakers, particularly in France, Germany, the Netherlands, and Spanish-speaking countries. Providing translated documentation lowers the adoption barrier for these communities.

The question was: how many languages to support, which ones, and for which content types.

## Decision
All content — guides, skills, agents, rules, workflows, and prompts — will be translated into four additional languages:

- **French** (`fr/`) — large developer community, strong Claude adoption in Europe
- **German** (`de/`) — largest engineering community in Europe by headcount
- **Dutch** (`nl/`) — high English proficiency but strong preference for native content in professional contexts
- **Spanish** (`es/`) — covers Spain + Latin America, second-largest developer community globally

Hook scripts (`.sh`, `.py`) remain English-only — shell is a universal language, and translating script comments adds maintenance overhead with minimal value.

Translation files live in a language subdirectory within the same parent: `guides/fr/getting-started.md`, `skills/backend/python/fr/fastapi.md`.

## Consequences

**Positive:**
- Broader reach without forking the repo
- Community contributors can submit translations for their language
- Consistent structure makes it easy to check translation completeness

**Negative:**
- Each new English file requires 4 translated versions — 5x content volume
- Translation drift is hard to detect without tooling
- Non-English content is harder to review for accuracy

**Mitigations:**
- Translation completeness can be checked by `scripts/list-skills.sh` parity check
- Contributors are encouraged to flag stale translations in PRs
- Machine translation is acceptable as a starting point; native speaker review is preferred

## Alternatives Considered

**English-only** — Simpler to maintain, but excludes non-English communities. Rejected because the target market is global.

**10+ languages** — Covers more users but creates unsustainable maintenance burden. Rejected.

**Guides-only translation** — Original policy. Updated to all-content after user feedback that skill files are the most-accessed content type and most benefit from native language support.
