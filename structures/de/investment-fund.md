# Investmentfonds / VC-Operations — Projektstruktur

> Fur einen Venture-Capital-Fonds oder ein Family Office, das den gesamten Prozess von der Deal-Akquise bis zum LP-Reporting verwaltet — mit klar strukturierten Pipeline-Phasen, unternehmensspezifischen Diligence-Räumen, Portfolio-KPI-Tracking und Fondsverwaltung.

## Stack

- **Notion** oder **Airtable** — Deal-CRM, Pipeline-Kanban, Portfolio-Unternehmensdatenbank, LP-Stammdaten
- **Carta** — Cap-Table-Verwaltung, Fondsverwaltung, Aktienausgabe, Pro-Rata-Tracking
- **Visible** oder **Synaptic** — LP-Reporting-Portal, Fondsperformance-Dashboards, Aggregation von Portfolio-Kennzahlen
- **Pitchbook** oder **Crunchbase** — Marktdaten, Vergleichsunternehmen, Bewertungs-Benchmarks, Sektorkartierung
- **QuickBooks** — Fondsbuchhaltung, Management-Fee-Abrechnung, Capital-Call-Buchführung, Waterfall-Modellierung
- **DocuSign** — Term-Sheet-Unterzeichnung, Zeichnungsvereinbarungen, LP-Side-Letters, Board-Konsente
- **Google Workspace** — Shared Drive fur Datenräume, Sheets fur KPI-Tracker, Docs fur gemeinsam bearbeitete Memos
- **Claude Code** — Deal-Screening, IC-Memo-Erstellung, Diligence-Synthese, LP-Report-Generierung, Thesen-Recherche

## Verzeichnisstruktur

