# Espace de travail Content Marketer — Structure de projet

> Pour les content marketers gérant l'intégralité du cycle de production — de la recherche de mots-clés et des briefs jusqu'à la rédaction, l'audit SEO, la publication, la distribution et le recyclage du contenu — dans un seul espace de travail Claude Code.

## Stack

- **CMS :** HubSpot CMS Hub ou WordPress 6.x avec Yoast SEO / RankMath
- **SEO :** Ahrefs (Site Explorer, Keywords Explorer, Content Explorer) ou Semrush (Keyword Magic, Position Tracking)
- **Planification :** Notion (base de données du calendrier éditorial, suivi de contenu)
- **Programmation sociale :** Buffer (multi-canal) ou Sprout Social (équipes entreprise)
- **Visuels :** Canva (visuels réseaux sociaux, images à la une, infographies)
- **Analytique :** Google Analytics 4 (trafic, engagement, conversions), reporting HubSpot (attribution pipeline)
- **Communication :** Slack (canal Slack éditorial, alertes de publication)
- **Docs-as-code :** GitHub (versionnage de contenu, révisions de brouillons via pull requests)
- **Compétences Claude Code :** marketing/content-brief, marketing/content-strategy, marketing/copywriting, marketing/editorial-calendar, marketing/ai-seo, marketing/programmatic-seo, marketing/social-media-manager, small-business/content-repurposer

## Arborescence du projet

```
content-marketer-workspace/
├── .claude/
│   ├── CLAUDE.md                        # Instructions de l'espace de travail pour Claude Code
│   ├── settings.json                    # Serveurs MCP, hooks, permissions
│   └── commands/
│       ├── content-brief.md             # /content-brief — générer un brief SEO complet à partir d'un mot-clé
│       ├── draft-post.md                # /draft-post — rédiger un article long à partir du brief
│       ├── seo-audit.md                 # /seo-audit — vérification SEO on-page avant publication
│       ├── social-copy.md               # /social-copy — générer des variantes sociales à partir de l'article
│       ├── repurpose.md                 # /repurpose — transformer un article en newsletter, fils de discussion, clips
│       ├── editorial-calendar.md        # /editorial-calendar — planifier et compléter un calendrier mensuel
│       └── performance-review.md        # /performance-review — extraire les métriques GA4, signaler les sous-performers
├── briefs/
│   ├── _template.md                     # Modèle de brief de contenu principal (copier-coller pour démarrer)
│   ├── 2026-06-best-ai-tools-marketers/ # Un répertoire par contenu
│   │   ├── brief.md                     # Brief avec recherche de mots-clés, plan, lacunes concurrentielles
│   │   ├── competitor-notes.md          # Notes manuelles après lecture des 3 à 5 premières URLs en classement
│   │   └── keyword-data.csv             # Données de mots-clés exportées depuis Ahrefs/Semrush pour ce sujet
│   ├── 2026-06-content-strategy-guide/
│   │   ├── brief.md
│   │   ├── competitor-notes.md
│   │   └── keyword-data.csv
│   └── 2026-07-programmatic-seo-primer/
│       ├── brief.md
│       └── keyword-data.csv
├── drafts/
│   ├── best-ai-tools-marketers.md       # Brouillon en cours — correspond au brief dans briefs/
│   ├── content-strategy-guide.md        # En cours, actuellement en révision éditoriale
│   └── programmatic-seo-primer.md       # Tout juste démarré — phase de plan brut
├── published/
│   ├── 2026-05/
│   │   ├── editorial-calendar-template/ # Archive des contenus publiés
│   │   │   ├── post.md                  # Copie finale publiée
│   │   │   ├── metrics.md               # Métriques GA4 + HubSpot collectées à 30/60/90 jours
│   │   │   └── social-posts.md          # Copies sociales utilisées pour la distribution
│   │   └── seo-audit-checklist/
│   │       ├── post.md
│   │       ├── metrics.md
│   │       └── social-posts.md
│   └── 2026-04/
│       └── content-brief-guide/
│           ├── post.md
│           ├── metrics.md
│           └── social-posts.md
├── research/
│   ├── keyword-clusters/
│   │   ├── seo-cluster.csv              # Cluster thématique : compétences SEO, outils, audits
│   │   ├── content-ops-cluster.csv      # Cluster thématique : éditorial, production, workflows
│   │   └── ai-marketing-cluster.csv     # Cluster thématique : outils IA pour marketers
│   ├── competitor-content/
│   │   ├── competitor-a-content-map.md  # Cartographie du contenu du concurrent principal
│   │   ├── competitor-b-content-map.md
│   │   └── gap-analysis.md              # Notre couverture vs. couverture concurrente
│   └── serp-snapshots/
│       ├── 2026-06-snapshot.md          # Journal mensuel des positions SERP pour les mots-clés suivis
│       └── 2026-05-snapshot.md
├── templates/
│   ├── brief-template.md                # Brief de contenu vierge (plan H2, meta, ILP)
│   ├── blog-post-format.md              # Structure standard d'article de blog (intro, H2s, CTA, pied de page)
│   ├── listicle-format.md               # Squelette de liste numérotée
│   ├── comparison-format.md             # Structure d'article "[A] vs [B]"
│   ├── how-to-format.md                 # Structure tutoriel / pas à pas
│   └── pillar-page-format.md            # Pilier long format (3000+ mots, hub de liens internes)
├── assets/
│   ├── ctas/
│   │   ├── blog-ctas.md                 # 10 CTAs réutilisables en fin d'article par objectif (lead, démo, abonnement)
│   │   └── inline-ctas.md               # Variantes de CTA en milieu d'article (mises à niveau de contenu, essais)
│   ├── author-bios/
│   │   ├── author-bio-short.md          # Bio de 50 mots pour les signatures
│   │   └── author-bio-long.md           # Bio de 150 mots pour les articles invités
│   ├── boilerplate/
│   │   ├── company-description.md       # Descriptions entreprise : 1 phrase, 1 paragraphe, biographie complète
│   │   ├── product-descriptions.md      # Descriptions des produits/fonctionnalités clés à intégrer
│   │   └── disclaimer-legal.md          # Mentions légales standard / mentions affiliés
│   └── social/
│       ├── linkedin-profile-copy.md     # Texte réutilisable pour la page entreprise LinkedIn
│       └── twitter-bio.md               # Variantes de bio Twitter/X
└── editorial-calendar.md                # Calendrier principal — vue mensuelle, statut, assignations
```

