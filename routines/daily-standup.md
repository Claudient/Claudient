# Daily Standup Summarizer

## What it does

Runs every weekday morning before the team's standup meeting. Pulls all overnight activity from GitHub — commits merged to the main branch, PRs opened or closed, and issues updated — then synthesizes a concise standup post and sends it to a configured Slack channel. The post is structured around the three standup questions: what shipped, what is in progress, and what is blocked.

## Trigger (schedule / GitHub event / API)

- Type: schedule
- Cron: `0 8 * * 1-5` (08:00 local time, Monday through Friday)
- Timezone: set in routine config (e.g., `America/New_York`)
- No GitHub event required; the routine polls the API on each run

## Setup

1. Create a GitHub fine-grained token with read access to the target repo (contents, pull requests, issues).
2. Create a Slack incoming webhook URL for the target channel (e.g., `#standup`).
3. Add both to your Claude Code environment:
   ```
   GITHUB_TOKEN=ghp_...
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/...
   GITHUB_REPO=owner/repo
   STANDUP_CHANNEL=#standup
   ```
4. Register this routine file in your Claude Code routines config and set the schedule.

## The routine prompt (the exact prompt the scheduled agent runs)

```
You are a standup assistant for a software development team.

Context:
- Repo: $GITHUB_REPO
- Lookback window: the last 18 hours (captures overnight activity even with timezone variance)
- Today: $TODAY (weekday, local team time)

Steps:
1. Use the GitHub API to fetch:
   a. All commits pushed to the default branch in the last 18 hours. For each commit, note: SHA (short), author, message, timestamp.
   b. All pull requests opened, merged, or closed in the last 18 hours. For each PR, note: number, title, author, state, linked issues.
   c. All issues opened, commented on, or closed in the last 18 hours. Flag any labeled "blocked" or "needs-review".

2. Cluster the commits and PRs by logical theme if possible (e.g., feature area, service name). Use PR titles and commit message prefixes (feat:, fix:, chore:) as signals.

3. Write a standup post in this exact format:

---
*Daily Standup — {DAY}, {DATE}*

*Shipped overnight*
• [bullet per merged PR or significant commit cluster — one line each, plain English, no jargon]

*In progress*
• [bullet per open PR or active branch with commits in the window]

*Needs attention*
• [bullet per blocked issue, stale PR (no activity > 48h), or failed CI run if detectable]

*Stats*
Commits: N | PRs merged: N | Issues closed: N
---

4. If there is nothing to report in a section, write "Nothing to report." — do not omit the section.

5. Send the post to Slack via POST to $SLACK_WEBHOOK_URL with payload:
   {"text": "<the standup post above>", "channel": "$STANDUP_CHANNEL"}

6. Return a one-line confirmation: "Standup posted for {DATE}: N commits, N PRs, N issues."
```

## Outputs & notifications

- Primary output: a formatted Slack message posted to the configured channel
- Log: the routine logs the GitHub API response counts and the final Slack HTTP status code
- On failure: if the Slack webhook returns non-200, the routine retries once after 60 seconds, then logs the error and exits — no partial posts

## Example run

**Trigger:** Monday 08:00 ET, 2026-06-08

**GitHub activity found:**
- 4 commits to `main` (feat: add billing webhook handler, fix: null check in user service, chore: bump eslint, chore: update lockfile)
- 2 PRs merged (#241 "Add billing webhook", #238 "Fix null check in user service")
- 1 PR open (#243 "Migrate auth to Clerk — WIP")
- 1 issue updated (#199 "Stripe webhook not firing") — closed by #241

**Slack post:**

```
Daily Standup — Monday, June 8 2026

Shipped overnight
• Billing webhook handler added and wired to Stripe events (#241)
• Null pointer fix in user service — resolves crash on anonymous sessions (#238)

In progress
• Auth migration to Clerk underway — PR #243 open, not yet ready for review

Needs attention
• Nothing to report.

Stats
Commits: 4 | PRs merged: 2 | Issues closed: 1
```

**Routine log:** `Standup posted for 2026-06-08: 4 commits, 2 PRs, 1 issue. Slack HTTP 200.`
