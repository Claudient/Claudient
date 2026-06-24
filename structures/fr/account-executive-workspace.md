# Espace de travail Account Executive — Structure de projet

> Pour un AE avec quota gérant un pipeline entreprise ou mid-market de bout en bout — de la découverte à la signature — avec Salesforce, Gong, DocuSign, Clari et Seismic comme stack opérationnelle.

## Stack

- **Salesforce** — CRM, gestion des opportunités, journalisation des activités, suivi des catégories de prévision
- **Gong** — Enregistrement des appels, scoring du risque deal, export des transcriptions, analytique commerciale
- **DocuSign** — Routage des contrats, suivi des enveloppes, piste d'audit eSignature
- **Clari** ou **Bowtie** — Prévision assistée par IA, consolidation du pipeline, intelligence revenus
- **Seismic** ou **Highspot** — Gestion de contenu, decks de présentation, calculateurs ROI, battlecards
- **LinkedIn Sales Navigator** — Cartographie des décideurs, expansion de compte, suivi des signaux
- **Slack** — Deal rooms, fils de discussion avec le manager, canaux de passation avec la CS
- **Claude Code** — Scoring MEDDPICC, rédaction d'appels d'offres, génération de MSP, préparation de QBR, mise à jour des prévisions

## Arborescence du projet

