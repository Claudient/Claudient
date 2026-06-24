# Espace de travail pour assistant de direction — Structure de projet

> Pour un assistant de direction (EA) au service d'un cadre dirigeant : gestion de l'agenda, préparation des réunions, suivi des actions, préparation des conseils d'administration, logistique des déplacements, communications avec les parties prenantes et gestion des notes de frais — le tout piloté depuis un seul espace de travail Claude Code.

## Stack

- Google Workspace — Gmail (messagerie), Google Calendar (planification), Google Drive (stockage de documents)
- Notion — documents de briefing, procédures opérationnelles (SOPs), notes sur les relations avec les parties prenantes
- Slack — communication asynchrone interne, surveillance des canaux de direction
- Zoom — logistique des réunions, liens d'enregistrement, gestion des clés d'hôte
- Concur ou Expensify — réservations de voyages et soumission des notes de frais
- DocuSign — acheminement de documents pour signature, suivi des statuts
- MCP : google-drive, gmail, slack

## Arborescence de répertoires

```
ea-workspace/
├── .claude/
│   ├── CLAUDE.md                              # Instructions de l'espace de travail pour Claude Code
│   ├── settings.json                          # Permissions, hooks, configurations MCP
│   └── commands/
│       ├── meeting-brief.md                   # Prend les participants + l'ordre du jour → briefing complet pré-réunion
│       ├── travel-plan.md                     # Prend la destination + les dates → itinéraire + liste de contrôle logistique
│       ├── follow-up-tracker.md               # Extrait les actions à faire des notes de réunion → liste de suivi
│       ├── board-prep.md                      # Assemble le dossier du conseil depuis board/ → résumé de direction + index des documents
│       ├── weekly-brief.md                    # Compile les priorités hebdomadaires, l'agenda et les points ouverts pour le dirigeant
│       ├── stakeholder-email.md               # Rédige un e-mail adapté à la partie prenante à partir des templates/ + notes relationnelles
│       └── expense-report.md                 # Structure les détails des dépenses au format de soumission Concur/Expensify
├── briefings/                                 # Briefings pré-réunion, organisés par date
│   ├── README.md                              # Index des archives de briefings — liens par mois
│   ├── briefing-template.md                   # Format de briefing de référence (participants, ordre du jour, contexte, demandes)
│   ├── 2026-06/
│   │   ├── 2026-06-03-board-strategy-sync.md  # Réunion stratégique du conseil — participants, ordre du jour, contexte de direction
│   │   ├── 2026-06-05-investor-q-a.md         # Préparation session Q&R investisseurs — profils des investisseurs, questions probables
│   │   ├── 2026-06-10-partnership-call.md     # Appel partenariat — présentation de l'entreprise, contexte de l'accord
│   │   └── 2026-06-17-all-hands-prep.md       # Préparation all-hands — points de communication, notes de révision des diapositives
│   └── 2026-05/
│       ├── 2026-05-20-ceo-peer-roundtable.md  # Table ronde entre pairs — biographies des participants, thèmes abordés
│       └── 2026-05-28-qbr-prep.md            # Préparation QBR — métriques, narration, demandes de direction
├── board/                                     # Documents de réunion du conseil et pièces de gouvernance
│   ├── README.md                              # Calendrier du conseil, liste des membres, guide de classement des documents
│   ├── members/
│   │   ├── board-member-profiles.md           # Biographie, rôle, mandat, domaines de focus par membre du conseil
│   │   └── committee-assignments.md           # Compositions des comités d'audit, de rémunération et de nomination
│   ├── 2026-q2/
│   │   ├── agenda-2026-q2.md                  # Ordre du jour du conseil avec allocations de temps et intervenants
│   │   ├── board-deck-outline-2026-q2.md      # Plan des diapositives avant production du support final
│   │   ├── pre-read-packet-2026-q2.md         # Résumé de direction + liens vers tous les documents de pré-lecture
│   │   ├── minutes-2026-q2-draft.md           # Projet de procès-verbal pour révision de direction avant diffusion
│   │   └── action-items-2026-q2.md            # Actions ouvertes de la réunion du conseil avec responsables et échéances
│   ├── 2026-q1/
│   │   ├── minutes-2026-q1-final.md           # Procès-verbal du conseil approuvé et signé
│   │   └── action-items-2026-q1-closed.md     # Actions closes du T1 — archivées pour le registre de gouvernance
│   └── standing-materials/
│       ├── board-sop.md                       # SOP — logistique, liste de diffusion, workflow d'approbation des procès-verbaux
│       └── consent-calendar-template.md       # Modèle pour les points du calendrier de consentement
├── travel/                                    # Itinéraires, SOPs de réservation et préférences de voyage
│   ├── README.md                              # Guide de classement des voyages et workflow de réservation
│   ├── exec-travel-preferences.md             # Préférences du dirigeant — compagnies aériennes, sièges, hôtels, numéros de fidélité
│   ├── booking-sop.md                         # SOP de réservation étape par étape : vols, hôtels, transport terrestre
│   ├── visa-passport-tracker.md               # Expiration du passeport, validité des visas, statut ESTA/ETA par pays
│   ├── active/
│   │   ├── 2026-06-18-london-trip.md          # Itinéraire actif — vols, hôtel, transport terrestre, contacts
│   │   └── 2026-07-08-davos-trip.md           # Itinéraire à venir — vols à confirmer, hôtel réservé
│   └── archive/
│       ├── 2026-05-nyc-roadshow.md            # Terminé — classé pour référence de rapprochement des dépenses
│       └── 2026-04-sf-summit.md               # Terminé — toutes les dépenses soumises et approuvées
├── stakeholders/                              # Contacts clés, notes relationnelles, historique des communications
│   ├── README.md                              # Guide de classification des parties prenantes (Conseil / Investisseurs / Partenaires / Médias)
│   ├── board-members/
│   │   ├── jane-doe-profile.md                # Biographie, style de communication, sujets sensibles, dernière interaction
│   │   └── john-smith-profile.md              # Biographie, méthode de contact préférée, contexte relationnel
│   ├── investors/
│   │   ├── series-b-lead.md                   # Profil de l'investisseur principal — cabinet, associé, cadence, dernière mise à jour envoyée
│   │   └── strategic-investors.md             # Contacts des investisseurs stratégiques et journal d'engagement
│   ├── partners/
│   │   ├── key-partners.md                    # Top 5 des partenaires stratégiques — contacts, état de la relation, prochaine étape
│   │   └── partner-engagement-log.md          # Journal continu des points de contact, engagements et suivis
│   └── media/
│       ├── press-contacts.md                  # Journalistes, organes de presse, domaine de couverture, niveau de relation
│       └── spokesperson-sop.md               # SOP — liste des porte-paroles autorisés, processus de validation des citations
├── templates/                                 # Modèles d'e-mails par scénario, ordres du jour, formats de briefing
│   ├── email/
│   │   ├── meeting-request-external.md        # Modèle — demande de réunion avec une partie prenante externe
│   │   ├── meeting-request-internal.md        # Modèle — planification de réunions internes de direction
│   │   ├── follow-up-post-meeting.md          # Modèle — récapitulatif post-réunion et résumé des actions
│   │   ├── board-member-update.md             # Modèle — prise de contact proactive avec un membre du conseil entre les réunions
│   │   ├── investor-check-in.md               # Modèle — point trimestriel ou ponctuel avec un investisseur
│   │   ├── speaking-invitation-accept.md      # Modèle — acceptation d'une invitation à une conférence ou un panel
│   │   ├── speaking-invitation-decline.md     # Modèle — déclin courtois avec option de redirection
│   │   ├── intro-request.md                   # Modèle — demande d'introduction au nom du dirigeant
│   │   ├── intro-forwarder.md                 # Modèle — transmission d'une introduction avec double consentement
│   │   └── thank-you-post-event.md            # Modèle — message de remerciement post-événement ou post-réunion
│   ├── agendas/
│   │   ├── 1-1-agenda.md                      # Ordre du jour standard de tête-à-tête — points fixes, sujets, décisions requises
│   │   ├── leadership-team-agenda.md          # Structure de la réunion hebdomadaire de l'équipe de direction
│   │   ├── board-meeting-agenda.md            # Format de l'ordre du jour du conseil avec créneaux horaires
│   │   └── offsite-agenda.md                  # Ordre du jour de séminaire d'une journée complète avec notes de facilitation
│   └── briefings/
│       ├── external-meeting-brief.md          # Format de briefing pour les réunions externes
│       └── internal-review-brief.md           # Format de briefing pour les revues internes
├── reports/                                   # Résumés hebdomadaires et mensuels pour la direction
│   ├── README.md                              # Cadence des rapports et liste de diffusion
│   ├── weekly/
│   │   ├── 2026-W22-weekly-brief.md           # Semaine du 2026-05-25 — priorités, agenda, points ouverts
│   │   ├── 2026-W23-weekly-brief.md           # Semaine du 2026-06-01 — semaine en cours
│   │   └── weekly-brief-template.md           # Modèle — agenda, priorités, décisions, suivis
│   └── monthly/
│       ├── 2026-05-monthly-summary.md         # Mai 2026 — résultats clés, résumé des déplacements, décisions prises
│       └── monthly-summary-template.md        # Modèle — faits marquants, points de contact parties prenantes, boucles ouvertes
└── expenses/                                  # Suivi des dépenses et archives de soumission
    ├── README.md                              # Résumé de la politique de dépenses, identifiants Concur/Expensify, chaîne d'approbation
    ├── 2026-06/
    │   ├── june-expenses-log.md               # Journal continu des dépenses du mois pour révision avant soumission
    │   └── receipts-checklist.md              # Suivi des justificatifs manquants avant clôture mensuelle
    └── archive/
        ├── 2026-05-expense-report.md          # Rapport de mai soumis et approuvé
        └── 2026-04-expense-report.md          # Rapport d'avril soumis et approuvé
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `.claude/commands/meeting-brief.md` | Commande slash qui prend les noms des participants et un ordre du jour, puise dans `stakeholders/` et `briefings/briefing-template.md`, et produit un briefing pré-réunion structuré prêt à envoyer ou à enregistrer |
| `.claude/commands/board-prep.md` | Commande slash qui lit les documents de `board/` pour le trimestre à venir, compile le plan du dossier de pré-lecture, rédige l'ordre du jour et signale les actions ouvertes de la réunion précédente |
| `.claude/commands/follow-up-tracker.md` | Commande slash qui ingère des notes de réunion brutes ou une transcription, extrait les actions à faire avec responsables et échéances, et les formate en liste de suivi traçable |
| `.claude/commands/weekly-brief.md` | Commande slash qui récupère l'agenda de la semaine en cours, les suivis ouverts et le contexte des priorités pour produire le briefing du lundi matin du dirigeant |
| `briefings/briefing-template.md` | Format de briefing de référence : participants avec titres, ordre du jour avec créneaux horaires, contexte de direction, questions probables, demandes suggérées — utilisé comme base pour chaque briefing de réunion |
| `stakeholders/board-members/` | Profils individuels des membres du conseil avec biographie, préférences de communication et historique des interactions — consultés lors de la rédaction des communications ou des briefings de réunion |
| `travel/exec-travel-preferences.md` | Source de vérité unique pour les préférences de voyage du dirigeant : compagnies aériennes préférées, siège (couloir/hublot), catégorie d'hôtel, numéros de programmes de fidélité, régimes alimentaires, préférences de transport terrestre |
| `templates/email/` | Modèles d'e-mails par scénario — utilisés par la commande `stakeholder-email.md` pour rédiger des messages contextuellement adaptés sans partir d'une page blanche |
| `board/standing-materials/board-sop.md` | SOP couvrant l'intégralité du cycle de vie d'une réunion du conseil : projet d'ordre du jour, délais de diffusion des documents, chaîne d'approbation des procès-verbaux, acheminement DocuSign pour les points de consentement |
| `reports/weekly/weekly-brief-template.md` | Modèle pour le briefing du lundi du dirigeant : agenda de la semaine, priorités classées par impact, décisions ouvertes requises, suivis dus cette semaine |

## Démarrage rapide

```bash
# Create the workspace root
mkdir -p ea-workspace
cd ea-workspace

