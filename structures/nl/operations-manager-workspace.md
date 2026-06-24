# Werkruimte Operationeel Manager — Projectstructuur

> Voor een operationeel manager die bedrijfsprocessen beheert, leveranciersbeheer, teamoperaties en cross-functionele coördinatie — met Notion, Linear, Slack, Google Workspace, Zapier, Airtable en Monday.com als operationeel platform.

## Stack

- **Notion** of **Confluence** — SOP-bibliotheek, procesdocumentatie, interne wiki, runbooks
- **Linear** of **Asana** — Projectbeheer, cross-functionele initiatieven, sprint-achtig takenbeheer
- **Slack** — Teamcommunicatie, ops-kanaal, incidentthreads, escalatiekanalen voor leveranciers
- **Google Workspace** — Drive, Sheets (metriekregistratie), Docs (rapporten), Agenda (vergaderingsbegeleiding)
- **Zapier** of **Make** — Workflowautomatisering, formulier-naar-tracker pipelines, Slack-meldingsregels
- **Airtable** — Leveranciersregister, contractbeheer, OKR-dashboard, goedkeuringsworkflows
- **Monday.com** — Cross-team projectzichtbaarheid, capaciteitsplanning, roadmapweergaven
- **Claude Code** — SOP-opstelling, proceskaarten, leveranciersbeoordelingen, OKR-updates, wekelijkse ops-rapporten, extractie van vergaderactiepunten

## Mappenstructuur

