# HR & People Operations Stack

> The complete Claude Code workspace for talent operations — recruiting pipelines, candidate screening, offer management, onboarding workflows, and employee engagement. Scale your people function with built-in compliance, interview prep, and hiring velocity tracking.

---

## Quick Start

1. **Copy this folder** into your Claude Code workspace or project.
2. **Configure CLAUDE.md** — Set your hiring criteria, offer templates, and interview question bank.
3. **Run `/screen-candidate [name] [role]`** — Get a scoring breakdown: skills fit, cultural alignment, compensation expectation, and recommendation.
4. **Run `/interview-prep [candidate]`** — Generate interview guide, scoring rubric, key questions, and red-flag signals.
5. **Run `/offer-review [candidate]`** — Audit offer for market competitiveness, legal compliance, equity fairness, and negotiation readiness.

---

## What's Inside

| File/Folder | Type | Purpose |
|---|---|---|---|
| `CLAUDE.md` | Config | Workspace rules, hiring criteria matrix, skills, hooks, tone guidelines, and company culture values. Start here. |
| `session-log.md` | Log | Auto-updated with every action: candidates screened, interviews prepared, offers reviewed, hires approved. |
| `skills/` | Directory | 8 reusable skills for screening, interview prep, offer management, onboarding, and engagement. |

---

## Skills (8)

| Skill | Trigger | Tools Used | Purpose |
|---|---|---|---|
| `candidate-screener` | Before review | Read | Score candidates 0–100 across skills, culture fit, compensation, visa status; return ADVANCE/HOLD/REJECT decision |
| `interview-prep` | 48h before call | Read, WebSearch | Generate interview guide, scoring rubric, key questions, behavioral patterns, and red flags |
| `offer-architect` | Post-approval | Read, Write | Draft competitive offer: base salary, equity, benefits, sign-on bonus, negotiation ranges with benchmarks |
| `offer-reviewer` | Before sending | Read | Audit offer for market competitiveness, equity fairness, legal compliance, and negotiation risk |
| `onboarding-workflow` | Post-offer-sign | Read, Write | Build first-week checklist, system access, buddy assignment, document collection, and kickoff tasks |
| `offer-negotiator` | On counteroffer | Read | Analyze prospect counteroffer: equity comparison, salary band deviation, benefit gaps, recommendation |
| `engagement-pulse` | Quarterly | Read | Summarize engagement signals: feedback survey scores, retention risk flags, promotion readiness, flight risk |
| `off-boarder` | On departure | Read, Write | Generate exit checklist, knowledge transfer template, offboarding tasks, and alumni network invite |

---

## Commands (3)

| Command | What It Does |
|---|---|
| `/screen-candidate` | Score candidate against hiring criteria: skills, culture, compensation, visa. Returns GO/HOLD/REJECT with reasoning. |
| `/interview-prep` | Generate interview guide, scoring rubric, key questions, behavioral expectations. Ready for use in 48h. |
| `/offer-review` | Audit draft offer for market fit, equity fairness, legal compliance before presentation. |

---

## Hooks (3+)

| Hook | Event | What It Protects Against |
|---|---|---|
| `hiring-compliance` | PostToolUse | Flags missing visa sponsorship status, false seniority claims, non-compliant benefits (PTO, equity vesting). |
| `offer-sanity-check` | PostToolUse | Validates offer components: salary in band, equity reasonable, sign-on not >25% base, equity cliff 1 year. |
| `session-summary` | Stop | Auto-logs to `session-log.md` at session end: candidates screened, interviews prepared, offers reviewed/approved, hires logged. |

---

## MCP Setup

No MCP servers required for core HR ops. Optional integrations:

