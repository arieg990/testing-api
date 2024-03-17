FROM node:20-alpine AS base

#RUN apk add --no-cache build-base gcc autoconf automake libtool zlib-dev libpng-dev lame tiff-dev curl
##RUN apt-get update && apt-get install -y libpq-dev g++ make curl
##RUN npm install -g bun@1.0.22

FROM base AS dependency

WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm config delete proxy
RUN npm config delete http-proxy
RUN npm config delete https-proxy
RUN npm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=dependency /app/node_modules ./node_modules
COPY . .
RUN env
RUN npm run build

FROM base AS deploy
#ENV NODE_ENV=production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.env ./.env
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["node", "dist/main"]
