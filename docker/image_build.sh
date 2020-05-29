#!/usr/bin/env bash
set -eo pipefail

. ./.environment

docker build --file build/Dockerfile \
  --tag $ORG/$REPO:latest \
  --compress --force-rm --no-cache \
  ..
