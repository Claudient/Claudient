# Espace de travail Fondateur / PDG — Structure du projet

> Pour un fondateur de startup gérant la stratégie, la levée de fonds, le recrutement et les opérations quotidiennes — mises à jour investisseurs, préparation des conseils d'administration, décisions de recrutement, OKR, pipeline de financement et santé financière, le tout piloté depuis un seul espace de travail Claude Code.

## Stack

- Notion — documents stratégiques, wikis d'équipe, OKR, supports de conseil d'administration
- Linear — feuille de route produit, suivi des sprints, jalons d'ingénierie
- HubSpot ou Attio — CRM investisseurs, étapes du pipeline, suivi des relations
- Gusto ou Rippling — RH, paie, lettres d'offre, registre des effectifs
- Mercury — banque d'entreprise, flux de trésorerie, suivi des dépenses
- Carta — table de capitalisation, attributions d'actions, valorisations 409A, suivi SAFE/notes
- Slack — communication d'équipe, mises à jour asynchrones aux investisseurs, canaux de recrutement
- Google Workspace — e-mail, documents partagés, data room (Google Drive)

## Arborescence

```
founder-workspace/
├── .claude/
│   ├── CLAUDE.md                              # Instructions de l'espace de travail pour Claude Code
│   ├── settings.json                          # Permissions, hooks, configuration du serveur MCP
│   └── commands/
│       ├── investor-update.md                 # Rédiger l'e-mail de mise à jour investisseur (hebdomadaire ou mensuel)
│       ├── board-prep.md                      # Compiler le narratif du deck de conseil, l'ordre du jour, les lectures préalables
│       ├── hiring-decision.md                 # Évaluer un candidat, résumé de scorecard, recommandation embauche/refus
│       ├── okr-review.md                      # Évaluer les OKR en cours, identifier les blocages, ébauche du trimestre suivant
│       ├── weekly-brief.md                    # Bilan hebdomadaire du PDG — victoires, manquements, priorités, sollicitations
│       ├── fundraising-status.md              # Instantané du pipeline de financement, prochaines étapes, santé du tour
│       └── competitive-pulse.md               # Mise à jour du paysage concurrentiel — tri des signaux, mémo de réponse
├── strategy/
│   ├── north-star-metric.md                   # Métrique de succès principale, définition, valeur actuelle, cible
│   ├── company-okrs-2025.md                   # OKR annuels — objectifs, résultats clés, responsables, évaluations
│   ├── company-okrs-q3-2025.md                # OKR trimestriels avec notes de suivi à mi-parcours
│   ├── annual-plan-2025.md                    # Plan opérationnel annuel — effectifs, budget, jalons
│   ├── strategic-bets.md                      # 3 à 5 paris stratégiques avec justification et critères de succès
│   ├── competitive-landscape.md               # Matrice concurrentielle — positionnement, tarification, forces, risques
│   ├── market-map.md                          # Analyse TAM/SAM/SOM, découpage par segment, dimensionnement du marché
│   └── positioning-doc.md                     # ICP, propositions de valeur, différenciation, piliers de message
├── fundraising/
│   ├── round-tracker.md                       # Statut du tour en cours — objectif, montant levé, date de clôture, lead
│   ├── investor-pipeline.md                   # Liste complète des investisseurs — étape, dernier contact, prochaine action, notes
│   ├── term-sheet-tracker.md                  # Term sheets reçus — clauses clés, comparaison, journal de décision
│   ├── pitch-deck-v7.md                       # Narratif du pitch deck actuel (export Notion ou plan)
│   ├── data-room/
│   │   ├── data-room-index.md                 # Index de tous les documents de la data room avec journal d'accès
│   │   ├── cap-table-summary.md               # Instantané de la table de capitalisation Carta — % de détention, modèle de dilution
│   │   ├── financial-model-q2-2025.xlsx       # Modèle financier — P&L, piste de trésorerie, économie unitaire
│   │   ├── corporate-docs-checklist.md        # Constitution, cession de PI, 409A, audits — liste de statut
│   │   └── customer-references.md             # Clients de référence — contact, niveau, NPS, disponibilité
│   └── investor-crm/
│       ├── crm-export-2025-06.csv             # Export pipeline HubSpot/Attio — dernier instantané
│       ├── warm-intros-needed.md              # Investisseurs nécessitant une introduction — qui peut la faire
│       └── post-meeting-notes/
│           ├── a16z-partner-2025-05-14.md     # Notes post-réunion — sentiment, questions, prochaine étape
│           ├── sequoia-scout-2025-05-21.md    # Notes post-réunion
│           └── notable-capital-2025-06-01.md  # Notes post-réunion
├── hiring/
│   ├── headcount-plan-2025.md                 # Effectifs approuvés par le conseil — poste, équipe, trimestre, budget
│   ├── open-roles.md                          # Postes actifs — statut de la fiche de poste, recruteur, volume du pipeline
│   ├── job-descriptions/
│   │   ├── head-of-growth.md                  # Fiche de poste — Responsable Growth / VP Marketing
│   │   ├── senior-engineer-fullstack.md       # Fiche de poste — Ingénieur Full-Stack Senior
│   │   ├── chief-of-staff.md                  # Fiche de poste — Chef de Cabinet / Responsable Opérations
│   │   └── account-executive.md               # Fiche de poste — Account Executive (PME)
│   ├── scorecards/
│   │   ├── scorecard-template.md              # Modèle canonique de scorecard d'entretien
│   │   ├── eng-scorecard.md                   # Scorecard — postes techniques
│   │   ├── gtm-scorecard.md                   # Scorecard — postes ventes et marketing
│   │   └── leadership-scorecard.md            # Scorecard — niveau directeur et VP
│   ├── offer-templates/
│   │   ├── offer-letter-template.md           # Modèle standard de lettre d'offre
│   │   ├── equity-grant-explainer.md          # Explication de l'équité en langage clair pour les candidats
│   │   └── comp-bands-2025.md                 # Grilles de rémunération par niveau et fonction
│   └── pipeline-notes/
│       ├── active-candidates.md               # Candidats en cours — poste, étape, prochaine action, date de décision
│       └── offers-log.md                      # Historique des offres — poste, rémunération, équité, accepté/refusé
├── board/
│   ├── board-composition.md                   # Membres actuels du conseil — cabinet, type de siège, mandat, comités
│   ├── board-calendar-2025.md                 # Calendrier des réunions, participants prévus, ordre du jour récurrent
│   ├── materials/
│   │   ├── 2025-q1-board-deck.md              # Narratif du deck Q1 et métriques clés
│   │   ├── 2025-q2-board-deck.md              # Narratif du deck Q2 (en cours)
│   │   └── ceo-letter-q2-2025.md              # Lettre du PDG au conseil — contexte franc et sollicitations
│   ├── minutes/
│   │   ├── minutes-2025-03-15.md              # Procès-verbal de la réunion du conseil — bilan Q1
│   │   └── minutes-2025-06-10.md              # Procès-verbal de la réunion du conseil — bilan Q2
│   └── resolutions/
│       ├── resolution-option-grant-2025-05.md # Résolution du conseil — attribution d'options
│       └── resolution-financing-2025-06.md    # Résolution du conseil — autorisation de financement
├── finance/
│   ├── runway-model.md                        # Analyse de la piste de trésorerie — taux de consommation, mois restants, scénarios
│   ├── cash-flow-forecast-q3-2025.md          # Prévision de trésorerie sur 13 semaines
│   ├── unit-economics.md                      # CAC, LTV, période de remboursement, marge brute par segment
│   ├── monthly-financials/
│   │   ├── p-and-l-2025-05.md                 # P&L mai — réalisé vs budget
│   │   ├── p-and-l-2025-04.md                 # P&L avril
│   │   └── balance-sheet-2025-05.md           # Instantané du bilan mai
│   ├── budget-2025.md                         # Budget annuel — opex, effectifs, capex par département
│   └── mercury-transactions-2025-06.csv       # Export bancaire Mercury — transactions du mois en cours
├── product/
│   ├── product-roadmap-q3-2025.md             # Feuille de route trimestrielle — initiatives, responsables, jalons
│   ├── product-vision.md                      # Vision produit à 2 ans — cap et justification
│   ├── prds/
│   │   ├── prd-template.md                    # Modèle canonique de PRD
│   │   ├── prd-onboarding-revamp.md           # PRD — refonte du parcours d'onboarding
│   │   └── prd-api-v2.md                      # PRD — API publique v2
│   ├── launch-plans/
│   │   ├── launch-api-v2.md                   # Plan de lancement — mise sur le marché de l'API v2
│   │   └── launch-mobile-app.md               # Plan de lancement — bêta de l'application mobile
│   └── metrics/
│       ├── product-kpis.md                    # KPI produit principaux — DAU, activation, rétention, NPS
│       └── feature-adoption.md                # Données d'adoption par fonctionnalité et enseignements
└── comms/
    ├── investor-updates/
    │   ├── update-template.md                 # Modèle de mise à jour investisseur — victoires, métriques, sollicitations
    │   ├── update-2025-05.md                  # Mise à jour investisseurs mai (envoyée)
    │   └── update-2025-06-draft.md            # Mise à jour investisseurs juin (brouillon)
    ├── all-hands/
    │   ├── all-hands-template.md              # Modèle d'ordre du jour et de narratif pour le all-hands
    │   ├── all-hands-2025-06-notes.md         # Notes et Q&R du all-hands juin
    │   └── all-hands-2025-03-notes.md         # Notes du all-hands mars
    └── external/
        ├── press-release-template.md          # Modèle de communiqué de presse pour annonces de financement et lancements
        └── founder-bio.md                     # Biographie actuelle du fondateur — version longue et courte
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `.claude/commands/investor-update.md` | Commande slash qui lit `finance/runway-model.md`, `strategy/company-okrs-q3-2025.md` et `comms/investor-updates/update-template.md` pour rédiger une mise à jour investisseur complète avec métriques, victoires, manquements et sollicitations |
| `.claude/commands/board-prep.md` | Commande slash qui compile `finance/monthly-financials/`, `strategy/company-okrs-*.md` et `product/product-roadmap-*.md` en un narratif de conseil et un ordre du jour |
| `.claude/commands/fundraising-status.md` | Commande slash qui lit `fundraising/investor-pipeline.md` et `fundraising/round-tracker.md` pour produire un instantané de santé du pipeline et des prochaines actions suggérées |
| `fundraising/data-room/financial-model-q2-2025.xlsx` | Modèle financier de référence — P&L, piste de trésorerie, économie unitaire et plan d'effectifs ; référencé dans les decks de conseil et la due diligence |
| `strategy/company-okrs-2025.md` | Document OKR annuel avec découpage trimestriel, responsables des résultats clés et grille d'évaluation — mis à jour chaque trimestre |
| `finance/runway-model.md` | Analyse de piste de trésorerie en temps réel avec taux de consommation actuel, solde de trésorerie, scénarios d'effectifs et mois restants à chaque niveau de consommation |
| `hiring/comp-bands-2025.md` | Grilles de rémunération internes par fonction et niveau — utilisées pour valider les offres et informer le budget d'effectifs |
| `board/materials/ceo-letter-q2-2025.md` | Lettre franche du PDG au conseil — contexte derrière les métriques, risques et sollicitations explicites absentes du deck |
| `fundraising/investor-pipeline.md` | Liste complète de suivi des investisseurs avec étape, date du dernier contact, responsable de la relation, statut d'introduction et prochaine action |
| `comms/investor-updates/update-template.md` | Format canonique de mise à jour investisseur — tableau de métriques, temps forts, actualités équipe, financiers et section sollicitations |

## Mise en place rapide

```bash
# Créer la racine de l'espace de travail
mkdir -p founder-workspace
cd founder-workspace