### Firecrawl (Background Research)
Get your API key at [firecrawl.dev](https://www.firecrawl.dev/). Use for scraping LinkedIn profiles, company research on candidates.

```json
{
  "mcpServers": {
    "firecrawl": {
      "command": "npx",
      "args": ["@firecrawl/mcp"],
      "env": {
        "FIRECRAWL_API_KEY": "your-key-here"
      }
    }
  }
}
```

---

## How It Works

### 1. Candidate Screening
Every candidate is scored 0–100 across 4 dimensions: skill fit, culture alignment, compensation expectation, legal readiness. ADVANCE/HOLD/REJECT decision gates interview scheduling.

### 2. Interview Prep → Conduct → Score
Claude generates interview guide, rubric, and behavioral questions 48h before. Hiring manager conducts call, inputs notes. Claude scores and surfaces red flags.

### 3. Offer → Review → Approve → Send
Claude drafts competitive offer with salary benchmarks, equity breakdown, and sign-on bonus. Human reviews, requests changes, or approves. Only approved offers are sent.

### 4. Onboarding → Engagement → Offboarding
On hire, Claude builds onboarding checklist. Quarterly, Claude flags retention risk. On departure, Claude generates exit checklist and knowledge transfer docs.

### 5. Session Logging
Every action is logged to `session-log.md` with candidate name, role, ICP score, action type, status, and notes. Build a searchable history of your hiring.

---

## Hiring Criteria Matrix

Score every candidate 0–100 before screening begins.

| Dimension | High (25 pts) | Medium (15 pts) | Low (5 pts) |
|---|---|---|---|
| **Skills Fit** | 5+ core skills demonstrated | 3–4 core skills, some gaps | <3 core skills, major gaps |
| **Experience Level** | 5+ years in role | 2–4 years in role | <2 years or overqualified |
| **Culture Fit** | Aligns with 4+ company values | Aligns with 2–3 values | Misaligns with core values |
| **Compensation Expectation** | Within ±10% of band | Within ±20% of band | >20% of band or unclear |

**Decision Rule:**
- **ADVANCE (≥60):** Schedule interview.
- **HOLD (40–59):** Possible fit; interview only if pipeline thin or senior role.
- **REJECT (<40):** Pass. Not a fit.

---

## Tone & Output Rules

- **Voice:** Direct, respectful, professional. No corporate jargon.
- **Offer language:** Clear, transparent, no hidden clauses. Every term is negotiable.
- **Interview prep:** Behavioral, not gotcha. Focus on decision-making patterns, not algorithm quizzes.
- **Banned terminology (10):** "culture fit" (use "value alignment"), "passion" (use "commitment"), "rockstar," "ninja," "disruptive," "innovative," "game-changer," "synergy," "world-class," "bleeding edge."
- **Inclusive language:** Always use they/them unless told otherwise. Avoid assumptions about background, location, or family status.

---

## Human Approval Gate

**No offers are sent without explicit human approval.** This is non-negotiable.

- Claude drafts all offers, interview guides, and onboarding workflows.
- Hiring manager reviews, requests changes, or approves.
- Only after approval does the recruiter send via email or ATS.
- Approval is logged: `[APPROVED] Offer to [Candidate Name] for [Role] — 2026-06-12 14:35`

---

## Success Metrics

Track and report on:
- **Time to hire:** Target <30 days from screening to offer sign.
- **Screening accuracy:** Percentage of ADVANCE candidates who pass interviews (target >70%).
- **Offer acceptance rate:** Target >85% of offers accepted.
- **Onboarding completion:** 100% of new hires complete week-1 checklist.
- **Retention (first year):** Target >90% retention post-offer sign.

---

## Key Constraints

- **Legal/compliance:** Workspace flags requests for age/gender discrimination, illegal questions, or wrongful termination risks. These are not drafted.
- **Privacy:** Respects candidate data confidentiality; never shares details without consent.
- **Equal opportunity:** Interview questions are identical for all candidates in same role to ensure fairness.
- **Equity fairness:** Flags compensation proposals that create pay equity issues (same role, 20%+ variance without justification).
- **At-will employment:** Offers clearly state at-will employment and at-will termination clause.

---

## Stats

**8 skills** · **3 commands** · **3+ hooks** · **Full audit trail** via session logging · **0 MCP servers** required (optional Firecrawl for background research)

---

Built by [tushar2704](https://uitbreiden.com/) · [Claudient](https://github.com/Claudient/Claudient) · [Claude Code](https://claude.com/claude-code)
