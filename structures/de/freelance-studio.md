# Freelance Studio / Agentur — Projektstruktur

> Fur einen Solo-Freelancer oder ein kleines Studio, das Kundenprojekte, Geschäftsentwicklung und den Betrieb über Notion, HoneyBook, Cal.com, Loom, Figma, Stripe, Gmail und Slack verwaltet.

## Stack

- **Notion** — Projektmanagement, CRM, Kundenwissensdatenbank, Lieferverfolgung, internes Wiki
- **FreshBooks** oder **HoneyBook** — Rechnungsstellung, Verträge, Zahlungsabwicklung, Ausgabenverfolgung, Retainer-Abrechnung
- **Cal.com** — Kundenterminplanung, Discovery-Call-Buchung, Weiterleitung von Aufnahmeformularen, Pufferverwaltung
- **Loom** — Asynchrone Kundenupdates, Lieferdurchführungen, Feedback-Anfrage-Videos
- **Figma** — UI/UX-Lieferobjekte, Wireframes, Komponentenbibliotheken, Design-Übergaben
- **Framer** — Interaktive Prototypen, No-Code-Website-Lieferobjekte, kundenfertige Vorschauen
- **Stripe** — Zahlungsabwicklung, wiederkehrende Retainer-Abbuchungen, einmalige Projektgebühren, Auszahlungsverfolgung
- **Gmail** — Kundenkommunikation, Vertragsversand, Rechnungsmahnungen, Neugeschäftsansprache
- **Slack** — Aktive Projektkanäle pro Kunde, asynchrone Fragen, Dateifreigaben, Loom-Links
- **Claude Code** — Angebotserstellung, SOW-Generierung, Statusberichte, Rechnungsmahnungen, Outreach-Sequenzen

## Verzeichnisstruktur