# Créer la structure .claude
mkdir -p .claude/commands

# Créer tous les répertoires de l'espace de travail
mkdir -p strategy
mkdir -p fundraising/data-room
mkdir -p fundraising/investor-crm/post-meeting-notes
mkdir -p hiring/job-descriptions
mkdir -p hiring/scorecards
mkdir -p hiring/offer-templates
mkdir -p hiring/pipeline-notes
mkdir -p board/materials
mkdir -p board/minutes
mkdir -p board/resolutions
mkdir -p finance/monthly-financials
mkdir -p product/prds
mkdir -p product/launch-plans
mkdir -p product/metrics
mkdir -p comms/investor-updates
mkdir -p comms/all-hands
mkdir -p comms/external

# Initialiser les fichiers clés
touch strategy/north-star-metric.md
touch strategy/company-okrs-2025.md
touch strategy/competitive-landscape.md
touch fundraising/round-tracker.md
touch fundraising/investor-pipeline.md
touch fundraising/term-sheet-tracker.md
touch fundraising/data-room/data-room-index.md
touch hiring/headcount-plan-2025.md
touch hiring/open-roles.md
touch hiring/scorecards/scorecard-template.md
touch hiring/offer-templates/comp-bands-2025.md
touch hiring/pipeline-notes/active-candidates.md
touch board/board-composition.md
touch board/board-calendar-2025.md
touch finance/runway-model.md
touch finance/cash-flow-forecast-q3-2025.md
touch finance/unit-economics.md
touch finance/budget-2025.md
touch product/product-roadmap-q3-2025.md
touch product/product-vision.md
touch product/prds/prd-template.md
touch product/metrics/product-kpis.md
touch comms/investor-updates/update-template.md
touch comms/all-hands/all-hands-template.md

