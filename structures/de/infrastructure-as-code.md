# Infrastructure as Code (Terraform) — Projektstruktur

> Fur Plattform- und DevOps-Ingenieure, die produktive AWS-Infrastruktur mit Terraform und Terragrunt verwalten, den Plan/Apply-Review-Zyklus optimieren und Sicherheits- sowie Tagging-Standards umgebungsübergreifend durchsetzen.

## Stack

- **IaC:** Terraform 1.7+ (HCL), Terraform Cloud oder lokales Backend
- **AWS Provider:** hashicorp/aws ~> 5.0 (VPC, ECS, RDS, S3, CloudFront, ACM, Route53, IAM)
- **Remote State:** S3-Backend + DynamoDB-State-Locking (ein Bucket pro Region)
- **DRY-Konfigurationen:** Terragrunt 0.55+ (`terragrunt.hcl`-Hierarchie, `read_terragrunt_config`)
- **Sicherheitsscans:** Checkov 3.x (`checkov -d .`), tfsec 1.28+ (`tfsec .`)
- **Formatierung / Validierung:** `terraform fmt`, `terraform validate`, `tflint 0.50+`
- **CI/CD:** GitHub Actions (`terraform-plan.yml` bei PR, `terraform-apply.yml` bei Merge in main)
- **Authentifizierung:** AWS SSO (`aws sso login --profile <env>`) über benannte Profile in `~/.aws/config`
- **Secrets:** AWS Secrets Manager (keine Secrets im State — nur ARN-Referenzen in Terraform-Outputs)
- **Modul-Registry:** Lokale Module in `modules/`, per Git-Tag versioniert (`source = "../../modules/vpc?ref=v1.4.0"`)

## Verzeichnisstruktur

