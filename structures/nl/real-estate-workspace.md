# Real Estate Agent Workspace — Projectstructuur

> Voor een residentieel of commercieel makelaar die verkoopobjecten, kopers, verkopers, aanbiedingen en sluitingspijplijnen end-to-end beheert — van eerste contact tot gefinancierde transactie — met Follow Up Boss, DocuSign, MLS/RPR en Google Workspace als operatieve stack.

## Stack

- **Follow Up Boss** of **Wise Agent** — CRM, leadroutering, pijplijnfasen, drip campaigns, taakautomatisering
- **Zillow Premier Agent** / **Realtor.com** — Verkoopobjectportals, leadcapture, showingaanvragen, marktbereik
- **DocuSign** — Koopovereenkomsten, verkoopovereenkomsten, addendaroutering, eSignature audittrail
- **Google Workspace** — Gmail (clientemailthreads), Google Drive (bestandsopslag), Google Agenda (showings)
- **RPR (Realtors Property Resource)** of **MLS** — Marktgegevens, comp pulls, CMAs, buurtstatistieken
- **BombBomb** — Videoemail voor verkoopobjectaankondigingen, koperrondleidingssamenvattingen, aanbiedingspresentatievervolg
- **Canva** — Nieuw-vermeld flyers, sociale-mediaafbeeldingen, koperpresentatiedekks, verkoopobjectbrochures
- **Claude Code** — Verkoopobjecttekst, CMA-narratief, aanbiedingsconcepten, clientopvolgmails, showingsamenvattingen

## Mappenstructuur

