# Executive-Assistenz-Arbeitsbereich — Projektstruktur

> Für eine EA, die eine Führungskraft auf C-Level-Ebene unterstützt: Kalendermanagement, Meetingvorbereitung, Nachverfolgung von Folgemaßnahmen, Board-Vorbereitung, Reiselogistik, Stakeholder-Kommunikation und Spesenmanagement — alles aus einem einzigen Claude Code-Arbeitsbereich heraus.

## Stack

- Google Workspace — Gmail (E-Mail), Google Calendar (Terminplanung), Google Drive (Dokumentenspeicher)
- Notion — Briefing-Dokumente, SOPs, Notizen zu Stakeholder-Beziehungen
- Slack — interne asynchrone Kommunikation, Überwachung des Führungskanals
- Zoom — Meeting-Logistik, Aufzeichnungslinks, Verwaltung von Host-Keys
- Concur oder Expensify — Reisebuchungen und Einreichung von Spesenberichten
- DocuSign — Dokumentenweiterleitung zur Unterschrift, Statusverfolgung
- MCP: google-drive, gmail, slack

## Verzeichnisstruktur

```
ea-workspace/
├── .claude/
│   ├── CLAUDE.md                              # Arbeitsbereichsanweisungen für Claude Code
│   ├── settings.json                          # Berechtigungen, Hooks, MCP-Konfigurationen
│   └── commands/
│       ├── meeting-brief.md                   # Nimmt Teilnehmer + Agenda → vollständiges Vor-Meeting-Briefing
│       ├── travel-plan.md                     # Nimmt Ziel + Daten → Reiseplan + Logistik-Checkliste
│       ├── follow-up-tracker.md               # Extrahiert Aktionspunkte aus Meeting-Notizen → Nachverfolgungsliste
│       ├── board-prep.md                      # Stellt Board-Paket aus board/ zusammen → Zusammenfassung + Materialindex
│       ├── weekly-brief.md                    # Kompiliert wöchentliche Prioritäten, Zeitplan und offene Punkte für die Führungskraft
│       ├── stakeholder-email.md               # Entwirft stakeholder-spezifische E-Mails aus templates/ + Beziehungsnotizen
│       └── expense-report.md                 # Strukturiert Spesendetails im Concur/Expensify-Einreichungsformat
├── briefings/                                 # Vor-Meeting-Briefings, nach Datum geordnet
│   ├── README.md                              # Briefing-Archivindex — Links nach Monat
│   ├── briefing-template.md                   # Kanonisches Briefing-Format (Teilnehmer, Agenda, Kontext, Anfragen)
│   ├── 2026-06/
│   │   ├── 2026-06-03-board-strategy-sync.md  # Board-Strategiesync — Teilnehmer, Agenda, Führungskontext
│   │   ├── 2026-06-05-investor-q-a.md         # Investor-Q&A-Vorbereitung — Investorenhintergründe, erwartete Fragen
│   │   ├── 2026-06-10-partnership-call.md     # Partnerschaftsgespräch — Unternehmenshintergrund, Deal-Kontext
│   │   └── 2026-06-17-all-hands-prep.md       # All-Hands-Vorbereitung — Sprechpunkte, Folienüberprüfungsnotizen
│   └── 2026-05/
│       ├── 2026-05-20-ceo-peer-roundtable.md  # Peer-Roundtable — Teilnehmer-Biografien, Themenbereiche
│       └── 2026-05-28-qbr-prep.md            # QBR-Vorbereitung — Kennzahlen, Narrative, Anfragen an die Führungskraft
├── board/                                     # Board-Meeting-Materialien und Governance-Dokumente
│   ├── README.md                              # Board-Kalender, Mitgliederliste, Materialablagerichtlinie
│   ├── members/
│   │   ├── board-member-profiles.md           # Biografie, Rolle, Amtszeit, Schwerpunktbereiche je Board-Mitglied
│   │   └── committee-assignments.md           # Besetzung von Prüfungs-, Vergütungs- und Nominierungsausschüssen
│   ├── 2026-q2/
│   │   ├── agenda-2026-q2.md                  # Board-Agenda mit Zeitblöcken und Präsentatoren
│   │   ├── board-deck-outline-2026-q2.md      # Folienübersicht vor Fertigstellung des endgültigen Decks
│   │   ├── pre-read-packet-2026-q2.md         # Zusammenfassung + Links zu allen Vorab-Lesematerialien
│   │   ├── minutes-2026-q2-draft.md           # Protokollentwurf zur Überprüfung durch die Führungskraft vor Versand
│   │   └── action-items-2026-q2.md            # Offene Aktionspunkte aus dem Board-Meeting mit Verantwortlichen und Fälligkeitsdaten
│   ├── 2026-q1/
│   │   ├── minutes-2026-q1-final.md           # Genehmigte und unterzeichnete Board-Protokolle
│   │   └── action-items-2026-q1-closed.md     # Abgeschlossene Q1-Aktionspunkte — archiviert für Governance-Aufzeichnungen
│   └── standing-materials/
│       ├── board-sop.md                       # SOP — Logistik, Verteilerliste, Genehmigungsworkflow für Protokolle
│       └── consent-calendar-template.md       # Vorlage für Tagesordnungspunkte im Umlaufverfahren
├── travel/                                    # Reisepläne, Buchungs-SOPs und Reisepräferenzen
│   ├── README.md                              # Reiseablagerichtlinie und Buchungsworkflow
│   ├── exec-travel-preferences.md             # Führungskraftpräferenzen — Airlines, Sitze, Hotels, Vielfliegernummern
│   ├── booking-sop.md                         # Schritt-für-Schritt-Buchungs-SOP für Flüge, Hotels, Bodentransport
│   ├── visa-passport-tracker.md               # Reisepassablauf, Visumsgültigkeit, ESTA/ETA-Status nach Land
│   ├── active/
│   │   ├── 2026-06-18-london-trip.md          # Aktiver Reiseplan — Flüge, Hotel, Bodentransport, Kontakte
│   │   └── 2026-07-08-davos-trip.md           # Bevorstehender Reiseplan — Flüge ausstehend, Hotel bestätigt
│   └── archive/
│       ├── 2026-05-nyc-roadshow.md            # Abgeschlossen — abgelegt für Spesenabgleichsreferenz
│       └── 2026-04-sf-summit.md               # Abgeschlossen — alle Spesen eingereicht und genehmigt
├── stakeholders/                              # Schlüsselkontakte, Beziehungsnotizen, Kommunikationsverlauf
│   ├── README.md                              # Stakeholder-Stufenleitfaden (Board / Investoren / Partner / Medien)
│   ├── board-members/
│   │   ├── jane-doe-profile.md                # Biografie, Kommunikationsstil, sensible Themen, letzte Interaktion
│   │   └── john-smith-profile.md              # Biografie, bevorzugte Kontaktmethode, Beziehungskontext
│   ├── investors/
│   │   ├── series-b-lead.md                   # Lead-Investor-Profil — Firma, Partner, Kontaktrhythmus, letztes Update
│   │   └── strategic-investors.md             # Strategische Investorenkontakte und Engagement-Protokoll
│   ├── partners/
│   │   ├── key-partners.md                    # Top-5-Strategiepartner — Kontakte, Beziehungsstatus, nächster Schritt
│   │   └── partner-engagement-log.md          # Fortlaufendes Protokoll von Berührungspunkten, Zusagen, Folgemaßnahmen
│   └── media/
│       ├── press-contacts.md                  # Journalisten, Medien, Ressort, Beziehungsstufe
│       └── spokesperson-sop.md               # SOP — genehmigte Sprecherliste, Freigabeprozess für Zitate
├── templates/                                 # E-Mail-Vorlagen nach Szenario, Meeting-Agenden, Briefing-Formate
│   ├── email/
│   │   ├── meeting-request-external.md        # Vorlage — Anfrage eines Meetings mit einem externen Stakeholder
│   │   ├── meeting-request-internal.md        # Vorlage — Terminierung interner Führungsmeetings
│   │   ├── follow-up-post-meeting.md          # Vorlage — Nachbesprechungsrekapitulation und Aktionspunktübersicht
│   │   ├── board-member-update.md             # Vorlage — proaktive Board-Mitglieder-Kontaktaufnahme zwischen Meetings
│   │   ├── investor-check-in.md               # Vorlage — vierteljährlicher oder anlassbezogener Investorenkontakt
│   │   ├── speaking-invitation-accept.md      # Vorlage — Annahme einer Konferenz- oder Podiumseinladung
│   │   ├── speaking-invitation-decline.md     # Vorlage — höfliche Absage mit Weiterleitungsoption
│   │   ├── intro-request.md                   # Vorlage — Anfrage einer persönlichen Empfehlung im Namen der Führungskraft
│   │   ├── intro-forwarder.md                 # Vorlage — Weiterleitung einer Empfehlung mit doppeltem Opt-in
│   │   └── thank-you-post-event.md            # Vorlage — Danksagung nach Veranstaltung oder Meeting
│   ├── agendas/
│   │   ├── 1-1-agenda.md                      # Standard-1:1-Agenda — feste Punkte, Themen, benötigte Entscheidungen
│   │   ├── leadership-team-agenda.md          # Wöchentliche Führungsteam-Meeting-Struktur
│   │   ├── board-meeting-agenda.md            # Board-Meeting-Agendaformat mit Zeitblöcken
│   │   └── offsite-agenda.md                  # Ganztägige Offsite-Agenda mit Moderationshinweisen
│   └── briefings/
│       ├── external-meeting-brief.md          # Briefing-Format für externe Meetings
│       └── internal-review-brief.md           # Briefing-Format für interne Geschäftsüberprüfungen
├── reports/                                   # Wöchentliche und monatliche Zusammenfassungen für die Führungskraft
│   ├── README.md                              # Berichtsrhythmus und Verteilerliste
│   ├── weekly/
│   │   ├── 2026-W22-weekly-brief.md           # Woche vom 2026-05-25 — Prioritäten, Zeitplan, offene Punkte
│   │   ├── 2026-W23-weekly-brief.md           # Woche vom 2026-06-01 — aktuelle Woche
│   │   └── weekly-brief-template.md           # Vorlage — Zeitplan, Prioritäten, Entscheidungen, Folgemaßnahmen
│   └── monthly/
│       ├── 2026-05-monthly-summary.md         # Mai 2026 — wichtigste Ergebnisse, Reisezusammenfassung, getroffene Entscheidungen
│       └── monthly-summary-template.md        # Vorlage — Highlights, Stakeholder-Kontakte, offene Punkte
└── expenses/                                  # Spesenerfassung und Einreichungsunterlagen
    ├── README.md                              # Spesenrichtlinienübersicht, Concur/Expensify-Anmeldung, Genehmigungskette
    ├── 2026-06/
    │   ├── june-expenses-log.md               # Laufendes Spesenprotokoll dieses Monats zur Vorabprüfung
    │   └── receipts-checklist.md              # Fehlende-Belege-Tracker vor Monatsabschluss
    └── archive/
        ├── 2026-05-expense-report.md          # Eingereicherter und genehmigter Mai-Bericht
        └── 2026-04-expense-report.md          # Eingereicherter und genehmigter April-Bericht
```

