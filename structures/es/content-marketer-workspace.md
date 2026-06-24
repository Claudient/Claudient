# Espacio de trabajo para Content Marketer — Estructura de proyecto

> Para content marketers que gestionan el ciclo completo de producción — desde la investigación de palabras clave y los briefs hasta la redacción, revisión SEO, publicación, distribución y reutilización de contenidos — en un único espacio de trabajo de Claude Code.

## Stack

- **CMS:** HubSpot CMS Hub o WordPress 6.x con Yoast SEO / RankMath
- **SEO:** Ahrefs (Site Explorer, Keywords Explorer, Content Explorer) o Semrush (Keyword Magic, Position Tracking)
- **Planificación:** Notion (base de datos del calendario editorial, seguimiento de contenidos)
- **Programación social:** Buffer (multicanal) o Sprout Social (equipos enterprise)
- **Visuales:** Canva (gráficos para redes sociales, imágenes destacadas, infografías)
- **Analítica:** Google Analytics 4 (tráfico, engagement, conversiones), informes de HubSpot (atribución de pipeline)
- **Comunicación:** Slack (canal editorial de Slack, alertas de publicación)
- **Docs-as-code:** GitHub (control de versiones de contenido, revisiones de borradores mediante pull requests)
- **Skills de Claude Code:** marketing/content-brief, marketing/content-strategy, marketing/copywriting, marketing/editorial-calendar, marketing/ai-seo, marketing/programmatic-seo, marketing/social-media-manager, small-business/content-repurposer

## Árbol de directorios

