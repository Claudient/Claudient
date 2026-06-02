# Espace de travail Analyste Financier / CFO — Structure de projet

> Pour un analyste financier ou un CFO gérant la modélisation financière, la clôture mensuelle, la création de dossiers pour le conseil d'administration, la planification de scénarios et le reporting investisseurs — le tout piloté depuis un unique espace de travail Claude Code.

## Stack

- Excel / Google Sheets — modèles à 3 états financiers, DCF, budget vs réalisé, modèles de scénarios
- QuickBooks, Xero ou NetSuite — grand livre, comptes fournisseurs/clients, écritures comptables, balance de vérification
- Notion ou Confluence — politiques comptables, checklists de clôture, documentation d'équipe
- Carta — tableau de capitalisation, pool d'options, modélisation de la dilution, données 409A
- Slack — coordination du processus de clôture, préparation du conseil, questions-réponses investisseurs
- PowerPoint ou Google Slides — dossiers pour le conseil, mises à jour investisseurs, reporting de gestion

## Arborescence du répertoire

```
finance-analyst-workspace/
├── .claude/
│   ├── CLAUDE.md                              # Instructions de l'espace de travail pour Claude Code
│   ├── settings.json                          # Permissions, hooks, configuration MCP
│   └── commands/
│       ├── variance-analysis.md               # Rapport d'écarts sur la période — budget vs réalisé avec commentaires
│       ├── model-update.md                    # Mise à jour du modèle à 3 états avec les derniers chiffres réels
│       ├── board-pack.md                      # Compilation du dossier conseil — données financières, KPIs, narrative
│       ├── close-checklist.md                 # Liste des tâches de clôture de fin de mois avec suivi des statuts
│       ├── scenario-model.md                  # Planification de scénarios — cas de base / optimiste / pessimiste
│       ├── investor-update.md                 # Lettre de mise à jour investisseurs — métriques, narrative, demandes
│       └── budget-reforecast.md               # Reforecast trimestriel — 4 trimestres glissants avec hypothèses
├── models/
│   ├── 3-statement/
│   │   ├── 3-statement-model-2025.xlsx        # Modèle financier intégré — compte de résultat, bilan, flux de trésorerie
│   │   ├── 3-statement-model-2024.xlsx        # Modèle de l'année précédente — référence archivée
│   │   ├── assumptions-log.md                 # Hypothèses clés et historique des modifications
│   │   └── monthly-actuals-feed.csv           # Export QuickBooks/Xero pour les mises à jour du modèle
│   ├── dcf/
│   │   ├── dcf-model-current.xlsx             # Flux de trésorerie actualisés — WACC, valeur terminale, TRI
│   │   ├── wacc-calculation.xlsx              # Calcul du WACC — coût des capitaux propres, coût de la dette, bêta
│   │   ├── sensitivity-table.xlsx             # Analyse de sensibilité : croissance des revenus vs marge EBITDA
│   │   └── dcf-assumptions.md                 # Justification des paramètres DCF — croissance, marges, WACC
│   ├── budget-vs-actual/
│   │   ├── bva-2025-ytd.xlsx                  # Budget vs réalisé YTD par centre de coûts et ligne budgétaire
│   │   ├── bva-template.xlsx                  # Modèle BvA vierge pour les nouvelles périodes
│   │   ├── variance-commentary-jan-2025.md    # Commentaires d'écarts — package de gestion janvier 2025
│   │   ├── variance-commentary-feb-2025.md    # Commentaires d'écarts — package de gestion février 2025
│   │   ├── variance-commentary-mar-2025.md    # Commentaires d'écarts — package de gestion mars 2025
│   │   └── variance-threshold-policy.md       # Politique : quel pourcentage d'écart déclenche un commentaire obligatoire
│   └── scenario/
│       ├── scenario-model-q2-2025.xlsx        # Modèle de scénarios base / optimiste / pessimiste — T2 2025
│       ├── scenario-model-q3-2025.xlsx        # Modèle de scénarios T3 2025 — mis à jour après clôture
│       ├── macro-assumptions.md               # Hypothèses externes : taux, change, conditions de marché
│       └── scenario-summary-template.xlsx     # Résumé de scénarios sur une page pour le conseil et les investisseurs
├── reports/
│   ├── board-packs/
│   │   ├── board-pack-q1-2025.pptx            # Dossier conseil T1 2025 — données financières + KPIs + narrative
│   │   ├── board-pack-q2-2025.pptx            # Dossier conseil T2 2025
│   │   ├── board-pack-template.pptx           # Modèle maître — mise en page et charte graphique approuvées
│   │   └── board-pack-data-q2-2025.xlsx       # Fichier de données support pour les graphiques du dossier T2
│   ├── investor-updates/
│   │   ├── investor-update-may-2025.md        # Lettre de mise à jour investisseurs mensuelle — mai 2025
│   │   ├── investor-update-jun-2025.md        # Lettre de mise à jour investisseurs mensuelle — juin 2025
│   │   ├── investor-update-template.md        # Modèle standard de lettre aux investisseurs
│   │   └── investor-list.md                   # Registre actuel des investisseurs — noms, % de détention, contacts
│   └── management-reporting/
│       ├── management-package-jan-2025.xlsx   # Package de gestion mensuel — janvier 2025
│       ├── management-package-feb-2025.xlsx   # Package de gestion mensuel — février 2025
│       ├── management-package-mar-2025.xlsx   # Package de gestion mensuel — mars 2025
│       └── management-package-template.xlsx   # Modèle standard de package de gestion
├── close/
│   ├── month-end-close-checklist.md           # Liste maître des tâches de clôture mensuelle avec responsables
│   ├── close-calendar-2025.md                 # Dates de clôture ferme, dates de clôture provisoire, dates du conseil
│   ├── journal-entries/
│   │   ├── je-template.csv                    # Format standard d'import d'écritures pour QuickBooks/Xero
│   │   ├── accruals-jan-2025.csv              # Écritures de provisions — janvier 2025
│   │   ├── accruals-feb-2025.csv              # Écritures de provisions — février 2025
│   │   ├── accruals-mar-2025.csv              # Écritures de provisions — mars 2025
│   │   └── prepaid-amortization-schedule.xlsx # Tableau des charges constatées d'avance avec amortissement mensuel
│   ├── reconciliations/
│   │   ├── bank-recon-jan-2025.xlsx           # Rapprochement bancaire — janvier 2025
│   │   ├── bank-recon-feb-2025.xlsx           # Rapprochement bancaire — février 2025
│   │   ├── ar-aging-jan-2025.xlsx             # Balance âgée clients — janvier 2025
│   │   ├── ar-aging-feb-2025.xlsx             # Balance âgée clients — février 2025
│   │   ├── intercompany-recon.xlsx            # Éliminations interentreprises — le cas échéant
│   │   └── gl-recon-checklist.md              # Checklist de lettrage des comptes du grand livre avec visas
│   └── trial-balance/
│       ├── tb-jan-2025.csv                    # Balance de vérification exportée — janvier 2025
│       ├── tb-feb-2025.csv                    # Balance de vérification exportée — février 2025
│       └── tb-mapping.xlsx                    # Correspondance plan comptable / états financiers
├── budgets/
│   ├── annual/
│   │   ├── budget-2025.xlsx                   # Budget d'exploitation annuel approuvé par le conseil — EX2025
│   │   ├── budget-2025-assumptions.md         # Justification des lignes budgétaires EX2025
│   │   ├── budget-2026-draft.xlsx             # Projet de budget EX2026 — en cours
│   │   └── budget-approval-log.md             # Dates d'approbation du conseil, historique des révisions, signataires
│   └── reforecasts/
│       ├── reforecast-q1-2025.xlsx            # Reforecast T1 2025 — vision glissante sur 4 trimestres
│       ├── reforecast-q2-2025.xlsx            # Reforecast T2 2025
│       ├── reforecast-q3-2025.xlsx            # Reforecast T3 2025
│       └── reforecast-assumptions.md          # Journal des modifications d'hypothèses de reforecast
├── compliance/
│   ├── audit/
│   │   ├── audit-prep-checklist.md            # Préparation de l'audit annuel — liste PBC et statuts
│   │   ├── pbc-2024.xlsx                      # Programme préparé par le client — audit EX2024
│   │   ├── audit-adjustments-2024.xlsx        # Ajustements proposés par les auditeurs et réponses de la direction
│   │   └── auditor-contact.md                 # Nom de l'auditeur, équipe de mission, coordonnées
│   ├── tax/
│   │   ├── tax-calendar-2025.md               # Échéances de déclaration fédérales et étatiques — EX2025
│   │   ├── r-and-d-credit-analysis.xlsx       # Analyse de qualification du crédit d'impôt R&D
│   │   ├── state-nexus-tracker.md             # États avec nexus fiscal — statut d'enregistrement et de déclaration
│   │   └── 83b-elections-log.md               # Journal des élections 83(b) déposées par les fondateurs/employés
│   └── regulatory/
│       ├── 409a-valuation-current.pdf         # Rapport d'évaluation 409A en vigueur
│       ├── 409a-history.md                    # Historique des évaluations 409A — dates, prestataires, JVM
│       └── irs-correspondence/                # Correspondances IRS et réponses — un fichier par avis
├── docs/
│   ├── accounting-policies.md                 # Politiques comptables formelles — comptabilisation des revenus, immobilisations, etc.
│   ├── chart-of-accounts.xlsx                 # Plan comptable complet avec codes, types et descriptions des comptes
│   ├── revenue-recognition-policy.md          # Document de politique de comptabilisation des revenus — ASC 606
│   ├── expense-policy.md                      # Politique de remboursement des frais des employés
│   ├── equity-compensation-summary.md         # Pool d'options, attributions, calendriers d'acquisition, résumé Carta
│   └── glossary.md                            # Glossaire de l'équipe financière — abréviations et définitions
└── cap-table/
    ├── cap-table-current.xlsx                 # Tableau de capitalisation pleinement dilué — synchronisé depuis Carta
    ├── option-pool-analysis.xlsx              # Analyse de la suffisance du pool d'options et des besoins de renouvellement
    ├── dilution-scenarios.xlsx                # Modélisation de la dilution — Série A, B, conversions SAFE
    └── 409a-strike-price-log.md              # Historique des prix d'exercice par date d'attribution
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `.claude/commands/variance-analysis.md` | Commande slash qui prend un argument de période (ex. `may-2025`), lit le fichier BvA correspondant dans `models/budget-vs-actual/`, et génère des commentaires d'écarts à destination de la direction avec explications ligne par ligne |
| `.claude/commands/board-pack.md` | Commande slash qui compile les données financières du trimestre en cours, les tendances des KPIs et le résumé des scénarios en une narrative et des notes de présentation pour le conseil |
| `.claude/commands/close-checklist.md` | Commande slash qui génère une liste de tâches de clôture de fin de mois pré-remplie avec les responsables, les échéances et les points reportés depuis la clôture précédente |
| `models/3-statement/3-statement-model-2025.xlsx` | Modèle financier intégré maître — les mises à jour des chiffres réels se propagent du compte de résultat au bilan puis aux flux de trésorerie ; source de vérité pour tout le reporting |
| `close/month-end-close-checklist.md` | Checklist de clôture évolutive avec responsable de tâche, statut (ouvert/terminé/bloqué) et date d'échéance par étape ; mise à jour à chaque cycle de clôture |
| `budgets/annual/budget-2025.xlsx` | Budget d'exploitation approuvé par le conseil ; jamais modifié après approbation — les écarts sont expliqués par rapport à cette référence |
| `compliance/audit/audit-prep-checklist.md` | Checklist PBC (préparée par le client) pour l'audit annuel ; suit le statut des documents et la confirmation de réception par les auditeurs |
| `reports/investor-updates/investor-update-template.md` | Format standard de lettre aux investisseurs : métriques clés, narrative, jalons importants, demandes — utilisé pour chaque mise à jour mensuelle |
| `docs/chart-of-accounts.xlsx` | Plan comptable canonique — tout nouveau compte ajouté dans QuickBooks/Xero/NetSuite doit y figurer avec la correspondance correcte aux états financiers |
| `cap-table/cap-table-current.xlsx` | Tableau de capitalisation pleinement dilué exporté depuis Carta ; sert de base à la modélisation de la dilution, aux paramètres 409A et au reporting du conseil |

## Mise en place rapide

```bash
# Créer la racine de l'espace de travail
mkdir -p finance-analyst-workspace
cd finance-analyst-workspace

