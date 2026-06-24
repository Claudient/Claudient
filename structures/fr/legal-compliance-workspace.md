# Espace de travail juridique et conformité — Structure de projet

> Pour les juristes internes ou les responsables conformité gérant la révision de contrats, le suivi réglementaire, la conformité RGPD/vie privée, la diligence raisonnable des fournisseurs et la rédaction de politiques sur Clio, Ironclad, Westlaw, DocuSign et Microsoft 365.

## Stack

- **Clio** ou **Ironclad** — Gestion des dossiers, cycle de vie des contrats, suivi des révisions, routage des signatures
- **Westlaw** ou **LexisNexis** — Recherche juridique principale, récupération de jurisprudence, orientation réglementaire
- **DocuSign** — Routage des signatures électroniques, suivi des enveloppes, stockage des contrats exécutés
- **Microsoft 365** — Word (révisions), Outlook (conseil externe), Teams (canal juridique), SharePoint (gestion documentaire)
- **Notion** — Documentation des politiques, calendriers de conformité, wiki juridique interne
- **Slack** — Gestion des demandes juridiques internes, collaboration avec l'équipe commerciale, alertes de conformité
- **Claude Code** — Révision de contrats, révision de NDA, analyse des lacunes RGPD, diligence fournisseurs, rédaction de politiques, mémos de recherche juridique

## Arborescence des répertoires

