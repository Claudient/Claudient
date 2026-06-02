# Infrastructure as Code (Terraform) — Structure du projet

> Pour les ingénieurs plateforme et DevOps qui gèrent une infrastructure AWS en production avec Terraform et Terragrunt, en optimisant la boucle de révision plan/apply et en appliquant des standards de sécurité et de balisage sur tous les environnements.

## Stack

- **IaC :** Terraform 1.7+ (HCL), Terraform Cloud ou backend local
- **Provider AWS :** hashicorp/aws ~> 5.0 (VPC, ECS, RDS, S3, CloudFront, ACM, Route53, IAM)
- **État distant :** Backend S3 + verrouillage d'état DynamoDB (un bucket par région)
- **Configs DRY :** Terragrunt 0.55+ (hiérarchie `terragrunt.hcl`, `read_terragrunt_config`)
- **Analyse de sécurité :** Checkov 3.x (`checkov -d .`), tfsec 1.28+ (`tfsec .`)
- **Formatage / validation :** `terraform fmt`, `terraform validate`, `tflint 0.50+`
- **CI/CD :** GitHub Actions (`terraform-plan.yml` sur PR, `terraform-apply.yml` lors de la fusion sur main)
- **Auth :** AWS SSO (`aws sso login --profile <env>`) via des profils nommés dans `~/.aws/config`
- **Secrets :** AWS Secrets Manager (aucun secret dans l'état — seules les références ARN sont stockées dans les outputs Terraform)
- **Registre de modules :** Modules locaux dans `modules/` épinglés par tag git (`source = "../../modules/vpc?ref=v1.4.0"`)

## Arborescence du projet

```
infra/                                          # Racine du dépôt
├── .claude/
│   ├── CLAUDE.md                               # Instructions pour Claude Code au niveau du dépôt
│   ├── settings.json                           # Serveurs MCP, hooks, permissions
│   └── commands/
│       ├── new-resource.md                     # /new-resource — générer le squelette module + variables + outputs
│       ├── plan-env.md                         # /plan-env — exécuter terragrunt plan pour un environnement donné
│       ├── checkov-fix.md                      # /checkov-fix — expliquer et corriger un résultat Checkov
│       ├── tag-audit.md                        # /tag-audit — vérifier les tags obligatoires manquants sur toutes les ressources
│       └── rotate-secret.md                    # /rotate-secret — mettre à jour Secrets Manager + déclencher un redéploiement
├── .github/
│   └── workflows/
│       ├── terraform-plan.yml                  # PR : vérification fmt, validate, tflint, checkov, tfsec, plan
│       └── terraform-apply.yml                 # Fusion sur main : apply avec auth AWS via OIDC
├── modules/                                    # Modules internes réutilisables (versionnés sémantiquement via tags git)
│   ├── vpc/
│   │   ├── main.tf                             # VPC, sous-réseaux (public/privé), IGW, passerelle NAT
│   │   ├── variables.tf                        # cidr_block, azs, enable_nat_gateway, single_nat_gateway
│   │   ├── outputs.tf                          # vpc_id, private_subnet_ids, public_subnet_ids
│   │   ├── versions.tf                         # required_providers : aws ~> 5.0, terraform ~> 1.7
│   │   └── README.md
│   ├── ecs-service/
│   │   ├── main.tf                             # Définition de tâche ECS, service, groupe cible ALB, règle listener
│   │   ├── variables.tf                        # cluster_arn, container_image, cpu, memory, port, env_vars
│   │   ├── outputs.tf                          # service_name, task_definition_arn, alb_target_group_arn
│   │   ├── iam.tf                              # Rôle d'exécution de tâche, rôle de tâche avec politiques moindre privilège
│   │   ├── autoscaling.tf                      # Application Auto Scaling : suivi de cible CPU/mémoire
│   │   ├── versions.tf
│   │   └── README.md
│   ├── rds/
│   │   ├── main.tf                             # Instance ou cluster RDS (Aurora), groupe de sous-réseaux, groupe de paramètres
│   │   ├── variables.tf                        # engine, engine_version, instance_class, multi_az, db_name
│   │   ├── outputs.tf                          # db_endpoint, db_port, db_secret_arn (SANS identifiants)
│   │   ├── security-group.tf                   # SG autorisant le trafic uniquement depuis le SG de tâche ECS + SG bastion
│   │   ├── versions.tf
│   │   └── README.md
│   ├── s3-bucket/
│   │   ├── main.tf                             # Bucket S3, versionnement, chiffrement (SSE-S3 ou KMS), cycle de vie
│   │   ├── variables.tf                        # bucket_name_prefix, versioning_enabled, kms_key_arn, cors_rules
│   │   ├── outputs.tf                          # bucket_id, bucket_arn, bucket_domain_name
│   │   ├── policy.tf                           # Politique du bucket : forcer TLS, bloquer l'accès public
│   │   ├── versions.tf
│   │   └── README.md
│   └── iam-role/
│       ├── main.tf                             # Rôle IAM avec assume_role_policy, politiques inline ou gérées
│       ├── variables.tf                        # role_name, trusted_services, policy_arns, inline_policy_json
│       ├── outputs.tf                          # role_arn, role_name, instance_profile_arn
│       └── versions.tf
├── environments/
│   ├── terragrunt.hcl                          # Config racine : bucket d'état distant, région, inputs communs
│   ├── dev/
│   │   ├── terragrunt.hcl                      # Niveau env : account_id, aws_profile, tags communs
│   │   ├── vpc/
│   │   │   └── terragrunt.hcl                  # Inclut root + env ; inputs pour cette ressource en dev
│   │   ├── ecs-service/
│   │   │   └── terragrunt.hcl                  # depends_on = [../vpc], inputs : container_image, cpu=256
│   │   ├── rds/
│   │   │   └── terragrunt.hcl                  # depends_on = [../vpc] ; instance_class = db.t3.micro
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
│       ├── terragrunt.hcl                      # account_id pointe vers le compte AWS de production
│       ├── vpc/
│       │   └── terragrunt.hcl                  # 3 AZs, enable_nat_gateway = true, single_nat_gateway = false
│       ├── ecs-service/
│       │   └── terragrunt.hcl                  # cpu=1024, memory=2048, desired_count=3
│       ├── rds/
│       │   └── terragrunt.hcl                  # multi_az = true, instance_class = db.r6g.large
│       ├── cloudfront/
│       │   └── terragrunt.hcl                  # CloudFront + ACM + Route53 (prod uniquement)
│       └── s3-bucket/
│           └── terragrunt.hcl
├── scripts/
│   ├── init.sh                                 # Amorçage : créer le bucket d'état + table DynamoDB si inexistants
│   ├── format-check.sh                         # terraform fmt -recursive -check ; exit 1 en cas de différence
│   ├── checkov-scan.sh                         # checkov -d . --framework terraform --compact
│   └── sso-login.sh                            # aws sso login --profile $ENV ; export AWS_PROFILE
├── .tflint.hcl                                 # Config tflint : plugin aws, règles (aws_instance_invalid_type)
├── .checkov.yml                                # Checkov : liste de skips pour risques acceptés + catégories de vérification
├── .terraform-version                          # Épinglage tfenv / tofuenv : 1.7.5
├── .terragrunt-version                         # Épinglage tgenv : 0.55.1
└── .gitignore                                  # .terraform/, *.tfstate, *.tfstate.backup, .terraform.lock.hcl
```

## Fichiers clés expliqués

| Chemin | Rôle |
|---|---|
| `environments/terragrunt.hcl` | Config Terragrunt racine : définit le schéma de clé du bucket S3 d'état distant via `path_relative_to_include()`, fixe la région AWS, et injecte `common_tags` (Environment, ManagedBy, Repository) dans chaque module enfant |
| `environments/prod/terragrunt.hcl` | Config au niveau de l'environnement : définit `aws_profile = "prod-admin"`, `account_id`, et les tags spécifiques à l'env (Environment = "prod", CostCenter) qui surchargent les valeurs racine |
| `environments/prod/ecs-service/terragrunt.hcl` | Config Terragrunt au niveau de la ressource : déclare des blocs `dependency` sur VPC et RDS pour lire leurs outputs ; définit le dimensionnement en production (`cpu=1024`, `desired_count=3`) ; ne contient jamais de secrets |
| `modules/rds/outputs.tf` | Expose `db_secret_arn` (l'ARN du secret Secrets Manager contenant les identifiants) — ne expose jamais le nom d'utilisateur, le mot de passe ou la chaîne de connexion réels |
| `modules/iam-role/main.tf` | Source de vérité unique pour la création de tous les rôles IAM ; impose le préfixe `path = "/app/"` et un tag `Name` obligatoire ; utilisé par les rôles de tâche ECS et les rôles d'exécution Lambda |
| `.github/workflows/terraform-plan.yml` | Exécute `fmt -check`, `validate`, `tflint`, `checkov`, `tfsec` et `terragrunt plan` sur chaque PR ; publie le diff du plan en commentaire de PR via `github-actions[bot]` ; utilise OIDC pour l'auth AWS (sans clés durables) |
| `.github/workflows/terraform-apply.yml` | Déclenché lors de la fusion sur `main` ; exécute `terragrunt apply -auto-approve` uniquement dans le répertoire d'environnement modifié ; exige une approbation manuelle via les Environnements GitHub pour `prod` |
| `scripts/init.sh` | Amorçage idempotent : crée le bucket S3 d'état (versionnement + chiffrement activés) et la table de verrouillage DynamoDB si elles n'existent pas ; peut être exécuté plusieurs fois sans effet de bord |

## Génération rapide du squelette

```bash
# Prérequis : terraform 1.7+, terragrunt 0.55+, aws CLI v2, tflint, checkov, tfsec

# Cloner ou créer le dépôt
mkdir infra && cd infra
git init

# Créer les répertoires de modules
mkdir -p modules/vpc modules/ecs-service modules/rds modules/s3-bucket modules/iam-role

# Créer les fichiers stub pour chaque module
for module in vpc ecs-service rds s3-bucket iam-role; do
  touch modules/$module/main.tf \
        modules/$module/variables.tf \
        modules/$module/outputs.tf \
        modules/$module/versions.tf
done
touch modules/ecs-service/iam.tf modules/ecs-service/autoscaling.tf
touch modules/rds/security-group.tf
touch modules/s3-bucket/policy.tf

# Créer la structure des répertoires d'environnement
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

# Créer les scripts
mkdir -p scripts
touch scripts/init.sh scripts/format-check.sh scripts/checkov-scan.sh scripts/sso-login.sh
chmod +x scripts/*.sh

# Créer les workflows GitHub Actions
mkdir -p .github/workflows
touch .github/workflows/terraform-plan.yml
touch .github/workflows/terraform-apply.yml

# Créer les fichiers de configuration
touch .tflint.hcl .checkov.yml
echo "1.7.5" > .terraform-version
echo "0.55.1" > .terragrunt-version

# Créer .gitignore
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

# Créer la configuration Claude Code
mkdir -p .claude/commands
touch .claude/CLAUDE.md .claude/settings.json
touch .claude/commands/new-resource.md
touch .claude/commands/plan-env.md
touch .claude/commands/checkov-fix.md
touch .claude/commands/tag-audit.md
touch .claude/commands/rotate-secret.md

# Installer les skills Claudient
npx claudient add skill devops-infra/terraform-module
npx claudient add skill devops-infra/terragrunt-config
npx claudient add skill devops-infra/aws-iam-policy
npx claudient add skill devops-infra/checkov-remediation
npx claudient add skill devops-infra/github-actions-cicd
npx claudient add skill devops-infra/aws-secrets-manager

# Amorcer l'état distant (à exécuter une fois par environnement/région)
bash scripts/init.sh dev us-east-1
bash scripts/init.sh staging us-east-1
bash scripts/init.sh prod us-east-1

echo "Dépôt Terraform généré. Exécuter : aws sso login --profile dev-admin"
```

## Modèle CLAUDE.md

```markdown
# Infrastructure as Code (Terraform + Terragrunt)

Infrastructure AWS en production gérée avec Terraform 1.7+ et Terragrunt 0.55+.
Toutes les modifications d'infrastructure passent par GitHub Actions : plan sur PR, apply lors de la fusion sur main.
Aucun secret n'est stocké dans l'état Terraform — uniquement les ARN AWS Secrets Manager.

## Stack

- Terraform 1.7.5 (épinglé via .terraform-version)
- Terragrunt 0.55.1 (épinglé via .terragrunt-version)
- AWS Provider 5.x — VPC, ECS, RDS, S3, CloudFront, ACM, Route53, IAM
- État distant : S3 + verrouillage DynamoDB (un bucket par environnement/région)
- Sécurité : Checkov 3.x, tfsec 1.28+, tflint 0.50+
- Auth : AWS SSO via profils nommés (dev-admin, staging-admin, prod-admin)
- CI/CD : GitHub Actions avec auth AWS via OIDC (aucune clé durable en CI)

## Conventions de répertoires

- `modules/` — modules réutilisables, chacun avec main.tf, variables.tf, outputs.tf, versions.tf
- `environments/<env>/<resource>/terragrunt.hcl` — config au niveau ressource pour un env spécifique
- `environments/<env>/terragrunt.hcl` — config au niveau env (account_id, aws_profile, tags env)
- `environments/terragrunt.hcl` — config racine (clé du bucket d'état, région, tags communs)

## Ajouter une nouvelle ressource AWS — étapes exactes

1. Déterminer si elle appartient à un module existant ou nécessite un nouveau module
2. Si nouveau module : créer `modules/<name>/` avec main.tf, variables.tf, outputs.tf, versions.tf
3. Ajouter `tags = merge(var.common_tags, { Name = "..." })` à chaque ressource balisable
4. Déclarer des blocs `dependency` dans la config Terragrunt si la ressource dépend des outputs VPC/RDS
5. Créer `environments/dev/<name>/terragrunt.hcl` en premier ; tester avec `terragrunt plan` en dev
6. Une fois dev validé, ajouter les configs staging et prod
7. Ne jamais coder en dur les IDs de compte, la région ou les IDs AMI — les lire depuis des variables ou des sources de données
8. Utiliser la commande slash `/new-resource` pour générer le squelette du module

## Workflow plan/apply

```bash
# S'authentifier d'abord
aws sso login --profile dev-admin

# Planifier une ressource unique en dev
cd environments/dev/ecs-service
terragrunt plan

# Planifier toutes les ressources en dev (dans l'ordre des dépendances)
cd environments/dev
terragrunt run-all plan

# Appliquer en dev (ne jamais utiliser auto-approve en staging/prod sans revue CI)
cd environments/dev/ecs-service
terragrunt apply

# Vérification du formatage avant de committer
bash scripts/format-check.sh

# Analyse de sécurité avant de committer
bash scripts/checkov-scan.sh
```

## Versionnement des modules

- Les modules sont épinglés dans les configs Terragrunt via des tags git : `source = "../../modules/vpc?ref=v1.4.0"`
- Incrémenter le tag du module dans le commentaire de changelog de `modules/<name>/versions.tf` lors de changements incompatibles
- Ne jamais référencer un module par chemin sans tag `?ref=` — cela permet des mises à niveau côte à côte entre environnements
- Incrémenter les tags de module : `v1.x.0` pour les changements incompatibles, `v1.1.x` pour les ajouts rétrocompatibles

## Gestion de l'état

- Bucket d'état : `<company>-terraform-state-<env>-<region>` (créé par `scripts/init.sh`)
- Table de verrouillage DynamoDB : `<company>-terraform-locks-<env>` (LockID comme clé de hachage)
- Ne jamais exécuter `terraform state mv`, `terraform state rm` ou `terraform import` localement en prod
  — ouvrir une PR documentant la modification et l'exécuter en CI avec un diff du plan
- Le bucket d'état a le versionnement activé — pour récupérer après un apply défaillant, restaurer la version d'état précédente

## Gestion des secrets — règles obligatoires

- Les secrets (mots de passe DB, clés API, clés privées TLS) ne sont JAMAIS déclarés comme variables Terraform
- Les secrets sont créés dans AWS Secrets Manager en dehors de Terraform, ou via `aws_secretsmanager_secret`
  avec `lifecycle { ignore_changes = [secret_string] }` pour que la rotation ne génère pas de dérive
- Terraform n'expose que l'ARN du secret, jamais sa valeur
- Les définitions de tâches ECS référencent les secrets via le bloc `secrets` avec `valueFrom = secret_arn`
- Le module RDS expose `db_secret_arn` ; l'application lit les identifiants au moment de l'exécution via le SDK

## Conventions de balisage — chaque ressource doit avoir ces tags

| Tag | Valeur | Défini par |
|---|---|---|
| Environment | dev / staging / prod | env-level terragrunt.hcl |
| ManagedBy | terraform | root terragrunt.hcl |
| Repository | github.com/org/infra | root terragrunt.hcl |
| Service | vpc / ecs-service / rds / etc. | variable d'entrée de module `service_name` |
| CostCenter | platform / backend / data | env-level terragrunt.hcl |
| Owner | team-platform@company.com | env-level terragrunt.hcl |

Exécuter `/tag-audit` pour vérifier les ressources avec des tags obligatoires manquants avant d'ouvrir une PR.

## Remédiation Checkov / tfsec

- Ne pas ajouter `#checkov:skip` sans un ticket JIRA dans le commentaire : `#checkov:skip=CKV_AWS_18:PLAT-1234`
- Les skips acceptés sont documentés dans `.checkov.yml` avec un commentaire de justification
- Exécuter `/checkov-fix` pour obtenir une explication et un patch proposé pour un résultat spécifique
- Tous les nouveaux modules doivent passer `checkov -d modules/<name>` avant fusion

## Ce qu'il ne faut pas faire

- Ne pas exécuter `terraform apply` directement en staging ou prod — utiliser la CI
- Ne pas stocker des clés d'accès AWS dans un fichier ; utiliser les profils AWS SSO
- Ne pas exposer des valeurs sensibles (mots de passe, clés privées) depuis un module
- Ne pas utiliser `count` pour des ressources ayant des identités logiques uniques — utiliser `for_each` avec une map
- Ne pas créer de politiques IAM avec `"Action": "*"` ou `"Resource": "*"` — les restreindre
- Ne pas modifier `.terraform.lock.hcl` manuellement — exécuter `terraform providers lock` pour le mettre à jour
```

## Serveurs MCP

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

## Hooks recommandés

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

## Skills à installer

```bash
npx claudient add skill devops-infra/terraform-module
npx claudient add skill devops-infra/terragrunt-config
npx claudient add skill devops-infra/aws-iam-policy
npx claudient add skill devops-infra/checkov-remediation
npx claudient add skill devops-infra/tfsec-remediation
npx claudient add skill devops-infra/github-actions-cicd
npx claudient add skill devops-infra/aws-secrets-manager
npx claudient add skill devops-infra/aws-vpc-design
npx claudient add skill devops-infra/ecs-service-deploy
```

## Ressources associées

- [Guide de création de modules Terraform](../guides/terraform-modules.md)
- [Workflow de promotion d'environnement AWS](../workflows/terraform-env-promotion.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
