# Cabinet d'avocats / Gestion d'un cabinet juridique — Structure de projet

> Pour les avocats et le personnel juridique d'un cabinet de taille petite à moyenne, gérant l'ouverture des dossiers, la recherche juridique, la rédaction de documents, la facturation, la communication avec les clients, le suivi des délais et la conformité — avec le secret professionnel appliqué à chaque niveau.

## Stack

- **Clio** — Gestion des dossiers, base de données des contacts, suivi du temps, facturation, comptabilité fiduciaire, portail client
- **Westlaw** ou **LexisNexis** — Recherche juridique principale, récupération de jurisprudence, interprétation des textes législatifs, vérification des citations KeyCite/Shepard's
- **Microsoft 365** — Word (rédaction de documents, suivi des modifications), Outlook (communications avec les clients et la partie adverse), Teams (collaboration interne)
- **NetDocuments** ou **iManage** — Système de gestion documentaire (DMS) ; tous les fichiers de dossiers et documents privilégiés y sont hébergés exclusivement
- **DocuSign** — Routage des signatures électroniques pour les accords exécutés, lettres de mission, documents de règlement
- **QuickBooks** — Comptabilité du cabinet, rapprochement du compte courant, comptes fournisseurs, paie
- **Claude Code** — Rédaction de documents, modèles de mémos de recherche, génération de listes de contrôle, documentation des procédures de facturation, automatisation des flux de travail non privilégiés

## Arborescence du projet

