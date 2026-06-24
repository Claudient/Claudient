# Observabilité & Suivi des Erreurs avec Sentry/Rollbar

Intégrez Sentry ou Rollbar dans les environnements Claude Code pour un suivi des erreurs de niveau production, un regroupement, une dédupliquage et une corrélation des versions. Couvre l'initialisation du client, les contextes personnalisés, le cycle de vie des problèmes et la conformité.

## Quand l'utiliser

- Les déploiements en production nécessitant une agrégation des erreurs
- Les systèmes multi-régions/multi-environnements nécessitant un suivi centralisé des erreurs
- Les équipes ayant besoin d'attribution des erreurs, d'analyse des causes profondes et d'évaluation de l'impact
- Les environnements réglementés (SOC 2, HIPAA) nécessitant des pistes d'audit des erreurs
- Les systèmes complexes où les modèles d'erreurs doivent être analysés entre les versions

## Aperçu de l'architecture

```
┌─────────────────────────────────────────────────────────────┐
│ Environnement d'exécution Claude Code                      │
│                                                             │
│  Crochets / Utilisation d'outils:                         │
│  ├─ PostToolUse: Capturer les résultats d'exécution      │
│  ├─ Cycle de vie de session: Suivre les tâches longues   │
│  └─ Erreurs: Capturer/enrichir les exceptions            │
└────────────────┬────────────────────────────────────────────┘
                 │ (Initialiser SDK Sentry/Rollbar)
                 │
┌────────────────▼────────────────────────────────────────────┐
│ Couche d'enrichissement des erreurs                        │
│                                                             │
│  ├─ Fonction d'empreinte (logique de regroupement)       │
│  ├─ Injection de contexte personnalisé                   │
│  ├─ Collecte de miettes de pain (appels d'outils)       │
│  └─ Dédupliquage (avant/après HTTP)                     │
└────────────────┬────────────────────────────────────────────┘
                 │ (HTTP POST avec auth)
                 │
┌────────────────▼────────────────────────────────────────────┐
│ Backend Sentry / Rollbar                                    │
│                                                             │
│  ├─ Regroupement des erreurs                             │
│  ├─ Dédupliquage des problèmes                           │
│  ├─ Suivi des versions                                    │
│  ├─ Tableaux de bord personnalisés & alertes            │
│  └─ Politiques de rétention de conformité                │
└─────────────────────────────────────────────────────────────┘
```

## Initialisation du client

### Configuration de Sentry

#### Node.js / JavaScript

```javascript
// .claude/hooks/sentry-init.js
import * as Sentry from "@sentry/node";

export function initSentry() {
  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || "development",
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
    
    release: getGitRelease(),
    dist: process.env.BUILD_ID || "local",
    
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.OnUncaughtException(),
      new Sentry.Integrations.OnUnhandledRejection(),
    ],
    
    beforeSend(event, hint) {
      if (event.exception) {
        const error = hint.originalException;
        if (error?.message?.includes("password") ||
            error?.message?.includes("token")) {
          return null;
        }
      }
      return event;
    },
  });
}
```

#### Python

```python
# .claude/hooks/sentry_init.py
import sentry_sdk
from sentry_sdk.integrations.logging import LoggingIntegration
import os

def init_sentry():
    sentry_sdk.init(
        dsn=os.getenv("SENTRY_DSN"),
        environment=os.getenv("ENV", "development"),
        traces_sample_rate=0.1 if os.getenv("ENV") == "production" else 1.0,
        release=get_git_release(),
        dist=os.getenv("BUILD_ID", "local"),
        before_send=filter_sensitive_data,
    )
```

### Configuration de Rollbar

#### Node.js

```javascript
// .claude/hooks/rollbar-init.js
const Rollbar = require("rollbar");

const rollbar = new Rollbar({
  accessToken: process.env.ROLLBAR_TOKEN,
  environment: process.env.NODE_ENV || "development",
  codeVersion: getGitRelease(),
  maxItems: 100,
  itemsPerMinute: 60,
  transform: (payload) => {
    payload.data.custom = {
      execution_id: process.env.CLAUDE_EXECUTION_ID,
      session_id: process.env.CLAUDE_SESSION_ID,
      timestamp: new Date().toISOString(),
    };
    return payload;
  },
});
```

