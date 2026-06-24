# E-commerce-Operator-Arbeitsbereich — Projektstruktur

> Fur DTC-Marken-Betreiber mit einem Shopify-Storefront, die Claude fur tagliche Listing-Optimierung, Kampagnenerstellung, Kundendienst-Vorlagen, Lieferantenkommunikation und Leistungsberichte uber den gesamten Stack einsetzen mochten.

## Stack

- Shopify (Storefront, Inventar, Bestellungen, Metafelder)
- Klaviyo (E-Mail- und SMS-Flows, Segmente, Kampagnen)
- Meta Ads Manager + Google Ads (bezahlte Akquise)
- Triple Whale oder Northbeam (Multi-Touch-Attribution, MER, nCAC)
- Gorgias (Support-Tickets, Makros, CSAT)
- ShipBob oder Flexport (3PL-Fulfillment, Sendungsverfolgung, Rucksendungen)
- QuickBooks Online (GuV, COGS, Abstimmung)
- Slack (Teamkommunikation, Alert-Routing)

---

## Verzeichnisstruktur

```
ecommerce-workspace/
├── .claude/
│   ├── settings.json                    # MCP-Server, Hooks, Berechtigungen
│   └── commands/
│       ├── listing-optimizer.md         # Schreibt Produkttitel, Beschreibung und SEO-Meta neu
│       ├── email-campaign.md            # Entwirft Klaviyo-Kampagnentexte mit Betreffvarianten
│       ├── ad-copy.md                   # Erstellt Meta- und Google-Anzeigentexte
│       ├── returns-policy.md            # Entwirft oder aktualisiert die Ruckgaberichtlinie
│       ├── supplier-update.md           # Erstellt Lieferanten-Nachfass- oder Nachbestellungs-E-Mails
│       ├── weekly-performance.md        # Fasst Kanal-ROAS, CAC und Top-SKUs zusammen
│       └── inventory-alert.md           # Kennzeichnet SKUs unterhalb der Nachbestellschwelle
├── CLAUDE.md                            # Arbeitsbereichsanweisungen (siehe Vorlage unten)
├── products/
│   ├── active/
│   │   ├── sku-overview.csv             # SKU-Masterliste mit Handle, Titel, Preis, Kosten, Status
│   │   ├── descriptions/
│   │   │   ├── product-copy-template.md # Markenstimme und Struktur fur alle PDPs
│   │   │   ├── seasonal-refresh-log.md  # Was wurde wann aktualisiert, nach SKU
│   │   │   └── [slug].md                # Eine Datei pro Produkt (z. B. cotton-tote-natural.md)
│   │   └── seo/
│   │       ├── meta-titles.csv          # Aktuelles Title-Tag und vorgeschlagene Varianten pro Produkt
│   │       ├── meta-descriptions.csv    # 155-Zeichen-Meta-Beschreibungen pro Produkt
│   │       └── keyword-targets.md       # Primares und sekundares Keyword-Mapping nach Kollektion
│   ├── drafts/
│   │   └── new-product-brief-template.md # Pre-Launch-Checkliste fur neue SKUs
│   └── archived/
│       └── discontinued-skus.csv        # Eingestellte Produkte mit Abkundigungsgrund
├── campaigns/
│   ├── email/
│   │   ├── briefs/
│   │   │   ├── campaign-brief-template.md   # Zielgruppe, Ziel, Angebot, CTA, Versanddatum
│   │   │   ├── 2026-q2-mothers-day.md
│   │   │   └── 2026-q3-back-to-school.md
│   │   ├── copy/
│   │   │   ├── welcome-series.md            # Texte fur den 3-E-Mail-Onboarding-Flow
│   │   │   ├── abandoned-cart.md            # 2-stufige Abandoned-Cart-Sequenz
│   │   │   ├── post-purchase.md             # Bewertungsanfrage und Upsell-Flow
│   │   │   └── win-back-90d.md              # Win-back-Flow fur 90-Tage-inaktive Kaufer
│   │   └── results/
│   │       └── klaviyo-campaign-log.csv     # Kampagnenname, Versanddatum, OR, CTR, Umsatz
│   └── paid-ads/
│       ├── briefs/
│       │   ├── ad-brief-template.md         # Angebot, Zielgruppe, Hook, CTA, Budget, Plattform
│       │   ├── 2026-q2-prospecting-meta.md
│       │   └── 2026-q2-branded-search-gads.md
│       ├── copy/
│       │   ├── meta-primary-text.md         # Hook-Varianten (5+) fur Meta-Primartexte
│       │   ├── meta-headlines.md            # Uberschriften-Varianten fur Meta
│       │   ├── google-rsa-headlines.md      # 15 Uberschriften fur Google RSA
│       │   └── google-rsa-descriptions.md   # 4 Beschreibungen fur Google RSA
│       └── results/
│           └── attribution-notes.md         # Triple Whale / Northbeam-Anomalien und Entscheidungen
├── customer-service/
│   ├── templates/
│   │   ├── response-library.md          # 20+ Makro-Entwurfe nach Ticket-Typ
│   │   ├── where-is-my-order.md         # WISMO-Makro mit Platzhalter fur Tracking-Link
│   │   ├── damaged-item.md              # Antwort bei Schaden + Ersatzlieferungs-Flow
│   │   ├── wrong-item.md                # Falscher Artikel erhalten — Losungsvorlage
│   │   └── subscription-cancel.md       # Bindungsangebot + Kundigungsbestatigung
│   ├── policies/
│   │   ├── returns-policy.md            # Aktuelle kundenseitige Ruckgaberichtlinie
│   │   ├── shipping-policy.md           # Spediteur-SLAs, internationale Regelungen, Einschlussdaten
│   │   └── refund-matrix.md             # Interner Entscheidungsbaum fur Sonderfalle
│   └── gorgias/
│       └── macro-import-template.csv    # Gorgias-formatierte CSV fur Massen-Makro-Upload
├── suppliers/
│   ├── vendor-directory.md              # Lieferantenname, Kontakt, Lieferzeit, MOQ, Konditionen
│   ├── po-template.md                   # Bestellvorlage mit allen Pflichtfeldern
│   ├── reorder-tracker.csv              # SKU, Lieferant, letztes Bestelldatum, nachstes Bestelldatum
│   └── comms/
│       ├── supplier-update-template.md  # Standard-Nachfass-E-Mail-Vorlage
│       └── [supplier-name]/
│           └── po-history.md            # Verlauf von Bestellungen und Bestatiigungen pro Lieferant
├── reports/
│   ├── weekly/
│   │   ├── weekly-performance-template.md   # Blended ROAS, CAC, AOV, CR, Top-SKUs
│   │   └── 2026-w22-performance.md
│   ├── monthly/
│   │   ├── monthly-pl-template.md           # Umsatz, COGS, Bruttomarge, Werbeausgaben, Netto
│   │   ├── channel-performance-template.md  # Shopify vs. Groshandel vs. Amazon pro Monat
│   │   └── 2026-05-monthly.md
│   └── attribution/
│       └── triple-whale-export-notes.md     # So lesen Sie die Exporte, bekannte Abweichungen
└── sops/
    ├── new-product-launch.md            # End-to-End-Checkliste: Brief → Listing → Ads → E-Mail
    ├── inventory-reorder.md             # Auslosebedingungen, Lieferantenkontakt, Lieferzeitpuffer
    ├── returns-processing.md            # ShipBob-Rucksendungsworkflow → Einlagern oder Abschreiben
    ├── ad-account-audit.md              # Wochentliche Checkliste fur bezahlte Medien
    ├── klaviyo-health-check.md          # Listenpflege, Zustellbarkeit, Flow-Audit-Rhythmus
    └── end-of-month-close.md            # QuickBooks-Abstimmung mit Shopify-Auszahlungen
```

