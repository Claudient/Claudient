# E-Mail-Marketing-Arbeitsbereich — Projektstruktur

> Für E-Mail-Marketer, die Lifecycle-Programme, Kampagnen und Zustellbarkeit verwalten — mit Fokus auf Sequenzgestaltung, A/B-Tests, Listenpflege und Performance-Reporting in Klaviyo, Mailchimp oder ActiveCampaign.

## Stack

- **Klaviyo** oder **Mailchimp** oder **ActiveCampaign** — ESP der Wahl: Kampagnenversand, Flow-/Automatisierungsbuilder, Listensegmentierung, Engagement-Tracking
- **Litmus** — E-Mail-Rendering in über 100 Clients, Spam-Filter-Tests, Zustellbarkeits-Scoring, Preflight-Checkliste
- **Google Analytics 4** — UTM-Attribution, Conversion-Tracking, Umsatz pro E-Mail, Verhalten nach dem Klick
- **Figma** — Design-Übergaben, kommentierte Template-Spezifikationen, markengerechte Asset-Exporte für entwicklungsfertige HTML-Vorlagen
- **Slack** — Kampagnen-Review-Threads, Launch-Freigaben, Zustellbarkeits-Incident-Channels
- **Notion** — Kampagnenkalender, Content-Briefings, Stakeholder-Freigaben, Retrospektiven
- **Claude Code** — Sequenzentwurf, A/B-Hypothesengenerierung, Copy-Varianten, Performance-Narrative, Listenbereinigungsskripte

## Verzeichnisstruktur

