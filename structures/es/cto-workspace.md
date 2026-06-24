# Espacio de trabajo CTO / VP de Ingeniería — Estructura de proyecto

> Para un CTO o VP de Ingeniería que dirige una organización de ingeniería: decisiones de arquitectura, hoja de ruta técnica, contratación, salud del equipo, revisiones de incidentes, evaluación de proveedores e informes al consejo de administración — todo gestionado desde un único espacio de trabajo de Claude Code.

## Stack

- Linear — tickets, seguimiento de proyectos, hoja de ruta trimestral
- GitHub — código, PRs, métricas de ingeniería vía GitHub Insights
- Datadog — observabilidad, SLOs, monitoreo de incidentes, dashboards
- PagerDuty — turnos de guardia, alertas de incidentes, disparadores de postmortems
- Notion — documentos de estrategia, wikis de equipo, registros de decisiones
- Lattice o Leapsome — evaluaciones de desempeño, notas de 1:1, encuestas de compromiso
- Greenhouse — ofertas de empleo, pipelines de candidatos, tarjetas de puntuación de entrevistas
- Slack — comunicación asíncrona, salas de guerra de incidentes, standups

## Árbol de directorios

```
cto-workspace/
├── .claude/
│   ├── CLAUDE.md                        # Instrucciones del espacio de trabajo para Claude Code
│   ├── settings.json                    # Permisos, hooks, configuración MCP
│   └── commands/
│       ├── arch-review.md               # Revisión de arquitectura — análisis de compensaciones, riesgos, borrador de ADR
│       ├── hiring-plan.md               # Plan de contratación — definición de rol, cronograma, estimación de presupuesto
│       ├── incident-review.md           # Plantilla de postmortem — cronología, causa raíz, elementos de acción
│       ├── team-health.md               # Instantánea de salud del equipo — moral, velocidad, riesgo de rotación
│       ├── vendor-eval.md               # Matriz de evaluación de proveedores — puntuación de criterios, recomendación
│       ├── eng-metrics.md               # Informe de métricas de ingeniería — DORA, cycle time, cobertura
│       ├── board-update.md              # Actualización al consejo — salud técnica, riesgos, avance de la hoja de ruta
│       └── build-vs-buy.md              # Análisis construir vs comprar — costo, riesgo, recomendación
├── decisions/                           # Architecture Decision Records (ADRs)
│   ├── README.md                        # Índice de ADRs y leyenda de estados
│   ├── adr-template.md                  # Plantilla canónica de ADR
│   ├── 0001-monorepo-vs-polyrepo.md     # Aceptado — monorepo con Turborepo
│   ├── 0002-service-mesh-selection.md   # Aceptado — Istio en GKE
│   ├── 0003-event-streaming-platform.md # Aceptado — Kafka sobre SQS por garantías de ordenamiento
│   ├── 0004-auth-provider.md            # Propuesto — comparación Auth0 vs Clerk
│   └── 0005-data-warehouse.md           # Borrador — BigQuery vs Snowflake
├── roadmap/
│   ├── q3-2025-tech-roadmap.md          # Hoja de ruta trimestral — iniciativas, responsables, hitos
│   ├── q4-2025-tech-roadmap.md          # Borrador del próximo trimestre
│   ├── 2025-annual-tech-plan.md         # Estrategia anual de ingeniería y áreas de inversión
│   ├── tech-vision-2026.md              # Documento de visión prospectiva a 18 meses
│   └── initiative-tracker.md           # Iniciativas activas con estado y bloqueos
├── hiring/
│   ├── headcount-plan-2025.md           # Plantilla aprobada, presupuesto, cronograma por rol
│   ├── job-descriptions/
│   │   ├── staff-engineer.md            # Descripción del puesto — Staff Software Engineer
│   │   ├── senior-sre.md                # Descripción del puesto — Senior Site Reliability Engineer
│   │   ├── em-platform.md              # Descripción del puesto — Engineering Manager, Platform
│   │   └── principal-architect.md       # Descripción del puesto — Principal Architect
│   ├── interview-rubrics/
│   │   ├── system-design-rubric.md      # Guía de puntuación para rondas de diseño de sistemas
│   │   ├── coding-rubric.md             # Guía de puntuación para rondas de código
│   │   ├── leadership-rubric.md         # Guía de puntuación para entrevistas conductuales EM/principal
│   │   └── staff-calibration.md        # Notas de calibración para el nivel staff
│   └── pipeline-notes/
│       ├── active-roles.md              # Roles abiertos actuales y métricas del embudo
│       └── offer-log.md                 # Historial de ofertas, bandas salariales, tasas de aceptación
├── incidents/
│   ├── postmortem-template.md           # Plantilla canónica de postmortem
│   ├── 2025-06-01-payments-outage.md    # P0 — servicio de pagos inactivo 47 minutos
│   ├── 2025-05-14-data-pipeline-lag.md  # P1 — retraso de ingesta causó datos obsoletos en el dashboard
│   ├── 2025-04-22-cert-expiry.md        # P2 — certificado TLS expirado en proxy de staging
│   └── action-items-tracker.md         # Tareas pendientes abiertas de todos los postmortems
├── metrics/
│   ├── eng-kpis-dashboard.md            # Métricas DORA, cycle time, frecuencia de despliegue
│   ├── reliability-scorecard.md         # Cumplimiento de SLOs por servicio, consumo del presupuesto de errores
│   ├── on-call-burden.md               # Alertas por ingeniero, tasa de falsos positivos, MTTRS
│   ├── pr-health.md                     # Tiempo de revisión de PRs, PRs obsoletos, distribución de colaboradores
│   └── quarterly-report-q2-2025.md     # Métricas trimestrales compiladas para el paquete del consejo
├── org/
│   ├── team-structure.md                # Organigrama actual — equipos, tech leads, EMs
│   ├── capacity-plan-q3.md              # Análisis plantilla vs capacidad de trabajo
│   ├── skill-matrix.md                  # Mapa de competencias de ingeniería por equipo
│   ├── succession-plan.md               # Riesgo de personas clave y responsables de respaldo
│   └── team-health-surveys/
│       ├── q1-2025-results.md           # Resultados y temas de la encuesta Lattice
│       └── q2-2025-results.md           # Resumen de la encuesta más reciente
└── vendors/
    ├── evaluation-template.md           # Matriz estándar de puntuación de proveedores
    ├── datadog-vs-grafana-cloud.md      # Evaluación completada — se eligió Datadog
    ├── launchdarkly-vs-flagsmith.md     # Evaluación completada — se eligió LaunchDarkly
    ├── okta-vs-auth0.md                 # En progreso
    └── approved-vendor-list.md          # Proveedores actuales, fechas de contrato, responsables de renovación
```