```
infra/                                          # Repository-Wurzel
├── .claude/
│   ├── CLAUDE.md                               # Repository-weite Anweisungen für Claude Code
│   ├── settings.json                           # MCP-Server, Hooks, Berechtigungen
│   └── commands/
│       ├── new-resource.md                     # /new-resource — Modul + Variablen + Outputs erstellen
│       ├── plan-env.md                         # /plan-env — Terragrunt-Plan für eine bestimmte Umgebung ausführen
│       ├── checkov-fix.md                      # /checkov-fix — Checkov-Befund erklären und beheben
│       ├── tag-audit.md                        # /tag-audit — Alle Ressourcen auf fehlende Pflicht-Tags prüfen
│       └── rotate-secret.md                    # /rotate-secret — Secrets Manager aktualisieren + Neudeployment auslösen
├── .github/
│   └── workflows/
│       ├── terraform-plan.yml                  # PR: fmt-Prüfung, validate, tflint, checkov, tfsec, plan
│       └── terraform-apply.yml                 # Merge in main: Apply mit OIDC-basierter AWS-Authentifizierung
├── modules/                                    # Wiederverwendbare interne Module (semantisch versioniert via Git-Tags)
│   ├── vpc/
│   │   ├── main.tf                             # VPC, Subnetze (öffentlich/privat), IGW, NAT-Gateway
│   │   ├── variables.tf                        # cidr_block, azs, enable_nat_gateway, single_nat_gateway
│   │   ├── outputs.tf                          # vpc_id, private_subnet_ids, public_subnet_ids
│   │   ├── versions.tf                         # required_providers: aws ~> 5.0, terraform ~> 1.7
│   │   └── README.md
│   ├── ecs-service/
│   │   ├── main.tf                             # ECS-Task-Definition, Service, ALB-Target-Group, Listener-Regel
│   │   ├── variables.tf                        # cluster_arn, container_image, cpu, memory, port, env_vars
│   │   ├── outputs.tf                          # service_name, task_definition_arn, alb_target_group_arn
│   │   ├── iam.tf                              # Task-Execution-Rolle, Task-Rolle mit Least-Privilege-Policies
│   │   ├── autoscaling.tf                      # Application Auto Scaling: CPU/Memory-Target-Tracking
│   │   ├── versions.tf
│   │   └── README.md
│   ├── rds/
│   │   ├── main.tf                             # RDS-Instanz oder -Cluster (Aurora), Subnet-Gruppe, Parameter-Gruppe
│   │   ├── variables.tf                        # engine, engine_version, instance_class, multi_az, db_name
│   │   ├── outputs.tf                          # db_endpoint, db_port, db_secret_arn (KEIN Benutzername/Passwort)
│   │   ├── security-group.tf                   # SG erlaubt Datenverkehr nur von ECS-Task-SG + Bastion-SG
│   │   ├── versions.tf
│   │   └── README.md
│   ├── s3-bucket/
│   │   ├── main.tf                             # S3-Bucket, Versionierung, Verschlüsselung (SSE-S3 oder KMS), Lifecycle
│   │   ├── variables.tf                        # bucket_name_prefix, versioning_enabled, kms_key_arn, cors_rules
│   │   ├── outputs.tf                          # bucket_id, bucket_arn, bucket_domain_name
│   │   ├── policy.tf                           # Bucket-Policy: TLS erzwingen, öffentlichen Zugriff sperren
│   │   ├── versions.tf
│   │   └── README.md
│   └── iam-role/
│       ├── main.tf                             # IAM-Rolle mit assume_role_policy, Inline- oder verwalteten Policies
│       ├── variables.tf                        # role_name, trusted_services, policy_arns, inline_policy_json
│       ├── outputs.tf                          # role_arn, role_name, instance_profile_arn
│       └── versions.tf
├── environments/
│   ├── terragrunt.hcl                          # Root-Konfiguration: Remote-State-Bucket, Region, gemeinsame Inputs
│   ├── dev/
│   │   ├── terragrunt.hcl                      # Umgebungsebene: account_id, aws_profile, gemeinsame Tags
│   │   ├── vpc/
│   │   │   └── terragrunt.hcl                  # Inkludiert root + env; Inputs für diese Ressource in dev
│   │   ├── ecs-service/
│   │   │   └── terragrunt.hcl                  # depends_on = [../vpc], inputs: container_image, cpu=256
│   │   ├── rds/
│   │   │   └── terragrunt.hcl                  # depends_on = [../vpc]; instance_class = db.t3.micro
│   │   └── s3-bucket/
│   │       └── terragrunt.hcl
│   ├── staging/
│   │   ├── terragrunt.hcl
│   │   ├── vpc/
│   │   │   └── terragrunt.hcl
│   │   ├── ecs-service/
│   │   │   └── terragrunt.hcl                  # cpu=512, desired_count=2
│   │   ├── rds/
│   │   │   └── terragrunt.hcl                  # multi_az = false, instance_class = db.t3.small
│   │   └── s3-bucket/
│   │       └── terragrunt.hcl
│   └── prod/
│       ├── terragrunt.hcl                      # account_id verweist auf das Produktions-AWS-Konto
│       ├── vpc/
│       │   └── terragrunt.hcl                  # 3 AZs, enable_nat_gateway = true, single_nat_gateway = false
│       ├── ecs-service/
│       │   └── terragrunt.hcl                  # cpu=1024, memory=2048, desired_count=3
│       ├── rds/
│       │   └── terragrunt.hcl                  # multi_az = true, instance_class = db.r6g.large
│       ├── cloudfront/
│       │   └── terragrunt.hcl                  # CloudFront + ACM + Route53 (nur in prod)
│       └── s3-bucket/
│           └── terragrunt.hcl
├── scripts/
│   ├── init.sh                                 # Bootstrap: State-Bucket + DynamoDB-Tabelle anlegen, falls nicht vorhanden
│   ├── format-check.sh                         # terraform fmt -recursive -check; exit 1 bei Abweichung
│   ├── checkov-scan.sh                         # checkov -d . --framework terraform --compact
│   └── sso-login.sh                            # aws sso login --profile $ENV; export AWS_PROFILE
├── .tflint.hcl                                 # tflint-Konfiguration: aws-Plugin, Regeln (aws_instance_invalid_type)
├── .checkov.yml                                # Checkov: Skip-Liste für akzeptierte Risiken + Prüfkategorien
├── .terraform-version                          # tfenv / tofuenv-Pin: 1.7.5
├── .terragrunt-version                         # tgenv-Pin: 0.55.1
└── .gitignore                                  # .terraform/, *.tfstate, *.tfstate.backup, .terraform.lock.hcl
```

