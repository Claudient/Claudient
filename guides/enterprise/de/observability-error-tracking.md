# Beobachtbarkeit & Fehlertracking mit Sentry/Rollbar

Integrieren Sie Sentry oder Rollbar in Claude Code-Umgebungen für produktives Fehlertracking, Gruppierung, Deduplizierung und Versionsverfolgung. Abdeckung von Client-Initialisierung, benutzerdefinierten Kontexten, Problem-Lebenszyklus und Compliance.

## Wann zu verwenden

- Produktionsbereitstellungen, die Fehleraggregation erfordern
- Multi-Region/Multi-Umgebungs-Systeme mit zentralisiertem Fehlertracking
- Teams, die Fehlerzuordnung, Grundursachenanalyse und Auswirkungsbewertung benötigen
- Regulierte Umgebungen (SOC 2, HIPAA), die Fehlerauditpfade erfordern
- Komplexe Systeme, bei denen Fehlermuster über Versionen hinweg analysiert werden müssen

## Architekturübersicht

```
┌─────────────────────────────────────────────────────────────┐
│ Claude Code-Ausführungsumgebung                            │
│                                                             │
│  Hooks / Tool-Verwendung:                                 │
│  ├─ PostToolUse: Erfassen von Ausführungsergebnissen     │
│  ├─ Sitzungs-Lebenszyklus: Verfolgung langer Aufgaben   │
│  └─ Fehler: Erfassen/Anreichern von Ausnahmen            │
└────────────────┬────────────────────────────────────────────┘
                 │ (SDK Sentry/Rollbar initialisieren)
                 │
┌────────────────▼────────────────────────────────────────────┐
│ Fehleranreicherungsschicht                                 │
│                                                             │
│  ├─ Fingerprint-Funktion (Gruppierungslogik)             │
│  ├─ Benutzerdefinierte Kontexteinspritzung               │
│  ├─ Breadcrumb-Sammlung (Tool-Aufrufe)                   │
│  └─ Deduplizierung (vor/nach HTTP)                       │
└────────────────┬────────────────────────────────────────────┘
                 │ (HTTP POST mit Auth)
                 │
┌────────────────▼────────────────────────────────────────────┐
│ Sentry / Rollbar Backend                                    │
│                                                             │
│  ├─ Fehlergruppierung                                     │
│  ├─ Problem-Deduplizierung                               │
│  ├─ Versionsverfolgung                                    │
│  ├─ Benutzerdefinierte Dashboards & Warnungen           │
│  └─ Compliance-Aufbewahrungsrichtlinien                  │
└─────────────────────────────────────────────────────────────┘
```

## Client-Initialisierung

### Sentry-Einrichtung

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

### Rollbar-Einrichtung

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

## Fehlergruppierungsstrategie

### Fingerabdruck (Deterministische Gruppierung)

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

| Muster | Fingerprint-Ansatz | Beispiel |
|--------|---|---|
| Tool-Timeout | `[tool_name, "timeout"]` | `["Bash", "timeout"]` → gruppiert |
| Netzwerkfehler | `["network", status_code]` | `["network", 503]` → getrennt von 500 |
| Parsing-Fehler | `[parser_type, error_line_range]` | `["json_parser", "lines_1_50"]` |
| Authentifizierungsfehler | `["auth", token_type]` | `["auth", "jwt_expired"]` |
| Ressourcenerschöpfung | `["resource", resource_type]` | `["resource", "disk_space"]` |

## Benutzerdefinierte Kontexte & Metadaten

### Benutzerkontext

```javascript
Sentry.setUser({
  id: process.env.CLAUDE_USER_ID || "anonymous",
  email: process.env.UITKIT_USER_EMAIL,
  username: process.env.USER,
  organization: process.env.CLAUDE_ORG_ID,
});
```

### Bereitstellungskontext

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

### Versions- und Versionsverfolgungskorrelation

```javascript
export function setReleaseContext() {
  const packageJson = require("../package.json");
  const gitInfo = getGitInfo();
  
  Sentry.setTag("service.version", packageJson.version);
  Sentry.setTag("git.commit", gitInfo.commit);
  Sentry.setTag("git.branch", gitInfo.branch);
}
```

## Problem-Deduplizierung

### Vor-Versand-Deduplizierung (Client-Seite)

```javascript
// .claude/hooks/dedup.js
const errorCache = new Map();

export function beforeSend(event) {
  const key = generateCacheKey(event);
  const lastSeen = errorCache.get(key);
  const now = Date.now();
  
  if (lastSeen && now - lastSeen < 30000) {
    return null; // Überspringen
  }
  
  errorCache.set(key, now);
  return event;
}
```

### Server-seitige Deduplizierung

Sentry und Rollbar deduplizieren automatisch, aber konfigurieren Sie Aufbewahrungsrichtlinien:

```json
{
  "grouping": {
    "algorithm": "v3",
    "custom_fingerprints": true
  }
}
```

## Breadcrumb-Sammlung

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

## Versionsverfolgung & Versionsverfolgungskorrelation

### Automatische Versionserkennung

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

## Warnungskonfiguration

### Sentry-Warnungen

```json
{
  "alert_rules": [
    {
      "name": "Kritische Fehler in der Produktion",
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

### Rollbar-Warnungen

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

## Compliance & Datenspeicherung

### Empfindliche Datenfilterung

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

### Aufbewahrungsrichtlinien (DSGVO/CCPA)

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

## Fehlerbehebung

### Ereignisse erscheinen nicht in Sentry/Rollbar

**Symptome**: Keine erfassten Ereignisse, DSN korrekt konfiguriert

**Lösungen**:
- Überprüfen Sie, dass DSN Schreibzugriff hat
- Deaktivieren Sie `beforeSend`-Filter vorübergehend
- Überprüfen Sie Netzwerkverbindung: `curl -X POST https://sentry.io/...`
- Stellen Sie sicher, dass die Umgebungsvariable vorhanden ist: `env | grep SENTRY`

### Doppelte Ereignisse überfluten das Dashboard

**Lösungen**:
```javascript
// 1. Client-seitige Deduplizierung aktivieren
Sentry.init({ beforeSend });

// 2. Server-seitige Gruppierung konfigurieren
// Sentry dashboard → Project Settings → Grouping

// 3. Ratenbegrenzung hinzufügen
Sentry.init({
  maxBreadcrumbs: 50,
  attachStacktrace: false,
});
```

## Checkliste bewährter Praktiken

- [ ] Fehlertracking beim Anwendungsstart initialisieren
- [ ] Benutzerdefinierten Fingerabdruck für deterministische Gruppierung implementieren
- [ ] Bereitstellungskontext zu jedem Fehler hinzufügen
- [ ] Breadcrumbs für Tool-Ausführungen sammeln
- [ ] Empfindliche Daten vor dem Versand bereinigen
- [ ] Warnungen für kritische Fehlerschwellen konfigurieren
- [ ] Versionsverfolgung mit Git-Tags einrichten
- [ ] Client-seitige Deduplizierung implementieren
- [ ] Gruppierungsalgorithmus-Einstellungen monatlich überprüfen
- [ ] Aufbewahrungsrichtlinien gegen Compliance-Anforderungen prüfen

---

**Zuletzt aktualisiert**: 2026-06-22  
**Verwandte Dokumente**: `enterprise/disaster-recovery.md`, `enterprise/deployment-guide.md`, `enterprise/security-hardening.md`