## Archivos clave explicados

| Ruta | Propósito |
|---|---|
| `.claude/commands/arch-review.md` | Comando slash que extrae contexto de `decisions/` y produce un análisis estructurado de compensaciones con un borrador de ADR listo para registrar |
| `.claude/commands/board-update.md` | Comando slash que compila `metrics/quarterly-report-*.md` y `roadmap/` en un resumen de salud técnica listo para el consejo |
| `.claude/commands/incident-review.md` | Comando slash que genera un postmortem desde un ID de incidente de PagerDuty, completando la cronología y listando los servicios involucrados |
| `decisions/adr-template.md` | Plantilla canónica de ADR: contexto, factores de decisión, opciones consideradas, decisión, consecuencias, estado |
| `roadmap/q3-2025-tech-roadmap.md` | Hoja de ruta trimestral viva con responsables de iniciativas, hitos, dependencias y riesgos — actualizada semanalmente |
| `metrics/eng-kpis-dashboard.md` | Métricas DORA, cycle time, frecuencia de despliegue y tasa de fallos de cambios compiladas desde GitHub + Datadog |
| `org/capacity-plan-q3.md` | Modelo de plantilla vs capacidad de entrega: velocidad del equipo, trabajo planificado, análisis de brechas, necesidades de contratación |
| `incidents/postmortem-template.md` | Postmortem estándar con severidad, cronología, causa raíz, factores contribuyentes, elementos de acción y asignación de responsables |
| `vendors/evaluation-template.md` | Matriz de puntuación ponderada para evaluaciones de proveedores: criterios, pesos, puntuaciones por proveedor, sección de recomendación |
| `hiring/headcount-plan-2025.md` | Plan de plantilla aprobado por el consejo con rol, equipo, trimestre de inicio, costo total y estado de reclutamiento por fila |

