# Studio Freelance / Cabinet de Conseil — Structure de Projet

> Pour un freelance indépendant ou un petit studio gérant des projets clients, le développement commercial et les opérations via Notion, HoneyBook, Cal.com, Loom, Figma, Stripe, Gmail et Slack.

## Stack

- **Notion** — Gestion de projet, CRM, base de connaissances clients, suivi des livrables, wiki interne
- **FreshBooks** ou **HoneyBook** — Facturation, contrats, encaissement, suivi des dépenses, facturation des mandats récurrents
- **Cal.com** — Planification des rendez-vous clients, réservation d'appels de découverte, routage des formulaires d'admission, gestion des créneaux tampon
- **Loom** — Enregistrements asynchrones de mises à jour clients, présentations de livrables, vidéos de demande de feedback
- **Figma** — Livrables UI/UX, wireframes, bibliothèques de composants, transferts de design
- **Framer** — Prototypes interactifs, livrables no-code, aperçus prêts pour les clients
- **Stripe** — Traitement des paiements, prélèvements récurrents pour mandats, honoraires ponctuels, suivi des versements
- **Gmail** — Communication client, envoi de contrats, relances de factures, prospection commerciale
- **Slack** — Canaux de projet actifs par client, questions/réponses asynchrones, partage de fichiers, liens Loom
- **Claude Code** — Rédaction de propositions, génération de cahiers des charges, rapports d'avancement, e-mails de relance de factures, séquences de prospection

## Arborescence des répertoires