```
legal-firm-workspace/
├── .claude/
│   ├── CLAUDE.md                                  # Avis de confidentialité, stack, commandes, conventions
│   ├── settings.json                              # Serveurs MCP, hooks, autorisations des outils
│   └── commands/
│       ├── matter-intake.md                       # /matter-intake — générer une liste de contrôle d'ouverture de dossier et une invite de recherche de conflits
│       ├── research-memo.md                       # /research-memo — créer un mémo de recherche juridique avec structure IRAC
│       ├── draft-contract.md                      # /draft-contract [type] — première ébauche de contrat à partir du type de dossier et des termes clés
│       ├── redline-review.md                      # /redline-review — signaler les clauses manquantes, les termes déséquilibrés, les dispositions à risque
│       ├── billing-entry.md                       # /billing-entry — convertir des notes en saisies de temps conformes aux codes de tâches ABA
│       ├── deadline-check.md                      # /deadline-check — faire remonter les délais de prescription et les échéances du rôle depuis les notes de dossier
│       ├── cite-check.md                          # /cite-check — signaler les affaires nécessitant une vérification KeyCite ou Shepard's
│       └── client-update.md                       # /client-update — rédiger une lettre de mise à jour pour le client (aucun fait privilégié dans l'invite)
├── templates/
│   ├── contracts/
│   │   ├── nda-mutual.docx                        # NDA mutuel — confidentialité bilatérale, durée standard de 2 ans
│   │   ├── nda-one-way.docx                       # NDA unilatéral — favorable à la partie divulgatrice
│   │   ├── services-agreement.docx                # Accord-cadre de services avec annexe SOW
│   │   ├── independent-contractor.docx            # Contrat de prestataire indépendant avec cession de PI et clause de non-sollicitation
│   │   ├── asset-purchase.docx                    # Contrat d'acquisition d'actifs avec annexes indicatives
│   │   └── settlement-agreement.docx              # Accord de règlement et de renonciation — versions générales et conformes à l'ADEA
│   ├── litigation-docs/
│   │   ├── complaint-template.docx                # Requête introductive d'instance fédérale — intitulé, compétence, chefs de demande, conclusions
│   │   ├── answer-template.docx                   # Mémoire en réponse avec moyens de défense affirmatifs
│   │   ├── motion-to-dismiss.docx                 # Requête en irrecevabilité 12(b)(6) — sections d'argumentation étiquetées
│   │   ├── summary-judgment-motion.docx           # Requête en jugement sommaire avec format de déclaration des faits non contestés
│   │   ├── discovery-requests/
│   │   │   ├── interrogatories-plaintiff.docx     # Interrogatoires standards du demandeur, 25 demandes d'aveux
│   │   │   ├── interrogatories-defendant.docx     # Interrogatoires standards du défendeur
│   │   │   ├── rfp-plaintiff.docx                 # Demandes de communication de pièces — ensemble demandeur
│   │   │   └── rfp-defendant.docx                 # Demandes de communication de pièces — ensemble défendeur
│   │   └── deposition-notice.docx                 # Avis de déposition avec annexe duces tecum
│   ├── corporate/
│   │   ├── articles-of-incorporation.docx         # Statuts constitutifs d'une C-corp Delaware
│   │   ├── bylaws-corporation.docx                # Règlement intérieur de société — dispositions standard
│   │   ├── llc-operating-agreement.docx           # Pacte d'associés LLC — variantes unipersonnelle et pluripersonnelle
│   │   ├── board-consent.docx                     # Consentement écrit en lieu et place d'une réunion — décision du conseil
│   │   ├── shareholder-consent.docx               # Consentement écrit — décision des actionnaires
│   │   └── stock-purchase-agreement.docx          # Contrat d'achat d'actions pour tour de financement initial / angel avec déclarations
│   ├── employment/
│   │   ├── offer-letter-exempt.docx               # Lettre d'offre pour cadre exempté FLSA avec clause à volonté
│   │   ├── offer-letter-nonexempt.docx            # Lettre d'offre pour poste non exempté avec avis sur les heures supplémentaires
│   │   ├── separation-agreement.docx              # Accord de rupture et de renonciation — délai de réflexion de 21 jours
│   │   ├── noncompete-agreement.docx              # Clause de non-concurrence spécifique à l'État (préciser la juridiction)
│   │   └── employee-handbook-shell.docx           # Sections de politique : congés, harcèlement, code de conduite
│   └── real-estate/
│       ├── purchase-agreement-residential.docx    # Compromis de vente résidentiel avec paragraphes de conditions
│       ├── purchase-agreement-commercial.docx     # Compromis de vente commercial avec période de due diligence
│       ├── lease-commercial.docx                  # Bail commercial NNN — favorable au bailleur
│       ├── lease-residential.docx                 # Bail d'habitation — modèle neutre vis-à-vis de la juridiction
│       └── closing-checklist.docx                 # Liste de contrôle pour la clôture immobilière avec étapes titre/séquestre
├── research/
│   ├── memo-template.md                           # Format de mémo IRAC : Question, Règle, Analyse, Conclusion
│   ├── case-law-notes/
│   │   ├── _index.md                              # Index courant des affaires citées par thème
│   │   ├── contracts/                             # Résumés des affaires et décisions en droit des contrats
│   │   ├── employment/                            # Notes jurisprudentielles en droit du travail
│   │   ├── corporate/                             # Jurisprudence en gouvernance d'entreprise
│   │   └── litigation/                            # Notes sur la procédure et la preuve
│   └── regulatory-summaries/
│       ├── state-noncompete-map.md                # Tableau de l'exécutabilité par État (date de mise à jour obligatoire)
│       ├── data-privacy-overview.md               # CCPA, panorama législatif étatique — sans données client spécifiques
│       └── bar-admission-rules.md                 # Conditions d'admission au barreau pro hac vice par juridiction
├── checklists/
│   ├── matter-opening.md                          # Nouveau dossier : vérification des conflits, lettre de mission, provision, configuration Clio
│   ├── conflicts-check.md                         # Procédure étape par étape de recherche de conflits dans Clio et divulgations d'embauches latérales
│   ├── due-diligence.md                           # Due diligence M&A / transactionnelle — organisation, PI, litiges, contrats
│   ├── closing.md                                 # Liste de contrôle de clôture de transaction — pré-clôture, jour de clôture, post-clôture
│   ├── litigation-hold.md                         # Étapes de la mise en conservation des preuves et exigences de préservation des documents
│   └── matter-closing.md                          # Clôture de dossier : facturation finale, documents exécutés au DMS, avis de conservation du dossier
├── billing/
│   ├── time-entry-sops.md                         # Codes de tâches ABA, codes UTBMS, directives de rédaction des libellés, incréments minimaux
│   ├── invoice-review-checklist.md                # Revue de pré-facturation : abandons, vérification des tarifs, qualité des libellés, fiducie
│   ├── rate-schedule.md                           # Tarifs des intervenants par rôle (associé, collaborateur, parajuriste, stagiaire)
│   └── trust-accounting-quick-ref.md              # Règles de dépôt/décaissement IOLTA, rappel de rapprochement à trois voies
├── compliance/
│   ├── bar-requirements.md                        # Crédits de formation continue, délais d'inscription annuels par juridiction
│   ├── trust-accounting-sop.md                    # Procédure IOLTA complète : règles de dépôt, décaissement, rapprochement, piste d'audit
│   ├── malpractice-checklist.md                   # Contrôles de risques de faute professionnelle avant ouverture et en cours : périmètre, suivi des délais, conflits, conservation
│   ├── conflicts-policy.md                        # Politique de conflits du cabinet : embauches latérales, clients potentiels, disqualification imputée
│   └── data-security-policy.md                    # Politique de mots de passe, contrôles d'accès au DMS, procédure de réponse aux violations
└── marketing/
    ├── bio-templates.md                           # Format des biographies d'avocats : formation, admissions au barreau, domaines de pratique, publications
    ├── practice-area-descriptions.md              # Descriptions des domaines de pratique pour le web — à vérifier au regard des règles de publicité
    └── client-alert-template.md                  # Format d'alerte sur les évolutions législatives/réglementaires à destination des clients
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `.claude/CLAUDE.md` | Avis de confidentialité, vue d'ensemble du stack, index des commandes, règles de confidentialité — à lire avant chaque session |
| `.claude/commands/matter-intake.md` | Génère la liste de contrôle complète d'ouverture de dossier : étapes de recherche de conflits, déclenchement de la lettre de mission, configuration du dossier Clio, collecte de la provision |
| `.claude/commands/billing-entry.md` | Convertit des notes de temps brutes en libellés conformes aux codes de tâches ABA ; applique l'incrément minimal et les règles de qualité de rédaction du cabinet |
| `checklists/matter-opening.md` | Procédure d'ouverture de dossier faisant autorité — conflits, lettre de mission, provision, création du dossier DMS |
| `checklists/conflicts-check.md` | Protocole structuré de recherche de conflits couvrant la base de données Clio, les parties adverses et les filtres d'embauches latérales |
| `billing/time-entry-sops.md` | Codes de tâches UTBMS/ABA, incrément minimal de facturation, bonnes et mauvaises pratiques de rédaction — le guide de style de facturation |
| `compliance/trust-accounting-sop.md` | Procédure IOLTA complète : ce qui entre en fiducie, contrôles de décaissement, rapprochement à trois voies, préparation à l'audit du barreau |
| `research/memo-template.md` | Modèle de mémo de recherche juridique structuré en IRAC — rappel de vérification des citations avant finalisation |
| `templates/litigation-docs/complaint-template.docx` | Modèle de requête introductive d'instance fédérale avec intitulé, allégations de compétence, causes d'action et conclusions |
| `compliance/malpractice-checklist.md` | Contrôles de risques de faute professionnelle en amont et en cours de dossier : documentation du périmètre, suivi des délais, actualisation des conflits, conservation du dossier |

## Mise en place rapide

```bash
# Créer la racine de l'espace de travail
mkdir -p legal-firm-workspace && cd legal-firm-workspace

