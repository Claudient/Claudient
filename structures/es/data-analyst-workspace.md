# Espacio de trabajo para analistas de datos — Estructura del proyecto

> Para analistas de datos que realizan consultas SQL, análisis exploratorio en Python, mantenimiento de dashboards e informes para stakeholders contra BigQuery o Snowflake, con dbt para transformaciones y Looker o Metabase para BI.

## Stack

- **Data warehouse:** BigQuery o Snowflake
- **Transformaciones:** dbt Core (o dbt Cloud)
- **BI / dashboards:** Looker o Metabase
- **Análisis:** Python 3.11+, pandas 2.x / polars 0.20+, Jupyter Lab 4.x
- **Notebooks:** JupyterLab, nbconvert (para exportaciones HTML)
- **Control de versiones:** Git + GitHub
- **Comunicación:** Slack
- **Gestión de paquetes:** uv (Python), pip-tools para dependencias fijadas
- **Calidad de datos:** Great Expectations o scripts SQL de aserciones personalizados
- **Programación:** jobs de dbt Cloud, o cron + Makefile en local

## Árbol de directorios

```
my-analytics-workspace/
├── .claude/
│   ├── commands/                     # comandos slash disponibles en este proyecto
│   │   ├── analyze.md                # /analyze — explorar un conjunto de datos o pregunta de extremo a extremo
│   │   ├── sql-query.md              # /sql-query — escribir, optimizar y explicar SQL
│   │   ├── dashboard-update.md       # /dashboard-update — actualizar lógica o SQL de un dashboard
│   │   ├── data-quality-check.md     # /data-quality-check — ejecutar aserciones, detectar anomalías
│   │   ├── stakeholder-report.md     # /stakeholder-report — convertir métricas en narrativa
│   │   └── explore.md                # /explore — EDA abierto sobre una tabla o conjunto de datos
│   ├── settings.json                 # hooks, referencias a servidores MCP, permisos
│   └── mcp.json                      # configuraciones de servidores MCP (BigQuery, Slack)
├── queries/                          # SQL guardado y versionado por dominio
│   ├── product/
│   │   ├── dau-wau-mau.sql           # consulta de métricas de usuarios activos
│   │   ├── retention-cohorts.sql     # retención semanal por cohorte de registro
│   │   └── funnel-conversion.sql     # embudo paso a paso con tasas de abandono
│   ├── revenue/
│   │   ├── mrr-breakdown.sql         # MRR por plan, expansión, cancelación
│   │   ├── ltv-by-segment.sql        # LTV del cliente segmentado por canal de adquisición
│   │   └── ar-aging.sql              # informe de antigüedad de cuentas por cobrar
│   ├── marketing/
│   │   ├── campaign-attribution.sql  # atribución último clic y lineal por canal
│   │   ├── cac-by-channel.sql        # costo de adquisición de clientes por canal
│   │   └── email-engagement.sql      # tasas de apertura/clic por campaña y segmento
│   ├── operations/
│   │   ├── support-ticket-volume.sql # volumen de tickets, tasa de incumplimiento de SLA, CSAT
│   │   └── eng-deploy-frequency.sql  # cadencia de despliegues y tasa de rollback
│   └── _shared/
│       ├── date-spine.sql            # CTE de dimensión de fecha reutilizable
│       └── user-spine.sql            # CTE de dimensión de usuario reutilizable
├── notebooks/                        # notebooks de análisis Jupyter
│   ├── 2026-05-product-drop-rca.ipynb        # análisis de causa raíz, caída de producto mayo 2026
│   ├── 2026-04-ltv-model-v2.ipynb            # iteración y validación del modelo LTV
│   ├── 2026-03-churn-predictors.ipynb        # exploración de predictores de churn
│   ├── templates/
│   │   ├── eda-template.ipynb        # plantilla estándar de notebook EDA
│   │   └── ab-test-analysis.ipynb    # plantilla de resultados de test A/B con pruebas de significancia
│   └── exports/                      # exportaciones HTML de nbconvert para compartir
│       └── 2026-05-product-drop-rca.html
├── dashboards/                       # especificaciones de dashboards y el SQL que los alimenta
│   ├── executive-weekly/
│   │   ├── spec.md                   # qué muestra el dashboard, audiencia, cadencia de actualización
│   │   ├── headline-metrics.sql      # consulta de KPI de nivel superior
│   │   └── wow-trend.sql             # tendencia semana a semana con anotaciones
│   ├── product-health/
│   │   ├── spec.md
│   │   ├── activation-funnel.sql
│   │   ├── feature-adoption.sql
│   │   └── nps-over-time.sql
│   └── marketing-performance/
│       ├── spec.md
│       ├── paid-overview.sql
│       └── organic-vs-paid.sql
├── reports/                          # entregables para stakeholders — exportados o redactados
│   ├── weekly/
│   │   ├── 2026-W22-business-review.md       # narrativa de la revisión de negocio semanal
│   │   └── 2026-W21-business-review.md
│   ├── monthly/
│   │   ├── 2026-05-monthly-review.md
│   │   └── 2026-04-monthly-review.md
│   └── ad-hoc/
│       ├── 2026-05-15-pricing-impact-analysis.md
│       └── 2026-04-20-q1-board-data-pack.md
├── data-quality/                     # verificaciones de calidad y registros de anomalías
│   ├── checks/
│   │   ├── orders-freshness.sql      # verificar que los pedidos se carguen dentro de las 4h del cierre del día
│   │   ├── revenue-nulls.sql         # verificar que no haya ingresos nulos en pedidos completados
│   │   ├── user-id-referential.sql   # verificar integridad de FK entre usuarios y pedidos
│   │   └── duplicate-event-ids.sql   # verificar unicidad de event_id en la tabla de eventos
│   ├── anomaly-log.md                # registro continuo de anomalías encontradas y estado de resolución
│   └── runbook.md                    # qué hacer cuando falla una verificación — ruta de escalada
├── transforms/                       # modelos dbt gestionados desde este espacio de trabajo
│   ├── dbt_project.yml               # nombre del proyecto, rutas de modelos, materializaciones por defecto
│   ├── profiles.yml                  # perfiles de conexión dbt (BigQuery / Snowflake)
│   ├── models/
│   │   ├── staging/
│   │   │   ├── stg_orders.sql        # pedidos limpios y tipados desde datos crudos
│   │   │   ├── stg_users.sql         # usuarios limpios con deduplicación
│   │   │   └── stg_events.sql        # eventos de producto limpios con propiedades parseadas
│   │   ├── intermediate/
│   │   │   ├── int_user_sessions.sql # construcción de sesiones a partir de eventos
│   │   │   └── int_order_items.sql   # líneas de pedido unidas al catálogo de productos
│   │   └── marts/
│   │       ├── fct_orders.sql        # tabla de hechos de pedidos para reporting
│   │       ├── fct_events.sql        # tabla de hechos de eventos para analítica de producto
│   │       ├── dim_users.sql         # dimensión de usuario con segmentos y bandas de LTV
│   │       └── dim_dates.sql         # dimensión de fechas para toda la inteligencia temporal
│   ├── tests/
│   │   ├── generic/                  # sobrescrituras de tests genéricos de dbt
│   │   └── singular/
│   │       └── assert_revenue_positive.sql
│   └── macros/
│       ├── date_trunc_safe.sql       # macro date_trunc tolerante a valores nulos
│       └── fiscal_quarter.sql        # trimestre fiscal de la empresa desde la fecha calendario
├── docs/                             # diccionario de datos y definiciones de métricas
│   ├── metric-definitions.md         # definiciones canónicas de todas las métricas reportadas
│   ├── data-dictionary.md            # descripciones de tablas y columnas para conjuntos de datos clave
│   ├── schema-changelog.md           # registro de cambios de esquema en sistemas externos y su impacto
│   └── onboarding.md                 # cómo un nuevo analista se pone al día con este espacio de trabajo
├── requirements.txt                  # dependencias Python fijadas
├── pyproject.toml                    # metadatos del proyecto y configuración de herramientas (ruff, black)
├── Makefile                          # tareas comunes: dbt run, verificaciones de calidad, exportación de notebooks
├── .env.example                      # plantilla de variables de entorno — nunca hacer commit de .env
└── CLAUDE.md                         # instrucciones del proyecto para Claude Code
```