## Stratégie de regroupement des erreurs

### Empreinte digitale (Regroupement déterministe)

```javascript
// .claude/hooks/fingerprinting.js
export const fingerprintStrategies = {
  byType: (event) => {
    const exc = event.exception?.values?.[0];
    if (!exc) return null;
    return [exc.type, exc.value.split("\n")[0].substring(0, 50)];
  },
  
  byHttpStatus: (event) => {
    if (event.request?.url) {
      const url = new URL(event.request.url);
      return [event.tags?.["http.status_code"], url.pathname];
    }
    return null;
  },
  
  byTool: (event) => {
    const tool = event.tags?.["claude.tool"] || "unknown";
    const category = event.tags?.["error.category"] || "generic";
    return [tool, category];
  },
};
```

| Modèle | Approche d'empreinte | Exemple |
|--------|---|---|
| Délai d'expiration d'outil | `[tool_name, "timeout"]` | `["Bash", "timeout"]` → regroupé |
| Erreur réseau | `["network", status_code]` | `["network", 503]` → séparé de 500 |
| Erreur d'analyse | `[parser_type, error_line_range]` | `["json_parser", "lines_1_50"]` |
| Échec d'authentification | `["auth", token_type]` | `["auth", "jwt_expired"]` |
| Épuisement de ressources | `["resource", resource_type]` | `["resource", "disk_space"]` |

## Contextes personnalisés et métadonnées

### Contexte utilisateur

```javascript
Sentry.setUser({
  id: process.env.CLAUDE_USER_ID || "anonymous",
  email: process.env.UITKIT_USER_EMAIL,
  username: process.env.USER,
  organization: process.env.CLAUDE_ORG_ID,
});
```

### Contexte de déploiement

```javascript
export function setDeploymentContext() {
  Sentry.setContext("deployment", {
    environment: process.env.NODE_ENV,
    region: process.env.REGION || "us-east-1",
    namespace: process.env.KUBE_NAMESPACE,
    pod_name: process.env.HOSTNAME,
  });
}
```

### Corrélation des versions et des versions

```javascript
export function setReleaseContext() {
  const packageJson = require("../package.json");
  const gitInfo = getGitInfo();
  
  Sentry.setTag("service.version", packageJson.version);
  Sentry.setTag("git.commit", gitInfo.commit);
  Sentry.setTag("git.branch", gitInfo.branch);
}
```

## Dédupliquage des problèmes

### Dédupliquage avant envoi (côté client)

```javascript
// .claude/hooks/dedup.js
const errorCache = new Map();

export function beforeSend(event) {
  const key = generateCacheKey(event);
  const lastSeen = errorCache.get(key);
  const now = Date.now();
  
  if (lastSeen && now - lastSeen < 30000) {
    return null; // Ignorer
  }
  
  errorCache.set(key, now);
  return event;
}
```

### Dédupliquage côté serveur

Sentry et Rollbar dédupliquent automatiquement, mais configurez les politiques de rétention:

```json
{
  "grouping": {
    "algorithm": "v3",
    "custom_fingerprints": true
  }
}
```

## Collection de miettes de pain

```javascript
// .claude/hooks/breadcrumb-collector.js
export class BreadcrumbCollector {
  captureToolExecution(toolName, input, output, duration) {
    Sentry.addBreadcrumb({
      category: "tool-execution",
      message: `Executed ${toolName}`,
      level: "debug",
      data: { tool: toolName, duration_ms: duration },
    });
  }
  
  captureRetry(attempt, maxAttempts, lastError) {
    Sentry.addBreadcrumb({
      category: "retry",
      message: `Retry attempt ${attempt}/${maxAttempts}`,
      level: "warning",
      data: { attempt, max_attempts: maxAttempts },
    });
  }
}
```

## Suivi des versions et corrélation des versions

### Détection automatique des versions

