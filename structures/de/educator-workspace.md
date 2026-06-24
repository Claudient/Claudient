# Arbeitsbereich für Lehrkräfte — Projektstruktur

> Ein Claude-Code-Arbeitsbereich für Lehrkräfte an Schulen und Hochschulen zur Verwaltung von täglicher Unterrichtsplanung, Lehrplangestaltung, differenziertem Unterricht, Leistungsbeurteilung, Schülerfeedback und Kommunikation mit Eltern und Schulleitung — gesteuert durch Slash-Commands und kursspezifischen Kontext.

## Stack

- **Google Classroom** oder **Canvas LMS** — Aufgabenverteilung, Notenbuch, Einreichungsverfolgung
- **Google Workspace** (Docs, Slides, Forms, Drive) — Unterrichtsdokumente, Präsentationen, Tests, geteilte Ressourcen
- **Notion** — Lehrplanboards, Einheitsübersichten, Semesterkalender
- **Turnitin** — Plagiatsprüfung eingereichter Arbeiten
- **Kahoot** oder **Pear Deck** — interaktive Formativbeurteilungen und Live-Abstimmungen
- **Slack** oder **Microsoft Teams** — Kommunikation im Kollegium und in Fachbereichen
- **Google Meet** oder **Zoom** — Elterngespräche, Fernunterricht, Sprechstunden

## Verzeichnisstruktur

