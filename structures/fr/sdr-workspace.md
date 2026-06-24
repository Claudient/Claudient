# Espace de travail SDR / BDR — Structure de projet

> Système d'exploitation quotidien pour les Sales Development Representatives : gestion de territoire, recherche de comptes, prospection personnalisée, tri des messages entrants, préparation des appels et reporting pipeline — entièrement piloté par les commandes slash de Claude Code, connectées à HubSpot, Apollo.io, Gong et Slack.

## Stack

- **HubSpot** — CRM, fiches contacts/entreprises, enrôlement dans les séquences, création d'opportunités
- **Apollo.io** — Base de données de prospection, enrichissement des emails, signaux d'intention
- **Outreach / Salesloft** — Exécution des séquences, gestion des cadences, suivi des étapes
- **Gong** — Enregistrement des appels, accès aux transcriptions, analyse du temps de parole
- **Clay** — Workflows d'enrichissement, agrégation de données en cascade, constitution de listes
- **Slack** — Standup d'équipe, alertes sur les deals, notifications de transfert vers les AE
- **Claude Code** — Commandes slash pour chaque workflow SDR répétable

## Arborescence du projet

```
sdr-workspace/
├── .claude/
│   ├── CLAUDE.md                        # Instructions de l'espace de travail pour Claude
│   ├── settings.json                    # Serveurs MCP, hooks, permissions
│   └── commands/
│       ├── morning-brief.md             # Récupère les alertes territoire + priorise les comptes
│       ├── research.md                  # Brief compte approfondi (prend l'argument $COMPANY)
│       ├── draft-email.md               # Rédacteur d'emails cold/relance personnalisés
│       ├── triage-inbox.md              # Classe les réponses + rédige les réponses + enregistre dans le CRM
│       ├── call-prep.md                 # Guide d'appel + questions de découverte + scripts d'objections
│       ├── log-call.md                  # Note post-appel structurée → activité HubSpot
│       └── weekly-review.md             # Métriques pipeline + résumé d'activité + prochains axes
├── icp/
│   ├── icp-definition.md                # Critères de qualification firmographiques + technographiques
│   ├── persona-vp-sales.md              # Persona acheteur VP Sales / CRO
│   ├── persona-head-of-revops.md        # Persona acheteur RevOps
│   ├── persona-sales-enablement.md      # Persona acheteur Enablement
│   ├── negative-icp.md                  # Disqualificateurs explicites (taille, secteur, stade)
│   └── scoring-rubric.md                # Pondérations du score de lead 0-100 par type de signal
├── sequences/
│   ├── cold/
│   │   ├── saas-outbound-7step.md       # Séquence cold en 7 touches pour cibles SaaS
│   │   ├── enterprise-12step.md         # Séquence entreprise en 12 touches (60 jours)
│   │   └── smb-3step.md                 # Séquence rapide en 3 touches pour comptes PME
│   ├── inbound/
│   │   ├── demo-request-followup.md     # Séquence de réponse aux demandes de démo entrantes
│   │   └── content-download-nurture.md  # Nurture pour les téléchargements de contenu premium
│   └── reactivation/
│       ├── cold-lead-reactivation.md    # Opportunités dormantes (90+ jours sans activité)
│       └── former-customer-winback.md   # Réapproche des clients churned
├── territory/
│   ├── account-list.csv                 # Territoire complet — tous les comptes assignés
│   ├── tier-1-priority.csv              # 25 comptes prioritaires à travailler ce trimestre
│   ├── whitespace-analysis.md           # Segments non couverts + opportunités d'expansion
│   ├── territory-map.md                 # Découpage géographique / sectoriel
│   └── account-notes/
│       ├── acme-corp.md                 # Notes de recherche par compte + historique
│       ├── initech-llc.md
│       └── globodyne-inc.md
├── intel/
│   ├── battlecards/
│   │   ├── vs-competitor-a.md           # Comparaison tête-à-tête + argumentaires
│   │   ├── vs-competitor-b.md
│   │   └── vs-competitor-c.md
│   ├── value-props/
│   │   ├── roi-calculator.md            # Arguments ROI par cas d'usage
│   │   ├── feature-differentiators.md   # Top 5 différenciateurs avec preuves à l'appui
│   │   └── customer-stories.md          # Clients de référence par secteur
│   └── objection-library.md             # Index objections → réponses
├── logs/
│   └── weekly/
│       ├── 2026-W22.md                  # Revue hebdomadaire : activités, pipeline, apprentissages
│       ├── 2026-W21.md
│       └── 2026-W20.md
└── README.md                            # Démarrage rapide pour cet espace de travail
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `.claude/commands/morning-brief.md` | Récupère les tâches ouvertes depuis HubSpot, remonte les comptes avec des signaux d'intention récents depuis Apollo.io, et génère une liste d'appels priorisée pour la journée |
| `.claude/commands/research.md` | Prend un nom d'entreprise, extrait les données firmographiques, les actualités récentes et le stack technologique depuis Apollo.io et Clay, évalue par rapport au référentiel ICP, et produit un brief compte structuré |
| `.claude/commands/triage-inbox.md` | Lit la file de réponses email/Outreach, classe chaque message en Intéressé/Pas maintenant/Objection/Rebond/Réponse automatique, rédige les réponses et signale les réponses chaudes pour action immédiate |
| `.claude/commands/call-prep.md` | Prend un contact + une entreprise, génère un document de préparation en 3 parties : banque de questions de découverte, scripts d'objections adaptés au rôle, et script de closing souple |
| `.claude/commands/log-call.md` | Prend des notes d'appel brutes ou une transcription Gong, extrait les prochaines étapes, met à jour le journal d'activité HubSpot et crée une tâche de suivi avec échéance |
| `icp/scoring-rubric.md` | Définit les pondérations de score 0-100 utilisées par `/sdr-lead-scorer` — à mettre à jour lors de tout changement d'ICP pour maintenir la calibration du scoring |
| `intel/objection-library.md` | Index principal des objections utilisé par `/sdr-objection-handler` — ajouter les nouvelles objections après les appels pour le maintenir à jour |
| `logs/weekly/` | Journaux de revue hebdomadaire persistants utilisés par `/weekly-review` pour suivre les métriques dans le temps et identifier les opportunités de coaching |

## Initialisation rapide

```bash
# Créer le répertoire de l'espace de travail et tous les sous-répertoires
mkdir -p sdr-workspace/.claude/commands
mkdir -p sdr-workspace/icp
mkdir -p sdr-workspace/sequences/cold
mkdir -p sdr-workspace/sequences/inbound
mkdir -p sdr-workspace/sequences/reactivation
mkdir -p sdr-workspace/territory/account-notes
mkdir -p sdr-workspace/intel/battlecards
mkdir -p sdr-workspace/intel/value-props
mkdir -p sdr-workspace/logs/weekly

