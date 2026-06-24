# CLI-Tool (Node.js) — Projektstruktur

> Für Node.js-CLI-Maintainer, die ein TypeScript-first-Befehlszeilentool auf npm veröffentlichen — optimiert für den gesamten Zyklus vom Hinzufügen eines neuen Befehls bis zur Veröffentlichung einer versionierten Release.

## Stack

- **Sprache:** TypeScript 5.5+ (Strict-Modus)
- **Entwicklungsrunner:** tsx 4+ (ts-node-Ersatz, kein Kompilierungsschritt in der Entwicklung)
- **Build:** tsup 8+ (bundelt zu CommonJS + ESM, generiert .d.ts, Tree-Shaking)
- **Argument-Parsing:** Commander.js 12+ (Unterbefehle, Optionen, Hilfetextgenerierung)
- **Interaktive Eingaben:** Inquirer.js 10+ (Liste, Eingabe, Bestätigung, Passwort-Eingabetypen)
- **Terminal-UI:** chalk 5+ (Farben), ora 8+ (Spinner), listr2 5+ (Aufgabenlisten mit Fortschritt)
- **Konfigurationspersistenz:** conf 13+ (JSON-Konfigurationsdatei am OS-Standardpfad, Schema-Validierung)
- **HTTP-Client:** got 14+ (Promise-basiert, Wiederholungsversuche, Hooks) oder axios 1.7+
- **Tests:** Vitest 2+ (Unit + Integration), @vitest/coverage-v8 für Coverage-Berichte
- **Versionierung:** changesets 2+ (Changelog-Generierung, Versions-Bump, npm-Veröffentlichung)
- **CI/CD:** GitHub Actions (Test-Matrix, npm-Veröffentlichung bei Release)
- **Linting:** ESLint 9+ (Flat Config), Prettier 3+
- **Paketmanager:** pnpm 9+

## Verzeichnisbaum

