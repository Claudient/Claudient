#!/bin/bash
# git-focused.sh — Claude Code statusline: git state — branch, worktree, repo, dirty indicator
# Format: repo | branch [worktree] | dirty-state (M:N U:N) | model
# Calls "git status --porcelain" on the workspace dir to detect uncommitted changes.
# Reads JSON from stdin, prints one line to stdout.

input=$(cat)

if command -v jq &>/dev/null; then
  model=$(echo "$input" | jq -r '.model.display_name // "claude"')
  repo=$(echo "$input" | jq -r '.workspace.repo.name // ""')
  branch=$(echo "$input" | jq -r '.workspace.git_worktree // ""')
  current_dir=$(echo "$input" | jq -r '.workspace.current_dir // ""')

  short_model=$(echo "$model" | sed 's/claude-//I' | sed 's/-[0-9]*-[0-9]*//' | cut -c1-14)

  # Determine worktree label
  if [ -n "$branch" ]; then
    branch_label="$branch"
  else
    # Try to get branch from git directly
    if [ -n "$current_dir" ] && [ -d "$current_dir" ]; then
      branch_label=$(git -C "$current_dir" rev-parse --abbrev-ref HEAD 2>/dev/null || echo "?")
    else
      branch_label="?"
    fi
  fi

  # Repo label
  if [ -n "$repo" ]; then
    repo_label="$repo"
  elif [ -n "$current_dir" ]; then
    repo_label=$(basename "$current_dir")
  else
    repo_label="."
  fi

  # Dirty state: count modified and untracked files
  dirty_info=""
  if [ -n "$current_dir" ] && [ -d "$current_dir" ]; then
    git_status=$(git -C "$current_dir" status --porcelain 2>/dev/null)
    if [ -n "$git_status" ]; then
      modified=$(echo "$git_status" | grep -c '^ M\|^M \|^MM\|^AM\|^RM\|^CM' 2>/dev/null | tr -d '[:space:]' || echo 0)
      untracked=$(echo "$git_status" | grep -c '^??' 2>/dev/null | tr -d '[:space:]' || echo 0)
      staged=$(echo "$git_status" | grep -c '^[MADRCU]' 2>/dev/null | tr -d '[:space:]' || echo 0)
      dirty_info=" | M:${modified} S:${staged} U:${untracked}"
    else
      dirty_info=" | clean"
    fi
  fi

  # Worktree indicator (if branch label suggests a worktree path)
  if echo "$branch_label" | grep -q '/'; then
    worktree_label=" [worktree]"
  else
    worktree_label=""
  fi

  echo "${repo_label} | ${branch_label}${worktree_label}${dirty_info} | [${short_model}]"
else
  # Fallback without jq — try git directly
  branch=$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "?")
  repo=$(basename "$(git rev-parse --show-toplevel 2>/dev/null)" 2>/dev/null || echo "?")
  model=$(echo "$input" | grep -o '"display_name":"[^"]*"' | head -1 | sed 's/"display_name":"//;s/"//')
  echo "${repo} | ${branch} | [${model:-claude}]"
fi