```
educator-workspace/
├── .claude/
│   ├── CLAUDE.md                                    # Arbeitsbereichsanweisungen für Claude Code
│   ├── settings.json                                # MCP-Server, Hooks, Berechtigungen
│   └── commands/
│       ├── lesson-plan.md                           # /lesson-plan <topic> <grade-level> — vollständige Unterrichtsplanung mit Zielen, Aktivitäten und Lernkontrollen
│       ├── assignment-builder.md                    # /assignment-builder — erstellt Aufgabenstellung mit Anweisungen und Abgabekriterien
│       ├── rubric-creator.md                        # /rubric-creator — generiert bewertete Rubrik für jeden Aufgabentyp
│       ├── student-feedback.md                      # /student-feedback <student-id> — erstellt personalisiertes schriftliches Feedback
│       ├── parent-email.md                          # /parent-email <student-id> <topic> — entwirft Elternkommunikation nach Ton und Kontext
│       ├── differentiation.md                       # /differentiation <lesson-file> — erstellt drei gestufte Versionen einer Unterrichtseinheit
│       └── quiz-builder.md                          # /quiz-builder <topic> <num-questions> — erstellt Quiz mit Lösungsschlüssel und Rubrik
├── curriculum/
│   ├── sy2025-2026/                                 # Schuljahreswurzel
│   │   ├── scope-and-sequence.md                   # Jahresübersicht mit Standardsausrichtung und Zeitplanung
│   │   ├── semester-1/
│   │   │   ├── unit-01-introduction/
│   │   │   │   ├── unit-overview.md                # Leitfragen, grundlegende Verständnisse, Standards (z. B. CCSS.ELA-LITERACY.RI.6.1)
│   │   │   │   ├── pacing-guide.md                 # Tagesplan, Meilensteinkontrollen
│   │   │   │   └── standards-alignment.md          # Zuordnung zu staatlichen und nationalen Standards mit Belegnachweisen
│   │   │   ├── unit-02-narrative-writing/
│   │   │   │   ├── unit-overview.md
│   │   │   │   ├── pacing-guide.md
│   │   │   │   └── standards-alignment.md
│   │   │   └── unit-03-research-skills/
│   │   │       ├── unit-overview.md
│   │   │       ├── pacing-guide.md
│   │   │       └── standards-alignment.md
│   │   └── semester-2/
│   │       ├── unit-04-argumentative-writing/
│   │       │   ├── unit-overview.md
│   │       │   ├── pacing-guide.md
│   │       │   └── standards-alignment.md
│   │       └── unit-05-literature-circles/
│   │           ├── unit-overview.md
│   │           ├── pacing-guide.md
│   │           └── standards-alignment.md
├── lessons/
│   ├── _template/                                   # diese Vorlage beim Erstellen einer neuen Unterrichtseinheit kopieren
│   │   ├── lesson-plan.md                           # Lernziele, Materialien, Ablauf, Verständniskontrollen, Abschluss
│   │   ├── slides-outline.md                        # Gliederung des Google-Slides-Decks (Titel, Einstieg, direkte Instruktion, Übung, Exit-Ticket)
│   │   └── differentiation-notes.md                 # Hilfestellungen und Erweiterungen für unter-, auf- und über-Niveau
│   ├── 2026-09-08-intro-to-thesis-statements/
│   │   ├── lesson-plan.md                           # 50-Minuten-Blockplan; Standard CCSS.ELA-LITERACY.W.6.1a
│   │   ├── slides-outline.md
│   │   └── differentiation-notes.md                 # Satzmuster für ELL-Schüler, Socratic-Seminar-Erweiterung
│   ├── 2026-09-15-evidence-based-claims/
│   │   ├── lesson-plan.md
│   │   ├── slides-outline.md
│   │   └── differentiation-notes.md
│   └── 2026-10-01-peer-review-workshop/
│       ├── lesson-plan.md
│       ├── slides-outline.md
│       └── differentiation-notes.md
├── assessments/
│   ├── quizzes/
│   │   ├── unit-01-vocab-quiz.md                    # 15-Fragen-Quiz mit Lösungsschlüssel und Kahoot-Importformat
│   │   ├── unit-02-narrative-elements-quiz.md
│   │   └── unit-03-research-skills-check.md
│   ├── rubrics/
│   │   ├── narrative-essay-rubric.md                # 4-Punkte-Rubrik: Ideen, Struktur, Stimme, Konventionen
│   │   ├── research-paper-rubric.md                 # 4-Punkte-Rubrik: These, Belege, Zitation, Mechanik
│   │   ├── participation-rubric.md                  # Bewertungsraster für Diskussion und Unterrichtsbeteiligung
│   │   └── presentation-rubric.md                  # Kriterien für mündliche Präsentationen: Inhalt, Vortrag, Visualisierung
│   └── projects/
│       ├── semester-1-research-project.md           # Mehrwöchige Projektaufgabe mit Meilensteinterminen und Rubrik
│       └── semester-2-argument-essay.md             # Abschließende Aufgabenstellung mit Turnitin-Einreichungsanweisungen
├── student-data/
│   ├── README.md                                    # Hinweis: Alle Schüler-IDs sind anonymisiert — keine Namen oder Geburtsdaten gespeichert
│   ├── class-roster.md                              # Schüler-IDs, Kurs, IEP/504-Kennzeichen, DaZ-Status (keine personenbezogenen Daten)
│   ├── progress-tracker.md                          # Aufgabenerfüllungsraten und Notenbänder nach Schüler-ID
│   ├── iep-accommodations.md                        # Nachteilsausgleichstypen nach Schüler-ID — genutzt vom /differentiation-Befehl
│   └── intervention-log.md                          # Datiertes Protokoll der Fördermaßnahmen nach Schüler-ID, angewandter Strategie und Ergebnis
├── parent-comms/
│   ├── templates/
│   │   ├── positive-update-template.md              # Positive Rückmeldung bei guten Leistungen oder Fortschritten
│   │   ├── concern-template.md                      # Sachlicher Ton bei schulischen oder verhaltensbedingten Anliegen
│   │   ├── conference-invite-template.md            # Einladungs-E-Mail für Eltern-Lehrer-Gespräch
│   │   └── missing-work-template.md                 # Erste und zweite Mahnung bei fehlenden Aufgaben
│   └── sent-log/
│       ├── 2026-09-log.md                           # Datierte Liste gesendeter Mitteilungen mit Schüler-ID und Thema
│       └── 2026-10-log.md
├── resources/
│   ├── standards/
│   │   ├── ccss-ela-grade6.md                       # Relevante Common-Core-Standards für schnelle Referenz extrahiert
│   │   └── state-standards-crosswalk.md             # Staatliche Standards im Abgleich mit CCSS
│   ├── media-links.md                               # Kuratierte Video-, Podcast- und Artikellinks nach Einheit
│   └── professional-development/
│       ├── pd-notes-2025-08-15.md                   # Notizen aus der Sommer-Fortbildung
│       └── instructional-strategies.md              # Referenz: UDL, Socratic Seminar, Think-Pair-Share, Jigsaw
└── feedback/
    ├── templates/
    │   ├── formative-feedback-template.md           # Niedrigschwelliges schriftliches Feedback für Entwürfe und Unterrichtsarbeiten
    │   ├── summative-feedback-template.md           # Abschlussfeedback abgestimmt auf Rubrik-Kategorien
    │   └── growth-mindset-feedback-template.md      # Anstrengungsorientierte Sprache für Schüler mit Schwierigkeiten
    └── sent/
        ├── 2026-09-narrative-essay-feedback.md      # Sammel-Feedback-Protokoll: Schüler-ID, Notenband, gesendetes Feedback
        └── 2026-10-research-draft-feedback.md
```

## Wichtige Dateien erklärt

