# Analytics Platform — Estructura de Proyecto

> Para un equipo de ingeniería de datos y analítica que gestiona el ciclo de vida completo, desde la ingesta de fuentes brutas hasta la entrega gobernada de BI, optimizando la fiabilidad de los pipelines, la coherencia de las métricas y el tiempo de obtención de insights.

## Stack

- **Ingesta:** Fivetran (conectores gestionados) o Airbyte 0.50+ (autoalojado, conectores open-source)
- **Data warehouse:** BigQuery (Google Cloud) o Snowflake (Enterprise / Business Critical)
- **Transformaciones:** dbt Core 1.8+ con adaptador dbt-bigquery o dbt-snowflake
- **Documentación + tests:** dbt docs, tests genéricos integrados de dbt + dbt-expectations, dbt-utils
- **Capa de métricas:** dbt Semantic Layer (MetricFlow 0.200+) con exposición JDBC/ADBC
- **Calidad de datos:** Soda Core 3.x (checks-as-code) o Great Expectations 0.18+ (GX Cloud)
- **BI / dashboards:** Looker (LookML) o Metabase 0.49+ (open-source)
- **Observabilidad de datos:** Monte Carlo o Bigeye (SaaS; conecta con el warehouse + manifiesto dbt)
- **Orquestación:** dbt Cloud Jobs o Apache Airflow 2.9+ (autoalojado) o Dagster 1.7+
- **Control de versiones:** GitHub (proyecto dbt, template de perfiles dbt, workflows CI)
- **Infraestructura:** Terraform 1.8+ (datasets BigQuery, warehouses Snowflake, IAM, conectores Fivetran)
- **Alertas:** Slack (alertas basadas en webhooks desde Soda, Monte Carlo, dbt Cloud)
- **Secretos:** Google Secret Manager o AWS Secrets Manager; referenciados en Terraform + perfiles dbt

## Árbol de directorios

