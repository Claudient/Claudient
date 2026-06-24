# Espace de travail Freelance / Consultant Indépendant — Structure de projet

> Pour un freelance solo ou un consultant indépendant gérant la livraison client, le pipeline de propositions et l'administration de son activité depuis un seul espace de travail — avec Notion, FreshBooks, Cal.com, Loom, DocuSign et Stripe comme stack opérationnelle.

## Stack

- **Notion** — Gestion de projet, base de connaissances client, suivi des livrables, wiki interne
- **FreshBooks** ou **Wave** — Facturation, suivi des dépenses, estimations fiscales, réconciliation des paiements
- **Cal.com** ou **Calendly** — Planification client, prise de rendez-vous pour les appels de découverte, gestion des plages tampon
- **Loom** — Mises à jour client asynchrones, enregistrements de présentation, remises de livrables
- **DocuSign** — Signature de contrats, validation des cahiers des charges, routage des NDA, suivi des enveloppes
- **Stripe** — Traitement des paiements, facturation récurrente en mode retainer, suivi des virements
- **Gmail** — Communication client, envoi de contrats, relances de factures, prospection commerciale
- **Claude Code** — Rédaction de propositions, génération de cahiers des charges, emails de relance de factures, rapports d'avancement, séquences de prospection

## Arborescence

