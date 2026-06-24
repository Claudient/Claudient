# UitKit Docker - Quick Start Guide

Get UitKit running in Docker in 5 minutes.

## Prerequisites

- Docker 20.10+ (or Docker Desktop)
- 1GB RAM available
- 500MB disk space

## 5-Minute Setup

### 1. Build the Image
```bash
cd docker
./build.sh
```

Expected output:
```
UitKit Docker Image Builder
Image:  uitkit:latest
Building image...
✓ Build successful
Size: ~500MB
```

**Time:** ~2-3 minutes (first build, ~30s after)

### 2. Start the Container
```bash
./run.sh
```

Expected output:
```
Image:     uitkit:latest
Container: uitkit
Starting container...
✓ Container started

Container is running in background.
Endpoints:
  Health check:   http://localhost:9000/health
  Metrics:        http://localhost:9000/metrics
  Dashboard:      http://localhost:4321
```

**Time:** ~3-5 seconds

### 3. Verify It's Running
```bash
curl http://localhost:9000/health
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "2026-06-22T10:30:00.000Z",
  "version": "1.10.1",
  "uptime": 120,
  "checks": {
    "cli": true,
    "site": true
  }
}
```

### 4. View the Dashboard
Open in browser: **http://localhost:4321**

### 5. Access CLI
```bash
docker exec uitkit npm run list
```

## Using Make (Recommended)

All commands available via Makefile:

```bash
cd docker

make build              # Build image
make run               # Start container
make stop              # Stop container
make logs              # View logs
make health            # Health check
make shell             # Open shell
make clean             # Cleanup
```

## Using Docker Compose

For multi-service setup (CLI + Dashboard):

```bash
cd docker

docker-compose up -d   # Start services
docker-compose logs -f # View logs
docker-compose down    # Stop services
```

## Common Tasks

### View Logs
```bash
docker logs -f uitkit
```

### Open Shell
```bash
docker exec -it uitkit /bin/sh
```

### Run CLI Commands
```bash
# List skills
docker exec uitkit npm run list

# Add skills
docker exec uitkit node scripts/cli.js add skills backend

# Run CLI directly
docker exec uitkit npx uitkit doctor
```

### Check Health
```bash
# Full health check
./health.sh

# Specific endpoint
curl http://localhost:9000/metrics
```

### Stop & Remove
```bash
docker stop uitkit
docker rm uitkit
```

## Environment Setup

### Linux/macOS

**Copy Example Config:**
```bash
cp docker/.env.example docker/.env
```

**Edit if needed:**
```bash
vim docker/.env
```

### Windows (PowerShell)

```powershell
copy docker\.env.example docker\.env
notepad docker\.env
```

## Troubleshooting

### Container won't start
```bash
# Check logs
docker logs uitkit

# Verify Docker is running
docker ps
```

### Health check failing
```bash
# Test directly
docker exec uitkit curl http://localhost:9000/health

# Check file permissions
docker exec uitkit ls -la /app/scripts/cli.js
```

### Port already in use
```bash
# Use different ports
docker run -p 19000:9000 -p 14321:4321 uitkit:latest

# Or find what's using the port
lsof -i :9000
```

### Can't access dashboard
```bash
# Wait 5-10 seconds for startup
sleep 10

# Then try
curl http://localhost:4321
```

## Next Steps

### 1. Integrate with Claude Code
```bash
# Mount your .claude directory
docker run -v ~/.claude:/root/.claude uitkit:latest
```

### 2. Install Skills
```bash
docker exec uitkit npm run list
docker exec uitkit node scripts/cli.js add skills all
```

### 3. Deploy to Production
- See `ARCHITECTURE.md` for Kubernetes deployment
- Or use `docker-compose.yml` for multi-service setup

### 4. Monitor & Scale
```bash
# View real-time stats
docker stats uitkit

# Check metrics endpoint
curl http://localhost:9000/metrics
```

## File Structure

```
docker/
├── Dockerfile              # Multi-stage build
├── docker-compose.yml      # Service orchestration
├── .dockerignore           # Files to exclude
├── .env.example            # Environment template
├── build.sh                # Build script
├── run.sh                  # Run script
├── health.sh               # Health check script
├── Makefile                # Command shortcuts
├── README.md               # Full documentation
├── ARCHITECTURE.md         # Technical details
└── QUICKSTART.md          # This file
```

## Useful Links

- **Dashboard:** http://localhost:4321
- **Health Endpoint:** http://localhost:9000/health
- **Metrics:** http://localhost:9000/metrics

## CLI Reference

```bash
# View all commands
docker exec uitkit npx uitkit help

# Add skills
docker exec uitkit npx uitkit add skills backend

# View installed
docker exec uitkit npx uitkit list

# Run doctor
docker exec uitkit npx uitkit doctor

# Check health
docker exec uitkit npx uitkit audit
```

## Performance Tips

### Optimize Memory
```bash
docker run -e NODE_OPTIONS="--max-old-space-size=256" uitkit:latest
```

### Optimize CPU
```bash
docker run --cpus 2 uitkit:latest
```

### Production Setup
```bash
docker run \
  -d \
  --name uitkit \
  --cpus 2 \
  -m 1g \
  -e NODE_ENV=production \
  -p 9000:9000 \
  -p 4321:4321 \
  uitkit:latest
```

## Support

Need help?

1. **Check logs:** `docker logs uitkit`
2. **Run health check:** `./health.sh`
3. **Read full docs:** `docker/README.md`
4. **View architecture:** `docker/ARCHITECTURE.md`
5. **Report issue:** GitHub Issues

---

**Last updated:** 2026-06-22  
**UitKit Version:** 1.10.1  
**Node:** 20-alpine  
**License:** AGPL-3.0-or-later AND CC-BY-SA-4.0
