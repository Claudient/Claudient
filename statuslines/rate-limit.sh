#!/bin/bash
input=$(cat)
if ! command -v jq &>/dev/null; then echo "[no jq]"; exit 0; fi

GREEN=$'\033[0;32m'
YELLOW=$'\033[0;33m'
RED=$'\033[0;31m'
CYAN=$'\033[0;36m'
RESET=$'\033[0m'

make_bar() {
  local pct=${1:-0} width=${2:-5}
  local filled=$(( pct * width / 100 ))
  [ "$filled" -gt "$width" ] && filled=$width
  local empty=$(( width - filled )) bar="" i
  for ((i=0; i<filled; i++)); do bar="${bar}▓"; done
  for ((i=0; i<empty; i++)); do bar="${bar}░"; done
  echo "$bar"
}

model=$(echo "$input" | jq -r '.model.display_name // "claude"')
rl_5h=$(echo "$input" | jq -r '.rate_limits.five_hour.used_percentage // 0')
cost=$(echo "$input" | jq -r '.cost.total_cost_usd // 0')

short_model=$(echo "$model" | sed 's/^claude-//' | sed 's/-[0-9][0-9]*-[0-9][0-9]*//' | cut -c1-16)

rl_int=$(printf "%.0f" "$rl_5h" 2>/dev/null || echo "0")
cost_fmt=$(printf "\$%.2f" "$cost" 2>/dev/null || echo "\$$cost")
bar=$(make_bar "$rl_int" 5)

if [ "$rl_int" -ge 80 ]; then
  rl_color="$RED"
elif [ "$rl_int" -ge 50 ]; then
  rl_color="$YELLOW"
else
  rl_color="$GREEN"
fi

out="${rl_color}5h:[${bar}] ${rl_int}%${RESET} | ${CYAN}[${short_model}]${RESET} ${GREEN}${cost_fmt}${RESET}"
printf "%s\n" "$out"
