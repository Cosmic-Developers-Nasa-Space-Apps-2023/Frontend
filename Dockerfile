## Make an image of the whole fronent-nada folder
FROM node:17-alpine
WORKDIR /app
COPY . .
RUN npm install --force
EXPOSE 3000
CMD ["npm", "run", "dev"]
