# DevOps / SRE Workspace — Projectstructuur

> Voor een DevOps- of SRE-engineer die cloud-infrastructuur, CI/CD, incidentrespons en platformbetrouwbaarheid op schaal beheert.

## Stack

- **Cloud:** AWS (EC2, ECS, RDS, S3, CloudFront, IAM, VPC) / GCP / Azure
- **IaC:** Terraform 1.7+ met Terragrunt voor multi-omgeving-orkestratie
- **Containers:** Kubernetes 1.29+, Helm 3, ArgoCD 2.10 (GitOps)
- **CI/CD:** GitHub Actions met herbruikbare workflows en composite actions
- **Observability:** Datadog (APM, logs, infrastructuur) of Grafana + Prometheus + Loki
- **Alerting:** PagerDuty met escalatiebeleid en on-call-rotaties
- **Container-runtime:** Docker 25+ met multi-stage builds
- **Pakketbeheerder:** Helm voor Kubernetes, npm voor tooling-scripts
- **Secretbeheer:** AWS Secrets Manager of HashiCorp Vault
- **Policy as code:** OPA / Conftest voor Terraform en Kubernetes admission control

## Directorystructuur

```
devops-sre-workspace/
├── .claude/
│   ├── CLAUDE.md                       # Workspace-instructies voor Claude Code
│   ├── settings.json                   # MCP-servers, hooks, rechten
│   └── commands/
│       ├── incident-response.md        # /incident-response — gestructureerde triage en war room
│       ├── deploy-check.md             # /deploy-check — veiligheidscontrolelijst vóór deployment
│       ├── cost-review.md              # /cost-review — cloud-kostenanalyse en anomaliedetectie
│       ├── capacity-plan.md            # /capacity-plan — resourceprognose en schaling
│       ├── postmortem.md               # /postmortem — gestructureerde postmortem-schrijver
│       ├── runbook-new.md              # /runbook-new — runbook genereren vanuit incidenthistorie
│       └── infra-change.md             # /infra-change — impactanalyse van IaC-wijzigingen
├── runbooks/
│   ├── _template.md                    # Canoniek runbook-formaat (bron van waarheid)
│   ├── payment-service.md              # Servicespecifiek runbook: alerts, oplossingstappen
│   ├── auth-service.md
│   ├── api-gateway.md
│   ├── database-postgres.md            # Databasespecifiek: replicatie, failover, vacuum
│   ├── redis-cluster.md                # Redis: evictie, verbindingsuitputting, cluster-split
│   ├── kafka-brokers.md                # Kafka: ondergerepliceeerde partities, consumer-vertraging
│   ├── kubernetes-nodes.md             # Node-druk, evictie, OOM, schijfdruk
│   ├── kubernetes-networking.md        # CNI-problemen, DNS-fouten, ingress-timeouts
│   └── argocd-sync-failures.md         # GitOps-synchronisatiefouten en rollback-procedures
├── postmortems/
│   ├── _template.md                    # Postmortem-formaat: tijdlijn, grondoorzaak, actiepunten
│   ├── 2024-11-15-payment-outage.md    # Gedateerde incidentreview
│   ├── 2024-12-02-db-failover.md
│   └── 2025-01-20-deploy-rollback.md
├── terraform/
│   ├── modules/
│   │   ├── vpc/
│   │   │   ├── main.tf                 # VPC, subnetten, routeringstabellen, NAT-gateway
│   │   │   ├── variables.tf
│   │   │   ├── outputs.tf
│   │   │   └── README.md
│   │   ├── eks-cluster/
│   │   │   ├── main.tf                 # EKS-besturingsvlak, node groups, IAM-rollen
│   │   │   ├── variables.tf
│   │   │   ├── outputs.tf
│   │   │   └── README.md
│   │   ├── rds-postgres/
│   │   │   ├── main.tf                 # RDS-instantie, parametergroepen, beveiligingsgroepen
│   │   │   ├── variables.tf
│   │   │   ├── outputs.tf
│   │   │   └── README.md
│   │   ├── iam-roles/
│   │   │   ├── main.tf                 # IRSA-rollen, beleid, vertrouwensrelaties
│   │   │   ├── variables.tf
│   │   │   └── outputs.tf
│   │   └── s3-bucket/
│   │       ├── main.tf                 # Bucket, versiebeheer, levenscyclus, replicatie
│   │       ├── variables.tf
│   │       └── outputs.tf
│   ├── environments/
│   │   ├── production/
│   │   │   ├── terragrunt.hcl          # Omgevingsspecifieke invoer, remote state-configuratie
│   │   │   ├── vpc/terragrunt.hcl
│   │   │   ├── eks/terragrunt.hcl
│   │   │   └── rds/terragrunt.hcl
│   │   ├── staging/
│   │   │   ├── terragrunt.hcl
│   │   │   └── eks/terragrunt.hcl
│   │   └── dev/
│   │       └── terragrunt.hcl
│   └── terragrunt.hcl                  # Root: remote state-backend, providerversies
├── kubernetes/
│   ├── base/
│   │   ├── namespaces.yaml             # Alle namespace-definities
│   │   ├── resource-quotas.yaml        # CPU/geheugenlimieten per namespace
│   │   ├── network-policies.yaml       # Standaard weigeren, service-naar-service-toestemmingsregels
│   │   └── pod-disruption-budgets.yaml # PDB-definities voor stateful workloads
│   ├── helm/
│   │   ├── payment-service/
│   │   │   ├── Chart.yaml
│   │   │   ├── values.yaml             # Standaardwaarden: replica's, resources, HPA-configuratie
│   │   │   ├── values-production.yaml  # Productie-overschrijvingen: hogere limieten, anti-affiniteit
│   │   │   ├── values-staging.yaml
│   │   │   └── templates/
│   │   │       ├── deployment.yaml
│   │   │       ├── service.yaml
│   │   │       ├── hpa.yaml            # HorizontalPodAutoscaler-definitie
│   │   │       ├── pdb.yaml
│   │   │       └── servicemonitor.yaml # Prometheus ServiceMonitor
│   │   └── api-gateway/
│   │       ├── Chart.yaml
│   │       └── values.yaml
│   └── argocd/
│       ├── apps/
│       │   ├── payment-service.yaml    # ArgoCD Application-manifest
│       │   └── api-gateway.yaml
│       └── app-of-apps.yaml            # Root ApplicationSet voor alle services
├── ci-cd/
│   ├── .github/
│   │   └── workflows/
│   │       ├── deploy-production.yml   # Productie-deployment: plan, goedkeuring, apply, melding
│   │       ├── deploy-staging.yml      # Staging: automatische deployment bij merge naar main
│   │       ├── terraform-plan.yml      # PR: terraform plan uitvoeren, diff als commentaar plaatsen
│   │       ├── helm-lint.yml           # PR: helm lint en templatevalidatie
│   │       ├── security-scan.yml       # Trivy image-scan, tfsec, checkov
│   │       └── cost-estimation.yml     # Infracost bij Terraform-PR's
│   └── composite-actions/
│       ├── setup-aws/action.yml        # AWS-credentials configureren via OIDC
│       ├── setup-kubectl/action.yml    # kubeconfig configureren voor doelcluster
│       └── notify-slack/action.yml     # Deployment-status sturen naar Slack-kanaal
├── oncall/
│   ├── rotation-schedule.md            # On-call-rotatie: wie, wanneer, overdrachtsproces
│   ├── alert-definitions.md            # Alle PagerDuty-alerts: drempelwaarde, ernst, eigenaar
│   ├── escalation-paths.md             # P1/P2/P3-escalatiecontacten en SLA's
│   ├── onboarding-checklist.md         # Controlelijst nieuwe on-call-engineer: toegang, inrichting, meekijken
│   └── incident-channels.md            # Slack-kanalen, war room-proces, communicatie met stakeholders
└── docs/
    ├── architecture/
    │   ├── system-overview.md          # Architectuurdiagram op hoog niveau en servicemap
    │   ├── network-topology.md         # VPC-indeling, peering, publieke/private subnetten
    │   └── data-flow.md                # Gegevensstroom: ingress → services → databases → egress
    ├── service-catalog.md              # Alle services: eigenaar, repository, SLO, runbook-link
    ├── slo-registry.md                 # SLO-definities, foutbudgetten, burn rates
    └── disaster-recovery.md            # RPO/RTO-doelstellingen, failover-procedures, DR-oefeningen
```

