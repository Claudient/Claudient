# DevOps / SRE Workspace — Projektstruktur

> Für einen DevOps- oder SRE-Ingenieur, der Cloud-Infrastruktur, CI/CD, Incident-Response und Plattformzuverlässigkeit im großen Maßstab verwaltet.

## Stack

- **Cloud:** AWS (EC2, ECS, RDS, S3, CloudFront, IAM, VPC) / GCP / Azure
- **IaC:** Terraform 1.7+ mit Terragrunt für Multi-Environment-Orchestrierung
- **Container:** Kubernetes 1.29+, Helm 3, ArgoCD 2.10 (GitOps)
- **CI/CD:** GitHub Actions mit wiederverwendbaren Workflows und Composite Actions
- **Observability:** Datadog (APM, Logs, Infrastruktur) oder Grafana + Prometheus + Loki
- **Alerting:** PagerDuty mit Eskalationsrichtlinien und On-Call-Rotationen
- **Container-Runtime:** Docker 25+ mit mehrstufigen Builds
- **Paketmanager:** Helm für Kubernetes, npm für Tooling-Skripte
- **Secrets-Verwaltung:** AWS Secrets Manager oder HashiCorp Vault
- **Policy as Code:** OPA / Conftest für Terraform und Kubernetes Admission Control

## Verzeichnisbaum