## Wichtige Dateien erklärt

| Pfad | Zweck |
|---|---|
| `environments/terragrunt.hcl` | Root-Terragrunt-Konfiguration: definiert das Schlüsselmuster für den Remote-State-S3-Bucket mittels `path_relative_to_include()`, legt die AWS-Region fest und injiziert `common_tags` (Environment, ManagedBy, Repository) in jedes untergeordnete Modul |
| `environments/prod/terragrunt.hcl` | Konfiguration auf Umgebungsebene: setzt `aws_profile = "prod-admin"`, `account_id` und umgebungsspezifische Tags (Environment = "prod", CostCenter), die die Root-Standardwerte überschreiben |
| `environments/prod/ecs-service/terragrunt.hcl` | Terragrunt-Konfiguration auf Ressourcenebene: deklariert `dependency`-Blöcke für VPC und RDS, um deren Outputs zu lesen; legt Produktionsgrößen fest (`cpu=1024`, `desired_count=3`); enthält niemals Secrets |
| `modules/rds/outputs.tf` | Gibt `db_secret_arn` aus (den ARN des Secrets-Manager-Secrets mit den Zugangsdaten) — gibt niemals Benutzername, Passwort oder Connection-String aus |
| `modules/iam-role/main.tf` | Zentrale Quelle für alle IAM-Rollen-Erstellungen; erzwingt das Präfix `path = "/app/"` und ein Pflicht-Tag `Name`; wird von ECS-Task-Rollen und Lambda-Execution-Rollen verwendet |
| `.github/workflows/terraform-plan.yml` | Führt bei jedem PR `fmt -check`, `validate`, `tflint`, `checkov`, `tfsec` und `terragrunt plan` aus; veröffentlicht das Plan-Diff als PR-Kommentar via `github-actions[bot]`; verwendet OIDC für AWS-Authentifizierung (keine langlebigen Keys) |
| `.github/workflows/terraform-apply.yml` | Wird bei Merge in `main` ausgelöst; führt `terragrunt apply -auto-approve` nur im geänderten Umgebungsverzeichnis aus; erfordert manuelle Genehmigung über GitHub Environments für `prod` |
| `scripts/init.sh` | Idempotentes Bootstrap: erstellt den S3-State-Bucket (Versionierung + Verschlüsselung aktiviert) und die DynamoDB-Lock-Tabelle, falls nicht vorhanden; kann mehrfach sicher ausgeführt werden |

## Schnelles Gerüst

