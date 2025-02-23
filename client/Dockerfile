FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# Copy the rest of the files, including config-overrides.js
COPY . .

# Ensure the config-overrides.js file is copied to the root of the project
COPY config-overrides.js ./config-overrides.js

# List files in the directory to verify presence of config-overrides.js
RUN ls -la /usr/src/app

RUN npm run build

# List files again after the build step
RUN ls -la /usr/src/app

EXPOSE 3000
CMD ["npm", "start"]