# Espace de travail Email Marketer — Structure de projet

> Pour un email marketer gérant des programmes de cycle de vie, des campagnes et la délivrabilité — couvrant la conception de séquences, les tests A/B, l'hygiène des listes et les rapports de performance sur Klaviyo, Mailchimp ou ActiveCampaign.

## Stack

- **Klaviyo** ou **Mailchimp** ou **ActiveCampaign** — ESP de référence : envois de campagnes, constructeur de flux/automatisation, segmentation des listes, suivi de l'engagement
- **Litmus** — Rendu des emails sur 100+ clients, tests de filtres anti-spam, score de délivrabilité, checklist pré-envoi
- **Google Analytics 4** — Attribution UTM, suivi des conversions, revenu par email, comportement post-clic
- **Figma** — Transferts de design, spécifications de modèles annotées, exports d'assets de marque prêts pour le HTML
- **Slack** — Fils de révision de campagnes, validations de lancement, canaux d'incidents de délivrabilité
- **Notion** — Calendrier de campagnes, briefs de contenu, validations des parties prenantes, notes de rétrospective
- **Claude Code** — Rédaction de séquences, génération d'hypothèses A/B, variantes de texte, narration de performance, scripts d'hygiène des listes

## Arborescence

```
email-marketer-workspace/
├── .claude/
│   ├── CLAUDE.md                                  # Instructions de l'espace de travail (collez le modèle ci-dessous)
│   ├── settings.json                              # Serveurs MCP, hooks, permissions
│   └── commands/
│       ├── email-draft.md                         # /email-draft — prend un segment + objectif, retourne objet + corps + texte CTA
│       ├── ab-test-setup.md                       # /ab-test-setup — hypothèse, spécifications des variantes, taille d'échantillon, métrique de succès
│       ├── sequence-builder.md                    # /sequence-builder — flux multi-emails complet avec timing et logique de branchement
│       ├── deliverability-check.md                # /deliverability-check — checklist pré-envoi : SPF/DKIM, santé de la liste, signaux de contenu
│       ├── performance-report.md                  # /performance-report — résumé narratif des métriques de campagne ou mensuelles
│       ├── re-engagement.md                       # /re-engagement — séquence de reconquête pour les abonnés inactifs
│       └── list-clean.md                          # /list-clean — critères de suppression, règles de segment, politique de désengagement
├── campaigns/
│   ├── _template/                                 # Copier ce dossier pour chaque envoi ponctuel
│   │   ├── brief.md                               # Brief de campagne : objectif, audience, offre, calendrier, métrique de succès
│   │   ├── copy.md                                # Objet final validé, préheader, corps, CTA
│   │   └── results.md                             # Résultats post-envoi : ouvertures, clics, conversions, revenu
│   ├── 2026-06-product-launch/
│   │   ├── brief.md                               # Brief de campagne pour le lancement produit de juin
│   │   ├── copy.md                                # Texte final — objet : "Présentation de [Fonctionnalité]"
│   │   ├── copy-variants.md                       # Variantes d'objet A/B testées avant l'envoi
│   │   ├── litmus-report.md                       # Pré-vol Litmus — résultats de rendu, score anti-spam
│   │   └── results.md                             # 34,2 % de taux d'ouverture, 4,1 % de CTR, 12 400 $ de revenu attribué
│   ├── 2026-05-flash-sale/
│   │   ├── brief.md
│   │   ├── copy.md
│   │   ├── litmus-report.md
│   │   └── results.md
│   └── 2026-04-spring-promo/
│       ├── brief.md
│       ├── copy.md
│       └── results.md
├── sequences/
│   ├── welcome/
│   │   ├── sequence-map.md                        # Schéma de flux : déclencheurs, timing, logique de branchement, conditions de sortie
│   │   ├── email-1-welcome.md                     # Jour 0 : bienvenue + proposition de valeur, envoyé immédiatement à l'inscription
│   │   ├── email-2-quick-win.md                   # Jour 2 : incitation à la première action, met en avant une fonctionnalité clé
│   │   ├── email-3-social-proof.md                # Jour 5 : témoignages, étude de cas, signaux de confiance
│   │   └── results-log.md                         # Performance continue par email : taux d'ouverture/clic/désabonnement
│   ├── onboarding/
│   │   ├── sequence-map.md                        # Déclencheur : compte créé ; sortie à la première action clé
│   │   ├── email-1-setup-guide.md                 # Jour 1 : configuration étape par étape, CTA intégré pour compléter le profil
│   │   ├── email-2-activation-nudge.md            # Jour 3 : envoyé uniquement si la configuration n'est pas terminée — angle d'urgence
│   │   ├── email-3-feature-spotlight.md           # Jour 7 : mise en avant de la fonctionnalité principale pour les nouveaux utilisateurs
│   │   ├── email-4-milestone.md                   # Jour 14 : célébrer la première action, présenter la prochaine étape
│   │   └── results-log.md
│   ├── nurture/
│   │   ├── sequence-map.md                        # Cadence bimensuelle pour les non-convertis engagés
│   │   ├── email-1-education.md                   # Analyse du secteur, sans promotion produit
│   │   ├── email-2-use-case.md                    # Témoignage client aligné sur le point de douleur du segment
│   │   ├── email-3-objection-handler.md           # Traitement des 3 principales objections à la conversion
│   │   ├── email-4-soft-cta.md                    # Offre à faible friction : extension d'essai gratuit, invitation à un webinaire
│   │   └── results-log.md
│   ├── win-back/
│   │   ├── sequence-map.md                        # Déclencheur : aucune ouverture/clic depuis 90 jours
│   │   ├── email-1-we-miss-you.md                 # Ton : chaleureux, sans pression, pas de remise encore
│   │   ├── email-2-whats-new.md                   # Mises à jour produit ou contenu manqué
│   │   ├── email-3-incentive.md                   # Remise ou offre exclusive pour re-engager
│   │   └── results-log.md
│   └── sunset/
│       ├── sequence-map.md                        # Déclencheur : aucun engagement après la séquence de reconquête
│       ├── email-1-last-chance.md                 # Dernière demande de maintien/suppression — confirmation d'opt-in explicite
│       └── suppression-criteria.md                # Règles de transfert vers la liste de suppression après absence de réponse
├── a-b-tests/
│   ├── _template/
│   │   ├── hypothesis.md                          # Hypothèse en une phrase, variable testée, contrôle vs. variante
│   │   └── results.md                             # Variante gagnante, gain, niveau de confiance, décision
│   ├── 2026-q2-subject-line-length/
│   │   ├── hypothesis.md                          # H : les objets courts (<40 caractères) surpassent les objets longs sur mobile
│   │   └── results.md                             # Variante B gagnante, +6,3 % de taux d'ouverture, confiance à 97 % — adopter dans le flux de bienvenue
│   ├── 2026-q2-cta-copy/
│   │   ├── hypothesis.md                          # H : un CTA orienté action ("Commencer gratuitement") surpasse un CTA passif ("En savoir plus")
│   │   └── results.md                             # Aucune différence statistiquement significative — retester avec un échantillon plus large
│   └── 2026-q1-send-time/
│       ├── hypothesis.md
│       └── results.md
├── templates/
│   ├── headers/
│   │   ├── header-promo.html                      # En-tête de campagne promotionnelle — logo + bandeau d'offre
│   │   ├── header-transactional.html              # En-tête épuré pour reçus, confirmations, alertes
│   │   └── header-newsletter.html                 # En-tête newsletter — logo + date + numéro de parution
│   ├── ctas/
│   │   ├── cta-primary.html                       # Bouton principal — couleur de marque, contraste maximal, cible tactile de 44px
│   │   ├── cta-secondary.html                     # Bouton fantôme/contour pour les actions secondaires
│   │   └── cta-text-link.html                     # CTA sous forme de lien texte pour les replis en texte brut
│   ├── footers/
│   │   ├── footer-full.html                       # Pied de page complet : désabonnement, adresse, liens sociaux, mentions légales
│   │   ├── footer-minimal.html                    # Pied de page minimal pour les emails transactionnels/système
│   │   └── footer-gdpr.html                       # Pied de page conforme RGPD avec lien vers le centre de préférences
│   └── layouts/
│       ├── single-column.html                     # Mise en page standard une colonne, mobile-first
│       ├── two-column.html                        # Grille deux colonnes — image à gauche, texte à droite
│       └── plain-text.md                          # Modèle texte brut avec espaces réservés pour les variables
├── compliance/
│   ├── unsubscribe-sop.md                         # SOP de gestion des désabonnements : règle des 10 jours, synchronisation de suppression, journal d'audit
│   ├── gdpr-checklist.md                          # Checklist de conformité RGPD : consentement, minimisation des données, droit à l'effacement
│   ├── can-spam-checklist.md                      # Exigences CAN-SPAM : identification de l'expéditeur, honnêteté de l'objet, mécanisme de désinscription
│   ├── casl-checklist.md                          # Exigences CASL pour les abonnés canadiens
│   └── consent-records/
│       └── consent-log-template.md                # Modèle pour documenter la méthode d'acquisition du consentement par source de liste
├── reports/
│   ├── monthly/
│   │   ├── 2026-05-performance.md                 # Mai : 28,1 % de taux d'ouverture moyen, 3,4 % de CTR, 48 000 $ de revenu attribué
│   │   ├── 2026-04-performance.md
│   │   └── _template.md                           # Modèle de tableau de bord mensuel : KPI, santé de la liste, meilleures campagnes
│   ├── quarterly/
│   │   ├── 2026-q1-review.md                      # Bilan T1 : croissance de la liste, tendances de délivrabilité, meilleures séquences
│   │   └── _template.md                           # Modèle de bilan trimestriel avec benchmarks et variations annuelles
│   └── deliverability/
│       ├── bounce-log.md                          # Taux de rebonds durs/mous mensuels, action prise par pic
│       ├── spam-complaint-log.md                  # Taux de plainte par campagne — signaler tout taux supérieur à 0,08 %
│       └── domain-reputation-log.md               # Score d'expéditeur mensuel, réputation de domaine/IP Google Postmaster
└── scratch/
    ├── copy-drafts.md                             # Textes en cours avant transfert vers campaigns/ ou sequences/
    └── ideas.md                                   # Idées de campagnes non vérifiées, hypothèses de test, observations sur l'audience
```

