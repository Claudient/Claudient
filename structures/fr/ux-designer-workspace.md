# Espace de travail Designer UX — Structure de projet

> Pour les designers UX qui pilotent le cycle complet de recherche, de design d'interaction, de prototypage et de transfert aux développeurs — en optimisant la boucle entière de l'entretien utilisateur jusqu'à la livraison des spécifications.

## Stack

- **Design + prototypage + transfert :** Figma (application desktop + Dev Mode)
- **Référentiel de recherche :** Dovetail — balisage, synthèse, suivi des insights
- **Tests d'utilisabilité :** Maze (non modéré) ou UserTesting (modéré)
- **Docs de recherche + notes de projet :** Notion
- **Ateliers + cartes de parcours :** Miro
- **Documentation du système de design :** Zeroheight
- **Communication :** Slack
- **Contrôle de version :** Git + GitHub (pour cet espace de travail, les spécifications liées et le CLAUDE.md)

## Arborescence de répertoires

```
my-ux-workspace/
├── .claude/
│   ├── commands/                          # commandes slash disponibles dans ce projet
│   │   ├── ux-audit.md                    # /ux-audit <zone-produit> — audit heuristique + accessibilité
│   │   ├── research-plan.md               # /research-plan — rédiger le plan d'étude, le filtre participants, le guide de discussion
│   │   ├── persona-update.md              # /persona-update — mettre à jour un persona à partir de nouveaux signaux de recherche
│   │   ├── usability-test.md              # /usability-test — rédiger le script de test, les tâches, les métriques de succès
│   │   ├── design-critique.md             # /design-critique — critique structurée selon les principes de design
│   │   ├── accessibility-check.md         # /accessibility-check — audit WCAG 2.2 AA pour un parcours donné
│   │   └── handoff-checklist.md           # /handoff-checklist — générer la checklist de transfert dev par fonctionnalité
│   ├── settings.json                      # hooks, références serveurs MCP, permissions
│   └── mcp.json                           # configurations des serveurs MCP (figma, notion, slack)
├── research/                              # toute la recherche primaire, organisée par vague
│   ├── round-01-onboarding/               # nommage : round-<NN>-<sujet>
│   │   ├── screener.md                    # critères et questions pour filtrer les participants
│   │   ├── discussion-guide.md            # guide du modérateur avec relances et tâches
│   │   ├── participants.md                # liste anonymisée des participants (P01–P08)
│   │   ├── sessions/
│   │   │   ├── P01-interview-notes.md     # notes brutes par participant
│   │   │   ├── P02-interview-notes.md
│   │   │   ├── P03-interview-notes.md
│   │   │   └── P04-interview-notes.md
│   │   ├── survey-results.csv             # export Maze ou UserTesting (le cas échéant)
│   │   └── synthesis/
│   │       ├── affinity-clusters.md       # thèmes balisés issus de l'export Dovetail
│   │       ├── key-findings.md            # 5 à 8 constats clés avec citations de preuves
│   │       └── opportunity-areas.md       # formulations HMW dérivées des constats
│   ├── round-02-checkout-flow/
│   │   ├── screener.md
│   │   ├── discussion-guide.md
│   │   ├── participants.md
│   │   ├── sessions/
│   │   │   ├── P01-interview-notes.md
│   │   │   └── P02-interview-notes.md
│   │   └── synthesis/
│   │       ├── affinity-clusters.md
│   │       ├── key-findings.md
│   │       └── opportunity-areas.md
│   └── competitive/                       # analyses détaillées de la concurrence
│       ├── competitor-teardown-stripe.md  # analyse structurée : parcours, patterns, points forts, lacunes
│       └── competitor-teardown-square.md
├── personas/                              # personas utilisateurs et tâches à accomplir
│   ├── persona-maya-growth-lead.md        # persona principal — mis à jour au fil de la recherche
│   ├── persona-alex-ops-manager.md        # persona secondaire
│   ├── persona-riley-end-user.md          # persona tertiaire
│   ├── jobs-to-be-done.md                 # formulations JTBD associées à chaque persona
│   └── persona-changelog.md              # journal des révisions de personas avec dates et motifs
├── journey-maps/                          # cartes d'expérience — état actuel et état cible
│   ├── current-state/
│   │   ├── onboarding-journey-current.md  # carte de l'état actuel avec points de friction et moments de satisfaction
│   │   ├── checkout-journey-current.md
│   │   └── settings-journey-current.md
│   └── future-state/
│       ├── onboarding-journey-future.md   # parcours cible après la refonte
│       └── checkout-journey-future.md
├── wireframes/                            # liens vers les fichiers Figma et docs d'annotation
│   ├── onboarding-flow/
│   │   ├── figma-link.md                  # URL Figma canonique + date de dernière mise à jour
│   │   ├── annotations.md                 # annotations écran par écran pour les développeurs
│   │   └── design-decisions.md           # pourquoi les décisions clés ont été prises (pas seulement quoi)
│   ├── checkout-flow/
│   │   ├── figma-link.md
│   │   ├── annotations.md
│   │   └── design-decisions.md
│   ├── settings-redesign/
│   │   ├── figma-link.md
│   │   ├── annotations.md
│   │   └── design-decisions.md
│   └── explorations/                      # concepts en phase précoce, non finalisés
│       ├── nav-restructure-v1.md
│       └── dashboard-widget-concepts.md
├── usability-tests/                       # artefacts de tests modérés et non modérés
│   ├── 2026-05-onboarding-maze/
│   │   ├── test-plan.md                   # objectifs, méthodologie, critères de sélection des participants
│   │   ├── task-scripts.md                # formulations exactes des tâches données aux participants
│   │   ├── session-notes/
│   │   │   ├── P01-session.md
│   │   │   └── P02-session.md
│   │   ├── maze-export.csv                # taux de complétion bruts, cartes de clics, temps par tâche
│   │   └── findings-report.md            # constats classés par sévérité avec recommandations de design
│   ├── 2026-03-checkout-usertesting/
│   │   ├── test-plan.md
│   │   ├── task-scripts.md
│   │   ├── session-notes/
│   │   │   ├── P01-session.md
│   │   │   └── P02-session.md
│   │   └── findings-report.md
│   └── templates/
│       ├── test-plan-template.md          # modèle réutilisable de plan de test
│       ├── task-script-template.md        # format standard pour les formulations de tâches
│       └── findings-report-template.md    # format de constats classés par sévérité
├── design-system/                         # documentation des composants et historique des décisions
│   ├── components/
│   │   ├── button.md                      # règles d'utilisation, variantes, exemples à faire/ne pas faire, lien Figma
│   │   ├── form-inputs.md
│   │   ├── modal.md
│   │   ├── navigation.md
│   │   ├── data-table.md
│   │   └── toast-notifications.md
│   ├── foundations/
│   │   ├── color.md                       # tokens de couleur, ratios de contraste, règles d'utilisation
│   │   ├── typography.md                  # échelle typographique, recommandations d'usage, notes d'accessibilité
│   │   ├── spacing.md                     # échelle d'espacement et cas de dérogation
│   │   ├── icons.md                       # source de la bibliothèque d'icônes, conventions de nommage
│   │   └── motion.md                      # principes d'animation, tokens de durée, mouvement réduit
│   ├── patterns/
│   │   ├── empty-states.md               # quand, quel contenu, recommandations pour les CTA
│   │   ├── error-handling.md             # types d'erreurs, rédaction des messages, patterns de récupération
│   │   └── loading-states.md             # squelettes d'écran, spinners, divulgation progressive
│   ├── decision-log.md                    # journal des décisions du système de design au format ADR
│   └── zeroheight-link.md                # URL Zeroheight canonique pour la documentation publiée
├── handoff/                               # packages de transfert dev par fonctionnalité
│   ├── feature-onboarding-v2/
│   │   ├── figma-link.md                  # lien Dev Mode vers le frame Figma concerné
│   │   ├── spec-annotations.md           # spécifications des composants, espacements, états, interactions
│   │   ├── edge-cases.md                 # états vides, erreurs, chargement, cas limites de permissions
│   │   ├── acceptance-criteria.md        # critères testables pour la validation QA et ingénierie
│   │   └── open-questions.md             # questions non résolues nécessitant un retour de l'ingénierie
│   ├── feature-checkout-redesign/
│   │   ├── figma-link.md
│   │   ├── spec-annotations.md
│   │   ├── edge-cases.md
│   │   ├── acceptance-criteria.md
│   │   └── open-questions.md
│   └── templates/
│       ├── spec-annotations-template.md  # modèle pour les nouveaux packages de transfert
│       └── acceptance-criteria-template.md
├── .env.example                           # token Figma, token Notion — ne jamais committer .env
└── CLAUDE.md                              # instructions du projet pour Claude Code
```

