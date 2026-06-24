# Opérations de marque e-commerce — Structure de projet

> Pour les équipes de marques DTC fonctionnant sous Shopify Plus qui ont besoin que Claude prenne en charge la gestion quotidienne des produits, les campagnes e-mail et SMS, les textes publicitaires payants, le réapprovisionnement des stocks, l'escalade du service client et l'analytique de performance sur une stack martech moderne.

## Stack

- Shopify Plus — vitrine, catalogue produits, inventaire, metafields, B2B
- Klaviyo — flux e-mail, séquences SMS, segments, gestion des campagnes
- Meta Ads Manager — prospection, reciblage, campagnes DPA
- Google Performance Max — campagnes unifiées shopping, recherche, display
- Triple Whale ou Northbeam — attribution multi-touch, MER, nCAC, ROAS mixte
- Gorgias — gestion des tickets de support, macros, CSAT, règles d'automatisation
- ShipBob — exécution 3PL, WMS, portail retours, inventaire distribué
- Recharge Payments — abonnements, logique de facturation, gestion du churn
- Yotpo — avis, UGC, programmes de fidélité et de parrainage
- QuickBooks Online — compte de résultat, suivi COGS, réconciliation des paiements Shopify

---

## Arborescence des répertoires

```
ecommerce-brand/
├── .claude/
│   ├── settings.json                          # Serveurs MCP, hooks, permissions
│   └── commands/
│       ├── product-launch.md                  # Pilote du checklist de lancement d'un nouveau SKU de bout en bout
│       ├── listing-optimizer.md               # Réécriture du titre, description et méta SEO par SKU
│       ├── campaign-brief.md                  # Génération d'un brief de campagne Klaviyo ou publicité payante
│       ├── email-copy.md                      # Rédaction d'e-mail de campagne ou de flux avec variantes d'objet
│       ├── sms-copy.md                        # Rédaction de SMS Klaviyo avec opt-out et décompte de caractères
│       ├── ad-copy-meta.md                    # 5 accroches de texte principal + 5 titres pour Meta
│       ├── ad-copy-pmax.md                    # Titres, descriptions et assets pour PMax
│       ├── inventory-check.md                 # Signaler les SKUs sous le seuil de réapprovisionnement par fournisseur
│       ├── reorder-draft.md                   # Rédaction d'un bon de commande ou e-mail fournisseur à partir du reorder-tracker
│       ├── cs-macro.md                        # Génération d'une macro Gorgias selon le type de ticket + politique
│       ├── escalation-handler.md              # Triage du ticket et application du chemin d'escalade
│       ├── subscription-retention.md          # Rédaction d'une offre de rétention pour les annulations Recharge
│       ├── review-response.md                 # Rédaction de réponse publique Yotpo pour les avis 1 à 3 étoiles
│       └── weekly-report.md                   # Rapport narratif à partir de l'export Triple Whale/Northbeam
├── CLAUDE.md                                  # Instructions de l'espace de travail (voir modèle ci-dessous)
├── products/
│   ├── sku-overview.csv                       # Référentiel principal : handle, titre, variante, prix, coût, statut, fournisseur
│   ├── listings/
│   │   ├── _brand-voice.md                    # Guide de ton, mots interdits, règles de style pour tous les textes
│   │   ├── _pdp-template.md                   # Structure PDP standard : accroche, bénéfices, caractéristiques, CTA
│   │   ├── cotton-canvas-tote-natural.md      # Exemple : un fichier par SKU actif
│   │   ├── merino-crewneck-charcoal.md
│   │   └── stainless-tumbler-matte-black.md
│   ├── seo/
│   │   ├── meta-titles.csv                    # handle, titre_actuel, titre_proposé, nombre_de_caractères
│   │   ├── meta-descriptions.csv              # handle, description_actuelle, description_proposée, nombre_de_caractères
│   │   ├── keyword-map.md                     # Mots-clés principaux et secondaires par collection
│   │   └── collection-page-copy.md            # Descriptions de pages de collection optimisées pour le SEO
│   ├── drafts/
│   │   ├── new-product-brief-template.md      # Formulaire de pré-lancement : concept, prix, fournisseur, date de lancement
│   │   ├── 2026-q3-canvas-crossbody.md        # Brief en cours pour le prochain lancement
│   │   └── 2026-q4-holiday-bundle.md
│   └── archived/
│       └── discontinued-skus.csv              # SKUs retirés avec date d'arrêt et raison
├── marketing/
│   ├── email-sms/
│   │   ├── sequences/
│   │   │   ├── welcome-series.md              # E-mails 1 à 3 : texte du flux d'intégration + notes de timing
│   │   │   ├── abandoned-cart.md              # E-mails 1 à 2 + SMS 1 : séquence de récupération de panier
│   │   │   ├── post-purchase.md               # E-mails 1 à 2 : demande d'avis + vente croisée
│   │   │   ├── win-back-90d.md                # Réactivation en 3 contacts pour les acheteurs inactifs depuis 90 jours
│   │   │   ├── subscription-churn.md          # Intention d'annulation Recharge : offre + texte de rétention
│   │   │   └── loyalty-milestone.md           # E-mail déclenché par un palier de points Yotpo
│   │   └── campaigns/
│   │       ├── _campaign-brief-template.md    # Audience, objectif, offre, CTA, segment Klaviyo, date d'envoi
│   │       ├── 2026-q2-mothers-day.md         # Brief finalisé + texte pour la campagne de mai
│   │       ├── 2026-q3-back-to-school.md
│   │       ├── 2026-q4-bfcm-email.md          # Fichier de campagne Black Friday / Cyber Monday
│   │       └── klaviyo-campaign-log.csv       # Nom de la campagne, date d'envoi, taille de liste, TO, CTR, chiffre d'affaires
│   └── paid-ads/
│       ├── copy/
│       │   ├── meta-primary-text.md           # Variantes d'accroches (5+) par offre pour le texte principal Meta
│       │   ├── meta-headlines.md              # 5+ variantes de titres pour les ensembles de publicités Meta
│       │   ├── pmax-headlines.md              # 15 titres (≤30 caractères) pour le groupe d'assets Google PMax
│       │   ├── pmax-descriptions.md           # 4 descriptions (≤90 caractères) pour PMax
│       │   └── dpa-catalog-copy.md            # Règles de texte superposé pour les publicités dynamiques de catalogue
│       └── creative-briefs/
│           ├── _ad-brief-template.md          # Offre, angle d'accroche, audience, plateforme, budget, format
│           ├── 2026-q2-prospecting-meta.md    # Brief pour les campagnes Meta trafic froid Q2
│           ├── 2026-q2-retargeting-meta.md
│           ├── 2026-q2-branded-pmax.md        # Brief de campagne PMax branded search
│           └── 2026-q3-ugc-creative-meta.md
│   └── social/
│       ├── content-calendar.md                # Planning mensuel des publications avec format et accroche
│       └── caption-library.md                 # Légendes réutilisables organisées par produit/thème
├── operations/
│   ├── inventory-sops/
│   │   ├── reorder-triggers.md                # Règles de seuil de réapprovisionnement par vélocité de SKU et délai de livraison
│   │   ├── reorder-tracker.csv                # SKU, fournisseur, date_dernier_bon_commande, prochaine_date_réappro, quantité
│   │   ├── low-stock-alert-process.md         # Étape par étape : détection → rédaction BC → confirmation → enregistrement
│   │   └── dead-stock-review.md               # Processus trimestriel pour les décisions sur les stocks à faible rotation
│   ├── fulfillment-sops/
│   │   ├── shipbob-receiving-checklist.md     # Étapes pour enregistrer les expéditions entrantes dans le WMS ShipBob
│   │   ├── returns-processing.md              # Portail retours ShipBob → évaluation → remise en stock ou radiation
│   │   ├── shipbob-exception-handler.md       # Étapes de résolution des expéditions perdues, endommagées ou retardées
│   │   └── distributed-inventory-rules.md    # Quels SKUs se trouvent dans quel entrepôt ShipBob et pourquoi
│   └── cs-playbooks/
│       ├── escalation-matrix.md               # Type de ticket → carte d'escalade niveau 1 / niveau 2 / fondateur
│       ├── wismo-playbook.md                  # WISMO : vérification ShipBob → macro Gorgias → SLA de suivi
│       ├── damaged-item-playbook.md           # Marchandise endommagée : photo requise → remplacement ou remboursement
│       ├── wrong-item-playbook.md             # Mauvais article : étiquette prépayée → réexpédition → enregistrement dans Gorgias
│       ├── subscription-cancel-playbook.md    # Intention d'annulation Recharge → offre de rétention → enregistrement du churn
│       └── chargeback-playbook.md             # Collecte de preuves, réponse Shopify, calendrier du litige
├── analytics/
│   ├── weekly-dashboard.md                    # Modèle : MER, ROAS mixte, nCAC, AOV, meilleurs SKUs, action
│   ├── channel-benchmarks.md                  # Benchmarks KPI par plateforme, par mois et par trimestre
│   ├── cohort-analysis.md                     # Tableau de cohorte LTV : rachat à 30/60/90/180 jours par mois
│   ├── triple-whale-export-notes.md           # Comment lire les exports TW, incohérences connues, corrections
│   └── northbeam-attribution-log.md           # Journal des changements de modèle et notes d'anomalies hebdomadaires
├── finance/
│   ├── p-and-l-template.md                    # Compte de résultat mensuel : chiffre d'affaires, COGS, marge brute, dépenses pub, net
│   ├── unit-economics.md                      # CAC, LTV, délai de remboursement, marge sur contribution par SKU
│   ├── quickbooks-reconciliation-sop.md       # Paiements Shopify → compte de revenus QB → saisie COGS
│   └── end-of-month-close.md                  # Checklist : réconciliation QB, correspondance paiements, revue des marges
└── vendors/
    ├── supplier-directory.md                  # Nom, contact, MOQ, délai de livraison, conditions de paiement, devise
    ├── po-template.md                          # Bon de commande standard avec tous les champs requis
    └── [supplier-name]/
        ├── po-history.md                       # Tous les bons de commande avec dates, quantités, confirmations
        └── quality-notes.md                    # Taux de défauts, résultats d'inspection, problèmes non résolus
```

