# Activité de Cours en Ligne — Structure de Projet

> Un espace de travail pour créateurs de cours et formateurs : conception de curricula, lancement de produits pédagogiques, gestion de communautés d'apprenants et suivi des revenus d'inscription — piloté par des slash commands et un contexte propre à chaque cours.

## Stack

- **Teachable** / **Kajabi** / **Thinkific** — hébergement de cours, diffusion progressive, suivi de la progression des étudiants, certificats
- **ConvertKit** / **ActiveCampaign** — séquences email, tags abonnés, campagnes broadcast, règles d'automatisation
- **Loom** / **Descript** — enregistrement vidéo asynchrone, capture d'écran, édition de transcriptions, corrections overdub
- **Circle** / **Skool** — communauté d'apprenants, espaces de cohorte, fils de discussion, jalons des membres
- **Stripe** — traitement des paiements, facturation par abonnement, codes promo, gestion des remboursements
- **Canva** — visuels de cours, maquettes de pages de vente, assets réseaux sociaux, modèles de certificats
- **Notion** — tableaux de planification du curriculum, scripting de leçons, calendriers de lancement, SOPs
- **Calendly** — réservation de sessions de coaching individuel, permanences, appels d'onboarding
- **Zapier** — automatisations cross-plateformes (nouvel achat → email de bienvenue, invitation communauté, tag dans ConvertKit)

## Arborescence