## Explication des fichiers clés

| Chemin | Rôle |
|---|---|
| `.claude/commands/ux-audit.md` | Commande slash qui prend une zone produit, réalise une évaluation heuristique selon les 10 heuristiques de Nielsen et WCAG 2.2 AA, et produit une liste de constats classés par sévérité |
| `.claude/commands/handoff-checklist.md` | Génère une checklist par fonctionnalité couvrant les annotations de spécifications, les cas limites, les critères d'acceptation, les notes d'accessibilité et les questions ouvertes |
| `research/round-<NN>-<topic>/synthesis/key-findings.md` | Livrable principal de chaque vague de recherche — 5 à 8 constats avec citations de preuves et niveaux de confiance |
| `personas/persona-changelog.md` | Journal auditables de chaque révision de persona, indiquant la vague de recherche déclenchante et ce qui a changé — prévient la dérive des personas |
| `usability-tests/templates/findings-report-template.md` | Format standard de constats classés par sévérité (Critique / Majeur / Mineur / Observation) avec colonne de recommandations de design |
| `design-system/decision-log.md` | Journal au format ADR expliquant pourquoi les décisions du système de design ont été prises — contexte essentiel pour les évolutions futures des composants |
| `handoff/feature-<name>/acceptance-criteria.md` | Critères testables et non ambigus pour l'ingénierie et la QA — chaque critère correspond à une interaction ou un état spécifique |
| `wireframes/<flow>/design-decisions.md` | Documente le raisonnement derrière les choix de design clés — pas une description du design, mais le pourquoi de chaque décision |