## Archivos clave explicados

| Ruta | Propósito |
|---|---|
| `.claude/commands/analyze.md` | Comando slash que recibe un nombre de conjunto de datos y una pregunta, ejecuta EDA y devuelve un hallazgo estructurado con SQL e interpretación |
| `.claude/commands/stakeholder-report.md` | Genera una narrativa de negocio a partir de cifras métricas brutas — titular, impulsores, anomalías, recomendaciones |
| `.claude/settings.json` | Configura hooks (staging automático de SQL al escribir, registro de auditoría) y referencia los servidores MCP de BigQuery y Slack |
| `queries/_shared/date-spine.sql` | CTE de dimensión de fecha compartido, referenciado en todas las consultas de series temporales — editarlo se propaga en todas partes |
| `transforms/models/marts/fct_orders.sql` | Tabla de hechos de pedidos central — fuente de verdad para ingresos, conteos de transacciones y AOV |
| `docs/metric-definitions.md` | Definiciones canónicas para que Claude (y los humanos) usen la misma lógica de negocio para cada métrica |
| `data-quality/anomaly-log.md` | Registro continuo de problemas de datos — Claude añade entradas cuando /data-quality-check detecta anomalías |
| `dashboards/executive-weekly/spec.md` | Especificación del dashboard con audiencia, calendario de actualización, responsables de KPI y limitaciones conocidas |

