# Espacio de trabajo del Customer Success Manager — Estructura del proyecto

> Un espacio de trabajo de Claude Code para CSMs que gestionan una cartera de cuentas: onboarding, seguimiento del estado de salud, presentación de QBR, identificación de oportunidades de expansión, respuesta al riesgo de churn y seguimiento de renovaciones — todo impulsado por comandos slash y contexto a nivel de cuenta.

## Stack

- **Gainsight** (plataforma CS) o **ChurnZero** — puntuaciones de salud, planes de éxito, playbooks automatizados
- **Salesforce** o **HubSpot** — CRM, pipeline de oportunidades y renovaciones, jerarquía de cuentas
- **Zendesk** o **Intercom** — volumen de tickets de soporte y señales de sentimiento
- **Zoom** — llamadas con clientes; grabaciones y transcripciones integradas en las notas de cuenta
- **Slack** — coordinación interna del equipo CS y canales Slack Connect con clientes
- **Notion** — playbooks de CS, plantillas de plan de acción mutuo, runbooks de onboarding

## Árbol de directorios

```
cs-workspace/
├── .claude/
│   ├── CLAUDE.md                          # instrucciones del espacio de trabajo para Claude Code
│   ├── settings.json                      # servidores MCP, hooks, permisos
│   └── commands/
│       ├── onboarding-plan.md             # /onboarding-plan <customer-name> — plan 30/60/90 días
│       ├── qbr-prep.md                    # /qbr-prep — construye el esquema del QBR y los puntos clave
│       ├── health-check.md                # /health-check — lee datos de salud, identifica cuentas en riesgo
│       ├── expansion-brief.md             # /expansion-brief — identifica señales de upsell por cuenta
│       ├── churn-risk.md                  # /churn-risk — análisis de señales de churn con playbook de respuesta
│       ├── renewal-prep.md                # /renewal-prep — documento de preparación para renovación con contexto comercial
│       └── nps-follow-up.md              # /nps-follow-up — redacta emails de seguimiento por banda de puntuación NPS
├── customers/
│   ├── _template/                         # copiar esta carpeta al hacer onboarding de una nueva cuenta
│   │   ├── health-data.md                 # registro de puntuación de salud: señales, puntuaciones, nivel (Green/Yellow/Red)
│   │   ├── meeting-notes/
│   │   │   └── YYYY-MM-DD-kickoff.md      # un archivo por reunión, nombrado por fecha y tipo
│   │   ├── success-plan.md                # plan de éxito mutuo: objetivos, hitos, responsables, fechas
│   │   └── renewal-tracker.md             # fecha de renovación, ARR, historial de expansión, estado de renovación
│   ├── acme-corp/
│   │   ├── health-data.md                 # nivel de salud actual: Yellow; última actualización: 2026-05-28
│   │   ├── meeting-notes/
│   │   │   ├── 2026-01-15-kickoff.md
│   │   │   ├── 2026-03-10-qbr-q1.md
│   │   │   └── 2026-05-20-expansion-call.md
│   │   ├── success-plan.md                # objetivos acordados: 80% de activación de asientos para Q2, 3 integraciones activas
│   │   └── renewal-tracker.md             # renovación el 2026-09-01, $48K ARR, 1 oportunidad de expansión abierta
│   ├── brightpath-inc/
│   │   ├── health-data.md                 # nivel de salud actual: Red; riesgo de churn: alto
│   │   ├── meeting-notes/
│   │   │   ├── 2026-02-03-kickoff.md
│   │   │   └── 2026-04-18-save-call.md
│   │   ├── success-plan.md
│   │   └── renewal-tracker.md             # renovación el 2026-07-15, $12K ARR, en riesgo
│   └── novex-solutions/
│       ├── health-data.md                 # nivel de salud actual: Green; candidato a expansión
│       ├── meeting-notes/
│       │   ├── 2026-01-22-kickoff.md
│       │   ├── 2026-04-05-qbr-q1.md
│       │   └── 2026-05-30-expansion-brief.md
│       ├── success-plan.md
│       └── renewal-tracker.md             # renovación el 2026-12-01, $72K ARR, expansión en curso
├── playbooks/
│   ├── onboarding.md                      # runbook completo de onboarding 30/60/90 días con disparadores de escalada
│   ├── expansion.md                       # proceso de upsell: señales, timing, guiones de conversación, manejo de objeciones
│   ├── churn-save.md                      # playbook de retención por nivel de señal de churn y días hasta la renovación
│   └── qbr-delivery.md                   # guía de facilitación del QBR: agenda, reglas, cadencia de seguimiento
├── templates/
│   ├── success-plan-template.md           # plan de éxito mutuo: objetivos, KPI, hitos, responsables
│   ├── mutual-action-plan.md              # MAP para onboarding: tareas del cliente y del CSM en paralelo
│   ├── ebr-deck-outline.md               # estructura del deck para Executive Business Review (6 diapositivas)
│   └── renewal-proposal.md               # propuesta de renovación: resumen de valor, precios, próximos pasos
└── metrics/
    ├── book-health-dashboard.md           # todas las cuentas: nombre, ARR, nivel, fecha de renovación, último contacto
    └── renewal-pipeline.md               # renovaciones en los próximos 90/60/30 días con puntuación de preparación
```

