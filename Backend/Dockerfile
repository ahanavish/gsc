FROM node:16-alpine

WORKDIR /app

COPY package*.json .

RUN npm ci --only=production

COPY . /app

EXPOSE 8080

ENTRYPOINT ["node","server.js"]