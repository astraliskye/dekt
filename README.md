# DEKT

Theory-crafting tool for building Back 4 Blood decks. Live demo: <https://dekt.astraliskye.com>

## Overview

DEKT helps players theory craft decks for Back 4 Blood by including accumulated stats and effects for easy visual parsing, an easier UI for quick prototyping, and a library for organizing your collection of decks. 

## Features

- Deck builder UI with drag-and-drop ordering.
- Cumulative data about decks.
- Deck organization.

## Tech stack

- React
- TypesScript
- PostgreSQL
- Node.js
- TRpc

## Project structure

- `src/pages` - Next.js pages and API routes
- `src/components` - UI components
- `src/server` - tRPC routers and server utilities
- `src/contexts` - React context providers
- `src/styles` - global styles
- `prisma/` - Prisma schema and seed scripts
- `public/` - static assets
- `cards.json` - base card dataset used for seeding

## Getting started

### Prerequisites

- Node.js and npm
- Docker and Docker Compose

### Environment variables

Copy `.env.example` to `.env` and fill in the values.

Required:

- `DATABASE_URL` - Postgres connection string
- `NEXTAUTH_URL` - App URL (local is `http://localhost:3000`)
- `NEXTAUTH_SECRET` - Any strong secret
- `DISCORD_CLIENT_ID` / `DISCORD_CLIENT_SECRET` - Discord OAuth app credentials

### Local development

1. Install dependencies: `npm install`
2. Create `.env` from `.env.example`
3. Push schema to the database: `npx prisma db push`
4. Seed the database: `npx prisma db seed`
5. Start the dev server: `npm run dev`

### Docker Compose

1. Create `.env` from `.env.example`
2. Configure the `POSTGRES_*` and `DATABASE_URL` values
3. Run: `docker compose up -d`

### First-time database setup (Docker)

After the containers are up:

1. Enter the app container: `docker exec -it dekt-app sh`
2. Push the schema: `npx prisma db push`
3. Seed the database: `npx prisma db seed`

## Data and seeding

Card data lives in `cards.json`. The seed script (`prisma/load-cards.ts`) loads this into Postgres. Re-run `npx prisma db seed` any time `cards.json` changes.

## Roadmap

- [ ] Add tags to decks for easy searching
- [ ] Add a short video walkthrough or GIF demo

## License

Licensed under the MIT License. See `LICENSE` for details.
