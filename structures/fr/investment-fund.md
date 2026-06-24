# Fonds d'investissement / Opérations VC — Structure de projet

> Pour un fonds de capital-risque ou un family office gérant l'ensemble du cycle, du sourcing des deals jusqu'au reporting aux LP, avec des étapes de pipeline structurées, des espaces de due diligence par société, le suivi des KPI du portefeuille et l'administration du fonds.

## Stack

- **Notion** ou **Airtable** — CRM dealflow, pipeline kanban, base de données des sociétés en portefeuille, registre des LP
- **Carta** — Gestion du cap table, administration du fonds, émission de titres, suivi des droits pro-rata
- **Visible** ou **Synaptic** — Portail de reporting LP, tableaux de bord de performance du fonds, agrégation des métriques du portefeuille
- **Pitchbook** ou **Crunchbase** — Données de marché, comparables sectoriels, références de valorisation, cartographie des secteurs
- **QuickBooks** — Comptabilité du fonds, facturation des management fees, comptabilité des appels de fonds, modélisation des waterfalls
- **DocuSign** — Signature des term sheets, contrats de souscription, side letters LP, consentements du conseil
- **Google Workspace** — Drive partagé pour les data rooms, Sheets pour les trackers KPI, Docs pour les mémos collaboratifs
- **Claude Code** — Screening des deals, rédaction des mémos IC, synthèse de due diligence, génération de rapports LP, recherche de thèses

## Arborescence de répertoires