## Wichtige Dateien erklärt

| Pfad | Zweck |
|---|---|
| `.claude/commands/meeting-brief.md` | Slash-Befehl, der Teilnehmernamen und eine Agenda entgegennimmt, aus `stakeholders/` und `briefings/briefing-template.md` zieht und ein strukturiertes Vor-Meeting-Briefing zum Versenden oder Speichern erstellt |
| `.claude/commands/board-prep.md` | Slash-Befehl, der `board/`-Materialien für das kommende Quartal liest, den Vorab-Lese-Paket-Entwurf zusammenstellt, die Agenda skizziert und offene Aktionspunkte aus dem vorherigen Meeting kennzeichnet |
| `.claude/commands/follow-up-tracker.md` | Slash-Befehl, der rohe Meeting-Notizen oder ein Transkript aufnimmt, Aktionspunkte mit Verantwortlichen und Fälligkeitsdaten extrahiert und sie als nachverfolgbare Folgemaßnahmenliste formatiert |
| `.claude/commands/weekly-brief.md` | Slash-Befehl, der den Kalender der aktuellen Woche, offene Folgemaßnahmen und Prioritätskontext abruft, um das Montagmorgen-Briefing der Führungskraft zu erstellen |
| `briefings/briefing-template.md` | Kanonisches Briefing-Format: Teilnehmer mit Titeln, Agenda mit Zeitblöcken, Führungskontext, erwartete Fragen, vorgeschlagene Anfragen — dient als Basis für jedes Meeting-Briefing |
| `stakeholders/board-members/` | Individuelle Board-Mitglieder-Profile mit Biografie, Kommunikationspräferenzen und Interaktionsverlauf — werden beim Verfassen von Board-Korrespondenz oder Meeting-Briefings verwendet |
| `travel/exec-travel-preferences.md` | Einzige Quelle der Wahrheit für Reisepräferenzen der Führungskraft: bevorzugte Airlines, Sitzplatz (Gang/Fenster), Hotelkategorie, Vielfliegerprogrammnummern, Ernährungspräferenzen, Bodentransportpräferenzen |
| `templates/email/` | Szenariospezifische E-Mail-Vorlagen — werden vom Befehl `stakeholder-email.md` verwendet, um kontextuell angemessene Korrespondenz zu verfassen, ohne bei Null beginnen zu müssen |
| `board/standing-materials/board-sop.md` | SOP für den vollständigen Board-Meeting-Lebenszyklus: Agendaentwurf, Materialverteilungsfristen, Genehmigungskette für Protokolle, DocuSign-Weiterleitung für Einwilligungspunkte |
| `reports/weekly/weekly-brief-template.md` | Vorlage für das Montagsbrief der Führungskraft: Wochenplan, nach Einfluss priorisierte Prioritäten, offene benötigte Entscheidungen, diese Woche fällige Folgemaßnahmen |