```
investment-fund/
├── .claude/
│   ├── CLAUDE.md                                      # Fondsweite Claude Code-Anweisungen (Vorlage unten einfügen)
│   ├── settings.json                                  # MCP-Server, Hooks, Tool-Berechtigungen
│   └── commands/
│       ├── deal-screen.md                             # /deal-screen — eingehenden Deal anhand von URL oder Deck-Zusammenfassung sichten
│       ├── first-look.md                              # /first-look — Kurzüberblick nach erstem Gründertreffen
│       ├── diligence-brief.md                         # /diligence-brief — offene Diligence-Punkte zu IC-tauglicher Zusammenfassung verdichten
│       ├── ic-memo.md                                 # /ic-memo — vollständiges Investment-Committee-Memo aus Diligence-Notizen
│       ├── pass-memo.md                               # /pass-memo — dokumentierte Ablehnung für pipeline/passed/
│       ├── portfolio-update.md                        # /portfolio-update — monatliche KPI-Erzählung aus dem Gründer-Update
│       ├── board-prep.md                              # /board-prep — Board-Deck-Gliederung, Tagesordnungsfragen, Aktionspunkte
│       ├── lp-report.md                               # /lp-report — quartalsweise LP-Brief mit Fondsperformance und Portfolio-Highlights
│       ├── capital-call.md                            # /capital-call — Entwurf der Capital-Call-Mitteilung mit Überweisungsanweisungen
│       ├── market-thesis.md                           # /market-thesis — Sektorthese aus rohen Recherche-Inputs
│       └── exit-analysis.md                          # /exit-analysis — Exit-Szenario-Modellierung und Exit-These
├── pipeline/
│   ├── sourcing/                                      # Alle eingehenden und ausgehenden Leads, die noch nicht gesichtet wurden
│   │   ├── deal-tracker.md                            # Hauptprotokoll: Unternehmen, Phase, Quelle, Datum, Thesenpassung, Status
│   │   ├── thesis-signals.md                         # Aufkommende Muster — Themen, Sektoren, Gründerprofile, die Beobachtung verdienen
│   │   └── _template/
│   │       └── initial-screen.md                     # Blankes Screening-Formular: Unternehmen, Phase, Kapitalbedarf, Quelle, Thesenpassung, rote Flaggen
│   ├── first-look/                                    # Durchgewunken — One-Pager verfasst, erstes Meeting geplant oder abgehalten
│   │   ├── _template/
│   │   │   └── one-pager.md                          # One-Pager-Vorlage: Geschäftsmodell, Team, Markt, Traktion, Kapitalbedarf, Passform
│   │   ├── acme-ai/
│   │   │   └── one-pager.md                          # First-Look-Brief: Problem, Lösung, Team, Traktion, Kapitalbedarf
│   │   ├── brightpath-health/
│   │   │   └── one-pager.md
│   │   └── circuitworks-infra/
│   │       └── one-pager.md
│   ├── diligence/                                     # Aktive Tiefenprüfung — IC-Memo in Arbeit
│   │   ├── _template/
│   │   │   ├── market-research.md                    # Marktgröße, Wettbewerbslandschaft, Timing-These
│   │   │   ├── team-check.md                         # Gründer-Hintergrund, Referenzen, Track Record, rote Flaggen
│   │   │   ├── financial-model.md                    # Umsatzmodell-Review, Unit Economics, Burn Rate, Runway, Sensitivität
│   │   │   ├── tech-diligence.md                     # Architektur, Skalierbarkeit, Sicherheit, technische Schuldenanalyse
│   │   │   ├── legal-diligence.md                   # IP-Eigentumsrechte, Arbeitsverträge, Cap-Table-Bereinigung, Rechtsstreitigkeiten
│   │   │   └── diligence-tracker.md                  # Offene Punkte nach Workstream — Verantwortlicher, Frist, Status, Blocker
│   │   ├── dawnrise-climate/
│   │   │   ├── market-research.md
│   │   │   ├── team-check.md
│   │   │   ├── financial-model.md
│   │   │   ├── tech-diligence.md
│   │   │   ├── legal-diligence.md
│   │   │   ├── diligence-tracker.md
│   │   │   └── reference-checks/
│   │   │       ├── ref-ceo-former-manager.md         # Strukturierte Referenz: Kompetenzen, Schwächen, Arbeitsstil
│   │   │       ├── ref-cto-cofounder.md
│   │   │       └── ref-customer-series-b-lead.md
│   │   └── edgewise-fintech/
│   │       ├── market-research.md
│   │       ├── team-check.md
│   │       ├── financial-model.md
│   │       ├── tech-diligence.md
│   │       ├── legal-diligence.md
│   │       ├── diligence-tracker.md
│   │       └── reference-checks/
│   │           └── ref-angel-lead.md
│   ├── ic/                                            # IC-Memo eingereicht — Investment-Committee-Abstimmung ausstehend
│   │   └── foundry-robotics/
│   │       ├── ic-memo.md                            # Finales IC-Memo: These, Markt, Team, Finanzen, Risiken, Konditionen, Empfehlung
│   │       ├── comps-analysis.md                     # Börsennotierte und private Vergleichsunternehmen mit Entry-Multiples und implizierter Bewertung
│   │       ├── financial-model.md
│   │       └── diligence-tracker.md                  # Abgeschlossene Punkte mit Ergebnisnotizen
│   ├── closed/                                        # Unterzeichnetes Term Sheet oder Überweisung erfolgt — wird nach portfolio/ verschoben
│   │   └── greenmark-saas/
│   │       ├── ic-memo.md
│   │       ├── term-sheet.md                         # Unterzeichnetes Term Sheet: Bewertung, Pro-Rata, Board-Sitz, Schutzbestimmungen
│   │       ├── closing-checklist.md                  # Überweisung bestätigt, Carta aktualisiert, DocuSign abgeschlossen, Pro-Rata protokolliert
│   │       └── post-close-intro.md                  # Einführungs-E-Mail zu Portfolio-Ressourcen — Legal, Talent, GTM
│   └── passed/                                        # Abgelehnte Deals — dokumentiert mit Ablehnungsbegründung
│       ├── _template/
│       │   └── pass-rationale.md                    # Grund für Ablehnung: Kategorie, Kerngrund, Signale, die unsere Einschätzung ändern könnten
│       ├── halcyon-crypto/
│       │   ├── one-pager.md
│       │   └── pass-rationale.md
│       └── inkdrop-hr-tech/
│           ├── one-pager.md
│           └── pass-rationale.md
├── memos/                                             # Alle IC-Memos und Ablehnungs-Memos an einem durchsuchbaren Ort
│   ├── investment-memos/
│   │   ├── 2026-05-greenmark-saas.md               # IC-Memo archiviert nach Abschluss
│   │   ├── 2026-03-foundry-robotics.md
│   │   └── 2025-11-apex-data.md
│   └── pass-memos/
│       ├── 2026-04-halcyon-crypto.md
│       └── 2026-02-inkdrop-hr-tech.md
├── portfolio/                                         # Ein Ordner je aktivem Portfolio-Unternehmen
│   ├── _template/                                    # Kopieren, wenn eine neue Investition abgeschlossen wird
│   │   ├── memo.md                                  # IC-Memo (kopiert aus pipeline/closed/)
│   │   ├── cap-table.md                             # Eigentumsanteil in %, Aktien, Optionspool, Rundenkonditionen
│   │   ├── board-deck-notes/
│   │   │   └── .gitkeep                             # Board-Vorbereitung und Nachbesprechungsnotizen je Quartal
│   │   ├── kpis/
│   │   │   └── kpi-log.md                          # Monatliche KPI-Tabelle: ARR, MoM-Wachstum, Burn Rate, Runway, Headcount, NRR
│   │   ├── capital-plan/
│   │   │   └── capital-plan.md                     # Zeitplan für nächste Runde, erwartetes Fundraising, Pro-Rata-Zuteilung, Reservemodell
│   │   └── exit-thesis/
│   │       └── exit-thesis.md                      # Exit-Pfade: potenzielle Käufer, IPO-Bereitschaft, Halten-vs.-Verkaufen-Rahmen
│   ├── greenmark-saas/
│   │   ├── memo.md
│   │   ├── cap-table.md
│   │   ├── board-deck-notes/
│   │   │   ├── 2026-q1-board-prep.md               # Q1-Board-Vorbereitung: Agenda, Fragen, zu verfolgende Aktionspunkte
│   │   │   ├── 2026-q1-board-notes.md              # Nach dem Board: Entscheidungen, Aktionspunkte, Nachverfolgungen
│   │   │   └── 2026-q2-board-prep.md
│   │   ├── kpis/
│   │   │   └── kpi-log.md                          # Laufende KPI-Tabelle mit monatlichen Zeilen
│   │   ├── capital-plan/
│   │   │   └── capital-plan.md
│   │   └── exit-thesis/
│   │       └── exit-thesis.md
│   └── apex-data/
│       ├── memo.md
│       ├── cap-table.md
│       ├── board-deck-notes/
│       │   └── 2026-q1-board-notes.md
│       ├── kpis/
│       │   └── kpi-log.md
│       ├── capital-plan/
│       │   └── capital-plan.md
│       └── exit-thesis/
│           └── exit-thesis.md
├── lp-relations/                                      # Alle LP-gerichteten Materialien, Kommunikation und Fondsperformance
│   ├── lp-roster.md                                  # LP-Liste: Name, Rechtsträger, Commitment, Überweisungsdaten, Kontakt
│   ├── quarterly-updates/
│   │   ├── 2026-q1-lp-update.md                    # Q1 2026 LP-Brief: NAV, neue Investitionen, Portfolio-Highlights
│   │   ├── 2025-q4-lp-update.md
│   │   └── 2025-q3-lp-update.md
│   ├── annual-reports/
│   │   └── 2025-annual-report.md                   # Jahresabschluss: IRR, DPI, RVPI, Top-Performer, Thesen-Fortschritt
│   └── capital-call-notices/
│       ├── _template/
│       │   └── capital-call-notice.md              # Standardmitteilung mit Abrufbetrag, Überweisungsdaten, Frist
│       ├── 2026-04-capital-call-2.md               # Capital Call Nr. 2 — Greenmark-Investition
│       └── 2025-10-capital-call-1.md               # Capital Call Nr. 1 — Apex Data-Investition
├── thesis/                                            # Sektorrecherche und Investitionsthesen
│   ├── sector-theses/
│   │   ├── ai-infrastructure.md                    # Vollständige Sektorthese: Marktübersicht, Timing, Zielprofil, Risiken
│   │   ├── climate-tech.md
│   │   ├── fintech-infrastructure.md
│   │   └── vertical-saas.md
│   └── market-maps/
│       ├── ai-infra-market-map.md                  # Landschaft nach Schicht: Compute, Training, Inferenz, Tooling, Anwendungen
│       ├── climate-market-map.md
│       └── fintech-rails-market-map.md
├── fund-admin/                                        # Verwaltung und rechtliche Compliance auf Fondsebene
│   ├── cap-table-summary.md                         # Cap Table auf Fondsebene: alle Portfolio-Unternehmen, Eigentumsanteile, Einstandskosten
│   ├── waterfall-model.md                           # Carried-Interest-Waterfall: Hurdle Rate, Catch-up, Carry-Aufteilung, LP/GP-Split
│   ├── compliance-calendar.md                       # Fristen: K-1s, FBAR, Staatsregistrierungen, RIA-Einreichungen
│   ├── management-fee-tracker.md                   # Management-Fee-Plan, eingegangene Zahlungen, Abstimmung mit QuickBooks
│   └── reserve-model.md                            # Follow-on-Reservemodell: Pro-Rata-Rechte je Unternehmen, Allokationsziele
└── scratch/
    ├── weekly-deal-notes.md                         # Staging-Bereich fur rohe Sourcing-Notizen vor der Einordnung in die Pipeline
    └── research-clips.md                            # Rohe Marktdaten und Pressemeldungen vor der Aufbereitung als Thesen-Dokumente
```