```
freelancer-workspace/
├── .claude/
│   ├── CLAUDE.md                            # Instructions de l'espace de travail (coller le modèle ci-dessous)
│   ├── settings.json                        # Serveurs MCP, hooks, permissions
│   └── commands/
│       ├── proposal-draft.md                # /proposal-draft — proposition complète à partir d'un brief client
│       ├── scope-of-work.md                 # /scope-of-work — cahier des charges avec livrables, calendrier, paiement
│       ├── invoice-chase.md                 # /invoice-chase — séquence d'emails de relance pour factures impayées
│       ├── status-report.md                 # /status-report — rapport d'avancement hebdomadaire ou par jalon
│       ├── client-onboard.md                # /client-onboard — checklist d'intégration + communications de bienvenue
│       ├── new-business.md                  # /new-business — séquence de prospection à froid ou de suivi à chaud
│       └── weekly-wrap.md                   # /weekly-wrap — bilan personnel de fin de semaine + plan de la semaine suivante
├── clients/
│   ├── _template/                           # Copier ce dossier lors de la signature d'un nouveau client
│   │   ├── brief.md                         # Brief client initial — objectifs, calendrier, budget, contacts
│   │   ├── contract.md                      # Résumé du contrat — conditions clés, échéancier de paiement, résiliation
│   │   ├── sow.md                           # Cahier des charges — livrables, jalons, critères d'acceptation
│   │   ├── onboarding-checklist.md          # Accès accordés, outils configurés, lancement effectué, ressources reçues
│   │   ├── status-log.md                    # Journal des rapports d'avancement hebdomadaires/par jalon envoyés
│   │   ├── comms-log.md                     # Fils d'emails, appels, décisions — échanges notables uniquement
│   │   ├── deliverables/                    # Tous les livrables remis à ce client
│   │   │   └── .gitkeep
│   │   └── invoices/                        # Enregistrements de factures pour ce client
│   │       └── .gitkeep
│   ├── acme-redesign/                       # Client actif : refonte du site web d'Acme Corp
│   │   ├── brief.md
│   │   ├── contract.md
│   │   ├── sow.md
│   │   ├── onboarding-checklist.md
│   │   ├── status-log.md
│   │   ├── comms-log.md
│   │   ├── deliverables/
│   │   │   ├── 2026-04-15-wireframes-v1.pdf
│   │   │   ├── 2026-05-01-wireframes-v2-revised.pdf
│   │   │   └── 2026-06-01-final-handoff.zip
│   │   └── invoices/
│   │       ├── inv-001-deposit.md           # Enregistrement de facture : numéro, montant, date d'envoi, date de paiement
│   │       ├── inv-002-milestone-1.md
│   │       └── inv-003-final.md
│   ├── beta-corp-strategy/                  # Client actif : mission stratégique fractionnelle chez Beta Corp
│   │   ├── brief.md
│   │   ├── contract.md
│   │   ├── sow.md
│   │   ├── status-log.md
│   │   ├── comms-log.md
│   │   ├── deliverables/
│   │   │   ├── 2026-05-10-market-analysis.md
│   │   │   └── 2026-06-01-go-to-market-plan.md
│   │   └── invoices/
│   │       ├── inv-001-may-retainer.md
│   │       └── inv-002-jun-retainer.md
│   └── gamma-startup/                       # Client clôturé — archivé pour référence
│       ├── brief.md
│       ├── contract.md
│       ├── sow.md
│       ├── status-log.md
│       ├── comms-log.md
│       ├── deliverables/
│       │   └── 2026-03-20-final-report.md
│       └── invoices/
│           ├── inv-001-deposit.md
│           └── inv-002-completion.md
├── proposals/
│   ├── active/                              # Propositions envoyées, ni signées ni rejetées
│   │   ├── 2026-05-28-delta-inc-brand-refresh.md
│   │   └── 2026-06-01-epsilon-co-growth-strategy.md
│   ├── won/                                 # Propositions signées — déplacer ici une fois le contrat exécuté
│   │   ├── 2026-04-01-acme-redesign.md
│   │   └── 2026-03-10-beta-corp-strategy.md
│   └── lost/                               # Propositions rejetées ou sans réponse — conserver pour analyser les tendances
│       ├── 2026-02-14-zeta-app-proposal.md
│       └── 2026-01-20-eta-audit-proposal.md
├── templates/
│   ├── proposal-template.md                 # Modèle de proposition réutilisable : problématique, approche, livrables, tarification
│   ├── sow-template.md                      # Cahier des charges : périmètre, calendrier, jalons, échéancier, exclusions
│   ├── contract-template.md                 # Contrat-cadre de services : PI, confidentialité, paiement, résiliation
│   ├── invoice-template.md                  # Format de facture : lignes de détail, conditions de paiement, coordonnées bancaires/Stripe
│   ├── nda-template.md                      # NDA mutuel pour les discussions préalables à la proposition
│   ├── onboarding-welcome-email.md          # Premier email au nouveau client après signature du contrat
│   └── status-report-template.md           # Rapport hebdomadaire : réalisé, à venir, blocages, décisions requises
├── business-dev/
│   ├── prospect-list.md                     # Nom de l'entreprise, contact, source, statut, dernier contact, prochaine action
│   ├── outreach-log.md                      # Date, prospect, type de message, réponse, date de suivi
│   ├── referral-partners.md                 # Personnes qui apportent des missions — notes de relation, dernier remerciement envoyé
│   └── positioning-notes.md                 # Définition du profil client idéal, niche, différenciateurs clés, preuves
├── finance/
│   ├── income-tracker.md                    # Mensuel : facturé, encaissé, en attente — par client
│   ├── expense-log.md                       # Date, fournisseur, catégorie, montant — pour le suivi des déductions fiscales
│   ├── tax-estimate.md                      # Calcul trimestriel des acomptes provisionnels et journal des paiements
│   ├── rate-card.md                         # Tarifs en vigueur : horaire, projet, retainer — avec date de dernière mise à jour
│   └── cash-flow-forecast.md               # Projection à 90 jours : entrées attendues, dépenses connues, réserve de trésorerie
└── ops/
    ├── onboarding-sop.md                    # Processus pas-à-pas pour intégrer un nouveau client du contrat signé au lancement
    ├── tools-and-access.md                  # Chaque outil utilisé, identifiant, niveau d'abonnement, coût mensuel, date de renouvellement
    ├── subcontractors.md                    # Sous-traitants de confiance : nom, spécialité, tarif, disponibilité, travaux antérieurs
    └── working-hours-policy.md             # SLA de réponse, politique d'absence, règles de contact d'urgence
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `.claude/commands/proposal-draft.md` | Commande slash qui prend un brief client et produit une proposition complète — problématique, approche proposée, liste des livrables, calendrier et options tarifaires |
| `.claude/commands/scope-of-work.md` | Commande slash qui convertit une proposition validée en cahier des charges structuré avec jalons, critères d'acceptation, déclencheurs de paiement et exclusions explicites |
| `.claude/commands/invoice-chase.md` | Commande slash qui génère une séquence d'emails de relance graduée (rappel amical, demande ferme, mise en demeure) pour les factures impayées — prend le numéro de facture, le montant et le nombre de jours de retard |
| `.claude/commands/status-report.md` | Commande slash qui produit un rapport d'avancement client concis à partir d'une liste de tâches accomplies, de blocages et des prochaines étapes — formaté pour email ou Notion |
| `.claude/commands/client-onboard.md` | Commande slash qui génère une checklist d'intégration et rédige l'email de bienvenue, l'ordre du jour du lancement et la liste des demandes d'accès pour un nouveau client |
| `clients/_template/` | Structure de dossier vierge à copier au démarrage de toute nouvelle mission client — garantit une documentation cohérente sur l'ensemble des projets |
| `finance/income-tracker.md` | Grand livre mensuel du facturé versus encaissé par client — source de vérité unique pour le chiffre d'affaires et les créances en attente |
| `ops/onboarding-sop.md` | Processus répétable pas-à-pas du contrat signé à l'appel de lancement — garantit qu'aucune étape d'accès, d'identification ou de communication n'est omise |

## Scaffold rapide

```bash
# Créer la racine de l'espace de travail
mkdir -p freelancer-workspace