```
investment-fund/
├── .claude/
│   ├── CLAUDE.md                                      # Instructions Claude Code pour l'ensemble du fonds (coller le template ci-dessous)
│   ├── settings.json                                  # Serveurs MCP, hooks, permissions des outils
│   └── commands/
│       ├── deal-screen.md                             # /deal-screen — triage d'un deal entrant depuis une URL ou résumé de deck
│       ├── first-look.md                              # /first-look — note de synthèse après le premier meeting fondateur
│       ├── diligence-brief.md                         # /diligence-brief — synthèse des points de due diligence ouverts en vue du Comité d'Investissement
│       ├── ic-memo.md                                 # /ic-memo — mémo complet pour le Comité d'Investissement à partir des notes de due diligence
│       ├── pass-memo.md                               # /pass-memo — justification documentée d'un refus pour pipeline/passed/
│       ├── portfolio-update.md                        # /portfolio-update — narrative mensuelle des KPI depuis la mise à jour du fondateur
│       ├── board-prep.md                              # /board-prep — plan du board deck, questions à l'ordre du jour, actions à suivre
│       ├── lp-report.md                               # /lp-report — lettre LP trimestrielle avec performance du fonds et points saillants du portefeuille
│       ├── capital-call.md                            # /capital-call — projet d'avis d'appel de fonds avec instructions de virement
│       ├── market-thesis.md                           # /market-thesis — document de thèse sectorielle à partir de données brutes
│       └── exit-analysis.md                          # /exit-analysis — modélisation des scénarios de sortie et narrative de thèse de sortie
├── pipeline/
│   ├── sourcing/                                      # Toutes les leads entrantes et sortantes non encore screenées
│   │   ├── deal-tracker.md                            # Journal principal : société, stade, source, date, adéquation à la thèse, statut
│   │   ├── thesis-signals.md                         # Signaux émergents — thèmes, secteurs, profils de fondateurs à suivre
│   │   └── _template/
│   │       └── initial-screen.md                     # Formulaire de screening vierge : société, stade, montant, source, adéquation thèse, signaux d'alerte
│   ├── first-look/                                    # Deals retenus — note d'une page rédigée, premier meeting planifié ou effectué
│   │   ├── _template/
│   │   │   └── one-pager.md                          # Template one-pager : activité, équipe, marché, traction, montant, adéquation
│   │   ├── acme-ai/
│   │   │   └── one-pager.md                          # Note first-look : problème, solution, équipe, traction, montant
│   │   ├── brightpath-health/
│   │   │   └── one-pager.md
│   │   └── circuitworks-infra/
│   │       └── one-pager.md
│   ├── diligence/                                     # Due diligence approfondie en cours — mémo IC en préparation
│   │   ├── _template/
│   │   │   ├── market-research.md                    # Dimensionnement de marché, paysage concurrentiel, thèse de timing
│   │   │   ├── team-check.md                         # Parcours des fondateurs, références, track record, signaux d'alerte
│   │   │   ├── financial-model.md                    # Revue du modèle de revenus, économie unitaire, burn, runway, analyse de sensibilité
│   │   │   ├── tech-diligence.md                     # Architecture, scalabilité, sécurité, évaluation de la dette technique
│   │   │   ├── legal-diligence.md                   # Propriété IP, contrats de travail, assainissement du cap table, litiges
│   │   │   └── diligence-tracker.md                  # Points ouverts par axe de travail — responsable, deadline, statut, blocages
│   │   ├── dawnrise-climate/
│   │   │   ├── market-research.md
│   │   │   ├── team-check.md
│   │   │   ├── financial-model.md
│   │   │   ├── tech-diligence.md
│   │   │   ├── legal-diligence.md
│   │   │   ├── diligence-tracker.md
│   │   │   └── reference-checks/
│   │   │       ├── ref-ceo-former-manager.md         # Référence structurée : compétences, points faibles, style de travail
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
│   ├── ic/                                            # Mémo IC soumis — en attente du vote du Comité d'Investissement
│   │   └── foundry-robotics/
│   │       ├── ic-memo.md                            # Mémo IC final : thèse, marché, équipe, finances, risques, conditions, recommandation
│   │       ├── comps-analysis.md                     # Comparables publics et privés avec multiples d'entrée et valorisation implicite
│   │       ├── financial-model.md
│   │       └── diligence-tracker.md                  # Points clôturés avec notes de conclusion
│   ├── closed/                                        # Term sheet signé ou virement envoyé — promu dans portfolio/
│   │   └── greenmark-saas/
│   │       ├── ic-memo.md
│   │       ├── term-sheet.md                         # Term sheet exécuté : valorisation, pro-rata, siège au conseil, clauses de protection
│   │       ├── closing-checklist.md                  # Virement confirmé, Carta mis à jour, DocuSign complété, pro-rata enregistré
│   │       └── post-close-intro.md                  # Email d'introduction aux ressources du portefeuille — juridique, talent, GTM
│   └── passed/                                        # Deals refusés — documentés avec justification
│       ├── _template/
│       │   └── pass-rationale.md                    # Raison du refus : catégorie, motif principal, signaux susceptibles de changer notre avis
│       ├── halcyon-crypto/
│       │   ├── one-pager.md
│       │   └── pass-rationale.md
│       └── inkdrop-hr-tech/
│           ├── one-pager.md
│           └── pass-rationale.md
├── memos/                                             # Tous les mémos IC et de refus en un seul emplacement consultable
│   ├── investment-memos/
│   │   ├── 2026-05-greenmark-saas.md               # Mémo IC archivé après closing
│   │   ├── 2026-03-foundry-robotics.md
│   │   └── 2025-11-apex-data.md
│   └── pass-memos/
│       ├── 2026-04-halcyon-crypto.md
│       └── 2026-02-inkdrop-hr-tech.md
├── portfolio/                                         # Un dossier par société en portefeuille active
│   ├── _template/                                    # Copier lors de chaque nouvel investissement
│   │   ├── memo.md                                  # Mémo IC (copié depuis pipeline/closed/)
│   │   ├── cap-table.md                             # Pourcentage de détention, actions, pool d'options, conditions du tour
│   │   ├── board-deck-notes/
│   │   │   └── .gitkeep                             # Notes de préparation et de compte-rendu de conseil par trimestre
│   │   ├── kpis/
│   │   │   └── kpi-log.md                          # Tableau KPI mensuel : ARR, croissance MoM, burn, runway, effectif, NRR
│   │   ├── capital-plan/
│   │   │   └── capital-plan.md                     # Calendrier du prochain tour, levée attendue, allocation pro-rata, modèle de réserves
│   │   └── exit-thesis/
│   │       └── exit-thesis.md                      # Scénarios de sortie : acquéreurs, préparation à l'IPO, cadre hold vs. sell
│   ├── greenmark-saas/
│   │   ├── memo.md
│   │   ├── cap-table.md
│   │   ├── board-deck-notes/
│   │   │   ├── 2026-q1-board-prep.md               # Préparation Q1 : ordre du jour, questions, actions à suivre
│   │   │   ├── 2026-q1-board-notes.md              # Post-conseil : décisions, actions, suivi
│   │   │   └── 2026-q2-board-prep.md
│   │   ├── kpis/
│   │   │   └── kpi-log.md                          # Tableau KPI avec une ligne par mois
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
├── lp-relations/                                      # Tous les supports LP, communications et performance du fonds
│   ├── lp-roster.md                                  # Liste des LP : nom, entité, engagement, instructions de virement, contact
│   ├── quarterly-updates/
│   │   ├── 2026-q1-lp-update.md                    # Lettre LP Q1 2026 : NAV, nouveaux investissements, points saillants du portefeuille
│   │   ├── 2025-q4-lp-update.md
│   │   └── 2025-q3-lp-update.md
│   ├── annual-reports/
│   │   └── 2025-annual-report.md                   # Bilan annuel : IRR, DPI, RVPI, meilleures performances, avancement de la thèse
│   └── capital-call-notices/
│       ├── _template/
│       │   └── capital-call-notice.md              # Avis standard avec montant de l'appel, instructions de virement, délai
│       ├── 2026-04-capital-call-2.md               # Appel de fonds n°2 — investissement Greenmark
│       └── 2025-10-capital-call-1.md               # Appel de fonds n°1 — investissement Apex Data
├── thesis/                                            # Recherches sectorielles et thèses d'investissement
│   ├── sector-theses/
│   │   ├── ai-infrastructure.md                    # Thèse sectorielle complète : cartographie, timing, profil cible, risques
│   │   ├── climate-tech.md
│   │   ├── fintech-infrastructure.md
│   │   └── vertical-saas.md
│   └── market-maps/
│       ├── ai-infra-market-map.md                  # Paysage par couche : compute, entraînement, inférence, outillage, applications
│       ├── climate-market-map.md
│       └── fintech-rails-market-map.md
├── fund-admin/                                        # Administration du fonds et conformité réglementaire
│   ├── cap-table-summary.md                         # Cap table du fonds : toutes les sociétés en portefeuille, pourcentage de détention, coût de revient
│   ├── waterfall-model.md                           # Waterfall des carried interests : hurdle rate, catch-up, répartition carry, split LP/GP
│   ├── compliance-calendar.md                       # Calendrier des obligations réglementaires : K-1, FBAR, enregistrements d'État, dépôts RIA
│   ├── management-fee-tracker.md                   # Calendrier des management fees, paiements reçus, rapprochement avec QuickBooks
│   └── reserve-model.md                            # Modèle de réserves pour les suivis : droits pro-rata par société, cibles d'allocation
└── scratch/
    ├── weekly-deal-notes.md                         # Zone de travail pour les notes de sourcing brutes avant classement dans pipeline
    └── research-clips.md                            # Données de marché brutes et coupures de presse avant mise en forme pour les thèses
```

