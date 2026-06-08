#!/bin/bash
input=$(cat)
if ! command -v jq &>/dev/null; then echo "[no jq]"; exit 0; fi

CYAN=$'\033[0;36m'
YELLOW=$'\033[0;33m'
GREEN=$'\033[0;32m'
MAGENTA=$'\033[0;35m'
RESET=$'\033[0m'

repo=$(echo "$input" | jq -r '.workspace.repo.name // ""')
current_dir=$(echo "$input" | jq -r '.workspace.current_dir // ""')
version=$(echo "$input" | jq -r '.version // ""')

# Get branch via git CLI
branch=""
if [ -n "$current_dir" ] && [ -d "$current_dir" ]; then
  branch=$(git -C "$current_dir" branch --show-current 2>/dev/null)
  [ -z "$branch" ] && branch=$(git -C "$current_dir" rev-parse --abbrev-ref HEAD 2>/dev/null)
fi
[ -z "$branch" ] && branch="?"

# Repo label
if [ -n "$repo" ]; then
  repo_label="$repo"
elif [ -n "$current_dir" ]; then
  repo_label=$(basename "$current_dir")
else
  repo_label="."
fi

# Worktree detection via git internals
worktree_label=""
if [ -n "$current_dir" ] && [ -d "$current_dir" ]; then
  git_dir=$(git -C "$current_dir" rev-parse --git-dir 2>/dev/null)
  common_dir=$(git -C "$current_dir" rev-parse --git-common-dir 2>/dev/null)
  if [ -n "$git_dir" ] && [ -n "$common_dir" ] && [ "$git_dir" != "$common_dir" ]; then
    worktree_label=" ${CYAN}[worktree]${RESET}"
  fi
fi

# Version label
version_str=""
[ -n "$version" ] && version_str=" | ${MAGENTA}v${version}${RESET}"

out="${YELLOW}${repo_label}${RESET} ${GREEN}${branch}${RESET}${worktree_label}${version_str}"
printf "%s\n" "$out"
