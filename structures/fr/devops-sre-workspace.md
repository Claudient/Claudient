# Espace de travail DevOps / SRE — Structure de projet

> Pour un ingénieur DevOps ou SRE gérant l'infrastructure cloud, le CI/CD, la réponse aux incidents et la fiabilité de la plateforme à grande échelle.

## Stack

- **Cloud :** AWS (EC2, ECS, RDS, S3, CloudFront, IAM, VPC) / GCP / Azure
- **IaC :** Terraform 1.7+ avec Terragrunt pour l'orchestration multi-environnements
- **Conteneurs :** Kubernetes 1.29+, Helm 3, ArgoCD 2.10 (GitOps)
- **CI/CD :** GitHub Actions avec des workflows réutilisables et des actions composites
- **Observabilité :** Datadog (APM, logs, infrastructure) ou Grafana + Prometheus + Loki
- **Alerting :** PagerDuty avec des politiques d'escalade et des rotations d'astreinte
- **Runtime de conteneur :** Docker 25+ avec des builds multi-étapes
- **Gestionnaire de paquets :** Helm pour Kubernetes, npm pour les scripts d'outillage
- **Gestion des secrets :** AWS Secrets Manager ou HashiCorp Vault
- **Policy as code :** OPA / Conftest pour le contrôle d'admission Terraform et Kubernetes

## Arborescence du projet