```
content-marketer-workspace/
├── .claude/
│   ├── CLAUDE.md                        # Instrucciones del espacio de trabajo para Claude Code
│   ├── settings.json                    # Servidores MCP, hooks, permisos
│   └── commands/
│       ├── content-brief.md             # /content-brief — generar un brief SEO completo a partir de una palabra clave
│       ├── draft-post.md                # /draft-post — redactar un artículo largo a partir del brief
│       ├── seo-audit.md                 # /seo-audit — revisión SEO on-page antes de publicar
│       ├── social-copy.md               # /social-copy — generar variantes sociales a partir del artículo
│       ├── repurpose.md                 # /repurpose — convertir contenido largo en newsletter, hilos, clips
│       ├── editorial-calendar.md        # /editorial-calendar — planificar y completar un calendario mensual
│       └── performance-review.md        # /performance-review — extraer métricas de GA4, señalar artículos con bajo rendimiento
├── briefs/
│   ├── _template.md                     # Plantilla maestra de brief de contenido (copiar para empezar)
│   ├── 2026-06-best-ai-tools-marketers/ # Un directorio por pieza de contenido
│   │   ├── brief.md                     # Brief con investigación de palabras clave, esquema, brechas competitivas
│   │   ├── competitor-notes.md          # Notas manuales tras leer las 3-5 URLs mejor posicionadas
│   │   └── keyword-data.csv             # Datos de palabras clave exportados de Ahrefs/Semrush para este tema
│   ├── 2026-06-content-strategy-guide/
│   │   ├── brief.md
│   │   ├── competitor-notes.md
│   │   └── keyword-data.csv
│   └── 2026-07-programmatic-seo-primer/
│       ├── brief.md
│       └── keyword-data.csv
├── drafts/
│   ├── best-ai-tools-marketers.md       # Borrador en curso — corresponde al brief en briefs/
│   ├── content-strategy-guide.md        # En proceso, actualmente en revisión editorial
│   └── programmatic-seo-primer.md       # Recién iniciado — fase de esquema preliminar
├── published/
│   ├── 2026-05/
│   │   ├── editorial-calendar-template/ # Archivo de piezas publicadas
│   │   │   ├── post.md                  # Copia final publicada
│   │   │   ├── metrics.md               # Métricas de GA4 + HubSpot obtenidas a los 30/60/90 días
│   │   │   └── social-posts.md          # Textos sociales utilizados para la distribución
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
│   │   ├── seo-cluster.csv              # Clúster temático: habilidades SEO, herramientas, auditorías
│   │   ├── content-ops-cluster.csv      # Clúster temático: editorial, producción, flujos de trabajo
│   │   └── ai-marketing-cluster.csv     # Clúster temático: herramientas de IA para marketers
│   ├── competitor-content/
│   │   ├── competitor-a-content-map.md  # Mapa de contenidos del competidor principal
│   │   ├── competitor-b-content-map.md
│   │   └── gap-analysis.md              # Nuestra cobertura vs. cobertura de la competencia
│   └── serp-snapshots/
│       ├── 2026-06-snapshot.md          # Registro mensual de posiciones SERP para palabras clave rastreadas
│       └── 2026-05-snapshot.md
├── templates/
│   ├── brief-template.md                # Brief de contenido en blanco (esquema H2, meta, ILP)
│   ├── blog-post-format.md              # Estructura estándar de artículo de blog (intro, H2s, CTA, pie de página)
│   ├── listicle-format.md               # Esqueleto de lista numerada
│   ├── comparison-format.md             # Estructura de artículo "[A] vs [B]"
│   ├── how-to-format.md                 # Estructura de tutorial / paso a paso
│   └── pillar-page-format.md            # Pillar page de formato largo (3000+ palabras, hub de enlaces internos)
├── assets/
│   ├── ctas/
│   │   ├── blog-ctas.md                 # 10 CTAs reutilizables al final del artículo por objetivo (lead, demo, suscripción)
│   │   └── inline-ctas.md               # Variantes de CTA a mitad del artículo (mejoras de contenido, pruebas gratuitas)
│   ├── author-bios/
│   │   ├── author-bio-short.md          # Bio de 50 palabras para firmas de autor
│   │   └── author-bio-long.md           # Bio de 150 palabras para artículos invitados
│   ├── boilerplate/
│   │   ├── company-description.md       # Descripciones de empresa: 1 frase, 1 párrafo y bio completa
│   │   ├── product-descriptions.md      # Descripciones clave de productos/funcionalidades para insertar
│   │   └── disclaimer-legal.md          # Avisos legales estándar / avisos de afiliados
│   └── social/
│       ├── linkedin-profile-copy.md     # Texto reutilizable para la página de empresa en LinkedIn
│       └── twitter-bio.md               # Variantes de bio para Twitter/X
└── editorial-calendar.md                # Calendario maestro — vista mensual, estado, asignaciones
```

## Archivos clave explicados

| Ruta | Propósito |
|---|---|
| `.claude/commands/content-brief.md` | Comando slash que toma una palabra clave/tema como entrada y produce un brief SEO completo con análisis de brechas competitivas, esquema H2, meta copy y plan de enlazado interno |
| `.claude/commands/draft-post.md` | Comando slash que lee el brief en `briefs/<slug>/brief.md` y escribe un borrador completo en `drafts/<slug>.md`, siguiendo la plantilla de formato para el tipo de contenido |
| `.claude/commands/seo-audit.md` | Checklist previa a la publicación: valida la longitud del título, meta descripción, slug, presencia de la palabra clave en H1/H2, texto alternativo de imágenes, enlaces internos y elegibilidad para schema |
| `.claude/commands/social-copy.md` | Toma una URL publicada o un borrador y genera un post para LinkedIn, un hilo de Twitter/X, una leyenda para Instagram y un texto para newsletter — adaptado a cada canal, no copiado tal cual |
| `.claude/commands/repurpose.md` | Convierte un artículo largo en una sección de newsletter, un esquema de carrusel para LinkedIn, un guion para video corto y un hilo de Twitter/X |
| `.claude/commands/performance-review.md` | Extrae métricas de GA4 a 30/60/90 días para piezas publicadas, señala los artículos con rendimiento inferior al objetivo de tráfico y sugiere mejoras rápidas de CRO o SEO |
| `briefs/_template.md` | Plantilla maestra de brief — copiarla antes de comenzar cualquier pieza nueva; contiene bloque de palabras clave, tabla de competidores, esquema completo de H2, campos de meta y plan de enlazado interno |
| `editorial-calendar.md` | Calendario maestro en un solo archivo con tablas mes a mes, estado por pieza (brief / borrador / revisión / publicado), palabra clave, fecha de publicación objetivo y asignación |

