#!/bin/bash
input=$(cat)
if ! command -v jq &>/dev/null; then echo "[no jq]"; exit 0; fi

CYAN=$'\033[0;36m'
YELLOW=$'\033[0;33m'
GREEN=$'\033[0;32m'
BLUE=$'\033[0;34m'
RED=$'\033[0;31m'
RESET=$'\033[0m'

make_bar() {
  local pct=${1:-0} width=10
  local filled=$(( pct * width / 100 ))
  [ "$filled" -gt "$width" ] && filled=$width
  local empty=$(( width - filled )) bar="" i
  for ((i=0; i<filled; i++)); do bar="${bar}▓"; done
  for ((i=0; i<empty; i++)); do bar="${bar}░"; done
  echo "$bar"
}

model=$(echo "$input" | jq -r '.model.display_name // "claude"')
repo=$(echo "$input" | jq -r '.workspace.repo.name // ""')
branch=$(echo "$input" | jq -r '.workspace.git_worktree // ""')
current_dir=$(echo "$input" | jq -r '.workspace.current_dir // ""')
cost=$(echo "$input" | jq -r '.cost.total_cost_usd // 0')
added=$(echo "$input" | jq -r '.cost.total_lines_added // 0')
removed=$(echo "$input" | jq -r '.cost.total_lines_removed // 0')
ctx_pct=$(echo "$input" | jq -r '.context_window.used_percentage // 0')

short_model=$(echo "$model" | sed 's/^claude-//' | sed 's/-[0-9][0-9]*-[0-9][0-9]*//' | cut -c1-16)

if [ -n "$repo" ] && [ -n "$branch" ]; then
  location="${repo}:${branch}"
elif [ -n "$repo" ]; then
  location="$repo"
elif [ -n "$current_dir" ]; then
  location=$(basename "$current_dir")
else
  location="."
fi

cost_fmt=$(printf "\$%.2f" "$cost" 2>/dev/null || echo "\$$cost")
ctx_int=$(printf "%.0f" "$ctx_pct" 2>/dev/null || echo "0")
bar=$(make_bar "$ctx_int")

if [ "$ctx_int" -ge 80 ]; then
  bar_color="$RED"
elif [ "$ctx_int" -ge 50 ]; then
  bar_color="$YELLOW"
else
  bar_color="$GREEN"
fi

out="${CYAN}[${short_model}]${RESET} ${YELLOW}${location}${RESET} | ${GREEN}${cost_fmt}${RESET} | ${BLUE}+${added}/-${removed}${RESET} | ${bar_color}${bar} ${ctx_int}%${RESET}"
printf "%s\n" "$out"