```
analytics-platform/                          # Raíz del monorepo — versionado en GitHub
├── .claude/
│   ├── CLAUDE.md                            # Instrucciones a nivel de repositorio para Claude Code
│   ├── settings.json                        # Servidores MCP, hooks, permisos
│   └── commands/
│       ├── new-model.md                     # /new-model — generar modelo dbt staging/mart + tests
│       ├── run-quality.md                   # /run-quality — ejecutar checks Soda contra un dataset
│       ├── publish-dashboard.md             # /publish-dashboard — flujo LookML de Looker o Metabase
│       ├── data-incident.md                 # /data-incident — prompt de runbook para triaje de incidentes
│       └── seed-refresh.md                  # /seed-refresh — recargar seeds dbt desde CSVs fuente
├── .github/
│   └── workflows/
│       ├── ci.yml                           # dbt compile + test en PR contra target CI
│       ├── slim-ci.yml                      # dbt build --select state:modified+ (Slim CI)
│       └── deploy.yml                       # Ejecución dbt en producción activada al merge en main
├── terraform/                               # Infraestructura como código
│   ├── environments/
│   │   ├── prod/
│   │   │   ├── main.tf                      # Recursos BigQuery / Snowflake en producción
│   │   │   ├── variables.tf
│   │   │   └── terraform.tfvars.example     # Valores de variables de ejemplo — tfvars reales ignorados por git
│   │   └── dev/
│   │       ├── main.tf                      # Recursos de warehouse dev/staging
│   │       └── variables.tf
│   ├── modules/
│   │   ├── bigquery/
│   │   │   ├── datasets.tf                  # Datasets raw, staging, marts, metrics + IAM
│   │   │   └── service_accounts.tf          # Cuentas de servicio para dbt runner, Fivetran, Looker
│   │   ├── snowflake/
│   │   │   ├── warehouses.tf                # Warehouses virtuales por carga de trabajo (ETL, BI, ad-hoc)
│   │   │   ├── databases.tf                 # Bases de datos RAW, DEV, PROD + roles
│   │   │   └── grants.tf                    # Permisos por rol: transformer, reporter, loader
│   │   ├── fivetran/
│   │   │   └── connectors.tf                # Recursos de conectores Fivetran (proveedor: fivetran/fivetran)
│   │   └── iam/
│   │       └── roles.tf                     # Vinculaciones IAM con principio de mínimo privilegio
│   └── README.md                            # Uso de Terraform + configuración del backend de estado
├── dbt/                                     # Raíz del proyecto dbt Core
│   ├── dbt_project.yml                      # Nombre del proyecto, versión, rutas de modelos, valores por defecto de variables
│   ├── profiles.yml.template                # Template de perfil — el profiles.yml real está ignorado por git
│   ├── packages.yml                         # dbt-utils, dbt-expectations, dbt-date, codegen
│   ├── selectors.yml                        # Selectores con nombre: nightly, finance, marketing
│   ├── seeds/
│   │   ├── country_codes.csv                # Referencia estática: códigos de país ISO
│   │   ├── currency_rates.csv               # Tasas de cambio mensuales para normalización financiera
│   │   └── product_taxonomy.csv             # Mapping interno de taxonomía de producto/SKU
│   ├── macros/
│   │   ├── generate_schema_name.sql         # Enrutamiento de esquema personalizado por entorno + target
│   │   ├── cents_to_dollars.sql             # Macro de conversión de unidades monetarias
│   │   ├── surrogate_key.sql                # Encapsula dbt_utils.generate_surrogate_key
│   │   ├── not_null_proportion.sql          # Test personalizado: tasa de nulos en columna < umbral
│   │   └── freshness_check.sql              # Macro para verificar la antigüedad máxima de filas en horas
│   ├── models/
│   │   ├── staging/                         # 1:1 con tablas fuente — solo limpieza ligera
│   │   │   ├── stripe/
│   │   │   │   ├── _stripe__sources.yml     # Definiciones de fuentes + umbrales de frescura
│   │   │   │   ├── _stripe__models.yml      # Documentación a nivel de columna + tests genéricos para todos los modelos staging
│   │   │   │   ├── stg_stripe__customers.sql
│   │   │   │   ├── stg_stripe__subscriptions.sql
│   │   │   │   ├── stg_stripe__invoices.sql
│   │   │   │   └── stg_stripe__events.sql
│   │   │   ├── salesforce/
│   │   │   │   ├── _salesforce__sources.yml
│   │   │   │   ├── _salesforce__models.yml
│   │   │   │   ├── stg_salesforce__accounts.sql
│   │   │   │   ├── stg_salesforce__opportunities.sql
│   │   │   │   └── stg_salesforce__contacts.sql
│   │   │   ├── hubspot/
│   │   │   │   ├── _hubspot__sources.yml
│   │   │   │   ├── _hubspot__models.yml
│   │   │   │   ├── stg_hubspot__contacts.sql
│   │   │   │   └── stg_hubspot__deals.sql
│   │   │   └── app_db/                      # Réplica de la base de datos de producción (via Fivetran/Airbyte)
│   │   │       ├── _app_db__sources.yml
│   │   │       ├── _app_db__models.yml
│   │   │       ├── stg_app_db__users.sql
│   │   │       ├── stg_app_db__events.sql
│   │   │       └── stg_app_db__orders.sql
│   │   ├── intermediate/                    # Joins de lógica de negocio — no expuestos directamente al BI
│   │   │   ├── int_customer_subscriptions.sql   # Historial de cliente + suscripción combinado
│   │   │   ├── int_revenue_recognized.sql        # Cálculo del calendario de reconocimiento de ingresos ASC 606
│   │   │   └── int_user_sessions.sql             # Flujo de eventos sessionizado
│   │   └── marts/                           # Modelos finales listos para analítica, expuestos al BI
│   │       ├── core/
│   │       │   ├── _core__models.yml        # Docs + tests para todos los modelos del mart core
│   │       │   ├── dim_customers.sql        # Dimensión de cliente con atributos + segmentos
│   │       │   ├── dim_products.sql         # Jerarquía de producto desde el seed de taxonomía
│   │       │   ├── fct_orders.sql           # Tabla de hechos de pedidos con todas las claves foráneas + métricas
│   │       │   └── fct_subscriptions.sql    # Eventos del ciclo de vida de suscripciones
│   │       ├── finance/
│   │       │   ├── _finance__models.yml
│   │       │   ├── fct_mrr.sql              # Ingresos recurrentes mensuales por cuenta
│   │       │   ├── fct_arr_movements.sql    # Cascada ARR: nuevo, expansión, churn, contracción
│   │       │   └── fct_invoices.sql         # Ingresos a nivel de factura con calendario de reconocimiento
│   │       └── marketing/
│   │           ├── _marketing__models.yml
│   │           ├── fct_campaigns.sql        # Rendimiento de campañas: gasto, conversiones, CAC
│   │           └── fct_attribution.sql      # Modelo de atribución multi-touch
│   ├── metrics/                             # Definiciones MetricFlow del dbt Semantic Layer
│   │   ├── mrr.yml                          # Métrica MRR: medida, dimensiones, granularidades temporales
│   │   ├── arr.yml                          # Métrica ARR con filtros
│   │   ├── customer_count.yml               # Número de clientes activos por segmento
│   │   └── cac.yml                          # Métrica de costo de adquisición de clientes
│   ├── analyses/                            # SQL ad-hoc guardado como análisis dbt (no materializado)
│   │   └── churn_cohort_analysis.sql        # Análisis de retención por cohorte para revisiones trimestrales
│   └── tests/                               # Tests de datos singulares (lógica compleja, no genéricos)
│       ├── assert_mrr_nonnegative.sql       # El MRR nunca debe ser negativo a nivel de cuenta
│       └── assert_no_duplicate_orders.sql   # Los IDs de pedido deben ser únicos en todas las fuentes
├── quality/                                 # Checks de calidad de datos (Soda o Great Expectations)
│   ├── soda/
│   │   ├── configuration.yml                # Conexión Soda Cloud + credenciales del warehouse
│   │   ├── checks/
│   │   │   ├── staging/
│   │   │   │   ├── stripe_customers.yml     # Checks de frescura, completitud y formato
│   │   │   │   └── salesforce_accounts.yml
│   │   │   └── marts/
│   │   │       ├── fct_mrr.yml              # Checks de precisión de ingresos frente a la fuente
│   │   │       └── dim_customers.yml        # Unicidad de PK, integridad referencial
│   │   └── scan.sh                          # Punto de entrada: soda scan -d warehouse -c config
│   └── great_expectations/                  # Alternativa: configuración GX Cloud
│       ├── great_expectations.yml           # Datasource: conexión BigQuery o Snowflake
│       └── expectations/
│           ├── fct_orders_suite.json        # Suite de expectativas para la tabla de hechos de pedidos
│           └── dim_customers_suite.json
├── observability/                           # Configuración Monte Carlo / Bigeye + enrutamiento de alertas
│   ├── monte_carlo/
│   │   └── monitors.yml                     # Monitores de frescura + volumen a nivel de tabla
│   └── alerts/
│       └── slack_routing.yml                # Mapeo de severidad de alerta → canal de Slack
├── docs/                                    # Documentación complementaria
│   ├── data-dictionary.md                   # Glosario de negocio: definiciones canónicas de métricas
│   ├── lineage.md                           # Mapa de linaje fuente-a-BI para tablas clave
│   ├── incident-response.md                 # Runbook de respuesta a incidentes de calidad de datos
│   └── onboarding.md                        # Guía de incorporación para nuevos ingenieros de datos
├── scripts/
│   ├── bootstrap_dev.sh                     # Configurar perfil dbt local + esquema dev del warehouse
│   └── validate_manifest.py                 # Analizar manifest.json de dbt para verificar umbrales de cobertura
├── .env.example                             # Todas las variables de entorno requeridas documentadas con comentarios
└── .gitignore                               # profiles.yml, target/, dbt_packages/, *.tfvars
```

