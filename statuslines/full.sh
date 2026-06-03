#!/bin/bash
# full.sh — Claude Code statusline: comprehensive one-liner with context bar
# Format: [model] repo:branch | $cost | +added/-removed | ▓▓▓▓░░░░░░ pct%
# Reads JSON from stdin, prints one line to stdout.

input=$(cat)

# Build a 10-character ▓░ progress bar given a percentage (0-100)
make_bar() {
  local pct=${1:-0}
  local filled=$(( pct * 10 / 100 ))
  [ "$filled" -gt 10 ] && filled=10
  local empty=$(( 10 - filled ))
  local bar=""
  local i
  for ((i=0; i<filled; i++)); do bar="${bar}▓"; done
  for ((i=0; i<empty; i++)); do bar="${bar}░"; done
  echo "$bar"
}

if command -v jq &>/dev/null; then
  model=$(echo "$input" | jq -r '.model.display_name // "claude"')
  repo=$(echo "$input" | jq -r '.workspace.repo.name // ""')
  branch=$(echo "$input" | jq -r '.workspace.git_worktree // ""')
  current_dir=$(echo "$input" | jq -r '.workspace.current_dir // ""')
  cost=$(echo "$input" | jq -r '.cost.total_cost_usd // 0')
  added=$(echo "$input" | jq -r '.cost.total_lines_added // 0')
  removed=$(echo "$input" | jq -r '.cost.total_lines_removed // 0')
  ctx_pct=$(echo "$input" | jq -r '.context_window.used_percentage // 0')

  # Shorten model name
  short_model=$(echo "$model" | sed 's/claude-//I' | sed 's/-[0-9]*-[0-9]*//' | cut -c1-16)

  # Build repo:branch segment
  if [ -n "$repo" ] && [ -n "$branch" ]; then
    location="${repo}:${branch}"
  elif [ -n "$repo" ]; then
    location="$repo"
  elif [ -n "$current_dir" ]; then
    location=$(basename "$current_dir")
  else
    location="."
  fi

  # Format cost to 4 decimal places
  cost_fmt=$(printf "%.4f" "$cost" 2>/dev/null || echo "$cost")

  # Round context percentage
  ctx_int=$(printf "%.0f" "$ctx_pct" 2>/dev/null || echo "0")

  bar=$(make_bar "$ctx_int")

  echo "[$short_model] $location | \$$cost_fmt | +${added}/-${removed} | $bar ${ctx_int}%"
else
  # Fallback without jq
  model=$(echo "$input" | grep -o '"display_name":"[^"]*"' | head -1 | sed 's/"display_name":"//;s/"//')
  echo "[${model:-claude}] (install jq for full statusline)"
fi