## Archivos clave explicados

| Ruta | Propósito |
|---|---|
| `.claude/commands/onboarding-plan.md` | Comando slash que toma `$ARGUMENTS` como nombre del cliente, lee la carpeta de esa cuenta y genera un plan de onboarding 30/60/90 días personalizado con hitos específicos |
| `.claude/commands/health-check.md` | Lee todos los archivos `customers/*/health-data.md` y muestra las cuentas por nivel — genera una lista de acciones priorizadas con los próximos pasos sugeridos por cada cuenta en riesgo |
| `.claude/commands/churn-risk.md` | Cruza datos de salud, días desde el último punto de contacto, fecha de renovación y señales de tickets de soporte para producir un resumen de riesgo de churn con playbook de respuesta |
| `.claude/commands/renewal-prep.md` | Lee el `renewal-tracker.md`, `success-plan.md` y notas de reunión de la cuenta objetivo para construir un documento de preparación para renovación con contexto comercial y riesgos abiertos |
| `customers/_template/` | Estructura de carpeta canónica para copiar al hacer onboarding de cualquier nueva cuenta — garantiza consistencia en toda la cartera |
| `metrics/book-health-dashboard.md` | Vista unificada de todas las cuentas con ARR, nivel de salud, fecha de renovación y último punto de contacto del CSM — la fuente de verdad para la revisión semanal del equipo CS |
| `playbooks/churn-save.md` | Playbook de retención segmentado por tipo de señal (caída de uso, cambio de sponsor ejecutivo, factura vencida) y días hasta la renovación, con guiones específicos y rutas de escalada |
| `templates/ebr-deck-outline.md` | Estructura del deck Executive Business Review: resumen del negocio, valor entregado, métricas vs. objetivos, hoja de ruta, puntos abiertos, próximos pasos — listo para completar por cuenta |

## Scaffold rápido

```bash
# Crear la raíz del espacio de trabajo
mkdir -p cs-workspace/.claude/commands

# Crear la plantilla de cuenta de cliente
mkdir -p cs-workspace/customers/_template/meeting-notes

# Crear directorios de playbooks, templates y métricas
mkdir -p cs-workspace/playbooks
mkdir -p cs-workspace/templates
mkdir -p cs-workspace/metrics

# Crear los archivos de comandos slash
touch cs-workspace/.claude/commands/onboarding-plan.md
touch cs-workspace/.claude/commands/qbr-prep.md
touch cs-workspace/.claude/commands/health-check.md
touch cs-workspace/.claude/commands/expansion-brief.md
touch cs-workspace/.claude/commands/churn-risk.md
touch cs-workspace/.claude/commands/renewal-prep.md
touch cs-workspace/.claude/commands/nps-follow-up.md

# Crear los archivos de la plantilla de cliente
touch cs-workspace/customers/_template/health-data.md
touch cs-workspace/customers/_template/success-plan.md
touch cs-workspace/customers/_template/renewal-tracker.md

# Crear los archivos de métricas
touch cs-workspace/metrics/book-health-dashboard.md
touch cs-workspace/metrics/renewal-pipeline.md

# Crear los archivos de playbook
touch cs-workspace/playbooks/onboarding.md
touch cs-workspace/playbooks/expansion.md
touch cs-workspace/playbooks/churn-save.md
touch cs-workspace/playbooks/qbr-delivery.md

# Crear los archivos de plantillas
touch cs-workspace/templates/success-plan-template.md
touch cs-workspace/templates/mutual-action-plan.md
touch cs-workspace/templates/ebr-deck-outline.md
touch cs-workspace/templates/renewal-proposal.md

# Instalar skills de CS
npx claudient add skill gtm/customer-success
npx claudient add skill gtm/mutual-success-plan
npx claudient add skill gtm/qbr-builder
npx claudient add skill gtm/health-score-analyzer
npx claudient add skill gtm/expansion-playbook
npx claudient add skill gtm/churn-prevention

# Crear cuenta de ejemplo a partir de la plantilla
cp -r cs-workspace/customers/_template cs-workspace/customers/acme-corp
```

## Plantilla CLAUDE.md

