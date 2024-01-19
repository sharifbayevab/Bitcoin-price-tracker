# Use an official Node runtime as a parent image
FROM node:21.2

WORKDIR /usr/src/app

COPY package*.json ./

# Install dependencies
RUN npm install -g serve
RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "index.js" ]