```
online-course-business/
├── .claude/
│   ├── CLAUDE.md                                        # instructions de l'espace de travail pour Claude Code
│   ├── settings.json                                    # serveurs MCP, hooks, permissions
│   └── commands/
│       ├── new-course.md                                # /new-course <title> — crée le sous-répertoire complet dans courses/
│       ├── lesson-script.md                             # /lesson-script <module> <lesson-title> — rédige le script complet de la leçon avec accroche, points pédagogiques, CTA
│       ├── email-sequence.md                            # /email-sequence <sequence-name> <num-emails> — rédige une séquence de nurture ou de lancement
│       ├── launch-plan.md                               # /launch-plan <course-slug> <launch-date> — calendrier complet pré/pendant/post lancement
│       ├── sales-page.md                                # /sales-page <course-slug> — rédige le texte long format de la page de vente à partir du plan du curriculum
│       ├── support-reply.md                             # /support-reply <ticket-summary> — rédige une réponse empathique et conforme aux politiques
│       ├── weekly-prompt.md                             # /weekly-prompt <community-platform> — génère le prompt d'engagement communautaire de la semaine
│       └── revenue-snapshot.md                         # /revenue-snapshot — lit les fichiers analytiques et résume les tendances inscriptions + revenus
├── courses/
│   ├── _template/                                       # copier ce répertoire lors de la création d'un nouveau cours
│   │   ├── curriculum-outline.md                        # carte des modules et leçons avec objectifs pédagogiques par leçon
│   │   ├── student-guide.md                             # document d'accueil pour les étudiants : à quoi s'attendre, comment naviguer, prochaines étapes
│   │   ├── assessment-rubric.md                         # critères d'évaluation pour les devoirs ou soumissions de projets
│   │   ├── lesson-scripts/
│   │   │   └── m01-l01-template.md                      # modèle de script de leçon : accroche, enseignement, démonstration, pratique, CTA
│   │   └── slides-notes/
│   │       └── m01-l01-slides-notes.md                  # notes du présentateur diapositive par diapositive, liées au script de leçon
│   ├── accelerate-with-ai/                              # exemple de cours : "Accelerate With AI"
│   │   ├── curriculum-outline.md                        # carte en 6 modules : configuration → prompting → automatisation → contenu → opérations → croissance
│   │   ├── student-guide.md                             # document d'onboarding lié depuis l'email de bienvenue
│   │   ├── assessment-rubric.md                         # rubrique du projet final : clarté du cas d'usage, qualité du prompt, valeur de l'output
│   │   ├── lesson-scripts/
│   │   │   ├── m01-l01-what-is-ai-for-business.md       # accroche : "Vous avez déjà du retard" → contexte → démo Claude → devoir
│   │   │   ├── m01-l02-setting-up-claude-code.md
│   │   │   ├── m02-l01-prompt-fundamentals.md
│   │   │   ├── m02-l02-chain-of-thought-prompting.md
│   │   │   ├── m02-l03-prompt-templates.md
│   │   │   ├── m03-l01-zapier-ai-automations.md
│   │   │   ├── m03-l02-make-scenarios.md
│   │   │   ├── m04-l01-content-at-scale.md
│   │   │   ├── m04-l02-social-repurposing.md
│   │   │   ├── m05-l01-ai-for-ops.md
│   │   │   └── m06-l01-building-your-ai-stack.md
│   │   └── slides-notes/
│   │       ├── m01-l01-slides-notes.md
│   │       ├── m01-l02-slides-notes.md
│   │       ├── m02-l01-slides-notes.md
│   │       ├── m02-l02-slides-notes.md
│   │       └── m02-l03-slides-notes.md
│   └── freelance-to-agency/                             # deuxième cours : "Freelance to Agency"
│       ├── curriculum-outline.md                        # carte en 5 modules : positionnement → offres → recrutement → systèmes → croissance
│       ├── student-guide.md
│       ├── assessment-rubric.md
│       ├── lesson-scripts/
│       │   ├── m01-l01-positioning-statement.md
│       │   ├── m01-l02-niche-selection-framework.md
│       │   ├── m02-l01-packaging-your-offer.md
│       │   ├── m02-l02-pricing-strategy.md
│       │   ├── m03-l01-your-first-hire.md
│       │   └── m04-l01-client-delivery-sop.md
│       └── slides-notes/
│           ├── m01-l01-slides-notes.md
│           └── m01-l02-slides-notes.md
├── marketing/
│   ├── launch-plan.md                                   # calendrier de lancement principal : pré-lancement → ouverture du panier → fermeture → post-lancement
│   ├── sales-page-copy.md                               # page de vente longue : titre, script VSL, bénéfices, FAQ, garantie, CTAs
│   ├── social-calendar.md                               # grille de contenu sur 30 jours : plateforme, type de post, angle, asset nécessaire
│   ├── email-sequences/
│   │   ├── welcome-sequence.md                          # séquence de bienvenue en 5 emails : j0 connexion, j1 victoire rapide, j3 module 1, j7 check-in, j14 jalon
│   │   ├── pre-launch-waitlist.md                       # liste d'attente en 7 emails : agitation du problème → teasing → preuve sociale → CTA early-bird
│   │   ├── launch-sequence.md                           # séquence d'ouverture de panier en 10 emails : ouverture → valeur → FAQ → clôture → dernière chance
│   │   ├── post-purchase-nurture.md                     # séquence post-achat en 4 emails : confirmation → accès → première victoire → upsell coaching
│   │   ├── re-engagement.md                             # réengagement en 3 emails pour abonnés inactifs depuis plus de 90 jours
│   │   └── affiliate-onboarding.md                      # séquence en 4 emails pour nouveaux affiliés : assets → swipe copy → liens de tracking → structure des bonus
│   └── webinar-scripts/
│       ├── masterclass-free.md                          # script de formation gratuite : présentation de 60 min à forte valeur avec pitch à la 45e minute
│       └── sales-webinar.md                             # webinaire de lancement live : histoire → framework → études de cas → offre → Q&R
├── community/
│   ├── onboarding-message.md                            # post de bienvenue épinglé pour Circle/Skool : règles, navigation, premier post suggéré
│   ├── weekly-prompts.md                                # journal sur 52 semaines de prompts d'engagement communautaire — un par semaine
│   ├── member-milestones.md                             # modèles de célébration des jalons : module 1 terminé, mi-parcours, diplôme, demande de témoignage
│   └── moderation-guidelines.md                        # règles communautaires, niveaux de violation, critères de bannissement, parcours d'escalade
├── operations/
│   ├── student-support-templates.md                     # réponses types : problèmes de connexion, demandes de remboursement, questions de facturation, extensions d'accès
│   ├── refund-policy.md                                 # conditions de la garantie satisfaction 30 jours, procédure de demande, délai de traitement
│   ├── affiliate-program.md                             # structure des commissions (30 %), fenêtre de cookie, calendrier de versement, méthodes promotionnelles interdites
│   ├── pricing-strategy.md                              # logique des paliers, plans de paiement, stratégie de coupons, tarification evergreen vs lancement
│   ├── onboarding-sop.md                                # étape par étape : nouvel étudiant → accès Teachable → invitation Circle → tag ConvertKit → lien Calendly
│   └── zapier-automations.md                            # inventaire documenté des Zaps : déclencheur → filtre → action pour chaque automatisation active
├── analytics/
│   ├── enrollment-tracker.md                            # nombre d'inscriptions mensuelles par cours, canal et source de campagne
│   ├── completion-rates.md                              # taux de complétion module par module et points d'abandon par cohorte
│   ├── revenue-dashboard.md                             # MRR, LTV, taux de remboursement, versements affiliés — mis à jour mensuellement
│   └── email-metrics.md                                 # taux d'ouverture, CTR, désinscriptions par séquence et broadcast — suivi hebdomadaire
└── assets/
    ├── canva-templates.md                               # liens vers la bibliothèque Canva partagée : miniatures, posts sociaux, certificat, visuels de page de vente
    ├── brand-guide.md                                   # couleurs hex, polices, utilisation du logo, ton éditorial, exemples à faire / à éviter
    └── loom-recordings-log.md                           # inventaire des liens Loom par module et leçon avec date d'enregistrement et statut
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `.claude/commands/lesson-script.md` | Slash command qui lit le fichier `curriculum-outline.md` du cours et l'objectif pédagogique du module cible, puis rédige un script de leçon complet avec une accroche pattern-interrupt, trois points d'enseignement, un segment de démonstration, un exercice pratique et un CTA clair — prêt à être enregistré dans Loom ou Descript |
| `.claude/commands/email-sequence.md` | Accepte un nom de séquence et un nombre d'emails, lit le plan du cours correspondant pour le contexte, et rédige chaque email avec l'objet, le texte d'aperçu, le corps et le CTA — formatage compatible ConvertKit |
| `.claude/commands/sales-page.md` | Lit `curriculum-outline.md`, `student-guide.md` et `assessment-rubric.md` du cours, puis rédige une page de vente longue format avec script VSL, liste de bénéfices, présentation module par module, FAQ, bloc de garantie et plusieurs CTAs |
| `.claude/commands/support-reply.md` | Reçoit un résumé de ticket, lit `operations/refund-policy.md` et `operations/student-support-templates.md`, et rédige une réponse empathique conforme aux politiques — signale les cas limites nécessitant une escalade humaine |
| `courses/<slug>/curriculum-outline.md` | Source de vérité pour chaque cours : titres des modules, titres des leçons et un objectif pédagogique par leçon en une ligne — toutes les autres commandes lisent ce fichier en premier |
| `marketing/launch-plan.md` | Calendrier de lancement principal avec les phases pré-lancement (30 jours), ouverture du panier (7 jours) et post-lancement (14 jours) — chaque jour comporte un canal, une tâche et un angle de texte |
| `operations/zapier-automations.md` | Inventaire vivant de chaque Zap actif : événement déclencheur, filtres et étapes d'action — évite les automatisations dupliquées et facilite le débogage |
| `analytics/revenue-dashboard.md` | Instantané mensuel des revenus : chiffre d'affaires brut, remboursements, net, MRR par cours, LTV par canal d'acquisition — la commande `/revenue-snapshot` lit et résume ce fichier |

## Initialisation rapide

```bash
# Créer la racine de l'espace de travail et la configuration Claude
mkdir -p online-course-business/.claude/commands

