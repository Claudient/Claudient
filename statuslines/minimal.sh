#!/bin/bash
input=$(cat)
if ! command -v jq &>/dev/null; then echo "[no jq]"; exit 0; fi

CYAN=$'\033[0;36m'
YELLOW=$'\033[0;33m'
GREEN=$'\033[0;32m'
RESET=$'\033[0m'

model=$(echo "$input" | jq -r '.model.display_name // "claude"')
current_dir=$(echo "$input" | jq -r '.workspace.current_dir // ""')
repo=$(echo "$input" | jq -r '.workspace.repo.name // ""')
branch=$(echo "$input" | jq -r '.workspace.git_worktree // ""')

short_model=$(echo "$model" | sed 's/^claude-//' | sed 's/-[0-9][0-9]*-[0-9][0-9]*//' | cut -c1-16)

if [ -n "$repo" ]; then
  dir_label="$repo"
elif [ -n "$current_dir" ]; then
  dir_label=$(basename "$current_dir")
else
  dir_label="."
fi

out="${CYAN}[${short_model}]${RESET} ${YELLOW}${dir_label}${RESET}"
[ -n "$branch" ] && out="${out} ${GREEN}${branch}${RESET}"
printf "%s\n" "$out"
