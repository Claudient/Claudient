# Espacio de Trabajo para Account Executive — Estructura del Proyecto

> Para un AE con cuota asignada que gestiona pipeline empresarial o de mercado medio de principio a fin — desde el descubrimiento hasta el cierre — con Salesforce, Gong, DocuSign, Clari y Seismic como stack operativo.

## Stack

- **Salesforce** — CRM, gestión de oportunidades, registro de actividades, seguimiento de categorías de previsión
- **Gong** — Grabación de llamadas, puntuación de riesgo por deal, exportación de transcripciones, analítica de representantes
- **DocuSign** — Enrutamiento de contratos, seguimiento de sobres, auditoría de firmas electrónicas
- **Clari** o **Bowtie** — Previsión impulsada por IA, consolidación de pipeline, inteligencia de ingresos
- **Seismic** o **Highspot** — Gestión de contenido, presentaciones comerciales, calculadoras de ROI, battlecards
- **LinkedIn Sales Navigator** — Mapeo de ejecutivos, expansión de cuentas, seguimiento de señales
- **Slack** — Deal rooms, hilos con managers, canales de traspaso a CS
- **Claude Code** — Puntuación MEDDPICC, redacción de RFPs, generación de MSPs, preparación de QBRs, prep de previsión

## Árbol de directorios

```
ae-workspace/
├── .claude/
│   ├── CLAUDE.md                        # Instrucciones del workspace (pega la plantilla de abajo)
│   ├── settings.json                    # Servidores MCP, hooks, permisos
│   └── commands/
│       ├── deal-review.md               # /deal-review — puntuación MEDDPICC + alertas de riesgo por deal
│       ├── exec-alignment.md            # /exec-alignment — mapa multihilo, borradores de contacto ejecutivo
│       ├── proposal-draft.md            # /proposal-draft — propuesta completa o respuesta a sección de RFP
│       ├── qbr-prep.md                  # /qbr-prep — esquema de deck para QBR, métricas, narrativa
│       ├── negotiation-prep.md          # /negotiation-prep — análisis BATNA, matriz de concesiones
│       ├── forecast-update.md           # /forecast-update — consolidación semanal de Commit/Best Case
│       └── close-plan.md               # /close-plan — plan de acción mutuo, tabla de hitos
├── deals/
│   ├── _template/                       # Carpeta de deal en blanco — cópiala al abrir una nueva oportunidad
│   │   ├── discovery-notes.md           # Notas brutas de llamada, criterios de calificación, borrador MEDDPICC
│   │   ├── exec-map.md                  # Mapa de stakeholders — nombre, título, rol, sentimiento, último contacto
│   │   ├── close-plan.md               # Plan de acción mutuo con fechas y responsables de ambos lados
│   │   ├── gong-transcripts/            # Transcripciones de llamadas exportadas de Gong (texto plano)
│   │   │   └── .gitkeep
│   │   └── rfp-responses/               # Borradores de secciones RFP y respuestas finales
│   │       └── .gitkeep
│   ├── acme-corp/
│   │   ├── discovery-notes.md
│   │   ├── exec-map.md
│   │   ├── close-plan.md
│   │   ├── meddpicc-scores.md           # Historial de puntuaciones MEDDPICC (actualizado en cada revisión)
│   │   ├── negotiation-log.md           # Historial de concesiones, redlines, notas del deal desk
│   │   ├── gong-transcripts/
│   │   │   ├── 2026-05-14-discovery.txt
│   │   │   ├── 2026-05-28-demo.txt
│   │   │   └── 2026-06-01-negotiation.txt
│   │   └── rfp-responses/
│   │       ├── section-3-security.md
│   │       ├── section-5-integrations.md
│   │       └── executive-summary.md
│   ├── beta-industries/
│   │   ├── discovery-notes.md
│   │   ├── exec-map.md
│   │   └── close-plan.md
│   └── gamma-systems/
│       ├── discovery-notes.md
│       ├── exec-map.md
│       ├── close-plan.md
│       └── gong-transcripts/
│           └── 2026-06-02-eval-review.txt
├── templates/
│   ├── proposal-template.md             # Estructura reutilizable de propuesta — resumen ejecutivo, ROI, condiciones
│   ├── rfp-response-template.md         # Andamiaje para respuestas RFP — requisito, respuesta, evidencia
│   ├── close-plan-template.md           # Plan de acción mutuo con etapas de hitos estándar
│   ├── mutual-action-plan.md            # MAP para deals en etapa avanzada — hitos, responsables, fechas
│   ├── executive-outreach-template.md   # Contacto en frío/tibio con el comprador económico o C-suite
│   ├── qbr-deck-outline.md              # Estructura de slides para QBR — revisión de negocio, objetivos, próximo trimestre
│   └── champion-enablement-package.md   # Kit de venta interna para que el champion comparta internamente
├── competitive/
│   ├── battlecard-competitor-a.md       # Posicionamiento frente al Competidor A, objeciones, temas ganadores
│   ├── battlecard-competitor-b.md       # Posicionamiento frente al Competidor B, objeciones, temas ganadores
│   ├── competitive-positioning.md       # Narrativa maestra de diferenciación — actualizada trimestralmente
│   └── win-loss-notes.md               # Registro continuo de contexto de deals ganados/perdidos por competidor
├── metrics/
│   ├── quota-tracker.md                 # Cumplimiento de cuota semanal: cerrado, pipeline, brecha con el objetivo
│   ├── pipeline-health.md              # Ratio de cobertura, distribución por etapa, lista de deals antiguos
│   ├── forecast-log.md                 # Commit semanal vs. real — historial de precisión en previsión
│   └── deal-cycle-benchmarks.md        # Días promedio por etapa, tasas de cierre por segmento/tamaño
└── scratch/
    ├── weekly-prep.md                   # Espacio borrador para preparar la llamada de previsión y revisión de deals
    └── call-notes-staging.md            # Notas post-llamada en bruto antes de moverlas a la carpeta del deal
```

