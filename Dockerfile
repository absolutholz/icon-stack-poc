FROM node:14.13.0-alpine

RUN npm install --global gulp-cli

WORKDIR /app

COPY ./package*.json ./

RUN npm install