| Pfad | Zweck |
|---|---|
| `.claude/commands/lesson-plan.md` | Slash-Command, der `$ARGUMENTS` als `<topic> <grade-level>` entgegennimmt, die relevante Einheitsübersicht und Standardsausrichtung liest und einen vollständigen 50-minütigen Unterrichtsplan mit Zielen, Einstieg, direkter Instruktion, geführter Übung und Exit-Ticket erstellt |
| `.claude/commands/differentiation.md` | Liest eine lesson-plan.md-Datei und die passenden Schüler-IEP-Nachteilsausgleiche, dann erstellt drei gestufte Versionen: unter Niveau mit Satzmustern, auf Niveau wie geplant, über Niveau mit Erweiterungsaufgaben |
| `.claude/commands/student-feedback.md` | Nimmt eine Schüler-ID, liest den zugehörigen Eintrag im Fortschritts-Tracker und die relevante Rubrik, und erstellt spezifisches schriftliches Feedback mit Hinweisen auf nächste Schritte — nie generisches Lob |
| `.claude/commands/parent-email.md` | Nimmt Schüler-ID und Thementyp (positiv/Anliegen/fehlende-Arbeit), liest das Sendeprotokoll zur Vermeidung von Duplikaten, wählt die richtige Vorlage aus und entwirft eine versandfertige E-Mail |
| `curriculum/sy2025-2026/scope-and-sequence.md` | Jahresübersicht mit Standardsausrichtung und Zeitplanung — die Grundlage, auf die alle Unterrichtspläne und Beurteilungen verweisen |
| `student-data/iep-accommodations.md` | Nachteilsausgleichstypen nach Schüler-ID — wird vom `/differentiation`-Befehl gelesen, um korrekt scaffolded Materialien zu erstellen, ohne personenbezogene Daten offenzulegen |
| `assessments/rubrics/` | Bewertete Rubriken für alle wichtigen Aufgabentypen — referenziert von `/rubric-creator`, `/student-feedback` und `/quiz-builder`, um die Rubrik-Ausrichtung des Feedbacks sicherzustellen |
| `parent-comms/sent-log/` | Monatliches Protokoll aller Elternkommunikationen mit Schüler-ID und Thema — verhindert doppelte Kontaktaufnahme und bietet eine Prüfspur für die Schulleitung |

## Schnell-Scaffold

```bash
# Arbeitsbereich-Wurzelverzeichnis und Claude-Konfiguration erstellen
mkdir -p educator-workspace/.claude/commands

# Lehrplanstruktur für das aktuelle Schuljahr erstellen
mkdir -p educator-workspace/curriculum/sy2025-2026/semester-1/unit-01-introduction
mkdir -p educator-workspace/curriculum/sy2025-2026/semester-1/unit-02-narrative-writing
mkdir -p educator-workspace/curriculum/sy2025-2026/semester-1/unit-03-research-skills
mkdir -p educator-workspace/curriculum/sy2025-2026/semester-2/unit-04-argumentative-writing
mkdir -p educator-workspace/curriculum/sy2025-2026/semester-2/unit-05-literature-circles

# Unterrichtsverzeichnis mit Vorlage erstellen
mkdir -p educator-workspace/lessons/_template

# Beurteilungsverzeichnisse erstellen
mkdir -p educator-workspace/assessments/quizzes
mkdir -p educator-workspace/assessments/rubrics
mkdir -p educator-workspace/assessments/projects

# Schülerdaten-Verzeichnis erstellen
mkdir -p educator-workspace/student-data

# Elternkommunikations-Verzeichnisse erstellen
mkdir -p educator-workspace/parent-comms/templates
mkdir -p educator-workspace/parent-comms/sent-log

# Ressourcen-Verzeichnisse erstellen
mkdir -p educator-workspace/resources/standards
mkdir -p educator-workspace/resources/professional-development

# Feedback-Verzeichnisse erstellen
mkdir -p educator-workspace/feedback/templates
mkdir -p educator-workspace/feedback/sent

# Slash-Command-Dateien anlegen
touch educator-workspace/.claude/commands/lesson-plan.md
touch educator-workspace/.claude/commands/assignment-builder.md
touch educator-workspace/.claude/commands/rubric-creator.md
touch educator-workspace/.claude/commands/student-feedback.md
touch educator-workspace/.claude/commands/parent-email.md
touch educator-workspace/.claude/commands/differentiation.md
touch educator-workspace/.claude/commands/quiz-builder.md

# Unterrichtsvorlagen-Dateien anlegen
touch educator-workspace/lessons/_template/lesson-plan.md
touch educator-workspace/lessons/_template/slides-outline.md
touch educator-workspace/lessons/_template/differentiation-notes.md

# Schülerdaten-Dateien anlegen
touch educator-workspace/student-data/README.md
touch educator-workspace/student-data/class-roster.md
touch educator-workspace/student-data/progress-tracker.md
touch educator-workspace/student-data/iep-accommodations.md
touch educator-workspace/student-data/intervention-log.md

# Elternkommunikations-Vorlagen anlegen
touch educator-workspace/parent-comms/templates/positive-update-template.md
touch educator-workspace/parent-comms/templates/concern-template.md
touch educator-workspace/parent-comms/templates/conference-invite-template.md
touch educator-workspace/parent-comms/templates/missing-work-template.md

# Feedback-Vorlagen anlegen
touch educator-workspace/feedback/templates/formative-feedback-template.md
touch educator-workspace/feedback/templates/summative-feedback-template.md
touch educator-workspace/feedback/templates/growth-mindset-feedback-template.md

# Lehrplan-Ankerdateien anlegen
touch educator-workspace/curriculum/sy2025-2026/scope-and-sequence.md

# Lehrkraft-Skills installieren
npx uitkit add skill productivity/lesson-planner
npx uitkit add skill productivity/student-feedback-analyzer
npx uitkit add skill productivity/rubric-creator
npx uitkit add skill productivity/assignment-builder
npx uitkit add skill productivity/differentiation
npx uitkit add skill productivity/parent-email
```