```
ops-workspace/
├── .claude/
│   ├── CLAUDE.md                                  # Werkruimte-instructies (plak de onderstaande sjabloon)
│   ├── settings.json                              # MCP-servers, hooks, rechten
│   └── commands/
│       ├── sop-draft.md                           # /sop-draft — neemt procesnaam, geeft volledige SOP met rollen, stappen, uitzonderingen
│       ├── process-map.md                         # /process-map — genereert swimlane-proceskaart in Markdown + Mermaid-diagram
│       ├── vendor-review.md                       # /vendor-review — gestructureerde leveranciersbeoordeling aan de hand van SLA-criteria
│       ├── okr-update.md                          # /okr-update — OKR-voortgangsnarratie, scoring van belangrijkste resultaten, betrouwbaarheidsbeoordeling
│       ├── weekly-ops.md                          # /weekly-ops — wekelijks ops-rapport: knelpunten, successen, metrieken, cross-team signalen
│       ├── incident-sop.md                        # /incident-sop — incidentrespons-SOP voor een benoemd operationeel faaltype
│       └── meeting-actions.md                     # /meeting-actions — zet ruwe vergadernotities om naar eigenaren, acties en deadlines
├── sops/
│   ├── _template/
│   │   └── sop-template.md                        # Canoniek SOP-formaat — doel, toepassingsgebied, rollen, stappen, uitzonderingen, eigenaar
│   ├── hr/
│   │   ├── onboarding-new-hire.md                 # End-to-end onboarding-SOP voor nieuwe medewerkers met IT-, HR- en managerstappen
│   │   ├── offboarding-employee.md                # Offboarding medewerker: intrekken toegang, teruggave apparatuur, exitgesprek
│   │   └── performance-review-cycle.md            # Halfjaarlijks beoordelingsproces met tijdlijn en eigenaren
│   ├── finance/
│   │   ├── expense-approval.md                    # Indiening onkosten, goedkeuringslagen, terugbetalings-SOP
│   │   ├── invoice-processing.md                  # Intake leveranciersfactuur, goedkeuringsrouting, betalings-SOP
│   │   └── budget-request.md                      # Budgetaanvraagproces: sjabloon, beoordelingscommissie, goedkeuringsdrempels
│   ├── it/
│   │   ├── software-access-request.md             # SOP voor softwaretoegang met goedkeuringsworkflow
│   │   ├── hardware-procurement.md                # SOP van hardwareinkoopaanvraag tot levering
│   │   └── security-incident-response.md          # SOP voor escalatie en inperking van IT-beveiligingsincidenten
│   ├── ops/
│   │   ├── weekly-ops-review.md                   # Hoe de wekelijkse ops-reviewvergadering te leiden — agenda, ritme, eigenaren
│   │   ├── vendor-onboarding.md                   # Intake nieuwe leverancier: juridisch, compliance, Airtable-invoer, Slack-kanaalinrichting
│   │   ├── vendor-offboarding.md                  # Leveranciersbeëindiging: contractafsluiting, toegang intrekken, eindfactuur
│   │   └── cross-functional-project-launch.md     # Ops-checklist voor het lanceren van een nieuw cross-functioneel initiatief
│   └── compliance/
│       ├── data-retention-policy.md               # Regels voor gegevensbewaring per gegevensklasse en opslaglocatie
│       └── audit-prep-checklist.md                # SOP voor documentatie en bewijsverzameling vóór een audit
├── processes/
│   ├── _improvement-log.md                        # Doorlopend logboek van procesverbeterinitiatieven — datum, proces, wijziging, uitkomst
│   ├── hire-to-retire.md                          # Volledige proceskaart voor de medewerkerslevenscyclus met systeemkoppelingen
│   ├── procure-to-pay.md                          # Proceskaart van inkoop tot betaling: aanvraag → inkooporder → ontvangst → betaling
│   ├── incident-to-resolution.md                  # Proceskaart operationeel incident: detectie → escalatie → oplossing → postmortem
│   ├── request-to-fulfillment.md                  # Levenscyclus interne serviceverzoeken — intake, triage, uitvoering, afsluiting
│   └── idea-to-initiative.md                      # Nieuw initiatiefproces: voorstel → prioritering → kick-off → bijhouding
├── vendors/
│   ├── vendor-registry.csv                        # Hoofdleverancierslijst: naam, categorie, eigenaar, contracteinddatum, bestedingsniveau
│   ├── _review-schedule.md                        # Kwartaalkalender voor leveranciersbeoordelingen met toegewezen DRI's
│   ├── active/
│   │   ├── zapier/
│   │   │   ├── contract-summary.md                # Contractlooptijd, verlengingsdatum, prijsstelling, niveau, automatische verlengingsvlag
│   │   │   ├── sla-terms.md                       # Uptime-SLA, reactietijd support, escalatiecontacten
│   │   │   └── review-2026-q2.md                  # Q2-prestatiebeoordeling: SLA-naleving, gebruik, incidenten, verlengingsadvies
│   │   ├── airtable/
│   │   │   ├── contract-summary.md
│   │   │   ├── sla-terms.md
│   │   │   └── review-2026-q2.md
│   │   ├── monday/
│   │   │   ├── contract-summary.md
│   │   │   ├── sla-terms.md
│   │   │   └── review-2026-q2.md
│   │   └── notion/
│   │       ├── contract-summary.md
│   │       ├── sla-terms.md
│   │       └── review-2026-q1.md
│   └── offboarded/
│       └── _archive-note.md                       # Afgemelde leveranciers — bewaren voor auditspoor, niet verwijderen
├── okrs/
│   ├── _okr-format.md                             # OKR-schrijfstandaarden: doelformulering, structuur kernresultaten, betrouwbaarheidsscoring
│   ├── 2026/
│   │   ├── q1/
│   │   │   ├── company-okrs.md                    # Bedrijfsbrede OKR's voor Q1 2026 — doelstellingen, kernresultaten, DRI's
│   │   │   ├── ops-team-okrs.md                   # OKR's ops-team afgestemd op bedrijfsdoelstellingen
│   │   │   └── retrospective.md                   # Q1 OKR-retrospectief — eindscores, wat werkte, wat niet
│   │   ├── q2/
│   │   │   ├── company-okrs.md
│   │   │   ├── ops-team-okrs.md
│   │   │   └── mid-quarter-check.md               # Betrouwbaarheidsreview halverwege het kwartaal — risico's en aanpassingen
│   │   ├── q3/
│   │   │   ├── company-okrs.md                    # Concept Q3 OKR's voor planningsdoeleinden
│   │   │   └── ops-team-okrs.md
│   │   └── q4/
│   │       └── planning-notes.md                  # Vroege Q4-planningsnotities — thema's, doorlooprisico's
├── projects/
│   ├── _project-brief-template.md                 # Standaard projectbriefing: probleem, doel, scope, team, mijlpalen, risico's
│   ├── active/
│   │   ├── vendor-consolidation-2026/
│   │   │   ├── project-brief.md                   # Scope: SaaS-uitgaven verlagen door 3 overlappende tools samen te voegen
│   │   │   ├── status-update-2026-05-30.md        # Meest recente status: mijlpalen, knelpunten, benodigde beslissingen
│   │   │   └── stakeholder-map.md                 # Wie wat beheert, wie moet goedkeuren, wie wordt geïnformeerd
│   │   └── ops-handbook-launch/
│   │       ├── project-brief.md                   # Scope: bedrijfs-ops-handboek publiceren in Notion
│   │       ├── content-tracker.md                 # Eigenaarschap en voltooiingsstatus per sectie
│   │       └── status-update-2026-06-01.md
│   └── completed/
│       └── _archive-note.md                       # Voltooide projecten — bewaar briefings voor retrospectieve referentie
├── reports/
│   ├── weekly/
│   │   ├── ops-report-2026-05-26.md               # Wekelijks ops-rapport — successen, knelpunten, metrieken, cross-team signalen
│   │   ├── ops-report-2026-06-02.md               # Ops-rapport huidige week
│   │   └── _report-template.md                    # Sjabloon voor wekelijks ops-rapport met standaardsecties
│   └── monthly/
│       ├── metrics-dashboard-2026-05.md            # Maandelijkse metrieken: SLA-naleving, procesdoorlooptijden, leveranciersscores
│       ├── metrics-dashboard-2026-04.md
│       └── _dashboard-template.md                 # Sjabloon voor maandelijks metriekdashboard
└── automation/
    ├── _automation-index.md                        # Index van alle actieve automatiseringen: tool, trigger, actie, eigenaar, laatste test
    ├── zapier/
    │   ├── new-vendor-intake.md                    # Zap: Typeform → Airtable leveranciersregister → Slack #ops-vendors melding
    │   ├── sop-update-notify.md                    # Zap: Notion-pagina bewerkt in /SOPs → Slack #ops-team aankondiging
    │   ├── invoice-approval-routing.md             # Zap: e-mail financiële inbox → Linear-taak → goedkeurder Slack DM
    │   └── okr-checkin-reminder.md                 # Zap: wekelijkse Slack-herinnering → OKR-eigenaren om betrouwbaarheidsscores bij te werken
    └── make/
        ├── weekly-report-aggregator.md             # Make-scenario: Linear + Airtable-data ophalen → concept wekelijks ops-rapport
        └── vendor-sla-monitor.md                  # Make-scenario: statusbpagina's leverancier pingen → loggen in Airtable → melding bij schending
```