## Schnelles Gerüst

```bash
# Arbeitsbereichswurzel erstellen
mkdir -p ea-workspace
cd ea-workspace

# .claude-Struktur erstellen
mkdir -p .claude/commands

# Arbeitsbereichsverzeichnisse erstellen
mkdir -p briefings/briefing-template
mkdir -p briefings/2026-06
mkdir -p briefings/2026-05
mkdir -p board/members
mkdir -p board/2026-q2
mkdir -p board/2026-q1
mkdir -p board/standing-materials
mkdir -p travel/active
mkdir -p travel/archive
mkdir -p stakeholders/board-members
mkdir -p stakeholders/investors
mkdir -p stakeholders/partners
mkdir -p stakeholders/media
mkdir -p templates/email
mkdir -p templates/agendas
mkdir -p templates/briefings
mkdir -p reports/weekly
mkdir -p reports/monthly
mkdir -p expenses/2026-06
mkdir -p expenses/archive

# Schlüsseldateien anlegen
touch briefings/README.md briefings/briefing-template.md
touch board/README.md board/standing-materials/board-sop.md board/standing-materials/consent-calendar-template.md
touch board/members/board-member-profiles.md board/members/committee-assignments.md
touch travel/exec-travel-preferences.md travel/booking-sop.md travel/visa-passport-tracker.md travel/README.md
touch stakeholders/README.md
touch stakeholders/board-members/.gitkeep
touch stakeholders/investors/strategic-investors.md
touch stakeholders/partners/key-partners.md stakeholders/partners/partner-engagement-log.md
touch stakeholders/media/press-contacts.md stakeholders/media/spokesperson-sop.md
touch templates/email/meeting-request-external.md templates/email/meeting-request-internal.md
touch templates/email/follow-up-post-meeting.md templates/email/board-member-update.md
touch templates/email/investor-check-in.md templates/email/intro-request.md templates/email/intro-forwarder.md
touch templates/email/speaking-invitation-accept.md templates/email/speaking-invitation-decline.md
touch templates/email/thank-you-post-event.md
touch templates/agendas/1-1-agenda.md templates/agendas/leadership-team-agenda.md
touch templates/agendas/board-meeting-agenda.md templates/agendas/offsite-agenda.md
touch templates/briefings/external-meeting-brief.md templates/briefings/internal-review-brief.md
touch reports/README.md reports/weekly/weekly-brief-template.md reports/monthly/monthly-summary-template.md
touch expenses/README.md expenses/2026-06/june-expenses-log.md expenses/2026-06/receipts-checklist.md

# Claude Code-Skills installieren
npx uitkit add skill productivity/exec-briefing
npx uitkit add skill productivity/stakeholder-comms
npx uitkit add skill productivity/meeting-to-action
npx uitkit add skill small-business/monday-brief
npx uitkit add skill productivity/investor-update
npx uitkit add skill productivity/process-mapper
npx uitkit add skill productivity/vendor-evaluator

# Slash-Befehle installieren
npx uitkit add command meeting-brief
npx uitkit add command travel-plan
npx uitkit add command follow-up-tracker
npx uitkit add command board-prep
npx uitkit add command weekly-brief
npx uitkit add command stakeholder-email
npx uitkit add command expense-report
```