```
legal-compliance-workspace/
├── .claude/
│   ├── CLAUDE.md                              # Instructions de l'espace de travail (coller le modèle ci-dessous)
│   ├── settings.json                          # Serveurs MCP, hooks, permissions
│   └── commands/
│       ├── contract-review.md                 # /contract-review [type] — révisions, signaux de risque, clauses manquantes
│       ├── nda-review.md                      # /nda-review — analyse et révisions d'un NDA mutuel ou unilatéral
│       ├── gdpr-check.md                      # /gdpr-check — analyse des lacunes RGPD/CCPA sur un document ou un processus
│       ├── vendor-diligence.md                # /vendor-diligence — révision du contrat fournisseur + questionnaire de sécurité
│       ├── policy-draft.md                    # /policy-draft — rédiger ou mettre à jour une politique d'entreprise
│       ├── legal-research.md                  # /legal-research — produire un mémo juridique à partir de sources Westlaw
│       └── compliance-audit.md                # /compliance-audit — exécuter une liste de contrôle d'audit structurée (SOC2, ISO, RGPD)
├── contracts/
│   ├── templates/
│   │   ├── nda/
│   │   │   ├── mutual-nda-template.docx       # NDA mutuel standard — papier de l'entreprise, clauses préférées
│   │   │   ├── one-way-nda-template.docx      # NDA unilatéral pour les fournisseurs divulguant à l'entreprise
│   │   │   └── nda-fallback-positions.md      # Positions de repli lors des révisions : ce qu'on peut concéder et ce qu'on maintient
│   │   ├── msa/
│   │   │   ├── msa-customer-paper.docx        # Contrat-cadre de services — l'entreprise en tant que client
│   │   │   ├── msa-vendor-paper.docx          # MSA — l'entreprise en tant que fournisseur/prestataire
│   │   │   └── msa-redline-guide.md           # Stratégie de révision clause par clause et positions de repli
│   │   ├── sow/
│   │   │   ├── sow-template.docx              # Cahier des charges — services, livrables, jalons, honoraires
│   │   │   └── sow-fixed-fee-template.docx    # Variante à prix forfaitaire
│   │   ├── employment/
│   │   │   ├── offer-letter-template.docx     # Lettre d'offre standard — at-will, équité, avantages
│   │   │   ├── contractor-agreement.docx      # Contrat de prestataire indépendant — cession de PI, CIIA
│   │   │   └── severance-template.docx        # Accord de rupture et de décharge
│   │   └── vendor/
│   │       ├── vendor-dpa-template.docx       # Accord de traitement des données — conforme à l'article 28 du RGPD
│   │       ├── vendor-msa-template.docx       # MSA fournisseur avec indemnisation, plafond de responsabilité, résiliation
│   │       └── vendor-security-addendum.docx  # Addendum sécurité et vie privée pour les fournisseurs traitant des données
│   └── executed/
│       ├── ndas/
│       │   └── .gitkeep                       # NDA exécutés par nom de contrepartie + date
│       ├── msas/
│       │   └── .gitkeep                       # MSA exécutés — clients et fournisseurs
│       └── dpas/
│           └── .gitkeep                       # DPA exécutés — un par fournisseur traitant des données
├── active-matters/
│   ├── _template/
│   │   ├── matter-summary.md                  # Nom du dossier, type, date d'ouverture, conseil référent, statut
│   │   ├── timeline.md                        # Journal chronologique des événements — dates, actions, parties
│   │   ├── docs/
│   │   │   └── .gitkeep                       # Documents du dossier — actes de procédure, correspondances, pièces
│   │   └── research/
│   │       └── .gitkeep                       # Mémos de recherche propres à ce dossier
│   ├── employment-dispute-2026/
│   │   ├── matter-summary.md
│   │   ├── timeline.md
│   │   ├── docs/
│   │   │   ├── demand-letter-2026-03-15.pdf
│   │   │   ├── company-response-2026-03-28.pdf
│   │   │   └── mediation-brief-2026-05-01.docx
│   │   └── research/
│   │       ├── wrongful-termination-memo.md
│   │       └── at-will-exceptions-analysis.md
│   └── ip-ownership-review/
│       ├── matter-summary.md
│       ├── timeline.md
│       ├── docs/
│       │   └── contractor-ciia-review.docx
│       └── research/
│           └── work-for-hire-doctrine.md
├── compliance/
│   ├── regulatory-calendar.md                 # Toutes les échéances réglementaires — RGPD, CCPA, SOC2, ISO — avec responsables
│   ├── gdpr/
│   │   ├── ropa.md                            # Registre des activités de traitement — registre article 30
│   │   ├── data-subjects-register.md          # DSAR en cours et journal des réponses (délais de 30 jours suivis)
│   │   ├── dpia-log.md                        # Analyses d'impact sur la protection des données — une ligne par projet
│   │   ├── breach-register.md                 # Journal des incidents — date, périmètre, statut de notification à l'APD
│   │   ├── transfer-mechanisms.md             # CCT, décisions d'adéquation, BCR utilisés par route de transfert
│   │   └── consent-records/
│   │       └── .gitkeep                       # Enregistrements de consentement par fonctionnalité produit
│   ├── soc2/
│   │   ├── evidence-tracker.md                # Carte des preuves SOC2 Type II — contrôle, responsable, preuve, statut
│   │   ├── controls-matrix.md                 # Ensemble complet de contrôles CC/A/P/C/PI avec notes d'implémentation
│   │   ├── audit-log.md                       # Interactions avec l'auditeur, échantillons demandés, réponses envoyées
│   │   └── evidence/
│   │       ├── access-reviews/
│   │       │   └── .gitkeep                   # Exports des revues d'accès trimestrielles
│   │       └── vendor-reviews/
│   │           └── .gitkeep                   # Rapports annuels de revue de sécurité des fournisseurs
│   └── iso27001/
│       ├── isms-scope.md                      # Déclaration de périmètre du SMSI et applicabilité
│       ├── risk-register.md                   # Registre des risques de sécurité de l'information — risque, cotation, traitement
│       └── statement-of-applicability.md      # DdA — contrôle, dans le périmètre, statut d'implémentation
├── policies/
│   ├── data-classification-policy.md          # Niveaux de classification des données — public, interne, confidentiel, restreint
│   ├── privacy-policy.md                      # Politique de confidentialité externe — conforme RGPD/CCPA
│   ├── acceptable-use-policy.md               # Politique d'utilisation acceptable — usage des systèmes et données de l'entreprise
│   ├── information-security-policy.md         # PSI — contrôles, réponse aux incidents, gestion des accès
│   ├── ai-use-policy.md                       # Outils IA approuvés, usages interdits, règles de traitement des données
│   ├── ethics-code.md                         # Code de conduite — conflits d'intérêts, cadeaux, lanceurs d'alerte
│   ├── records-retention-policy.md            # Calendrier de conservation par type de document — procédure de suspension légale
│   └── changelog.md                           # Historique des révisions de politiques — version, date, auteur, résumé des modifications
├── research/
│   ├── _template-memo.md                      # Format standard du mémo juridique — problème, règle, analyse, conclusion
│   ├── regulatory-guidance/
│   │   ├── gdpr-enforcement-tracker.md        # Actions d'exécution des APD et amendes — journal courant
│   │   ├── ccpa-amendments-summary.md         # CPRA et amendements CCPA ultérieurs avec dates d'entrée en vigueur
│   │   └── ai-regulation-watch.md             # Règlement européen sur l'IA, décret américain sur l'IA, NIST AI RMF — suivi du statut
│   └── memos/
│       ├── 2026-05-open-source-license-risk.md
│       └── 2026-04-employee-monitoring-limits.md
└── ip/
    ├── trademark/
    │   ├── trademark-register.md              # Toutes les marques — verbale, figurative, classes, juridiction, dates de renouvellement
    │   └── filings/
    │       └── .gitkeep                       # Récépissés de dépôt USPTO/EUIPO et actions de bureau
    ├── patents/
    │   ├── patent-register.md                 # Portefeuille de brevets — n° de demande, statut, juridiction, expiration
    │   └── .gitkeep
    └── oss-license-log.md                     # Inventaire des composants open source — type de licence, obligations, niveau de risque
```

