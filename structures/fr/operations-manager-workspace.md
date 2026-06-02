# Espace de travail du responsable des opérations — Structure de projet

> Pour un responsable des opérations gérant les processus métier, les relations fournisseurs, les opérations d'équipe et la coordination transverse — avec Notion, Linear, Slack, Google Workspace, Zapier, Airtable et Monday.com comme stack opérationnelle.

## Stack

- **Notion** ou **Confluence** — Bibliothèque de procédures, documentation des processus, wiki interne, runbooks
- **Linear** ou **Asana** — Suivi de projets, initiatives transverses, gestion des tâches en mode sprint
- **Slack** — Communications d'équipe, canal ops, fils d'incidents, canaux d'escalade fournisseurs
- **Google Workspace** — Drive, Sheets (suivi des métriques), Docs (rapports), Calendar (facilitation des réunions)
- **Zapier** ou **Make** — Automatisation des workflows, pipelines formulaire-vers-tracker, règles de notification Slack
- **Airtable** — Registre fournisseurs, suivi des contrats, tableau de bord OKR, workflows d'approbation
- **Monday.com** — Visibilité inter-équipes sur les projets, planification de la capacité, vues roadmap
- **Claude Code** — Rédaction de procédures, cartographie des processus, évaluations fournisseurs, mise à jour des OKR, rapports ops hebdomadaires, synthèse des actions de réunion

## Arborescence