# Create .claude structure
mkdir -p .claude/commands

# Create workspace directories
mkdir -p briefings/briefing-template
mkdir -p briefings/2026-06
mkdir -p briefings/2026-05
mkdir -p board/members
mkdir -p board/2026-q2
mkdir -p board/2026-q1
mkdir -p board/standing-materials
mkdir -p travel/active
mkdir -p travel/archive
mkdir -p stakeholders/board-members
mkdir -p stakeholders/investors
mkdir -p stakeholders/partners
mkdir -p stakeholders/media
mkdir -p templates/email
mkdir -p templates/agendas
mkdir -p templates/briefings
mkdir -p reports/weekly
mkdir -p reports/monthly
mkdir -p expenses/2026-06
mkdir -p expenses/archive

# Seed key files
touch briefings/README.md briefings/briefing-template.md
touch board/README.md board/standing-materials/board-sop.md board/standing-materials/consent-calendar-template.md
touch board/members/board-member-profiles.md board/members/committee-assignments.md
touch travel/exec-travel-preferences.md travel/booking-sop.md travel/visa-passport-tracker.md travel/README.md
touch stakeholders/README.md
touch stakeholders/board-members/.gitkeep
touch stakeholders/investors/strategic-investors.md
touch stakeholders/partners/key-partners.md stakeholders/partners/partner-engagement-log.md
touch stakeholders/media/press-contacts.md stakeholders/media/spokesperson-sop.md
touch templates/email/meeting-request-external.md templates/email/meeting-request-internal.md
touch templates/email/follow-up-post-meeting.md templates/email/board-member-update.md
touch templates/email/investor-check-in.md templates/email/intro-request.md templates/email/intro-forwarder.md
touch templates/email/speaking-invitation-accept.md templates/email/speaking-invitation-decline.md
touch templates/email/thank-you-post-event.md
touch templates/agendas/1-1-agenda.md templates/agendas/leadership-team-agenda.md
touch templates/agendas/board-meeting-agenda.md templates/agendas/offsite-agenda.md
touch templates/briefings/external-meeting-brief.md templates/briefings/internal-review-brief.md
touch reports/README.md reports/weekly/weekly-brief-template.md reports/monthly/monthly-summary-template.md
touch expenses/README.md expenses/2026-06/june-expenses-log.md expenses/2026-06/receipts-checklist.md

