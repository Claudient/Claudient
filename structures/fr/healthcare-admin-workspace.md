# Espace de travail — Administrateur de santé : Structure du projet

> Pour un administrateur de santé gérant les opérations cliniques, la planification, les autorisations préalables, la vérification des assurances, la conformité et les communications avec les patients — sans aucune DPS stockée en dehors du DSE.

## Stack

- **Epic** ou **Athenahealth** — DSE/système de gestion des soins ; toutes les données spécifiques aux patients y résident exclusivement
- **Google Workspace** (Gmail, Docs, Drive, Calendar) — communications externes, stockage de documents, coordination des plannings
- **Microsoft Teams** ou **Slack** — communications internes du personnel, canaux départementaux, demandes de remplacement de garde
- **DocuSign** — routage des formulaires de consentement, signature des contrats fournisseurs, suivi des accusés de réception des politiques
- **Zoom** — coordination des téléconsultations, sessions de formation du personnel, réunions fournisseurs
- **QuickBooks** — rapprochement de facturation, enregistrement des paiements de créances, suivi des refus, gestion des factures fournisseurs
- **Claude Code** — rédaction d'autorisations préalables, listes de contrôle de conformité, génération de courriers patients, rédaction de procédures, documents d'intégration du personnel

## Arborescence

```
healthcare-admin-workspace/
├── .claude/
│   ├── CLAUDE.md                              # Instructions de l'espace de travail — règles DPS, commandes, conventions
│   ├── settings.json                          # Serveurs MCP, hooks, permissions
│   └── commands/
│       ├── patient-intake.md                  # /patient-intake — générer la liste de contrôle du dossier d'admission et le modèle de lettre d'accueil
│       ├── prior-auth.md                      # /prior-auth — rédiger une lettre de demande d'autorisation préalable à partir des critères cliniques
│       ├── insurance-verify.md                # /insurance-verify — liste de contrôle de vérification d'assurance et script de suivi
│       ├── compliance-check.md                # /compliance-check — exécuter la liste de contrôle de conformité HIPAA/CMS sur un processus
│       ├── staff-schedule.md                  # /staff-schedule — générer un plan de couverture des gardes ou un modèle de rotation d'astreinte
│       ├── patient-letter.md                  # /patient-letter — rédiger des rappels de rendez-vous, des instructions de sortie ou des lettres d'orientation
│       └── incident-report.md                 # /incident-report — modèle de rapport d'incident structuré avec champs d'analyse des causes profondes
├── patients/
│   ├── README.md                              # CRITIQUE : politique DPS — aucun nom, date de naissance, numéro de dossier ou diagnostic stocké ici
│   ├── templates/
│   │   ├── welcome-letter-template.md         # Lettre d'accueil pour les nouveaux patients — uniquement l'espace réservé [NOM], aucune donnée réelle
│   │   ├── appointment-reminder-template.md   # Rappel de rendez-vous — champs date/heure/lieu ; fusion depuis Epic
│   │   ├── discharge-instructions-template.md # Instructions de sortie post-consultation — génériques par catégorie de pathologie
│   │   ├── referral-letter-template.md        # Lettre d'orientation vers un spécialiste — structure de résumé clinique avec espaces réservés
│   │   ├── no-show-follow-up-template.md      # Lettre de suivi après rendez-vous manqué
│   │   ├── payment-plan-letter-template.md    # Lettre d'offre de plan de paiement en cas de difficultés financières
│   │   └── prior-auth-denial-appeal.md        # Modèle de lettre d'appel pour les refus d'autorisation préalable par l'assurance
│   ├── intake/
│   │   ├── new-patient-checklist.md           # Liste de contrôle administrative : carte d'assurance, pièce d'identité, formulaires de consentement, données démographiques
│   │   ├── insurance-verification-sop.md      # Processus de vérification d'éligibilité à l'assurance étape par étape
│   │   ├── intake-packet-contents.md          # Liste des formulaires du dossier nouveau patient — référence aux identifiants d'enveloppe DocuSign
│   │   └── intake-workflow-diagram.md         # Organigramme des étapes d'admission de l'accueil à la prise en charge
│   └── discharge/
│       ├── discharge-checklist.md             # Étapes administratives à la sortie : résumé post-consultation, prise en charge du suivi, orientations
│       ├── referral-tracking-log.md           # Journal des orientations en attente par date d'envoi — sans DPS ; suivi par numéro de dossier uniquement
│       └── telehealth-discharge-sop.md        # Liste de contrôle de fin de téléconsultation Zoom et script d'assistance technique
├── compliance/
│   ├── hipaa/
│   │   ├── hipaa-checklist-annual.md          # Liste de contrôle annuelle d'audit des règles de sécurité et de confidentialité HIPAA
│   │   ├── hipaa-checklist-new-hire.md        # Liste de contrôle de vérification de la formation HIPAA pour les nouvelles recrues
│   │   ├── phi-access-log-template.md         # Modèle d'enregistrement des demandes d'accès aux DPS et des divulgations (à renseigner dans le DSE)
│   │   ├── breach-notification-sop.md         # Procédure de notification de violation étape par étape — signalement HHS, notification aux patients
│   │   ├── minimum-necessary-policy.md        # Document de politique : norme du minimum nécessaire pour l'utilisation et la divulgation des DPS
│   │   └── business-associate-agreement-log.md # Suivi des BAA actifs — nom du fournisseur, date de signature, date de renouvellement
│   ├── cms/
│   │   ├── cms-conditions-of-participation.md # Liste de contrôle CMS CoP pour la conformité des soins ambulatoires
│   │   ├── meaningful-use-checklist.md        # Suivi des exigences de reporting MIPS/APM par trimestre
│   │   └── quality-measure-tracker.md         # Journal mensuel des performances des indicateurs de qualité (données agrégées anonymisées uniquement)
│   ├── audits/
│   │   ├── audit-log.md                       # Journal des audits internes et externes — date, périmètre, constats, statut
│   │   ├── corrective-action-plan-template.md # Modèle de plan d'action corrective — constat, responsable, échéance, preuve
│   │   └── mock-survey-checklist.md           # Préparation à l'audit blanc interne — questions, documentation requise, responsable
│   └── policies/
│       ├── policy-index.md                    # Index principal des politiques actives — nom, date d'entrée en vigueur, date de révision, responsable
│       ├── privacy-policy-summary.md          # Résumé en langage clair de l'Avis de pratiques de confidentialité
│       ├── security-incident-policy.md        # Politique de réponse aux incidents de sécurité et chemin d'escalade
│       └── telehealth-consent-policy.md       # Exigences de consentement éclairé pour la télémédecine par État
├── scheduling/
│   ├── shift-templates/
│   │   ├── weekday-shift-template.md          # Créneaux de garde standard du lundi au vendredi — MA, accueil, prestataire, facturation
│   │   ├── weekend-shift-template.md          # Modèle de rotation de couverture week-end/jours fériés
│   │   ├── on-call-rotation-template.md       # Modèle de planning d'astreinte — rôles, hiérarchie des contacts, escalade
│   │   └── coverage-request-template.md       # Formulaire de demande de remplacement — motif, dates, partenaire d'échange souhaité
│   ├── sops/
│   │   ├── scheduling-sop.md                  # SOP de planification des rendez-vous — règles de réservation, types de créneaux, politiques de réservation
│   │   ├── cancellation-sop.md                # Gestion des annulations et absences — liste d'attente, reprogrammation, marqueurs de facturation
│   │   ├── provider-template-sop.md           # Comment créer et modifier les modèles de planning des prestataires dans Epic/Athena
│   │   └── telehealth-scheduling-sop.md       # Planification des téléconsultations — génération du lien Zoom, étapes de préparation du patient
│   └── coverage-log.md                        # Journal des gardes ouvertes, couvertures confirmées et escalades
├── billing/
│   ├── claim-templates/
│   │   ├── clean-claim-checklist.md           # Liste de contrôle pré-soumission pour une facturation conforme — champs obligatoires par payeur
│   │   ├── secondary-claim-template.md        # Étapes de soumission de facturation secondaire en coordination des prestations
│   │   └── superbill-review-checklist.md      # Liste de contrôle d'audit du superbill — diagnostic, modificateur, lieu de service
│   ├── denials/
│   │   ├── denial-appeal-sop.md               # Procédure d'appel des refus étape par étape — délais, documents requis par code de refus
│   │   ├── denial-code-reference.md           # Codes de refus courants (CO-4, CO-97, PR-96, etc.) avec étapes de résolution
│   │   ├── appeal-letter-library/
│   │   │   ├── medical-necessity-appeal.md    # Modèle d'appel pour les refus de nécessité médicale
│   │   │   ├── timely-filing-appeal.md        # Modèle d'appel pour les refus de délai de dépôt avec preuve de soumission dans les délais
│   │   │   ├── authorization-retro-appeal.md  # Modèle d'appel pour autorisation rétroactive
│   │   │   └── duplicate-claim-appeal.md      # Appel pour facturation en doublon avec preuve de service distinct
│   │   └── denial-tracker.md                  # Journal de suivi des refus — payeur, code de refus, date, statut (sans DPS — numéro de dossier uniquement)
│   ├── reconciliation/
│   │   ├── daily-reconciliation-sop.md        # Rapprochement de fin de journée — espèces, chèques et cartes avec les étapes QuickBooks
│   │   ├── era-posting-sop.md                 # Flux de travail d'enregistrement des Avis de remise électronique — ERA vers QuickBooks
│   │   ├── monthly-close-checklist.md         # Liste de contrôle de clôture mensuelle de la facturation — créances en attente, annulations, rapports
│   │   └── payer-contract-rate-sheet.md       # Tarifs contractuels par payeur et plage de codes CPT (document de référence non-DPS)
│   └── payers/
│       ├── payer-contact-directory.md         # Contacts des payeurs — relations prestataires, statut des créances, lignes d'autorisation
│       └── payer-portal-login-sop.md          # Étapes d'accès aux portails payeurs — ne pas stocker d'identifiants ici ; utiliser un gestionnaire de mots de passe
├── staff/
│   ├── onboarding/
│   │   ├── new-hire-checklist.md              # Liste de contrôle d'intégration J1 à J90 — accès informatique, badge, formation, signature HIPAA
│   │   ├── hipaa-training-checklist.md        # Suivi de la complétion de la formation HIPAA — rôle, date de complétion, attestation
│   │   ├── epic-access-request-sop.md         # Demande d'accès par rôle à Epic et étapes de provisionnement
│   │   ├── athenahealth-access-request-sop.md # Étapes de configuration des utilisateurs et d'attribution des rôles dans Athenahealth
│   │   └── welcome-email-template.md          # Modèle d'e-mail de bienvenue pour les nouvelles recrues — logistique du premier jour
│   ├── training/
│   │   ├── training-calendar.md               # Calendrier des sessions de formation du personnel — sujet, date, obligatoire ou facultatif
│   │   ├── competency-checklist-ma.md         # Liste de contrôle de vérification des compétences pour les assistants médicaux
│   │   ├── competency-checklist-front-desk.md # Liste de contrôle des compétences du personnel d'accueil — planification, enregistrement, participation
│   │   └── in-service-log.md                  # Journal des sessions de formation en service complétées et des participants
│   └── performance/
│       ├── performance-review-template.md     # Modèle d'évaluation semestrielle des performances du personnel
│       └── corrective-action-template.md      # Modèle de documentation des mesures correctives
├── vendors/
│   ├── vendor-contract-log.md                 # Contrats fournisseurs actifs — fournisseur, service, durée, date de renouvellement, BAA requis ?
│   ├── vendor-contact-directory.md            # Contacts clés des fournisseurs — support Epic/Athena, DocuSign, Zoom, QuickBooks
│   ├── docusign-sop.md                        # Configuration des enveloppes DocuSign, routage des formulaires de consentement, récupération de la piste d'audit
│   └── zoom-telehealth-setup-sop.md           # Configuration de Zoom for Healthcare — BAA HIPAA, salle d'attente, politique d'enregistrement
└── templates/
    ├── letters/
    │   ├── prior-auth-request-letter.md       # Lettre de demande d'autorisation préalable — structure de justification clinique avec espaces réservés
    │   ├── prior-auth-appeal-letter.md        # Appel d'autorisation préalable — versions demande de révision entre pairs et appel écrit
    │   ├── insurance-verification-script.md   # Script téléphonique pour les appels de vérification d'éligibilité à l'assurance
    │   ├── collections-letter-template.md     # Lettre de recouvrement du solde patient — premier et deuxième avis
    │   └── provider-credentialing-letter.md   # Modèle de lettre d'accompagnement pour les soumissions de crédentialisation auprès des payeurs
    ├── forms/
    │   ├── consent-form-checklist.md          # Formulaires de consentement requis par type de consultation — liens vers les modèles DocuSign
    │   └── release-of-information-log.md      # Journal des demandes de communication — date, type de demandeur, statut (sans DPS — numéro de dossier uniquement)
    └── sops/
        ├── sop-template.md                    # Modèle principal de SOP — objectif, périmètre, étapes, responsable, date de révision
        └── sop-index.md                       # Index de toutes les SOP actives — nom, responsable, dernière révision, emplacement
```

