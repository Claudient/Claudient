# Espace de travail Product Manager — Structure de projet

> Pour un product manager responsable de la discovery, de la roadmap, de la livraison et des lancements — rédaction de PRD, alignement des parties prenantes, planification de sprint, synthèse de recherche utilisateur, conception d'expériences et analyse concurrentielle, le tout piloté depuis un seul espace de travail Claude Code.

## Stack

- Linear — gestion de la roadmap, suivi des sprints, affinage du backlog, rapports de jalons
- Figma — revue de design, liens de prototypes, références de spécifications design (MCP : figma)
- Notion ou Confluence — PRD, spécifications produit, wikis d'équipe, journaux de décisions
- Amplitude ou Mixpanel — analytics produit, analyse de funnel, adoption des fonctionnalités, suivi de la north star
- Dovetail — référentiel de recherche utilisateur, notes d'entretien, tagging des insights, rapports d'utilisabilité
- Jira — tableaux de sprint enterprise, gestion des tickets, suivi des releases (si requis par l'organisation)
- Slack — communication async avec les parties prenantes, coordination des lancements, communication transverse (MCP : slack)
- Loom — enregistrements de démos async, walkthroughs de fonctionnalités, vidéos de sprint review

## Arborescence

```
product-manager-workspace/
├── .claude/
│   ├── CLAUDE.md                                  # Instructions de l'espace de travail pour Claude Code
│   ├── settings.json                              # Permissions, hooks, configuration des serveurs MCP
│   └── commands/
│       ├── prd-draft.md                           # Rédiger un PRD à partir d'une idée de fonctionnalité — lit les templates, produit une spec complète
│       ├── user-story.md                          # Générer des user stories depuis un PRD ou un brief de fonctionnalité
│       ├── experiment-design.md                   # Concevoir un test A/B ou multivarié — hypothèse, métriques, taille d'échantillon
│       ├── launch-plan.md                         # Construire une checklist de lancement et un plan de communication depuis un PRD
│       ├── competitive-teardown.md                # Décortiquer un produit concurrent — UX, pricing, lacunes de positionnement
│       ├── sprint-review.md                       # Compiler le récit de la sprint review depuis les tickets Linear et les métriques
│       └── discovery-interview.md                 # Générer un guide d'entretien depuis l'objectif de recherche
├── roadmap/
│   ├── quarterly-roadmap-q3-2025.md              # Roadmap Q3 — initiatives, responsables, jalons, statut
│   ├── quarterly-roadmap-q4-2025.md              # Roadmap Q4 (brouillon — non validé)
│   ├── annual-themes-2025.md                     # Thèmes produit annuels — paris stratégiques et justifications
│   ├── feature-backlog.md                        # Backlog de fonctionnalités priorisé — toutes les idées en scope avec scores
│   ├── prioritization-framework.md               # Règles de scoring RICE ou ICE, pondérations, critères de décision
│   ├── now-next-later.md                         # Vue Now / Next / Later — snapshot de l'horizon courant
│   └── deprioritized-log.md                      # Fonctionnalités déprioritisées — raison, date, décideur
├── prds/
│   ├── _prd-template.md                          # Template PRD canonique — sections, responsables, tableau de validation
│   ├── active/
│   │   ├── prd-onboarding-revamp.md              # PRD — refonte du parcours d'onboarding (en développement)
│   │   ├── prd-bulk-export.md                    # PRD — fonctionnalité d'export en masse (en revue de spec)
│   │   ├── prd-notification-center.md            # PRD — centre de notifications v2 (en design)
│   │   └── prd-api-rate-limiting.md              # PRD — limitation de débit et gestion des quotas API
│   ├── shipped/
│   │   ├── prd-search-v2.md                      # PRD — search v2 (livré 2025-04)
│   │   ├── prd-team-permissions.md               # PRD — permissions au niveau équipe (livré 2025-02)
│   │   └── prd-csv-import.md                     # PRD — import CSV (livré 2025-01)
│   └── archived/
│       ├── prd-mobile-app-v1.md                  # PRD — app mobile v1 (annulé — pivot vers web-first)
│       └── prd-ai-assistant-spike.md             # PRD — spike assistant IA (fusionné dans le PRD onboarding)
├── research/
│   ├── _interview-guide-template.md              # Template canonique de guide d'entretien utilisateur
│   ├── interviews/
│   │   ├── 2025-05-onboarding-study/
│   │   │   ├── research-plan.md                  # Objectif de recherche, critères de participants, script
│   │   │   ├── participant-screener.md           # Questions de screening pour le recrutement
│   │   │   ├── notes-p1-2025-05-12.md            # Notes d'entretien — participant 1
│   │   │   ├── notes-p2-2025-05-13.md            # Notes d'entretien — participant 2
│   │   │   ├── notes-p3-2025-05-14.md            # Notes d'entretien — participant 3
│   │   │   ├── notes-p4-2025-05-15.md            # Notes d'entretien — participant 4
│   │   │   ├── notes-p5-2025-05-16.md            # Notes d'entretien — participant 5
│   │   │   └── synthesis-report.md               # Insights synthétisés, thèmes, citations, recommandations
│   │   └── 2025-03-churn-investigation/
│   │       ├── research-plan.md                  # Plan de recherche — étude des causes de churn
│   │       ├── notes-p1-2025-03-04.md            # Notes d'entretien
│   │       └── synthesis-report.md               # Synthèse — 5 thèmes principaux de churn, matrice de sévérité
│   ├── surveys/
│   │   ├── nps-q2-2025-results.md                # Résultats de l'enquête NPS — score, verbatims, répartition par segment
│   │   ├── onboarding-csat-2025-05.md            # Résultats et thèmes de l'enquête CSAT onboarding
│   │   └── feature-prioritization-survey.md      # Enquête de priorisation des fonctionnalités classées par les utilisateurs (n=240)
│   ├── usability/
│   │   ├── usability-bulk-export-2025-05.md      # Test d'utilisabilité — parcours d'export en masse (5 participants)
│   │   └── usability-onboarding-2025-04.md       # Test d'utilisabilité — nouvel onboarding (7 participants)
│   └── personas/
│       ├── persona-power-user.md                 # Persona power user — objectifs, frustrations, contexte, citations
│       ├── persona-occasional-user.md            # Persona utilisateur occasionnel
│       └── persona-admin.md                      # Persona admin/acheteur — critères d'évaluation, objections
├── experiments/
│   ├── _experiment-template.md                   # Document d'expérience canonique — hypothèse, métriques, design, résultats
│   ├── active/
│   │   ├── exp-042-onboarding-checklist.md       # En cours : test checklist d'onboarding vs. état vide
│   │   └── exp-043-pricing-page-cta.md           # En cours : test du texte du CTA sur la page de pricing
│   ├── completed/
│   │   ├── exp-039-search-ranking.md             # Terminé : test d'algorithme de ranking de recherche — +12% clics P1
│   │   ├── exp-040-email-nudge-timing.md         # Terminé : test du timing des relances email — pas de résultat significatif
│   │   └── exp-041-trial-length.md               # Terminé : essai 14 vs 30 jours — 30 jours gagne (p=0.03)
│   └── hypothesis-backlog.md                     # Hypothèses non testées — classées par impact attendu
├── launches/
│   ├── _launch-checklist-template.md             # Checklist de lancement canonique — engineering, design, communication, support
│   ├── active/
│   │   ├── launch-bulk-export/
│   │   │   ├── launch-plan.md                    # Plan de lancement complet — calendrier, responsables, risques, déploiement
│   │   │   ├── comms-plan.md                     # Plan de communication — notes de version, blog, in-app, email, Slack
│   │   │   ├── support-brief.md                  # Brief support — FAQ, cas limites, limitations connues
│   │   │   └── go-nogo-checklist.md              # Checklist de décision go/no-go pour le jour du lancement
│   │   └── launch-notification-center/
│   │       ├── launch-plan.md                    # Plan de lancement — centre de notifications v2
│   │       └── comms-plan.md                     # Plan de communication — centre de notifications v2
│   └── shipped/
│       ├── launch-search-v2-2025-04.md           # Rétrospective du lancement search v2 et métriques à 30 jours
│       └── launch-team-permissions-2025-02.md    # Rétrospective du lancement permissions équipe
├── competitive/
│   ├── landscape-overview.md                     # Paysage concurrentiel — matrice de positionnement, différenciateurs clés
│   ├── competitor-profiles/
│   │   ├── competitor-acme-corp.md               # Profil concurrent — Acme Corp (concurrent principal)
│   │   ├── competitor-rival-io.md                # Profil concurrent — Rival.io (menace émergente)
│   │   └── competitor-legacy-enterprise.md       # Profil concurrent — Legacy Enterprise (acteur établi)
│   ├── teardowns/
│   │   ├── teardown-acme-onboarding-2025-05.md   # Analyse UX — parcours d'onboarding d'Acme Corp
│   │   ├── teardown-rival-pricing-2025-04.md     # Analyse pricing — page de tarifs et offres de Rival.io
│   │   └── teardown-legacy-api-2025-03.md        # Analyse API — expérience développeur de Legacy Enterprise
│   └── battlecards/
│       ├── battlecard-acme-corp.md               # Battlecard commercial — objections, différenciateurs, pièges
│       └── battlecard-rival-io.md                # Battlecard commercial — Rival.io
└── metrics/
    ├── north-star.md                             # Métrique north star — définition, valeur actuelle, cible, responsable
    ├── product-health-dashboard.md               # Snapshot hebdomadaire de la santé produit — tous les KPI clés
    ├── feature-success-metrics/
    │   ├── metrics-onboarding-revamp.md          # Métriques de succès — refonte onboarding (taux d'activation, TTV)
    │   ├── metrics-bulk-export.md                # Métriques de succès — export en masse (adoption, fréquence d'utilisation)
    │   └── metrics-notification-center.md        # Métriques de succès — centre de notifications (taux d'ouverture, CTR)
    ├── amplitude-queries/
    │   ├── query-activation-funnel.md            # Requête Amplitude sauvegardée — étapes du funnel d'activation
    │   ├── query-feature-adoption.md             # Requête Amplitude sauvegardée — adoption des fonctionnalités par cohorte
    │   └── query-retention-by-segment.md         # Requête Amplitude sauvegardée — rétention D1/D7/D30 par segment
    └── retrospectives/
        ├── metrics-review-q2-2025.md             # Rétrospective métriques Q2 — succès, manques, apprentissages
        └── metrics-review-q1-2025.md             # Rétrospective métriques Q1
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `.claude/commands/prd-draft.md` | Commande slash qui prend une idée de fonctionnalité, lit `prds/_prd-template.md`, `roadmap/prioritization-framework.md` et les fichiers de personas pertinents, puis produit un PRD complet avec énoncé du problème, objectifs, user stories, exigences, métriques de succès et questions ouvertes |
| `.claude/commands/experiment-design.md` | Commande slash qui lit `experiments/_experiment-template.md` et le PRD concerné, puis produit une expérience entièrement conçue avec hypothèse, définition du contrôle/variant, métriques primaires et de garde-fou, effet minimal détectable et taille d'échantillon estimée |
| `.claude/commands/launch-plan.md` | Commande slash qui lit le PRD actif et `launches/_launch-checklist-template.md`, puis génère un plan de lancement avec calendrier, responsables transverses, plan de communication, brief support et critères go/no-go |
| `roadmap/prioritization-framework.md` | Règles de scoring et pondérations pour RICE ou ICE — utilisé par Claude pour classer les éléments du backlog ou répondre aux questions « doit-on construire ceci ? » ; garantit une cohérence du scoring d'un trimestre à l'autre |
| `prds/active/` | Un fichier par fonctionnalité en cours — les PRD ici sont des documents vivants mis à jour à mesure que les décisions évoluent ; ne jamais supprimer, utiliser `archived/` pour les fonctionnalités annulées |
| `research/personas/persona-power-user.md` | Persona de référence citée dans les PRD et les hypothèses d'expérience — mis à jour après chaque cycle de recherche majeur |
| `experiments/hypothesis-backlog.md` | Hypothèses non testées classées par impact attendu — Claude lit ce fichier lorsqu'on lui demande de prioriser la roadmap d'expérimentation |
| `metrics/north-star.md` | Définition autoritaire unique de la métrique north star — Claude lit ce fichier avant toute analyse de métriques pour garantir un cadrage cohérent |
| `competitive/landscape-overview.md` | Matrice de positionnement actuelle — Claude lit ce fichier lors de la rédaction d'analyses concurrentielles ou de battlecards pour éviter de contredire le positionnement existant |
| `launches/active/` | Un sous-répertoire par lancement en cours, contenant chacun le plan de lancement, le plan de communication, le brief support et la checklist go/no-go sous forme de fichiers séparés |

## Scaffold rapide

```bash
# Créer la racine de l'espace de travail
mkdir -p product-manager-workspace
cd product-manager-workspace

# Créer la structure .claude
mkdir -p .claude/commands

# Créer tous les répertoires de l'espace de travail
mkdir -p roadmap
mkdir -p prds/active
mkdir -p prds/shipped
mkdir -p prds/archived
mkdir -p research/interviews
mkdir -p research/surveys
mkdir -p research/usability
mkdir -p research/personas
mkdir -p experiments/active
mkdir -p experiments/completed
mkdir -p launches/active
mkdir -p launches/shipped
mkdir -p competitive/competitor-profiles
mkdir -p competitive/teardowns
mkdir -p competitive/battlecards
mkdir -p metrics/feature-success-metrics
mkdir -p metrics/amplitude-queries
mkdir -p metrics/retrospectives

# Initialiser les fichiers templates et d'ancrage clés
touch prds/_prd-template.md
touch research/_interview-guide-template.md
touch experiments/_experiment-template.md
touch launches/_launch-checklist-template.md
touch roadmap/prioritization-framework.md
touch roadmap/feature-backlog.md
touch roadmap/now-next-later.md
touch roadmap/deprioritized-log.md
touch metrics/north-star.md
touch metrics/product-health-dashboard.md
touch competitive/landscape-overview.md

# Initialiser les fichiers de commandes .claude
touch .claude/commands/prd-draft.md
touch .claude/commands/user-story.md
touch .claude/commands/experiment-design.md
touch .claude/commands/launch-plan.md
touch .claude/commands/competitive-teardown.md
touch .claude/commands/sprint-review.md
touch .claude/commands/discovery-interview.md

# Initialiser le CLAUDE.md
touch .claude/CLAUDE.md
touch .claude/settings.json

# Installer les skills Claude Code
npx uitkit add skill product/product-roadmap
npx uitkit add skill product/user-story-writer
npx uitkit add skill product/product-discovery
npx uitkit add skill product/experiment-designer
npx uitkit add skill product/competitive-teardown
npx uitkit add skill product/persona-builder
npx uitkit add skill product/product-analytics
npx uitkit add skill product/product-strategist
```

## Template CLAUDE.md

```markdown
# Espace de travail Product Manager

Cet espace de travail accompagne un product manager responsable de la discovery, de la roadmap,
de la livraison et des lancements. Claude Code lit le contexte depuis des fichiers structurés
pour produire des sorties précises et spécifiques au produit — pas des conseils PM génériques.
Toujours lire les fichiers sources référencés avant de générer tout document.

---

## Ce qu'est cet espace

Un espace de travail Claude Code pour un PM. Chaque répertoire correspond à un flux de travail PM
central : priorisation de la roadmap, rédaction de PRD, synthèse de recherche utilisateur, conception
d'expériences, coordination des lancements, analyse concurrentielle et suivi des métriques. Claude lit
ces fichiers et produit brouillons, analyses et sorties structurées dans la même arborescence.

---

## Stack

- Linear — roadmap et suivi des sprints (MCP : linear)
- Figma — revue de design et références de spec (MCP : figma)
- Notion ou Confluence — PRD et documentation d'équipe
- Amplitude ou Mixpanel — analytics produit, funnels, rétention
- Dovetail — référentiel de recherche utilisateur et tagging des insights
- Jira — tableaux de sprint enterprise (si requis par l'organisation)
- Slack — communication avec les parties prenantes et coordination des lancements (MCP : slack)
- Loom — enregistrements de démos async et sprint reviews

---

## Conventions des répertoires

- `roadmap/` — Les fichiers de roadmap sont nommés par trimestre : `quarterly-roadmap-Q3-2025.md`.
  `prioritization-framework.md` est la source de vérité pour les décisions de scoring. Ne jamais
  supprimer les éléments déprioritisés — les consigner dans `deprioritized-log.md` avec raison et date.
- `prds/` — Un fichier par fonctionnalité. Les PRD actifs se trouvent dans `active/`, les livrés dans
  `shipped/`, les annulés dans `archived/`. Utiliser `_prd-template.md` pour chaque nouveau PRD.
  Ne pas sauter de sections.
- `research/` — Les notes d'entretien vont dans `interviews/<nom-etude>/notes-p<n>-YYYY-MM-DD.md`.
  Chaque étude nécessite un `research-plan.md` et un `synthesis-report.md` avant clôture.
- `experiments/` — Expériences actives dans `active/`, terminées dans `completed/`. Tout document
  d'expérience doit inclure hypothèse, métriques, justification de la taille d'échantillon et résultats.
  Les résultats nuls ne sont pas des échecs — les classer correctement dans `completed/`.
- `launches/` — Chaque lancement dispose de son propre sous-répertoire dans `active/`. Un répertoire
  de lancement doit contenir : `launch-plan.md`, `comms-plan.md`, `support-brief.md`, `go-nogo-checklist.md`.
  Déplacer dans `shipped/` avec une note de rétrospective après le lancement.
- `competitive/` — `landscape-overview.md` est mis à jour chaque trimestre. Les analyses sont des
  snapshots ponctuels — les nommer `teardown-<concurrent>-<domaine>-YYYY-MM.md`.
- `metrics/` — `north-star.md` définit la métrique north star unique. Ne jamais contredire cette
  définition dans les documents d'expérience ou les sections de métriques de succès des PRD.

---

## Tâches courantes — commandes exactes

### PRD et specs
```
/prd-draft                — Rédiger un PRD depuis une idée de fonctionnalité en utilisant le template canonique
/user-story               — Générer des user stories depuis un PRD ou un brief
```

### Recherche
```
/discovery-interview      — Générer un guide d'entretien depuis l'objectif de recherche et le persona
```

### Expériences
```
/experiment-design        — Concevoir un test A/B ou multivarié avec hypothèse et taille d'échantillon
```

### Lancements
```
/launch-plan              — Construire une checklist de lancement et un plan de communication depuis le PRD actif
```

### Concurrentiel
```
/competitive-teardown     — Décortiquer un produit concurrent — UX, pricing, lacunes de positionnement
```

### Rythme des sprints
```
/sprint-review            — Compiler le récit de la sprint review depuis les tickets Linear et les métriques
```

---

## Conventions que Claude doit respecter

- Toujours lire `roadmap/prioritization-framework.md` avant de scorer ou classer des fonctionnalités.
  Ne pas inventer une méthodologie de scoring.
- Toujours lire `metrics/north-star.md` avant de rédiger des métriques de succès dans un PRD ou une
  expérience. Les métriques de succès doivent s'aligner sur la north star.
- Les PRD doivent suivre exactement `prds/_prd-template.md` — ne pas sauter la section des questions
  ouvertes ni le tableau de validation.
- Les hypothèses d'expérience doivent respecter le format : « Nous croyons que [changement] entraînera
  [résultat] pour [segment d'utilisateurs], mesuré par [métrique], parce que [justification]. »
- Les rapports de synthèse de recherche doivent distinguer les citations directes des thèmes inférés.
  Les citations utilisent des guillemets et un identifiant de participant (ex. P3). Les thèmes
  n'utilisent pas de guillemets.
- Les analyses concurrentielles doivent lire `competitive/landscape-overview.md` en premier pour éviter
  de contredire le positionnement existant.
- Les fichiers de personas dans `research/personas/` sont les descriptions canoniques des utilisateurs.
  Les référencer par nom dans les PRD et hypothèses d'expérience — ne pas inventer de nouveaux personas
  en ligne.
- Ne jamais rédiger une recommandation de mise en production sans avoir lu le `go-nogo-checklist.md`
  du lancement concerné.
```

## Serveurs MCP

```json
{
  "mcpServers": {
    "linear": {
      "command": "npx",
      "args": ["-y", "@linear/mcp-server"],
      "env": {
        "LINEAR_API_KEY": "${LINEAR_API_KEY}"
      }
    },
    "figma": {
      "command": "npx",
      "args": ["-y", "@figma/mcp-server"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "${FIGMA_ACCESS_TOKEN}"
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
        "/Users/you/product-manager-workspace"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"prds/active/\" && echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"prd-\"; then echo \"[PRD hook] PRD written — confirm sign-off table is populated and success metrics reference metrics/north-star.md.\"; fi'"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"experiments/completed/\"; then echo \"[Experiment hook] Experiment filed as completed — confirm results section includes p-value or confidence interval and a ship/iterate/kill recommendation.\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'echo \"[Session end] If you updated roadmap/feature-backlog.md or metrics/north-star.md, confirm changes align with the current quarter roadmap and stakeholders have been notified.\"'"
          }
        ]
      }
    ]
  }
}
```

## Skills à installer

```bash
npx uitkit add skill product/product-roadmap
npx uitkit add skill product/user-story-writer
npx uitkit add skill product/product-discovery
npx uitkit add skill product/experiment-designer
npx uitkit add skill product/competitive-teardown
npx uitkit add skill product/persona-builder
npx uitkit add skill product/product-analytics
npx uitkit add skill product/product-strategist
```

## En lien

- [Guide : Claude pour les Product Managers](../guides/for-product-manager.md)
- [Workflow : Rédaction de PRD](../workflows/prd-writing.md)
- [Workflow : Coordination des lancements](../workflows/launch-coordination.md)
- [Workflow : Synthèse de recherche utilisateur](../workflows/user-research-synthesis.md)
