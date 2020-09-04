FROM node:14.9.0-alpine3.10

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install --silent

COPY . /app

EXPOSE 8000
CMD [ "npm", "run", "dev" ]
# CMD [ "node", "index.js" ]