# Créer la structure .claude
mkdir -p .claude/commands

# Créer les répertoires de l'espace de travail
mkdir -p models/3-statement
mkdir -p models/dcf
mkdir -p models/budget-vs-actual
mkdir -p models/scenario
mkdir -p reports/board-packs
mkdir -p reports/investor-updates
mkdir -p reports/management-reporting
mkdir -p close/journal-entries
mkdir -p close/reconciliations
mkdir -p close/trial-balance
mkdir -p budgets/annual
mkdir -p budgets/reforecasts
mkdir -p compliance/audit
mkdir -p compliance/tax
mkdir -p compliance/regulatory/irs-correspondence
mkdir -p docs
mkdir -p cap-table

# Initialiser les fichiers clés
touch models/3-statement/assumptions-log.md
touch models/budget-vs-actual/variance-threshold-policy.md
touch close/month-end-close-checklist.md
touch close/close-calendar-2025.md
touch close/gl-recon-checklist.md
touch close/reconciliations/gl-recon-checklist.md
touch budgets/annual/budget-2025-assumptions.md
touch budgets/annual/budget-approval-log.md
touch budgets/reforecasts/reforecast-assumptions.md
touch compliance/audit/audit-prep-checklist.md
touch compliance/tax/tax-calendar-2025.md
touch compliance/tax/state-nexus-tracker.md
touch docs/accounting-policies.md
touch docs/revenue-recognition-policy.md
touch docs/expense-policy.md
touch docs/equity-compensation-summary.md
touch docs/glossary.md
touch cap-table/409a-strike-price-log.md
touch reports/investor-updates/investor-update-template.md