# Installer les compétences Claude Code
npx claudient add skill productivity/founder-weekly-review
npx claudient add skill productivity/investor-update
npx claudient add skill productivity/exec-briefing
npx claudient add skill productivity/engineering-strategy
npx claudient add skill finance/pitch-deck
npx claudient add skill finance/financial-plan
npx claudient add skill small-business/cash-flow-forecast
npx claudient add skill small-business/hiring-pipeline

# Installer les commandes slash
npx claudient add command investor-update
npx claudient add command board-prep
npx claudient add command hiring-decision
npx claudient add command okr-review
npx claudient add command weekly-brief
npx claudient add command fundraising-status
npx claudient add command competitive-pulse
```

## Modèle CLAUDE.md

```markdown
# Espace de travail Fondateur / PDG

Cet espace de travail accompagne un fondateur de startup dans la gestion de la stratégie, de la levée de fonds,
du recrutement et des opérations quotidiennes. Claude Code lit le contexte depuis des fichiers structurés
dans ce dépôt pour produire des résultats précis et spécifiques à l'entreprise — pas des conseils génériques
pour startups.

---

## Ce qu'est cet espace

Un espace de travail Claude Code pour un fondateur ou PDG. Chaque répertoire correspond à une responsabilité
centrale : pipeline de financement, gestion du conseil, recrutement, santé financière, feuille de route produit
et communications externes. Claude lit ces fichiers et produit des brouillons, analyses et décisions qu'il
restitue dans la même structure.