```
ae-workspace/
├── .claude/
│   ├── CLAUDE.md                        # Instructions de l'espace de travail (coller le modèle ci-dessous)
│   ├── settings.json                    # Serveurs MCP, hooks, permissions
│   └── commands/
│       ├── deal-review.md               # /deal-review — scoring MEDDPICC + signaux de risque par deal
│       ├── exec-alignment.md            # /exec-alignment — cartographie multi-interlocuteurs, brouillons de prise de contact exécutive
│       ├── proposal-draft.md            # /proposal-draft — proposition complète ou réponse à une section d'appel d'offres
│       ├── qbr-prep.md                  # /qbr-prep — plan du deck QBR, métriques, fil narratif
│       ├── negotiation-prep.md          # /negotiation-prep — analyse BATNA, matrice de concessions
│       ├── forecast-update.md           # /forecast-update — consolidation hebdomadaire Commit/Best Case
│       └── close-plan.md               # /close-plan — plan d'action mutuel, tableau de jalons
├── deals/
│   ├── _template/                       # Dossier deal vierge — à copier lors de l'ouverture d'une nouvelle opportunité
│   │   ├── discovery-notes.md           # Notes d'appel brutes, critères de qualification, ébauche MEDDPICC
│   │   ├── exec-map.md                  # Cartographie des parties prenantes — nom, titre, rôle, sentiment, dernier contact
│   │   ├── close-plan.md               # Plan d'action mutuel avec dates et responsables des deux côtés
│   │   ├── gong-transcripts/            # Transcriptions d'appels Gong exportées (texte brut)
│   │   │   └── .gitkeep
│   │   └── rfp-responses/               # Ébauches de sections d'appels d'offres et réponses finales
│   │       └── .gitkeep
│   ├── acme-corp/
│   │   ├── discovery-notes.md
│   │   ├── exec-map.md
│   │   ├── close-plan.md
│   │   ├── meddpicc-scores.md           # Historique des scores MEDDPICC (mis à jour à chaque revue)
│   │   ├── negotiation-log.md           # Historique des concessions, redlines, notes du deal desk
│   │   ├── gong-transcripts/
│   │   │   ├── 2026-05-14-discovery.txt
│   │   │   ├── 2026-05-28-demo.txt
│   │   │   └── 2026-06-01-negotiation.txt
│   │   └── rfp-responses/
│   │       ├── section-3-security.md
│   │       ├── section-5-integrations.md
│   │       └── executive-summary.md
│   ├── beta-industries/
│   │   ├── discovery-notes.md
│   │   ├── exec-map.md
│   │   └── close-plan.md
│   └── gamma-systems/
│       ├── discovery-notes.md
│       ├── exec-map.md
│       ├── close-plan.md
│       └── gong-transcripts/
│           └── 2026-06-02-eval-review.txt
├── templates/
│   ├── proposal-template.md             # Structure de proposition réutilisable — résumé exécutif, ROI, conditions
│   ├── rfp-response-template.md         # Squelette de réponse à appel d'offres — exigence, réponse, preuve
│   ├── close-plan-template.md           # Plan d'action mutuel avec jalons standards
│   ├── mutual-action-plan.md            # MAP pour les deals en phase avancée — jalons, responsables, dates
│   ├── executive-outreach-template.md   # Prise de contact froide/chaude vers l'acheteur économique ou la direction
│   ├── qbr-deck-outline.md              # Structure du deck QBR — bilan business, objectifs, trimestre suivant
│   └── champion-enablement-package.md   # Kit de vente interne pour que le champion partage en interne
├── competitive/
│   ├── battlecard-competitor-a.md       # Positionnement concurrent A, objections, arguments gagnants
│   ├── battlecard-competitor-b.md       # Positionnement concurrent B, objections, arguments gagnants
│   ├── competitive-positioning.md       # Narrative de différenciation principale — mise à jour trimestrielle
│   └── win-loss-notes.md               # Journal des contextes de deals gagnés/perdus par concurrent
├── metrics/
│   ├── quota-tracker.md                 # Atteinte du quota hebdomadaire : closé, pipeline, écart à l'objectif
│   ├── pipeline-health.md              # Ratio de couverture, répartition par étape, liste des deals anciens
│   ├── forecast-log.md                 # Commit hebdomadaire vs. réel — historique de précision des prévisions
│   └── deal-cycle-benchmarks.md        # Durée moyenne par étape, taux de close par segment/taille
└── scratch/
    ├── weekly-prep.md                   # Espace de brouillon pour la revue de pipeline et l'appel de forecast
    └── call-notes-staging.md            # Notes post-appel brutes avant transfert dans le dossier deal
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `.claude/commands/deal-review.md` | Commande slash qui prend un nom de deal et son contexte, puis retourne une évaluation MEDDPICC scorée, les signaux de risque et la catégorie de prévision recommandée |
| `.claude/commands/exec-alignment.md` | Commande slash pour cartographier le comité d'achat, évaluer le sentiment de chaque partie prenante et rédiger des prises de contact multi-interlocuteurs |
| `.claude/commands/proposal-draft.md` | Commande slash qui produit une proposition complète ou une section spécifique d'appel d'offres — prend en entrée les critères de l'acheteur et les différenciateurs produit |
| `.claude/commands/negotiation-prep.md` | Commande slash pour l'analyse BATNA, la matrice de concessions et les conditions de retrait avant un appel de négociation commerciale |
| `deals/_template/` | Structure de dossier vierge à copier lorsqu'une nouvelle opportunité est qualifiée dans le pipeline — garantit une documentation cohérente sur tous les deals |
| `deals/acme-corp/meddpicc-scores.md` | Historique des scores MEDDPICC mis à jour après chaque revue de deal — permet de suivre l'évolution des scores et les schémas de risque sur le cycle de vente |
| `templates/mutual-action-plan.md` | Plan conjoint partagé avec l'acheteur à l'étape Évaluation — jalons, engagements mutuels et date de signature convenue |
| `metrics/forecast-log.md` | Commit hebdomadaire vs. closé réel — utilisé pour suivre la précision des prévisions dans le temps et identifier les tendances de sous-déclaration ou de sur-engagement |

## Scaffolding rapide

```bash
# Créer la racine de l'espace de travail
mkdir -p ae-workspace

# Créer la structure .claude
mkdir -p ae-workspace/.claude/commands

# Créer les répertoires de deals
mkdir -p ae-workspace/deals/_template/gong-transcripts
mkdir -p ae-workspace/deals/_template/rfp-responses
mkdir -p ae-workspace/deals/acme-corp/gong-transcripts
mkdir -p ae-workspace/deals/acme-corp/rfp-responses
mkdir -p ae-workspace/deals/beta-industries
mkdir -p ae-workspace/deals/gamma-systems/gong-transcripts