```
freelance-studio/
├── .claude/
│   ├── CLAUDE.md                                    # Workspace-Anweisungen (Vorlage unten einfügen)
│   ├── settings.json                                # MCP-Server, Hooks, Berechtigungen
│   └── commands/
│       ├── new-client-onboard.md                    # /new-client-onboard — vollständige Onboarding-Checkliste + Willkommens-E-Mail + Kickoff-Agenda
│       ├── proposal-draft.md                        # /proposal-draft — Angebot aus Briefing: Problem, Ansatz, Lieferobjekte, Preisoptionen
│       ├── scope-of-work.md                         # /scope-of-work — strukturierter SOW mit Meilensteinen, Abnahmekriterien, Zahlungsauslösern
│       ├── invoice-chase.md                         # /invoice-chase — abgestufte Mahnungs-E-Mail (freundlich / bestimmt / letzte Mahnung) für überfällige Rechnungen
│       ├── client-status-update.md                  # /client-status-update — wöchentliches oder meilensteinbasiertes Update für E-Mail oder Loom-Skript
│       ├── feedback-request.md                      # /feedback-request — strukturierte Feedback-Anfrage nach Meilensteinlieferung
│       ├── project-closeout.md                      # /project-closeout — Offboarding-Checkliste, Abschlussrechnungs-Prompt, Empfehlungsanfrage
│       └── weekly-wrap.md                           # /weekly-wrap — persönlicher Wochenabschluss: Umsatz, Pipeline, Plan für die nächste Woche
├── clients/
│   ├── _template/                                   # Diesen gesamten Ordner kopieren, wenn ein neuer Kunde abgeschlossen wird
│   │   ├── brief.md                                 # Erstes Kundenbriefing: Ziele, Zeitplan, Budget, wichtige Ansprechpartner, Erfolgskriterien
│   │   ├── contract.md                              # Vertragszusammenfassung: wesentliche Bedingungen, Zahlungsplan, IP-Eigentümerschaft, Kündigungsklausel
│   │   ├── sow.md                                   # Leistungsumfang: Lieferobjekte, Meilensteine, Abnahmekriterien, Ausschlüsse
│   │   ├── communication-log.md                     # Wichtige E-Mails, Anrufe, Entscheidungen — den Inhalt festhalten, nicht die Formalitäten
│   │   ├── invoices/
│   │   │   └── .gitkeep
│   │   └── deliverables/
│   │       └── .gitkeep
│   ├── acme-corp-brand-2026/                        # Aktiver Kunde: Acme Corp Markenidentitätsprojekt
│   │   ├── brief.md
│   │   ├── contract.md                              # HoneyBook-Vertrags-ID: HB-2026-0041
│   │   ├── sow.md
│   │   ├── communication-log.md
│   │   ├── invoices/
│   │   │   ├── inv-001-deposit-2026-04-01.md        # Rechnungsdatensatz: Nummer, Betrag, Versanddatum, Zahlungsdatum, Stripe-Buchungs-ID
│   │   │   ├── inv-002-milestone-1-2026-05-01.md
│   │   │   └── inv-003-final-2026-06-15.md
│   │   └── deliverables/
│   │       ├── 2026-04-20-moodboard-v1.fig          # Figma-Dateilink oder exportiertes PDF
│   │       ├── 2026-05-05-brand-guidelines-v1.pdf
│   │       ├── 2026-05-18-brand-guidelines-v2-revised.pdf
│   │       └── 2026-06-10-final-handoff-package.zip
│   ├── betaworks-site-redesign/                     # Aktiver Kunde: Betaworks Framer-Website-Neugestaltung
│   │   ├── brief.md
│   │   ├── contract.md
│   │   ├── sow.md
│   │   ├── communication-log.md
│   │   ├── invoices/
│   │   │   ├── inv-001-deposit-2026-05-01.md
│   │   │   └── inv-002-milestone-1-2026-06-01.md
│   │   └── deliverables/
│   │       ├── 2026-05-15-wireframes-v1.fig
│   │       ├── 2026-05-28-wireframes-v2-approved.fig
│   │       └── 2026-06-05-framer-staging-link.md    # Framer-Vorschau-URL + Zugangsdaten
│   ├── gamma-dao-strategy/                          # Abgeschlossener Kunde — archiviert für Referenz und Fallstudie
│   │   ├── brief.md
│   │   ├── contract.md
│   │   ├── sow.md
│   │   ├── communication-log.md
│   │   ├── invoices/
│   │   │   ├── inv-001-deposit-2026-01-15.md
│   │   │   └── inv-002-completion-2026-03-01.md
│   │   └── deliverables/
│   │       └── 2026-03-01-strategy-deck-final.pdf
│   └── delta-fintech-ux/                            # In der Warteschleife — warte auf Budgetfreigabe des Kunden
│       ├── brief.md
│       └── communication-log.md
├── pipeline/
│   ├── prospects.md                                 # Unternehmen, Kontakt, Quelle, ICP-Passungswert, letzter Kontakt, nächste Aktion, geschätzter Wert
│   ├── proposals-sent.md                            # Angebotsverfolgung: Kunde, Versanddatum, Wert, Status, Follow-up-Datum, Ergebnis
│   └── follow-up-schedule.md                       # Wöchentliche Follow-up-Warteschlange: wen kontaktieren, warum, was sagen, Kanal (E-Mail / Slack / LinkedIn)
├── templates/
│   ├── proposal-template.md                         # Vollständiges Angebot: Zusammenfassung, Problem, Ansatz, Lieferobjekte, Zeitplan, Preisstufen, nächste Schritte
│   ├── sow-template.md                              # SOW: Umfang, Ausschlüsse, Meilensteine mit Daten, Abnahmekriterien, Zahlungsplan, Revisionsrichtlinie
│   ├── contract-template.md                         # MSA: IP-Übertragung, Vertraulichkeit, Zahlungsbedingungen, Auflösungsgebühr, Kündigung, Gerichtsstand
│   ├── invoice-template.md                          # Rechnungsformat: Positionen, Zahlungsbedingungen (Netto 7/14/30), Bankdaten, Stripe-Zahlungslink
│   ├── nda-template.md                              # Gegenseitige NDA für Pre-Proposal-Discovery-Gespräche
│   ├── status-update-template.md                    # Wöchentliches Update: abgeschlossen in diesem Zeitraum, in Bearbeitung, Blocker, Bedarf vom Kunden, Plan für nächsten Zeitraum
│   ├── project-brief-template.md                    # Discovery-Formular für Interessenten vor der Leistungsabgrenzung: Ziele, Budget, Zeitplan, Stakeholder
│   └── feedback-request-template.md                 # Feedback nach Meilenstein: spezifische Fragen zu Qualität, Ausrichtung und benötigten Überarbeitungen
├── ops/
│   ├── rate-card.md                                 # Aktuelle Preise: Stundensatz, Tagessatz, Projektminima, Retainer-Stufen — zuletzt überprüft: 2026-Q2
│   ├── service-packages.md                          # Produktisierte Pakete: Brand Sprint, Site in a Week, UX Audit — Umfang, Preis, Zeitplan, Leistungen
│   ├── onboarding-checklist.md                      # Schritte vom unterzeichneten Vertrag bis zum Kickoff: Zugänge, Tools, Slack-Kanal, Kickoff-Call, erhaltene Assets
│   ├── offboarding-checklist.md                     # Schritte beim Projektabschluss: Endlieferung, Rechnung, Empfehlungsanfrage, Portfoliorechte, Archivierungsordner
│   ├── tools-and-access.md                          # Jedes SaaS-Tool: Plan-Stufe, monatliche Kosten, Verlängerungsdatum, Anmeldemethode
│   └── subcontractors.md                            # Vertrauenswürdige Subunternehmer: Name, Fachgebiet, Satz, Verfügbarkeit, NDA-Status, gemeinsame Projekte
├── finance/
│   ├── income-log.md                                # Monatlich: Kunde, Rechnungsnummer, berechneter Betrag, eingezogener Betrag, ausstehend, Methode
│   ├── expense-log.md                               # Datum, Anbieter, Kategorie (Software / Reise / Ausstattung), Betrag — für Steuerabzugsverfolgung
│   └── quarterly-tax-estimate.md                    # Q1–Q4 geschätzte Steuerberechnung: Bruttoeinkommen, abzugsfähige Ausgaben, Selbstständigensteuer, Zahlungsdaten, gezahlte Beträge
└── marketing/
    ├── case-studies/
    │   ├── acme-corp-brand-identity.md              # Problem, Ansatz, Ergebnis, Kennzahlen, Kundenzitat — Quelle für Website und Angebote
    │   ├── betaworks-site-redesign.md
    │   └── _case-study-template.md                  # Wiederverwendbares Format: Kontext, Herausforderung, Lösung, Ergebnis, Testimonial
    ├── portfolio/
    │   ├── portfolio-index.md                        # Kuratierte Projektliste: Kunde (bei NDA anonymisiert), Lieferobjekttyp, Figma/Framer-Link, Datum
    │   └── selected-works/
    │       ├── brand-acme-2026.pdf                  # Exportiertes Lieferobjekt für Portfolio-PDF
    │       └── site-betaworks-2026.pdf
    └── testimonials/
        ├── testimonials-log.md                      # Kundenname, Zitat, Datum, Veröffentlichungserlaubnis, veröffentlicht auf (Website / LinkedIn / Angebot)
        └── raw-feedback/
            ├── acme-corp-feedback-2026-06.md        # Rohe Feedback-E-Mail oder Formularantwort — Quellmaterial für Testimonials
            └── gamma-dao-feedback-2026-03.md
```