```bash
# Voraussetzungen: terraform 1.7+, terragrunt 0.55+, aws CLI v2, tflint, checkov, tfsec

# Repository klonen oder neu anlegen
mkdir infra && cd infra
git init

# Modulverzeichnisse anlegen
mkdir -p modules/vpc modules/ecs-service modules/rds modules/s3-bucket modules/iam-role

# Stub-Dateien für jedes Modul anlegen
for module in vpc ecs-service rds s3-bucket iam-role; do
  touch modules/$module/main.tf \
        modules/$module/variables.tf \
        modules/$module/outputs.tf \
        modules/$module/versions.tf
done
touch modules/ecs-service/iam.tf modules/ecs-service/autoscaling.tf
touch modules/rds/security-group.tf
touch modules/s3-bucket/policy.tf

# Umgebungsverzeichnisstruktur anlegen
for env in dev staging prod; do
  mkdir -p environments/$env/vpc \
            environments/$env/ecs-service \
            environments/$env/rds \
            environments/$env/s3-bucket
  for resource in vpc ecs-service rds s3-bucket; do
    touch environments/$env/$resource/terragrunt.hcl
  done
  touch environments/$env/terragrunt.hcl
done
mkdir -p environments/prod/cloudfront
touch environments/prod/cloudfront/terragrunt.hcl
touch environments/terragrunt.hcl

# Skripte anlegen
mkdir -p scripts
touch scripts/init.sh scripts/format-check.sh scripts/checkov-scan.sh scripts/sso-login.sh
chmod +x scripts/*.sh

# GitHub Actions Workflows anlegen
mkdir -p .github/workflows
touch .github/workflows/terraform-plan.yml
touch .github/workflows/terraform-apply.yml

# Konfigurationsdateien anlegen
touch .tflint.hcl .checkov.yml
echo "1.7.5" > .terraform-version
echo "0.55.1" > .terragrunt-version

# .gitignore anlegen
cat > .gitignore << 'EOF'
.terraform/
*.tfstate
*.tfstate.backup
.terraform.lock.hcl
*.tfvars
!*.tfvars.example
.env
crash.log
override.tf
override.tf.json
*_override.tf
*_override.tf.json
EOF

# Claude Code Konfiguration anlegen
mkdir -p .claude/commands
touch .claude/CLAUDE.md .claude/settings.json
touch .claude/commands/new-resource.md
touch .claude/commands/plan-env.md
touch .claude/commands/checkov-fix.md
touch .claude/commands/tag-audit.md
touch .claude/commands/rotate-secret.md

# UitKit Skills installieren
npx uitkit add skill devops-infra/terraform-module
npx uitkit add skill devops-infra/terragrunt-config
npx uitkit add skill devops-infra/aws-iam-policy
npx uitkit add skill devops-infra/checkov-remediation
npx uitkit add skill devops-infra/github-actions-cicd
npx uitkit add skill devops-infra/aws-secrets-manager

# Remote State initialisieren (einmalig pro Umgebung/Region)
bash scripts/init.sh dev us-east-1
bash scripts/init.sh staging us-east-1
bash scripts/init.sh prod us-east-1

echo "Terraform-Repository erstellt. Ausführen: aws sso login --profile dev-admin"
```

## CLAUDE.md-Vorlage

```markdown
# Infrastructure as Code (Terraform + Terragrunt)

Produktive AWS-Infrastruktur verwaltet mit Terraform 1.7+ und Terragrunt 0.55+.
Alle Infrastrukturänderungen laufen über GitHub Actions: Plan bei PR, Apply bei Merge in main.
Im Terraform-State werden keine Secrets gespeichert — nur AWS Secrets Manager ARNs.

## Stack

- Terraform 1.7.5 (versioniert via .terraform-version)
- Terragrunt 0.55.1 (versioniert via .terragrunt-version)
- AWS Provider 5.x — VPC, ECS, RDS, S3, CloudFront, ACM, Route53, IAM
- Remote State: S3 + DynamoDB-Locking (ein Bucket pro Umgebung/Region)
- Sicherheit: Checkov 3.x, tfsec 1.28+, tflint 0.50+
- Authentifizierung: AWS SSO über benannte Profile (dev-admin, staging-admin, prod-admin)
- CI/CD: GitHub Actions mit OIDC-basierter AWS-Authentifizierung (keine langlebigen Zugangsdaten in CI)

## Verzeichniskonventionen

- `modules/` — wiederverwendbare Module, jeweils mit main.tf, variables.tf, outputs.tf, versions.tf
- `environments/<env>/<resource>/terragrunt.hcl` — ressourcenspezifische Konfiguration für eine bestimmte Umgebung
- `environments/<env>/terragrunt.hcl` — Konfiguration auf Umgebungsebene (account_id, aws_profile, Umgebungs-Tags)
- `environments/terragrunt.hcl` — Root-Konfiguration (State-Bucket-Key, Region, gemeinsame Tags)

## Neue AWS-Ressource hinzufügen — genaue Schritte

1. Entscheiden, ob sie in ein bestehendes Modul gehört oder ein neues benötigt wird
2. Bei neuem Modul: `modules/<name>/` anlegen mit main.tf, variables.tf, outputs.tf, versions.tf
3. Pflicht-Tag `tags = merge(var.common_tags, { Name = "..." })` zu jeder taggbaren Ressource hinzufügen
4. `dependency`-Blöcke in der Terragrunt-Konfiguration deklarieren, wenn die Ressource VPC/RDS-Outputs benötigt
5. Zuerst `environments/dev/<name>/terragrunt.hcl` anlegen; mit `terragrunt plan` in dev testen
6. Nach erfolgreichem dev-Test, staging- und prod-Konfigurationen hinzufügen
7. Niemals Account-IDs, Regionen oder AMI-IDs hartkodieren — aus Variablen oder Data-Sources lesen
8. `/new-resource`-Slash-Command verwenden, um das Modul-Grundgerüst zu erstellen

## Plan/Apply-Workflow

```bash
# Zuerst authentifizieren
aws sso login --profile dev-admin