# Initialiser .claude/commands
touch .claude/commands/variance-analysis.md
touch .claude/commands/model-update.md
touch .claude/commands/board-pack.md
touch .claude/commands/close-checklist.md
touch .claude/commands/scenario-model.md
touch .claude/commands/investor-update.md
touch .claude/commands/budget-reforecast.md

# Installer les compétences Claude Code
npx claudient add skill finance/3-statement-model
npx claudient add skill finance/dcf-model
npx claudient add skill finance/budget-vs-actual
npx claudient add skill finance/board-pack-builder
npx claudient add skill finance/financial-plan
npx claudient add skill finance/gl-reconciler
npx claudient add skill finance/comps-analysis
npx claudient add skill productivity/investor-update
npx claudient add skill productivity/exec-briefing
```

## Modèle CLAUDE.md

```markdown
# Espace de travail Analyste Financier / CFO

Cet espace de travail prend en charge les opérations financières : mises à jour des modèles, clôture mensuelle,
création de dossiers pour le conseil, planification de scénarios, reporting investisseurs et préparation
des audits — le tout piloté par des fichiers structurés et des commandes slash.

---

## Ce qu'est cet espace

Un espace de travail Claude Code structuré pour un analyste financier ou un CFO. Chaque répertoire correspond
à une fonction financière distincte. Claude Code lit les chiffres réels, les budgets et les fichiers de politique
pour produire des résultats précis et propres à l'organisation — non des conseils financiers génériques.