```
ops-workspace/
├── .claude/
│   ├── CLAUDE.md                                  # Instructions de l'espace de travail (collez le modèle ci-dessous)
│   ├── settings.json                              # Serveurs MCP, hooks, permissions
│   └── commands/
│       ├── sop-draft.md                           # /sop-draft — prend un nom de processus, génère une procédure complète avec rôles, étapes, exceptions
│       ├── process-map.md                         # /process-map — génère une carte de processus en couloirs dans Markdown + diagramme Mermaid
│       ├── vendor-review.md                       # /vendor-review — évaluation structurée de la performance fournisseur par rapport aux critères SLA
│       ├── okr-update.md                          # /okr-update — narratif de progression OKR, notation des résultats clés, indice de confiance
│       ├── weekly-ops.md                          # /weekly-ops — rapport ops hebdomadaire : blocages, succès, métriques, signaux inter-équipes
│       ├── incident-sop.md                        # /incident-sop — procédure de réponse aux incidents pour un type de défaillance opérationnelle donné
│       └── meeting-actions.md                     # /meeting-actions — distille les notes de réunion brutes en responsables, actions et échéances
├── sops/
│   ├── _template/
│   │   └── sop-template.md                        # Format de procédure canonique — objectif, périmètre, rôles, étapes, exceptions, propriétaire
│   ├── hr/
│   │   ├── onboarding-new-hire.md                 # Procédure complète d'intégration d'un nouveau collaborateur avec étapes IT, RH et manager
│   │   ├── offboarding-employee.md                # Départ de collaborateur : révocation des accès, restitution du matériel, entretien de sortie
│   │   └── performance-review-cycle.md            # Processus d'évaluation semestrielle avec calendrier et responsables
│   ├── finance/
│   │   ├── expense-approval.md                    # Procédure de soumission des notes de frais, niveaux d'approbation, remboursement
│   │   ├── invoice-processing.md                  # Réception des factures fournisseurs, routage d'approbation, procédure de paiement
│   │   └── budget-request.md                      # Processus de demande budgétaire : modèle, comité de révision, seuils d'approbation
│   ├── it/
│   │   ├── software-access-request.md             # Procédure de provisionnement des accès logiciels avec workflow d'approbation
│   │   ├── hardware-procurement.md                # Procédure de demande d'achat matériel jusqu'à la livraison
│   │   └── security-incident-response.md          # Procédure d'escalade et de confinement des incidents de sécurité IT
│   ├── ops/
│   │   ├── weekly-ops-review.md                   # Comment animer la réunion de revue ops hebdomadaire — ordre du jour, cadence, responsables
│   │   ├── vendor-onboarding.md                   # Intégration d'un nouveau fournisseur : juridique, conformité, saisie Airtable, création du canal Slack
│   │   ├── vendor-offboarding.md                  # Résiliation fournisseur : clôture du contrat, révocation des accès, facture finale
│   │   └── cross-functional-project-launch.md     # Checklist ops pour le lancement d'une nouvelle initiative transverse
│   └── compliance/
│       ├── data-retention-policy.md               # Règles de conservation des données par classe et lieu de stockage
│       └── audit-prep-checklist.md                # Procédure de collecte de documentation et de preuves avant audit
├── processes/
│   ├── _improvement-log.md                        # Journal des initiatives d'amélioration des processus — date, processus, modification, résultat
│   ├── hire-to-retire.md                          # Carte du cycle de vie complet du collaborateur avec points de contact systèmes
│   ├── procure-to-pay.md                          # Carte du processus achat-paiement : demande → bon de commande → réception → paiement
│   ├── incident-to-resolution.md                  # Carte du processus incident opérationnel : détection → escalade → résolution → postmortem
│   ├── request-to-fulfillment.md                  # Cycle de vie des demandes de service interne — réception, triage, traitement, clôture
│   └── idea-to-initiative.md                      # Processus nouvelle initiative : proposition → priorisation → lancement → suivi
├── vendors/
│   ├── vendor-registry.csv                        # Liste principale des fournisseurs : nom, catégorie, responsable, date de fin de contrat, niveau de dépenses
│   ├── _review-schedule.md                        # Calendrier des revues fournisseurs trimestrielles avec DRI assignés
│   ├── active/
│   │   ├── zapier/
│   │   │   ├── contract-summary.md                # Durée du contrat, date de renouvellement, tarification, niveau, option de renouvellement automatique
│   │   │   ├── sla-terms.md                       # SLA de disponibilité, délai de réponse support, contacts d'escalade
│   │   │   └── review-2026-q2.md                  # Revue de performance T2 : respect du SLA, utilisation, incidents, recommandation de renouvellement
│   │   ├── airtable/
│   │   │   ├── contract-summary.md
│   │   │   ├── sla-terms.md
│   │   │   └── review-2026-q2.md
│   │   ├── monday/
│   │   │   ├── contract-summary.md
│   │   │   ├── sla-terms.md
│   │   │   └── review-2026-q2.md
│   │   └── notion/
│   │       ├── contract-summary.md
│   │       ├── sla-terms.md
│   │       └── review-2026-q1.md
│   └── offboarded/
│       └── _archive-note.md                       # Fournisseurs résiliés — conserver pour la piste d'audit, ne pas supprimer
├── okrs/
│   ├── _okr-format.md                             # Standards de rédaction OKR : formulation des objectifs, structure des résultats clés, notation de confiance
│   ├── 2026/
│   │   ├── q1/
│   │   │   ├── company-okrs.md                    # OKR d'entreprise pour le T1 2026 — objectifs, résultats clés, DRI
│   │   │   ├── ops-team-okrs.md                   # OKR de l'équipe ops alignés sur les objectifs d'entreprise
│   │   │   └── retrospective.md                   # Rétrospective OKR T1 — scores finaux, ce qui a fonctionné, ce qui n'a pas fonctionné
│   │   ├── q2/
│   │   │   ├── company-okrs.md
│   │   │   ├── ops-team-okrs.md
│   │   │   └── mid-quarter-check.md               # Revue de confiance OKR en milieu de trimestre — risques et ajustements
│   │   ├── q3/
│   │   │   ├── company-okrs.md                    # OKR T3 rédigés pour la planification
│   │   │   └── ops-team-okrs.md
│   │   └── q4/
│   │       └── planning-notes.md                  # Notes de planification anticipée T4 — thèmes, risques de report
├── projects/
│   ├── _project-brief-template.md                 # Modèle de brief projet standard : problème, objectif, périmètre, équipe, jalons, risques
│   ├── active/
│   │   ├── vendor-consolidation-2026/
│   │   │   ├── project-brief.md                   # Périmètre : réduire les dépenses SaaS en consolidant 3 outils redondants
│   │   │   ├── status-update-2026-05-30.md        # Dernier point : jalons, blocages, décisions requises
│   │   │   └── stakeholder-map.md                 # Qui possède quoi, qui doit approuver, qui est informé
│   │   └── ops-handbook-launch/
│   │       ├── project-brief.md                   # Périmètre : publier le manuel ops de l'entreprise dans Notion
│   │       ├── content-tracker.md                 # Responsabilité et statut d'avancement section par section
│   │       └── status-update-2026-06-01.md
│   └── completed/
│       └── _archive-note.md                       # Projets terminés — conserver les briefs pour référence rétrospective
├── reports/
│   ├── weekly/
│   │   ├── ops-report-2026-05-26.md               # Rapport ops hebdomadaire — succès, blocages, métriques, signaux inter-équipes
│   │   ├── ops-report-2026-06-02.md               # Rapport ops de la semaine en cours
│   │   └── _report-template.md                    # Modèle de rapport ops hebdomadaire avec sections standard
│   └── monthly/
│       ├── metrics-dashboard-2026-05.md            # Métriques mensuelles : respect des SLA, temps de cycle des processus, scores fournisseurs
│       ├── metrics-dashboard-2026-04.md
│       └── _dashboard-template.md                 # Modèle de tableau de bord des métriques mensuelles
└── automation/
    ├── _automation-index.md                        # Index de toutes les automatisations actives : outil, déclencheur, action, responsable, dernier test
    ├── zapier/
    │   ├── new-vendor-intake.md                    # Zap : Typeform → registre fournisseurs Airtable → notification Slack #ops-vendors
    │   ├── sop-update-notify.md                    # Zap : modification d'une page Notion dans /SOPs → annonce sur Slack #ops-team
    │   ├── invoice-approval-routing.md             # Zap : email boîte finance → tâche Linear → DM Slack à l'approbateur
    │   └── okr-checkin-reminder.md                 # Zap : rappel Slack hebdomadaire → responsables OKR pour mise à jour des indices de confiance
    └── make/
        ├── weekly-report-aggregator.md             # Scénario Make : extraction données Linear + Airtable → rédaction du rapport ops hebdomadaire
        └── vendor-sla-monitor.md                  # Scénario Make : ping des pages statut fournisseurs → journalisation dans Airtable → alerte en cas de dépassement
```