## CLAUDE.md-Vorlage

```markdown
# Executive-Assistenz-Arbeitsbereich

Dieser Arbeitsbereich unterstützt eine EA bei der Steuerung des gesamten operativen Rhythmus einer C-Level-Führungskraft:
Kalender, Meeting-Vorbereitung, Board-Governance, Reisen, Stakeholder-Kommunikation und Spesen.

---

## Was das ist

Ein strukturierter Claude Code-Arbeitsbereich für eine Executive Assistant. Die Verzeichnisse bilden direkt
die Arbeitsbereiche ab. Claude Code liest aus diesen Dateien, um organisationsspezifische Ausgaben zu erzeugen —
Briefings, E-Mails und Folgemaßnahmenlisten, die echte Beziehungen und tatsächlichen Kontext widerspiegeln, keine generischen Formate.

---

## Stack

- Google Workspace — Gmail und Google Calendar als primäre Kommunikations- und Planungsebene (MCP: gmail, google-drive)
- Notion — Briefing-Dokumente und SOPs (zugänglich über Google Drive MCP oder Notion API)
- Slack — interne asynchrone Kommunikation und Überwachung des Führungskanals (MCP: slack)
- Zoom — Meeting-Logistik und Aufzeichnungslinks
- Concur oder Expensify — Reisebuchung und Speseneinreichung
- DocuSign — Dokumentenweiterleitung und Unterschriftsstatus-Verfolgung

---

## Verzeichniskonventionen

- `briefings/` — Eine Datei pro Meeting, benannt nach `YYYY-MM-DD-kurzbeschreibung.md`. Monatlich archiviert.
- `board/` — Ein Unterverzeichnis pro Quartal (z. B. `2026-q2/`). Dauerhafte Materialien bleiben in `standing-materials/`.
- `travel/` — Aktive Reisepläne in `travel/active/`, abgeschlossene Reisen in `travel/archive/`. Präferenzen in `exec-travel-preferences.md`.
- `stakeholders/` — Eine Datei pro hochpriorisiertem Kontakt. Nach Stufe geordnet: `board-members/`, `investors/`, `partners/`, `media/`.
- `templates/` — E-Mail-Vorlagen in `templates/email/`, Meeting-Agenden in `templates/agendas/`. Vorlagen niemals direkt bearbeiten — erst in den Arbeitskontext kopieren.
- `reports/` — Wöchentliche Briefings in `reports/weekly/`, monatliche Zusammenfassungen in `reports/monthly/`. Namensformat: `YYYY-WNN-weekly-brief.md` oder `YYYY-MM-monthly-summary.md`.
- `expenses/` — Ein Unterverzeichnis pro Monat. Spesen in `june-expenses-log.md` protokollieren, bevor sie in Concur/Expensify eingereicht werden.

---

## Häufige Aufgaben — genaue Befehle

### Meeting-Vorbereitung
```
/meeting-brief    — Teilnehmer und Agenda angeben. Claude zieht Stakeholder-Profile aus stakeholders/
                    und erstellt ein vollständiges Vor-Meeting-Briefing auf Basis von briefings/briefing-template.md.
