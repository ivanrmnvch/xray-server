FROM node:18-alpine

WORKDIR /xray-manager

COPY ./package*.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "run", "dev"]
