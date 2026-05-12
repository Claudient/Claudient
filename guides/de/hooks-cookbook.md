# Hooks-Kochbuch

Echte, sofort einsatzbereit Hook-Muster zur Automatisierung von Qualität, Sicherheit und Beobachtbarkeit in Claude Code.

---

## Hook-Grundlagen

Hooks sind Shell-Skripte oder Befehle, die Claude Code automatisch als Reaktion auf Ereignisse ausführt. Sie laufen außerhalb von Claudes Kontext — es sind echte Shell-Prozesse, keine Claude-Anweisungen.

**Hook-Ereignisse:**
| Ereignis | Wann es auslöst |
|---|---|
| `SessionStart` | Wenn eine Claude Code-Sitzung beginnt |
| `PreToolUse` | Bevor ein Tool-Aufruf ausgeführt wird |
| `PostToolUse` | Nachdem ein Tool-Aufruf abgeschlossen ist |
| `PreCompact` | Bevor die Kontextkomprimierung auslöst |
| `PostCompact` | Nach der Kontextkomprimierung |
| `Stop` | Wenn Claude fertig antwortet |
| `Notification` | Wenn Claude eine Desktop-Benachrichtigung sendet |

**Exit-Codes:** `0` = erlauben, `1` = warnen (Claude sieht die Ausgabe, macht aber weiter), `2` = blockieren (Tool-Aufruf wird abgebrochen).

---

## Rezept 1 — Prettier Auto-Formatierung beim Schreiben

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

## Rezept 2 — Gefährliche Shell-Befehle blockieren

**.claude/hooks/block-dangerous.sh:**
```bash
#!/usr/bin/env bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('command',''))")
BLOCKED_PATTERNS=("rm -rf" "sudo " "| bash" "| sh" "git push --force" "git reset --hard")
for pattern in "${BLOCKED_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qi "$pattern"; then
    echo "BLOCKIERT: Befehl entspricht gefährlichem Muster '$pattern'" >&2
    exit 2
  fi
done
exit 0
```

---

## Rezept 3 — Audit-Protokoll für jeden Tool-Aufruf

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

## Rezept 4 — Sitzungsspeicherung vor Komprimierung

Kombinieren Sie mit einer CLAUDE.md-Anweisung: "Wenn PreCompact auslöst, fassen Sie zusammen: aktuelle Aufgabe, geänderte Dateien, offene Entscheidungen, nächste Schritte — fügen Sie zu `.claude/memory/session-state.md` hinzu."

---

## Rezept 5 — Kostenverfolgung

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

## Rezept 6 — TypeScript-Typprüfung beim Bearbeiten

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

## Rezept 7 — Git-Push-Erinnerung

```bash
#!/usr/bin/env bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('command',''))" 2>/dev/null)
if echo "$COMMAND" | grep -q "git push"; then
  echo "⚠️  Kurz davor, zum Remote zu pushen. Bestätigen Sie, dass dies beabsichtigt ist." >&2
  exit 1
fi
exit 0
```

---

## Rezept 8 — Kontext-Lader beim Sitzungsstart

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

## Fehlerbehebung bei Hooks

**Hook löst nicht aus:**
- Überprüfen Sie, ob der Ereignisname exakt ist: `PreToolUse`, `PostToolUse`, `SessionStart`, `PreCompact`
- Überprüfen Sie, ob das Skript ausführbar ist: `chmod +x .claude/hooks/ihr-skript.sh`

**Hook manuell testen:**
```bash
echo '{"tool_name":"Bash","tool_input":{"command":"ls"}}' | bash .claude/hooks/ihr-skript.sh
```

---

## Arbeiten Sie mit uns

Claudient wird unterstützt von [Uitbreiden](https://uitbreiden.com/) — wir entwickeln KI-Produkte mit Entwickler-Communities und liefern B2B-KI-Lösungen. Wenn Sie benutzerdefinierte Hook-Systeme, automatisierte Qualitätsgates oder Claude Code-Automatisierung in Produktionsqualität für Ihr Team benötigen — wir bauen das für Kunden.

**[uitbreiden.com](https://uitbreiden.com/)**
