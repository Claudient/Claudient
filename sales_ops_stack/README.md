# Sales Operations Stack

> The complete Claude Code workspace for B2B sales operations — pipeline audits, deal analysis, forecasting, territory planning, and sales enablement. Streamline revenue processes with built-in data validation, risk detection, and real-time reporting.

---

## Quick Start

1. **Copy this folder** into your Claude Code workspace or project.
2. **Add MCP servers** — Configure Anthropic Files API and Google Sheets in `settings.json` for pipeline data integration.
3. **Set your targets** — Open `CLAUDE.md`, customize your sales process stages, rep ramp targets, and forecast methodology.
4. **Run `/audit-pipeline`** — Get a comprehensive health check: stage distribution, stuck deals, data quality issues, bottlenecks.
5. **Run `/analyze-deal [deal-id]`** — Deep dive on a specific deal: risk factors, stage probability, next actions, stakeholders.
6. **Run `/generate-forecast`** — Build a sales forecast with historical win rates, cycle times, stage weights, and risk-adjusted revenue.

---

## What's Inside

| File/Folder | Type | Purpose |
|---|---|---|
| `CLAUDE.md` | Config | Workspace rules, sales process stages, rep ramp parameters, target metrics, and data validation rules. Start here. |
| `session-log.md` | Log | Auto-updated with every action: pipeline audits, deal analyses, forecast runs, stage transitions, risk flags. |
| `skills/` | Directory | 8 reusable skills for pipeline management, deal analysis, forecasting, territory planning, and sales enablement. |
| `commands/` | Directory | 3 slash commands for common sales ops workflows. |
| `hooks/` | Directory | 4 automated data validation and risk detection workflows. |
| `mcp/` | Directory | MCP server configurations for CRM integration and data sources. |

---

## Skills (8)

| Skill | Trigger | Tools Used | Purpose |
|---|---|---|---|
| `pipeline-auditor` | `/audit-pipeline` | WebFetch, Read, Write | Audit pipeline health: stage distribution, stuck deals, velocity, conversion rates, forecast accuracy |
| `deal-analyzer` | `/analyze-deal` | Read, Write, WebFetch | Deep dive: deal size, stage probability, risk factors, stakeholder map, next actions |
| `forecast-builder` | `/generate-forecast` | Read, Write | Build rolling 13-week forecast with stage weights, historical close rates, pipeline velocity, risk adjustments |
| `territory-planner` | `/plan-territory` | Read, Write, WebFetch | Optimize territory assignment: workload balance, account segmentation, ramp profiles, quota alignment |
| `deal-stage-scorer` | Before stage move | Read, Write | Score deal advancement: criteria checklist, stage validation, qualification gates, risk signals |
| `sales-enablement-creator` | On demand | Read, Write | Create sales plays, battlecards, objection handlers, and competitor guides |
| `ramp-tracker` | Monthly check-in | Read, Write | Track new rep productivity: ramp curve, deal progression, activity metrics, coaching gaps |
| `sales-metrics-reporter` | Monthly/quarterly | Read, Write | Generate executive reports: ACV, velocity, conversion rates, pipeline health, forecast vs. actual |

---

## Commands (3)

| Command | What It Does |
|---|---|
| `/audit-pipeline` | Comprehensive pipeline health check. Analyzes stage distribution, conversion funnel, cycle time, stuck deals, data quality, and forecast accuracy. Outputs to session log. |
| `/analyze-deal` | Deep dive analysis on a specific deal. Scores risk, probability, next actions, stakeholder alignment, and competitive position. |
| `/generate-forecast` | Build a rolling 13-week sales forecast with stage-weighted pipeline, historical conversion rates, velocity analysis, and risk adjustments. |

---

## Hooks (4)

| Hook | Event | What It Protects Against |
|---|---|---|
| `pipeline-validation` | PreToolUse | Checks required fields (account, deal value, stage, owner, close date); flags incomplete or malformed records |
| `deal-risk-detector` | PostToolUse | Flags deals at risk: long cycle time, no recent activity, missing stakeholder engagement, low probability vs. close date |
| `forecast-accuracy-tracker` | PostToolUse | Logs forecast runs; compares to actuals and previous forecasts; tracks variance and model adjustments |
| `stage-transition-logger` | PreToolUse | Logs deal movements: from stage, to stage, date, reason; used for velocity analysis and bottleneck detection |

---

## MCP Setup

### Anthropic Files API

Enables storage and retrieval of large pipeline datasets, historical reports, and analysis files.

```json
{
  "mcpServers": {
    "files": {
      "command": "npx",
      "args": ["@anthropic-ai/mcp-server-files"],
      "env": {
        "ANTHROPIC_API_KEY": "your-key-here"
      }
    }
  }
}
```

### Google Sheets Integration