## Wichtige Dateien erklärt

| Pfad | Zweck |
|---|---|
| `.claude/commands/new-client-onboard.md` | Slash-Befehl, der eine vollständige Onboarding-Checkliste erstellt, die Willkommens-E-Mail entwirft und eine Kickoff-Call-Agenda aus dem unterzeichneten Kundenbriefing aufbaut — sofort nach Ausführung des HoneyBook-Vertrags ausführen |
| `.claude/commands/invoice-chase.md` | Slash-Befehl, der eine abgestufte Mahnungssequenz erzeugt (freundliche Erinnerung an Tag 3, bestimmte Anfrage an Tag 7, letzte Mahnung mit Verzugsgebühr an Tag 14) — nimmt Rechnungsnummer, Betrag und Verzugstage entgegen |
| `.claude/commands/project-closeout.md` | Slash-Befehl, der die Offboarding-Checkliste erstellt, die Abschlussrechnung entwirft und eine Testimonial-Anfrage-E-Mail verfasst — ausführen, wenn das letzte Lieferobjekt genehmigt wurde |
| `clients/_template/` | Leere Ordnerstruktur, die für jedes neue Engagement kopiert wird — erzwingt konsistente Dokumentation über alle Kundenarbeiten hinweg; kopieren mit `cp -r clients/_template clients/<neuer-kundenname>` |
| `templates/sow-template.md` | Master-SOW-Format mit Revisionsrichtlinie, Auflösungsgebührenklausel und expliziter Liste der Ausschlüsse — die maßgebliche Quelle für alle Projektumfangsgespräche |
| `pipeline/prospects.md` | CRM-Ersatz für frühphasige Leads: Unternehmen, Kontakt, ICP-Passungswert (1–5), geschätzter Deal-Wert, letztes Kontaktdatum, nächste Aktion — jeden Montag überprüfen |
| `ops/rate-card.md` | Aktuelle Preise mit Datum der letzten Überprüfung — bestimmt, welche Zahlen in allen von Claude entworfenen Angeboten erscheinen; muss vor dem Ausführen von `/proposal-draft` aktualisiert werden |
| `finance/quarterly-tax-estimate.md` | Steuerberechnung für Selbstständige, am Ende jedes Quartals aktualisiert: Bruttoeinkommen, abzugsfähige SaaS- und Geräteausgaben, geschätzte Bundes- und Staatszahlung fällig, Bestätigung der geleisteten Zahlung |

