# DevOps / SRE Workspace — Project Structure

> For a DevOps or SRE engineer managing cloud infrastructure, CI/CD, incident response, and platform reliability at scale.

## Stack

- **Cloud:** AWS (EC2, ECS, RDS, S3, CloudFront, IAM, VPC) / GCP / Azure
- **IaC:** Terraform 1.7+ with Terragrunt for multi-environment orchestration
- **Containers:** Kubernetes 1.29+, Helm 3, ArgoCD 2.10 (GitOps)
- **CI/CD:** GitHub Actions with reusable workflows and composite actions
- **Observability:** Datadog (APM, logs, infrastructure) or Grafana + Prometheus + Loki
- **Alerting:** PagerDuty with escalation policies and on-call rotations
- **Container runtime:** Docker 25+ with multi-stage builds
- **Package manager:** Helm for Kubernetes, npm for tooling scripts
- **Secret management:** AWS Secrets Manager or HashiCorp Vault
- **Policy as code:** OPA / Conftest for Terraform and Kubernetes admission control

## Directory tree

```
devops-sre-workspace/
├── .claude/
│   ├── CLAUDE.md                       # Workspace instructions for Claude Code
│   ├── settings.json                   # MCP servers, hooks, permissions
│   └── commands/
│       ├── incident-response.md        # /incident-response — structured triage and war room
│       ├── deploy-check.md             # /deploy-check — pre-deploy safety checklist
│       ├── cost-review.md              # /cost-review — cloud cost analysis and anomaly detection
│       ├── capacity-plan.md            # /capacity-plan — resource forecasting and scaling
│       ├── postmortem.md               # /postmortem — structured incident postmortem writer
│       ├── runbook-new.md              # /runbook-new — generate runbook from incident history
│       └── infra-change.md             # /infra-change — IaC change impact analysis
├── runbooks/
│   ├── _template.md                    # Canonical runbook format (source of truth)
│   ├── payment-service.md              # Service-specific runbook: alerts, resolution steps
│   ├── auth-service.md
│   ├── api-gateway.md
│   ├── database-postgres.md            # Database-specific: replication, failover, vacuum
│   ├── redis-cluster.md                # Redis: eviction, connection exhaustion, cluster split
│   ├── kafka-brokers.md                # Kafka: under-replicated partitions, consumer lag
│   ├── kubernetes-nodes.md             # Node pressure, eviction, OOM, disk pressure
│   ├── kubernetes-networking.md        # CNI issues, DNS failures, ingress timeouts
│   └── argocd-sync-failures.md         # GitOps sync failures and rollback procedures
├── postmortems/
│   ├── _template.md                    # Postmortem format: timeline, root cause, action items
│   ├── 2024-11-15-payment-outage.md    # Dated incident review
│   ├── 2024-12-02-db-failover.md
│   └── 2025-01-20-deploy-rollback.md
├── terraform/
│   ├── modules/
│   │   ├── vpc/
│   │   │   ├── main.tf                 # VPC, subnets, route tables, NAT gateway
│   │   │   ├── variables.tf
│   │   │   ├── outputs.tf
│   │   │   └── README.md
│   │   ├── eks-cluster/
│   │   │   ├── main.tf                 # EKS control plane, node groups, IAM roles
│   │   │   ├── variables.tf
│   │   │   ├── outputs.tf
│   │   │   └── README.md
│   │   ├── rds-postgres/
│   │   │   ├── main.tf                 # RDS instance, parameter groups, security groups
│   │   │   ├── variables.tf
│   │   │   ├── outputs.tf
│   │   │   └── README.md
│   │   ├── iam-roles/
│   │   │   ├── main.tf                 # IRSA roles, policies, trust relationships
│   │   │   ├── variables.tf
│   │   │   └── outputs.tf
│   │   └── s3-bucket/
│   │       ├── main.tf                 # Bucket, versioning, lifecycle, replication
│   │       ├── variables.tf
│   │       └── outputs.tf
│   ├── environments/
│   │   ├── production/
│   │   │   ├── terragrunt.hcl          # Env-specific inputs, remote state config
│   │   │   ├── vpc/terragrunt.hcl
│   │   │   ├── eks/terragrunt.hcl
│   │   │   └── rds/terragrunt.hcl
│   │   ├── staging/
│   │   │   ├── terragrunt.hcl
│   │   │   └── eks/terragrunt.hcl
│   │   └── dev/
│   │       └── terragrunt.hcl
│   └── terragrunt.hcl                  # Root: remote state backend, provider versions
├── kubernetes/
│   ├── base/
│   │   ├── namespaces.yaml             # All namespace definitions
│   │   ├── resource-quotas.yaml        # Per-namespace CPU/memory limits
│   │   ├── network-policies.yaml       # Default deny, service-to-service allow rules
│   │   └── pod-disruption-budgets.yaml # PDB definitions for stateful workloads
│   ├── helm/
│   │   ├── payment-service/
│   │   │   ├── Chart.yaml
│   │   │   ├── values.yaml             # Default values: replicas, resources, HPA config
│   │   │   ├── values-production.yaml  # Prod overrides: higher limits, anti-affinity
│   │   │   ├── values-staging.yaml
│   │   │   └── templates/
│   │   │       ├── deployment.yaml
│   │   │       ├── service.yaml
│   │   │       ├── hpa.yaml            # HorizontalPodAutoscaler definition
│   │   │       ├── pdb.yaml
│   │   │       └── servicemonitor.yaml # Prometheus ServiceMonitor
│   │   └── api-gateway/
│   │       ├── Chart.yaml
│   │       └── values.yaml
│   └── argocd/
│       ├── apps/
│       │   ├── payment-service.yaml    # ArgoCD Application manifest
│       │   └── api-gateway.yaml
│       └── app-of-apps.yaml            # Root ApplicationSet for all services
├── ci-cd/
│   ├── .github/
│   │   └── workflows/
│   │       ├── deploy-production.yml   # Production deploy: plan, approve, apply, notify
│   │       ├── deploy-staging.yml      # Staging: auto-deploy on merge to main
│   │       ├── terraform-plan.yml      # PR: run terraform plan, post diff as comment
│   │       ├── helm-lint.yml           # PR: helm lint and template validation
│   │       ├── security-scan.yml       # Trivy image scan, tfsec, checkov
│   │       └── cost-estimation.yml     # Infracost on Terraform PRs
│   └── composite-actions/
│       ├── setup-aws/action.yml        # Configure AWS credentials via OIDC
│       ├── setup-kubectl/action.yml    # Configure kubeconfig for target cluster
│       └── notify-slack/action.yml     # Post deploy status to Slack channel
├── oncall/
│   ├── rotation-schedule.md            # On-call rotation: who, when, handoff process
│   ├── alert-definitions.md            # All PagerDuty alerts: threshold, severity, owner
│   ├── escalation-paths.md             # P1/P2/P3 escalation contacts and SLAs
│   ├── onboarding-checklist.md         # New on-call engineer checklist: access, setup, shadow
│   └── incident-channels.md            # Slack channels, war room process, stakeholder comms
└── docs/
    ├── architecture/
    │   ├── system-overview.md          # High-level architecture diagram and service map
    │   ├── network-topology.md         # VPC layout, peering, public/private subnets
    │   └── data-flow.md                # Data flow: ingress → services → databases → egress
    ├── service-catalog.md              # All services: owner, repo, SLO, runbook link
    ├── slo-registry.md                 # SLO definitions, error budgets, burn rates
    └── disaster-recovery.md            # RPO/RTO targets, failover procedures, DR drills
```

