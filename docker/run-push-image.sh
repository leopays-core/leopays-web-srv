#!/usr/bin/env bash
docker tag leopays/web-srv:latest leopays/web-srv:v0.1.0
docker push leopays/web-srv:v0.1.0
docker push leopays/web-srv:latest
exit 0
