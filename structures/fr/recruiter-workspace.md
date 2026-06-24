# Espace de travail Recruteur / Acquisition de talents — Structure du projet

> Système d'exploitation quotidien pour les recruteurs internes et en cabinet : rédaction de fiches de poste, sourcing de candidats, présélection, coordination des entretiens, gestion des offres et reporting du pipeline — le tout piloté par des slash commands Claude Code connectées à Greenhouse/Lever/Ashby, LinkedIn Recruiter et Slack.

## Stack

- **Greenhouse / Lever / Ashby** — ATS de référence : offres d'emploi, pipeline de candidats, suivi des étapes, gestion des offres
- **LinkedIn Recruiter** — Recherche booléenne, InMail, gestion des viviers de talents, analytiques de sourcing
- **Slack** — Coordination avec les hiring managers, planification des débriefs, validations d'offres, alertes d'équipe
- **HireRight** — Commande de vérifications d'antécédents, adjudication, documentation de conformité
- **Karat / CoderPad** — Tests techniques, entretiens de codage en direct, résultats des évaluations
- **Calendly** — Planification des entretiens, disponibilités des panels, liens d'auto-planification pour les candidats
- **Notion** — Playbooks de recrutement, guides d'entretien, intégration des hiring managers
- **Claude Code** — Slash commands pour chaque processus de recrutement reproductible

## Arborescence du projet

