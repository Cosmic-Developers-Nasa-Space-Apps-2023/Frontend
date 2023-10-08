#!/bin/bash
FROM --platform=linux/amd64 node:17-alpine
WORKDIR /app
COPY . .
EXPOSE 3000
RUN npm install --force
CMD ["npm", "run", "dev"]