```

### Board-Governance
```
/board-prep       — Erstellt den Entwurf des Board-Vorab-Lese-Pakets, die Agendaskizze und kennzeichnet
                    offene Aktionspunkte aus board/YYYY-QN/action-items-*.md des Vorquartals.
```

### Folgemaßnahmen-Verfolgung
```
/follow-up-tracker — Meeting-Notizen oder Transkript einfügen. Claude extrahiert Aktionspunkte mit Verantwortlichen,
                     Fälligkeitsdaten und formatiert sie als nachverfolgbare Liste zum Versenden oder Protokollieren.
```

### Wöchentliches Briefing
```
/weekly-brief     — Kompiliert den Wochenplan, offene Folgemaßnahmen und Prioritätskontext zu
                    dem Montagmorgen-Briefing der Führungskraft auf Basis von reports/weekly/weekly-brief-template.md.
```

### Stakeholder-Kommunikation
```
/stakeholder-email — Empfänger und Zweck angeben. Claude lädt das Profil aus stakeholders/
                     und entwirft auf Basis der passenden Vorlage in templates/email/.
```

### Reiselogistik
```
/travel-plan      — Ziel und Daten angeben. Claude wendet die Führungskraftpräferenzen aus
                    travel/exec-travel-preferences.md an und generiert eine vollständige Reiseplan-Checkliste.
