# Account Executive Werkruimte — Projectstructuur

> Voor een AE met een quotaverantwoordelijkheid die enterprise- of mid-market-pipeline volledig beheert — van discovery tot closing — met Salesforce, Gong, DocuSign, Clari en Seismic als operationele stack.

## Stack

- **Salesforce** — CRM, kansenbeheer, activiteitenregistratie, prognose-categoriebeheer
- **Gong** — Gespreksopnames, risicoscoring van deals, export van gesprektranscripten, rep-analyses
- **DocuSign** — Contractroutering, envelop-tracking, eSignature-auditspoor
- **Clari** of **Bowtie** — AI-gestuurde prognoses, pipeline-rollup, omzetintelligentie
- **Seismic** of **Highspot** — Contentbeheer, pitch decks, ROI-calculators, battlecards
- **LinkedIn Sales Navigator** — Executive mapping, accountuitbreiding, signaalbewaking
- **Slack** — Dealrooms, managerthreads, CS-overdrachtskanalen
- **Claude Code** — MEDDPICC-scoring, RFP-opstelling, MSP-generatie, QBR-voorbereiding, prognose-prep

## Mappenstructuur

```
ae-workspace/
├── .claude/
│   ├── CLAUDE.md                        # Werkruimte-instructies (plak de onderstaande template)
│   ├── settings.json                    # MCP servers, hooks, rechten
│   └── commands/
│       ├── deal-review.md               # /deal-review — MEDDPICC-scoring + risicovlaggen per deal
│       ├── exec-alignment.md            # /exec-alignment — stakeholderkaart, draft executive-outreach
│       ├── proposal-draft.md            # /proposal-draft — volledig voorstel of RFP-sectierespons
│       ├── qbr-prep.md                  # /qbr-prep — QBR-deckopzet, metrics, verhaallijn
│       ├── negotiation-prep.md          # /negotiation-prep — BATNA-analyse, concessiematrix
│       ├── forecast-update.md           # /forecast-update — wekelijkse Commit/Best Case-rollup
│       └── close-plan.md               # /close-plan — wederzijds actieplan, mijlpalentabel
├── deals/
│   ├── _template/                       # Lege dealmap — kopieer deze bij het openen van een nieuwe kans
│   │   ├── discovery-notes.md           # Ruwe gespreksnotities, kwalificatiecriteria, MEDDPICC-concept
│   │   ├── exec-map.md                  # Stakeholderkaart — naam, functie, rol, sentiment, laatste contact
│   │   ├── close-plan.md               # Wederzijds actieplan met datums en eigenaren aan beide kanten
│   │   ├── gong-transcripts/            # Geëxporteerde Gong-gesprektranscripten (platte tekst)
│   │   │   └── .gitkeep
│   │   └── rfp-responses/               # Concepten en definitieve RFP-sectieresponsen
│   │       └── .gitkeep
│   ├── acme-corp/
│   │   ├── discovery-notes.md
│   │   ├── exec-map.md
│   │   ├── close-plan.md
│   │   ├── meddpicc-scores.md           # Lopende MEDDPICC-scoregeschiedenis (bijgewerkt bij elke review)
│   │   ├── negotiation-log.md           # Concessiegeschiedenis, redlines, deal desk-notities
│   │   ├── gong-transcripts/
│   │   │   ├── 2026-05-14-discovery.txt
│   │   │   ├── 2026-05-28-demo.txt
│   │   │   └── 2026-06-01-negotiation.txt
│   │   └── rfp-responses/
│   │       ├── section-3-security.md
│   │       ├── section-5-integrations.md
│   │       └── executive-summary.md
│   ├── beta-industries/
│   │   ├── discovery-notes.md
│   │   ├── exec-map.md
│   │   └── close-plan.md
│   └── gamma-systems/
│       ├── discovery-notes.md
│       ├── exec-map.md
│       ├── close-plan.md
│       └── gong-transcripts/
│           └── 2026-06-02-eval-review.txt
├── templates/
│   ├── proposal-template.md             # Herbruikbare voorstelsstructuur — samenvatting, ROI, voorwaarden
│   ├── rfp-response-template.md         # RFP-antwoordraamwerk — vereiste, respons, bewijs
│   ├── close-plan-template.md           # Wederzijds actieplan met standaard mijlpaalfasen
│   ├── mutual-action-plan.md            # MAP voor deals in de eindfase — mijlpalen, eigenaren, datums
│   ├── executive-outreach-template.md   # Koud/warm contact met economische beslisser of C-suite
│   ├── qbr-deck-outline.md              # QBR-diastructuur — bedrijfsreview, doelen, volgend kwartaal
│   └── champion-enablement-package.md   # Intern verkoopkit voor champion om intern te delen
├── competitive/
│   ├── battlecard-competitor-a.md       # Positionering concurrent A, bezwaren, winnende thema's
│   ├── battlecard-competitor-b.md       # Positionering concurrent B, bezwaren, winnende thema's
│   ├── competitive-positioning.md       # Hoofdnarratie voor differentiatie — kwartaalmatig bijgewerkt
│   └── win-loss-notes.md               # Lopend logboek van context bij gewonnen/verloren deals per concurrent
├── metrics/
│   ├── quota-tracker.md                 # Wekelijkse quotabereiking: gesloten, pipeline, achterstand op doel
│   ├── pipeline-health.md              # Dekkingsratio, fasevedeling, lijst met verouderde deals
│   ├── forecast-log.md                 # Wekelijks Commit vs. werkelijk — prognose-nauwkeurigheidsgeschiedenis
│   └── deal-cycle-benchmarks.md        # Gemiddelde dagen per fase, sluitingspercentages per segment/grootte
└── scratch/
    ├── weekly-prep.md                   # Conceptruimte voor voorbereiding van prognosegesprek en dealreview
    └── call-notes-staging.md            # Ruwe notities na een gesprek, voordat ze naar de dealmap gaan
```

