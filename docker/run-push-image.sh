#!/usr/bin/env bash
docker push mlrdchain/web-srv:latest
docker tag mlrdchain/web-srv mlrdchain/web-srv:v0.1.0
docker push mlrdchain/web-srv:v0.1.0
docker push mlrdchain/web-srv:latest
exit 0