## Fichiers clés expliqués

| Chemin | Objectif |
|---|---|
| `.claude/commands/contract-review.md` | Commande slash qui prend un type de contrat (NDA, MSA, SOW, DPA, emploi) et le texte du contrat, puis retourne des révisions avec signalement des risques, les clauses standard manquantes et un résumé des risques classés par gravité |
| `.claude/commands/gdpr-check.md` | Commande slash qui réalise une analyse structurée des lacunes RGPD/CCPA sur un document, une description de processus ou une fonctionnalité produit — produit les écarts mappés sur les articles spécifiques avec les remédiations recommandées |
| `.claude/commands/vendor-diligence.md` | Commande slash pour la révision des contrats fournisseurs — vérifie l'adéquation du DPA, les plafonds de responsabilité, l'indemnisation, la suppression des données, les droits d'audit et la divulgation des sous-traitants par rapport aux standards internes |
| `.claude/commands/compliance-audit.md` | Commande slash qui exécute un audit par liste de contrôle structurée (SOC2 CC, RGPD Chapitre IV, ISO 27001 Annexe A) et produit un rapport de lacunes avec les responsables de contrôle et les exigences en matière de preuves |
| `compliance/gdpr/ropa.md` | Registre des activités de traitement au titre de l'article 30 — requis par le RGPD — suit chaque activité de traitement, sa finalité, sa base légale, les catégories de données, les destinataires et la durée de conservation |
| `compliance/soc2/evidence-tracker.md` | Mappe chaque contrôle SOC2 à l'artefact de preuve, au responsable, à la fréquence de collecte et au statut d'audit — le tableau de bord principal utilisé lors des travaux de terrain de l'audit Type II |
| `contracts/templates/vendor/vendor-dpa-template.docx` | DPA sur papier de l'entreprise pour utilisation avec tous les fournisseurs traitant des données — conforme à l'article 28 du RGPD, inclut les CCT en annexe pour les transferts transfrontaliers |
| `policies/changelog.md` | Historique des révisions de toutes les politiques dans policies/ — requis pour le contrôle documentaire ISO 27001 et les preuves de revue des politiques SOC2 |

## Initialisation rapide

