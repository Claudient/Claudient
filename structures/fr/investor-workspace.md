# Espace de travail Investisseur / Capital-risque — Structure de projet

> Pour un investisseur en capital-risque ou un business angel gérant le flux de transactions, la due diligence, le suivi du portefeuille et les relations avec les LPs, via un pipeline structuré comprenant le sourcing, les mémos de comité d'investissement et les rapports trimestriels.

## Stack

- **Notion** ou **Airtable** — CRM de deal flow, kanban du pipeline, suivi du portefeuille, base de données des entreprises
- **Carta** — Gestion de la table de capitalisation, suivi des participations, droits de pro-rata, modélisation du pool d'options
- **AngelList** ou **Visible** — Reporting aux LPs, tableaux de bord de performance du fonds, mises à jour investisseurs
- **QuickBooks** — Comptabilité du fonds, suivi des frais de gestion, calculs des carried interests
- **Pitchbook** ou **Crunchbase** — Données de marché, comparables, benchmarks de valorisation, cartographie sectorielle
- **Slack** — Canaux fondateurs, fils co-investisseurs, discussion async du comité d'investissement, salles de deal
- **Google Workspace** — Drive pour les documents de due diligence, Sheets pour le suivi des KPIs, Docs pour les mémos
- **Claude Code** — Analyse de deals, rédaction de mémos CI, suivi du portefeuille, génération de rapports LP

## Arborescence

