# PR Triage Agent

## What it does

Fires immediately when a new pull request is opened in the repository. Reads the PR diff, title, description, and linked issues, then: applies appropriate labels, writes a structured summary comment on the PR, flags any risk areas (breaking changes, missing tests, large diff, touches sensitive paths), and requests reviewers based on file ownership (CODEOWNERS or a configured mapping). The goal is to eliminate the manual overhead of initial PR triage.

## Trigger (schedule / GitHub event / API)

- Type: GitHub event
- Event: `pull_request.opened`
- Also fires on: `pull_request.ready_for_review` (when a draft PR is marked ready)
- Does not fire on: draft PRs being pushed to (only when explicitly marked ready)

## Setup

1. Create a GitHub App or fine-grained token with these permissions:
   - Pull requests: read and write (to post comments and apply labels)
   - Issues: read and write (to read linked issues)
   - Contents: read (to fetch the diff and CODEOWNERS)
   - Members: read (to resolve reviewer usernames)
2. Ensure these labels exist in the repo before the first run (the routine will not create them):
   `size/XS`, `size/S`, `size/M`, `size/L`, `size/XL`, `risk/breaking`, `risk/security`, `risk/db-migration`, `type/feature`, `type/fix`, `type/chore`, `type/docs`, `needs-tests`
3. Add a `CODEOWNERS` file or a `routines/pr-triage-owners.json` mapping paths to GitHub usernames.
4. Set environment variables:
   ```
   GITHUB_TOKEN=ghp_...
   GITHUB_REPO=owner/repo
   ```
5. Register this routine and bind it to the `pull_request.opened` and `pull_request.ready_for_review` webhook events.

## The routine prompt (the exact prompt the scheduled agent runs)

```
You are a pull request triage agent. A new PR has just been opened.

PR context injected at runtime:
- PR number: $PR_NUMBER
- Title: $PR_TITLE
- Body: $PR_BODY
- Author: $PR_AUTHOR
- Base branch: $PR_BASE
- Head branch: $PR_HEAD
- Diff URL: $PR_DIFF_URL
- Files changed: $PR_FILES (JSON array with filename, additions, deletions, patch)
- Linked issue numbers (from body): extracted by parsing "Closes #N" / "Fixes #N" patterns

Steps:

1. SIZE — count total lines changed (additions + deletions across all files).
   Apply exactly one size label:
   XS = <10 lines, S = 10–99, M = 100–299, L = 300–999, XL = 1000+

2. TYPE — infer from the PR title prefix and changed files:
   - feat:/feature → type/feature
   - fix:/bugfix → type/fix
   - chore:/deps/ci/build → type/chore
   - docs/readme/changelog only → type/docs
   If ambiguous, pick the most prominent type.

3. RISK FLAGS — apply risk labels if ANY of the following are true:
   - risk/breaking: title contains "breaking" or "BREAKING CHANGE", or a public API surface file is modified
   - risk/security: files under auth/, middleware/, crypto/, secrets/, or .env patterns are touched
   - risk/db-migration: files ending in .sql or under migrations/ are present in the diff

4. TESTS — if the diff adds functions/classes but no corresponding test files are changed or added, apply the label `needs-tests`.

5. REVIEWERS — load CODEOWNERS or pr-triage-owners.json. For each changed file, find the matching owner. Collect the unique set of owners excluding the PR author. Request review from up to 3 owners (most files owned, descending). Use the GitHub API: POST /repos/{repo}/pulls/{number}/requested_reviewers.

6. COMMENT — post a single structured comment to the PR using the GitHub API. Use this exact template:

---
## PR Triage Summary

**Type:** {type} | **Size:** {size} ({N} lines changed across {F} files)

### What this PR does
{2–4 sentence plain-English summary of the diff — focus on intent, not mechanics}

### Files touched
| File | +/- | Notes |
|------|-----|-------|
{one row per file; flag sensitive paths with a [!] prefix}

### Risk flags
{bulleted list of applied risk labels with one-line explanation each, or "None detected."}

### Linked issues
{comma-separated list of linked issue numbers with their titles, or "None linked."}

### Reviewer assignment
Requested review from: {comma-separated @mentions}

---
*Triaged automatically. Labels and reviewers can be adjusted manually.*

7. Apply all labels collected in steps 1–4 via the GitHub API: POST /repos/{repo}/issues/{number}/labels.

8. Return a summary: "Triaged PR #{number}: labels={labels}, reviewers={reviewers}."
```

## Outputs & notifications

- GitHub PR comment: structured triage summary posted as the first comment
- GitHub labels: applied immediately after the comment is posted
- GitHub reviewer request: sent to up to 3 owners
- Log: labels applied, reviewers requested, HTTP status codes for each API call
- On failure: if any API call fails, log the error with the PR number and payload — do not partially apply (attempt all operations, log all failures)

## Example run

**Trigger:** PR #312 opened — "feat: add Stripe webhook endpoint" by `@jsmith`

**Diff stats:** 6 files changed, 287 lines added, 14 deleted

**Analysis:**
- Size: M (301 lines total)
- Type: type/feature (feat: prefix, new route file added)
- Risk: risk/security (touches `middleware/auth.ts`)
- Tests: needs-tests (new handler added, no `*.test.ts` files in diff)
- Reviewers: `@alice` (owns `src/payments/`), `@bob` (owns `middleware/`)

**Labels applied:** `size/M`, `type/feature`, `risk/security`, `needs-tests`

**Comment posted:**

```
## PR Triage Summary

**Type:** feature | **Size:** M (301 lines changed across 6 files)

### What this PR does
Adds a new POST /webhooks/stripe endpoint that verifies Stripe signatures,
parses event types, and dispatches billing lifecycle events to the internal
event bus. Includes an idempotency check using the Stripe event ID.

### Files touched
| File | +/- | Notes |
|------|-----|-------|
| src/payments/stripe-webhook.ts | +198/-0 | New handler |
| [!] middleware/auth.ts | +12/-3 | Auth bypass for webhook path |
| src/routes/index.ts | +4/-1 | Route registration |
| config/stripe.ts | +31/-0 | Stripe SDK init |
| types/events.ts | +28/-5 | New event types |
| package.json | +14/-5 | Stripe SDK added |

### Risk flags
- **risk/security** — middleware/auth.ts modified; verify the webhook bypass is scoped correctly

### Linked issues
Closes #288 (Stripe webhooks not handled)

### Reviewer assignment
Requested review from: @alice, @bob

---
*Triaged automatically. Labels and reviewers can be adjusted manually.*
```
