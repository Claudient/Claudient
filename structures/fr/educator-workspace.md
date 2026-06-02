# Espace de travail Enseignant / Formateur — Structure de projet

> Un espace de travail Claude Code pour les enseignants du primaire, du secondaire et du supérieur, couvrant la planification quotidienne des cours, la conception des programmes, l'enseignement différencié, la création d'évaluations, le retour aux élèves et la communication avec les parents et l'administration — le tout piloté par des commandes slash et un contexte de cours.

## Stack

- **Google Classroom** ou **Canvas LMS** — distribution des devoirs, carnet de notes, suivi des rendus
- **Google Workspace** (Docs, Slides, Forms, Drive) — documents de cours, diaporamas, quiz, ressources partagées
- **Notion** — tableaux de planification du programme, cartes d'unités, calendriers semestriels
- **Turnitin** — vérification de l'intégrité académique sur les travaux rendus
- **Kahoot** ou **Pear Deck** — évaluations formatives interactives et sondages en direct
- **Slack** ou **Microsoft Teams** — communication entre le personnel et les départements
- **Google Meet** ou **Zoom** — conférences parents-professeurs, enseignement à distance, permanences

## Arborescence du répertoire

```
educator-workspace/
├── .claude/
│   ├── CLAUDE.md                                    # instructions de l'espace de travail pour Claude Code
│   ├── settings.json                                # serveurs MCP, hooks, permissions
│   └── commands/
│       ├── lesson-plan.md                           # /lesson-plan <topic> <grade-level> — plan de cours complet avec objectifs, activités et vérifications
│       ├── assignment-builder.md                    # /assignment-builder — crée une consigne de devoir avec instructions et critères de rendu
│       ├── rubric-creator.md                        # /rubric-creator — génère un barème noté pour tout type de devoir
│       ├── student-feedback.md                      # /student-feedback <student-id> — génère un retour écrit personnalisé
│       ├── parent-email.md                          # /parent-email <student-id> <topic> — rédige une communication parent adaptée au ton et au contexte
│       ├── differentiation.md                       # /differentiation <lesson-file> — produit des versions différenciées d'un cours sur 3 niveaux
│       └── quiz-builder.md                          # /quiz-builder <topic> <num-questions> — crée un quiz avec corrigé et barème
├── curriculum/
│   ├── sy2025-2026/                                 # racine de l'année scolaire
│   │   ├── scope-and-sequence.md                   # carte des unités sur l'année entière avec alignement des référentiels et progression
│   │   ├── semester-1/
│   │   │   ├── unit-01-introduction/
│   │   │   │   ├── unit-overview.md                # questions essentielles, compréhensions durables, référentiels (ex. : CCSS.ELA-LITERACY.RI.6.1)
│   │   │   │   ├── pacing-guide.md                 # planning jour par jour, points de contrôle intermédiaires
│   │   │   │   └── standards-alignment.md          # correspondance avec les référentiels nationaux/locaux et liens de justification
│   │   │   ├── unit-02-narrative-writing/
│   │   │   │   ├── unit-overview.md
│   │   │   │   ├── pacing-guide.md
│   │   │   │   └── standards-alignment.md
│   │   │   └── unit-03-research-skills/
│   │   │       ├── unit-overview.md
│   │   │       ├── pacing-guide.md
│   │   │       └── standards-alignment.md
│   │   └── semester-2/
│   │       ├── unit-04-argumentative-writing/
│   │       │   ├── unit-overview.md
│   │       │   ├── pacing-guide.md
│   │       │   └── standards-alignment.md
│   │       └── unit-05-literature-circles/
│   │           ├── unit-overview.md
│   │           ├── pacing-guide.md
│   │           └── standards-alignment.md
├── lessons/
│   ├── _template/                                   # copier ce dossier pour créer un nouveau cours
│   │   ├── lesson-plan.md                           # objectifs d'apprentissage, matériel, déroulement, vérifications de compréhension, clôture
│   │   ├── slides-outline.md                        # plan du diaporama Google Slides (titre, mise en route, instruction directe, pratique, ticket de sortie)
│   │   └── differentiation-notes.md                 # étayages et prolongements pour les niveaux inférieur, attendu et supérieur
│   ├── 2026-09-08-intro-to-thesis-statements/
│   │   ├── lesson-plan.md                           # plan de 50 min ; référentiel CCSS.ELA-LITERACY.W.6.1a
│   │   ├── slides-outline.md
│   │   └── differentiation-notes.md                 # cadres de phrases pour les élèves allophones, prolongement par séminaire socratique
│   ├── 2026-09-15-evidence-based-claims/
│   │   ├── lesson-plan.md
│   │   ├── slides-outline.md
│   │   └── differentiation-notes.md
│   └── 2026-10-01-peer-review-workshop/
│       ├── lesson-plan.md
│       ├── slides-outline.md
│       └── differentiation-notes.md
├── assessments/
│   ├── quizzes/
│   │   ├── unit-01-vocab-quiz.md                    # quiz de 15 questions avec corrigé et format d'import Kahoot
│   │   ├── unit-02-narrative-elements-quiz.md
│   │   └── unit-03-research-skills-check.md
│   ├── rubrics/
│   │   ├── narrative-essay-rubric.md                # barème sur 4 points : idées, organisation, voix, conventions
│   │   ├── research-paper-rubric.md                 # barème sur 4 points : thèse, preuves, citation, mécanique
│   │   ├── participation-rubric.md                  # grille d'évaluation de la participation en discussion et en classe
│   │   └── presentation-rubric.md                  # critères de présentation orale : contenu, delivery, supports visuels
│   └── projects/
│       ├── semester-1-research-project.md           # consigne de projet sur plusieurs semaines avec jalons et barème
│       └── semester-2-argument-essay.md             # consigne de dissertation finale avec instructions de dépôt Turnitin
├── student-data/
│   ├── README.md                                    # note : tous les identifiants élèves sont anonymisés — aucun nom ni date de naissance stocké ici
│   ├── class-roster.md                              # identifiants élèves, période, indicateurs IEP/504, statut allophone (sans données personnelles)
│   ├── progress-tracker.md                          # taux de réalisation des devoirs et fourchettes de notes par identifiant élève
│   ├── iep-accommodations.md                        # types d'aménagements par identifiant élève — utilisés par la commande /differentiation
│   └── intervention-log.md                          # journal daté des interventions par identifiant élève, stratégie utilisée, résultat
├── parent-comms/
│   ├── templates/
│   │   ├── positive-update-template.md              # prise de contact bienveillante pour signaler une bonne progression ou une réussite
│   │   ├── concern-template.md                      # ton mesuré pour signaler une préoccupation académique ou comportementale
│   │   ├── conference-invite-template.md            # email de convocation à une réunion parents-professeurs
│   │   └── missing-work-template.md                 # première et deuxième relance pour travaux non rendus
│   └── sent-log/
│       ├── 2026-09-log.md                           # liste datée des communications envoyées avec identifiant élève et sujet
│       └── 2026-10-log.md
├── resources/
│   ├── standards/
│   │   ├── ccss-ela-grade6.md                       # référentiels Common Core pertinents extraits pour consultation rapide
│   │   └── state-standards-crosswalk.md             # référentiels locaux mis en correspondance avec le CCSS
│   ├── media-links.md                               # liens vidéo, podcast et articles sélectionnés par unité
│   └── professional-development/
│       ├── pd-notes-2025-08-15.md                   # notes de la session de développement professionnel estivale
│       └── instructional-strategies.md              # référence : UDL, séminaire socratique, think-pair-share, jigsaw
└── feedback/
    ├── templates/
    │   ├── formative-feedback-template.md           # retour écrit à faible enjeu pour les brouillons et travaux en classe
    │   ├── summative-feedback-template.md           # retour en fin de devoir aligné sur les catégories du barème
    │   └── growth-mindset-feedback-template.md      # formulations orientées effort pour les élèves en difficulté
    └── sent/
        ├── 2026-09-narrative-essay-feedback.md      # journal de retours groupés : identifiant élève, fourchette de note, retour envoyé
        └── 2026-10-research-draft-feedback.md
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `.claude/commands/lesson-plan.md` | Commande slash qui accepte `$ARGUMENTS` sous la forme `<topic> <grade-level>`, lit l'aperçu de l'unité et l'alignement des référentiels, et génère un plan de cours complet de 50 min avec objectifs, mise en route, instruction directe, pratique guidée et ticket de sortie |
| `.claude/commands/differentiation.md` | Lit un fichier lesson-plan.md et les aménagements IEP correspondants, puis produit trois versions différenciées : niveau inférieur avec cadres de phrases, niveau attendu tel quel, niveau supérieur avec tâches de prolongement |
| `.claude/commands/student-feedback.md` | Prend un identifiant élève, lit son entrée dans progress-tracker et le barème pertinent, et génère un retour écrit spécifique avec formulations d'étapes suivantes — jamais de compliments génériques |
| `.claude/commands/parent-email.md` | Prend l'identifiant élève et le type de sujet (positif/préoccupation/travail-manquant), lit le journal d'envoi pour éviter les doublons, sélectionne le bon modèle et rédige un email prêt à envoyer |
| `curriculum/sy2025-2026/scope-and-sequence.md` | Carte des unités sur l'année entière avec alignement des référentiels et progression — la source de vérité que tous les plans de cours et évaluations utilisent comme référence |
| `student-data/iep-accommodations.md` | Types d'aménagements indexés par identifiant élève — lus par la commande `/differentiation` pour produire des supports correctement étayés sans exposer les données personnelles des élèves |
| `assessments/rubrics/` | Barèmes notés pour tous les types de devoirs majeurs — référencés par `/rubric-creator`, `/student-feedback` et `/quiz-builder` pour garantir que les retours sont alignés sur le barème |
| `parent-comms/sent-log/` | Journal mensuel de toutes les communications parents avec identifiant élève et sujet — évite les contacts en double et constitue une trace pour l'administration |

## Scaffold rapide

```bash
# Create workspace root and Claude config
mkdir -p educator-workspace/.claude/commands

