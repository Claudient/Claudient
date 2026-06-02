# Design-Agentur / Design-Studio — Projektstruktur

> Für Design-Agenturen, die Kundenprojekte in den Bereichen Branding, UX und digitalem Design verwalten — vom Briefing-Eingang und Moodboarding über die Designproduktion, asynchrone Reviews und Kundenübergabe bis zur Projektabrechnung — in einem einzigen Claude Code-Arbeitsbereich.

## Stack

- **Design + Prototyping + Übergabe:** Figma (Komponenten, Auto-Layout, Dev-Modus, Prototype-Flows, Design-Tokens, Figma Sites)
- **Projektmanagement + Briefings:** Notion (Kundendatenbanken, Projekt-Wikis, Kreativbriefings, Meeting-Notizen)
- **Aufgabenverfolgung:** Linear (aufgabenbezogenes Task-Management, Sprint-Zyklen, Prioritätentriage) oder Asana (Projektzeitpläne, Aufgabenabhängigkeiten, für Kunden sichtbare Boards)
- **Zeiterfassung:** Harvest (projektbezogene Zeiterfassung, Budgetauslastung, Teamkapazitätsberichte)
- **Rechnungsstellung:** FreshBooks (Kundenrechnungen, Retainer-Abrechnung, Ausgabenverfolgung, Zahlungserinnerungen)
- **Asynchrones Video-Review:** Loom (Konzeptpräsentationen, Revisionserkärungen, Übergabe-Walkthroughs für Entwickler)
- **Kommunikation:** Slack (#client-<name> pro Kunde, #design-production, #new-business, #ops)
- **Docs + freigegebene Laufwerke:** Google Workspace (Docs für Lieferergebnisse, Slides für Präsentationen, Drive für Asset-Speicherung)

## Verzeichnisstruktur

```
design-agency/
├── .claude/
│   ├── CLAUDE.md                                        # Arbeitsbereichsanweisungen für Claude Code
│   ├── settings.json                                    # MCP-Server, Hooks, Berechtigungen
│   └── commands/
│       ├── new-client.md                                # /new-client — vollständiges Kundenverzeichnis aus _template erstellen
│       ├── creative-brief.md                            # /creative-brief — strukturiertes Kreativbriefing aus Intake-Notizen generieren
│       ├── design-review.md                             # /design-review — Agenda + Feedback-Rahmen für Design-Review-Session erstellen
│       ├── handoff.md                                   # /handoff — Entwickler-Übergabe-Checkliste und Figma-Annotationsguide generieren
│       ├── revision-log.md                              # /revision-log — Revisionsrunde mit Umfang, Begründung und Rundenanzahl protokollieren
│       ├── proposal.md                                  # /proposal — Neugeschäfts-Projektangebot aus Interessentennotizen erstellen
│       ├── ux-audit.md                                  # /ux-audit — strukturiertes UX-Heuristik-Audit gegen ein Briefing oder Figma-Link durchführen
│       └── invoice-summary.md                          # /invoice-summary — Harvest-Stunden für FreshBooks-Rechnungsvorbereitung zusammenfassen
├── clients/
│   ├── _template/                                       # Master-Vorlage — bei Intake nach clients/<client-slug>/ kopieren
│   │   ├── brief.md                                     # Kunden-Kreativbriefing — Ziele, Zielgruppe, Lieferergebnisse, Einschränkungen, Zeitplan
│   │   ├── contract.md                                  # Projektvertrag oder Retainer-Vereinbarung mit Leistungsumfang und Zahlungsbedingungen
│   │   ├── brand-assets/
│   │   │   ├── brand-guidelines.md                      # Farben, Typografie, Logo-Regeln, Tonalität
│   │   │   ├── logo/                                    # Genehmigte Logo-Dateien: SVG, PNG, Hell-/Dunkel-Varianten
│   │   │   ├── fonts/                                   # Lizenzierte Schriftdateien oder Google Fonts-Spezifikation
│   │   │   └── photography/                             # Genehmigter Fotografie-Styleguide und freigegebene Hero-Bilder
│   │   ├── design-files-links.md                        # Links zu allen Figma-Dateien: Hauptdatei, Komponentenbibliothek, Prototyp
│   │   ├── feedback-log.md                              # Zeitgestempeltes Protokoll aller Kundenfeedbacks nach Runde
│   │   ├── deliverables/
│   │   │   ├── _handoff-checklist.md                    # Abnahme-Checkliste vor der Übergabe eines Lieferergebnisses
│   │   │   └── exports/                                 # Finale exportierte Assets: PNG, SVG, PDF, ZIP
│   │   └── invoice-log.md                               # Rechnungshistorie: Datum, Betrag, Umfang, Status (bezahlt/ausstehend)
│   ├── nova-brand-co/
│   │   ├── brief.md
│   │   ├── contract.md
│   │   ├── brand-assets/
│   │   │   ├── brand-guidelines.md
│   │   │   ├── logo/
│   │   │   │   ├── nova-logo-primary.svg
│   │   │   │   ├── nova-logo-dark.svg
│   │   │   │   └── nova-logo-mark.png
│   │   │   ├── fonts/
│   │   │   │   └── font-spec.md
│   │   │   └── photography/
│   │   │       └── style-guide.md
│   │   ├── design-files-links.md
│   │   ├── feedback-log.md
│   │   ├── deliverables/
│   │   │   ├── _handoff-checklist.md
│   │   │   └── exports/
│   │   │       ├── nova-brand-kit-v1.zip
│   │   │       └── nova-logo-package.zip
│   │   └── invoice-log.md
│   └── meridian-app/
│       ├── brief.md
│       ├── contract.md
│       ├── brand-assets/
│       │   ├── brand-guidelines.md
│       │   ├── logo/
│       │   └── fonts/
│       ├── design-files-links.md
│       ├── feedback-log.md
│       ├── deliverables/
│       │   ├── _handoff-checklist.md
│       │   └── exports/
│       └── invoice-log.md
├── projects/
│   ├── nova-brand-identity/                             # Aktives Projekt — ein Verzeichnis pro benanntem Projekt
│   │   ├── brief.md                                     # Projektspezifisches Briefing (kann vom Briefing auf Kundenebene abweichen)
│   │   ├── moodboard.md                                 # Visuelle Referenzen, Inspirationslinks, stilistische Richtungsnotizen
│   │   ├── concepts/
│   │   │   ├── concept-a-modern-minimal/
│   │   │   │   ├── notes.md                             # Design-Begründung und Präsentationsgesprächspunkte
│   │   │   │   └── figma-link.md                        # Link zum Figma-Frame oder zur Seite für dieses Konzept
│   │   │   └── concept-b-bold-expressive/
│   │   │       ├── notes.md
│   │   │       └── figma-link.md
│   │   ├── revisions/
│   │   │   ├── round-1/
│   │   │   │   ├── client-feedback.md                   # Wörtliches oder zusammengefasstes Kundenfeedback
│   │   │   │   ├── revision-notes.md                    # Designer-Notizen zu geänderten Inhalten und dem Grund
│   │   │   │   └── figma-link.md
│   │   │   └── round-2/
│   │   │       ├── client-feedback.md
│   │   │       ├── revision-notes.md
│   │   │       └── figma-link.md
│   │   └── final/
│   │       ├── approved-concept.md                      # Aufzeichnung des genehmigten Konzepts und des Genehmigungsdatums
│   │       ├── handoff-notes.md                         # Notizen an den Entwickler oder Kunden für die finale Lieferung
│   │       └── figma-link.md
│   └── meridian-app-ux/
│       ├── brief.md
│       ├── moodboard.md
│       ├── concepts/
│       │   └── concept-a-card-based-nav/
│       │       ├── notes.md
│       │       └── figma-link.md
│       ├── revisions/
│       │   └── round-1/
│       │       ├── client-feedback.md
│       │       ├── revision-notes.md
│       │       └── figma-link.md
│       └── final/
│           ├── approved-concept.md
│           ├── handoff-notes.md
│           └── figma-link.md
├── templates/
│   ├── creative-brief.md                                # Standard-Kreativbriefing: Ziele, Zielgruppe, Lieferergebnisse, Zeitplan, Einschränkungen
│   ├── project-proposal.md                              # Neugeschäfts-Angebot: Ausgangslage, Ansatz, Team, Investition, Zeitplan
│   ├── design-review-agenda.md                          # Design-Review-Meeting-Agenda mit strukturierten Feedback-Fragen
│   ├── handoff-checklist.md                             # Übergabe-Checkliste: Figma-Bereinigung, Exporte, Annotationen, Dev-Modus
│   └── revision-policy.md                               # Studio-Revisionsrichtlinie: Was als Revision gilt, Rundenlimits, außerhalb des Leistungsumfangs
├── new-business/
│   ├── prospect-tracker.md                              # Interessenten-Pipeline: Unternehmen, Kontakt, Phase, letzter Kontakt, nächste Aktion
│   ├── case-studies/
│   │   ├── nova-brand-identity.md                       # Strukturierte Fallstudie: Herausforderung, Ansatz, Ergebnis, Referenz
│   │   └── meridian-app-ux.md
│   ├── capabilities-deck.md                             # Agentur-Kompetenzübersicht: Leistungen, Prozess, Team, ausgewählte Arbeiten
│   └── rate-card.md                                     # Stundensätze, Projektmindestbeträge, Retainer-Stufen, Express-Aufschläge
└── ops/
    ├── onboarding-sop.md                                # Neukunden-Onboarding: Intake, Kick-off, Figma-Setup, Slack-Kanal, Harvest
    ├── revision-policy.md                               # Interne Version der Revisionsrichtlinie (inkl. Eskalationspfad)
    ├── brand-guidelines-for-agency.md                   # Eigene Marke der Agentur: Logo, Farben, Typografie, Tonalität für Pitches und Dokumente
    ├── new-hire-checklist.md                            # Designer-Onboarding: Tool-Zugang, Figma-Organisation, Slack, Harvest, Dateinamenskonventionen
    └── offboarding-sop.md                               # Kunden-Offboarding: finale Asset-Lieferung, Zugangswiederruf, Archivierung
```

## Wichtige Dateien erklärt

| Pfad | Zweck |
|---|---|
| `.claude/commands/new-client.md` | Slash-Befehl, der `clients/_template/` nach `clients/<slug>/` kopiert, `brief.md` aus Intake-Antworten vorausfüllt und einen Entwurf von `contract.md` und `invoice-log.md` erstellt |
| `.claude/commands/creative-brief.md` | Nimmt Kunden-Slug, Projekttyp und Intake-Notizen als Eingabe; erstellt ein vollständig strukturiertes Kreativbriefing, das auf den Brand-Guidelines und Geschäftszielen des Kunden ausgerichtet ist |
| `.claude/commands/handoff.md` | Generiert eine Figma-Dev-Modus-Übergabe-Checkliste und Annotationsguide aus `templates/handoff-checklist.md`; verknüpft mit dem `design-files-links.md` des Kunden |
| `.claude/commands/revision-log.md` | Protokolliert eine neue Revisionsrunde in `projects/<project>/revisions/round-N/` mit Kundenfeedback, Designer-Notizen, Rundenanzahl und Außerumfangs-Markierung bei Richtlinienverstoss |
| `clients/_template/` | Master-Scaffolding-Verzeichnis — diesen gesamten Ordner beim Onboarding eines neuen Kunden kopieren, um sicherzustellen, dass alle Dateien und Ordner vor dem Kick-off vorhanden sind |
| `clients/<slug>/feedback-log.md` | Chronologisches Protokoll aller Kundenfeedbacks über alle Runden; zur Verfolgung der Revisionshistorie und zur Unterstützung von Leistungsumfangs-Gesprächen |
| `projects/<project>/revisions/` | Ein Unterverzeichnis pro Revisionsrunde, das Kundenfeedback und Designer-Notizen mit dem Figma-Link für diese Runde verknüpft — ermöglicht klare Versionsverfolgung |
| `templates/revision-policy.md` | Maßgebliche Quelle für die Definition einer Revision, die Anzahl enthaltener Runden und was eine Außerumfangs-Gebühr auslöst; wird in allen Angeboten und Verträgen referenziert |
| `ops/onboarding-sop.md` | Schritt-für-Schritt-Checkliste für die Aktivierung eines neuen Kunden: vom Intake über den Kick-off bis zur Tool-Einrichtung und zum ersten Lieferergebnis |
| `new-business/rate-card.md` | Aktuelle Preisgestaltung für alle Leistungsstufen; von `/proposal` bei der Berechnung der Projektinvestition referenziert |

## Schnell-Scaffold

```bash
# Arbeitsbereich-Root erstellen
mkdir -p design-agency && cd design-agency

# Claude Code-Konfiguration
mkdir -p .claude/commands

# Kunden-_template (volle Tiefe)
mkdir -p clients/_template/brand-assets/logo
mkdir -p clients/_template/brand-assets/fonts
mkdir -p clients/_template/brand-assets/photography
mkdir -p clients/_template/deliverables/exports

# Beispielkunde: nova-brand-co
mkdir -p clients/nova-brand-co/brand-assets/logo
mkdir -p clients/nova-brand-co/brand-assets/fonts
mkdir -p clients/nova-brand-co/brand-assets/photography
mkdir -p clients/nova-brand-co/deliverables/exports

# Beispielkunde: meridian-app
mkdir -p clients/meridian-app/brand-assets/logo
mkdir -p clients/meridian-app/brand-assets/fonts
mkdir -p clients/meridian-app/deliverables/exports

# Aktive Projekte
mkdir -p projects/nova-brand-identity/concepts/concept-a-modern-minimal
mkdir -p projects/nova-brand-identity/concepts/concept-b-bold-expressive
mkdir -p projects/nova-brand-identity/revisions/round-1
mkdir -p projects/nova-brand-identity/revisions/round-2
mkdir -p projects/nova-brand-identity/final

mkdir -p projects/meridian-app-ux/concepts/concept-a-card-based-nav
mkdir -p projects/meridian-app-ux/revisions/round-1
mkdir -p projects/meridian-app-ux/final

# Vorlagen
mkdir -p templates

# Neugeschäft
mkdir -p new-business/case-studies

# Betrieb
mkdir -p ops

# Claude-Konfigurationsdateien initialisieren
touch .claude/CLAUDE.md
touch .claude/settings.json

# _template-Platzhalterdateien erstellen
touch clients/_template/brief.md
touch clients/_template/contract.md
touch clients/_template/brand-assets/brand-guidelines.md
touch clients/_template/design-files-links.md
touch clients/_template/feedback-log.md
touch clients/_template/deliverables/_handoff-checklist.md
touch clients/_template/invoice-log.md

# Vorlagendateien erstellen
touch templates/creative-brief.md
touch templates/project-proposal.md
touch templates/design-review-agenda.md
touch templates/handoff-checklist.md
touch templates/revision-policy.md

# Neugeschäftsdateien
touch new-business/prospect-tracker.md
touch new-business/capabilities-deck.md
touch new-business/rate-card.md

# Betriebsdateien
touch ops/onboarding-sop.md
touch ops/revision-policy.md
touch ops/brand-guidelines-for-agency.md
touch ops/new-hire-checklist.md
touch ops/offboarding-sop.md

# Relevante Skills installieren
npx claudient add skill product/ux-audit
npx claudient add skill product/persona-builder
npx claudient add skill marketing/brand-guidelines
npx claudient add skill productivity/creative-brief
npx claudient add skill productivity/stakeholder-comms
npx claudient add skill productivity/process-mapper
npx claudient add skill productivity/vendor-evaluator
npx claudient add skill productivity/exec-briefing
npx claudient add skill data-ml/stakeholder-report

# Slash-Befehle installieren
npx claudient add command new-client
npx claudient add command creative-brief
npx claudient add command design-review
npx claudient add command handoff
npx claudient add command revision-log
npx claudient add command proposal
npx claudient add command ux-audit
npx claudient add command invoice-summary

echo "Design-Agentur-Arbeitsbereich bereit."
```

## CLAUDE.md-Vorlage

```markdown
# Design-Agentur — Claude-Anweisungen

## Was das hier ist

Dieser Arbeitsbereich verwaltet den vollständigen Kunden-Lebenszyklus eines Design-Studios:
Intake, Kreativbriefing, Konzeptentwicklung, Revisionsverfolgung, asynchrones Review (Loom),
Entwicklerübergabe (Figma Dev-Modus) und Projektabrechnung (Harvest + FreshBooks). Jeder
Kunde verfügt über ein isoliertes Verzeichnis unter clients/. Aktive Projekte befinden sich
unter projects/. Alle Dokumentvorlagen liegen unter templates/. Die Betriebsdokumentation
befindet sich unter ops/.

## Stack

- Design: Figma (Haupt-Design-Tool, Komponentenbibliotheken, Prototypen, Dev-Modus-Übergabe)
- Projektmanagement: Notion (Projekt-Wikis, Kreativbriefings, Kundendatenbanken, Meeting-Notizen)
- Aufgabenverfolgung: Linear (Sprint-Issues, Bug-Triage, Design-QA-Aufgaben)
- Zeiterfassung: Harvest (pro Projekt, fakturierbar vs. nicht fakturierbar, Budgetauslastungs-Alerts)
- Rechnungsstellung: FreshBooks (Kundenrechnungen, Retainer-Abrechnung, Ausgabenverfolgung)
- Asynchrones Review: Loom (Konzeptpräsentationen, Revisionserkärungen, Übergabe-Walkthroughs)
- Kommunikation: Slack (#client-<slug> pro Kunde, #design-production, #new-business, #ops)
- Docs + Assets: Google Workspace (Slides für Präsentationen, Drive für finale Asset-Lieferung)

## Verzeichniskonventionen

- clients/<client-slug>/ — alle Dateien auf Kundenebene; niemals Assets zwischen Kundenordnern mischen
- clients/<client-slug>/brand-assets/ — maßgebliche Quelle für genehmigte Logos, Farben, Schriften
- clients/<client-slug>/feedback-log.md — jede Feedbackrunde hier mit Datum und Rundennummer anhängen
- clients/<client-slug>/invoice-log.md — jede Rechnung mit Datum, Betrag, Umfang, Status anhängen
- projects/<project-name>/ — ein Verzeichnis pro benanntem Projekt-Lieferergebnis (nicht pro Kunde)
- projects/<project>/revisions/round-N/ — ein Unterverzeichnis pro Revisionsrunde
- projects/<project>/final/ — nur nach Kundengenehmigung befüllen; keine Entwürfe hier ablegen
- templates/ — kanonische Dokumentstrukturen; immer eine Vorlage kopieren, bevor man anfängt zu schreiben
- new-business/ — nur Interessentenverfolgung, Angebote und Fallstudien; kein aktives Kundenarbeit hier

## Onboarding eines neuen Kunden

1. clients/_template/ nach clients/<new-client-slug>/ kopieren:
   cp -r clients/_template clients/<new-client-slug>
2. /new-client client="<Name>" slug="<slug>" project-type="<branding|ux|digital>" ausführen
3. clients/<slug>/brief.md aus dem Intake-Call vor dem Kick-off-Meeting vervollständigen
4. Nach dem Kick-off clients/<slug>/brand-assets/brand-guidelines.md befüllen
5. Vertrag mit dem Umfangsabschnitt von templates/project-proposal.md entwerfen; in clients/<slug>/contract.md speichern
6. Kunden-Figma-Datei-Links sofort bei Projekterstellung in clients/<slug>/design-files-links.md eintragen
7. Harvest-Projekt erstellen und Projekt-ID in clients/<slug>/brief.md protokollieren
8. FreshBooks-Kundendatensatz öffnen und mit clients/<slug>/invoice-log.md verknüpfen

## Start eines neuen Projekts

1. projects/<project-name>/ von Grund auf erstellen oder eine bestehende Projektstruktur kopieren
2. /creative-brief client="<slug>" project="<project-name>" type="<branding|ux|digital>" ausführen
3. projects/<project-name>/moodboard.md mit Figma-Frame-Links und Referenz-URLs befüllen
4. Konzepte unter projects/<project-name>/concepts/concept-<buchstabe>-<kurz-label>/ aufbauen
5. Jedes Konzeptverzeichnis benötigt: notes.md (Begründung + Gesprächspunkte) und figma-link.md

## Design-Review-Workflow

1. /design-review project="<project-name>" round="<N>" concepts="<liste>" ausführen
2. Generierte Agenda aus templates/design-review-agenda.md für den Loom-Walkthrough verwenden
3. Loom-Video aufnehmen und Link in Slack #client-<slug> teilen
4. Nach Anruf oder asynchronem Review, Feedback wörtlich in clients/<slug>/feedback-log.md anhängen
5. /revision-log project="<project-name>" round="<N>" ausführen, um das Revisionsverzeichnis zu öffnen

## Revisionsverwaltung

- Jede Runde erhält ein eigenes Verzeichnis: projects/<project>/revisions/round-N/
- Kundenfeedback in round-N/client-feedback.md protokollieren, bevor Änderungen vorgenommen werden
- Nach Revisionen in round-N/revision-notes.md dokumentieren, was geändert wurde
- templates/revision-policy.md (und ops/revision-policy.md) vor dem Start von Runde 3+ prüfen
- Außerumfangs-Anfragen: Umfang besprechen, bevor Zeit geloggt wird; ggf. einen Nachtrag erstellen

## Übergabe-Workflow

1. /handoff project="<project-name>" client="<slug>" ausführen, um die Übergabe-Checkliste zu generieren
2. Jeden Punkt in deliverables/_handoff-checklist.md abarbeiten, bevor die Lieferung als abgeschlossen markiert wird
3. Figma-Übergabe: Dev-Modus auf allen finalen Frames aktivieren, alle Ebenen benennen, Redline-Annotationen hinzufügen
4. Finale Assets in clients/<slug>/deliverables/exports/ exportieren (PNG 1x/2x, SVG, PDF)
5. Einen Loom-Walkthrough der Figma-Datei für den empfangenden Entwickler oder Kunden aufnehmen
6. Google Drive-Ordner-Link für Assets teilen; Zugang bestätigen, bevor das Projekt geschlossen wird

## Abrechnungskonventionen

- Zeit in Harvest sofort nach jeder Arbeitssitzung erfassen — nie am Ende der Woche bündeln
- Fakturierbare Codes: discovery, strategy, design-production, revisions, handoff, account-management
- Nicht fakturierbar: interne Kritik, Tool-Setup, Administration, Pitch-Arbeit (außer wenn das Angebot gewonnen wird)
- /invoice-summary client="<slug>" month="<JJJJ-MM>" vor der Erstellung der FreshBooks-Rechnung ausführen
- Bei Projektetappenabschluss oder am 1. des Monats für Retainer-Kunden in Rechnung stellen
- Jede gesendete Rechnung in clients/<slug>/invoice-log.md mit Datum, Betrag und Status anhängen

## Figma-Dateibenennungskonventionen

- Hauptdatei: [Kundenname] — [Projektname] — Design
- Komponentenbibliothek: [Kundenname] — Component Library
- Prototyp: [Kundenname] — [Projektname] — Prototype
- Archivierte Datei: [Kundenname] — [Projektname] — ARCHIVED JJJJ-MM
- Alle Datei-Links stets bei Erstellung in clients/<slug>/design-files-links.md eintragen
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
        "/Users/${USER}/design-agency"
      ]
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-notion"],
      "env": {
        "NOTION_API_TOKEN": "${NOTION_API_TOKEN}"
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
    "google-drive": {
      "command": "npx",
      "args": ["-y", "@google-labs/google-drive-mcp"],
      "env": {
        "GOOGLE_CLIENT_ID": "${GOOGLE_CLIENT_ID}",
        "GOOGLE_CLIENT_SECRET": "${GOOGLE_CLIENT_SECRET}",
        "GOOGLE_REFRESH_TOKEN": "${GOOGLE_REFRESH_TOKEN}"
      }
    },
    "linear": {
      "command": "npx",
      "args": ["-y", "@linear/mcp-server"],
      "env": {
        "LINEAR_API_KEY": "${LINEAR_API_KEY}"
      }
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
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_OUTPUT_FILE_PATH\"; if [[ \"$FILE\" == */projects/*/revisions/*/client-feedback.md ]]; then echo \"[hook] Revision feedback logged: $FILE — run /revision-log to open designer notes and update feedback-log.md\"; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_OUTPUT_FILE_PATH\"; if [[ \"$FILE\" == */projects/*/final/approved-concept.md ]]; then echo \"[hook] Concept approved: $FILE — run /handoff to generate the developer handoff checklist\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'cd \"${CLAUDE_PROJECT_DIR}\" && MISSING=$(find clients/ -mindepth 1 -maxdepth 1 -type d ! -name _template | while read C; do [ ! -f \"$C/design-files-links.md\" ] || grep -q \"figma.com\" \"$C/design-files-links.md\" 2>/dev/null || echo \"$C\"; done | wc -l | tr -d \" \"); [ \"$MISSING\" -gt 0 ] && echo \"[reminder] $MISSING client(s) missing Figma links in design-files-links.md\" || true'"
          }
        ]
      }
    ]
  }
}
```

## Zu installierende Skills

```bash
npx claudient add skill product/ux-audit
npx claudient add skill product/persona-builder
npx claudient add skill marketing/brand-guidelines
npx claudient add skill productivity/stakeholder-comms
npx claudient add skill productivity/process-mapper
npx claudient add skill productivity/exec-briefing
npx claudient add skill productivity/vendor-evaluator
npx claudient add skill data-ml/stakeholder-report
```

## Verwandte Inhalte

- [Leitfaden: Claude für UX-Designer](../guides/for-ux-designer.md)
- [Workflow: Vom Kunden-Kick-off bis zur Projektübergabe](../workflows/design-project-lifecycle.md)
- [Workflow: Design-Review- und Revisionszyklus](../workflows/design-review-cycle.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