## Toelichting op sleutelbestanden

| Pad | Doel |
|---|---|
| `.claude/commands/deal-review.md` | Slash-commando dat een dealnaam en context accepteert en een gescoord MEDDPICC-oordeel, risicovlaggen en aanbevolen prognosecategorie teruggeeft |
| `.claude/commands/exec-alignment.md` | Slash-commando om het aankoopcomité in kaart te brengen, het sentiment van elke stakeholder te scoren en executive multi-threading outreach te draften |
| `.claude/commands/proposal-draft.md` | Slash-commando dat een volledig voorstel of specifieke RFP-sectie genereert — neemt koperscriteria en productdifferentiators als invoer |
| `.claude/commands/negotiation-prep.md` | Slash-commando voor BATNA-analyse, concessiematrix en walk-awaycondities voorafgaand aan een commercieel onderhandelingsgesprek |
| `deals/_template/` | Lege mapstructuur om te kopiëren wanneer een nieuwe kans in de pipeline wordt gekwalificeerd — zorgt voor consistente documentatie over alle deals |
| `deals/acme-corp/meddpicc-scores.md` | Lopende geschiedenis van MEDDPICC-scores die na elke dealreview worden bijgewerkt — bijhoudt scoreontwikkeling en risicopatronen tijdens de dealcyclus |
| `templates/mutual-action-plan.md` | Gezamenlijk plan gericht op de koper, gedeeld in de evaluatiefase — mijlpalen, wederzijdse verplichtingen en overeengekomen sluitingsdatum |
| `metrics/forecast-log.md` | Wekelijks Commit vs. werkelijk gesloten — gebruikt om prognose-nauwkeurigheid bij te houden en sandbagging- of overcommitpatronen te signaleren |

## Snelle opzet