## Archivos clave explicados

| Ruta | Propósito |
|---|---|
| `dbt/dbt_project.yml` | Configuración a nivel de proyecto: valores por defecto de materialización de modelos por carpeta (staging → view, marts → table), valores por defecto de variables para lógica específica del entorno, ruta de destino |
| `dbt/macros/generate_schema_name.sql` | Sobrescribe el nombrado de esquemas por defecto de dbt para que las ejecuciones dev aterricen en un esquema de usuario específico (ej. `dbt_alice`) en lugar de sobrescribir esquemas compartidos |
| `dbt/models/staging/stripe/_stripe__sources.yml` | Declara las tablas Stripe brutas como fuentes dbt con umbrales de frescura; los fallos de frescura de fuente bloquean ejecuciones posteriores en CI |
| `dbt/metrics/mrr.yml` | Definición del modelo semántico MetricFlow: referencia `fct_mrr`, define la medida `mrr`, dimensiones soportadas (customer_segment, plan) y granularidades temporales (día, mes, trimestre) |
| `quality/soda/checks/marts/fct_mrr.yml` | Checks Soda ejecutados post-dbt: verifica que la suma de MRR coincide con la tolerancia esperada vs el día anterior, sin nulos en columnas clave, sin valores negativos — alerta Slack al fallar |
| `terraform/modules/bigquery/datasets.tf` | Crea los datasets BigQuery `raw`, `staging`, `marts` y `metrics` con IAM correcto: Fivetran writer → solo raw; cuenta de servicio dbt → staging + marts; Looker → marts + metrics solo lectura |
| `dbt/selectors.yml` | Los selectores con nombre permiten que `dbt build --selector nightly` ejecute el DAG completo y `--selector finance` ejecute solo los modelos del mart finance + sus dependencias upstream |
| `.github/workflows/slim-ci.yml` | Usa el Slim CI de dbt: compara el `manifest.json` del PR con el artefacto de manifiesto de producción para solo construir y testear los modelos modificados en el PR, reduciendo el tiempo de CI en un 60–80 % |
| `observability/alerts/slack_routing.yml` | Mapea niveles de severidad de alertas a canales Slack: critical → #data-incidents, warning → #data-quality, info → #data-observability; previene la fatiga de alertas |
| `docs/data-dictionary.md` | Definiciones canónicas para todas las métricas de negocio: MRR, ARR, CAC, churn — referenciadas en descripciones de modelos dbt y etiquetas LookML de Looker para garantizar coherencia |

