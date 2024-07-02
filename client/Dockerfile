FROM node:18

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install --legacy-peer-deps
COPY . .

EXPOSE 4200

CMD ["npm", "run", "start"]