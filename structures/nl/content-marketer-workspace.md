# Content Marketer Werkruimte — Projectstructuur

> Voor content marketeers die de volledige productiecyclus beheren — van zoekwoordenonderzoek en briefings tot het schrijven van content, SEO-controle, publicatie, distributie en hergebruik — in één enkele Claude Code-werkruimte.

## Stack

- **CMS:** HubSpot CMS Hub of WordPress 6.x met Yoast SEO / RankMath
- **SEO:** Ahrefs (Site Explorer, Keywords Explorer, Content Explorer) of Semrush (Keyword Magic, Position Tracking)
- **Planning:** Notion (redactiekalender-database, contenttracker)
- **Sociale planning:** Buffer (meerkanaals) of Sprout Social (enterprise-teams)
- **Visuals:** Canva (sociale afbeeldingen, uitgelichte afbeeldingen, infographics)
- **Analyse:** Google Analytics 4 (verkeer, engagement, conversies), HubSpot-rapportage (pipeline-attributie)
- **Communicatie:** Slack (redactioneel Slack-kanaal, publicatiemeldingen)
- **Docs-as-code:** GitHub (contentversiebeheer, conceptbeoordelingen via pull requests)
- **Claude Code-vaardigheden:** marketing/content-brief, marketing/content-strategy, marketing/copywriting, marketing/editorial-calendar, marketing/ai-seo, marketing/programmatic-seo, marketing/social-media-manager, small-business/content-repurposer

## Mappenstructuur

```
content-marketer-workspace/
├── .claude/
│   ├── CLAUDE.md                        # Werkruimte-instructies voor Claude Code
│   ├── settings.json                    # MCP-servers, hooks, rechten
│   └── commands/
│       ├── content-brief.md             # /content-brief — volledig SEO-briefing genereren vanuit zoekwoord
│       ├── draft-post.md                # /draft-post — langvormig artikel schrijven vanuit briefing
│       ├── seo-audit.md                 # /seo-audit — on-page SEO-controle voor publicatie
│       ├── social-copy.md               # /social-copy — sociale varianten genereren vanuit artikel
│       ├── repurpose.md                 # /repurpose — langvormige content opsplitsen in nieuwsbrief, threads, clips
│       ├── editorial-calendar.md        # /editorial-calendar — maandkalender plannen en invullen
│       └── performance-review.md        # /performance-review — GA4-metrics ophalen, onderpresterend content markeren
├── briefs/
│   ├── _template.md                     # Hoofd-contentbriefing-sjabloon (kopieer om te starten)
│   ├── 2026-06-best-ai-tools-marketers/ # Eén map per contentstuk
│   │   ├── brief.md                     # Briefing met zoekwoordenonderzoek, outline, concurrentielacunes
│   │   ├── competitor-notes.md          # Handmatige notities na het lezen van de top 3-5 gerangschikte URL's
│   │   └── keyword-data.csv             # Geëxporteerde Ahrefs/Semrush-zoekwoorddata voor dit onderwerp
│   ├── 2026-06-content-strategy-guide/
│   │   ├── brief.md
│   │   ├── competitor-notes.md
│   │   └── keyword-data.csv
│   └── 2026-07-programmatic-seo-primer/
│       ├── brief.md
│       └── keyword-data.csv
├── drafts/
│   ├── best-ai-tools-marketers.md       # Concept in uitvoering — verwijst naar briefing in briefs/
│   ├── content-strategy-guide.md        # Bezig, momenteel in redactionele beoordeling
│   └── programmatic-seo-primer.md       # Net gestart — fase van ruwe outline
├── published/
│   ├── 2026-05/
│   │   ├── editorial-calendar-template/ # Archief van gepubliceerde contentstukken
│   │   │   ├── post.md                  # Definitieve gepubliceerde versie
│   │   │   ├── metrics.md               # GA4 + HubSpot-metrics verzameld op 30/60/90 dagen
│   │   │   └── social-posts.md          # Sociale teksten gebruikt voor distributie
│   │   └── seo-audit-checklist/
│   │       ├── post.md
│   │       ├── metrics.md
│   │       └── social-posts.md
│   └── 2026-04/
│       └── content-brief-guide/
│           ├── post.md
│           ├── metrics.md
│           └── social-posts.md
├── research/
│   ├── keyword-clusters/
│   │   ├── seo-cluster.csv              # Themacluster: SEO-vaardigheden, tools, audits
│   │   ├── content-ops-cluster.csv      # Themacluster: redactie, productie, workflows
│   │   └── ai-marketing-cluster.csv     # Themacluster: AI-tools voor marketeers
│   ├── competitor-content/
│   │   ├── competitor-a-content-map.md  # Contentkaart van de primaire concurrent
│   │   ├── competitor-b-content-map.md
│   │   └── gap-analysis.md              # Onze dekking vs. dekking van concurrenten
│   └── serp-snapshots/
│       ├── 2026-06-snapshot.md          # Maandelijks SERP-positielogboek voor gevolgde zoekwoorden
│       └── 2026-05-snapshot.md
├── templates/
│   ├── brief-template.md                # Leeg contentbriefing (H2-outline, meta, ILP)
│   ├── blog-post-format.md              # Standaard blogpoststructuur (intro, H2's, CTA, voettekst)
│   ├── listicle-format.md               # Genummerd listicle-skelet
│   ├── comparison-format.md             # "[A] vs [B]"-poststructuur
│   ├── how-to-format.md                 # Tutorial- / stap-voor-stapstructuur
│   └── pillar-page-format.md            # Langvormige pillar-pagina (3000+ woorden, intern linkhub)
├── assets/
│   ├── ctas/
│   │   ├── blog-ctas.md                 # 10 herbruikbare einde-van-artikel-CTA's per doel (lead, demo, abonnement)
│   │   └── inline-ctas.md               # Mid-artikel-CTA-varianten (content upgrades, proefversies)
│   ├── author-bios/
│   │   ├── author-bio-short.md          # Bio van 50 woorden voor auteursvermeldingen
│   │   └── author-bio-long.md           # Bio van 150 woorden voor gastartikelen
│   ├── boilerplate/
│   │   ├── company-description.md       # Bedrijfsbeschrijvingen: 1 zin, 1 alinea en volledige bio
│   │   ├── product-descriptions.md      # Belangrijkste product-/functieomschrijvingen om in te voegen
│   │   └── disclaimer-legal.md          # Standaard juridische vermeldingen / affiliate-disclaimers
│   └── social/
│       ├── linkedin-profile-copy.md     # Herbruikbare tekst voor LinkedIn-bedrijfspagina
│       └── twitter-bio.md               # Twitter/X-bio-varianten
└── editorial-calendar.md                # Hoofdkalender — maandoverzicht, status, toewijzingen
```