```
devops-sre-workspace/
├── .claude/
│   ├── CLAUDE.md                       # Instructions d'espace de travail pour Claude Code
│   ├── settings.json                   # Serveurs MCP, hooks, permissions
│   └── commands/
│       ├── incident-response.md        # /incident-response — triage structuré et salle de guerre
│       ├── deploy-check.md             # /deploy-check — checklist de sécurité pré-déploiement
│       ├── cost-review.md              # /cost-review — analyse des coûts cloud et détection d'anomalies
│       ├── capacity-plan.md            # /capacity-plan — prévision des ressources et mise à l'échelle
│       ├── postmortem.md               # /postmortem — rédaction structurée de postmortem
│       ├── runbook-new.md              # /runbook-new — générer un runbook à partir de l'historique des incidents
│       └── infra-change.md             # /infra-change — analyse de l'impact des changements IaC
├── runbooks/
│   ├── _template.md                    # Format canonique de runbook (source de vérité)
│   ├── payment-service.md              # Runbook par service : alertes, étapes de résolution
│   ├── auth-service.md
│   ├── api-gateway.md
│   ├── database-postgres.md            # Spécifique base de données : réplication, bascule, vacuum
│   ├── redis-cluster.md                # Redis : éviction, épuisement des connexions, split de cluster
│   ├── kafka-brokers.md                # Kafka : partitions sous-répliquées, retard des consommateurs
│   ├── kubernetes-nodes.md             # Pression des nœuds, éviction, OOM, pression disque
│   ├── kubernetes-networking.md        # Problèmes CNI, échecs DNS, timeouts ingress
│   └── argocd-sync-failures.md         # Échecs de synchronisation GitOps et procédures de rollback
├── postmortems/
│   ├── _template.md                    # Format de postmortem : chronologie, cause racine, actions
│   ├── 2024-11-15-payment-outage.md    # Revue d'incident daté
│   ├── 2024-12-02-db-failover.md
│   └── 2025-01-20-deploy-rollback.md
├── terraform/
│   ├── modules/
│   │   ├── vpc/
│   │   │   ├── main.tf                 # VPC, sous-réseaux, tables de routage, passerelle NAT
│   │   │   ├── variables.tf
│   │   │   ├── outputs.tf
│   │   │   └── README.md
│   │   ├── eks-cluster/
│   │   │   ├── main.tf                 # Plan de contrôle EKS, groupes de nœuds, rôles IAM
│   │   │   ├── variables.tf
│   │   │   ├── outputs.tf
│   │   │   └── README.md
│   │   ├── rds-postgres/
│   │   │   ├── main.tf                 # Instance RDS, groupes de paramètres, groupes de sécurité
│   │   │   ├── variables.tf
│   │   │   ├── outputs.tf
│   │   │   └── README.md
│   │   ├── iam-roles/
│   │   │   ├── main.tf                 # Rôles IRSA, politiques, relations de confiance
│   │   │   ├── variables.tf
│   │   │   └── outputs.tf
│   │   └── s3-bucket/
│   │       ├── main.tf                 # Bucket, versionnement, cycle de vie, réplication
│   │       ├── variables.tf
│   │       └── outputs.tf
│   ├── environments/
│   │   ├── production/
│   │   │   ├── terragrunt.hcl          # Entrées spécifiques à l'env, config de l'état distant
│   │   │   ├── vpc/terragrunt.hcl
│   │   │   ├── eks/terragrunt.hcl
│   │   │   └── rds/terragrunt.hcl
│   │   ├── staging/
│   │   │   ├── terragrunt.hcl
│   │   │   └── eks/terragrunt.hcl
│   │   └── dev/
│   │       └── terragrunt.hcl
│   └── terragrunt.hcl                  # Racine : backend d'état distant, versions des fournisseurs
├── kubernetes/
│   ├── base/
│   │   ├── namespaces.yaml             # Toutes les définitions de namespaces
│   │   ├── resource-quotas.yaml        # Limites CPU/mémoire par namespace
│   │   ├── network-policies.yaml       # Refus par défaut, règles d'autorisation service à service
│   │   └── pod-disruption-budgets.yaml # Définitions PDB pour les charges de travail avec état
│   ├── helm/
│   │   ├── payment-service/
│   │   │   ├── Chart.yaml
│   │   │   ├── values.yaml             # Valeurs par défaut : réplicas, ressources, config HPA
│   │   │   ├── values-production.yaml  # Surcharges prod : limites plus élevées, anti-affinité
│   │   │   ├── values-staging.yaml
│   │   │   └── templates/
│   │   │       ├── deployment.yaml
│   │   │       ├── service.yaml
│   │   │       ├── hpa.yaml            # Définition HorizontalPodAutoscaler
│   │   │       ├── pdb.yaml
│   │   │       └── servicemonitor.yaml # Prometheus ServiceMonitor
│   │   └── api-gateway/
│   │       ├── Chart.yaml
│   │       └── values.yaml
│   └── argocd/
│       ├── apps/
│       │   ├── payment-service.yaml    # Manifeste Application ArgoCD
│       │   └── api-gateway.yaml
│       └── app-of-apps.yaml            # ApplicationSet racine pour tous les services
├── ci-cd/
│   ├── .github/
│   │   └── workflows/
│   │       ├── deploy-production.yml   # Déploiement en production : plan, approbation, apply, notification
│   │       ├── deploy-staging.yml      # Staging : déploiement automatique à la fusion sur main
│   │       ├── terraform-plan.yml      # PR : exécuter terraform plan, poster le diff en commentaire
│   │       ├── helm-lint.yml           # PR : helm lint et validation des templates
│   │       ├── security-scan.yml       # Scan d'image Trivy, tfsec, checkov
│   │       └── cost-estimation.yml     # Infracost sur les PR Terraform
│   └── composite-actions/
│       ├── setup-aws/action.yml        # Configurer les identifiants AWS via OIDC
│       ├── setup-kubectl/action.yml    # Configurer kubeconfig pour le cluster cible
│       └── notify-slack/action.yml     # Poster le statut de déploiement sur le canal Slack
├── oncall/
│   ├── rotation-schedule.md            # Rotation d'astreinte : qui, quand, processus de passation
│   ├── alert-definitions.md            # Toutes les alertes PagerDuty : seuil, sévérité, responsable
│   ├── escalation-paths.md             # Contacts d'escalade P1/P2/P3 et SLAs
│   ├── onboarding-checklist.md         # Checklist nouvel ingénieur d'astreinte : accès, configuration, observation
│   └── incident-channels.md            # Canaux Slack, processus de salle de guerre, communication parties prenantes
└── docs/
    ├── architecture/
    │   ├── system-overview.md          # Diagramme d'architecture haut niveau et carte des services
    │   ├── network-topology.md         # Disposition VPC, peering, sous-réseaux publics/privés
    │   └── data-flow.md                # Flux de données : ingress → services → bases de données → egress
    ├── service-catalog.md              # Tous les services : responsable, dépôt, SLO, lien runbook
    ├── slo-registry.md                 # Définitions des SLO, budgets d'erreur, taux de consommation
    └── disaster-recovery.md            # Objectifs RPO/RTO, procédures de bascule, exercices DR
```

## Fichiers clés expliqués

