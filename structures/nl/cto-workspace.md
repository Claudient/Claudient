# CTO / VP Engineering Werkruimte — Projectstructuur

> Voor een CTO of VP Engineering die een engineeringorganisatie leidt: architectuurbeslissingen, technische roadmap, werving, teamgezondheid, incident-reviews, leveranciersevaluatie en bestuursrapportage — alles aangestuurd vanuit één Claude Code werkruimte.

## Stack

- Linear — tickets, projectopvolging, kwartaalroadmap
- GitHub — code, PRs, engineeringmetrieken via GitHub Insights
- Datadog — observability, SLOs, incidentmonitoring, dashboards
- PagerDuty — wachtschema's, incidentmeldingen, postmortem-triggers
- Notion — strategiedocumenten, teamwiki's, beslissingslogboeken
- Lattice of Leapsome — prestatiebeoordelingen, 1:1-notities, betrokkenheidsenquêtes
- Greenhouse — vacatures, kandidatenpipelines, interviewscorecards
- Slack — asynchrone communicatie, incident war rooms, standups

## Directorystructuur

```
cto-workspace/
├── .claude/
│   ├── CLAUDE.md                        # Werkruimte-instructies voor Claude Code
│   ├── settings.json                    # Rechten, hooks, MCP-configuratie
│   └── commands/
│       ├── arch-review.md               # Architectuurreview — afwegingenanalyse, risico's, ADR-concept
│       ├── hiring-plan.md               # Wervingsplan — roldefinitie, tijdlijn, budgetschatting
│       ├── incident-review.md           # Postmortem-sjabloon — tijdlijn, grondoorzaak, actiepunten
│       ├── team-health.md               # Teamgezondheidsoverzicht — moraal, snelheid, verlooprisico
│       ├── vendor-eval.md               # Leveranciersevaluatiematrix — criteriaScoring, aanbeveling
│       ├── eng-metrics.md               # Engineeringmetrieken-rapport — DORA, cycle time, dekking
│       ├── board-update.md              # Bestuursupdate — technische gezondheid, risico's, roadmapvoortgang
│       └── build-vs-buy.md              # Bouwen of kopen-analyse — kosten, risico, aanbeveling
├── decisions/                           # Architecture Decision Records (ADRs)
│   ├── README.md                        # ADR-index en statuslegende
│   ├── adr-template.md                  # Canoniek ADR-sjabloon
│   ├── 0001-monorepo-vs-polyrepo.md     # Geaccepteerd — monorepo met Turborepo
│   ├── 0002-service-mesh-selection.md   # Geaccepteerd — Istio op GKE
│   ├── 0003-event-streaming-platform.md # Geaccepteerd — Kafka boven SQS voor volgordegaran ties
│   ├── 0004-auth-provider.md            # Voorgesteld — vergelijking Auth0 vs Clerk
│   └── 0005-data-warehouse.md           # Concept — BigQuery vs Snowflake
├── roadmap/
│   ├── q3-2025-tech-roadmap.md          # Kwartaalroadmap — initiatieven, verantwoordelijken, mijlpalen
│   ├── q4-2025-tech-roadmap.md          # Concept voor volgend kwartaal
│   ├── 2025-annual-tech-plan.md         # Jaarlijkse engineeringstrategie en investeringsgebieden
│   ├── tech-vision-2026.md              # Vooruitblikkend visiedocument voor 18 maanden
│   └── initiative-tracker.md           # Actieve initiatieven met status en blokkades
├── hiring/
│   ├── headcount-plan-2025.md           # Goedgekeurde formatie, budget, tijdlijn per rol
│   ├── job-descriptions/
│   │   ├── staff-engineer.md            # Functieprofiel — Staff Software Engineer
│   │   ├── senior-sre.md                # Functieprofiel — Senior Site Reliability Engineer
│   │   ├── em-platform.md              # Functieprofiel — Engineering Manager, Platform
│   │   └── principal-architect.md       # Functieprofiel — Principal Architect
│   ├── interview-rubrics/
│   │   ├── system-design-rubric.md      # Beoordelingshandleiding voor systeemontwerpronden
│   │   ├── coding-rubric.md             # Beoordelingshandleiding voor coderingsronden
│   │   ├── leadership-rubric.md         # Beoordelingshandleiding voor EM/principal gedragsinterviews
│   │   └── staff-calibration.md        # Kalibratienotities voor het staff-niveau
│   └── pipeline-notes/
│       ├── active-roles.md              # Huidige openstaande functies en trechtermetrieken
│       └── offer-log.md                 # Aanbiedingshistorie, salarisschalen, acceptatiegraden
├── incidents/
│   ├── postmortem-template.md           # Canoniek postmortem-sjabloon
│   ├── 2025-06-01-payments-outage.md    # P0 — betalingsdienst 47 minuten niet beschikbaar
│   ├── 2025-05-14-data-pipeline-lag.md  # P1 — ingestie-achterstand veroorzaakte verouderde dashboarddata
│   ├── 2025-04-22-cert-expiry.md        # P2 — TLS-certificaat verlopen op staging-proxy
│   └── action-items-tracker.md         # Openstaande opvolgpunten uit alle postmortems
├── metrics/
│   ├── eng-kpis-dashboard.md            # DORA-metrieken, cycle time, implementatiefrequentie
│   ├── reliability-scorecard.md         # SLO-behaling per service, foutbudgetverbruik
│   ├── on-call-burden.md               # Meldingen per engineer, fout-positiefpercentage, MTTRS
│   ├── pr-health.md                     # PR-reviewtijd, verouderde PRs, bijdragerdistributie
│   └── quarterly-report-q2-2025.md     # Kwartaalsgewijs gecompileerde metrieken voor het bestuurspakket
├── org/
│   ├── team-structure.md                # Huidig organogram — teams, tech leads, EMs
│   ├── capacity-plan-q3.md              # Analyse formatie vs werkcapaciteit
│   ├── skill-matrix.md                  # Engineeringcompetentiekaart per team
│   ├── succession-plan.md               # Sleutelpersoonrisico's en plaatsvervangende verantwoordelijken
│   └── team-health-surveys/
│       ├── q1-2025-results.md           # Lattice pulse-resultaten en thema's
│       └── q2-2025-results.md           # Samenvatting van de meest recente enquête
└── vendors/
    ├── evaluation-template.md           # Standaard leveranciersscoringmatrix
    ├── datadog-vs-grafana-cloud.md      # Afgeronde evaluatie — Datadog gekozen
    ├── launchdarkly-vs-flagsmith.md     # Afgeronde evaluatie — LaunchDarkly gekozen
    ├── okta-vs-auth0.md                 # In behandeling
    └── approved-vendor-list.md          # Huidige leveranciers, contractdatums, verlengingsverantwoordelijken
```

