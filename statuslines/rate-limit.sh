#!/bin/bash
# rate-limit.sh — Claude Code statusline: 5-hour rate limit usage with visual bars
# Format: RL 5h [▓▓▓░░░░░░░] pct% | model
# Shows 5-hour rate limit usage percentage with a 10-char bar.
# Reads JSON from stdin, prints one line to stdout.

input=$(cat)

# Build a 10-character ▓░ progress bar
make_bar() {
  local pct=${1:-0}
  local width=${2:-10}
  local filled=$(( pct * width / 100 ))
  [ "$filled" -gt "$width" ] && filled=$width
  local empty=$(( width - filled ))
  local bar=""
  local i
  for ((i=0; i<filled; i++)); do bar="${bar}▓"; done
  for ((i=0; i<empty; i++)); do bar="${bar}░"; done
  echo "$bar"
}

if command -v jq &>/dev/null; then
  model=$(echo "$input" | jq -r '.model.display_name // "claude"')
  rl_5h=$(echo "$input" | jq -r '.rate_limits.five_hour.used_percentage // 0')

  short_model=$(echo "$model" | sed 's/claude-//I' | sed 's/-[0-9]*-[0-9]*//' | cut -c1-14)

  rl_5h_int=$(printf "%.0f" "$rl_5h" 2>/dev/null || echo "0")

  bar_5h=$(make_bar "$rl_5h_int" 10)

  # Alert flag if rate limit is high
  if [ "$rl_5h_int" -ge 90 ]; then
    alert=" !! RATE LIMIT NEAR"
  elif [ "$rl_5h_int" -ge 70 ]; then
    alert=" ! slow down"
  else
    alert=""
  fi

  echo "[${short_model}] RL 5h [${bar_5h}] ${rl_5h_int}%${alert}"
else
  # Fallback without jq
  model=$(echo "$input" | grep -o '"display_name":"[^"]*"' | head -1 | sed 's/"display_name":"//;s/"//')
  rl=$(echo "$input" | grep -o '"five_hour":{[^}]*}' | grep -o '"used_percentage":[0-9.]*' | sed 's/"used_percentage"://')
  echo "[${model:-claude}] RL 5h ${rl:-?}% (install jq for bars)"
fi
