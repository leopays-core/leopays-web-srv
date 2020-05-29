#!/usr/bin/env bash
set -eo pipefail

docker-compose \
  --file build/docker-compose.yml \
  up --build
