# Growth Marketer Workspace — Projektstruktur

> Für Growth Marketer, die den gesamten Kreislauf von Akquise bis Retention abbilden — Experimentdesign, Paid-Channel-Management, Funnel-CRO, Kohortenanalyse und wöchentliches Growth-Reporting — in einem einzigen Claude Code Workspace.

## Stack

- **Produktanalyse:** Mixpanel (Event-Tracking, Funnels, Kohorten, Retention) oder Amplitude (Verhaltensanalyse, Charts, Notebooks)
- **CDP:** Segment (Event-Erfassung, Identity Resolution, Audience-Synchronisation mit Werbeplattformen)
- **Paid Acquisition:** Google Ads (Search, Performance Max, Display) + Meta Ads (Facebook + Instagram, zielgruppenbasiert)
- **Experimentation:** Optimizely (Feature Flags, Web-Experimente, Stats Engine) oder GrowthBook (Open-Source-A/B, Feature Flags, Bayesianisch + frequentistisch)
- **Marketing-Automatisierung:** HubSpot (Lifecycle-Stufen, E-Mail-Workflows, Lead-Scoring, Kampagnen-Attribution)
- **Web-Analyse:** Google Analytics 4 (Traffic-Quellen, Conversion-Events, Funnel-Exploration)
- **Landing-Page-Design:** Figma (Wireframes, Hi-Fi-Mockups, Übergabespezifikationen für Entwickler oder No-Code)
- **Kommunikation:** Slack (Growth-Channel, Experiment-Benachrichtigungen, Weekly Digest)
- **Claude Code Skills:** marketing/experiment-tracker, marketing/growth-dashboard, marketing/paid-ads, marketing/page-cro, marketing/onboarding-cro, marketing/referral-program, marketing/pricing-strategy

## Verzeichnisstruktur

