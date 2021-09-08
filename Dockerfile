FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --prod

COPY ./dist ./dist

USER node

EXPOSE 8080

ENTRYPOINT ["npm", "run", "start:prod"]
