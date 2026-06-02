# Newsletter Business — Structure du projet

> Pour un créateur ou une entreprise média gérant une newsletter — rédaction des numéros, planification éditoriale, partenariats sponsorisés, croissance de la liste et analyse des performances dans un seul espace de travail Claude Code.

## Stack technique

- **ESP + Publication :** Beehiiv (privilégié pour la monétisation), Substack (natif créateur) ou ConvertKit (axé automatisation)
- **Distribution sociale :** Typefully (planification de fils Twitter/X, analytique) ou Hypefury (retweet automatique, files persistantes)
- **Planification éditoriale :** Notion (base de données calendrier de contenu, backlog d'idées, vues pipeline)
- **Visuels :** Canva (images d'en-tête, bannières sponsors, cartes sociales — 1200x630px et 1080x1080px)
- **Facturation sponsors :** Sponsy (réservation, facturation, workflow de copies publicitaires) ou Stripe (facturation manuelle via Stripe Invoices)
- **Analytique :** Google Analytics 4 (trafic web/archive), analytique native Beehiiv/Substack (taux d'ouverture, CTR, croissance abonnés)
- **Communication :** Slack (alertes éditoriales, échanges sponsors, canal expériences de croissance)
- **Compétences Claude Code :** productivity/newsletter-writer, productivity/stakeholder-comms, data-ml/stakeholder-report, productivity/vendor-evaluator

## Arborescence du projet

```
newsletter-business/
├── .claude/
│   ├── CLAUDE.md                              # Instructions de l'espace de travail pour Claude Code
│   ├── settings.json                          # Serveurs MCP, hooks, permissions
│   └── commands/
│       ├── write-issue.md                     # /write-issue — rédiger un numéro complet à partir d'un sujet et d'un plan
│       ├── edit-issue.md                      # /edit-issue — relire, resserrer, appliquer le guide de style
│       ├── sponsorship-brief.md               # /sponsorship-brief — générer la copie publicitaire depuis le formulaire sponsor
│       ├── growth-experiment.md               # /growth-experiment — concevoir un test A/B pour un canal d'acquisition
│       ├── performance-report.md              # /performance-report — extraire les métriques hebdomadaires ouvertures/CTR/croissance
│       ├── social-promo.md                    # /social-promo — générer les promotions Twitter/X + LinkedIn pour un numéro
│       └── list-health-check.md               # /list-health-check — détecter les signaux de désabonnement, déclencher la réactivation
├── issues/
│   ├── _template/
│   │   ├── draft.md                           # Brouillon vierge (copier avant chaque rédaction)
│   │   └── performance-metrics.md             # Feuille de métriques vierge (à remplir à 7/30/60 jours après envoi)
│   ├── 2026-06-02-issue-001/
│   │   ├── draft.md                           # Brouillon en cours de rédaction
│   │   ├── final.md                           # Version finale envoyée à l'ESP
│   │   └── performance-metrics.md             # Taux d'ouverture, CTR, réponses, désabonnements — rempli après envoi
│   ├── 2026-05-26-issue-000/
│   │   ├── draft.md
│   │   ├── final.md
│   │   └── performance-metrics.md             # Métriques historiques pour les comparaisons
│   └── 2026-05-19-issue-999/
│       ├── draft.md
│       ├── final.md
│       └── performance-metrics.md
├── editorial/
│   ├── content-calendar.md                    # Plan mensuel des numéros : date, sujet, emplacement sponsor, statut
│   ├── idea-backlog.md                        # Liste continue d'idées de sujets avec source et priorité
│   ├── topic-clusters.md                      # Thèmes récurrents et correspondance avec les numéros
│   └── style-guide.md                         # Voix, ton, expressions interdites, règles de mise en forme
├── sponsorships/
│   ├── media-kit.md                           # Statistiques audience, grille tarifaire, specs formats — à envoyer aux sponsors
│   ├── sponsor-tracker.md                     # Pipeline : prospect, négociation, confirmé, facturé, payé
│   ├── ad-copy-templates.md                   # Structures de copies réutilisables (principale, secondaire, classifiée)
│   └── invoice-log.md                         # Factures émises : sponsor, montant, date d'émission, date de paiement
├── growth/
│   ├── referral-program.md                    # Règles de parrainage Beehiiv/SparkLoop, paliers, exécution des récompenses
│   ├── acquisition-channels.md                # Répartition des canaux : organique, co-promotions, payant, SEO archive
│   └── experiment-log.md                      # Tests A/B : hypothèse, variante, résultat, décision
├── templates/
│   ├── issue-format.md                        # Squelette standard d'un numéro (accroche, sections corps, slot sponsor, CTA)
│   ├── welcome-email.md                       # Séquence de bienvenue automatique — numéros 1 et 2
│   ├── re-engagement.md                       # Email de réactivation pour inactifs depuis 90 jours
│   └── social-promo.md                        # Modèle de fil Twitter/X + modèle de publication LinkedIn
└── analytics/
    ├── weekly-dashboard.md                    # Instantané hebdomadaire : abonnés, taux d'ouverture, CTR, revenus
    └── cohort-benchmarks.md                   # Rétention par cohorte d'abonnés à 30/60/90/180 jours
```

## Explication des fichiers clés

| Chemin | Rôle |
|---|---|
| `issues/<date-slug>/draft.md` | Version de travail de chaque numéro — rédigée et modifiée ici, puis verrouillée dans final.md avant planification dans l'ESP |
| `issues/<date-slug>/final.md` | Copie immuable post-envoi — jamais modifiée après l'envoi ; utilisée pour l'archivage et la réutilisation |
| `issues/<date-slug>/performance-metrics.md` | Taux d'ouverture, CTR, liens populaires, désabonnements, réponses — à remplir à 7, 30 et 60 jours après l'envoi |
| `editorial/content-calendar.md` | Source de vérité unique pour les numéros à venir : date de publication, sujet, emplacement sponsor confirmé ou libre, statut du brouillon |
| `editorial/style-guide.md` | Règles de voix et de mise en forme appliquées par Claude à chaque modification — longueur maximale des phrases, expressions de remplissage interdites, ordre des sections |
| `sponsorships/sponsor-tracker.md` | Pipeline de sponsoring complet du prospect au paiement ; chaque ligne correspond à un deal avec emplacement, tarif, échéance de copie et statut de paiement |
| `sponsorships/media-kit.md` | Taille de l'audience, taux d'ouverture, données démographiques, specs des formats publicitaires et tarifs — le document envoyé aux prospects sponsors entrants et sortants |
| `analytics/weekly-dashboard.md` | Tableau hebdomadaire des métriques clés — utilisé comme contexte lorsque Claude rédige des rapports de performance ou des recommandations de croissance |

## Initialisation rapide

```bash
# Créer la racine du projet
mkdir -p newsletter-business && cd newsletter-business

# Répertoires Claude Code
mkdir -p .claude/commands

# Répertoires des numéros — template + deux numéros récents
mkdir -p issues/_template
mkdir -p issues/2026-06-02-issue-001
mkdir -p issues/2026-05-26-issue-000

# Éditorial
mkdir -p editorial

# Sponsoring
mkdir -p sponsorships

# Croissance
mkdir -p growth

# Modèles
mkdir -p templates

# Analytique
mkdir -p analytics

# Amorcer les fichiers template
touch issues/_template/draft.md
touch issues/_template/performance-metrics.md

# Amorcer les fichiers éditoriaux
touch editorial/content-calendar.md
touch editorial/idea-backlog.md
touch editorial/topic-clusters.md
touch editorial/style-guide.md

# Amorcer les fichiers de sponsoring
touch sponsorships/media-kit.md
touch sponsorships/sponsor-tracker.md
touch sponsorships/ad-copy-templates.md
touch sponsorships/invoice-log.md

# Amorcer les fichiers de croissance
touch growth/referral-program.md
touch growth/acquisition-channels.md
touch growth/experiment-log.md

# Amorcer les fichiers modèles
touch templates/issue-format.md
touch templates/welcome-email.md
touch templates/re-engagement.md
touch templates/social-promo.md

# Amorcer les fichiers analytiques
touch analytics/weekly-dashboard.md
touch analytics/cohort-benchmarks.md

# Initialiser la configuration Claude Code
touch .claude/CLAUDE.md
touch .claude/settings.json

# Installer les compétences
npx claudient add skill productivity/newsletter-writer
npx claudient add skill productivity/stakeholder-comms
npx claudient add skill data-ml/stakeholder-report
npx claudient add skill productivity/vendor-evaluator
npx claudient add skill productivity/process-mapper

# Installer les commandes slash
npx claudient add command write-issue
npx claudient add command edit-issue
npx claudient add command sponsorship-brief
npx claudient add command growth-experiment
npx claudient add command performance-report
npx claudient add command social-promo
npx claudient add command list-health-check

echo "Newsletter business workspace ready."
```

## Modèle CLAUDE.md

```markdown
# Newsletter Business — Instructions Claude

## Ce que c'est

Cet espace de travail gère une publication de newsletter de bout en bout : rédaction et
édition des numéros, planification éditoriale, vente et exécution des partenariats
sponsorisés, expériences de croissance de la liste et analyse des performances.
La newsletter est publiée selon une cadence fixe (hebdomadaire ou bihebdomadaire).
Tout le contenu est rédigé pour une audience de niche spécifique — voir editorial/style-guide.md.

## Stack technique

- ESP + Publication : Beehiiv (principal) — les numéros sont rédigés ici et planifiés dans Beehiiv
- Distribution sociale : Typefully — fils Twitter/X et publications LinkedIn planifiés après envoi
- Planification éditoriale : Notion (calendrier éditorial canonique, reflété dans editorial/content-calendar.md)
- Visuels : Canva — images d'en-tête en 1200x630px, bannières sponsors en 600x200px
- Facturation sponsors : Sponsy (réservation et facturation) + Stripe (traitement des paiements)
- Analytique : analytique native Beehiiv + Google Analytics 4 (trafic sur les pages d'archive)
- Communication : Slack #newsletter-ops pour les alertes d'envoi et confirmations sponsors

## Conventions de répertoires

- issues/<YYYY-MM-DD-issue-NNN>/ — un répertoire par numéro ; toujours utiliser la convention date-slug
- issues/<slug>/draft.md — version de travail active ; modifiée jusqu'au jour d'envoi
- issues/<slug>/final.md — version verrouillée ; coller exactement ce qui a été envoyé à l'ESP
- issues/<slug>/performance-metrics.md — à remplir à 7, 30 et 60 jours après l'envoi
- editorial/ — documents de planification ; content-calendar.md est la source de vérité du calendrier
- sponsorships/ — tous les fichiers liés aux sponsors ; sponsor-tracker.md est la source de vérité du pipeline
- growth/ — journal d'expériences et suivi des canaux ; une ligne par expérience dans experiment-log.md
- analytics/ — tableaux de bord agrégés ; weekly-dashboard.md mis à jour chaque lundi

## Workflow de rédaction d'un numéro

1. Consulter editorial/content-calendar.md pour le prochain sujet planifié
2. Créer le répertoire issues/<YYYY-MM-DD-issue-NNN>/ ; copier issues/_template/draft.md dedans
3. Exécuter /write-issue topic="[sujet]" audience="[persona lecteur]" sponsor="[nom du sponsor ou none]"
4. Relire draft.md ; exécuter /edit-issue draft=issues/<slug>/draft.md pour resserrer et vérifier le style
5. Vérifier sponsorships/sponsor-tracker.md — si un sponsor est confirmé pour cet emplacement, exécuter
   /sponsorship-brief sponsor="[nom]" product="[produit]" cta="[URL]" words=75
6. Coller la copie publicitaire finale dans draft.md à l'emplacement sponsor désigné
7. Relire la copie finale ; copier dans issues/<slug>/final.md ; planifier dans Beehiiv
8. Mettre à jour le statut dans editorial/content-calendar.md à "scheduled"
9. Après envoi : exécuter /social-promo source=issues/<slug>/final.md ; planifier dans Typefully
10. À 7 jours : remplir issues/<slug>/performance-metrics.md depuis le tableau de bord Beehiiv
11. À 30 jours : mettre à jour analytics/weekly-dashboard.md avec les données de rétention par cohorte

## Cadence des partenariats sponsors

- Le pipeline sponsors se trouve dans sponsorships/sponsor-tracker.md — à mettre à jour après chaque contact
- L'échéance de la copie publicitaire est 5 jours ouvrés avant la date d'envoi — à faire respecter par les sponsors
- Tous les nouveaux brouillons de copies publicitaires passent par /sponsorship-brief avant envoi au sponsor pour approbation
- Une fois la copie approuvée par le sponsor, marquer "copy approved" dans sponsor-tracker.md
- Facturer via Sponsy immédiatement après l'envoi du numéro ; enregistrer dans sponsorships/invoice-log.md
- Relancer les factures impayées à 14 jours ; escalader à 30 jours

## Suivi de la santé de la liste

- Exécuter /list-health-check chaque semaine — il lit analytics/weekly-dashboard.md et signale :
    - Baisse du taux d'ouverture >3pp semaine sur semaine (signal de délivrabilité ou de contenu)
    - Taux de désabonnement >0,3% sur un numéro donné (signal d'adéquation contenu/audience)
    - Croissance nette des abonnés en dessous de l'objectif hebdomadaire (signal d'acquisition)
- Si la cohorte inactive depuis 90 jours dépasse 15% de la liste : déclencher la séquence de réactivation
  (utiliser templates/re-engagement.md comme base ; exécuter /edit-issue pour personnaliser)
- Les données de segmentation se trouvent dans Beehiiv — à croiser avec analytics/cohort-benchmarks.md

## Tâches courantes — commandes exactes

**Rédiger un nouveau brouillon de numéro :**
/write-issue topic="[sujet]" audience="[persona]" sponsor="[nom ou none]" length=800

**Modifier et vérifier le style d'un brouillon :**
/edit-issue draft=issues/[slug]/draft.md style=editorial/style-guide.md

**Générer la copie publicitaire d'un sponsor :**
/sponsorship-brief sponsor="[entreprise]" product="[description du produit]" cta="[URL]" words=75

**Générer les publications de promotion sociale :**
/social-promo source=issues/[slug]/final.md channels="twitter,linkedin"

**Rapport de performance hebdomadaire :**
/performance-report dashboard=analytics/weekly-dashboard.md period=7d

**Concevoir une expérience de croissance :**
/growth-experiment channel="[canal]" hypothesis="[hypothèse]" log=growth/experiment-log.md

**Vérification de la santé de la liste :**
/list-health-check dashboard=analytics/weekly-dashboard.md benchmarks=analytics/cohort-benchmarks.md

## Conventions de style (depuis editorial/style-guide.md)

- Lignes d'objet : 9 mots maximum, pas de clickbait, mettre le sujet en avant
- Première phrase : 20 mots maximum, annoncer le point immédiatement
- Paragraphes : 4 phrases maximum ; ne jamais utiliser d'introductions de remplissage ("Dans ce numéro...")
- Emplacements sponsors : clairement délimités, divulgation honnête ("Ce numéro est sponsorisé par...")
- CTA : un CTA principal par numéro ; placer après le corps principal, avant la signature
- Ton : direct, informé, conversationnel — pas de formules corporatives, pas de points d'exclamation
```

## Serveurs MCP

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/${USER}/newsletter-business"
      ]
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/mcp-server-notion"],
      "env": {
        "NOTION_API_KEY": "${NOTION_API_KEY}"
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
    "stripe": {
      "command": "npx",
      "args": ["-y", "@stripe/mcp-server-stripe"],
      "env": {
        "STRIPE_SECRET_KEY": "${STRIPE_SECRET_KEY}"
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
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_OUTPUT_FILE_PATH\"; if [[ \"$FILE\" == */issues/*/draft.md ]]; then echo \"[hook] Draft saved — run /edit-issue to apply style guide before finalising\"; fi'"
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
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$FILE\" == */issues/*/final.md ]]; then echo \"[hook] Writing to final.md — confirm this is the exact copy sent to Beehiiv/Substack before locking\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'cd \"${CLAUDE_PROJECT_DIR}\" 2>/dev/null || exit 0; UNFILLED=$(find issues/ -name \"performance-metrics.md\" -empty 2>/dev/null | grep -v _template | wc -l | tr -d \" \"); [ \"$UNFILLED\" -gt 0 ] && echo \"[reminder] $UNFILLED issue(s) have empty performance-metrics.md — fill from Beehiiv analytics\" || true'"
          }
        ]
      }
    ]
  }
}
```

## Compétences à installer

```bash
npx claudient add skill productivity/newsletter-writer
npx claudient add skill productivity/stakeholder-comms
npx claudient add skill data-ml/stakeholder-report
npx claudient add skill productivity/vendor-evaluator
npx claudient add skill productivity/process-mapper
npx claudient add skill productivity/exec-briefing
npx claudient add skill productivity/founder-weekly-review
```

## Liens connexes

- [Guide : Claude pour les créateurs de contenu](../guides/for-content-creator.md)
- [Workflow : Production d'un numéro de bout en bout](../workflows/newsletter-issue-production.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
