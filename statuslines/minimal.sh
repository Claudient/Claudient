#!/bin/bash
# minimal.sh — Claude Code statusline: "[model] dir-basename git-branch"
# Reads JSON from stdin (Claude Code statusLine format), prints one line to stdout.
# Format: [ModelName] current-dir-basename branch-name

input=$(cat)

if command -v jq &>/dev/null; then
  model=$(echo "$input" | jq -r '.model.display_name // "claude"')
  current_dir=$(echo "$input" | jq -r '.workspace.current_dir // ""')
  repo_name=$(echo "$input" | jq -r '.workspace.repo.name // ""')
  branch=$(echo "$input" | jq -r '.workspace.git_worktree // ""')

  # Use repo name if available, otherwise basename of current_dir
  if [ -n "$repo_name" ]; then
    dir_label="$repo_name"
  elif [ -n "$current_dir" ]; then
    dir_label=$(basename "$current_dir")
  else
    dir_label="."
  fi

  # Shorten model name: strip vendor prefix if present
  short_model=$(echo "$model" | sed 's/claude-//I' | sed 's/-[0-9]*-[0-9]*//' | cut -c1-16)

  if [ -n "$branch" ]; then
    echo "[$short_model] $dir_label $branch"
  else
    echo "[$short_model] $dir_label"
  fi
else
  # Fallback: no jq — extract model with grep/sed
  model=$(echo "$input" | grep -o '"display_name":"[^"]*"' | head -1 | sed 's/"display_name":"//;s/"//')
  echo "[${model:-claude}]"
fi
