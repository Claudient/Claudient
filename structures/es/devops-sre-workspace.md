# Espacio de trabajo DevOps / SRE — Estructura de proyecto

> Para un ingeniero DevOps o SRE que gestiona infraestructura cloud, CI/CD, respuesta a incidentes y fiabilidad de la plataforma a escala.

## Stack

- **Cloud:** AWS (EC2, ECS, RDS, S3, CloudFront, IAM, VPC) / GCP / Azure
- **IaC:** Terraform 1.7+ con Terragrunt para orquestación multi-entorno
- **Contenedores:** Kubernetes 1.29+, Helm 3, ArgoCD 2.10 (GitOps)
- **CI/CD:** GitHub Actions con workflows reutilizables y acciones compuestas
- **Observabilidad:** Datadog (APM, logs, infraestructura) o Grafana + Prometheus + Loki
- **Alertas:** PagerDuty con políticas de escalado y rotaciones de guardia
- **Runtime de contenedores:** Docker 25+ con builds multi-etapa
- **Gestor de paquetes:** Helm para Kubernetes, npm para scripts de herramientas
- **Gestión de secretos:** AWS Secrets Manager o HashiCorp Vault
- **Policy as code:** OPA / Conftest para control de admisión en Terraform y Kubernetes

## Árbol de directorios