## Fichiers clés expliqués

| Chemin | Objectif |
|---|---|
| `pipeline/sourcing/deal-tracker.md` | Journal de sourcing principal recensant toutes les leads entrantes et sortantes — société, stade, source, score d'adéquation à la thèse (1-5), responsable, date de premier contact, statut actuel ; ne jamais supprimer d'entrées, seulement mettre à jour le statut |
| `pipeline/diligence/_template/diligence-tracker.md` | Tracker par société de tous les points ouverts sur cinq axes de travail (marché, équipe, finance, tech, juridique) — responsable, deadline, statut, indicateur bloquant pour le CI ; reste ouvert jusqu'à la soumission du mémo IC |
| `pipeline/diligence/_template/financial-model.md` | Fichier de due diligence financière standardisé couvrant la revue du modèle de revenus, le tableau d'économie unitaire, le calcul du burn et du runway, les hypothèses de sensibilité et les signaux d'alerte ; alimente directement la section financière du mémo IC |
| `memos/investment-memos/` | Archive de référence de tous les mémos IC approuvés, classés sous `YYYY-MM-<société>.md` après le vote du CI — consultable pour les valorisations de comparables, l'évolution de la thèse et la reconnaissance de patterns |
| `portfolio/_template/kpis/kpi-log.md` | Template de tableau KPI mensuel avec colonnes pour l'ARR, la croissance MoM, la marge brute, le burn rate, le runway (mois), l'effectif, le NRR et le taux de couverture du pipeline — à compléter mensuellement, sans jamais écraser les entrées précédentes |
| `lp-relations/lp-roster.md` | Liste principale des LP avec dénomination sociale, montant de l'engagement, capital appelé à ce jour, engagement non appelé, instructions de virement, indicateurs de side letter et contact principal — source de vérité pour les avis d'appel de fonds et les distributions |
| `lp-relations/capital-call-notices/` | Avis d'appel de fonds exécutés archivés par date — `YYYY-MM-capital-call-N.md` — utilisés pour le rapprochement LP et les écritures de comptes de capital dans QuickBooks |
| `fund-admin/waterfall-model.md` | Waterfall des carried interests avec hurdle rate, rendement préférentiel, provision de catch-up et répartition GP/LP — mis à jour à chaque événement de sortie ou de réalisation |
| `fund-admin/compliance-calendar.md` | Calendrier de conformité annuel avec les délais de remise des K-1, les dépôts blue sky par État, les dates d'amendement annuel RIA, le FBAR le cas échéant et le calendrier d'audit |

