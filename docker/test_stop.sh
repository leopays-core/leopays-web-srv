#!/usr/bin/env bash
set -eo pipefail

docker-compose \
  --file test/docker-compose.yml \
  down