```
investor-workspace/
├── .claude/
│   ├── CLAUDE.md                              # Instructions de l'espace de travail (coller le modèle ci-dessous)
│   ├── settings.json                          # Serveurs MCP, hooks, permissions
│   └── commands/
│       ├── deal-screen.md                     # /deal-screen — prend l'URL ou le deck d'une entreprise, retourne un triage structuré
│       ├── ic-memo.md                         # /ic-memo — mémo complet pour le comité d'investissement à partir des notes de due diligence
│       ├── portfolio-update.md                # /portfolio-update — récit mensuel des KPIs à partir des métriques brutes
│       ├── lp-report.md                       # /lp-report — lettre trimestrielle aux LPs avec synthèse de la performance du fonds
│       ├── founder-update.md                  # /founder-update — réponse structurée à la mise à jour mensuelle du fondateur
│       ├── market-thesis.md                   # /market-thesis — document de thèse sectorielle à partir des données de recherche
│       └── due-diligence.md                   # /due-diligence — checklist complète de due diligence + synthèse des conclusions
├── pipeline/
│   ├── sourcing/                              # Leads entrants et sortants pas encore rencontrés
│   │   ├── _template/
│   │   │   └── initial-screen.md              # Formulaire d'analyse vierge — entreprise, stade, adéquation thèse, source
│   │   ├── acme-ai/
│   │   │   └── initial-screen.md              # Première analyse : traction, équipe, marché, montant demandé
│   │   ├── beta-biotech/
│   │   │   └── initial-screen.md
│   │   └── gamma-fintech/
│   │       └── initial-screen.md
│   ├── first-meeting/                         # Sélectionnés — premier appel fondateur planifié ou effectué
│   │   ├── delta-robotics/
│   │   │   ├── initial-screen.md              # Notes d'analyse reprises depuis le sourcing
│   │   │   └── first-meeting-notes.md         # Notes brutes — parcours fondateur, produit, demande, signaux
│   │   └── epsilon-health/
│   │       ├── initial-screen.md
│   │       └── first-meeting-notes.md
│   ├── diligence/                             # Due diligence active — vérifications de références, finances, tech
│   │   ├── zeta-infra/
│   │   │   ├── initial-screen.md
│   │   │   ├── first-meeting-notes.md
│   │   │   ├── diligence-tracker.md           # Éléments ouverts, responsables, échéances sur tous les chantiers
│   │   │   ├── financial-review.md            # Modèle de revenus, économie unitaire, burn, analyse de la piste de trésorerie
│   │   │   ├── tech-audit-notes.md            # Revue d'architecture, scalabilité, posture de sécurité
│   │   │   ├── reference-checks/              # Transcriptions structurées des vérifications de références
│   │   │   │   ├── ref-cto-john-doe.md
│   │   │   │   └── ref-customer-acme.md
│   │   │   └── data-room/                     # Miroir des documents partagés par le fondateur
│   │   │       ├── .gitkeep
│   │   │       └── cap-table-summary.md       # Synthèse de la table de cap extraite de l'export Carta
│   │   └── eta-saas/
│   │       ├── diligence-tracker.md
│   │       ├── financial-review.md
│   │       └── reference-checks/
│   │           └── .gitkeep
│   ├── ic/                                    # Mémo CI finalisé — en attente du vote du comité d'investissement
│   │   └── theta-marketplace/
│   │       ├── ic-memo.md                     # Mémo CI final — thèse d'investissement, risques, conditions, recommandation
│   │       ├── diligence-tracker.md
│   │       ├── financial-review.md
│   │       └── comps-analysis.md              # Entreprises comparables publiques et privées, benchmarks de valorisation
│   ├── closed/                                # Investissements réalisés — déplacer vers portfolio/ après closing
│   │   └── iota-logistics/
│   │       ├── ic-memo.md
│   │       ├── closing-checklist.md           # Confirmation de virement, mise à jour Carta, suivi du pro-rata
│   │       └── post-close-intro.md            # Email d'introduction post-closing aux ressources du portefeuille
│   └── passed/                                # Deals déclinés avec justification pour référence future
│       ├── kappa-crypto/
│       │   ├── initial-screen.md
│       │   └── pass-rationale.md              # Raisons du refus — inadéquation thèse, valorisation, équipe, timing marché
│       └── lambda-hr-tech/
│           ├── initial-screen.md
│           └── pass-rationale.md
├── portfolio/                                 # Un dossier par entreprise active en portefeuille
│   ├── _template/                             # Copier ce dossier lors de la finalisation d'un nouvel investissement
│   │   ├── memo.md                            # Mémo CI (copié depuis pipeline/closed/)
│   │   ├── cap-table.md                       # % de participation, actions, pool d'options, conditions du dernier tour
│   │   ├── kpis.md                            # Journal mensuel des KPIs — ARR, croissance, burn, effectifs, NRR
│   │   ├── updates/                           # Mises à jour mensuelles des fondateurs, archivées chronologiquement
│   │   │   └── .gitkeep
│   │   └── board-notes/                       # Préparation et notes post-réunion du conseil d'administration
│   │       └── .gitkeep
│   ├── acme-series-a/                         # Entreprise réelle en portefeuille (deal finalisé, active)
│   │   ├── memo.md                            # Mémo CI original
│   │   ├── cap-table.md                       # Synthèse actuelle de la table de cap depuis Carta
│   │   ├── kpis.md                            # Table de KPIs mise à jour mensuellement
│   │   ├── updates/
│   │   │   ├── 2026-05-update.md              # Mise à jour fondateur mai 2026 — annotée avec les points saillants
│   │   │   └── 2026-04-update.md
│   │   └── board-notes/
│   │       ├── 2026-05-board-prep.md          # Plan du deck conseil, ordre du jour, questions à soulever
│   │       └── 2026-05-board-notes.md         # Points d'action et décisions post-conseil
│   └── beta-seed/
│       ├── memo.md
│       ├── cap-table.md
│       ├── kpis.md
│       ├── updates/
│       │   └── 2026-05-update.md
│       └── board-notes/
│           └── .gitkeep
├── memos/                                     # Tous les mémos d'investissement, de refus et notes de deal au même endroit
│   ├── ic-memos/                              # Mémos du comité d'investissement (deals approuvés)
│   │   ├── 2026-05-acme-series-a.md
│   │   └── 2026-03-beta-seed.md
│   ├── deal-memos/                            # Brèves notes de deal pour les premiers rendez-vous ou la due diligence préliminaire
│   │   ├── 2026-06-zeta-infra-brief.md
│   │   └── 2026-05-eta-saas-brief.md
│   └── pass-memos/                            # Justifications de refus documentées — consultables pour identifier des schémas récurrents
│       ├── 2026-05-kappa-crypto-pass.md
│       └── 2026-04-lambda-hr-tech-pass.md
├── lp/                                        # Documents destinés aux LPs et suivi de la performance du fonds
│   ├── quarterly-reports/
│   │   ├── 2026-q1-lp-report.md              # Lettre LP T1 2026 — performance du fonds, points forts du portefeuille
│   │   └── 2025-q4-lp-report.md
│   ├── annual-reports/
│   │   └── 2025-annual-report.md             # Synthèse annuelle du fonds — TRI, DPI, RVPI, meilleures performances
│   ├── fund-performance/
│   │   ├── nav-tracker.md                     # Actif net par trimestre — valeurs du portefeuille réévaluées
│   │   └── cash-flow-log.md                  # Appels de fonds, distributions, prélèvements des frais de gestion
│   └── lp-communications/
│       ├── capital-call-notice-template.md    # Modèle standard d'appel de fonds avec instructions de virement
│       └── distribution-notice-template.md   # Format d'avis de distribution pour les sorties réalisées
├── thesis/                                    # Thèses de marché et recherches sectorielles
│   ├── ai-infrastructure-thesis.md           # Thèse sectorielle complète — cartographie du marché, timing, profil cible
│   ├── climate-tech-thesis.md
│   ├── fintech-thesis.md
│   └── sector-notes/                          # Notes de recherche brutes alimentant les documents de thèse
│       ├── ai-infra-market-data.md
│       └── climate-founding-team-patterns.md
├── diligence/                                 # Modèles et checklists de due diligence réutilisables
│   ├── reference-check-template.md           # Guide structuré d'entretien de référence — 12 questions standard
│   ├── financial-review-checklist.md         # Checklist de due diligence financière — modèle, hypothèses, signaux d'alerte
│   ├── tech-audit-template.md                # Guide de due diligence technique — architecture, sécurité, scalabilité
│   ├── legal-review-checklist.md             # Due diligence juridique — PI, emploi, contrats, litiges
│   └── founder-background-check.md           # Historique fondateur, références, vérification LinkedIn
└── scratch/
    ├── weekly-deal-notes.md                  # Zone de travail informelle pour les notes avant archivage dans le pipeline
    └── research-staging.md                   # Extraits de recherche marché bruts avant mise en forme dans les thèses
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `.claude/commands/deal-screen.md` | Commande slash acceptant l'URL d'une entreprise, un résumé de deck PDF ou un profil AngelList, et retournant un triage structuré : adéquation thèse, signal équipe, taille de marché, traction, signaux d'alerte et prochaine étape recommandée |
| `.claude/commands/ic-memo.md` | Commande slash générant un mémo complet pour le comité d'investissement à partir des notes de due diligence — thèse d'investissement, analyse de marché, évaluation de l'équipe, risques et mesures d'atténuation, conditions proposées et recommandation |
| `.claude/commands/lp-report.md` | Commande slash prenant les données de performance du fonds et les points forts du portefeuille pour produire une lettre trimestrielle aux LPs dans la voix du fonds — synthèse de performance, actualité du portefeuille, nouveaux investissements, perspectives |
| `.claude/commands/due-diligence.md` | Commande slash synthétisant les transcriptions de vérifications de références, les notes de revue financière et les notes d'audit technique en un document de conclusions structuré avec les points ouverts et l'évaluation de la préparation au CI |
| `pipeline/diligence/_template/diligence-tracker.md` | Tracker principal de tous les éléments de due diligence ouverts sur tous les chantiers — responsable, échéance, statut — mis à jour quotidiennement pendant la due diligence active |
| `portfolio/_template/kpis.md` | Modèle de journal mensuel des KPIs couvrant ARR, croissance MoM, taux de burn, piste de trésorerie, effectifs, NRR et marge brute — utilisé pour générer les récits de mise à jour du portefeuille |
| `lp/fund-performance/nav-tracker.md` | ANR trimestriel par entreprise en portefeuille — valeurs réévaluées, % de participation, rendements implicites — alimente directement les rapports LP et la synthèse annuelle du fonds |
| `diligence/reference-check-template.md` | Guide structuré d'entretien de référence en 12 questions couvrant les capacités du fondateur, le style de travail, les points faibles et les problématiques propres à l'entreprise — utilisé pour chaque processus de due diligence |

## Scaffold rapide

```bash
# Créer la racine de l'espace de travail
mkdir -p investor-workspace