## Wichtige Dateien erklärt

| Pfad | Zweck |
|---|---|
| `pipeline/sourcing/deal-tracker.md` | Zentrales Sourcing-Protokoll mit jedem eingehenden und ausgehenden Lead — Unternehmen, Phase, Quelle, Thesenpassungsbewertung (1–5), Verantwortlicher, erstes Kontaktdatum, aktueller Status; Einträge werden nie gelöscht, nur der Status aktualisiert |
| `pipeline/diligence/_template/diligence-tracker.md` | Unternehmensindividueller Tracker fur alle offenen Punkte uber funf Workstreams (Markt, Team, Finanzen, Technik, Legal) — Verantwortlicher, Frist, Status, IC-blockierendes Flag; bleibt offen bis das IC-Memo eingereicht ist |
| `pipeline/diligence/_template/financial-model.md` | Standardisierte Finanz-Diligence-Datei mit Umsatzmodell-Review, Unit-Economics-Tabelle, Burn-Rate- und Runway-Berechnung, Sensitivitätsannahmen und roten Flaggen; fließt direkt in den Finanzteil des IC-Memos ein |
| `memos/investment-memos/` | Kanonisches Archiv aller genehmigten IC-Memos abgelegt als `YYYY-MM-<company>.md` nach dem IC-Votum — durchsuchbar fur Bewertungsvergleiche, Thesenentwicklung und Mustererkennung |
| `portfolio/_template/kpis/kpi-log.md` | Monatliche KPI-Tabellenvorlage mit Spalten fur ARR, MoM-Umsatzwachstum, Bruttomarge, Burn Rate, Runway (Monate), Headcount, NRR und Pipeline-Coverage-Ratio — monatlich ergänzt, nie überschrieben |
| `lp-relations/lp-roster.md` | LP-Stammliste mit rechtlichem Trägernamen, Commitment-Betrag, abgerufenem Kapital, nicht abgerufenem Commitment, Überweisungsdaten, Side-Letter-Markierungen und Hauptkontakt — Quelle der Wahrheit fur alle Capital-Call- und Ausschüttungsmitteilungen |
| `lp-relations/capital-call-notices/` | Ausgeführte Capital-Call-Mitteilungen nach Datum gespeichert — `YYYY-MM-capital-call-N.md` — genutzt fur LP-Abstimmung und QuickBooks-Kapitalkontoeinträge |
| `fund-admin/waterfall-model.md` | Carried-Interest-Waterfall mit Hurdle Rate, Vorzugsrendite, Catch-up-Regelung und GP/LP-Split — wird bei jedem Exit oder Realisierungsereignis aktualisiert |
| `fund-admin/compliance-calendar.md` | Jährlicher Compliance-Kalender mit K-1-Lieferfristen, staatlichen Blue-Sky-Einreichungen, jährlichen RIA-Änderungsterminen, FBAR sofern zutreffend, und Prüfungszeitplan |