```
devops-sre-workspace/
├── .claude/
│   ├── CLAUDE.md                       # Workspace-Anweisungen für Claude Code
│   ├── settings.json                   # MCP-Server, Hooks, Berechtigungen
│   └── commands/
│       ├── incident-response.md        # /incident-response — strukturiertes Triage und War Room
│       ├── deploy-check.md             # /deploy-check — Sicherheits-Checkliste vor dem Deployment
│       ├── cost-review.md              # /cost-review — Cloud-Kostenanalyse und Anomalieerkennung
│       ├── capacity-plan.md            # /capacity-plan — Ressourcenprognose und Skalierung
│       ├── postmortem.md               # /postmortem — strukturierter Incident-Postmortem-Writer
│       ├── runbook-new.md              # /runbook-new — Runbook aus Incident-Historie generieren
│       └── infra-change.md             # /infra-change — Auswirkungsanalyse von IaC-Änderungen
├── runbooks/
│   ├── _template.md                    # Kanonisches Runbook-Format (Single Source of Truth)
│   ├── payment-service.md              # Servicespezifisches Runbook: Alerts, Lösungsschritte
│   ├── auth-service.md
│   ├── api-gateway.md
│   ├── database-postgres.md            # Datenbankspezifisch: Replikation, Failover, Vacuum
│   ├── redis-cluster.md                # Redis: Eviction, Verbindungserschöpfung, Cluster-Split
│   ├── kafka-brokers.md                # Kafka: unter-replizierte Partitionen, Consumer-Lag
│   ├── kubernetes-nodes.md             # Node-Druck, Eviction, OOM, Festplattendruck
│   ├── kubernetes-networking.md        # CNI-Probleme, DNS-Fehler, Ingress-Timeouts
│   └── argocd-sync-failures.md         # GitOps-Synchronisierungsfehler und Rollback-Verfahren
├── postmortems/
│   ├── _template.md                    # Postmortem-Format: Zeitleiste, Grundursache, Maßnahmen
│   ├── 2024-11-15-payment-outage.md    # Datierte Incident-Auswertung
│   ├── 2024-12-02-db-failover.md
│   └── 2025-01-20-deploy-rollback.md
├── terraform/
│   ├── modules/
│   │   ├── vpc/
│   │   │   ├── main.tf                 # VPC, Subnetze, Routing-Tabellen, NAT-Gateway
│   │   │   ├── variables.tf
│   │   │   ├── outputs.tf
│   │   │   └── README.md
│   │   ├── eks-cluster/
│   │   │   ├── main.tf                 # EKS Control Plane, Node Groups, IAM-Rollen
│   │   │   ├── variables.tf
│   │   │   ├── outputs.tf
│   │   │   └── README.md
│   │   ├── rds-postgres/
│   │   │   ├── main.tf                 # RDS-Instanz, Parametergruppen, Security Groups
│   │   │   ├── variables.tf
│   │   │   ├── outputs.tf
│   │   │   └── README.md
│   │   ├── iam-roles/
│   │   │   ├── main.tf                 # IRSA-Rollen, Richtlinien, Vertrauensbeziehungen
│   │   │   ├── variables.tf
│   │   │   └── outputs.tf
│   │   └── s3-bucket/
│   │       ├── main.tf                 # Bucket, Versionierung, Lebenszyklus, Replikation
│   │       ├── variables.tf
│   │       └── outputs.tf
│   ├── environments/
│   │   ├── production/
│   │   │   ├── terragrunt.hcl          # Umgebungsspezifische Eingaben, Remote-State-Konfiguration
│   │   │   ├── vpc/terragrunt.hcl
│   │   │   ├── eks/terragrunt.hcl
│   │   │   └── rds/terragrunt.hcl
│   │   ├── staging/
│   │   │   ├── terragrunt.hcl
│   │   │   └── eks/terragrunt.hcl
│   │   └── dev/
│   │       └── terragrunt.hcl
│   └── terragrunt.hcl                  # Root: Remote-State-Backend, Provider-Versionen
├── kubernetes/
│   ├── base/
│   │   ├── namespaces.yaml             # Alle Namespace-Definitionen
│   │   ├── resource-quotas.yaml        # CPU/Speicher-Limits pro Namespace
│   │   ├── network-policies.yaml       # Standard-Ablehnung, Service-zu-Service-Erlaubnisregeln
│   │   └── pod-disruption-budgets.yaml # PDB-Definitionen für zustandsbehaftete Workloads
│   ├── helm/
│   │   ├── payment-service/
│   │   │   ├── Chart.yaml
│   │   │   ├── values.yaml             # Standardwerte: Replicas, Ressourcen, HPA-Konfiguration
│   │   │   ├── values-production.yaml  # Prod-Überschreibungen: höhere Limits, Anti-Affinität
│   │   │   ├── values-staging.yaml
│   │   │   └── templates/
│   │   │       ├── deployment.yaml
│   │   │       ├── service.yaml
│   │   │       ├── hpa.yaml            # HorizontalPodAutoscaler-Definition
│   │   │       ├── pdb.yaml
│   │   │       └── servicemonitor.yaml # Prometheus ServiceMonitor
│   │   └── api-gateway/
│   │       ├── Chart.yaml
│   │       └── values.yaml
│   └── argocd/
│       ├── apps/
│       │   ├── payment-service.yaml    # ArgoCD Application-Manifest
│       │   └── api-gateway.yaml
│       └── app-of-apps.yaml            # Root-ApplicationSet für alle Services
├── ci-cd/
│   ├── .github/
│   │   └── workflows/
│   │       ├── deploy-production.yml   # Produktions-Deployment: Plan, Genehmigung, Apply, Benachrichtigung
│   │       ├── deploy-staging.yml      # Staging: automatisches Deployment bei Merge in main
│   │       ├── terraform-plan.yml      # PR: terraform plan ausführen, Diff als Kommentar posten
│   │       ├── helm-lint.yml           # PR: Helm Lint und Template-Validierung
│   │       ├── security-scan.yml       # Trivy Image-Scan, tfsec, checkov
│   │       └── cost-estimation.yml     # Infracost für Terraform-PRs
│   └── composite-actions/
│       ├── setup-aws/action.yml        # AWS-Zugangsdaten über OIDC konfigurieren
│       ├── setup-kubectl/action.yml    # kubeconfig für Ziel-Cluster konfigurieren
│       └── notify-slack/action.yml     # Deployment-Status an Slack-Kanal senden
├── oncall/
│   ├── rotation-schedule.md            # On-Call-Rotation: wer, wann, Übergabeprozess
│   ├── alert-definitions.md            # Alle PagerDuty-Alerts: Schwellenwert, Schweregrad, Verantwortlicher
│   ├── escalation-paths.md             # P1/P2/P3-Eskalationskontakte und SLAs
│   ├── onboarding-checklist.md         # Checkliste für neue On-Call-Ingenieure: Zugriff, Einrichtung, Shadowing
│   └── incident-channels.md            # Slack-Kanäle, War-Room-Prozess, Stakeholder-Kommunikation
└── docs/
    ├── architecture/
    │   ├── system-overview.md          # Übergeordnetes Architekturdiagramm und Service-Map
    │   ├── network-topology.md         # VPC-Layout, Peering, öffentliche/private Subnetze
    │   └── data-flow.md                # Datenfluss: Ingress → Services → Datenbanken → Egress
    ├── service-catalog.md              # Alle Services: Verantwortlicher, Repository, SLO, Runbook-Link
    ├── slo-registry.md                 # SLO-Definitionen, Fehlerbudgets, Burn Rates
    └── disaster-recovery.md            # RPO/RTO-Ziele, Failover-Verfahren, DR-Übungen
```

## Wichtige Dateien erklärt