## Fichiers clés expliqués

| Chemin | Objectif |
|---|---|
| `.claude/commands/sop-draft.md` | Commande slash qui prend un nom de processus et son contexte, et génère une procédure complète avec objectif, périmètre, table RACI, procédure étape par étape, gestion des exceptions et cadence de révision |
| `.claude/commands/vendor-review.md` | Commande slash qui prend un nom de fournisseur et une période de revue, et génère une évaluation de performance structurée par rapport aux termes SLA avec recommandation de renouvellement |
| `.claude/commands/okr-update.md` | Commande slash qui prend l'état actuel des OKR et les notes de progression, et génère une mise à jour de statut OKR formatée avec indices de confiance et signaux de risque par résultat clé |
| `.claude/commands/weekly-ops.md` | Commande slash pour générer le rapport ops hebdomadaire — agrège succès, blocages, dépendances inter-équipes et actions ouvertes dans un document partageable |
| `.claude/commands/meeting-actions.md` | Commande slash qui prend des notes de réunion brutes et génère un tableau d'actions clair avec responsables, descriptions et dates d'échéance |
| `sops/_template/sop-template.md` | Structure de procédure canonique que suit chaque document de processus — garantit la cohérence entre les départements et rend les procédures interprétables par les commandes Claude |
| `vendors/vendor-registry.csv` | Source unique de vérité pour tous les fournisseurs actifs — nom, catégorie, date de fin de contrat, niveau de dépenses, DRI — alimente le calendrier de revue trimestrielle |
| `okrs/2026/q2/ops-team-okrs.md` | OKR de l'équipe ops pour le trimestre en cours — document vivant mis à jour chaque semaine avec les indices de confiance au fil du trimestre |
| `automation/_automation-index.md` | Index principal de chaque automatisation Zapier et Make active — évite les doublons, documente les responsables et signale les automatisations à re-tester |
| `reports/weekly/_report-template.md` | Modèle standard de rapport ops hebdomadaire — garantit que chaque rapport couvre les mêmes sections pour que les parties prenantes sachent où trouver l'information |

## Scaffolding rapide