# Créer la structure .claude
mkdir -p investor-workspace/.claude/commands

# Créer les répertoires des étapes du pipeline avec les modèles
mkdir -p investor-workspace/pipeline/sourcing/_template
mkdir -p investor-workspace/pipeline/first-meeting
mkdir -p investor-workspace/pipeline/diligence/_template/reference-checks
mkdir -p investor-workspace/pipeline/diligence/_template/data-room
mkdir -p investor-workspace/pipeline/ic
mkdir -p investor-workspace/pipeline/closed
mkdir -p investor-workspace/pipeline/passed

# Créer le modèle de portefeuille
mkdir -p investor-workspace/portfolio/_template/updates
mkdir -p investor-workspace/portfolio/_template/board-notes

# Créer les catégories de mémos
mkdir -p investor-workspace/memos/ic-memos
mkdir -p investor-workspace/memos/deal-memos
mkdir -p investor-workspace/memos/pass-memos

# Créer les répertoires LP
mkdir -p investor-workspace/lp/quarterly-reports
mkdir -p investor-workspace/lp/annual-reports
mkdir -p investor-workspace/lp/fund-performance
mkdir -p investor-workspace/lp/lp-communications

# Créer les répertoires de thèse et de due diligence
mkdir -p investor-workspace/thesis/sector-notes
mkdir -p investor-workspace/diligence
mkdir -p investor-workspace/scratch