## Toelichting op sleutelbestanden

| Pad | Doel |
|---|---|
| `.claude/commands/sop-draft.md` | Slash-commando dat een procesnaam en context neemt en een volledige SOP genereert met doel, toepassingsgebied, RACI-tabel, stapsgewijze procedure, afhandeling van uitzonderingen en reviewcadans |
| `.claude/commands/vendor-review.md` | Slash-commando dat een leveranciersnaam en beoordelingsperiode neemt en een gestructureerde prestatiebeoordeling genereert aan de hand van SLA-voorwaarden met verlengingsadvies |
| `.claude/commands/okr-update.md` | Slash-commando dat de huidige OKR-staat en voortgangsnotities neemt en een opgemaakte OKR-statusupdate genereert met betrouwbaarheidsscores en risicosignalen per kernresultaat |
| `.claude/commands/weekly-ops.md` | Slash-commando om het wekelijks ops-rapport te genereren — bundelt successen, knelpunten, cross-team afhankelijkheden en openstaande actiepunten in een deelbaar document |
| `.claude/commands/meeting-actions.md` | Slash-commando dat ruwe vergadernotities neemt en een overzichtelijke actiepuntentabel genereert met eigenaren, beschrijvingen en deadlines |
| `sops/_template/sop-template.md` | Canonieke SOP-structuur die elk procesdocument volgt — zorgt voor consistentie over afdelingen heen en maakt SOP's leesbaar voor Claude-commando's |
| `vendors/vendor-registry.csv` | Enige bron van waarheid voor alle actieve leveranciers — naam, categorie, contracteinddatum, bestedingsniveau, DRI — stuurt het kwartaalreviewschema aan |
| `okrs/2026/q2/ops-team-okrs.md` | OKR's ops-team voor het huidige kwartaal — het live document dat wekelijks wordt bijgewerkt met betrouwbaarheidsscores naarmate het kwartaal vordert |
| `automation/_automation-index.md` | Hoofdindex van elke actieve Zapier- en Make-automatisering — voorkomt duplicatie, documenteert eigenaren en markeert automatiseringen die hertest moeten worden |
| `reports/weekly/_report-template.md` | Standaard wekelijks ops-rapportsjabloon — zorgt dat elk rapport dezelfde secties bevat zodat stakeholders weten waar ze wat kunnen vinden |