```
growth-marketer-workspace/
├── .claude/
│   ├── CLAUDE.md                                  # Workspace-Anweisungen für Claude Code
│   ├── settings.json                              # MCP-Server, Hooks, Berechtigungen
│   └── commands/
│       ├── experiment-design.md                   # /experiment-design — nimmt Hypothese entgegen, gibt vollständige Testspezifikation aus
│       ├── funnel-analysis.md                     # /funnel-analysis — zeigt Abbrüche je Stufe anhand von Mixpanel-Daten
│       ├── ad-copy-test.md                        # /ad-copy-test — erstellt Anzeigentext-Varianten für A/B-Tests
│       ├── cro-audit.md                           # /cro-audit — prüft Landing Page gegen CRO-Best-Practices
│       ├── cohort-analysis.md                     # /cohort-analysis — analysiert Retention nach Anmelde-Kohorte
│       ├── growth-report.md                       # /growth-report — wöchentlicher North-Star- und Channel-Zusammenfassungsbericht
│       └── channel-review.md                      # /channel-review — ROI- und Effizienzauswertung je Paid-Channel
├── experiments/
│   ├── _template/
│   │   ├── hypothesis.md                          # Hypothesenformat: Wenn [Aktion], dann [Ergebnis], weil [Begründung]
│   │   ├── test-design.md                         # Control-vs.-Variant-Spezifikation, Audience-Split, Erfolgsmetriken
│   │   └── results.md                             # Statistische Signifikanz, Lift in %, Konfidenzintervall, Entscheidung
│   ├── 2026-06-checkout-cta-copy/
│   │   ├── hypothesis.md                          # Hypothese: Direktionaler CTA steigert CVR im Checkout
│   │   ├── test-design.md                         # 50/50-Split, GrowthBook-Flag: checkout-cta-v2, n=4000
│   │   ├── results.md                             # +8,3 % Lift, 95 % KI, auf 100 % ausgerollt
│   │   └── segment-breakdown.md                   # Ergebnisse nach Gerät, Traffic-Quelle, Plan-Typ
│   ├── 2026-06-pricing-page-layout/
│   │   ├── hypothesis.md
│   │   ├── test-design.md                         # 3-Varianten-Test: aktuell, Annual-First, Feature-Tabelle
│   │   ├── results.md
│   │   └── heatmap-notes.md                       # Hotjar-/FullStory-Beobachtungen während des Tests
│   ├── 2026-05-onboarding-email-sequence/
│   │   ├── hypothesis.md
│   │   ├── test-design.md
│   │   ├── results.md
│   │   └── cohort-comparison.md                   # Tag-7- und Tag-30-Retention für Test- vs. Kontrollkohorte
│   └── backlog.md                                 # Priorisierte Experiment-Warteschlange (ICE-bewertet)
├── funnels/
│   ├── acquisition-funnel.md                      # Besucher → Trial → Aktivierung → Bezahlt — Stufendefinitionen
│   ├── activation-funnel.md                       # Anmeldung → Aha-Moment — Event-Sequenz und Benchmarks
│   ├── conversion-benchmarks.md                   # Aktuelle CVRs je Stufe im Vergleich zu Branchen-Benchmarks
│   ├── drop-off-analysis/
│   │   ├── 2026-06-checkout-drop-off.md           # Ausstiegspunktanalyse: wo Nutzer den Checkout verlassen
│   │   ├── 2026-05-onboarding-drop-off.md         # Schrittweiser Onboarding-Abschluss-Funnel
│   │   └── 2026-04-trial-to-paid-drop-off.md      # Analyse von Upgrade-Hindernissen — Preis, Zeitpunkt, Features
│   └── funnel-maps/
│       ├── top-of-funnel.md                       # Paid + Organic → Landing Page → Trial-Anmeldung
│       ├── mid-funnel.md                          # Trial → Aktivierungsereignisse → Upgrade-Intent-Signale
│       └── bottom-of-funnel.md                   # Upgrade-Auslöser, Preisseite, Checkout-Flow
├── paid/
│   ├── _briefs/
│   │   ├── brief-template.md                      # Kampagnen-Brief: Ziel, Zielgruppe, Budget, Creative-Spezifikationen
│   │   ├── 2026-06-google-search-trial.md         # Brief: Trial-Anmeldungen über Branded- und Wettbewerber-Search
│   │   ├── 2026-06-meta-retargeting-q2.md         # Brief: Retargeting von Trial-Nutzern ohne Conversion innerhalb von 7 Tagen
│   │   └── 2026-05-linkedin-icp-awareness.md      # Brief: Brand Awareness bei ICP-Jobtiteln in Zielbranchen
│   ├── ad-copy/
│   │   ├── google-search/
│   │   │   ├── branded-variants.md                # RSA-Headline- und Beschreibungsvarianten für Branded-Keywords
│   │   │   ├── competitor-variants.md             # Texte für Wettbewerber-Conquest-Kampagnen
│   │   │   └── generic-variants.md                # Nicht-markenbezogene Keyword-Texte (z. B. „growth analytics tool")
│   │   └── meta/
│   │       ├── awareness-copy.md                  # Top-of-Funnel Creative Copy: Hook, Body, CTA
│   │       ├── retargeting-copy.md                # Mid-Funnel-Text: Einwandbehandlung, Social Proof
│   │       └── conversion-copy.md                 # Bottom-Funnel: angebotsorientiert, Dringlichkeit, Direct Response
│   └── performance-logs/
│       ├── 2026-06-weekly.md                      # CPC, CTR, CVR, CPA, ROAS je Kampagne — wöchentlicher Snapshot
│       ├── 2026-05-weekly.md
│       └── budget-tracker.md                      # Monatliche Ausgaben vs. Budget nach Channel und Kampagne
├── landing-pages/
│   ├── _briefs/
│   │   ├── page-brief-template.md                 # Brief: Ziel, Traffic-Quelle, Zielgruppe, Hypothese, CTA
│   │   ├── 2026-06-trial-signup-v3.md             # Brief für neu gestaltete Trial-Landing-Page
│   │   └── 2026-05-pricing-page-refresh.md        # Brief: Jahresplan-Hervorhebung, Feature-Vergleichstabelle
│   ├── cro-notes/
│   │   ├── trial-signup-cro-audit.md              # CRO-Audit: Reibungspunkte, Vertrauenssignale, Formularfelder
│   │   ├── pricing-page-cro-audit.md              # CRO-Audit: Planklarheit, Einwandbehandlung, CTA-Platzierung
│   │   └── homepage-cro-audit.md                  # CRO-Audit: Value-Prop-Klarheit, Above-the-Fold-Analyse
│   └── test-results/
│       ├── trial-page-v2-vs-v3.md                 # A/B-Ergebnis: V3 +12 % CVR, ausgerollt
│       ├── pricing-annual-vs-monthly.md            # A/B-Ergebnis: Annual-First-Layout erhöhte ARR-Anteil um 9 %
│       └── homepage-headline-test.md              # Multivariater Headline-Test — nicht aussagekräftig, verlängert
├── retention/
│   ├── churn-analysis/
│   │   ├── 2026-q2-churn-report.md                # Churn-Rate, Abwanderungsgründe, Segmentaufschlüsselung
│   │   ├── 2026-q1-churn-report.md
│   │   └── churn-risk-signals.md                  # Verhaltensmerkmale, die mit Churn korrelieren (Mixpanel)
│   ├── win-back/
│   │   ├── win-back-sequence.md                   # 3-E-Mail-Rückgewinnungssequenz: Re-Engagement-Angebot, Testimonial, letzter CTA
│   │   ├── win-back-segment-rules.md              # HubSpot-Workflow-Auslösebedingungen für Win-Back-Enrollment
│   │   └── win-back-results.md                    # Rückgewinnungsrate nach Abwanderungsgrund und Zeit seit Churn
│   └── lifecycle-emails/
│       ├── day-3-activation-nudge.md              # E-Mail für Nutzer, die bis Tag 3 kein Aktivierungsereignis erreicht haben
│       ├── day-7-check-in.md                      # Fortschritts-E-Mail + Tutorial-Link für Nutzer mit geringem Engagement
│       └── day-30-upgrade-prompt.md               # Upgrade-E-Mail, ausgelöst bei Nutzungs-Meilenstein
├── reports/
│   ├── weekly-growth-dashboard/
│   │   ├── 2026-W22.md                            # North-Star-Metrik, Channel-CAC, MRR-Zuwächse, Experiment-Status
│   │   ├── 2026-W21.md
│   │   └── _template.md                           # Vorlage für das wöchentliche Growth-Dashboard
│   ├── channel-roi/
│   │   ├── 2026-q2-channel-roi.md                 # CAC, LTV:CAC, Amortisationszeitraum je Channel
│   │   └── 2026-q1-channel-roi.md
│   └── north-star-tracking/
│       ├── north-star-definition.md               # Metrikdefinition, Relevanz, Messmethode
│       └── north-star-log.md                      # Wöchentlicher North-Star-Wert + Abweichung vom Ziel
└── notes/
    ├── ice-scoring-rubric.md                      # ICE-Bewertungsanleitung (Impact / Confidence / Ease) für Experimente
    ├── growth-model.md                            # Bottom-up-Growth-Modell: Eingaben, Hebel, Sensitivitäten
    └── competitor-intel.md                        # Beobachtete Wettbewerberbewegungen, Preisgestaltung, Channel-Aktivität
```