```

### Spesenmanagement
```
/expense-report   — Spesendetails oder eine Belegliste angeben. Claude formatiert die Einreichung
                    gemäß der Richtlinie in expenses/README.md, bereit für die Eingabe in Concur oder Expensify.
```

---

## Konventionen, die Claude einhalten muss

- Stakeholder-Namen, Titel oder Beziehungskontext niemals erfinden. Zuerst aus `stakeholders/` lesen.
- Alle Meeting-Briefings müssen `briefings/briefing-template.md` als Basisstruktur verwenden — kein neues Format erfinden.
- Beim Verfassen von E-Mails immer das Empfängerprofil aus `stakeholders/` laden, bevor eine Vorlage gewählt wird.
- Reisepläne müssen `travel/exec-travel-preferences.md` widerspiegeln — Sitzpräferenz, Vielfliegernummern, Hotelkategorie.
- Board-Protokolle und Materialien in `board/` sind vertraulich. Keinen wörtlichen Inhalt in Ausgaben aufnehmen, die per E-Mail versendet werden.
- Speseneinträge müssen die Richtlinie in `expenses/README.md` referenzieren. Alles, was das Tagegeld überschreitet oder einen fehlenden Beleg erfordert, kennzeichnen.
- Wenn eine Folgemaßnahme aus einem Meeting extrahiert wird und Board-Mitglieder beteiligt waren, `board/standing-materials/board-sop.md` prüfen.
```

## MCP-Server

```json
{
  "mcpServers": {
    "gmail": {
      "command": "npx",
      "args": ["-y", "@gptscript-ai/mcp-server-gmail"],
      "env": {
        "GMAIL_CLIENT_ID": "${GMAIL_CLIENT_ID}",
        "GMAIL_CLIENT_SECRET": "${GMAIL_CLIENT_SECRET}",
        "GMAIL_REFRESH_TOKEN": "${GMAIL_REFRESH_TOKEN}"
      }
    },
    "google-drive": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-gdrive"],
      "env": {
        "GDRIVE_CLIENT_ID": "${GDRIVE_CLIENT_ID}",
        "GDRIVE_CLIENT_SECRET": "${GDRIVE_CLIENT_SECRET}",
        "GDRIVE_REFRESH_TOKEN": "${GDRIVE_REFRESH_TOKEN}"
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
        "/Users/you/ea-workspace"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"briefings/\"; then echo \"[Briefing hook] Briefing saved — confirm it has been shared with the exec via Slack or email before the meeting.\"; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"board/\" && echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"action-items\"; then echo \"[Board hook] Action items filed — verify each item has an owner and due date before distributing.\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'echo \"[Session end] Check for any drafted emails or follow-ups that still need to be sent. Open items should be logged in the current week report under reports/weekly/.\"\n'"
          }
        ]
      }
    ]
  }
}
```

## Zu installierende Skills

```bash
npx uitkit add skill productivity/exec-briefing
npx uitkit add skill productivity/stakeholder-comms
npx uitkit add skill productivity/meeting-to-action
npx uitkit add skill small-business/monday-brief
npx uitkit add skill productivity/investor-update
npx uitkit add skill productivity/process-mapper
npx uitkit add skill productivity/vendor-evaluator
npx uitkit add skill productivity/lesson-planner
npx uitkit add skill productivity/doc-site-builder
```

## Verwandt

- [Leitfaden: Claude für Executive Assistants](../guides/for-executive-assistant.md)
- [Workflow: Board-Meeting-Zyklus](../workflows/board-meeting-cycle.md)
- [Workflow: Executive Weekly](../workflows/executive-weekly.md)
