# E-Commerce-Markenbetrieb — Projektstruktur

> Für DTC-Markenteams, die Shopify Plus betreiben und Claude benötigen, um die tägliche Produktverwaltung, E-Mail- und SMS-Kampagnen, bezahlte Anzeigentexte, Lager-Nachbestellungen, Eskalationen im Kundendienst und Performance-Analysen über einen modernen Martech-Stack zu übernehmen.

## Stack

- Shopify Plus — Storefront, Produktkatalog, Lager, Metafelder, B2B
- Klaviyo — E-Mail-Flows, SMS-Sequenzen, Segmente, Kampagnenmanagement
- Meta Ads Manager — Prospecting, Retargeting, DPA-Kampagnen
- Google Performance Max — Shopping, Search, Display — vereinheitlichte Kampagnen
- Triple Whale oder Northbeam — Multi-Touch-Attribution, MER, nCAC, blended ROAS
- Gorgias — Kundensupport-Ticketing, Makros, CSAT, Automatisierungsregeln
- ShipBob — 3PL-Fulfillment, WMS, Rückgabeportal, verteiltes Lager
- Recharge Payments — Abonnementpläne, Abrechnungslogik, Churn-Management
- Yotpo — Bewertungen, UGC, Treue- und Empfehlungsprogramme
- QuickBooks Online — GuV, COGS-Verfolgung, Shopify-Auszahlungsabgleich

---

## Verzeichnisbaum