```
devops-sre-workspace/
├── .claude/
│   ├── CLAUDE.md                       # Instrucciones del espacio de trabajo para Claude Code
│   ├── settings.json                   # Servidores MCP, hooks, permisos
│   └── commands/
│       ├── incident-response.md        # /incident-response — triaje estructurado y sala de guerra
│       ├── deploy-check.md             # /deploy-check — checklist de seguridad pre-despliegue
│       ├── cost-review.md              # /cost-review — análisis de costes cloud y detección de anomalías
│       ├── capacity-plan.md            # /capacity-plan — previsión de recursos y escalado
│       ├── postmortem.md               # /postmortem — redactor estructurado de postmortems
│       ├── runbook-new.md              # /runbook-new — generar runbook desde el historial de incidentes
│       └── infra-change.md             # /infra-change — análisis de impacto de cambios IaC
├── runbooks/
│   ├── _template.md                    # Formato canónico de runbook (fuente de verdad)
│   ├── payment-service.md              # Runbook por servicio: alertas, pasos de resolución
│   ├── auth-service.md
│   ├── api-gateway.md
│   ├── database-postgres.md            # Específico de base de datos: replicación, failover, vacuum
│   ├── redis-cluster.md                # Redis: evicción, agotamiento de conexiones, split de clúster
│   ├── kafka-brokers.md                # Kafka: particiones infra-replicadas, retraso de consumidores
│   ├── kubernetes-nodes.md             # Presión de nodos, evicción, OOM, presión de disco
│   ├── kubernetes-networking.md        # Problemas CNI, fallos DNS, timeouts de ingress
│   └── argocd-sync-failures.md         # Fallos de sincronización GitOps y procedimientos de rollback
├── postmortems/
│   ├── _template.md                    # Formato de postmortem: cronología, causa raíz, acciones
│   ├── 2024-11-15-payment-outage.md    # Revisión de incidente con fecha
│   ├── 2024-12-02-db-failover.md
│   └── 2025-01-20-deploy-rollback.md
├── terraform/
│   ├── modules/
│   │   ├── vpc/
│   │   │   ├── main.tf                 # VPC, subredes, tablas de enrutamiento, gateway NAT
│   │   │   ├── variables.tf
│   │   │   ├── outputs.tf
│   │   │   └── README.md
│   │   ├── eks-cluster/
│   │   │   ├── main.tf                 # Plano de control EKS, grupos de nodos, roles IAM
│   │   │   ├── variables.tf
│   │   │   ├── outputs.tf
│   │   │   └── README.md
│   │   ├── rds-postgres/
│   │   │   ├── main.tf                 # Instancia RDS, grupos de parámetros, grupos de seguridad
│   │   │   ├── variables.tf
│   │   │   ├── outputs.tf
│   │   │   └── README.md
│   │   ├── iam-roles/
│   │   │   ├── main.tf                 # Roles IRSA, políticas, relaciones de confianza
│   │   │   ├── variables.tf
│   │   │   └── outputs.tf
│   │   └── s3-bucket/
│   │       ├── main.tf                 # Bucket, versionado, ciclo de vida, replicación
│   │       ├── variables.tf
│   │       └── outputs.tf
│   ├── environments/
│   │   ├── production/
│   │   │   ├── terragrunt.hcl          # Entradas específicas del entorno, configuración de estado remoto
│   │   │   ├── vpc/terragrunt.hcl
│   │   │   ├── eks/terragrunt.hcl
│   │   │   └── rds/terragrunt.hcl
│   │   ├── staging/
│   │   │   ├── terragrunt.hcl
│   │   │   └── eks/terragrunt.hcl
│   │   └── dev/
│   │       └── terragrunt.hcl
│   └── terragrunt.hcl                  # Raíz: backend de estado remoto, versiones de proveedores
├── kubernetes/
│   ├── base/
│   │   ├── namespaces.yaml             # Todas las definiciones de namespaces
│   │   ├── resource-quotas.yaml        # Límites de CPU/memoria por namespace
│   │   ├── network-policies.yaml       # Denegación por defecto, reglas de permiso servicio a servicio
│   │   └── pod-disruption-budgets.yaml # Definiciones PDB para cargas de trabajo con estado
│   ├── helm/
│   │   ├── payment-service/
│   │   │   ├── Chart.yaml
│   │   │   ├── values.yaml             # Valores por defecto: réplicas, recursos, configuración HPA
│   │   │   ├── values-production.yaml  # Sobreescrituras de producción: límites más altos, anti-afinidad
│   │   │   ├── values-staging.yaml
│   │   │   └── templates/
│   │   │       ├── deployment.yaml
│   │   │       ├── service.yaml
│   │   │       ├── hpa.yaml            # Definición HorizontalPodAutoscaler
│   │   │       ├── pdb.yaml
│   │   │       └── servicemonitor.yaml # Prometheus ServiceMonitor
│   │   └── api-gateway/
│   │       ├── Chart.yaml
│   │       └── values.yaml
│   └── argocd/
│       ├── apps/
│       │   ├── payment-service.yaml    # Manifiesto de Application de ArgoCD
│       │   └── api-gateway.yaml
│       └── app-of-apps.yaml            # ApplicationSet raíz para todos los servicios
├── ci-cd/
│   ├── .github/
│   │   └── workflows/
│   │       ├── deploy-production.yml   # Despliegue en producción: plan, aprobación, apply, notificación
│   │       ├── deploy-staging.yml      # Staging: despliegue automático al fusionar en main
│   │       ├── terraform-plan.yml      # PR: ejecutar terraform plan, publicar diff como comentario
│   │       ├── helm-lint.yml           # PR: helm lint y validación de templates
│   │       ├── security-scan.yml       # Escaneo de imagen Trivy, tfsec, checkov
│   │       └── cost-estimation.yml     # Infracost en PRs de Terraform
│   └── composite-actions/
│       ├── setup-aws/action.yml        # Configurar credenciales AWS mediante OIDC
│       ├── setup-kubectl/action.yml    # Configurar kubeconfig para el clúster destino
│       └── notify-slack/action.yml     # Publicar estado de despliegue en canal de Slack
├── oncall/
│   ├── rotation-schedule.md            # Rotación de guardia: quién, cuándo, proceso de traspaso
│   ├── alert-definitions.md            # Todas las alertas PagerDuty: umbral, severidad, responsable
│   ├── escalation-paths.md             # Contactos de escalado P1/P2/P3 y SLAs
│   ├── onboarding-checklist.md         # Checklist para nuevo ingeniero de guardia: acceso, configuración, shadowing
│   └── incident-channels.md            # Canales de Slack, proceso de sala de guerra, comunicación con stakeholders
└── docs/
    ├── architecture/
    │   ├── system-overview.md          # Diagrama de arquitectura de alto nivel y mapa de servicios
    │   ├── network-topology.md         # Diseño VPC, peering, subredes públicas/privadas
    │   └── data-flow.md                # Flujo de datos: ingress → servicios → bases de datos → egress
    ├── service-catalog.md              # Todos los servicios: responsable, repositorio, SLO, enlace a runbook
    ├── slo-registry.md                 # Definiciones de SLO, presupuestos de error, tasas de consumo
    └── disaster-recovery.md            # Objetivos RPO/RTO, procedimientos de failover, simulacros DR
```

## Archivos clave explicados

