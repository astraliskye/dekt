FROM node:lts

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate

ENV SKIP_ENV_VALIDATION=true

RUN npm run build

CMD ["sh", "-c", "npx prisma db push && npx prisma db seed && npm start"]