## Configuración rápida

```bash
# Crear el directorio raíz del espacio de trabajo
mkdir -p content-marketer-workspace && cd content-marketer-workspace

# Directorios de Claude Code
mkdir -p .claude/commands

# Directorios del ciclo de vida del contenido
mkdir -p briefs/_template
mkdir -p drafts
mkdir -p published/2026-05
mkdir -p published/2026-04

# Directorios de investigación
mkdir -p research/keyword-clusters
mkdir -p research/competitor-content
mkdir -p research/serp-snapshots

# Plantillas y recursos
mkdir -p templates
mkdir -p assets/ctas
mkdir -p assets/author-bios
mkdir -p assets/boilerplate
mkdir -p assets/social

# Inicializar CLAUDE.md
touch .claude/CLAUDE.md
touch .claude/settings.json

# Instalar todas las skills de content marketing
npx uitkit add skill marketing/content-brief
npx uitkit add skill marketing/content-strategy
npx uitkit add skill marketing/copywriting
npx uitkit add skill marketing/editorial-calendar
npx uitkit add skill marketing/ai-seo
npx uitkit add skill marketing/programmatic-seo
npx uitkit add skill marketing/social-media-manager
npx uitkit add skill small-business/content-repurposer

# Copiar los comandos slash en .claude/commands/
npx uitkit add command content-brief
npx uitkit add command draft-post
npx uitkit add command seo-audit
npx uitkit add command social-copy
npx uitkit add command repurpose
npx uitkit add command editorial-calendar
npx uitkit add command performance-review

# Crear la plantilla de brief
touch briefs/_template.md

# Crear el calendario editorial
touch editorial-calendar.md

echo "Espacio de trabajo para content marketer listo."
```

## Plantilla CLAUDE.md