```
recruiter-workspace/
├── .claude/
│   ├── CLAUDE.md                              # Instructions de l'espace de travail pour Claude
│   ├── settings.json                          # Serveurs MCP, hooks, permissions
│   └── commands/
│       ├── job-description.md                 # Rédige la fiche de poste à partir d'un brief (prend l'argument $ROLE)
│       ├── sourcing-strategy.md               # Chaînes booléennes + canaux pour un type de poste
│       ├── screen-email.md                    # Rédacteur d'e-mail de présélection ou de template InMail
│       ├── interview-scorecard.md             # Crée une grille d'évaluation structurée pour un poste
│       ├── offer-letter.md                    # Génère la lettre d'offre à partir de la grille salariale et des saisies
│       ├── pipeline-report.md                 # Extrait les données ATS → résumé hebdomadaire du pipeline
│       └── candidate-debrief.md              # Structure les notes de débrief après le panel d'entretiens
├── roles/
│   ├── _template/                             # Copier ce dossier pour chaque nouveau poste ouvert
│   │   ├── job-description.md                 # Fiche de poste finale approuvée (générée via /job-description)
│   │   ├── role-brief.md                      # Formulaire de prise de besoin HM : niveau, périmètre, critères obligatoires et souhaitables
│   │   ├── sourcing-log.md                    # Chaînes booléennes utilisées, canaux testés, taux de réponse
│   │   ├── interview-guide.md                 # Structure des entretiens par étape + banque de questions
│   │   ├── scorecard.md                       # Grille d'évaluation avec pondération des compétences
│   │   └── offers/
│   │       ├── offer-draft.md                 # Brouillon de travail avant validation
│   │       └── offer-final.md                 # Offre validée envoyée au candidat
│   ├── senior-engineer-backend/
│   │   ├── job-description.md
│   │   ├── role-brief.md
│   │   ├── sourcing-log.md
│   │   ├── interview-guide.md
│   │   ├── scorecard.md
│   │   └── offers/
│   │       ├── offer-draft.md
│   │       └── offer-final.md
│   ├── product-manager-growth/
│   │   ├── job-description.md
│   │   ├── role-brief.md
│   │   ├── sourcing-log.md
│   │   ├── interview-guide.md
│   │   ├── scorecard.md
│   │   └── offers/
│   │       └── offer-draft.md
│   └── account-executive-mid-market/
│       ├── job-description.md
│       ├── role-brief.md
│       ├── sourcing-log.md
│       ├── interview-guide.md
│       ├── scorecard.md
│       └── offers/
│           └── offer-draft.md
├── candidates/
│   ├── pipeline-tracker.md                    # Candidats actifs sur tous les postes : étape, statut, responsable
│   ├── feedback-log.md                        # Retours d'entretiens indexés par candidat et par poste
│   ├── declined/
│   │   ├── declined-template.md               # Templates d'e-mails de refus standards par étape
│   │   └── declined-log.md                    # Candidats refusés avec codes de motif pour l'analytique
│   └── silver-medalists/
│       ├── silver-medalist-index.md           # Candidats finalistes à recontacter à l'ouverture de nouveaux postes
│       └── re-engagement-template.md          # Message de relance chaleureux pour les finalistes
├── sourcing/
│   ├── boolean-strings/
│   │   ├── software-engineer.md               # Chaînes booléennes pour le sourcing SWE par stack
│   │   ├── product-manager.md                 # Chaînes booléennes pour le sourcing PM
│   │   ├── data-scientist.md                  # Chaînes booléennes pour les rôles DS/ML
│   │   ├── sales-ae-sdr.md                    # Chaînes booléennes pour les rôles GTM
│   │   └── design-ux.md                       # Chaînes booléennes pour les rôles design
│   ├── sourcing-channels.md                   # Liste des canaux avec benchmarks de taux de réponse par type de poste
│   ├── talent-pools/
│   │   ├── engineering-pool.md                # Contacts ingénierie actifs à recontacter
│   │   ├── gtm-pool.md                        # Contacts GTM actifs
│   │   └── leadership-pool.md                 # Candidats passifs niveau VP/Directeur
│   └── linkedin-saved-searches.md             # Recherches nommées sur LinkedIn Recruiter à relancer mensuellement
├── offer-management/
│   ├── comp-bands.md                          # Grilles salariales par niveau et fonction (mise à jour trimestrielle)
│   ├── offer-letter-templates/
│   │   ├── full-time-standard.md              # Template de lettre d'offre CDI standard
│   │   ├── full-time-executive.md             # Lettre d'offre cadre dirigeant avec clause de cliff sur l'equity
│   │   └── contract-to-hire.md                # Template de lettre d'offre mission avec option d'embauche
│   ├── equity-explainer.md                    # FAQ equity en langage clair à destination des candidats
│   ├── negotiation-scripts.md                 # Scripts de réponse aux contre-offres par scénario
│   └── approval-workflow.md                   # Chaîne de validation des offres : recruteur → HRBP → Finance → CEO
├── onboarding/
│   ├── day-1-checklist.md                     # Informatique, badge, outils, réunions de présentation
│   ├── first-week-schedule-template.md        # Planning jour par jour pour la première semaine du nouveau collaborateur
│   ├── welcome-email-template.md              # E-mail de bienvenue pré-arrivée envoyé 3 jours avant le démarrage
│   ├── hiring-manager-checklist.md            # Tâches du HM avant et le jour J
│   └── new-hire-survey.md                     # Enquête d'expérience du nouveau collaborateur à 30 jours
├── employer-brand/
│   ├── company-overview.md                    # Présentation de l'entreprise en 2 pages à destination des candidats
│   ├── culture-deck.md                        # Valeurs, style de travail, composition des équipes
│   ├── candidate-faq.md                       # Questions fréquentes des candidats avec réponses approuvées
│   ├── glassdoor-response-templates.md        # Réponses approuvées aux thèmes récurrents sur Glassdoor
│   └── job-board-descriptions/
│       ├── linkedin-company-bio.md            # Description LinkedIn de l'entreprise en 300 caractères
│       └── greenhouse-about-us.md             # Bloc « À propos de nous » dans l'ATS pour les offres d'emploi
└── reports/
    ├── weekly-pipeline.md                     # Snapshot hebdomadaire : postes actifs, étapes, vélocité
    ├── time-to-fill.md                        # Délai de recrutement par type de poste et par trimestre
    ├── source-of-hire.md                      # Attribution des recrutements par canal de sourcing
    ├── dei-metrics.md                         # Données de diversité du funnel par étape et par poste
    └── weekly/
        ├── 2026-W22.md                        # Rapport hebdomadaire du pipeline archivé
        ├── 2026-W21.md
        └── 2026-W20.md
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `.claude/commands/job-description.md` | Prend un `role-brief.md` comme contexte et rédige une fiche de poste complète avec responsabilités, prérequis, qualifications souhaitées et une relecture pour un langage inclusif — prête à publier sur Greenhouse ou LinkedIn |
| `.claude/commands/sourcing-strategy.md` | Génère des chaînes de recherche booléenne, recommande des canaux de sourcing avec des estimations de taux de réponse, et produit un plan de sourcing calé sur le brief de poste et le vivier de talents |
| `.claude/commands/interview-scorecard.md` | Construit une grille d'évaluation structurée à partir d'un brief de poste : liste de compétences, banque de questions comportementales et barème numérique (échelle 1-5 avec descripteurs) pour chaque compétence |
| `.claude/commands/offer-letter.md` | Prend le nom du candidat, le poste, le niveau, la date de démarrage et les éléments de rémunération ; récupère le template approprié dans `offer-management/offer-letter-templates/` ; génère un brouillon complet pour relecture |
| `.claude/commands/pipeline-report.md` | Interroge Greenhouse ou Ashby pour les postes ouverts, les candidats actifs par étape et les données de durée par étape ; formate un résumé hebdomadaire du pipeline avec les points de vélocité et les blocages |
| `roles/_template/` | Structure de dossier canonique pour chaque nouveau poste ouvert — copier ce répertoire à l'ouverture d'un nouveau besoin afin d'assurer une documentation cohérente tout au long du cycle de recrutement |
| `offer-management/comp-bands.md` | Source unique de vérité pour les grilles salariales par niveau et fonction — mise à jour trimestrielle ; référencée par `/offer-letter` et `/comp-benchmarker` pour maintenir les offres dans la fourchette |
| `candidates/silver-medalists/silver-medalist-index.md` | Liste indexée des candidats solides non retenus — réactivés à l'ouverture d'un nouveau poste pour réduire le délai de sourcing |
| `sourcing/boolean-strings/` | Chaînes de recherche booléenne préconstruites organisées par famille de postes — charger le fichier pertinent avant toute session LinkedIn Recruiter pour éviter de reconstruire les chaînes à zéro |
| `reports/dei-metrics.md` | Suit la représentation à chaque étape du funnel (candidatures, présélections, entretiens, offres, recrutements) pour identifier les points de déperdition et orienter la stratégie de canaux de sourcing |

## Scaffold rapide

```bash
# Créer l'espace de travail et tous les sous-répertoires
mkdir -p recruiter-workspace/.claude/commands
mkdir -p recruiter-workspace/roles/_template/offers
mkdir -p recruiter-workspace/roles/senior-engineer-backend/offers
mkdir -p recruiter-workspace/roles/product-manager-growth/offers
mkdir -p recruiter-workspace/roles/account-executive-mid-market/offers
mkdir -p recruiter-workspace/candidates/declined
mkdir -p recruiter-workspace/candidates/silver-medalists
mkdir -p recruiter-workspace/sourcing/boolean-strings
mkdir -p recruiter-workspace/sourcing/talent-pools
mkdir -p recruiter-workspace/offer-management/offer-letter-templates
mkdir -p recruiter-workspace/onboarding
mkdir -p recruiter-workspace/employer-brand/job-board-descriptions
mkdir -p recruiter-workspace/reports/weekly

