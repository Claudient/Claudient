# Espace de travail CTO / VP Engineering — Structure de projet

> Pour un CTO ou VP Engineering qui dirige une organisation d'ingénierie : décisions d'architecture, feuille de route technique, recrutement, santé d'équipe, revues d'incidents, évaluation des fournisseurs et reporting au conseil d'administration — le tout piloté depuis un seul espace de travail Claude Code.

## Stack

- Linear — tickets, suivi de projet, feuille de route trimestrielle
- GitHub — code, PRs, métriques d'ingénierie via GitHub Insights
- Datadog — observabilité, SLOs, surveillance des incidents, tableaux de bord
- PagerDuty — plannings d'astreinte, alertes d'incidents, déclencheurs de postmortems
- Notion — documents de stratégie, wikis d'équipe, journaux de décisions
- Lattice ou Leapsome — entretiens d'évaluation, notes de 1:1, enquêtes d'engagement
- Greenhouse — offres d'emploi, pipelines de candidats, fiches d'évaluation d'entretien
- Slack — communication asynchrone, salles de crise d'incidents, standups

## Arborescence du projet

```
cto-workspace/
├── .claude/
│   ├── CLAUDE.md                        # Instructions de l'espace de travail pour Claude Code
│   ├── settings.json                    # Permissions, hooks, configuration MCP
│   └── commands/
│       ├── arch-review.md               # Revue d'architecture — analyse des compromis, risques, brouillon d'ADR
│       ├── hiring-plan.md               # Plan d'effectifs — définition de rôle, calendrier, estimation budgétaire
│       ├── incident-review.md           # Modèle de postmortem — chronologie, cause racine, actions correctives
│       ├── team-health.md               # Instantané de santé d'équipe — moral, vélocité, risque d'attrition
│       ├── vendor-eval.md               # Matrice d'évaluation fournisseur — scoring des critères, recommandation
│       ├── eng-metrics.md               # Rapport de métriques d'ingénierie — DORA, cycle time, couverture
│       ├── board-update.md              # Mise à jour conseil — santé technique, risques, avancement de la feuille de route
│       └── build-vs-buy.md              # Analyse faire ou acheter — coût, risque, recommandation
├── decisions/                           # Architecture Decision Records (ADRs)
│   ├── README.md                        # Index des ADRs et légende des statuts
│   ├── adr-template.md                  # Modèle canonique d'ADR
│   ├── 0001-monorepo-vs-polyrepo.md     # Accepté — monorepo avec Turborepo
│   ├── 0002-service-mesh-selection.md   # Accepté — Istio sur GKE
│   ├── 0003-event-streaming-platform.md # Accepté — Kafka plutôt que SQS pour les garanties d'ordre
│   ├── 0004-auth-provider.md            # Proposé — comparaison Auth0 vs Clerk
│   └── 0005-data-warehouse.md           # Brouillon — BigQuery vs Snowflake
├── roadmap/
│   ├── q3-2025-tech-roadmap.md          # Feuille de route trimestrielle — initiatives, responsables, jalons
│   ├── q4-2025-tech-roadmap.md          # Brouillon du prochain trimestre
│   ├── 2025-annual-tech-plan.md         # Stratégie d'ingénierie annuelle et domaines d'investissement
│   ├── tech-vision-2026.md              # Document de vision prospectif sur 18 mois
│   └── initiative-tracker.md           # Initiatives actives avec statut et blocages
├── hiring/
│   ├── headcount-plan-2025.md           # Effectifs approuvés, budget, calendrier par rôle
│   ├── job-descriptions/
│   │   ├── staff-engineer.md            # Fiche de poste — Ingénieur Staff
│   │   ├── senior-sre.md                # Fiche de poste — Ingénieur Senior SRE
│   │   ├── em-platform.md              # Fiche de poste — Engineering Manager, Plateforme
│   │   └── principal-architect.md       # Fiche de poste — Architecte Principal
│   ├── interview-rubrics/
│   │   ├── system-design-rubric.md      # Guide de notation pour les tours de conception système
│   │   ├── coding-rubric.md             # Guide de notation pour les tours de code
│   │   ├── leadership-rubric.md         # Guide de notation pour les entretiens comportementaux EM/principal
│   │   └── staff-calibration.md        # Notes de calibration pour le niveau staff
│   └── pipeline-notes/
│       ├── active-roles.md              # Postes ouverts actuels et métriques d'entonnoir
│       └── offer-log.md                 # Historique des offres, fourchettes de rémunération, taux d'acceptation
├── incidents/
│   ├── postmortem-template.md           # Modèle canonique de postmortem
│   ├── 2025-06-01-payments-outage.md    # P0 — service de paiement indisponible pendant 47 minutes
│   ├── 2025-05-14-data-pipeline-lag.md  # P1 — retard d'ingestion ayant causé des données de tableau de bord obsolètes
│   ├── 2025-04-22-cert-expiry.md        # P2 — certificat TLS expiré sur le proxy de staging
│   └── action-items-tracker.md         # Actions ouvertes issues de tous les postmortems
├── metrics/
│   ├── eng-kpis-dashboard.md            # Métriques DORA, cycle time, fréquence de déploiement
│   ├── reliability-scorecard.md         # Atteinte des SLOs par service, consommation du budget d'erreur
│   ├── on-call-burden.md               # Pages par ingénieur, taux de faux positifs, MTTRS
│   ├── pr-health.md                     # Délai de revue des PRs, PRs obsolètes, distribution des contributeurs
│   └── quarterly-report-q2-2025.md     # Métriques trimestrielles compilées pour le dossier conseil
├── org/
│   ├── team-structure.md                # Organigramme actuel — équipes, tech leads, EMs
│   ├── capacity-plan-q3.md              # Analyse effectifs vs capacité de travail
│   ├── skill-matrix.md                  # Carte des compétences d'ingénierie par équipe
│   ├── succession-plan.md               # Risques liés aux personnes clés et responsables de secours
│   └── team-health-surveys/
│       ├── q1-2025-results.md           # Résultats et thèmes du sondage Lattice
│       └── q2-2025-results.md           # Résumé du sondage le plus récent
└── vendors/
    ├── evaluation-template.md           # Matrice standard de notation fournisseur
    ├── datadog-vs-grafana-cloud.md      # Évaluation terminée — Datadog retenu
    ├── launchdarkly-vs-flagsmith.md     # Évaluation terminée — LaunchDarkly retenu
    ├── okta-vs-auth0.md                 # En cours
    └── approved-vendor-list.md          # Fournisseurs actuels, dates de contrat, responsables de renouvellement
```