```
freelance-studio/
├── .claude/
│   ├── CLAUDE.md                                    # Instructions de l'espace de travail (coller le modèle ci-dessous)
│   ├── settings.json                                # Serveurs MCP, hooks, permissions
│   └── commands/
│       ├── new-client-onboard.md                    # /new-client-onboard — checklist d'intégration complète + e-mail de bienvenue + ordre du jour de lancement
│       ├── proposal-draft.md                        # /proposal-draft — proposition à partir d'un brief : problème, approche, livrables, options tarifaires
│       ├── scope-of-work.md                         # /scope-of-work — cahier des charges structuré avec jalons, critères d'acceptation, déclencheurs de paiement
│       ├── invoice-chase.md                         # /invoice-chase — e-mail de relance progressif (amical / ferme / final) pour les factures impayées
│       ├── client-status-update.md                  # /client-status-update — mise à jour hebdomadaire ou par jalon pour e-mail ou script Loom
│       ├── feedback-request.md                      # /feedback-request — demande de feedback structurée après la livraison d'un jalon
│       ├── project-closeout.md                      # /project-closeout — checklist de clôture, invite de facture finale, demande de témoignage
│       └── weekly-wrap.md                           # /weekly-wrap — bilan personnel de fin de semaine : revenus, pipeline, plan de la semaine suivante
├── clients/
│   ├── _template/                                   # Copier ce dossier entier à chaque nouveau client signé
│   │   ├── brief.md                                 # Brief client initial : objectifs, calendrier, budget, contacts clés, critères de succès
│   │   ├── contract.md                              # Résumé du contrat : clauses principales, échéancier de paiement, propriété intellectuelle, clause de résiliation
│   │   ├── sow.md                                   # Cahier des charges : livrables, jalons, critères d'acceptation, exclusions
│   │   ├── communication-log.md                     # E-mails importants, appels, décisions — consigner le fond, pas les politesses
│   │   ├── invoices/
│   │   │   └── .gitkeep
│   │   └── deliverables/
│   │       └── .gitkeep
│   ├── acme-corp-brand-2026/                        # Client actif : projet d'identité de marque Acme Corp
│   │   ├── brief.md
│   │   ├── contract.md                              # Identifiant contrat HoneyBook : HB-2026-0041
│   │   ├── sow.md
│   │   ├── communication-log.md
│   │   ├── invoices/
│   │   │   ├── inv-001-deposit-2026-04-01.md        # Enregistrement de facture : numéro, montant, date d'envoi, date de paiement, identifiant Stripe
│   │   │   ├── inv-002-milestone-1-2026-05-01.md
│   │   │   └── inv-003-final-2026-06-15.md
│   │   └── deliverables/
│   │       ├── 2026-04-20-moodboard-v1.fig          # Lien vers le fichier Figma ou PDF exporté
│   │       ├── 2026-05-05-brand-guidelines-v1.pdf
│   │       ├── 2026-05-18-brand-guidelines-v2-revised.pdf
│   │       └── 2026-06-10-final-handoff-package.zip
│   ├── betaworks-site-redesign/                     # Client actif : refonte du site Betaworks avec Framer
│   │   ├── brief.md
│   │   ├── contract.md
│   │   ├── sow.md
│   │   ├── communication-log.md
│   │   ├── invoices/
│   │   │   ├── inv-001-deposit-2026-05-01.md
│   │   │   └── inv-002-milestone-1-2026-06-01.md
│   │   └── deliverables/
│   │       ├── 2026-05-15-wireframes-v1.fig
│   │       ├── 2026-05-28-wireframes-v2-approved.fig
│   │       └── 2026-06-05-framer-staging-link.md    # URL de prévisualisation Framer + identifiants
│   ├── gamma-dao-strategy/                          # Client clôturé — archivé pour référence et étude de cas
│   │   ├── brief.md
│   │   ├── contract.md
│   │   ├── sow.md
│   │   ├── communication-log.md
│   │   ├── invoices/
│   │   │   ├── inv-001-deposit-2026-01-15.md
│   │   │   └── inv-002-completion-2026-03-01.md
│   │   └── deliverables/
│   │       └── 2026-03-01-strategy-deck-final.pdf
│   └── delta-fintech-ux/                            # En attente — approbation du budget client en cours
│       ├── brief.md
│       └── communication-log.md
├── pipeline/
│   ├── prospects.md                                 # Entreprise, contact, source, score d'adéquation ICP, dernier contact, prochaine action, valeur estimée
│   ├── proposals-sent.md                            # Suivi des propositions : client, date d'envoi, valeur, statut, date de relance, résultat
│   └── follow-up-schedule.md                       # File de relance hebdomadaire : qui contacter, pourquoi, quoi dire, canal (e-mail / Slack / LinkedIn)
├── templates/
│   ├── proposal-template.md                         # Proposition complète : résumé exécutif, problème, approche, livrables, calendrier, niveaux tarifaires, prochaines étapes
│   ├── sow-template.md                              # Cahier des charges : périmètre, hors périmètre, jalons avec dates, critères d'acceptation, échéancier de paiement, politique de révision
│   ├── contract-template.md                         # Contrat-cadre : cession de PI, confidentialité, conditions de paiement, indemnité de résiliation, droit applicable
│   ├── invoice-template.md                          # Format de facture : lignes de détail, conditions de paiement (Net 7/14/30), coordonnées bancaires, lien de paiement Stripe
│   ├── nda-template.md                              # NDA mutuel pour les échanges préalables à la proposition
│   ├── status-update-template.md                    # Mise à jour hebdomadaire : réalisé sur la période, en cours, blocages, besoins côté client, plan de la prochaine période
│   ├── project-brief-template.md                    # Formulaire de découverte à envoyer aux prospects avant le cadrage : objectifs, budget, calendrier, parties prenantes
│   └── feedback-request-template.md                 # Feedback post-jalon : questions précises sur la qualité du livrable, l'alignement, les révisions nécessaires
├── ops/
│   ├── rate-card.md                                 # Tarifs actuels : taux horaire, journalier, minimums projets, niveaux mandats — dernière révision : 2026-T2
│   ├── service-packages.md                          # Offres packagées : Brand Sprint, Site en une Semaine, Audit UX — périmètre, prix, durée, inclusions
│   ├── onboarding-checklist.md                      # Étapes du contrat signé au lancement : accès, outils, canal Slack, appel de lancement, réception des assets
│   ├── offboarding-checklist.md                     # Étapes à la clôture du projet : livraison finale, facture, demande de témoignage, droits portfolio, archivage
│   ├── tools-and-access.md                          # Chaque outil SaaS : niveau d'abonnement, coût mensuel, date de renouvellement, méthode de connexion
│   └── subcontractors.md                            # Sous-traitants de confiance : nom, spécialité, tarif, disponibilité, statut NDA, projets communs antérieurs
├── finance/
│   ├── income-log.md                                # Mensuel : client, numéro de facture, montant facturé, montant encaissé, solde dû, moyen de paiement
│   ├── expense-log.md                               # Date, fournisseur, catégorie (logiciel / déplacement / matériel), montant — pour le suivi des déductions fiscales
│   └── quarterly-tax-estimate.md                    # Estimation fiscale T1–T4 : revenu brut, charges déductibles, cotisations sociales, dates et montants des acomptes versés
└── marketing/
    ├── case-studies/
    │   ├── acme-corp-brand-identity.md              # Problème, approche, résultat, métriques, citation client — source pour le site web et les propositions
    │   ├── betaworks-site-redesign.md
    │   └── _case-study-template.md                  # Format réutilisable : contexte, défi, solution, résultat, témoignage
    ├── portfolio/
    │   ├── portfolio-index.md                        # Liste de projets sélectionnés : client (anonymisé si NDA), type de livrable, lien Figma/Framer, date
    │   └── selected-works/
    │       ├── brand-acme-2026.pdf                  # Livrable exporté pour le PDF portfolio
    │       └── site-betaworks-2026.pdf
    └── testimonials/
        ├── testimonials-log.md                      # Nom du client, citation, date, autorisation de publication, publié sur (site / LinkedIn / proposition)
        └── raw-feedback/
            ├── acme-corp-feedback-2026-06.md        # E-mail ou réponse de formulaire brut — source pour les témoignages
            └── gamma-dao-feedback-2026-03.md
```