## Schnelles Gerüst

```bash
# Create workspace root
mkdir -p investment-fund

# Create .claude command stubs
mkdir -p investment-fund/.claude/commands

# Create pipeline stage directories
mkdir -p investment-fund/pipeline/sourcing/_template
mkdir -p investment-fund/pipeline/first-look/_template
mkdir -p investment-fund/pipeline/diligence/_template/reference-checks
mkdir -p investment-fund/pipeline/ic
mkdir -p investment-fund/pipeline/closed
mkdir -p investment-fund/pipeline/passed/_template

# Create memo archive
mkdir -p investment-fund/memos/investment-memos
mkdir -p investment-fund/memos/pass-memos

# Create portfolio template
mkdir -p investment-fund/portfolio/_template/board-deck-notes
mkdir -p investment-fund/portfolio/_template/kpis
mkdir -p investment-fund/portfolio/_template/capital-plan
mkdir -p investment-fund/portfolio/_template/exit-thesis

# Create LP relations directories
mkdir -p investment-fund/lp-relations/quarterly-updates
mkdir -p investment-fund/lp-relations/annual-reports
mkdir -p investment-fund/lp-relations/capital-call-notices/_template

# Create thesis directories
mkdir -p investment-fund/thesis/sector-theses
mkdir -p investment-fund/thesis/market-maps

# Create fund admin directory
mkdir -p investment-fund/fund-admin

# Create scratch
mkdir -p investment-fund/scratch

# Seed placeholder files
touch investment-fund/pipeline/sourcing/deal-tracker.md
touch investment-fund/pipeline/sourcing/thesis-signals.md
touch investment-fund/fund-admin/cap-table-summary.md
touch investment-fund/fund-admin/waterfall-model.md
touch investment-fund/fund-admin/compliance-calendar.md
touch investment-fund/fund-admin/management-fee-tracker.md
touch investment-fund/fund-admin/reserve-model.md
touch investment-fund/lp-relations/lp-roster.md
touch investment-fund/scratch/weekly-deal-notes.md
touch investment-fund/scratch/research-clips.md

# Seed .gitkeep placeholders in empty template dirs
touch investment-fund/portfolio/_template/board-deck-notes/.gitkeep
touch investment-fund/portfolio/_template/kpis/.gitkeep
touch investment-fund/portfolio/_template/capital-plan/.gitkeep
touch investment-fund/portfolio/_template/exit-thesis/.gitkeep

# Install fund operations skills
npx uitkit add skill finance/deal-screening
npx uitkit add skill finance/ic-memo
npx uitkit add skill finance/diligence-synthesis
npx uitkit add skill finance/portfolio-monitor
npx uitkit add skill finance/lp-reporting
npx uitkit add skill finance/cap-table-analysis
npx uitkit add skill finance/market-sizing
npx uitkit add skill finance/comps-analysis
npx uitkit add skill finance/exit-modeling
npx uitkit add skill productivity/exec-briefing
npx uitkit add skill productivity/stakeholder-comms
```

