FROM node:14-alpine

RUN mkdir -p /home/node/front/node_modules && chown -R node:node /home/node/front

WORKDIR /home/node/front

ENV PATH /home/node/front/node_modules/.bin:$PATH

COPY package.json yarn.* ./

USER node

RUN yarn

COPY --chown=node:node . .

RUN yarn build

EXPOSE 3000

RUN yarn install --production

CMD ["yarn", "start"]
