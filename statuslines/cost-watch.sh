#!/bin/bash
input=$(cat)
if ! command -v jq &>/dev/null; then echo "[no jq]"; exit 0; fi

GREEN=$'\033[0;32m'
YELLOW=$'\033[0;33m'
RED=$'\033[0;31m'
CYAN=$'\033[0;36m'
RESET=$'\033[0m'

cost=$(echo "$input" | jq -r '.cost.total_cost_usd // 0')
added=$(echo "$input" | jq -r '.cost.total_lines_added // 0')
removed=$(echo "$input" | jq -r '.cost.total_lines_removed // 0')
ctx_pct=$(echo "$input" | jq -r '.context_window.used_percentage // 0')

cost_fmt=$(printf "\$%.2f" "$cost" 2>/dev/null || echo "\$$cost")
ctx_int=$(printf "%.0f" "$ctx_pct" 2>/dev/null || echo "0")

if [ "$ctx_int" -ge 80 ]; then
  ctx_color="$RED"
elif [ "$ctx_int" -ge 50 ]; then
  ctx_color="$YELLOW"
else
  ctx_color="$GREEN"
fi

out="${GREEN}${cost_fmt}${RESET} | ${CYAN}+${added}/-${removed} lines${RESET} | ${ctx_color}CTX ${ctx_int}%${RESET}"
printf "%s\n" "$out"