# Initialiser les placeholders .gitkeep
touch investor-workspace/pipeline/diligence/_template/reference-checks/.gitkeep
touch investor-workspace/pipeline/diligence/_template/data-room/.gitkeep
touch investor-workspace/portfolio/_template/updates/.gitkeep
touch investor-workspace/portfolio/_template/board-notes/.gitkeep

# Installer les skills finance
npx claudient add skill finance/deal-screening
npx claudient add skill finance/deal-memo
npx claudient add skill finance/ic-memo
npx claudient add skill finance/portfolio-monitor
npx claudient add skill finance/dcf-model
npx claudient add skill finance/comps-analysis

# Copier les stubs de commandes dans .claude/commands/
npx claudient add skill finance/deal-screening --output investor-workspace/.claude/commands/deal-screen.md
npx claudient add skill finance/ic-memo --output investor-workspace/.claude/commands/ic-memo.md
npx claudient add skill finance/portfolio-monitor --output investor-workspace/.claude/commands/portfolio-update.md
npx claudient add skill finance/deal-memo --output investor-workspace/.claude/commands/lp-report.md
```

## Modèle CLAUDE.md

```markdown
# Espace de travail Investisseur — Instructions Claude Code

## Présentation

Ce répertoire de travail est destiné à un investisseur en capital-risque ou un business angel
gérant le flux de transactions, la due diligence, le suivi du portefeuille et les relations avec
les LPs. Les étapes du pipeline se trouvent dans pipeline/, les investissements actifs dans
portfolio/, les mémos CI dans memos/, les documents LP dans lp/, et la recherche sectorielle dans
thesis/. L'analyse de deals, la rédaction de mémos et les rapports s'effectuent tous via Claude Code.

## Stack

- Notion / Airtable — CRM de deal flow et base de données portefeuille ; kanban du pipeline par étape
- Carta — Table de cap de référence ; exporter les synthèses vers portfolio/<company>/cap-table.md
- AngelList / Visible — Portail de reporting LP ; rapports trimestriels rédigés dans lp/quarterly-reports/
- QuickBooks — Comptabilité du fonds ; frais de gestion, appels de fonds, distributions
- Pitchbook / Crunchbase — Données de marché et comparables ; exporter les données vers thesis/sector-notes/ et memos
- Slack — Canaux fondateurs et salles de deal co-investisseurs ; fils pertinents collés dans les dossiers de deal
- Google Workspace — Salles de données de due diligence partagées ; refléter les documents clés dans pipeline/diligence/<co>/data-room/

## Tâches courantes et commandes exactes

### Analyser un deal entrant
```
/deal-screen

Company: [nom]
URL: [site web ou profil AngelList]
Stage: [seed / Series A / Series B]
Sector: [catégorie]
Ask: $[montant] at $[valorisation] cap
Source: [inbound / warm intro from X / outbound]
Deck summary or key metrics: [coller ou décrire]
```

### Rédiger un mémo CI
```
/ic-memo

Company: [nom], Stage: [tour], Sector: [catégorie]
Ask: $[montant], Valuation: $[post-money]
Investment thesis: [1-2 phrases sur le pourquoi maintenant et le pourquoi nous]
Market: [TAM, taux de croissance, dynamiques clés]
Team: [parcours des fondateurs, expérience pertinente]
Traction: [ARR, taux de croissance, clients clés, NRR]
Risks: [top 3 risques et mesures d'atténuation proposées]
Comparable deals: [comparables avec multiples d'entrée]
Diligence notes: [coller les conclusions clés de financial-review.md et reference-checks/]
```

### Synthétiser une mise à jour mensuelle du portefeuille
```
/portfolio-update

Company: [nom]
Month: [Mois AAAA]
Raw update from founder: [coller l'email ou les notes de mise à jour mensuelle du fondateur]
Prior month KPIs: [coller depuis portfolio/<company>/kpis.md]
Board notes context: [points d'action ou préoccupations ouverts]
```

### Rédiger un rapport trimestriel LP
```
/lp-report

Quarter: Q[X] [ANNÉE]
Fund: [Nom du fonds et millésime]
NAV this quarter: $[X]M (prior quarter: $[Y]M)
New investments: [entreprise, montant, stade]
Portfolio highlights: [top 2-3 réussites — jalons de revenus, tours de suivi, partenariats]
Write-downs or concerns: [éventuelles dépréciations à signaler]
Market outlook: [contexte macro pertinent pour la thèse du fonds]
Fund performance: [TRI, DPI, RVPI si disponibles]
```