Connect your live CRM export or pipeline snapshot sheet for real-time data analysis.

```json
{
  "mcpServers": {
    "google-sheets": {
      "command": "npx",
      "args": ["@anthropic-ai/mcp-server-google-sheets"],
      "env": {
        "GOOGLE_SHEETS_API_KEY": "your-key-here",
        "SHEET_ID": "your-sheet-id-here"
      }
    }
  }
}
```

---

## How It Works

### 1. Pipeline Foundation
Define your sales process stages, typical cycle time, and qualification gates in CLAUDE.md. All analysis builds from this baseline.

### 2. Continuous Validation
Hooks validate required fields and flag missing data before analysis. Deal records must include: account name, deal value, stage, owner, close date, and probability.

### 3. Risk Detection
Automated detection of stuck deals (no activity >14 days), stage mismatches (long cycle time in early stages), and probability drift.

### 4. Forecasting
Build rolling forecasts using historical conversion rates by stage, weighted pipeline, and velocity analysis. Compare to actuals each month.

### 5. Session Logging
Every audit, analysis, and forecast is logged to `session-log.md` with timestamp, findings, and next actions.

---

## Sales Process Definition

Default 5-stage sales process (customize in CLAUDE.md):

1. **Prospect** (0–1 week) — Lead qualified, discovery meeting scheduled
2. **Qualification** (1–2 weeks) — Confirmed pain, budget, and timeline
3. **Solution Design** (2–4 weeks) — Proposal drafted, stakeholder alignment
4. **Negotiation** (1–2 weeks) — Legal review, pricing finalized, contract pending
5. **Closed/Won** — Deal signed and closed

---

## Data Quality Standards

All pipeline records must include:

- **Account Name** — Company name (required)
- **Deal Value (USD)** — Contract amount (required, >$0)
- **Sales Stage** — One of: Prospect, Qualification, Solution Design, Negotiation, Closed/Won (required)
- **Deal Owner** — Assigned sales rep (required)
- **Close Date (Target)** — Expected close date (required, future date)
- **Close Date (Actual)** — Filled on close (required for Closed/Won only)
- **Probability (%)** — Deal likelihood 0–100 (required, increases per stage)
- **Last Activity Date** — Most recent contact/update (required, <14 days old)
- **Stakeholder Engagement** — Level: Low/Medium/High (required)
- **Competitive Position** — Win probability vs. competitors (optional, but recommended)

---

## Key Metrics Tracked

Track and report on:

- **Pipeline Value** — Total in Prospect through Negotiation (excludes closed)
- **Weighted Pipeline** — Sum of (deal value × stage probability)
- **Average Deal Velocity** — Days per stage
- **Conversion Rates** — % advancing stage-to-stage
- **Forecast Accuracy** — Variance between forecast and actual (target <±10%)
- **Rep Ramp Velocity** — Time to quota for new hires
- **Cost of Sale** — Sales expense per closed deal
- **Win Rate** — % of deals advancing to Closed/Won
- **Sales Cycle Length** — Days from Prospect to Closed/Won

---

## Human Approval & Data Governance

**All pipeline changes are logged and reviewed.** This ensures:

- Deal stage movements are justified and documented
- High-value deals (>$100K) have stakeholder confirmation before advancing
- Forecast changes are explainable and tracked
- Data quality is maintained across all records
- Risk flags are escalated to leadership within 24 hours

---

## Success Metrics

Track monthly and report quarterly:

- **Forecast Accuracy:** Actual pipeline value vs. forecast (target <±10% variance)
- **Conversion Velocity:** Avg days in each stage (track trending; target: stable or improving)
- **Win Rate Cohort Tracking:** By rep, by segment, by deal size
- **Rep Ramp:** % of new hires at quota by month 6 (target >75%)
- **Data Quality Score:** % of records with all required fields populated (target >98%)
- **Risk Mitigation:** % of flagged deals remediated within 7 days (target >85%)

---

## Key Constraints

- **Data Integrity:** Only approved CRM data sources allowed; manual adjustments require human documentation.
- **Forecast Realism:** Forecasts are based on historical conversion rates; no subjective uplifts without explicit business case.
- **Risk Transparency:** All flagged deals escalated to VP Sales within 24 hours.
- **Quota Alignment:** Territory quotas align with capacity, ramp plan, and historical productivity benchmarks.
- **Confidentiality:** All deal analysis and competitive intelligence restricted to authorized users.

---

## Stats

**8 skills** · **3 commands** · **4 hooks** · **2 MCP servers** (Files API + Google Sheets) · **Full audit trail** via session logging

---

Built by [tushar2704](https://uitbreiden.com/) · [Claudient](https://github.com/Claudient/Claudient) · [Claude Code](https://claude.com/claude-code)