---

## Wichtige Dateien erlautert

| Pfad | Zweck |
|---|---|
| `.claude/commands/listing-optimizer.md` | Slash-Befehl: nimmt ein Produkt-Handle oder Rohdaten entgegen und gibt in Markenstimme umgeschriebenen Titel, Beschreibung und Meta-Tags aus |
| `.claude/commands/weekly-performance.md` | Slash-Befehl: nimmt eingefugte Triple Whale- oder Northbeam-Zusammenfassung entgegen und erstellt eine strukturierte Darstellung fur Stakeholder |
| `products/active/sku-overview.csv` | Einzige Wahrheitsquelle fur alle aktiven SKUs — diese Datei Claude ubergeben, wenn Listing- oder Inventaraufgaben durchgefuhrt werden |
| `campaigns/email/copy/welcome-series.md` | Entworfener 3-E-Mail-Willkommens-Flow — hier bearbeiten, dann in den Klaviyo-Flow-Editor einfugen |
| `customer-service/policies/refund-matrix.md` | Interner Entscheidungsbaum, den Claude bei der Erstellung von Makroantworten fur Sonderfalle verwendet |
| `suppliers/vendor-directory.md` | Lieferantenkontakte und Konditionen — Claude liest diese Datei, bevor eine Lieferantenkommunikation verfasst wird |
| `reports/weekly/weekly-performance-template.md` | Strukturierte Vorlage, die Claude jeden Montag aus eingefugten Plattformexporten ausfullt |
| `sops/new-product-launch.md` | Die Checkliste, die Claude abarbeitet, wenn eine neue SKU vom Brief bis zur Veroffentlichung geht |

