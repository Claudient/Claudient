# Espace de travail Opérateur E-commerce — Structure de projet

> Pour les opérateurs de marques DTC gérant une boutique Shopify qui ont besoin que Claude prenne en charge l'optimisation quotidienne des fiches produits, la rédaction de campagnes, la création de modèles de service client, les communications fournisseurs et le reporting de performance sur l'ensemble de la pile.

## Stack

- Shopify (vitrine, inventaire, commandes, metafields)
- Klaviyo (flux email + SMS, segments, campagnes)
- Meta Ads Manager + Google Ads (acquisition payante)
- Triple Whale ou Northbeam (attribution multi-touch, MER, nCAC)
- Gorgias (tickets support, macros, CSAT)
- ShipBob ou Flexport (fulfillment 3PL, suivi, retours)
- QuickBooks Online (compte de résultat, COGS, rapprochement)
- Slack (communication d'équipe, routage des alertes)

---

## Arborescence du projet

```
ecommerce-workspace/
├── .claude/
│   ├── settings.json                    # Serveurs MCP, hooks, permissions
│   └── commands/
│       ├── listing-optimizer.md         # Réécrit le titre + description + méta SEO d'un produit
│       ├── email-campaign.md            # Rédige le contenu d'une campagne Klaviyo avec variantes d'objet
│       ├── ad-copy.md                   # Génère des jeux de publicités Meta et Google
│       ├── returns-policy.md            # Rédige ou met à jour le texte de la politique de retours
│       ├── supplier-update.md           # Génère un email de relance ou de réassort fournisseur
│       ├── weekly-performance.md        # Résume le ROAS par canal, le CAC et les meilleures références
│       └── inventory-alert.md           # Signale les références en dessous du seuil de réassort
├── CLAUDE.md                            # Instructions de l'espace de travail (voir modèle ci-dessous)
├── products/
│   ├── active/
│   │   ├── sku-overview.csv             # Liste principale des références avec handle, titre, prix, coût, statut
│   │   ├── descriptions/
│   │   │   ├── product-copy-template.md # Ton de marque + structure pour toutes les pages produit
│   │   │   ├── seasonal-refresh-log.md  # Ce qui a été mis à jour et quand, par référence
│   │   │   └── [slug].md                # Un fichier par produit (ex. : cotton-tote-natural.md)
│   │   └── seo/
│   │       ├── meta-titles.csv          # Balise title actuelle et variantes proposées par produit
│   │       ├── meta-descriptions.csv    # Méta descriptions de 155 caractères par produit
│   │       └── keyword-targets.md       # Carte des mots-clés principaux et secondaires par collection
│   ├── drafts/
│   │   └── new-product-brief-template.md # Checklist de pré-lancement pour les nouvelles références
│   └── archived/
│       └── discontinued-skus.csv        # Produits retirés avec motif d'arrêt
├── campaigns/
│   ├── email/
│   │   ├── briefs/
│   │   │   ├── campaign-brief-template.md   # Audience, objectif, offre, CTA, date d'envoi
│   │   │   ├── 2026-q2-mothers-day.md
│   │   │   └── 2026-q3-back-to-school.md
│   │   ├── copy/
│   │   │   ├── welcome-series.md            # Contenu du flux d'onboarding en 3 emails
│   │   │   ├── abandoned-cart.md            # Séquence de panier abandonné en 2 temps
│   │   │   ├── post-purchase.md             # Flux de demande d'avis + upsell
│   │   │   └── win-back-90d.md              # Flux de réactivation pour acheteurs inactifs depuis 90 jours
│   │   └── results/
│   │       └── klaviyo-campaign-log.csv     # Nom de campagne, date d'envoi, taux d'ouverture, CTR, revenus
│   └── paid-ads/
│       ├── briefs/
│       │   ├── ad-brief-template.md         # Offre, audience, accroche, CTA, budget, plateforme
│       │   ├── 2026-q2-prospecting-meta.md
│       │   └── 2026-q2-branded-search-gads.md
│       ├── copy/
│       │   ├── meta-primary-text.md         # Variantes d'accroche (5+) pour le texte principal Meta
│       │   ├── meta-headlines.md            # Variantes de titres pour Meta
│       │   ├── google-rsa-headlines.md      # 15 titres pour les RSA Google
│       │   └── google-rsa-descriptions.md   # 4 descriptions pour les RSA Google
│       └── results/
│           └── attribution-notes.md         # Anomalies et décisions Triple Whale / Northbeam
├── customer-service/
│   ├── templates/
│   │   ├── response-library.md          # Plus de 20 brouillons de macros par type de ticket
│   │   ├── where-is-my-order.md         # Macro WISMO avec emplacement pour le lien de suivi
│   │   ├── damaged-item.md              # Réponse marchandise endommagée + flux de remplacement
│   │   ├── wrong-item.md                # Article incorrect reçu — modèle de résolution
│   │   └── subscription-cancel.md       # Offre de rétention + accusé de réception d'annulation
│   ├── policies/
│   │   ├── returns-policy.md            # Politique de retours actuelle côté client
│   │   ├── shipping-policy.md           # SLA transporteurs, règles internationales, délais limites
│   │   └── refund-matrix.md             # Arbre de décision interne pour les cas particuliers
│   └── gorgias/
│       └── macro-import-template.csv    # CSV au format Gorgias pour import en masse de macros
├── suppliers/
│   ├── vendor-directory.md              # Nom du fournisseur, contact, délai, MOQ, conditions
│   ├── po-template.md                   # Modèle de bon de commande avec tous les champs requis
│   ├── reorder-tracker.csv              # Référence, fournisseur, date dernier BC, prochaine date de réassort
│   └── comms/
│       ├── supplier-update-template.md  # Modèle standard d'email de relance
│       └── [supplier-name]/
│           └── po-history.md            # Historique des bons de commande et confirmations par fournisseur
├── reports/
│   ├── weekly/
│   │   ├── weekly-performance-template.md   # ROAS consolidé, CAC, AOV, taux de conversion, meilleures références
│   │   └── 2026-w22-performance.md
│   ├── monthly/
│   │   ├── monthly-pl-template.md           # Revenus, COGS, marge brute, dépenses publicitaires, net
│   │   ├── channel-performance-template.md  # Shopify vs. wholesale vs. Amazon par mois
│   │   └── 2026-05-monthly.md
│   └── attribution/
│       └── triple-whale-export-notes.md     # Comment lire les exports, écarts connus
└── sops/
    ├── new-product-launch.md            # Checklist complète : brief → fiche → publicités → email
    ├── inventory-reorder.md             # Conditions de déclenchement, contact fournisseur, délai tampon
    ├── returns-processing.md            # Flux de retours ShipBob → remise en stock ou dépréciation
    ├── ad-account-audit.md              # Checklist de revue hebdomadaire des médias payants
    ├── klaviyo-health-check.md          # Hygiène des listes, délivrabilité, cadence d'audit des flux
    └── end-of-month-close.md            # Rapprochement QuickBooks avec les paiements Shopify
```

---

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `.claude/commands/listing-optimizer.md` | Commande slash : prend un handle produit ou des informations brutes et produit un titre, une description et des méta-tags réécrit dans le ton de la marque |
| `.claude/commands/weekly-performance.md` | Commande slash : accepte un résumé Triple Whale ou Northbeam collé et génère un récit structuré pour les parties prenantes |
| `products/active/sku-overview.csv` | Source de vérité pour toutes les références actives — à fournir à Claude lors des tâches de fiche produit ou d'inventaire |
| `campaigns/email/copy/welcome-series.md` | Flux de bienvenue en 3 emails rédigé — à modifier ici, puis à coller dans l'éditeur de flux Klaviyo |
| `customer-service/policies/refund-matrix.md` | Arbre de décision interne que Claude utilise pour générer des réponses macro sur les cas limites |
| `suppliers/vendor-directory.md` | Contacts et conditions des fournisseurs — Claude lit ce fichier avant de rédiger toute communication fournisseur |
| `reports/weekly/weekly-performance-template.md` | Modèle structuré que Claude complète chaque lundi à partir des exports de plateforme collés |
| `sops/new-product-launch.md` | La checklist que Claude suit étape par étape quand une nouvelle référence passe du brief au lancement |

---

## Initialisation rapide

```bash
# Créer l'espace de travail principal et tous les sous-répertoires
mkdir -p ecommerce-workspace/.claude/commands
mkdir -p ecommerce-workspace/products/active/descriptions
mkdir -p ecommerce-workspace/products/active/seo
mkdir -p ecommerce-workspace/products/drafts
mkdir -p ecommerce-workspace/products/archived
mkdir -p ecommerce-workspace/campaigns/email/briefs
mkdir -p ecommerce-workspace/campaigns/email/copy
mkdir -p ecommerce-workspace/campaigns/email/results
mkdir -p ecommerce-workspace/campaigns/paid-ads/briefs
mkdir -p ecommerce-workspace/campaigns/paid-ads/copy
mkdir -p ecommerce-workspace/campaigns/paid-ads/results
mkdir -p ecommerce-workspace/customer-service/templates
mkdir -p ecommerce-workspace/customer-service/policies
mkdir -p ecommerce-workspace/customer-service/gorgias
mkdir -p ecommerce-workspace/suppliers/comms
mkdir -p ecommerce-workspace/reports/weekly
mkdir -p ecommerce-workspace/reports/monthly
mkdir -p ecommerce-workspace/reports/attribution
mkdir -p ecommerce-workspace/sops

# Installer les skills UitKit
npx uitkit add skill small-business/shopify-operations
npx uitkit add skill small-business/ecommerce-seller
npx uitkit add skill small-business/product-listing-optimizer
npx uitkit add skill small-business/returns-handler
npx uitkit add skill marketing/email-sequence
npx uitkit add skill marketing/paid-ads
npx uitkit add skill marketing/page-cro

# Installer les commandes slash UitKit dans .claude/commands/
npx uitkit add command listing-optimizer
npx uitkit add command email-campaign
npx uitkit add command ad-copy
npx uitkit add command returns-policy
npx uitkit add command supplier-update
npx uitkit add command weekly-performance
npx uitkit add command inventory-alert

# Créer le CLAUDE.md vide
touch ecommerce-workspace/CLAUDE.md

# Initialiser les fichiers CSV et modèles principaux
touch ecommerce-workspace/products/active/sku-overview.csv
touch ecommerce-workspace/suppliers/vendor-directory.md
touch ecommerce-workspace/suppliers/reorder-tracker.csv
```

---

## Modèle CLAUDE.md

```markdown
# Espace de travail Opérateur E-commerce

Ceci est un espace de travail Claude Code pour opérer une marque DTC sur Shopify. Claude aide à
l'optimisation des fiches produits, la rédaction de campagnes, la création de modèles de service
client, les communications fournisseurs et le reporting de performance hebdomadaire. Toutes les
tâches sont opérationnelles — aucun code applicatif ne réside ici.

---

## Stack

- Shopify — vitrine, inventaire, commandes
- Klaviyo — campagnes et flux email et SMS
- Meta Ads Manager + Google Ads — acquisition payante
- Triple Whale (ou Northbeam) — attribution, MER, ROAS consolidé
- Gorgias — tickets de support client et macros
- ShipBob (ou Flexport) — fulfillment 3PL et retours
- QuickBooks Online — compte de résultat, COGS, rapprochement

---

## Conventions de répertoire

- `products/active/` — toutes les références actives ; modifier les descriptions ici avant de pousser vers Shopify
- `campaigns/` — les briefs vont dans `briefs/`, le contenu finalisé va dans `copy/`
- `customer-service/policies/` — source de vérité pour tous les textes de politique côté client
- `suppliers/comms/[supplier-name]/` — un dossier par fournisseur pour l'historique des bons de commande
- `reports/weekly/` — un fichier par semaine nommé `YYYY-Www-performance.md`
- `sops/` — checklists opérationnelles que Claude suit étape par étape

---

## Tâches courantes — commandes exactes

### Réécrire une fiche produit
/listing-optimizer
Collez le titre actuel du produit Shopify, la description, le prix et les mots-clés cibles.
Claude retourne un titre réécrit (≤70 caractères), une description de page produit (axée sur les bénéfices, 150-200 mots),
ainsi qu'un méta-titre + méta-description prêts à coller dans Shopify.

### Rédiger une campagne email
/email-campaign
Fournir : objectif de la campagne, segment Klaviyo cible, offre ou accroche, date d'envoi.
Claude retourne 2 variantes d'objet (A/B), un texte d'aperçu et le contenu complet du corps.

### Générer des publicités
/ad-copy
Fournir : plateforme (Meta ou Google), objectif de campagne, produit ou offre, audience.
Résultat Meta : 5 accroches de texte principal + 5 titres. Résultat Google : 15 titres RSA + 4 descriptions.

### Mettre à jour la politique de retours
/returns-policy
Décrivez la modification nécessaire (ex. : "étendre la fenêtre de retour de 30 à 45 jours pour les commandes de fêtes").
Claude réécrit la section concernée et signale tout impact en aval sur la matrice de remboursement.

### Rédiger un email fournisseur
/supplier-update
Fournir : nom du fournisseur, numéro de bon de commande ou produit, le problème ou la demande.
Claude récupère les coordonnées depuis `suppliers/vendor-directory.md` et rédige un email professionnel.

### Générer le rapport de performance hebdomadaire
/weekly-performance
Collez votre export de résumé hebdomadaire Triple Whale ou Northbeam.
Claude retourne un récit structuré couvrant le ROAS consolidé, le nCAC, le MER, les 5 meilleures références par revenu,
et une action recommandée.

### Déclencher une alerte d'inventaire
/inventory-alert
Collez la liste de références avec les niveaux de stock actuels.
Claude signale toute référence en dessous du seuil de réassort dans `suppliers/reorder-tracker.csv`
et rédige une recommandation de réassort.

---

## Conventions

- Le ton de la marque est [INSÉRER LE TON : ex. "direct, chaleureux, jamais insistant"]. À appliquer à tous les contenus.
- Les descriptions de produits mettent en avant le bénéfice client, pas la caractéristique.
- Tous les montants en USD sauf indication contraire.
- Les emails fournisseurs sont professionnels et concis — pas de formules creuses.
- Les rapports hebdomadaires suivent exactement le modèle dans `reports/weekly/weekly-performance-template.md`.
- Ne pas modifier `products/archived/` — les références arrêtées sont des enregistrements en lecture seule.
- Lorsqu'un fichier de politique est modifié, noter la date et la raison en haut de ce fichier.
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
        "/path/to/ecommerce-workspace"
      ]
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
            "command": "bash -c 'if [[ \"$CLAUDE_TOOL_OUTPUT_PATH\" == */reports/weekly/* ]]; then echo \"[hook] Weekly report written: $CLAUDE_TOOL_OUTPUT_PATH\" >> .claude/report-log.txt; fi'"
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
            "command": "bash -c 'if [[ \"$CLAUDE_TOOL_INPUT_PATH\" == */customer-service/policies/* ]]; then cp \"$CLAUDE_TOOL_INPUT_PATH\" \"${CLAUDE_TOOL_INPUT_PATH}.bak\" 2>/dev/null; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'echo \"Session ended at $(date)\" >> .claude/session-log.txt'"
          }
        ]
      }
    ]
  }
}
```

---

## Skills à installer

```bash
npx uitkit add skill small-business/shopify-operations
npx uitkit add skill small-business/ecommerce-seller
npx uitkit add skill small-business/product-listing-optimizer
npx uitkit add skill small-business/returns-handler
npx uitkit add skill marketing/email-sequence
npx uitkit add skill marketing/paid-ads
npx uitkit add skill marketing/page-cro
```

---

## Ressources associées

- [Guide : Claude pour les opérateurs e-commerce](../guides/for-ecommerce-operator.md)
- [Workflow : Lancement de nouveau produit](../workflows/new-product-launch.md)
- [Workflow : Revue de performance hebdomadaire](../workflows/weekly-performance-review.md)