## Fichiers clés expliqués

| Chemin | Objectif |
|---|---|
| `.claude/commands/prior-auth.md` | Commande slash qui rédige une lettre de demande d'autorisation préalable à partir de critères cliniques — prend en entrée le nom du payeur, la procédure et la justification clinique ; n'inclut jamais d'identifiants patients réels |
| `.claude/commands/compliance-check.md` | Commande slash qui exécute une liste de contrôle de conformité HIPAA ou CMS sur un processus décrit — retourne le résultat par item (conforme/non conforme) et les mesures correctives recommandées |
| `.claude/commands/incident-report.md` | Commande slash qui génère un modèle de rapport d'incident structuré avec des champs d'analyse des causes profondes, une section chronologie et un plan d'action corrective |
| `compliance/hipaa/breach-notification-sop.md` | Procédure de réponse aux violations étape par étape couvrant le délai de signalement au Bureau des droits civils du HHS (règle des 60 jours), les exigences de notification aux patients et la documentation à conserver |
| `billing/denials/denial-appeal-sop.md` | Processus d'appel des refus faisant autorité avec les délais spécifiques par payeur, la documentation requise par catégorie de code de refus et le chemin d'escalade vers la révision entre pairs |
| `billing/denials/appeal-letter-library/` | Modèles de lettres d'appel prêts à l'emploi pour les quatre catégories de refus les plus courantes — réduit le temps de rédaction de 30 minutes à moins de 5 minutes par appel |
| `patients/README.md` | Avis d'application de la politique DPS — le fichier le plus important ; établit la règle selon laquelle aucune donnée spécifique aux patients (nom, date de naissance, numéro de dossier, diagnostic) n'est jamais stockée dans cet espace de travail |
| `compliance/policies/policy-index.md` | Index principal de toutes les politiques actives avec dates d'entrée en vigueur et de révision — utilisé lors des audits et des audits blancs pour confirmer la validité des politiques |
| `scheduling/sops/scheduling-sop.md` | SOP de planification canonique couvrant les règles de réservation, les types de créneaux dans les modèles, les politiques de mise en attente et d'annulation, et l'escalade pour les ajouts urgents en cours de journée |
| `staff/onboarding/new-hire-checklist.md` | Liste de contrôle d'intégration J1 à J90 couvrant le provisionnement des accès informatiques, la signature de la formation HIPAA, les accès Epic/Athena, le badge et les bilans à 30/60/90 jours |

