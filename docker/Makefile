.PHONY: help build build-arm build-push run run-fg stop logs shell health metrics health-dashboard compose-up compose-down compose-logs clean test lint

# Variables
IMAGE_NAME := uitkit
IMAGE_TAG := latest
CONTAINER_NAME := uitkit
PLATFORMS := linux/amd64,linux/arm64
DOCKERFILE := docker/Dockerfile

help: ## Show this help message
	@echo "UitKit Docker Commands"
	@echo "═══════════════════════════════════════════════════════"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "Variables:"
	@echo "  IMAGE_NAME=$(IMAGE_NAME)"
	@echo "  IMAGE_TAG=$(IMAGE_TAG)"
	@echo "  CONTAINER_NAME=$(CONTAINER_NAME)"
	@echo ""

# Build targets
build: ## Build Docker image locally
	@echo "Building $(IMAGE_NAME):$(IMAGE_TAG)..."
	docker build -f $(DOCKERFILE) -t $(IMAGE_NAME):$(IMAGE_TAG) .
	@echo "✓ Build complete"

build-arm: ## Build for ARM64 (Apple Silicon, etc.)
	@echo "Building for multiple architectures..."
	docker buildx build --platform $(PLATFORMS) -t $(IMAGE_NAME):$(IMAGE_TAG) -f $(DOCKERFILE) --load .

build-push: ## Build and push to registry (requires setup)
	@echo "Building and pushing $(IMAGE_NAME):$(IMAGE_TAG)..."
	docker buildx build --platform $(PLATFORMS) -t $(IMAGE_NAME):$(IMAGE_TAG) -f $(DOCKERFILE) --push .

# Run targets
run: ## Run container in background (daemon mode)
	@echo "Starting $(CONTAINER_NAME)..."
	docker run -d \
		--name $(CONTAINER_NAME) \
		-p 9000:9000 \
		-p 4321:4321 \
		-p 3000:3000 \
		-v ~/.claude:/root/.claude \
		-e NODE_ENV=production \
		-e HEALTH_PORT=9000 \
		$(IMAGE_NAME):$(IMAGE_TAG)
	@echo "✓ Container started"
	@echo "Health check: http://localhost:9000/health"
	@echo "Dashboard: http://localhost:4321"

run-fg: ## Run container in foreground (interactive)
	docker run -it \
		--name $(CONTAINER_NAME) \
		-p 9000:9000 \
		-p 4321:4321 \
		-p 3000:3000 \
		-v ~/.claude:/root/.claude \
		-e NODE_ENV=production \
		$(IMAGE_NAME):$(IMAGE_TAG)

stop: ## Stop running container
	@echo "Stopping $(CONTAINER_NAME)..."
	docker stop $(CONTAINER_NAME) || true
	docker rm $(CONTAINER_NAME) || true
	@echo "✓ Container stopped"

restart: stop run ## Restart container

# Logging and monitoring
logs: ## View container logs (last 50 lines)
	docker logs --tail 50 -f $(CONTAINER_NAME)

logs-all: ## View all container logs
	docker logs $(CONTAINER_NAME)

shell: ## Open shell in running container
	docker exec -it $(CONTAINER_NAME) /bin/sh

# Health checks
health: ## Check container health endpoints
	@echo "Checking health endpoints..."
	@curl -s http://localhost:9000/health | python3 -m json.tool
	@echo ""

metrics: ## Get container metrics
	@echo "Checking metrics endpoint..."
	@curl -s http://localhost:9000/metrics | python3 -m json.tool
	@echo ""

ready: ## Check readiness probe
	@echo "Checking readiness..."
	@curl -s http://localhost:9000/ready | python3 -m json.tool
	@echo ""

health-dashboard: ## Full health check with details
	./docker/health.sh -t all

# Docker Compose
compose-up: ## Start services with docker-compose
	cd docker && docker-compose up -d
	@echo "✓ Services started"

compose-down: ## Stop services
	cd docker && docker-compose down

compose-logs: ## View compose logs
	cd docker && docker-compose logs -f

compose-ps: ## Show running compose services
	cd docker && docker-compose ps

# Cleanup
clean: stop ## Clean up containers and images
	@echo "Cleaning up..."
	docker rmi $(IMAGE_NAME):$(IMAGE_TAG) || true
	docker system prune -f
	@echo "✓ Cleanup complete"

clean-all: clean ## Deep cleanup (includes volumes)
	docker system prune -af --volumes
	@echo "✓ Full cleanup complete"

# Testing
test: ## Run tests in container
	docker run --rm $(IMAGE_NAME):$(IMAGE_TAG) npm test

lint: ## Run linter in container
	docker run --rm $(IMAGE_NAME):$(IMAGE_TAG) npm run validate:frontmatter

audit: ## Run security audit in container
	docker run --rm $(IMAGE_NAME):$(IMAGE_TAG) npm audit --production

# Image info
info: ## Show image information
	@echo "Image Information:"
	@docker images $(IMAGE_NAME) --format "table {{.Repository}}\t{{.Tag}}\t{{.ID}}\t{{.Size}}\t{{.CreatedAt}}"
	@echo ""
	@echo "Container Status:"
	@docker ps -a --filter "name=$(CONTAINER_NAME)" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

ps: ## Show running containers
	docker ps -a --filter "name=$(CONTAINER_NAME)"

inspect: ## Inspect running container
	docker inspect $(CONTAINER_NAME)

# Development targets
dev: build run-fg ## Build and run in foreground (dev mode)

dev-compose: build ## Build then use compose (dev mode)
	cd docker && docker-compose up

watch-logs: ## Follow logs in real-time
	docker logs -f --tail 100 $(CONTAINER_NAME)

# Utility
stats: ## Show real-time resource usage
	docker stats $(CONTAINER_NAME)

size: ## Show image size breakdown
	@echo "Image Size:"
	@docker images $(IMAGE_NAME) --format "{{.Size}}"
	@echo ""
	@echo "Layer Information:"
	@docker history $(IMAGE_NAME)

validate-compose: ## Validate docker-compose.yml
	docker-compose -f docker/docker-compose.yml config

# CI/CD helpers
ci-build: ## Build for CI environment
	docker build -f $(DOCKERFILE) \
		-t $(IMAGE_NAME):$(IMAGE_TAG) \
		-t $(IMAGE_NAME):ci-$(shell git rev-parse --short HEAD 2>/dev/null || echo 'local') \
		.

ci-test: ci-build ## Build and run tests for CI
	docker run --rm $(IMAGE_NAME):$(IMAGE_TAG) npm run validate && npm test

.DEFAULT_GOAL := help
