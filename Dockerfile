FROM node:21.6.2

WORKDIR /app

COPY . .

COPY package*.json ./

RUN npm install

RUN npm run build

COPY . .

CMD ["npm", "start"]