#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
CONTAINER_NAME="uitkit"
IMAGE="uitkit:latest"
MODE="daemon"
VERBOSE=false

# Usage
usage() {
  echo "Usage: ./docker/run.sh [OPTIONS]"
  echo ""
  echo "Options:"
  echo "  -i, --image IMAGE      Docker image (default: uitkit:latest)"
  echo "  -n, --name NAME        Container name (default: uitkit)"
  echo "  -f, --foreground       Run in foreground (default: daemon)"
  echo "  -v, --verbose          Verbose output"
  echo "  -h, --help             Show this help message"
  echo ""
  echo "Examples:"
  echo "  ./docker/run.sh                         # Run daemon container"
  echo "  ./docker/run.sh -f                      # Run in foreground"
  echo "  ./docker/run.sh -i uitkit:v1.0 -f    # Run specific image foreground"
  exit 1
}

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    -i|--image)
      IMAGE="$2"
      shift 2
      ;;
    -n|--name)
      CONTAINER_NAME="$2"
      shift 2
      ;;
    -f|--foreground)
      MODE="foreground"
      shift
      ;;
    -v|--verbose)
      VERBOSE=true
      shift
      ;;
    -h|--help)
      usage
      ;;
    *)
      echo "Unknown option: $1"
      usage
      ;;
  esac
done

echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}UitKit Docker Runner${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo ""
echo -e "Image:     ${GREEN}${IMAGE}${NC}"
echo -e "Container: ${GREEN}${CONTAINER_NAME}${NC}"
echo -e "Mode:      ${GREEN}${MODE}${NC}"

# Check if Docker is running
if ! docker info &> /dev/null; then
  echo -e "${RED}✗ Docker daemon not running${NC}"
  exit 1
fi

# Check if image exists
if ! docker image inspect "$IMAGE" &> /dev/null; then
  echo -e "${RED}✗ Image not found: $IMAGE${NC}"
  echo ""
  echo "Build it first:"
  echo "  ./docker/build.sh"
  exit 1
fi

echo ""

# Remove existing container if running
if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
  echo -e "${YELLOW}Stopping existing container...${NC}"
  docker stop "$CONTAINER_NAME" 2>/dev/null || true
  docker rm "$CONTAINER_NAME" 2>/dev/null || true
fi

echo -e "${BLUE}Starting container...${NC}"
echo ""

# Build run command
RUN_CMD=(
  "docker" "run"
  "--name" "$CONTAINER_NAME"
  "-p" "9000:9000"
  "-p" "4321:4321"
  "-p" "3000:3000"
  "-v" "${HOME}/.claude:/root/.claude"
  "-e" "NODE_ENV=production"
  "-e" "HEALTH_PORT=9000"
)

if [ "$MODE" = "daemon" ]; then
  RUN_CMD+=("-d")
fi

if [ "$VERBOSE" = true ]; then
  RUN_CMD+=("-e" "DEBUG=*")
fi

RUN_CMD+=("$IMAGE")

# Run command
if [ "$VERBOSE" = true ]; then
  echo -e "${BLUE}Running: ${RUN_CMD[*]}${NC}"
  echo ""
fi

"${RUN_CMD[@]}"

echo ""
echo -e "${GREEN}✓ Container started${NC}"
echo ""

if [ "$MODE" = "daemon" ]; then
  echo "Container is running in background."
  echo ""
  echo "Commands:"
  echo "  View logs:      docker logs -f $CONTAINER_NAME"
  echo "  Stop:           docker stop $CONTAINER_NAME"
  echo "  Remove:         docker rm $CONTAINER_NAME"
  echo "  Shell:          docker exec -it $CONTAINER_NAME /bin/sh"
  echo ""
  echo "Endpoints:"
  echo "  Health check:   http://localhost:9000/health"
  echo "  Metrics:        http://localhost:9000/metrics"
  echo "  Dashboard:      http://localhost:4321"
  echo ""
  echo "Wait for startup (~5s) then check health:"
  echo "  curl http://localhost:9000/health"
else
  echo "Container running in foreground. Press Ctrl+C to stop."
fi

echo ""