## Scaffolding rápido

```bash
# Prerrequisitos: Python 3.11+, pip o pipx, Terraform 1.8+, GitHub CLI

# Crear la raíz del proyecto y acceder a ella
mkdir analytics-platform && cd analytics-platform
git init

# Configurar el entorno virtual Python para dbt
python -m venv .venv && source .venv/bin/activate

# Instalar dbt Core con el adaptador de tu warehouse
pip install dbt-core==1.8.* dbt-bigquery==1.8.*
# O para Snowflake:
# pip install dbt-core==1.8.* dbt-snowflake==1.8.*

# Instalar Soda Core
pip install soda-core-bigquery==3.*
# O para Snowflake: pip install soda-core-snowflake==3.*

# Guardar dependencias
pip freeze > requirements.txt

# Inicializar el proyecto dbt
dbt init dbt --skip-profile-setup
cd dbt

# Instalar paquetes dbt
cat > packages.yml <<'EOF'
packages:
  - package: dbt-labs/dbt_utils
    version: [">=1.1.0", "<2.0.0"]
  - package: calogica/dbt_expectations
    version: [">=0.10.0", "<1.0.0"]
  - package: dbt-labs/codegen
    version: [">=0.12.0", "<1.0.0"]
  - package: calogica/dbt_date
    version: [">=0.10.0", "<1.0.0"]
EOF
dbt deps
cd ..

# Crear estructura de directorios
mkdir -p dbt/models/staging/{stripe,salesforce,hubspot,app_db}
mkdir -p dbt/models/intermediate
mkdir -p dbt/models/marts/{core,finance,marketing}
mkdir -p dbt/metrics dbt/analyses dbt/tests dbt/seeds dbt/macros
mkdir -p quality/soda/checks/{staging,marts}
mkdir -p quality/great_expectations/expectations
mkdir -p observability/{monte_carlo,alerts}
mkdir -p terraform/environments/{prod,dev}
mkdir -p terraform/modules/{bigquery,snowflake,fivetran,iam}
mkdir -p docs scripts
mkdir -p .github/workflows
mkdir -p .claude/commands

# Inicializar Terraform
cd terraform && terraform init && cd ..

# Crear .env.example
cat > .env.example <<'EOF'
# BigQuery
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
BQ_PROJECT=your-gcp-project-id
BQ_DATASET_RAW=raw
BQ_DATASET_STAGING=staging
BQ_DATASET_MARTS=marts

# Snowflake (alternativa)
SNOWFLAKE_ACCOUNT=yourorg-youraccountname
SNOWFLAKE_USER=dbt_runner
SNOWFLAKE_PRIVATE_KEY_PATH=/path/to/rsa_key.p8
SNOWFLAKE_DATABASE=PROD
SNOWFLAKE_WAREHOUSE=TRANSFORMING

# dbt
DBT_TARGET=dev
DBT_PROFILES_DIR=~/.dbt

# Soda
SODA_API_KEY_ID=your-soda-api-key-id
SODA_API_KEY_SECRET=your-soda-api-key-secret

# Alertas Slack
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/xxx/yyy/zzz
SLACK_CHANNEL_INCIDENTS=#data-incidents

# Monte Carlo
MONTECARLO_API_KEY_ID=your-mc-key-id
MONTECARLO_API_TOKEN=your-mc-token

# Estado de Terraform
TF_STATE_BUCKET=your-terraform-state-bucket
EOF

# Crear .gitignore
cat > .gitignore <<'EOF'
.venv/
dbt/target/
dbt/dbt_packages/
dbt/logs/
profiles.yml
*.tfvars
!*.tfvars.example
.env
*.credentials.json
__pycache__/
.DS_Store
EOF

# Configurar Claude Code
touch .claude/CLAUDE.md .claude/settings.json
touch .claude/commands/new-model.md
touch .claude/commands/run-quality.md
touch .claude/commands/publish-dashboard.md
touch .claude/commands/data-incident.md

# Instalar skills de UitKit
npx uitkit add skill data-ml/sql
npx uitkit add skill data-ml/dbt-data-pipelines
npx uitkit add skill data-ml/data-quality-checker
npx uitkit add skill data-ml/dashboard-narrator
npx uitkit add skill data-ml/stakeholder-report
npx uitkit add skill devops-infra/terraform
npx uitkit add skill devops-infra/cicd

echo "Plataforma de analítica generada. Siguiente paso: configurar profiles.yml, configurar el backend de Terraform, ejecutar: dbt debug"
```