## Fichiers clés expliqués

| Chemin | Fonction |
|---|---|
| `.claude/commands/new-client-onboard.md` | Commande slash générant une checklist d'intégration complète, rédigeant l'e-mail de bienvenue et construisant l'ordre du jour de l'appel de lancement à partir du brief client signé — à exécuter immédiatement après la signature du contrat HoneyBook |
| `.claude/commands/invoice-chase.md` | Commande slash produisant une séquence de relance progressive (rappel amical à J+3, demande ferme à J+7, mise en demeure avec pénalités à J+14) — prend en entrée le numéro de facture, le montant et le nombre de jours de retard |
| `.claude/commands/project-closeout.md` | Commande slash qui produit la checklist de clôture, rédige la facture finale et écrit l'e-mail de demande de témoignage — à exécuter lorsque le dernier livrable est validé |
| `clients/_template/` | Structure de dossier vierge à copier pour chaque nouvelle mission — garantit une documentation cohérente sur l'ensemble des projets clients ; copier avec `cp -r clients/_template clients/<nom-nouveau-client>` |
| `templates/sow-template.md` | Format maître de cahier des charges incluant la politique de révision, la clause d'indemnité de résiliation et la liste explicite des éléments hors périmètre — référence pour toutes les discussions de cadrage |
| `pipeline/prospects.md` | Substitut CRM pour les prospects en phase initiale : entreprise, contact, score d'adéquation ICP (1–5), valeur estimée, date du dernier contact, prochaine action — révisé chaque lundi |
| `ops/rate-card.md` | Tarifs actuels avec date de dernière révision — détermine les chiffres qui apparaissent dans toutes les propositions rédigées par Claude ; à mettre à jour avant d'exécuter `/proposal-draft` |
| `finance/quarterly-tax-estimate.md` | Calcul des cotisations et impôts mis à jour en fin de chaque trimestre : revenu brut, charges SaaS et matériel déductibles, acompte fédéral et régional estimé, confirmation du virement effectué |

## Mise en place rapide