```bash
# Maak de werkruimtemap aan
mkdir -p ae-workspace

# Maak .claude-structuur aan
mkdir -p ae-workspace/.claude/commands

# Maak dealsmappen aan
mkdir -p ae-workspace/deals/_template/gong-transcripts
mkdir -p ae-workspace/deals/_template/rfp-responses
mkdir -p ae-workspace/deals/acme-corp/gong-transcripts
mkdir -p ae-workspace/deals/acme-corp/rfp-responses
mkdir -p ae-workspace/deals/beta-industries
mkdir -p ae-workspace/deals/gamma-systems/gong-transcripts

# Maak template-, competitive-, metrics- en scratchmappen aan
mkdir -p ae-workspace/templates
mkdir -p ae-workspace/competitive
mkdir -p ae-workspace/metrics
mkdir -p ae-workspace/scratch

# Voeg .gitkeep-placeholders in
touch ae-workspace/deals/_template/gong-transcripts/.gitkeep
touch ae-workspace/deals/_template/rfp-responses/.gitkeep

# Installeer GTM-skills
npx claudient add skill gtm/deal-desk
npx claudient add skill gtm/deal-review
npx claudient add skill gtm/rfp-responder
npx claudient add skill gtm/commercial-forecaster
npx claudient add skill gtm/qbr-builder
npx claudient add skill gtm/channel-economics
npx claudient add skill gtm/champion-builder
npx claudient add skill gtm/mutual-success-plan

# Kopieer commando-stubs naar .claude/commands/
npx claudient add skill gtm/deal-review --output ae-workspace/.claude/commands/deal-review.md
npx claudient add skill gtm/rfp-responder --output ae-workspace/.claude/commands/proposal-draft.md
npx claudient add skill gtm/qbr-builder --output ae-workspace/.claude/commands/qbr-prep.md
npx claudient add skill gtm/commercial-forecaster --output ae-workspace/.claude/commands/forecast-update.md
npx claudient add skill gtm/mutual-success-plan --output ae-workspace/.claude/commands/close-plan.md
```

## CLAUDE.md-template

```markdown
# AE-werkruimte — Claude Code-instructies

## Wat dit is

Dit is de werkmap voor een Account Executive die een pipeline met quotaverantwoordelijkheid beheert.
Deals worden bijgehouden in deals/, templates staan in templates/ en concurrentieverkenning in competitive/.
Alle MEDDPICC-scoring, prognoses, RFP-opstelling en QBR-voorbereiding verloopt via Claude Code-skills.

## Stack

- Salesforce — CRM als bron van waarheid (kans, contact, activiteit)
- Gong — Gespreksintelligentie; transcripten geëxporteerd naar deals/<account>/gong-transcripts/
- DocuSign — Contractroutering; sla envelop-ID's op in deals/<account>/negotiation-log.md
- Clari — Prognose-rollup; wekelijkse snapshots gelogd in metrics/forecast-log.md
- Seismic — Contentrepository; verwijs naar decknamen en versies in voorstellen
- LinkedIn Sales Navigator — Executive mapping; documenteer contacten in exec-map.md
- Slack — Dealroom-updates; plak relevante threads in de dealmap-context

## Veelvoorkomende taken en exacte commando's

### Een deal scoren met MEDDPICC
```
/deal-review

Deal: [dealnaam]
Stage: [fase]
ACV: $[bedrag]
Close date: [datum]
Context: [plak discovery-notities of Gong-transcript]
```

### Een voorstel of RFP-sectie opstellen
```
/proposal-draft

RFP question: [plak letterlijk]
Buyer priority: [specifiek pijnpunt dat deze vraag aanpakt]
Our differentiator: [wat wij hebben dat concurrenten niet hebben]
Word limit: [indien opgegeven]
```

### Een wederzijds actieplan opstellen
```
/close-plan

Deal: [naam], ACV: $[bedrag], Target close: [datum]
Champion: [naam, functie], Economic buyer: [naam, functie]
Remaining steps: [wat beide partijen nog moeten doen voor ondertekening]
```

### Voorbereiding voor prognosegesprek
```
/forecast-update

My pipeline: [plak deallijst met fase, ACV, sluitingsdatum, prognosecategorie]
Weekly quota: $[X] new ARR
Flag: deals at risk in Commit, Best Case deals ready to promote, deals to defer
```

### Voorbereiding voor een QBR
```
/qbr-prep