```
email-marketer-workspace/
├── .claude/
│   ├── CLAUDE.md                                  # Arbeitsbereich-Anweisungen (Vorlage unten einfügen)
│   ├── settings.json                              # MCP-Server, Hooks, Berechtigungen
│   └── commands/
│       ├── email-draft.md                         # /email-draft — nimmt Segment + Ziel, liefert Betreff + Text + CTA-Copy
│       ├── ab-test-setup.md                       # /ab-test-setup — Hypothese, Variantenspezifikationen, Stichprobengröße, Erfolgsmetrik
│       ├── sequence-builder.md                    # /sequence-builder — vollständiger Multi-E-Mail-Flow mit Timing und Verzweigungslogik
│       ├── deliverability-check.md                # /deliverability-check — Pre-Send-Checkliste: SPF/DKIM, Listengesundheit, Content-Flags
│       ├── performance-report.md                  # /performance-report — narrativer Überblick über Kampagnen- oder Monatsmetriken
│       ├── re-engagement.md                       # /re-engagement — Win-Back-Sequenz für inaktive Abonnenten
│       └── list-clean.md                          # /list-clean — Unterdrückungskriterien, Segmentregeln, Sunset-Richtlinie
├── campaigns/
│   ├── _template/                                 # Kopiervorlage für jeden einmaligen Versand
│   │   ├── brief.md                               # Kampagnen-Briefing: Ziel, Zielgruppe, Angebot, Zeitplan, Erfolgsmetrik
│   │   ├── copy.md                                # Finaler freigegebener Betreff, Preheader, Text, CTA
│   │   └── results.md                             # Ergebnisse nach dem Versand: Öffnungen, Klicks, Conversions, Umsatz
│   ├── 2026-06-product-launch/
│   │   ├── brief.md                               # Kampagnen-Briefing für den Produkt-Launch im Juni
│   │   ├── copy.md                                # Finale Copy — Betreff: "Introducing [Feature]"
│   │   ├── copy-variants.md                       # Getestete A/B-Betreffzeilen-Varianten vor dem Versand
│   │   ├── litmus-report.md                       # Litmus-Preflight — Rendering-Ergebnisse, Spam-Score
│   │   └── results.md                             # 34,2 % Öffnungsrate, 4,1 % CTR, 12.400 $ zugeordneter Umsatz
│   ├── 2026-05-flash-sale/
│   │   ├── brief.md
│   │   ├── copy.md
│   │   ├── litmus-report.md
│   │   └── results.md
│   └── 2026-04-spring-promo/
│       ├── brief.md
│       ├── copy.md
│       └── results.md
├── sequences/
│   ├── welcome/
│   │   ├── sequence-map.md                        # Flow-Diagramm: Trigger, Timing, Verzweigungslogik, Abbruchbedingungen
│   │   ├── email-1-welcome.md                     # Tag 0: Willkommen + Wertversprechen, sofortiger Versand bei Anmeldung
│   │   ├── email-2-quick-win.md                   # Tag 2: Erster Handlungsimpuls, hebt ein wichtiges Feature hervor
│   │   ├── email-3-social-proof.md                # Tag 5: Testimonials, Fallstudie, Vertrauenssignale
│   │   └── results-log.md                         # Laufende Performance je E-Mail: Öffnungs-/Klick-/Abmelderaten
│   ├── onboarding/
│   │   ├── sequence-map.md                        # Trigger: Konto erstellt; Abbruch bei erster Schlüsselaktion
│   │   ├── email-1-setup-guide.md                 # Tag 1: Schritt-für-Schritt-Einrichtung, direkter CTA zur Profilfertigstellung
│   │   ├── email-2-activation-nudge.md            # Tag 3: Versand nur wenn Einrichtung nicht abgeschlossen — Dringlichkeitsansatz
│   │   ├── email-3-feature-spotlight.md           # Tag 7: Hervorhebung des wichtigsten Features für neue Nutzer
│   │   ├── email-4-milestone.md                   # Tag 14: Erste Aktion feiern, nächsten Meilenstein vorstellen
│   │   └── results-log.md
│   ├── nurture/
│   │   ├── sequence-map.md                        # Zweiwöchentlicher Rhythmus für engagierte Nicht-Konvertierer
│   │   ├── email-1-education.md                   # Brancheneinblick, kein Produkt-Push
│   │   ├── email-2-use-case.md                    # Kundenstory passend zum Segment-Schmerzpunkt
│   │   ├── email-3-objection-handler.md           # Behandelt die drei häufigsten Conversion-Einwände
│   │   ├── email-4-soft-cta.md                    # Reibungsarmes Angebot: kostenlose Testzeitverlängerung, Webinar-Einladung
│   │   └── results-log.md
│   ├── win-back/
│   │   ├── sequence-map.md                        # Trigger: keine Öffnung/kein Klick in 90 Tagen
│   │   ├── email-1-we-miss-you.md                 # Tonalität: warmherzig, kein Druck, noch kein Rabatt
│   │   ├── email-2-whats-new.md                   # Produkt-Updates oder verpasste Inhalte
│   │   ├── email-3-incentive.md                   # Rabatt oder exklusives Angebot zur Reaktivierung
│   │   └── results-log.md
│   └── sunset/
│       ├── sequence-map.md                        # Trigger: kein Engagement nach Win-Back-Sequenz
│       ├── email-1-last-chance.md                 # Letzte Aufforderung zum Verbleib/Abmelden — explizite Opt-in-Bestätigung
│       └── suppression-criteria.md                # Regeln für die Verschiebung in die Unterdrückungsliste bei keiner Reaktion
├── a-b-tests/
│   ├── _template/
│   │   ├── hypothesis.md                          # Ein-Satz-Hypothese, getestete Variable, Kontrolle vs. Variante
│   │   └── results.md                             # Gewinnende Variante, Steigerung, Konfidenzintervall, Entscheidung
│   ├── 2026-q2-subject-line-length/
│   │   ├── hypothesis.md                          # H: Kürzere Betreffzeilen (<40 Zeichen) übertreffen längere auf Mobilgeräten
│   │   └── results.md                             # Variante B gewonnen, +6,3 % Öffnungsrate, 97 % Konfidenz — in Welcome-Flow übernehmen
│   ├── 2026-q2-cta-copy/
│   │   ├── hypothesis.md                          # H: Handlungsorientierter CTA ("Start free") schlägt passiven ("Learn more")
│   │   └── results.md                             # Kein statistisch signifikanter Unterschied — mit größerer Stichprobe wiederholen
│   └── 2026-q1-send-time/
│       ├── hypothesis.md
│       └── results.md
├── templates/
│   ├── headers/
│   │   ├── header-promo.html                      # Header für Werbekampagnen — Logo + Angebots-Banner
│   │   ├── header-transactional.html              # Cleaner Header für Quittungen, Bestätigungen, Benachrichtigungen
│   │   └── header-newsletter.html                 # Newsletter-Header — Logo + Datum + Ausgabennummer
│   ├── ctas/
│   │   ├── cta-primary.html                       # Primärer Button — Markenfarbe, maximaler Kontrast, 44px Touch-Target
│   │   ├── cta-secondary.html                     # Ghost-/Outline-Button für sekundäre Aktionen
│   │   └── cta-text-link.html                     # Reiner Text-Link-CTA als Fallback für Plain-Text-Versionen
│   ├── footers/
│   │   ├── footer-full.html                       # Vollständiger Footer: Abmelden, Adresse, Social Links, rechtliche Hinweise
│   │   ├── footer-minimal.html                    # Minimaler Footer für transaktionale/System-E-Mails
│   │   └── footer-gdpr.html                       # DSGVO-konformer Footer mit Link zum Präferenzcenter
│   └── layouts/
│       ├── single-column.html                     # Standardlayout mit einer Spalte, Mobile-first
│       ├── two-column.html                         # Zweispaltiges Raster — Bild links, Text rechts
│       └── plain-text.md                          # Plain-Text-Vorlage mit variablen Platzhaltern
├── compliance/
│   ├── unsubscribe-sop.md                         # SOP zur Abmeldeverarbeitung: 10-Tage-Regel, Unterdrückungsabgleich, Audit-Log
│   ├── gdpr-checklist.md                          # DSGVO-Compliance-Checkliste: Einwilligung, Datensparsamkeit, Recht auf Löschung
│   ├── can-spam-checklist.md                      # CAN-SPAM-Anforderungen: Absenderkennung, Betreffehrlichkeit, Opt-out-Mechanismus
│   ├── casl-checklist.md                          # CASL-Anforderungen für kanadische Abonnenten
│   └── consent-records/
│       └── consent-log-template.md                # Vorlage zur Dokumentation der Einwilligungserfassung je Listenquelle
├── reports/
│   ├── monthly/
│   │   ├── 2026-05-performance.md                 # Mai: 28,1 % durchschnittliche Öffnungsrate, 3,4 % CTR, 48.000 $ zugeordneter Umsatz
│   │   ├── 2026-04-performance.md
│   │   └── _template.md                           # Monatliches Dashboard-Template: KPIs, Listengesundheit, Top-Kampagnen
│   ├── quarterly/
│   │   ├── 2026-q1-review.md                      # Q1-Zusammenfassung: Listenwachstum, Zustellbarkeitstrends, Top-Sequenzen
│   │   └── _template.md                           # Quartalsbericht-Template mit Benchmarks und Jahresvergleichen
│   └── deliverability/
│       ├── bounce-log.md                          # Monatliche Hard-/Soft-Bounce-Raten, Maßnahmen bei Spitzen
│       ├── spam-complaint-log.md                  # Beschwerdequote je Kampagne — Kennzeichnung bei über 0,08 %
│       └── domain-reputation-log.md               # Monatlicher Sender-Score, Google Postmaster Domain-/IP-Reputation
└── scratch/
    ├── copy-drafts.md                             # Copy in Bearbeitung, bevor sie in campaigns/ oder sequences/ verschoben wird
    └── ideas.md                                   # Ungeprüfte Kampagnenideen, Testhypothesen, Zielgruppenbeobachtungen
```

