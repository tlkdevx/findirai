FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Ensure the config-overrides.js file is copied to the root of the project
COPY config-overrides.js ./config-overrides.js

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]