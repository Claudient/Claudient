# UitKit Docker Architecture

## Overview

This document describes the containerization architecture of UitKit, including the multi-stage build process, health monitoring system, and deployment strategies.

## Build Architecture

### Multi-Stage Build Process

```
Stage 1: Builder
├── Base: node:20-alpine
├── Install build tools (python3, make, g++)
├── Copy package.json files
├── npm ci (dependencies)
├── Copy source code
└── Build artifacts (npm run build-index, build-plugins, site build)

Stage 2: Runtime
├── Base: node:20-alpine
├── Install runtime deps (curl, tini)
├── Create non-root user (nodejs:1001)
├── Copy only built artifacts from Stage 1
├── Add health check scripts
├── Add monitoring server
└── Configure entrypoint & healthcheck
```

### Size Optimization

**Build Output:**
- Dockerfile: ~5.6 KB
- Multi-stage build eliminates build dependencies
- Alpine base: 150 MB vs 1GB+ for ubuntu
- Estimated runtime image: 500-600 MB

**Layer Caching Strategy:**
1. Package files (slow to change, cached)
2. Dependencies install (slow to rebuild, cached if package.json unchanged)
3. Source code (fast to change, not cached)
4. Artifacts (rebuilt if source changes)

## Container Structure

```
/app (WORKDIR)
├── node_modules/
├── scripts/
│   ├── cli.js (main CLI entry)
│   └── [other scripts]
├── skills/ (skill definitions)
├── agents/ (agent definitions)
├── hooks/ (hook scripts)
├── rules/ (rule sets)
├── prompts/ (prompt templates)
├── site/ (Astro dashboard)
│   ├── dist/ (built dashboard)
│   └── node_modules/
├── bin/
│   ├── health-server.js (monitoring)
│   └── serve.sh (startup wrapper)
├── health/
│   └── check.js (health probe)
├── package.json
└── index.json

/root/.claude (Volume mount)
├── skills/ (installed skills)
├── agents/ (installed agents)
├── hooks/ (installed hooks)
└── settings.json
```

## Health Monitoring System

### Health Check Server (bin/health-server.js)

Runs on port 9000, provides three endpoints:

**1. /health (Liveness Probe)**
```http
GET /health

Response (200):
{
  "status": "healthy",
  "timestamp": "2026-06-22T10:30:00.000Z",
  "version": "1.10.1",
  "uptime": 3600,
  "checks": {
    "cli": true,           // /app/scripts/cli.js exists
    "site": true,          // /app/site/dist exists
    "memory": { ... }      // V8 memory stats
  }
}

Response (503):
{
  "status": "unhealthy",
  "checks": {
    "cli": false,
    "site": true
  }
}
```

**2. /metrics (Monitoring)**
```http
GET /metrics

Response:
{
  "uptime": 3600,        // Process uptime in seconds
  "memory": { ... },     // Node.js memory stats
  "pid": 1,              // Process ID
  "version": "1.10.1"
}
```

**3. /ready (Readiness Probe)**
```http
GET /ready

Response:
{
  "ready": true
}
```

### Docker HEALTHCHECK

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node /app/health/check.js
```

- **Interval:** Runs every 30 seconds
- **Timeout:** 3 second response deadline
- **Start Period:** Allows 5 seconds for startup
- **Retries:** Fails after 3 consecutive failures

## Port Mapping

| Port | Service | Purpose | Protocol |
|------|---------|---------|----------|
| 9000 | Health Server | Health/metrics endpoints | HTTP |
| 4321 | Dashboard | Astro web UI | HTTP |
| 3000 | Alt Dashboard | Fallback port | HTTP |

## Security Architecture

### User & Permissions
```dockerfile
RUN addgroup -g 1001 -S nodejs \
    && adduser -S nodejs -u 1001

USER nodejs  # Container runs as non-root (UID 1001)
```

### Security Options
```yaml
security_opt:
  - no-new-privileges:true  # Prevent privilege escalation
  
cap_drop:
  - ALL                      # Drop all capabilities
  
cap_add:
  - NET_BIND_SERVICE         # Only bind to ports
```

### File Permissions
- Scripts: 755 (rwxr-xr-x)
- Data: owner by nodejs:nodejs
- No world-writable files

## Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| NODE_ENV | production | Node.js environment |
| HEALTH_PORT | 9000 | Health check server port |
| LOG_LEVEL | info | Logging level |
| NODE_OPTIONS | | Node.js JVM options |

## Volume Management

### Required Volumes
```yaml
volumes:
  - ${HOME}/.claude:/root/.claude  # Claude Code directory
