# Studio de Podcast — Structure de projet

> Pour les créateurs de podcasts et les réseaux multi-émissions qui gèrent l'intégralité du cycle de production — de la réservation des invités et l'enregistrement jusqu'au montage, la distribution, la monétisation et la croissance de la communauté — au sein d'un seul espace de travail Claude Code.

## Stack

- **Enregistrement à distance :** Riverside.fm (pistes audio/vidéo séparées, enregistrement local) ou SquadCast (similaire ; privilégié pour les émissions audio uniquement)
- **Montage + transcription :** Descript (édition basée sur le texte, Studio Sound, overdub, export de transcription)
- **Hébergement + RSS :** Buzzsprout (émission unique, analytique, soumission automatique Spotify/Apple) ou RSS.com (multi-émissions ; statistiques de téléchargement certifiées IAB)
- **Gestion multi-émissions :** Transistor (plusieurs émissions sous un seul compte, accès équipe, podcasts privés)
- **Site web :** Podpage (généré automatiquement depuis le flux RSS ; pages d'épisodes, biographies des invités, avis des auditeurs)
- **Distribution :** Spotify for Podcasters, Apple Podcasts Connect, YouTube (podcast vidéo + extraits)
- **Liste email :** ConvertKit (séquences d'automatisation, diffusions d'épisodes, segments abonnés premium)
- **Contenu premium + paiements :** Stripe (facturation par abonnement pour les épisodes bonus, flux sans publicité)
- **Audiogrammes / extraits sociaux :** Descript (export de clips), Headliner (audiogrammes avec forme d'onde), CapCut (reels format court)
- **Planification :** Calendly (réservation d'invités, rappels automatisés) lié à l'invitation de session Riverside.fm
- **Analytique :** Statistiques intégrées Buzzsprout/Transistor, Chartable (attribution multiplateforme), tableau de bord Spotify for Podcasters

## Arborescence du projet

```
podcast-studio/
├── .claude/
│   ├── CLAUDE.md                              # Instructions de l'espace de travail pour Claude Code
│   ├── settings.json                          # Serveurs MCP, hooks, permissions
│   └── commands/
│       ├── new-episode.md                     # /new-episode — créer le dossier épisode + brief
│       ├── show-notes.md                      # /show-notes — générer les notes d'émission depuis la transcription
│       ├── social-promo.md                    # /social-promo — créer des publications adaptées à chaque plateforme
│       ├── guest-outreach.md                  # /guest-outreach — rédiger un email de démarchage personnalisé
│       ├── sponsor-pitch.md                   # /sponsor-pitch — rédiger une proposition de parrainage depuis le kit
│       ├── newsletter-episode.md              # /newsletter-episode — convertir les notes en email ConvertKit
│       └── performance-review.md              # /performance-review — résumer les analytiques de l'épisode
├── episodes/
│   ├── _template/                             # Copier ce dossier lors du démarrage d'un nouvel épisode
│   │   ├── brief.md                           # Contexte invité + sujet, angle, questions clés
│   │   ├── outline.md                         # Conducteur segment par segment (intro, questions, conclusion)
│   │   ├── shownotes.md                       # Notes d'émission publiées : résumé, liens, chapitres
│   │   ├── transcript.md                      # Transcription nettoyée exportée depuis Descript
│   │   ├── social-promo.md                    # LinkedIn, Twitter/X, Instagram, description YouTube
│   │   └── performance.md                     # Compteurs de téléchargements, rétention auditeurs, évolution des notes
│   ├── ep001-[guest-slug]/
│   │   ├── brief.md                           # Recherche pré-appel + liste de questions
│   │   ├── outline.md                         # Timing des segments, marqueurs de placement publicitaire
│   │   ├── recorded-2026-05-14.md             # Notes de session d'enregistrement (problèmes techniques, horodatages clés)
│   │   ├── shownotes.md                       # Notes d'émission finales publiées avec horodatages de chapitres
│   │   ├── transcript.md                      # Transcription Descript complète, avec identification des intervenants
│   │   ├── social-promo.md                    # Toutes les variantes de texte social pour la semaine de lancement
│   │   └── performance.md                     # Statistiques de téléchargement à 7/30/90 jours + retours auditeurs
│   ├── ep002-[guest-slug]/
│   │   ├── brief.md
│   │   ├── outline.md
│   │   ├── recorded-2026-05-28.md
│   │   ├── shownotes.md
│   │   ├── transcript.md
│   │   ├── social-promo.md
│   │   └── performance.md
│   └── ep003-[topic-slug]/                    # Épisode solo — sans invité ; le brief couvre uniquement la recherche
│       ├── brief.md
│       ├── outline.md
│       ├── recorded-2026-06-04.md
│       ├── shownotes.md
│       ├── transcript.md
│       ├── social-promo.md
│       └── performance.md
├── production/
│   ├── recording-sop.md                       # Liste de contrôle session Riverside.fm (test micro, enregistrement de secours)
│   ├── editing-checklist.md                   # Étapes de montage Descript : nettoyage, Studio Sound, chapitres, export
│   ├── distribution-checklist.md              # Upload Buzzsprout, soumission Spotify/Apple, actualisation Podpage
│   ├── thumbnail-specs.md                     # Dimensions de la pochette : 3000x3000px (podcast), 1280x720px (YT)
│   ├── audio-settings.md                      # Paramètres d'export : MP3 128kbps, 44,1kHz, stéréo, -16 LUFS
│   └── release-schedule.md                   # Calendrier hebdomadaire/bihebdomadaire, file d'épisodes, horaires de publication
├── guests/
│   ├── prospect-list.md                       # Liste classée des invités cibles avec coordonnées + notes
│   ├── outreach-templates.md                  # Modèles d'email : démarchage à froid, introduction chaleureuse, relance
│   ├── prep-guide.md                          # Document de préparation invité : format, configuration technique, lien Riverside.fm
│   ├── post-interview-followup.md             # Modèle d'email de remerciement + demande de partage sur les réseaux
│   ├── booking-tracker.md                     # Pipeline : prospection / contacté / réservé / enregistré / diffusé
│   └── past-guests/
│       ├── [guest-slug].md                    # Par invité : bio, lien épisode, comptes sociaux, retours
│       └── vip-guests.md                      # Invités à forte valeur ajoutée à re-inviter ou promouvoir mutuellement
├── marketing/
│   ├── social-templates/
│   │   ├── linkedin-episode-launch.md         # Modèle de publication LinkedIn pour les sorties d'épisodes
│   │   ├── twitter-thread-template.md         # Structure de fil Twitter/X pour les points clés de l'épisode
│   │   ├── instagram-caption-template.md      # Légende IG avec contexte audiogramme + CTA
│   │   ├── youtube-description-template.md    # Description vidéo YT avec chapitres + liens
│   │   └── tiktok-hook-template.md            # Scripts d'accroche 3 secondes pour clips TikTok/Reels
│   ├── clip-strategy.md                       # Quels moments clipper, durée par plateforme, outils
│   ├── newsletter-promo.md                    # Modèle de diffusion d'épisode ConvertKit + objets d'email
│   ├── cross-promo-tracker.md                 # Échanges d'invités, lectures publicitaires et partenariats de co-marketing
│   └── launch-playbook.md                     # Campagne complète de la semaine de sortie : calendrier de publications jour par jour
├── monetization/
│   ├── sponsor-kit.md                         # Document de présentation : statistiques émission, démographie auditeurs, formats publicitaires
│   ├── ad-rates.md                            # Tarifs CPM pre-roll / mid-roll / post-roll par niveau
│   ├── sponsor-tracker.md                     # Sponsors actifs : dates de contrat, livrables, statut de paiement
│   ├── premium-content.md                     # Niveaux d'abonnement Stripe, cadence d'épisodes bonus, avantages
│   └── affiliate-tracker.md                   # Partenaires affiliés, liens uniques, taux de commission, paiements
└── analytics/
    ├── episode-performance.md                 # Tableau par épisode : téléchargements, taux de complétion, notes
    ├── growth-dashboard.md                    # Croissance mensuelle des abonnés, répartition par plateforme, meilleurs épisodes
    ├── audience-survey-2026-q1.md             # Résultats du sondage auditeurs + insights clés
    └── benchmarks.md                          # Benchmarks CPD du secteur, objectifs de téléchargement par niveau d'émission
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `episodes/_template/brief.md` | Document de recherche pré-enregistrement : biographie de l'invité, contenus passés, points de discussion, 10 à 12 questions organisées par segment ; à copier dans le nouveau dossier épisode avant chaque enregistrement |
| `episodes/_template/shownotes.md` | Modèle de notes d'émission publiées avec paragraphe de résumé, points clés à retenir, bloc biographie invité, liens vers les ressources, horodatages des chapitres et lien vers la transcription ; alimente la description de l'épisode dans Buzzsprout |
| `production/recording-sop.md` | Liste de contrôle étape par étape pour les sessions Riverside.fm : niveaux micro, enregistrement local de secours, test réseau, permissions, et procédure de contingence si la connexion d'un invité est coupée |
| `production/editing-checklist.md` | Workflow de montage Descript : suppression des mots de remplissage, application de Studio Sound, définition des marqueurs de chapitres, ajout de la musique d'intro/outro, export au bon niveau LUFS, et upload sur Buzzsprout |
| `production/distribution-checklist.md` | Liste de contrôle de publication post-montage : paramètres d'upload Buzzsprout, confirmation de soumission Spotify/Apple, actualisation du cache Podpage, upload YouTube, et déclenchement de la newsletter dans ConvertKit |
| `guests/prospect-list.md` | Liste notée des invités cibles avec colonnes pour la pertinence, la taille d'audience, la chaleur de la relation et le statut de démarchage — source unique de vérité pour le pipeline d'invités |
| `monetization/sponsor-kit.md` | Présentation en Markdown : description de l'émission, démographie des auditeurs (âge, poste, revenus), statistiques de téléchargement, options de format publicitaire, exemples de scripts publicitaires et témoignages d'anciens sponsors |
| `analytics/growth-dashboard.md` | Instantané mensuel du total d'abonnés, répartition des téléchargements par plateforme, top 5 des épisodes, moyenne de téléchargements par épisode dans les 7 premiers jours, et pourcentage de croissance MoM |

## Initialisation rapide

```bash
# Créer la racine de l'espace de travail
mkdir -p podcast-studio && cd podcast-studio

# Répertoires Claude Code
mkdir -p .claude/commands

# Modèle d'épisode
mkdir -p episodes/_template
touch episodes/_template/brief.md
touch episodes/_template/outline.md
touch episodes/_template/shownotes.md
touch episodes/_template/transcript.md
touch episodes/_template/social-promo.md
touch episodes/_template/performance.md

# Trois premiers épisodes vides
for ep in ep001-guest-placeholder ep002-guest-placeholder ep003-solo-placeholder; do
  mkdir -p "episodes/$ep"
  for f in brief.md outline.md shownotes.md transcript.md social-promo.md performance.md; do
    touch "episodes/$ep/$f"
  done
done

# SOPs de production
mkdir -p production
touch production/recording-sop.md
touch production/editing-checklist.md
touch production/distribution-checklist.md
touch production/thumbnail-specs.md
touch production/audio-settings.md
touch production/release-schedule.md

# Pipeline invités
mkdir -p guests/past-guests
touch guests/prospect-list.md
touch guests/outreach-templates.md
touch guests/prep-guide.md
touch guests/post-interview-followup.md
touch guests/booking-tracker.md
touch guests/past-guests/vip-guests.md

# Ressources marketing
mkdir -p marketing/social-templates
touch marketing/social-templates/linkedin-episode-launch.md
touch marketing/social-templates/twitter-thread-template.md
touch marketing/social-templates/instagram-caption-template.md
touch marketing/social-templates/youtube-description-template.md
touch marketing/social-templates/tiktok-hook-template.md
touch marketing/clip-strategy.md
touch marketing/newsletter-promo.md
touch marketing/cross-promo-tracker.md
touch marketing/launch-playbook.md

# Monétisation
mkdir -p monetization
touch monetization/sponsor-kit.md
touch monetization/ad-rates.md
touch monetization/sponsor-tracker.md
touch monetization/premium-content.md
touch monetization/affiliate-tracker.md

# Analytique
mkdir -p analytics
touch analytics/episode-performance.md
touch analytics/growth-dashboard.md
touch analytics/benchmarks.md

# Initialiser les fichiers de configuration
touch .claude/CLAUDE.md
touch .claude/settings.json

# Installer les compétences de production podcast
npx uitkit add skill productivity/stakeholder-comms
npx uitkit add skill productivity/doc-site-builder
npx uitkit add skill data-ml/stakeholder-report
npx uitkit add skill marketing/social-media-manager
npx uitkit add skill small-business/content-repurposer

# Ajouter les commandes slash personnalisées
npx uitkit add command new-episode
npx uitkit add command show-notes
npx uitkit add command social-promo
npx uitkit add command guest-outreach
npx uitkit add command sponsor-pitch
npx uitkit add command newsletter-episode
npx uitkit add command performance-review

echo "Podcast studio workspace ready."
```

## Modèle CLAUDE.md

```markdown
# Studio de Podcast — Instructions Claude

## Description

Cet espace de travail gère l'intégralité des opérations du podcast : prospection d'invités, recherche
pré-interview, préparation des sessions d'enregistrement, workflow de montage, production des notes
d'émission, distribution multiplateforme, stratégie de clips sociaux, email marketing, vente de
parrainages et analytique.

L'émission publie chaque semaine. Tout le travail sur les épisodes se trouve dans episodes/<ep-slug>/.
Ne pas rédiger quoi que ce soit en dehors de cette structure.

## Stack

- Enregistrement à distance : Riverside.fm — pistes audio/vidéo séparées, sauvegarde locale activée
- Montage + transcription : Descript — édition basée sur le texte, suppression du bruit Studio Sound
- Hébergement : Buzzsprout — flux RSS, distribution automatique Spotify/Apple, analytique de téléchargement
- Site web : Podpage — généré automatiquement depuis le RSS Buzzsprout ; actualiser après chaque publication
- Email : ConvertKit — séquence de diffusion d'épisodes, segment abonnés premium (tag : premium)
- Paiements : Stripe — niveau premium à 9 $/mois (épisodes bonus, flux sans publicité)
- Distribution : Spotify for Podcasters, Apple Podcasts Connect, YouTube (podcast vidéo)
- Clips : Descript (export de clips), Headliner (audiogrammes), CapCut (Reels/TikTok)
- Analytique : Statistiques Buzzsprout + Chartable (attribution multiplateforme)

## Conventions de répertoire

- episodes/<ep-slug>/ — un dossier par épisode ; copier depuis episodes/_template/
- episodes/_template/ — modèle principal ; ne jamais publier directement depuis ce dossier
- production/ — SOPs et listes de contrôle ; mettre à jour lors des changements de workflow, pas par épisode
- guests/ — pipeline de prospects et modèles ; past-guests/ pour les fiches archivées par invité
- marketing/social-templates/ — cadres réutilisables ; à remplir par épisode dans le dossier de l'épisode
- monetization/ — contrats sponsors actifs dans sponsor-tracker.md ; tarifs dans ad-rates.md
- analytics/ — mettre à jour episode-performance.md à J+7 et J+30 après publication

## Nommage des dossiers d'épisode

Format : ep<NNN>-<slug-invité-ou-sujet>
Exemples : ep042-sarah-jones, ep043-ai-in-healthcare, ep044-solo-q-and-a

## Tâches courantes — commandes exactes

**Créer un nouveau dossier épisode :**
/new-episode number=043 guest="Prénom Nom" topic="[sujet]" record-date="YYYY-MM-DD"

**Générer les notes d'émission depuis la transcription :**
/show-notes transcript=episodes/ep043-[slug]/transcript.md guest="Prénom Nom" links="[URLs séparées par des virgules]"

**Créer le texte social pour la semaine de lancement :**
/social-promo episode=episodes/ep043-[slug]/shownotes.md platforms="linkedin,twitter,instagram,youtube"

**Rédiger un email de démarchage d'invité :**
/guest-outreach guest="Prénom Nom" company="[Entreprise]" topic="[angle de pitch]" warm="[contact commun ou non]"

**Rédiger une proposition de parrainage :**
/sponsor-pitch sponsor="[Marque]" format="mid-roll" episodes=4 rate=episodes

**Générer l'email d'épisode ConvertKit :**
/newsletter-episode shownotes=episodes/ep043-[slug]/shownotes.md subject-variants=3

**Obtenir un résumé des performances de l'épisode :**
/performance-review episode=episodes/ep043-[slug]/performance.md period=30d

## Conventions d'enregistrement

- Riverside.fm : toujours activer la sauvegarde locale avant de commencer ; vérifier le micro de l'invité dans
  les 30 premières secondes ; arrêter et ré-enregistrer si l'audio est en dessous de -24 LUFS en crête
- Export audio depuis Descript : MP3 128kbps, 44,1kHz, stéréo, -16 LUFS intégré
- Nommage du fichier épisode pour l'upload Buzzsprout : nom-emission-ep043-slug-invité.mp3
- Les horodatages dans transcript.md utilisent le format HH:MM:SS ; les marqueurs de chapitres correspondent à shownotes.md

## Conventions des notes d'émission

- Résumé : 3-4 phrases, sans fioritures, mettre en avant l'insight principal de l'invité
- Points clés : 3-5 bullets, chacun actionnable ou citables
- Biographie invité : 2 phrases maximum, lien vers son site et LinkedIn
- Ressources : chaque lien mentionné dans l'épisode, clairement intitulé
- Horodatages des chapitres : chaque limite de segment, minimum 5 chapitres par épisode
- CTA : un seul CTA principal (s'abonner, laisser un avis ou premium) — ne jamais en empiler trois

## Liste de contrôle de distribution (à effectuer après l'upload Buzzsprout)

1. Confirmer que la soumission automatique Spotify a été livrée dans les 4 heures suivant la publication
2. Soumettre à Apple Podcasts Connect si une approbation manuelle est requise
3. Actualiser Podpage (Paramètres > Actualiser le flux)
4. Uploader la version vidéo sur YouTube avec la description issue de social-promo.md
5. Planifier la diffusion ConvertKit à 8h du matin (fuseau horaire de l'auditeur, mardi de préférence)
6. Publier les clips sociaux : LinkedIn le jour même, fil Twitter/X le jour 2, Instagram le jour 3
7. Enregistrer l'épisode dans analytics/episode-performance.md

## Conventions de monétisation

- Emplacements publicitaires : pre-roll 60s (maximum), mid-roll 90s à la marque des 20 minutes, post-roll 30s
- Publicités lues par l'animateur uniquement — pas de publicités insérées dynamiquement en dessous de 10k téléchargements/épisode
- Le texte publicitaire se trouve dans outline.md de l'épisode sous les marqueurs "AD BREAK"
- Les nouveaux tarifs sponsors nécessitent une approbation ; utiliser les niveaux de ad-rates.md, ne jamais négocier en dessous du plancher
- Enregistrer chaque livrable et paiement dans monetization/sponsor-tracker.md le jour même

## Cadence analytique

- J+7 après publication : enregistrer les téléchargements dans analytics/episode-performance.md
- J+30 : mettre à jour avec le total sur 30 jours et le taux de complétion depuis Spotify for Podcasters
- Mensuel : mettre à jour analytics/growth-dashboard.md avec le nombre d'abonnés et le delta MoM
- Trimestriel : lancer un sondage auditeurs ; archiver les résultats dans analytics/audience-survey-YYYY-QN.md
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
        "/Users/${USER}/podcast-studio"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_PERSONAL_ACCESS_TOKEN}"
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
      "args": ["-y", "@stripe/agent-toolkit"],
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
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_OUTPUT_FILE_PATH\"; if [[ \"$FILE\" == */episodes/*/shownotes.md ]]; then echo \"[hook] Show notes saved: $FILE — run /social-promo and /newsletter-episode before publishing\"; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_OUTPUT_FILE_PATH\"; if [[ \"$FILE\" == */monetization/sponsor-tracker.md ]]; then echo \"[hook] Sponsor tracker updated: verify ad-rates.md alignment and confirm deliverable dates\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'cd \"${CLAUDE_PROJECT_DIR}\" && MISSING=$(find episodes/ -mindepth 2 -name \"transcript.md\" -empty 2>/dev/null | wc -l | tr -d \" \"); [ \"$MISSING\" -gt 0 ] && echo \"[reminder] $MISSING episode(s) have empty transcript.md — export from Descript and paste in\" || true'"
          }
        ]
      }
    ]
  }
}
```

## Compétences à installer

```bash
npx uitkit add skill productivity/stakeholder-comms
npx uitkit add skill productivity/doc-site-builder
npx uitkit add skill productivity/process-mapper
npx uitkit add skill productivity/vendor-evaluator
npx uitkit add skill data-ml/stakeholder-report
npx uitkit add skill marketing/social-media-manager
npx uitkit add skill small-business/content-repurposer
```

## En lien

- [Guide : Claude pour les créateurs de contenu](../guides/for-content-marketer.md)
- [Workflow : Création de contenu de bout en bout](../workflows/content-creation.md)