## Schlüsseldateien erklärt

| Pfad | Zweck |
|---|---|
| `.claude/commands/experiment-design.md` | Nimmt eine Hypothesen-Zeichenkette entgegen und erstellt eine vollständige Testspezifikation: Control-vs.-Variant-Definition, primäre und Leitplanken-Metriken, minimal erkennbarer Effekt, erforderliche Stichprobengröße, Testdauer, GrowthBook- oder Optimizely-Flag-Name und Entscheidungskriterien |
| `.claude/commands/funnel-analysis.md` | Liest Abbruchdaten aus Mixpanel-/Amplitude-Exporten oder eingefügten Funnel-Screenshots, bildet Konversionsraten je Stufe ab, identifiziert den größten Verlustpunkt und schlägt Experimente zur Behebung vor |
| `.claude/commands/cro-audit.md` | Prüft eine Landing-Page-URL oder Figma-Spezifikation gegen CRO-Grundsätze: Above-the-Fold-Value-Prop, CTA-Klarheit, Formularreibung, Vertrauenssignale, Seitengeschwindigkeitshinweise und mobile Nutzbarkeit — gibt ein bewertetes Audit mit priorisierten Maßnahmen aus |
| `.claude/commands/growth-report.md` | Erstellt einen wöchentlichen Growth-Report mit North-Star-Metrik-Trend, MRR/ARR-Zuwächsen, Channel-CAC, Top-Experiment-Status und Risiken — formatiert für Slack Digest oder Leadership-Sync |
| `experiments/_template/` | Master-Experiment-Vorlagenverzeichnis — vor jedem Test nach `experiments/<datum>-<slug>/` kopieren; stellt sicher, dass jedes Experiment konsistent mit Hypothese, Design und Ergebnissen dokumentiert wird |
| `experiments/backlog.md` | ICE-bewertete Experiment-Warteschlange; die maßgebliche Priorisierungsliste, die vor dem Start eines neuen Tests konsultiert wird |
| `retention/churn-analysis/churn-risk-signals.md` | Verhaltensmerkmale aus Mixpanel, die mit Churn innerhalb von 30 Tagen korrelieren — werden verwendet, um proaktive Lifecycle-E-Mails auszulösen und gefährdete Accounts dem CS-Team zu melden |
| `reports/north-star-tracking/north-star-definition.md` | Einzige Quelle der Wahrheit dafür, was die North-Star-Metrik ist, wie sie in Mixpanel/Amplitude berechnet wird und wie das wöchentliche Ziel lautet |

