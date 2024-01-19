# Use an official Node runtime as a parent image
FROM node:21.2

WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install -g serve
RUN npm install

COPY . .

RUN npm run build

COPY entrypoint.sh ./
RUN chmod +x ./entrypoint.sh

CMD [ "./entrypoint.sh" ]