| Pfad | Zweck |
|---|---|
| `.claude/commands/incident-response.md` | Slash-Befehl, der die strukturierte Incident-Triage-Kompetenz ausführt — generiert Zeitleiste, weist Schweregrad zu, entwirft Stakeholder-Update |
| `.claude/commands/infra-change.md` | Analysiert Terraform-Plan-Ausgabe auf Auswirkungsradius, Abhängigkeitsrisiken und Rollback-Komplexität vor jedem Infra-Apply |
| `runbooks/_template.md` | Kanonisches Runbook-Format: Service-Übersicht, Alert-Katalog mit Entscheidungsbäumen, Eskalationspfade, häufige Operationen, Stolperfallen |
| `terraform/environments/production/terragrunt.hcl` | Produktionsspezifische Terragrunt-Konfiguration: Remote-State-Backend, Eingabevariablen-Überschreibungen, Abhängigkeitsreihenfolge |
| `kubernetes/helm/payment-service/values-production.yaml` | Produktions-Helm-Werte: Replica-Anzahl, Ressourcenlimits, Anti-Affinitätsregeln, HPA-Schwellenwerte |
| `ci-cd/.github/workflows/terraform-plan.yml` | GitHub Actions-Workflow, der `terraform plan` bei PRs ausführt und den Diff als PR-Kommentar mit Kostenschätzung postet |
| `oncall/alert-definitions.md` | Single Source of Truth für alle PagerDuty-Alert-Namen, Datadog/Grafana-Abfragestrings, Schwellenwerte, Schweregrad und Runbook-Links |
| `docs/slo-registry.md` | Alle Service-SLOs: Verfügbarkeitsziel, Latenz-SLI, Fehlerbudget-Fenster, Burn-Rate-Alert-Schwellenwerte, Überprüfungsrhythmus |

## Schnell-Scaffold

```bash
# Vollständige DevOps/SRE-Workspace-Struktur erstellen
mkdir -p devops-sre-workspace

cd devops-sre-workspace

# Claude Code Konfiguration
mkdir -p .claude/commands

# Operative Verzeichnisse
mkdir -p runbooks postmortems oncall

# Infrastructure as Code
mkdir -p terraform/modules/vpc terraform/modules/eks-cluster terraform/modules/rds-postgres
mkdir -p terraform/modules/iam-roles terraform/modules/s3-bucket
mkdir -p terraform/environments/production/vpc terraform/environments/production/eks terraform/environments/production/rds
mkdir -p terraform/environments/staging/eks terraform/environments/dev

# Kubernetes und Helm
mkdir -p kubernetes/base
mkdir -p kubernetes/helm/payment-service/templates
mkdir -p kubernetes/helm/api-gateway/templates
mkdir -p kubernetes/argocd/apps

# CI/CD-Pipelines
mkdir -p ci-cd/.github/workflows
mkdir -p ci-cd/composite-actions/setup-aws
mkdir -p ci-cd/composite-actions/setup-kubectl
mkdir -p ci-cd/composite-actions/notify-slack

# Dokumentation
mkdir -p docs/architecture

# Schlüsseldateien anlegen
touch runbooks/_template.md postmortems/_template.md
touch oncall/rotation-schedule.md oncall/alert-definitions.md oncall/escalation-paths.md
touch docs/service-catalog.md docs/slo-registry.md docs/disaster-recovery.md
touch docs/architecture/system-overview.md docs/architecture/network-topology.md

# Kompetenzen installieren
npx claudient add skill devops-infra/oncall-runbook
npx claudient add skill devops-infra/capacity-planner
npx claudient add skill devops-infra/observability-designer
npx claudient add skill devops-infra/slo-architect
npx claudient add skill devops-infra/chaos-engineering
npx claudient add skill devops-infra/terraform
npx claudient add skill devops-infra/kubernetes
npx claudient add skill devops-infra/cicd
npx claudient add skill devops-infra/aws-architect

# Installierte Kompetenzen als Workspace-Befehle kopieren
cp ~/.claude/skills/devops-infra/oncall-runbook.md .claude/commands/runbook-new.md
cp ~/.claude/skills/devops-infra/capacity-planner.md .claude/commands/capacity-plan.md

echo "DevOps/SRE-Workspace wurde eingerichtet."
```

## CLAUDE.md-Vorlage