## Belangrijke bestanden toegelicht

| Pad | Doel |
|---|---|
| `.claude/commands/incident-response.md` | Slash-commando dat de gestructureerde incidenttriage-skill uitvoert — genereert tijdlijn, wijst ernst toe, stelt stakeholder-update op |
| `.claude/commands/infra-change.md` | Analyseert Terraform-planuitvoer op explosieradius, afhankelijkheidsrisico's en rollback-complexiteit vóór elke infrastructuur-apply |
| `runbooks/_template.md` | Canoniek runbook-formaat: serviceoverzicht, alertcatalogus met beslisbomen, escalatiepaden, veelvoorkomende handelingen, aandachtspunten |
| `terraform/environments/production/terragrunt.hcl` | Productiespecifieke Terragrunt-configuratie: remote state-backend, invoervariabele-overschrijvingen, afhankelijkheidsvolgorde |
| `kubernetes/helm/payment-service/values-production.yaml` | Productie-Helm-waarden: aantal replica's, resourcelimieten, anti-affiniteitsregels, HPA-drempelwaarden |
| `ci-cd/.github/workflows/terraform-plan.yml` | GitHub Actions-workflow die `terraform plan` uitvoert bij PR's en de diff als PR-commentaar plaatst met kostenschatting |
| `oncall/alert-definitions.md` | Enige bron van waarheid voor alle PagerDuty-alertnamen, Datadog/Grafana-querystrings, drempelwaarden, ernst en runbook-links |
| `docs/slo-registry.md` | Alle service-SLO's: beschikbaarheidsdoelstelling, latentie-SLI, foutbudgetvenster, burn rate-alertdrempelwaarden, reviewfrequentie |

