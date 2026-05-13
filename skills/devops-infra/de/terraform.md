> 🇩🇪 Dies ist die deutsche Übersetzung. [Englische Version](../terraform.md).

# Terraform Skill

## Wann aktivieren
- Terraform-Module für AWS-, GCP- oder Azure-Infrastruktur schreiben
- VPCs, Subnetze, Sicherheitsgruppen und Netzwerkressourcen definieren
- Compute-Ressourcen bereitstellen (EC2, GKE, AKS, ECS, Lambda)
- Datenbank-Infrastruktur verwalten (RDS, Cloud SQL, Aurora)
- IAM-Rollen, -Richtlinien und Service-Accounts einrichten
- Remote-State-Konfiguration schreiben (S3-Backend, GCS, Terraform Cloud)
- Bestehende Terraform-Konfiguration zur Modulnutzung umstrukturieren
- CI/CD-Pipelines für `terraform plan` und `terraform apply` schreiben
- Bestehende Infrastruktur in den Terraform-State importieren

## Wann NICHT verwenden
- Pulumi, CDK oder Crossplane — andere IaC-Tools, andere Muster
- Helm-Chart-Konfiguration (stattdessen Kubernetes Skill verwenden)
- Anwendungsspezifische Konfiguration (Kubernetes ConfigMaps, App-Umgebungsvariablen)
- Einmalige CLI-Operationen, die nicht wiederholt werden

## Anweisungen

### Modulstruktur
Jedes Terraform-Projekt muss dieser Struktur folgen:
```
infrastructure/
├── modules/
│   ├── networking/
│   │   ├── main.tf
│   │   ├── variables.tf
│   │   ├── outputs.tf
│   │   └── versions.tf
│   └── compute/
│       ├── main.tf
│       ├── variables.tf
│       └── outputs.tf
├── environments/
│   ├── production/
│   │   ├── main.tf          ← ruft Module auf
│   │   ├── variables.tf
│   │   ├── terraform.tfvars
│   │   └── backend.tf
│   └── staging/
│       └── ...
└── versions.tf              ← Root-Provider-Versionen
```

### State-Verwaltung — immer remote
```hcl
# backend.tf
terraform {
  backend "s3" {
    bucket         = "company-terraform-state"
    key            = "production/networking/terraform.tfstate"
    region         = "eu-west-1"
    encrypt        = true
    dynamodb_table = "terraform-state-lock"
  }
}
```
- Niemals lokalen State für gemeinsam genutzte Ressourcen verwenden
- Verschlüsselung und State-Locking aktivieren (DynamoDB für S3-Backend)
- Separate State-Dateien pro Umgebung und pro Modul (kein ein riesiger State)

### Variablen- und Output-Disziplin
```hcl
# variables.tf — immer Beschreibung und Typ angeben
variable "environment" {
  description = "Deployment environment (production, staging, development)"
  type        = string
  validation {
    condition     = contains(["production", "staging", "development"], var.environment)
    error_message = "Environment must be production, staging, or development."
  }
}

# outputs.tf — alles ausgeben, was ein konsumierendes Modul benötigen könnte
output "vpc_id" {
  description = "The ID of the VPC"
  value       = aws_vpc.main.id
}
```

### Secrets — niemals im State oder Code
- Niemals Secrets in `terraform.tfvars` eintragen oder in `.tf`-Dateien hardcoden
- `data "aws_secretsmanager_secret_version"` oder `data "google_secret_manager_secret_version"` verwenden, um Secrets zur Apply-Zeit zu lesen
- Sensible Outputs: mit `sensitive = true` markieren, um sie in der Plan-Ausgabe zu unterdrücken
- `.gitignore` muss enthalten: `*.tfvars`, `*.tfstate`, `*.tfstate.backup`, `.terraform/`

### Ressourcen-Namenskonventionen
```hcl
# Konsistente Benennung: {project}-{environment}-{resource}-{suffix}
resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr
  tags = {
    Name        = "${var.project}-${var.environment}-vpc"
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}
```
Jede Ressource immer mit `Environment` und `ManagedBy = "terraform"` taggen.

### Plan vor Apply — immer
- CI/CD-Pipeline: `terraform plan -out=tfplan` beim PR, `terraform apply tfplan` beim Merge
- Niemals `terraform apply` ohne gespeicherten Plan in der Produktion ausführen
- `-target` sparsam verwenden — es erzeugt Drift zwischen dem tatsächlichen State und dem Plan

### Häufige Fallstricke
- `terraform destroy` ohne `-target` zerstört alles — immer den Umfang bestätigen
- Änderung eines Ressourcenattributs, das einen Ersatz erzwingt (z.B. VPC CIDR), löscht und erstellt neu — Plan sorgfältig prüfen
- Provider-Versions-Pinning ist obligatorisch: `~> 5.0` verwenden, nicht `>= 5.0`
- `count` vs `for_each`: `for_each` mit Maps verwenden — `count` verursacht Index-Drift wenn Elemente entfernt werden

## Beispiel

**Benutzer:** Ein Terraform-Modul für eine private RDS-PostgreSQL-Instanz auf AWS mit Multi-AZ, verschlüsseltem Speicher und einer dedizierten Sicherheitsgruppe erstellen.

**Erwartete Ausgabestruktur:**
- `modules/rds/main.tf` — `aws_db_instance`, `aws_db_subnet_group`, `aws_security_group`
- `modules/rds/variables.tf` — Instance-Klasse, Engine-Version, DB-Name, VPC/Subnet-IDs, Ingress-CIDR
- `modules/rds/outputs.tf` — Endpunkt, Port, Sicherheitsgruppen-ID
- Sicherheitsgruppe: erlaubt PostgreSQL (5432) nur von der App-Sicherheitsgruppe, kein öffentlicher Zugang
- `storage_encrypted = true`, `multi_az = true`, `deletion_protection = true` für die Produktion
- Passwort über `aws_secretsmanager_secret`-Referenz, niemals hartcodiert

---

> **Mit uns arbeiten:** Claudient wird von [Uitbreiden](https://uitbreiden.com/) unterstützt — wir bauen KI-Produkte und B2B-Lösungen mit Entwickler-Communities. Cloud-Infrastruktur oder IaC-Pipelines aufbauen? [uitbreiden.com](https://uitbreiden.com/)
