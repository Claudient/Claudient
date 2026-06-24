# Espace de travail Customer Success Manager — Structure de projet

> Un espace de travail Claude Code pour les CSM gérant un portefeuille de comptes : onboarding, suivi de la santé des comptes, présentation des QBR, identification des opportunités d'expansion, réponse au risque de churn et suivi des renouvellements — le tout piloté par des commandes slash et un contexte au niveau du compte.

## Stack

- **Gainsight** (plateforme CS) ou **ChurnZero** — scores de santé, plans de succès, playbooks automatisés
- **Salesforce** ou **HubSpot** — CRM, pipeline d'opportunités et de renouvellements, hiérarchie des comptes
- **Zendesk** ou **Intercom** — volume de tickets de support et signaux de sentiment
- **Zoom** — appels clients ; enregistrements et transcriptions réintégrés dans les notes de compte
- **Slack** — coordination interne de l'équipe CS et canaux Slack Connect clients
- **Notion** — playbooks CS, modèles de plan d'action mutuel, runbooks d'onboarding

## Arborescence du répertoire

```
cs-workspace/
├── .claude/
│   ├── CLAUDE.md                          # instructions de l'espace de travail pour Claude Code
│   ├── settings.json                      # serveurs MCP, hooks, permissions
│   └── commands/
│       ├── onboarding-plan.md             # /onboarding-plan <customer-name> — plan 30/60/90 jours
│       ├── qbr-prep.md                    # /qbr-prep — construit le plan du QBR et les points clés
│       ├── health-check.md                # /health-check — lit les données de santé, identifie les comptes à risque
│       ├── expansion-brief.md             # /expansion-brief — identifie les signaux d'upsell par compte
│       ├── churn-risk.md                  # /churn-risk — analyse des signaux de churn avec playbook de réponse
│       ├── renewal-prep.md                # /renewal-prep — document de préparation au renouvellement avec contexte commercial
│       └── nps-follow-up.md              # /nps-follow-up — rédige les emails de suivi par tranche de score NPS
├── customers/
│   ├── _template/                         # copier ce dossier lors de l'onboarding d'un nouveau compte
│   │   ├── health-data.md                 # journal des scores de santé : signaux, scores, niveau (Green/Yellow/Red)
│   │   ├── meeting-notes/
│   │   │   └── YYYY-MM-DD-kickoff.md      # un fichier par réunion, nommé par date et type
│   │   ├── success-plan.md                # plan de succès mutuel : objectifs, jalons, responsables, dates
│   │   └── renewal-tracker.md             # date de renouvellement, ARR, historique d'expansion, état du renouvellement
│   ├── acme-corp/
│   │   ├── health-data.md                 # niveau de santé actuel : Yellow ; dernière mise à jour : 2026-05-28
│   │   ├── meeting-notes/
│   │   │   ├── 2026-01-15-kickoff.md
│   │   │   ├── 2026-03-10-qbr-q1.md
│   │   │   └── 2026-05-20-expansion-call.md
│   │   ├── success-plan.md                # objectifs convenus : 80 % d'activation des sièges d'ici Q2, 3 intégrations en production
│   │   └── renewal-tracker.md             # renouvellement le 2026-09-01, 48 K$ ARR, 1 opportunité d'expansion ouverte
│   ├── brightpath-inc/
│   │   ├── health-data.md                 # niveau de santé actuel : Red ; risque de churn : élevé
│   │   ├── meeting-notes/
│   │   │   ├── 2026-02-03-kickoff.md
│   │   │   └── 2026-04-18-save-call.md
│   │   ├── success-plan.md
│   │   └── renewal-tracker.md             # renouvellement le 2026-07-15, 12 K$ ARR, à risque
│   └── novex-solutions/
│       ├── health-data.md                 # niveau de santé actuel : Green ; candidat à l'expansion
│       ├── meeting-notes/
│       │   ├── 2026-01-22-kickoff.md
│       │   ├── 2026-04-05-qbr-q1.md
│       │   └── 2026-05-30-expansion-brief.md
│       ├── success-plan.md
│       └── renewal-tracker.md             # renouvellement le 2026-12-01, 72 K$ ARR, expansion en cours
├── playbooks/
│   ├── onboarding.md                      # runbook d'onboarding complet 30/60/90 jours avec déclencheurs d'escalade
│   ├── expansion.md                       # démarche d'upsell : signaux, timing, argumentaires, gestion des objections
│   ├── churn-save.md                      # playbook de rétention par niveau de signal de churn et délai avant renouvellement
│   └── qbr-delivery.md                   # guide d'animation des QBR : ordre du jour, règles, cadence de suivi
├── templates/
│   ├── success-plan-template.md           # plan de succès mutuel : objectifs, KPI, jalons, responsables
│   ├── mutual-action-plan.md              # MAP pour l'onboarding : tâches client et CSM côte à côte
│   ├── ebr-deck-outline.md               # structure du deck Executive Business Review (6 slides)
│   └── renewal-proposal.md               # proposition de renouvellement : résumé de la valeur, tarification, prochaines étapes
└── metrics/
    ├── book-health-dashboard.md           # tous les comptes : nom, ARR, niveau, date de renouvellement, dernier contact
    └── renewal-pipeline.md               # renouvellements dans les 90/60/30 prochains jours avec score de préparation
```