Quarter: Q[X] [JAAR]
Closed won: $[X] ARR, [N] deals
Pipeline entering Q[X+1]: $[Y] ARR across [N] deals
Top 3 wins: [dealnamen en waarom ze zijn gesloten]
Top risk: [wat is de grootste achterstand op het quota van het volgende kwartaal?]
```

### Executives in kaart brengen vóór multi-threading
```
/exec-alignment

Account: [bedrijf]
Known contacts: [lijst met functies en laatste interacties]
Target: [functie van executive die ik moet bereiken — CEO, CFO, CTO, enz.]
Ask: [wat ik van hen nodig heb — executive sponsor, ondertekenaar, technische goedkeuring]
```

### Voorbereiding voor een onderhandelingsgesprek
```
/negotiation-prep

Deal: [naam], ACV: $[lijstprijs], Offered: $[huidig aanbod]
Concessions already made: [lijst]
Buyer's stated blockers: [prijs / voorwaarden / tijdlijn / inkoopproces]
Walk-away condition: [de grens die ik niet zal overschrijden]
```

## Te volgen conventies

- Elke dealmap moet discovery-notes.md, exec-map.md en close-plan.md bevatten voordat de deal als Evaluatie wordt gemarkeerd
- MEDDPICC-scores staan in deals/<account>/meddpicc-scores.md — voeg toe na elke dealreview, nooit overschrijven
- Gong-transcripten gaan naar deals/<account>/gong-transcripts/ als platte .txt-bestanden, benoemd als YYYY-MM-DD-[onderwerp].txt
- Het prognoselogboek wordt elke vrijdag bijgewerkt in metrics/forecast-log.md — Commit-totaal, Best Case-totaal, werkelijk gesloten
- Onderhandelingsconcessies worden chronologisch gelogd in deals/<account>/negotiation-log.md
- Alle voorstellen en RFP-responsen worden opgeslagen in deals/<account>/rfp-responses/ vóór verzending
- Competitive battlecards in competitive/ worden aan het begin van elk kwartaal beoordeeld en bijgewerkt
```

## MCP-servers

```json
{
  "mcpServers": {
    "salesforce": {
      "command": "npx",
      "args": ["-y", "@salesforce/mcp-server"],
      "env": {
        "SF_LOGIN_URL": "https://login.salesforce.com",
        "SF_USERNAME": "your-sf-username@company.com",
        "SF_PASSWORD": "your-sf-password",
        "SF_TOKEN": "your-security-token"
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
        "/Users/your-username/ae-workspace"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"meddpicc-scores.md\"; then echo \"[hook] MEDDPICC score updated at $(date +%Y-%m-%dT%H:%M) — check forecast-log.md for weekly roll-up\"; fi'"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"close-plan.md\"; then echo \"[hook] Writing close plan — confirm exec-map.md and discovery-notes.md are current before sharing with buyer\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'TODAY=$(date +%A); if [ \"$TODAY\" = \"Friday\" ]; then echo \"[reminder] Friday — update metrics/forecast-log.md with this week Commit vs. actual before EOD\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Te installeren skills

```bash
# Kernvaardigheden voor AE-dealbeheer
npx claudient add skill gtm/deal-desk
npx claudient add skill gtm/deal-review
npx claudient add skill gtm/rfp-responder
npx claudient add skill gtm/commercial-forecaster
npx claudient add skill gtm/qbr-builder
npx claudient add skill gtm/channel-economics
npx claudient add skill gtm/champion-builder
npx claudient add skill gtm/mutual-success-plan

# Ondersteunende GTM-skills
npx claudient add skill gtm/crm-hygiene
npx claudient add skill gtm/revenue-operations
npx claudient add skill gtm/expansion-playbook
npx claudient add skill gtm/email-automation

# Installeer alle GTM-skills tegelijk
npx claudient add skills gtm
```

## Gerelateerd

- [Account Executive-gids](../guides/for-account-executive.md)
- [AE-dealcyclus-workflow](../workflows/ae-deal-cycle.md)
- [Deal-screening-workflow](../workflows/deal-screening.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
