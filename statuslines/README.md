# Claude Code Statusline Scripts

Six ready-to-use statusline scripts for Claude Code. Each script reads JSON on stdin and prints a single line to stdout — exactly what the `statusLine.command` setting expects.

---

## Scripts

| Script | Focus | Sample output |
|---|---|---|
| `minimal.sh` | Model + dir + branch | `[sonnet] claudient main` |
| `full.sh` | Everything in one line | `[sonnet] claudient:main | $0.0042 | +120/-30 | ▓▓░░░░░░░░ 20%` |
| `cost-watch.sh` | Spend + lines + colored context | `[sonnet] $0.0042 | 150 lines (+120/-30) | ctx 20%` |
| `context-budget.sh` | Big context bar + token count | `[sonnet] CTX [▓▓▓▓░░░░░░░░░░░░░░░░] 20% | 40K/200K tokens` |
| `git-focused.sh` | Branch, worktree, dirty state | `claudient | main | M:2 S:1 U:3 | [sonnet]` |
| `rate-limit.sh` | 5h rate limit bar | `[sonnet] RL 5h [▓▓░░░░░░░░] 20%` |

---

## Install

### 1. Make scripts executable

```bash
chmod +x /path/to/statuslines/*.sh
```

### 2. Point Claude Code at a script

Edit your `settings.json` (project-level at `.claude/settings.json`, or global at `~/.claude/settings.json`):

```json
{
  "statusLine": {
    "command": "/absolute/path/to/statuslines/minimal.sh"
  }
}
```

Replace `minimal.sh` with whichever script you want. Use the absolute path.

### 3. Verify jq is installed

All scripts require `jq` for full output. Install it if missing:

```bash
# macOS
brew install jq

# Debian/Ubuntu
sudo apt-get install jq

# Alpine
apk add jq
```

If `jq` is absent, scripts fall back to a minimal grep-based output so Claude Code never shows a blank statusline.

---

## Settings.json snippet (copy-paste ready)

```json
{
  "statusLine": {
    "command": "/Users/YOUR_USERNAME/statuslines/full.sh"
  }
}
```

To use a different script, change only the filename at the end of the path.

---

## Customization tips

- **Colors** — `cost-watch.sh` uses ANSI escape codes. If your terminal strips them, remove the color variables and `printf` calls and replace with plain `echo`.
- **Bar width** — In `context-budget.sh`, change the second argument to `make_bar` (default `20`) to any integer for a wider or narrower bar.
- **Warning thresholds** — Each script has clearly labeled threshold variables (e.g., `75` for context warning in `context-budget.sh`). Edit in place.
- **Model name shortening** — Scripts strip the `claude-` prefix and version numbers. Adjust the `sed` pipeline in any script to change this behavior.

---

## How it works

Claude Code calls `statusLine.command` after every turn and passes a JSON blob on stdin. The JSON includes fields like:

```
.model.display_name        — e.g. "claude-sonnet-4-5"
.workspace.current_dir     — absolute path of the working directory
.workspace.git_worktree    — current branch or worktree name
.workspace.repo.name       — repository name
.cost.total_cost_usd       — cumulative session cost
.cost.total_lines_added    — lines added in the session
.cost.total_lines_removed  — lines removed in the session
.context_window.used_percentage     — 0-100
.context_window.context_window_size — total tokens in the context window
.effort.level              — e.g. "low", "medium", "high"
.rate_limits.five_hour.used_percentage  — 5-hour rate limit usage
.session_name              — optional session label
```

Scripts parse this with `jq` and print exactly one line. Claude Code displays that line in the statusline area of its UI.

---

---

[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)

[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)