# Créer les fichiers de commandes vides
touch sdr-workspace/.claude/commands/morning-brief.md
touch sdr-workspace/.claude/commands/research.md
touch sdr-workspace/.claude/commands/draft-email.md
touch sdr-workspace/.claude/commands/triage-inbox.md
touch sdr-workspace/.claude/commands/call-prep.md
touch sdr-workspace/.claude/commands/log-call.md
touch sdr-workspace/.claude/commands/weekly-review.md

# Créer les fichiers ICP vides
touch sdr-workspace/icp/icp-definition.md
touch sdr-workspace/icp/negative-icp.md
touch sdr-workspace/icp/scoring-rubric.md

# Créer les fichiers intel vides
touch sdr-workspace/intel/objection-library.md
touch sdr-workspace/intel/value-props/roi-calculator.md
touch sdr-workspace/intel/value-props/feature-differentiators.md
touch sdr-workspace/intel/value-props/customer-stories.md

# Créer le fichier de journal de la semaine en cours
echo "# Weekly Review — $(date +%Y-W%V)" > sdr-workspace/logs/weekly/$(date +%Y-W%V).md

# Installer toutes les compétences SDR
npx uitkit add skill gtm/sdr-research-brief
npx uitkit add skill gtm/sdr-reply-classifier
npx uitkit add skill gtm/sdr-call-prep
npx uitkit add skill gtm/sdr-call-analysis
npx uitkit add skill gtm/sdr-objection-handler
npx uitkit add skill gtm/sdr-territory-mapper
npx uitkit add skill gtm/sdr-lead-scorer
npx uitkit add skill gtm/email-automation
npx uitkit add skill gtm/lead-enrichment
npx uitkit add skill gtm/crm-hygiene
npx uitkit add skill gtm/hubspot

echo "SDR workspace scaffold complete."
```

## Modèle CLAUDE.md

```markdown
# Espace de travail SDR — Instructions Claude

## Contexte

Cet espace est un environnement de travail quotidien pour SDR/BDR. Chaque répertoire et chaque commande est
optimisé pour un seul résultat : des réunions réservées. Claude Code gère la recherche, la rédaction,
le tri, la préparation des appels et la journalisation — vous gérez les relations et les décisions à valeur ajoutée.

Ne pas ajouter de code applicatif ici. Il s'agit d'un espace de travail dédié au contenu et aux workflows.

## Stack