# Créer le modèle de cours
mkdir -p online-course-business/courses/_template/lesson-scripts
mkdir -p online-course-business/courses/_template/slides-notes

# Créer les répertoires des cours exemples
mkdir -p online-course-business/courses/accelerate-with-ai/lesson-scripts
mkdir -p online-course-business/courses/accelerate-with-ai/slides-notes
mkdir -p online-course-business/courses/freelance-to-agency/lesson-scripts
mkdir -p online-course-business/courses/freelance-to-agency/slides-notes

# Créer les répertoires marketing
mkdir -p online-course-business/marketing/email-sequences
mkdir -p online-course-business/marketing/webinar-scripts

# Créer les répertoires communauté, opérations, analytique et assets
mkdir -p online-course-business/community
mkdir -p online-course-business/operations
mkdir -p online-course-business/analytics
mkdir -p online-course-business/assets

# Initialiser les slash commands
touch online-course-business/.claude/commands/new-course.md
touch online-course-business/.claude/commands/lesson-script.md
touch online-course-business/.claude/commands/email-sequence.md
touch online-course-business/.claude/commands/launch-plan.md
touch online-course-business/.claude/commands/sales-page.md
touch online-course-business/.claude/commands/support-reply.md
touch online-course-business/.claude/commands/weekly-prompt.md
touch online-course-business/.claude/commands/revenue-snapshot.md