## Scaffolding rapide

```bash
# Créer le répertoire de l'espace de travail et y accéder
mkdir my-ux-workspace && cd my-ux-workspace
git init

# Créer les répertoires de configuration Claude Code et les fichiers de commandes
mkdir -p .claude/commands

# Créer tous les fichiers de commandes slash
touch .claude/commands/ux-audit.md
touch .claude/commands/research-plan.md
touch .claude/commands/persona-update.md
touch .claude/commands/usability-test.md
touch .claude/commands/design-critique.md
touch .claude/commands/accessibility-check.md
touch .claude/commands/handoff-checklist.md

# Répertoire de recherche — deux premières vagues comme scaffold
mkdir -p research/round-01-onboarding/sessions
mkdir -p research/round-01-onboarding/synthesis
mkdir -p research/round-02-checkout-flow/sessions
mkdir -p research/round-02-checkout-flow/synthesis
mkdir -p research/competitive
touch research/round-01-onboarding/{screener.md,discussion-guide.md,participants.md}
touch research/round-01-onboarding/synthesis/{affinity-clusters.md,key-findings.md,opportunity-areas.md}

# Personas
mkdir -p personas
touch personas/{persona-maya-growth-lead.md,persona-alex-ops-manager.md,jobs-to-be-done.md,persona-changelog.md}

# Cartes de parcours
mkdir -p journey-maps/current-state journey-maps/future-state
touch journey-maps/current-state/onboarding-journey-current.md
touch journey-maps/future-state/onboarding-journey-future.md

# Wireframes
mkdir -p wireframes/{onboarding-flow,checkout-flow,settings-redesign,explorations}
for dir in wireframes/onboarding-flow wireframes/checkout-flow wireframes/settings-redesign; do
  touch "$dir"/{figma-link.md,annotations.md,design-decisions.md}
done

# Tests d'utilisabilité
mkdir -p usability-tests/2026-05-onboarding-maze/session-notes
mkdir -p usability-tests/templates
touch usability-tests/2026-05-onboarding-maze/{test-plan.md,task-scripts.md,findings-report.md}
touch usability-tests/templates/{test-plan-template.md,task-script-template.md,findings-report-template.md}

# Système de design
mkdir -p design-system/{components,foundations,patterns}
touch design-system/components/{button.md,form-inputs.md,modal.md,navigation.md,data-table.md,toast-notifications.md}
touch design-system/foundations/{color.md,typography.md,spacing.md,icons.md,motion.md}
touch design-system/patterns/{empty-states.md,error-handling.md,loading-states.md}
touch design-system/{decision-log.md,zeroheight-link.md}

# Transfert
mkdir -p handoff/{feature-onboarding-v2,feature-checkout-redesign,templates}
for dir in handoff/feature-onboarding-v2 handoff/feature-checkout-redesign; do
  touch "$dir"/{figma-link.md,spec-annotations.md,edge-cases.md,acceptance-criteria.md,open-questions.md}
done
touch handoff/templates/{spec-annotations-template.md,acceptance-criteria-template.md}

# Modèle de fichier env
cat > .env.example <<'EOF'
FIGMA_ACCESS_TOKEN=your-figma-personal-access-token
FIGMA_TEAM_ID=your-figma-team-id
NOTION_API_KEY=secret_your-notion-integration-token
NOTION_RESEARCH_DB_ID=your-notion-database-id
SLACK_BOT_TOKEN=xoxb-your-bot-token-here
SLACK_TEAM_ID=T0XXXXXXXXX
EOF

# .gitignore
cat > .gitignore <<'EOF'
.env
.DS_Store
*.csv
!usability-tests/**/*.csv
EOF

# Installer les skills Claude Code
npx uitkit add skill product/ux-audit
npx uitkit add skill product/ux-researcher
npx uitkit add skill product/usability-report
npx uitkit add skill product/persona-builder
npx uitkit add skill product/competitive-teardown

git add .
git commit -m "chore: initial ux designer workspace scaffold"
```