# Eine einzelne Ressource in dev planen
cd environments/dev/ecs-service
terragrunt plan

# Alle Ressourcen in dev planen (in Abhängigkeitsreihenfolge)
cd environments/dev
terragrunt run-all plan

# In dev anwenden (niemals auto-approve in staging/prod ohne CI-Review)
cd environments/dev/ecs-service
terragrunt apply

# Formatprüfung vor dem Commit
bash scripts/format-check.sh

# Sicherheitsscan vor dem Commit
bash scripts/checkov-scan.sh
```

## Modul-Versionierung

- Module werden in Terragrunt-Konfigurationen über Git-Tags versioniert: `source = "../../modules/vpc?ref=v1.4.0"`
- Modul-Tag in `modules/<name>/versions.tf`-Changelog-Kommentar anheben bei Breaking Changes
- Niemals ein Modul per Pfad ohne `?ref=`-Tag referenzieren — ermöglicht parallele Upgrades über Umgebungen hinweg
- Modul-Tags inkrementieren: `v1.x.0` für Breaking Changes, `v1.1.x` für abwärtskompatible Erweiterungen

## State-Verwaltung

- State-Bucket: `<company>-terraform-state-<env>-<region>` (angelegt durch `scripts/init.sh`)
- DynamoDB-Lock-Tabelle: `<company>-terraform-locks-<env>` (LockID als Hash-Key)
- Niemals `terraform state mv`, `terraform state rm` oder `terraform import` lokal in prod ausführen
  — PR mit Dokumentation der Änderung öffnen und in CI mit Plan-Diff ausführen
- State-Bucket hat Versionierung aktiviert — bei fehlerhaftem Apply vorherige State-Version wiederherstellen

## Secret-Handling — Pflichtregeln

- Secrets (DB-Passwörter, API-Keys, TLS-Private-Keys) werden NIEMALS als Terraform-Variablen deklariert
- Secrets werden in AWS Secrets Manager außerhalb von Terraform angelegt oder via `aws_secretsmanager_secret`
  mit `lifecycle { ignore_changes = [secret_string] }`, damit Rotation keinen Drift verursacht
- Terraform gibt nur den ARN des Secrets aus, niemals den Wert
- ECS-Task-Definitionen referenzieren Secrets über den `secrets`-Block mit `valueFrom = secret_arn`
- Das RDS-Modul gibt `db_secret_arn` aus; die Anwendung liest Zugangsdaten zur Laufzeit über das SDK

## Tagging-Konventionen — jede Ressource muss diese Tags haben

| Tag | Wert | Gesetzt durch |
|---|---|---|
| Environment | dev / staging / prod | env-level terragrunt.hcl |
| ManagedBy | terraform | root terragrunt.hcl |
| Repository | github.com/org/infra | root terragrunt.hcl |
| Service | vpc / ecs-service / rds / etc. | Modul-Eingabevariable `service_name` |
| CostCenter | platform / backend / data | env-level terragrunt.hcl |
| Owner | team-platform@company.com | env-level terragrunt.hcl |

`/tag-audit` ausführen, um Ressourcen mit fehlenden Pflicht-Tags vor dem Öffnen eines PRs zu finden.

## Checkov / tfsec-Behebung

- Kein `#checkov:skip` ohne JIRA-Ticket im Kommentar hinzufügen: `#checkov:skip=CKV_AWS_18:PLAT-1234`
- Akzeptierte Skips sind in `.checkov.yml` mit Begründungskommentar dokumentiert
- `/checkov-fix` ausführen, um eine Erklärung und einen Patch-Vorschlag für einen bestimmten Befund zu erhalten
- Alle neuen Module müssen `checkov -d modules/<name>` vor dem Merge bestehen