## Wichtige Dateien erklärt

| Pfad | Zweck |
|---|---|
| `.claude/commands/email-draft.md` | Slash-Befehl, der eine Segmentbeschreibung und ein Kampagnenziel entgegennimmt und eine vollständige E-Mail mit Betreffzeile, Preheader, Text-Copy und CTA zurückgibt — bereit für den Litmus-Preflight |
| `.claude/commands/ab-test-setup.md` | Slash-Befehl, der einen strukturierten A/B-Test generiert: Ein-Satz-Hypothese, Kontroll- vs. Variantenspezifikation, Mindest-Stichprobengrößenberechnung und primäre Erfolgsmetrik |
| `.claude/commands/sequence-builder.md` | Slash-Befehl, der einen vollständigen Multi-E-Mail-Lifecycle-Flow mit E-Mail-Zielen, Timing-Logik, Verzweigungsbedingungen und Abbruchkriterien erstellt |
| `.claude/commands/deliverability-check.md` | Slash-Befehl, der eine Pre-Send-Zustellbarkeitscheckliste ausführt: SPF/DKIM-Status, Listenengagement-Gesundheit, Spam-Trigger im Content, Anwesenheit des Abmelde-Links |
| `.claude/commands/performance-report.md` | Slash-Befehl, der Rohdaten entgegennimmt und eine narrative Performance-Zusammenfassung mit Trendhinweisen und Handlungsempfehlungen zurückgibt |
| `sequences/welcome/sequence-map.md` | Maßgebliche Quelle für den Welcome-Flow — Triggerbedingungen, Timing, Verzweigungslogik und Abbruchbedingungen; wird aktualisiert, wann immer der Flow im ESP geändert wird |
| `compliance/unsubscribe-sop.md` | Schritt-für-Schritt-SOP zur Abmeldeverarbeitung: 10-Werktage-Anforderung, Unterdrückungslisten-Abgleich über alle ESPs, monatliches Audit-Log |
| `reports/deliverability/spam-complaint-log.md` | Monatliches Protokoll der Beschwerdequoten je Kampagne — jede Quote über 0,08 % löst eine Überprüfung aus; fließt in das Domain-Reputations-Monitoring ein |