## Template CLAUDE.md

```markdown
# Analytics Platform

Monorepo de ingeniería de datos que gestiona el stack completo de analítica: Fivetran/Airbyte para ingesta,
BigQuery o Snowflake como warehouse, dbt Core 1.8 para transformaciones y métricas,
Soda para checks de calidad de datos, y Looker o Metabase para la entrega de BI.
Monte Carlo o Bigeye proporciona observabilidad. Toda la infraestructura está gestionada con Terraform.

## Stack

- dbt Core 1.8 + adaptador dbt-bigquery o dbt-snowflake
- Warehouse: BigQuery (Google Cloud) o Snowflake
- Ingesta: Fivetran (gestionado) o Airbyte (autoalojado)
- Calidad de datos: Soda Core 3.x (checks-as-code YAML)
- Métricas: dbt Semantic Layer con MetricFlow
- Observabilidad: Monte Carlo o Bigeye
- BI: Looker (LookML) o Metabase
- Orquestación: dbt Cloud Jobs o Airflow 2.9+ o Dagster 1.7
- Infraestructura: Terraform 1.8
- Alertas: webhooks de Slack
- CI/CD: GitHub Actions (slim CI en PR, ejecución completa en merge a main)

## Organización del proyecto

- `dbt/models/staging/` — 1:1 con tablas fuente brutas; solo renombrar, castear, coalescear — sin joins
- `dbt/models/intermediate/` — joins de lógica de negocio; no expuestos al BI
- `dbt/models/marts/` — tablas finales orientadas al consumidor; expuestas a Looker / Metabase
- `dbt/metrics/` — definiciones del modelo semántico MetricFlow
- `dbt/macros/` — macros Jinja reutilizables; documentar siempre entradas y salidas
- `dbt/seeds/` — CSVs de referencia estáticos; solo para datos de lookup de cambio lento
- `quality/soda/` — checks Soda ejecutados post-dbt contra tablas mart
- `terraform/` — toda la infraestructura definida aquí; sin cambios manuales en la consola
- `observability/` — configuraciones de monitores Monte Carlo y enrutamiento de alertas Slack

## Añadir un nuevo modelo dbt — pasos exactos

1. Determinar la capa correcta: staging (raw 1:1), intermediate (lógica de negocio con joins) o mart (listo para BI)
2. Para staging: ejecutar `dbt run-operation codegen.generate_source` para generar el YAML fuente
3. Crear el archivo SQL en el subdirectorio correcto siguiendo la convención de nomenclatura:
   - Staging: `stg_{source}__{entity}.sql`
   - Intermediate: `int_{description}.sql`
   - Mart: `fct_{fact_name}.sql` o `dim_{dimension_name}.sql`
4. Añadir el modelo al archivo `_models.yml` correspondiente con descripción y documentación a nivel de columna
5. Añadir como mínimo: tests `not_null` + `unique` en la clave primaria; `accepted_values` en columnas enum
6. Para marts: añadir un archivo de check Soda correspondiente en `quality/soda/checks/marts/`
7. Ejecutar localmente: `dbt build --select +your_model_name+ --target dev`
8. Verificar con: `dbt test --select your_model_name`
9. Usar el comando slash `/new-model` para generar el boilerplate SQL + YAML

## Ejecutar checks de calidad de datos

```bash
# Ejecutar checks Soda para un dataset específico
cd quality/soda
soda scan -d bigquery -c configuration.yml checks/marts/fct_mrr.yml

