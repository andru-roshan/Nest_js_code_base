FROM node:lts-alpine

WORKDIR /src/app

# Install Dependencies
COPY ./package*.json ./

RUN npm install

# Copy app source code
COPY . .


RUN npx prisma generate

# Ports
EXPOSE 3000

CMD [ "npm", "run", "start:dev"]