# Créer la structure .claude
mkdir -p freelancer-workspace/.claude/commands

# Créer le modèle de dossier client
mkdir -p freelancer-workspace/clients/_template/deliverables
mkdir -p freelancer-workspace/clients/_template/invoices
touch freelancer-workspace/clients/_template/deliverables/.gitkeep
touch freelancer-workspace/clients/_template/invoices/.gitkeep
touch freelancer-workspace/clients/_template/brief.md
touch freelancer-workspace/clients/_template/contract.md
touch freelancer-workspace/clients/_template/sow.md
touch freelancer-workspace/clients/_template/onboarding-checklist.md
touch freelancer-workspace/clients/_template/status-log.md
touch freelancer-workspace/clients/_template/comms-log.md

# Créer les dossiers des clients actifs
mkdir -p freelancer-workspace/clients/acme-redesign/deliverables
mkdir -p freelancer-workspace/clients/acme-redesign/invoices
mkdir -p freelancer-workspace/clients/beta-corp-strategy/deliverables
mkdir -p freelancer-workspace/clients/beta-corp-strategy/invoices

# Créer les dossiers de propositions
mkdir -p freelancer-workspace/proposals/active
mkdir -p freelancer-workspace/proposals/won
mkdir -p freelancer-workspace/proposals/lost

# Créer le dossier des modèles
mkdir -p freelancer-workspace/templates

# Créer les dossiers business-dev, finance et ops
mkdir -p freelancer-workspace/business-dev
mkdir -p freelancer-workspace/finance
mkdir -p freelancer-workspace/ops

# Initialiser les fichiers clés
touch freelancer-workspace/finance/income-tracker.md
touch freelancer-workspace/finance/expense-log.md
touch freelancer-workspace/finance/tax-estimate.md
touch freelancer-workspace/finance/rate-card.md
touch freelancer-workspace/finance/cash-flow-forecast.md
touch freelancer-workspace/business-dev/prospect-list.md
touch freelancer-workspace/business-dev/outreach-log.md
touch freelancer-workspace/ops/onboarding-sop.md
touch freelancer-workspace/ops/tools-and-access.md