## Fichiers clés expliqués

| Chemin | Utilité |
|---|---|
| `.claude/commands/email-draft.md` | Commande slash qui prend une description de segment et un objectif de campagne, retourne un email complet avec objet, préheader, corps du texte et CTA — prêt pour le pré-vol Litmus |
| `.claude/commands/ab-test-setup.md` | Commande slash qui génère un test A/B structuré : hypothèse en une phrase, spécification contrôle vs. variante, calcul de taille d'échantillon minimale et métrique de succès principale |
| `.claude/commands/sequence-builder.md` | Commande slash qui produit un flux de cycle de vie multi-emails complet avec les objectifs email par email, la logique de timing, les conditions de branchement et les critères de sortie |
| `.claude/commands/deliverability-check.md` | Commande slash qui exécute une checklist de délivrabilité pré-envoi : statut SPF/DKIM, santé de l'engagement de la liste, déclencheurs de spam dans le contenu, présence du lien de désabonnement |
| `.claude/commands/performance-report.md` | Commande slash qui prend des métriques brutes et retourne un résumé narratif de performance avec les tendances notables et les recommandations d'actions |
| `sequences/welcome/sequence-map.md` | Source de vérité pour le flux de bienvenue — conditions de déclenchement, timing, logique de branchement et conditions de sortie ; mis à jour à chaque modification du flux dans l'ESP |
| `compliance/unsubscribe-sop.md` | SOP étape par étape pour le traitement des désabonnements : exigence de 10 jours ouvrables, synchronisation de la liste de suppression entre les ESP, journal d'audit mensuel |
| `reports/deliverability/spam-complaint-log.md` | Journal mensuel des taux de plainte par campagne — tout taux supérieur à 0,08 % déclenche une révision ; alimente la surveillance de la réputation de domaine |

