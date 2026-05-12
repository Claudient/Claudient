# Hooks Kookboek

Echte, gebruiksklare hook-patronen voor het automatiseren van kwaliteit, veiligheid en waarneembaarheid in Claude Code.

---

## Hook-fundamenten

Hooks zijn shell-scripts of commando's die Claude Code automatisch uitvoert als reactie op gebeurtenissen. Ze draaien buiten Claudes context — het zijn echte shell-processen, geen Claude-instructies.

**Hook-gebeurtenissen:**
| Gebeurtenis | Wanneer het activeert |
|---|---|
| `SessionStart` | Wanneer een Claude Code-sessie begint |
| `PreToolUse` | Voordat een tool-aanroep wordt uitgevoerd |
| `PostToolUse` | Nadat een tool-aanroep is voltooid |
| `PreCompact` | Voordat context-compactie activeert |
| `PostCompact` | Na context-compactie |
| `Stop` | Wanneer Claude klaar is met antwoorden |
| `Notification` | Wanneer Claude een bureaubladmelding stuurt |

**Afsluitcodes:** `0` = toestaan, `1` = waarschuwen (Claude ziet de uitvoer maar gaat door), `2` = blokkeren (tool-aanroep wordt geannuleerd).

---

## Recept 1 — Prettier auto-opmaak bij schrijven

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

## Recept 2 — Gevaarlijke shell-opdrachten blokkeren

**.claude/hooks/block-dangerous.sh:**
```bash
#!/usr/bin/env bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('command',''))")
BLOCKED_PATTERNS=("rm -rf" "sudo " "| bash" "| sh" "git push --force" "git reset --hard")
for pattern in "${BLOCKED_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qi "$pattern"; then
    echo "GEBLOKKEERD: opdracht komt overeen met gevaarlijk patroon '$pattern'" >&2
    exit 2
  fi
done
exit 0
```

---

## Recept 3 — Auditlog voor elke tool-aanroep

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

## Recept 4 — Sessieopslag voor compactie

Combineer met een CLAUDE.md instructie: "Wanneer PreCompact activeert, vat samen: huidige taak, gewijzigde bestanden, open beslissingen, volgende stappen — voeg toe aan `.claude/memory/session-state.md`."

---

## Recept 5 — Kostentracker

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

## Recept 6 — TypeScript typecontrole bij bewerken

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

## Recept 7 — Git push herinnering

```bash
#!/usr/bin/env bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('command',''))" 2>/dev/null)
if echo "$COMMAND" | grep -q "git push"; then
  echo "⚠️  Op het punt naar remote te pushen. Bevestig dat dit intentioneel is." >&2
  exit 1
fi
exit 0
```

---

## Recept 8 — Context-lader bij sessiestart

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

## Problemen oplossen met hooks

**Hook activeert niet:**
- Controleer of de gebeurtenisnaam exact is: `PreToolUse`, `PostToolUse`, `SessionStart`, `PreCompact`
- Controleer of het script uitvoerbaar is: `chmod +x .claude/hooks/uw-script.sh`

**Hook handmatig testen:**
```bash
echo '{"tool_name":"Bash","tool_input":{"command":"ls"}}' | bash .claude/hooks/uw-script.sh
```

---

## Werk met ons samen

Claudient wordt ondersteund door [Uitbreiden](https://uitbreiden.com/) — we bouwen AI-producten met ontwikkelaarsgemeenschappen en leveren B2B AI-oplossingen. Als u aangepaste hook-systemen, geautomatiseerde kwaliteitspoorten of productie-kwaliteit Claude Code-automatisering voor uw team nodig heeft — we bouwen dit voor klanten.

**[uitbreiden.com](https://uitbreiden.com/)**