## CLAUDE.md-Vorlage

```markdown
# Lehrkraft-Arbeitsbereich — Claude-Code-Anweisungen

## Was dieser Bereich ist

Dies ist ein Arbeitsbereich für Lehrkräfte an Schulen und Hochschulen. Er enthält Lehrpläne,
einzelne Unterrichtspläne, Beurteilungen, Schülerfortschrittsdaten und Elternkommunikationsvorlagen.
Claude Code fungiert hier als Lehrplan- und Unterrichtsassistent — er liest den Kurskontext,
um standardsausgerichtete, differenzierte und rubrikbasierte Unterrichtsmaterialien zu erstellen.

Alle Schülerdaten sind anonymisiert. Schüler-IDs werden durchgehend verwendet — echte Schülernamen
dürfen in erstellten Inhalten oder gespeicherten Dateien niemals vorkommen.

## Stack

- LMS: Google Classroom oder Canvas — Aufgabenverteilung, Notenbuch, Einreichungen
- Dokumente: Google Workspace (Docs, Slides, Forms) — Unterrichtsmaterialien, Beurteilungen
- Planung: Notion — Lehrplanboards, Einheitskalender, Zeitpläne
- Akademische Integrität: Turnitin — eingereichte Aufsätze und Forschungsarbeiten
- Interaktiv: Kahoot, Pear Deck — Formativkontrollen und Live-Abstimmungen
- Kollegiumskommunikation: Slack oder Microsoft Teams — Fachbereich- und Verwaltungskoordination
- Konferenzen: Google Meet oder Zoom — Elterngespräche und digitale Sprechstunden

## Häufige Aufgaben und genaue Befehle

Unterrichtsplan erstellen:
  /lesson-plan <topic> <grade-level>
  → Liest Einheitsübersicht und Standardsausrichtung; erstellt vollständigen 50-Minuten-Unterrichtsplan

Aufgabenstellung erstellen:
  /assignment-builder
  → Fragt nach Aufgabentyp, Thema und Klassenstufe; erstellt schülerseitige Aufgabenstellung

Bewertungsrubrik erstellen:
  /rubric-creator
  → Fragt nach Aufgabentyp und Kriterien; erstellt 4-Punkte-Rubrik zum Einfügen in Google Classroom

Schülerfeedback schreiben:
  /student-feedback <student-id>
  → Liest progress-tracker.md und die relevante Rubrik; verfasst spezifisches, rubrikausgerichtetes Feedback

Eltern-E-Mail entwerfen:
  /parent-email <student-id> <topic>
  → topic ist eines von: positive / concern / missing-work / conference-invite
  → Liest Sendeprotokoll zur Vermeidung von Duplikaten; wählt richtige Vorlage; entwirft die E-Mail

Unterricht differenzieren:
  /differentiation <path-to-lesson-plan.md>
  → Liest iep-accommodations.md; erstellt Versionen unter Niveau, auf Niveau und über Niveau

Quiz erstellen:
  /quiz-builder <topic> <num-questions>
  → Erstellt Multiple-Choice- oder Kurzantwort-Quiz mit Lösungsschlüssel und Kahoot-Importformat

## Arbeitsbereich-Konventionen

- Alle Unterrichtspläne befinden sich in lessons/ mit dem Namen YYYY-MM-DD-<slug>.md
- Alle Unterrichtspläne werden aus lessons/_template/ erstellt — nie von Grund auf neu beginnen
- Rubriken befinden sich in assessments/rubrics/ und werden in Unterrichtsplänen und Aufgabenstellungen namentlich referenziert
- Schülerdatendateien verwenden ausschließlich Schüler-IDs — keine Namen, Geburtsdaten oder Kontaktinformationen
- Eltern-E-Mails werden nach dem Senden in parent-comms/sent-log/<YYYY-MM>-log.md protokolliert
- Lehrplandateien referenzieren Standards nach Code (z. B. CCSS.ELA-LITERACY.W.6.1a), nicht nach Paraphrase

## Standardsausrichtung

Standard-Lehrplanrahmen: Common Core State Standards (CCSS) ELA
Staatlicher Abgleich: resources/standards/state-standards-crosswalk.md
Bei der Erstellung von Unterrichtsplänen oder Beurteilungen stets den spezifischen Standard-Code angeben.

## Differenzierungsniveaus

Unter Niveau: Satzmuster, Wortbanken, grafische Organizer, reduzierte Komplexität
Auf Niveau: Unterricht wie geplant — keine Anpassung
Über Niveau: Erweiterungsaufgaben, Socratic-Seminar-Impulse, eigenständige Recherche
IEP/504-Nachteilsausgleiche: student-data/iep-accommodations.md vor der Erstellung
differenzierter Materialien lesen — die dort aufgeführten Ausgleichsmaßnahmen haben Vorrang vor Standardeinstellungen.

## Nicht erlaubt

- Keine echten Schülernamen in generierten Dateien verwenden — ausschließlich Schüler-IDs
- Keine Rubrik-Bewertungen oder Noten vergeben — Claude schlägt Formulierungen vor; Noten vergibt die Lehrkraft
- Eltern-E-Mails nicht ohne Überprüfung durch die Lehrkraft versenden — /parent-email erstellt nur Entwürfe
- Keine Unterrichtspläne ohne Verweis auf die relevante unit-overview.md erstellen
- student-data/ nicht in ein externes Git-Repository übertragen
```