## Schnellgerüst

```bash
# Workspace-Root erstellen
mkdir -p freelance-studio

# .claude-Struktur
mkdir -p freelance-studio/.claude/commands

# Kundenvorlage
mkdir -p freelance-studio/clients/_template/deliverables
mkdir -p freelance-studio/clients/_template/invoices
touch freelance-studio/clients/_template/deliverables/.gitkeep
touch freelance-studio/clients/_template/invoices/.gitkeep
touch freelance-studio/clients/_template/brief.md
touch freelance-studio/clients/_template/contract.md
touch freelance-studio/clients/_template/sow.md
touch freelance-studio/clients/_template/communication-log.md

# Pipeline
mkdir -p freelance-studio/pipeline
touch freelance-studio/pipeline/prospects.md
touch freelance-studio/pipeline/proposals-sent.md
touch freelance-studio/pipeline/follow-up-schedule.md

# Templates
mkdir -p freelance-studio/templates
touch freelance-studio/templates/proposal-template.md
touch freelance-studio/templates/sow-template.md
touch freelance-studio/templates/contract-template.md
touch freelance-studio/templates/invoice-template.md
touch freelance-studio/templates/nda-template.md
touch freelance-studio/templates/status-update-template.md
touch freelance-studio/templates/project-brief-template.md
touch freelance-studio/templates/feedback-request-template.md

# Ops
mkdir -p freelance-studio/ops
touch freelance-studio/ops/rate-card.md
touch freelance-studio/ops/service-packages.md
touch freelance-studio/ops/onboarding-checklist.md
touch freelance-studio/ops/offboarding-checklist.md
touch freelance-studio/ops/tools-and-access.md
touch freelance-studio/ops/subcontractors.md

# Finance
mkdir -p freelance-studio/finance
touch freelance-studio/finance/income-log.md
touch freelance-studio/finance/expense-log.md
touch freelance-studio/finance/quarterly-tax-estimate.md

# Marketing
mkdir -p freelance-studio/marketing/case-studies
mkdir -p freelance-studio/marketing/portfolio/selected-works
mkdir -p freelance-studio/marketing/testimonials/raw-feedback
touch freelance-studio/marketing/case-studies/_case-study-template.md
touch freelance-studio/marketing/portfolio/portfolio-index.md
touch freelance-studio/marketing/testimonials/testimonials-log.md

# Skills installieren
npx claudient add skill small-business/freelancer-proposal
npx claudient add skill small-business/scope-of-work
npx claudient add skill small-business/invoice-chaser
npx claudient add skill small-business/client-status-report
npx claudient add skill small-business/cold-outreach
npx claudient add skill productivity/stakeholder-comms
npx claudient add skill productivity/process-mapper
npx claudient add skill productivity/vendor-evaluator

# Befehlsstubs in .claude/commands/ einrichten
npx claudient add skill small-business/freelancer-proposal --output freelance-studio/.claude/commands/proposal-draft.md
npx claudient add skill small-business/scope-of-work --output freelance-studio/.claude/commands/scope-of-work.md
npx claudient add skill small-business/invoice-chaser --output freelance-studio/.claude/commands/invoice-chase.md
npx claudient add skill small-business/client-status-report --output freelance-studio/.claude/commands/client-status-update.md
npx claudient add skill small-business/client-onboarding --output freelance-studio/.claude/commands/new-client-onboard.md
```