```bash
# Créer le répertoire racine de l'espace de travail
mkdir -p freelance-studio

# Structure .claude
mkdir -p freelance-studio/.claude/commands

# Modèle client
mkdir -p freelance-studio/clients/_template/deliverables
mkdir -p freelance-studio/clients/_template/invoices
touch freelance-studio/clients/_template/deliverables/.gitkeep
touch freelance-studio/clients/_template/invoices/.gitkeep
touch freelance-studio/clients/_template/brief.md
touch freelance-studio/clients/_template/contract.md
touch freelance-studio/clients/_template/sow.md
touch freelance-studio/clients/_template/communication-log.md

# Pipeline
mkdir -p freelance-studio/pipeline
touch freelance-studio/pipeline/prospects.md
touch freelance-studio/pipeline/proposals-sent.md
touch freelance-studio/pipeline/follow-up-schedule.md

# Modèles
mkdir -p freelance-studio/templates
touch freelance-studio/templates/proposal-template.md
touch freelance-studio/templates/sow-template.md
touch freelance-studio/templates/contract-template.md
touch freelance-studio/templates/invoice-template.md
touch freelance-studio/templates/nda-template.md
touch freelance-studio/templates/status-update-template.md
touch freelance-studio/templates/project-brief-template.md
touch freelance-studio/templates/feedback-request-template.md

# Opérations
mkdir -p freelance-studio/ops
touch freelance-studio/ops/rate-card.md
touch freelance-studio/ops/service-packages.md
touch freelance-studio/ops/onboarding-checklist.md
touch freelance-studio/ops/offboarding-checklist.md
touch freelance-studio/ops/tools-and-access.md
touch freelance-studio/ops/subcontractors.md

# Finances
mkdir -p freelance-studio/finance
touch freelance-studio/finance/income-log.md
touch freelance-studio/finance/expense-log.md
touch freelance-studio/finance/quarterly-tax-estimate.md

# Marketing
mkdir -p freelance-studio/marketing/case-studies
mkdir -p freelance-studio/marketing/portfolio/selected-works
mkdir -p freelance-studio/marketing/testimonials/raw-feedback
touch freelance-studio/marketing/case-studies/_case-study-template.md
touch freelance-studio/marketing/portfolio/portfolio-index.md
touch freelance-studio/marketing/testimonials/testimonials-log.md

# Installer les skills
npx claudient add skill small-business/freelancer-proposal
npx claudient add skill small-business/scope-of-work
npx claudient add skill small-business/invoice-chaser
npx claudient add skill small-business/client-status-report
npx claudient add skill small-business/cold-outreach
npx claudient add skill productivity/stakeholder-comms
npx claudient add skill productivity/process-mapper
npx claudient add skill productivity/vendor-evaluator

# Générer les stubs de commandes dans .claude/commands/
npx claudient add skill small-business/freelancer-proposal --output freelance-studio/.claude/commands/proposal-draft.md
npx claudient add skill small-business/scope-of-work --output freelance-studio/.claude/commands/scope-of-work.md
npx claudient add skill small-business/invoice-chaser --output freelance-studio/.claude/commands/invoice-chase.md
npx claudient add skill small-business/client-status-report --output freelance-studio/.claude/commands/client-status-update.md
npx claudient add skill small-business/client-onboarding --output freelance-studio/.claude/commands/new-client-onboard.md
```

## Modèle CLAUDE.md

```markdown
# Studio Freelance — Instructions Claude Code

## Description

Répertoire de travail d'un studio freelance indépendant gérant des missions de design et de stratégie,
un pipeline de développement commercial, la facturation et les opérations. Les projets clients se trouvent
dans clients/ (un dossier par mission), les prospects et propositions ouverts dans pipeline/, les documents
réutilisables dans templates/, les enregistrements financiers dans finance/, et les assets portfolio et
études de cas dans marketing/. Toutes les rédactions, générations de cahiers des charges, relances de
factures, rapports d'avancement et prospections passent par les commandes slash dans .claude/commands/.

## Stack

- Notion — Suivi de projet par client ; coller l'URL de la page Notion dans clients/<nom>/brief.md
- HoneyBook — Contrats et facturation ; consigner les identifiants de contrat HoneyBook dans clients/<nom>/contract.md
- FreshBooks — Suivi des dépenses et réconciliation fiscale ; croiser avec finance/income-log.md
- Cal.com — Planification ; intégrer le lien de réservation dans templates/proposal-template.md et les e-mails de bienvenue
- Loom — Présentations asynchrones de livrables ; coller les URLs Loom dans les mises à jour client et transferts de cahier des charges
- Figma — Livrables design ; partager des liens en lecture seule dans les fichiers clients/<nom>/deliverables/
- Framer — Livrables prototypes et sites no-code ; consigner les URLs de staging dans clients/<nom>/deliverables/
- Stripe — Traitement des paiements ; consigner les identifiants de paiement Stripe dans les enregistrements clients/<nom>/invoices/
- Gmail — Communication client principale ; consigner les décisions et accords dans clients/<nom>/communication-log.md
- Slack — Canaux de projet actifs ; chaque client signé obtient un canal dédié

## Processus d'intégration d'un nouveau client

À exécuter immédiatement après la signature du contrat HoneyBook et la réception de l'acompte :

```
/new-client-onboard