## Scaffold rápido

```bash
# Crear el directorio del espacio de trabajo y entrar en él
mkdir my-analytics-workspace && cd my-analytics-workspace
git init

# Crear directorios de configuración de Claude Code y archivos de comandos
mkdir -p .claude/commands .claude/logs

# Directorios principales del espacio de trabajo
mkdir -p queries/{product,revenue,marketing,operations,_shared}
mkdir -p notebooks/{templates,exports}
mkdir -p dashboards/{executive-weekly,product-health,marketing-performance}
mkdir -p reports/{weekly,monthly,ad-hoc}
mkdir -p data-quality/checks
mkdir -p transforms/models/{staging,intermediate,marts}
mkdir -p transforms/{tests/singular,tests/generic,macros}
mkdir -p docs

# Crear archivos vacíos para que git rastree los directorios
touch queries/product/dau-wau-mau.sql
touch queries/revenue/mrr-breakdown.sql
touch queries/_shared/{date-spine.sql,user-spine.sql}
touch data-quality/anomaly-log.md data-quality/runbook.md
touch docs/{metric-definitions.md,data-dictionary.md,schema-changelog.md}

# Entorno Python
python3 -m venv .venv
source .venv/bin/activate
pip install uv
uv pip install pandas polars jupyterlab nbconvert great-expectations dbt-bigquery sqlfluff ruff black

# Fijar dependencias
pip freeze > requirements.txt

# Inicializar proyecto dbt (elegir bigquery o snowflake)
dbt init transforms

# Crear .env.example
cat > .env.example <<'EOF'
BIGQUERY_PROJECT=your-gcp-project-id
BIGQUERY_DATASET=analytics
SNOWFLAKE_ACCOUNT=your-account.region
SNOWFLAKE_USER=analyst@company.com
SNOWFLAKE_DATABASE=ANALYTICS
SNOWFLAKE_SCHEMA=PUBLIC
SLACK_BOT_TOKEN=xoxb-your-token
SLACK_TEAM_ID=T0XXXXXXXXX
EOF

# .gitignore
cat > .gitignore <<'EOF'
.env
.venv/
__pycache__/
*.pyc
.ipynb_checkpoints/
notebooks/exports/*.html
transforms/target/
transforms/dbt_packages/
transforms/logs/
.DS_Store
EOF

# Instalar skills de Claude Code
npx uitkit add skill data-ml/sql
npx uitkit add skill data-ml/pandas-polars
npx uitkit add skill data-ml/dashboard-narrator
npx uitkit add skill data-ml/data-quality-checker
npx uitkit add skill data-ml/stakeholder-report
npx uitkit add skill data-ml/dbt-data-pipelines
npx uitkit add skill data-ml/synthetic-data

git add .
git commit -m "chore: initial data analyst workspace scaffold"
```

## Plantilla CLAUDE.md