## Scaffold rapide

```bash
# Créer la racine de l'espace de travail
mkdir -p email-marketer-workspace

# Créer la structure .claude
mkdir -p email-marketer-workspace/.claude/commands

# Créer les répertoires de campagnes
mkdir -p email-marketer-workspace/campaigns/_template
mkdir -p email-marketer-workspace/campaigns/2026-06-product-launch
mkdir -p email-marketer-workspace/campaigns/2026-05-flash-sale

# Créer les répertoires de séquences
mkdir -p email-marketer-workspace/sequences/welcome
mkdir -p email-marketer-workspace/sequences/onboarding
mkdir -p email-marketer-workspace/sequences/nurture
mkdir -p email-marketer-workspace/sequences/win-back
mkdir -p email-marketer-workspace/sequences/sunset

# Créer les répertoires de tests A/B
mkdir -p email-marketer-workspace/a-b-tests/_template
mkdir -p email-marketer-workspace/a-b-tests/2026-q2-subject-line-length
mkdir -p email-marketer-workspace/a-b-tests/2026-q2-cta-copy

# Créer les répertoires de modules de modèles
mkdir -p email-marketer-workspace/templates/headers
mkdir -p email-marketer-workspace/templates/ctas
mkdir -p email-marketer-workspace/templates/footers
mkdir -p email-marketer-workspace/templates/layouts

# Créer le répertoire de conformité
mkdir -p email-marketer-workspace/compliance/consent-records

# Créer les répertoires de rapports
mkdir -p email-marketer-workspace/reports/monthly
mkdir -p email-marketer-workspace/reports/quarterly
mkdir -p email-marketer-workspace/reports/deliverability

# Créer le répertoire scratch
mkdir -p email-marketer-workspace/scratch

# Initialiser les fichiers vides
touch email-marketer-workspace/campaigns/_template/brief.md
touch email-marketer-workspace/campaigns/_template/copy.md
touch email-marketer-workspace/campaigns/_template/results.md
touch email-marketer-workspace/a-b-tests/_template/hypothesis.md
touch email-marketer-workspace/a-b-tests/_template/results.md
touch email-marketer-workspace/reports/monthly/_template.md
touch email-marketer-workspace/reports/quarterly/_template.md

# Installer les compétences email marketing
npx uitkit add skill marketing/email-sequence
npx uitkit add skill marketing/email-deliverability
npx uitkit add skill marketing/email-ab-tester
npx uitkit add skill small-business/email-campaign

# Copier les stubs de commandes dans .claude/commands/
npx uitkit add skill marketing/email-sequence --output email-marketer-workspace/.claude/commands/email-draft.md
npx uitkit add skill marketing/email-ab-tester --output email-marketer-workspace/.claude/commands/ab-test-setup.md
npx uitkit add skill marketing/email-sequence --output email-marketer-workspace/.claude/commands/sequence-builder.md
npx uitkit add skill marketing/email-deliverability --output email-marketer-workspace/.claude/commands/deliverability-check.md
npx uitkit add skill small-business/email-campaign --output email-marketer-workspace/.claude/commands/performance-report.md
```

