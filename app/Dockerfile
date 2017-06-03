############################################################
# Dockerfile to build NodeJS 6.10 Installed Containers
# Based on Node:6.10
############################################################

FROM node:6.10

EXPOSE 3000

# Copy application folder and configurations
COPY . /app

# Create data directory
WORKDIR /app

CMD ["npm", "start"]