```markdown
# Espacio de trabajo para analistas de datos

Este es un espacio de trabajo para análisis exploratorio, mantenimiento de dashboards,
solicitudes ad-hoc e informes para stakeholders. La fuente de verdad para todas las
métricas está en el data warehouse BigQuery/Snowflake. dbt gestiona las transformaciones.
Looker/Metabase es la capa de BI. No modificar los modelos dbt de la capa mart sin
comprender las dependencias de los dashboards posteriores.

---

## Stack

- Data warehouse: BigQuery (proyecto: `your-gcp-project`) o Snowflake
- Transformaciones: dbt Core, modelos en `transforms/`
- BI: Looker / Metabase (especificaciones de dashboards en `dashboards/`)
- Análisis: Python 3.11, pandas 2.x / polars 0.20, JupyterLab 4
- Control de versiones: Git + GitHub

---

## Definiciones de métricas

Todas las definiciones de métricas son canónicas en `docs/metric-definitions.md`.
Nunca calcular una métrica de manera diferente a lo que allí se define.
Si un stakeholder solicita un número que contradice estas definiciones, señalarlo.

---

## Tareas comunes y comandos exactos

| Tarea | Comando |
|---|---|
| Explorar un conjunto de datos o responder una pregunta | `/analyze <table_or_dataset> — <question>` |
| Escribir o depurar una consulta SQL | `/sql-query <describir lo que necesita>` |
| Actualizar el SQL subyacente de un dashboard | `/dashboard-update <dashboard-name>` |
| Ejecutar verificaciones de calidad sobre una tabla | `/data-quality-check <table_name>` |
| Redactar un informe para stakeholders a partir de métricas | `/stakeholder-report <contexto o pegar métricas>` |
| EDA abierto sobre una nueva tabla | `/explore <table_name>` |

---

## Convenciones SQL

- Todas las consultas usan CTEs — sin anidamiento de subconsultas más allá de dos niveles
- Los filtros de fechas siempre usan `DATE_TRUNC` con granularidad explícita (día, semana, mes)
- BigQuery: usar identificadores con backtick — `` `project.dataset.table` ``
- Snowflake: usar identificadores entre comillas dobles donde el esquema distinga mayúsculas
- Las funciones de ventana son preferibles a los auto-joins para totales acumulados y rankings
- Toda consulta guardada en `queries/` debe tener un bloque de comentarios: propósito, granularidad, responsable

---

## Convenciones dbt

- Modelos staging: `stg_<source>_<entity>.sql` — solo limpiar y tipar
- Modelos intermediate: `int_<description>.sql` — joins y sessionización
- Modelos mart: `fct_<entity>.sql` y `dim_<entity>.sql` — listos para reporting
- Todos los modelos mart deben tener tests dbt: `not_null`, `unique` en claves primarias
- No renombrar columnas de marts sin actualizar `docs/metric-definitions.md`

---

## Convenciones para notebooks

- Formato del nombre de archivo: `YYYY-MM-<slug>.ipynb` (ej. `2026-05-ltv-deep-dive.ipynb`)
- Primera celda: markdown — propósito, responsable, fecha, preguntas clave respondidas
- Última celda: markdown — resumen de hallazgos y acciones recomendadas
- Exportar a HTML antes de compartir: `jupyter nbconvert --to html <notebook>`

---

## Calidad de datos

- Todas las anomalías encontradas deben añadirse a `data-quality/anomaly-log.md`
- Formato: fecha, tabla, descripción del problema, impacto, estado de resolución
- Si una verificación en `data-quality/checks/` falla, seguir `data-quality/runbook.md`

---

## Prohibido

- No hacer commit de `.env` — usar solo `.env.example`
- No modificar `docs/metric-definitions.md` sin revisión del equipo
- No crear notebooks fuera de `notebooks/` — los exports van a `notebooks/exports/`
- No ejecutar SQL destructivo (DELETE, TRUNCATE, DROP) sin una segunda confirmación
```

## Servidores MCP

```json
{
  "mcpServers": {
    "bigquery": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-bigquery"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "/path/to/service-account-key.json",
        "BIGQUERY_PROJECT": "your-gcp-project-id",
        "BIGQUERY_DATASET": "analytics"
      }
    },
    "snowflake": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-snowflake"],
      "env": {
        "SNOWFLAKE_ACCOUNT": "your-account.region",
        "SNOWFLAKE_USER": "analyst@company.com",
        "SNOWFLAKE_PASSWORD": "your-password",
        "SNOWFLAKE_DATABASE": "ANALYTICS",
        "SNOWFLAKE_SCHEMA": "PUBLIC",
        "SNOWFLAKE_WAREHOUSE": "COMPUTE_WH"
      }
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "xoxb-your-bot-token-here",
        "SLACK_TEAM_ID": "T0XXXXXXXXX"
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
            "command": "bash -c 'if [[ \"$CLAUDE_TOOL_INPUT_FILE_PATH\" == *.sql ]]; then sqlfluff fix --dialect bigquery \"$CLAUDE_TOOL_INPUT_FILE_PATH\" --quiet; fi'",
            "async": true
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if [[ \"$CLAUDE_TOOL_INPUT_FILE_PATH\" == */data-quality/anomaly-log.md ]]; then git add \"$CLAUDE_TOOL_INPUT_FILE_PATH\"; fi'",
            "async": true
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_COMMAND\" | grep -qiE \"(DELETE|TRUNCATE|DROP TABLE|DROP VIEW)\"; then echo \"DESTRUCTIVE SQL DETECTED — confirm intent before proceeding\" >&2; exit 1; fi'"
          }
        ]
      }
    ]
  }
}
```

## Skills a instalar

```bash
npx uitkit add skill data-ml/sql
npx uitkit add skill data-ml/pandas-polars
npx uitkit add skill data-ml/dashboard-narrator
npx uitkit add skill data-ml/data-quality-checker
npx uitkit add skill data-ml/stakeholder-report
npx uitkit add skill data-ml/dbt-data-pipelines
npx uitkit add skill data-ml/synthetic-data
```

## Recursos relacionados

- [Guía: Claude para analistas de datos](../guides/for-data-analyst.md)
- [Flujo de trabajo: Reporting de datos](../workflows/data-reporting.md)