## Mise en place rapide

```bash
# Créer la racine de l'espace de travail
mkdir -p healthcare-admin-workspace

# Créer la structure .claude
mkdir -p healthcare-admin-workspace/.claude/commands

# Créer les répertoires de modèles patients (SANS DPS — modèles uniquement)
mkdir -p healthcare-admin-workspace/patients/templates
mkdir -p healthcare-admin-workspace/patients/intake
mkdir -p healthcare-admin-workspace/patients/discharge

# Créer les répertoires de conformité
mkdir -p healthcare-admin-workspace/compliance/hipaa
mkdir -p healthcare-admin-workspace/compliance/cms
mkdir -p healthcare-admin-workspace/compliance/audits
mkdir -p healthcare-admin-workspace/compliance/policies

# Créer les répertoires de planification
mkdir -p healthcare-admin-workspace/scheduling/shift-templates
mkdir -p healthcare-admin-workspace/scheduling/sops

# Créer les répertoires de facturation
mkdir -p healthcare-admin-workspace/billing/claim-templates
mkdir -p healthcare-admin-workspace/billing/denials/appeal-letter-library
mkdir -p healthcare-admin-workspace/billing/reconciliation
mkdir -p healthcare-admin-workspace/billing/payers

# Créer les répertoires du personnel
mkdir -p healthcare-admin-workspace/staff/onboarding
mkdir -p healthcare-admin-workspace/staff/training
mkdir -p healthcare-admin-workspace/staff/performance

# Créer les répertoires fournisseurs et modèles
mkdir -p healthcare-admin-workspace/vendors
mkdir -p healthcare-admin-workspace/templates/letters
mkdir -p healthcare-admin-workspace/templates/forms
mkdir -p healthcare-admin-workspace/templates/sops

# Initialiser le README de politique DPS
cat > healthcare-admin-workspace/patients/README.md << 'EOF'
# CRITIQUE : POLITIQUE DPS

Ce répertoire contient UNIQUEMENT DES FICHIERS MODÈLES.

NE PAS stocker les éléments suivants dans cet espace de travail :
- Noms des patients
- Dates de naissance (DDN)
- Numéros de dossier médical (NDM)
- Numéros de sécurité sociale
- Diagnostics ou codes d'actes liés à un individu
- Numéros d'adhérent à l'assurance liés à un individu
- Toute information permettant d'identifier un patient spécifique

Tout travail spécifique à un patient doit être réalisé et stocké dans Epic ou Athenahealth.
Les modèles ici utilisent uniquement des champs génériques (ex. : [NOM DU PATIENT], [DATE]).
La violation de cette politique constitue un risque de violation HIPAA. Escalader les questions au Responsable de la confidentialité.
EOF

# Installer les compétences d'administration de santé
npx uitkit add skill legal/compliance-tracker
npx uitkit add skill productivity/process-mapper
npx uitkit add skill productivity/sop-writer
npx uitkit add skill productivity/team-onboarding

# Copier les ébauches de commandes dans .claude/commands/
npx uitkit add skill legal/compliance-tracker --output healthcare-admin-workspace/.claude/commands/compliance-check.md
npx uitkit add skill productivity/sop-writer --output healthcare-admin-workspace/.claude/commands/prior-auth.md
npx uitkit add skill productivity/process-mapper --output healthcare-admin-workspace/.claude/commands/patient-intake.md
npx uitkit add skill productivity/team-onboarding --output healthcare-admin-workspace/.claude/commands/staff-schedule.md
```