## Fichiers clés expliqués

| Chemin | Objectif |
|---|---|
| `.claude/commands/onboarding-plan.md` | Commande slash qui prend `$ARGUMENTS` comme nom de client, lit le dossier de ce compte et génère un plan d'onboarding 30/60/90 jours personnalisé avec des jalons spécifiques |
| `.claude/commands/health-check.md` | Lit tous les fichiers `customers/*/health-data.md` et présente les comptes par niveau — produit une liste d'actions prioritaires avec les prochaines étapes suggérées par compte à risque |
| `.claude/commands/churn-risk.md` | Croise les données de santé, les jours depuis le dernier point de contact, la date de renouvellement et les signaux de tickets de support pour produire un brief sur le risque de churn avec playbook de réponse |
| `.claude/commands/renewal-prep.md` | Lit le `renewal-tracker.md`, le `success-plan.md` et les notes de réunion du compte cible pour construire un document de préparation au renouvellement avec contexte commercial et risques ouverts |
| `customers/_template/` | Structure de dossier canonique à copier lors de l'onboarding de tout nouveau compte — garantit la cohérence sur l'ensemble du portefeuille |
| `metrics/book-health-dashboard.md` | Vue unifiée de tous les comptes avec ARR, niveau de santé, date de renouvellement et dernier point de contact CSM — source de vérité pour la revue hebdomadaire de l'équipe CS |
| `playbooks/churn-save.md` | Playbook de rétention segmenté par type de signal (baisse d'usage, changement de sponsor exécutif, facture en retard) et délai avant renouvellement, avec argumentaires spécifiques et chemins d'escalade |
| `templates/ebr-deck-outline.md` | Structure du deck Executive Business Review : récapitulatif métier, valeur délivrée, métriques vs. objectifs, feuille de route, points ouverts, prochaines étapes — prête à compléter par compte |

## Scaffold rapide

```bash
# Créer la racine de l'espace de travail
mkdir -p cs-workspace/.claude/commands

# Créer le modèle de compte client
mkdir -p cs-workspace/customers/_template/meeting-notes

# Créer les répertoires playbooks, templates, metrics
mkdir -p cs-workspace/playbooks
mkdir -p cs-workspace/templates
mkdir -p cs-workspace/metrics

# Créer les fichiers de commandes slash
touch cs-workspace/.claude/commands/onboarding-plan.md
touch cs-workspace/.claude/commands/qbr-prep.md
touch cs-workspace/.claude/commands/health-check.md
touch cs-workspace/.claude/commands/expansion-brief.md
touch cs-workspace/.claude/commands/churn-risk.md
touch cs-workspace/.claude/commands/renewal-prep.md
touch cs-workspace/.claude/commands/nps-follow-up.md

# Créer les fichiers du modèle client
touch cs-workspace/customers/_template/health-data.md
touch cs-workspace/customers/_template/success-plan.md
touch cs-workspace/customers/_template/renewal-tracker.md

# Créer les fichiers de métriques
touch cs-workspace/metrics/book-health-dashboard.md
touch cs-workspace/metrics/renewal-pipeline.md

# Créer les fichiers de playbook
touch cs-workspace/playbooks/onboarding.md
touch cs-workspace/playbooks/expansion.md
touch cs-workspace/playbooks/churn-save.md
touch cs-workspace/playbooks/qbr-delivery.md

# Créer les fichiers de modèles
touch cs-workspace/templates/success-plan-template.md
touch cs-workspace/templates/mutual-action-plan.md
touch cs-workspace/templates/ebr-deck-outline.md
touch cs-workspace/templates/renewal-proposal.md

# Installer les compétences CS
npx uitkit add skill gtm/customer-success
npx uitkit add skill gtm/mutual-success-plan
npx uitkit add skill gtm/qbr-builder
npx uitkit add skill gtm/health-score-analyzer
npx uitkit add skill gtm/expansion-playbook
npx uitkit add skill gtm/churn-prevention

# Créer un compte exemple à partir du modèle
cp -r cs-workspace/customers/_template cs-workspace/customers/acme-corp
```

## Modèle CLAUDE.md

```markdown
# CS Workspace — Instructions Claude Code

## Ce qu'est cet espace

Il s'agit d'un espace de travail pour Customer Success Manager. Il contient les données de compte,
les signaux de santé, les playbooks et les modèles pour gérer un portefeuille de comptes. Claude Code
opère ici en tant qu'analyste et rédacteur CS — en lisant le contexte des comptes pour générer des
livrables personnalisés.

Toutes les données de compte sont locales et privées. Ne jamais inclure de données de compte
spécifiques dans les sorties envoyées hors de cet espace de travail.

## Stack

- Plateforme CS : Gainsight (ou ChurnZero) — scores de santé, plans de succès, automatisations
- CRM : HubSpot (ou Salesforce) — pipeline de renouvellements, hiérarchie des comptes, ARR
- Support : Zendesk — volume de tickets et signaux de sentiment intégrés dans les fichiers health-data.md
- Appels : Zoom — transcriptions de réunions stockées dans customers/<account>/meeting-notes/
- Collaboration : Slack, Notion

## Tâches courantes et commandes exactes

Onboarder un nouveau client :
  /onboarding-plan <customer-name>
  → Lit customers/<customer-name>/ et génère un plan 30/60/90 jours

Effectuer un bilan de santé du portefeuille :
  /health-check
  → Lit tous les customers/*/health-data.md et produit une liste d'actions prioritaires par niveau

Préparer un QBR :
  /qbr-prep
  → Demande le nom du client, lit son dossier, construit l'ordre du jour QBR et les points clés

Identifier les opportunités d'expansion :
  /expansion-brief
  → Lit les données de santé et les notes de réunion ; identifie les signaux d'expansion par compte

Évaluer le risque de churn :
  /churn-risk
  → Croise le niveau de santé, la date de renouvellement, le dernier point de contact et les signaux de support

Préparer un renouvellement :
  /renewal-prep
  → Lit renewal-tracker.md et success-plan.md ; produit un document de préparation au renouvellement

Faire le suivi des réponses NPS :
  /nps-follow-up
  → Demande le score NPS et le verbatim ; rédige l'email de suivi selon la tranche de score

## Conventions de l'espace de travail

- Un dossier par compte sous customers/ — toujours créé à partir de _template/
- Les fichiers de données de santé utilisent trois niveaux : Green / Yellow / Red — à mettre à jour après chaque appel
- Les notes de réunion sont nommées YYYY-MM-DD-<type>.md (kickoff, qbr, expansion-call, save-call)
- Le suivi des renouvellements est mis à jour après chaque conversation commerciale
- Le book-health-dashboard.md dans metrics/ est la source de vérité pour la revue hebdomadaire de l'équipe

## Niveaux de santé des comptes

Green (score 7-10) : point de contact trimestriel, rechercher des signaux d'expansion
Yellow (score 4-6) : suivi mensuel, identifier et lever les blocages
Red (score 1-3) : engagement hebdomadaire, escalader au responsable CS si pas de réponse sous 5 jours

## À ne pas faire

- Ne pas générer de contenu contredisant les critères de succès client documentés
- Ne pas proposer une expansion avant qu'un client n'ait atteint le niveau de santé Green
- Ne pas utiliser des modèles QBR génériques — toujours lire d'abord le dossier du compte
- Ne pas commiter les données de customers/ dans un dépôt git distant
```

## Serveurs MCP

```json
{
  "mcpServers": {
    "hubspot": {
      "command": "npx",
      "args": ["-y", "@hubspot/mcp-server"],
      "env": {
        "HUBSPOT_ACCESS_TOKEN": "${HUBSPOT_ACCESS_TOKEN}"
      }
    },
    "salesforce": {
      "command": "npx",
      "args": ["-y", "@salesforce/mcp-server"],
      "env": {
        "SF_USERNAME": "${SF_USERNAME}",
        "SF_PASSWORD": "${SF_PASSWORD}",
        "SF_SECURITY_TOKEN": "${SF_SECURITY_TOKEN}",
        "SF_LOGIN_URL": "https://login.salesforce.com"
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
        "/Users/$USER/cs-workspace/customers",
        "/Users/$USER/cs-workspace/metrics"
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
            "command": "grep -q 'health tier:' \"$CLAUDE_TOOL_RESULT_FILE\" && echo '[health-check] Health tier updated — consider refreshing book-health-dashboard.md' || true"
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
            "command": "if echo \"$CLAUDE_TOOL_INPUT\" | grep -q 'customers/'; then echo '[cs-workspace] Writing to account folder — confirm account name matches directory'; fi"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "echo '[cs-workspace] Session ended. Reminder: update book-health-dashboard.md if any health tiers changed this session.'"
          }
        ]
      }
    ]
  }
}
```

## Compétences à installer

```bash
npx uitkit add skill gtm/customer-success
npx uitkit add skill gtm/mutual-success-plan
npx uitkit add skill gtm/qbr-builder
npx uitkit add skill gtm/health-score-analyzer
npx uitkit add skill gtm/expansion-playbook
npx uitkit add skill gtm/churn-prevention
```

## Liens connexes

- [Guide Customer Success](../guides/for-customer-success.md)
- [Workflow de livraison QBR](../workflows/qbr-delivery.md)
