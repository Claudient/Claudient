# Content-Marketer-Arbeitsbereich — Projektstruktur

> Für Content-Marketer, die den gesamten Produktionszyklus verwalten — von der Keyword-Recherche und Briefings über Texterstellung, SEO-Prüfung, Veröffentlichung, Distribution bis zur Wiederverwendung von Inhalten — in einem einzigen Claude Code-Arbeitsbereich.

## Stack

- **CMS:** HubSpot CMS Hub oder WordPress 6.x mit Yoast SEO / RankMath
- **SEO:** Ahrefs (Site Explorer, Keywords Explorer, Content Explorer) oder Semrush (Keyword Magic, Position Tracking)
- **Planung:** Notion (Redaktionskalender-Datenbank, Content-Tracker)
- **Social-Scheduling:** Buffer (Multi-Kanal) oder Sprout Social (Enterprise-Teams)
- **Visuals:** Canva (Social-Grafiken, Beitragsbilder, Infografiken)
- **Analytics:** Google Analytics 4 (Traffic, Engagement, Conversions), HubSpot-Reporting (Pipeline-Attribution)
- **Kommunikation:** Slack (redaktioneller Slack-Kanal, Veröffentlichungswarnungen)
- **Docs-as-code:** GitHub (Inhaltsversionierung, Entwurfsprüfungen via Pull Requests)
- **Claude Code Skills:** marketing/content-brief, marketing/content-strategy, marketing/copywriting, marketing/editorial-calendar, marketing/ai-seo, marketing/programmatic-seo, marketing/social-media-manager, small-business/content-repurposer

## Verzeichnisstruktur

```
content-marketer-workspace/
├── .claude/
│   ├── CLAUDE.md                        # Arbeitsbereichsanweisungen für Claude Code
│   ├── settings.json                    # MCP-Server, Hooks, Berechtigungen
│   └── commands/
│       ├── content-brief.md             # /content-brief — vollständiges SEO-Brief aus Keyword generieren
│       ├── draft-post.md                # /draft-post — Langform-Artikel aus Brief verfassen
│       ├── seo-audit.md                 # /seo-audit — On-Page-SEO-Prüfung vor der Veröffentlichung
│       ├── social-copy.md               # /social-copy — Social-Media-Varianten aus Artikel generieren
│       ├── repurpose.md                 # /repurpose — Langform in Newsletter, Threads, Clips aufteilen
│       ├── editorial-calendar.md        # /editorial-calendar — Monatskalender planen und befüllen
│       └── performance-review.md        # /performance-review — GA4-Metriken abrufen, Underperformer markieren
├── briefs/
│   ├── _template.md                     # Master-Content-Brief-Vorlage (zum Starten kopieren)
│   ├── 2026-06-best-ai-tools-marketers/ # Ein Verzeichnis pro Inhaltsstück
│   │   ├── brief.md                     # Brief mit Keyword-Recherche, Gliederung, Lückenanalyse der Mitbewerber
│   │   ├── competitor-notes.md          # Manuelle Notizen nach dem Lesen der top 3-5 platzierten URLs
│   │   └── keyword-data.csv             # Exportierte Ahrefs/Semrush-Keyword-Daten für dieses Thema
│   ├── 2026-06-content-strategy-guide/
│   │   ├── brief.md
│   │   ├── competitor-notes.md
│   │   └── keyword-data.csv
│   └── 2026-07-programmatic-seo-primer/
│       ├── brief.md
│       └── keyword-data.csv
├── drafts/
│   ├── best-ai-tools-marketers.md       # Laufender Entwurf — korrespondiert mit Brief in briefs/
│   ├── content-strategy-guide.md        # In Bearbeitung, derzeit in der redaktionellen Prüfung
│   └── programmatic-seo-primer.md       # Gerade gestartet — grobe Gliederungsphase
├── published/
│   ├── 2026-05/
│   │   ├── editorial-calendar-template/ # Archiv veröffentlichter Inhalte
│   │   │   ├── post.md                  # Finale veröffentlichte Fassung
│   │   │   ├── metrics.md               # GA4 + HubSpot-Metriken nach 30/60/90 Tagen
│   │   │   └── social-posts.md          # Für die Distribution verwendete Social-Media-Texte
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
│   │   ├── seo-cluster.csv              # Themen-Cluster: SEO-Fähigkeiten, Tools, Audits
│   │   ├── content-ops-cluster.csv      # Themen-Cluster: Redaktion, Produktion, Workflows
│   │   └── ai-marketing-cluster.csv     # Themen-Cluster: KI-Tools für Marketer
│   ├── competitor-content/
│   │   ├── competitor-a-content-map.md  # Kartierte Inhalte des Hauptmitbewerbers
│   │   ├── competitor-b-content-map.md
│   │   └── gap-analysis.md              # Unsere Abdeckung vs. Mitbewerber-Abdeckung
│   └── serp-snapshots/
│       ├── 2026-06-snapshot.md          # Monatliches SERP-Positionsprotokoll für verfolgte Keywords
│       └── 2026-05-snapshot.md
├── templates/
│   ├── brief-template.md                # Leeres Content-Brief (H2-Gliederung, Meta, ILP)
│   ├── blog-post-format.md              # Standard-Blogbeitragsstruktur (Einleitung, H2s, CTA, Footer)
│   ├── listicle-format.md               # Nummeriertes Listicle-Gerüst
│   ├── comparison-format.md             # "[A] vs. [B]"-Beitragsstruktur
│   ├── how-to-format.md                 # Tutorial- / Schritt-für-Schritt-Struktur
│   └── pillar-page-format.md            # Langform-Pillar-Seite (3000+ Wörter, interner Link-Hub)
├── assets/
│   ├── ctas/
│   │   ├── blog-ctas.md                 # 10 wiederverwendbare End-of-Post-CTAs nach Ziel (Lead, Demo, Abo)
│   │   └── inline-ctas.md               # Mid-Post-CTA-Varianten (Content Upgrades, Testversionen)
│   ├── author-bios/
│   │   ├── author-bio-short.md          # 50-Wörter-Bio für Autornennungen
│   │   └── author-bio-long.md           # 150-Wörter-Bio für Gastbeiträge
│   ├── boilerplate/
│   │   ├── company-description.md       # 1-Satz-, 1-Absatz- und vollständige Unternehmensbeschreibungen
│   │   ├── product-descriptions.md      # Schlüsselprodukt-/Funktionsbeschreibungen zum Einbetten
│   │   └── disclaimer-legal.md          # Standard-Rechts- / Affiliate-Hinweise
│   └── social/
│       ├── linkedin-profile-copy.md     # Wiederverwendbarer Text für LinkedIn-Unternehmensseite
│       └── twitter-bio.md               # Twitter/X-Bio-Varianten
└── editorial-calendar.md                # Master-Kalender — Monatsansicht, Status, Zuweisungen
```