## Fichiers clés expliqués

| Chemin | Objectif |
|---|---|
| `.claude/commands/content-brief.md` | Commande slash qui prend un mot-clé/sujet en entrée et produit un brief SEO complet incluant l'analyse des lacunes concurrentielles, le plan H2, la méta-description et le plan de liens internes |
| `.claude/commands/draft-post.md` | Commande slash qui lit le brief dans `briefs/<slug>/brief.md` et rédige un brouillon complet dans `drafts/<slug>.md`, en suivant le modèle de format adapté au type de contenu |
| `.claude/commands/seo-audit.md` | Checklist pré-publication : valide la longueur de la balise titre, la méta-description, le slug, la présence du mot-clé dans H1/H2, le texte alternatif des images, les liens internes et l'éligibilité au schema |
| `.claude/commands/social-copy.md` | Prend une URL publiée ou un brouillon et produit un post LinkedIn, un fil Twitter/X, une légende Instagram et un texte de newsletter — tous adaptés au canal, pas copiés-collés |
| `.claude/commands/repurpose.md` | Transforme un article long en section newsletter, plan de carrousel LinkedIn, script vidéo court et fil Twitter/X |
| `.claude/commands/performance-review.md` | Extrait les métriques GA4 à 30/60/90 jours pour les contenus publiés, signale les sous-performers par rapport aux objectifs de trafic, et suggère des corrections CRO ou SEO rapides |
| `briefs/_template.md` | Modèle de brief principal — à copier avant tout nouveau contenu ; contient le bloc de mots-clés, le tableau des concurrents, le plan H2 complet, les champs méta et le plan de liens internes |
| `editorial-calendar.md` | Calendrier principal en fichier unique avec tableaux mois par mois, statut par contenu (brief / brouillon / révision / publié), mot-clé, date de publication cible et assignation |

