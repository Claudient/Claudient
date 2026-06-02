# Customer Success Manager Werkruimte — Projectstructuur

> Een Claude Code werkruimte voor CSM's die een klantenportefeuille beheren: onboarding, gezondheidsmonitoring, QBR-uitvoering, identificatie van uitbreidingskansen, churpreventie en verlengingsbeheer — alles aangestuurd door slash-commando's en context op accountniveau.

## Stack

- **Gainsight** (CS-platform) of **ChurnZero** — gezondheidscores, succesplannen, geautomatiseerde playbooks
- **Salesforce** of **HubSpot** — CRM, opportunity- en verlengingspijplijn, accounthiërarchie
- **Zendesk** of **Intercom** — volume van supporttickets en sentimentsignalen
- **Zoom** — klantgesprekken; opnames en transcripties worden verwerkt in accountnotities
- **Slack** — interne coördinatie van het CS-team en Slack Connect-kanalen voor klanten
- **Notion** — CS-playbooks, sjablonen voor gezamenlijke actieplannen, onboarding-runbooks

## Mappenstructuur

```
cs-workspace/
├── .claude/
│   ├── CLAUDE.md                          # werkruimte-instructies voor Claude Code
│   ├── settings.json                      # MCP-servers, hooks, machtigingen
│   └── commands/
│       ├── onboarding-plan.md             # /onboarding-plan <customer-name> — 30/60/90-dagenplan
│       ├── qbr-prep.md                    # /qbr-prep — bouwt QBR-opzet en gespreksonderwerpen
│       ├── health-check.md                # /health-check — leest gezondheidsdata, toont risico-accounts
│       ├── expansion-brief.md             # /expansion-brief — identificeert upsell-signalen per account
│       ├── churn-risk.md                  # /churn-risk — analyse van churnsignalen met response-playbook
│       ├── renewal-prep.md                # /renewal-prep — verlengingsgereedheid document met commerciële context
│       └── nps-follow-up.md              # /nps-follow-up — stelt opvolgmails op per NPS-scoreband
├── customers/
│   ├── _template/                         # kopieer deze map bij het onboarden van een nieuw account
│   │   ├── health-data.md                 # gezondheidsscorelogboek: signalen, scores, niveau (Green/Yellow/Red)
│   │   ├── meeting-notes/
│   │   │   └── YYYY-MM-DD-kickoff.md      # één bestand per vergadering, benoemd naar datum en type
│   │   ├── success-plan.md                # gezamenlijk succesplan: doelen, mijlpalen, verantwoordelijken, datums
│   │   └── renewal-tracker.md             # verlengingsdatum, ARR, uitbreidingshistorie, verlengingsgereedheid
│   ├── acme-corp/
│   │   ├── health-data.md                 # huidig gezondheidsniveau: Yellow; laatste update: 2026-05-28
│   │   ├── meeting-notes/
│   │   │   ├── 2026-01-15-kickoff.md
│   │   │   ├── 2026-03-10-qbr-q1.md
│   │   │   └── 2026-05-20-expansion-call.md
│   │   ├── success-plan.md                # overeengekomen doelen: 80% seatactivering voor Q2, 3 integraties live
│   │   └── renewal-tracker.md             # verlenging op 2026-09-01, $48K ARR, 1 open uitbreidingskans
│   ├── brightpath-inc/
│   │   ├── health-data.md                 # huidig gezondheidsniveau: Red; churnrisico: hoog
│   │   ├── meeting-notes/
│   │   │   ├── 2026-02-03-kickoff.md
│   │   │   └── 2026-04-18-save-call.md
│   │   ├── success-plan.md
│   │   └── renewal-tracker.md             # verlenging op 2026-07-15, $12K ARR, risico
│   └── novex-solutions/
│       ├── health-data.md                 # huidig gezondheidsniveau: Green; kandidaat voor uitbreiding
│       ├── meeting-notes/
│       │   ├── 2026-01-22-kickoff.md
│       │   ├── 2026-04-05-qbr-q1.md
│       │   └── 2026-05-30-expansion-brief.md
│       ├── success-plan.md
│       └── renewal-tracker.md             # verlenging op 2026-12-01, $72K ARR, uitbreiding in uitvoering
├── playbooks/
│   ├── onboarding.md                      # volledig 30/60/90-dagenrunbook voor onboarding met escalatietriggers
│   ├── expansion.md                       # upsell-aanpak: signalen, timing, gespreksrichtlijnen, bezwarenbehandeling
│   ├── churn-save.md                      # retentieplaybook per churnsignaaltype en dagen tot verlenging
│   └── qbr-delivery.md                   # QBR-facilitatiegids: agenda, spelregels, follow-upkadentie
├── templates/
│   ├── success-plan-template.md           # gezamenlijk succesplan: doelen, KPI's, mijlpalen, verantwoordelijken
│   ├── mutual-action-plan.md              # MAP voor onboarding: taken van klant en CSM naast elkaar
│   ├── ebr-deck-outline.md               # Executive Business Review deck-structuur (6 slides)
│   └── renewal-proposal.md               # verlengingsvoorstel: waardesamenvatting, prijsstelling, vervolgstappen
└── metrics/
    ├── book-health-dashboard.md           # alle accounts: naam, ARR, niveau, verlengingsdatum, laatste contact
    └── renewal-pipeline.md               # verlengingen in de komende 90/60/30 dagen met gereedheidscore
```

