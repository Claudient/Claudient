#!/bin/bash

# secret-scanner.sh
# Scans tool arguments for hardcoded secrets before execution.

TOOL_NAME="$1"
TOOL_ARGS="$2"

# Only scan tools that write data or execute commands
if [[ "$TOOL_NAME" != "Replace" && "$TOOL_NAME" != "WriteFile" && "$TOOL_NAME" != "Bash" ]]; then
  exit 0
fi

# Define regex patterns for common secrets
# AWS Access Key ID
AWS_REGEX="AKIA[0-9A-Z]{16}"
# Stripe Secret Key
STRIPE_REGEX="sk_live_[0-9a-zA-Z]{24}"
# Generic generic private key header
RSA_REGEX="-----BEGIN (RSA|OPENSSH) PRIVATE KEY-----"

# Check for matches
DETECTED=""

if echo "$TOOL_ARGS" | grep -qE "$AWS_REGEX"; then
  DETECTED="AWS Access Key"
elif echo "$TOOL_ARGS" | grep -qE "$STRIPE_REGEX"; then
  DETECTED="Stripe Live Key"
elif echo "$TOOL_ARGS" | grep -qE "$RSA_REGEX"; then
  DETECTED="Private RSA/SSH Key"
fi

if [[ -n "$DETECTED" ]]; then
  echo "🚨 SECURITY ALERT: Execution Blocked!"
  echo "The secret scanner detected a hardcoded $DETECTED in the tool arguments."
  echo "Claude: You MUST NOT hardcode secrets. Rewrite your response to use environment variables (e.g., process.env, os.environ) instead."
  
  # Exit with a non-zero status to abort the tool execution
  exit 1
fi

# If clean, allow execution
exit 0
