---
name: workspace-guardian
description: Protects core infrastructure files from accidental modifications.
---

# Workspace Guardian Protocol

1. Important infrastructure files (`package.json`, `.env`, `.github/workflows/*`, `CLAUDE.md`) are protected by the Workspace Guardian.
2. If you attempt to modify them directly, the `workspace-guardian` PreToolUse hook will block your action.
3. If you legitimately need to edit these files, you MUST ask the user to run `npx uitkit guard unlock <filename>` first.
4. Once the file is unlocked, you may proceed with your edit.