- HubSpot : CRM de référence — contacts, entreprises, activités, séquences, deals
- Apollo.io : base de données de prospection, enrichissement, signaux d'intention
- Outreach : exécution des cadences de séquences (ou Salesloft — vérifier lequel est actif)
- Gong : transcriptions d'appels, données de temps de parole, détection de moments clés
- Clay : workflows d'enrichissement en cascade, constitution de listes
- Slack : communication d'équipe, alertes deals (canaux #sdr-wins, #ae-handoffs)

## Territoire

- La définition de l'ICP se trouve dans icp/icp-definition.md — à lire avant d'évaluer tout compte
- Le référentiel de scoring se trouve dans icp/scoring-rubric.md — utiliser ces pondérations lors de l'exécution de /sdr-lead-scorer
- Les comptes Tier-1 se trouvent dans territory/tier-1-priority.csv — à traiter en priorité, chaque jour
- Les notes par compte dans territory/account-notes/ — un fichier par compte, à mettre à jour après chaque contact

## Tâches courantes — commandes exactes

### Démarrer la journée
/morning-brief
→ Génère la liste d'appels priorisée, signale les réponses entrantes chaudes, remonte les signaux d'intention

### Rechercher un compte avant une prise de contact
/research [nom de l'entreprise]
→ Brief compte complet : firmographiques, stack technologique, score ICP, événements déclencheurs, carte des parties prenantes

### Rédiger un email cold personnalisé
/draft-email
→ Demande le brief compte + persona, génère objet + corps avec tokens de personnalisation

### Trier sa boîte de réception
/triage-inbox
→ Lit la file de réponses, classe chaque réponse, rédige les réponses, signale les leads chauds

### Se préparer pour un appel
/call-prep
→ Prend le nom du contact + l'entreprise, génère les questions de découverte, scripts d'objections, closing souple

### Enregistrer un appel dans HubSpot
/log-call
→ Coller les notes brutes ou le lien de transcription Gong — Claude extrait les prochaines étapes et met à jour le CRM

### Revue de fin de semaine
/weekly-review
→ Remonte les métriques d'activité, la progression du pipeline, les réunions vs objectif, et les axes de focus de la semaine suivante

## Conventions

- Notes de compte : toujours inclure la date du Dernier Contact, le Dernier Résultat et la Prochaine Étape en en-tête
- Objets d'email : 6 mots maximum, pas de MAJUSCULES, pas de points d'exclamation
- Journaux d'appels : toujours inclure une Prochaine Étape avec une date précise — pas de suivi à date ouverte
- Journaux hebdomadaires : enregistrés dans logs/weekly/YYYY-WNN.md — ne jamais supprimer les journaux historiques
- Sélection de séquence : cold/ pour les nouveaux prospects, inbound/ pour les demandes de démo, reactivation/ pour les comptes silencieux depuis 90+ jours
- Battlecards : mettre à jour vs-competitor-*.md dès qu'un prospect soulève une nouvelle objection ou qu'un concurrent lance une nouvelle fonctionnalité

## Ce que Claude ne doit pas faire

- Ne pas envoyer d'emails ni enrôler dans des séquences sans confirmation explicite
- Ne pas créer de deals HubSpot sans avoir confirmé que le score ICP est supérieur à 60
- Ne pas enregistrer des appels avec des champs Prochaine Étape vides
- Ne pas rédiger de messages de prospection sans avoir lu la note du compte si elle existe
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
        "/Users/$USER/sdr-workspace"
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
            "command": "bash -c 'if [[ \"$CLAUDE_TOOL_RESULT_PATH\" == */logs/weekly/* ]]; then echo \"[hook] Weekly log updated: $CLAUDE_TOOL_RESULT_PATH\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "matcher": "",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'echo \"[$(date +%H:%M)] Session ended. Run /morning-brief tomorrow to reprioritize.\" >> /tmp/sdr-session.log'"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "mcp__hubspot__create_deal",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'echo \"[hook] Deal creation triggered — confirm ICP score >= 60 before proceeding.\"'"
          }
        ]
      }
    ]
  }
}
```

## Compétences à installer

```bash
npx uitkit add skill gtm/sdr-research-brief
npx uitkit add skill gtm/sdr-reply-classifier
npx uitkit add skill gtm/sdr-call-prep
npx uitkit add skill gtm/sdr-call-analysis
npx uitkit add skill gtm/sdr-objection-handler
npx uitkit add skill gtm/sdr-territory-mapper
npx uitkit add skill gtm/sdr-lead-scorer
npx uitkit add skill gtm/email-automation
npx uitkit add skill gtm/lead-enrichment
npx uitkit add skill gtm/crm-hygiene
npx uitkit add skill gtm/hubspot
```

## Ressources associées

- [Guide SDR — documentation complète des workflows](../guides/for-sdr.md)
- [Workflow quotidien SDR — processus de bout en bout](../workflows/sdr-daily.md)