## Archivos clave explicados

| Ruta | Propósito |
|---|---|
| `.claude/commands/deal-review.md` | Slash command que recibe el nombre de un deal y contexto, y devuelve una evaluación MEDDPICC puntuada, alertas de riesgo y categoría de previsión recomendada |
| `.claude/commands/exec-alignment.md` | Slash command para mapear el comité de compra, puntuar el sentimiento de cada stakeholder y redactar contactos ejecutivos multihilo |
| `.claude/commands/proposal-draft.md` | Slash command que genera una propuesta completa o una sección específica de RFP — toma criterios del comprador y diferenciadores del producto como entrada |
| `.claude/commands/negotiation-prep.md` | Slash command para análisis BATNA, matriz de concesiones y condiciones de abandono antes de una llamada de negociación comercial |
| `deals/_template/` | Estructura de carpeta en blanco que se copia al calificar una nueva oportunidad en el pipeline — garantiza documentación consistente en todos los deals |
| `deals/acme-corp/meddpicc-scores.md` | Historial de puntuaciones MEDDPICC actualizado tras cada revisión de deal — rastrea la evolución del score y patrones de riesgo a lo largo del ciclo |
| `templates/mutual-action-plan.md` | Plan conjunto orientado al comprador compartido en la etapa de Evaluación — hitos, compromisos mutuos y fecha de cierre acordada |
| `metrics/forecast-log.md` | Commit semanal vs. cierre real — se usa para rastrear la precisión de la previsión a lo largo del tiempo e identificar patrones de infra o sobreestimación |

## Andamiaje rápido