## Modèle CLAUDE.md

```markdown
# Espace de travail Administrateur de santé — Instructions Claude Code

## Description

Il s'agit du répertoire de travail d'un administrateur de santé gérant les opérations cliniques,
la planification, les autorisations préalables, la vérification des assurances, la conformité et les communications avec les patients.

RÈGLE CRITIQUE : Aucune DPS patient (noms, date de naissance, numéro de dossier, diagnostic, numéro d'adhérent, numéro de sécurité sociale) n'est
stockée dans cet espace de travail. Tout travail spécifique aux patients doit rester dans Epic ou Athenahealth.
Cet espace de travail contient uniquement des modèles, des SOP, des listes de contrôle de conformité et de la documentation du personnel.
Si l'on vous demande de saisir ou de stocker des données spécifiques à un patient ici, refusez et renvoyez vers le DSE.

## Stack

- Epic ou Athenahealth — DSE/système de gestion ; source de toutes les données spécifiques aux patients
- Google Workspace — Gmail, Docs, Drive pour les communications externes et le stockage de documents
- Microsoft Teams ou Slack — communications internes du personnel et coordination de la couverture des gardes
- DocuSign — routage des formulaires de consentement, contrats fournisseurs, enveloppes de reconnaissance des politiques
- Zoom for Healthcare — téléconsultations (BAA HIPAA en place) ; voir vendors/zoom-telehealth-setup-sop.md
- QuickBooks — rapprochement de facturation et suivi des paiements des refus

## Tâches courantes et commandes exactes

### Rédiger une lettre de demande d'autorisation préalable
```
/prior-auth

