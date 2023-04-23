# syntax=docker/dockerfile:1


FROM node:18-alpine AS build

RUN apk add git
RUN npm install -g pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build


FROM node:18-alpine
ENV NODE_ENV=production

WORKDIR /app
COPY --from=build /app/build ./build
COPY --from=build /app/package.json .

RUN npm install --omit=dev

ENV ORIGIN=http:/localhost:3000
EXPOSE 3000

CMD ["node", "build"]