## Key files explained

| Path | Purpose |
|---|---|
| `.claude/commands/incident-response.md` | Slash command that runs the structured incident triage skill — generates timeline, assigns severity, drafts stakeholder update |
| `.claude/commands/infra-change.md` | Analyzes Terraform plan output for blast radius, dependency risks, and rollback complexity before any infra apply |
| `runbooks/_template.md` | Canonical runbook format: service overview, alert catalogue with decision trees, escalation paths, common operations, gotchas |
| `terraform/environments/production/terragrunt.hcl` | Production-specific Terragrunt config: remote state backend, input variable overrides, dependency ordering |
| `kubernetes/helm/payment-service/values-production.yaml` | Production Helm values: replica counts, resource limits, anti-affinity rules, HPA thresholds |
| `ci-cd/.github/workflows/terraform-plan.yml` | GitHub Actions workflow that runs `terraform plan` on PRs and posts the diff as a PR comment with cost estimate |
| `oncall/alert-definitions.md` | Single source of truth for all PagerDuty alert names, Datadog/Grafana query strings, thresholds, severity, and runbook links |
| `docs/slo-registry.md` | All service SLOs: availability target, latency SLI, error budget window, burn rate alert thresholds, review cadence |

## Quick scaffold

```bash
# Create the full DevOps/SRE workspace structure
mkdir -p devops-sre-workspace

cd devops-sre-workspace

# Claude Code config
mkdir -p .claude/commands

# Operational directories
mkdir -p runbooks postmortems oncall

# Infrastructure as Code
mkdir -p terraform/modules/vpc terraform/modules/eks-cluster terraform/modules/rds-postgres
mkdir -p terraform/modules/iam-roles terraform/modules/s3-bucket
mkdir -p terraform/environments/production/vpc terraform/environments/production/eks terraform/environments/production/rds
mkdir -p terraform/environments/staging/eks terraform/environments/dev

# Kubernetes and Helm
mkdir -p kubernetes/base
mkdir -p kubernetes/helm/payment-service/templates
mkdir -p kubernetes/helm/api-gateway/templates
mkdir -p kubernetes/argocd/apps

# CI/CD pipelines
mkdir -p ci-cd/.github/workflows
mkdir -p ci-cd/composite-actions/setup-aws
mkdir -p ci-cd/composite-actions/setup-kubectl
mkdir -p ci-cd/composite-actions/notify-slack

# Documentation
mkdir -p docs/architecture

# Scaffold key files
touch runbooks/_template.md postmortems/_template.md
touch oncall/rotation-schedule.md oncall/alert-definitions.md oncall/escalation-paths.md
touch docs/service-catalog.md docs/slo-registry.md docs/disaster-recovery.md
touch docs/architecture/system-overview.md docs/architecture/network-topology.md

# Install skills
npx uitkit add skill devops-infra/oncall-runbook
npx uitkit add skill devops-infra/capacity-planner
npx uitkit add skill devops-infra/observability-designer
npx uitkit add skill devops-infra/slo-architect
npx uitkit add skill devops-infra/chaos-engineering
npx uitkit add skill devops-infra/terraform
npx uitkit add skill devops-infra/kubernetes
npx uitkit add skill devops-infra/cicd
npx uitkit add skill devops-infra/aws-architect

# Copy installed skills as workspace commands
cp ~/.claude/skills/devops-infra/oncall-runbook.md .claude/commands/runbook-new.md
cp ~/.claude/skills/devops-infra/capacity-planner.md .claude/commands/capacity-plan.md

echo "DevOps/SRE workspace scaffolded."
```