## CLAUDE.md-Vorlage

```markdown
# Investmentfonds — Claude Code-Anweisungen

## Was das hier ist

Dies ist das Arbeitsverzeichnis eines Venture-Capital-Fonds, der den vollständigen Deal Flow,
Portfolio-Monitoring, LP-Reporting und Fondsverwaltung abwickelt. Pipeline-Phasen befinden sich in
pipeline/ (sourcing → first-look → diligence → ic → closed oder passed), aktive Investitionen
in portfolio/ (ein Ordner je Unternehmen), IC- und Ablehnungs-Memos in memos/, LP-Materialien in
lp-relations/, Sektorrecherche in thesis/ und Fondsbetrieb in fund-admin/.

Alles — Deal-Screening, IC-Memo-Erstellung, Diligence-Synthese, LP-Reporting und Board-Vorbereitung —
läuft über Claude Code-Slash-Commands in .claude/commands/.

## Stack

- Notion / Airtable — Deal-CRM und Portfolio-Datenbank; Pipeline-Kanban nach Phase; LP-Stammdaten
- Carta — Cap Table als zentrale Datenquelle; Zusammenfassungen exportieren nach portfolio/<company>/cap-table.md
- Visible / Synaptic — LP-Reporting-Portal; Quartals-Updates werden in lp-relations/quarterly-updates/ verfasst
- Pitchbook / Crunchbase — Marktdaten und Vergleichsunternehmen; Exporte gehen nach thesis/ und Diligence-Dateien
- QuickBooks — Fondsbuchhaltung; Capital Calls, Management Fees, Ausschüttungen hier abstimmen
- DocuSign — Term Sheets, Zeichnungsvereinbarungen, LP-Side-Letters; ausgeführte Exemplare in fund-admin/
- Google Workspace — Shared Drive spiegelt nach pipeline/diligence/<company>/data-room/ zur Offline-Referenz

## Häufige Aufgaben und genaue Befehle

### Eingehenden Deal sichten
```
/deal-screen

