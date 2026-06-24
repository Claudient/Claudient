#!/usr/bin/env bash
# list-skills.sh — enumerate all skill .md files in the UitKit repo

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKILLS_DIR="${REPO_ROOT}/skills"

total=0

for category_dir in "${SKILLS_DIR}"/*/; do
  category="$(basename "${category_dir}")"
  files=()

  while IFS= read -r -d '' file; do
    # Skip translation directories (fr/, de/, nl/, es/)
    rel="${file#${category_dir}}"
    if [[ "${rel}" =~ ^(fr|de|nl|es)/ ]]; then
      continue
    fi
    files+=("${rel}")
    ((total++))
  done < <(find "${category_dir}" -name "*.md" -not -path "*/fr/*" -not -path "*/de/*" -not -path "*/nl/*" -not -path "*/es/*" -print0 | sort -z)

  if [ ${#files[@]} -gt 0 ]; then
    echo "${category}/ (${#files[@]})"
    for f in "${files[@]}"; do
      echo "  ${category}/${f}"
    done
  fi
done

echo ""
echo "Total: ${total} skill(s)"