# Initialiser les fichiers du modèle de cours
touch online-course-business/courses/_template/curriculum-outline.md
touch online-course-business/courses/_template/student-guide.md
touch online-course-business/courses/_template/assessment-rubric.md
touch online-course-business/courses/_template/lesson-scripts/m01-l01-template.md
touch online-course-business/courses/_template/slides-notes/m01-l01-slides-notes.md

# Initialiser les fichiers marketing
touch online-course-business/marketing/launch-plan.md
touch online-course-business/marketing/sales-page-copy.md
touch online-course-business/marketing/social-calendar.md
touch online-course-business/marketing/email-sequences/welcome-sequence.md
touch online-course-business/marketing/email-sequences/pre-launch-waitlist.md
touch online-course-business/marketing/email-sequences/launch-sequence.md
touch online-course-business/marketing/email-sequences/post-purchase-nurture.md
touch online-course-business/marketing/email-sequences/re-engagement.md
touch online-course-business/marketing/email-sequences/affiliate-onboarding.md
touch online-course-business/marketing/webinar-scripts/masterclass-free.md
touch online-course-business/marketing/webinar-scripts/sales-webinar.md

# Initialiser les fichiers communauté
touch online-course-business/community/onboarding-message.md
touch online-course-business/community/weekly-prompts.md
touch online-course-business/community/member-milestones.md
touch online-course-business/community/moderation-guidelines.md

# Initialiser les fichiers opérations
touch online-course-business/operations/student-support-templates.md
touch online-course-business/operations/refund-policy.md
touch online-course-business/operations/affiliate-program.md
touch online-course-business/operations/pricing-strategy.md
touch online-course-business/operations/onboarding-sop.md
touch online-course-business/operations/zapier-automations.md

# Initialiser les fichiers analytiques
touch online-course-business/analytics/enrollment-tracker.md
touch online-course-business/analytics/completion-rates.md
touch online-course-business/analytics/revenue-dashboard.md
touch online-course-business/analytics/email-metrics.md

# Initialiser les fichiers assets
touch online-course-business/assets/canva-templates.md
touch online-course-business/assets/brand-guide.md
touch online-course-business/assets/loom-recordings-log.md

# Installer les skills pertinents
npx claudient add skill productivity/lesson-planner
npx claudient add skill productivity/stakeholder-comms
npx claudient add skill productivity/process-mapper
npx claudient add skill productivity/exec-briefing
npx claudient add skill data-ml/de/stakeholder-report
```

## Modèle CLAUDE.md

```markdown
# Activité de Cours en Ligne — Instructions Claude Code

## Ce qu'est cet espace

Ceci est un espace de travail pour créateur de cours. Il contient les curricula de plusieurs cours,
les textes marketing et séquences email, le contenu de gestion communautaire, les opérations de
support aux étudiants et les analyses de revenus. Claude Code intervient ici en tant que rédacteur
de curriculum, copywriter de lancement, rédacteur de support et synthétiseur d'analytique —
en lisant toujours le contexte propre au cours avant de générer tout contenu.

Ne jamais inventer une structure de curriculum. Toujours lire le curriculum-outline.md pertinent en premier.

## Stack

