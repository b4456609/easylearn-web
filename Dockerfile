FROM node:6

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

COPY public /usr/src/app/public
COPY src /usr/src/app/src
RUN npm run build