```

### Optional Volumes
```yaml
volumes:
  - ./:/workspace              # Project workspace
  - ./site:/app/site          # Live reload for dev
```

## Networking

### Exposed Ports
- 9000: Health/metrics
- 4321: Dashboard
- 3000: Alternative port

### Network Mode
```yaml
networks:
  default:
    name: uitkit-network
    driver: bridge
```

## Docker Compose Architecture

```yaml
services:
  uitkit:
    # Main service: runs health server
    # Mounts .claude and workspace
    # Port mapping: 9000, 4321, 3000
    
  dashboard:
    # Optional dev service: runs Astro dev server
    # Depends on uitkit (health check)
    # Port mapping: 4321
    # Mounts site directory for live reload
```

### Service Dependencies
```
dashboard → uitkit (health check)
```

## Kubernetes Integration

### Deployment Manifest Structure
```yaml
Deployment:
  - Pod:
      - Container: uitkit
        - livenessProbe: /health (30s interval)
        - readinessProbe: /ready (10s interval)
        - resources: requests/limits
        - volumeMounts: claude-data
      - Volumes: emptyDir
      
Service:
  - Port 9000 (health)
  - Port 4321 (dashboard)
  - Type: ClusterIP
```

## Build Pipeline

### Local Build
```bash
docker build -f docker/Dockerfile -t uitkit:latest .
```

### Multi-architecture Build
```bash
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t uitkit:latest \
  -f docker/Dockerfile \
  --push .
```

### CI/CD Integration
- **GitHub Actions:** Build on push/PR
- **GitLab CI:** Build in CI pipeline
- **Docker Hub:** Auto-build on main branch

## Runtime Initialization

### Entrypoint Chain
```
tini (PID 1)
  ↓
bin/serve.sh (optional wrapper)
  ↓
npm scripts or custom commands
```

### Startup Sequence
1. tini initializes (proper signal handling)
2. health-server.js starts (port 9000)
3. Main process (CLI/dashboard) starts
4. Health checks begin after start-period

## Performance Considerations

### Memory Management
- Default: ~256MB (startup)
- Typical: ~400-500MB (running)
- Limit: ~1GB (production)

### CPU Usage
- Build: High (multi-core)
- Runtime: Low (~10-20% idle)

### Startup Time
- Image load: ~1-2s
- Container init: ~3-5s
- Ready: ~5-10s total

## Monitoring & Observability

### Container Logs
```bash
docker logs -f uitkit
```

### Resource Stats
```bash
docker stats uitkit
```

### Health Status
```bash
curl http://localhost:9000/health
```

### Process Inspection
```bash
docker exec uitkit ps aux
docker exec uitkit node -e "console.log(process.memoryUsage())"
```

## Troubleshooting

### Health Check Failures
- Verify CLI files exist: `docker exec uitkit ls /app/scripts/cli.js`
- Check site build: `docker exec uitkit ls /app/site/dist`
- Inspect health server: `docker exec uitkit ps aux`

### Port Conflicts
- Map to different port: `-p 19000:9000`
- Check existing containers: `docker ps`

### Volume Permission Issues
- Ensure ~/.claude ownership: `ls -ld ~/.claude`
- Fix permissions: `chown -R $(id -u):$(id -g) ~/.claude`

## Scalability

### Horizontal Scaling
- Stateless container design
- No persistent storage (except volumes)
- Can run multiple instances with different names

### Vertical Scaling
- Increase memory: `docker run -m 2g`
- Increase CPU: `docker run --cpus 4`

## Migration Paths

### From Host Installation
```bash
# Before: ~2GB on disk (node_modules)
# After: Single 500MB image

# Copy existing .claude directory
docker run -v ~/.claude:/root/.claude uitkit:latest

# All skills/agents/hooks preserved
```

### To Kubernetes
```bash
# Push to registry
docker push myregistry/uitkit:latest

# Deploy with provided YAML
kubectl apply -f docker/k8s-deployment.yaml
```

## Maintenance

### Image Updates
```bash
# Rebuild with latest dependencies
docker build --no-cache -f docker/Dockerfile .

# Test before pushing
docker run --rm uitkit:latest npm test
```

### Dependency Management
- package.json in repo (pinned versions)
- npm ci (reproducible installs)
- Alpine base (security patches)

## References

- [Docker Docs](https://docs.docker.com)
- [node:20-alpine](https://hub.docker.com/_/node)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Kubernetes Docs](https://kubernetes.io/docs/)