---

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `products/sku-overview.csv` | Référentiel principal des SKUs — à transmettre à Claude avant toute tâche de fiche produit, d'inventaire ou de fournisseur pour garantir l'exactitude du contexte |
| `products/listings/_brand-voice.md` | Guide de ton que Claude applique à chaque réécriture de fiche, brouillon de campagne et macro CS — à modifier en premier lors d'un changement de voix de marque |
| `operations/cs-playbooks/escalation-matrix.md` | Arbre de décision suivi par Claude lors de l'exécution de `/escalation-handler` — associe le type de ticket à une réponse de niveau 1, niveau 2 ou fondateur |
| `operations/inventory-sops/reorder-tracker.csv` | Source de vérité pour le moment du réapprovisionnement — Claude le consulte lors de l'exécution de `/inventory-check` ou `/reorder-draft` |
| `marketing/email-sms/campaigns/_campaign-brief-template.md` | Format de brief obligatoire avant que Claude rédige tout texte de campagne Klaviyo — impose les champs audience, segment, offre et CTA |
| `analytics/weekly-dashboard.md` | Modèle structuré que Claude remplit chaque lundi à partir d'un export Triple Whale ou Northbeam collé |
| `finance/unit-economics.md` | CAC, LTV et marge sur contribution par SKU — Claude s'y réfère pour toute recommandation budgétaire ou de canal |
| `vendors/supplier-directory.md` | Contacts fournisseurs, MOQs et délais de livraison — Claude s'y réfère avant de rédiger un bon de commande ou un e-mail fournisseur |

