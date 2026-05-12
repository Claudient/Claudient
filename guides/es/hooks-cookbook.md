# Libro de recetas de hooks

Patrones de hooks reales y listos para usar para automatizar calidad, seguridad y observabilidad en Claude Code.

---

## Fundamentos de hooks

Los hooks son scripts shell o comandos que Claude Code ejecuta automáticamente en respuesta a eventos. Se ejecutan fuera del contexto de Claude — son procesos shell reales, no instrucciones de Claude.

**Eventos de hook:**
| Evento | Cuándo se activa |
|---|---|
| `SessionStart` | Cuando una sesión de Claude Code comienza |
| `PreToolUse` | Antes de que se ejecute cualquier llamada a herramienta |
| `PostToolUse` | Después de que se completa una llamada a herramienta |
| `PreCompact` | Antes de que se active la compactación de contexto |
| `PostCompact` | Después de la compactación de contexto |
| `Stop` | Cuando Claude termina de responder |
| `Notification` | Cuando Claude envía una notificación de escritorio |

**Códigos de salida:** `0` = permitir, `1` = advertir (Claude ve la salida pero continúa), `2` = bloquear (la llamada a herramienta se cancela).

---

## Receta 1 — Auto-formateo Prettier al escribir

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [{ "type": "command", "command": "npx prettier --write ${tool_input.file_path}", "async": true }]
      }
    ]
  }
}
```

---

## Receta 2 — Bloquear comandos shell peligrosos

**.claude/hooks/block-dangerous.sh:**
```bash
#!/usr/bin/env bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('command',''))")
BLOCKED_PATTERNS=("rm -rf" "sudo " "| bash" "| sh" "git push --force" "git reset --hard")
for pattern in "${BLOCKED_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qi "$pattern"; then
    echo "BLOQUEADO: el comando coincide con el patrón peligroso '$pattern'" >&2
    exit 2
  fi
done
exit 0
```

---

## Receta 3 — Registro de auditoría para cada llamada a herramienta

**.claude/hooks/audit-log.sh:**
```bash
#!/usr/bin/env bash
INPUT=$(cat)
TOOL_NAME=$(echo "$INPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('tool_name','unknown'))" 2>/dev/null)
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
LOG_FILE="${CLAUDE_PROJECT_DIR}/.claude/logs/audit.log"
mkdir -p "$(dirname "$LOG_FILE")"
echo "${TIMESTAMP} | ${TOOL_NAME}" >> "$LOG_FILE"
```

---

## Receta 4 — Guardado de sesión antes de la compactación

Combina con una instrucción CLAUDE.md: "Cuando PreCompact se active, resume: tarea actual, archivos modificados, decisiones abiertas, próximos pasos — añade a `.claude/memory/session-state.md`."

---

## Receta 5 — Rastreador de costes

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

## Receta 6 — Verificación de tipos TypeScript al editar

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

---

## Receta 7 — Recordatorio de git push

```bash
#!/usr/bin/env bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('command',''))" 2>/dev/null)
if echo "$COMMAND" | grep -q "git push"; then
  echo "⚠️  A punto de hacer push al remoto. Confirma que esto es intencional." >&2
  exit 1
fi
exit 0
```

---

## Receta 8 — Cargador de contexto al inicio de sesión

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

## Solución de problemas con hooks

**El hook no se activa:**
- Verifica que el nombre del evento sea exacto: `PreToolUse`, `PostToolUse`, `SessionStart`, `PreCompact`
- Verifica que el script sea ejecutable: `chmod +x .claude/hooks/tu-script.sh`

**Probar un hook manualmente:**
```bash
echo '{"tool_name":"Bash","tool_input":{"command":"ls"}}' | bash .claude/hooks/tu-script.sh
```

---

## Trabaja con nosotros

Claudient está respaldado por [Uitbreiden](https://uitbreiden.com/) — construimos productos de IA con comunidades de desarrolladores y entregamos soluciones de IA B2B. Si necesitas sistemas de hooks personalizados, puertas de calidad automatizadas o automatización de Claude Code de grado producción para tu equipo — lo construimos para clientes.

**[uitbreiden.com](https://uitbreiden.com/)**
