# Agence de Design / Studio de Design — Structure de Projet

> Pour les agences de design gérant des projets clients en branding, UX et design digital — de la prise de brief et la création de moodboards jusqu'à la production design, la révision asynchrone, la livraison client et la facturation de projet — dans un seul espace de travail Claude Code.

## Stack

- **Design + prototypage + livraison :** Figma (composants, auto-layout, mode dev, flux de prototypes, design tokens, Figma Sites)
- **Gestion de projet + briefs :** Notion (bases de données clients, wikis de projet, briefs créatifs, notes de réunion)
- **Suivi des tâches :** Linear (gestion des tâches au niveau des tickets, cycles de sprint, triage des priorités) ou Asana (plannings de projet, dépendances de tâches, tableaux visibles par les clients)
- **Suivi du temps :** Harvest (saisie du temps par projet, consommation du budget, rapports de capacité de l'équipe)
- **Facturation :** FreshBooks (factures clients, facturation à la retenue, suivi des dépenses, rappels de paiement)
- **Révision vidéo asynchrone :** Loom (présentations de concepts, explications de révisions, guides de livraison pour les développeurs)
- **Communication :** Slack (#client-<nom> par client, #design-production, #new-business, #ops)
- **Docs + espaces partagés :** Google Workspace (Docs pour les livrables, Slides pour les présentations, Drive pour le stockage des assets)

## Arborescence

```
design-agency/
├── .claude/
│   ├── CLAUDE.md                                        # Instructions de l'espace de travail pour Claude Code
│   ├── settings.json                                    # Serveurs MCP, hooks, permissions
│   └── commands/
│       ├── new-client.md                                # /new-client — créer la structure complète d'un répertoire client depuis _template
│       ├── creative-brief.md                            # /creative-brief — générer un brief créatif structuré à partir des notes d'intake
│       ├── design-review.md                             # /design-review — produire un ordre du jour et un cadre de feedback pour la séance de révision design
│       ├── handoff.md                                   # /handoff — générer la checklist de livraison développeur et le guide d'annotation Figma
│       ├── revision-log.md                              # /revision-log — enregistrer un tour de révision avec portée, justification et numéro de tour
│       ├── proposal.md                                  # /proposal — rédiger une proposition de projet pour un nouveau prospect à partir de ses notes
│       ├── ux-audit.md                                  # /ux-audit — réaliser un audit heuristique UX structuré à partir d'un brief ou d'un lien Figma
│       └── invoice-summary.md                          # /invoice-summary — résumer les heures Harvest pour la préparation de facture FreshBooks
├── clients/
│   ├── _template/                                       # Modèle maître — copier dans clients/<client-slug>/ à l'intake
│   │   ├── brief.md                                     # Brief créatif client — objectifs, audience, livrables, contraintes, calendrier
│   │   ├── contract.md                                  # Contrat ou accord de retenue avec portée et conditions de paiement
│   │   ├── brand-assets/
│   │   │   ├── brand-guidelines.md                      # Couleurs, typographie, règles de logo, tonalité
│   │   │   ├── logo/                                    # Fichiers logo approuvés : SVG, PNG, variantes sombre/clair
│   │   │   ├── fonts/                                   # Fichiers de polices sous licence ou spécification Google Fonts
│   │   │   └── photography/                             # Guide de style photographique approuvé et images hero validées
│   │   ├── design-files-links.md                        # Liens vers tous les fichiers Figma : fichier principal, bibliothèque de composants, prototype
│   │   ├── feedback-log.md                              # Journal horodaté de tous les retours clients par tour
│   │   ├── deliverables/
│   │   │   ├── _handoff-checklist.md                    # Checklist de validation avant livraison de tout livrable
│   │   │   └── exports/                                 # Assets exportés finaux : PNG, SVG, PDF, ZIP
│   │   └── invoice-log.md                               # Historique des factures : date, montant, portée, statut (payé/en attente)
│   ├── nova-brand-co/
│   │   ├── brief.md
│   │   ├── contract.md
│   │   ├── brand-assets/
│   │   │   ├── brand-guidelines.md
│   │   │   ├── logo/
│   │   │   │   ├── nova-logo-primary.svg
│   │   │   │   ├── nova-logo-dark.svg
│   │   │   │   └── nova-logo-mark.png
│   │   │   ├── fonts/
│   │   │   │   └── font-spec.md
│   │   │   └── photography/
│   │   │       └── style-guide.md
│   │   ├── design-files-links.md
│   │   ├── feedback-log.md
│   │   ├── deliverables/
│   │   │   ├── _handoff-checklist.md
│   │   │   └── exports/
│   │   │       ├── nova-brand-kit-v1.zip
│   │   │       └── nova-logo-package.zip
│   │   └── invoice-log.md
│   └── meridian-app/
│       ├── brief.md
│       ├── contract.md
│       ├── brand-assets/
│       │   ├── brand-guidelines.md
│       │   ├── logo/
│       │   └── fonts/
│       ├── design-files-links.md
│       ├── feedback-log.md
│       ├── deliverables/
│       │   ├── _handoff-checklist.md
│       │   └── exports/
│       └── invoice-log.md
├── projects/
│   ├── nova-brand-identity/                             # Projet actif — un répertoire par projet nommé
│   │   ├── brief.md                                     # Brief spécifique au projet (peut différer du brief au niveau client)
│   │   ├── moodboard.md                                 # Références visuelles, liens d'inspiration, notes de direction stylistique
│   │   ├── concepts/
│   │   │   ├── concept-a-modern-minimal/
│   │   │   │   ├── notes.md                             # Justification du design et points de présentation
│   │   │   │   └── figma-link.md                        # Lien vers le cadre ou la page Figma pour ce concept
│   │   │   └── concept-b-bold-expressive/
│   │   │       ├── notes.md
│   │   │       └── figma-link.md
│   │   ├── revisions/
│   │   │   ├── round-1/
│   │   │   │   ├── client-feedback.md                   # Retours clients verbatim ou résumés
│   │   │   │   ├── revision-notes.md                    # Notes du designer sur les changements effectués et leur raison
│   │   │   │   └── figma-link.md
│   │   │   └── round-2/
│   │   │       ├── client-feedback.md
│   │   │       ├── revision-notes.md
│   │   │       └── figma-link.md
│   │   └── final/
│   │       ├── approved-concept.md                      # Enregistrement du concept approuvé et de la date d'approbation
│   │       ├── handoff-notes.md                         # Notes pour le développeur ou le client pour la livraison finale
│   │       └── figma-link.md
│   └── meridian-app-ux/
│       ├── brief.md
│       ├── moodboard.md
│       ├── concepts/
│       │   └── concept-a-card-based-nav/
│       │       ├── notes.md
│       │       └── figma-link.md
│       ├── revisions/
│       │   └── round-1/
│       │       ├── client-feedback.md
│       │       ├── revision-notes.md
│       │       └── figma-link.md
│       └── final/
│           ├── approved-concept.md
│           ├── handoff-notes.md
│           └── figma-link.md
├── templates/
│   ├── creative-brief.md                                # Brief créatif standard : objectifs, audience, livrables, calendrier, contraintes
│   ├── project-proposal.md                              # Proposition commerciale : situation, approche, équipe, investissement, calendrier
│   ├── design-review-agenda.md                          # Ordre du jour de la séance de révision design avec questions de feedback structurées
│   ├── handoff-checklist.md                             # Checklist pré-livraison : nettoyage Figma, exports, annotations, mode dev
│   └── revision-policy.md                               # Politique de révision du studio : définition d'une révision, limites de tours, hors-périmètre
├── new-business/
│   ├── prospect-tracker.md                              # Pipeline de prospects : entreprise, contact, étape, dernier contact, prochaine action
│   ├── case-studies/
│   │   ├── nova-brand-identity.md                       # Étude de cas structurée : défi, approche, résultat, témoignage
│   │   └── meridian-app-ux.md
│   ├── capabilities-deck.md                             # Présentation des capacités de l'agence : services, processus, équipe, travaux sélectionnés
│   └── rate-card.md                                     # Tarifs horaires, minimums de projet, niveaux de retenue, majorations urgence
└── ops/
    ├── onboarding-sop.md                                # Onboarding nouveau client : intake, lancement, configuration Figma, canal Slack, Harvest
    ├── revision-policy.md                               # Version interne de la politique de révision (inclut le chemin d'escalade)
    ├── brand-guidelines-for-agency.md                   # Marque propre de l'agence : logo, couleurs, typographie, tonalité pour les pitches et documents
    ├── new-hire-checklist.md                            # Onboarding designer : accès aux outils, organisation Figma, Slack, Harvest, nommage des fichiers
    └── offboarding-sop.md                               # Offboarding client : livraison finale des assets, révocation des accès, archivage
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `.claude/commands/new-client.md` | Commande slash qui copie `clients/_template/` vers `clients/<slug>/`, pré-remplit `brief.md` à partir des réponses d'intake, et crée un brouillon de `contract.md` et `invoice-log.md` |
| `.claude/commands/creative-brief.md` | Prend le slug client, le type de projet et les notes d'intake en entrée ; produit un brief créatif entièrement structuré, aligné sur les guidelines de marque et les objectifs business du client |
| `.claude/commands/handoff.md` | Génère une checklist de livraison en mode dev Figma et un guide d'annotation à partir de `templates/handoff-checklist.md` ; lie vers le `design-files-links.md` du client |
| `.claude/commands/revision-log.md` | Enregistre un nouveau tour de révision dans `projects/<project>/revisions/round-N/` avec les retours client, les notes du designer, le numéro de tour et un indicateur de hors-périmètre si applicable |
| `clients/_template/` | Répertoire de structure maître — copier ce dossier entier lors de l'onboarding d'un nouveau client pour s'assurer que chaque fichier et dossier est présent avant le lancement |
| `clients/<slug>/feedback-log.md` | Journal chronologique de tous les retours clients sur tous les tours ; utilisé pour suivre l'historique des révisions et appuyer les discussions sur les changements de périmètre |
| `projects/<project>/revisions/` | Un sous-répertoire par tour de révision, associant les retours client et les notes du designer au lien Figma de ce tour — permet un suivi clair des versions |
| `templates/revision-policy.md` | Source de vérité sur ce qui constitue une révision, le nombre de tours inclus, et ce qui déclenche des frais hors-périmètre ; référencée dans toutes les propositions et contrats |
| `ops/onboarding-sop.md` | Checklist étape par étape pour l'intégration d'un nouveau client : de l'intake au lancement en passant par la configuration des outils et le premier livrable |
| `new-business/rate-card.md` | Tarification actuelle pour tous les niveaux de service ; référencée par `/proposal` lors du calcul de l'investissement projet |

## Scaffold rapide

```bash
# Créer la racine de l'espace de travail
mkdir -p design-agency && cd design-agency

# Configuration Claude Code
mkdir -p .claude/commands

# _template client (profondeur complète)
mkdir -p clients/_template/brand-assets/logo
mkdir -p clients/_template/brand-assets/fonts
mkdir -p clients/_template/brand-assets/photography
mkdir -p clients/_template/deliverables/exports

# Exemple de client : nova-brand-co
mkdir -p clients/nova-brand-co/brand-assets/logo
mkdir -p clients/nova-brand-co/brand-assets/fonts
mkdir -p clients/nova-brand-co/brand-assets/photography
mkdir -p clients/nova-brand-co/deliverables/exports

# Exemple de client : meridian-app
mkdir -p clients/meridian-app/brand-assets/logo
mkdir -p clients/meridian-app/brand-assets/fonts
mkdir -p clients/meridian-app/deliverables/exports

# Projets actifs
mkdir -p projects/nova-brand-identity/concepts/concept-a-modern-minimal
mkdir -p projects/nova-brand-identity/concepts/concept-b-bold-expressive
mkdir -p projects/nova-brand-identity/revisions/round-1
mkdir -p projects/nova-brand-identity/revisions/round-2
mkdir -p projects/nova-brand-identity/final

mkdir -p projects/meridian-app-ux/concepts/concept-a-card-based-nav
mkdir -p projects/meridian-app-ux/revisions/round-1
mkdir -p projects/meridian-app-ux/final

# Modèles
mkdir -p templates

# Nouveau business
mkdir -p new-business/case-studies

# Opérations
mkdir -p ops

# Initialiser les fichiers de configuration Claude
touch .claude/CLAUDE.md
touch .claude/settings.json

# Créer les fichiers de placeholder _template
touch clients/_template/brief.md
touch clients/_template/contract.md
touch clients/_template/brand-assets/brand-guidelines.md
touch clients/_template/design-files-links.md
touch clients/_template/feedback-log.md
touch clients/_template/deliverables/_handoff-checklist.md
touch clients/_template/invoice-log.md

# Créer les fichiers de modèles
touch templates/creative-brief.md
touch templates/project-proposal.md
touch templates/design-review-agenda.md
touch templates/handoff-checklist.md
touch templates/revision-policy.md

# Fichiers nouveau business
touch new-business/prospect-tracker.md
touch new-business/capabilities-deck.md
touch new-business/rate-card.md

# Fichiers ops
touch ops/onboarding-sop.md
touch ops/revision-policy.md
touch ops/brand-guidelines-for-agency.md
touch ops/new-hire-checklist.md
touch ops/offboarding-sop.md

# Installer les skills pertinentes
npx uitkit add skill product/ux-audit
npx uitkit add skill product/persona-builder
npx uitkit add skill marketing/brand-guidelines
npx uitkit add skill productivity/creative-brief
npx uitkit add skill productivity/stakeholder-comms
npx uitkit add skill productivity/process-mapper
npx uitkit add skill productivity/vendor-evaluator
npx uitkit add skill productivity/exec-briefing
npx uitkit add skill data-ml/stakeholder-report

# Installer les commandes slash
npx uitkit add command new-client
npx uitkit add command creative-brief
npx uitkit add command design-review
npx uitkit add command handoff
npx uitkit add command revision-log
npx uitkit add command proposal
npx uitkit add command ux-audit
npx uitkit add command invoice-summary

echo "Espace de travail agence de design prêt."
```

## Modèle CLAUDE.md

```markdown
# Agence de Design — Instructions Claude

## Ce que c'est

Cet espace de travail gère le cycle de vie complet des clients d'un studio de design : intake,
brief créatif, développement de concepts, suivi des révisions, révision asynchrone (Loom),
livraison développeur (mode dev Figma) et facturation de projet (Harvest + FreshBooks).
Chaque client dispose d'un répertoire isolé sous clients/. Les projets actifs se trouvent sous
projects/. Tous les modèles de documents sont dans templates/. La documentation ops est dans ops/.

## Stack

- Design : Figma (outil de design principal, bibliothèques de composants, prototypes, livraison en mode dev)
- Gestion de projet : Notion (wikis de projet, briefs créatifs, bases de données clients, notes de réunion)
- Suivi des tâches : Linear (tickets de sprint, triage des bugs, tâches de QA design)
- Suivi du temps : Harvest (par projet, facturable vs non-facturable, alertes de consommation de budget)
- Facturation : FreshBooks (factures clients, facturation à la retenue, suivi des dépenses)
- Révision asynchrone : Loom (présentations de concepts, explications de révisions, guides de livraison)
- Communication : Slack (#client-<slug> par client, #design-production, #new-business, #ops)
- Docs + assets : Google Workspace (Slides pour les présentations, Drive pour la livraison finale des assets)

## Conventions de répertoires

- clients/<client-slug>/ — tous les fichiers au niveau client ; ne jamais mélanger les assets entre dossiers clients
- clients/<client-slug>/brand-assets/ — source de vérité pour les logos, couleurs et polices approuvés
- clients/<client-slug>/feedback-log.md — ajouter chaque tour de feedback ici avec date et numéro de tour
- clients/<client-slug>/invoice-log.md — ajouter chaque facture avec date, montant, portée, statut
- projects/<project-name>/ — un répertoire par livrable de projet nommé (pas par client)
- projects/<project>/revisions/round-N/ — un sous-répertoire par tour de révision
- projects/<project>/final/ — rempli uniquement après approbation du client ; ne pas y mettre de brouillons
- templates/ — structures de documents canoniques ; toujours copier un modèle avant de rédiger
- new-business/ — suivi des prospects, propositions et études de cas uniquement ; pas de travail client actif ici

## Onboarding d'un nouveau client

1. Copier clients/_template/ vers clients/<new-client-slug>/ :
   cp -r clients/_template clients/<new-client-slug>
2. Exécuter /new-client client="<Nom>" slug="<slug>" project-type="<branding|ux|digital>"
3. Compléter clients/<slug>/brief.md à partir de l'appel d'intake avant la réunion de lancement
4. Après le lancement, renseigner clients/<slug>/brand-assets/brand-guidelines.md
5. Rédiger le contrat en utilisant la section portée de templates/project-proposal.md ; sauvegarder dans clients/<slug>/contract.md
6. Ajouter les liens de fichiers Figma du client dans clients/<slug>/design-files-links.md dès la création du projet
7. Créer le projet Harvest et enregistrer l'ID de projet dans clients/<slug>/brief.md
8. Ouvrir la fiche client FreshBooks et lier à clients/<slug>/invoice-log.md

## Démarrage d'un nouveau projet

1. Créer projects/<project-name>/ de zéro ou copier une structure de projet existante
2. Exécuter /creative-brief client="<slug>" project="<project-name>" type="<branding|ux|digital>"
3. Renseigner projects/<project-name>/moodboard.md avec des liens de cadres Figma et des URLs de référence
4. Construire les concepts sous projects/<project-name>/concepts/concept-<lettre>-<label-court>/
5. Chaque répertoire de concept nécessite : notes.md (justification + points de présentation) et figma-link.md

## Processus de révision design

1. Exécuter /design-review project="<project-name>" round="<N>" concepts="<liste>"
2. Utiliser l'ordre du jour généré depuis templates/design-review-agenda.md pour la présentation Loom
3. Enregistrer la vidéo Loom et partager le lien dans Slack #client-<slug>
4. Après l'appel ou la révision asynchrone, ajouter le feedback verbatim dans clients/<slug>/feedback-log.md
5. Exécuter /revision-log project="<project-name>" round="<N>" pour ouvrir le répertoire de révision

## Gestion des révisions

- Chaque tour dispose de son propre répertoire : projects/<project>/revisions/round-N/
- Enregistrer les retours clients dans round-N/client-feedback.md avant d'apporter des modifications
- Après les révisions, documenter les changements dans round-N/revision-notes.md
- Consulter templates/revision-policy.md (et ops/revision-policy.md) avant de démarrer le tour 3+
- Demandes hors-périmètre : discuter de la portée avant de saisir du temps ; rédiger un avenant si nécessaire

## Processus de livraison

1. Exécuter /handoff project="<project-name>" client="<slug>" pour générer la checklist de livraison
2. Compléter chaque élément de deliverables/_handoff-checklist.md avant de marquer la livraison comme terminée
3. Livraison Figma : activer le mode dev sur tous les cadres finaux, nommer toutes les couches, ajouter des annotations redline
4. Exporter les assets finaux vers clients/<slug>/deliverables/exports/ (PNG 1x/2x, SVG, PDF)
5. Enregistrer une présentation Loom du fichier Figma pour le développeur ou le client destinataire
6. Partager le lien du dossier Google Drive pour les assets ; confirmer l'accès avant de clôturer le projet

## Conventions de facturation

- Saisir le temps dans Harvest immédiatement après chaque session de travail — ne jamais regrouper en fin de semaine
- Codes facturables : discovery, strategy, design-production, revisions, handoff, account-management
- Non-facturable : critique interne, configuration des outils, administration, travail de pitch (sauf si la proposition est gagnée)
- Exécuter /invoice-summary client="<slug>" month="<AAAA-MM>" avant de générer la facture FreshBooks
- Facturer à l'achèvement d'une étape de projet ou le 1er du mois pour les clients à la retenue
- Ajouter chaque facture envoyée dans clients/<slug>/invoice-log.md avec date, montant et statut

## Conventions de nommage des fichiers Figma

- Fichier principal : [Nom Client] — [Nom Projet] — Design
- Bibliothèque de composants : [Nom Client] — Component Library
- Prototype : [Nom Client] — [Nom Projet] — Prototype
- Fichier archivé : [Nom Client] — [Nom Projet] — ARCHIVED AAAA-MM
- Toujours enregistrer tous les liens de fichiers dans clients/<slug>/design-files-links.md à la création
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
        "/Users/${USER}/design-agency"
      ]
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-notion"],
      "env": {
        "NOTION_API_TOKEN": "${NOTION_API_TOKEN}"
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
    "linear": {
      "command": "npx",
      "args": ["-y", "@linear/mcp-server"],
      "env": {
        "LINEAR_API_KEY": "${LINEAR_API_KEY}"
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
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_OUTPUT_FILE_PATH\"; if [[ \"$FILE\" == */projects/*/revisions/*/client-feedback.md ]]; then echo \"[hook] Revision feedback logged: $FILE — run /revision-log to open designer notes and update feedback-log.md\"; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_OUTPUT_FILE_PATH\"; if [[ \"$FILE\" == */projects/*/final/approved-concept.md ]]; then echo \"[hook] Concept approved: $FILE — run /handoff to generate the developer handoff checklist\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'cd \"${CLAUDE_PROJECT_DIR}\" && MISSING=$(find clients/ -mindepth 1 -maxdepth 1 -type d ! -name _template | while read C; do [ ! -f \"$C/design-files-links.md\" ] || grep -q \"figma.com\" \"$C/design-files-links.md\" 2>/dev/null || echo \"$C\"; done | wc -l | tr -d \" \"); [ \"$MISSING\" -gt 0 ] && echo \"[reminder] $MISSING client(s) missing Figma links in design-files-links.md\" || true'"
          }
        ]
      }
    ]
  }
}
```

## Skills à installer

```bash
npx uitkit add skill product/ux-audit
npx uitkit add skill product/persona-builder
npx uitkit add skill marketing/brand-guidelines
npx uitkit add skill productivity/stakeholder-comms
npx uitkit add skill productivity/process-mapper
npx uitkit add skill productivity/exec-briefing
npx uitkit add skill productivity/vendor-evaluator
npx uitkit add skill data-ml/stakeholder-report
```

## Liens connexes

- [Guide : Claude pour les designers UX](../guides/for-ux-designer.md)
- [Workflow : Du lancement au livraison d'un projet client](../workflows/design-project-lifecycle.md)
- [Workflow : Cycle de révision design](../workflows/design-review-cycle.md)