## Fichiers clés expliqués

| Chemin | Objectif |
|---|---|
| `.claude/commands/arch-review.md` | Commande slash qui extrait le contexte depuis `decisions/` et produit une analyse structurée des compromis avec un brouillon d'ADR prêt à soumettre |
| `.claude/commands/board-update.md` | Commande slash qui compile `metrics/quarterly-report-*.md` et `roadmap/` en un résumé de santé technique prêt pour le conseil |
| `.claude/commands/incident-review.md` | Commande slash qui génère un postmortem depuis un identifiant d'incident PagerDuty, en remplissant la chronologie et en listant les services impliqués |
| `decisions/adr-template.md` | Modèle canonique d'ADR : contexte, facteurs de décision, options envisagées, décision, conséquences, statut |
| `roadmap/q3-2025-tech-roadmap.md` | Feuille de route trimestrielle vivante avec responsables d'initiative, jalons, dépendances et risques — mise à jour hebdomadaire |
| `metrics/eng-kpis-dashboard.md` | Métriques DORA, cycle time, fréquence de déploiement et taux d'échec des changements compilés depuis GitHub + Datadog |
| `org/capacity-plan-q3.md` | Modèle effectifs vs capacité de livraison : vélocité d'équipe, travail planifié, analyse des écarts, besoins en recrutement |
| `incidents/postmortem-template.md` | Postmortem standard avec sévérité, chronologie, cause racine, facteurs contributifs, actions correctives et attribution des responsables |
| `vendors/evaluation-template.md` | Matrice de notation pondérée pour les évaluations fournisseurs : critères, pondérations, scores par fournisseur, section recommandation |
| `hiring/headcount-plan-2025.md` | Plan d'effectifs approuvé par le conseil avec rôle, équipe, trimestre de début, coût chargé et statut du recrutement par ligne |