## Belangrijke bestanden toegelicht

| Pad | Doel |
|---|---|
| `.claude/commands/arch-review.md` | Slash-opdracht die context uit `decisions/` haalt en een gestructureerde afwegingenanalyse met een ADR-concept klaar voor registratie produceert |
| `.claude/commands/board-update.md` | Slash-opdracht die `metrics/quarterly-report-*.md` en `roadmap/` compileert tot een bestuursklare samenvatting van technische gezondheid |
| `.claude/commands/incident-review.md` | Slash-opdracht die een postmortem opbouwt vanuit een PagerDuty-incident-ID, de tijdlijn invult en betrokken services opsomt |
| `decisions/adr-template.md` | Canoniek ADR-sjabloon: context, beslissingsfactoren, overwogen opties, beslissing, gevolgen, status |
| `roadmap/q3-2025-tech-roadmap.md` | Levende kwartaalroadmap met initiatiefverantwoordelijken, mijlpalen, afhankelijkheden en risico's — wekelijks bijgewerkt |
| `metrics/eng-kpis-dashboard.md` | DORA-metrieken, cycle time, implementatiefrequentie en wijzigingsfaalpercentage gecompileerd vanuit GitHub + Datadog |
| `org/capacity-plan-q3.md` | Formatie-vs.-leveringscapaciteitsmodel: teamsnelheid, gepland werk, lacuneanalyse, wervingsbehoeften |
| `incidents/postmortem-template.md` | Standaard postmortem met ernst, tijdlijn, grondoorzaak, bijdragende factoren, actiepunten en toewijzing van verantwoordelijken |
| `vendors/evaluation-template.md` | Gewogen scoringmatrix voor leveranciersevaluaties: criteria, gewichten, scores per leverancier, aanbevelingssectie |
| `hiring/headcount-plan-2025.md` | Door het bestuur goedgekeurd formatieplan met rol, team, startkwartaal, volledige kosten en wervingsstatus per rij |