## Snelle scaffold

```bash
# Create workspace root
mkdir -p ops-workspace

# Create .claude structure with command stubs
mkdir -p ops-workspace/.claude/commands

# Create SOP directories by department
mkdir -p ops-workspace/sops/_template
mkdir -p ops-workspace/sops/hr
mkdir -p ops-workspace/sops/finance
mkdir -p ops-workspace/sops/it
mkdir -p ops-workspace/sops/ops
mkdir -p ops-workspace/sops/compliance

# Create process documentation directory
mkdir -p ops-workspace/processes

# Create vendor directory structure
mkdir -p ops-workspace/vendors/active/zapier
mkdir -p ops-workspace/vendors/active/airtable
mkdir -p ops-workspace/vendors/active/monday
mkdir -p ops-workspace/vendors/active/notion
mkdir -p ops-workspace/vendors/offboarded

# Create OKR directory structure for 2026
mkdir -p ops-workspace/okrs/2026/q1
mkdir -p ops-workspace/okrs/2026/q2
mkdir -p ops-workspace/okrs/2026/q3
mkdir -p ops-workspace/okrs/2026/q4

# Create project tracking directories
mkdir -p ops-workspace/projects/active/vendor-consolidation-2026
mkdir -p ops-workspace/projects/active/ops-handbook-launch
mkdir -p ops-workspace/projects/completed

# Create report directories
mkdir -p ops-workspace/reports/weekly
mkdir -p ops-workspace/reports/monthly

# Create automation documentation directories
mkdir -p ops-workspace/automation/zapier
mkdir -p ops-workspace/automation/make

# Seed required placeholder and index files
touch ops-workspace/vendors/vendor-registry.csv
touch ops-workspace/automation/_automation-index.md
touch ops-workspace/processes/_improvement-log.md

# Install relevant skills
npx uitkit add skill productivity/process-mapper
npx uitkit add skill productivity/sop-writer
npx uitkit add skill productivity/vendor-evaluator
npx uitkit add skill productivity/scrum-master
npx uitkit add skill small-business/weekly-pulse
npx uitkit add skill small-business/meeting-to-action

# Copy command stubs into .claude/commands/
npx uitkit add skill productivity/sop-writer --output ops-workspace/.claude/commands/sop-draft.md
npx uitkit add skill productivity/process-mapper --output ops-workspace/.claude/commands/process-map.md
npx uitkit add skill productivity/vendor-evaluator --output ops-workspace/.claude/commands/vendor-review.md
npx uitkit add skill small-business/weekly-pulse --output ops-workspace/.claude/commands/weekly-ops.md
npx uitkit add skill small-business/meeting-to-action --output ops-workspace/.claude/commands/meeting-actions.md
```