```
my-cli/
├── .changeset/
│   ├── config.json                        # Changesets-Konfiguration: Zugriff, Basis-Branch, Changelog
│   └── README.md                          # Automatisch generiert; nicht manuell bearbeiten
├── .github/
│   └── workflows/
│       ├── ci.yml                         # Lint, Typprüfung, Test-Matrix (Node 18/20/22)
│       ├── release.yml                    # Ausgelöst durch Changesets-PR-Merge: Version + npm-Veröffentlichung
│       └── codeql.yml                     # CodeQL-Sicherheitsscan bei PRs auf main
├── bin/
│   └── my-cli.js                          # Einstiegspunkt: #!/usr/bin/env node, importiert dist/index.js
├── src/
│   ├── index.ts                           # Root: erstellt Commander-Programm, registriert alle Befehle
│   ├── commands/
│   │   ├── init.ts                        # `my-cli init` — richtet Konfiguration ein, startet Inquirer-Assistent
│   │   ├── run.ts                         # `my-cli run <target>` — Kernausführungsbefehl
│   │   ├── config.ts                      # `my-cli config get|set|reset` — Konfigurationsunterbefehlsbaum
│   │   ├── auth.ts                        # `my-cli auth login|logout|whoami` — Authentifizierungsunterbefehlsbaum
│   │   └── upgrade.ts                     # `my-cli upgrade` — prüft npm-Registry, Self-Update
│   ├── lib/
│   │   ├── config.ts                      # conf-Instanz: Schema, Standardwerte, typisierte get/set-Helfer
│   │   ├── http.ts                        # got/axios-Instanz mit Auth-Headern, Retry, Timeout
│   │   ├── auth.ts                        # Token-Lesen/Schreiben in conf, OAuth-PKCE-Flow-Helfer
│   │   ├── errors.ts                      # Benutzerdefinierte Fehlerklassen: CliError, AuthError, NetworkError
│   │   ├── logger.ts                      # chalk-basierte Log-Helfer: info, warn, error, debug, success
│   │   ├── spinner.ts                     # ora-Wrapper: withSpinner(label, fn) Hilfsfunktion
│   │   ├── prompt.ts                      # Inquirer-Helfer: confirmDestructive, selectFromList
│   │   ├── version.ts                     # Liest package.json-Version, prüft npm auf Updates
│   │   └── output.ts                      # Tabellen-, JSON- und Klartext-Formatierer für --output-Flag
│   ├── types/
│   │   ├── config.ts                      # ConfigSchema-Typ, Standardwerte, Zod-Schema
│   │   ├── api.ts                         # API-Antwortformen (typisierte got/axios-Antworten)
│   │   └── command.ts                     # Gemeinsame Optionstypen: GlobalOptions, OutputFormat
│   └── env.ts                             # process.env-Validierung mit Zod, sofortiger Fehler bei fehlenden Variablen
├── tests/
│   ├── unit/
│   │   ├── lib/
│   │   │   ├── config.test.ts             # Unit: conf get/set/reset mit temporärer Verzeichnisisolation
│   │   │   ├── errors.test.ts             # Unit: Fehlerklassenhierarchie, Nachrichtenformatierung
│   │   │   ├── logger.test.ts             # Unit: chalk-Ausgabe über stdout-Spy erfasst
│   │   │   ├── output.test.ts             # Unit: Ausgabeformen des Tabellen/JSON-Formatierers
│   │   │   └── version.test.ts            # Unit: Semver-Vergleich, Update-Check-Logik
│   │   └── commands/
│   │       ├── config.test.ts             # Unit: Befehlslogik für config get/set/reset
│   │       └── auth.test.ts               # Unit: Token-Speicherung, Login/Logout-Zustandsübergänge
│   └── integration/
│       ├── helpers/
│       │   ├── run-cli.ts                 # Startet gebautes CLI-Binary, erfasst stdout/stderr/exitCode
│       │   └── mock-server.ts             # MSW oder nock HTTP-Mock-Server für API-Integrationstests
│       ├── init.test.ts                   # Integration: `my-cli init` erzeugt korrekte Konfigurationsdatei
│       ├── run.test.ts                    # Integration: `my-cli run` gegen Mock-API, Exit-Codes
│       ├── config.test.ts                 # Integration: Config-Unterbefehl Roundtrips
│       └── auth.test.ts                   # Integration: Login-Flow, Token-Persistenz, whoami
├── dist/                                  # tsup-Ausgabe — in .gitignore, beim Build generiert
│   ├── index.js
│   ├── index.cjs
│   └── index.d.ts
├── .claude/
│   ├── CLAUDE.md                          # Claude Code-Anweisungen auf Projektebene (siehe Vorlage unten)
│   └── settings.json                      # Hooks, Berechtigungen, MCP-Server-Referenzen
├── .changeset/
│   └── config.json                        # Changesets-Konfiguration
├── package.json                           # name, bin-Feld, Exports-Map, Scripts, peerDeps
├── tsconfig.json                          # strict, moduleResolution: bundler, target: ES2022
├── tsconfig.build.json                    # Erweitert tsconfig.json, schließt tests/ aus, von tsup verwendet
├── tsup.config.ts                         # Einstieg: src/index.ts, Formate: [esm, cjs], dts: true
├── vitest.config.ts                       # coverage: v8, Schwellenwerte, Include-Muster
├── eslint.config.js                       # ESLint 9 Flat Config: typescript-eslint, Prettier-Kompatibilität
├── .prettierrc                            # Prettier: printWidth 100, singleQuote true, semi false
├── .npmignore                             # Schließt aus: src/, tests/, .claude/, *.config.ts
├── .env.example                           # MY_CLI_API_URL, MY_CLI_LOG_LEVEL — ohne echte Werte
└── CHANGELOG.md                           # Automatisch von changesets generiert — nicht manuell bearbeiten
```

## Wichtige Dateien erklärt

