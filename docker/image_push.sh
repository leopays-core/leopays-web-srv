#!/usr/bin/env bash
set -eo pipefail

. ./.environment

docker tag $ORG/$REPO:latest $ORG/$REPO:$VERSION
docker push $ORG/$REPO:$VERSION
docker push $ORG/$REPO:latest