## Was nicht zu tun ist

- Niemals `terraform apply` direkt in staging oder prod ausführen — CI verwenden
- AWS-Zugriffsschlüssel in keiner Datei speichern; AWS-SSO-Profile verwenden
- Keine sensiblen Werte (Passwörter, Private-Keys) aus Modulen ausgeben
- `count` nicht für Ressourcen mit eindeutigen logischen Identitäten verwenden — `for_each` mit einer Map nutzen
- Keine IAM-Policies mit `"Action": "*"` oder `"Resource": "*"` erstellen — Berechtigungen eingrenzen
- `.terraform.lock.hcl` nicht manuell bearbeiten — `terraform providers lock` zum Aktualisieren verwenden
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
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/yourname/infra"
      ]
    },
    "aws": {
      "command": "npx",
      "args": ["-y", "@aws/mcp-server-aws-resources"],
      "env": {
        "AWS_PROFILE": "dev-admin",
        "AWS_REGION": "us-east-1"
      }
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
            "command": "bash -c 'f=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$f\" == *.tf ]]; then terraform fmt \"$f\" 2>/dev/null || true; fi'"
          }
        ]
      },
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'f=\"$CLAUDE_TOOL_INPUT_FILE_PATH\"; if [[ \"$f\" == *.tf ]]; then dir=$(dirname \"$f\"); checkov -d \"$dir\" --compact --quiet 2>/dev/null | grep FAILED && echo \"[HOOK] Checkov findings above — run /checkov-fix\" >&2 || true; fi'"
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_COMMAND\" | grep -qE \"terragrunt apply|terraform apply\"; then env=$(echo \"$CLAUDE_TOOL_INPUT_COMMAND\" | grep -oP \"environments/\\K[^/]+\" || echo \"unknown\"); if [[ \"$env\" == \"prod\" ]]; then echo \"[HOOK] Applying to PROD — ensure CI approval is complete\" >&2; fi; fi'"
          }
        ]
      }
    ]
  }
}
```

## Zu installierende Skills

```bash
npx uitkit add skill devops-infra/terraform-module
npx uitkit add skill devops-infra/terragrunt-config
npx uitkit add skill devops-infra/aws-iam-policy
npx uitkit add skill devops-infra/checkov-remediation
npx uitkit add skill devops-infra/tfsec-remediation
npx uitkit add skill devops-infra/github-actions-cicd
npx uitkit add skill devops-infra/aws-secrets-manager
npx uitkit add skill devops-infra/aws-vpc-design
npx uitkit add skill devops-infra/ecs-service-deploy
```

## Verwandte Ressourcen

- [Terraform-Modul-Authoring-Leitfaden](../guides/terraform-modules.md)
- [AWS-Umgebungs-Promotion-Workflow](../workflows/terraform-env-promotion.md)
