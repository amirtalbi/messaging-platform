FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run prisma:format
RUN npm run prisma:generate

CMD ["npm", "run", "start:dev"]