## CLAUDE.md-Vorlage

```markdown
# Freelance Studio — Claude Code-Anweisungen

## Was das hier ist

Arbeitsverzeichnis fur ein Solo-Freelance-Studio, das Design- und Strategieaufträge für Kunden,
die Geschäftsentwicklungs-Pipeline, Rechnungsstellung und den Betrieb verwaltet. Kundenarbeit liegt
in clients/ (ein Ordner pro Engagement), offene Interessenten und Angebote in pipeline/, wiederverwendbare
Dokumente in templates/, Finanzdaten in finance/ sowie Portfolio- und Fallstudien-Assets in marketing/.
Alle Entwürfe, SOW-Generierungen, Rechnungsmahnungen, Statusberichte und Outreach-Aktionen laufen über
Slash-Befehle in .claude/commands/.

## Stack

- Notion — Projektverfolgung pro Kunde; Notion-Seiten-URL in clients/<name>/brief.md einfügen
- HoneyBook — Verträge und Rechnungsstellung; HoneyBook-Vertrags-IDs in clients/<name>/contract.md protokollieren
- FreshBooks — Ausgabenverfolgung und Steuerausgleich; Querverweise mit finance/income-log.md
- Cal.com — Terminplanung; Buchungslink in templates/proposal-template.md und Willkommens-E-Mails einbetten
- Loom — Asynchrone Lieferdurchführungen; Loom-URLs in client-status-update und SOW-Übergaben einfügen
- Figma — Design-Lieferobjekte; Nur-Ansicht-Links in clients/<name>/deliverables/-Dateien teilen
- Framer — Prototypen und No-Code-Website-Lieferobjekte; Staging-URLs in clients/<name>/deliverables/ protokollieren
- Stripe — Zahlungsabwicklung; Stripe-Buchungs-IDs in clients/<name>/invoices/-Datensätzen protokollieren
- Gmail — Primäre Kundenkommunikation; Entscheidungen und Vereinbarungen in clients/<name>/communication-log.md protokollieren
- Slack — Aktive Projektkanäle; jeder unterzeichnete Kunde erhält einen dedizierten Kanal

## Neues Kunden-Onboarding-Ablauf

Sofort nach Ausführung des HoneyBook-Vertrags und Eingang der Anzahlung ausführen:

```
/new-client-onboard