```
real-estate-workspace/
├── .claude/
│   ├── CLAUDE.md                              # Werkruimteinstructies (plak de sjabloon hieronder)
│   ├── settings.json                          # MCP-servers, hooks, machtigingen
│   └── commands/
│       ├── listing-create.md                  # /listing-create — MLS-gereed beschrijving + marketingkopie van eigenschapdetails
│       ├── cma-report.md                      # /cma-report — vergelijkende analysenarratief + prijsadvies
│       ├── offer-draft.md                     # /offer-draft — koopovereenkomstdekkingsmail + aanbiedingsstrategiesamenvatting
│       ├── client-followup.md                 # /client-followup — gepersonaliseerde opvolgmail vanuit CRM-notities
│       ├── showing-notes.md                   # /showing-notes — gestructureerde showingfeedback van ruwe notities
│       ├── market-update.md                   # /market-update — buurtmarktmomentopname voor clientverzorging
│       └── buyer-package.md                   # /buyer-package — koperpresentatiedekkoverzicht + zoekcriteria doc
├── listings/
│   ├── active/
│   │   ├── _template/                         # Blanco verkoopobjectmap — kopieren wanneer een nieuw verkoopobject live gaat
│   │   │   ├── mls-data.md                    # MLS-invoerblad: slaapkamers, badkamers, m², perceel, bouwjaar, kenmerken
│   │   │   ├── marketing-copy.md              # Kop, MLS-beschrijving, sociaalschrift, email-onderwerpvarianten
│   │   │   ├── showing-feedback/              # Map voor per-showingfeedbackbestanden
│   │   │   │   └── .gitkeep
│   │   │   ├── photos/                        # Fotobestandsindex en onderschriften (bestandsnamen, geen binaries)
│   │   │   │   └── photo-index.md
│   │   │   └── price-history.md               # Vraagprijs, wijzigingsdatum, reden voor wijziging
│   │   ├── 42-maple-st-springfield/
│   │   │   ├── mls-data.md
│   │   │   ├── marketing-copy.md
│   │   │   ├── price-history.md               # €489K → €475K op 2026-05-10 (dagen op markt: 21)
│   │   │   ├── listing-agreement.md           # Overeenkomstdatum, vervaldatum, commissiesplitsing, dubbele agentschapclausule
│   │   │   ├── showing-feedback/
│   │   │   │   ├── 2026-05-03-showing.md      # Buyeragent, koperreactie, bezwaren, belangstellingsniveau
│   │   │   │   ├── 2026-05-07-showing.md
│   │   │   │   └── 2026-05-14-showing.md
│   │   │   └── photos/
│   │   │       └── photo-index.md
│   │   └── 110-river-rd-unit-4b/
│   │       ├── mls-data.md
│   │       ├── marketing-copy.md
│   │       ├── price-history.md
│   │       ├── listing-agreement.md
│   │       └── showing-feedback/
│   │           └── .gitkeep
│   └── past/
│       ├── 2025-closed/
│       │   ├── 78-elm-ave-westfield/
│       │   │   ├── mls-data.md
│       │   │   ├── final-sale-price.md        # Vraagprijs, verkoopprijs, dagen op markt, gegeven concessies
│       │   │   └── closing-notes.md           # Titelbedrijf, sluitingsdatum, netto voor verkoper, lessen
│       │   └── 203-birch-ln-lakewood/
│       │       ├── mls-data.md
│       │       ├── final-sale-price.md
│       │       └── closing-notes.md
│       └── 2024-closed/
│           └── .gitkeep
├── buyers/
│   ├── _template/
│   │   ├── buyer-profile.md                   # Namen, contactinformatie, geldgever, voorgoedkeuringsbedrag, timeline
│   │   ├── search-criteria.md                 # Slaapkamers, badkamers, prijsklasse, buurten, must-haves, dealbreakers
│   │   ├── showing-history.md                 # Log van getoonde huizen: adres, datum, reactie, rangschikking
│   │   └── offer-history.md                   # Ingediende aanbiedingen: adres, bedrag, voorwaarden, uitkomst
│   ├── chen-family/
│   │   ├── buyer-profile.md                   # Voorgoedkeurd €620K, conventioneel, 20% aanbetaling, geldgever: First National
│   │   ├── search-criteria.md                 # 3BR+ Northside/Eastbrook, schooldistrictprioriteit, garage vereist
│   │   ├── showing-history.md
│   │   │   # 2026-05-01 — 42 Maple St: hield van indeling, bezwaar tegen achtertuingrootte
│   │   │   # 2026-05-09 — 18 Oak Ct: sterke interesse, HOA-bezorgdheid
│   │   └── offer-history.md
│   │       # 2026-05-12 — 18 Oak Ct: €598K, 10-daagse inspectie, afgewezen door verkoper
│   ├── rodriguez-patricia/
│   │   ├── buyer-profile.md
│   │   ├── search-criteria.md
│   │   ├── showing-history.md
│   │   └── offer-history.md
│   └── kim-david/
│       ├── buyer-profile.md
│       ├── search-criteria.md
│       ├── showing-history.md
│       └── offer-history.md
├── sellers/
│   ├── _template/
│   │   ├── seller-profile.md                  # Namen, contactinformatie, verkoopbeweging, timeline, eigendomsschatting
│   │   ├── cma.md                             # Vergelijkende analyse: actieve, openstaande, verkochte + prijsadvies
│   │   ├── listing-agreement.md               # Overeenkomstvoorwaarden, vervaldatum, uitzonderingen, dubbele agentschapopenbaarmaking
│   │   └── price-change-history.md            # Log van vraagprijsverlagingen met datums en rationale
│   ├── johnson-mark-and-linda/
│   │   ├── seller-profile.md                  # 42 Maple St — verhuizing, moet sluiten op 1 aug
│   │   ├── cma.md                             # CMA uitgevoerd 2026-04-20, aanbevolen €489K–€499K
│   │   ├── listing-agreement.md
│   │   └── price-change-history.md
│   └── torres-carlos/
│       ├── seller-profile.md
│       ├── cma.md
│       ├── listing-agreement.md
│       └── price-change-history.md
├── templates/
│   ├── listing-description-template.md        # Kop + body formule voor MLS, Zillow en sociale media
│   ├── buyer-offer-letter-template.md         # Persoonlijke aanbiedingsbrief van koper — bouwt emotionele verbinding
│   ├── neighborhood-summary-template.md       # Loopbare voorzieningen, schoolbeoordelingen, pendel, markttrend snapshot
│   ├── market-update-template.md              # Maandelijkse email: nieuwe verkoopobjecten, gemiddelde DOM, lijst-verkoopverhouding, prognose
│   ├── showing-feedback-request-template.md   # Email naar buyeragent met verzoek om specifieke feedback na showing
│   ├── price-reduction-announcement.md        # Email + sociaal schrift voor aankondiging vraagprijsverlaging
│   └── open-house-followup-template.md        # Zelfde-dag opvolging naar open-housedeelnemers met CTA
├── contracts/
│   ├── purchase-agreements/
│   │   ├── residential-purchase-agreement-ca.md    # Californië RPA — belangrijkste velden, voorwaardestandardwaarden, timeline
│   │   ├── residential-purchase-agreement-tx.md    # Texas TREC One-to-Four Family Residential — belangrijkste velden
│   │   └── commercial-purchase-agreement.md        # LOI naar PSA-stroom, standaard due-diligenceperiode
│   ├── addenda/
│   │   ├── inspection-contingency-removal.md       # Voorwaardeopszeggingstiming en standaardtaal
│   │   ├── loan-contingency-addendum.md            # Leningtype, LTV, rentedak, opzeggingsdatum
│   │   ├── seller-rent-back-addendum.md            # Verhuurvoorwaarden, dagelijks tarief, borgsom
│   │   └── as-is-addendum.md                       # As-is openbaarmaking, koperacceptatietaal
│   └── disclosure-packets/
│       ├── seller-property-questionnaire.md        # SPQ-belangrijkste secties om met verkoper te bespreken vóór aanbieding
│       └── transfer-disclosure-statement.md        # TDS-velden, rode-vlaggenchecklist voor agenten
├── marketing/
│   ├── email-templates/
│   │   ├── just-listed-announcement.md        # Naar sfeer + vorige clients — aankondiging nieuw verkoopobject
│   │   ├── under-contract-social-proof.md     # Aankondiging aan sfeer bouwende momentum
│   │   ├── just-sold-case-study.md            # E-mail na afsluiting met verkoopprijs, DOM, lessen
│   │   └── quarterly-market-report-email.md   # Q[X] marktstatistieken + je productiesamenvatting
│   ├── social-posts/
│   │   ├── listing-launch-post.md             # Instagram/Facebook-onderschrift voor nieuw verkoopobject
│   │   ├── sold-announcement-post.md          # Sociaalbewijspost met agentstatistieken
│   │   └── market-tip-series.md              # 5-delige educatieve postserie voor verzorging
│   └── video-scripts/
│       ├── listing-tour-intro.md              # BombBomb-script — eigendomsintro voor koperkandidaten
│       ├── offer-presentation-script.md       # Video naar verkoper met aanbiedingsvoorwaarden en aanbeveling
│       └── buyer-check-in-script.md           # Wekelijkse videotouchpoint voor actieve kopercliënten
├── reports/
│   ├── monthly-production-report.md           # Gesloten volume, actieve verkoopobjecten, kopercliënten, gemiddelde DOM, commissie
│   ├── pipeline-tracker.md                    # Alle actieve kopers + verkoopobjecten per fase: actief, onder contract, hangende
│   ├── lead-source-tracker.md                 # Leads per bron (Zillow, verwijzing, open huis) en conversiesnelheid
│   └── quarterly-review.md                    # Q[X] doelen vs. actuals, topwinsten, aanpassingen voor volgende kwartaal
└── scratch/
    ├── weekly-priorities.md                   # Maandagconcept: top 3 verkoopobjecten, top 3 kopers, vervolgitems
    └── call-notes-staging.md                  # Ruwe post-callnotities vóór indienen bij koper- of verkopermap
```