## Modèle CLAUDE.md

```markdown
# Espace de travail Email Marketer — Instructions Claude Code

## Ce que c'est

Il s'agit du répertoire de travail d'un email marketer gérant des programmes de cycle de vie, des campagnes,
des tests A/B, l'hygiène des listes et la délivrabilité. Les campagnes sont documentées dans campaigns/, les
séquences de cycle de vie dans sequences/, les enregistrements de tests dans a-b-tests/, les modules HTML
réutilisables dans templates/, les SOP de conformité dans compliance/ et les tableaux de bord mensuels dans
reports/. Toute la rédaction de textes, la construction de séquences, la structuration des tests A/B et la
génération de narrations de performance passent par les compétences Claude Code.

## Stack

- Klaviyo / Mailchimp / ActiveCampaign — ESP de référence ; flux et envois de campagnes
- Litmus — Rendu pré-envoi et pré-vol de délivrabilité
- Google Analytics 4 — Attribution UTM et suivi des conversions post-clic
- Figma — Transferts de design et spécifications de modèles annotées
- Slack — Validations de campagnes et canaux d'incidents de délivrabilité
- Notion — Calendrier de campagnes, briefs de contenu, validations des parties prenantes

## Tâches courantes et commandes exactes

### Rédiger un email de campagne
```
/email-draft