## Snelle scaffold

```bash
# Volledige DevOps/SRE workspace-structuur aanmaken
mkdir -p devops-sre-workspace

cd devops-sre-workspace

# Claude Code-configuratie
mkdir -p .claude/commands

# Operationele mappen
mkdir -p runbooks postmortems oncall

# Infrastructure as Code
mkdir -p terraform/modules/vpc terraform/modules/eks-cluster terraform/modules/rds-postgres
mkdir -p terraform/modules/iam-roles terraform/modules/s3-bucket
mkdir -p terraform/environments/production/vpc terraform/environments/production/eks terraform/environments/production/rds
mkdir -p terraform/environments/staging/eks terraform/environments/dev

# Kubernetes en Helm
mkdir -p kubernetes/base
mkdir -p kubernetes/helm/payment-service/templates
mkdir -p kubernetes/helm/api-gateway/templates
mkdir -p kubernetes/argocd/apps

# CI/CD-pipelines
mkdir -p ci-cd/.github/workflows
mkdir -p ci-cd/composite-actions/setup-aws
mkdir -p ci-cd/composite-actions/setup-kubectl
mkdir -p ci-cd/composite-actions/notify-slack

# Documentatie
mkdir -p docs/architecture

# Sleutelbestanden aanmaken
touch runbooks/_template.md postmortems/_template.md
touch oncall/rotation-schedule.md oncall/alert-definitions.md oncall/escalation-paths.md
touch docs/service-catalog.md docs/slo-registry.md docs/disaster-recovery.md
touch docs/architecture/system-overview.md docs/architecture/network-topology.md

# Skills installeren
npx claudient add skill devops-infra/oncall-runbook
npx claudient add skill devops-infra/capacity-planner
npx claudient add skill devops-infra/observability-designer
npx claudient add skill devops-infra/slo-architect
npx claudient add skill devops-infra/chaos-engineering
npx claudient add skill devops-infra/terraform
npx claudient add skill devops-infra/kubernetes
npx claudient add skill devops-infra/cicd
npx claudient add skill devops-infra/aws-architect

# Geïnstalleerde skills kopiëren als workspace-commando's
cp ~/.claude/skills/devops-infra/oncall-runbook.md .claude/commands/runbook-new.md
cp ~/.claude/skills/devops-infra/capacity-planner.md .claude/commands/capacity-plan.md

echo "DevOps/SRE workspace aangemaakt."
```

## CLAUDE.md-sjabloon