# Create curriculum tree for current school year
mkdir -p educator-workspace/curriculum/sy2025-2026/semester-1/unit-01-introduction
mkdir -p educator-workspace/curriculum/sy2025-2026/semester-1/unit-02-narrative-writing
mkdir -p educator-workspace/curriculum/sy2025-2026/semester-1/unit-03-research-skills
mkdir -p educator-workspace/curriculum/sy2025-2026/semester-2/unit-04-argumentative-writing
mkdir -p educator-workspace/curriculum/sy2025-2026/semester-2/unit-05-literature-circles

# Create lessons directory with template
mkdir -p educator-workspace/lessons/_template

# Create assessments directories
mkdir -p educator-workspace/assessments/quizzes
mkdir -p educator-workspace/assessments/rubrics
mkdir -p educator-workspace/assessments/projects

# Create student data directory
mkdir -p educator-workspace/student-data

# Create parent comms directories
mkdir -p educator-workspace/parent-comms/templates
mkdir -p educator-workspace/parent-comms/sent-log

# Create resources directories
mkdir -p educator-workspace/resources/standards
mkdir -p educator-workspace/resources/professional-development

# Create feedback directories
mkdir -p educator-workspace/feedback/templates
mkdir -p educator-workspace/feedback/sent

# Stub out slash command files
touch educator-workspace/.claude/commands/lesson-plan.md
touch educator-workspace/.claude/commands/assignment-builder.md
touch educator-workspace/.claude/commands/rubric-creator.md
touch educator-workspace/.claude/commands/student-feedback.md
touch educator-workspace/.claude/commands/parent-email.md
touch educator-workspace/.claude/commands/differentiation.md
touch educator-workspace/.claude/commands/quiz-builder.md