## Belangrijke bestanden toegelicht

| Pad | Doel |
|---|---|
| `.claude/commands/onboarding-plan.md` | Slash-commando dat `$ARGUMENTS` als klantnaam verwerkt, de accountmap leest en een op maat gemaakt 30/60/90-dagenplan voor onboarding genereert met specifieke mijlpalen |
| `.claude/commands/health-check.md` | Leest alle `customers/*/health-data.md`-bestanden en toont accounts per niveau — produceert een geprioriteerde actielijst met aanbevolen vervolgstappen per risicoaccount |
| `.claude/commands/churn-risk.md` | Kruist gezondheidsdata, dagen sinds het laatste contactmoment, verlengingsdatum en supportticketsignalen om een churnrisicobriefing met response-playbook te maken |
| `.claude/commands/renewal-prep.md` | Leest de `renewal-tracker.md`, `success-plan.md` en vergadernotities van het doelaccount om een verlengingsgereedheid document te bouwen met commerciële context en openstaande risico's |
| `customers/_template/` | Canonieke mapstructuur die bij het onboarden van een nieuw account wordt gekopieerd — zorgt voor consistentie in de gehele portefeuille |
| `metrics/book-health-dashboard.md` | Overzicht van alle accounts met ARR, gezondheidsniveau, verlengingsdatum en laatste CSM-contactmoment — de enige bron van waarheid voor de wekelijkse teamreview van CS |
| `playbooks/churn-save.md` | Retentieplaybook gesegmenteerd op signaaltype (gebruiksdaling, wisseling van executive sponsor, achterstallige factuur) en dagen tot verlenging, met specifieke gespreksrichtlijnen en escalatiepaden |
| `templates/ebr-deck-outline.md` | Executive Business Review deck-structuur: zakelijke samenvatting, geleverde waarde, statistieken vs. doelen, roadmap, openstaande punten, vervolgstappen — klaar om per account in te vullen |

## Snel scaffold

```bash
# Werkruimteroot aanmaken
mkdir -p cs-workspace/.claude/commands

# Klantenaccount-sjabloon aanmaken
mkdir -p cs-workspace/customers/_template/meeting-notes

# Mappen voor playbooks, templates en metrics aanmaken
mkdir -p cs-workspace/playbooks
mkdir -p cs-workspace/templates
mkdir -p cs-workspace/metrics

# Slash-commandobestanden aanmaken
touch cs-workspace/.claude/commands/onboarding-plan.md
touch cs-workspace/.claude/commands/qbr-prep.md
touch cs-workspace/.claude/commands/health-check.md
touch cs-workspace/.claude/commands/expansion-brief.md
touch cs-workspace/.claude/commands/churn-risk.md
touch cs-workspace/.claude/commands/renewal-prep.md
touch cs-workspace/.claude/commands/nps-follow-up.md

# Klantsjabloonbestanden aanmaken
touch cs-workspace/customers/_template/health-data.md
touch cs-workspace/customers/_template/success-plan.md
touch cs-workspace/customers/_template/renewal-tracker.md

# Metriekbestanden aanmaken
touch cs-workspace/metrics/book-health-dashboard.md
touch cs-workspace/metrics/renewal-pipeline.md

# Playbookbestanden aanmaken
touch cs-workspace/playbooks/onboarding.md
touch cs-workspace/playbooks/expansion.md
touch cs-workspace/playbooks/churn-save.md
touch cs-workspace/playbooks/qbr-delivery.md

# Sjabloonbestanden aanmaken
touch cs-workspace/templates/success-plan-template.md
touch cs-workspace/templates/mutual-action-plan.md
touch cs-workspace/templates/ebr-deck-outline.md
touch cs-workspace/templates/renewal-proposal.md

# CS-skills installeren
npx claudient add skill gtm/customer-success
npx claudient add skill gtm/mutual-success-plan
npx claudient add skill gtm/qbr-builder
npx claudient add skill gtm/health-score-analyzer
npx claudient add skill gtm/expansion-playbook
npx claudient add skill gtm/churn-prevention

# Voorbeeldaccount aanmaken vanuit sjabloon
cp -r cs-workspace/customers/_template cs-workspace/customers/acme-corp
```

## CLAUDE.md-sjabloon