```
ecommerce-brand/
├── .claude/
│   ├── settings.json                          # MCP-Server, Hooks, Berechtigungen
│   └── commands/
│       ├── product-launch.md                  # End-to-End-Checkliste für den Launch neuer SKUs
│       ├── listing-optimizer.md               # Titel, Beschreibung und SEO-Meta nach SKU neu schreiben
│       ├── campaign-brief.md                  # Klaviyo- oder bezahltes Anzeigen-Kampagnenbriefing erstellen
│       ├── email-copy.md                      # Kampagnen- oder Flow-E-Mail mit Betreffvarianten verfassen
│       ├── sms-copy.md                        # Klaviyo-SMS mit Opt-out und Zeichenanzahl verfassen
│       ├── ad-copy-meta.md                    # 5 Primary-Text-Hooks + 5 Headlines für Meta
│       ├── ad-copy-pmax.md                    # Headlines, Descriptions und Assets für PMax
│       ├── inventory-check.md                 # SKUs unter Nachbestellschwelle nach Lieferant markieren
│       ├── reorder-draft.md                   # Bestellung oder Lieferanten-E-Mail aus reorder-tracker erstellen
│       ├── cs-macro.md                        # Gorgias-Makro nach Ticket-Typ und Richtlinie generieren
│       ├── escalation-handler.md              # Ticket triagieren und Eskalationspfad anwenden
│       ├── subscription-retention.md          # Rückhalte-Angebot für Recharge-Kündigungsabsichten verfassen
│       ├── review-response.md                 # Öffentliche Yotpo-Antwort auf 1–3-Stern-Bewertungen verfassen
│       └── weekly-report.md                   # Narrativer Bericht aus Triple Whale/Northbeam-Export
├── CLAUDE.md                                  # Workspace-Anweisungen (siehe Vorlage unten)
├── products/
│   ├── sku-overview.csv                       # Hauptübersicht: Handle, Titel, Variante, Preis, Kosten, Status, Lieferant
│   ├── listings/
│   │   ├── _brand-voice.md                    # Tonleitfaden, verbotene Wörter, Stilregeln für alle Texte
│   │   ├── _pdp-template.md                   # Standard-PDP-Struktur: Hook, Vorteile, Spezifikationen, CTA
│   │   ├── cotton-canvas-tote-natural.md      # Beispiel: eine Datei pro aktivem SKU
│   │   ├── merino-crewneck-charcoal.md
│   │   └── stainless-tumbler-matte-black.md
│   ├── seo/
│   │   ├── meta-titles.csv                    # Handle, aktueller_Titel, vorgeschlagener_Titel, Zeichenanzahl
│   │   ├── meta-descriptions.csv              # Handle, aktuelle_Beschreibung, vorgeschlagene_Beschreibung, Zeichenanzahl
│   │   ├── keyword-map.md                     # Primäre und sekundäre Keywords nach Kollektion
│   │   └── collection-page-copy.md            # SEO-optimierte Kollektionsseitenbeschreibungen
│   ├── drafts/
│   │   ├── new-product-brief-template.md      # Pre-Launch-Formular: Konzept, Preis, Lieferant, Launch-Datum
│   │   ├── 2026-q3-canvas-crossbody.md        # Laufendes Briefing für den nächsten Launch
│   │   └── 2026-q4-holiday-bundle.md
│   └── archived/
│       └── discontinued-skus.csv              # Eingestellte SKUs mit Abkündigungsdatum und Grund
├── marketing/
│   ├── email-sms/
│   │   ├── sequences/
│   │   │   ├── welcome-series.md              # E-Mails 1–3: Onboarding-Flow-Text und Timing-Hinweise
│   │   │   ├── abandoned-cart.md              # E-Mails 1–2 + SMS 1: Warenkorbwiederherstellungssequenz
│   │   │   ├── post-purchase.md               # E-Mails 1–2: Bewertungsanfrage und Cross-Sell
│   │   │   ├── win-back-90d.md                # 3-Touch-Win-Back für Käufer mit 90-tägiger Inaktivität
│   │   │   ├── subscription-churn.md          # Recharge-Kündigungsabsicht: Angebot und Rückhalte-Text
│   │   │   └── loyalty-milestone.md           # Durch Yotpo-Punktemeilenstein ausgelöste E-Mail
│   │   └── campaigns/
│   │       ├── _campaign-brief-template.md    # Zielgruppe, Ziel, Angebot, CTA, Klaviyo-Segment, Sendedatum
│   │       ├── 2026-q2-mothers-day.md         # Finalisiertes Briefing und Text für die Mai-Kampagne
│   │       ├── 2026-q3-back-to-school.md
│   │       ├── 2026-q4-bfcm-email.md          # Kampagnendatei Black Friday / Cyber Monday
│   │       └── klaviyo-campaign-log.csv       # Kampagnenname, Sendedatum, Listengröße, OR, CTR, Umsatz
│   └── paid-ads/
│       ├── copy/
│       │   ├── meta-primary-text.md           # Hook-Varianten (5+) pro Angebot für Meta-Primärtext
│       │   ├── meta-headlines.md              # 5+ Headline-Varianten für Meta-Anzeigensets
│       │   ├── pmax-headlines.md              # 15 Headlines (≤30 Zeichen) für Google-PMax-Asset-Gruppe
│       │   ├── pmax-descriptions.md           # 4 Beschreibungen (≤90 Zeichen) für PMax
│       │   └── dpa-catalog-copy.md            # Textregeln für dynamische Produktanzeigen-Overlays
│       └── creative-briefs/
│           ├── _ad-brief-template.md          # Angebot, Hook-Winkel, Zielgruppe, Plattform, Budget, Format
│           ├── 2026-q2-prospecting-meta.md    # Briefing für Q2 Cold-Traffic-Meta-Kampagnen
│           ├── 2026-q2-retargeting-meta.md
│           ├── 2026-q2-branded-pmax.md        # Branded-Search-PMax-Kampagnenbriefing
│           └── 2026-q3-ugc-creative-meta.md
│   └── social/
│       ├── content-calendar.md                # Monatlicher Beitragsplan mit Format und Hook
│       └── caption-library.md                 # Wiederverwendbare Bildunterschriften nach Produkt/Thema
├── operations/
│   ├── inventory-sops/
│   │   ├── reorder-triggers.md                # Nachbestellschwellen nach SKU-Geschwindigkeit und Vorlaufzeit
│   │   ├── reorder-tracker.csv                # SKU, Lieferant, letztes_BD_Datum, nächstes_Nachbestell_Datum, Menge
│   │   ├── low-stock-alert-process.md         # Schritt für Schritt: Erkennen → Bestellung erstellen → bestätigen → protokollieren
│   │   └── dead-stock-review.md               # Quartalsweise Prüfung von Entscheidungen bei langsam drehendem Lager
│   ├── fulfillment-sops/
│   │   ├── shipbob-receiving-checklist.md     # Schritte zur Erfassung eingehender Sendungen im ShipBob-WMS
│   │   ├── returns-processing.md              # ShipBob-Rückgabeportal → Bewertung → Wiedereinlagerung oder Abschreibung
│   │   ├── shipbob-exception-handler.md       # Lösungsschritte für verlorene, beschädigte oder verzögerte Sendungen
│   │   └── distributed-inventory-rules.md    # Welche SKUs in welchem ShipBob-Lager sind und warum
│   └── cs-playbooks/
│       ├── escalation-matrix.md               # Ticket-Typ → Tier 1 / Tier 2 / Gründer-Eskalations-Mapping
│       ├── wismo-playbook.md                  # WISMO: ShipBob prüfen → Gorgias-Makro → Follow-up-SLA
│       ├── damaged-item-playbook.md           # Beschädigte Ware: Foto erforderlich → Ersatz oder Erstattung
│       ├── wrong-item-playbook.md             # Falscher Artikel: Frankiertes Rücksendeetikett → Neuversand → in Gorgias protokollieren
│       ├── subscription-cancel-playbook.md    # Recharge-Kündigungsabsicht → Rückhalte-Angebot → Churn protokollieren
│       └── chargeback-playbook.md             # Beweiserhebung, Shopify-Antwort, Anfechtungszeitplan
├── analytics/
│   ├── weekly-dashboard.md                    # Vorlage: MER, blended ROAS, nCAC, AOV, Top-SKUs, Maßnahme
│   ├── channel-benchmarks.md                  # KPI-Benchmarks auf Plattformebene nach Monat und Quartal
│   ├── cohort-analysis.md                     # LTV-Kohortentabelle: 30/60/90/180-Tage-Wiederholungskauf nach Monat
│   ├── triple-whale-export-notes.md           # Wie man TW-Exporte liest, bekannte Abweichungen, Korrekturen
│   └── northbeam-attribution-log.md           # Modell-Änderungsprotokoll und wöchentliche Anomalie-Hinweise
├── finance/
│   ├── p-and-l-template.md                    # Monatliche GuV: Umsatz, COGS, Bruttogewinnmarge, Werbeausgaben, Netto
│   ├── unit-economics.md                      # CAC, LTV, Amortisationsdauer, Deckungsbeitrag nach SKU
│   ├── quickbooks-reconciliation-sop.md       # Shopify-Auszahlungen → QB-Ertragskonto → COGS-Buchung
│   └── end-of-month-close.md                  # Checkliste: QB-Abgleich, Auszahlungsabgleich, Margenprüfung
└── vendors/
    ├── supplier-directory.md                  # Name, Kontakt, MOQ, Vorlaufzeit, Zahlungsbedingungen, Währung
    ├── po-template.md                          # Standardbestellung mit allen erforderlichen Feldern
    └── [supplier-name]/
        ├── po-history.md                       # Alle Bestellungen mit Daten, Mengen, Bestätigungen
        └── quality-notes.md                    # Fehlerquoten, Prüfergebnisse, ungelöste Probleme
```