---

## Mise en place rapide

```bash
# Créer tous les répertoires
mkdir -p ecommerce-brand/.claude/commands
mkdir -p ecommerce-brand/products/listings
mkdir -p ecommerce-brand/products/seo
mkdir -p ecommerce-brand/products/drafts
mkdir -p ecommerce-brand/products/archived
mkdir -p ecommerce-brand/marketing/email-sms/sequences
mkdir -p ecommerce-brand/marketing/email-sms/campaigns
mkdir -p ecommerce-brand/marketing/paid-ads/copy
mkdir -p ecommerce-brand/marketing/paid-ads/creative-briefs
mkdir -p ecommerce-brand/marketing/social
mkdir -p ecommerce-brand/operations/inventory-sops
mkdir -p ecommerce-brand/operations/fulfillment-sops
mkdir -p ecommerce-brand/operations/cs-playbooks
mkdir -p ecommerce-brand/analytics
mkdir -p ecommerce-brand/finance
mkdir -p ecommerce-brand/vendors

# Créer les fichiers stub principaux
touch ecommerce-brand/products/sku-overview.csv
touch ecommerce-brand/products/listings/_brand-voice.md
touch ecommerce-brand/products/listings/_pdp-template.md
touch ecommerce-brand/products/seo/meta-titles.csv
touch ecommerce-brand/products/seo/meta-descriptions.csv
touch ecommerce-brand/marketing/email-sms/campaigns/_campaign-brief-template.md
touch ecommerce-brand/marketing/email-sms/campaigns/klaviyo-campaign-log.csv
touch ecommerce-brand/marketing/paid-ads/creative-briefs/_ad-brief-template.md
touch ecommerce-brand/operations/inventory-sops/reorder-tracker.csv
touch ecommerce-brand/operations/cs-playbooks/escalation-matrix.md
touch ecommerce-brand/analytics/weekly-dashboard.md
touch ecommerce-brand/analytics/channel-benchmarks.md
touch ecommerce-brand/analytics/cohort-analysis.md
touch ecommerce-brand/finance/p-and-l-template.md
touch ecommerce-brand/finance/unit-economics.md
touch ecommerce-brand/vendors/supplier-directory.md
touch ecommerce-brand/vendors/po-template.md
touch ecommerce-brand/CLAUDE.md

# Installer les compétences UitKit
npx uitkit add skill small-business/shopify-operations
npx uitkit add skill small-business/product-listing-optimizer
npx uitkit add skill marketing/email-sequence
npx uitkit add skill marketing/klaviyo-campaign
npx uitkit add skill marketing/paid-ads
npx uitkit add skill marketing/page-cro
npx uitkit add skill operations/inventory-management
npx uitkit add skill operations/customer-service-escalation
npx uitkit add skill data-ml/weekly-performance-report

# Installer les commandes slash
npx uitkit add command product-launch
npx uitkit add command listing-optimizer
npx uitkit add command campaign-brief
npx uitkit add command email-copy
npx uitkit add command sms-copy
npx uitkit add command ad-copy-meta
npx uitkit add command ad-copy-pmax
npx uitkit add command inventory-check
npx uitkit add command reorder-draft
npx uitkit add command cs-macro
npx uitkit add command escalation-handler
npx uitkit add command subscription-retention
npx uitkit add command review-response
npx uitkit add command weekly-report
```