### Analyser une référence pour une entreprise en portefeuille ou en due diligence
```
/due-diligence

Company: [nom]
Diligence stage: [reference checks / financial review / tech audit / full synthesis]
Open items: [coller depuis pipeline/diligence/<co>/diligence-tracker.md]
Findings to date: [coller financial-review.md ou transcriptions de vérifications de références]
IC date: [date cible de finalisation du mémo]
```

### Construire une thèse de marché
```
/market-thesis

Sector: [catégorie]
Thesis question: [quel pari précis faisons-nous ?]
Market data: [coller depuis l'export Pitchbook/Crunchbase ou sector-notes/]
Comparable funds and investments: [qui d'autre investit, quels sont les signaux ?]
Target company profile: [stade, géographie, profil fondateur, fourchette de revenus]
Thesis risks: [qu'est-ce qui invaliderait cette thèse ?]
```

### Répondre à une mise à jour mensuelle de fondateur
```
/founder-update

Company: [nom]
Founder update: [coller la mise à jour complète]
Our ownership: [%], Investment date: [date], Last board: [date]
Open action items from last board: [liste]
Key concerns to address: [préoccupations au niveau du conseil, le cas échéant]
```

## Conventions à respecter

- Tous les deals du pipeline progressent par étapes : sourcing → first-meeting → diligence → ic → closed ou passed
- Lorsqu'un deal est finalisé, copier le mémo CI vers portfolio/<company>/memo.md et créer le dossier portefeuille complet
- La justification de refus est toujours documentée dans pipeline/passed/<company>/pass-rationale.md — ne jamais supprimer les deals analysés
- Les mises à jour des fondateurs sont stockées dans portfolio/<company>/updates/AAAA-MM-update.md — un fichier par mois
- Les KPIs sont ajoutés (jamais écrasés) dans portfolio/<company>/kpis.md — table continue avec des lignes datées
- Les transcriptions de vérifications de références vont dans pipeline/diligence/<company>/reference-checks/ref-<nom>.md
- Tous les mémos CI sont également archivés dans memos/ic-memos/AAAA-MM-<company>.md après le vote du CI
- Le tracker ANR dans lp/fund-performance/nav-tracker.md est mis à jour chaque trimestre avant l'envoi du rapport LP
- Les trackers de due diligence restent ouverts jusqu'à la soumission du mémo CI — clôturer les éléments avec date et résultat, pas par suppression
```

## Serveurs MCP

```json
{
  "mcpServers": {
    "crunchbase": {
      "command": "npx",
      "args": ["-y", "@crunchbase/mcp-server"],
      "env": {
        "CRUNCHBASE_API_KEY": "your-crunchbase-api-key"
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
        "/Users/your-username/investor-workspace"
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
    }
  }
}
```

## Hooks recommandés

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"ic-memo.md\"; then echo \"[hook] IC memo written — file a copy to memos/ic-memos/ with YYYY-MM-<company> naming before the IC call\"; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"pass-rationale.md\"; then echo \"[hook] Pass memo saved — confirm the deal is moved from pipeline/diligence/ or pipeline/first-meeting/ to pipeline/passed/\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'DOM=$(date +%d); if [ \"$DOM\" = \"01\" ]; then echo \"[reminder] First of month — update portfolio KPI logs (portfolio/<company>/kpis.md) and prepare portfolio-update narratives for board visibility\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Skills à installer

```bash
# Skills investisseur essentiels
npx claudient add skill finance/deal-screening
npx claudient add skill finance/deal-memo
npx claudient add skill finance/ic-memo
npx claudient add skill finance/portfolio-monitor
npx claudient add skill finance/dcf-model
npx claudient add skill finance/comps-analysis

# Skills finance et recherche complémentaires
npx claudient add skill finance/lp-reporting
npx claudient add skill finance/cap-table-analysis
npx claudient add skill finance/reference-check-synthesizer
npx claudient add skill finance/market-sizing
npx claudient add skill productivity/exec-briefing
npx claudient add skill productivity/stakeholder-comms

# Installer tous les skills finance en une commande
npx claudient add skills finance
```

## Ressources associées

- [Guide investisseur](../guides/for-investor.md)
- [Workflow de deal flow](../workflows/deal-flow.md)
- [Workflow de mémo CI](../workflows/ic-memo-process.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