## Belangrijke bestanden uitgelegd

| Pad | Doel |
|---|---|
| `.claude/commands/listing-create.md` | Slash-command die ruwe eigenschapdetails (slaapkamers, badkamers, kenmerken, verkooppunten) neemt en MLS-gereed beschrijving, kopvarianten en sociaalschriften in één keer retourneert |
| `.claude/commands/cma-report.md` | Slash-command die comps van RPR of MLS neemt en een gestructureerd CMA-narratief met prijsadvies en betrouwbaarheidsniveau retourneert |
| `.claude/commands/offer-draft.md` | Slash-command die koperprofiel, doeleigendom en aanbiedingsvoorwaarden neemt en een dekkingsmail, persoonlijke aanbiedingsbrief en agent-naar-agent-bericht voor indiening retourneert |
| `.claude/commands/client-followup.md` | Slash-command die een koper- of verkoopernaam, laatste interactie en volgende stap neemt, en vervolgens een gepersonaliseerde opvolgmail in de stem van de agent opstelt |
| `.claude/commands/showing-notes.md` | Slash-command die ruwe post-showingnotities converteert naar een gestructureerd feedbackbestand met koperreactie, bezwaren, belangstellingsscore en aanbevolen volgende stap |
| `listings/active/_template/` | Canonieke mapstructuur om te kopiëren wanneer een nieuw verkoopobject actief wordt — zorgt ervoor dat elk verkoopobject MLS-gegevens, marketingkopie, showingfeedback en prijsgeschiedenis op één plaats heeft |
| `sellers/<name>/cma.md` | CMA-run voor elke verkopercliënt — slaat compkeuze, prijsbereikredenering en eindbeslissing op; bijgewerkt als marktomstandigheden vóór prijsvaststelling verschuiven |
| `reports/pipeline-tracker.md` | Enige waarheid voor alle actieve deals per fase — beoordeeld elke maandagochtend om vervolgitems te prioriteren en deals met risico van uitval te markeren |

