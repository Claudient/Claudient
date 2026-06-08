#!/bin/bash
input=$(cat)
if ! command -v jq &>/dev/null; then echo "[no jq]"; exit 0; fi

GREEN=$'\033[0;32m'
YELLOW=$'\033[0;33m'
RED=$'\033[0;31m'
CYAN=$'\033[0;36m'
BOLD=$'\033[1m'
RESET=$'\033[0m'

make_bar() {
  local pct=${1:-0} width=${2:-10}
  local filled=$(( pct * width / 100 ))
  [ "$filled" -gt "$width" ] && filled=$width
  local empty=$(( width - filled )) bar="" i
  for ((i=0; i<filled; i++)); do bar="${bar}▓"; done
  for ((i=0; i<empty; i++)); do bar="${bar}░"; done
  echo "$bar"
}

format_tokens() {
  local n=${1:-0}
  if [ "$n" -ge 1000000 ] 2>/dev/null; then
    awk "BEGIN { printf \"%.1fM\", $n / 1000000 }"
  elif [ "$n" -ge 1000 ] 2>/dev/null; then
    awk "BEGIN { printf \"%.0fK\", $n / 1000 }"
  else
    echo "$n"
  fi
}

ctx_pct=$(echo "$input" | jq -r '.context_window.used_percentage // 0')
ctx_size=$(echo "$input" | jq -r '.context_window.context_window_size // 0')
effort=$(echo "$input" | jq -r '.effort.level // ""')

ctx_int=$(printf "%.0f" "$ctx_pct" 2>/dev/null || echo "0")

used_tokens=0
if [ "$ctx_size" -gt 0 ] 2>/dev/null; then
  used_tokens=$(awk "BEGIN { printf \"%d\", $ctx_int * $ctx_size / 100 }")
fi

bar=$(make_bar "$ctx_int" 10)
used_fmt=$(format_tokens "$used_tokens")
total_fmt=$(format_tokens "$ctx_size")

if [ "$ctx_int" -ge 80 ]; then
  bar_color="$RED"
elif [ "$ctx_int" -ge 50 ]; then
  bar_color="$YELLOW"
else
  bar_color="$GREEN"
fi

effort_str=""
[ -n "$effort" ] && effort_str=" | ${CYAN}effort:${effort}${RESET}"

out="${BOLD}CTX${RESET} [${bar_color}${bar}${RESET}] ${bar_color}${ctx_int}%${RESET} | ${used_fmt}/${total_fmt} tokens${effort_str}"
printf "%s\n" "$out"
