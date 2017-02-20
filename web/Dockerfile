FROM risingstack/alpine:3.4-v7.4.0-4.2.1
MAINTAINER Phoomparin Mano <phoomparin@gmail.com>

RUN adduser -S app

ENV APP /opt/app
ENV YARN /opt/yarn
ENV NODE_ENV development

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

COPY package.json postcss.config.js $APP/
copy tools $APP/tools
COPY src $APP/src

# USER app
EXPOSE 3000 3002 8000

CMD ["yarn", "start"]