---

## Wichtige Dateien erklärt

| Pfad | Zweck |
|---|---|
| `products/sku-overview.csv` | Haupt-SKU-Register — vor jeder Listing-, Lager- oder Lieferantenaufgabe an Claude übergeben, damit der Kontext korrekt ist |
| `products/listings/_brand-voice.md` | Tonleitfaden, den Claude bei jeder Listing-Überarbeitung, Kampagnenentwurf und CS-Makro anwendet — bei Änderung der Markenstimme zuerst hier bearbeiten |
| `operations/cs-playbooks/escalation-matrix.md` | Entscheidungsbaum, dem Claude beim Ausführen von `/escalation-handler` folgt — ordnet Ticket-Typ Tier 1, Tier 2 oder Gründer-Ebene zu |
| `operations/inventory-sops/reorder-tracker.csv` | Maßgebliche Quelle für den Nachbestellzeitpunkt — Claude liest diese beim Ausführen von `/inventory-check` oder `/reorder-draft` |
| `marketing/email-sms/campaigns/_campaign-brief-template.md` | Pflichtbriefing-Format, bevor Claude Klaviyo-Kampagnentexte entwirft — erzwingt Zielgruppen-, Segment-, Angebots- und CTA-Felder |
| `analytics/weekly-dashboard.md` | Strukturierte Vorlage, die Claude jeden Montag aus einem eingefügten Triple Whale- oder Northbeam-Export ausfüllt |
| `finance/unit-economics.md` | CAC, LTV und Deckungsbeitrag nach SKU — Claude referenziert dies für Budget- oder Kanalempfehlungen |
| `vendors/supplier-directory.md` | Lieferantenkontakte, MOQs und Vorlaufzeiten — Claude entnimmt diese Infos, bevor er eine Bestellung oder Lieferanten-E-Mail entwirft |