| Ruta | Propósito |
|---|---|
| `.claude/commands/incident-response.md` | Comando slash que ejecuta la habilidad de triaje estructurado de incidentes — genera cronología, asigna severidad, redacta actualización para stakeholders |
| `.claude/commands/infra-change.md` | Analiza la salida del plan Terraform para evaluar el radio de explosión, riesgos de dependencia y complejidad del rollback antes de cualquier apply de infraestructura |
| `runbooks/_template.md` | Formato canónico de runbook: descripción del servicio, catálogo de alertas con árboles de decisión, rutas de escalado, operaciones comunes, puntos críticos |
| `terraform/environments/production/terragrunt.hcl` | Configuración Terragrunt específica de producción: backend de estado remoto, sobreescrituras de variables de entrada, ordenación de dependencias |
| `kubernetes/helm/payment-service/values-production.yaml` | Valores Helm de producción: número de réplicas, límites de recursos, reglas de anti-afinidad, umbrales HPA |
| `ci-cd/.github/workflows/terraform-plan.yml` | Workflow de GitHub Actions que ejecuta `terraform plan` en los PRs y publica el diff como comentario con estimación de costes |
| `oncall/alert-definitions.md` | Fuente de verdad única para todos los nombres de alertas PagerDuty, cadenas de consulta Datadog/Grafana, umbrales, severidad y enlaces a runbooks |
| `docs/slo-registry.md` | Todos los SLOs de servicio: objetivo de disponibilidad, SLI de latencia, ventana de presupuesto de error, umbrales de alerta de tasa de consumo, cadencia de revisión |

## Scaffold rápido

```bash
# Crear la estructura completa del espacio de trabajo DevOps/SRE
mkdir -p devops-sre-workspace

cd devops-sre-workspace

# Configuración de Claude Code
mkdir -p .claude/commands

# Directorios operativos
mkdir -p runbooks postmortems oncall

# Infrastructure as Code
mkdir -p terraform/modules/vpc terraform/modules/eks-cluster terraform/modules/rds-postgres
mkdir -p terraform/modules/iam-roles terraform/modules/s3-bucket
mkdir -p terraform/environments/production/vpc terraform/environments/production/eks terraform/environments/production/rds
mkdir -p terraform/environments/staging/eks terraform/environments/dev

# Kubernetes y Helm
mkdir -p kubernetes/base
mkdir -p kubernetes/helm/payment-service/templates
mkdir -p kubernetes/helm/api-gateway/templates
mkdir -p kubernetes/argocd/apps

# Pipelines CI/CD
mkdir -p ci-cd/.github/workflows
mkdir -p ci-cd/composite-actions/setup-aws
mkdir -p ci-cd/composite-actions/setup-kubectl
mkdir -p ci-cd/composite-actions/notify-slack

# Documentación
mkdir -p docs/architecture

# Crear archivos clave
touch runbooks/_template.md postmortems/_template.md
touch oncall/rotation-schedule.md oncall/alert-definitions.md oncall/escalation-paths.md
touch docs/service-catalog.md docs/slo-registry.md docs/disaster-recovery.md
touch docs/architecture/system-overview.md docs/architecture/network-topology.md

# Instalar habilidades
npx claudient add skill devops-infra/oncall-runbook
npx claudient add skill devops-infra/capacity-planner
npx claudient add skill devops-infra/observability-designer
npx claudient add skill devops-infra/slo-architect
npx claudient add skill devops-infra/chaos-engineering
npx claudient add skill devops-infra/terraform
npx claudient add skill devops-infra/kubernetes
npx claudient add skill devops-infra/cicd
npx claudient add skill devops-infra/aws-architect

# Copiar habilidades instaladas como comandos del espacio de trabajo
cp ~/.claude/skills/devops-infra/oncall-runbook.md .claude/commands/runbook-new.md
cp ~/.claude/skills/devops-infra/capacity-planner.md .claude/commands/capacity-plan.md

echo "Espacio de trabajo DevOps/SRE creado."
```

## Plantilla CLAUDE.md

