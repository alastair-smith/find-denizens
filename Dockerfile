FROM node:14-alpine@sha256:5c33bc6f021453ae2e393e6e20650a4df0a4737b1882d389f17069dc1933fdc5

ENV NODE_ENV production
ENV PORT 3000

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN npm ci

COPY src src

HEALTHCHECK  --interval=15s --timeout=1s \
  CMD wget --quiet --tries=1 --spider http://localhost:$PORT/healthcheck || exit 1

USER node

CMD ["./src/index.js"]