---

## Stack

- Notion — documents stratégiques, wikis d'équipe, OKR (MCP : notion)
- Linear — feuille de route produit et suivi des sprints (MCP : linear)
- HubSpot ou Attio — CRM investisseurs et pipeline de financement
- Gusto ou Rippling — RH, paie et gestion des offres
- Mercury — banque d'entreprise et flux de trésorerie
- Carta — table de capitalisation, attributions d'actions et suivi des SAFE
- Slack — communication d'équipe et mises à jour asynchrones aux investisseurs (MCP : slack)
- Google Workspace — data room (Drive), e-mail, documents partagés

---

## Conventions des répertoires

- `strategy/` — OKR de l'entreprise, étoile du nord, plan annuel, paysage concurrentiel. Les fichiers OKR
  sont nommés par année et trimestre. Ne jamais supprimer d'anciens fichiers OKR — ils constituent le registre
  d'évaluation.
- `fundraising/` — Suivi du tour, pipeline investisseurs et data room. `investor-pipeline.md` est la source
  de vérité pour toutes les relations investisseurs. Les notes post-réunion vont dans
  `investor-crm/post-meeting-notes/` et sont nommées `cabinet-YYYY-MM-DD.md`.
- `hiring/` — Tous les actifs de recrutement. Les grilles de rémunération dans `offer-templates/comp-bands-2025.md`
  sont confidentielles — ne jamais les inclure dans les decks de conseil ou les mises à jour investisseurs.
- `board/` — Supports du conseil, procès-verbaux et résolutions. Les procès-verbaux sont archivés après
  chaque réunion. Les résolutions nécessitent la signature d'un membre du conseil avant archivage.
- `finance/` — Modèle de piste de trésorerie, flux de trésorerie, P&L et budget. `runway-model.md` est mis
  à jour à chaque changement de taux de consommation ou d'effectifs. Les fichiers P&L mensuels sont nommés
  `p-and-l-YYYY-MM.md`.