```javascript
// .claude/hooks/release-manager.js
export class ReleaseManager {
  detectRelease() {
    const sources = [
      this.fromGitTag,
      this.fromPackageJson,
      this.fromEnvironment,
    ];
    
    for (const source of sources) {
      const release = source.call(this);
      if (release) return release;
    }
    return "unknown";
  }
  
  async markDeployment(environment, url) {
    const releaseApi = `https://${process.env.SENTRY_ORG}.sentry.io/api/0/organizations/...`;
    return fetch(releaseApi, {
      method: "POST",
      headers: { Authorization: `Bearer ${process.env.SENTRY_AUTH_TOKEN}` },
      body: JSON.stringify({ environment, url }),
    });
  }
}
```

## Configuration des alertes

### Alertes Sentry

```json
{
  "alert_rules": [
    {
      "name": "Erreurs critiques en production",
      "condition": {
        "filter": "is:unresolved environment:production level:error",
        "threshold": 10,
        "timeframe": "5m"
      },
      "actions": ["notify:slack:#critical-errors"],
      "enabled": true
    }
  ]
}
```

### Alertes Rollbar

```javascript
export const alertRules = {
  criticalErrorCount: {
    level: "critical",
    occurrences_in_time_period: 10,
    time_period: 300,
    actions: ["assign_to_owner", "notify:slack"],
  },
};
```

## Conformité et rétention des données

### Filtrage des données sensibles

```javascript
export function sanitizeSensitiveData(event) {
  const sensitivePatterns = [
    /password\s*[:=]\s*[^\s]+/gi,
    /api[_-]?key\s*[:=]\s*[^\s]+/gi,
    /token\s*[:=]\s*[^\s]+/gi,
  ];
  
  const sanitize = (str) => {
    if (typeof str !== "string") return str;
    let sanitized = str;
    for (const pattern of sensitivePatterns) {
      sanitized = sanitized.replace(pattern, "[REDACTED]");
    }
    return sanitized;
  };
  
  return event;
}
```

### Politiques de rétention (RGPD/CCPA)

```json
{
  "data_retention": {
    "default_retention_days": 90,
    "high_severity_retention_days": 365,
    "pii_retention_days": 30,
    "compliance": {
      "gdpr_enabled": true,
      "ccpa_enabled": true,
      "right_to_deletion": true
    }
  }
}
```

## Dépannage

### Les événements n'apparaissent pas dans Sentry/Rollbar

**Symptômes**: Aucun événement capturé, DSN configuré correctement

**Solutions**:
- Vérifier que le DSN a accès en écriture
- Désactiver temporairement les filtres `beforeSend`
- Vérifier la connectivité réseau: `curl -X POST https://sentry.io/...`
- S'assurer que la variable d'environnement existe: `env | grep SENTRY`

### Les événements en double inondent le tableau de bord

**Solutions**:
```javascript
// 1. Activer la dédupliquage côté client
Sentry.init({ beforeSend });

// 2. Configurer le regroupement côté serveur
// Sentry dashboard → Project Settings → Grouping

// 3. Ajouter un taux limite
Sentry.init({
  maxBreadcrumbs: 50,
  attachStacktrace: false,
});
```

## Liste de contrôle des meilleures pratiques

- [ ] Initialiser le suivi des erreurs au démarrage de l'application
- [ ] Implémenter un empreinte personnalisée pour le regroupement déterministe
- [ ] Ajouter le contexte de déploiement à chaque erreur
- [ ] Collecter les miettes de pain pour les exécutions d'outils
- [ ] Nettoyer les données sensibles avant envoi
- [ ] Configurer les alertes pour les seuils d'erreurs critiques
- [ ] Configurer le suivi des versions avec les balises git
- [ ] Implémenter la dédupliquage côté client
- [ ] Examiner les paramètres d'algorithme de regroupement mensuellement
- [ ] Auditer les politiques de rétention par rapport aux exigences de conformité

---

**Dernière mise à jour**: 2026-06-22  
**Documents connexes**: `enterprise/disaster-recovery.md`, `enterprise/deployment-guide.md`, `enterprise/security-hardening.md`