## Schnell-Scaffold

```bash
# Arbeitsbereich-Root erstellen
mkdir -p email-marketer-workspace

# .claude-Struktur erstellen
mkdir -p email-marketer-workspace/.claude/commands

# Kampagnen-Verzeichnisse erstellen
mkdir -p email-marketer-workspace/campaigns/_template
mkdir -p email-marketer-workspace/campaigns/2026-06-product-launch
mkdir -p email-marketer-workspace/campaigns/2026-05-flash-sale

# Sequenz-Verzeichnisse erstellen
mkdir -p email-marketer-workspace/sequences/welcome
mkdir -p email-marketer-workspace/sequences/onboarding
mkdir -p email-marketer-workspace/sequences/nurture
mkdir -p email-marketer-workspace/sequences/win-back
mkdir -p email-marketer-workspace/sequences/sunset

# A/B-Test-Verzeichnisse erstellen
mkdir -p email-marketer-workspace/a-b-tests/_template
mkdir -p email-marketer-workspace/a-b-tests/2026-q2-subject-line-length
mkdir -p email-marketer-workspace/a-b-tests/2026-q2-cta-copy

# Template-Modul-Verzeichnisse erstellen
mkdir -p email-marketer-workspace/templates/headers
mkdir -p email-marketer-workspace/templates/ctas
mkdir -p email-marketer-workspace/templates/footers
mkdir -p email-marketer-workspace/templates/layouts

# Compliance-Verzeichnis erstellen
mkdir -p email-marketer-workspace/compliance/consent-records

# Report-Verzeichnisse erstellen
mkdir -p email-marketer-workspace/reports/monthly
mkdir -p email-marketer-workspace/reports/quarterly
mkdir -p email-marketer-workspace/reports/deliverability

# Scratch-Verzeichnis erstellen
mkdir -p email-marketer-workspace/scratch

# Platzhalter-Dateien anlegen
touch email-marketer-workspace/campaigns/_template/brief.md
touch email-marketer-workspace/campaigns/_template/copy.md
touch email-marketer-workspace/campaigns/_template/results.md
touch email-marketer-workspace/a-b-tests/_template/hypothesis.md
touch email-marketer-workspace/a-b-tests/_template/results.md
touch email-marketer-workspace/reports/monthly/_template.md
touch email-marketer-workspace/reports/quarterly/_template.md

# E-Mail-Marketing-Skills installieren
npx claudient add skill marketing/email-sequence
npx claudient add skill marketing/email-deliverability
npx claudient add skill marketing/email-ab-tester
npx claudient add skill small-business/email-campaign

# Befehlsstubs in .claude/commands/ kopieren
npx claudient add skill marketing/email-sequence --output email-marketer-workspace/.claude/commands/email-draft.md
npx claudient add skill marketing/email-ab-tester --output email-marketer-workspace/.claude/commands/ab-test-setup.md
npx claudient add skill marketing/email-sequence --output email-marketer-workspace/.claude/commands/sequence-builder.md
npx claudient add skill marketing/email-deliverability --output email-marketer-workspace/.claude/commands/deliverability-check.md
npx claudient add skill small-business/email-campaign --output email-marketer-workspace/.claude/commands/performance-report.md
```