Client: [nom de l'entreprise]
Contact: [nom, titre, e-mail]
Project: [nom du projet issu du cahier des charges]
Start date: [date]
Slack channel: [#nom-client-projet]
Tools to grant access: [Notion, Figma, Framer staging — lister ce qui s'applique]
Cal.com link: [votre URL de réservation]
First deliverable: [nom et date d'échéance]
```

Cela génère : l'e-mail de bienvenue, l'ordre du jour de l'appel de lancement, la checklist de demande
d'accès, et les éléments de ops/onboarding-checklist.md à valider avant le premier jour.

## Processus de livraison de projet

1. Créer clients/<nom>/ en copiant clients/_template/ avant l'appel de lancement
2. Remplir brief.md à partir des notes de l'appel de découverte ; coller l'URL du projet Notion en haut
3. Exécuter /scope-of-work pour générer sow.md — relire avant d'envoyer au client
4. Les livrables vont dans clients/<nom>/deliverables/ avec des noms préfixés par la date (YYYY-MM-DD-nom.ext)
5. Après chaque jalon, exécuter /client-status-update et consigner l'URL Loom dans communication-log.md
6. Exécuter /feedback-request après chaque livraison de jalon — consigner les réponses dans communication-log.md

## Processus de facturation et paiement

- Tous les enregistrements de factures vont dans clients/<nom>/invoices/ sous la forme inv-NNN-description-YYYY-MM-DD.md
- Chaque enregistrement doit inclure : numéro de facture HoneyBook ou FreshBooks, montant, date d'envoi, date d'échéance,
  identifiant de paiement Stripe (une fois payé), et date de paiement (ou "en attente")
- Exécuter /invoice-chase si le paiement n'est pas reçu dans les 3 jours suivant la date d'échéance
- Consigner tous les revenus encaissés dans finance/income-log.md le jour même où le paiement est validé sur Stripe
- Mettre à jour finance/quarterly-tax-estimate.md en fin de chaque trimestre

## Suivi du temps et facturation

- Le tarif est dans ops/rate-card.md — réviser trimestriellement et mettre à jour la date de dernière révision
- Travail en régie : consigner le temps dans clients/<nom>/communication-log.md sous forme de tableau (date, tâche, heures)
- Travail au forfait : facturer contre les jalons définis dans clients/<nom>/sow.md — ne jamais facturer avant la livraison
- Clients en mandat récurrent : émettre la facture de mandat le 1er de chaque mois via HoneyBook
- Indemnité de résiliation : 25% de la valeur restante du projet si le client annule après le lancement — mentionné dans contract-template.md

## Tâches courantes et commandes exactes

### Rédiger une proposition à partir d'un brief client
```
/proposal-draft

Client: [nom de l'entreprise]
Contact: [nom, titre]
Brief: [coller les notes de découverte ou le brief complet]
Budget: [$X–$Y ou "À définir"]
Timeline: [date de début cible et durée]
Deliverables requested: [lister ce qu'ils ont demandé]
My angle: [pourquoi je suis le bon choix — être précis]
Pricing preference: [forfait / mandat / hybride]
```

### Générer un cahier des charges à partir d'une proposition signée
```
/scope-of-work

Client: [nom de l'entreprise]
Project: [nom du projet]
Agreed deliverables: [liste exacte — copier depuis la proposition approuvée]
Timeline: [début, dates des jalons, date de fin]
Payment schedule: [50% acompte / 25% jalon 1 / 25% achèvement]
Revision rounds: [nombre de tours de révision par livrable]
Exclusions: [éléments explicitement hors périmètre]
```

### Rédiger une relance de facture
```
/invoice-chase

Client: [nom de l'entreprise]
Invoice number: [INV-XXX]
Amount: [$X]
Due date: [YYYY-MM-DD]
Days overdue: [N]
Prior contact: [aucun / oui — date de la dernière relance]
Tone: [amical / ferme / mise en demeure]
```

### Envoyer une mise à jour d'avancement au client
```
/client-status-update

Client: [nom de l'entreprise]
Period: [semaine du YYYY-MM-DD / jalon : X]
Completed: [liste des éléments livrés]
In progress: [ce qui est en cours]
Blockers: [ce dont j'ai besoin côté client]
Next period plan: [ce qui se passe ensuite]
Format: [e-mail / script Loom / mise à jour Notion]
```

### Clôturer un projet
```
/project-closeout

Client: [nom de l'entreprise]
Final deliverable: [nom et date de livraison]
Outstanding invoices: [numéros de factures et montants]
Portfolio rights: [confirmé dans le contrat ? oui/non]
Testimonial: [le client a-t-il accepté d'en fournir un ? oui/non/à demander]
```

## Conventions

- Chaque nouveau client obtient un dossier dans clients/ avant l'appel de lancement — toujours copier _template/
- Noms de fichiers livrables : YYYY-MM-DD-description-vN.ext (ex. 2026-06-01-wireframes-v2.fig)
- proposals-sent.md dans pipeline/ est mis à jour le jour même où une proposition est envoyée par e-mail
- Propositions gagnées : créer clients/<nom>/ et archiver le fichier de proposition dedans
- finance/income-log.md est mis à jour le dernier jour ouvré de chaque mois — sans exception
- finance/expense-log.md est mis à jour chaque semaine — consigner tout ce qui dépasse 15 € pour les impôts
- ops/rate-card.md affiche toujours une date de dernière révision — la mettre à jour avant d'utiliser /proposal-draft
- marketing/testimonials/testimonials-log.md est mis à jour dans la semaine suivant la réception de tout feedback
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
        "/Users/your-username/freelance-studio"
      ]
    },
    "gmail": {
      "command": "npx",
      "args": ["-y", "@googleapis/mcp-server-gmail"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-google-oauth-client-id",
        "GOOGLE_CLIENT_SECRET": "your-google-oauth-client-secret",
        "GOOGLE_REFRESH_TOKEN": "your-google-refresh-token"
      }
    },
    "google-drive": {
      "command": "npx",
      "args": ["-y", "@googleapis/mcp-server-google-drive"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-google-oauth-client-id",
        "GOOGLE_CLIENT_SECRET": "your-google-oauth-client-secret",
        "GOOGLE_REFRESH_TOKEN": "your-google-refresh-token"
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
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/mcp-server-notion"],
      "env": {
        "NOTION_API_KEY": "secret_your-notion-integration-token"
      }
    },
    "stripe": {
      "command": "npx",
      "args": ["-y", "@stripe/mcp-server-stripe"],
      "env": {
        "STRIPE_SECRET_KEY": "sk_live_your-stripe-secret-key",
        "STRIPE_WEBHOOK_SECRET": "whsec_your-webhook-secret"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -qE \"clients/.+/deliverables/\"; then echo \"[hook] Deliverable saved — update clients/<name>/communication-log.md with the delivery date and share the Loom walkthrough link\"; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"pipeline/proposals-sent.md\"; then echo \"[hook] Proposal tracker updated — set a Cal.com follow-up reminder 5 business days out and log next action in follow-up-schedule.md\"; fi'"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -qE \"clients/.+/sow.md\"; then echo \"[hook] Writing SOW — confirm clients/<name>/brief.md and contract.md exist and ops/rate-card.md has a current last-reviewed date before finalising scope\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'TODAY=$(date +%A); if [ \"$TODAY\" = \"Friday\" ]; then echo \"[reminder] Friday — run /weekly-wrap, check finance/income-log.md for outstanding invoices, and review pipeline/follow-up-schedule.md for Monday outreach\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Skills à installer

```bash
# Skills studio essentiels
npx claudient add skill small-business/freelancer-proposal
npx claudient add skill small-business/scope-of-work
npx claudient add skill small-business/invoice-chaser
npx claudient add skill small-business/client-status-report
npx claudient add skill small-business/cold-outreach

# Skills productivité et communication
npx claudient add skill productivity/stakeholder-comms
npx claudient add skill productivity/process-mapper
npx claudient add skill productivity/vendor-evaluator
npx claudient add skill productivity/exec-briefing

# Installer tous les skills small-business en une seule commande
npx claudient add skills small-business
```

## Voir aussi

- [Guide freelancer](../guides/for-freelancer.md)
- [Processus d'intégration client](../workflows/client-onboarding.md)
- [Processus proposition-contrat](../workflows/proposal-to-contract.md)
- [Processus de facturation](../workflows/invoice-and-billing.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