| Pfad | Zweck |
|---|---|
| `src/index.ts` | Erstellt das Root-Commander-Programm, setzt die Version aus `package.json`, registriert jedes Befehlsmodul via `.addCommand()` und ruft `.parseAsync(process.argv)` auf |
| `src/commands/init.ts` | Führt beim ersten Start den Inquirer-Assistenten aus, schreibt die initiale conf-Datei, validiert die API-URL mit einer Testanfrage und gibt eine Erfolgszusammenfassung mit nächsten Schritten aus |
| `src/lib/config.ts` | Exportiert eine typisierte `conf`-Instanz mit Zod-validiertem Schema; exportiert auch `getConfig()`- und `setConfig()`-Helfer, die von jedem Befehl verwendet werden, der Einstellungen liest oder ändert |
| `src/lib/errors.ts` | Definiert `CliError` (Basis), `AuthError`, `NetworkError` und `ConfigError` — alle werden im Root-`parseAsync`-Fehlerhandler abgefangen, der sie in lesbare stderr-Ausgabe und korrekte Exit-Codes umwandelt |
| `src/lib/output.ts` | `--output json\|table\|plain`-Formatierer für jeden Auflistungs- und Anzeigebefehl; JSON geht zur Weiterleitung an stdout, Tabelle verwendet cli-table3, plain ist zeilengetrennt |
| `tests/integration/helpers/run-cli.ts` | Startet `node dist/index.js` mit `child_process.spawn`, streamt stdout/stderr in Strings, löst mit `{ stdout, stderr, exitCode }` auf — von allen Integrationstests verwendet |
| `.changeset/config.json` | Setzt `access: public`, `baseBranch: main`, `changelog: @changesets/cli/changelog` — steuert die Berechnung von Versions-Bumps und das Schreiben von CHANGELOG.md |
| `.github/workflows/release.yml` | Ausgelöst wenn der changesets-Bot-PR gemergt wird; führt `pnpm changeset version` dann `pnpm changeset publish` mit `NODE_AUTH_TOKEN` aus Repository-Secrets aus |

## Schnell-Scaffold

```bash
# Neues CLI-Projekt von Grund auf aufsetzen
mkdir my-cli && cd my-cli
git init

# pnpm-Projekt initialisieren
pnpm init

# Laufzeitabhängigkeiten installieren
pnpm add commander inquirer chalk ora listr2 conf got

# Entwicklungsabhängigkeiten installieren
pnpm add -D typescript tsx tsup vitest @vitest/coverage-v8 \
  @types/node @types/inquirer \
  eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser \
  prettier eslint-config-prettier \
  @changesets/cli

# Verzeichnisstruktur erstellen
mkdir -p src/commands src/lib src/types
mkdir -p tests/unit/lib tests/unit/commands
mkdir -p tests/integration/helpers
mkdir -p bin dist .changeset .github/workflows .claude

# Einstiegspunkt
echo '#!/usr/bin/env node' > bin/my-cli.js
echo 'import("../dist/index.js")' >> bin/my-cli.js
chmod +x bin/my-cli.js

# Quelldateien erstellen
touch src/index.ts
touch src/commands/init.ts src/commands/run.ts src/commands/config.ts
touch src/commands/auth.ts src/commands/upgrade.ts
touch src/lib/config.ts src/lib/http.ts src/lib/auth.ts
touch src/lib/errors.ts src/lib/logger.ts src/lib/spinner.ts
touch src/lib/prompt.ts src/lib/version.ts src/lib/output.ts
touch src/types/config.ts src/types/api.ts src/types/command.ts
touch src/env.ts
touch tests/integration/helpers/run-cli.ts tests/integration/helpers/mock-server.ts
touch tests/integration/init.test.ts tests/integration/run.test.ts
touch tests/integration/config.test.ts tests/integration/auth.test.ts
touch tests/unit/lib/config.test.ts tests/unit/lib/errors.test.ts
touch tests/unit/lib/logger.test.ts tests/unit/lib/output.test.ts
touch .env.example .npmignore

# tsconfig schreiben
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "outDir": "dist",
    "rootDir": "src",
    "declaration": true
  },
  "include": ["src"]
}
EOF

cat > tsconfig.build.json << 'EOF'
{
  "extends": "./tsconfig.json",
  "exclude": ["tests", "**/*.test.ts"]
}
EOF

# tsup-Konfiguration schreiben
cat > tsup.config.ts << 'EOF'
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  target: 'node18',
})
EOF

# vitest-Konfiguration schreiben
cat > vitest.config.ts << 'EOF'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/**'],
      thresholds: { lines: 80, functions: 80, branches: 75 },
    },
    include: ['tests/**/*.test.ts'],
  },
})
EOF

# Scripts zu package.json hinzufügen (manuelle Bearbeitung für bin + exports-Felder erforderlich)
# Wichtige Scripts:
# "build": "tsup"
# "dev": "tsx src/index.ts"
# "test": "vitest run"
# "test:watch": "vitest"
# "test:coverage": "vitest run --coverage"
# "lint": "eslint src tests"
# "typecheck": "tsc --noEmit"
# "release": "changeset publish"
# "version": "changeset version"

# Changesets initialisieren
pnpm changeset init

# CLAUDE.md hinzufügen
touch .claude/CLAUDE.md

echo "CLI-Projekt aufgesetzt. Bearbeiten Sie package.json, um bin, exports und Scripts-Felder hinzuzufügen."
```

