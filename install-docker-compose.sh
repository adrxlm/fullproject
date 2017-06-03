#!/bin/bash

DEFAULT_VERSION="1.13.0"
STRING_VERSION=${VERSION:-$DEFAULT_VERSION}

# Descargar el utlimo binario
curl -L https://github.com/docker/compose/releases/download/$STRING_VERSION/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose

# Darle permisos de ejecucion
sudo chmod +x /usr/local/bin/docker-compose