```bash
# Crear la raíz del workspace
mkdir -p ae-workspace

# Crear estructura .claude
mkdir -p ae-workspace/.claude/commands

# Crear directorios de deals
mkdir -p ae-workspace/deals/_template/gong-transcripts
mkdir -p ae-workspace/deals/_template/rfp-responses
mkdir -p ae-workspace/deals/acme-corp/gong-transcripts
mkdir -p ae-workspace/deals/acme-corp/rfp-responses
mkdir -p ae-workspace/deals/beta-industries
mkdir -p ae-workspace/deals/gamma-systems/gong-transcripts

# Crear directorios de templates, competitive, metrics y scratch
mkdir -p ae-workspace/templates
mkdir -p ae-workspace/competitive
mkdir -p ae-workspace/metrics
mkdir -p ae-workspace/scratch

# Crear placeholders .gitkeep
touch ae-workspace/deals/_template/gong-transcripts/.gitkeep
touch ae-workspace/deals/_template/rfp-responses/.gitkeep

# Instalar skills GTM
npx uitkit add skill gtm/deal-desk
npx uitkit add skill gtm/deal-review
npx uitkit add skill gtm/rfp-responder
npx uitkit add skill gtm/commercial-forecaster
npx uitkit add skill gtm/qbr-builder
npx uitkit add skill gtm/channel-economics
npx uitkit add skill gtm/champion-builder
npx uitkit add skill gtm/mutual-success-plan

# Copiar stubs de comandos en .claude/commands/
npx uitkit add skill gtm/deal-review --output ae-workspace/.claude/commands/deal-review.md
npx uitkit add skill gtm/rfp-responder --output ae-workspace/.claude/commands/proposal-draft.md
npx uitkit add skill gtm/qbr-builder --output ae-workspace/.claude/commands/qbr-prep.md
npx uitkit add skill gtm/commercial-forecaster --output ae-workspace/.claude/commands/forecast-update.md
npx uitkit add skill gtm/mutual-success-plan --output ae-workspace/.claude/commands/close-plan.md
```

## Plantilla CLAUDE.md

```markdown
# AE Workspace — Instrucciones para Claude Code

## Qué es esto

Este es el directorio de trabajo de un Account Executive que gestiona un pipeline con cuota asignada.
Los deals se rastrean en deals/, las plantillas viven en templates/, y la inteligencia competitiva en competitive/.
Toda la puntuación MEDDPICC, previsión, redacción de RFPs y preparación de QBRs ocurre a través de skills de Claude Code.

## Stack

- Salesforce — CRM de referencia (oportunidad, contacto, actividad)
- Gong — Inteligencia de llamadas; transcripciones exportadas a deals/<cuenta>/gong-transcripts/
- DocuSign — Enrutamiento de contratos; rastrea los IDs de sobre en deals/<cuenta>/negotiation-log.md
- Clari — Consolidación de previsión; snapshots semanales registrados en metrics/forecast-log.md
- Seismic — Repositorio de contenido; referencia nombres y versiones de decks en las propuestas
- LinkedIn Sales Navigator — Mapeo ejecutivo; documenta contactos en exec-map.md
- Slack — Actualizaciones del deal room; pega los hilos relevantes en el contexto de la carpeta del deal

## Tareas comunes y comandos exactos

### Puntuar un deal con MEDDPICC
```
/deal-review

Deal: [nombre del deal]
Stage: [etapa]
ACV: $[importe]
Close date: [fecha]
Context: [pega notas de discovery o transcripción de Gong]
```

### Redactar una propuesta o sección de RFP
```
/proposal-draft

RFP question: [pega textualmente]
Buyer priority: [punto de dolor específico al que apunta esta pregunta]
Our differentiator: [lo que tenemos que los competidores no tienen]
Word limit: [si se especifica]
```

### Construir un plan de acción mutuo
```
/close-plan

Deal: [nombre], ACV: $[importe], Target close: [fecha]
Champion: [nombre, título], Economic buyer: [nombre, título]
Remaining steps: [lo que ambas partes aún necesitan hacer antes de la firma]
```

### Prepararse para la llamada de previsión
```
/forecast-update

My pipeline: [pega la lista de deals con etapa, ACV, fecha de cierre, categoría de previsión]
Weekly quota: $[X] new ARR
Flag: deals en riesgo en Commit, deals de Best Case listos para promover, deals a diferir
```

### Preparar un QBR
```
/qbr-prep