# Créer les répertoires templates, competitive, metrics et scratch
mkdir -p ae-workspace/templates
mkdir -p ae-workspace/competitive
mkdir -p ae-workspace/metrics
mkdir -p ae-workspace/scratch

# Initialiser les placeholders .gitkeep
touch ae-workspace/deals/_template/gong-transcripts/.gitkeep
touch ae-workspace/deals/_template/rfp-responses/.gitkeep

# Installer les skills GTM
npx uitkit add skill gtm/deal-desk
npx uitkit add skill gtm/deal-review
npx uitkit add skill gtm/rfp-responder
npx uitkit add skill gtm/commercial-forecaster
npx uitkit add skill gtm/qbr-builder
npx uitkit add skill gtm/channel-economics
npx uitkit add skill gtm/champion-builder
npx uitkit add skill gtm/mutual-success-plan

# Copier les stubs de commandes dans .claude/commands/
npx uitkit add skill gtm/deal-review --output ae-workspace/.claude/commands/deal-review.md
npx uitkit add skill gtm/rfp-responder --output ae-workspace/.claude/commands/proposal-draft.md
npx uitkit add skill gtm/qbr-builder --output ae-workspace/.claude/commands/qbr-prep.md
npx uitkit add skill gtm/commercial-forecaster --output ae-workspace/.claude/commands/forecast-update.md
npx uitkit add skill gtm/mutual-success-plan --output ae-workspace/.claude/commands/close-plan.md
```

## Modèle CLAUDE.md

```markdown
# AE Workspace — Instructions Claude Code

## Ce que c'est

Il s'agit du répertoire de travail d'un Account Executive gérant un pipeline avec quota.
Les deals sont suivis dans deals/, les modèles dans templates/ et l'intelligence concurrentielle dans competitive/.
Tout le scoring MEDDPICC, les prévisions, la rédaction d'appels d'offres et la préparation des QBR passent par les skills Claude Code.

## Stack

- Salesforce — CRM de référence (opportunité, contact, activité)
- Gong — Intelligence des appels ; transcriptions exportées vers deals/<account>/gong-transcripts/
- DocuSign — Routage des contrats ; enregistrer les IDs d'enveloppes dans deals/<account>/negotiation-log.md
- Clari — Consolidation des prévisions ; instantanés hebdomadaires consignés dans metrics/forecast-log.md
- Seismic — Référentiel de contenu ; référencer les noms et versions des decks dans les propositions
- LinkedIn Sales Navigator — Cartographie des décideurs ; documenter les contacts dans exec-map.md
- Slack — Mises à jour des deal rooms ; coller les fils pertinents dans le contexte du dossier deal

## Tâches courantes et commandes exactes

### Scorer un deal avec MEDDPICC
```
/deal-review

Deal: [nom du deal]
Stage: [étape]
ACV: $[montant]
Close date: [date]
Context: [coller les notes de découverte ou la transcription Gong]
```

### Rédiger une proposition ou une section d'appel d'offres
```
/proposal-draft

RFP question: [coller verbatim]
Buyer priority: [point de douleur spécifique ciblé par la question]
Our differentiator: [ce que nous avons que les concurrents n'ont pas]
Word limit: [si précisé]
```

### Construire un plan d'action mutuel
```
/close-plan

Deal: [nom], ACV: $[montant], Target close: [date]
Champion: [nom, titre], Economic buyer: [nom, titre]
Remaining steps: [ce que les deux parties doivent encore faire avant la signature]
```

### Préparer l'appel de prévision
```
/forecast-update

My pipeline: [coller la liste des deals avec étape, ACV, date de close, catégorie de prévision]
Weekly quota: $[X] new ARR
Flag: deals at risk in Commit, Best Case deals ready to promote, deals to defer
```