## CLAUDE.md-sjabloon

```markdown
# Werkruimte Ops Manager — Claude Code-instructies

## Wat dit is

Dit is de werkdirectory voor een operationeel manager. Het bevat alle SOP's, proceskaarten,
leveranciersgegevens, OKR's, cross-functionele projectbriefings, wekelijkse rapporten en automatiseringsdocumentatie.
Claude Code wordt gebruikt om SOP's op te stellen, leveranciersbeoordelingen uit te voeren, OKR-narratieven bij te werken,
wekelijkse ops-rapporten te genereren en actiepunten uit vergadernotities te extraheren.

## Stack

- Notion — SOP-bibliotheek en interne wiki; SOP's hier weerspiegelen Notion-pagina's in sops/
- Linear — Cross-functioneel project- en initiatiefbeheer; statussen handmatig gesynchroniseerd naar projects/
- Slack — Ops-kanaal (#ops-team), leverancierskanalen (#ops-vendors), incidentthreads
- Google Workspace — Drive voor gedeelde documenten, Sheets voor metrieken, Docs voor formele rapporten
- Zapier — Automatiseringen gedocumenteerd in automation/zapier/ — niet aanpassen zonder de index bij te werken
- Make — Scenario's gedocumenteerd in automation/make/ — complexe meerstappe automatiseringen
- Airtable — Leveranciersregister (enige bron van waarheid), OKR-dashboard, goedkeuringsworkflows
- Monday.com — Cross-team projectroadmap en capaciteitsweergaven

## Veelvoorkomende taken en exacte commando's

### Stel een nieuwe SOP op
```
/sop-draft

Process name: [bijv. "Vendor Offboarding"]
Department: [HR / Finance / IT / Ops / Compliance]
Trigger: [wat start dit proces]
Key roles involved: [lijst van rollen — geen namen]
Known steps: [puntsgewijze lijst van wat je weet — ruw is prima]
Pain points with current process: [optioneel]
```

### Genereer een proceskaart
```
/process-map

Process: [naam]
Start event: [wat triggert het proces]
End event: [hoe ziet gereed eruit]
Systems involved: [Notion, Airtable, Linear, etc.]
Key decision points: [waar vertakt het proces?]
Roles / swimlanes: [wie beheert elke baan]
```

### Voer een leveranciersbeoordeling uit
```
/vendor-review

Vendor: [naam]
Review period: [Q2 2026]
Contract terms: [plak uit vendors/active/<vendor>/contract-summary.md]
SLA commitments: [plak uit vendors/active/<vendor>/sla-terms.md]
Incidents this period: [lijst]
Usage or adoption notes: [huidig teamgebruik vs. gelicentieerde capaciteit]
Renewal date: [datum]
```

### Update OKR-status
```
/okr-update

