FROM risingstack/alpine:3.4-v6.7.0-4.0.0
MAINTAINER Phoomparin Mano <phoomparin@gmail.com>

RUN adduser -S app

ENV HOME=/opt/app
WORKDIR $HOME

ADD yarn.tar.gz $HOME
ENV PATH "$PATH:/opt/app/dist/bin"

COPY ./monolithic/build $HOME
COPY ./monolithic/yarn.lock $HOME
COPY ./.env $HOME

# RUN yarn global add nodemon

# RUN npm i -g yarn
RUN yarn --pure-lockfile

# USER app
RUN node server