```markdown
# CS Werkruimte — Claude Code Instructies

## Wat deze werkruimte is

Dit is een Customer Success Manager werkruimte. Ze bevat accountdata, gezondheidssignalen,
playbooks en sjablonen voor het beheren van een klantenportefeuille. Claude Code werkt hier
als CS-analist en schrijver — leest accountcontext om op maat gemaakte deliverables te genereren.

Alle accountdata is lokaal en vertrouwelijk. Neem nooit specifieke accountdata op in uitvoer
die buiten deze werkruimte wordt gedeeld.

## Stack

- CS-platform: Gainsight (of ChurnZero) — gezondheidscores, succesplannen, geautomatiseerde processen
- CRM: HubSpot (of Salesforce) — verlengingspijplijn, accounthiërarchie, ARR
- Support: Zendesk — ticketvolume en sentimentsignalen verwerkt in health-data.md-bestanden
- Gesprekken: Zoom — vergadertranscripties opgeslagen in customers/<account>/meeting-notes/
- Samenwerking: Slack, Notion

## Veelvoorkomende taken en exacte commando's

Een nieuwe klant onboarden:
  /onboarding-plan <customer-name>
  → Leest customers/<customer-name>/ en genereert een 30/60/90-dagenplan

Gezondheidscheck over de hele portefeuille:
  /health-check
  → Leest alle customers/*/health-data.md en produceert een geprioriteerde actielijst per niveau

Voorbereiden voor een QBR:
  /qbr-prep
  → Vraagt om klantnaam, leest de accountmap, bouwt QBR-agenda en gespreksonderwerpen

Uitbreidingskansen identificeren:
  /expansion-brief
  → Leest gezondheidsdata en vergadernotities; toont uitbreidingssignalen per account

Churnrisico beoordelen:
  /churn-risk
  → Kruist gezondheidsniveau, verlengingsdatum, laatste contactmoment en supportsignalen

Voorbereiden voor een verlenging:
  /renewal-prep
  → Leest renewal-tracker.md en success-plan.md; produceert verlengingsgereedheid document

NPS-reacties opvolgen:
  /nps-follow-up
  → Vraagt om NPS-score en verbatim; stelt opvolgmail op per scoreband

## Werkruimteconventies

- Eén map per account onder customers/ — altijd aangemaakt vanuit _template/
- Gezondheidsbestanden gebruiken drie niveaus: Green / Yellow / Red — na elk gesprek bijwerken
- Vergadernotities worden benoemd als YYYY-MM-DD-<type>.md (kickoff, qbr, expansion-call, save-call)
- De verlengingstracker wordt na elk commercieel gesprek bijgewerkt
- Het book-health-dashboard.md in metrics/ is de enige bron van waarheid voor de wekelijkse teamreview

## Accountgezondheidsniveaus

Green (score 7-10): kwartaalcontact, zoeken naar uitbreidingssignalen
Yellow (score 4-6): maandelijks check-in, blokkades identificeren en wegnemen
Red (score 1-3): wekelijkse betrokkenheid, escaleren naar CS-lead als er na 5 dagen geen reactie is

## Verboden

- Geen inhoud genereren die gedocumenteerde klantsuccescriteria tegenspreekt
- Geen uitbreiding voorstellen voordat een klant het gezondheidsniveau Green heeft bereikt
- Geen generieke QBR-sjablonen gebruiken — altijd eerst de accountmap lezen
- Geen customers/-data committen naar een extern git-repository
```

## MCP-servers

```json
{
  "mcpServers": {
    "hubspot": {
      "command": "npx",
      "args": ["-y", "@hubspot/mcp-server"],
      "env": {
        "HUBSPOT_ACCESS_TOKEN": "${HUBSPOT_ACCESS_TOKEN}"
      }
    },
    "salesforce": {
      "command": "npx",
      "args": ["-y", "@salesforce/mcp-server"],
      "env": {
        "SF_USERNAME": "${SF_USERNAME}",
        "SF_PASSWORD": "${SF_PASSWORD}",
        "SF_SECURITY_TOKEN": "${SF_SECURITY_TOKEN}",
        "SF_LOGIN_URL": "https://login.salesforce.com"
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
        "/Users/$USER/cs-workspace/customers",
        "/Users/$USER/cs-workspace/metrics"
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
            "command": "grep -q 'health tier:' \"$CLAUDE_TOOL_RESULT_FILE\" && echo '[health-check] Health tier updated — consider refreshing book-health-dashboard.md' || true"
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
            "command": "if echo \"$CLAUDE_TOOL_INPUT\" | grep -q 'customers/'; then echo '[cs-workspace] Writing to account folder — confirm account name matches directory'; fi"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "echo '[cs-workspace] Session ended. Reminder: update book-health-dashboard.md if any health tiers changed this session.'"
          }
        ]
      }
    ]
  }
}
```

## Te installeren skills

```bash
npx claudient add skill gtm/customer-success
npx claudient add skill gtm/mutual-success-plan
npx claudient add skill gtm/qbr-builder
npx claudient add skill gtm/health-score-analyzer
npx claudient add skill gtm/expansion-playbook
npx claudient add skill gtm/churn-prevention
```

## Gerelateerd

- [Customer Success Gids](../guides/for-customer-success.md)
- [QBR-uitvoering Workflow](../workflows/qbr-delivery.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