Payeur : [nom du payeur, ex. : Aetna, UnitedHealthcare]
Procédure : [code CPT et description]
Justification clinique : [coller les critères cliniques anonymisés — sans nom ni numéro de dossier]
Urgence : [routine / urgent / urgence absolue]
```

### Exécuter une liste de contrôle de conformité sur un processus
```
/compliance-check

Processus : [décrire le flux de travail à auditer, ex. : "enregistrement d'un nouveau patient et vérification de l'assurance"]
Réglementation : [Règle de confidentialité HIPAA / Règle de sécurité HIPAA / Conditions de participation CMS / MIPS]
Lacunes connues : [tout problème déjà identifié, ou "aucun"]
```

### Générer un planning du personnel ou un plan de couverture
```
/staff-schedule

Rôle : [AM / accueil / facturation / prestataire]
Dates : [plage de dates ou semaine du]
Contraintes : [absences du personnel, exigences de certification, chevauchements nécessaires]
Modèle : [semaine / week-end / astreinte]
```

### Rédiger une lettre de correspondance patient (modèle uniquement — sans DPS)
```
/patient-letter

Type de lettre : [rappel de rendez-vous / instructions de sortie / orientation / suivi d'absence / plan de paiement]
Catégorie de pathologie : [ex. : post-opératoire, prise en charge de maladie chronique, soins préventifs — générique uniquement]
Instructions particulières : [tout contexte non-DPS sur le ton, les mentions obligatoires ou le niveau de lecture]
```

### Rédiger une lettre d'appel de refus d'autorisation préalable
```
/prior-auth

Mode : appel
Payeur : [nom du payeur]
Code de refus : [code et description, ex. : "CO-197 : précertification absente"]
Procédure : [code CPT et description]
Type d'appel : [appel écrit / demande de révision entre pairs]
Fondement clinique : [justification clinique anonymisée — sans identifiants patients]
```

### Générer un script de vérification d'assurance
```
/insurance-verify

Payeur : [nom du payeur]
Type de consultation : [nouveau patient / patient connu / spécialiste / téléconsultation]
Champs clés à vérifier : [éligibilité, franchise, participation, coassurance, autorisation requise O/N, orientation requise O/N]
```

### Générer un rapport d'incident
```
/incident-report

Type d'incident : [incident de confidentialité / événement de sécurité / erreur de facturation / défaillance d'équipement / plainte du personnel]
Date de l'incident : [date]
Lieu : [département ou zone — sans noms de patients]
Description : [ce qui s'est passé — anonymisé]
Mesures immédiates prises : [liste]
```

### Générer une liste de contrôle d'admission des patients
```
/patient-intake

Type de consultation : [nouveau patient / bilan annuel / consultation spécialisée / téléconsultation]
Type de couverture : [commercial / Medicare / Medicaid / sans assurance]
Exigences particulières : [ex. : patient mineur, interprète nécessaire, aménagement pour handicap]
```

## Conventions à respecter

- RÈGLE DPS : Ne jamais inscrire de noms, dates de naissance, numéros de dossier, diagnostics ou identifiants d'assurance dans aucun fichier de cet espace de travail
- Toutes les lettres et formulaires utilisent des espaces réservés entre crochets ([NOM DU PATIENT], [DATE], [NOM DU PRESTATAIRE]) — les données réelles sont fusionnées depuis Epic/Athena
- Les fichiers SOP suivent le modèle de templates/sops/sop-template.md — chaque SOP comporte un objectif, un périmètre, des étapes, un responsable et une date de révision
- Les lettres d'appel des refus se trouvent dans billing/denials/appeal-letter-library/ — ajouter de nouveaux modèles au fur et à mesure que de nouveaux types de refus apparaissent
- Les listes de contrôle de conformité dans compliance/ sont révisées selon un calendrier glissant documenté dans compliance/policies/policy-index.md
- Les nouveaux contrats fournisseurs sont enregistrés dans vendors/vendor-contract-log.md dans les 48 heures suivant la signature, avec le statut du BAA
- Les tâches d'intégration du personnel sont suivies dans staff/onboarding/new-hire-checklist.md — ne pas marquer comme terminé avant la signature de l'attestation
- Les confirmations de couverture de garde sont enregistrées dans scheduling/coverage-log.md avec la date et le membre du personnel confirmant
- Toutes les lettres d'appel incluent le numéro de créance ou de dossier — jamais les informations d'identification du patient — afin que le payeur puisse localiser la créance
```

## Serveurs MCP

```json
{
  "mcpServers": {
    "google-drive": {
      "command": "npx",
      "args": ["-y", "@google/mcp-server-google-drive"],
      "env": {
        "GOOGLE_CLIENT_ID": "your-google-oauth-client-id",
        "GOOGLE_CLIENT_SECRET": "your-google-oauth-client-secret",
        "GOOGLE_REFRESH_TOKEN": "your-google-refresh-token"
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
        "/Users/your-username/healthcare-admin-workspace"
      ]
    }
  }
}
```

## Hooks recommandés

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if echo \"$FILE\" | grep -qE \"patients/\"; then python3 -c \"import sys,re; content=open(sys.argv[1]).read() if __import__(\\\"os\\\").path.exists(sys.argv[1]) else \\\"\\\"; phi_patterns=[r\\\"\\\\b\\\\d{4}-\\\\d{2}-\\\\d{2}\\\\b\\\",r\\\"\\\\bMRN[:\\\\s]\\\\s*\\\\d+\\\",r\\\"\\\\bDOB[:\\\\s]\\\",r\\\"\\\\bSSN[:\\\\s]\\\\s*\\\\d\\\"]; found=[p for p in phi_patterns if re.search(p,content)]; sys.exit(1) if found else sys.exit(0)\" \"$CLAUDE_TOOL_INPUT_FILE_PATH\" 2>/dev/null || echo \"[PHI GUARD] Potential PHI pattern detected in patients/ file — review before saving. All patient data must stay in the EHR.\"; fi'"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if echo \"$FILE\" | grep -q \"compliance/\"; then echo \"[compliance] File updated: $FILE — check compliance/policies/policy-index.md if this is a new or revised policy\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'DOW=$(date +%u); if [ \"$DOW\" = \"5\" ]; then echo \"[reminder] Friday checklist: confirm this week denial appeals logged in billing/denials/denial-tracker.md, open shift coverage confirmed in scheduling/coverage-log.md, and any new vendor contracts entered in vendors/vendor-contract-log.md\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Compétences à installer

```bash
# Compétences essentielles pour l'administration de santé
npx uitkit add skill legal/compliance-tracker
npx uitkit add skill productivity/process-mapper
npx uitkit add skill productivity/sop-writer
npx uitkit add skill productivity/team-onboarding

# Compétences de productivité complémentaires
npx uitkit add skill productivity/stakeholder-comms
npx uitkit add skill productivity/vendor-evaluator
npx uitkit add skill productivity/exec-briefing
```

## Ressources associées

- [Guide de l'administrateur de santé](../guides/for-healthcare-admin.md)
- [Flux de travail d'autorisation préalable](../workflows/prior-auth-workflow.md)
- [Flux de travail d'audit de conformité HIPAA](../workflows/hipaa-compliance-audit.md)
