FROM node:24.21.0-bookworm

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

RUN npx prisma generate

ENV SKIP_ENV_VALIDATION=true

RUN npm run build

CMD ["sh", "-c", "npm start"]