---

## Schnell-Scaffold

```bash
# Alle Verzeichnisse erstellen
mkdir -p ecommerce-brand/.claude/commands
mkdir -p ecommerce-brand/products/listings
mkdir -p ecommerce-brand/products/seo
mkdir -p ecommerce-brand/products/drafts
mkdir -p ecommerce-brand/products/archived
mkdir -p ecommerce-brand/marketing/email-sms/sequences
mkdir -p ecommerce-brand/marketing/email-sms/campaigns
mkdir -p ecommerce-brand/marketing/paid-ads/copy
mkdir -p ecommerce-brand/marketing/paid-ads/creative-briefs
mkdir -p ecommerce-brand/marketing/social
mkdir -p ecommerce-brand/operations/inventory-sops
mkdir -p ecommerce-brand/operations/fulfillment-sops
mkdir -p ecommerce-brand/operations/cs-playbooks
mkdir -p ecommerce-brand/analytics
mkdir -p ecommerce-brand/finance
mkdir -p ecommerce-brand/vendors

# Wichtige Stub-Dateien anlegen
touch ecommerce-brand/products/sku-overview.csv
touch ecommerce-brand/products/listings/_brand-voice.md
touch ecommerce-brand/products/listings/_pdp-template.md
touch ecommerce-brand/products/seo/meta-titles.csv
touch ecommerce-brand/products/seo/meta-descriptions.csv
touch ecommerce-brand/marketing/email-sms/campaigns/_campaign-brief-template.md
touch ecommerce-brand/marketing/email-sms/campaigns/klaviyo-campaign-log.csv
touch ecommerce-brand/marketing/paid-ads/creative-briefs/_ad-brief-template.md
touch ecommerce-brand/operations/inventory-sops/reorder-tracker.csv
touch ecommerce-brand/operations/cs-playbooks/escalation-matrix.md
touch ecommerce-brand/analytics/weekly-dashboard.md
touch ecommerce-brand/analytics/channel-benchmarks.md
touch ecommerce-brand/analytics/cohort-analysis.md
touch ecommerce-brand/finance/p-and-l-template.md
touch ecommerce-brand/finance/unit-economics.md
touch ecommerce-brand/vendors/supplier-directory.md
touch ecommerce-brand/vendors/po-template.md
touch ecommerce-brand/CLAUDE.md

# UitKit-Skills installieren
npx uitkit add skill small-business/shopify-operations
npx uitkit add skill small-business/product-listing-optimizer
npx uitkit add skill marketing/email-sequence
npx uitkit add skill marketing/klaviyo-campaign
npx uitkit add skill marketing/paid-ads
npx uitkit add skill marketing/page-cro
npx uitkit add skill operations/inventory-management
npx uitkit add skill operations/customer-service-escalation
npx uitkit add skill data-ml/weekly-performance-report

# Slash-Commands installieren
npx uitkit add command product-launch
npx uitkit add command listing-optimizer
npx uitkit add command campaign-brief
npx uitkit add command email-copy
npx uitkit add command sms-copy
npx uitkit add command ad-copy-meta
npx uitkit add command ad-copy-pmax
npx uitkit add command inventory-check
npx uitkit add command reorder-draft
npx uitkit add command cs-macro
npx uitkit add command escalation-handler
npx uitkit add command subscription-retention
npx uitkit add command review-response
npx uitkit add command weekly-report
```

