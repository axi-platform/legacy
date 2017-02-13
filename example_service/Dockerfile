FROM risingstack/alpine:3.4-v6.7.0-4.0.0
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
RUN cd /tmp && yarn --prod
RUN mkdir -p $APP && cd $APP && ln -s /tmp/node_modules
RUN yarn global add nodemon

COPY .env $APP
COPY build $APP

# USER app
EXPOSE 3000

CMD ["nodemon", "bundle.js"]
