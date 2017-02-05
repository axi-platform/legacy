FROM node:alpine
RUN adduser -S app
# RUN npm i -g npm
ENV HOME=/home/app
USER app
WORKDIR $HOME/feathers
COPY ./server/dist $HOME/feathers
# COPY ./server/package.json $HOME/feathers/package.json
COPY ./server/node_modules $HOME/feathers/node_modules
RUN ls $HOME/feathers/node_modules
# RUN npm install
RUN node server