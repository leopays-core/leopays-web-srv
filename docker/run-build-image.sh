#!/usr/bin/env bash
docker build --file build/Dockerfile \
  --tag mlrdchain/web-srv:latest \
  --compress --force-rm --no-cache \
  ../
exit 0
