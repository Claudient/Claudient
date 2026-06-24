# Opérations d'une agence marketing — Structure de projet

> Pour les agences marketing gérant plusieurs campagnes clients — de l'intégration et la prise en charge des briefs jusqu'à la production de contenu, la publicité payante, les rapports mensuels et la facturation des retainers — dans un seul espace de travail Claude Code.

## Stack

- **Gestion de projet :** Asana (Projets, Chronologies, Portefeuilles) ou Monday.com (Tableaux, Automatisations, Tableaux de bord)
- **CRM + suivi des campagnes :** HubSpot CRM (contacts, deals, performance des campagnes, séquences email)
- **Docs + collaboration :** Google Workspace (Docs, Sheets, Slides, Drive)
- **Création :** Figma (design de marque, créations publicitaires, maquettes de pages d'atterrissage, présentations)
- **SEO :** Semrush (Keyword Magic, Position Tracking, Site Audit, Backlink Analytics)
- **Référencement payant :** Google Ads (Search, Display, Performance Max, campagnes Demand Gen)
- **Social payant :** Meta Business Suite (Facebook + Instagram Ads Manager, Audience Insights)
- **Communication :** Slack (canaux clients, canaux internes, alertes de campagnes)
- **Suivi du temps :** Harvest (suivi du temps par projet, consommation du budget, capacité de l'équipe)
- **Facturation :** FreshBooks (factures de retainer, facturation de projets, suivi des dépenses, rapports)
- **Analytique :** Google Analytics 4, Looker Studio (tableaux de bord multicanaux)

## Arborescence des répertoires

```
marketing-agency/
├── .claude/
│   ├── CLAUDE.md                                     # Instructions de l'espace de travail pour Claude Code
│   ├── settings.json                                 # Serveurs MCP, hooks, permissions
│   └── commands/
│       ├── new-client.md                             # /new-client — créer l'arborescence complète du client à partir du modèle
│       ├── campaign-brief.md                         # /campaign-brief — générer un brief de campagne à partir des notes d'intake
│       ├── monthly-report.md                         # /monthly-report — extraire les métriques et rédiger le rapport client
│       ├── retainer-check.md                         # /retainer-check — comparer les heures enregistrées au périmètre du retainer
│       ├── proposal.md                               # /proposal — rédiger une proposition commerciale à partir du brief
│       ├── ad-copy.md                                # /ad-copy — générer des variantes de textes publicitaires Google Ads et Meta
│       ├── seo-audit.md                              # /seo-audit — produire un résumé d'audit Semrush pour le client
│       └── scope-change.md                           # /scope-change — rédiger un avenant avec impact sur la facturation
├── clients/
│   ├── _template/                                    # Modèle principal — copier dans clients/<nom-client>/ lors de l'intégration
│   │   ├── brief/
│   │   │   ├── client-intake.md                     # Réponses au questionnaire d'intake
│   │   │   └── discovery-notes.md                   # Notes de la réunion de lancement
│   │   ├── strategy/
│   │   │   ├── marketing-strategy.md                # Stratégie de canal globale et feuille de route 90 jours
│   │   │   ├── target-audience.md                   # ICP, personas, points de douleur
│   │   │   └── competitor-analysis.md               # Paysage concurrentiel, lacunes, opportunités
│   │   ├── campaigns/
│   │   │   └── _campaign-template/
│   │   │       ├── campaign-brief.md                # Objectifs, audience, messages, budget, calendrier
│   │   │       ├── ad-copy.md                       # Toutes les variantes de textes par canal
│   │   │       ├── creative-brief.md                # Brief Figma pour l'équipe créative
│   │   │       └── results/
│   │   │           └── campaign-report.md           # Bilan des résultats post-campagne
│   │   ├── assets/
│   │   │   ├── brand-guidelines.md                  # Couleurs, typographies, ton de la marque
│   │   │   ├── logo/                                # Fichiers logo approuvés (SVG, PNG)
│   │   │   └── approved-copy/                       # Titres, slogans et textes types approuvés
│   │   ├── reports/
│   │   │   ├── onboarding-report.md                 # Audit de référence livré lors du lancement
│   │   │   └── _monthly-template.md                 # Copier ce fichier pour chaque rapport mensuel
│   │   └── contracts/
│   │       ├── sow.md                               # Énoncé des travaux avec livrables et périmètre
│   │       ├── retainer-agreement.md                # Conditions du retainer mensuel et heures incluses
│   │       └── amendments/                          # Avenants de modification de périmètre signés
│   ├── acme-corp/
│   │   ├── brief/
│   │   │   ├── client-intake.md
│   │   │   └── discovery-notes.md
│   │   ├── strategy/
│   │   │   ├── marketing-strategy.md
│   │   │   ├── target-audience.md
│   │   │   └── competitor-analysis.md
│   │   ├── campaigns/
│   │   │   ├── 2026-q2-brand-awareness/
│   │   │   │   ├── campaign-brief.md
│   │   │   │   ├── ad-copy.md
│   │   │   │   ├── creative-brief.md
│   │   │   │   └── results/
│   │   │   │       └── campaign-report.md
│   │   │   └── 2026-q3-lead-gen/
│   │   │       ├── campaign-brief.md
│   │   │       ├── ad-copy.md
│   │   │       └── creative-brief.md
│   │   ├── assets/
│   │   │   ├── brand-guidelines.md
│   │   │   ├── logo/
│   │   │   └── approved-copy/
│   │   ├── reports/
│   │   │   ├── onboarding-report.md
│   │   │   ├── 2026-04-monthly-report.md
│   │   │   ├── 2026-05-monthly-report.md
│   │   │   └── _monthly-template.md
│   │   └── contracts/
│   │       ├── sow.md
│   │       ├── retainer-agreement.md
│   │       └── amendments/
│   │           └── 2026-05-scope-change-01.md
│   └── blueprint-health/
│       ├── brief/
│       ├── strategy/
│       ├── campaigns/
│       ├── assets/
│       ├── reports/
│       └── contracts/
├── templates/
│   ├── campaign-brief.md                            # Brief de campagne vierge — objectifs, audience, budget, canaux
│   ├── monthly-report.md                            # Structure du rapport mensuel — résumé exécutif, KPIs, détail par canal
│   ├── proposal.md                                  # Proposition commerciale — situation, approche, équipe, investissement
│   ├── sow.md                                       # Énoncé des travaux — livrables, calendriers, périmètre, exclusions
│   ├── creative-brief.md                            # Brief créatif pour Figma — contexte, livrables, specs, contraintes
│   └── scope-change-order.md                        # Avenant de modification — description, heures, facturation révisée
├── campaigns/
│   └── active/
│       ├── acme-corp--q3-lead-gen/                  # Lien symbolique ou copie du répertoire de campagne active pour accès rapide
│       └── blueprint-health--seo-sprint/
├── new-business/
│   ├── prospect-list.md                             # Suivi des prospects façon CRM avec étape, contact, notes
│   ├── proposals/
│   │   ├── greenfield-retail-2026-05.md             # Propositions envoyées archivées ici
│   │   └── northstar-saas-2026-06.md
│   └── pitch-decks/
│       ├── agency-capabilities-2026.md              # Document de référence sur les capacités de l'agence (source pour les présentations)
│       └── greenfield-retail-deck-outline.md        # Plan de présentation avant transfert vers Slides/Figma
├── operations/
│   ├── sops/
│   │   ├── client-onboarding.md                    # Checklist étape par étape pour l'intégration d'un nouveau client
│   │   ├── campaign-launch.md                      # Checklist pré-lancement pour les campagnes payantes
│   │   ├── monthly-reporting.md                    # Processus de reporting — extraction des données, rédaction, révision, envoi
│   │   ├── offboarding.md                          # Offboarding client — transfert des assets, révocation des accès
│   │   └── retainer-renewal.md                     # Processus de renouvellement — bilan, upsell, SOW révisé
│   ├── onboarding/
│   │   ├── new-hire-checklist.md                   # Accès aux outils, canaux Slack, configuration Harvest
│   │   └── client-onboarding-checklist.md          # Checklist parallèle pour les étapes côté client
│   ├── offboarding/
│   │   └── client-offboarding-checklist.md
│   └── rate-card.md                                 # Tarifs horaires actuels et grille de prix des retainers
└── resources/
    ├── brand-guidelines/
    │   └── agency-brand.md                          # Guide de marque de l'agence pour les pitchs et propositions
    ├── media-kits/
    │   └── agency-media-kit-2026.md                 # Présentation de l'agence, portefeuille clients, résultats marquants
    └── case-studies/
        ├── acme-corp-brand-awareness.md             # Étude de cas structurée — défi, approche, résultats
        └── blueprint-health-seo.md
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `.claude/commands/new-client.md` | Commande slash qui crée l'arborescence complète `clients/<slug>/` à partir de `clients/_template/`, pré-remplit le formulaire d'intake et génère un brouillon de SOW et d'accord de retainer |
| `.claude/commands/campaign-brief.md` | Prend en entrée un slug client, un objectif de campagne, un budget et des canaux ; produit un brief de campagne entièrement structuré, aligné sur les directives de marque et la stratégie existantes du client |
| `.claude/commands/monthly-report.md` | Lit les métriques par canal (GA4, Google Ads, Meta, Semrush) depuis un fichier de données structuré et rédige le rapport client mensuel en utilisant `templates/monthly-report.md` |
| `.claude/commands/retainer-check.md` | Compare les heures enregistrées dans Harvest au périmètre du retainer défini dans `contracts/retainer-agreement.md` et signale les dépassements ou le budget disponible |
| `.claude/commands/scope-change.md` | Rédige un avenant de modification de périmètre avec les heures, la justification et la facturation révisée en utilisant `templates/scope-change-order.md` ; enregistre dans `clients/<slug>/contracts/amendments/` |
| `clients/_template/` | Répertoire de scaffolding principal — copier ce dossier entier lors de l'intégration d'un nouveau client pour s'assurer que tous les dossiers et fichiers existent avant le lancement |
| `operations/sops/monthly-reporting.md` | SOP de référence pour le processus de reporting mensuel — définit qui extrait les données, quel est le cycle de révision et quand les rapports sont envoyés aux clients |
| `templates/campaign-brief.md` | Brief de campagne standard de l'agence avec des sections pour l'objectif commercial, les métriques de succès, l'audience, les piliers de message, le plan de canaux, le budget et le calendrier |

## Scaffold rapide

```bash
# Créer la racine de l'espace de travail
mkdir -p marketing-agency && cd marketing-agency

# Configuration Claude Code
mkdir -p .claude/commands

# Répertoire _template client (profondeur complète)
mkdir -p clients/_template/brief
mkdir -p clients/_template/strategy
mkdir -p clients/_template/campaigns/_campaign-template/results
mkdir -p clients/_template/assets/logo
mkdir -p clients/_template/assets/approved-copy
mkdir -p clients/_template/reports
mkdir -p clients/_template/contracts/amendments

# Exemples de répertoires clients
mkdir -p clients/acme-corp/brief
mkdir -p clients/acme-corp/strategy
mkdir -p clients/acme-corp/campaigns/2026-q2-brand-awareness/results
mkdir -p clients/acme-corp/campaigns/2026-q3-lead-gen
mkdir -p clients/acme-corp/assets/logo
mkdir -p clients/acme-corp/assets/approved-copy
mkdir -p clients/acme-corp/reports
mkdir -p clients/acme-corp/contracts/amendments

mkdir -p clients/blueprint-health/brief
mkdir -p clients/blueprint-health/strategy
mkdir -p clients/blueprint-health/campaigns
mkdir -p clients/blueprint-health/assets
mkdir -p clients/blueprint-health/reports
mkdir -p clients/blueprint-health/contracts/amendments

# Modèles
mkdir -p templates

# Raccourci campagnes actives
mkdir -p campaigns/active

# Nouvelles affaires
mkdir -p new-business/proposals
mkdir -p new-business/pitch-decks

# Opérations
mkdir -p operations/sops
mkdir -p operations/onboarding
mkdir -p operations/offboarding

# Ressources
mkdir -p resources/brand-guidelines
mkdir -p resources/media-kits
mkdir -p resources/case-studies

# Initialiser les fichiers de configuration
touch .claude/CLAUDE.md
touch .claude/settings.json

# Créer les fichiers modèles de base
touch clients/_template/brief/client-intake.md
touch clients/_template/brief/discovery-notes.md
touch clients/_template/strategy/marketing-strategy.md
touch clients/_template/strategy/target-audience.md
touch clients/_template/strategy/competitor-analysis.md
touch clients/_template/campaigns/_campaign-template/campaign-brief.md
touch clients/_template/campaigns/_campaign-template/ad-copy.md
touch clients/_template/campaigns/_campaign-template/creative-brief.md
touch clients/_template/reports/_monthly-template.md
touch clients/_template/contracts/sow.md
touch clients/_template/contracts/retainer-agreement.md
touch templates/campaign-brief.md
touch templates/monthly-report.md
touch templates/proposal.md
touch templates/sow.md
touch templates/creative-brief.md
touch templates/scope-change-order.md
touch new-business/prospect-list.md
touch operations/sops/client-onboarding.md
touch operations/sops/campaign-launch.md
touch operations/sops/monthly-reporting.md
touch operations/sops/offboarding.md
touch operations/sops/retainer-renewal.md
touch operations/rate-card.md

# Installer toutes les compétences pertinentes
npx uitkit add skill marketing/campaign-brief
npx uitkit add skill marketing/ad-copy-generator
npx uitkit add skill marketing/monthly-report
npx uitkit add skill marketing/seo-audit
npx uitkit add skill marketing/content-strategy
npx uitkit add skill productivity/stakeholder-comms
npx uitkit add skill productivity/vendor-evaluator
npx uitkit add skill productivity/process-mapper
npx uitkit add skill productivity/exec-briefing
npx uitkit add skill data-ml/stakeholder-report

# Installer les commandes slash
npx uitkit add command new-client
npx uitkit add command campaign-brief
npx uitkit add command monthly-report
npx uitkit add command retainer-check
npx uitkit add command proposal
npx uitkit add command ad-copy
npx uitkit add command seo-audit
npx uitkit add command scope-change

echo "Marketing agency workspace ready."
```

## Modèle CLAUDE.md

```markdown
# Opérations d'une agence marketing — Instructions Claude

## Contexte

Cet espace de travail gère les opérations d'une agence marketing multi-clients : intégration des clients,
développement de briefs de campagne, publicité payante (Google Ads + Meta), SEO (Semrush), reporting
mensuel, suivi du périmètre des retainers et développement de propositions commerciales. Chaque client
dispose d'un répertoire isolé sous clients/. Tous les modèles se trouvent dans templates/.

## Stack

- Gestion de projet : Asana (un projet par client, tâches de campagne, chronologies)
- CRM : HubSpot (contacts et deals, suivi des campagnes, séquences email)
- Docs : Google Workspace (Docs pour les livrables, Sheets pour les plans médias, Slides pour les présentations)
- Création : Figma (créations publicitaires, pages d'atterrissage, présentations)
- SEO : Semrush (recherche de mots-clés, suivi de positionnement, audit de site, analyse des backlinks)
- Référencement payant : Google Ads (Search, Display, Performance Max)
- Social payant : Meta Business Suite (Facebook + Instagram Ads Manager)
- Suivi du temps : Harvest (par projet, facturable vs non-facturable par client)
- Facturation : FreshBooks (factures de retainer, facturation de projets, réconciliation des dépenses)
- Communication : Slack (#client-<nom> par client, #campaigns, #new-business, #ops)
- Analytique : Google Analytics 4, tableaux de bord Looker Studio

## Conventions de répertoires

- clients/<client-slug>/ — tous les livrables clients ; ne jamais mélanger les assets entre dossiers clients
- clients/<client-slug>/campaigns/<YYYY-qN-nom-campagne>/ — un répertoire par campagne
- clients/<client-slug>/reports/<YYYY-MM>-monthly-report.md — rapports mensuels nommés par période
- clients/<client-slug>/contracts/amendments/ — chaque modification de périmètre reçoit un fichier numéroté
- templates/ — source de vérité pour toutes les structures documentaires ; ne jamais rédiger sans copier un modèle
- new-business/ — suivi des prospects, propositions et plans de présentation uniquement
- operations/sops/ — documentation de référence des processus ; à mettre à jour en cas de changement

## Intégration d'un nouveau client

1. Copier clients/_template/ vers clients/<slug-nouveau-client>/ :
   cp -r clients/_template clients/<slug-nouveau-client>
2. Lancer /new-client client="<Nom>" slug="<slug>" retainer="<heures-mensuelles>"
3. Compléter clients/<slug>/brief/client-intake.md avant la réunion de lancement
4. Après le lancement, remplir clients/<slug>/strategy/marketing-strategy.md
5. Rédiger le SOW en utilisant templates/sow.md ; enregistrer dans clients/<slug>/contracts/sow.md
6. Créer le projet Asana et lier l'ID du projet dans clients/<slug>/brief/discovery-notes.md
7. Créer le deal HubSpot et lier l'ID du deal dans discovery-notes.md
8. Ouvrir le projet Harvest pour le client en utilisant le tarif dans operations/rate-card.md

## Processus de brief de campagne

1. Lancer /campaign-brief client="<slug>" goal="<objectif>" budget="<montant>" channels="<liste>"
2. Réviser et affiner clients/<slug>/campaigns/<répertoire-campagne>/campaign-brief.md
3. Lancer /ad-copy brief=clients/<slug>/campaigns/<répertoire-campagne>/campaign-brief.md
4. Envoyer creative-brief.md à Figma — se référer à brand-guidelines.md pour les contraintes de specs
5. Au lancement, exécuter /seo-audit client="<slug>" pour les campagnes organiques ; vérifier le positionnement de référence Semrush
6. Enregistrer la date de début de campagne dans Harvest comme note de jalon

## Processus de reporting mensuel

1. Exporter les données par canal (GA4, Google Ads, Meta, Semrush position tracking) vers un CSV ou un .md structuré
2. Placer les données exportées dans clients/<slug>/reports/raw-data-<YYYY-MM>.md
3. Lancer /monthly-report client="<slug>" period="<YYYY-MM>" data=clients/<slug>/reports/raw-data-<YYYY-MM>.md
4. Réviser le brouillon dans clients/<slug>/reports/<YYYY-MM>-monthly-report.md
5. Révision interne via Slack #campaigns avant envoi au client
6. Après validation client, archiver sur Google Drive et marquer comme envoyé dans Asana

## Gestion du périmètre des retainers

- Lancer /retainer-check client="<slug>" month="<YYYY-MM>" après chaque export Harvest
- Heures hors périmètre : rédiger un avenant avant d'enregistrer des heures supplémentaires
  /scope-change client="<slug>" hours="<dépassement>" reason="<description>"
- Enregistrer le résultat dans clients/<slug>/contracts/amendments/YYYY-MM-scope-change-NN.md
- Renouvellements de retainer : suivre operations/sops/retainer-renewal.md 30 jours avant la date de fin

## Conventions pour les textes publicitaires

- Titres Google Ads : 30 caractères maximum ; rédiger 10 variantes ou plus par campagne
- Descriptions Google Ads : 90 caractères maximum ; commencer par le bénéfice, terminer par un CTA
- Texte principal Meta : 125 caractères visibles avant troncature ; accroche dans les 80 premiers caractères
- Titre Meta : 40 caractères maximum ; axé sur le bénéfice, sans clickbait
- Tous les textes doivent être validés par rapport aux directives de marque du client avant publication

## Conventions de facturation

- Enregistrer le temps dans Harvest immédiatement après chaque tâche — ne pas regrouper en fin de semaine
- Codes facturables : strategy, content, paid-media, reporting, account-management, design
- Non-facturable : formation interne, configuration des outils, administration
- Facturer le 1er de chaque mois via FreshBooks ; se référer au rapport Harvest pour le détail des heures
```

## Serveurs MCP

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/${USER}/marketing-agency"
      ]
    },
    "hubspot": {
      "command": "npx",
      "args": ["-y", "@hubspot/mcp-server"],
      "env": {
        "HUBSPOT_ACCESS_TOKEN": "${HUBSPOT_ACCESS_TOKEN}"
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
    "google-drive": {
      "command": "npx",
      "args": ["-y", "@google-labs/google-drive-mcp"],
      "env": {
        "GOOGLE_CLIENT_ID": "${GOOGLE_CLIENT_ID}",
        "GOOGLE_CLIENT_SECRET": "${GOOGLE_CLIENT_SECRET}",
        "GOOGLE_REFRESH_TOKEN": "${GOOGLE_REFRESH_TOKEN}"
      }
    },
    "asana": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-asana"],
      "env": {
        "ASANA_ACCESS_TOKEN": "${ASANA_ACCESS_TOKEN}"
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
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_OUTPUT_FILE_PATH\"; if [[ \"$FILE\" == */campaigns/*/campaign-brief.md ]]; then echo \"[hook] Campaign brief saved: $FILE — run /ad-copy and /creative-brief next\"; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_OUTPUT_FILE_PATH\"; if [[ \"$FILE\" == */contracts/amendments/*.md ]]; then echo \"[hook] Scope change order saved: $FILE — update Harvest budget and send to client for signature\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'cd \"${CLAUDE_PROJECT_DIR}\" && MISSING=$(find clients/ -mindepth 1 -maxdepth 1 -type d ! -name _template | while read CLIENT; do [ ! -f \"$CLIENT/contracts/retainer-agreement.md\" ] && echo \"$CLIENT\"; done | wc -l | tr -d \" \"); [ \"$MISSING\" -gt 0 ] && echo \"[reminder] $MISSING client(s) missing retainer-agreement.md — check contracts/ directories\" || true'"
          }
        ]
      }
    ]
  }
}
```

## Compétences à installer

```bash
npx uitkit add skill marketing/campaign-brief
npx uitkit add skill marketing/ad-copy-generator
npx uitkit add skill marketing/monthly-report
npx uitkit add skill marketing/seo-audit
npx uitkit add skill marketing/content-strategy
npx uitkit add skill marketing/social-media-manager
npx uitkit add skill productivity/stakeholder-comms
npx uitkit add skill productivity/exec-briefing
npx uitkit add skill productivity/process-mapper
npx uitkit add skill productivity/vendor-evaluator
npx uitkit add skill data-ml/stakeholder-report
npx uitkit add skill productivity/investor-update
```

## Liens connexes

- [Guide : Claude pour les équipes marketing](../guides/for-content-marketer.md)
- [Workflow : Lancement de campagne de bout en bout](../workflows/campaign-launch.md)
- [Workflow : Reporting mensuel client](../workflows/monthly-reporting.md)