- Plateforme de cours : Teachable / Kajabi / Thinkific — hébergement, diffusion progressive, suivi de progression
- Email : ConvertKit / ActiveCampaign — séquences, broadcasts, tags abonnés
- Vidéo : Loom / Descript — enregistrement de leçons, édition de transcriptions, overdub
- Communauté : Circle / Skool — discussions, espaces de cohorte, jalons
- Paiements : Stripe — paiements uniques, plans de paiement, abonnements, remboursements
- Visuels : Canva — miniatures, assets de vente, certificats
- Planification : Notion — tableaux de curriculum, calendriers de lancement, SOPs
- Planification : Calendly — sessions de coaching, permanences, appels d'onboarding
- Automatisation : Zapier — déclencheurs cross-plateformes (achat → accès → email → communauté)

## Tâches courantes et commandes exactes

Créer un nouveau cours :
  /new-course <title>
  → Crée courses/<slug>/ avec curriculum-outline.md, student-guide.md, assessment-rubric.md,
    lesson-scripts/ et slides-notes/ depuis le répertoire _template

Rédiger un script de leçon :
  /lesson-script <course-slug> <module-number> <lesson-title>
  → Lit courses/<slug>/curriculum-outline.md pour l'objectif de la leçon, puis rédige un script
    complet : accroche pattern-interrupt, trois points d'enseignement, démo, exercice pratique, CTA

Rédiger une séquence email :
  /email-sequence <sequence-name> <num-emails>
  → Lit le plan du cours pertinent pour le contexte ; rédige chaque email avec objet, texte d'aperçu,
    corps et CTA au format compatible ConvertKit

Rédiger un plan de lancement :
  /launch-plan <course-slug> <launch-date>
  → Lit marketing/launch-plan.md pour la structure ; produit un calendrier daté pré-lancement/ouverture
    du panier/post-lancement avec tâche, canal et angle de texte pour chaque jour

Rédiger une page de vente :
  /sales-page <course-slug>
  → Lit curriculum-outline.md, student-guide.md ; rédige un texte long format avec script VSL,
    liste de bénéfices, présentation des modules, FAQ, bloc de garantie et CTAs

Répondre à un ticket support :
  /support-reply <ticket-summary>
  → Lit operations/refund-policy.md et operations/student-support-templates.md ; rédige une réponse
    empathique conforme aux politiques ; signale les déclencheurs d'escalade

Générer un prompt communautaire :
  /weekly-prompt <platform>
  → platform est l'une des valeurs suivantes : circle / skool / slack
  → Rédige le prompt d'engagement de la semaine en référence à la phase actuelle du cours dans la communauté

Résumer les revenus :
  /revenue-snapshot
  → Lit analytics/revenue-dashboard.md, analytics/enrollment-tracker.md ; produit un résumé clair
    MRR/inscriptions/remboursements avec mise en évidence des tendances

## Flux de conception du curriculum

1. Rédiger curriculum-outline.md — modules, leçons, un objectif par leçon en une ligne
2. Rédiger les lesson-scripts/ dans l'ordre — utiliser /lesson-script pour chaque leçon
3. Ajouter les slides-notes/ liées au script de leçon ligne par ligne
4. Rédiger student-guide.md — navigation, attentes, première étape de victoire rapide
5. Rédiger assessment-rubric.md — critères et pondérations pour les devoirs
6. Enregistrer dans Loom ou Descript — consigner le lien dans assets/loom-recordings-log.md

## Ordre de la séquence de lancement

1. marketing/email-sequences/pre-launch-waitlist.md — activer 30 jours avant l'ouverture du panier
2. marketing/webinar-scripts/masterclass-free.md — organiser 7 jours avant l'ouverture du panier
3. marketing/sales-page-copy.md — publier le jour de l'ouverture du panier
4. marketing/email-sequences/launch-sequence.md — activer à l'ouverture du panier
5. marketing/launch-plan.md — exécution des tâches quotidiennes jusqu'à la fermeture du panier
6. marketing/email-sequences/post-purchase-nurture.md — activer sur déclencheur d'achat dans Stripe/Zapier

## Triage du support étudiant

Niveau 1 — en libre-service (utiliser /support-reply) : problèmes de connexion, délais d'accès, reçus de facturation,
  questions de navigation → correspondre à la réponse type dans operations/student-support-templates.md

Niveau 2 — jugement requis (rédiger + signaler pour révision) : demandes de remboursement dans la fenêtre des 30 jours,
  demandes d'extension d'accès, problèmes techniques de lecture → lire refund-policy.md avant de rédiger