# Répertoire .claude et commandes
mkdir -p .claude/commands

# Modèles par type de dossier
mkdir -p templates/contracts
mkdir -p templates/litigation-docs/discovery-requests
mkdir -p templates/corporate
mkdir -p templates/employment
mkdir -p templates/real-estate

# Recherche
mkdir -p research/case-law-notes/contracts
mkdir -p research/case-law-notes/employment
mkdir -p research/case-law-notes/corporate
mkdir -p research/case-law-notes/litigation
mkdir -p research/regulatory-summaries

# Listes de contrôle
mkdir -p checklists

# Facturation
mkdir -p billing

# Conformité
mkdir -p compliance

# Marketing
mkdir -p marketing

# Créer les fichiers markdown principaux
touch checklists/matter-opening.md
touch checklists/conflicts-check.md
touch checklists/due-diligence.md
touch checklists/closing.md
touch checklists/litigation-hold.md
touch checklists/matter-closing.md

touch billing/time-entry-sops.md
touch billing/invoice-review-checklist.md
touch billing/rate-schedule.md
touch billing/trust-accounting-quick-ref.md

touch compliance/bar-requirements.md
touch compliance/trust-accounting-sop.md
touch compliance/malpractice-checklist.md
touch compliance/conflicts-policy.md
touch compliance/data-security-policy.md

