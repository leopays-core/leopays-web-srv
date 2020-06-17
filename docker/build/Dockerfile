FROM node:lts

ARG release=stub

ENV NODE_ENV=production DATA_DIR=/data

WORKDIR /srv

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production --silent && mv node_modules ../

COPY . .
RUN rm -R docker && mkdir /data

EXPOSE 80 443
VOLUME ["/data"]

CMD yarn run start:prod
