#!/bin/bash

# rate-limit-handler.sh
# Pauses Claude Code execution when API rate limits are hit.

NOTIFY_TYPE="$1"
NOTIFY_MSG="$2"

# Convert message to lowercase for easier matching
MSG_LOWER=$(echo "$NOTIFY_MSG" | tr '[:upper:]' '[:lower:]')

# Define our trigger conditions
IS_RATE_LIMIT=false

if [[ "$MSG_LOWER" == *"rate limit"* ]] || \
   [[ "$MSG_LOWER" == *"429"* ]] || \
   [[ "$MSG_LOWER" == *"too many requests"* ]] || \
   [[ "$MSG_LOWER" == *"capacity"* ]]; then
  IS_RATE_LIMIT=true
fi

if [[ "$IS_RATE_LIMIT" == true ]]; then
  echo "⚠️  RATE LIMIT DETECTED BY UITKIT HOOK ⚠️"
  echo "Message: $NOTIFY_MSG"
  echo "Entering Night Shift preservation mode. Pausing execution for 5 minutes to let API limits reset..."
  
  # Sleep for 300 seconds (5 minutes)
  # This blocks the Claude Code Node.js process via the hook execution,
  # effectively pausing the agent without terminating the session.
  
  # Countdown loop for UX
  for i in {300..1}; do
    echo -ne "Resuming in $i seconds...\033[0K\r"
    sleep 1
  done
  
  echo -e "\n✅ Cooldown complete. Resuming autonomous execution."
fi

# Always exit 0 so Claude can continue after the sleep (or immediately if no rate limit)
exit 0
