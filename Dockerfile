FROM node:20-alpine AS build

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG VITE_OFFER_URL
ENV VITE_OFFER_URL=$VITE_OFFER_URL

RUN npm run build

FROM node:20-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY --from=build /app/dist ./dist
COPY server ./server

ENV NODE_ENV=production
ENV PORT=3000
ENV DATA_DIR=/data

VOLUME ["/data"]

EXPOSE 3000

CMD ["node", "server/index.js"]