## Belangrijke bestanden toegelicht

| Pad | Doel |
|---|---|
| `.claude/commands/content-brief.md` | Slash-opdracht die een zoekwoord/onderwerp als invoer neemt en een volledig SEO-geoptimaliseerde briefing opstelt, inclusief concurrentielacune-analyse, H2-outline, metatekst en intern linkenplan |
| `.claude/commands/draft-post.md` | Slash-opdracht die de briefing in `briefs/<slug>/brief.md` leest en een volledig concept schrijft naar `drafts/<slug>.md`, volgens de opmaaksjabloon voor het contenttype |
| `.claude/commands/seo-audit.md` | Checklist vóór publicatie: valideert lengte van de titeltag, metabeschrijving, slug, aanwezigheid van zoekwoord in H1/H2, alt-tekst van afbeeldingen, interne links en schema-geschiktheid |
| `.claude/commands/social-copy.md` | Neemt een gepubliceerde URL of een concept en levert een LinkedIn-post, Twitter/X-thread, Instagram-bijschrift en nieuwsbrief-teaser — allemaal kanaalnatief, niet eenvoudig gekopieerd |
| `.claude/commands/repurpose.md` | Breekt een langvormig artikel op in een nieuwsbriefgedeelte, een LinkedIn-carrousel-outline, een korte videoscript en een Twitter/X-thread |
| `.claude/commands/performance-review.md` | Haalt 30/60/90-daagse GA4-metrics op voor gepubliceerde stukken, markeert onderpresteerders ten opzichte van verkeersdoelen en stelt snelle CRO- of SEO-verbeteringen voor |
| `briefs/_template.md` | Hoofd-briefingsjabloon — kopieer dit vóór elk nieuw contentstuk; bevat zoekwoordenblok, concurrentietabel, volledig H2-outline-skelet, metavelden en intern linkenplan |
| `editorial-calendar.md` | Enkelvoudige hoofdkalender met maand-voor-maand-tabellen, status per stuk (briefing / concept / beoordeling / gepubliceerd), zoekwoord, beoogde publicatiedatum en toewijzing |