## Démarrage rapide

```bash
# Créer la racine de l'espace de travail
mkdir -p content-marketer-workspace && cd content-marketer-workspace

# Répertoires Claude Code
mkdir -p .claude/commands

# Répertoires du cycle de vie du contenu
mkdir -p briefs/_template
mkdir -p drafts
mkdir -p published/2026-05
mkdir -p published/2026-04

# Répertoires de recherche
mkdir -p research/keyword-clusters
mkdir -p research/competitor-content
mkdir -p research/serp-snapshots

# Modèles et ressources
mkdir -p templates
mkdir -p assets/ctas
mkdir -p assets/author-bios
mkdir -p assets/boilerplate
mkdir -p assets/social

# Initialiser CLAUDE.md
touch .claude/CLAUDE.md
touch .claude/settings.json

# Installer toutes les compétences de content marketing
npx claudient add skill marketing/content-brief
npx claudient add skill marketing/content-strategy
npx claudient add skill marketing/copywriting
npx claudient add skill marketing/editorial-calendar
npx claudient add skill marketing/ai-seo
npx claudient add skill marketing/programmatic-seo
npx claudient add skill marketing/social-media-manager
npx claudient add skill small-business/content-repurposer

# Copier les commandes slash dans .claude/commands/
npx claudient add command content-brief
npx claudient add command draft-post
npx claudient add command seo-audit
npx claudient add command social-copy
npx claudient add command repurpose
npx claudient add command editorial-calendar
npx claudient add command performance-review

# Créer le modèle de brief
touch briefs/_template.md

# Créer le calendrier éditorial
touch editorial-calendar.md

echo "Espace de travail content marketer prêt."
```

## Modèle CLAUDE.md

