#!/usr/bin/env bash
docker push leopays/web-srv:latest
docker tag leopays/web-srv leopays/web-srv:v0.2.0
docker push leopays/web-srv:v0.2.0
docker push leopays/web-srv:latest
exit 0