## Scaffold rapide

```bash
# Créer la racine de l'espace de travail
mkdir -p cto-workspace
cd cto-workspace

# Créer la structure .claude
mkdir -p .claude/commands

# Créer les répertoires de l'espace de travail
mkdir -p decisions
mkdir -p roadmap
mkdir -p hiring/job-descriptions
mkdir -p hiring/interview-rubrics
mkdir -p hiring/pipeline-notes
mkdir -p incidents
mkdir -p metrics
mkdir -p org/team-health-surveys
mkdir -p vendors

# Initialiser les fichiers clés
touch decisions/README.md decisions/adr-template.md
touch roadmap/initiative-tracker.md
touch hiring/headcount-plan-2025.md
touch incidents/postmortem-template.md incidents/action-items-tracker.md
touch metrics/eng-kpis-dashboard.md metrics/reliability-scorecard.md
touch org/team-structure.md org/capacity-plan-q3.md org/skill-matrix.md
touch vendors/evaluation-template.md vendors/approved-vendor-list.md

# Installer les skills Claude Code
npx uitkit add skill productivity/engineering-strategy
npx uitkit add skill productivity/adr-writer
npx uitkit add skill productivity/tech-debt-tracker
npx uitkit add skill productivity/build-optimization
npx uitkit add skill productivity/vendor-evaluator
npx uitkit add skill devops-infra/platform-engineering
npx uitkit add skill devops-infra/monorepo

# Installer les commandes slash
npx uitkit add command arch-review
npx uitkit add command hiring-plan
npx uitkit add command incident-review
npx uitkit add command team-health
npx uitkit add command vendor-eval
npx uitkit add command eng-metrics
npx uitkit add command board-update
npx uitkit add command build-vs-buy
```

## Modèle CLAUDE.md