```markdown
# CS Workspace — Instrucciones Claude Code

## Qué es este espacio de trabajo

Este es un espacio de trabajo para Customer Success Manager. Contiene datos de cuentas, señales
de salud, playbooks y plantillas para gestionar una cartera de clientes. Claude Code opera aquí
como analista y redactor de CS — leyendo el contexto de las cuentas para generar entregables
personalizados.

Todos los datos de cuenta son locales y privados. Nunca incluir datos específicos de cuenta en
salidas enviadas fuera de este espacio de trabajo.

## Stack

- Plataforma CS: Gainsight (o ChurnZero) — puntuaciones de salud, planes de éxito, automatizaciones
- CRM: HubSpot (o Salesforce) — pipeline de renovaciones, jerarquía de cuentas, ARR
- Soporte: Zendesk — volumen de tickets y señales de sentimiento integradas en los archivos health-data.md
- Llamadas: Zoom — transcripciones de reuniones almacenadas en customers/<account>/meeting-notes/
- Colaboración: Slack, Notion

## Tareas comunes y comandos exactos

Hacer onboarding de un nuevo cliente:
  /onboarding-plan <customer-name>
  → Lee customers/<customer-name>/ y genera un plan 30/60/90 días

Ejecutar revisión de salud de toda la cartera:
  /health-check
  → Lee todos los customers/*/health-data.md y genera una lista de acciones priorizadas por nivel

Preparar un QBR:
  /qbr-prep
  → Solicita el nombre del cliente, lee su carpeta, construye la agenda del QBR y los puntos clave

Identificar oportunidades de expansión:
  /expansion-brief
  → Lee datos de salud y notas de reunión; identifica señales de expansión por cuenta

Evaluar el riesgo de churn:
  /churn-risk
  → Cruza nivel de salud, fecha de renovación, último punto de contacto y señales de soporte

Preparar una renovación:
  /renewal-prep
  → Lee renewal-tracker.md y success-plan.md; genera documento de preparación para renovación

Hacer seguimiento de respuestas NPS:
  /nps-follow-up
  → Solicita puntuación NPS y verbatim; redacta email de seguimiento según la banda de puntuación

## Convenciones del espacio de trabajo

- Una carpeta por cuenta bajo customers/ — siempre creada a partir de _template/
- Los archivos de datos de salud usan tres niveles: Green / Yellow / Red — actualizar tras cada llamada
- Las notas de reunión se nombran YYYY-MM-DD-<type>.md (kickoff, qbr, expansion-call, save-call)
- El renewal tracker se actualiza tras cada conversación comercial
- El book-health-dashboard.md en metrics/ es la fuente de verdad para la revisión semanal del equipo

## Niveles de salud de las cuentas

Green (puntuación 7-10): punto de contacto trimestral, buscar señales de expansión
Yellow (puntuación 4-6): seguimiento mensual, identificar y eliminar bloqueos
Red (puntuación 1-3): interacción semanal, escalar al responsable de CS si no hay respuesta en 5 días

## Prohibiciones

- No generar contenido que contradiga los criterios de éxito del cliente documentados
- No proponer expansión antes de que un cliente haya alcanzado el nivel de salud Green
- No usar plantillas de QBR genéricas — siempre leer primero la carpeta de la cuenta
- No subir datos de customers/ a ningún repositorio git remoto
```

## Servidores MCP

```json
{
  "mcpServers": {
    "hubspot": {
      "command": "npx",
      "args": ["-y", "@hubspot/mcp-server"],
      "env": {
        "HUBSPOT_ACCESS_TOKEN": "${HUBSPOT_ACCESS_TOKEN}"
      }
    },
    "salesforce": {
      "command": "npx",
      "args": ["-y", "@salesforce/mcp-server"],
      "env": {
        "SF_USERNAME": "${SF_USERNAME}",
        "SF_PASSWORD": "${SF_PASSWORD}",
        "SF_SECURITY_TOKEN": "${SF_SECURITY_TOKEN}",
        "SF_LOGIN_URL": "https://login.salesforce.com"
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
        "/Users/$USER/cs-workspace/customers",
        "/Users/$USER/cs-workspace/metrics"
      ]
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
            "command": "grep -q 'health tier:' \"$CLAUDE_TOOL_RESULT_FILE\" && echo '[health-check] Health tier updated — consider refreshing book-health-dashboard.md' || true"
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
            "command": "if echo \"$CLAUDE_TOOL_INPUT\" | grep -q 'customers/'; then echo '[cs-workspace] Writing to account folder — confirm account name matches directory'; fi"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "echo '[cs-workspace] Session ended. Reminder: update book-health-dashboard.md if any health tiers changed this session.'"
          }
        ]
      }
    ]
  }
}
```

## Skills a instalar

```bash
npx claudient add skill gtm/customer-success
npx claudient add skill gtm/mutual-success-plan
npx claudient add skill gtm/qbr-builder
npx claudient add skill gtm/health-score-analyzer
npx claudient add skill gtm/expansion-playbook
npx claudient add skill gtm/churn-prevention
```

## Recursos relacionados

- [Guía de Customer Success](../guides/for-customer-success.md)
- [Workflow de entrega de QBR](../workflows/qbr-delivery.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