```markdown
# Espacio de trabajo para Content Marketer — Instrucciones de Claude

## Qué es esto

Este espacio de trabajo gestiona el ciclo completo de producción de marketing de contenidos: investigación de palabras clave,
briefs de contenido, redacción de formato largo, auditorías SEO, publicación, distribución social,
reutilización y medición del rendimiento. Todos los contenidos apuntan a tráfico orgánico impulsado por SEO
para una audiencia B2B.

## Stack

- CMS: HubSpot CMS (principal) / WordPress con Yoast SEO (secundario)
- Herramienta SEO: Ahrefs — usar para volumen de palabras clave, KD, análisis SERP e investigación de competidores
- Planificación: Base de datos del calendario editorial de Notion (sincronizada manualmente con editorial-calendar.md aquí)
- Programación social: Buffer — colas de LinkedIn, Twitter/X e Instagram
- Analítica: Google Analytics 4 — todas las métricas de tráfico y engagement
- Visuales: Canva — imágenes destacadas a 1200x630px, tarjetas sociales a 1080x1080px
- Comunicación: Canal de Slack #content-team para actualizaciones de estado

## Convenciones de directorios

- briefs/<slug>/ — un directorio por pieza; siempre comenzar aquí antes de redactar
- drafts/<slug>.md — WIP activo; el nombre de archivo coincide con el nombre del directorio del brief
- published/<YYYY-MM>/<slug>/ — post.md + metrics.md + social-posts.md
- templates/ — nunca editar directamente; copiar a drafts/ antes de modificar
- assets/ — bloques de texto reutilizables; citar el archivo al insertar boilerplate

## Tareas habituales — comandos exactos

**Iniciar una nueva pieza de contenido:**
/content-brief keyword="[palabra clave principal]" audience="[descripción del ICP]" type="[blog/guide/comparison]"

**Redactar a partir de un brief terminado:**
/draft-post brief=briefs/[slug]/brief.md format=templates/[format].md

**Revisión SEO antes de publicar:**
/seo-audit draft=drafts/[slug].md keyword="[palabra clave principal]"

**Generar textos de distribución social:**
/social-copy source=published/[YYYY-MM]/[slug]/post.md channels="linkedin,twitter,newsletter"

**Reutilizar un artículo publicado:**
/repurpose source=published/[YYYY-MM]/[slug]/post.md formats="newsletter,thread,carousel"

**Planificación editorial mensual:**
/editorial-calendar month="[Mes YYYY]" goal="[tráfico/leads/marca]" slots=[número]

**Revisión de rendimiento:**
/performance-review period=90d published=published/[YYYY-MM]/

## Convenciones para los briefs

- Ejecutar siempre /content-brief antes de tocar drafts/ — nunca redactar sin un brief
- El análisis de brechas competitivas debe referenciar al menos 3 URLs posicionadas
- Cada brief debe incluir un plan de enlazado interno (3 salientes, 3 entrantes)
- Dificultad de palabra clave superior a 70: proceder solo si la autoridad de dominio lo respalda

## Convenciones SEO

- Títulos: 55-60 caracteres, palabra clave principal incluida, palabra de impacto incluida
- Meta descripciones: 150-158 caracteres, palabra clave + propuesta de valor + CTA suave
- Slugs de URL: 2-4 palabras, minúsculas con guiones, palabra clave principal, sin palabras vacías
- Mínimo de enlaces internos por artículo: 4 (2 contextuales + 2 lecturas relacionadas)
- Todas las imágenes: texto alternativo descriptivo y relevante para la palabra clave donde resulte natural
- Schema: schema Article en cada artículo; schema FAQ cuando los H2 son preguntas

## Flujo de trabajo de publicación

1. Brief aprobado en briefs/<slug>/brief.md
2. Borrador escrito en drafts/<slug>.md
3. /seo-audit ejecutado y todos los ítems de la checklist resueltos
4. Publicado en el CMS (HubSpot o WordPress)
5. Artículo archivado en published/<YYYY-MM>/<slug>/post.md
6. /social-copy ejecutado; publicaciones programadas en Buffer
7. Estado de editorial-calendar.md actualizado a "publicado"
8. Métricas registradas en published/<YYYY-MM>/<slug>/metrics.md a los 30, 60 y 90 días
```

## Servidores MCP

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

## Hooks recomendados

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_OUTPUT_FILE_PATH\"; if [[ \"$FILE\" == */drafts/*.md ]]; then echo \"[hook] Borrador guardado: $FILE — ejecutar /seo-audit antes de publicar\"; fi'"
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
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$FILE\" == */published/*.md ]]; then echo \"[hook] Escribiendo en published/ — asegurarse de que seo-audit se haya ejecutado y de que el brief exista en briefs/\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'cd \"${CLAUDE_PROJECT_DIR}\" && UNPUBLISHED=$(find drafts/ -name \"*.md\" -newer editorial-calendar.md 2>/dev/null | wc -l | tr -d \" \"); [ \"$UNPUBLISHED\" -gt 0 ] && echo \"[aviso] $UNPUBLISHED borrador(es) modificado(s) desde la última actualización del calendario — actualizar editorial-calendar.md\" || true'"
          }
        ]
      }
    ]
  }
}
```

## Skills a instalar

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

## Relacionado

- [Guía: Claude para Content Marketers](../guides/for-content-marketer.md)
- [Flujo de trabajo: Creación de contenido de principio a fin](../workflows/content-creation.md)