```bash
# Créer la racine de l'espace de travail
mkdir -p legal-compliance-workspace

# Créer la structure .claude
mkdir -p legal-compliance-workspace/.claude/commands

# Créer l'arborescence du répertoire contracts
mkdir -p legal-compliance-workspace/contracts/templates/nda
mkdir -p legal-compliance-workspace/contracts/templates/msa
mkdir -p legal-compliance-workspace/contracts/templates/sow
mkdir -p legal-compliance-workspace/contracts/templates/employment
mkdir -p legal-compliance-workspace/contracts/templates/vendor
mkdir -p legal-compliance-workspace/contracts/executed/ndas
mkdir -p legal-compliance-workspace/contracts/executed/msas
mkdir -p legal-compliance-workspace/contracts/executed/dpas

# Créer le modèle active-matters
mkdir -p legal-compliance-workspace/active-matters/_template/docs
mkdir -p legal-compliance-workspace/active-matters/_template/research

# Créer les répertoires de conformité
mkdir -p legal-compliance-workspace/compliance/gdpr/consent-records
mkdir -p legal-compliance-workspace/compliance/soc2/evidence/access-reviews
mkdir -p legal-compliance-workspace/compliance/soc2/evidence/vendor-reviews
mkdir -p legal-compliance-workspace/compliance/iso27001

# Créer les répertoires policies, research et IP
mkdir -p legal-compliance-workspace/policies
mkdir -p legal-compliance-workspace/research/regulatory-guidance
mkdir -p legal-compliance-workspace/research/memos
mkdir -p legal-compliance-workspace/ip/trademark/filings
mkdir -p legal-compliance-workspace/ip/patents

# Initialiser les fichiers .gitkeep
touch legal-compliance-workspace/contracts/executed/ndas/.gitkeep
touch legal-compliance-workspace/contracts/executed/msas/.gitkeep
touch legal-compliance-workspace/contracts/executed/dpas/.gitkeep
touch legal-compliance-workspace/active-matters/_template/docs/.gitkeep
touch legal-compliance-workspace/active-matters/_template/research/.gitkeep
touch legal-compliance-workspace/compliance/gdpr/consent-records/.gitkeep
touch legal-compliance-workspace/compliance/soc2/evidence/access-reviews/.gitkeep
touch legal-compliance-workspace/compliance/soc2/evidence/vendor-reviews/.gitkeep
touch legal-compliance-workspace/ip/trademark/filings/.gitkeep
touch legal-compliance-workspace/ip/patents/.gitkeep

# Installer les compétences juridiques
npx uitkit add skill legal/contract-review
npx uitkit add skill legal/nda-review
npx uitkit add skill legal/gdpr-expert
npx uitkit add skill legal/compliance-tracker
npx uitkit add skill legal/vendor-contract-review
npx uitkit add skill legal/brief-section-drafter
npx uitkit add skill legal/soc2-compliance
npx uitkit add skill legal/legal-research

# Copier les stubs de commandes dans .claude/commands/
npx uitkit add skill legal/contract-review --output legal-compliance-workspace/.claude/commands/contract-review.md
npx uitkit add skill legal/nda-review --output legal-compliance-workspace/.claude/commands/nda-review.md
npx uitkit add skill legal/gdpr-expert --output legal-compliance-workspace/.claude/commands/gdpr-check.md
npx uitkit add skill legal/vendor-contract-review --output legal-compliance-workspace/.claude/commands/vendor-diligence.md
npx uitkit add skill legal/soc2-compliance --output legal-compliance-workspace/.claude/commands/compliance-audit.md
npx uitkit add skill legal/legal-research --output legal-compliance-workspace/.claude/commands/legal-research.md
```

## Modèle CLAUDE.md

```markdown
# Espace de travail juridique et conformité — Instructions Claude Code

## Présentation

Cet espace de travail est le répertoire de travail des juristes internes et responsables conformité.
Les contrats sont organisés par type dans contracts/, les dossiers juridiques actifs dans active-matters/,
les registres de conformité réglementaire dans compliance/, les politiques d'entreprise dans policies/ et les
mémos de recherche juridique dans research/. Toute révision de contrat, analyse RGPD, diligence fournisseur et
rédaction de politique s'effectue via les compétences Claude Code.

## Stack

- Clio / Ironclad — Gestion des dossiers et cycle de vie des contrats (synchroniser les exports vers active-matters/)
- Westlaw / LexisNexis — Recherche juridique principale ; citer les sources dans research/memos/ avec la référence complète
- DocuSign — Routage des signatures électroniques ; enregistrer les identifiants d'enveloppe dans le dossier de contrat concerné
- Microsoft 365 Word — Révisions et modifications suivies ; enregistrer les versions finales en .docx dans contracts/
- Notion — Wiki des politiques ; maintenir policies/ synchronisé avec Notion comme source faisant foi
- Slack — Gestion des demandes juridiques internes via le canal #legal-requests

## Tâches courantes et commandes exactes

### Réviser un contrat entrant
```
/contract-review [type: NDA | MSA | SOW | DPA | employment | vendor]

Contract text:
[coller le contrat complet ou les sections clés]

Context:
- Counterparty: [nom et rôle — client, fournisseur, partenaire, employé]
- Our paper or their paper: [préciser]
- Deal size / risk level: [ARR approximatif ou valeur du contrat]
- Any known issues flagged by business: [optionnel]
```

### Réviser un NDA
```
/nda-review

NDA text:
[coller le NDA complet]

Type: [mutual | one-way (we disclose) | one-way (they disclose)]
Counterparty: [nom]
Purpose of disclosure: [ce qui est partagé et pourquoi]
Any non-standard requests from counterparty: [optionnel]
```

### Réaliser une analyse des lacunes RGPD/CCPA
```
/gdpr-check

Subject: [document | process | product feature | vendor]

Content:
[coller le texte du document, la description du processus ou la spécification de la fonctionnalité]