## MCP-Server

```json
{
  "mcpServers": {
    "google-drive": {
      "command": "npx",
      "args": ["-y", "@googleapis/mcp-server-drive"],
      "env": {
        "GOOGLE_CLIENT_ID": "${GOOGLE_CLIENT_ID}",
        "GOOGLE_CLIENT_SECRET": "${GOOGLE_CLIENT_SECRET}",
        "GOOGLE_REFRESH_TOKEN": "${GOOGLE_REFRESH_TOKEN}"
      }
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "${SLACK_BOT_TOKEN}",
        "SLACK_TEAM_ID": "${SLACK_TEAM_ID}"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropic-ai/mcp-server-filesystem",
        "/Users/$USER/educator-workspace/curriculum",
        "/Users/$USER/educator-workspace/lessons",
        "/Users/$USER/educator-workspace/assessments",
        "/Users/$USER/educator-workspace/feedback"
      ]
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
            "command": "if echo \"$CLAUDE_TOOL_INPUT\" | python3 -c \"import sys,json; p=json.load(sys.stdin).get('path',''); print(p)\" 2>/dev/null | grep -q 'lessons/'; then echo '[educator-workspace] Lesson written — confirm standards code is cited and differentiation-notes.md exists alongside this file.'; fi"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "if echo \"$CLAUDE_TOOL_INPUT\" | python3 -c \"import sys,json; p=json.load(sys.stdin).get('path',''); print(p)\" 2>/dev/null | grep -q 'student-data/'; then echo '[educator-workspace] Writing to student-data/ — verify no student names or PII are included, student IDs only.'; fi"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "echo '[educator-workspace] Session ended. Reminder: log any parent emails sent this session in parent-comms/sent-log/ and update progress-tracker.md if assessments were graded.'"
          }
        ]
      }
    ]
  }
}
```

## Zu installierende Skills

```bash
npx uitkit add skill productivity/lesson-planner
npx uitkit add skill productivity/student-feedback-analyzer
npx uitkit add skill productivity/rubric-creator
npx uitkit add skill productivity/assignment-builder
npx uitkit add skill productivity/differentiation
npx uitkit add skill productivity/parent-email
npx uitkit add skill productivity/quiz-builder
```

## Verwandte Ressourcen

- [Leitfaden für Lehrkräfte](../guides/for-educator.md)
- [Workflow Unterrichtsplanung](../workflows/lesson-planning.md)