# Stub out lesson template files
touch educator-workspace/lessons/_template/lesson-plan.md
touch educator-workspace/lessons/_template/slides-outline.md
touch educator-workspace/lessons/_template/differentiation-notes.md

# Stub out student data files
touch educator-workspace/student-data/README.md
touch educator-workspace/student-data/class-roster.md
touch educator-workspace/student-data/progress-tracker.md
touch educator-workspace/student-data/iep-accommodations.md
touch educator-workspace/student-data/intervention-log.md

# Stub out parent comms templates
touch educator-workspace/parent-comms/templates/positive-update-template.md
touch educator-workspace/parent-comms/templates/concern-template.md
touch educator-workspace/parent-comms/templates/conference-invite-template.md
touch educator-workspace/parent-comms/templates/missing-work-template.md

# Stub out feedback templates
touch educator-workspace/feedback/templates/formative-feedback-template.md
touch educator-workspace/feedback/templates/summative-feedback-template.md
touch educator-workspace/feedback/templates/growth-mindset-feedback-template.md

# Stub out curriculum anchor files
touch educator-workspace/curriculum/sy2025-2026/scope-and-sequence.md

# Install educator skills
npx claudient add skill productivity/lesson-planner
npx claudient add skill productivity/student-feedback-analyzer
npx claudient add skill productivity/rubric-creator
npx claudient add skill productivity/assignment-builder
npx claudient add skill productivity/differentiation
npx claudient add skill productivity/parent-email
```

## Modèle CLAUDE.md

```markdown
# Espace de travail Enseignant — Instructions Claude Code