- `product/` — Feuille de route, PRD et plans de lancement. Un PRD par fonctionnalité. Les fichiers de feuille
  de route sont nommés par trimestre. `product-vision.md` est un document stable à 2 ans, pas un plan de sprint.
- `comms/` — Mises à jour investisseurs et notes de all-hands. Les mises à jour investisseurs envoyées
  ne sont jamais modifiées. Les brouillons sont suffixés `-draft.md` jusqu'à l'envoi.

---

## Tâches courantes — commandes exactes

### Levée de fonds
```
/investor-update       — Rédiger la mise à jour investisseur à partir des métriques, OKR et temps forts du mois précédent
/fundraising-status    — Instantané du pipeline : étapes, dossiers bloqués, prochaines actions, santé du tour
```

### Gestion du conseil
```
/board-prep            — Compiler le narratif du deck, l'ordre du jour, la lettre du PDG et la liste de lectures préalables
```

### Recrutement
```
/hiring-decision       — Évaluer un candidat : résumé de scorecard, recommandation embauche/refus
```

### Stratégie et OKR
```
/okr-review            — Évaluer les OKR en cours, identifier les blocages, ébaucher les objectifs du trimestre suivant
/competitive-pulse     — Trier les signaux concurrentiels, mettre à jour le doc paysage, rédiger un mémo de réponse
```

### Rythme hebdomadaire
```
/weekly-brief          — Bilan hebdomadaire du PDG : victoires, manquements, priorités principales, blocages, sollicitations
```

---

## Conventions que Claude doit respecter

- Tirer les chiffres financiers uniquement de `finance/runway-model.md` et `finance/monthly-financials/`.
  Ne pas inventer ni estimer de chiffres.
- Les étapes du pipeline investisseur dans `fundraising/investor-pipeline.md` font foi.
  Ne pas les contredire dans les rapports de statut de financement.
- Les grilles de rémunération dans `hiring/offer-templates/comp-bands-2025.md` sont confidentielles.
  Ne jamais les inclure dans les mises à jour investisseurs, decks de conseil ou tout document quittant l'espace de travail.
- Les évaluations OKR utilisent une échelle de 0,0 à 1,0. 0,7 est un résultat solide. 1,0 signifie que la cible était trop basse.
- Les supports du conseil sont rédigés 5 jours ouvrés avant chaque date de réunion indiquée dans `board/board-calendar-2025.md`.
- Les notes post-réunion investisseur doivent inclure : sentiment (positif/neutre/prudent), questions clés posées,
  objections soulevées et prochaine étape explicite avec responsable et date.
- Toutes les mises à jour investisseurs suivent le modèle à `comms/investor-updates/update-template.md`.
  Ne pas modifier l'ordre des sections ni omettre la section sollicitations.
```

## Serveurs MCP

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-notion"],
      "env": {
        "NOTION_API_KEY": "${NOTION_API_KEY}"
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
        "/Users/you/founder-workspace"
      ]
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"comms/investor-updates/\" && ! echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"draft\"; then echo \"[Investor update hook] Investor update filed — confirm it has been sent to your investor list and archived.\"; fi'"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"hiring/offer-templates/comp-bands\"; then echo \"[Confidential hook] WARNING: comp-bands-2025.md is confidential. Confirm this output is not destined for an investor or board document.\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'echo \"[Session end] If you updated fundraising/investor-pipeline.md or finance/runway-model.md, confirm the changes are saved and reflect the current date.\"'"
          }
        ]
      }
    ]
  }
}
```

## Compétences à installer

```bash
npx claudient add skill productivity/founder-weekly-review
npx claudient add skill productivity/investor-update
npx claudient add skill productivity/exec-briefing
npx claudient add skill productivity/engineering-strategy
npx claudient add skill productivity/process-mapper
npx claudient add skill productivity/comp-benchmarker
npx claudient add skill finance/pitch-deck
npx claudient add skill finance/financial-plan
npx claudient add skill small-business/cash-flow-forecast
npx claudient add skill small-business/hiring-pipeline
```

## Liens associés

- [Guide : Claude pour les fondateurs et PDG](../guides/for-founder.md)
- [Workflow : Pipeline de financement](../workflows/fundraising-pipeline.md)
- [Workflow : Préparation du conseil d'administration](../workflows/board-meeting-prep.md)
- [Workflow : Bilan hebdomadaire du PDG](../workflows/founder-weekly-review.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