Company: [Name]
URL: [Website oder Crunchbase/Pitchbook-Profil]
Stage: [pre-seed / seed / Series A / Series B]
Sector: [Kategorie]
Ask: $[Betrag] at $[Pre-Money oder Post-Money] valuation
Source: [inbound / warm intro from X / conference / cold outbound]
Deck or key metrics: [einfügen oder beschreiben — ARR, Wachstumsrate, Team-Hintergrund]
Thesis fit check: [welcher Sektorthese entspricht das?]
```

### First-Look-One-Pager verfassen
```
/first-look

Company: [Name], Stage: [Runde], Sector: [Kategorie]
Meeting notes: [rohe Notizen vom ersten Meeting einfügen]
Deck highlights: [wichtige Folien einfügen oder beschreiben]
Team background: [Lebensläufe und Erfahrung von CEO und CTO]
Traction: [ARR, MoM-Wachstum, Kundenzahl, NRR falls vorhanden]
Ask: $[Betrag] at $[Bewertung], closing: [Datum oder offen]
Initial thesis fit: [warum das unsere These trifft oder dehnt]
Open questions before diligence: [was muss stimmen, um weiterzumachen]
```

### Diligence zu IC-tauglichem Brief verdichten
```
/diligence-brief

Company: [Name], Stage: [Runde], IC target date: [Datum]
Market research findings: [aus diligence/<company>/market-research.md einfügen]
Team check findings: [aus diligence/<company>/team-check.md einfügen]
Financial model review: [aus diligence/<company>/financial-model.md einfügen]
Tech diligence notes: [aus diligence/<company>/tech-diligence.md einfügen]
Legal diligence notes: [aus diligence/<company>/legal-diligence.md einfügen]
Open items remaining: [offene Zeilen aus diligence-tracker.md einfügen]
Key risks to address in memo: [top 3, die das IC herausfordern wird]
```

### Vollständiges IC-Memo erstellen
```
/ic-memo