```markdown
# DevOps / SRE Workspace

Dieser Workspace ist das operative Zentrum für Cloud-Infrastruktur, CI/CD-Pipelines, Incident-
Response und Plattformzuverlässigkeit. Die Arbeit hier ist produktionskritisch — Präzision und
Korrektheit sind wichtiger als Geschwindigkeit.

## Stack

- Cloud: AWS (EKS, RDS, S3, IAM, VPC, CloudFront)
- IaC: Terraform 1.7 + Terragrunt (Multi-Environment-Orchestrierung)
- Container: Kubernetes 1.29, Helm 3, ArgoCD 2.10 (GitOps)
- CI/CD: GitHub Actions mit OIDC-Authentifizierung (keine statischen Credentials)
- Observability: Datadog (APM, Infrastruktur, Logs) + PagerDuty
- Secrets-Verwaltung: AWS Secrets Manager (Produktion), Vault (Staging/Dev)

## Verzeichniskonventionen

- `runbooks/` — eine Datei pro Service oder Szenario; immer _template.md befolgen
- `postmortems/` — benannt nach YYYY-MM-DD-incident-name.md; alte niemals löschen
- `terraform/modules/` — nur wiederverwendbare Module; keine Umgebungskonfiguration hier
- `terraform/environments/` — Terragrunt-Konfigurationen pro Umgebung; keine rohen .tf-Dateien
- `kubernetes/helm/` — ein Helm-Chart pro Service; values-production.yaml immer vorhanden
- `ci-cd/.github/workflows/` — keine hartcodierten Secrets; alle Credentials über OIDC oder Secrets Manager

## Häufige Aufgaben — diese genauen Befehle verwenden

### Incident-Response (aktiver Incident)
/incident-response

### Sicherheitscheck vor dem Deployment
/deploy-check

### Neues Runbook aus Incident-Historie generieren
/runbook-new

### Postmortem verfassen
/postmortem

### Auswirkungsanalyse von Infrastrukturänderungen
/infra-change — Terraform-Plan-Ausgabe einfügen

### Cloud-Kostenüberprüfung
/cost-review

### Kapazitätsplanung
/capacity-plan

## Terraform-Konventionen

- Immer `terraform plan` ausführen und Review einholen, bevor `apply` in der Produktion
- Modul-Eingaben müssen Beschreibungen und Typbeschränkungen haben — kein nacktes `any`
- Alle Ressourcen taggen: Environment, Team, Service, ManagedBy=terraform
- State-Dateien: eine pro Umgebung pro Modul — niemals State über Umgebungen teilen
- `terragrunt run-all plan` für abhängigkeitsbewusste Multi-Modul-Planung verwenden

## Kubernetes-Konventionen

- Alle Workloads müssen haben: Ressourcenanfragen und -limits, readinessProbe, livenessProbe
- HPA für alle zustandslosen Services konfiguriert: min. 2 Replicas, max. basierend auf Kapazitätsplan
- PodDisruptionBudget für alle Services mit SLO erforderlich
- Niemals `kubectl apply` direkt in der Produktion — alle Änderungen über ArgoCD
- `kubectl exec` in Produktions-Pods erfordert Begründung im Incident-Kanal

## Runbook-Konventionen

- Jedes Runbook muss auf das Datadog/Grafana-Dashboard für diesen Service verlinken
- Alert-Schritte müssen genaue Befehle verwenden — kein "Logs prüfen" ohne `kubectl logs -n X`
- Eskalationspfade müssen tatsächliche Personen und Slack-Handles nennen, nicht nur Rollen
- Runbooks älter als 90 Tage müssen überprüft werden — mit `[VERALTET - Überprüfung erforderlich]` markieren

## On-Call-Verhalten

- P1: sofort alarmieren, War Room in #incident-p1 öffnen, alle 15 Minuten aktualisieren
- P2: innerhalb von 4 Stunden lösen oder eskalieren
- P3: bis zum nächsten Werktag lösen
- Alle Incidents: Postmortem-Eintrag erstellen, auch wenn schnell gelöst
- Nach jedem Incident: relevantes Runbook mit neuen Erkenntnissen aktualisieren

## Was nicht zu tun ist

- Keine Secrets, kubeconfig-Dateien oder .terraform/-Verzeichnisse committen
- Kein Terraform in der Produktion anwenden ohne Plan-Review eines zweiten Ingenieurs
- Keine Postmortems löschen — sie sind das operative Gedächtnis dieses Teams
- Keine Kubernetes-Manifeste außerhalb der Helm-Chart-Struktur erstellen
```

## MCP-Server

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

## Empfohlene Hooks

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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_COMMAND\" | grep -qE \"kubectl (delete|apply|exec).*(production|prod)\"; then echo \"[HOOK] Produktiver kubectl-Schreibvorgang erkannt — bestätigen Sie, dass dies beabsichtigt ist\" >&2; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if git -C \"$PWD\" diff --name-only 2>/dev/null | grep -qE \"\\.(tf|yaml|yml)$\"; then echo \"Hinweis: Nicht committete Infrastrukturänderungen erkannt — vor dem Beenden der Sitzung überprüfen.\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Zu installierende Kompetenzen

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

## Verwandte Ressourcen

- [Leitfaden für DevOps / SRE-Ingenieure](../guides/for-devops-engineer.md)
- [Incident-Response-Workflow](../workflows/devops-incident.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