---

## Stack

- Excel / Google Sheets — modèles financiers, BvA, scénarios (fichiers dans models/)
- QuickBooks / Xero / NetSuite — grand livre, comptes fournisseurs/clients, balance (exports dans close/trial-balance/)
- Notion / Confluence — politiques comptables, documents de clôture (docs/)
- Carta — tableau de capitalisation et données equity (cap-table/)
- Slack — coordination de clôture, questions-réponses investisseurs (MCP : slack)
- PowerPoint / Google Slides — dossiers conseil, mises à jour investisseurs (reports/)

---

## Conventions des répertoires

- `models/` — Tous les modèles financiers. Ne pas y stocker les exports de chiffres réels seuls ; ceux-ci vont dans close/.
- `close/` — Artefacts de clôture mensuelle. Un sous-répertoire par domaine de processus : journal-entries/, reconciliations/, trial-balance/.
- `budgets/` — Budget approuvé par le conseil dans budgets/annual/. Reforecasts dans budgets/reforecasts/. Ne jamais écraser le fichier de budget approuvé.
- `reports/` — Livrables. Dossiers conseil dans board-packs/, lettres investisseurs dans investor-updates/, packages de gestion dans management-reporting/.
- `compliance/` — Documents PBC d'audit, déclarations fiscales, documents réglementaires. Ne pas stocker ici sauf si final ou quasi-final.
- `docs/` — Documents de politique et documents de référence. Maintenir accounting-policies.md et chart-of-accounts.xlsx à jour.
- `cap-table/` — Exports Carta et modélisation equity. Actualiser cap-table-current.xlsx après chaque attribution ou événement de financement.

---

## Tâches courantes — commandes exactes

### Reporting d'écarts et de clôture
```
/variance-analysis may-2025   — Lit models/budget-vs-actual/bva-2025-ytd.xlsx, génère
                                des commentaires d'écarts ligne par ligne pour la période donnée
/close-checklist              — Génère la liste des tâches de clôture mensuelle avec responsables et échéances
/model-update                 — Met à jour le modèle à 3 états avec le dernier export de balance de vérification
```