## Snelle steiger

```bash
# Maak de werkruimteroot
mkdir -p real-estate-workspace

# Maak .claude-structuur met commands
mkdir -p real-estate-workspace/.claude/commands

# Maak verkoopobjectstructuur
mkdir -p real-estate-workspace/listings/active/_template/showing-feedback
mkdir -p real-estate-workspace/listings/active/_template/photos
mkdir -p real-estate-workspace/listings/active/42-maple-st-springfield/showing-feedback
mkdir -p real-estate-workspace/listings/active/42-maple-st-springfield/photos
mkdir -p real-estate-workspace/listings/active/110-river-rd-unit-4b/showing-feedback
mkdir -p real-estate-workspace/listings/past/2025-closed/78-elm-ave-westfield
mkdir -p real-estate-workspace/listings/past/2025-closed/203-birch-ln-lakewood
mkdir -p real-estate-workspace/listings/past/2024-closed

# Maak koperstructuur
mkdir -p real-estate-workspace/buyers/_template
mkdir -p real-estate-workspace/buyers/chen-family
mkdir -p real-estate-workspace/buyers/rodriguez-patricia
mkdir -p real-estate-workspace/buyers/kim-david

# Maak verkooperstructuur
mkdir -p real-estate-workspace/sellers/_template
mkdir -p real-estate-workspace/sellers/johnson-mark-and-linda
mkdir -p real-estate-workspace/sellers/torres-carlos

# Maak sjablonen, contracten, marketing, verslagen, krabbels
mkdir -p real-estate-workspace/templates
mkdir -p real-estate-workspace/contracts/purchase-agreements
mkdir -p real-estate-workspace/contracts/addenda
mkdir -p real-estate-workspace/contracts/disclosure-packets
mkdir -p real-estate-workspace/marketing/email-templates
mkdir -p real-estate-workspace/marketing/social-posts
mkdir -p real-estate-workspace/marketing/video-scripts
mkdir -p real-estate-workspace/reports
mkdir -p real-estate-workspace/scratch

# Zaad .gitkeep placeholders
touch real-estate-workspace/listings/active/_template/showing-feedback/.gitkeep
touch real-estate-workspace/listings/past/2024-closed/.gitkeep
touch real-estate-workspace/buyers/_template/.gitkeep
touch real-estate-workspace/sellers/_template/.gitkeep

# Installeer vastgoedvaardigheden
npx uitkit add skill small-business/real-estate-listing
npx uitkit add skill small-business/cma-report
npx uitkit add skill small-business/buyer-offer-writer
npx uitkit add skill marketing/email-sequence
npx uitkit add skill gtm/crm-hygiene

# Kopieer commandstubs naar .claude/commands/
npx uitkit add skill small-business/real-estate-listing --output real-estate-workspace/.claude/commands/listing-create.md
npx uitkit add skill small-business/cma-report --output real-estate-workspace/.claude/commands/cma-report.md
npx uitkit add skill small-business/buyer-offer-writer --output real-estate-workspace/.claude/commands/offer-draft.md
npx uitkit add skill marketing/email-sequence --output real-estate-workspace/.claude/commands/client-followup.md
```