## Scaffold rapide

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

## Template CLAUDE.md

```markdown
# Fonds d'investissement — Instructions Claude Code

## Ce que c'est

Il s'agit du répertoire de travail d'un fonds de capital-risque gérant l'ensemble du dealflow,
le suivi du portefeuille, le reporting aux LP et l'administration du fonds. Les étapes du pipeline
se trouvent dans pipeline/ (sourcing → first-look → diligence → ic → closed ou passed), les
investissements actifs dans portfolio/ (un dossier par société), les mémos IC et de refus dans
memos/, les supports LP dans lp-relations/, la recherche sectorielle dans thesis/ et les opérations
du fonds dans fund-admin/.

Tout le screening de deals, la rédaction des mémos IC, la synthèse de due diligence, le reporting
LP et la préparation des conseils passent par les slash commands Claude Code dans .claude/commands/.

## Stack

- Notion / Airtable — CRM dealflow et base de données du portefeuille ; pipeline kanban par stade ; registre LP
- Carta — Cap table de référence ; exporter les résumés vers portfolio/<société>/cap-table.md
- Visible / Synaptic — Portail de reporting LP ; mises à jour trimestrielles rédigées dans lp-relations/quarterly-updates/
- Pitchbook / Crunchbase — Données de marché et comparables ; les exports vont dans thesis/ et les fichiers de diligence
- QuickBooks — Comptabilité du fonds ; appels de fonds, management fees et distributions réconciliés ici
- DocuSign — Term sheets, contrats de souscription, side letters LP ; copies exécutées dans fund-admin/
- Google Workspace — Le Drive partagé se synchronise avec pipeline/diligence/<société>/data-room/ pour référence hors ligne

## Tâches courantes et commandes exactes

### Screener un deal entrant
```
/deal-screen