# Install Claude Code skills
npx uitkit add skill productivity/exec-briefing
npx uitkit add skill productivity/stakeholder-comms
npx uitkit add skill productivity/meeting-to-action
npx uitkit add skill small-business/monday-brief
npx uitkit add skill productivity/investor-update
npx uitkit add skill productivity/process-mapper
npx uitkit add skill productivity/vendor-evaluator

# Install slash commands
npx uitkit add command meeting-brief
npx uitkit add command travel-plan
npx uitkit add command follow-up-tracker
npx uitkit add command board-prep
npx uitkit add command weekly-brief
npx uitkit add command stakeholder-email
npx uitkit add command expense-report
```

## Modèle CLAUDE.md

```markdown
# Espace de travail pour assistant de direction

Cet espace de travail accompagne un EA dans la gestion du rythme opérationnel complet d'un cadre dirigeant :
agenda, préparation des réunions, gouvernance du conseil, déplacements, communications avec les parties prenantes et dépenses.

---

## Présentation

Un espace de travail Claude Code structuré pour un assistant de direction. Les répertoires correspondent
directement aux fonctions du poste. Claude Code lit ces fichiers pour produire des livrables propres à l'organisation —
briefings, e-mails et listes de suivi qui reflètent les relations réelles et le contexte concret, non des formats génériques.