## Ce que c'est

Il s'agit d'un espace de travail pour enseignants du primaire, du secondaire et du supérieur.
Il contient des programmes, des plans de cours individuels, des évaluations, des données de
progression des élèves et des modèles de communication avec les parents.
Claude Code opère ici en tant qu'assistant pédagogique — en lisant le contexte du cours
pour générer des supports éducatifs alignés sur les référentiels, différenciés et basés sur les barèmes.

Toutes les données élèves sont anonymisées. Les identifiants élèves sont utilisés partout —
ne jamais utiliser de vrais noms d'élèves dans le contenu généré ou les fichiers stockés.

## Stack

- LMS : Google Classroom ou Canvas — distribution des devoirs, carnet de notes, rendus
- Documents : Google Workspace (Docs, Slides, Forms) — supports de cours, évaluations
- Planification : Notion — tableaux de programme, calendriers d'unités, progressions
- Intégrité académique : Turnitin — dissertations et travaux de recherche rendus
- Interactif : Kahoot, Pear Deck — vérifications formatives et sondages en direct
- Communication du personnel : Slack ou Microsoft Teams — coordination du département et de l'administration
- Conférences : Google Meet ou Zoom — réunions parents et permanences à distance

## Tâches courantes et commandes exactes

Créer un plan de cours :
  /lesson-plan <topic> <grade-level>
  → Lit l'aperçu de l'unité et l'alignement des référentiels ; génère un plan de cours complet de 50 min

Construire une consigne de devoir :
  /assignment-builder
  → Demande le type de devoir, le sujet et le niveau ; génère la consigne destinée aux élèves

Créer un barème de notation :
  /rubric-creator
  → Demande le type de devoir et les critères ; génère un barème sur 4 points prêt à coller dans Google Classroom

Rédiger un retour élève :
  /student-feedback <student-id>
  → Lit progress-tracker.md et le barème pertinent ; rédige un retour spécifique et aligné sur le barème

Rédiger un email parent :
  /parent-email <student-id> <topic>
  → topic est l'un des suivants : positive / concern / missing-work / conference-invite
  → Lit le journal d'envoi pour éviter les doublons ; sélectionne le bon modèle ; rédige l'email

Différencier un cours :
  /differentiation <path-to-lesson-plan.md>
  → Lit iep-accommodations.md ; produit les versions niveau inférieur, niveau attendu et niveau supérieur

Construire un quiz :
  /quiz-builder <topic> <num-questions>
  → Génère un quiz à choix multiples ou à réponses courtes avec corrigé et format d'import Kahoot

## Conventions de l'espace de travail