---

## Schnelles Einrichten

```bash
# Arbeitsbereich und alle Unterverzeichnisse anlegen
mkdir -p ecommerce-workspace/.claude/commands
mkdir -p ecommerce-workspace/products/active/descriptions
mkdir -p ecommerce-workspace/products/active/seo
mkdir -p ecommerce-workspace/products/drafts
mkdir -p ecommerce-workspace/products/archived
mkdir -p ecommerce-workspace/campaigns/email/briefs
mkdir -p ecommerce-workspace/campaigns/email/copy
mkdir -p ecommerce-workspace/campaigns/email/results
mkdir -p ecommerce-workspace/campaigns/paid-ads/briefs
mkdir -p ecommerce-workspace/campaigns/paid-ads/copy
mkdir -p ecommerce-workspace/campaigns/paid-ads/results
mkdir -p ecommerce-workspace/customer-service/templates
mkdir -p ecommerce-workspace/customer-service/policies
mkdir -p ecommerce-workspace/customer-service/gorgias
mkdir -p ecommerce-workspace/suppliers/comms
mkdir -p ecommerce-workspace/reports/weekly
mkdir -p ecommerce-workspace/reports/monthly
mkdir -p ecommerce-workspace/reports/attribution
mkdir -p ecommerce-workspace/sops

# UitKit-Skills installieren
npx uitkit add skill small-business/shopify-operations
npx uitkit add skill small-business/ecommerce-seller
npx uitkit add skill small-business/product-listing-optimizer
npx uitkit add skill small-business/returns-handler
npx uitkit add skill marketing/email-sequence
npx uitkit add skill marketing/paid-ads
npx uitkit add skill marketing/page-cro

# UitKit-Slash-Befehle in .claude/commands/ installieren
npx uitkit add command listing-optimizer
npx uitkit add command email-campaign
npx uitkit add command ad-copy
npx uitkit add command returns-policy
npx uitkit add command supplier-update
npx uitkit add command weekly-performance
npx uitkit add command inventory-alert

# Platzhalter-CLAUDE.md anlegen
touch ecommerce-workspace/CLAUDE.md

# Wichtige CSV- und Vorlagendateien anlegen
touch ecommerce-workspace/products/active/sku-overview.csv
touch ecommerce-workspace/suppliers/vendor-directory.md
touch ecommerce-workspace/suppliers/reorder-tracker.csv
```

---

## CLAUDE.md-Vorlage

