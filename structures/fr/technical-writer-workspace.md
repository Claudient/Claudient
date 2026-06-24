# Espace de travail Rédacteur technique — Structure de projet

> Pour un rédacteur technique produisant de la documentation développeur, des références API, des tutoriels et des notes de version avec un workflow docs-as-code s'appuyant sur GitHub, Mintlify/Docusaurus et Notion.

## Stack

- **Docs-as-code :** GitHub (PR, revues, protection de branche sur `main`)
- **Site de documentation :** Mintlify (recommandé) ou Docusaurus 3.x ou GitBook — un par espace de travail
- **Planification et briefs :** Notion (calendrier éditorial, notes d'entretien avec les experts métier, demandes de documentation)
- **Diagrammes :** Figma avec FigJam pour les diagrammes d'architecture et de flux
- **Tests API :** Postman (valider les exemples requête/réponse avant publication)
- **Démonstrations vidéo :** Loom (intégré dans les tutoriels pour les flux complexes)
- **Communication :** Slack (canaux `#docs`, `#dev-rel`, `#product-feedback`)
- **Analyse syntaxique :** Vale (analyse de la prose selon des règles de style personnalisées), markdownlint
- **Vérification des liens :** lychee (détection des liens morts en CI)
- **Recherche :** Algolia DocSearch (Mintlify) ou lunr.js local (Docusaurus)

## Arborescence du projet

```
technical-writer-workspace/
├── .claude/
│   ├── CLAUDE.md                           # Instructions de l'espace de travail pour Claude Code
│   ├── settings.json                       # Serveurs MCP, hooks, permissions
│   └── commands/
│       ├── api-doc.md                      # /api-doc — générer la doc d'un endpoint à partir d'une spec OpenAPI
│       ├── tutorial-draft.md               # /tutorial-draft — structurer un tutoriel pas à pas
│       ├── changelog-entry.md              # /changelog-entry — rédiger une entrée de note de version
│       ├── doc-audit.md                    # /doc-audit — auditer une page de doc pour exactitude et fraîcheur
│       ├── onboarding-guide.md             # /onboarding-guide — générer un guide d'intégration développeur
│       ├── release-notes.md                # /release-notes — compiler les notes de version à partir des entrées changelog
│       └── style-check.md                  # /style-check — analyser la prose selon les règles du guide de style
├── api-reference/
│   ├── _template.md                        # Format canonique de doc d'endpoint (source de vérité)
│   ├── authentication.md                   # Vue d'ensemble de l'auth : clés API, OAuth 2.0, portées des tokens
│   ├── errors.md                           # Codes d'erreur, codes de statut, conseils de nouvelle tentative
│   ├── rate-limits.md                      # Niveaux de limite de débit, en-têtes, stratégie de backoff
│   ├── pagination.md                       # Pagination par curseur vs par offset, limites de taille de page
│   ├── versioning.md                       # Politique de versionnage de l'API, calendrier de dépréciation
│   ├── users/
│   │   ├── list-users.md                   # GET /users — paramètres, schéma de réponse, exemples
│   │   ├── get-user.md                     # GET /users/{id}
│   │   ├── create-user.md                  # POST /users — corps de la requête, règles de validation
│   │   ├── update-user.md                  # PATCH /users/{id}
│   │   └── delete-user.md                  # DELETE /users/{id} — comportement de suppression logique
│   ├── auth/
│   │   ├── token-exchange.md               # POST /auth/token
│   │   ├── refresh-token.md                # POST /auth/refresh
│   │   └── revoke-token.md                 # POST /auth/revoke
│   ├── webhooks/
│   │   ├── overview.md                     # Distribution des webhooks, nouvelles tentatives, vérification de signature
│   │   ├── event-types.md                  # Tous les schémas d'événements avec exemples de payloads
│   │   └── register-endpoint.md            # POST /webhooks — enregistrement et validation
│   └── sdks/
│       ├── node.md                         # SDK Node.js : installation, initialisation, exemples de code par endpoint
│       ├── python.md                       # SDK Python
│       └── go.md                           # SDK Go
├── guides/
│   ├── _template.md                        # Format de guide conceptuel : vue d'ensemble, pourquoi, comment, étapes suivantes
│   ├── getting-started.md                  # Première intégration : auth → premier appel API → réponse
│   ├── authentication.md                   # Approfondissement : choisir la méthode d'auth, cycle de vie des tokens
│   ├── error-handling.md                   # Modèles de code défensif, logique de nouvelle tentative, backoff exponentiel
│   ├── security-best-practices.md          # Rotation des clés, minimisation des portées, stockage des secrets
│   ├── migrating-from-v1.md               # Migration v1 → v2 : changements rompants, codemods
│   ├── idempotency.md                      # Clés d'idempotence : quand, pourquoi, implémentation
│   └── testing-your-integration.md         # Environnement sandbox, données de test, lien vers la collection Postman
├── tutorials/
│   ├── _template.md                        # Format de tutoriel : objectif, prérequis, étapes, vérification, étapes suivantes
│   ├── quickstart-5-minutes.md             # De bout en bout : clé API → premier appel réussi
│   ├── build-a-webhook-receiver.md         # Serveur express Node.js gérant les événements
│   ├── sync-users-from-csv.md              # Workflow d'import par lot avec gestion des erreurs
│   ├── oauth-integration-nextjs.md         # Flux OAuth 2.0 PKCE dans une application Next.js
│   ├── automate-user-provisioning.md       # Tutoriel de provisionnement SCIM 2.0
│   └── postman-collection-walkthrough.md   # Importer la collection, définir les variables, exécuter tous les appels
├── changelogs/
│   ├── _template.md                        # Format d'entrée changelog : date, version, sections
│   ├── 2025-06-02-v3.1.0.md               # Dernière version : ajouts, modifications, dépréciations, corrections, suppressions
│   ├── 2025-04-15-v3.0.0.md               # Version majeure : changements rompants mis en avant en premier
│   ├── 2025-02-10-v2.9.5.md
│   ├── 2025-01-08-v2.9.0.md
│   └── archive/
│       ├── 2024-changelogs.md              # Archive consolidée des versions antérieures
│       └── 2023-changelogs.md
├── architecture/
│   ├── system-overview.md                  # Diagramme système de haut niveau, responsabilités des composants
│   ├── data-flow.md                        # Cycle de vie d'une requête : client → API gateway → service → BDD
│   ├── authentication-flow.md              # Diagramme de séquence OAuth 2.0 avec Mermaid
│   ├── webhook-delivery.md                 # Pipeline webhook : événement → file d'attente → distribution → nouvelle tentative
│   ├── decisions/
│   │   ├── _template.md                    # Format ADR : statut, contexte, décision, conséquences
│   │   ├── adr-001-api-versioning.md       # Enregistrement de décision : versionnage par URL plutôt que par en-tête
│   │   ├── adr-002-pagination-strategy.md  # Pagination par curseur retenue plutôt que par offset
│   │   └── adr-003-webhook-retry-policy.md # Backoff exponentiel avec fenêtre de 72 heures
│   └── openapi/
│       ├── openapi.yaml                    # Spec OpenAPI 3.1 canonique (source de vérité)
│       └── postman-collection.json         # Collection Postman exportée (générée depuis la spec)
├── style-guide/
│   ├── voice-and-tone.md                   # Règles : voix active, deuxième personne, temps présent
│   ├── terminology.md                      # Liste de termes approuvés/bannis : API key vs access token, etc.
│   ├── code-examples.md                    # Standards de langage, longueur de ligne, règles de commentaires
│   ├── formatting.md                       # Hiérarchie des titres, encadrés d'avertissement, usage des tableaux
│   ├── screenshots.md                      # Quand les utiliser, exigences de texte alternatif, convention de nommage
│   ├── .vale.ini                           # Config du linter Vale : paquets de règles activés
│   └── vale-rules/
│       ├── Headings.yml                    # Règle Vale personnalisée : casse de phrase uniquement
│       ├── AvoidPassive.yml                # Signaler les constructions passives
│       └── BannedTerms.yml                 # Appliquer terminology.md via Vale
├── reviews/
│   ├── doc-review-checklist.md             # Liste de vérification avant publication : exactitude, liens, exemples
│   ├── sme-interview-template.md           # Cadre de questions pour les entretiens avec les experts métier
│   ├── sme-feedback/
│   │   ├── 2025-05-auth-review.md          # Session de retour expert : docs d'auth avec l'équipe ingénierie
│   │   └── 2025-04-webhooks-review.md
│   └── audits/
│       ├── 2025-q2-api-reference-audit.md  # Audit trimestriel d'exactitude : endpoints obsolètes, exemples cassés
│       └── 2025-q1-tutorial-audit.md
├── .vale.ini                               # Config Vale racine (s'applique à tous les fichiers .md)
├── .markdownlint.json                      # Règles markdownlint : longueur de ligne, style des titres
├── .lychee.toml                            # Vérificateur de liens lychee : délai d'attente, domaines exclus
├── mint.json                               # Config du site Mintlify : navigation, couleurs, ancres, analytics
└── .github/
    └── workflows/
        ├── vale-lint.yml                   # PR : exécuter Vale sur les fichiers .md modifiés, poster des annotations
        ├── markdownlint.yml                # PR : vérification markdownlint
        ├── link-check.yml                  # PR + planification hebdomadaire : détection des liens morts par lychee
        └── openapi-diff.yml               # PR : détecter les changements rompants dans openapi.yaml
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `.claude/commands/api-doc.md` | Commande slash qui prend un chemin d'endpoint OpenAPI, récupère la spec et génère une page de doc d'endpoint complète selon les conventions de `api-reference/_template.md` |
| `.claude/commands/doc-audit.md` | Audite une page de doc par rapport à l'API en production : vérifie que les exemples requête/réponse correspondent à la spec actuelle, signale les paramètres obsolètes et identifie les codes d'erreur manquants |
| `api-reference/_template.md` | Format canonique de doc d'endpoint : description, URL de base, note d'authentification, paramètres de chemin/requête/corps, schéma de réponse, exemples de code en trois langages, tableau d'erreurs |
| `architecture/openapi/openapi.yaml` | Source de vérité unique OpenAPI 3.1 — toute la documentation de référence API et la collection Postman en sont dérivées ; ne jamais modifier les docs d'endpoint sans consulter la spec au préalable |
| `style-guide/terminology.md` | Liste de termes approuvés et bannis utilisée par la règle Vale `BannedTerms.yml` — autorité unique sur le vocabulaire propre au produit |
| `changelogs/_template.md` | Format de changelog imposé : date, semver et quatre sections (Added, Changed, Deprecated, Fixed) selon les conventions Keep a Changelog |
| `reviews/doc-review-checklist.md` | Validation avant publication : exactitude vérifiée avec Postman, tous les exemples de code testés, tous les liens validés par lychee, Vale et markdownlint sans erreur, validation de l'expert métier notée |
| `style-guide/.vale.ini` | Configuration Vale : active le paquet de style Google pour la qualité de la prose, le style Microsoft pour la terminologie, et les règles locales personnalisées dans `vale-rules/` |

## Initialisation rapide

```bash
# Créer la structure complète de l'espace de travail Rédacteur technique
mkdir -p technical-writer-workspace
cd technical-writer-workspace

# Configuration Claude Code
mkdir -p .claude/commands

# Répertoires de contenu
mkdir -p api-reference/users api-reference/auth api-reference/webhooks api-reference/sdks
mkdir -p guides tutorials
mkdir -p changelogs/archive
mkdir -p architecture/decisions architecture/openapi
mkdir -p style-guide/vale-rules
mkdir -p reviews/sme-feedback reviews/audits
mkdir -p .github/workflows

# Créer les fichiers modèles
touch api-reference/_template.md
touch guides/_template.md
touch tutorials/_template.md
touch changelogs/_template.md
touch architecture/decisions/_template.md
touch reviews/doc-review-checklist.md reviews/sme-interview-template.md

# Créer les fichiers du guide de style
touch style-guide/voice-and-tone.md
touch style-guide/terminology.md
touch style-guide/code-examples.md
touch style-guide/formatting.md
touch style-guide/screenshots.md

# Config Vale
cat > .vale.ini << 'EOF'
StylesPath = style-guide/vale-rules
MinAlertLevel = suggestion

[*.md]
BasedOnStyles = Vale
EOF

cat > style-guide/.vale.ini << 'EOF'
StylesPath = vale-rules
MinAlertLevel = warning

[*.md]
BasedOnStyles = Vale, Google, Microsoft
EOF

# Config markdownlint
cat > .markdownlint.json << 'EOF'
{
  "default": true,
  "MD013": { "line_length": 120 },
  "MD033": false,
  "MD041": false
}
EOF

# Ébauche de config Mintlify
cat > mint.json << 'EOF'
{
  "name": "Product Docs",
  "logo": { "light": "/logo/light.svg", "dark": "/logo/dark.svg" },
  "favicon": "/favicon.svg",
  "colors": { "primary": "#0D9373" },
  "navigation": [
    { "group": "Get Started", "pages": ["guides/getting-started"] },
    { "group": "API Reference", "pages": ["api-reference/authentication"] }
  ],
  "analytics": { "posthog": { "apiKey": "" } }
}
EOF

# Config lychee
cat > .lychee.toml << 'EOF'
timeout = 20
max_retries = 3
exclude = ["localhost", "127.0.0.1", "example.com"]
exclude_path = ["changelogs/archive"]
EOF

# Installer les skills
npx uitkit add skill productivity/api-doc-writer
npx uitkit add skill productivity/readme-generator
npx uitkit add skill productivity/doc-site-builder
npx uitkit add skill productivity/runbook-generator
npx uitkit add skill git/changelog-generator
npx uitkit add skill productivity/lit-review

# Copier les skills installés comme commandes de l'espace de travail
cp ~/.claude/skills/productivity/api-doc-writer.md .claude/commands/api-doc.md
cp ~/.claude/skills/git/changelog-generator.md .claude/commands/changelog-entry.md
cp ~/.claude/skills/productivity/doc-site-builder.md .claude/commands/onboarding-guide.md

echo "Espace de travail Rédacteur technique initialisé."
```

## Modèle CLAUDE.md

```markdown
# Espace de travail Rédacteur technique

Cet espace de travail gère toute la documentation à destination des développeurs : référence API, guides conceptuels,
tutoriels et notes de version. Le contenu est versionné et publié sur Mintlify.
L'exactitude et l'exhaustivité sont les critères de qualité prioritaires — chaque exemple de code doit être testé
contre l'API en production avant toute publication.

## Stack

- Site de documentation : Mintlify (config : mint.json)
- Spec API : OpenAPI 3.1 (architecture/openapi/openapi.yaml — source de vérité)
- Analyse de la prose : Vale + règles personnalisées dans style-guide/vale-rules/
- Analyse du Markdown : markdownlint (.markdownlint.json)
- Vérification des liens : lychee (.lychee.toml)
- Tests API : Postman (valider tous les exemples avant publication)
- Planification : Notion (demandes de documentation, calendrier éditorial, notes d'entretien expert métier)
- Vidéo : Loom (intégrer des démonstrations dans les tutoriels complexes)

## Conventions de répertoires

- `api-reference/` — un fichier par endpoint ; suivre exactement api-reference/_template.md
- `guides/` — profondeur conceptuelle ; pas de pas à pas (cela appartient à tutorials/)
- `tutorials/` — étapes numérotées ; doit inclure une section "Vérifier que ça fonctionne" avant "Étapes suivantes"
- `changelogs/` — un fichier par version ; suivre changelogs/_template.md et Keep a Changelog
- `architecture/decisions/` — un ADR par décision significative sur le système de documentation
- `style-guide/` — source de vérité unique pour la voix, la terminologie et la mise en forme
- `reviews/` — ne jamais supprimer les retours des experts métier ; ils constituent la piste d'audit d'exactitude

## Tâches courantes — utiliser ces commandes exactes

### Générer la documentation d'un endpoint API depuis la spec
/api-doc — coller l'objet de chemin OpenAPI ou l'URL de l'endpoint

### Rédiger un nouveau tutoriel
/tutorial-draft — décrire l'objectif utilisateur et le persona développeur cible

### Rédiger une entrée de changelog pour une version
/changelog-entry — coller la liste des PR ou les notes de version Jira

### Auditer une page de doc pour exactitude
/doc-audit — coller le chemin de la page de doc et la section OpenAPI correspondante

### Générer un guide d'intégration développeur
/onboarding-guide — fournir le domaine produit et le rôle cible

### Compiler les notes de version à partir des entrées changelog
/release-notes — fournir la plage de versions (ex. v3.0.0 à v3.1.0)

### Vérifier la prose par rapport au guide de style
/style-check — coller ou référencer le fichier de doc à analyser

## Conventions de référence API

- Chaque doc d'endpoint doit inclure : un exemple cURL, un exemple Python, un exemple Node.js
- Les exemples de réponse doivent reproduire la réponse réelle obtenue depuis Postman — ne jamais inventer du JSON
- Le tableau d'erreurs doit lister tous les codes de statut HTTP que l'endpoint retourne réellement (vérifier dans la spec)
- Tableau des paramètres : distinguer obligatoire vs optionnel ; inclure le type, le format et les valeurs/plages valides
- Lier vers le guide correspondant pour le contexte conceptuel — ne pas expliquer les concepts en ligne

## Conventions de changelog

- Utiliser le format Keep a Changelog : Added, Changed, Deprecated, Fixed, Removed, Security
- Les changements rompants figurent en haut sous un titre "Breaking" avant toutes les autres sections
- Chaque entrée doit référencer le nom de l'endpoint API ou de la fonctionnalité — pas d'"améliorations" vagues
- Les éléments dépréciés doivent indiquer la version cible de suppression et le chemin de migration

## Règles de style (forme abrégée — voir style-guide/ pour les règles complètes)

- Voix active : "L'API retourne un token" et non "Un token est retourné par l'API"
- Deuxième personne : "Vous pouvez vous authentifier en..." et non "Les utilisateurs peuvent s'authentifier en..."
- Présent pour les comportements : "Retourne 404" et non "Retournera 404"
- Casse de phrase pour tous les titres : "Créer un utilisateur" et non "Créer Un Utilisateur"
- Termes approuvés : API key, access token, endpoint, payload, webhook event
- Termes bannis : simplement, juste, facile, évident — signaler avec /style-check

## Liste de vérification avant publication

Avant d'ouvrir une PR, vérifier tous les éléments dans reviews/doc-review-checklist.md :
1. Tous les exemples de code testés dans Postman contre l'environnement sandbox actuel
2. Vale passe sans erreur (avertissements acceptables avec justification)
3. markdownlint passe sans erreur
4. lychee ne signale aucun lien cassé
5. L'expert métier a validé l'exactitude de toute affirmation architecturale ou comportementale
6. La navigation dans mint.json est mise à jour si une nouvelle page est ajoutée

## Ce qu'il ne faut pas faire

- Ne pas inventer le comportement de l'API — toujours vérifier dans openapi.yaml ou tester dans Postman
- Ne pas modifier openapi.yaml directement — ce fichier est maintenu par l'équipe ingénierie
- Ne pas fusionner des PR de documentation sans que Vale soit passé — la vérification CI est obligatoire
- Ne pas rédiger des tutoriels dans le répertoire guides/ ni du contenu conceptuel dans tutorials/
- Ne pas utiliser la voix passive ni les conditionnels du second degré ("serait", "pourrait potentiellement")
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
    "notion": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-notion"],
      "env": {
        "NOTION_API_TOKEN": "${NOTION_API_TOKEN}"
      }
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "${SLACK_BOT_TOKEN}",
        "SLACK_TEAM_ID": "${SLACK_TEAM_ID}"
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
            "command": "bash -c 'if [[ \"$CLAUDE_TOOL_INPUT_FILE_PATH\" == *.md ]]; then npx markdownlint \"$CLAUDE_TOOL_INPUT_FILE_PATH\" 2>&1 | head -20 || true; fi'"
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
            "command": "bash -c 'if [[ \"$CLAUDE_TOOL_INPUT_FILE_PATH\" == *api-reference/* ]] && ! grep -q \"## Parameters\" \"$CLAUDE_TOOL_INPUT_FILE_PATH\" 2>/dev/null; then echo \"[HOOK] API reference file is missing a Parameters section — check api-reference/_template.md\" >&2; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'changed=$(git -C \"$PWD\" diff --name-only 2>/dev/null | grep \"\\.md$\" | wc -l | tr -d \" \"); if [ \"$changed\" -gt 0 ]; then echo \"Reminder: $changed unsaved .md file(s) changed — run Vale and markdownlint before opening a PR.\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Skills à installer

```bash
npx uitkit add skill productivity/api-doc-writer
npx uitkit add skill productivity/readme-generator
npx uitkit add skill productivity/doc-site-builder
npx uitkit add skill productivity/runbook-generator
npx uitkit add skill git/changelog-generator
npx uitkit add skill productivity/lit-review
```

## Voir aussi

- [Guide Rédacteur technique](../guides/for-technical-writer.md)
- [Workflow de rédaction de changelog](../workflows/changelog-writing.md)