```markdown
# Espacio de trabajo DevOps / SRE

Este espacio de trabajo es el centro operativo para infraestructura cloud, pipelines CI/CD,
respuesta a incidentes y fiabilidad de la plataforma. El trabajo aquí es crítico para producción
— la precisión y la exactitud importan más que la velocidad.

## Stack

- Cloud: AWS (EKS, RDS, S3, IAM, VPC, CloudFront)
- IaC: Terraform 1.7 + Terragrunt (orquestación multi-entorno)
- Contenedores: Kubernetes 1.29, Helm 3, ArgoCD 2.10 (GitOps)
- CI/CD: GitHub Actions con autenticación OIDC (sin credenciales estáticas)
- Observabilidad: Datadog (APM, infraestructura, logs) + PagerDuty
- Gestión de secretos: AWS Secrets Manager (producción), Vault (staging/dev)

## Convenciones de directorios

- `runbooks/` — un archivo por servicio o escenario; seguir siempre _template.md
- `postmortems/` — nombrados YYYY-MM-DD-nombre-incidente.md; nunca eliminar los antiguos
- `terraform/modules/` — solo módulos reutilizables; no incluir configuración de entorno aquí
- `terraform/environments/` — configuraciones Terragrunt por entorno; sin archivos .tf directos
- `kubernetes/helm/` — un chart Helm por servicio; values-production.yaml siempre presente
- `ci-cd/.github/workflows/` — sin secretos codificados; todas las credenciales mediante OIDC o Secrets Manager

## Tareas comunes — usar estos comandos exactos

### Respuesta a incidente (incidente activo)
/incident-response

### Verificación de seguridad pre-despliegue
/deploy-check

### Generar un nuevo runbook desde el historial de incidentes
/runbook-new

### Redactar un postmortem
/postmortem

### Análisis de impacto de cambio de infraestructura
/infra-change — pegar la salida del plan terraform

### Revisión de costes cloud
/cost-review

### Planificación de capacidad
/capacity-plan

## Convenciones de Terraform

- Ejecutar siempre `terraform plan` y obtener revisión antes de `apply` en producción
- Las entradas de módulos deben tener descripciones y restricciones de tipo — sin `any` desnudo
- Etiquetar todos los recursos: Environment, Team, Service, ManagedBy=terraform
- Archivos de estado: uno por entorno por módulo — nunca compartir estado entre entornos
- Usar `terragrunt run-all plan` para planificación multi-módulo con gestión de dependencias

## Convenciones de Kubernetes

- Todas las cargas de trabajo deben tener: solicitudes y límites de recursos, readinessProbe, livenessProbe
- HPA configurado para todos los servicios sin estado: mín. 2 réplicas, máx. basado en plan de capacidad
- PodDisruptionBudget requerido para todos los servicios con SLO
- Nunca `kubectl apply` directamente en producción — todos los cambios a través de ArgoCD
- `kubectl exec` en pods de producción requiere justificación en el canal de incidentes

## Convenciones de runbooks

- Cada runbook debe enlazar al dashboard Datadog/Grafana de ese servicio
- Los pasos de alerta deben usar comandos exactos — sin "revisar los logs" sin `kubectl logs -n X`
- Las rutas de escalado deben nombrar personas reales y sus handles de Slack, no solo roles
- Los runbooks con más de 90 días deben revisarse — marcar con `[OBSOLETO - revisión necesaria]`

## Comportamiento de guardia

- P1: alertar inmediatamente, abrir sala de guerra en #incident-p1, actualizar cada 15 minutos
- P2: resolver en 4 horas o escalar
- P3: resolver antes del siguiente día hábil
- Todos los incidentes: crear entrada de postmortem aunque se resuelvan rápidamente
- Después de cada incidente: actualizar el runbook relevante con nuevos hallazgos

## Qué no hacer

- No commitear secretos, archivos kubeconfig ni directorios .terraform/
- No aplicar terraform en producción sin revisión del plan por un segundo ingeniero
- No eliminar postmortems — son la memoria operativa de este equipo
- No crear manifiestos de Kubernetes fuera de la estructura del chart Helm
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
        "/Users/yourname/devops-sre-workspace"
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
            "command": "bash -c 'if [[ \"$CLAUDE_TOOL_INPUT_FILE_PATH\" == *\".tf\" ]]; then terraform fmt \"$CLAUDE_TOOL_INPUT_FILE_PATH\" 2>/dev/null || true; fi'"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_COMMAND\" | grep -qE \"kubectl (delete|apply|exec).*(production|prod)\"; then echo \"[HOOK] Operación de escritura kubectl en producción detectada — confirme que es intencional\" >&2; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if git -C \"$PWD\" diff --name-only 2>/dev/null | grep -qE \"\\.(tf|yaml|yml)$\"; then echo \"Aviso: cambios de infraestructura sin commitear detectados — revise antes de terminar la sesión.\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Habilidades a instalar

```bash
npx claudient add skill devops-infra/oncall-runbook
npx claudient add skill devops-infra/capacity-planner
npx claudient add skill devops-infra/observability-designer
npx claudient add skill devops-infra/slo-architect
npx claudient add skill devops-infra/chaos-engineering
npx claudient add skill devops-infra/terraform
npx claudient add skill devops-infra/kubernetes
npx claudient add skill devops-infra/cicd
npx claudient add skill devops-infra/aws-architect
```

## Relacionado

- [Guía del ingeniero DevOps / SRE](../guides/for-devops-engineer.md)
- [Workflow de respuesta a incidentes](../workflows/devops-incident.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