```markdown
# DevOps / SRE Workspace

Deze workspace is het operationele centrum voor cloud-infrastructuur, CI/CD-pipelines,
incidentrespons en platformbetrouwbaarheid. Het werk hier is productiekritisch — nauwkeurigheid
en correctheid wegen zwaarder dan snelheid.

## Stack

- Cloud: AWS (EKS, RDS, S3, IAM, VPC, CloudFront)
- IaC: Terraform 1.7 + Terragrunt (multi-omgeving-orkestratie)
- Containers: Kubernetes 1.29, Helm 3, ArgoCD 2.10 (GitOps)
- CI/CD: GitHub Actions met OIDC-authenticatie (geen statische credentials)
- Observability: Datadog (APM, infrastructuur, logs) + PagerDuty
- Secretbeheer: AWS Secrets Manager (productie), Vault (staging/dev)

## Mapconventies

- `runbooks/` — één bestand per service of scenario; volg altijd _template.md
- `postmortems/` — benoemd als YYYY-MM-DD-incident-naam.md; verwijder nooit oude exemplaren
- `terraform/modules/` — alleen herbruikbare modules; geen omgevingsconfiguratie hier
- `terraform/environments/` — Terragrunt-configuraties per omgeving; geen kale .tf-bestanden
- `kubernetes/helm/` — één Helm-chart per service; values-production.yaml altijd aanwezig
- `ci-cd/.github/workflows/` — geen hardgecodeerde secrets; alle credentials via OIDC of Secrets Manager

## Veelvoorkomende taken — gebruik deze exacte commando's

### Incidentrespons (actief incident)
/incident-response

### Veiligheidscontrole vóór deployment
/deploy-check

### Nieuw runbook genereren vanuit incidenthistorie
/runbook-new

### Postmortem schrijven
/postmortem

### Impactanalyse infrastructuurwijziging
/infra-change — plak de terraform plan-uitvoer

### Cloud-kostenreview
/cost-review

### Capaciteitsplanning
/capacity-plan

## Terraform-conventies

- Altijd `terraform plan` uitvoeren en review ophalen vóór `apply` in productie
- Module-invoer moet beschrijvingen en typerestricties hebben — geen kaal `any`
- Tag alle resources: Environment, Team, Service, ManagedBy=terraform
- State-bestanden: één per omgeving per module — nooit state delen tussen omgevingen
- Gebruik `terragrunt run-all plan` voor afhankelijkheidsbewuste multi-module planning

## Kubernetes-conventies

- Alle workloads moeten hebben: resource requests en limieten, readinessProbe, livenessProbe
- HPA geconfigureerd voor alle stateless services: min. 2 replica's, max. gebaseerd op capaciteitsplan
- PodDisruptionBudget verplicht voor alle services met SLO
- Nooit `kubectl apply` rechtstreeks in productie — alle wijzigingen via ArgoCD
- `kubectl exec` in productie-pods vereist verantwoording in het incidentkanaal

## Runbook-conventies

- Elk runbook moet linken naar het Datadog/Grafana-dashboard voor die service
- Alertstappen moeten exacte commando's gebruiken — geen "controleer de logs" zonder `kubectl logs -n X`
- Escalatiepaden moeten echte personen en Slack-handles noemen, niet alleen rollen
- Runbooks ouder dan 90 dagen moeten worden herzien — markeer met `[VEROUDERD - herziening nodig]`

## On-call-gedrag

- P1: direct pagen, war room openen in #incident-p1, elke 15 minuten bijwerken
- P2: binnen 4 uur oplossen of escaleren
- P3: vóór de volgende werkdag oplossen
- Alle incidenten: postmortem-vermelding aanmaken, ook als snel opgelost
- Na elk incident: het relevante runbook bijwerken met nieuwe bevindingen

## Wat niet te doen

- Geen secrets, kubeconfig-bestanden of .terraform/-mappen committen
- Geen terraform toepassen in productie zonder planreview van een tweede engineer
- Geen postmortems verwijderen — zij vormen het operationeel geheugen van dit team
- Geen Kubernetes-manifests aanmaken buiten de Helm-chartstructuur
```

## MCP-servers

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

## Aanbevolen hooks

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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_COMMAND\" | grep -qE \"kubectl (delete|apply|exec).*(production|prod)\"; then echo \"[HOOK] Schrijfbewerking kubectl op productie gedetecteerd — bevestig dat dit opzettelijk is\" >&2; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if git -C \"$PWD\" diff --name-only 2>/dev/null | grep -qE \"\\.(tf|yaml|yml)$\"; then echo \"Herinnering: niet-gecommitte infrastructuurwijzigingen gedetecteerd — controleer vóór het beëindigen van de sessie.\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Te installeren skills

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

## Gerelateerd

- [Gids voor DevOps / SRE-engineers](../guides/for-devops-engineer.md)
- [Incidentrespons-workflow](../workflows/devops-incident.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
