############################################################
# Dockerfile to build NodeJS 6.10 Installed Containers
# Based on Node:6.10
############################################################

FROM node:6.10

EXPOSE 3500

# Copy application folder and configurations
COPY . /app

# Create data directory
WORKDIR /app

# INSTALL FOREVER
RUN npm install -g forever

CMD ["npm", "start"]
