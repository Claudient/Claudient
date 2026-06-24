# Espace de travail Growth Marketer — Structure de projet

> Pour les growth marketers qui gèrent l'intégralité de la boucle acquisition-rétention — conception d'expériences, gestion des canaux payants, CRO de l'entonnoir, analyse de cohortes et rapports de croissance hebdomadaires — dans un seul espace de travail Claude Code.

## Stack

- **Analytics produit :** Mixpanel (suivi d'événements, entonnoirs, cohortes, rétention) ou Amplitude (analytics comportementale, graphiques, notebooks)
- **CDP :** Segment (collecte d'événements, résolution d'identité, synchronisation d'audiences vers les plateformes publicitaires)
- **Acquisition payante :** Google Ads (search, performance max, display) + Meta Ads (Facebook + Instagram, ciblage par audience)
- **Expérimentation :** Optimizely (feature flags, expériences web, moteur statistique) ou GrowthBook (A/B open-source, feature flags, bayésien + fréquentiste)
- **Automatisation marketing :** HubSpot (étapes du cycle de vie, workflows email, lead scoring, attribution de campagne)
- **Analytics web :** Google Analytics 4 (sources de trafic, événements de conversion, exploration d'entonnoir)
- **Design de landing pages :** Figma (wireframes, maquettes haute-fidélité, specs de passation pour dev ou no-code)
- **Communication :** Slack (canal growth, alertes d'expériences, digest hebdomadaire)
- **Compétences Claude Code :** marketing/experiment-tracker, marketing/growth-dashboard, marketing/paid-ads, marketing/page-cro, marketing/onboarding-cro, marketing/referral-program, marketing/pricing-strategy

## Arborescence

```
growth-marketer-workspace/
├── .claude/
│   ├── CLAUDE.md                                  # Instructions de l'espace de travail pour Claude Code
│   ├── settings.json                              # Serveurs MCP, hooks, permissions
│   └── commands/
│       ├── experiment-design.md                   # /experiment-design — reçoit une hypothèse, produit une spec de test complète
│       ├── funnel-analysis.md                     # /funnel-analysis — cartographie les abandons à chaque étape depuis les données Mixpanel
│       ├── ad-copy-test.md                        # /ad-copy-test — génère des variantes de texte publicitaire pour les tests A/B
│       ├── cro-audit.md                           # /cro-audit — analyse la landing page selon les bonnes pratiques CRO
│       ├── cohort-analysis.md                     # /cohort-analysis — analyse la rétention par cohorte d'inscription
│       ├── growth-report.md                       # /growth-report — rapport hebdomadaire de la métrique principale + résumé par canal
│       └── channel-review.md                      # /channel-review — revue du ROI et de l'efficacité par canal payant
├── experiments/
│   ├── _template/
│   │   ├── hypothesis.md                          # Format d'hypothèse : Si [action] alors [résultat] parce que [raison]
│   │   ├── test-design.md                         # Spec contrôle vs. variante, répartition d'audience, métriques de succès
│   │   └── results.md                             # Vérification de la signification statistique, % de lift, intervalle de confiance, décision
│   ├── 2026-06-checkout-cta-copy/
│   │   ├── hypothesis.md                          # Hypothèse : un CTA directionnel génère un CVR de paiement plus élevé
│   │   ├── test-design.md                         # Répartition 50/50, flag GrowthBook : checkout-cta-v2, n=4000
│   │   ├── results.md                             # +8,3% de lift, IC à 95%, déployé à 100%
│   │   └── segment-breakdown.md                   # Résultats segmentés par appareil, source de trafic, type de plan
│   ├── 2026-06-pricing-page-layout/
│   │   ├── hypothesis.md
│   │   ├── test-design.md                         # Test à 3 variantes : actuelle, annuelle en premier, tableau de fonctionnalités
│   │   ├── results.md
│   │   └── heatmap-notes.md                       # Observations Hotjar / FullStory durant le test
│   ├── 2026-05-onboarding-email-sequence/
│   │   ├── hypothesis.md
│   │   ├── test-design.md
│   │   ├── results.md
│   │   └── cohort-comparison.md                   # Rétention à J+7 et J+30 pour les cohortes test vs. contrôle
│   └── backlog.md                                 # File d'attente d'expériences priorisées (scoring ICE)
├── funnels/
│   ├── acquisition-funnel.md                      # Visiteur → Essai → Activation → Payant — définition des étapes
│   ├── activation-funnel.md                       # Inscription → Moment Aha — séquence d'événements et benchmarks
│   ├── conversion-benchmarks.md                   # CVR actuels par étape vs. benchmarks sectoriels
│   ├── drop-off-analysis/
│   │   ├── 2026-06-checkout-drop-off.md           # Analyse des points de sortie : où les utilisateurs quittent le paiement
│   │   ├── 2026-05-onboarding-drop-off.md         # Entonnoir de complétion de l'onboarding étape par étape
│   │   └── 2026-04-trial-to-paid-drop-off.md      # Analyse des freins à la conversion — prix, timing, fonctionnalités
│   └── funnel-maps/
│       ├── top-of-funnel.md                       # Payant + organique → landing page → inscription à l'essai
│       ├── mid-funnel.md                          # Essai → événements d'activation → signaux d'intention de mise à niveau
│       └── bottom-of-funnel.md                   # Déclencheurs de mise à niveau, page de tarification, flux de paiement
├── paid/
│   ├── _briefs/
│   │   ├── brief-template.md                      # Brief de campagne : objectif, audience, budget, specs créatives
│   │   ├── 2026-06-google-search-trial.md         # Brief : générer des inscriptions à l'essai via recherche brandée + concurrents
│   │   ├── 2026-06-meta-retargeting-q2.md         # Brief : recibler les utilisateurs en essai non convertis en 7 jours
│   │   └── 2026-05-linkedin-icp-awareness.md      # Brief : notoriété de marque auprès des postes ICP dans les secteurs cibles
│   ├── ad-copy/
│   │   ├── google-search/
│   │   │   ├── branded-variants.md                # Variantes de titres + descriptions RSA pour les termes brandés
│   │   │   ├── competitor-variants.md             # Textes pour les campagnes de conquête concurrentielle
│   │   │   └── generic-variants.md                # Textes sur mots-clés non brandés (ex. : "outil d'analytics de croissance")
│   │   └── meta/
│   │       ├── awareness-copy.md                  # Texte créatif haut de funnel : accroche, corps, CTA
│   │       ├── retargeting-copy.md                # Texte milieu de funnel : traitement des objections, preuve sociale
│   │       └── conversion-copy.md                 # Bas de funnel : axé offre, urgence, réponse directe
│   └── performance-logs/
│       ├── 2026-06-weekly.md                      # CPC, CTR, CVR, CPA, ROAS par campagne — snapshot hebdomadaire
│       ├── 2026-05-weekly.md
│       └── budget-tracker.md                      # Dépenses mensuelles vs. budget par canal et campagne
├── landing-pages/
│   ├── _briefs/
│   │   ├── page-brief-template.md                 # Brief : objectif, source de trafic, audience, hypothèse, CTA
│   │   ├── 2026-06-trial-signup-v3.md             # Brief pour la landing page d'essai redessinée
│   │   └── 2026-05-pricing-page-refresh.md        # Brief : mise en avant du plan annuel, tableau de comparaison des fonctionnalités
│   ├── cro-notes/
│   │   ├── trial-signup-cro-audit.md              # Audit CRO : points de friction, signaux de confiance, champs du formulaire
│   │   ├── pricing-page-cro-audit.md              # Audit CRO : clarté des plans, traitement des objections, placement du CTA
│   │   └── homepage-cro-audit.md                  # Audit CRO : clarté de la proposition de valeur, analyse au-dessus de la ligne de flottaison
│   └── test-results/
│       ├── trial-page-v2-vs-v3.md                 # Résultat A/B : V3 +12% CVR, déployé
│       ├── pricing-annual-vs-monthly.md            # Résultat A/B : la mise en avant annuelle a augmenté le mix ARR de 9%
│       └── homepage-headline-test.md              # Test multivarié de titre — non concluant, prolongé
├── retention/
│   ├── churn-analysis/
│   │   ├── 2026-q2-churn-report.md                # Taux de churn, codes de raison, ventilation par segment
│   │   ├── 2026-q1-churn-report.md
│   │   └── churn-risk-signals.md                  # Signaux comportementaux corrélés au churn (Mixpanel)
│   ├── win-back/
│   │   ├── win-back-sequence.md                   # Séquence de 3 emails win-back : offre de ré-engagement, témoignage, CTA final
│   │   ├── win-back-segment-rules.md              # Conditions de déclenchement du workflow HubSpot pour l'inscription au win-back
│   │   └── win-back-results.md                    # Taux de récupération par raison de churn et délai depuis le churn
│   └── lifecycle-emails/
│       ├── day-3-activation-nudge.md              # Email pour les utilisateurs n'ayant pas atteint l'événement d'activation à J+3
│       ├── day-7-check-in.md                      # Email de suivi + lien tutoriel pour les utilisateurs peu engagés
│       └── day-30-upgrade-prompt.md               # Email de mise à niveau déclenché sur un jalon d'utilisation
├── reports/
│   ├── weekly-growth-dashboard/
│   │   ├── 2026-W22.md                            # Métrique principale, CAC par canal, ajouts MRR, statut des expériences
│   │   ├── 2026-W21.md
│   │   └── _template.md                           # Modèle pour le tableau de bord de croissance hebdomadaire
│   ├── channel-roi/
│   │   ├── 2026-q2-channel-roi.md                 # CAC, ratio LTV:CAC, délai de récupération par canal
│   │   └── 2026-q1-channel-roi.md
│   └── north-star-tracking/
│       ├── north-star-definition.md               # Définition de la métrique, pourquoi elle importe, comment elle est mesurée
│       └── north-star-log.md                      # Valeur hebdomadaire de la métrique principale + écart par rapport à la cible
└── notes/
    ├── ice-scoring-rubric.md                      # Guide de scoring ICE (Impact / Confiance / Facilité) pour les expériences
    ├── growth-model.md                            # Modèle de croissance bottom-up : entrées, leviers, sensibilités
    └── competitor-intel.md                        # Mouvements observés des concurrents, tarification, activité sur les canaux
```

## Fichiers clés expliqués

| Chemin | Objectif |
|---|---|
| `.claude/commands/experiment-design.md` | Reçoit une chaîne d'hypothèse et produit une spec de test complète : définition du contrôle et de la variante, métriques primaires et de garde-fou, effet minimal détectable, taille d'échantillon requise, durée du test, nom du flag GrowthBook ou Optimizely, et critères de décision |
| `.claude/commands/funnel-analysis.md` | Lit les données d'abandon depuis les exports Mixpanel/Amplitude ou des captures d'entonnoir collées, cartographie les taux de conversion à chaque étape, identifie la fuite à plus fort impact et propose des expériences pour y remédier |
| `.claude/commands/cro-audit.md` | Analyse une URL de landing page ou une spec Figma selon les principes CRO : proposition de valeur au-dessus de la ligne de flottaison, clarté du CTA, friction du formulaire, signaux de confiance, indicateurs de vitesse de page et utilisabilité mobile — produit un audit scoré avec des corrections priorisées |
| `.claude/commands/growth-report.md` | Génère un rapport de croissance hebdomadaire couvrant la tendance de la métrique principale, les ajouts MRR/ARR, le CAC par canal, le statut des principales expériences et les risques — formaté pour le digest Slack ou la revue de direction |
| `experiments/_template/` | Répertoire de modèle d'expérience de référence — à copier dans `experiments/<date>-<slug>/` avant tout test ; garantit que chaque expérience documente systématiquement l'hypothèse, la conception et les résultats |
| `experiments/backlog.md` | File d'attente d'expériences scorée ICE ; la liste de priorisation canonique consultée avant de démarrer tout nouveau test |
| `retention/churn-analysis/churn-risk-signals.md` | Signaux comportementaux de Mixpanel corrélés au churn dans les 30 jours — utilisés pour déclencher des emails de cycle de vie proactifs et signaler les comptes à risque au service client |
| `reports/north-star-tracking/north-star-definition.md` | Source de vérité unique sur ce qu'est la métrique principale, comment elle est calculée dans Mixpanel/Amplitude, et quelle est la cible hebdomadaire |

## Scaffold rapide

```bash
# Créer le répertoire racine de l'espace de travail
mkdir -p growth-marketer-workspace && cd growth-marketer-workspace

# Répertoires Claude Code
mkdir -p .claude/commands

# Expériences
mkdir -p experiments/_template
mkdir -p experiments/2026-06-checkout-cta-copy
mkdir -p experiments/2026-06-pricing-page-layout

# Entonnoirs
mkdir -p funnels/drop-off-analysis
mkdir -p funnels/funnel-maps

# Acquisition payante
mkdir -p paid/_briefs
mkdir -p paid/ad-copy/google-search
mkdir -p paid/ad-copy/meta
mkdir -p paid/performance-logs

# Landing pages
mkdir -p landing-pages/_briefs
mkdir -p landing-pages/cro-notes
mkdir -p landing-pages/test-results

# Rétention
mkdir -p retention/churn-analysis
mkdir -p retention/win-back
mkdir -p retention/lifecycle-emails

# Rapports
mkdir -p reports/weekly-growth-dashboard
mkdir -p reports/channel-roi
mkdir -p reports/north-star-tracking

# Notes
mkdir -p notes

# Initialiser les fichiers clés
touch .claude/CLAUDE.md
touch .claude/settings.json
touch experiments/_template/hypothesis.md
touch experiments/_template/test-design.md
touch experiments/_template/results.md
touch experiments/backlog.md
touch funnels/acquisition-funnel.md
touch funnels/conversion-benchmarks.md
touch paid/_briefs/brief-template.md
touch paid/performance-logs/budget-tracker.md
touch landing-pages/_briefs/page-brief-template.md
touch reports/weekly-growth-dashboard/_template.md
touch reports/north-star-tracking/north-star-definition.md
touch reports/north-star-tracking/north-star-log.md
touch notes/ice-scoring-rubric.md
touch notes/growth-model.md

# Installer toutes les compétences growth marketing
npx uitkit add skill marketing/experiment-tracker
npx uitkit add skill marketing/growth-dashboard
npx uitkit add skill marketing/paid-ads
npx uitkit add skill marketing/page-cro
npx uitkit add skill marketing/onboarding-cro
npx uitkit add skill marketing/referral-program
npx uitkit add skill marketing/pricing-strategy

# Installer les commandes slash
npx uitkit add command experiment-design
npx uitkit add command funnel-analysis
npx uitkit add command ad-copy-test
npx uitkit add command cro-audit
npx uitkit add command cohort-analysis
npx uitkit add command growth-report
npx uitkit add command channel-review

echo "Growth marketer workspace ready."
```

## Modèle CLAUDE.md

```markdown
# Espace de travail Growth Marketer — Instructions Claude

## Présentation

Cet espace de travail gère l'intégralité de la boucle de croissance : conception et suivi
des expériences, acquisition payante (Google Ads + Meta), CRO des landing pages,
analyse d'entonnoir, analyse de cohortes et de rétention, et reporting de croissance
hebdomadaire. La métrique principale et toutes les décisions d'expérimentation sont
gérées ici.

## Stack

- Analytics produit : Mixpanel — source primaire pour les entonnoirs, cohortes, rétention,
  comportement utilisateur au niveau événementiel
- CDP : Segment — routage d'événements, résolution d'identité, synchronisation d'audiences vers les plateformes publicitaires
- Canaux payants : Google Ads (search + PMax) et Meta Ads (Facebook + Instagram)
- Expérimentation : GrowthBook — feature flags, assignation aux tests A/B, moteur statistique bayésien
- Automatisation marketing : HubSpot — étapes du cycle de vie, workflows email, lead scoring
- Analytics web : Google Analytics 4 — attribution du trafic, événements de conversion macro
- Design : Figma — wireframes et specs haute-fidélité pour les landing pages
- Communication : canal Slack #growth pour les alertes d'expériences et le digest hebdomadaire

## Conventions de répertoire

- experiments/<date>-<slug>/ — un répertoire par expérience ; toujours copier _template/
- funnels/ — les cartographies d'entonnoir et analyses d'abandon sont ici ; ne jamais écraser, ajouter des fichiers datés
- paid/_briefs/ — brief de campagne avant le lancement de toute campagne payante
- paid/performance-logs/ — snapshots hebdomadaires de CPC, CTR, CVR, CPA, ROAS par campagne
- landing-pages/cro-notes/ — un fichier par page ; ajouter les conclusions, ne jamais écraser
- retention/churn-analysis/ — rapports de churn trimestriels + doc pérenne sur les signaux de risque
- reports/weekly-growth-dashboard/ — un fichier par semaine, nommé YYYY-WWW

## Tâches courantes — commandes exactes

**Concevoir une nouvelle expérience :**
/experiment-design hypothesis="Si [action] alors [métrique] va [direction] parce que [raison]" audience="[segment]" metric="[métrique primaire dans Mixpanel]"

**Analyser un abandon d'entonnoir :**
/funnel-analysis funnel=funnels/acquisition-funnel.md data="[sortie d'entonnoir Mixpanel collée ou chemin CSV]"

**Générer des variantes de texte publicitaire :**
/ad-copy-test channel="[google-search|meta]" goal="[trial|awareness|retargeting]" offer="[offre ou proposition de valeur]" variants=5

**Auditer une landing page :**
/cro-audit url="[URL de la landing page]" goal="[inscription à l'essai|demande de démo]" traffic-source="[search payant|organique|email]"

**Effectuer une analyse de cohortes :**
/cohort-analysis cohort-def="[plage de dates d'inscription ou segment]" metric="[rétention à J+7|CVR essai-vers-payant]" data="[chemin d'export Mixpanel/Amplitude]"

**Générer le rapport de croissance hebdomadaire :**
/growth-report week="[YYYY-WXX]" north-star="[valeur actuelle]" target="[cible hebdomadaire]"

**Analyser un canal payant :**
/channel-review channel="[google|meta|linkedin]" period="[2026-06]" data=paid/performance-logs/[fichier].md

## Conventions d'expérimentation

- Chaque expérience commence avec une hypothèse au format experiments/_template/hypothesis.md
- Scorer chaque nouvelle idée d'expérience avec ICE dans experiments/backlog.md avant la planification
- La taille minimale d'échantillon doit être calculée avant le lancement — pas de tailles d'échantillon intuitives
- La métrique primaire doit être un événement Mixpanel ; les métriques de garde-fou doivent inclure au moins une
  métrique en aval (ex. : rétention à J+30 si la primaire est le CVR d'essai)
- Seuil de signification statistique : confiance à 95% ; durée minimale : 14 jours
- Résultats documentés dans results.md dans les 48 heures suivant la conclusion de l'expérience

## Conventions pour les canaux payants

- Toujours rédiger un brief de campagne dans paid/_briefs/ avant le lancement de toute campagne
- Les variantes de texte publicitaire doivent être documentées dans paid/ad-copy/ avant le téléversement sur la plateforme
- Logs de performance mis à jour chaque lundi — CPC/CTR/CVR/CPA/ROAS de la semaine précédente
- Suivi budgétaire mis à jour dès que le rythme de dépenses dévie de plus de 15% par rapport au plan

## Conventions CRO

- Aucune modification de landing page n'est déployée sans brief dans landing-pages/_briefs/
- Audit CRO requis avant toute refonte majeure de page — à archiver dans landing-pages/cro-notes/
- Tous les résultats A/B documentés dans landing-pages/test-results/ — inclure le niveau de confiance et
  la taille d'échantillon, pas seulement le pourcentage de lift

## Conventions de reporting

- Rapport de croissance hebdomadaire publié sur Slack #growth chaque lundi avant 10h
- Métrique principale enregistrée dans reports/north-star-tracking/north-star-log.md chaque semaine
- Rapport ROI par canal produit trimestriellement — inclut CAC, ratio LTV:CAC, délai de récupération
```

## Serveurs MCP

```json
{
  "mcpServers": {
    "mixpanel": {
      "command": "npx",
      "args": ["-y", "@mixpanel/mcp-server"],
      "env": {
        "MIXPANEL_SERVICE_ACCOUNT_USERNAME": "${MIXPANEL_SERVICE_ACCOUNT_USERNAME}",
        "MIXPANEL_SERVICE_ACCOUNT_SECRET": "${MIXPANEL_SERVICE_ACCOUNT_SECRET}",
        "MIXPANEL_PROJECT_ID": "${MIXPANEL_PROJECT_ID}"
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
        "@modelcontextprotocol/server-filesystem",
        "/Users/${USER}/growth-marketer-workspace"
      ]
    },
    "hubspot": {
      "command": "npx",
      "args": ["-y", "@hubspot/mcp-server"],
      "env": {
        "HUBSPOT_ACCESS_TOKEN": "${HUBSPOT_ACCESS_TOKEN}"
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
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_OUTPUT_FILE_PATH\"; if [[ \"$FILE\" == */experiments/*/results.md ]]; then echo \"[hook] Experiment results saved: $FILE — update experiments/backlog.md with outcome and ICE re-score if applicable\"; fi'"
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
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$FILE\" == */experiments/*/test-design.md && ! -f \"$(dirname $FILE)/hypothesis.md\" ]]; then echo \"[hook] WARNING: No hypothesis.md found for this experiment — create hypothesis.md before test-design.md\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'cd \"${CLAUDE_PROJECT_DIR}\" && OPEN=$(find experiments/ -name \"test-design.md\" -not -newer experiments/ 2>/dev/null | xargs -I{} dirname {} | xargs -I{} sh -c \"[ ! -f {}/results.md ] && echo {}\" 2>/dev/null | wc -l | tr -d \" \"); [ \"$OPEN\" -gt 0 ] && echo \"[reminder] $OPEN experiment(s) have a test-design.md but no results.md — check if any tests have concluded\" || true'"
          }
        ]
      }
    ]
  }
}
```

## Compétences à installer

```bash
npx uitkit add skill marketing/experiment-tracker
npx uitkit add skill marketing/growth-dashboard
npx uitkit add skill marketing/paid-ads
npx uitkit add skill marketing/page-cro
npx uitkit add skill marketing/onboarding-cro
npx uitkit add skill marketing/referral-program
npx uitkit add skill marketing/pricing-strategy
```

## Ressources associées

- [Guide : Claude pour les growth marketers](../guides/for-growth-marketer.md)
- [Workflow : De la conception d'expérience à la décision](../workflows/experiment-lifecycle.md)