## Scaffold rápido

```bash
# Crear la raíz del espacio de trabajo
mkdir -p cto-workspace
cd cto-workspace

# Crear estructura .claude
mkdir -p .claude/commands

# Crear directorios del espacio de trabajo
mkdir -p decisions
mkdir -p roadmap
mkdir -p hiring/job-descriptions
mkdir -p hiring/interview-rubrics
mkdir -p hiring/pipeline-notes
mkdir -p incidents
mkdir -p metrics
mkdir -p org/team-health-surveys
mkdir -p vendors

# Inicializar archivos clave
touch decisions/README.md decisions/adr-template.md
touch roadmap/initiative-tracker.md
touch hiring/headcount-plan-2025.md
touch incidents/postmortem-template.md incidents/action-items-tracker.md
touch metrics/eng-kpis-dashboard.md metrics/reliability-scorecard.md
touch org/team-structure.md org/capacity-plan-q3.md org/skill-matrix.md
touch vendors/evaluation-template.md vendors/approved-vendor-list.md

# Instalar skills de Claude Code
npx uitkit add skill productivity/engineering-strategy
npx uitkit add skill productivity/adr-writer
npx uitkit add skill productivity/tech-debt-tracker
npx uitkit add skill productivity/build-optimization
npx uitkit add skill productivity/vendor-evaluator
npx uitkit add skill devops-infra/platform-engineering
npx uitkit add skill devops-infra/monorepo

# Instalar comandos slash
npx uitkit add command arch-review
npx uitkit add command hiring-plan
npx uitkit add command incident-review
npx uitkit add command team-health
npx uitkit add command vendor-eval
npx uitkit add command eng-metrics
npx uitkit add command board-update
npx uitkit add command build-vs-buy
```

## Plantilla CLAUDE.md

