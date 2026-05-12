# Livre de recettes des hooks

Patterns de hooks réels et prêts à l'emploi pour automatiser la qualité, la sécurité et l'observabilité dans Claude Code.

---

## Fondamentaux des hooks

Les hooks sont des scripts shell ou des commandes que Claude Code exécute automatiquement en réponse à des événements. Ils s'exécutent en dehors du contexte de Claude — ce sont de vrais processus shell, pas des instructions Claude.

**Événements de hook :**
| Événement | Quand il se déclenche |
|---|---|
| `SessionStart` | Quand une session Claude Code commence |
| `PreToolUse` | Avant l'exécution de tout appel d'outil |
| `PostToolUse` | Après la fin d'un appel d'outil |
| `PreCompact` | Avant le déclenchement de la compaction de contexte |
| `PostCompact` | Après la compaction de contexte |
| `Stop` | Quand Claude finit de répondre |
| `Notification` | Quand Claude envoie une notification bureau |

**Structure de base d'un hook :**
```json
{
  "hooks": {
    "EventName": [
      {
        "matcher": "ToolName",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/votre-script.sh",
            "timeout": 30
          }
        ]
      }
    ]
  }
}
```

**Codes de sortie :** `0` = autoriser, `1` = avertir (Claude voit la sortie mais continue), `2` = bloquer (l'appel d'outil est annulé).

---

## Recette 1 — Auto-formatage Prettier à l'écriture

Formate automatiquement les fichiers après que Claude les écrit ou les modifie.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write ${tool_input.file_path}",
            "async": true
          }
        ]
      }
    ]
  }
}
```

---

## Recette 2 — Bloquer les commandes shell dangereuses

**.claude/hooks/block-dangerous.sh :**
```bash
#!/usr/bin/env bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('command',''))")

BLOCKED_PATTERNS=("rm -rf" "sudo " "| bash" "| sh" "git push --force" "git reset --hard")

for pattern in "${BLOCKED_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qi "$pattern"; then
    echo "BLOQUÉ : la commande correspond au pattern dangereux '$pattern'" >&2
    exit 2
  fi
done

exit 0
```

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [{ "type": "command", "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/block-dangerous.sh", "timeout": 5 }]
      }
    ]
  }
}
```

---

## Recette 3 — Journal d'audit pour chaque appel d'outil

**.claude/hooks/audit-log.sh :**
```bash
#!/usr/bin/env bash
INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_name','unknown'))" 2>/dev/null)
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
LOG_FILE="${CLAUDE_PROJECT_DIR}/.claude/logs/audit.log"
mkdir -p "$(dirname "$LOG_FILE")"
echo "${TIMESTAMP} | ${TOOL_NAME}" >> "$LOG_FILE"
```

```json
{
  "hooks": {
    "PostToolUse": [
      { "matcher": "", "hooks": [{ "type": "command", "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/audit-log.sh", "async": true }] }
    ]
  }
}
```

---

## Recette 4 — Sauvegarde de session avant compaction

```json
{
  "hooks": {
    "PreCompact": [
      { "matcher": "", "hooks": [{ "type": "command", "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/pre-compact-save.sh" }] }
    ]
  }
}
```

Associez avec une instruction CLAUDE.md : "Quand PreCompact se déclenche, résumez : tâche actuelle, fichiers modifiés, décisions ouvertes, prochaines étapes — ajoutez à `.claude/memory/session-state.md`."

---

## Recette 5 — Suivi des coûts

```json
{
  "hooks": {
    "PostToolUse": [
      { "matcher": "", "hooks": [{ "type": "command", "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/cost-tracker.sh", "async": true }] }
    ]
  }
}
```

---

## Recette 6 — Vérification de types TypeScript à l'édition

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [{ "type": "command", "command": "bash -c 'echo \"${tool_input.file_path}\" | grep -q \"\\.tsx\\?$\" && npx tsc --noEmit 2>&1 | head -20 || true'", "async": false, "timeout": 30 }]
      }
    ]
  }
}
```

Définissez `async: false` pour que Claude voie les erreurs de types et puisse les corriger immédiatement.

---

## Recette 7 — Rappel avant git push

```bash
#!/usr/bin/env bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('command',''))" 2>/dev/null)
if echo "$COMMAND" | grep -q "git push"; then
  echo "⚠️  Sur le point de pousser vers le distant. Confirmez que c'est intentionnel." >&2
  exit 1
fi
exit 0
```

---

## Recette 8 — Chargeur de contexte au démarrage de session

```json
{
  "hooks": {
    "SessionStart": [
      { "matcher": "", "hooks": [{ "type": "command", "command": "${CLAUDE_PROJECT_DIR}/.claude/hooks/session-start.sh" }] }
    ]
  }
}
```

---

## Dépannage des hooks

**Le hook ne se déclenche pas :**
- Vérifiez que le nom de l'événement est exact : `PreToolUse`, `PostToolUse`, `SessionStart`, `PreCompact`
- Vérifiez que le script est exécutable : `chmod +x .claude/hooks/votre-script.sh`
- Vérifiez que le chemin utilise correctement `${CLAUDE_PROJECT_DIR}`

**Tester un hook manuellement :**
```bash
echo '{"tool_name":"Bash","tool_input":{"command":"ls"}}' | bash .claude/hooks/votre-script.sh
```

---

## Travaillez avec nous

Claudient est soutenu par [Uitbreiden](https://uitbreiden.com/) — nous construisons des produits IA avec des communautés de développeurs et livrons des solutions IA B2B. Si vous avez besoin de systèmes de hooks personnalisés, de portes qualité automatisées ou d'automatisation Claude Code de qualité production pour votre équipe — nous le construisons pour des clients.

**[uitbreiden.com](https://uitbreiden.com/)**
