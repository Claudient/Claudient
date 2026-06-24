# Espace de travail Ingénieur Logiciel — Structure de projet

> Pour un ingénieur logiciel effectuant le développement de fonctionnalités au quotidien, la revue de code, le débogage, les décisions d'architecture et la documentation — optimisant le cycle complet du ticket à la PR fusionnée.

## Stack

- **Contrôle de version :** GitHub (hébergement de code, PRs, Actions CI)
- **Suivi des tâches :** Linear ou Jira (gestion des tickets, planification de sprint)
- **IDE :** VS Code ou Cursor avec l'extension Claude Code
- **Conteneurisation :** Docker 25+ avec Docker Compose pour les environnements de développement local
- **Observabilité :** Datadog (APM, logs, traces) ou Sentry (suivi des erreurs, rejeu de session)
- **Documentation :** Notion ou Confluence (wiki d'équipe, runbooks, onboarding)
- **Communication :** Slack (communications asynchrones, intégrations GitHub/Linear)
- **Runtime :** Node.js 20+ / Python 3.12+ / Go 1.22+ selon le service
- **Tests :** Jest / pytest / Go test avec rapport de couverture
- **Linting/formatage :** ESLint + Prettier / Ruff / gofmt appliqués en pré-commit

## Arborescence de répertoires

```
software-engineer-workspace/
├── .claude/
│   ├── CLAUDE.md                           # Instructions de l'espace de travail pour Claude Code
│   ├── settings.json                       # Serveurs MCP, hooks, permissions
│   └── commands/
│       ├── spec-to-code.md                 # /spec-to-code — prend une spec/ticket, génère un plan d'implémentation
│       ├── code-review.md                  # /code-review — examine le diff actuel pour détecter bugs et améliorations
│       ├── debug.md                        # /debug — prend un message d'erreur ou un comportement inattendu, trace la cause racine
│       ├── test-write.md                   # /test-write — génère des tests unitaires et d'intégration pour le code modifié
│       ├── pr-description.md               # /pr-description — rédige le titre, le résumé et le plan de test depuis git diff
│       ├── refactor.md                     # /refactor — identifie et applique des refactorisations sûres sans changer le comportement
│       └── arch-sketch.md                  # /arch-sketch — produit un brouillon d'ADR ou une esquisse de conception système
├── specs/
│   ├── _template.md                        # Format de spec canonique : objectif, non-objectifs, forme de l'API, cas limites
│   ├── 2025-06-user-notifications/
│   │   ├── spec.md                         # Spec de fonctionnalité avant le début du développement
│   │   ├── api-contract.md                 # Brouillon de schéma OpenAPI ou GraphQL
│   │   └── edge-cases.md                  # Cas limites identifiés et modes de défaillance
│   ├── 2025-05-search-refactor/
│   │   ├── spec.md
│   │   └── migration-plan.md               # Migration étape par étape avec stratégie de rollback
│   └── 2025-04-rate-limiting/
│       └── spec.md
├── decisions/
│   ├── _template.md                        # Format ADR : contexte, décision, conséquences, alternatives
│   ├── 001-database-choice.md              # ADR : pourquoi PostgreSQL plutôt que MongoDB
│   ├── 002-api-versioning-strategy.md      # ADR : versionnage par URL vs versionnage par en-tête
│   ├── 003-caching-layer.md                # ADR : Redis vs cache en mémoire de processus
│   ├── 004-auth-mechanism.md               # ADR : JWT vs tokens opaques, stratégie de rafraîchissement
│   └── 005-monorepo-vs-polyrepo.md         # ADR : justification de la stratégie de dépôt actuelle
├── debugging/
│   ├── _template.md                        # Format de session de débogage : symptôme, hypothèse, résultats, correctif
│   ├── 2025-06-01-memory-leak-api.md       # Session de bug complexe : croissance du tas Node.js dans /api/search
│   ├── 2025-05-14-slow-query-orders.md     # Session : requête N+1 tracée via Datadog APM
│   └── 2025-04-22-race-condition-jobs.md   # Session : race condition de déduplication de jobs sous charge
├── learning/
│   ├── postgres-jsonb-indexing.md          # Notes : performances des index GIN vs GiST pour les requêtes JSONB
│   ├── react-query-v5-migration.md         # Notes : changements majeurs et nouveaux patterns de v4→v5
│   ├── opentelemetry-setup.md              # Notes : patterns d'instrumentation manuelle avec le SDK OTEL
│   ├── redis-lua-scripting.md              # Résultats d'expérience : opérations atomiques Lua vs transactions
│   └── zod-schema-composition.md          # Notes de patterns : unions discriminées, types brandés
├── reviews/
│   ├── checklist-backend.md                # Checklist de revue : sécurité, gestion des erreurs, observabilité
│   ├── checklist-frontend.md               # Checklist de revue : accessibilité, taille du bundle, états d'erreur
│   ├── checklist-database.md               # Checklist de revue : migrations, index, plans de requête
│   ├── standards.md                        # Standards de code et conventions de nommage de l'équipe
│   └── common-feedback.md                  # Patterns récurrents de retours PR à surveiller
├── docs/
│   ├── onboarding.md                       # Mise en place pour les nouveaux ingénieurs : clone du dépôt, configuration de l'environnement, première PR
│   ├── local-dev-setup.md                  # Services Docker Compose, données de test, variables d'environnement
│   ├── runbooks/
│   │   ├── deploy-process.md               # Comment déployer : branche, CI, fusion, surveillance
│   │   ├── rollback.md                     # Comment annuler un déploiement défectueux en toute sécurité
│   │   └── database-migrations.md          # Comment écrire, tester et appliquer les migrations en toute sécurité
│   └── system-diagrams/
│       ├── service-map.md                  # Services, dépendances, intégrations externes
│       └── data-flow.md                    # Cycle de vie d'une requête : client → API → DB → cache
├── .github/
│   └── workflows/
│       ├── ci.yml                          # Vérifications PR : lint, vérification de types, tests, seuil de couverture
│       ├── deploy-staging.yml              # Déploiement automatique en staging lors de la fusion sur main
│       └── codeql.yml                      # Analyse de sécurité GitHub CodeQL sur les PRs
├── docker-compose.yml                      # Dev local : postgres, redis, kafka, localstack
├── docker-compose.override.yml            # Surcharges locales : montages de volumes, ports de débogage
└── .env.example                            # Toutes les variables d'environnement requises avec descriptions, sans valeurs réelles
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `.claude/commands/spec-to-code.md` | Lit le fichier de spec pour la branche de fonctionnalité en cours, génère un plan d'implémentation avec stubs de fichiers, signatures de fonctions et ancrages de tests avant qu'une seule ligne de code soit écrite |
| `.claude/commands/debug.md` | Prend une erreur collée, une trace de pile ou une description de comportement inattendu ; parcourt les logs, les chemins de code et les diffs récents pour isoler la cause racine et proposer un correctif ciblé |
| `.claude/commands/arch-sketch.md` | Produit un brouillon d'ADR ou une conception système légère — fait remonter les compromis, les approches alternatives et les questions ouvertes pour une revue asynchrone avant de s'engager sur une direction |
| `specs/_template.md` | Format de spec canonique : énoncé du problème, critères de succès, forme de l'API, cas limites, non-objectifs, questions ouvertes — garantit que les specs sont complètes avant le début du développement |
| `decisions/_template.md` | Format ADR selon le style Nygard : contexte, décision prise, statut, conséquences et alternatives rejetées avec justification |
| `reviews/checklist-backend.md` | Checklist de revue PR backend couvrant : validation des entrées, application de l'authentification, forme des réponses d'erreur, efficacité des requêtes DB, hooks d'observabilité et sécurité des migrations |
| `debugging/_template.md` | Format de session : symptôme, détails de l'environnement, étapes de reproduction, hypothèses testées, cause racine, correctif appliqué et note de prévention — base de connaissances persistante pour les bugs complexes |
| `docs/runbooks/database-migrations.md` | Processus de migration : modifications de schéma rétrocompatibles uniquement, prise en compte du déploiement blue-green, SQL de rollback, évaluation de l'impact sur les performances pour les tables volumineuses |

## Scaffold rapide

```bash
# Créer la structure complète de l'espace de travail ingénieur logiciel
mkdir -p software-engineer-workspace
cd software-engineer-workspace

# Configuration Claude Code
mkdir -p .claude/commands

# Répertoires de specs (ajouter des sous-répertoires par fonctionnalité si nécessaire)
mkdir -p specs

# Décisions d'architecture
mkdir -p decisions

# Sessions de débogage
mkdir -p debugging

# Notes d'apprentissage
mkdir -p learning

# Matériaux de revue
mkdir -p reviews

# Documentation
mkdir -p docs/runbooks docs/system-diagrams

# GitHub Actions
mkdir -p .github/workflows

# Générer les fichiers de templates
touch specs/_template.md
touch decisions/_template.md
touch debugging/_template.md
touch reviews/checklist-backend.md
touch reviews/checklist-frontend.md
touch reviews/checklist-database.md
touch reviews/standards.md
touch docs/onboarding.md
touch docs/local-dev-setup.md
touch docs/runbooks/deploy-process.md
touch docs/runbooks/rollback.md
touch docs/runbooks/database-migrations.md
touch docs/system-diagrams/service-map.md
touch .env.example

# Docker Compose pour les services de dev local
cat > docker-compose.yml << 'EOF'
version: "3.9"
services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: dev
      POSTGRES_DB: app_dev
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
EOF

# Installer les skills
npx uitkit add skill productivity/code-review
npx uitkit add skill productivity/debug
npx uitkit add skill productivity/refactor
npx uitkit add skill productivity/test-generator
npx uitkit add skill git/pr-description
npx uitkit add skill productivity/security-audit
npx uitkit add skill productivity/spec-driven-workflow
npx uitkit add skill productivity/tech-debt-tracker

# Copier les skills installés comme commandes de l'espace de travail
cp ~/.claude/skills/productivity/code-review.md .claude/commands/code-review.md
cp ~/.claude/skills/productivity/debug.md .claude/commands/debug.md
cp ~/.claude/skills/productivity/refactor.md .claude/commands/refactor.md
cp ~/.claude/skills/productivity/test-generator.md .claude/commands/test-write.md
cp ~/.claude/skills/git/pr-description.md .claude/commands/pr-description.md
cp ~/.claude/skills/productivity/spec-driven-workflow.md .claude/commands/spec-to-code.md

echo "Espace de travail ingénieur logiciel initialisé."
```

## Template CLAUDE.md

```markdown
# Espace de travail Ingénieur Logiciel

Cet espace de travail couvre l'intégralité du cycle de développement logiciel — de la lecture d'un ticket
à la fusion d'une PR revue, testée et documentée. Le travail ici inclut l'implémentation de fonctionnalités,
la revue de code, le débogage des problèmes en production, les décisions d'architecture et la mise à jour de la documentation.

## Stack

- Runtime : Node.js 20 (TypeScript 5.4) — à adapter selon le langage de votre service
- Base de données : PostgreSQL 16 avec Drizzle ORM (migrations dans drizzle/migrations/)
- Cache : Redis 7 (client ioredis, espace de noms : app:{env}:{resource}:{id})
- API : Express 4 avec validation Zod sur tous les corps de requête et paramètres
- Tests : Jest 29, Supertest pour l'intégration, DB de test démarrée par suite
- CI : GitHub Actions — ci.yml s'exécute sur chaque PR ; deploy-staging.yml sur la fusion vers main
- Observabilité : Datadog APM (auto-instrumentation dd-trace) + Sentry pour les exceptions
- Conteneurs : Docker Compose pour le dev local (postgres, redis) ; voir docker-compose.yml

## Conventions de répertoires

- `specs/` — un sous-répertoire par fonctionnalité, créé avant le début du développement ; spec.md en premier
- `decisions/` — ADRs numérotés séquentiellement ; ne jamais supprimer, marquer les obsolètes [SUPERSEDED]
- `debugging/` — notes de session pour tout bug prenant plus de 30 minutes à résoudre
- `learning/` — notes sur les nouveaux patterns, mises à jour de bibliothèques, résultats d'expériences
- `reviews/` — checklists et standards ; à mettre à jour quand des patterns récurrents de retours PR émergent
- `docs/runbooks/` — documentation opérationnelle pour les procédures de déploiement, rollback et migration

## Tâches courantes — utiliser ces commandes exactes

### Commencer l'implémentation depuis un ticket ou une spec
/spec-to-code — coller le ticket Linear/Jira ou pointer vers specs/<fonctionnalité>/spec.md

### Revoir son propre diff avant d'ouvrir une PR
/code-review

### Déboguer une erreur ou un comportement inattendu
/debug — coller la trace de pile, le message d'erreur, ou décrire le comportement inattendu

### Écrire des tests pour le code modifié
/test-write — s'exécute sur le diff git actuel

### Rédiger une description de PR
/pr-description — lit le log et le diff git, produit titre + résumé + plan de test

### Refactoriser sans changer le comportement
/refactor — pointer vers un fichier ou une fonction ; produit un nettoyage sûr et incrémental

### Esquisser une architecture ou écrire un ADR
/arch-sketch — décrire le problème ; produit des options de conception et un brouillon d'ADR

## Processus de développement de fonctionnalités

1. Récupérer le ticket depuis Linear/Jira ; lire attentivement les critères d'acceptation
2. Créer specs/<nom-fonctionnalité>/spec.md avant d'écrire le moindre code
3. Lancer /spec-to-code pour générer un plan d'implémentation
4. Créer une branche de fonctionnalité : git checkout -b feat/<linear-ticket-id>-description-courte
5. Implémenter de manière incrémentale ; lancer les tests après chaque portion significative
6. Lancer /code-review sur son propre diff avant de pousser
7. Lancer /pr-description pour générer la description de la PR
8. Ouvrir la PR ; demander une revue ; traiter les retours le jour même si possible
9. Après la fusion : vérifier le déploiement en staging, contrôler dans Datadog, fermer le ticket

## Conventions de code

- Toutes les fonctions doivent avoir des types de retour explicites (pas d'any implicite)
- Gestion des erreurs : ne jamais avaler les erreurs silencieusement ; toujours logger avec contexte (ID de requête, ID utilisateur)
- Requêtes base de données : toujours inclure LIMIT sur les endpoints de liste ; explain analyze pour les nouvelles requêtes
- Réponses API : forme cohérente — { data, error, meta } — jamais d'objets bruts
- Feature flags : nouvelles fonctionnalités côté utilisateur derrière un flag jusqu'à la validation QA
- Migrations : toujours rétrocompatibles ; ne jamais supprimer des colonnes dans la même PR qui supprime leur usage

## Conventions de tests

- Tests unitaires : colocalisés dans __tests__/ à côté du fichier source
- Tests d'intégration : dans tests/integration/ ; utiliser une vraie DB via testcontainers ou URL de DB de test
- Seuil de couverture : 80% de couverture de ligne requis ; la CI échoue en dessous du seuil
- Noms de tests : décrire le comportement, pas l'implémentation ("renvoie 404 quand l'utilisateur n'est pas trouvé")
- Ne jamais simuler la base de données dans les tests d'intégration — tester avec de vraies requêtes

## Conventions d'observabilité

- Chaque handler d'API : logger à l'entrée et à la sortie avec l'ID de requête et la durée
- Chaque job en arrière-plan : logger le démarrage, la fin et le nombre d'éléments traités
- Erreurs envoyées à Sentry : inclure l'ID utilisateur, l'ID de requête et le contexte d'entrée pertinent
- Nouvelles fonctionnalités : ajouter une métrique personnalisée Datadog ou un panneau de tableau de bord avant la mise en production

## Ce qu'il ne faut pas faire

- Ne pas committer de secrets ou de fichiers .env — utiliser .env.example avec des valeurs fictives
- Ne pas ouvrir une PR sans entrée de spec si le changement dépasse un correctif d'une ligne
- Ne pas fusionner sans au moins une approbation et une CI verte
- Ne pas sauter l'écriture des tests sous prétexte que "c'est un petit changement" — les petits changements causent des régressions
- Ne pas ajouter une nouvelle dépendance sans vérifier l'impact sur la taille du bundle et la licence
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
    "sentry": {
      "command": "npx",
      "args": ["-y", "@sentry/mcp-server"],
      "env": {
        "SENTRY_AUTH_TOKEN": "${SENTRY_AUTH_TOKEN}",
        "SENTRY_ORG": "${SENTRY_ORG}",
        "SENTRY_PROJECT": "${SENTRY_PROJECT}"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/yourname/software-engineer-workspace"
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
            "command": "bash -c 'EXT=\"${CLAUDE_TOOL_INPUT_FILE_PATH##*.}\"; if [[ \"$EXT\" == \"ts\" || \"$EXT\" == \"tsx\" || \"$EXT\" == \"js\" ]]; then npx prettier --write \"$CLAUDE_TOOL_INPUT_FILE_PATH\" 2>/dev/null || true; elif [[ \"$EXT\" == \"py\" ]]; then ruff format \"$CLAUDE_TOOL_INPUT_FILE_PATH\" 2>/dev/null || true; elif [[ \"$EXT\" == \"go\" ]]; then gofmt -w \"$CLAUDE_TOOL_INPUT_FILE_PATH\" 2>/dev/null || true; fi'"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_COMMAND\" | grep -qE \"git (push|commit).*(main|master)\"; then echo \"[HOOK] Direct push/commit to main detected — use a feature branch and open a PR instead.\" >&2; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if git -C \"$PWD\" diff --name-only 2>/dev/null | grep -q .; then echo \"Reminder: uncommitted changes in working tree — stage, stash, or commit before ending session.\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Skills à installer

```bash
npx uitkit add skill productivity/code-review
npx uitkit add skill productivity/debug
npx uitkit add skill productivity/refactor
npx uitkit add skill productivity/test-generator
npx uitkit add skill git/pr-description
npx uitkit add skill productivity/security-audit
npx uitkit add skill productivity/spec-driven-workflow
npx uitkit add skill productivity/tech-debt-tracker
```

## Liens associés

- [Guide Ingénieur Logiciel](../guides/for-software-engineer.md)
- [Processus de développement de fonctionnalités](../workflows/feature-development.md)
