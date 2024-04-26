FROM node:20-alpine3.17 AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /opt/deps
COPY package.json package-lock.json /opt/deps/

RUN npm ci --quiet --no-progress

# Build application
FROM node:20-alpine3.17 as builder

# RUN apk add --no-cache openssl1.1-compat

WORKDIR /opt/build

COPY --from=deps /opt/deps/node_modules ./node_modules

COPY . .

# Add Google Analytics to client code 
ARG NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
ENV NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=$NEXT_PUBLIC_GOOGLE_ANALYTICS_ID

RUN ls -lart

RUN npm run build

# Copy built code into smaller image
FROM node:20-alpine3.17

# RUN apk add --no-cache openssl1.1-compat

ARG NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED 1

RUN mkdir /home/node/app

WORKDIR /home/node/app

COPY --from=builder /opt/build/public ./public
COPY --from=builder /opt/build/package.json ./package.json
COPY --from=builder /opt/build/next.config.mjs ./

COPY --chown=node:node --from=builder /opt/build/.next/standalone ./
COPY --chown=node:node --from=builder /opt/build/.next/static ./.next/static

USER node

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]