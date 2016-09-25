#!/bin/bash
docker build -t web-build .
DOCKER_WEB_ID=$(docker create web-build)
docker cp $DOCKER_WEB_ID:/usr/src/app/build .
docker rm -v $DOCKER_WEB_ID
docker build -f Dockerfile-web -t web .