Company: [nom]
URL: [site web ou profil Crunchbase/Pitchbook]
Stage: [pre-seed / seed / Series A / Series B]
Sector: [catégorie]
Ask: $[montant] at $[valorisation pre-money ou post-money]
Source: [entrant / intro chaleureuse de X / conférence / cold outbound]
Deck or key metrics: [coller ou décrire — ARR, taux de croissance, background de l'équipe]
Thesis fit check: [quelle thèse sectorielle cela correspond-il ?]
```

### Rédiger un one-pager first-look
```
/first-look

Company: [nom], Stage: [tour], Sector: [catégorie]
Meeting notes: [coller les notes brutes du premier meeting]
Deck highlights: [coller les slides clés ou décrire]
Team background: [bios CEO et CTO et expériences antérieures]
Traction: [ARR, croissance MoM, nombre de clients, NRR si disponible]
Ask: $[montant] at $[valorisation], closing: [date ou ouvert]
Initial thesis fit: [pourquoi cela correspond ou s'étire par rapport à notre thèse]
Open questions before diligence: [ce qui doit être vrai pour avancer]
```

### Synthétiser la due diligence en note prête pour le CI
```
/diligence-brief

Company: [nom], Stage: [tour], IC target date: [date]
Market research findings: [coller depuis diligence/<société>/market-research.md]
Team check findings: [coller depuis diligence/<société>/team-check.md]
Financial model review: [coller depuis diligence/<société>/financial-model.md]
Tech diligence notes: [coller depuis diligence/<société>/tech-diligence.md]
Legal diligence notes: [coller depuis diligence/<société>/legal-diligence.md]
Open items remaining: [coller les lignes ouvertes de diligence-tracker.md]
Key risks to address in memo: [top 3 que le CI va challenger]
```

### Rédiger un mémo IC complet
```
/ic-memo

Company: [nom], Stage: [tour], Sector: [catégorie]
Investment amount: $[montant], Valuation: $[post-money], Ownership: [%]
Investment thesis: [1-2 phrases — pourquoi cette société, pourquoi maintenant, pourquoi nous]
Market: [TAM, SAM, taux de croissance, vents porteurs structurels, thèse de timing]
Team: [parcours des fondateurs, expertise sectorielle, synthèse des références]
Product: [wedge principal, différenciation, moat, roadmap]
Traction: [ARR, croissance MoM, NRR, marge brute, nombre de clients, burn, runway]
Risks and mitigants: [top 3-4 risques avec atténuants spécifiques proposés]
Comparable deals: [3-5 comparables avec stade, valorisation, multiple à la sortie si disponible]
Terms: [lead, pro-rata, siège au conseil, clauses de protection, indicateurs de side letter]
Recommendation: [Investir / Passer / Diligence complémentaire nécessaire]
```

### Rédiger un rapport LP trimestriel
```
/lp-report

Quarter: Q[X] [ANNÉE]
Fund: [Nom du fonds et millésime]
Total fund size: $[X]M, Deployed to date: $[Y]M, Uncalled: $[Z]M
NAV this quarter: $[X]M (prior quarter: $[Y]M)
Gross IRR: [%], Net IRR: [%], DPI: [X]x, RVPI: [Y]x, TVPI: [Z]x
New investments this quarter: [société, montant, stade, secteur]
Portfolio highlights: [top 2-3 jalons — tours clôturés, croissance du chiffre d'affaires, recrutements clés, partenariats]
Concerns or write-downs: [marques ou difficultés du portefeuille à aborder]
Upcoming: [closings attendus, appels de fonds, événements du portefeuille le trimestre prochain]
Market outlook: [contexte macro pertinent pour la thèse du fonds — 2-3 phrases]
```

### Rédiger un avis d'appel de fonds
```
/capital-call

Call number: [#N]
Investment triggering call: [nom de la société], Amount invested: $[X]
Call amount per LP: [proportionnel à l'engagement ou à préciser]
Wire deadline: [date]
Wire instructions: [depuis fund-admin/ ou à préciser]
Purpose note: [libellé standard ou note d'investissement spécifique]
LP roster: [coller depuis lp-relations/lp-roster.md ou préciser le nombre de LP]
```

### Générer la préparation d'un conseil pour une société en portefeuille
```
/board-prep

Company: [nom], Board date: [date]
Last board action items: [coller depuis le fichier de notes du conseil précédent]
Current KPIs: [coller depuis portfolio/<société>/kpis/kpi-log.md]
Last founder update: [coller la mise à jour mensuelle la plus récente]
Agenda items: [finances / roadmap produit / recrutement / levée de fonds / autre]
Key questions to raise: [préoccupations ou opportunités spécifiques à approfondir]
Decisions to make: [attributions d'options, approbations budgétaires, pivots stratégiques]
```

### Rédiger une thèse de sortie pour une société en portefeuille
```
/exit-analysis

Company: [nom], Investment date: [date], Cost basis: $[X]M, Current ownership: [%]
Current ARR: $[X]M, Growth rate: [%], Gross margin: [%]
Likely acquirers: [liste des acheteurs stratégiques avec justification pour chacun]
IPO readiness: [échelle de revenus, profil de croissance, conditions de marché requises]
Hold vs. sell framework: [quelles métriques ou événements déclencheraient une sortie ou un maintien]
Comparable exits: [M&A récents ou IPOs dans la catégorie avec multiples]
Target return scenario: [scénarios 1x / 3x / 5x / 10x et valorisation implicite]
```

## Conventions à respecter

- Les étapes du pipeline sont strictement ordonnées : sourcing → first-look → diligence → ic → closed ou passed
- Toute société atteignant first-look reçoit un one-pager dans pipeline/first-look/<société>/one-pager.md
- Les dossiers de diligence utilisent cinq fichiers standard : market-research.md, team-check.md, financial-model.md, tech-diligence.md, legal-diligence.md — ne pas les renommer
- Les mémos IC sont classés dans memos/investment-memos/YYYY-MM-<société>.md après le vote du CI, quel qu'en soit le résultat
- Lors du closing d'un deal, copier le mémo IC dans portfolio/<société>/memo.md et créer le dossier de portefeuille complet à partir de _template/
- La justification de refus est toujours rédigée — classer dans pipeline/passed/<société>/pass-rationale.md et memos/pass-memos/YYYY-MM-<société>.md
- Les journaux KPI sont en mode ajout uniquement : ajouter une nouvelle ligne chaque mois, ne jamais écraser les entrées précédentes
- Les avis d'appel de fonds sont archivés dans lp-relations/capital-call-notices/YYYY-MM-capital-call-N.md
- Le registre LP dans lp-relations/lp-roster.md est la source de vérité pour tous les avis d'appel de fonds et de distribution
- Le tracker NAV et le modèle de waterfall dans fund-admin/ sont mis à jour dans les 5 jours ouvrés suivant chaque événement de sortie ou de réalisation
- Le calendrier de conformité dans fund-admin/compliance-calendar.md est examiné en début de chaque trimestre
```

## Serveurs MCP

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

## Skills à installer

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

## Liens utiles

- [Guide investisseur](../guides/for-investor.md)
- [Workflow dealflow](../workflows/deal-flow.md)
- [Workflow du processus mémo IC](../workflows/ic-memo-process.md)
- [Workflow reporting LP](../workflows/lp-reporting.md)