## Snel scaffold

```bash
# Werkruimte-root aanmaken
mkdir -p cto-workspace
cd cto-workspace

# .claude-structuur aanmaken
mkdir -p .claude/commands

# Werkruimtedirectories aanmaken
mkdir -p decisions
mkdir -p roadmap
mkdir -p hiring/job-descriptions
mkdir -p hiring/interview-rubrics
mkdir -p hiring/pipeline-notes
mkdir -p incidents
mkdir -p metrics
mkdir -p org/team-health-surveys
mkdir -p vendors

# Sleutelbestanden aanmaken
touch decisions/README.md decisions/adr-template.md
touch roadmap/initiative-tracker.md
touch hiring/headcount-plan-2025.md
touch incidents/postmortem-template.md incidents/action-items-tracker.md
touch metrics/eng-kpis-dashboard.md metrics/reliability-scorecard.md
touch org/team-structure.md org/capacity-plan-q3.md org/skill-matrix.md
touch vendors/evaluation-template.md vendors/approved-vendor-list.md

# Claude Code-skills installeren
npx claudient add skill productivity/engineering-strategy
npx claudient add skill productivity/adr-writer
npx claudient add skill productivity/tech-debt-tracker
npx claudient add skill productivity/build-optimization
npx claudient add skill productivity/vendor-evaluator
npx claudient add skill devops-infra/platform-engineering
npx claudient add skill devops-infra/monorepo

# Slash-opdrachten installeren
npx claudient add command arch-review
npx claudient add command hiring-plan
npx claudient add command incident-review
npx claudient add command team-health
npx claudient add command vendor-eval
npx claudient add command eng-metrics
npx claudient add command board-update
npx claudient add command build-vs-buy
```

## CLAUDE.md-sjabloon