---

## CLAUDE.md-Vorlage

```markdown
# E-Commerce-Marken-Betriebs-Workspace

Dies ist ein Claude Code-Workspace für den Betrieb einer Shopify Plus DTC-Marke. Claude übernimmt
die Optimierung von Produktlistings, Klaviyo-Kampagnen- und Flow-Texte, Meta- und Google-PMax-Anzeigentexte,
Lager-Nachbestellmanagement, Kundendienst-Eskalation, Recharge-Abonnement-Retention,
Yotpo-Bewertungsantworten und wöchentliche Performance-Berichte. Kein Anwendungscode liegt hier.

---

## Stack

- Shopify Plus — Storefront, Katalog, Lager, Metafelder
- Klaviyo — E-Mail-Flows, SMS-Sequenzen, Kampagnenmanagement
- Meta Ads Manager — Prospecting, Retargeting, DPA
- Google Performance Max — Shopping, Search, Display
- Triple Whale / Northbeam — Attribution, MER, nCAC, blended ROAS
- Gorgias — Support-Tickets, Makros, CSAT, Eskalationsrouting
- ShipBob — 3PL-Fulfillment, WMS, Rückgabeportal
- Recharge Payments — Abonnements, Abrechnung, Kündigungsabsichts-Flows
- Yotpo — Bewertungen, UGC, Treue und Empfehlung
- QuickBooks Online — GuV, COGS, Shopify-Auszahlungsabgleich

---

## Verzeichniskonventionen

- `products/sku-overview.csv` — diese Datei immer bei Listing- oder Lageraufgaben übergeben
- `products/listings/_brand-voice.md` — diese Tonregeln auf jeden Text anwenden
- `marketing/email-sms/campaigns/_campaign-brief-template.md` — Pflicht vor dem Entwurf jeder Kampagne
- `marketing/paid-ads/creative-briefs/_ad-brief-template.md` — Pflicht vor dem Entwurf jedes Anzeigentexts
- `operations/cs-playbooks/escalation-matrix.md` — beim Triagieren jedes Support-Tickets befolgen
- `operations/inventory-sops/reorder-tracker.csv` — maßgebliche Quelle für den Nachbestellzeitpunkt
- `analytics/weekly-dashboard.md` — diese Vorlage jeden Montag aus Plattform-Exporten befüllen
- `vendors/supplier-directory.md` — Kontakt und Konditionen vor jeder Bestellung oder Lieferanten-E-Mail entnehmen

---

## Workflow für den Launch neuer Produkte

Beim Produktlaunch-Auftrag diese Schritte der Reihe nach durchführen:
1. Bestätigen, dass ein ausgefülltes Briefing `products/drafts/[product-slug].md` existiert
2. `/listing-optimizer` ausführen, um Titel, PDP-Beschreibung, Meta-Titel, Meta-Beschreibung zu erstellen
3. Prüfen, ob der SKU mit korrektem COGS und Lieferant in `products/sku-overview.csv` eingetragen ist
4. `/campaign-brief` für die Launch-E-Mail ausführen — Klaviyo-Segment: All Subscribers verwenden
5. `/email-copy` mit dem genehmigten Briefing ausführen
6. `/ad-copy-meta` und `/ad-copy-pmax` mit dem Launch-Briefing ausführen
7. Bestätigen, dass der Nachbestellschwellenwert in `operations/inventory-sops/reorder-tracker.csv` festgelegt ist
8. Entwurfsdatei von `products/drafts/` nach `products/listings/[slug].md` verschieben

---

## Kampagnen-Briefing-Prozess

Vor der Texterstellung muss ein vollständiges Briefing im entsprechenden Ordner existieren.
Für Klaviyo-Kampagnen: `marketing/email-sms/campaigns/[campaign-slug].md`
Für bezahlte Anzeigen: `marketing/paid-ads/creative-briefs/[campaign-slug].md`

Ein Briefing muss enthalten: Zielgruppe/Segment, Ziel (Akquisition / Retention / Reaktivierung),
Angebot oder Hook, CTA, Plattform, Sendedatum oder Go-Live-Datum, und Budget (für bezahlt).
Claude entwirft keinen Text ohne vollständiges Briefing — fehlende Felder werden abgefragt.

---

## Lager-Nachbestellauslöser

Claude prüft `operations/inventory-sops/reorder-tracker.csv` und meldet Nachbestellbedarf, wenn:
- Verfügbare Einheiten unter den Nachbestellschwellenwert des SKUs fallen (Spalte: reorder_threshold)
- Verbleibende Lagertage (units_on_hand / avg_daily_velocity) < Lieferantenvorlaufzeit + 7 Tage
Auslösung: `/reorder-draft` mit SKU und Lieferantenname aus supplier-directory.md ausführen.

---

## Kundendienst-Eskalationspfade

`operations/cs-playbooks/escalation-matrix.md` für alle Ticket-Triagen befolgen.
Tier 1 (Gorgias-Makro): WISMO, Standard-Rückgabeanfragen, Größenfragen
Tier 2 (Prüfung durch CS-Leitung): Beschädigte Ware, falscher Artikel, Chargeback-Streitigkeiten, Abonnementabrechnung
Gründer-Eskalation: Mediendrohungen, juristische Sprache, Bestellungen > 500 $, wiederholte Fehler

Beim Ausführen von `/escalation-handler` immer abrufen:
- `operations/cs-playbooks/[issue-type]-playbook.md` für die schrittweise Lösung
- `operations/fulfillment-sops/returns-processing.md` für jede physische Rücksendung
- Gorgias-Ticket-Verlauf, falls der Kunde zuvor Kontakt hatte (Wiederholungskontakt vermerken)

---

## Häufige Aufgaben — genaue Befehle

### Produktlisting optimieren
/listing-optimizer
Bereitstellen: Produkt-Handle oder Slug, aktueller Titel, Ziel-Keywords (aus `products/seo/keyword-map.md`).
Ausgabe: überarbeiteter Titel (≤70 Zeichen), PDP-Beschreibung (nutzenorientiert, 150–200 Wörter),
Meta-Titel (≤60 Zeichen), Meta-Beschreibung (≤155 Zeichen).

### Klaviyo-E-Mail-Kampagne entwerfen
/email-copy
Bereitstellen: Link zum vollständigen Briefing in `marketing/email-sms/campaigns/`.
Ausgabe: 2 Betreffzeilen-Varianten (A/B), Vorschautext, vollständiger Textkörper für das Einfügen in Klaviyo.

### Klaviyo-SMS entwerfen
/sms-copy
Bereitstellen: Kampagnenziel, Angebot, Klaviyo-Segment, Sendedatum.
Ausgabe: SMS-Text (≤160 Zeichen inkl. Opt-out), und 2-teilige Variante bei >160 Zeichen.

### Meta-Anzeigentext generieren
/ad-copy-meta
Bereitstellen: Link zum Briefing in `marketing/paid-ads/creative-briefs/`.
Ausgabe: 5 Primary-Text-Hooks, 5 Headlines (≤40 Zeichen je), 2 Link-Beschreibungsvarianten.

### Google-PMax-Asset-Gruppen-Text generieren
/ad-copy-pmax
Bereitstellen: Link zum Briefing in `marketing/paid-ads/creative-briefs/`.
Ausgabe: 15 Headlines (≤30 Zeichen), 4 Beschreibungen (≤90 Zeichen), Long Headline (≤90 Zeichen).

### Lager prüfen und Nachbestellung entwerfen
/inventory-check — aktuellen ShipBob-Lagerexport einfügen
/reorder-draft — nach Auslösung der Meldung SKU und Lieferantenname angeben

### Support-Ticket triagieren
/escalation-handler
Bereitstellen: Gorgias-Ticket-ID oder Ticket-Text einfügen.
Claude gibt zurück: Tier-Zuweisung, anzuwendendes Playbook, zu verwendendes oder zu entwerfendes Makro.

### Wöchentlichen Performance-Bericht erstellen
/weekly-report
Triple Whale- oder Northbeam-Wochenzusammenfassung einfügen.
Ausgabe: strukturierter Bericht zu MER, blended ROAS, nCAC, AOV, Top 5 SKUs, eine Handlungsempfehlung.

---

## Konventionen

- Alle Geldbeträge in USD, sofern Lieferantenkonditionen nichts anderes vorsehen.
- Produkttexte beginnen mit dem Kundennutzen, nicht mit der Produkteigenschaft.
- Klaviyo-Segmente sind genau so in Groß-/Kleinschreibung angegeben, wie sie in der Klaviyo-Benutzeroberfläche erscheinen.
- `products/archived/` nicht bearbeiten — Einträge sind schreibgeschützt.
- Beim Aktualisieren einer Richtliniendatei eine datierte Änderungsnotiz am Dateianfang voranstellen.
- Wöchentliche Dashboard-Dateien werden benannt `YYYY-Www-performance.md` (z. B. `2026-W22-performance.md`).
```