---

## Modèle CLAUDE.md

```markdown
# Espace de travail des opérations de marque e-commerce

Cet espace de travail Claude Code est dédié à l'exploitation d'une marque DTC sous Shopify Plus. Claude gère
l'optimisation des fiches produits, la rédaction de campagnes et de flux Klaviyo, les textes publicitaires Meta et Google PMax,
la gestion du réapprovisionnement des stocks, l'escalade du service client, la rétention des abonnements Recharge,
les réponses aux avis Yotpo et les rapports de performance hebdomadaires. Aucun code applicatif ne réside ici.

---

## Stack

- Shopify Plus — vitrine, catalogue, inventaire, metafields
- Klaviyo — flux e-mail, séquences SMS, gestion des campagnes
- Meta Ads Manager — prospection, reciblage, DPA
- Google Performance Max — shopping, recherche, display
- Triple Whale / Northbeam — attribution, MER, nCAC, ROAS mixte
- Gorgias — tickets de support, macros, CSAT, routage d'escalade
- ShipBob — exécution 3PL, WMS, portail retours
- Recharge Payments — abonnements, facturation, flux d'intention d'annulation
- Yotpo — avis, UGC, fidélité et parrainage
- QuickBooks Online — compte de résultat, COGS, réconciliation des paiements Shopify

---

## Conventions de répertoires

- `products/sku-overview.csv` — toujours transmettre ce fichier lors de tâches de fiche produit ou d'inventaire
- `products/listings/_brand-voice.md` — appliquer ces règles de ton à chaque texte produit
- `marketing/email-sms/campaigns/_campaign-brief-template.md` — obligatoire avant de rédiger toute campagne
- `marketing/paid-ads/creative-briefs/_ad-brief-template.md` — obligatoire avant de rédiger tout texte publicitaire
- `operations/cs-playbooks/escalation-matrix.md` — à suivre lors du triage de tout ticket de support
- `operations/inventory-sops/reorder-tracker.csv` — source de vérité pour le timing de réapprovisionnement
- `analytics/weekly-dashboard.md` — remplir ce modèle chaque lundi à partir des exports de plateformes
- `vendors/supplier-directory.md` — extraire les contacts et conditions avant tout bon de commande ou e-mail fournisseur

---

## Flux de lancement d'un nouveau produit

Lorsqu'on vous demande de lancer un nouveau produit, suivre ces étapes dans l'ordre :
1. Confirmer qu'un brief `products/drafts/[product-slug].md` complet existe
2. Exécuter `/listing-optimizer` pour produire le titre, la description PDP, le méta-titre, la méta-description
3. Vérifier que le SKU est ajouté à `products/sku-overview.csv` avec le bon COGS et fournisseur
4. Exécuter `/campaign-brief` pour l'e-mail de lancement — utiliser le segment Klaviyo : All Subscribers
5. Exécuter `/email-copy` en utilisant le brief approuvé
6. Exécuter `/ad-copy-meta` et `/ad-copy-pmax` en utilisant le brief de lancement
7. Confirmer que le seuil de réapprovisionnement est défini dans `operations/inventory-sops/reorder-tracker.csv`
8. Déplacer le fichier brouillon de `products/drafts/` vers `products/listings/[slug].md`

---

## Processus de brief de campagne

Avant de rédiger tout texte de campagne, un brief complet doit exister dans le dossier approprié.
Pour les campagnes Klaviyo : `marketing/email-sms/campaigns/[campaign-slug].md`
Pour les publicités payantes : `marketing/paid-ads/creative-briefs/[campaign-slug].md`

Un brief doit préciser : audience/segment, objectif (acquisition / rétention / réactivation),
offre ou accroche, CTA, plateforme, date d'envoi ou de mise en ligne, et budget (pour le payant).
Claude ne rédigera pas de texte sans un brief complet — il demandera les champs manquants.

---

## Déclencheurs de réapprovisionnement des stocks

Claude vérifie `operations/inventory-sops/reorder-tracker.csv` et signale le réapprovisionnement lorsque :
- Les unités en stock tombent sous le seuil de réapprovisionnement du SKU (colonne : reorder_threshold)
- Les jours de stock restants (units_on_hand / avg_daily_velocity) < délai fournisseur + 7 jours
Au déclenchement : exécuter `/reorder-draft` avec le SKU et le nom du fournisseur extraits de supplier-directory.md.

---

## Chemins d'escalade du service client

Suivre `operations/cs-playbooks/escalation-matrix.md` pour tout triage de ticket.
Niveau 1 (macro Gorgias) : WISMO, demandes de retour standard, questions sur les tailles
Niveau 2 (examen par le responsable CS) : marchandise endommagée, mauvais article, litiges de rétrofacturation, facturation d'abonnement
Escalade fondateur : menaces médiatiques, langage juridique, commandes > 500 $, pannes répétées

Lors de l'exécution de `/escalation-handler`, toujours consulter :
- `operations/cs-playbooks/[issue-type]-playbook.md` pour la résolution étape par étape
- `operations/fulfillment-sops/returns-processing.md` pour tout retour physique
- L'historique des tickets Gorgias si le client a déjà contacté (noter si contact répété)

---

## Tâches courantes — commandes exactes

### Optimiser une fiche produit
/listing-optimizer
Fournir : handle ou slug du produit, titre actuel, mots-clés cibles (depuis `products/seo/keyword-map.md`).
Résultat : titre réécrit (≤70 caractères), description PDP (orientée bénéfices, 150 à 200 mots),
méta-titre (≤60 caractères), méta-description (≤155 caractères).

### Rédiger une campagne e-mail Klaviyo
/email-copy
Fournir : lien vers le brief complet dans `marketing/email-sms/campaigns/`.
Résultat : 2 variantes d'objet (A/B), texte de prévisualisation, texte complet formaté pour le collage dans Klaviyo.

### Rédiger un SMS Klaviyo
/sms-copy
Fournir : objectif de la campagne, offre, segment Klaviyo, date d'envoi.
Résultat : corps du SMS (≤160 caractères avec opt-out), et une version en 2 parties si > 160 caractères.

### Générer un texte publicitaire Meta
/ad-copy-meta
Fournir : lien vers le brief dans `marketing/paid-ads/creative-briefs/`.
Résultat : 5 accroches de texte principal, 5 titres (≤40 caractères chacun), 2 variantes de description de lien.

### Générer un texte de groupe d'assets Google PMax
/ad-copy-pmax
Fournir : lien vers le brief dans `marketing/paid-ads/creative-briefs/`.
Résultat : 15 titres (≤30 caractères), 4 descriptions (≤90 caractères), titre long (≤90 caractères).

### Vérifier l'inventaire et rédiger un réapprovisionnement
/inventory-check — coller l'export de stock ShipBob actuel
/reorder-draft — fournir le SKU et le nom du fournisseur après le déclenchement de l'alerte

### Trier un ticket de support
/escalation-handler
Fournir : ID de ticket Gorgias ou coller le corps du ticket.
Claude retourne : attribution de niveau, playbook à suivre, macro à utiliser ou à rédiger.

### Générer le rapport de performance hebdomadaire
/weekly-report
Coller l'export de résumé hebdomadaire Triple Whale ou Northbeam.
Résultat : récit structuré couvrant MER, ROAS mixte, nCAC, AOV, 5 meilleurs SKUs, une action à entreprendre.

---

## Conventions

- Toutes les valeurs monétaires en USD sauf si les conditions d'un fournisseur précisent autrement.
- Le texte produit commence par le bénéfice client, non par la caractéristique du produit.
- Les segments Klaviyo sont en majuscules exactement comme ils apparaissent dans l'interface Klaviyo.
- Ne pas modifier `products/archived/` — les enregistrements sont en lecture seule.
- Lors de la mise à jour d'un fichier de politique, ajouter une note de modification datée en tête de ce fichier.
- Les fichiers de tableau de bord hebdomadaire sont nommés `YYYY-Www-performance.md` (ex. : `2026-W22-performance.md`).
```

