#!/bin/bash

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
CONTAINER="uitkit"
CHECK_TYPE="all"
VERBOSE=false

# Usage
usage() {
  echo "Usage: ./docker/health.sh [OPTIONS]"
  echo ""
  echo "Options:"
  echo "  -c, --container NAME   Container name (default: uitkit)"
  echo "  -t, --type TYPE        Check type: all|health|metrics|ready|logs (default: all)"
  echo "  -v, --verbose          Verbose output"
  echo "  -h, --help             Show this help message"
  echo ""
  echo "Examples:"
  echo "  ./docker/health.sh                    # Check all endpoints"
  echo "  ./docker/health.sh -t health          # Check /health only"
  echo "  ./docker/health.sh -c my-uitkit    # Check specific container"
  exit 1
}

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    -c|--container)
      CONTAINER="$2"
      shift 2
      ;;
    -t|--type)
      CHECK_TYPE="$2"
      shift 2
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

# Check if container is running
if ! docker ps --format '{{.Names}}' | grep -q "^${CONTAINER}$"; then
  echo -e "${RED}✗ Container not running: $CONTAINER${NC}"
  echo ""
  echo "Start it with:"
  echo "  ./docker/run.sh -n $CONTAINER"
  exit 1
fi

echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}UitKit Health Check - Container: ${GREEN}${CONTAINER}${BLUE}${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo ""

# Helper function for HTTP checks
check_endpoint() {
  local endpoint=$1
  local name=$2

  echo -n "Checking $name... "

  local response=$(docker exec "$CONTAINER" curl -s -w "%{http_code}" -o /tmp/response.json "http://localhost:9000$endpoint" 2>/dev/null || echo "000")
  local status_code="${response: -3}"

  if [ "$status_code" = "200" ]; then
    echo -e "${GREEN}✓ OK (${status_code})${NC}"
    if [ "$VERBOSE" = true ]; then
      echo -e "${BLUE}Response:${NC}"
      docker exec "$CONTAINER" cat /tmp/response.json 2>/dev/null | python3 -m json.tool 2>/dev/null || \
        docker exec "$CONTAINER" cat /tmp/response.json
      echo ""
    fi
    return 0
  else
    echo -e "${RED}✗ FAILED (${status_code})${NC}"
    if [ "$VERBOSE" = true ]; then
      docker exec "$CONTAINER" cat /tmp/response.json 2>/dev/null
      echo ""
    fi
    return 1
  fi
}

# Helper function for container inspection
inspect_container() {
  echo -e "${BLUE}Container Status:${NC}"
  docker inspect "$CONTAINER" --format='
  ID:       {{.ID}}
  State:    {{.State.Status}}
  Running:  {{.State.Running}}
  Created:  {{.Created}}
  Image:    {{.Image}}
  Port Map: {{json .NetworkSettings.Ports}}
'
  echo ""
}

# Helper function for resource usage
check_resources() {
  echo -e "${BLUE}Resource Usage:${NC}"
  docker stats "$CONTAINER" --no-stream --format="table {{.Container}}\t{{.MemUsage}}\t{{.CPUPerc}}"
  echo ""
}

# Perform checks based on type
case "$CHECK_TYPE" in
  all)
    inspect_container
    check_resources
    check_endpoint "/health" "Health endpoint"
    check_endpoint "/metrics" "Metrics endpoint"
    check_endpoint "/ready" "Readiness endpoint"
    ;;
  health)
    check_endpoint "/health" "Health endpoint"
    ;;
  metrics)
    check_endpoint "/metrics" "Metrics endpoint"
    ;;
  ready)
    check_endpoint "/ready" "Readiness endpoint"
    ;;
  logs)
    echo -e "${BLUE}Recent Container Logs:${NC}"
    docker logs --tail 50 "$CONTAINER"
    ;;
  *)
    echo -e "${RED}Unknown check type: $CHECK_TYPE${NC}"
    usage
    ;;
esac

echo ""
echo -e "${GREEN}✓ Health check complete${NC}"
echo ""