## CLAUDE.md-Vorlage

```markdown
# E-Mail-Marketing-Arbeitsbereich — Claude Code-Anweisungen

## Was das hier ist

Dies ist das Arbeitsverzeichnis eines E-Mail-Marketers, der Lifecycle-Programme, Kampagnen,
A/B-Tests, Listenpflege und Zustellbarkeit verwaltet. Kampagnen werden in campaigns/ dokumentiert,
Lifecycle-Sequenzen liegen in sequences/, Testprotokolle in a-b-tests/, wiederverwendbare HTML-Module
in templates/, Compliance-SOPs in compliance/ und monatliche Dashboards in reports/. Alle Copy-Entwürfe,
Sequenzerstellungen, A/B-Test-Strukturierungen und Performance-Narrative-Generierungen laufen über
Claude Code-Skills.

## Stack

- Klaviyo / Mailchimp / ActiveCampaign — ESP der Wahl; Flows und Kampagnenversand
- Litmus — Pre-Send-Rendering und Zustellbarkeits-Preflight
- Google Analytics 4 — UTM-Attribution und Post-Click-Conversion-Tracking
- Figma — Design-Übergaben und kommentierte Template-Spezifikationen
- Slack — Kampagnen-Freigaben und Zustellbarkeits-Incident-Channels
- Notion — Kampagnenkalender, Content-Briefings, Stakeholder-Freigaben

## Häufige Aufgaben und genaue Befehle

### Eine Kampagnen-E-Mail entwerfen
```
/email-draft

Segment: [Zielgruppe beschreiben — z. B. "Trial-Nutzer, die seit 7 Tagen nicht aktiviert haben"]
Goal: [Conversion-Ziel — z. B. "sie zur Fertigstellung des Profil-Setups bringen"]
Offer: [falls vorhanden — Rabatt, kostenlose Ressource, Feature-Freischaltung]
Tone: [Markentonalität — z. B. "warm, direkt, ohne Fülltext"]
Max length: [Wortzahl oder Scroll-Tiefe als Ziel]
```

### Einen A/B-Test einrichten
```
/ab-test-setup

What we are testing: [Betreffzeile / CTA-Copy / Versandzeit / Layout / Angebot]
Hypothesis: [Wenn wir X ändern, erwarten wir Y, weil Z]
Control: [aktuelle Version im Wortlaut]
Variant: [vorgeschlagene Änderung im Wortlaut]
List size available: [Anzahl der Kontakte im Segment]
Primary metric: [Öffnungsrate / CTR / Conversion-Rate / Umsatz pro E-Mail]
Confidence threshold: [95 % Standard oder abweichend angeben]
```

### Eine Lifecycle-Sequenz aufbauen
```
/sequence-builder

Sequence type: [welcome / onboarding / nurture / win-back / sunset]
Trigger: [welches Ereignis startet den Flow — z. B. "Anmeldung", "90 Tage kein Engagement"]
Audience: [Segment beschreiben]
Goal: [was Erfolg bedeutet — Aktivierung, Kauf, Reaktivierung]
Emails needed: [Anzahl]
Cadence: [Zeitabstand zwischen E-Mails — z. B. "Tag 0, Tag 3, Tag 7, Tag 14"]
Exit condition: [was jemanden vorzeitig aus dem Flow entfernt]
```

### Einen Pre-Send-Zustellbarkeitscheck durchführen
```
/deliverability-check

Campaign name: [was Sie gleich versenden]
Segment: [wer es empfängt — Listenname oder Segmentdefinition]
List age: [wann wurde diese Liste zuletzt bereinigt?]
Engagement window: [was ist das aktive Engagement-Fenster für dieses Segment?]
From domain: [versendende Domain — z. B. email.company.com]
Content concerns: [Elemente, die Spam-Filter auslösen könnten — z. B. bildlastig, Dringlichkeitswörter]
```

### Einen Performance-Bericht generieren
```
/performance-report

Period: [Monat, Quartal oder Kampagnenname]
Sends: [Anzahl gesendeter E-Mails]
Open rate: [X %] — Branchen-Benchmark: [Y %]
CTR: [X %] — Branchen-Benchmark: [Y %]
Unsubscribe rate: [X %]
Bounce rate: [X %]
Revenue attributed: [$X] via [GA4 / ESP-Attribution]
Top performer: [Kampagne oder Sequenz mit den besten Ergebnissen]
Concern: [Metrik oder Trend, der Aufmerksamkeit erfordert]
```

### Eine Re-Engagement-Sequenz schreiben
```
/re-engagement