## Snelle installatie

```bash
# Werkruimte-hoofdmap aanmaken
mkdir -p content-marketer-workspace && cd content-marketer-workspace

# Claude Code-mappen
mkdir -p .claude/commands

# Mappen voor de contentlevenscyclus
mkdir -p briefs/_template
mkdir -p drafts
mkdir -p published/2026-05
mkdir -p published/2026-04

# Onderzoeksmappen
mkdir -p research/keyword-clusters
mkdir -p research/competitor-content
mkdir -p research/serp-snapshots

# Sjablonen en assets
mkdir -p templates
mkdir -p assets/ctas
mkdir -p assets/author-bios
mkdir -p assets/boilerplate
mkdir -p assets/social

# CLAUDE.md initialiseren
touch .claude/CLAUDE.md
touch .claude/settings.json

# Alle content marketing-vaardigheden installeren
npx claudient add skill marketing/content-brief
npx claudient add skill marketing/content-strategy
npx claudient add skill marketing/copywriting
npx claudient add skill marketing/editorial-calendar
npx claudient add skill marketing/ai-seo
npx claudient add skill marketing/programmatic-seo
npx claudient add skill marketing/social-media-manager
npx claudient add skill small-business/content-repurposer

# Slash-opdrachten kopiëren naar .claude/commands/
npx claudient add command content-brief
npx claudient add command draft-post
npx claudient add command seo-audit
npx claudient add command social-copy
npx claudient add command repurpose
npx claudient add command editorial-calendar
npx claudient add command performance-review

# Briefingsjabloon aanmaken
touch briefs/_template.md

# Redactiekalender aanmaken
touch editorial-calendar.md

echo "Content marketer-werkruimte klaar."
```

## CLAUDE.md-sjabloon