## CLAUDE.md-Vorlage

```markdown
# my-cli — Claude Code-Anweisungen

Dies ist ein produktives Node.js-CLI-Tool in TypeScript. Es wird auf npm veröffentlicht und von
Entwicklern verwendet, um über das Terminal mit der My CLI API zu interagieren. Die Codebasis folgt
einer strikten Struktur mit einer Datei pro Befehl; jede neue Funktion ist eine neue Befehlsdatei.

## Stack

- TypeScript 5.5 (Strict-Modus, moduleResolution: bundler)
- Commander.js 12 für Argument-Parsing und Unterbefehlsbäume
- Inquirer.js 10 für interaktive Eingaben (Ersteinrichtungsassistent, destruktive Bestätigungen)
- chalk 5 + ora 8 + listr2 5 für alle Terminal-Ausgaben
- conf 13 für Konfigurationspersistenz (Konfigurationsdatei am OS-Standardpfad — siehe src/lib/config.ts)
- got 14 für HTTP mit Retry, Timeout und Auth-Header-Injektion
- Vitest 2 für alle Tests (Unit + Integration)
- tsup 8 zum Bauen von dist/ (duale ESM + CJS-Ausgabe)
- changesets 2 für Versionierung, Changelog-Generierung und npm-Veröffentlichung

## Neuen Befehl hinzufügen

1. `src/commands/<befehl-name>.ts` erstellen
2. Ein `Command` von Commander.js mit `.name()`, `.description()`, `.option()` und `.action()` exportieren
3. In `src/index.ts` via `program.addCommand(meinBefehl)` importieren und registrieren
4. Unit-Tests in `tests/unit/commands/<befehl-name>.test.ts` hinzufügen
5. Integrationstests in `tests/integration/<befehl-name>.test.ts` mit `run-cli.ts` hinzufügen
6. `pnpm build && pnpm test` vor dem Öffnen eines PRs ausführen

Befehlsaktionsfunktionen müssen:
- `src/lib/logger.ts` für alle Ausgaben verwenden (niemals direkt `console.log`)
- `withSpinner()` aus `src/lib/spinner.ts` für asynchrone Operationen über ~300ms verwenden
- Typisierte Fehler aus `src/lib/errors.ts` werfen — niemals rohe `Error` werfen
- Das globale Flag `--output json|table|plain` via `src/lib/output.ts` berücksichtigen
- Mit Code 0 bei Erfolg, 1 bei Benutzerfehler, 2 bei System-/Netzwerkfehler beenden

## CLI-Ausgabe testen

Integrationstests starten das gebaute Binary. Immer `pnpm build` vor Integrationstests ausführen.

```ts
// tests/integration/helpers/run-cli.ts Muster
const { stdout, stderr, exitCode } = await runCli(['run', '--target', 'foo'])
expect(exitCode).toBe(0)
expect(stdout).toContain('Success')
```

Unit-Tests für Befehle mocken `src/lib/config.ts` und `src/lib/http.ts` auf Modulebene.
Niemals chalk-Farbcodes direkt testen — ANSI vor Assertions auf Ausgabe-Strings entfernen.

Tests ausführen:
- `pnpm test` — vollständige Unit + Integration-Suite
- `pnpm test:watch` — Watch-Modus während der Entwicklung
- `pnpm test:coverage` — generiert Coverage-Bericht in coverage/

Coverage-Schwelle: 80% Zeilen, 80% Funktionen, 75% Branches. CI schlägt unterhalb der Schwelle fehl.

## Release-Flow mit changesets

1. Code-Änderungen auf einem Feature-Branch vornehmen
2. `pnpm changeset` ausführen — Bump-Typ (patch/minor/major) auswählen, Changelog-Eintrag schreiben
3. Die generierte `.changeset/<zufälliger-name>.md` zusammen mit den Code-Änderungen committen
4. PR öffnen — der changesets-GitHub-Bot kommentiert mit der Release-Zusammenfassung
5. Nach dem Merge des PRs in main öffnet der Bot automatisch einen "Version Packages"-PR
6. Den Version Packages-PR überprüfen und mergen — das löst `release.yml` aus
7. `release.yml` führt `pnpm changeset publish` aus, das `package.json` bumpt, `CHANGELOG.md`
   aktualisiert, einen Git-Tag erstellt und auf npm veröffentlicht

`CHANGELOG.md` niemals manuell bearbeiten oder `package.json`-Version manuell ändern — das gehört changesets.
`pnpm changeset publish` niemals lokal ausführen — nur CI führt dies mit dem `NODE_AUTH_TOKEN`-Secret aus.

## Konfigurationsdatei-Speicherort und Schema

Die conf-Instanz befindet sich in `src/lib/config.ts`. Die Konfiguration wird gespeichert unter:
- macOS: `~/Library/Preferences/my-cli-nodejs/config.json`
- Linux: `~/.config/my-cli-nodejs/config.json`
- Windows: `%APPDATA%\my-cli-nodejs\Config\config.json`

Konfigurationsschema (definiert in `src/types/config.ts`):
- `apiUrl` (string, erforderlich) — Basis-URL für die My CLI API
- `authToken` (string, optional) — Bearer-Token aus `my-cli auth login`
- `outputFormat` (Enum: json|table|plain, Standard: table)
- `logLevel` (Enum: debug|info|warn|error, Standard: info)
- `updateCheckInterval` (Zahl, Standard: 86400) — Sekunden zwischen npm-Update-Prüfungen

`my-cli config get <schlüssel>` und `my-cli config set <schlüssel> <wert>` zum Prüfen und Ändern verwenden.
`my-cli config reset` ausführen, um die Konfigurationsdatei zu leeren und den Init-Assistenten neu zu starten.

## Konventionen

- Alle Ausgaben gehen über `src/lib/logger.ts` — kein direktes `console.log`
- HTTP-Aufrufe gehen über die got-Instanz von `src/lib/http.ts` — got niemals direkt importieren
- Spinner umschließt jede asynchrone Operation: `withSpinner('Laden...', () => http.get(...))`
- Destruktive Operationen erfordern `await confirmDestructive(message)` vor der Ausführung
- Das `--dry-run`-Flag bei jedem mutierenden Befehl muss behandelt werden und den HTTP-Aufruf überspringen
- Jeder Befehl, der Ressourcen auflistet, unterstützt `--output json|table|plain`
- Niemals Geheimnisse über den Auth-Token hinaus im Klartext in der conf-Datei speichern — Keychain für sensible Daten verwenden

## Was nicht zu tun ist

- Keine console.log-Anweisungen hinzufügen — logger.info/warn/error verwenden
- dist/ nicht commiten — wird von CI vor der Veröffentlichung generiert
- Keine Inquirer-Bestätigung für einen Befehl auslassen, der Daten löscht oder überschreibt
- Keinen Befehl hinzufügen, ohne ihn in src/index.ts zu registrieren
- Nicht ohne Changeset-Eintrag mergen, wenn die Änderung das veröffentlichte Verhalten betrifft
```