```markdown
# E-commerce-Operator-Arbeitsbereich

Dies ist ein Claude Code-Arbeitsbereich fur den Betrieb einer DTC-Marke auf Shopify. Claude unterstutzt
bei der Produktlisting-Optimierung, Kampagnentexten, Kundendienst-Vorlagen, Lieferantenkommunikation
und wochentlichem Leistungsreporting. Alle Aufgaben sind operativer Natur — es liegt kein Anwendungscode hier.

---

## Stack

- Shopify — Storefront, Inventar, Bestellungen
- Klaviyo — E-Mail- und SMS-Kampagnen und Flows
- Meta Ads Manager + Google Ads — bezahlte Akquise
- Triple Whale (oder Northbeam) — Attribution, MER, Blended ROAS
- Gorgias — Kundensupport-Tickets und Makros
- ShipBob (oder Flexport) — 3PL-Fulfillment und Rucksendungen
- QuickBooks Online — GuV, COGS, Abstimmung

---

## Verzeichniskonventionen

- `products/active/` — alle aktiven SKUs; Beschreibungen hier bearbeiten, bevor sie zu Shopify ubertragen werden
- `campaigns/` — Briefs in `briefs/`, fertige Texte in `copy/`
- `customer-service/policies/` — einzige Wahrheitsquelle fur alle kundenseitigen Richtlinientexte
- `suppliers/comms/[supplier-name]/` — ein Ordner pro Lieferant fur den Bestellverlauf
- `reports/weekly/` — eine Datei pro Woche, benannt nach `YYYY-Www-performance.md`
- `sops/` — operative Checklisten, die Claude Schritt fur Schritt abarbeitet

---

## Haufige Aufgaben — genaue Befehle

### Produktlisting neu schreiben
/listing-optimizer
Aktuellen Shopify-Produkttitel, Beschreibung, Preis und Ziel-Keywords einfugen.
Claude gibt einen neu geschriebenen Titel (≤70 Zeichen), eine PDP-Beschreibung (nutzenorientiert, 150-200 Worter)
sowie Meta-Titel und Meta-Beschreibung zuruckk, direkt zum Einfugen in Shopify bereit.

### E-Mail-Kampagne entwerfen
/email-campaign
Angeben: Kampagnenziel, Klaviyo-Zielsegment, Angebot oder Hook, Versanddatum.
Claude gibt 2 Betreffzeilen-Varianten (A/B), Vorschautext und vollstandigen Body-Text zuruck.

### Anzeigentexte erstellen
/ad-copy
Angeben: Plattform (Meta oder Google), Kampagnenziel, Produkt oder Angebot, Zielgruppe.
Meta-Ausgabe: 5 Primartext-Hooks + 5 Uberschriften. Google-Ausgabe: 15 RSA-Uberschriften + 4 Beschreibungen.

### Ruckgaberichtlinie aktualisieren
/returns-policy
Benotigte Anderung beschreiben (z. B. "Ruckgabefrist fur Feiertagsbestellungen von 30 auf 45 Tage verlangern").
Claude schreibt den betroffenen Abschnitt neu und weist auf Folgeauswirkungen auf die Erstattungsmatrix hin.

### Lieferanten-E-Mail entwerfen
/supplier-update
Angeben: Lieferantenname, Bestellnummer oder Produkt, Problem oder Anfrage.
Claude liest Kontaktdaten aus `suppliers/vendor-directory.md` und verfasst eine professionelle E-Mail.

### Wochentlichen Leistungsbericht erstellen
/weekly-performance
Wochentlichen Triple Whale- oder Northbeam-Zusammenfassungsexport einfugen.
Claude gibt eine strukturierte Darstellung mit Blended ROAS, nCAC, MER, Top-5-SKUs nach Umsatz
und einer empfohlenen Massnahme zuruck.

### Inventarwarnung ausloseen
/inventory-alert
SKU-Liste mit aktuellen Lagerbestanden einfugen.
Claude kennzeichnet alle SKUs unterhalb der Nachbestellschwelle in `suppliers/reorder-tracker.csv`
und erstellt eine Nachbestellempfehlung.

---

## Konventionen

- Markenstimme ist [MARKENTON EINTRAGEN: z. B. "direkt, warmherzig, nie aufdrlinglich"]. Auf alle Texte anwenden.
- Produktbeschreibungen beginnen mit dem Kundennutzen, nicht mit dem Merkmal.
- Alle Geldbetra in USD, sofern nicht anders angegeben.
- Lieferanten-E-Mails sind professionell und praknant — kein Fulltext.
- Wochentliche Berichte folgen exakt der Vorlage in `reports/weekly/weekly-performance-template.md`.
- `products/archived/` nicht bearbeiten — eingestellte SKUs sind schreibgeschutzte Datensatze.
- Wenn sich eine Richtliniendatei andert, Datum und Grund am Anfang dieser Datei vermerken.
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
        "/path/to/ecommerce-workspace"
      ]
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
            "command": "bash -c 'if [[ \"$CLAUDE_TOOL_OUTPUT_PATH\" == */reports/weekly/* ]]; then echo \"[hook] Weekly report written: $CLAUDE_TOOL_OUTPUT_PATH\" >> .claude/report-log.txt; fi'"
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
            "command": "bash -c 'if [[ \"$CLAUDE_TOOL_INPUT_PATH\" == */customer-service/policies/* ]]; then cp \"$CLAUDE_TOOL_INPUT_PATH\" \"${CLAUDE_TOOL_INPUT_PATH}.bak\" 2>/dev/null; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'echo \"Session ended at $(date)\" >> .claude/session-log.txt'"
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
npx uitkit add skill small-business/ecommerce-seller
npx uitkit add skill small-business/product-listing-optimizer
npx uitkit add skill small-business/returns-handler
npx uitkit add skill marketing/email-sequence
npx uitkit add skill marketing/paid-ads
npx uitkit add skill marketing/page-cro
```

---

## Verwandte Ressourcen

- [Leitfaden: Claude fur E-commerce-Betreiber](../guides/for-ecommerce-operator.md)
- [Workflow: Neues Produkt launchen](../workflows/new-product-launch.md)
- [Workflow: Wochentliche Leistungsauswertung](../workflows/weekly-performance-review.md)