```bash
# Créer la racine de l'espace de travail
mkdir -p ops-workspace

# Créer la structure .claude avec les stubs de commandes
mkdir -p ops-workspace/.claude/commands

# Créer les répertoires de procédures par département
mkdir -p ops-workspace/sops/_template
mkdir -p ops-workspace/sops/hr
mkdir -p ops-workspace/sops/finance
mkdir -p ops-workspace/sops/it
mkdir -p ops-workspace/sops/ops
mkdir -p ops-workspace/sops/compliance

# Créer le répertoire de documentation des processus
mkdir -p ops-workspace/processes

# Créer la structure du répertoire fournisseurs
mkdir -p ops-workspace/vendors/active/zapier
mkdir -p ops-workspace/vendors/active/airtable
mkdir -p ops-workspace/vendors/active/monday
mkdir -p ops-workspace/vendors/active/notion
mkdir -p ops-workspace/vendors/offboarded

# Créer la structure du répertoire OKR pour 2026
mkdir -p ops-workspace/okrs/2026/q1
mkdir -p ops-workspace/okrs/2026/q2
mkdir -p ops-workspace/okrs/2026/q3
mkdir -p ops-workspace/okrs/2026/q4

# Créer les répertoires de suivi de projets
mkdir -p ops-workspace/projects/active/vendor-consolidation-2026
mkdir -p ops-workspace/projects/active/ops-handbook-launch
mkdir -p ops-workspace/projects/completed

# Créer les répertoires de rapports
mkdir -p ops-workspace/reports/weekly
mkdir -p ops-workspace/reports/monthly

# Créer les répertoires de documentation des automatisations
mkdir -p ops-workspace/automation/zapier
mkdir -p ops-workspace/automation/make

# Initialiser les fichiers d'index et de base requis
touch ops-workspace/vendors/vendor-registry.csv
touch ops-workspace/automation/_automation-index.md
touch ops-workspace/processes/_improvement-log.md

# Installer les skills pertinents
npx claudient add skill productivity/process-mapper
npx claudient add skill productivity/sop-writer
npx claudient add skill productivity/vendor-evaluator
npx claudient add skill productivity/scrum-master
npx claudient add skill small-business/weekly-pulse
npx claudient add skill small-business/meeting-to-action

# Copier les stubs de commandes dans .claude/commands/
npx claudient add skill productivity/sop-writer --output ops-workspace/.claude/commands/sop-draft.md
npx claudient add skill productivity/process-mapper --output ops-workspace/.claude/commands/process-map.md
npx claudient add skill productivity/vendor-evaluator --output ops-workspace/.claude/commands/vendor-review.md
npx claudient add skill small-business/weekly-pulse --output ops-workspace/.claude/commands/weekly-ops.md
npx claudient add skill small-business/meeting-to-action --output ops-workspace/.claude/commands/meeting-actions.md
```

## Modèle CLAUDE.md

```markdown
# Espace de travail du responsable ops — Instructions Claude Code

## Présentation

Ce répertoire de travail appartient à un responsable des opérations. Il contient toutes les procédures,
cartes de processus, données fournisseurs, OKR, briefs de projets transverses, rapports hebdomadaires
et documentation d'automatisation. Claude Code est utilisé pour rédiger des procédures, conduire des
évaluations fournisseurs, mettre à jour les narratifs OKR, générer les rapports ops hebdomadaires et
extraire les actions des notes de réunion.

## Stack

- Notion — Bibliothèque de procédures et wiki interne ; les procédures ici reflètent les pages Notion dans sops/
- Linear — Suivi des projets et initiatives transverses ; statuts synchronisés manuellement vers projects/
- Slack — Canal ops (#ops-team), canaux fournisseurs (#ops-vendors), fils d'incidents
- Google Workspace — Drive pour les documents partagés, Sheets pour les métriques, Docs pour les rapports formels
- Zapier — Automatisations documentées dans automation/zapier/ — ne pas modifier sans mettre à jour l'index
- Make — Scénarios documentés dans automation/make/ — automatisations complexes multi-étapes
- Airtable — Registre fournisseurs (source de vérité), tableau de bord OKR, workflows d'approbation
- Monday.com — Roadmap de projets inter-équipes et vues de capacité

## Tâches courantes et commandes exactes

### Rédiger une nouvelle procédure
```
/sop-draft

