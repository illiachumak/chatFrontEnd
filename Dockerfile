FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 5173
CMD [ "npm", "run", "dev" ]