# Installer les compétences freelance/petite entreprise
npx uitkit add skill small-business/freelancer-proposal
npx uitkit add skill small-business/scope-of-work
npx uitkit add skill small-business/invoice-chaser
npx uitkit add skill small-business/client-status-report
npx uitkit add skill small-business/cold-outreach

# Copier les stubs de commandes dans .claude/commands/
npx uitkit add skill small-business/freelancer-proposal --output freelancer-workspace/.claude/commands/proposal-draft.md
npx uitkit add skill small-business/scope-of-work --output freelancer-workspace/.claude/commands/scope-of-work.md
npx uitkit add skill small-business/invoice-chaser --output freelancer-workspace/.claude/commands/invoice-chase.md
npx uitkit add skill small-business/client-status-report --output freelancer-workspace/.claude/commands/status-report.md
npx uitkit add skill small-business/cold-outreach --output freelancer-workspace/.claude/commands/new-business.md
```

## Modèle CLAUDE.md

```markdown
# Espace de travail Freelance — Instructions Claude Code

## Ce que c'est

Il s'agit du répertoire de travail d'un consultant indépendant gérant des missions client, des propositions,
la facturation et le développement commercial. Les travaux clients sont dans clients/, les propositions ouvertes dans proposals/active/,
les documents réutilisables dans templates/, et les enregistrements financiers dans finance/. Toute rédaction de proposition, génération
de cahier des charges, relance de facture, rapport d'avancement et prospection passe par les commandes slash de Claude Code.

## Stack

- Notion — Suivi de projet par client ; indiquer l'URL de la page Notion dans clients/<nom>/brief.md
- FreshBooks / Wave — Facturation et comptabilité ; enregistrer les numéros de factures et dates de paiement dans clients/<nom>/invoices/
- Cal.com / Calendly — Planification ; coller le lien de réservation dans onboarding-welcome-email.md et les propositions
- Loom — Mises à jour asynchrones ; intégrer les URLs Loom dans les rapports d'avancement envoyés aux clients
- DocuSign — Signature de contrats et cahiers des charges ; enregistrer les IDs d'enveloppe dans clients/<nom>/contract.md
- Stripe — Traitement des paiements ; enregistrer les IDs de paiement Stripe dans les fichiers clients/<nom>/invoices/
- Gmail — Toutes les communications client ; décisions et accords notables consignés dans clients/<nom>/comms-log.md

## Tâches courantes et commandes exactes

### Rédiger une proposition à partir d'un brief client
```
/proposal-draft

Client: [nom de l'entreprise]
Contact: [nom, titre, email]
Brief: [coller le brief ou décrire la demande en détail]
Budget range: [$X–$Y or "TBD"]
Timeline: [date de début cible et durée]
My angle: [ce que j'apporte de différent par rapport à un généraliste]
```

### Générer un cahier des charges à partir d'une proposition signée
```
/scope-of-work

Client: [nom de l'entreprise]
Project: [nom du projet]
Agreed deliverables: [lister exactement ce qui a été convenu]
Timeline: [date de début, dates de jalons, date de fin]
Payment schedule: [% dépôt, % jalon, % achèvement]
Exclusions: [tout ce qui est explicitement hors périmètre]
```

### Rédiger une relance de facture
```
/invoice-chase

Client: [nom de l'entreprise]
Invoice number: [INV-XXX]
Amount: [$X]
Due date: [date]
Days overdue: [N]
Prior contact: [ai-je déjà relancé ? quand ?]
Tone: [friendly / firm / final notice]
```

### Envoyer un rapport d'avancement client
```
/status-report

Client: [nom de l'entreprise]
Period: [semaine du / jalon : X]
Completed this period: [liste à puces]
In progress: [ce qui est en cours]
Blockers: [ce dont j'ai besoin de leur part]
Next period plan: [ce qui se passe ensuite]
Format: [email / mise à jour Notion / script Loom]
```