## Schnelles Scaffold

```bash
# Create workspace root
mkdir -p growth-marketer-workspace && cd growth-marketer-workspace

# Claude Code directories
mkdir -p .claude/commands

# Experiments
mkdir -p experiments/_template
mkdir -p experiments/2026-06-checkout-cta-copy
mkdir -p experiments/2026-06-pricing-page-layout

# Funnels
mkdir -p funnels/drop-off-analysis
mkdir -p funnels/funnel-maps

# Paid acquisition
mkdir -p paid/_briefs
mkdir -p paid/ad-copy/google-search
mkdir -p paid/ad-copy/meta
mkdir -p paid/performance-logs

# Landing pages
mkdir -p landing-pages/_briefs
mkdir -p landing-pages/cro-notes
mkdir -p landing-pages/test-results

# Retention
mkdir -p retention/churn-analysis
mkdir -p retention/win-back
mkdir -p retention/lifecycle-emails

# Reports
mkdir -p reports/weekly-growth-dashboard
mkdir -p reports/channel-roi
mkdir -p reports/north-star-tracking

# Notes
mkdir -p notes

# Initialize key files
touch .claude/CLAUDE.md
touch .claude/settings.json
touch experiments/_template/hypothesis.md
touch experiments/_template/test-design.md
touch experiments/_template/results.md
touch experiments/backlog.md
touch funnels/acquisition-funnel.md
touch funnels/conversion-benchmarks.md
touch paid/_briefs/brief-template.md
touch paid/performance-logs/budget-tracker.md
touch landing-pages/_briefs/page-brief-template.md
touch reports/weekly-growth-dashboard/_template.md
touch reports/north-star-tracking/north-star-definition.md
touch reports/north-star-tracking/north-star-log.md
touch notes/ice-scoring-rubric.md
touch notes/growth-model.md

# Install all growth marketing skills
npx uitkit add skill marketing/experiment-tracker
npx uitkit add skill marketing/growth-dashboard
npx uitkit add skill marketing/paid-ads
npx uitkit add skill marketing/page-cro
npx uitkit add skill marketing/onboarding-cro
npx uitkit add skill marketing/referral-program
npx uitkit add skill marketing/pricing-strategy

# Install slash commands
npx uitkit add command experiment-design
npx uitkit add command funnel-analysis
npx uitkit add command ad-copy-test
npx uitkit add command cro-audit
npx uitkit add command cohort-analysis
npx uitkit add command growth-report
npx uitkit add command channel-review

echo "Growth marketer workspace ready."
```

## CLAUDE.md Vorlage