## Wichtige Dateien erklärt

| Pfad | Zweck |
|---|---|
| `.claude/commands/content-brief.md` | Slash-Befehl, der ein Keyword/Thema als Eingabe nimmt und ein vollständiges SEO-optimiertes Brief erstellt, einschließlich Lückenanalyse der Mitbewerber, H2-Gliederung, Meta-Text und internem Verlinkungsplan |
| `.claude/commands/draft-post.md` | Slash-Befehl, der das Brief in `briefs/<slug>/brief.md` liest und einen vollständigen Entwurf nach `drafts/<slug>.md` schreibt, gemäß der Formatvorlage für den jeweiligen Inhaltstyp |
| `.claude/commands/seo-audit.md` | Checkliste vor der Veröffentlichung: prüft Länge des Titel-Tags, Meta-Beschreibung, Slug, Keyword-Vorkommen in H1/H2, Bild-Alt-Text, interne Links und Schema-Eignung |
| `.claude/commands/social-copy.md` | Nimmt eine veröffentlichte URL oder einen Entwurf und erstellt LinkedIn-Post, Twitter/X-Thread, Instagram-Beschriftung und Newsletter-Teasertext — kanalgerecht, nicht einfach kopiert |
| `.claude/commands/repurpose.md` | Verwandelt einen Langform-Artikel in einen Newsletter-Abschnitt, eine LinkedIn-Karussell-Gliederung, ein Kurzvideoskrip und einen Twitter/X-Thread |
| `.claude/commands/performance-review.md` | Ruft 30/60/90-Tage-GA4-Metriken für veröffentlichte Inhalte ab, markiert Underperformer gegenüber Traffic-Zielen und schlägt schnelle CRO- oder SEO-Korrekturen vor |
| `briefs/_template.md` | Master-Brief-Vorlage — vor jedem neuen Inhaltsstück kopieren; enthält Keyword-Block, Mitbewerber-Tabelle, vollständiges H2-Gliederungsgerüst, Meta-Felder und internen Verlinkungsplan |
| `editorial-calendar.md` | Einzel-Datei-Master-Kalender mit monatlichen Tabellen, Status pro Inhalt (Brief / Entwurf / Prüfung / veröffentlicht), Keyword, geplantem Veröffentlichungsdatum und Zuweisung |