| Chemin | Objectif |
|---|---|
| `.claude/commands/incident-response.md` | Commande slash qui exécute la compétence de triage d'incident structuré — génère la chronologie, attribue la sévérité, rédige la mise à jour pour les parties prenantes |
| `.claude/commands/infra-change.md` | Analyse la sortie du plan Terraform pour le rayon d'explosion, les risques de dépendance et la complexité du rollback avant tout apply d'infrastructure |
| `runbooks/_template.md` | Format canonique de runbook : vue d'ensemble du service, catalogue d'alertes avec arbres de décision, chemins d'escalade, opérations courantes, points de vigilance |
| `terraform/environments/production/terragrunt.hcl` | Configuration Terragrunt spécifique à la production : backend d'état distant, surcharges des variables d'entrée, ordonnancement des dépendances |
| `kubernetes/helm/payment-service/values-production.yaml` | Valeurs Helm de production : nombre de réplicas, limites de ressources, règles d'anti-affinité, seuils HPA |
| `ci-cd/.github/workflows/terraform-plan.yml` | Workflow GitHub Actions qui exécute `terraform plan` sur les PR et poste le diff en commentaire avec une estimation des coûts |
| `oncall/alert-definitions.md` | Source de vérité unique pour tous les noms d'alertes PagerDuty, les chaînes de requête Datadog/Grafana, les seuils, la sévérité et les liens runbook |
| `docs/slo-registry.md` | Tous les SLO de services : objectif de disponibilité, SLI de latence, fenêtre de budget d'erreur, seuils d'alerte de taux de consommation, cadence de révision |

## Scaffold rapide

```bash
# Créer la structure complète de l'espace de travail DevOps/SRE
mkdir -p devops-sre-workspace

cd devops-sre-workspace

# Configuration Claude Code
mkdir -p .claude/commands

# Répertoires opérationnels
mkdir -p runbooks postmortems oncall

# Infrastructure as Code
mkdir -p terraform/modules/vpc terraform/modules/eks-cluster terraform/modules/rds-postgres
mkdir -p terraform/modules/iam-roles terraform/modules/s3-bucket
mkdir -p terraform/environments/production/vpc terraform/environments/production/eks terraform/environments/production/rds
mkdir -p terraform/environments/staging/eks terraform/environments/dev

# Kubernetes et Helm
mkdir -p kubernetes/base
mkdir -p kubernetes/helm/payment-service/templates
mkdir -p kubernetes/helm/api-gateway/templates
mkdir -p kubernetes/argocd/apps

# Pipelines CI/CD
mkdir -p ci-cd/.github/workflows
mkdir -p ci-cd/composite-actions/setup-aws
mkdir -p ci-cd/composite-actions/setup-kubectl
mkdir -p ci-cd/composite-actions/notify-slack

# Documentation
mkdir -p docs/architecture

# Créer les fichiers clés
touch runbooks/_template.md postmortems/_template.md
touch oncall/rotation-schedule.md oncall/alert-definitions.md oncall/escalation-paths.md
touch docs/service-catalog.md docs/slo-registry.md docs/disaster-recovery.md
touch docs/architecture/system-overview.md docs/architecture/network-topology.md

# Installer les compétences
npx claudient add skill devops-infra/oncall-runbook
npx claudient add skill devops-infra/capacity-planner
npx claudient add skill devops-infra/observability-designer
npx claudient add skill devops-infra/slo-architect
npx claudient add skill devops-infra/chaos-engineering
npx claudient add skill devops-infra/terraform
npx claudient add skill devops-infra/kubernetes
npx claudient add skill devops-infra/cicd
npx claudient add skill devops-infra/aws-architect

# Copier les compétences installées comme commandes d'espace de travail
cp ~/.claude/skills/devops-infra/oncall-runbook.md .claude/commands/runbook-new.md
cp ~/.claude/skills/devops-infra/capacity-planner.md .claude/commands/capacity-plan.md

echo "Espace de travail DevOps/SRE créé."
```

## Template CLAUDE.md

