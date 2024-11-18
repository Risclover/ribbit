FROM node:14-bullseye
RUN apt-get update && apt-get install dumb-init python3 python iproute2 postgresql-client -y

RUN mkdir /app && mkdir /data && chown -R node:node /app && chown -R node:node /data

USER node
WORKDIR /app

COPY --chown=node package.json yarn.lock /app/
RUN yarn install
COPY  --chown=node . .
RUN yarn build

VOLUME /data

ENV RUNNING_IN_DOCKER "yes"

ENTRYPOINT ["/usr/bin/dumb-init", "--", "node", "/app/dist/cli.js"]
