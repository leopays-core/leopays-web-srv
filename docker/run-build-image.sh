#!/usr/bin/env bash
docker build --file build/Dockerfile \
  --tag leopays/web-srv:latest \
  --compress --force-rm --no-cache \
  ..
exit 0