```markdown
# Espace de travail DevOps / SRE

Cet espace de travail est le centre opérationnel pour l'infrastructure cloud, les pipelines CI/CD,
la réponse aux incidents et la fiabilité de la plateforme. Le travail ici est critique pour la
production — la précision et la justesse priment sur la vitesse.

## Stack

- Cloud : AWS (EKS, RDS, S3, IAM, VPC, CloudFront)
- IaC : Terraform 1.7 + Terragrunt (orchestration multi-environnements)
- Conteneurs : Kubernetes 1.29, Helm 3, ArgoCD 2.10 (GitOps)
- CI/CD : GitHub Actions avec authentification OIDC (pas de credentials statiques)
- Observabilité : Datadog (APM, infrastructure, logs) + PagerDuty
- Gestion des secrets : AWS Secrets Manager (production), Vault (staging/dev)

## Conventions de répertoire

- `runbooks/` — un fichier par service ou scénario ; toujours suivre _template.md
- `postmortems/` — nommés YYYY-MM-DD-nom-incident.md ; ne jamais supprimer les anciens
- `terraform/modules/` — modules réutilisables uniquement ; pas de config d'environnement ici
- `terraform/environments/` — configs Terragrunt par environnement ; pas de fichiers .tf bruts
- `kubernetes/helm/` — un chart Helm par service ; values-production.yaml toujours présent
- `ci-cd/.github/workflows/` — pas de secrets codés en dur ; tous les credentials via OIDC ou Secrets Manager

## Tâches courantes — utiliser ces commandes exactes

### Réponse à un incident (incident actif)
/incident-response

### Vérification de sécurité pré-déploiement
/deploy-check

### Générer un nouveau runbook à partir de l'historique des incidents
/runbook-new

### Rédiger un postmortem
/postmortem

### Analyse de l'impact d'un changement d'infrastructure
/infra-change — coller la sortie du plan terraform

### Revue des coûts cloud
/cost-review

### Planification de capacité
/capacity-plan

## Conventions Terraform

- Toujours exécuter `terraform plan` et obtenir une revue avant `apply` en production
- Les entrées des modules doivent avoir des descriptions et des contraintes de type — pas de `any` nu
- Taguer toutes les ressources : Environment, Team, Service, ManagedBy=terraform
- Fichiers d'état : un par environnement par module — ne jamais partager l'état entre environnements
- Utiliser `terragrunt run-all plan` pour la planification multi-modules avec gestion des dépendances

## Conventions Kubernetes

- Toutes les charges de travail doivent avoir : demandes et limites de ressources, readinessProbe, livenessProbe
- HPA configuré pour tous les services sans état : min 2 réplicas, max basé sur le plan de capacité
- PodDisruptionBudget requis pour tous les services avec SLO
- Ne jamais `kubectl apply` directement en production — tous les changements via ArgoCD
- `kubectl exec` dans des pods de production nécessite une justification dans le canal d'incident

## Conventions des runbooks

- Chaque runbook doit lier au tableau de bord Datadog/Grafana pour ce service
- Les étapes d'alerte doivent utiliser des commandes exactes — pas de "vérifier les logs" sans `kubectl logs -n X`
- Les chemins d'escalade doivent nommer des personnes réelles et leurs handles Slack, pas seulement des rôles
- Les runbooks de plus de 90 jours doivent être révisés — marquer avec `[OBSOLÈTE - révision nécessaire]`

## Comportement d'astreinte

- P1 : alerter immédiatement, ouvrir la salle de guerre dans #incident-p1, mettre à jour toutes les 15 minutes
- P2 : résoudre dans les 4 heures ou escalader
- P3 : résoudre avant le prochain jour ouvrable
- Tous les incidents : créer une entrée de postmortem même si résolus rapidement
- Après chaque incident : mettre à jour le runbook concerné avec les nouvelles découvertes

## Ce qu'il ne faut pas faire

- Ne pas committer de secrets, fichiers kubeconfig ou répertoires .terraform/
- Ne pas appliquer terraform en production sans une revue du plan par un second ingénieur
- Ne pas supprimer les postmortems — ils constituent la mémoire opérationnelle de cette équipe
- Ne pas créer de manifestes Kubernetes en dehors de la structure du chart Helm
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
            "command": "bash -c 'if echo \"$CLAUDE_TOOL_INPUT_COMMAND\" | grep -qE \"kubectl (delete|apply|exec).*(production|prod)\"; then echo \"[HOOK] Opération kubectl en écriture sur la production détectée — confirmez que c'est intentionnel\" >&2; fi'"
          }
        ]
      }
    ],
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "bash -c 'if git -C \"$PWD\" diff --name-only 2>/dev/null | grep -qE \"\\.(tf|yaml|yml)$\"; then echo \"Rappel : des modifications d'infrastructure non committées ont été détectées — vérifiez avant de terminer la session.\"; fi'"
          }
        ]
      }
    ]
  }
}
```

## Compétences à installer

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

## Liens associés

- [Guide de l'ingénieur DevOps / SRE](../guides/for-devops-engineer.md)
- [Workflow de réponse aux incidents](../workflows/devops-incident.md)

---

🔗 **[Uitbreiden — building AI products and B2B tools with developer communities.](https://uitbreiden.com/)**
📺 **[Subscribe to our YouTube Channel for more deep dives](https://www.youtube.com/channel/UCcvK8pHyqeR7Q_0lYkuHlUg)**
