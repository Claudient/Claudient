#!/bin/bash

# install-aliases.sh
# Sets up high-speed UitKit shell aliases.

ALIAS_FILE="$HOME/.uitkit_aliases"

cat << 'EOF' > "$ALIAS_FILE"
# UitKit Power Aliases
alias cx="npx uitkit"
alias cxd="cx doctor"
alias cxs="cx score"
alias cxa="cx audit"
alias cxc="cx consult"
alias cxb="cx benchmark"
EOF

echo "✅ Aliases written to $ALIAS_FILE"
echo "Add this to your .zshrc or .bashrc:"
echo "  source $ALIAS_FILE"