### Préparer un QBR
```
/qbr-prep

Quarter: Q[X] [ANNÉE]
Closed won: $[X] ARR, [N] deals
Pipeline entering Q[X+1]: $[Y] ARR across [N] deals
Top 3 wins: [noms des deals et pourquoi ils ont closé]
Top risk: [quel est le plus grand écart au quota du prochain trimestre ?]
```

### Cartographier les décideurs avant le multi-threading
```
/exec-alignment

Account: [entreprise]
Known contacts: [liste avec titres et dernières interactions]
Target: [titre de l'exécutif à atteindre — CEO, CFO, CTO, etc.]
Ask: [ce dont j'ai besoin de leur part — sponsor exécutif, signataire, validation technique]
```

### Préparer un appel de négociation
```
/negotiation-prep

Deal: [nom], ACV: $[prix catalogue], Offered: $[offre actuelle]
Concessions already made: [liste]
Buyer's stated blockers: [prix / conditions / calendrier / processus achat]
Walk-away condition: [la ligne que je ne franchirai pas]
```

## Conventions à respecter

- Chaque dossier deal doit contenir discovery-notes.md, exec-map.md et close-plan.md avant que le deal passe en Évaluation
- Les scores MEDDPICC se trouvent dans deals/<account>/meddpicc-scores.md — ajouter après chaque revue, ne jamais écraser
- Les transcriptions Gong vont dans deals/<account>/gong-transcripts/ en fichiers .txt bruts, nommés YYYY-MM-DD-[sujet].txt
- Le journal des prévisions est mis à jour chaque vendredi dans metrics/forecast-log.md — total Commit, total Best Case, closé réel
- Les concessions de négociation sont consignées chronologiquement dans deals/<account>/negotiation-log.md
- Toutes les propositions et réponses aux appels d'offres sont sauvegardées dans deals/<account>/rfp-responses/ avant envoi
- Les battlecards concurrentiels dans competitive/ sont revus et mis à jour au début de chaque trimestre
```

## Serveurs MCP

```json
{
  "mcpServers": {
    "salesforce": {
      "command": "npx",
      "args": ["-y", "@salesforce/mcp-server"],
      "env": {
        "SF_LOGIN_URL": "https://login.salesforce.com",
        "SF_USERNAME": "your-sf-username@company.com",
        "SF_PASSWORD": "your-sf-password",
        "SF_TOKEN": "your-security-token"
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
        "/Users/your-username/ae-workspace"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"meddpicc-scores.md\"; then echo \"[hook] MEDDPICC score updated at $(date +%Y-%m-%dT%H:%M) — check forecast-log.md for weekly roll-up\"; fi'"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"close-plan.md\"; then echo \"[hook] Writing close plan — confirm exec-map.md and discovery-notes.md are current before sharing with buyer\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'TODAY=$(date +%A); if [ \"$TODAY\" = \"Friday\" ]; then echo \"[reminder] Friday — update metrics/forecast-log.md with this week Commit vs. actual before EOD\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Skills à installer

```bash
# Skills principaux de gestion des deals AE
npx uitkit add skill gtm/deal-desk
npx uitkit add skill gtm/deal-review
npx uitkit add skill gtm/rfp-responder
npx uitkit add skill gtm/commercial-forecaster
npx uitkit add skill gtm/qbr-builder
npx uitkit add skill gtm/channel-economics
npx uitkit add skill gtm/champion-builder
npx uitkit add skill gtm/mutual-success-plan

# Skills GTM complémentaires
npx uitkit add skill gtm/crm-hygiene
npx uitkit add skill gtm/revenue-operations
npx uitkit add skill gtm/expansion-playbook
npx uitkit add skill gtm/email-automation

# Installer tous les skills GTM en une seule commande
npx uitkit add skills gtm
```

## Ressources associées

- [Guide Account Executive](../guides/for-account-executive.md)
- [Workflow du cycle de vente AE](../workflows/ae-deal-cycle.md)
- [Workflow de qualification des deals](../workflows/deal-screening.md)