## MCP-Server

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/yourname/my-cli"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "npm": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-npm"],
      "env": {}
    }
  }
}
```

## Empfohlene Hooks

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$FILE\" == *.ts ]]; then npx prettier --write \"$FILE\" 2>/dev/null && npx eslint --fix \"$FILE\" 2>/dev/null || true; fi'"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'CMD=\"$CLAUDE_TOOL_INPUT_COMMAND\"; if echo \"$CMD\" | grep -q \"changeset publish\"; then echo \"[HOOK] changeset publish nicht lokal ausführen — wird nur in CI über release.yml ausgeführt.\" >&2; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if git -C \"$PWD\" diff --name-only 2>/dev/null | grep -q \"^src/\"; then echo \"Hinweis: src/ hat nicht committete Änderungen. pnpm build && pnpm test vor dem Commit ausführen.\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Zu installierende Skills

```bash
npx uitkit add skill productivity/code-review
npx uitkit add skill productivity/test-generator
npx uitkit add skill git/pr-description
npx uitkit add skill productivity/refactor
npx uitkit add skill productivity/changelog-writer
npx uitkit add skill productivity/tech-interview-kit
npx uitkit add skill devops-infra/oncall-runbook
```

## Weiterführendes

- [CLI-Veröffentlichungsleitfaden](../guides/publishing-cli.md)
- [Changesets Release-Workflow](../workflows/changesets-release.md)