Company: [Name], Stage: [Runde], Sector: [Kategorie]
Investment amount: $[Betrag], Valuation: $[Post-Money], Ownership: [%]
Investment thesis: [1–2 Sätze — warum dieses Unternehmen, warum jetzt, warum wir]
Market: [TAM, SAM, Wachstumsrate, strukturelle Rückenwinde, Timing-These]
Team: [Gründer-Hintergründe, Domänen-Expertise, Referenzen-Zusammenfassung]
Product: [Kern-Wedge, Differenzierung, Burggraben, Roadmap]
Traction: [ARR, MoM-Wachstum, NRR, Bruttomarge, Kundenzahl, Burn Rate, Runway]
Risks and mitigants: [top 3–4 Risiken mit konkreten Absicherungsmaßnahmen]
Comparable deals: [3–5 Vergleiche mit Phase, Bewertung, Exit-Multiple falls vorhanden]
Terms: [Lead, Pro-Rata, Board-Sitz, Schutzbestimmungen, Side-Letter-Markierungen]
Recommendation: [Invest / Pass / More diligence needed]
```

### Quartals-LP-Report erstellen
```
/lp-report

Quarter: Q[X] [JAHR]
Fund: [Fondsname und Jahrgang]
Total fund size: $[X]M, Deployed to date: $[Y]M, Uncalled: $[Z]M
NAV this quarter: $[X]M (prior quarter: $[Y]M)
Gross IRR: [%], Net IRR: [%], DPI: [X]x, RVPI: [Y]x, TVPI: [Z]x
New investments this quarter: [Unternehmen, Betrag, Phase, Sektor]
Portfolio highlights: [top 2–3 Meilensteine — abgeschlossene Runden, Umsatzwachstum, wichtige Einstellungen, Partnerschaften]
Concerns or write-downs: [etwaige Abwertungen oder Portfolio-Herausforderungen]
Upcoming: [erwartete Abschlüsse, Capital Calls, Portfolio-Ereignisse nächstes Quartal]
Market outlook: [makroökonomischer Kontext relevant fur die Fondsthese — 2–3 Sätze]
```

### Capital-Call-Mitteilung erstellen
```
/capital-call

