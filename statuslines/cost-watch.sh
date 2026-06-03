#!/bin/bash
# cost-watch.sh — Claude Code statusline: spend-focused with ANSI color coding
# Format: $X.XXXX | N lines (+add/-rem) | context pct%
# Color thresholds on context: green <50%, yellow <80%, red >=80%
# Reads JSON from stdin, prints one line to stdout.
# Note: ANSI colors only render in terminals that support them.

input=$(cat)

# ANSI color codes
RED='\033[0;31m'
YELLOW='\033[0;33m'
GREEN='\033[0;32m'
RESET='\033[0m'

if command -v jq &>/dev/null; then
  model=$(echo "$input" | jq -r '.model.display_name // "claude"')
  cost=$(echo "$input" | jq -r '.cost.total_cost_usd // 0')
  added=$(echo "$input" | jq -r '.cost.total_lines_added // 0')
  removed=$(echo "$input" | jq -r '.cost.total_lines_removed // 0')
  ctx_pct=$(echo "$input" | jq -r '.context_window.used_percentage // 0')
  session=$(echo "$input" | jq -r '.session_name // ""')

  short_model=$(echo "$model" | sed 's/claude-//I' | sed 's/-[0-9]*-[0-9]*//' | cut -c1-14)

  cost_fmt=$(printf "\$%.4f" "$cost" 2>/dev/null || echo "\$$cost")

  ctx_int=$(printf "%.0f" "$ctx_pct" 2>/dev/null || echo "0")
  total_lines=$(( added + removed ))

  # Pick color based on context usage
  if [ "$ctx_int" -ge 80 ]; then
    ctx_color="$RED"
  elif [ "$ctx_int" -ge 50 ]; then
    ctx_color="$YELLOW"
  else
    ctx_color="$GREEN"
  fi

  # Session label if present
  if [ -n "$session" ]; then
    session_label=" [$session]"
  else
    session_label=""
  fi

  printf "${RESET}[%s]%s %s | %d lines (+%d/-%d) | ${ctx_color}ctx %d%%${RESET}\n" \
    "$short_model" "$session_label" "$cost_fmt" "$total_lines" "$added" "$removed" "$ctx_int"
else
  # Fallback without jq
  model=$(echo "$input" | grep -o '"display_name":"[^"]*"' | head -1 | sed 's/"display_name":"//;s/"//')
  cost=$(echo "$input" | grep -o '"total_cost_usd":[0-9.]*' | head -1 | sed 's/"total_cost_usd"://')
  echo "[${model:-claude}] \$${cost:-0.0000} (install jq for full output)"
fi