## CLAUDE.md sjabloon

```markdown
# Real Estate Agent Workspace — Claude Code-instructies

## Wat dit is

Dit is de werkmap voor een makelaar die actieve verkoopobjecten, kopercliënten,
verkopercliënten, contracten en marketing beheert. Verkoopobjecten staan in listings/, koperbestanden in buyers/,
verkooperbestanden in sellers/, en herbruikbare items in templates/ en contracts/.
Alle verkoopobjecttekst, CMAs, aanbiedingsconcepten, clientopvolgingen en marketupdates gaan door Claude Code-vaardigheden.

## Stack

- Follow Up Boss — CRM van record (leads, pijplijnfasen, drip campaigns, taken)
- DocuSign — Contractroutering; track envelop-ID's in de relevante verkoopobject- of kopeermap
- RPR / MLS — Marktgegevens; plak comptabellen in de relevante cma.md vóór het uitvoeren van /cma-report
- Google Drive — Langetermijnbestandsarchief; sync gesloten dealfolders na financiering
- BombBomb — Videoemail; scripts staan in marketing/video-scripts/
- Canva — Marketingafbeeldingen; referentieontwerpen in marketing/social-posts/
- Zillow / Realtor.com — Verkoopobjectportals; noteer portaal-ID's in mls-data.md voor elk verkoopobject

## Veelgebruikte taken en exacte commands

### Een nieuwe verkoopobjectbeschrijving maken
```
/listing-create

Address: [straatwoonplaats]
Property type: [eengezins / condo / multi-family / commercieel]
Beds: [N] | Baths: [N] | Sqft: [N] | Lot: [N sqft of acres] | Year built: [YYYY]
Garage: [yes/no, N-car] | Pool: [yes/no] | HOA: [yes/no, $X/mo]
Upgrades: [lijst belangrijkste renovaties of kenmerken]
Selling points: [locatievoordeel, schooldistrict, pendel, levensstijl]
Price: $[X]
Tone: [luxury / family-friendly / investment / starter home]
```

### Een CMA uitvoeren en een prijsadvies krijgen
```
/cma-report

Subject property: [adres, slaapkamers, badkamers, m², perceel, bouwjaar, staat]
Active comps: [list 2-4 with address, list price, beds/baths/sqft, DOM]
Pending comps: [list 1-3 with address, list price, beds/baths/sqft]
Sold comps (last 90 days): [list 3-5 with address, sale price, close date, beds/baths/sqft, DOM]
Adjustments needed: [pool, garage, condition, lot size — note differences]
Market trend: [appreciating / flat / softening — and by how much per month]
```

### Een aanbiedingsinzendings-pakket opstellen
```
/offer-draft

Property: [adres]
Buyer: [voornamen voor persoonlijke brief]
Offer price: $[X] | List price: $[Y]
Down payment: [%] | Loan type: [conventional / FHA / VA / cash]
Earnest money: $[X]
Inspection contingency: [yes/no, N days]
Loan contingency: [yes/no, N days]
Appraisal contingency: [yes/no]
Close of escrow: [datum of N dagen]
Seller rent-back: [yes/no, N days at $X/day]
Personal letter angle: [iets echts over de koper en waarom ze dit huis leuk vinden]
Competing offers: [yes/no — adjust urgency accordingly]
```

### Een clientopvolgmail schrijven
```
/client-followup

Client: [naam(en)]
Client type: [koper / verkoper]
Last interaction: [datum en wat er gebeurde — showing, telefoongesprek, aanbieding ingediend, enz.]
Their current status: [actief zoeken / onder contract / aanbiedingsvoorbereiding / wachten op aanbieding]
Next step needed: [wat u van hen nodig hebt of wat u wilt dat zij weten]
Tone: [reassuring / excited / informative / urgent]
```

### Log en structureer showingnotities
```
/showing-notes

Property shown: [adres]
Buyer: [naam]
Date: [YYYY-MM-DD]
Raw notes: [plak je spraakmemorrandum transcriptie of bulletpoints verbatim]
Buyer's agent feedback (if received): [plak of vat samen]
```

### Conceptversie voor clientverzorging
```
/market-update