```markdown
# Espace de travail CTO / VP Engineering

Cet espace de travail soutient le travail de direction technique : décisions d'architecture, feuille de route
technique, recrutement, santé d'équipe, revues d'incidents, évaluation des fournisseurs et reporting au conseil.

---

## Ce qu'il contient

Un espace de travail Claude Code structuré pour un CTO ou VP Engineering. Chaque répertoire correspond à une
responsabilité de direction distincte. Claude Code lit le contexte depuis ces fichiers pour produire
des résultats précis et spécifiques à l'organisation — pas des conseils génériques.

---

## Stack

- Linear — tickets et feuille de route trimestrielle (MCP: linear)
- GitHub — code, PRs, métriques org (MCP: github)
- Datadog — SLOs, observabilité, données d'astreinte
- PagerDuty — alertes d'incidents et déclencheurs de postmortems
- Notion — documents de stratégie et wikis d'équipe
- Lattice / Leapsome — entretiens d'évaluation et enquêtes d'engagement
- Greenhouse — pipeline de recrutement et fiches d'évaluation d'entretien
- Slack — communication asynchrone et salles de crise d'incidents (MCP: slack)

---

## Conventions de répertoires

- `decisions/` — Tous les ADRs se trouvent ici. Utiliser des IDs séquentiels (0001, 0002). Statut : Proposé | Accepté | Déprécié | Remplacé.
- `roadmap/` — Un fichier par trimestre. Archiver après la clôture du trimestre. `initiative-tracker.md` reste à jour.
- `hiring/` — Les fiches de poste vont dans `job-descriptions/`, les grilles d'entretien dans `interview-rubrics/`. Ne jamais mettre de données personnelles de candidats ici.
- `incidents/` — Un fichier par incident. Format du nom de fichier : `YYYY-MM-DD-description-courte.md`. Toujours consigner les actions dans `action-items-tracker.md`.
- `metrics/` — Instantanés de métriques brutes et rapports compilés. Les rapports trimestriels alimentent directement les mises à jour du conseil.
- `org/` — Structure d'équipe, plans de capacité, matrice de compétences. Mettre à jour `team-structure.md` à chaque changement de hiérarchie.
- `vendors/` — Un fichier d'évaluation par décision. Archiver les évaluations terminées ; maintenir `approved-vendor-list.md` à jour.

---

## Tâches courantes — commandes exactes

### Décisions d'architecture
```
/arch-review — Coller le contexte de la décision. Claude rédige une analyse des compromis et un ADR prêt à soumettre dans decisions/.
/adr-writer  — Rédiger un ADR de zéro. Demande le contexte, les options et les conséquences.
```

### Recrutement
```
/hiring-plan    — Produit une définition de rôle, une structure d'entretien et une justification d'effectif pour un nouveau poste.
/tech-interview-kit — Génère des défis de code, des sujets de conception système et des grilles d'évaluation pour un rôle spécifique.
```

### Incidents
```
/incident-review — Coller l'identifiant d'incident PagerDuty ou la chronologie. Génère un brouillon de postmortem avec cause racine et actions correctives.
```

### Santé d'équipe
```
/team-health — Résume les résultats d'enquête, les signaux d'attrition et les indicateurs de moral en un plan d'action de direction.
```

### Fournisseurs
```
/vendor-eval   — Évaluation structurée d'un fournisseur selon des critères pondérés. Produit un mémo de recommandation.
/build-vs-buy  — Analyse faire ou acheter : coût, risque, adéquation stratégique, délai de valeur, recommandation.
```

### Métriques et reporting
```
/eng-metrics   — Compile les métriques DORA, le cycle time et les données SLO en un rapport de santé de l'ingénierie.
/board-update  — Assemble le résumé trimestriel de santé technique, l'avancement de la feuille de route et le registre des risques pour le conseil.
```

---

## Conventions que Claude doit respecter

- Lors de la rédaction d'ADRs, toujours utiliser le modèle `decisions/adr-template.md` — ne pas inventer de structure.
- Lors de la référence aux métriques, consulter d'abord les fichiers `metrics/`. Ne pas fabriquer de chiffres.
- Les postmortems sont sans reproche. Ne jamais attribuer une faute à un individu dans `incidents/`.
- Les données d'effectifs et de rémunération dans `hiring/headcount-plan-2025.md` sont confidentielles — ne pas inclure dans les mises à jour du conseil sauf demande explicite.
- Les jalons de feuille de route dans `roadmap/` font foi — ne pas les contredire dans les résumés.
- Toutes les évaluations fournisseurs doivent inclure un tableau de scores pondérés avant une recommandation.
```

## Serveurs MCP

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "linear": {
      "command": "npx",
      "args": ["-y", "@linear/mcp-server"],
      "env": {
        "LINEAR_API_KEY": "${LINEAR_API_KEY}"
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
        "/Users/you/cto-workspace"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"decisions/\"; then echo \"[ADR hook] New decision filed — update decisions/README.md index\"; fi'"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"incidents/\" && ! echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"postmortem-template\"; then echo \"[Incident hook] Filing incident — ensure action items are added to incidents/action-items-tracker.md\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'echo \"[Session end] If you drafted an ADR or postmortem, confirm it has been filed and linked from the relevant index file.\"'"
          }
        ]
      }
    ]
  }
}
```

## Skills à installer

```bash
npx uitkit add skill productivity/engineering-strategy
npx uitkit add skill productivity/adr-writer
npx uitkit add skill productivity/tech-debt-tracker
npx uitkit add skill productivity/build-optimization
npx uitkit add skill productivity/vendor-evaluator
npx uitkit add skill productivity/tech-interview-kit
npx uitkit add skill productivity/exec-briefing
npx uitkit add skill devops-infra/platform-engineering
npx uitkit add skill devops-infra/monorepo
npx uitkit add skill devops-infra/oncall-runbook
npx uitkit add skill devops-infra/capacity-planner
```

## Voir aussi

- [Guide : Claude pour les CTOs et Tech Leads](../guides/for-cto.md)
- [Workflow : CTO Weekly](../workflows/cto-weekly.md)
- [Workflow : Réponse aux incidents](../workflows/incident-response.md)
- [Workflow : Pipeline de recrutement](../workflows/recruiting-pipeline.md)