Call number: [#N]
Investment triggering call: [Unternehmensname], Amount invested: $[X]
Call amount per LP: [proportional zum Commitment oder konkret angeben]
Wire deadline: [Datum]
Wire instructions: [aus fund-admin/ oder angeben]
Purpose note: [Standardformulierung oder spezifischer Investitionshinweis]
LP roster: [aus lp-relations/lp-roster.md einfügen oder LP-Anzahl angeben]
```

### Board-Vorbereitung fur ein Portfolio-Unternehmen erstellen
```
/board-prep

Company: [Name], Board date: [Datum]
Last board action items: [aus vorheriger board-notes-Datei einfügen]
Current KPIs: [aus portfolio/<company>/kpis/kpi-log.md einfügen]
Last founder update: [jüngstes monatliches Update einfügen]
Agenda items: [Finanzen / Produkt-Roadmap / Einstellungen / Fundraising / Sonstiges]
Key questions to raise: [konkrete Bedenken oder Chancen zum Nachfragen]
Decisions to make: [Option Grants, Budgetgenehmigungen, strategische Schwenks]
```

### Exit-These fur ein Portfolio-Unternehmen verfassen
```
/exit-analysis

Company: [Name], Investment date: [Datum], Cost basis: $[X]M, Current ownership: [%]
Current ARR: $[X]M, Growth rate: [%], Gross margin: [%]
Likely acquirers: [strategische Käufer mit Begründung je Kandidat auflisten]
IPO readiness: [erforderlicher Umsatzumfang, Wachstumsprofil, Marktbedingungen]
Hold vs. sell framework: [welche Kennzahlen oder Ereignisse Exit vs. Halten auslösen]
Comparable exits: [jüngste M&A- oder IPO-Transaktionen in der Kategorie mit Multiples]
Target return scenario: [1x / 3x / 5x / 10x-Szenarien mit implizierter Bewertung]
```

## Einzuhaltende Konventionen

- Pipeline-Phasen sind strikt geordnet: sourcing → first-look → diligence → ic → closed oder passed
- Jedes Unternehmen, das first-look erreicht, erhält einen One-Pager unter pipeline/first-look/<company>/one-pager.md
- Diligence-Ordner verwenden funf Standarddateien: market-research.md, team-check.md, financial-model.md, tech-diligence.md, legal-diligence.md — nicht umbenennen
- IC-Memos werden nach dem IC-Votum als memos/investment-memos/YYYY-MM-<company>.md archiviert, unabhängig vom Ergebnis
- Wenn ein Deal abgeschlossen wird, das IC-Memo nach portfolio/<company>/memo.md kopieren und den vollständigen Portfolio-Ordner aus _template/ erstellen
- Ablehnungsbegründung wird immer verfasst — ablegen unter pipeline/passed/<company>/pass-rationale.md und memos/pass-memos/YYYY-MM-<company>.md
- KPI-Protokolle sind append-only: jeden Monat eine neue Zeile hinzufügen, frühere Einträge nie überschreiben
- Capital-Call-Mitteilungen werden in lp-relations/capital-call-notices/YYYY-MM-capital-call-N.md archiviert
- LP-Stammliste in lp-relations/lp-roster.md ist die Quelle der Wahrheit fur alle Capital-Call- und Ausschüttungsmitteilungen
- NAV-Tracker und Waterfall-Modell in fund-admin/ werden innerhalb von 5 Werktagen nach jedem Exit oder Realisierungsereignis aktualisiert
- Compliance-Kalender in fund-admin/compliance-calendar.md wird zu Beginn jedes Quartals überprüft
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
        "/Users/your-username/investment-fund"
      ]
    },
    "google-drive": {
      "command": "npx",
      "args": ["-y", "@google/mcp-server-drive"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-google-client-id",
        "GOOGLE_CLIENT_SECRET": "your-google-client-secret",
        "GOOGLE_REFRESH_TOKEN": "your-google-refresh-token"
      }
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/mcp"],
      "env": {
        "NOTION_API_KEY": "secret_your-notion-integration-token"
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
    "airtable": {
      "command": "npx",
      "args": ["-y", "@airtable/mcp-server"],
      "env": {
        "AIRTABLE_API_KEY": "your-airtable-api-key",
        "AIRTABLE_BASE_ID": "appXXXXXXXXXXXXXX"
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
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if echo \"$FILE\" | grep -q \"ic-memo.md\" && echo \"$FILE\" | grep -q \"pipeline/ic/\"; then echo \"[hook] IC memo written in pipeline/ic/ — remember to file a copy to memos/investment-memos/YYYY-MM-<company>.md after the IC vote\"; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if echo \"$FILE\" | grep -q \"pass-rationale.md\"; then echo \"[hook] Pass rationale written — also file to memos/pass-memos/YYYY-MM-<company>.md and confirm the company folder is moved to pipeline/passed/\"; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if echo \"$FILE\" | grep -q \"capital-call-notices/\" && ! echo \"$FILE\" | grep -q \"_template\"; then echo \"[hook] Capital call notice written — verify LP roster counts match and wire instructions are current before distributing\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'DOM=$(date +%d); if [ \"$DOM\" -le \"05\" ]; then echo \"[reminder] Early month — check portfolio/<company>/kpis/kpi-log.md entries for last month and review compliance-calendar.md for upcoming deadlines\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Zu installierende Skills

```bash
# Core fund operations skills
npx uitkit add skill finance/deal-screening
npx uitkit add skill finance/ic-memo
npx uitkit add skill finance/diligence-synthesis
npx uitkit add skill finance/portfolio-monitor
npx uitkit add skill finance/lp-reporting
npx uitkit add skill finance/cap-table-analysis
npx uitkit add skill finance/market-sizing
npx uitkit add skill finance/comps-analysis
npx uitkit add skill finance/exit-modeling
npx uitkit add skill finance/waterfall-model

# Supporting productivity and communication skills
npx uitkit add skill productivity/exec-briefing
npx uitkit add skill productivity/stakeholder-comms
npx uitkit add skill productivity/investor-update
npx uitkit add skill data-ml/stakeholder-report

# Install all finance skills at once
npx uitkit add skills finance
```

## Verwandte Ressourcen

- [Investor guide](../guides/for-investor.md)
- [Deal flow workflow](../workflows/deal-flow.md)
- [IC memo process workflow](../workflows/ic-memo-process.md)
- [LP reporting workflow](../workflows/lp-reporting.md)