```markdown
# Growth Marketer Workspace — Claude-Anweisungen

## Worum es geht

Dieser Workspace verwaltet den gesamten Growth-Kreislauf: Experimentdesign und -tracking,
Paid Acquisition (Google Ads + Meta), Landing-Page-CRO, Funnel-Analyse,
Kohorten- und Retentionsanalyse sowie wöchentliches Growth-Reporting. Die North-Star-
Metrik und alle Experimententscheidungen werden hier geführt.

## Stack

- Produktanalyse: Mixpanel — primäre Quelle für Funnels, Kohorten, Retention,
  Event-basiertes Nutzerverhalten
- CDP: Segment — Event-Routing, Identity Resolution, Audience-Synchronisation mit Werbeplattformen
- Paid Channels: Google Ads (Search + PMax) und Meta Ads (Facebook + Instagram)
- Experimentation: GrowthBook — Feature Flags, A/B-Test-Zuweisung, Bayesianische Stats Engine
- Marketing-Automatisierung: HubSpot — Lifecycle-Stufen, E-Mail-Workflows, Lead-Scoring
- Web-Analyse: Google Analytics 4 — Traffic-Attribution, Makro-Conversion-Events
- Design: Figma — Landing-Page-Wireframes und Hi-Fi-Spezifikationen
- Kommunikation: Slack #growth-Channel für Experiment-Benachrichtigungen und Weekly Digest

## Verzeichniskonventionen

- experiments/<datum>-<slug>/ — ein Verzeichnis je Experiment; immer _template/ kopieren
- funnels/ — Funnel-Maps und Abbruchanalysen liegen hier; nie überschreiben, datierte Dateien hinzufügen
- paid/_briefs/ — Kampagnen-Brief vor dem Start jeder Paid-Kampagne
- paid/performance-logs/ — wöchentliche Snapshots von CPC, CTR, CVR, CPA, ROAS je Kampagne
- landing-pages/cro-notes/ — eine Datei je Seite; Erkenntnisse anhängen, nie überschreiben
- retention/churn-analysis/ — quartalsweise Churn-Reports + dauerhaftes Risk-Signal-Dokument
- reports/weekly-growth-dashboard/ — eine Datei pro Woche, benannt nach YYYY-WWW

## Häufige Aufgaben — genaue Befehle

**Neues Experiment entwerfen:**
/experiment-design hypothesis="Wenn [Aktion] dann wird [Metrik] [Richtung], weil [Begründung]" audience="[Segment]" metric="[primäre Metrik in Mixpanel]"

**Funnel-Abbruch analysieren:**
/funnel-analysis funnel=funnels/acquisition-funnel.md data="[eingefügter Mixpanel-Funnel-Output oder CSV-Pfad]"

**Anzeigentext-Varianten erstellen:**
/ad-copy-test channel="[google-search|meta]" goal="[trial|awareness|retargeting]" offer="[Angebot oder Value Prop]" variants=5

**Landing Page prüfen:**
/cro-audit url="[Landing-Page-URL]" goal="[trial signup|demo request]" traffic-source="[paid search|organic|email]"

**Kohortenanalyse durchführen:**
/cohort-analysis cohort-def="[Anmeldedatumsbereich oder Segment]" metric="[Tag-7-Retention|Trial-to-Paid-CVR]" data="[Mixpanel-/Amplitude-Export-Pfad]"

**Wöchentlichen Growth-Report erstellen:**
/growth-report week="[YYYY-WXX]" north-star="[aktueller Wert]" target="[wöchentliches Ziel]"

**Paid Channel auswerten:**
/channel-review channel="[google|meta|linkedin]" period="[2026-06]" data=paid/performance-logs/[datei].md

## Experiment-Konventionen

- Jedes Experiment beginnt mit einer Hypothese im Format experiments/_template/hypothesis.md
- Jeden neuen Experiment-Vorschlag in experiments/backlog.md mit ICE bewerten, bevor er geplant wird
- Mindest-Stichprobengröße muss vor dem Start berechnet werden — keine Bauchgefühl-Stichprobengrößen
- Primäre Metrik muss ein Mixpanel-Event sein; Leitplanken-Metriken müssen mindestens eine
  nachgelagerte Metrik umfassen (z. B. Tag-30-Retention, wenn die primäre Metrik Trial-CVR ist)
- Schwellenwert für statistische Signifikanz: 95 % Konfidenz; Mindestlaufzeit: 14 Tage
- Ergebnisse werden innerhalb von 48 Stunden nach Experimentabschluss in results.md dokumentiert

## Paid-Channel-Konventionen

- Vor jeder Kampagne immer einen Campaign-Brief in paid/_briefs/ verfassen
- Anzeigentext-Varianten müssen in paid/ad-copy/ dokumentiert sein, bevor sie auf die Plattform hochgeladen werden
- Performance-Logs werden wöchentlich jeden Montag aktualisiert — CPC/CTR/CVR/CPA/ROAS der Vorwoche
- Budget-Tracker wird aktualisiert, wenn die Ausgabenentwicklung um mehr als 15 % vom Plan abweicht

## CRO-Konventionen

- Keine Landing-Page-Änderung wird ohne einen Brief in landing-pages/_briefs/ ausgerollt
- CRO-Audit vor jeder größeren Seitenüberarbeitung erforderlich — Datei in landing-pages/cro-notes/ ablegen
- Alle A/B-Ergebnisse in landing-pages/test-results/ dokumentiert — Konfidenzniveau und
  Stichprobengröße angeben, nicht nur den Lift in Prozent

## Reporting-Konventionen

- Wöchentlicher Growth-Report wird jeden Montag bis 10 Uhr in Slack #growth veröffentlicht
- North-Star-Metrik wöchentlich in reports/north-star-tracking/north-star-log.md protokolliert
- Channel-ROI-Report wird quartalsweise erstellt — enthält CAC, LTV:CAC-Verhältnis, Amortisationszeitraum
```