---

## Stack

- Google Workspace — Gmail et Google Calendar comme couche principale de communication et de planification (MCP : gmail, google-drive)
- Notion — documents de briefing et SOPs (accessibles via Google Drive MCP ou l'API Notion)
- Slack — communication asynchrone interne et surveillance des canaux de direction (MCP : slack)
- Zoom — logistique des réunions et liens d'enregistrement
- Concur ou Expensify — réservation de voyages et soumission des notes de frais
- DocuSign — acheminement de documents et suivi des statuts de signature

---

## Conventions des répertoires

- `briefings/` — Un fichier par réunion, nommé `YYYY-MM-DD-description-courte.md`. Archivé par mois.
- `board/` — Un sous-répertoire par trimestre (ex. `2026-q2/`). Les documents permanents restent dans `standing-materials/`.
- `travel/` — Itinéraires actifs dans `travel/active/`, voyages terminés dans `travel/archive/`. Préférences dans `exec-travel-preferences.md`.
- `stakeholders/` — Un fichier par contact prioritaire. Organisé par niveau : `board-members/`, `investors/`, `partners/`, `media/`.
- `templates/` — Modèles d'e-mails dans `templates/email/`, ordres du jour dans `templates/agendas/`. Ne jamais modifier un modèle en place — copier d'abord dans le contexte de travail.
- `reports/` — Briefings hebdomadaires dans `reports/weekly/`, résumés mensuels dans `reports/monthly/`. Format de nom : `YYYY-WNN-weekly-brief.md` ou `YYYY-MM-monthly-summary.md`.
- `expenses/` — Un sous-répertoire par mois. Enregistrer les dépenses dans `june-expenses-log.md` avant soumission à Concur/Expensify.

---

## Tâches courantes — commandes exactes

### Préparation des réunions
```
/meeting-brief    — Fournir les participants et l'ordre du jour. Claude récupère les profils des parties prenantes dans stakeholders/
                    et produit un briefing pré-réunion complet à partir de briefings/briefing-template.md.
```

### Gouvernance du conseil
```
/board-prep       — Produit le plan du dossier de pré-lecture, le projet d'ordre du jour et signale les actions
                    ouvertes du trimestre précédent dans board/YYYY-QN/action-items-*.md.
```

### Suivi des actions
```
/follow-up-tracker — Coller les notes de réunion ou la transcription. Claude extrait les actions avec responsables,
                     échéances et les formate en liste de suivi traçable prête à envoyer ou à enregistrer.
```

### Briefing hebdomadaire
```
/weekly-brief     — Compile l'agenda de la semaine, les suivis ouverts et le contexte des priorités dans
                    le briefing du lundi matin du dirigeant, à partir de reports/weekly/weekly-brief-template.md.
```

### Communications avec les parties prenantes
```
/stakeholder-email — Préciser le destinataire et l'objet. Claude charge son profil depuis stakeholders/
                     et rédige à partir du modèle approprié dans templates/email/.
```

### Logistique des déplacements
```
/travel-plan      — Fournir la destination et les dates. Claude applique les préférences du dirigeant depuis
                    travel/exec-travel-preferences.md et génère une liste de contrôle d'itinéraire complète.
```

### Gestion des dépenses
```
/expense-report   — Fournir les détails des dépenses ou une liste de justificatifs. Claude formate la soumission
                    selon la politique dans expenses/README.md, prête pour la saisie dans Concur ou Expensify.
```

---

## Conventions que Claude doit respecter

- Ne jamais inventer des noms, titres ou contextes relationnels de parties prenantes. Lire d'abord dans `stakeholders/`.
- Tous les briefings de réunion doivent utiliser `briefings/briefing-template.md` comme structure de base — ne pas créer un nouveau format.
- Lors de la rédaction d'e-mails, toujours charger le profil du destinataire depuis `stakeholders/` avant de choisir un modèle.
- Les itinéraires de voyage doivent refléter `travel/exec-travel-preferences.md` — préférence de siège, numéros de fidélité, catégorie d'hôtel.
- Les procès-verbaux et documents du conseil dans `board/` sont confidentiels. Ne pas inclure de contenu verbatim dans les livrables destinés à être envoyés par e-mail.
- Les entrées de dépenses doivent référencer la politique dans `expenses/README.md`. Signaler tout dépassement du per diem ou tout justificatif manquant.
- Lorsqu'une action est extraite d'une réunion impliquant des membres du conseil, consulter `board/standing-materials/board-sop.md`.
```

## Serveurs MCP

```json
{
  "mcpServers": {
    "gmail": {
      "command": "npx",
      "args": ["-y", "@gptscript-ai/mcp-server-gmail"],
      "env": {
        "GMAIL_CLIENT_ID": "${GMAIL_CLIENT_ID}",
        "GMAIL_CLIENT_SECRET": "${GMAIL_CLIENT_SECRET}",
        "GMAIL_REFRESH_TOKEN": "${GMAIL_REFRESH_TOKEN}"
      }
    },
    "google-drive": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-gdrive"],
      "env": {
        "GDRIVE_CLIENT_ID": "${GDRIVE_CLIENT_ID}",
        "GDRIVE_CLIENT_SECRET": "${GDRIVE_CLIENT_SECRET}",
        "GDRIVE_REFRESH_TOKEN": "${GDRIVE_REFRESH_TOKEN}"
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
        "/Users/you/ea-workspace"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"briefings/\"; then echo \"[Briefing hook] Briefing saved — confirm it has been shared with the exec via Slack or email before the meeting.\"; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"board/\" && echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"action-items\"; then echo \"[Board hook] Action items filed — verify each item has an owner and due date before distributing.\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'echo \"[Session end] Check for any drafted emails or follow-ups that still need to be sent. Open items should be logged in the current week report under reports/weekly/.\"\n'"
          }
        ]
      }
    ]
  }
}
```

## Compétences à installer

```bash
npx uitkit add skill productivity/exec-briefing
npx uitkit add skill productivity/stakeholder-comms
npx uitkit add skill productivity/meeting-to-action
npx uitkit add skill small-business/monday-brief
npx uitkit add skill productivity/investor-update
npx uitkit add skill productivity/process-mapper
npx uitkit add skill productivity/vendor-evaluator
npx uitkit add skill productivity/lesson-planner
npx uitkit add skill productivity/doc-site-builder
```

## Ressources associées

- [Guide : Claude pour les assistants de direction](../guides/for-executive-assistant.md)
- [Workflow : Cycle de réunion du conseil](../workflows/board-meeting-cycle.md)
- [Workflow : Semaine type d'un dirigeant](../workflows/executive-weekly.md)
