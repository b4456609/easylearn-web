FROM node:6

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
COPY index.html /usr/src/app/
COPY src /usr/src/app/src

RUN npm install
RUN npm run build
RUN npm install -g pushstate-server

EXPOSE 9000
CMD [ "pushstate-server", "build" ]
