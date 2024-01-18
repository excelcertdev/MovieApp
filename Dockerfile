FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

ARG NODE_ENV=dev

RUN npm install

COPY . .

ENV NODE_ENV $NODE_ENV

ENV PORT 3000

RUN npm install -g pm2

CMD ["pm2-runtime", "start", "ecosystem.config.js"]