```markdown
# Content Marketer Werkruimte — Claude-instructies

## Wat dit is

Deze werkruimte beheert de volledige content marketing-productiecyclus: zoekwoordenonderzoek,
contentbriefings, langvormig schrijven, SEO-audits, publicatie, sociale distributie,
hergebruik en prestatiemeting. Alle content is gericht op SEO-gedreven organisch verkeer
voor een B2B-publiek.

## Stack

- CMS: HubSpot CMS (primair) / WordPress met Yoast SEO (secundair)
- SEO-tool: Ahrefs — gebruiken voor zoekwoordvolume, KD, SERP-analyse en concurrentieonderzoek
- Planning: Notion-redactiekalender-database (handmatig gesynchroniseerd met editorial-calendar.md hier)
- Sociale planning: Buffer — LinkedIn-, Twitter/X- en Instagram-wachtrijen
- Analyse: Google Analytics 4 — alle verkeers- en engagementmetrics
- Visuals: Canva — uitgelichte afbeeldingen op 1200x630px, sociale kaarten op 1080x1080px
- Communicatie: Slack-kanaal #content-team voor statusupdates

## Mapconventies

- briefs/<slug>/ — één map per stuk; altijd hier beginnen vóór het schrijven
- drafts/<slug>.md — actief werk-in-uitvoering; bestandsnaam komt overeen met de naam van de briefingmap
- published/<YYYY-MM>/<slug>/ — post.md + metrics.md + social-posts.md
- templates/ — nooit rechtstreeks bewerken; kopiëren naar drafts/ vóór wijzigingen
- assets/ — herbruikbare tekstblokken; het bestand vermelden bij het invoegen van boilerplate

## Veelvoorkomende taken — exacte opdrachten

**Een nieuw contentstuk starten:**
/content-brief keyword="[primair zoekwoord]" audience="[ICP-beschrijving]" type="[blog/guide/comparison]"

**Schrijven vanuit een afgeronde briefing:**
/draft-post brief=briefs/[slug]/brief.md format=templates/[format].md

**SEO-controle vóór publicatie:**
/seo-audit draft=drafts/[slug].md keyword="[primair zoekwoord]"

**Sociale distributieteksten genereren:**
/social-copy source=published/[YYYY-MM]/[slug]/post.md channels="linkedin,twitter,newsletter"

**Een gepubliceerd artikel hergebruiken:**
/repurpose source=published/[YYYY-MM]/[slug]/post.md formats="newsletter,thread,carousel"

**Maandelijkse redactieplanning:**
/editorial-calendar month="[Maand YYYY]" goal="[verkeer/leads/merk]" slots=[aantal]

**Prestatiebeoordeling:**
/performance-review period=90d published=published/[YYYY-MM]/

## Briefingconventies

- Altijd /content-brief uitvoeren vóór het aanraken van drafts/ — nooit schrijven zonder briefing
- Concurrentielacune-analyse moet ten minste 3 gerangschikte URL's bevatten
- Elke briefing moet een intern linkenplan bevatten (3 uitgaand, 3 inkomend)
- Zoekwoordmoeilijkheidsgraad boven 70: alleen doorgaan als de domeinautoriteit dit ondersteunt

## SEO-conventies

- Titeltags: 55-60 tekens, primair zoekwoord opgenomen, krachtig woord opgenomen
- Metabeschrijvingen: 150-158 tekens, zoekwoord + waardepropositie + zachte CTA
- URL-slugs: 2-4 woorden, kleine letters met koppeltekens, primair zoekwoord, geen stopwoorden
- Minimum interne links per artikel: 4 (2 contextueel + 2 gerelateerde lectuur)
- Elke afbeelding: alt-tekst die beschrijvend en zoekwoordrelevant is waar dat natuurlijk aanvoelt
- Schema: Article-schema op elk artikel; FAQ-schema wanneer H2's vragen zijn

## Publicatieworkflow

1. Briefing goedgekeurd in briefs/<slug>/brief.md
2. Concept geschreven naar drafts/<slug>.md
3. /seo-audit uitgevoerd en alle checklistitems opgelost
4. Gepubliceerd in het CMS (HubSpot of WordPress)
5. Artikel gearchiveerd in published/<YYYY-MM>/<slug>/post.md
6. /social-copy uitgevoerd; publicaties gepland in Buffer
7. Status van editorial-calendar.md bijgewerkt naar "gepubliceerd"
8. Metrics geregistreerd in published/<YYYY-MM>/<slug>/metrics.md op 30, 60 en 90 dagen
```

## MCP-servers

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_PERSONAL_ACCESS_TOKEN}"
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
        "/Users/${USER}/content-marketer-workspace"
      ]
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/mcp-server-notion"],
      "env": {
        "NOTION_API_KEY": "${NOTION_API_KEY}"
      }
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
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_OUTPUT_FILE_PATH\"; if [[ \"$FILE\" == */drafts/*.md ]]; then echo \"[hook] Concept opgeslagen: $FILE — voer /seo-audit uit vóór publicatie\"; fi'"
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
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$FILE\" == */published/*.md ]]; then echo \"[hook] Schrijven naar published/ — controleer of seo-audit is uitgevoerd en of de briefing bestaat in briefs/\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'cd \"${CLAUDE_PROJECT_DIR}\" && UNPUBLISHED=$(find drafts/ -name \"*.md\" -newer editorial-calendar.md 2>/dev/null | wc -l | tr -d \" \"); [ \"$UNPUBLISHED\" -gt 0 ] && echo \"[herinnering] $UNPUBLISHED concept(en) gewijzigd sinds laatste kalenderupdate — editorial-calendar.md bijwerken\" || true'"
          }
        ]
      }
    ]
  }
}
```

## Te installeren vaardigheden

```bash
npx claudient add skill marketing/content-brief
npx claudient add skill marketing/content-strategy
npx claudient add skill marketing/copywriting
npx claudient add skill marketing/editorial-calendar
npx claudient add skill marketing/ai-seo
npx claudient add skill marketing/programmatic-seo
npx claudient add skill marketing/social-media-manager
npx claudient add skill small-business/content-repurposer
npx claudient add skill marketing/seo-audit
```

## Verwant

- [Gids: Claude voor Content Marketeers](../guides/for-content-marketer.md)
- [Workflow: Content creatie van begin tot eind](../workflows/content-creation.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