# Initialiser les commandes Claude
touch recruiter-workspace/.claude/commands/job-description.md
touch recruiter-workspace/.claude/commands/sourcing-strategy.md
touch recruiter-workspace/.claude/commands/screen-email.md
touch recruiter-workspace/.claude/commands/interview-scorecard.md
touch recruiter-workspace/.claude/commands/offer-letter.md
touch recruiter-workspace/.claude/commands/pipeline-report.md
touch recruiter-workspace/.claude/commands/candidate-debrief.md

# Initialiser le template de poste
touch recruiter-workspace/roles/_template/job-description.md
touch recruiter-workspace/roles/_template/role-brief.md
touch recruiter-workspace/roles/_template/sourcing-log.md
touch recruiter-workspace/roles/_template/interview-guide.md
touch recruiter-workspace/roles/_template/scorecard.md
touch recruiter-workspace/roles/_template/offers/offer-draft.md

# Initialiser les fichiers de sourcing
touch recruiter-workspace/sourcing/boolean-strings/software-engineer.md
touch recruiter-workspace/sourcing/boolean-strings/product-manager.md
touch recruiter-workspace/sourcing/boolean-strings/data-scientist.md
touch recruiter-workspace/sourcing/boolean-strings/sales-ae-sdr.md
touch recruiter-workspace/sourcing/boolean-strings/design-ux.md
touch recruiter-workspace/sourcing/sourcing-channels.md
touch recruiter-workspace/sourcing/linkedin-saved-searches.md
touch recruiter-workspace/sourcing/talent-pools/engineering-pool.md
touch recruiter-workspace/sourcing/talent-pools/gtm-pool.md
touch recruiter-workspace/sourcing/talent-pools/leadership-pool.md