touch research/memo-template.md
touch research/case-law-notes/_index.md
touch research/regulatory-summaries/state-noncompete-map.md
touch research/regulatory-summaries/data-privacy-overview.md
touch research/regulatory-summaries/bar-admission-rules.md

touch marketing/bio-templates.md
touch marketing/practice-area-descriptions.md
touch marketing/client-alert-template.md

# Commandes .claude
touch .claude/commands/matter-intake.md
touch .claude/commands/research-memo.md
touch .claude/commands/draft-contract.md
touch .claude/commands/redline-review.md
touch .claude/commands/billing-entry.md
touch .claude/commands/deadline-check.md
touch .claude/commands/cite-check.md
touch .claude/commands/client-update.md

# Installer les compétences UitKit pertinentes
npx uitkit add skill productivity/doc-site-builder
npx uitkit add skill productivity/process-mapper
npx uitkit add skill productivity/stakeholder-comms
npx uitkit add skill productivity/vendor-evaluator

echo "Scaffold complete. Populate CLAUDE.md before first use."
```

## Modèle CLAUDE.md

```markdown
# Cabinet d'avocats / Gestion d'un cabinet juridique — Espace de travail

## AVIS DE SECRET PROFESSIONNEL ET DE CONFIDENTIALITÉ

**Cet espace de travail ne contient AUCUN détail de dossier client, fait de cause ou communication privilégiée.**

Tous les fichiers de dossiers, documents clients, correspondances, mémos de recherche liés à des affaires actives,
et tout contenu protégé par le secret professionnel ou le privilège du travail préparatoire sont stockés
exclusivement dans le système de gestion documentaire (DMS) du cabinet :
- NetDocuments : https://vault.netdocuments.com
- iManage : https://app.imanage.com

Ne collez PAS de noms de clients, de numéros de dossiers liés à de vraies affaires, de noms de parties adverses, de faits
de cause, de montants de règlement ou de tout contenu privilégié dans les invites de Claude Code. Cet espace de travail
est réservé aux modèles, procédures, listes de contrôle et contenus non spécifiques à un dossier.

En cas de doute : si l'information figurerait dans un journal de privilèges, elle n'a pas sa place ici.

---

## Rôle de cet espace de travail