```markdown
# Espacio de trabajo CTO / VP de Ingeniería

Este espacio de trabajo apoya el trabajo de liderazgo de ingeniería: decisiones de arquitectura, hoja de ruta
técnica, contratación, salud del equipo, revisiones de incidentes, evaluación de proveedores e informes al consejo.

---

## Qué es esto

Un espacio de trabajo Claude Code estructurado para un CTO o VP de Ingeniería. Cada directorio corresponde a una
responsabilidad de liderazgo distinta. Claude Code lee el contexto de estos archivos para producir
resultados precisos y específicos de la organización — no consejos genéricos.

---

## Stack

- Linear — tickets y hoja de ruta trimestral (MCP: linear)
- GitHub — código, PRs, métricas de organización (MCP: github)
- Datadog — SLOs, observabilidad, datos de guardia
- PagerDuty — alertas de incidentes y disparadores de postmortems
- Notion — documentos de estrategia y wikis de equipo
- Lattice / Leapsome — evaluaciones de desempeño y encuestas de compromiso
- Greenhouse — pipeline de reclutamiento y tarjetas de puntuación de entrevistas
- Slack — comunicación asíncrona y salas de guerra de incidentes (MCP: slack)

---

## Convenciones de directorios

- `decisions/` — Todos los ADRs están aquí. Usar IDs secuenciales (0001, 0002). Estado: Propuesto | Aceptado | Obsoleto | Reemplazado.
- `roadmap/` — Un archivo por trimestre. Archivar al cerrar el trimestre. `initiative-tracker.md` se mantiene actualizado.
- `hiring/` — Las descripciones de puestos van en `job-descriptions/`, las rúbricas de entrevistas en `interview-rubrics/`. Nunca poner datos personales de candidatos aquí.
- `incidents/` — Un archivo por incidente. Formato del nombre de archivo: `YYYY-MM-DD-descripcion-corta.md`. Siempre registrar elementos de acción en `action-items-tracker.md`.
- `metrics/` — Instantáneas de métricas brutas e informes compilados. Los informes trimestrales alimentan directamente las actualizaciones del consejo.
- `org/` — Estructura del equipo, planes de capacidad, matriz de habilidades. Actualizar `team-structure.md` siempre que cambien las líneas de reporte.
- `vendors/` — Un archivo de evaluación por decisión. Archivar evaluaciones completadas; mantener `approved-vendor-list.md` actualizado.

---

## Tareas comunes — comandos exactos

### Decisiones de arquitectura
```
/arch-review — Pegar el contexto de la decisión. Claude redacta un análisis de compensaciones y un ADR listo para registrar en decisions/.
/adr-writer  — Redactar un ADR desde cero. Solicita contexto, opciones y consecuencias.
```

### Contratación
```
/hiring-plan    — Produce una definición de rol, estructura de entrevista y justificación de plantilla para un nuevo puesto.
/tech-interview-kit — Genera desafíos de código, temas de diseño de sistemas y rúbricas de evaluación para un rol específico.
```

### Incidentes
```
/incident-review — Pegar ID de incidente de PagerDuty o cronología. Genera borrador de postmortem con causa raíz y elementos de acción.
```

### Salud del equipo
```
/team-health — Resume resultados de encuestas, señales de rotación e indicadores de moral en un plan de acción de liderazgo.
```

### Proveedores
```
/vendor-eval   — Evaluación estructurada de proveedor según criterios ponderados. Produce un memorando de recomendación.
/build-vs-buy  — Análisis construir o comprar: costo, riesgo, ajuste estratégico, time-to-value, recomendación.
```

### Métricas e informes
```
/eng-metrics   — Compila métricas DORA, cycle time y datos SLO en un informe de salud de ingeniería.
/board-update  — Ensambla el resumen trimestral de salud técnica, avance de la hoja de ruta y registro de riesgos para el consejo.
```

---

## Convenciones que Claude debe seguir

- Al redactar ADRs, siempre usar la plantilla en `decisions/adr-template.md` — no inventar estructura.
- Al referenciar métricas, extraer primero de los archivos `metrics/`. No fabricar cifras.
- Los postmortems son sin culpas. Nunca asignar culpa a un individuo en `incidents/`.
- Los datos de plantilla y compensación en `hiring/headcount-plan-2025.md` son confidenciales — no incluir en actualizaciones al consejo salvo solicitud explícita.
- Los hitos de la hoja de ruta en `roadmap/` son la fuente de verdad — no contradecirlos en resúmenes.
- Todas las evaluaciones de proveedores deben incluir una tabla de puntuación ponderada antes de una recomendación.
```

## Servidores MCP

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    },
    "linear": {
      "command": "npx",
      "args": ["-y", "@linear/mcp-server"],
      "env": {
        "LINEAR_API_KEY": "${LINEAR_API_KEY}"
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
        "/Users/you/cto-workspace"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"decisions/\"; then echo \"[ADR hook] New decision filed — update decisions/README.md index\"; fi'"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"incidents/\" && ! echo \"$CLAUDE_TOOL_INPUT\" | grep -q \"postmortem-template\"; then echo \"[Incident hook] Filing incident — ensure action items are added to incidents/action-items-tracker.md\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'echo \"[Session end] If you drafted an ADR or postmortem, confirm it has been filed and linked from the relevant index file.\"'"
          }
        ]
      }
    ]
  }
}
```

## Skills a instalar

```bash
npx uitkit add skill productivity/engineering-strategy
npx uitkit add skill productivity/adr-writer
npx uitkit add skill productivity/tech-debt-tracker
npx uitkit add skill productivity/build-optimization
npx uitkit add skill productivity/vendor-evaluator
npx uitkit add skill productivity/tech-interview-kit
npx uitkit add skill productivity/exec-briefing
npx uitkit add skill devops-infra/platform-engineering
npx uitkit add skill devops-infra/monorepo
npx uitkit add skill devops-infra/oncall-runbook
npx uitkit add skill devops-infra/capacity-planner
```

## Relacionados

- [Guía: Claude para CTOs y Tech Leads](../guides/for-cto.md)
- [Workflow: CTO Weekly](../workflows/cto-weekly.md)
- [Workflow: Respuesta a Incidentes](../workflows/incident-response.md)
- [Workflow: Pipeline de Reclutamiento](../workflows/recruiting-pipeline.md)