Process name: [ex. : "Vendor Offboarding"]
Department: [HR / Finance / IT / Ops / Compliance]
Trigger: [ce qui déclenche ce processus]
Key roles involved: [liste des rôles — pas des noms]
Known steps: [liste à puces de ce que vous savez — l'approximatif convient]
Pain points with current process: [optionnel]
```

### Générer une carte de processus
```
/process-map

Process: [nom]
Start event: [ce qui déclenche le processus]
End event: [à quoi ressemble la fin]
Systems involved: [Notion, Airtable, Linear, etc.]
Key decision points: [où le processus se ramifie-t-il ?]
Roles / swimlanes: [qui est responsable de chaque couloir]
```

### Conduire une évaluation fournisseur
```
/vendor-review

Vendor: [nom]
Review period: [Q2 2026]
Contract terms: [coller depuis vendors/active/<vendor>/contract-summary.md]
SLA commitments: [coller depuis vendors/active/<vendor>/sla-terms.md]
Incidents this period: [liste]
Usage or adoption notes: [utilisation actuelle de l'équipe par rapport à la capacité licenciée]
Renewal date: [date]
```

### Mettre à jour le statut OKR
```
/okr-update

Quarter: Q[X] [ANNÉE]
OKRs: [coller les okrs/2026/q<X>/ops-team-okrs.md actuels]
Progress since last update: [liste à puces de ce qui s'est passé]
Risks: [ce qui pourrait empêcher d'atteindre les résultats clés]
Confidence change: [des KR dont la confiance évolue à la hausse ou à la baisse ?]
```

### Générer le rapport ops hebdomadaire
```
/weekly-ops

Week ending: [YYYY-MM-DD]
Wins this week: [liste à puces]
Blockers open: [liste à puces avec responsables]
Cross-team flags: [ce que les autres équipes doivent savoir ou faire]
Metrics: [respect des SLA, incidents ouverts, problèmes fournisseurs, changements de confiance OKR]
Next week priorities: [top 3]
```

### Extraire les actions d'une réunion
```
/meeting-actions

Meeting: [nom et date]
Attendees: [liste]
Notes: [coller les notes brutes verbatim]
```

### Rédiger une procédure d'incident
```
/incident-sop

Incident type: [ex. : "Dépassement SLA fournisseur — panne d'automatisation Zapier"]
Detection method: [comment cela est typiquement détecté]
Immediate response: [premières 15 minutes]
Escalation path: [qui est notifié, dans quel ordre]
Resolution steps: [ce qui résout le problème]
Postmortem: [quelle documentation est requise après]
```

## Conventions à respecter

- Toute procédure dans sops/ doit utiliser la structure définie dans sops/_template/sop-template.md — sans exception
- Les noms de fichiers de procédures sont en kebab-case et décrivent le processus, pas le département (ex. : expense-approval.md et non finance-sops.md)
- Le registre fournisseurs (vendors/vendor-registry.csv) est mis à jour dans les 24h suivant tout changement fournisseur — ajout, résiliation ou renouvellement de contrat
- Toutes les automatisations actives sont listées dans automation/_automation-index.md — si vous créez ou modifiez un Zap ou un scénario Make, mettez à jour l'index
- Les documents OKR utilisent des indices de confiance de 0 à 100 pour chaque résultat clé — à mettre à jour chaque semaine durant les trimestres actifs
- Les rapports ops hebdomadaires sont enregistrés sous reports/weekly/ops-report-YYYY-MM-DD.md en utilisant la date du lundi de la semaine concernée
- Les modifications d'amélioration des processus sont consignées dans processes/_improvement-log.md — date, processus concerné, modification apportée, résultat
- Les mises à jour de statut de projet sont ajoutées comme nouveaux fichiers (status-update-YYYY-MM-DD.md) — ne jamais écraser la mise à jour précédente
- Les actions de réunion extraites via /meeting-actions sont enregistrées dans le dossier de projet concerné ou sous forme de note avant classement
```

## Serveurs MCP

```json
{
  "mcpServers": {
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "OPENAPI_MCP_HEADERS": "{\"Authorization\": \"Bearer ntn_your_notion_integration_token\", \"Notion-Version\": \"2022-06-28\"}"
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
        "/Users/your-username/ops-workspace"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"/sops/\"; then echo \"[hook] SOP written — verify it follows sops/_template/sop-template.md structure and update the relevant Notion page to match\"; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"/vendors/active/\" && echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"contract-summary.md\"; then echo \"[hook] Contract summary updated — check vendors/vendor-registry.csv has a matching entry with the correct renewal date\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'TODAY=$(date +%A); if [ \"$TODAY\" = \"Monday\" ]; then echo \"[reminder] Monday — start this week ops report at reports/weekly/ops-report-$(date +%Y-%m-%d).md using /weekly-ops\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Skills à installer

```bash
# Skills opérations principales
npx claudient add skill productivity/process-mapper
npx claudient add skill productivity/sop-writer
npx claudient add skill productivity/vendor-evaluator
npx claudient add skill productivity/scrum-master

# Skills reporting et réunions
npx claudient add skill small-business/weekly-pulse
npx claudient add skill small-business/meeting-to-action

# Skills de productivité complémentaires
npx claudient add skill productivity/stakeholder-comms
npx claudient add skill productivity/exec-briefing
npx claudient add skill productivity/engineering-strategy
```

## Voir aussi

- [Guide du responsable des opérations](../guides/for-operations-manager.md)
- [Workflow de revue ops hebdomadaire](../workflows/weekly-ops-review.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