## MCP-Server

```json
{
  "mcpServers": {
    "mixpanel": {
      "command": "npx",
      "args": ["-y", "@mixpanel/mcp-server"],
      "env": {
        "MIXPANEL_SERVICE_ACCOUNT_USERNAME": "${MIXPANEL_SERVICE_ACCOUNT_USERNAME}",
        "MIXPANEL_SERVICE_ACCOUNT_SECRET": "${MIXPANEL_SERVICE_ACCOUNT_SECRET}",
        "MIXPANEL_PROJECT_ID": "${MIXPANEL_PROJECT_ID}"
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
        "@modelcontextprotocol/server-filesystem",
        "/Users/${USER}/growth-marketer-workspace"
      ]
    },
    "hubspot": {
      "command": "npx",
      "args": ["-y", "@hubspot/mcp-server"],
      "env": {
        "HUBSPOT_ACCESS_TOKEN": "${HUBSPOT_ACCESS_TOKEN}"
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
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_OUTPUT_FILE_PATH\"; if [[ \"$FILE\" == */experiments/*/results.md ]]; then echo \"[hook] Experiment results saved: $FILE — update experiments/backlog.md with outcome and ICE re-score if applicable\"; fi'"
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
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$FILE\" == */experiments/*/test-design.md && ! -f \"$(dirname $FILE)/hypothesis.md\" ]]; then echo \"[hook] WARNING: No hypothesis.md found for this experiment — create hypothesis.md before test-design.md\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'cd \"${CLAUDE_PROJECT_DIR}\" && OPEN=$(find experiments/ -name \"test-design.md\" -not -newer experiments/ 2>/dev/null | xargs -I{} dirname {} | xargs -I{} sh -c \"[ ! -f {}/results.md ] && echo {}\" 2>/dev/null | wc -l | tr -d \" \"); [ \"$OPEN\" -gt 0 ] && echo \"[reminder] $OPEN experiment(s) have a test-design.md but no results.md — check if any tests have concluded\" || true'"
          }
        ]
      }
    ]
  }
}
```

## Zu installierende Skills

```bash
npx uitkit add skill marketing/experiment-tracker
npx uitkit add skill marketing/growth-dashboard
npx uitkit add skill marketing/paid-ads
npx uitkit add skill marketing/page-cro
npx uitkit add skill marketing/onboarding-cro
npx uitkit add skill marketing/referral-program
npx uitkit add skill marketing/pricing-strategy
```

## Verwandt

- [Leitfaden: Claude für Growth Marketer](../guides/for-growth-marketer.md)
- [Workflow: Vom Experimentdesign zur Entscheidung](../workflows/experiment-lifecycle.md)