### Reporting conseil et investisseurs
```
/board-pack                   — Compile les données financières du trimestre en cours, les KPIs,
                                le résumé des scénarios en narrative et notes de présentation pour le conseil
/investor-update              — Rédige la lettre mensuelle de mise à jour investisseurs à partir
                                des métriques actuelles et de l'avancement des jalons
```

### Budgétisation et planification de scénarios
```
/budget-reforecast            — Construit le reforecast glissant sur 4 trimestres avec journal des hypothèses
/scenario-model               — Génère les résultats des scénarios base/optimiste/pessimiste à partir des paramètres pilotes
```

---

## Conventions que Claude doit respecter

- Le fichier de budget approuvé par le conseil (budgets/annual/budget-2025.xlsx) est en lecture seule. Ne jamais proposer de modifications.
- Les commentaires d'écarts doivent citer la ligne spécifique, le montant en dollars et le pourcentage. Ne jamais écrire de commentaire vague comme "supérieur aux attentes".
- Lors de la rédaction des mises à jour investisseurs, extraire les métriques en priorité depuis management-reporting/. Ne pas estimer les chiffres.
- Les écritures comptables doivent respecter le format défini dans close/journal-entries/je-template.csv avant toute suggestion d'import.
- Le plan comptable fait autorité sur les codes de compte. Si un nouveau compte est nécessaire, le signaler explicitement et le soumettre au contrôleur pour ajout.
- Les prix d'exercice 409A dans cap-table/409a-strike-price-log.md sont confidentiels — ne pas les inclure dans les dossiers conseil sauf instruction explicite.
- Les documents PBC d'audit dans compliance/audit/ sont confidentiels. Ne pas référencer leur contenu dans les livrables destinés aux investisseurs.
- Lors des mises à jour des modèles, toujours consigner les modifications d'hypothèses dans models/3-statement/assumptions-log.md avec la date et la raison.
- Les fichiers de reforecast doivent inclure une section journal des modifications. Ne jamais écraser un fichier de reforecast antérieur — créer un nouveau fichier versionné.
- Tous les seuils d'écarts déclenchant un commentaire obligatoire sont définis dans models/budget-vs-actual/variance-threshold-policy.md.
```

## Serveurs MCP

```json
{
  "mcpServers": {
    "quickbooks": {
      "command": "npx",
      "args": ["-y", "@intuit/mcp-server-quickbooks"],
      "env": {
        "QB_CLIENT_ID": "${QB_CLIENT_ID}",
        "QB_CLIENT_SECRET": "${QB_CLIENT_SECRET}",
        "QB_REALM_ID": "${QB_REALM_ID}",
        "QB_ACCESS_TOKEN": "${QB_ACCESS_TOKEN}"
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
        "/Users/you/finance-analyst-workspace"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"models/budget-vs-actual/\"; then echo \"[BvA hook] Fichier de variance mis à jour — confirmer que variance-threshold-policy.md a été vérifié pour les exigences de commentaires obligatoires.\"; fi'"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"budgets/annual/budget-2025\"; then echo \"[Budget guard] STOP — le fichier de budget annuel approuvé est en lecture seule. Écrire dans budgets/reforecasts/ à la place.\"; exit 1; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'echo \"[Fin de session] Si vous avez mis à jour un modèle, confirmer que les modifications d hypothèses sont consignées dans models/3-statement/assumptions-log.md. Si vous avez rédigé un document de clôture, confirmer qu il est référencé dans close/month-end-close-checklist.md.\"'"
          }
        ]
      }
    ]
  }
}
```

## Compétences à installer

```bash
npx claudient add skill finance/3-statement-model
npx claudient add skill finance/dcf-model
npx claudient add skill finance/budget-vs-actual
npx claudient add skill finance/board-pack-builder
npx claudient add skill finance/financial-plan
npx claudient add skill finance/gl-reconciler
npx claudient add skill finance/comps-analysis
npx claudient add skill productivity/investor-update
npx claudient add skill productivity/exec-briefing
npx claudient add skill productivity/stakeholder-comms
npx claudient add skill data-ml/stakeholder-report
```

## Liens connexes

- [Guide : Claude pour les analystes financiers et les CFO](../guides/for-finance-analyst.md)
- [Workflow : Clôture de fin de mois](../workflows/month-end-close.md)
- [Workflow : Préparation du dossier conseil](../workflows/board-pack-prep.md)
- [Workflow : Budgétisation annuelle](../workflows/annual-budgeting.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
