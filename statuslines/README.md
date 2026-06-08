# Claude Code Statusline Scripts

## Quick Install

**1. Make scripts executable**

```bash
chmod +x /path/to/statuslines/*.sh
```

**2. Add to `.claude/settings.json` (project) or `~/.claude/settings.json` (global)**

```json
{
  "statusLine": {
    "command": "/absolute/path/to/statuslines/minimal.sh"
  }
}
```

Replace `minimal.sh` with whichever script you want. Requires an absolute path.

**3. Verify `jq` is installed** — all scripts depend on it

```bash
# macOS
brew install jq

# Debian/Ubuntu
sudo apt-get install jq

# Alpine
apk add jq
```

If `jq` is missing, scripts print `[no jq]` and exit cleanly — Claude Code never shows a blank statusline.

---

## Scripts

| Script | Focus | Sample output |
|---|---|---|
| `minimal.sh` | Model + dir + branch | `[sonnet] claudient main` |
| `full.sh` | Everything in one line | `[sonnet] claudient:main | $0.03 | +42/-5 | ▓▓░░░░░░░░ 20%` |
| `cost-watch.sh` | Spend + lines + colored context | `$0.03 | +42/-5 lines | CTX 20%` |
| `context-budget.sh` | Visual bar + token count + effort | `CTX [▓▓▓▓░░░░░░] 47% | 94K/200K tokens | effort:high` |
| `git-focused.sh` | Branch, worktree flag, version | `claudient main [worktree] | v1.2.3` |
| `rate-limit.sh` | 5h rate limit bar + model + cost | `5h:[▓▓▓░░] 34% | [sonnet] $0.03` |

---

## STDIN JSON fields

Claude Code passes a JSON blob on stdin after every turn. Scripts parse these fields:

```
.model.display_name                    — e.g. "claude-sonnet-4-6"
.workspace.current_dir                 — absolute path of working directory
.workspace.repo.name                   — repository name
.workspace.git_worktree                — current branch or worktree name
.cost.total_cost_usd                   — cumulative session cost
.cost.total_lines_added                — lines added this session
.cost.total_lines_removed              — lines removed this session
.context_window.used_percentage        — 0–100
.context_window.context_window_size    — total token capacity
.effort.level                          — "low" | "medium" | "high"
.rate_limits.five_hour.used_percentage — 5-hour window usage
.version                               — Claude Code version string
```

All fields may be null or absent. Scripts use `jq`'s `// default` syntax throughout.

---

## Color thresholds

Scripts apply consistent ANSI color coding:

| Range | Color | Meaning |
|---|---|---|
| 0–49% | green | healthy |
| 50–79% | yellow | watch it |
| 80–100% | red | act now |

---

## Customization

- **Bar width** — change the second argument to `make_bar` (e.g. `make_bar "$pct" 20`)
- **Cost precision** — adjust `printf "%.2f"` to `"%.4f"` for more decimal places
- **Model shortening** — scripts strip `claude-` prefix and version suffixes via `sed`; edit the pipeline to taste
- **No color** — replace `printf` calls with plain `echo` and remove the color variables

---

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