### Intégrer un nouveau client
```
/client-onboard

Client: [nom de l'entreprise]
Contact: [nom, titre]
Project: [nom du projet]
Start date: [date]
Tools to grant access: [Notion, Slack, Figma, Drive — lister ce qui s'applique]
First deliverable due: [date et nature du livrable]
```

### Rédiger une prospection pour un nouveau prospect
```
/new-business

Prospect: [nom et description de l'entreprise]
Contact: [nom, titre]
Source: [comment je les connais ou les ai trouvés]
Angle: [pourquoi je contacte maintenant — événement déclencheur, recommandation, contenu]
Ask: [appel de découverte, réponse, introduction — une seule chose]
Tone: [warm / cold / follow-up on prior touch]
```

### Faire un bilan hebdomadaire
```
/weekly-wrap

Week of: [date]
Client work done: [liste par client]
Proposals sent: [liste]
Invoices sent / collected: [liste]
Business dev actions: [prospection envoyée, appels passés]
Next week priorities: [top 3]
Blockers or concerns: [ce qui pèse sur vous]
```

## Conventions à respecter

- Chaque nouveau client doit avoir un dossier créé sous clients/ avant l'appel de lancement — copier _template/
- Les fichiers de cahier des charges dans clients/<nom>/sow.md sont la source de vérité contractuelle — ne jamais décrire le périmètre de mémoire
- Les enregistrements de factures dans clients/<nom>/invoices/ doivent inclure : numéro de facture, montant, date d'envoi, date de paiement (ou "en attente")
- Les propositions vont dans proposals/active/ à l'envoi — déplacer vers won/ ou lost/ dans les 48 heures suivant le résultat
- Toutes les tentatives de prospection sont consignées dans business-dev/outreach-log.md le jour même de l'envoi
- finance/income-tracker.md est mis à jour le dernier vendredi de chaque mois — sans exception
- finance/expense-log.md est mis à jour chaque semaine — consigner tout achat de plus de 20 € à des fins fiscales
- Le tarif dans finance/rate-card.md affiche toujours la date de dernière mise à jour — à réviser chaque trimestre
```

## Serveurs MCP

```json
{
  "mcpServers": {
    "google-drive": {
      "command": "npx",
      "args": ["-y", "@googleapis/mcp-server-google-drive"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-google-oauth-client-id",
        "GOOGLE_CLIENT_SECRET": "your-google-oauth-client-secret",
        "GOOGLE_REFRESH_TOKEN": "your-google-refresh-token"
      }
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
        "/Users/your-username/freelancer-workspace"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"proposals/active/\"; then echo \"[hook] Proposal saved to active/ — log it in business-dev/outreach-log.md with the date sent and prospect contact\"; fi'"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"clients/.*/sow.md\"; then echo \"[hook] Writing SOW — confirm client folder has brief.md and contract.md before finalising scope\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'TODAY=$(date +%A); if [ \"$TODAY\" = \"Friday\" ]; then echo \"[reminder] Friday — run /weekly-wrap and check finance/income-tracker.md for any outstanding invoices\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Compétences à installer

```bash
# Compétences freelance essentielles
npx uitkit add skill small-business/freelancer-proposal
npx uitkit add skill small-business/scope-of-work
npx uitkit add skill small-business/invoice-chaser
npx uitkit add skill small-business/client-status-report
npx uitkit add skill small-business/cold-outreach

# Compétences de productivité complémentaires
npx uitkit add skill productivity/stakeholder-comms
npx uitkit add skill productivity/process-mapper
npx uitkit add skill productivity/vendor-evaluator

# Installer toutes les compétences small-business en une fois
npx uitkit add skills small-business
```

## Ressources associées

- [Guide freelance](../guides/for-freelancer.md)
- [Workflow d'intégration client](../workflows/client-onboarding.md)
- [Workflow de la proposition au contrat](../workflows/proposal-to-contract.md)