Un espace de travail opérationnel non privilégié pour le cabinet. Les avocats et le personnel l'utilisent pour :
- Rédiger et maintenir des modèles de documents (contrats, squelettes de procédure, formulaires d'entreprise)
- Gérer les flux de facturation et de saisie du temps avec les codes de tâches ABA
- Suivre les délais de conformité (formation continue, rapprochement IOLTA, liste de contrôle de responsabilité professionnelle)
- Produire des squelettes de mémos de recherche (structure IRAC, rappels de vérification des citations)
- Maintenir le contenu marketing du cabinet (biographies, descriptions des domaines de pratique)

Toutes les commandes opèrent sur des modèles et des procédures — jamais sur des données client réelles.

---

## Stack

- **Clio** — Gestion des dossiers, suivi du temps, facturation, comptabilité fiduciaire, portail client
- **Westlaw / LexisNexis** — Recherche juridique ; toutes les affaires citées doivent être vérifiées via KeyCite ou Shepardized avant usage
- **Microsoft 365** — Word (rédaction/suivi des modifications), Outlook (communications client), Teams (interne)
- **NetDocuments / iManage** — DMS ; tous les fichiers de dossiers privilégiés y sont stockés
- **DocuSign** — Routage et stockage des accords exécutés
- **QuickBooks** — Compte courant du cabinet, paie, fournisseurs

---

## Commandes slash

| Commande | Fonction |
|---|---|
| `/matter-intake` | Génère la liste de contrôle d'ouverture de dossier : conflits, lettre de mission, provision, configuration Clio |
| `/research-memo` | Crée un mémo IRAC avec rappel de vérification des citations et espace réservé pour les sources |
| `/draft-contract [type]` | Première ébauche de contrat à partir du type (NDA, MSA, OA, PSA) et des termes clés |
| `/redline-review` | Examine le texte contractuel collé pour détecter les clauses manquantes et les termes déséquilibrés |
| `/billing-entry` | Convertit des notes de temps brutes en saisies narratives conformes ABA/UTBMS |
| `/deadline-check` | Fait remonter les délais de prescription, délais de réponse et dates du rôle depuis les notes |
| `/cite-check` | Signale les affaires d'un mémo nécessitant une vérification KeyCite ou Shepard's |
| `/client-update` | Rédige une lettre de mise à jour pour le client — aucun fait privilégié dans l'invite |

---

## Exigence de vérification des citations

Tout mémo de recherche juridique ou section de mémoire produit par Claude Code n'est qu'une PREMIÈRE ÉBAUCHE.
Chaque citation doit être vérifiée dans Westlaw KeyCite ou LexisNexis Shepard's avant
que le document ne quitte le cabinet. Claude Code n'a pas accès en temps réel aux bases de données
jurisprudentielles et ne peut pas confirmer si une affaire a été infirmée, distinguée ou limitée.

Ajouter ce pied de page à chaque résultat de recherche : « BROUILLON — TOUTES LES CITATIONS REQUIÈRENT UNE VÉRIFICATION KEYCITE/SHEPARD'S AVANT UTILISATION »

---

## Conventions de facturation

- Incrément minimal de facturation : 0,1 heure (6 minutes)
- Utiliser les codes de tâches UTBMS : L100–L500 pour la procédure ; A100–A300 pour les dossiers d'entreprise/transactionnels
- Les libellés de saisie du temps doivent décrire le travail effectué, pas seulement la catégorie de tâche
- Les saisies de compte fiduciaire requièrent le numéro de dossier et la référence d'autorisation du client
- Revue de pré-facturation : faire passer le résultat de `/billing-entry` par invoice-review-checklist.md avant envoi

---

## Protocole de vérification des conflits

Avant d'ouvrir tout nouveau dossier, effectuer une vérification des conflits contre :
1. La base de données des contacts Clio (nom du client, partie adverse, entités liées)
2. La liste des divulgations d'embauches latérales (tenue par le directeur de bureau)
3. Le registre des prospects

Documenter le résultat de la vérification des conflits dans Clio avant l'envoi de la lettre de mission.
Voir checklists/conflicts-check.md pour la procédure complète.

---

## Conservation des dossiers et clôture

Les dossiers clôturés sont conservés selon le calendrier de conservation du cabinet (voir compliance/malpractice-checklist.md).
Les fichiers physiques et électroniques sont transférés vers le dossier d'archive du DMS à la clôture du dossier.
Ne pas stocker de documents de dossiers clôturés dans cet espace de travail.
```

## Serveurs MCP

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/mcp-server-filesystem", "/Users/shared/legal-firm-workspace"],
      "comment": "Limité à la racine de l'espace de travail uniquement — aucun accès aux points de montage DMS ou aux partages de fichiers client"
    },
    "microsoft-365": {
      "command": "npx",
      "args": ["-y", "@microsoft/mcp-server-msgraph"],
      "env": {
        "TENANT_ID": "${M365_TENANT_ID}",
        "CLIENT_ID": "${M365_CLIENT_ID}",
        "CLIENT_SECRET": "${M365_CLIENT_SECRET}"
      },
      "comment": "Accès aux canaux Teams, brouillons Outlook, bibliothèque de modèles SharePoint — limité au tenant du cabinet"
    },
    "clio": {
      "command": "npx",
      "args": ["-y", "@clio/mcp-server"],
      "env": {
        "CLIO_CLIENT_ID": "${CLIO_CLIENT_ID}",
        "CLIO_CLIENT_SECRET": "${CLIO_CLIENT_SECRET}",
        "CLIO_REGION": "us"
      },
      "comment": "Accès en lecture seule à la liste des dossiers, la base de données des contacts et les codes de saisie du temps — aucun accès en écriture aux comptes fiduciaires"
    },
    "docusign": {
      "command": "npx",
      "args": ["-y", "@docusign/mcp-server"],
      "env": {
        "DOCUSIGN_ACCOUNT_ID": "${DOCUSIGN_ACCOUNT_ID}",
        "DOCUSIGN_INTEGRATION_KEY": "${DOCUSIGN_INTEGRATION_KEY}",
        "DOCUSIGN_BASE_URL": "https://na3.docusign.net/restapi"
      },
      "comment": "Consultation du statut des enveloppes et récupération des modèles uniquement — aucune capacité d'envoi depuis Claude Code"
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
            "command": "grep -i 'privilege\\|confidential\\|attorney.client\\|work product' \"$CLAUDE_TOOL_OUTPUT_PATH\" && echo '[WARN] Possible privileged content detected in written file — review before saving' || true",
            "comment": "Analyser tout fichier écrit par Claude Code à la recherche de mots-clés liés au privilège et afficher un avertissement"
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
            "command": "echo '[CHECK] Writing to: '\"$CLAUDE_TOOL_INPUT_PATH\"' — confirm this is a template or SOP file, not a matter document'",
            "comment": "Journaliser chaque écriture de fichier avec un rappel de confirmer qu'il s'agit d'un contenu non privilégié"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "echo '[REMINDER] End of session — any drafted research memos require cite verification in Westlaw KeyCite or LexisNexis Shepards before use'",
            "comment": "Affiche le rappel de vérification des citations à la fin de chaque session Claude Code"
          }
        ]
      }
    ]
  }
}
```

## Compétences à installer

```bash
# Flux documentaires et de processus
npx uitkit add skill productivity/process-mapper
npx uitkit add skill productivity/doc-site-builder
npx uitkit add skill productivity/stakeholder-comms
npx uitkit add skill productivity/vendor-evaluator

# Recherche et analyse
npx uitkit add skill productivity/exec-briefing

# Développement client et commercial
npx uitkit add skill productivity/comp-benchmarker
npx uitkit add skill productivity/investor-update

# Facturation et gestion du temps
npx uitkit add skill productivity/engineering-strategy
```

## Connexes

- [Guide Espace de travail juridique et conformité](../structures/legal-compliance-workspace.md)
- [Espace de travail du directeur des opérations](../structures/operations-manager-workspace.md)
- [Espace de travail de l'analyste financier](../structures/finance-analyst-workspace.md)
