#!/bin/bash
FROM node:17-alpine
WORKDIR /app
COPY . .
RUN npm install --force
EXPOSE 3000
RUN chmod +x ./package.json
CMD ["npm", "run", "dev"]