---

## MCP-Server

```json
{
  "mcpServers": {
    "shopify": {
      "command": "npx",
      "args": ["-y", "@shopify/mcp-server"],
      "env": {
        "SHOPIFY_ACCESS_TOKEN": "${SHOPIFY_ACCESS_TOKEN}",
        "SHOPIFY_SHOP_DOMAIN": "${SHOPIFY_SHOP_DOMAIN}"
      }
    },
    "klaviyo": {
      "command": "npx",
      "args": ["-y", "@klaviyo/mcp-server"],
      "env": {
        "KLAVIYO_API_KEY": "${KLAVIYO_API_KEY}"
      }
    },
    "gorgias": {
      "command": "npx",
      "args": ["-y", "@gorgias/mcp-server"],
      "env": {
        "GORGIAS_DOMAIN": "${GORGIAS_DOMAIN}",
        "GORGIAS_API_KEY": "${GORGIAS_API_KEY}",
        "GORGIAS_API_EMAIL": "${GORGIAS_API_EMAIL}"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropic-ai/mcp-server-filesystem",
        "/path/to/ecommerce-brand"
      ]
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "${SLACK_BOT_TOKEN}",
        "SLACK_TEAM_ID": "${SLACK_TEAM_ID}"
      }
    }
  }
}
```