Jurisdiction focus: [GDPR | CCPA | both]
Data types involved: [catégories de données personnelles — ex. santé, financier, comportemental]
```

### Réviser un contrat fournisseur et un DPA
```
/vendor-diligence

Vendor: [nom et description du service]
Contract type: [MSA | SaaS subscription | DPA | security addendum]

Contract text:
[coller le contrat ou les sections clés]

Vendor processes personal data: [yes | no]
Data categories: [lister si oui]
Sub-processors disclosed: [yes | no | unknown]
```

### Rédiger ou mettre à jour une politique d'entreprise
```
/policy-draft

Policy: [data classification | acceptable use | privacy | AI use | records retention | ethics]
Action: [draft from scratch | update existing | add section]

Context:
[coller la politique existante si mise à jour, ou décrire ce que la politique doit couvrir]

Trigger: [exigence réglementaire ou incident ayant motivé cette mise à jour]
```

### Rédiger un mémo de recherche juridique
```
/legal-research

Issue: [question juridique précise]
Jurisdiction: [US federal | California | EU | état ou pays spécifique]
Context: [le scénario factuel — 2-3 phrases]
Urgency: [standard | expedited]
Output format: [IRAC memo | summary bullet points | regulation comparison table]
```

### Réaliser un audit de conformité structuré
```
/compliance-audit

Framework: [SOC2 Type II | GDPR Chapter IV | ISO 27001 Annex A | CCPA]
Scope: [full | specific controls — lister les identifiants de contrôle]
Evidence available: [décrire les registres, exports et journaux disponibles]
Audit date or period: [date ou période]
```

## Conventions à respecter

- Chaque dossier actif doit avoir matter-summary.md et timeline.md avant d'y ajouter des documents
- Toutes les révisions sont enregistrées sous la forme YYYY-MM-DD-counterparty-[type]-redline.docx dans le dossier contracts
- Le ropa.md du RGPD est le registre article 30 — le mettre à jour à chaque nouvelle activité de traitement approuvée
- Les DSAR enregistrés dans gdpr/data-subjects-register.md ont un délai de réponse impératif de 30 jours — signaler dès la réception
- Le evidence-tracker.md du SOC2 est mis à jour au début de chaque cycle de travaux de terrain d'audit — ne jamais écraser l'historique
- Le changelog.md des politiques est mis à jour à chaque révision d'une politique dans policies/ — version + date obligatoires
- Les mémos de recherche juridique dans research/memos/ suivent le format IRAC et incluent les références complètes Westlaw/LexisNexis
- Les contrats exécutés vont dans contracts/executed/ — ne jamais les laisser définitivement dans active-matters/
- Les dates de renouvellement du trademark-register.md dans IP sont revues trimestriellement — signaler les renouvellements à moins de 90 jours
- Les obligations des licences OSS dans ip/oss-license-log.md sont revues avant toute intégration d'un nouveau composant open source
```

## Serveurs MCP

```json
{
  "mcpServers": {
    "westlaw": {
      "command": "npx",
      "args": ["-y", "@thomsonreuters/westlaw-mcp-server"],
      "env": {
        "WESTLAW_API_KEY": "your-westlaw-api-key",
        "WESTLAW_CLIENT_ID": "your-client-id",
        "WESTLAW_BASE_URL": "https://api.westlaw.com/v1"
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
        "/Users/your-username/legal-compliance-workspace"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"ropa.md\"; then echo \"[hook] ROPA updated — verify the new processing activity has a legal basis entry and a retention period before closing\"; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"policies/\"; then echo \"[hook] Policy file written — update policies/changelog.md with version, date, and summary of changes\"; fi'"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"breach-register.md\"; then echo \"[hook] CAUTION — writing to breach register. Confirm whether 72-hour DPA notification window applies before saving.\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Compétences à installer

```bash
# Compétences juridiques principales
npx uitkit add skill legal/contract-review
npx uitkit add skill legal/nda-review
npx uitkit add skill legal/gdpr-expert
npx uitkit add skill legal/compliance-tracker
npx uitkit add skill legal/vendor-contract-review
npx uitkit add skill legal/brief-section-drafter
npx uitkit add skill legal/soc2-compliance
npx uitkit add skill legal/legal-research

# Installer toutes les compétences juridiques en une seule fois
npx uitkit add skills legal
```

## Ressources associées

- [Guide juridique et conformité](../guides/for-legal-compliance.md)
- [Workflow de révision des contrats](../workflows/contract-review-cycle.md)
- [Workflow de conformité RGPD](../workflows/gdpr-compliance.md)