Niveau 3 — escalade immédiate (ne pas rédiger) : contestations de paiement, plaintes juridiques, signalements de harcèlement,
  fraude affiliée → noter dans le ticket et router vers un humain

## Conventions de l'espace de travail

- Les répertoires de cours sont nommés avec des slugs kebab-case correspondant au slug URL Teachable/Kajabi
- Les scripts de leçon sont nommés m<numéro-module>-l<numéro-leçon>-<slug>.md (ex. : m02-l03-prompt-templates.md)
- Les notes de diapositives sont nommées de façon identique aux scripts de leçon avec le suffixe -slides-notes
- Les séquences email utilisent des préfixes numérotés quand l'ordre importe : 01-day0-welcome.md, 02-day1-quick-win.md
- Toutes les dates de lancement dans marketing/ utilisent le format ISO 8601 (YYYY-MM-DD) — pas de formats de dates ambigus
- Consigner chaque nouvelle automatisation Zapier dans operations/zapier-automations.md le jour de sa mise en production

## À ne pas faire

- Ne pas rédiger de scripts de leçon sans avoir d'abord lu le curriculum-outline.md du cours concerné
- Ne pas rédiger une page de vente sans lire ce que le cours enseigne réellement — pas d'affirmations inventées
- Ne pas approuver de remboursements ni accorder d'extensions d'accès — /support-reply produit des brouillons uniquement, un humain envoie
- Ne pas stocker d'adresses email d'étudiants, d'identifiants clients Stripe ou de données de paiement dans les fichiers de l'espace de travail
- Ne pas commiter les fichiers analytics/ contenant des dossiers individuels d'étudiants dans un dépôt distant
```

## Serveurs MCP

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropic-ai/mcp-server-filesystem",
        "/Users/$USER/online-course-business/courses",
        "/Users/$USER/online-course-business/marketing",
        "/Users/$USER/online-course-business/operations",
        "/Users/$USER/online-course-business/analytics"
      ]
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/mcp-server-notion"],
      "env": {
        "NOTION_API_KEY": "${NOTION_API_KEY}"
      }
    },
    "convertkit": {
      "command": "npx",
      "args": ["-y", "@convertkit/mcp-server"],
      "env": {
        "CONVERTKIT_API_KEY": "${CONVERTKIT_API_KEY}",
        "CONVERTKIT_API_SECRET": "${CONVERTKIT_API_SECRET}"
      }
    },
    "stripe": {
      "command": "npx",
      "args": ["-y", "@stripe/mcp-server"],
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
            "command": "if echo \"$CLAUDE_TOOL_INPUT\" | python3 -c \"import sys,json; p=json.load(sys.stdin).get('path',''); print(p)\" 2>/dev/null | grep -q 'lesson-scripts/'; then echo '[course-business] Script de leçon rédigé — vérifier qu'un fichier slides-notes/ correspondant existe et que l'enregistrement Loom est consigné dans assets/loom-recordings-log.md.'; fi"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "if echo \"$CLAUDE_TOOL_INPUT\" | python3 -c \"import sys,json; p=json.load(sys.stdin).get('path',''); print(p)\" 2>/dev/null | grep -q 'email-sequences/'; then echo '[course-business] Séquence email rédigée — vérifier que les lignes d'objet font moins de 50 caractères et que chaque email comporte un seul CTA clair avant de charger dans ConvertKit.'; fi"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "echo '[course-business] Session terminée. Rappel : mettre à jour analytics/enrollment-tracker.md si de nouvelles inscriptions ont été traitées, et consigner toutes les nouvelles automatisations Zapier dans operations/zapier-automations.md.'"
          }
        ]
      }
    ]
  }
}
```

## Skills à installer

```bash
npx claudient add skill productivity/lesson-planner
npx claudient add skill productivity/stakeholder-comms
npx claudient add skill productivity/process-mapper
npx claudient add skill productivity/exec-briefing
npx claudient add skill productivity/vendor-evaluator
npx claudient add skill productivity/doc-site-builder
npx claudient add skill data-ml/stakeholder-report
```

## Liens connexes

- [Guide du créateur de cours](../guides/for-course-creator.md)
- [Workflow de lancement de cours](../workflows/course-launch.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