## Modèle CLAUDE.md

```markdown
# Espace de travail Designer UX

Cet espace est dédié au design UX et couvre le cycle complet de la recherche jusqu'au transfert :
entretiens utilisateurs, gestion des personas, cartographie de parcours, annotation des wireframes,
tests d'utilisabilité, documentation du système de design et transfert aux développeurs.

La source de vérité canonique pour chaque type d'artefact :
- Synthèse de recherche : `research/<round>/synthesis/key-findings.md`
- Personas : `personas/persona-<nom>.md` (voir le changelog pour l'historique des révisions)
- Décisions de design : `wireframes/<parcours>/design-decisions.md`
- Spécifications dev : `handoff/<fonctionnalité>/spec-annotations.md`
- Justifications du système de design : `design-system/decision-log.md`

---

## Stack

- Design + prototypage : Figma (Dev Mode pour le transfert)
- Référentiel de recherche : Dovetail (synthèse, balisage, stockage des insights)
- Tests d'utilisabilité : Maze (non modéré), UserTesting (modéré)
- Docs + notes de projet : Notion
- Ateliers + cartes de parcours : Miro
- Documentation du système de design : Zeroheight
- Communication : Slack

---

## Tâches courantes et commandes exactes

| Tâche | Commande |
|---|---|
| Auditer une zone produit pour des problèmes UX | `/ux-audit <zone-produit>` |
| Rédiger un plan d'étude de recherche | `/research-plan` |
| Mettre à jour un persona à partir de nouveaux constats | `/persona-update <nom-fichier-persona> — <résumé des nouveaux constats>` |
| Écrire un script de test d'utilisabilité | `/usability-test <nom-parcours>` |
| Réaliser une critique de design | `/design-critique <lien-figma ou nom-parcours>` |
| Vérifier la conformité WCAG 2.2 AA d'un parcours | `/accessibility-check <nom-parcours>` |
| Générer une checklist de transfert dev | `/handoff-checklist <nom-fonctionnalité>` |

---

## Conventions de recherche

- Répertoires de vagues : `research/round-<NN>-<sujet>/` — numéro avec zéro non significatif, sujet en kebab-case
- Participants : toujours anonymisés en P01, P02, etc. — ne jamais utiliser les vrais noms dans les fichiers
- Notes de sessions : brutes et non éditées — la synthèse se fait dans le sous-répertoire `synthesis/`
- Les constats sont classés par sévérité : Critique / Majeur / Mineur / Observation
- Chaque constat doit citer au moins une citation de participant ou un point de données comme preuve
- Dovetail est le système de référence — les notes ici sont la copie de travail que Claude peut lire

---

## Conventions pour les personas

- Fichiers de personas : `persona-<prénom>-<slug-rôle>.md` (ex. : `persona-maya-growth-lead.md`)
- Chaque mise à jour doit être consignée dans `persona-changelog.md` avec la vague de recherche déclenchante
- Les formulations JTBD se trouvent dans `jobs-to-be-done.md`, pas dans les fichiers de personas
- Ne pas inventer de nouveaux attributs de persona sans preuves issues de la recherche

---

## Conventions pour les wireframes et décisions de design

- `figma-link.md` doit inclure : URL, nom du fichier Figma, nom du frame, date de dernière mise à jour
- `annotations.md` : écran par écran, en référençant les noms des composants du système de design
- `design-decisions.md` : rédigé sous la forme "Nous avons choisi X plutôt que Y parce que Z" — pas une description de l'interface
- Ne jamais dupliquer les décisions de design dans plusieurs fichiers — toujours renvoyer à `design-decisions.md`

---

## Conventions de transfert

- Un répertoire par fonctionnalité : `handoff/feature-<slug>/`
- `spec-annotations.md` doit couvrir : espacement, états (par défaut/survol/focus/désactivé/erreur), comportement responsive
- `edge-cases.md` doit couvrir : état vide, état d'erreur, état de chargement, état avec permissions restreintes
- `acceptance-criteria.md` : chaque critère commence par "Étant donné / Quand / Alors" ou une assertion testable
- `open-questions.md` : chaque élément doit être balisé avec `[ENG]`, `[DESIGN]` ou `[PM]` pour indiquer le responsable

---

## Standards d'accessibilité

- Standard minimum : WCAG 2.2 Niveau AA pour tous les parcours livrés
- Contraste des couleurs : 4,5:1 pour le texte normal, 3:1 pour le grand texte et les composants d'interface
- Éléments interactifs : doivent avoir des indicateurs de focus, être utilisables au clavier et avoir des labels ARIA
- Mouvement : toutes les animations doivent respecter `prefers-reduced-motion`
- Lancer `/accessibility-check` avant chaque transfert

---

## Conventions du système de design

- La documentation des composants se trouve dans `design-system/components/<composant>.md`
- Le journal des décisions utilise le format ADR : Contexte / Décision / Conséquences
- Ne jamais modifier les règles d'utilisation d'un composant sans ajouter une entrée dans `design-system/decision-log.md`
- Zeroheight est la source publiée — `design-system/` est le brouillon de travail

---

## À ne pas faire

- Ne pas écrire les noms des participants dans aucun fichier — utiliser P01, P02, etc.
- Ne pas committer `.env` — les tokens Figma et Notion sont sensibles
- Ne pas créer de packages de transfert sans avoir préalablement lancé `/accessibility-check`
- Ne pas modifier `personas/` sans consigner le changement dans `persona-changelog.md`
- Ne pas décrire l'interface dans `design-decisions.md` — expliquer le raisonnement, pas les pixels
```