---

## Serveurs MCP

```json
{
  "mcpServers": {
    "shopify": {
      "command": "npx",
      "args": ["-y", "@shopify/mcp-server"],
      "env": {
        "SHOPIFY_ACCESS_TOKEN": "${SHOPIFY_ACCESS_TOKEN}",
        "SHOPIFY_SHOP_DOMAIN": "${SHOPIFY_SHOP_DOMAIN}"
      }
    },
    "klaviyo": {
      "command": "npx",
      "args": ["-y", "@klaviyo/mcp-server"],
      "env": {
        "KLAVIYO_API_KEY": "${KLAVIYO_API_KEY}"
      }
    },
    "gorgias": {
      "command": "npx",
      "args": ["-y", "@gorgias/mcp-server"],
      "env": {
        "GORGIAS_DOMAIN": "${GORGIAS_DOMAIN}",
        "GORGIAS_API_KEY": "${GORGIAS_API_KEY}",
        "GORGIAS_API_EMAIL": "${GORGIAS_API_EMAIL}"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@anthropic-ai/mcp-server-filesystem",
        "/path/to/ecommerce-brand"
      ]
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

---

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
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_OUTPUT_PATH\"; if [[ \"$FILE\" == */analytics/weekly-dashboard* || \"$FILE\" == */analytics/*performance* ]]; then echo \"[$(date +%Y-%m-%d)] Report written: $FILE\" >> .claude/report-log.txt; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_OUTPUT_PATH\"; if [[ \"$FILE\" == */marketing/paid-ads/copy/* || \"$FILE\" == */marketing/email-sms/campaigns/* ]]; then echo \"[$(date +%Y-%m-%d)] Campaign asset written: $FILE\" >> .claude/campaign-log.txt; fi'"
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
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_INPUT_PATH\"; if [[ \"$FILE\" == */operations/cs-playbooks/* || \"$FILE\" == *escalation-matrix* ]]; then cp \"$FILE\" \"${FILE}.bak\" 2>/dev/null; echo \"[$(date +%Y-%m-%d)] Backup created: ${FILE}.bak\"; fi'"
          }
        ]
      }
    ]
  }
}
```

---

## Compétences à installer

```bash
npx uitkit add skill small-business/shopify-operations
npx uitkit add skill small-business/product-listing-optimizer
npx uitkit add skill marketing/email-sequence
npx uitkit add skill marketing/klaviyo-campaign
npx uitkit add skill marketing/paid-ads
npx uitkit add skill marketing/page-cro
npx uitkit add skill operations/inventory-management
npx uitkit add skill operations/customer-service-escalation
npx uitkit add skill data-ml/weekly-performance-report
npx uitkit add skill productivity/vendor-evaluator
```

---

## Références

- [Guide : Claude pour les opérateurs e-commerce](../guides/for-ecommerce-operator.md)
- [Workflow : Lancement d'un nouveau produit](../workflows/new-product-launch.md)
- [Workflow : Revue de performance hebdomadaire](../workflows/weekly-performance-review.md)
- [Workflow : Réapprovisionnement des stocks](../workflows/inventory-reorder.md)