## CLAUDE.md template

```markdown
# DevOps / SRE Workspace

This workspace is the operational hub for cloud infrastructure, CI/CD pipelines, incident
response, and platform reliability. Work here is production-critical — precision and
correctness matter more than speed.

## Stack

- Cloud: AWS (EKS, RDS, S3, IAM, VPC, CloudFront)
- IaC: Terraform 1.7 + Terragrunt (multi-environment orchestration)
- Containers: Kubernetes 1.29, Helm 3, ArgoCD 2.10 (GitOps)
- CI/CD: GitHub Actions with OIDC authentication (no static credentials)
- Observability: Datadog (APM, infrastructure, logs) + PagerDuty
- Secret management: AWS Secrets Manager (production), Vault (staging/dev)

## Directory conventions

- `runbooks/` — one file per service or scenario; always follow _template.md
- `postmortems/` — named YYYY-MM-DD-incident-name.md; never delete old ones
- `terraform/modules/` — reusable modules only; no environment config here
- `terraform/environments/` — Terragrunt configs per environment; no raw .tf files
- `kubernetes/helm/` — one Helm chart per service; values-production.yaml always present
- `ci-cd/.github/workflows/` — no hardcoded secrets; all credentials via OIDC or Secrets Manager

## Common tasks — use these exact commands

### Incident response (active incident)
/incident-response

### Pre-deploy safety check
/deploy-check

### Generate a new runbook from incident history
/runbook-new

### Write a postmortem
/postmortem

### Infrastructure change impact analysis
/infra-change — paste the terraform plan output

### Cloud cost review
/cost-review

### Capacity planning
/capacity-plan

## Terraform conventions

- Always run `terraform plan` and get review before `apply` in production
- Module inputs must have descriptions and type constraints — no bare `any`
- Tag all resources: Environment, Team, Service, ManagedBy=terraform
- State files: one per environment per module — never share state across environments
- Use `terragrunt run-all plan` for dependency-aware multi-module planning

## Kubernetes conventions

- All workloads must have: resource requests and limits, readinessProbe, livenessProbe
- HPA configured for all stateless services: min 2 replicas, max based on capacity plan
- PodDisruptionBudget required for all services with SLO
- Never `kubectl apply` directly to production — all changes through ArgoCD
- `kubectl exec` into production pods requires justification in the incident channel

## Runbook conventions

- Every runbook must link to the Datadog/Grafana dashboard for that service
- Alert steps must use exact commands — no "check the logs" without `kubectl logs -n X`
- Escalation paths must name actual people and Slack handles, not just roles
- Runbooks older than 90 days must be reviewed — flag with `[STALE - review needed]`

## On-call behavior

- P1: page immediately, open war room in #incident-p1, update every 15 minutes
- P2: resolve within 4 hours or escalate
- P3: resolve within next business day
- All incidents: create postmortem entry even if resolved quickly
- After every incident: update the relevant runbook with new findings

## What not to do

- Do not commit secrets, kubeconfig files, or .terraform/ directories
- Do not apply terraform in production without a plan review from a second engineer
- Do not delete postmortems — they are the operational memory of this team
- Do not create Kubernetes manifests outside the Helm chart structure
```

## MCP servers

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

## Recommended hooks

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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_COMMAND\" | grep -qE \"kubectl (delete|apply|exec).*(production|prod)\"; then echo \"[HOOK] Production kubectl write operation detected — confirm this is intentional\" >&2; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if git -C \"$PWD\" diff --name-only 2>/dev/null | grep -qE \"\\.(tf|yaml|yml)$\"; then echo \"Reminder: uncommitted infra changes detected — review before ending session.\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Skills to install

```bash
npx uitkit add skill devops-infra/oncall-runbook
npx uitkit add skill devops-infra/capacity-planner
npx uitkit add skill devops-infra/observability-designer
npx uitkit add skill devops-infra/slo-architect
npx uitkit add skill devops-infra/chaos-engineering
npx uitkit add skill devops-infra/terraform
npx uitkit add skill devops-infra/kubernetes
npx uitkit add skill devops-infra/cicd
npx uitkit add skill devops-infra/aws-architect
```

## Related

- [DevOps / SRE Engineer Guide](../guides/for-devops-engineer.md)
- [Incident Response Workflow](../workflows/devops-incident.md)