```markdown
# Espace de travail Content Marketer — Instructions Claude

## Ce que c'est

Cet espace de travail gère l'intégralité du cycle de production de contenu marketing : recherche de mots-clés,
briefs de contenu, rédaction longue forme, audits SEO, publication, distribution sociale,
recyclage et mesure des performances. Tout le contenu vise un trafic organique SEO
pour une audience B2B.

## Stack

- CMS : HubSpot CMS (principal) / WordPress avec Yoast SEO (secondaire)
- Outil SEO : Ahrefs — utiliser pour le volume de mots-clés, KD, analyse SERP et recherche concurrentielle
- Planification : Base de données du calendrier éditorial Notion (synchronisée manuellement avec editorial-calendar.md ici)
- Programmation sociale : Buffer — files LinkedIn, Twitter/X et Instagram
- Analytique : Google Analytics 4 — toutes les métriques de trafic et d'engagement
- Visuels : Canva — images à la une en 1200x630px, cartes sociales en 1080x1080px
- Communication : Canal Slack #content-team pour les mises à jour de statut

## Conventions de répertoires

- briefs/<slug>/ — un répertoire par contenu ; toujours commencer ici avant de rédiger
- drafts/<slug>.md — WIP actif ; le nom de fichier correspond au nom du répertoire de brief
- published/<YYYY-MM>/<slug>/ — post.md + metrics.md + social-posts.md
- templates/ — ne jamais modifier directement ; copier dans drafts/ avant modification
- assets/ — blocs de texte réutilisables ; citer le fichier lors de l'insertion de boilerplate

## Tâches courantes — commandes exactes

**Démarrer un nouveau contenu :**
/content-brief keyword="[mot-clé principal]" audience="[description ICP]" type="[blog/guide/comparison]"

**Rédiger à partir d'un brief finalisé :**
/draft-post brief=briefs/[slug]/brief.md format=templates/[format].md

**Vérification SEO pré-publication :**
/seo-audit draft=drafts/[slug].md keyword="[mot-clé principal]"

**Générer les copies de distribution sociale :**
/social-copy source=published/[YYYY-MM]/[slug]/post.md channels="linkedin,twitter,newsletter"

**Recycler un article publié :**
/repurpose source=published/[YYYY-MM]/[slug]/post.md formats="newsletter,thread,carousel"

**Planification éditoriale mensuelle :**
/editorial-calendar month="[Mois YYYY]" goal="[trafic/leads/marque]" slots=[nombre]

**Revue de performance :**
/performance-review period=90d published=published/[YYYY-MM]/

## Conventions pour les briefs

- Toujours exécuter /content-brief avant de toucher drafts/ — ne jamais rédiger sans brief
- L'analyse des lacunes concurrentielles doit référencer au moins 3 URLs en classement
- Chaque brief doit inclure un plan de liens internes (3 sortants, 3 entrants)
- Difficulté de mot-clé supérieure à 70 : ne procéder que si l'autorité de domaine le justifie

## Conventions SEO

- Balises titre : 55-60 caractères, mot-clé principal inclus, mot fort inclus
- Méta-descriptions : 150-158 caractères, mot-clé + proposition de valeur + CTA doux
- Slugs URL : 2-4 mots, minuscules avec tirets, mot-clé principal, sans mots vides
- Minimum de liens internes par article : 4 (2 contextuels + 2 lectures associées)
- Toutes les images : texte alternatif descriptif et pertinent par rapport au mot-clé si naturel
- Schema : schema Article sur chaque article ; schema FAQ quand les H2 sont des questions

## Workflow de publication

1. Brief approuvé dans briefs/<slug>/brief.md
2. Brouillon rédigé dans drafts/<slug>.md
3. /seo-audit exécuté et tous les éléments de la checklist résolus
4. Publié dans le CMS (HubSpot ou WordPress)
5. Article archivé dans published/<YYYY-MM>/<slug>/post.md
6. /social-copy exécuté ; publications programmées dans Buffer
7. Statut de editorial-calendar.md mis à jour à "publié"
8. Métriques enregistrées dans published/<YYYY-MM>/<slug>/metrics.md à 30, 60, 90 jours
```

## Serveurs MCP

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_PERSONAL_ACCESS_TOKEN}"
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
        "/Users/${USER}/content-marketer-workspace"
      ]
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "@notionhq/mcp-server-notion"],
      "env": {
        "NOTION_API_KEY": "${NOTION_API_KEY}"
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
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_OUTPUT_FILE_PATH\"; if [[ \"$FILE\" == */drafts/*.md ]]; then echo \"[hook] Brouillon sauvegardé : $FILE — exécuter /seo-audit avant publication\"; fi'"
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
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$FILE\" == */published/*.md ]]; then echo \"[hook] Écriture dans published/ — vérifier que seo-audit a été exécuté et que le brief existe dans briefs/\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'cd \"${CLAUDE_PROJECT_DIR}\" && UNPUBLISHED=$(find drafts/ -name \"*.md\" -newer editorial-calendar.md 2>/dev/null | wc -l | tr -d \" \"); [ \"$UNPUBLISHED\" -gt 0 ] && echo \"[rappel] $UNPUBLISHED brouillon(s) modifié(s) depuis la dernière mise à jour du calendrier — mettre à jour editorial-calendar.md\" || true'"
          }
        ]
      }
    ]
  }
}
```

## Compétences à installer

```bash
npx claudient add skill marketing/content-brief
npx claudient add skill marketing/content-strategy
npx claudient add skill marketing/copywriting
npx claudient add skill marketing/editorial-calendar
npx claudient add skill marketing/ai-seo
npx claudient add skill marketing/programmatic-seo
npx claudient add skill marketing/social-media-manager
npx claudient add skill small-business/content-repurposer
npx claudient add skill marketing/seo-audit
```

## En lien avec

- [Guide : Claude pour les Content Marketers](../guides/for-content-marketer.md)
- [Workflow : Création de contenu de bout en bout](../workflows/content-creation.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