# Initialiser les fichiers de gestion des offres
touch recruiter-workspace/offer-management/comp-bands.md
touch recruiter-workspace/offer-management/offer-letter-templates/full-time-standard.md
touch recruiter-workspace/offer-management/offer-letter-templates/full-time-executive.md
touch recruiter-workspace/offer-management/offer-letter-templates/contract-to-hire.md
touch recruiter-workspace/offer-management/equity-explainer.md
touch recruiter-workspace/offer-management/negotiation-scripts.md
touch recruiter-workspace/offer-management/approval-workflow.md

# Initialiser les fichiers d'intégration
touch recruiter-workspace/onboarding/day-1-checklist.md
touch recruiter-workspace/onboarding/first-week-schedule-template.md
touch recruiter-workspace/onboarding/welcome-email-template.md
touch recruiter-workspace/onboarding/hiring-manager-checklist.md
touch recruiter-workspace/onboarding/new-hire-survey.md

# Initialiser les fichiers marque employeur
touch recruiter-workspace/employer-brand/company-overview.md
touch recruiter-workspace/employer-brand/culture-deck.md
touch recruiter-workspace/employer-brand/candidate-faq.md
touch recruiter-workspace/employer-brand/glassdoor-response-templates.md
touch recruiter-workspace/employer-brand/job-board-descriptions/linkedin-company-bio.md
touch recruiter-workspace/employer-brand/job-board-descriptions/greenhouse-about-us.md

# Initialiser le suivi des candidats
touch recruiter-workspace/candidates/pipeline-tracker.md
touch recruiter-workspace/candidates/feedback-log.md
touch recruiter-workspace/candidates/declined/declined-template.md
touch recruiter-workspace/candidates/declined/declined-log.md
touch recruiter-workspace/candidates/silver-medalists/silver-medalist-index.md
touch recruiter-workspace/candidates/silver-medalists/re-engagement-template.md

# Initialiser les fichiers de reporting
touch recruiter-workspace/reports/weekly-pipeline.md
touch recruiter-workspace/reports/time-to-fill.md
touch recruiter-workspace/reports/source-of-hire.md
touch recruiter-workspace/reports/dei-metrics.md
echo "# Weekly Pipeline — $(date +%Y-W%V)" > recruiter-workspace/reports/weekly/$(date +%Y-W%V).md

