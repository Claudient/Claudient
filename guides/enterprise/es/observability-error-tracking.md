# Observabilidad y Seguimiento de Errores con Sentry/Rollbar

Integre Sentry o Rollbar en entornos Claude Code para rastreo de errores de nivel producción, agrupación, deduplicación y correlación de versiones. Cubre inicialización del cliente, contextos personalizados, ciclo de vida de problemas y cumplimiento.

## Cuándo usar

- Implementaciones de producción que requieren agregación de errores
- Sistemas multi-región/multi-entorno que necesitan rastreo centralizado de errores
- Equipos que necesitan atribución de errores, análisis de causa raíz y evaluación de impacto
- Entornos regulados (SOC 2, HIPAA) que requieren pistas de auditoría de errores
- Sistemas complejos donde se deben analizar patrones de errores entre versiones

## Descripción general de la arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│ Entorno de ejecución de Claude Code                        │
│                                                             │
│  Hooks / Uso de herramientas:                             │
│  ├─ PostToolUse: Capturar resultados de ejecución        │
│  ├─ Ciclo de vida de sesión: Seguimiento de tareas        │
│  └─ Errores: Capturar/enriquecer excepciones             │
└────────────────┬────────────────────────────────────────────┘
                 │ (Inicializar SDK Sentry/Rollbar)
                 │
┌────────────────▼────────────────────────────────────────────┐
│ Capa de enriquecimiento de errores                         │
│                                                             │
│  ├─ Función de huella (lógica de agrupación)             │
│  ├─ Inyección de contexto personalizado                  │
│  ├─ Recopilación de migajas (llamadas de herramientas)  │
│  └─ Deduplicación (antes/después HTTP)                  │
└────────────────┬────────────────────────────────────────────┘
                 │ (HTTP POST con auth)
                 │
┌────────────────▼────────────────────────────────────────────┐
│ Backend Sentry / Rollbar                                    │
│                                                             │
│  ├─ Agrupación de errores                                 │
│  ├─ Deduplicación de problemas                           │
│  ├─ Seguimiento de versiones                              │
│  ├─ Paneles personalizados y alertas                     │
│  └─ Políticas de retención de cumplimiento               │
└─────────────────────────────────────────────────────────────┘
```

## Inicialización del cliente

### Configuración de Sentry

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

### Configuración de Rollbar

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

## Estrategia de agrupación de errores

### Huella digital (Agrupación determinista)

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

| Patrón | Enfoque de huella | Ejemplo |
|--------|---|---|
| Tiempo de espera de herramienta | `[tool_name, "timeout"]` | `["Bash", "timeout"]` → agrupado |
| Error de red | `["network", status_code]` | `["network", 503]` → separado de 500 |
| Error de análisis | `[parser_type, error_line_range]` | `["json_parser", "lines_1_50"]` |
| Fallo de autenticación | `["auth", token_type]` | `["auth", "jwt_expired"]` |
| Agotamiento de recursos | `["resource", resource_type]` | `["resource", "disk_space"]` |

## Contextos personalizados y metadatos

### Contexto del usuario

```javascript
Sentry.setUser({
  id: process.env.CLAUDE_USER_ID || "anonymous",
  email: process.env.UITKIT_USER_EMAIL,
  username: process.env.USER,
  organization: process.env.CLAUDE_ORG_ID,
});
```

### Contexto de implementación

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

### Correlación de versión y lanzamiento

```javascript
export function setReleaseContext() {
  const packageJson = require("../package.json");
  const gitInfo = getGitInfo();
  
  Sentry.setTag("service.version", packageJson.version);
  Sentry.setTag("git.commit", gitInfo.commit);
  Sentry.setTag("git.branch", gitInfo.branch);
}
```

## Deduplicación de problemas

### Deduplicación previa al envío (lado del cliente)

```javascript
// .claude/hooks/dedup.js
const errorCache = new Map();

export function beforeSend(event) {
  const key = generateCacheKey(event);
  const lastSeen = errorCache.get(key);
  const now = Date.now();
  
  if (lastSeen && now - lastSeen < 30000) {
    return null; // Omitir
  }
  
  errorCache.set(key, now);
  return event;
}
```

### Deduplicación del lado del servidor

Sentry y Rollbar deduplicen automáticamente, pero configure políticas de retención:

```json
{
  "grouping": {
    "algorithm": "v3",
    "custom_fingerprints": true
  }
}
```

## Recopilación de migajas

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

## Seguimiento de versiones y correlación de versiones

### Detección automática de lanzamiento

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

## Configuración de alertas

### Alertas de Sentry

```json
{
  "alert_rules": [
    {
      "name": "Errores críticos en producción",
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

### Alertas de Rollbar

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

## Cumplimiento y retención de datos

### Filtrado de datos sensibles

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

### Políticas de retención (GDPR/CCPA)

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

## Solución de problemas

### Los eventos no aparecen en Sentry/Rollbar

**Síntomas**: Sin eventos capturados, DSN configurado correctamente

**Soluciones**:
- Verificar que DSN tiene acceso de escritura
- Deshabilitar temporalmente los filtros `beforeSend`
- Verificar conectividad de red: `curl -X POST https://sentry.io/...`
- Asegurar que la variable de entorno existe: `env | grep SENTRY`

### Eventos duplicados inundan el panel

**Soluciones**:
```javascript
// 1. Habilitar deduplicación del lado del cliente
Sentry.init({ beforeSend });

// 2. Configurar agrupación del lado del servidor
// Sentry dashboard → Project Settings → Grouping

// 3. Agregar límite de velocidad
Sentry.init({
  maxBreadcrumbs: 50,
  attachStacktrace: false,
});
```

## Lista de verificación de mejores prácticas

- [ ] Inicializar rastreo de errores al inicio de la aplicación
- [ ] Implementar huella personalizada para agrupación determinista
- [ ] Agregar contexto de implementación a cada error
- [ ] Recopilar migas para ejecuciones de herramientas
- [ ] Limpiar datos sensibles antes del envío
- [ ] Configurar alertas para umbrales de errores críticos
- [ ] Configurar seguimiento de versiones con etiquetas git
- [ ] Implementar deduplicación del lado del cliente
- [ ] Revisar la configuración del algoritmo de agrupación mensualmente
- [ ] Auditar políticas de retención contra requisitos de cumplimiento

---

**Última actualización**: 2026-06-22  
**Documentos relacionados**: `enterprise/disaster-recovery.md`, `enterprise/deployment-guide.md`, `enterprise/security-hardening.md`
