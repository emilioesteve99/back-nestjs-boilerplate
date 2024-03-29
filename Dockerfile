FROM node:20.9.0-alpine3.18 as build-env

RUN apk --no-cache add \
    build-base \
    python3

RUN npm -g i pnpm
RUN npm -g i node-gyp
RUN mkdir /home/node/app

# Uses caching for package.json dependencies see https://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
ADD package.json /tmp/package.json
RUN cd /tmp && pnpm i --ignore-script
RUN cp -a /tmp/node_modules /home/node/app

WORKDIR /home/node/app

COPY . .

RUN pnpm rebuild bcrypt@5.1.1

RUN pnpm build