# Installer toutes les skills recruteur
npx uitkit add skill productivity/candidate-sourcer
npx uitkit add skill productivity/interview-scorecard
npx uitkit add skill productivity/tech-interview-kit
npx uitkit add skill productivity/comp-benchmarker
npx uitkit add skill small-business/hiring-pipeline
npx uitkit add skill small-business/job-description

echo "Scaffold de l'espace de travail recruteur terminé."
```

## Template CLAUDE.md

```markdown
# Espace de travail Recruteur — Instructions Claude

## Ce que c'est

Il s'agit d'un espace de travail quotidien pour l'acquisition de talents. Chaque répertoire
et chaque commande ici sont optimisés pour un seul objectif : pourvoir les postes avec les
meilleurs candidats, plus rapidement. Claude Code gère la rédaction des fiches de poste,
la stratégie de sourcing, la présélection, la création des grilles d'évaluation, les lettres
d'offre et le reporting du pipeline — vous gérez les relations, les décisions et les validations.

Ne pas ajouter de code applicatif ici. Il s'agit d'un espace de travail dédié au contenu et aux processus.

## Stack

- Greenhouse / Ashby : ATS de référence — besoins, candidats, étapes du pipeline, offres, reporting
- LinkedIn Recruiter : recherche booléenne, InMail, recherches sauvegardées, gestion des viviers de talents
- Slack : communications avec les hiring managers, coordination des débriefs, fils de validation des offres
- HireRight : commande et adjudication des vérifications d'antécédents
- Karat / CoderPad : administration des évaluations techniques et accès aux résultats
- Calendly : planification des candidats, coordination des panels
- Notion : playbooks de recrutement, documentation des processus

## Postes ouverts

- Tous les besoins actifs se trouvent dans roles/ — un sous-répertoire par poste ouvert
- Le brief de poste (role-brief.md) doit être rempli avant d'exécuter une commande pour ce poste
- La grille d'évaluation (scorecard.md) doit exister avant le début des entretiens
- Les offres nécessitent toujours une validation avant envoi — voir offer-management/approval-workflow.md

## Tâches courantes — commandes exactes

### Rédiger une fiche de poste
/job-description
→ Lire d'abord le role-brief.md, puis rédiger une fiche de poste complète. Confirmer avant
  d'écrire dans le job-description.md du poste.

### Construire une stratégie de sourcing
/sourcing-strategy
→ Prend le type de poste et le niveau, produit des chaînes booléennes et des recommandations
  de canaux avec des benchmarks de taux de réponse attendus.

### Rédiger un e-mail de présélection ou un InMail
/screen-email
→ Demande le poste, le profil du candidat et le type de prise de contact (InMail à froid vs.
  recommandation vs. suivi de candidature) ; produit l'objet et le corps du message.

### Construire une grille d'entretien
/interview-scorecard
→ Prend le brief de poste, produit une liste de compétences avec des questions comportementales
  et un barème 1-5 avec descripteurs pour chaque compétence.

### Générer une lettre d'offre
/offer-letter
→ Prend le nom du candidat, le poste, le niveau, la date de démarrage, le salaire de base,
  l'equity et le bonus à la signature ; récupère le template approprié dans
  offer-management/offer-letter-templates/ ; produit un brouillon pour relecture.
  Ne jamais envoyer sans validation formelle.

### Extraire le rapport hebdomadaire du pipeline
/pipeline-report
→ Interroge l'ATS pour les postes ouverts, le nombre de candidats par étape, la durée par étape
  et les blocages ; formate et enregistre dans reports/weekly/YYYY-WNN.md.

### Structurer un débrief
/candidate-debrief
→ Prend les notes brutes des intervieweurs et la grille d'évaluation, synthétise une recommandation
  embauche/refus avec les arguments étayés mappés sur chaque compétence.

## Conventions