```markdown
# CTO / VP Engineering Werkruimte

Deze werkruimte ondersteunt het werk van technisch leiderschap: architectuurbeslissingen, technische
roadmap, werving, teamgezondheid, incident-reviews, leveranciersevaluatie en bestuursrapportage.

---

## Wat dit is

Een gestructureerde Claude Code werkruimte voor een CTO of VP Engineering. Elke directory correspondeert met een
specifieke leiderschapsverantwoordelijkheid. Claude Code leest context uit deze bestanden om nauwkeurige,
organisatiespecifieke resultaten te produceren — geen algemene adviezen.

---

## Stack

- Linear — tickets en kwartaalroadmap (MCP: linear)
- GitHub — code, PRs, org-metrieken (MCP: github)
- Datadog — SLOs, observability, wachtdienstdata
- PagerDuty — incidentmeldingen en postmortem-triggers
- Notion — strategiedocumenten en teamwiki's
- Lattice / Leapsome — prestatiebeoordelingen en betrokkenheidsenquêtes
- Greenhouse — wervingspipeline en interviewscorecards
- Slack — asynchrone communicatie en incident war rooms (MCP: slack)

---

## Directoryconventies

- `decisions/` — Alle ADRs staan hier. Gebruik opeenvolgende ID's (0001, 0002). Status: Voorgesteld | Geaccepteerd | Verouderd | Vervangen.
- `roadmap/` — Één bestand per kwartaal. Archiveren na afsluiting van het kwartaal. `initiative-tracker.md` blijft actueel.
- `hiring/` — Functiebeschrijvingen gaan in `job-descriptions/`, interviewrubrics in `interview-rubrics/`. Nooit persoonlijke kandidaatgegevens hier opslaan.
- `incidents/` — Één bestand per incident. Bestandsnaamformaat: `YYYY-MM-DD-korte-beschrijving.md`. Actiepunten altijd in `action-items-tracker.md` registreren.
- `metrics/` — Ruwe metrieksnapshots en gecompileerde rapporten. Kwartaalrapporten voeden rechtstreeks bestuursrapportages.
- `org/` — Teamstructuur, capaciteitsplannen, vaardighedenmatrix. `team-structure.md` bijwerken telkens wanneer rapportagelijnen wijzigen.
- `vendors/` — Één evaluatiebestand per beslissing. Afgeronde evaluaties archiveren; `approved-vendor-list.md` actueel houden.

---

## Veelvoorkomende taken — exacte opdrachten

### Architectuurbeslissingen
```
/arch-review — Plak de beslissingscontext. Claude stelt een afwegingenanalyse op en een ADR klaar voor registratie in decisions/.
/adr-writer  — ADR vanaf nul opstellen. Vraagt om context, opties en gevolgen.
```

### Werving
```
/hiring-plan    — Produceert een roldefinitie, interviewstructuur en formatiejustificatie voor een nieuwe functie.
/tech-interview-kit — Genereert coderingsuitdagingen, systeemontwerponderwerpen en beoordelingsrubrics voor een specifieke rol.
```

### Incidenten
```
/incident-review — Plak PagerDuty-incident-ID of tijdlijn. Genereert postmortem-concept met grondoorzaak en actiepunten.
```

### Teamgezondheid
```
/team-health — Vat enquêteresultaten, verloopsignalen en moraalindicatoren samen in een leiderschapsactieplan.
```

### Leveranciers
```
/vendor-eval   — Gestructureerde leveranciersevaluatie op basis van gewogen criteria. Produceert een aanbevelingsmemo.
/build-vs-buy  — Bouwen-of-kopen-analyse: kosten, risico, strategische fit, time-to-value, aanbeveling.
```

### Metrieken en rapportage
```
/eng-metrics   — Compileert DORA-metrieken, cycle time en SLO-data tot een rapport over de engineeringsgezondheid.
/board-update  — Stelt kwartaalsamenvatting van technische gezondheid, roadmapvoortgang en risicoregister samen voor het bestuur.
```

---

## Conventies die Claude moet volgen

- Bij het opstellen van ADRs altijd het sjabloon in `decisions/adr-template.md` gebruiken — geen eigen structuur bedenken.
- Bij het verwijzen naar metrieken eerst uit `metrics/`-bestanden putten. Geen cijfers verzinnen.
- Postmortems zijn schuldvrij. Nooit schuld toewijzen aan een individu in `incidents/`.
- Formatie- en beloningsdata in `hiring/headcount-plan-2025.md` zijn vertrouwelijk — niet opnemen in bestuursrapportages tenzij uitdrukkelijk gevraagd.
- Roadmap-mijlpalen in `roadmap/` zijn de enige bron van waarheid — niet tegenspreken in samenvattingen.
- Alle leveranciersevaluaties moeten een gewogen scoretabel bevatten vóór een aanbeveling.
```

## MCP-servers

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "linear": {
      "command": "npx",
      "args": ["-y", "@linear/mcp-server"],
      "env": {
        "LINEAR_API_KEY": "${LINEAR_API_KEY}"
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
        "/Users/you/cto-workspace"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"decisions/\"; then echo \"[ADR hook] New decision filed — update decisions/README.md index\"; fi'"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"incidents/\" && ! echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"postmortem-template\"; then echo \"[Incident hook] Filing incident — ensure action items are added to incidents/action-items-tracker.md\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'echo \"[Session end] If you drafted an ADR or postmortem, confirm it has been filed and linked from the relevant index file.\"'"
          }
        ]
      }
    ]
  }
}
```

## Te installeren skills

```bash
npx claudient add skill productivity/engineering-strategy
npx claudient add skill productivity/adr-writer
npx claudient add skill productivity/tech-debt-tracker
npx claudient add skill productivity/build-optimization
npx claudient add skill productivity/vendor-evaluator
npx claudient add skill productivity/tech-interview-kit
npx claudient add skill productivity/exec-briefing
npx claudient add skill devops-infra/platform-engineering
npx claudient add skill devops-infra/monorepo
npx claudient add skill devops-infra/oncall-runbook
npx claudient add skill devops-infra/capacity-planner
```

## Gerelateerd

- [Gids: Claude voor CTOs en Tech Leads](../guides/for-cto.md)
- [Workflow: CTO Weekly](../workflows/cto-weekly.md)
- [Workflow: Incident Response](../workflows/incident-response.md)
- [Workflow: Wervingspipeline](../workflows/recruiting-pipeline.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
