FROM risingstack/alpine:3.4-v6.7.0-4.0.0
MAINTAINER Phoomparin Mano <phoomparin@gmail.com>

RUN adduser -S app

ENV APP=/opt/app
WORKDIR $APP

ADD ../yarn.tar.gz $APP
ENV PATH "$PATH:/opt/app/dist/bin"

COPY package.json yarn.lock /tmp/
RUN cd /tmp && yarn --prod
RUN mkdir -p $APP && cd $APP && ln -s /tmp/node_modules

COPY .env $APP
COPY build $APP

# USER app
EXPOSE 3000

CMD ["node", "app.js"]