- Tous les plans de cours résident dans lessons/ et sont nommés YYYY-MM-DD-<slug>.md
- Tous les plans de cours sont créés à partir de lessons/_template/ — ne jamais partir de zéro
- Les barèmes résident dans assessments/rubrics/ et sont référencés par nom dans les plans de cours et les consignes
- Les fichiers de données élèves n'utilisent que les identifiants élèves — aucun nom, date de naissance ni coordonnée
- Les emails parents sont consignés dans parent-comms/sent-log/<YYYY-MM>-log.md après envoi
- Les fichiers de programme référencent les référentiels par code (ex. : CCSS.ELA-LITERACY.W.6.1a), non par paraphrase

## Alignement des référentiels

Référentiel par défaut : Common Core State Standards (CCSS) ELA
Correspondance locale : resources/standards/state-standards-crosswalk.md
Lors de la génération de plans de cours ou d'évaluations, citer toujours le code de référentiel spécifique visé.

## Niveaux de différenciation

Niveau inférieur : cadres de phrases, banques de mots, organisateurs graphiques, complexité réduite
Niveau attendu : cours tel que conçu — sans modification
Niveau supérieur : tâches de prolongement, questions de séminaire socratique, options de recherche indépendante
Aménagements IEP/504 : lire student-data/iep-accommodations.md avant de générer tout
matériel différencié — les aménagements de ce fichier ont la priorité sur les valeurs par défaut.

## Ne pas faire

- Ne pas utiliser de vrais noms d'élèves dans un fichier généré — identifiants élèves uniquement
- Ne pas générer de notes ou scores sur les barèmes — Claude propose des formulations ; l'enseignant attribue les notes
- Ne pas envoyer d'emails parents sans relecture de l'enseignant — /parent-email produit uniquement des brouillons
- Ne pas créer de plans de cours sans référencer d'abord le unit-overview.md pertinent
- Ne pas pousser student-data/ vers un dépôt git distant
```

## Serveurs MCP

```json
{
  "mcpServers": {
    "google-drive": {
      "command": "npx",
      "args": ["-y", "@googleapis/mcp-server-drive"],
      "env": {
        "GOOGLE_CLIENT_ID": "${GOOGLE_CLIENT_ID}",
        "GOOGLE_CLIENT_SECRET": "${GOOGLE_CLIENT_SECRET}",
        "GOOGLE_REFRESH_TOKEN": "${GOOGLE_REFRESH_TOKEN}"
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
        "/Users/$USER/educator-workspace/curriculum",
        "/Users/$USER/educator-workspace/lessons",
        "/Users/$USER/educator-workspace/assessments",
        "/Users/$USER/educator-workspace/feedback"
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
            "command": "if echo \"$CLAUDE_TOOL_INPUT\" | python3 -c \"import sys,json; p=json.load(sys.stdin).get('path',''); print(p)\" 2>/dev/null | grep -q 'lessons/'; then echo '[educator-workspace] Lesson written — confirm standards code is cited and differentiation-notes.md exists alongside this file.'; fi"
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
            "command": "if echo \"$CLAUDE_TOOL_INPUT\" | python3 -c \"import sys,json; p=json.load(sys.stdin).get('path',''); print(p)\" 2>/dev/null | grep -q 'student-data/'; then echo '[educator-workspace] Writing to student-data/ — verify no student names or PII are included, student IDs only.'; fi"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "echo '[educator-workspace] Session ended. Reminder: log any parent emails sent this session in parent-comms/sent-log/ and update progress-tracker.md if assessments were graded.'"
          }
        ]
      }
    ]
  }
}
```

## Compétences à installer

```bash
npx claudient add skill productivity/lesson-planner
npx claudient add skill productivity/student-feedback-analyzer
npx claudient add skill productivity/rubric-creator
npx claudient add skill productivity/assignment-builder
npx claudient add skill productivity/differentiation
npx claudient add skill productivity/parent-email
npx claudient add skill productivity/quiz-builder
```

## Liens connexes

- [Guide Enseignant](../guides/for-educator.md)
- [Workflow de planification de cours](../workflows/lesson-planning.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
