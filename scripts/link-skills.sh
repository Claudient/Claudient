#!/usr/bin/env bash
# link-skills.sh — symlink all Claudient skills to ~/.claude/skills for local development

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CLAUDE_DIR="${HOME}/.claude"
SKILLS_DEST="${CLAUDE_DIR}/skills"

if [ ! -d "${CLAUDE_DIR}" ]; then
  echo "Error: ~/.claude not found. Install Claude Code first."
  exit 1
fi

mkdir -p "${SKILLS_DEST}"

linked=0
for category_dir in "${REPO_ROOT}/skills"/*/; do
  category="$(basename "${category_dir}")"
  dest="${SKILLS_DEST}/${category}"

  if [ -L "${dest}" ]; then
    echo "  ~ ${category}/ (already linked)"
  elif [ -d "${dest}" ]; then
    echo "  ! ${category}/ (exists as real dir — remove it first to symlink)"
  else
    ln -s "${category_dir}" "${dest}"
    echo "  + ${category}/ → ${category_dir}"
    ((linked++))
  fi
done

echo ""
echo "Done. Linked ${linked} new category symlink(s) to ${SKILLS_DEST}"
echo "Restart Claude Code to pick up the skills."