## Schnell-Einrichtung

```bash
# Arbeitsbereichs-Stammverzeichnis erstellen
mkdir -p content-marketer-workspace && cd content-marketer-workspace

# Claude Code-Verzeichnisse
mkdir -p .claude/commands

# Inhaltslebenszyklus-Verzeichnisse
mkdir -p briefs/_template
mkdir -p drafts
mkdir -p published/2026-05
mkdir -p published/2026-04

# Recherche-Verzeichnisse
mkdir -p research/keyword-clusters
mkdir -p research/competitor-content
mkdir -p research/serp-snapshots

# Vorlagen und Assets
mkdir -p templates
mkdir -p assets/ctas
mkdir -p assets/author-bios
mkdir -p assets/boilerplate
mkdir -p assets/social

# CLAUDE.md initialisieren
touch .claude/CLAUDE.md
touch .claude/settings.json

# Alle Content-Marketing-Skills installieren
npx uitkit add skill marketing/content-brief
npx uitkit add skill marketing/content-strategy
npx uitkit add skill marketing/copywriting
npx uitkit add skill marketing/editorial-calendar
npx uitkit add skill marketing/ai-seo
npx uitkit add skill marketing/programmatic-seo
npx uitkit add skill marketing/social-media-manager
npx uitkit add skill small-business/content-repurposer

# Slash-Befehle in .claude/commands/ kopieren
npx uitkit add command content-brief
npx uitkit add command draft-post
npx uitkit add command seo-audit
npx uitkit add command social-copy
npx uitkit add command repurpose
npx uitkit add command editorial-calendar
npx uitkit add command performance-review

# Brief-Vorlage erstellen
touch briefs/_template.md

# Redaktionskalender erstellen
touch editorial-calendar.md

echo "Content-Marketer-Arbeitsbereich bereit."
```

## CLAUDE.md-Vorlage

