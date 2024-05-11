FROM node:20-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN npm i -g @nestjs/cli

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE 3001

CMD ["pnpm", "run", "start:prod"]