Quarter: Q[X] [JAAR]
OKRs: [plak huidige okrs/2026/q<X>/ops-team-okrs.md]
Progress since last update: [puntsgewijze lijst van wat er is gebeurd]
Risks: [wat kan het behalen van kernresultaten verhinderen]
Confidence change: [KR's die omhoog of omlaag gaan in betrouwbaarheid?]
```

### Genereer het wekelijks ops-rapport
```
/weekly-ops

Week ending: [JJJJ-MM-DD]
Wins this week: [puntsgewijze lijst]
Blockers open: [puntsgewijze lijst met eigenaren]
Cross-team flags: [wat andere teams moeten weten of actie op moeten ondernemen]
Metrics: [SLA-naleving, openstaande incidenten, leveranciersissues, OKR-betrouwbaarheidswijzigingen]
Next week priorities: [top 3]
```

### Extraheer acties uit vergadernotities
```
/meeting-actions

Meeting: [naam en datum]
Attendees: [lijst]
Notes: [plak ruwe notities woordelijk]
```

### Schrijf een incident-SOP
```
/incident-sop

Incident type: [bijv. "Leverancier SLA-schending — Zapier-automatiseringsfout"]
Detection method: [hoe wordt dit doorgaans opgemerkt]
Immediate response: [eerste 15 minuten]
Escalation path: [wie wordt gewaarschuwd, in welke volgorde]
Resolution steps: [wat lost het op]
Postmortem: [welke documentatie is vereist achteraf]
```

## Te volgen conventies

- Elke SOP in sops/ moet de structuur in sops/_template/sop-template.md volgen — geen uitzonderingen
- SOP-bestandsnamen zijn kebab-case en beschrijven het proces, niet de afdeling (bijv. expense-approval.md, niet finance-sops.md)
- Leveranciersregister (vendors/vendor-registry.csv) wordt binnen 24u bijgewerkt bij elke leverancierswijziging — toevoegen, afmelden of contractverlenging
- Alle actieve automatiseringen staan vermeld in automation/_automation-index.md — als je een Zap of Make-scenario aanmaakt of aanpast, werk dan de index bij
- OKR-documenten gebruiken betrouwbaarheidsscores van 0–100 per kernresultaat — wekelijks bijwerken tijdens actieve kwartalen
- Wekelijkse ops-rapporten worden opgeslagen als reports/weekly/ops-report-JJJJ-MM-DD.md met de maandagdatum van die week
- Procesverbeteringswijzigingen worden gelogd in processes/_improvement-log.md — datum, betrokken proces, aangebrachte wijziging, uitkomst
- ProjectstatusUpdates worden toegevoegd als nieuwe bestanden (status-update-JJJJ-MM-DD.md) — nooit de vorige update overschrijven
- Vergaderactiepunten geëxtraheerd via /meeting-actions worden opgeslagen in de relevante projectmap of als tijdelijke notitie vóór archivering
```

## MCP-servers

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "OPENAPI_MCP_HEADERS": "{\"Authorization\": \"Bearer ntn_your_notion_integration_token\", \"Notion-Version\": \"2022-06-28\"}"
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
        "/Users/your-username/ops-workspace"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"/sops/\"; then echo \"[hook] SOP written — verify it follows sops/_template/sop-template.md structure and update the relevant Notion page to match\"; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"/vendors/active/\" && echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"contract-summary.md\"; then echo \"[hook] Contract summary updated — check vendors/vendor-registry.csv has a matching entry with the correct renewal date\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'TODAY=$(date +%A); if [ \"$TODAY\" = \"Monday\" ]; then echo \"[reminder] Monday — start this week ops report at reports/weekly/ops-report-$(date +%Y-%m-%d).md using /weekly-ops\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Te installeren skills

```bash
# Core operations skills
npx uitkit add skill productivity/process-mapper
npx uitkit add skill productivity/sop-writer
npx uitkit add skill productivity/vendor-evaluator
npx uitkit add skill productivity/scrum-master

# Reporting and meeting skills
npx uitkit add skill small-business/weekly-pulse
npx uitkit add skill small-business/meeting-to-action

# Supporting productivity skills
npx uitkit add skill productivity/stakeholder-comms
npx uitkit add skill productivity/exec-briefing
npx uitkit add skill productivity/engineering-strategy
```

## Gerelateerd

- [Gids voor Operationeel Manager](../guides/for-operations-manager.md)
- [Wekelijkse ops-reviewworkflow](../workflows/weekly-ops-review.md)
