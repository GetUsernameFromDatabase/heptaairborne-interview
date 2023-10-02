FROM node:18

WORKDIR /app
COPY . .

# Enable usage of yarn 3
RUN corepack enable
RUN yarn set version stable

RUN --mount=type=cache,target=/root/.yarn YARN_CACHE_FOLDER=/root/.yarn yarn install

CMD ["yarn", "serve"]
