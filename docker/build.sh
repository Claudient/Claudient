#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
IMAGE_NAME="uitkit"
IMAGE_TAG="latest"
DOCKERFILE="docker/Dockerfile"
BUILD_CONTEXT="."
PLATFORMS="linux/amd64,linux/arm64"
PUSH=false
BUILDX=false

# Usage
usage() {
  echo "Usage: ./docker/build.sh [OPTIONS]"
  echo ""
  echo "Options:"
  echo "  -t, --tag TAG          Image tag (default: latest)"
  echo "  -n, --name NAME        Image name (default: uitkit)"
  echo "  -p, --push             Push to registry after build"
  echo "  -m, --multiarch        Build for multiple architectures (requires buildx)"
  echo "  -h, --help             Show this help message"
  echo ""
  echo "Examples:"
  echo "  ./docker/build.sh                    # Build locally: uitkit:latest"
  echo "  ./docker/build.sh -t v1.0            # Build: uitkit:v1.0"
  echo "  ./docker/build.sh -m -p              # Build ARM64 + AMD64 and push"
  exit 1
}

# Parse arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    -t|--tag)
      IMAGE_TAG="$2"
      shift 2
      ;;
    -n|--name)
      IMAGE_NAME="$2"
      shift 2
      ;;
    -p|--push)
      PUSH=true
      shift
      ;;
    -m|--multiarch)
      BUILDX=true
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

IMAGE="${IMAGE_NAME}:${IMAGE_TAG}"

echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}UitKit Docker Image Builder${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}"
echo ""
echo -e "Image:  ${GREEN}${IMAGE}${NC}"
echo -e "File:   ${GREEN}${DOCKERFILE}${NC}"
echo -e "Context: ${GREEN}${BUILD_CONTEXT}${NC}"

# Check if Dockerfile exists
if [ ! -f "$DOCKERFILE" ]; then
  echo -e "${RED}✗ Dockerfile not found: $DOCKERFILE${NC}"
  exit 1
fi

# Check for Docker
if ! command -v docker &> /dev/null; then
  echo -e "${RED}✗ Docker not installed${NC}"
  exit 1
fi

echo ""

# Multiarch build with buildx
if [ "$BUILDX" = true ]; then
  echo -e "${YELLOW}Building for multiple architectures: ${PLATFORMS}${NC}"

  # Check for buildx
  if ! docker buildx version &> /dev/null; then
    echo -e "${RED}✗ Docker buildx not available. Install or enable it first.${NC}"
    exit 1
  fi

  BUILD_ARGS=(
    "buildx" "build"
    "--platform" "$PLATFORMS"
    "-f" "$DOCKERFILE"
    "-t" "$IMAGE"
  )

  if [ "$PUSH" = true ]; then
    echo -e "${YELLOW}Push enabled${NC}"
    BUILD_ARGS+=("--push")
  else
    BUILD_ARGS+=("--load")
  fi

  BUILD_ARGS+=("$BUILD_CONTEXT")

  echo -e "${BLUE}Running: docker ${BUILD_ARGS[*]}${NC}"
  echo ""

  docker "${BUILD_ARGS[@]}"
else
  # Standard build
  echo -e "${BLUE}Building image...${NC}"
  echo ""

  if docker build -f "$DOCKERFILE" -t "$IMAGE" "$BUILD_CONTEXT"; then
    echo ""
    echo -e "${GREEN}✓ Build successful${NC}"

    # Get image size
    SIZE=$(docker images "$IMAGE_NAME" --format "{{.Size}}" | head -1)
    echo -e "Size: ${GREEN}${SIZE}${NC}"

    # Get image ID
    IMAGE_ID=$(docker images "$IMAGE_NAME" --format "{{.ID}}" | head -1)
    echo -e "ID: ${GREEN}${IMAGE_ID}${NC}"

    if [ "$PUSH" = true ]; then
      echo ""
      echo -e "${BLUE}Pushing image...${NC}"
      if docker push "$IMAGE"; then
        echo -e "${GREEN}✓ Push successful${NC}"
      else
        echo -e "${RED}✗ Push failed${NC}"
        exit 1
      fi
    fi
  else
    echo -e "${RED}✗ Build failed${NC}"
    exit 1
  fi
fi

echo ""
echo -e "${GREEN}✓ Done${NC}"
echo ""
echo "Next steps:"
echo "  Run container:       docker run -d -p 9000:9000 -p 4321:4321 $IMAGE"
echo "  Using compose:       cd docker && docker-compose up -d"
echo "  View help:           docker run $IMAGE --help"
echo ""