- Dossiers de poste : toujours copier roles/_template/ à l'ouverture d'un nouveau besoin — ne jamais créer de dossiers ad hoc
- Fiches de poste : utiliser un langage inclusif ; éviter les pronoms genrés, « rockstar », « ninja », « culture fit »
- Grilles d'évaluation : toutes les compétences notées de 1 à 5 avec descripteurs — pas d'évaluations uniquement en texte libre
- Offres : la rémunération doit se situer dans la fourchette de offer-management/comp-bands.md avant rédaction
- Suivi du pipeline : mettre à jour candidates/pipeline-tracker.md après chaque changement d'étape
- Finalistes : consigner tout candidat solide non retenu dans candidates/silver-medalists/silver-medalist-index.md
  avec le poste, la date, le motif et une suggestion de date de recontact
- Rapports : enregistrés dans reports/weekly/YYYY-WNN.md — ne jamais écraser les rapports historiques
- Candidats refusés : consigner dans candidates/declined/declined-log.md avec le code de motif pour l'analytique

## Ce que Claude ne doit pas faire

- Ne pas envoyer de lettres d'offre sans confirmation explicite de validation de l'utilisateur
- Ne pas publier de fiches de poste sur LinkedIn ou Greenhouse sans confirmation de l'utilisateur
- Ne pas commander de vérifications d'antécédents (HireRight) — signaler le moment approprié, l'utilisateur initie
- Ne pas partager les détails de la grille salariale dans un brouillon destiné aux candidats
- Ne pas créer de grilles d'évaluation sans avoir d'abord lu le role-brief.md du poste concerné
- Ne pas recommander de refuser un candidat sur la base de caractéristiques protégées
```

## Serveurs MCP

```json
{
  "mcpServers": {
    "greenhouse": {
      "command": "npx",
      "args": ["-y", "@greenhouse/mcp-server"],
      "env": {
        "GREENHOUSE_API_KEY": "${GREENHOUSE_API_KEY}",
        "GREENHOUSE_ON_BEHALF_OF": "${GREENHOUSE_USER_ID}"
      }
    },
    "ashby": {
      "command": "npx",
      "args": ["-y", "@ashby-hq/mcp-server"],
      "env": {
        "ASHBY_API_KEY": "${ASHBY_API_KEY}"
      }
    },
    "linkedin": {
      "command": "npx",
      "args": ["-y", "@linkedin/mcp-server"],
      "env": {
        "LINKEDIN_ACCESS_TOKEN": "${LINKEDIN_ACCESS_TOKEN}",
        "LINKEDIN_ORGANIZATION_ID": "${LINKEDIN_ORGANIZATION_ID}"
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
        "/Users/$USER/recruiter-workspace"
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
            "command": "bash -c 'if [[ \"$CLAUDE_TOOL_RESULT_PATH\" == */offers/offer-draft.md ]]; then echo \"[hook] Offer draft written. Reminder: obtain approval before sending — see offer-management/approval-workflow.md\"; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if [[ \"$CLAUDE_TOOL_RESULT_PATH\" == */reports/weekly/* ]]; then echo \"[hook] Pipeline report saved: $CLAUDE_TOOL_RESULT_PATH\"; fi'"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "mcp__greenhouse__create_offer",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'echo \"[hook] Offer creation triggered in Greenhouse — confirm approval chain in offer-management/approval-workflow.md is complete before proceeding.\"'"
          }
        ]
      }
    ]
  }
}
```

## Skills à installer

```bash
npx uitkit add skill productivity/candidate-sourcer
npx uitkit add skill productivity/interview-scorecard
npx uitkit add skill productivity/tech-interview-kit
npx uitkit add skill productivity/comp-benchmarker
npx uitkit add skill small-business/hiring-pipeline
npx uitkit add skill small-business/job-description
```

## Voir aussi

- [Guide recruteur — documentation complète du workflow](../guides/for-recruiter.md)
- [Workflow pipeline de recrutement — processus de bout en bout](../workflows/hiring-pipeline.md)
