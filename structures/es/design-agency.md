# Agencia de Diseño / Estudio de Diseño — Estructura de Proyecto

> Para agencias de diseño que gestionan proyectos de clientes en branding, UX y diseño digital — desde la recepción del brief y la creación de moodboards hasta la producción de diseño, la revisión asíncrona, la entrega al cliente y la facturación del proyecto — en un único espacio de trabajo de Claude Code.

## Stack

- **Diseño + prototipado + entrega:** Figma (componentes, auto-layout, modo dev, flujos de prototipo, tokens de diseño, Figma Sites)
- **Gestión de proyectos + briefs:** Notion (bases de datos de clientes, wikis de proyecto, briefs creativos, notas de reunión)
- **Seguimiento de tareas:** Linear (gestión de tareas a nivel de incidencia, ciclos de sprint, triage de prioridades) o Asana (cronogramas de proyecto, dependencias de tareas, tableros visibles para clientes)
- **Registro de tiempo:** Harvest (registro de tiempo por proyecto, consumo de presupuesto, informes de capacidad del equipo)
- **Facturación:** FreshBooks (facturas de clientes, facturación por retención, seguimiento de gastos, recordatorios de pago)
- **Revisión de vídeo asíncrona:** Loom (presentaciones de conceptos, explicaciones de revisiones, guías de entrega para desarrolladores)
- **Comunicación:** Slack (#client-<nombre> por cliente, #design-production, #new-business, #ops)
- **Docs + unidades compartidas:** Google Workspace (Docs para entregables, Slides para presentaciones, Drive para almacenamiento de assets)

## Árbol de directorios

```
design-agency/
├── .claude/
│   ├── CLAUDE.md                                        # Instrucciones del espacio de trabajo para Claude Code
│   ├── settings.json                                    # Servidores MCP, hooks, permisos
│   └── commands/
│       ├── new-client.md                                # /new-client — crear la estructura completa del directorio de cliente desde _template
│       ├── creative-brief.md                            # /creative-brief — generar un brief creativo estructurado a partir de las notas de intake
│       ├── design-review.md                             # /design-review — producir agenda + marco de feedback para la sesión de revisión de diseño
│       ├── handoff.md                                   # /handoff — generar checklist de entrega al desarrollador y guía de anotación de Figma
│       ├── revision-log.md                              # /revision-log — registrar una ronda de revisión con alcance, justificación y número de ronda
│       ├── proposal.md                                  # /proposal — redactar propuesta de proyecto para nuevo negocio a partir de notas del prospecto
│       ├── ux-audit.md                                  # /ux-audit — realizar auditoría heurística UX estructurada contra un brief o enlace de Figma
│       └── invoice-summary.md                          # /invoice-summary — resumir horas de Harvest para la preparación de facturas en FreshBooks
├── clients/
│   ├── _template/                                       # Plantilla maestra — copiar a clients/<client-slug>/ en el intake
│   │   ├── brief.md                                     # Brief creativo del cliente — objetivos, audiencia, entregables, restricciones, cronograma
│   │   ├── contract.md                                  # Contrato de proyecto o acuerdo de retención con alcance y condiciones de pago
│   │   ├── brand-assets/
│   │   │   ├── brand-guidelines.md                      # Colores, tipografía, reglas de logo, tono de comunicación
│   │   │   ├── logo/                                    # Archivos de logo aprobados: SVG, PNG, variantes oscuro/claro
│   │   │   ├── fonts/                                   # Archivos de fuentes con licencia o especificación de Google Fonts
│   │   │   └── photography/                             # Guía de estilo fotográfico aprobado e imágenes hero validadas
│   │   ├── design-files-links.md                        # Enlaces a todos los archivos de Figma: archivo principal, biblioteca de componentes, prototipo
│   │   ├── feedback-log.md                              # Registro con marca de tiempo de todo el feedback del cliente por ronda
│   │   ├── deliverables/
│   │   │   ├── _handoff-checklist.md                    # Checklist de finalización antes de entregar cualquier entregable
│   │   │   └── exports/                                 # Assets exportados finales: PNG, SVG, PDF, ZIP
│   │   └── invoice-log.md                               # Historial de facturas: fecha, importe, alcance, estado (pagado/pendiente)
│   ├── nova-brand-co/
│   │   ├── brief.md
│   │   ├── contract.md
│   │   ├── brand-assets/
│   │   │   ├── brand-guidelines.md
│   │   │   ├── logo/
│   │   │   │   ├── nova-logo-primary.svg
│   │   │   │   ├── nova-logo-dark.svg
│   │   │   │   └── nova-logo-mark.png
│   │   │   ├── fonts/
│   │   │   │   └── font-spec.md
│   │   │   └── photography/
│   │   │       └── style-guide.md
│   │   ├── design-files-links.md
│   │   ├── feedback-log.md
│   │   ├── deliverables/
│   │   │   ├── _handoff-checklist.md
│   │   │   └── exports/
│   │   │       ├── nova-brand-kit-v1.zip
│   │   │       └── nova-logo-package.zip
│   │   └── invoice-log.md
│   └── meridian-app/
│       ├── brief.md
│       ├── contract.md
│       ├── brand-assets/
│       │   ├── brand-guidelines.md
│       │   ├── logo/
│       │   └── fonts/
│       ├── design-files-links.md
│       ├── feedback-log.md
│       ├── deliverables/
│       │   ├── _handoff-checklist.md
│       │   └── exports/
│       └── invoice-log.md
├── projects/
│   ├── nova-brand-identity/                             # Proyecto activo — un directorio por proyecto nombrado
│   │   ├── brief.md                                     # Brief específico del proyecto (puede diferir del brief a nivel de cliente)
│   │   ├── moodboard.md                                 # Referencias visuales, enlaces de inspiración, notas de dirección estilística
│   │   ├── concepts/
│   │   │   ├── concept-a-modern-minimal/
│   │   │   │   ├── notes.md                             # Justificación del diseño y puntos de presentación
│   │   │   │   └── figma-link.md                        # Enlace al frame o página de Figma para este concepto
│   │   │   └── concept-b-bold-expressive/
│   │   │       ├── notes.md
│   │   │       └── figma-link.md
│   │   ├── revisions/
│   │   │   ├── round-1/
│   │   │   │   ├── client-feedback.md                   # Feedback del cliente literal o resumido
│   │   │   │   ├── revision-notes.md                    # Notas del diseñador sobre qué cambió y por qué
│   │   │   │   └── figma-link.md
│   │   │   └── round-2/
│   │   │       ├── client-feedback.md
│   │   │       ├── revision-notes.md
│   │   │       └── figma-link.md
│   │   └── final/
│   │       ├── approved-concept.md                      # Registro del concepto aprobado y fecha de aprobación
│   │       ├── handoff-notes.md                         # Notas para el desarrollador o cliente para la entrega final
│   │       └── figma-link.md
│   └── meridian-app-ux/
│       ├── brief.md
│       ├── moodboard.md
│       ├── concepts/
│       │   └── concept-a-card-based-nav/
│       │       ├── notes.md
│       │       └── figma-link.md
│       ├── revisions/
│       │   └── round-1/
│       │       ├── client-feedback.md
│       │       ├── revision-notes.md
│       │       └── figma-link.md
│       └── final/
│           ├── approved-concept.md
│           ├── handoff-notes.md
│           └── figma-link.md
├── templates/
│   ├── creative-brief.md                                # Brief creativo estándar: objetivos, audiencia, entregables, cronograma, restricciones
│   ├── project-proposal.md                              # Propuesta de nuevo negocio: situación, enfoque, equipo, inversión, cronograma
│   ├── design-review-agenda.md                          # Agenda de la reunión de revisión de diseño con preguntas de feedback estructuradas
│   ├── handoff-checklist.md                             # Checklist previa a la entrega: limpieza de Figma, exportaciones, anotaciones, modo dev
│   └── revision-policy.md                               # Política de revisiones del estudio: qué cuenta como revisión, límites de rondas, fuera de alcance
├── new-business/
│   ├── prospect-tracker.md                              # Pipeline de prospectos: empresa, contacto, etapa, último contacto, próxima acción
│   ├── case-studies/
│   │   ├── nova-brand-identity.md                       # Caso de estudio estructurado: reto, enfoque, resultado, testimonio
│   │   └── meridian-app-ux.md
│   ├── capabilities-deck.md                             # Presentación de capacidades de la agencia: servicios, proceso, equipo, trabajos seleccionados
│   └── rate-card.md                                     # Tarifas por hora, mínimos de proyecto, niveles de retención, recargos por urgencia
└── ops/
    ├── onboarding-sop.md                                # Onboarding de nuevo cliente: intake, lanzamiento, configuración de Figma, canal de Slack, Harvest
    ├── revision-policy.md                               # Versión interna de la política de revisiones (incluye ruta de escalación)
    ├── brand-guidelines-for-agency.md                   # Marca propia de la agencia: logo, colores, tipografía, tono para pitches y documentos
    ├── new-hire-checklist.md                            # Onboarding de diseñador: acceso a herramientas, organización de Figma, Slack, Harvest, nomenclatura de archivos
    └── offboarding-sop.md                               # Offboarding de cliente: entrega final de assets, revocación de accesos, archivado
```

## Archivos clave explicados

| Ruta | Propósito |
|---|---|
| `.claude/commands/new-client.md` | Comando slash que copia `clients/_template/` a `clients/<slug>/`, pre-rellena `brief.md` con las respuestas del intake y crea un borrador de `contract.md` e `invoice-log.md` |
| `.claude/commands/creative-brief.md` | Toma el slug del cliente, el tipo de proyecto y las notas de intake como entrada; produce un brief creativo completamente estructurado, alineado con las guidelines de marca y los objetivos de negocio del cliente |
| `.claude/commands/handoff.md` | Genera una checklist de entrega en modo dev de Figma y una guía de anotación desde `templates/handoff-checklist.md`; enlaza al `design-files-links.md` del cliente |
| `.claude/commands/revision-log.md` | Registra una nueva ronda de revisión en `projects/<project>/revisions/round-N/` con feedback del cliente, notas del diseñador, número de ronda e indicador de fuera de alcance si aplica |
| `clients/_template/` | Directorio de estructura maestra — copiar esta carpeta completa al incorporar un nuevo cliente para garantizar que todos los archivos y carpetas estén presentes antes del lanzamiento |
| `clients/<slug>/feedback-log.md` | Registro cronológico de todo el feedback del cliente en todas las rondas; utilizado para rastrear el historial de revisiones y respaldar conversaciones sobre cambios de alcance |
| `projects/<project>/revisions/` | Un subdirectorio por ronda de revisión, vinculando el feedback del cliente y las notas del diseñador con el enlace de Figma de esa ronda — permite un seguimiento claro de versiones |
| `templates/revision-policy.md` | Fuente de verdad sobre qué constituye una revisión, cuántas rondas están incluidas y qué desencadena una tarifa fuera de alcance; referenciada en todas las propuestas y contratos |
| `ops/onboarding-sop.md` | Checklist paso a paso para incorporar a un nuevo cliente: desde el intake hasta el lanzamiento y la configuración de herramientas hasta el primer entregable |
| `new-business/rate-card.md` | Precios actuales para todos los niveles de servicio; referenciada por `/proposal` al calcular la inversión del proyecto |

## Scaffold rápido

```bash
# Crear la raíz del espacio de trabajo
mkdir -p design-agency && cd design-agency

# Configuración de Claude Code
mkdir -p .claude/commands

# _template de cliente (profundidad completa)
mkdir -p clients/_template/brand-assets/logo
mkdir -p clients/_template/brand-assets/fonts
mkdir -p clients/_template/brand-assets/photography
mkdir -p clients/_template/deliverables/exports

# Cliente de ejemplo: nova-brand-co
mkdir -p clients/nova-brand-co/brand-assets/logo
mkdir -p clients/nova-brand-co/brand-assets/fonts
mkdir -p clients/nova-brand-co/brand-assets/photography
mkdir -p clients/nova-brand-co/deliverables/exports

# Cliente de ejemplo: meridian-app
mkdir -p clients/meridian-app/brand-assets/logo
mkdir -p clients/meridian-app/brand-assets/fonts
mkdir -p clients/meridian-app/deliverables/exports

# Proyectos activos
mkdir -p projects/nova-brand-identity/concepts/concept-a-modern-minimal
mkdir -p projects/nova-brand-identity/concepts/concept-b-bold-expressive
mkdir -p projects/nova-brand-identity/revisions/round-1
mkdir -p projects/nova-brand-identity/revisions/round-2
mkdir -p projects/nova-brand-identity/final

mkdir -p projects/meridian-app-ux/concepts/concept-a-card-based-nav
mkdir -p projects/meridian-app-ux/revisions/round-1
mkdir -p projects/meridian-app-ux/final

# Plantillas
mkdir -p templates

# Nuevo negocio
mkdir -p new-business/case-studies

# Operaciones
mkdir -p ops

# Inicializar archivos de configuración de Claude
touch .claude/CLAUDE.md
touch .claude/settings.json

# Crear archivos de marcador de posición en _template
touch clients/_template/brief.md
touch clients/_template/contract.md
touch clients/_template/brand-assets/brand-guidelines.md
touch clients/_template/design-files-links.md
touch clients/_template/feedback-log.md
touch clients/_template/deliverables/_handoff-checklist.md
touch clients/_template/invoice-log.md

# Crear archivos de plantilla
touch templates/creative-brief.md
touch templates/project-proposal.md
touch templates/design-review-agenda.md
touch templates/handoff-checklist.md
touch templates/revision-policy.md

# Archivos de nuevo negocio
touch new-business/prospect-tracker.md
touch new-business/capabilities-deck.md
touch new-business/rate-card.md

# Archivos de operaciones
touch ops/onboarding-sop.md
touch ops/revision-policy.md
touch ops/brand-guidelines-for-agency.md
touch ops/new-hire-checklist.md
touch ops/offboarding-sop.md

# Instalar skills relevantes
npx uitkit add skill product/ux-audit
npx uitkit add skill product/persona-builder
npx uitkit add skill marketing/brand-guidelines
npx uitkit add skill productivity/creative-brief
npx uitkit add skill productivity/stakeholder-comms
npx uitkit add skill productivity/process-mapper
npx uitkit add skill productivity/vendor-evaluator
npx uitkit add skill productivity/exec-briefing
npx uitkit add skill data-ml/stakeholder-report

# Instalar comandos slash
npx uitkit add command new-client
npx uitkit add command creative-brief
npx uitkit add command design-review
npx uitkit add command handoff
npx uitkit add command revision-log
npx uitkit add command proposal
npx uitkit add command ux-audit
npx uitkit add command invoice-summary

echo "Espacio de trabajo de agencia de diseño listo."
```

## Plantilla CLAUDE.md

```markdown
# Agencia de Diseño — Instrucciones de Claude

## Qué es esto

Este espacio de trabajo gestiona el ciclo de vida completo de los clientes de un estudio de
diseño: intake, brief creativo, desarrollo de conceptos, seguimiento de revisiones, revisión
asíncrona (Loom), entrega al desarrollador (modo dev de Figma) y facturación de proyectos
(Harvest + FreshBooks). Cada cliente tiene un directorio aislado bajo clients/. Los proyectos
activos están bajo projects/. Todas las plantillas de documentos están en templates/.
La documentación de operaciones está en ops/.

## Stack

- Diseño: Figma (herramienta principal de diseño, bibliotecas de componentes, prototipos, entrega en modo dev)
- Gestión de proyectos: Notion (wikis de proyecto, briefs creativos, bases de datos de clientes, notas de reunión)
- Seguimiento de tareas: Linear (incidencias de sprint, triage de bugs, tareas de QA de diseño)
- Registro de tiempo: Harvest (por proyecto, facturable vs. no facturable, alertas de consumo de presupuesto)
- Facturación: FreshBooks (facturas de clientes, facturación por retención, seguimiento de gastos)
- Revisión asíncrona: Loom (presentaciones de conceptos, explicaciones de revisiones, guías de entrega)
- Comunicación: Slack (#client-<slug> por cliente, #design-production, #new-business, #ops)
- Docs + assets: Google Workspace (Slides para presentaciones, Drive para entrega final de assets)

## Convenciones de directorios

- clients/<client-slug>/ — todos los archivos a nivel de cliente; nunca mezclar assets entre carpetas de clientes
- clients/<client-slug>/brand-assets/ — fuente de verdad para logos, colores y fuentes aprobados
- clients/<client-slug>/feedback-log.md — añadir cada ronda de feedback aquí con fecha y número de ronda
- clients/<client-slug>/invoice-log.md — añadir cada factura con fecha, importe, alcance, estado
- projects/<project-name>/ — un directorio por entregable de proyecto nombrado (no por cliente)
- projects/<project>/revisions/round-N/ — un subdirectorio por ronda de revisión
- projects/<project>/final/ — rellenar solo después de la aprobación del cliente; no poner borradores aquí
- templates/ — estructuras de documentos canónicas; siempre copiar una plantilla antes de redactar
- new-business/ — solo seguimiento de prospectos, propuestas y casos de estudio; nada de trabajo activo de clientes aquí

## Incorporación de un nuevo cliente

1. Copiar clients/_template/ a clients/<new-client-slug>/:
   cp -r clients/_template clients/<new-client-slug>
2. Ejecutar /new-client client="<Nombre>" slug="<slug>" project-type="<branding|ux|digital>"
3. Completar clients/<slug>/brief.md desde la llamada de intake antes de la reunión de lanzamiento
4. Tras el lanzamiento, rellenar clients/<slug>/brand-assets/brand-guidelines.md
5. Redactar contrato usando la sección de alcance de templates/project-proposal.md; guardar en clients/<slug>/contract.md
6. Añadir los enlaces de archivos de Figma del cliente en clients/<slug>/design-files-links.md inmediatamente al crear el proyecto
7. Crear proyecto en Harvest y registrar el ID del proyecto en clients/<slug>/brief.md
8. Abrir el registro de cliente en FreshBooks y vincular a clients/<slug>/invoice-log.md

## Inicio de un nuevo proyecto

1. Crear projects/<project-name>/ desde cero o copiar una estructura de proyecto existente
2. Ejecutar /creative-brief client="<slug>" project="<project-name>" type="<branding|ux|digital>"
3. Rellenar projects/<project-name>/moodboard.md con enlaces a frames de Figma y URLs de referencia
4. Construir conceptos bajo projects/<project-name>/concepts/concept-<letra>-<etiqueta-corta>/
5. Cada directorio de concepto necesita: notes.md (justificación + puntos de presentación) y figma-link.md

## Flujo de trabajo de revisión de diseño

1. Ejecutar /design-review project="<project-name>" round="<N>" concepts="<lista>"
2. Usar la agenda generada desde templates/design-review-agenda.md para la presentación en Loom
3. Grabar el vídeo de Loom y compartir el enlace en Slack #client-<slug>
4. Tras la llamada o la revisión asíncrona, añadir el feedback literalmente en clients/<slug>/feedback-log.md
5. Ejecutar /revision-log project="<project-name>" round="<N>" para abrir el directorio de revisión

## Gestión de revisiones

- Cada ronda tiene su propio directorio: projects/<project>/revisions/round-N/
- Registrar el feedback del cliente en round-N/client-feedback.md antes de realizar ningún cambio
- Tras las revisiones, documentar qué cambió en round-N/revision-notes.md
- Consultar templates/revision-policy.md (y ops/revision-policy.md) antes de iniciar la ronda 3+
- Solicitudes fuera de alcance: debatir el alcance antes de registrar tiempo; redactar una enmienda si es necesario

## Flujo de trabajo de entrega

1. Ejecutar /handoff project="<project-name>" client="<slug>" para generar la checklist de entrega
2. Completar cada elemento de deliverables/_handoff-checklist.md antes de marcar la entrega como finalizada
3. Entrega en Figma: activar el modo dev en todos los frames finales, nombrar todas las capas, añadir anotaciones redline
4. Exportar assets finales a clients/<slug>/deliverables/exports/ (PNG 1x/2x, SVG, PDF)
5. Grabar una presentación en Loom del archivo de Figma para el desarrollador o cliente receptor
6. Compartir el enlace de la carpeta de Google Drive para los assets; confirmar el acceso antes de cerrar el proyecto

## Convenciones de facturación

- Registrar el tiempo en Harvest inmediatamente después de cada sesión de trabajo — nunca acumular al final de la semana
- Códigos facturables: discovery, strategy, design-production, revisions, handoff, account-management
- No facturable: crítica interna, configuración de herramientas, administración, trabajo de pitch (a menos que se gane la propuesta)
- Ejecutar /invoice-summary client="<slug>" month="<AAAA-MM>" antes de generar la factura en FreshBooks
- Facturar al completar un hito del proyecto o el día 1 del mes para clientes con retención
- Añadir cada factura enviada en clients/<slug>/invoice-log.md con fecha, importe y estado

## Convenciones de nomenclatura de archivos de Figma

- Archivo principal: [Nombre Cliente] — [Nombre Proyecto] — Design
- Biblioteca de componentes: [Nombre Cliente] — Component Library
- Prototipo: [Nombre Cliente] — [Nombre Proyecto] — Prototype
- Archivo archivado: [Nombre Cliente] — [Nombre Proyecto] — ARCHIVED AAAA-MM
- Registrar siempre todos los enlaces de archivos en clients/<slug>/design-files-links.md al crearlos
```

## Servidores MCP

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/${USER}/design-agency"
      ]
    },
    "notion": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-notion"],
      "env": {
        "NOTION_API_TOKEN": "${NOTION_API_TOKEN}"
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
    "google-drive": {
      "command": "npx",
      "args": ["-y", "@google-labs/google-drive-mcp"],
      "env": {
        "GOOGLE_CLIENT_ID": "${GOOGLE_CLIENT_ID}",
        "GOOGLE_CLIENT_SECRET": "${GOOGLE_CLIENT_SECRET}",
        "GOOGLE_REFRESH_TOKEN": "${GOOGLE_REFRESH_TOKEN}"
      }
    },
    "linear": {
      "command": "npx",
      "args": ["-y", "@linear/mcp-server"],
      "env": {
        "LINEAR_API_KEY": "${LINEAR_API_KEY}"
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
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_OUTPUT_FILE_PATH\"; if [[ \"$FILE\" == */projects/*/revisions/*/client-feedback.md ]]; then echo \"[hook] Revision feedback logged: $FILE — run /revision-log to open designer notes and update feedback-log.md\"; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'FILE=\"$CLAUDE_TOOL_OUTPUT_FILE_PATH\"; if [[ \"$FILE\" == */projects/*/final/approved-concept.md ]]; then echo \"[hook] Concept approved: $FILE — run /handoff to generate the developer handoff checklist\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'cd \"${CLAUDE_PROJECT_DIR}\" && MISSING=$(find clients/ -mindepth 1 -maxdepth 1 -type d ! -name _template | while read C; do [ ! -f \"$C/design-files-links.md\" ] || grep -q \"figma.com\" \"$C/design-files-links.md\" 2>/dev/null || echo \"$C\"; done | wc -l | tr -d \" \"); [ \"$MISSING\" -gt 0 ] && echo \"[reminder] $MISSING client(s) missing Figma links in design-files-links.md\" || true'"
          }
        ]
      }
    ]
  }
}
```

## Skills a instalar

```bash
npx uitkit add skill product/ux-audit
npx uitkit add skill product/persona-builder
npx uitkit add skill marketing/brand-guidelines
npx uitkit add skill productivity/stakeholder-comms
npx uitkit add skill productivity/process-mapper
npx uitkit add skill productivity/exec-briefing
npx uitkit add skill productivity/vendor-evaluator
npx uitkit add skill data-ml/stakeholder-report
```

## Relacionados

- [Guía: Claude para diseñadores UX](../guides/for-ux-designer.md)
- [Workflow: Del lanzamiento del proyecto cliente a la entrega](../workflows/design-project-lifecycle.md)
- [Workflow: Ciclo de revisión de diseño](../workflows/design-review-cycle.md)