Quarter: Q[X] [AÑO]
Closed won: $[X] ARR, [N] deals
Pipeline entering Q[X+1]: $[Y] ARR across [N] deals
Top 3 wins: [nombres de deals y por qué cerraron]
Top risk: [¿cuál es la mayor brecha con la cuota del próximo trimestre?]
```

### Mapear ejecutivos antes de hacer multihilo
```
/exec-alignment

Account: [empresa]
Known contacts: [lista con títulos e interacciones más recientes]
Target: [título del ejecutivo que necesito alcanzar — CEO, CFO, CTO, etc.]
Ask: [lo que necesito de ellos — sponsor ejecutivo, firmante del contrato, aprobación técnica]
```

### Prepararse para una llamada de negociación
```
/negotiation-prep

Deal: [nombre], ACV: $[precio de lista], Offered: $[oferta actual]
Concessions already made: [lista]
Buyer's stated blockers: [precio / condiciones / plazos / proceso de compras]
Walk-away condition: [la línea que no cruzaré]
```

## Convenciones a seguir

- Cada carpeta de deal debe tener discovery-notes.md, exec-map.md y close-plan.md antes de que el deal se marque como Evaluación
- Las puntuaciones MEDDPICC viven en deals/<cuenta>/meddpicc-scores.md — agregar después de cada revisión de deal, nunca sobreescribir
- Las transcripciones de Gong van en deals/<cuenta>/gong-transcripts/ como archivos .txt planos, con el nombre YYYY-MM-DD-[tema].txt
- El registro de previsión se actualiza cada viernes en metrics/forecast-log.md — total de Commit, total de Best Case, cierre real
- Las concesiones de negociación se registran cronológicamente en deals/<cuenta>/negotiation-log.md
- Todas las propuestas y respuestas a RFPs se guardan en deals/<cuenta>/rfp-responses/ antes de enviarse
- Las battlecards competitivas en competitive/ se revisan y actualizan al inicio de cada trimestre
```

## Servidores MCP

```json
{
  "mcpServers": {
    "salesforce": {
      "command": "npx",
      "args": ["-y", "@salesforce/mcp-server"],
      "env": {
        "SF_LOGIN_URL": "https://login.salesforce.com",
        "SF_USERNAME": "your-sf-username@company.com",
        "SF_PASSWORD": "your-sf-password",
        "SF_TOKEN": "your-security-token"
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
        "/Users/your-username/ae-workspace"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"meddpicc-scores.md\"; then echo \"[hook] MEDDPICC score updated at $(date +%Y-%m-%dT%H:%M) — check forecast-log.md for weekly roll-up\"; fi'"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_FILE_PATH\" | grep -q \"close-plan.md\"; then echo \"[hook] Writing close plan — confirm exec-map.md and discovery-notes.md are current before sharing with buyer\"; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'TODAY=$(date +%A); if [ \"$TODAY\" = \"Friday\" ]; then echo \"[reminder] Friday — update metrics/forecast-log.md with this week Commit vs. actual before EOD\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Skills a instalar

```bash
# Skills principales de gestión de deals para AE
npx uitkit add skill gtm/deal-desk
npx uitkit add skill gtm/deal-review
npx uitkit add skill gtm/rfp-responder
npx uitkit add skill gtm/commercial-forecaster
npx uitkit add skill gtm/qbr-builder
npx uitkit add skill gtm/channel-economics
npx uitkit add skill gtm/champion-builder
npx uitkit add skill gtm/mutual-success-plan

# Skills GTM complementarias
npx uitkit add skill gtm/crm-hygiene
npx uitkit add skill gtm/revenue-operations
npx uitkit add skill gtm/expansion-playbook
npx uitkit add skill gtm/email-automation

# Instalar todas las skills GTM de una vez
npx uitkit add skills gtm
```

## Relacionado

- [Guía para Account Executive](../guides/for-account-executive.md)
- [Workflow del ciclo de deals AE](../workflows/ae-deal-cycle.md)
- [Workflow de screening de deals](../workflows/deal-screening.md)