# Ejecutar todos los checks de staging
soda scan -d bigquery -c configuration.yml checks/staging/

# Ejecutar todos los checks de mart (típicamente tras completar dbt build)
soda scan -d bigquery -c configuration.yml checks/marts/

# Usar el comando slash /run-quality para ejecución guiada por Claude
```

La configuración de Soda espera `SODA_API_KEY_ID` y `SODA_API_KEY_SECRET` en el entorno.
Los checks fallidos envían alertas de Slack a través del webhook configurado en `observability/alerts/slack_routing.yml`.

## Publicar un dashboard de Looker

1. Añadir o actualizar los archivos de vista LookML que referencian el modelo mart
2. Definir explores en el archivo de modelo con los joins y filtros de acceso apropiados
3. Crear o actualizar el archivo LookML del dashboard en `looker/dashboards/`
4. Ejecutar `lookml-linter` localmente antes de hacer push
5. Hacer merge a main — Looker extrae automáticamente desde la rama GitHub conectada
6. Validar en el IDE de Looker: el Content Validator debe pasar con cero errores
7. Para Metabase: conectarse directamente a la tabla mart, construir la pregunta, guardar en la colección
8. Usar el comando slash `/publish-dashboard` para scaffolding LookML guiado

## dbt Semantic Layer / MetricFlow

- Las definiciones de métricas se encuentran en `dbt/metrics/*.yml` — no dentro de los archivos YAML de modelos
- Cada métrica debe referenciar un modelo semántico (la tabla mart subyacente)
- Granularidades temporales soportadas: `day`, `week`, `month`, `quarter`, `year`
- Testear métricas localmente: `dbt sl query --metrics mrr --group-by metric_time__month`
- Métricas expuestas a Looker a través de la conexión JDBC del dbt Semantic Layer; no duplicar en LookML
- Añadir una métrica: definir en YAML, ejecutar `dbt sl validate`, luego `dbt sl generate-metrics-docs`

## Convenciones de variables de entorno

| Variable | Propósito | Dónde configurar |
|---|---|---|
| `GOOGLE_APPLICATION_CREDENTIALS` | Ruta al JSON de la cuenta de servicio de BigQuery | Local ~/.zshrc, secret de CI |
| `SNOWFLAKE_PRIVATE_KEY_PATH` | Ruta a la clave RSA para auth de Snowflake | Local ~/.zshrc, secret de CI |
| `DBT_TARGET` | Target dbt activo: `dev`, `ci` o `prod` | Establecido por invocación o en el entorno de CI |
| `SODA_API_KEY_ID` / `SODA_API_KEY_SECRET` | Autenticación de Soda Cloud | Secret de CI, .env local |
| `SLACK_WEBHOOK_URL` | Webhook entrante de Slack para alertas de calidad | Secret de CI, .env local |
| `MONTECARLO_API_KEY_ID` / `MONTECARLO_API_TOKEN` | Acceso API de Monte Carlo | Secret de CI |
| `TF_STATE_BUCKET` | Bucket GCS o S3 para estado remoto de Terraform | Secret de CI |

Nunca commitear archivos `.env`, `profiles.yml` o `*.tfvars` que contengan credenciales reales.
Todas las variables deben estar documentadas en `.env.example` antes del merge.

## Modelo de control de acceso

- **Capa raw:** la cuenta de servicio de Fivetran tiene acceso de escritura; sin usuarios humanos
- **Staging + marts:** la cuenta de servicio del dbt runner tiene acceso de escritura; las cuentas de servicio de Looker / Metabase tienen acceso de lectura
- **Esquemas dev:** cada ingeniero tiene su propio esquema (`dbt_<username>`); aislado mediante la macro `generate_schema_name`
- **Esquemas de producción:** solo el runner de dbt Cloud / CI puede escribir; aplicado vía IAM / grants de Snowflake
- **Terraform:** los cambios de infraestructura requieren revisión de PR; `terraform apply` solo se ejecuta en CI al hacer merge a main
- **Looker:** el acceso al contenido está controlado por grupos de Looker mapeados a roles del equipo de datos

## Respuesta a incidentes de calidad de datos

1. **Se activa la alerta** (check Soda o Monte Carlo): aparece en el canal Slack #data-incidents
2. **Triaje** (< 15 min): usar el comando slash `/data-incident` para ejecutar el prompt de triaje guiado
3. **Identificar el alcance**: revisar el linaje del manifiesto dbt para encontrar todos los modelos aguas abajo + dashboards afectados
4. **Cuarentena**: si los datos son incorrectos en producción, añadir un filtro `where false` al modelo mart afectado y redesplegar para evitar que los consumidores de BI vean datos incorrectos
5. **Causa raíz**: verificar la frescura de la fuente (`dbt source freshness`), recuentos de filas en tablas brutas, estado del conector Fivetran
6. **Corregir**: solucionar el problema en la fuente upstream o la lógica dbt; ejecutar `dbt build --select +affected_model+`
7. **Volver a ejecutar checks de calidad**: `soda scan` contra las tablas afectadas antes de levantar la cuarentena
8. **Post-mortem**: documentar en `docs/incident-response.md` con cronología, causa raíz y medidas de prevención
9. **Notificar a los stakeholders**: usar el skill `/stakeholder-report` para generar un resumen del incidente

## Flujo de trabajo de Terraform

```bash
# Planificar cambios (siempre antes de aplicar)
cd terraform/environments/prod
terraform init -backend-config="bucket=${TF_STATE_BUCKET}"
terraform plan -out=tfplan

# Aplicar (solo CI para producción; el entorno dev local es aceptable)
terraform apply tfplan

# Nunca usar terraform apply sin un archivo de plan en producción
```

## Estrategia de materialización de modelos dbt

- `staging/` → `view` (económico, siempre fresco, sin costo de almacenamiento)
- `intermediate/` → `ephemeral` o `view` (depende de la complejidad de la consulta)
- `marts/core/` → `table` (actualizado en cada ejecución; tablas pequeñas de menos de 10M filas)
- `marts/finance/`, `marts/marketing/` → `incremental` para tablas de hechos grandes (> 10M filas)
- `metrics/` → gestionado por MetricFlow; no establecer materialización manualmente

## Qué no hacer

- No hacer joins entre modelos staging — los joins pertenecen a las capas intermediate o mart
- No codificar en duro nombres de warehouse o dataset en SQL — usar `{{ target.schema }}` y `{{ ref() }}`
- No ejecutar `dbt run` en producción sin ejecutar `dbt test` inmediatamente después
- No modificar `dbt/target/manifest.json` manualmente — es un artefacto generado
- No aplicar cambios de Terraform en producción sin un plan aprobado vía PR
- No otorgar acceso a la capa raw a herramientas de BI — Looker y Metabase solo deben leer desde los marts
- No añadir una métrica en Looker LookML si ya está definida en el dbt Semantic Layer
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
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/yourname/analytics-platform"
      ]
    },
    "bigquery": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-bigquery"],
      "env": {
        "GOOGLE_APPLICATION_CREDENTIALS": "${GOOGLE_APPLICATION_CREDENTIALS}",
        "BIGQUERY_PROJECT": "${BQ_PROJECT}"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "POSTGRES_CONNECTION_STRING": "${POSTGRES_CONNECTION_STRING}"
      }
    },
    "slack": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-slack"],
      "env": {
        "SLACK_BOT_TOKEN": "${SLACK_BOT_TOKEN}"
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
            "command": "bash -c 'f=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$f\" == */dbt/models/*.sql ]]; then echo \"[HOOK] dbt model written — run: dbt compile --select $(basename $f .sql) to verify Jinja renders\" >&2; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'f=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$f\" == */dbt/metrics/*.yml ]]; then echo \"[HOOK] MetricFlow metric written — validate with: dbt sl validate\" >&2; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'f=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$f\" == */terraform/*.tf ]]; then echo \"[HOOK] Terraform file changed — run: terraform validate && terraform plan\" >&2; fi'"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_COMMAND\" | grep -qE \"dbt run|dbt build\" && echo \"$CLAUDE_TOOL_INPUT_COMMAND\" | grep -qv \"\\-\\-target dev\"; then echo \"[HOOK] WARNING: running dbt without --target dev — confirm this is intentional\" >&2; fi'"
          }
        ]
      },
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_COMMAND\" | grep -q \"terraform apply\" && echo \"$CLAUDE_TOOL_INPUT_COMMAND\" | grep -qv \"tfplan\"; then echo \"[HOOK] BLOCKED: always run terraform plan first and apply with a plan file\" >&2; exit 1; fi'"
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
npx uitkit add skill data-ml/dbt-data-pipelines
npx uitkit add skill data-ml/data-quality-checker
npx uitkit add skill data-ml/dashboard-narrator
npx uitkit add skill data-ml/stakeholder-report
npx uitkit add skill devops-infra/terraform
npx uitkit add skill devops-infra/cicd
npx uitkit add skill productivity/stakeholder-comms
```

## Recursos relacionados

- [Guía de dbt Data Pipelines](../guides/dbt-data-pipelines.md)
- [Workflow de Calidad de Datos](../workflows/data-quality-pipeline.md)
- [Workflow de Informe a Stakeholders](../workflows/stakeholder-reporting.md)
- [Estructura de Infraestructura como Código](./infrastructure-as-code.md)
- [Estructura de Pipeline de Datos](./data-pipeline.md)