Lapsed definition: [z. B. "keine Öffnung oder kein Klick in 90 Tagen"]
Segment size: [berechtigte Kontakte]
Last product update relevant to them: [Feature, Angebot oder Content, den sie verpasst haben]
Incentive available: [Rabatt / exklusiver Content / keiner]
Emails in sequence: [2 oder 3]
Sunset after: [wie viele E-Mails ohne Reaktion vor der Unterdrückung]
```

### Eine Listenbereinigung durchführen
```
/list-clean

Total list size: [Anzahl]
Last cleaned: [Datum]
Current bounce rate: [X %]
Engagement window for active definition: [z. B. "in den letzten 180 Tagen geöffnet"]
Segments to suppress: [Bounces, Beschwerden, Inaktive ab X Tagen]
Compliance requirement: [DSGVO / CAN-SPAM / CASL — angeben, was zutrifft]
```

## Einzuhaltende Konventionen

- Jede Kampagne benötigt ein abgeschlossenes und freigegebenes brief.md, bevor copy.md erstellt wird
- Finale freigegebene Copy in campaigns/<name>/copy.md speichern, bevor sie in den ESP hochgeladen wird
- Litmus-Preflight-Ergebnisse kommen in campaigns/<name>/litmus-report.md — kein Versand ohne bestandenen Report
- A/B-Test-Hypothesen werden in a-b-tests/<name>/hypothesis.md protokolliert, bevor der Test im ESP erstellt wird
- Ergebnisse werden innerhalb von 48 Stunden nach statistischer Signifikanz in a-b-tests/<name>/results.md dokumentiert
- Sequenzänderungen müssen in sequences/<name>/sequence-map.md erfasst sein, bevor der ESP-Flow bearbeitet wird
- Compliance-Checklisten in compliance/ werden vor jedem Listenimport oder Launch eines neuen Flows geprüft
- Abmeldeanfragen werden gemäß SOP in compliance/unsubscribe-sop.md verarbeitet — maximal 10 Werktage
- Monatliche Performance-Dashboards werden bis zum 5. des Folgemonats in reports/monthly/YYYY-MM-performance.md abgelegt
- Jede Spam-Beschwerdequote über 0,08 % wird mit Ursachenanalyse in reports/deliverability/spam-complaint-log.md protokolliert
```

## MCP-Server

```json
{
  "mcpServers": {
    "klaviyo": {
      "command": "npx",
      "args": ["-y", "@klaviyo/mcp-server"],
      "env": {
        "KLAVIYO_API_KEY": "pk_your-klaviyo-private-api-key"
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
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropic-ai/mcp-server-filesystem",
        "/Users/your-username/email-marketer-workspace"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"campaigns/.*/copy\\.md\"; then echo \"[hook] Campaign copy saved — run /deliverability-check before uploading to ESP, then complete campaigns/$(basename $(dirname $CLAUDE_TOOL_INPUT_FILE_PATH))/litmus-report.md\"; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"a-b-tests/.*/results\\.md\"; then echo \"[hook] A/B results logged — if a winner emerged, update the relevant sequence or campaign template to adopt the winning variant\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'DAY=$(date +%d); if [ \"$DAY\" = \"01\" ]; then echo \"[reminder] First of the month — file reports/monthly/$(date -v-1m +%Y-%m)-performance.md and update reports/deliverability/bounce-log.md and spam-complaint-log.md\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Zu installierende Skills

```bash
# Kern-E-Mail-Marketing-Skills
npx claudient add skill marketing/email-sequence
npx claudient add skill marketing/email-deliverability
npx claudient add skill marketing/email-ab-tester
npx claudient add skill small-business/email-campaign

# Alle Marketing-Skills auf einmal installieren
npx claudient add skills marketing
```

## Verwandte Inhalte

- [Leitfaden für E-Mail-Marketer](../guides/for-email-marketer.md)
- [Lifecycle-Sequenz-Workflow](../workflows/lifecycle-sequence-build.md)
- [Workflow bei Zustellbarkeits-Incidents](../workflows/deliverability-incident-response.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
