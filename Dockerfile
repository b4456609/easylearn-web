FROM node:6

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm install -g pushstate-server
EXPOSE 9000

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Install app src
COPY public /usr/src/app/public
COPY src /usr/src/app/src

RUN npm run build
RUN rm -rf public src node_modules package.json

CMD [ "pushstate-server", "build" ]
