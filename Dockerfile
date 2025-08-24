FROM node:22-alpine AS builder

WORKDIR /app

RUN npm i -g corepack@0.31.0 && \
    corepack enable && \
    corepack prepare pnpm@10.12.1 --activate

COPY  package.json pnpm-lock.yaml ./

RUN pnpm i --frozen-lockfile --prod

EXPOSE 3333

CMD ["node", "src/server.ts"]