---

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
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_OUTPUT_PATH\"; if [[ \"$FILE\" == */analytics/weekly-dashboard* || \"$FILE\" == */analytics/*performance* ]]; then echo \"[$(date +%Y-%m-%d)] Report written: $FILE\" >> .claude/report-log.txt; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_OUTPUT_PATH\"; if [[ \"$FILE\" == */marketing/paid-ads/copy/* || \"$FILE\" == */marketing/email-sms/campaigns/* ]]; then echo \"[$(date +%Y-%m-%d)] Campaign asset written: $FILE\" >> .claude/campaign-log.txt; fi'"
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
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_INPUT_PATH\"; if [[ \"$FILE\" == */operations/cs-playbooks/* || \"$FILE\" == *escalation-matrix* ]]; then cp \"$FILE\" \"${FILE}.bak\" 2>/dev/null; echo \"[$(date +%Y-%m-%d)] Backup created: ${FILE}.bak\"; fi'"
          }
        ]
      }
    ]
  }
}
```

---

## Zu installierende Skills

```bash
npx uitkit add skill small-business/shopify-operations
npx uitkit add skill small-business/product-listing-optimizer
npx uitkit add skill marketing/email-sequence
npx uitkit add skill marketing/klaviyo-campaign
npx uitkit add skill marketing/paid-ads
npx uitkit add skill marketing/page-cro
npx uitkit add skill operations/inventory-management
npx uitkit add skill operations/customer-service-escalation
npx uitkit add skill data-ml/weekly-performance-report
npx uitkit add skill productivity/vendor-evaluator
```

---

## Verwandte Inhalte

- [Leitfaden: Claude für E-Commerce-Betreiber](../guides/for-ecommerce-operator.md)
- [Workflow: Neuer Produktlaunch](../workflows/new-product-launch.md)
- [Workflow: Wöchentliche Performance-Review](../workflows/weekly-performance-review.md)
- [Workflow: Lager-Nachbestellung](../workflows/inventory-reorder.md)
