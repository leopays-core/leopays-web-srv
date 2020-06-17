#!/usr/bin/env bash
set -eo pipefail

. ./.environment

docker tag $ORG/$REPO:temp $ORG/$REPO:$VERSION
docker push $ORG/$REPO:$VERSION
