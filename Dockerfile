FROM node:21.6-bullseye-slim as build

# create app directory
RUN mkdir /app
WORKDIR /app

# tells apt commands that we're running in a noninteractive mode
ARG DEBIAN_FRONTEND=noninteractive

# install build dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        make \
        curl \
        wget \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# copy app dependencies
COPY .env package.json vite.config.ts yarn.lock tsconfig.json tsconfig.node.json postcss.config.js tailwind.config.js index.html /app

# Bundle app source and build config
COPY src /app/src
COPY public /app/public

# install and build packages
RUN yarn install --frozen-lockfile && yarn build

FROM node:21.6-bullseye-slim
ENV VITE_BASE_URL https://ai.neevcloud.com
RUN mkdir /app
WORKDIR /app
COPY --from=build app/.env /app/package.json /app/vite.config.ts /app/yarn.lock /app/tsconfig.json /app/tsconfig.node.json /app/postcss.config.js /app/tailwind.config.js /app/index.html /app
COPY --from=build /app/public /app/public
COPY --from=build /app/dist /app/dist
RUN npm install serve -g


EXPOSE 5173
# CMD ["yarn", "dev", "--host"]
CMD ["serve", "-s", "dist", "-p", "5173"]