Neighborhood: [naam]
Date range: [bijv. mei 2026]
New listings: [N at avg $X]
Sold: [N at avg $X, avg DOM Y days]
List-to-sale ratio: [X%]
Inventory level: [N maanden voorrraad]
Trend: [buyer's market / balanced / seller's market]
Audience: [past clients / active buyers / sphere of influence]
```

### Een koperpresentatiepakket maken
```
/buyer-package

Buyer names: [voornamen]
Pre-approval: $[X] | Lender: [naam]
Target neighborhoods: [list]
Search criteria: [slaapkamers, badkamers, must-haves, dealbreakers]
Timeline: [wanneer willen ze erin]
First-time buyer: [yes/no]
```

## Conventies om te volgen

- Elk actief verkoopobject moet mls-data.md en marketing-copy.md hebben voordat het live op MLS gaat
- Elk showing krijgt een feedbackbestand in listings/active/<adres>/showing-feedback/ genoemd YYYY-MM-DD-showing.md
- Elke kopercliënt moet buyer-profile.md, search-criteria.md, showing-history.md en offer-history.md hebben
- CMA-bestanden staan in sellers/<naam>/cma.md — voeg een nieuw gedeelte toe als een herhaalde run nodig is; niet overschrijven
- Wijzigingen van verkoopobjectprijs worden geregistreerd in listings/active/<adres>/price-history.md met datum en reden
- Gesloten deals verhuizen van listings/active/ naar listings/past/YYYY-closed/ binnen 5 dagen na financiering
- Aanbiedingsinzendingen worden geregistreerd in buyers/<naam>/offer-history.md — adres, bedrag, voorwaarden en uitkomst opnemen
- pipeline-tracker.md wordt elke maandag beoordeeld en bijgewerkt met huidige fase voor elk actief bestand
- Alle contractaddenda worden opgeslagen in contracts/addenda/ en in de relevante dealmap op naam verwezen
```

## MCP-servers

```json
{
  "mcpServers": {
    "google-drive": {
      "command": "npx",
      "args": ["-y", "@google/mcp-server-gdrive"],
      "env": {
        "GDRIVE_CLIENT_ID": "your-google-oauth-client-id",
        "GDRIVE_CLIENT_SECRET": "your-google-oauth-client-secret",
        "GDRIVE_REFRESH_TOKEN": "your-google-refresh-token"
      }
    },
    "gmail": {
      "command": "npx",
      "args": ["-y", "@google/mcp-server-gmail"],
      "env": {
        "GMAIL_CLIENT_ID": "your-google-oauth-client-id",
        "GMAIL_CLIENT_SECRET": "your-google-oauth-client-secret",
        "GMAIL_REFRESH_TOKEN": "your-google-refresh-token"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropic-ai/mcp-server-filesystem",
        "/Users/your-username/real-estate-workspace"
      ]
    }
  }
}
```

## Aanbevolen hooks

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"showing-feedback\"; then echo \"[hook] Showing notes saved — remember to log buyer reaction in buyers/<name>/showing-history.md and follow up within 24 hours\"; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"offer-history\"; then echo \"[hook] Offer logged — update pipeline-tracker.md stage and set a follow-up task in Follow Up Boss\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'TODAY=$(date +%A); if [ \"$TODAY\" = \"Monday\" ]; then echo \"[reminder] Monday — review reports/pipeline-tracker.md and update every active listing and buyer to current stage\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Vaardigheden om te installeren

```bash
# Kernvaardigheden voor vastgoed
npx uitkit add skill small-business/real-estate-listing
npx uitkit add skill small-business/cma-report
npx uitkit add skill small-business/buyer-offer-writer

# Marketing- en verzorgingsvaardigheden
npx uitkit add skill marketing/email-sequence
npx uitkit add skill marketing/social-content-writer
npx uitkit add skill marketing/video-script-writer

# CRM- en exploitatievaardigheden
npx uitkit add skill gtm/crm-hygiene
npx uitkit add skill productivity/client-followup
npx uitkit add skill productivity/weekly-review
```

## Gerelateerde

- [Real estate agent guide](../guides/for-real-estate-agent.md)
- [Listing launch workflow](../workflows/listing-launch.md)
- [Buyer tour workflow](../workflows/buyer-tour-cycle.md)
