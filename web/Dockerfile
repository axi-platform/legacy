FROM risingstack/alpine:3.4-v7.4.0-4.2.1
MAINTAINER Phoomparin Mano <phoomparin@gmail.com>

RUN adduser -S app

ENV APP /opt/app
ENV YARN /opt/yarn

WORKDIR $APP

RUN apk update \
 && apk add ca-certificates wget \
 && update-ca-certificates \
 && wget -P $YARN https://yarnpkg.com/latest.tar.gz \
 && tar -C $YARN -xzf $YARN/latest.tar.gz

ENV PATH "$PATH:/opt/yarn/dist/bin"

COPY package.json yarn.lock /tmp/
RUN cd /tmp && yarn
RUN mkdir -p $APP && cd $APP && ln -s /tmp/node_modules

# .env
COPY postcss.config.js package.json $APP/

COPY src $APP/src
copy tools $APP/tools

RUN yarn global add babel-cli

# USER app
EXPOSE 3000 3001 3002 8000

CMD ["yarn", "start"]