```markdown
# Content-Marketer-Arbeitsbereich — Claude-Anweisungen

## Worum es geht

Dieser Arbeitsbereich verwaltet den vollständigen Content-Marketing-Produktionszyklus: Keyword-Recherche,
Content-Briefings, Langform-Texterstellung, SEO-Audits, Veröffentlichung, Social-Distribution,
Wiederverwendung und Performance-Messung. Alle Inhalte zielen auf SEO-getriebenen organischen Traffic
für ein B2B-Publikum ab.

## Stack

- CMS: HubSpot CMS (primär) / WordPress mit Yoast SEO (sekundär)
- SEO-Tool: Ahrefs — für Keyword-Volumen, KD, SERP-Analyse und Wettbewerbsrecherche
- Planung: Notion-Redaktionskalender-Datenbank (manuell mit editorial-calendar.md hier synchronisiert)
- Social-Scheduling: Buffer — LinkedIn-, Twitter/X- und Instagram-Warteschlangen
- Analytics: Google Analytics 4 — alle Traffic- und Engagement-Metriken
- Visuals: Canva — Beitragsbilder bei 1200x630px, Social-Cards bei 1080x1080px
- Kommunikation: Slack-Kanal #content-team für Statusmeldungen

## Verzeichniskonventionen

- briefs/<slug>/ — ein Verzeichnis pro Inhaltsstück; immer hier beginnen, bevor mit dem Texten angefangen wird
- drafts/<slug>.md — aktives WIP; Dateiname entspricht dem Namen des Brief-Verzeichnisses
- published/<YYYY-MM>/<slug>/ — post.md + metrics.md + social-posts.md
- templates/ — niemals direkt bearbeiten; vor Änderungen in drafts/ kopieren
- assets/ — wiederverwendbare Textbausteine; Datei beim Einfügen von Boilerplate angeben

## Häufige Aufgaben — genaue Befehle

**Neues Inhaltsstück starten:**
/content-brief keyword="[Hauptkeyword]" audience="[ICP-Beschreibung]" type="[blog/guide/comparison]"

**Aus fertigem Brief texten:**
/draft-post brief=briefs/[slug]/brief.md format=templates/[format].md

**SEO-Prüfung vor der Veröffentlichung:**
/seo-audit draft=drafts/[slug].md keyword="[Hauptkeyword]"

**Social-Distribution-Texte generieren:**
/social-copy source=published/[YYYY-MM]/[slug]/post.md channels="linkedin,twitter,newsletter"

**Veröffentlichten Artikel wiederverwenden:**
/repurpose source=published/[YYYY-MM]/[slug]/post.md formats="newsletter,thread,carousel"

**Monatliche Redaktionsplanung:**
/editorial-calendar month="[Monat YYYY]" goal="[traffic/leads/brand]" slots=[Anzahl]

**Performance-Review:**
/performance-review period=90d published=published/[YYYY-MM]/

## Brief-Konventionen

- Immer /content-brief ausführen, bevor drafts/ angefasst wird — niemals ohne Brief texten
- Die Lückenanalyse der Mitbewerber muss mindestens 3 platzierte URLs referenzieren
- Jedes Brief muss einen internen Verlinkungsplan enthalten (3 ausgehend, 3 eingehend)
- Keyword-Schwierigkeit über 70: nur fortfahren, wenn die Domain-Autorität dies unterstützt

## SEO-Konventionen

- Titel-Tags: 55-60 Zeichen, Hauptkeyword enthalten, Power-Word enthalten
- Meta-Beschreibungen: 150-158 Zeichen, Keyword + Value Prop + weicher CTA
- URL-Slugs: 2-4 Wörter, Kleinbuchstaben mit Bindestrichen, Hauptkeyword, keine Füllwörter
- Mindestanzahl interner Links pro Beitrag: 4 (2 kontextuelle + 2 weiterführende Lektüre)
- Jedes Bild: Alt-Text, der beschreibend und keyword-relevant ist, wo es natürlich passt
- Schema: Article-Schema auf jedem Beitrag; FAQ-Schema wenn H2s Fragen sind

## Veröffentlichungs-Workflow

1. Brief genehmigt in briefs/<slug>/brief.md
2. Entwurf nach drafts/<slug>.md geschrieben
3. /seo-audit ausgeführt und alle Checklisten-Punkte behoben
4. Im CMS veröffentlicht (HubSpot oder WordPress)
5. Beitrag archiviert in published/<YYYY-MM>/<slug>/post.md
6. /social-copy ausgeführt; Beiträge in Buffer geplant
7. Status von editorial-calendar.md auf "veröffentlicht" aktualisiert
8. Metriken in published/<YYYY-MM>/<slug>/metrics.md nach 30, 60, 90 Tagen eingetragen
```

## MCP-Server

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

## Empfohlene Hooks

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_OUTPUT_FILE_PATH\"; if [[ \"$FILE\" == */drafts/*.md ]]; then echo \"[hook] Entwurf gespeichert: $FILE — /seo-audit vor der Veröffentlichung ausführen\"; fi'"
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
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$FILE\" == */published/*.md ]]; then echo \"[hook] Schreiben in published/ — sicherstellen, dass seo-audit ausgeführt wurde und Brief in briefs/ vorhanden ist\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'cd \"${CLAUDE_PROJECT_DIR}\" && UNPUBLISHED=$(find drafts/ -name \"*.md\" -newer editorial-calendar.md 2>/dev/null | wc -l | tr -d \" \"); [ \"$UNPUBLISHED\" -gt 0 ] && echo \"[Erinnerung] $UNPUBLISHED Entwurf/Entwürfe seit letzter Kalenderaktualisierung geändert — editorial-calendar.md aktualisieren\" || true'"
          }
        ]
      }
    ]
  }
}
```

## Zu installierende Skills

```bash
npx uitkit add skill marketing/content-brief
npx uitkit add skill marketing/content-strategy
npx uitkit add skill marketing/copywriting
npx uitkit add skill marketing/editorial-calendar
npx uitkit add skill marketing/ai-seo
npx uitkit add skill marketing/programmatic-seo
npx uitkit add skill marketing/social-media-manager
npx uitkit add skill small-business/content-repurposer
npx uitkit add skill marketing/seo-audit
```

## Verwandte Ressourcen

- [Leitfaden: Claude für Content-Marketer](../guides/for-content-marketer.md)
- [Workflow: Content-Erstellung von Anfang bis Ende](../workflows/content-creation.md)
