#!/bin/bash
# context-budget.sh — Claude Code statusline: large visual context bar + token count + warning
# Format: CTX [▓▓▓▓▓░░░░░░░░░░░░░░░] pct% | used/total tokens  [WARNING if >75%]
# Bar is 20 characters wide for visibility. Prints a WARNING flag when usage exceeds 75%.
# Reads JSON from stdin, prints one line to stdout.

input=$(cat)

# Build a variable-width ▓░ progress bar
make_bar() {
  local pct=${1:-0}
  local width=${2:-20}
  local filled=$(( pct * width / 100 ))
  [ "$filled" -gt "$width" ] && filled=$width
  local empty=$(( width - filled ))
  local bar=""
  local i
  for ((i=0; i<filled; i++)); do bar="${bar}▓"; done
  for ((i=0; i<empty; i++)); do bar="${bar}░"; done
  echo "$bar"
}

# Human-readable token count (K or M)
format_tokens() {
  local n=${1:-0}
  if [ "$n" -ge 1000000 ]; then
    printf "%.1fM" "$(echo "scale=1; $n / 1000000" | bc 2>/dev/null || echo 0)"
  elif [ "$n" -ge 1000 ]; then
    printf "%.0fK" "$(echo "scale=0; $n / 1000" | bc 2>/dev/null || echo 0)"
  else
    echo "${n}"
  fi
}

if command -v jq &>/dev/null; then
  ctx_pct=$(echo "$input" | jq -r '.context_window.used_percentage // 0')
  ctx_size=$(echo "$input" | jq -r '.context_window.context_window_size // 0')
  model=$(echo "$input" | jq -r '.model.display_name // "claude"')
  effort=$(echo "$input" | jq -r '.effort.level // ""')

  ctx_int=$(printf "%.0f" "$ctx_pct" 2>/dev/null || echo "0")

  # Calculate used tokens from percentage and total
  used_tokens=0
  if [ "$ctx_size" -gt 0 ]; then
    used_tokens=$(echo "$ctx_int * $ctx_size / 100" | bc 2>/dev/null || echo 0)
  fi

  bar=$(make_bar "$ctx_int" 20)
  used_fmt=$(format_tokens "$used_tokens")
  total_fmt=$(format_tokens "$ctx_size")

  short_model=$(echo "$model" | sed 's/claude-//I' | sed 's/-[0-9]*-[0-9]*//' | cut -c1-14)

  # Warning flag
  if [ "$ctx_int" -ge 75 ]; then
    warning=" !! CONTEXT HIGH"
  else
    warning=""
  fi

  # Effort label
  if [ -n "$effort" ]; then
    effort_label=" effort:${effort}"
  else
    effort_label=""
  fi

  echo "[$short_model]${effort_label} CTX [${bar}] ${ctx_int}% | ${used_fmt}/${total_fmt} tokens${warning}"
else
  # Fallback without jq
  model=$(echo "$input" | grep -o '"display_name":"[^"]*"' | head -1 | sed 's/"display_name":"//;s/"//')
  ctx=$(echo "$input" | grep -o '"used_percentage":[0-9.]*' | head -1 | sed 's/"used_percentage"://')
  echo "[${model:-claude}] CTX ${ctx:-?}% (install jq for bar)"
fi