## Serveurs MCP

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "@figma/mcp-server"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "your-figma-personal-access-token",
        "FIGMA_TEAM_ID": "your-figma-team-id"
      }
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/notion-mcp-server"],
      "env": {
        "NOTION_API_KEY": "secret_your-notion-integration-token",
        "NOTION_RESEARCH_DB_ID": "your-notion-research-database-id"
      }
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-your-bot-token-here",
        "SLACK_TEAM_ID": "T0XXXXXXXXX"
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
            "command": "bash -c 'if [[ \"$CLAUDE_TOOL_INPUT_FILE_PATH\" == */personas/*.md && \"$CLAUDE_TOOL_INPUT_FILE_PATH\" != */persona-changelog.md ]]; then echo \"[hook] Persona file updated — remember to log this change in persona-changelog.md\" >&2; fi'",
            "async": true
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if [[ \"$CLAUDE_TOOL_INPUT_FILE_PATH\" == */handoff/*/acceptance-criteria.md ]]; then echo \"[hook] Handoff criteria written — run /accessibility-check before marking this feature ready.\" >&2; fi'",
            "async": true
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
            "command": "bash -c 'if [[ \"$CLAUDE_TOOL_INPUT_FILE_PATH\" == */sessions/*-interview-notes.md ]]; then if grep -qiE \"\\b(full name|surname|[A-Z][a-z]+ [A-Z][a-z]+)\\b\" <<< \"$CLAUDE_TOOL_INPUT_NEW_STRING\" 2>/dev/null; then echo \"PII WARNING: possible real name detected in session notes. Use P01, P02, etc. instead.\" >&2; exit 1; fi; fi'"
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
npx uitkit add skill product/ux-researcher
npx uitkit add skill product/usability-report
npx uitkit add skill product/persona-builder
npx uitkit add skill product/competitive-teardown
```

## Ressources associées

- [Guide : Claude pour les designers UX](../guides/for-ux-designer.md)
- [Workflow : De la recherche au transfert](../workflows/research-to-handoff.md)