Segment: [décrivez l'audience — ex. "utilisateurs en essai qui n'ont pas activé depuis 7 jours"]
Goal: [objectif de conversion — ex. "les amener à compléter la configuration du profil"]
Offer: [le cas échéant — remise, ressource gratuite, déverrouillage de fonctionnalité]
Tone: [descripteur de voix de marque — ex. "chaleureux, direct, sans fioritures"]
Max length: [nombre de mots ou objectif de profondeur de défilement]
```

### Configurer un test A/B
```
/ab-test-setup

What we are testing: [objet / texte CTA / heure d'envoi / mise en page / offre]
Hypothesis: [si on change X, on s'attend à Y parce que Z]
Control: [version actuelle en verbatim]
Variant: [modification proposée en verbatim]
List size available: [nombre de contacts dans le segment]
Primary metric: [taux d'ouverture / CTR / taux de conversion / revenu par email]
Confidence threshold: [95 % standard ou à préciser]
```

### Construire une séquence de cycle de vie
```
/sequence-builder

Sequence type: [bienvenue / onboarding / nurture / reconquête / désengagement]
Trigger: [quel événement démarre le flux — ex. "inscription", "90 jours sans engagement"]
Audience: [décrivez le segment]
Goal: [à quoi ressemble le succès — activation, achat, re-engagement]
Emails needed: [nombre]
Cadence: [délai entre les emails — ex. "jour 0, jour 3, jour 7, jour 14"]
Exit condition: [ce qui retire quelqu'un du flux prématurément]
```

### Exécuter une vérification de délivrabilité pré-envoi
```
/deliverability-check

Campaign name: [ce que vous êtes sur le point d'envoyer]
Segment: [qui le reçoit — nom de la liste ou définition du segment]
List age: [quand cette liste a-t-elle été nettoyée pour la dernière fois ?]
Engagement window: [quelle est la fenêtre d'engagement actif pour ce segment ?]
From domain: [domaine d'envoi — ex. email.company.com]
Content concerns: [éléments pouvant déclencher des filtres anti-spam — ex. images lourdes, mots d'urgence]
```

### Générer un rapport de performance
```
/performance-report

Period: [mois, trimestre ou nom de campagne]
Sends: [nombre d'emails envoyés]
Open rate: [X%] — benchmark du secteur : [Y%]
CTR: [X%] — benchmark du secteur : [Y%]
Unsubscribe rate: [X%]
Bounce rate: [X%]
Revenue attributed: [$X] via [GA4 / attribution ESP]
Top performer: [campagne ou séquence avec les meilleurs résultats]
Concern: [métrique ou tendance nécessitant attention]
```

### Rédiger une séquence de re-engagement
```
/re-engagement

Lapsed definition: [ex. "aucune ouverture ou clic depuis 90 jours"]
Segment size: [contacts éligibles]
Last product update relevant to them: [fonctionnalité, offre ou contenu manqué]
Incentive available: [remise / contenu exclusif / aucun]
Emails in sequence: [2 ou 3]
Sunset after: [combien d'emails sans réponse avant suppression]
```

### Exécuter un nettoyage de liste
```
/list-clean

Total list size: [nombre]
Last cleaned: [date]
Current bounce rate: [X%]
Engagement window for active definition: [ex. "ouverture dans les 180 derniers jours"]
Segments to suppress: [rebondis, plaintes, non-engagés au-delà de X jours]
Compliance requirement: [RGPD / CAN-SPAM / CASL — indiquer lesquels s'appliquent]
```

## Conventions à suivre

- Chaque campagne doit avoir brief.md complété et validé avant de rédiger copy.md
- Sauvegarder le texte final validé dans campaigns/<name>/copy.md avant de télécharger vers l'ESP
- Les résultats du pré-vol Litmus vont dans campaigns/<name>/litmus-report.md — ne pas envoyer sans rapport validé
- Les hypothèses de tests A/B sont consignées dans a-b-tests/<name>/hypothesis.md avant la création du test dans l'ESP
- Les résultats sont documentés dans a-b-tests/<name>/results.md dans les 48 heures suivant la signification statistique
- Les modifications de séquences doivent être reflétées dans sequences/<name>/sequence-map.md avant d'éditer le flux ESP
- Les checklists de conformité dans compliance/ sont vérifiées avant tout import de liste ou lancement d'un nouveau flux
- Les demandes de désabonnement sont traitées selon la SOP dans compliance/unsubscribe-sop.md — délai maximum de 10 jours ouvrables
- Les tableaux de bord de performance mensuels sont déposés dans reports/monthly/YYYY-MM-performance.md avant le 5 de chaque mois
- Tout taux de plainte pour spam supérieur à 0,08 % est consigné dans reports/deliverability/spam-complaint-log.md avec la cause racine
```

## Serveurs MCP

```json
{
  "mcpServers": {
    "klaviyo": {
      "command": "npx",
      "args": ["-y", "@klaviyo/mcp-server"],
      "env": {
        "KLAVIYO_API_KEY": "pk_your-klaviyo-private-api-key"
      }
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@slack/mcp-server"],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-your-slack-bot-token",
        "SLACK_TEAM_ID": "T0XXXXXXXXX"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropic-ai/mcp-server-filesystem",
        "/Users/your-username/email-marketer-workspace"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"campaigns/.*/copy\\.md\"; then echo \"[hook] Campaign copy saved — run /deliverability-check before uploading to ESP, then complete campaigns/$(basename $(dirname $CLAUDE_TOOL_INPUT_FILE_PATH))/litmus-report.md\"; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"a-b-tests/.*/results\\.md\"; then echo \"[hook] A/B results logged — if a winner emerged, update the relevant sequence or campaign template to adopt the winning variant\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'DAY=$(date +%d); if [ \"$DAY\" = \"01\" ]; then echo \"[reminder] First of the month — file reports/monthly/$(date -v-1m +%Y-%m)-performance.md and update reports/deliverability/bounce-log.md and spam-complaint-log.md\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Compétences à installer

```bash
# Compétences principales en email marketing
npx uitkit add skill marketing/email-sequence
npx uitkit add skill marketing/email-deliverability
npx uitkit add skill marketing/email-ab-tester
npx uitkit add skill small-business/email-campaign

# Installer toutes les compétences marketing en une fois
npx uitkit add skills marketing
```

## Voir aussi

- [Guide email marketer](../guides/for-email-marketer.md)
- [Workflow de construction de séquences de cycle de vie](../workflows/lifecycle-sequence-build.md)
- [Workflow de réponse aux incidents de délivrabilité](../workflows/deliverability-incident-response.md)
