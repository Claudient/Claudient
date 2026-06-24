#!/bin/bash

# pulse.sh - Futuristic UitKit Statusline
# Displays a real-time dashboard of session health and context.

# Colors
ORANGE='\033[38;5;208m'
CYAN='\033[38;5;45m'
GREEN='\033[38;5;82m'
GRAY='\033[38;5;240m'
NC='\033[0m' # No Color

# 1. Check for Active Swarms
SWARM_STATUS="[ ${GREEN}READY${NC} ]"
if [ -f "BATCH_QUEUE.md" ]; then
  SWARM_STATUS="[ ${ORANGE}NIGHT-SHIFT ACTIVE${NC} ]"
elif [ -f "HIVE_PLAN.md" ]; then
  SWARM_STATUS="[ ${CYAN}HIVE ACTIVE${NC} ]"
fi

# 2. Map Density
MAP_COUNT=0
if [ -f "CODEBASE_MAP.md" ]; then
  MAP_COUNT=$(grep -c "|" CODEBASE_MAP.md || echo 0)
fi

# 3. Memory Recap
MEM_HINT=""
if [ -f "docs/MEMORY_BANK.md" ]; then
  MEM_HINT="| 🧠 MEM"
fi

# 4. Context Budget (Estimated from history size)
# Claude Code keeps session history in ~/.claude/sessions/ (approximate logic)
# Here we'll just show the mapped file count for the 'Vibe'
MAP_STR="${GRAY}SATELLITE:${NC}${CYAN}${MAP_COUNT}${NC}"

# Final Statusline Output
echo -e "🧬 ${SWARM_STATUS} | ${MAP_STR} ${MEM_HINT} | ${ORANGE}UITKIT OS${NC}"