Client: [Unternehmensname]
Contact: [Name, Titel, E-Mail]
Project: [Projektname aus SOW]
Start date: [Datum]
Slack channel: [#kundenname-projekt]
Tools to grant access: [Notion, Figma, Framer Staging — zutreffendes auflisten]
Cal.com link: [Ihre Buchungs-URL]
First deliverable: [Name und Fälligkeitsdatum]
```

Dies erzeugt: Willkommens-E-Mail, Kickoff-Call-Agenda, Zugriffsanfrage-Checkliste und die
ops/onboarding-checklist.md-Punkte, die vor dem ersten Tag abgehakt werden müssen.

## Projektlieferungs-Workflow

1. clients/<name>/ durch Kopieren von clients/_template/ vor dem Kickoff-Call anlegen
2. brief.md mit den Discovery-Call-Notizen ausfüllen; Notion-Projekt-URL oben einfügen
3. /scope-of-work ausführen, um sow.md zu generieren — vor dem Versand an den Kunden prüfen
4. Lieferobjekte in clients/<name>/deliverables/ mit datumspräfixierten Dateinamen ablegen (JJJJ-MM-TT-name.ext)
5. Nach jedem Meilenstein /client-status-update ausführen und Loom-URL in communication-log.md protokollieren
6. Nach jeder Meilensteinlieferung /feedback-request ausführen — Antworten in communication-log.md protokollieren

## Rechnungs- und Zahlungsprozess

- Alle Rechnungsdatensätze in clients/<name>/invoices/ als inv-NNN-beschreibung-JJJJ-MM-TT.md ablegen
- Jeder Datensatz muss enthalten: HoneyBook- oder FreshBooks-Rechnungsnummer, Betrag, Versanddatum, Fälligkeitsdatum,
  Stripe-Buchungs-ID (nach Zahlung) und Zahlungsdatum (oder "ausstehend")
- /invoice-chase ausführen, wenn die Zahlung nicht innerhalb von 3 Tagen nach Fälligkeitsdatum eingeht
- Alle eingezogenen Einnahmen am selben Tag der Stripe-Buchung in finance/income-log.md protokollieren
- finance/quarterly-tax-estimate.md am Ende jedes Quartals aktualisieren

## Zeiterfassung und Abrechnung

- Preisliste in ops/rate-card.md — vierteljährlich überprüfen und Datum der letzten Überprüfung aktualisieren
- Stundenabrechnung: Zeit in clients/<name>/communication-log.md als laufende Tabelle protokollieren (Datum, Aufgabe, Stunden)
- Projektabrechnung: gegen Meilensteine aus clients/<name>/sow.md abrechnen — niemals vor der Lieferung abrechnen
- Retainer-Kunden: Retainer-Rechnung am 1. jeden Monats über HoneyBook ausstellen
- Auflösungsgebühr: 25% des verbleibenden Projektwerts bei Kündigung durch den Kunden nach dem Kickoff — im contract-template.md festgehalten

## Häufige Aufgaben und genaue Befehle

### Angebot aus einem Kundenbriefing erstellen
```
/proposal-draft

Client: [Unternehmensname]
Contact: [Name, Titel]
Brief: [Discovery-Notizen oder vollständiges Briefing einfügen]
Budget: [$X–$Y oder "TBD"]
Timeline: [Zielstartdatum und Dauer]
Deliverables requested: [auflisten, was gewünscht wurde]
My angle: [warum ich die richtige Wahl bin — konkret sein]
Pricing preference: [Festpreis / Retainer / Hybrid]
```

### SOW aus einem unterzeichneten Angebot generieren
```
/scope-of-work

Client: [Unternehmensname]
Project: [Projektname]
Agreed deliverables: [genaue Liste — aus genehmigtem Angebot kopieren]
Timeline: [Start, Meilensteindaten, Enddatum]
Payment schedule: [50% Anzahlung / 25% Meilenstein 1 / 25% Abschluss]
Revision rounds: [wie viele Runden pro Lieferobjekt]
Exclusions: [explizite Ausschlusspunkte]
```

### Rechnungsmahnung schreiben
```
/invoice-chase

Client: [Unternehmensname]
Invoice number: [INV-XXX]
Amount: [$X]
Due date: [JJJJ-MM-TT]
Days overdue: [N]
Prior contact: [keine / ja — Datum der letzten Kontaktaufnahme]
Tone: [freundlich / bestimmt / letzte Mahnung]
```

### Kunden-Statusupdate senden
```
/client-status-update

Client: [Unternehmensname]
Period: [Woche von JJJJ-MM-TT / Meilenstein: X]
Completed: [Aufzählung der gelieferten Ergebnisse]
In progress: [was in Bearbeitung ist]
Blockers: [was ich vom Kunden benötige]
Next period plan: [was als Nächstes passiert]
Format: [E-Mail / Loom-Skript / Notion-Update]
```

### Projekt abschließen
```
/project-closeout

Client: [Unternehmensname]
Final deliverable: [Name und Lieferdatum]
Outstanding invoices: [Rechnungsnummern und Beträge]
Portfolio rights: [im Vertrag bestätigt? ja/nein]
Testimonial: [hat der Kunde zugestimmt, eines zu liefern? ja/nein/fragen]
```

## Konventionen

- Jeder neue Kunde erhält vor dem Kickoff-Call einen Ordner unter clients/ — immer _template/ kopieren
- Lieferobjekt-Dateinamen: JJJJ-MM-TT-beschreibung-vN.ext (z. B. 2026-06-01-wireframes-v2.fig)
- proposals-sent.md in pipeline/ wird am selben Tag aktualisiert, an dem ein Angebot per E-Mail verschickt wird
- Gewonnene Angebote verschieben: clients/<name>/ anlegen und die Angebotsdatei dort archivieren
- finance/income-log.md wird am letzten Arbeitstag jedes Monats aktualisiert — ausnahmslos
- finance/expense-log.md wird wöchentlich aktualisiert — alles über 15 € für Steuerzwecke protokollieren
- ops/rate-card.md zeigt immer ein Datum der letzten Überprüfung — vor der Verwendung von /proposal-draft aktualisieren
- marketing/testimonials/testimonials-log.md wird innerhalb einer Woche nach Erhalt von Feedback aktualisiert
```

## MCP-Server

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropic-ai/mcp-server-filesystem",
        "/Users/your-username/freelance-studio"
      ]
    },
    "gmail": {
      "command": "npx",
      "args": ["-y", "@googleapis/mcp-server-gmail"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-google-oauth-client-id",
        "GOOGLE_CLIENT_SECRET": "your-google-oauth-client-secret",
        "GOOGLE_REFRESH_TOKEN": "your-google-refresh-token"
      }
    },
    "google-drive": {
      "command": "npx",
      "args": ["-y", "@googleapis/mcp-server-google-drive"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-google-oauth-client-id",
        "GOOGLE_CLIENT_SECRET": "your-google-oauth-client-secret",
        "GOOGLE_REFRESH_TOKEN": "your-google-refresh-token"
      }
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@slack/mcp-server"],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-your-slack-bot-token",
        "SLACK_TEAM_ID": "T0XXXXXXXXX"
      }
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/mcp-server-notion"],
      "env": {
        "NOTION_API_KEY": "secret_your-notion-integration-token"
      }
    },
    "stripe": {
      "command": "npx",
      "args": ["-y", "@stripe/mcp-server-stripe"],
      "env": {
        "STRIPE_SECRET_KEY": "sk_live_your-stripe-secret-key",
        "STRIPE_WEBHOOK_SECRET": "whsec_your-webhook-secret"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -qE \"clients/.+/deliverables/\"; then echo \"[hook] Deliverable saved — update clients/<name>/communication-log.md with the delivery date and share the Loom walkthrough link\"; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"pipeline/proposals-sent.md\"; then echo \"[hook] Proposal tracker updated — set a Cal.com follow-up reminder 5 business days out and log next action in follow-up-schedule.md\"; fi'"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -qE \"clients/.+/sow.md\"; then echo \"[hook] Writing SOW — confirm clients/<name>/brief.md and contract.md exist and ops/rate-card.md has a current last-reviewed date before finalising scope\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'TODAY=$(date +%A); if [ \"$TODAY\" = \"Friday\" ]; then echo \"[reminder] Friday — run /weekly-wrap, check finance/income-log.md for outstanding invoices, and review pipeline/follow-up-schedule.md for Monday outreach\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Zu installierende Skills

```bash
# Kern-Studio-Skills
npx claudient add skill small-business/freelancer-proposal
npx claudient add skill small-business/scope-of-work
npx claudient add skill small-business/invoice-chaser
npx claudient add skill small-business/client-status-report
npx claudient add skill small-business/cold-outreach

# Produktivitäts- und Kommunikations-Skills
npx claudient add skill productivity/stakeholder-comms
npx claudient add skill productivity/process-mapper
npx claudient add skill productivity/vendor-evaluator
npx claudient add skill productivity/exec-briefing

# Alle Small-Business-Skills auf einmal installieren
npx claudient add skills small-business
```

## Verwandte Ressourcen

- [Freelancer-Leitfaden](../guides/for-freelancer.md)
- [Kunden-Onboarding-Workflow](../workflows/client-onboarding.md)
- [Angebot-bis-Vertrag-Workflow](../workflows/proposal-to-contract.md)
- [Rechnungs- und Abrechnungs-Workflow](../workflows/invoice-and-billing.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
