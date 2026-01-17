# DEKT

Theory-crafting tool for building Back 4 Blood decks. Live demo: <https://dekt.skyegibney.com>

## Table of contents

- Overview
- Features
- Tech stack
- Project structure
- Getting started
  - Prerequisites
  - Environment variables
  - Local development (Next.js)
  - Docker Compose
  - First-time database setup
- Scripts
- Data and seeding
- Roadmap (portfolio ready)
- License

## Overview

DEKT helps players assemble, reorder, and save card decks for Back 4 Blood. It includes authentication, deck persistence, and a curated card dataset to power search and composition.

## Features

- Deck builder UI with drag-and-drop ordering
- Card data modeled in Postgres via Prisma
- User authentication via NextAuth (Discord)
- TRPC API layer for type-safe client/server calls
- React Query caching for responsive data fetching
- Tailwind-based styling pipeline

## Tech stack

- Next.js 13, React 18, TypeScript
- Prisma + PostgreSQL
- NextAuth (Discord provider)
- tRPC + React Query
- Tailwind CSS + PostCSS
- Docker for containerized runs

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

- Node.js (LTS recommended) and npm
- PostgreSQL database (local or Docker)

### Environment variables

Copy `.env.example` to `.env` and fill in the values.

Required:

- `DATABASE_URL` - Postgres connection string
- `NEXTAUTH_URL` - App URL (local is `http://localhost:3000`)
- `NEXTAUTH_SECRET` - Any strong secret
- `DISCORD_CLIENT_ID` / `DISCORD_CLIENT_SECRET` - Discord OAuth app credentials

Note: If you use Docker Compose, `POSTGRES_*` variables are also read by the database container.

### Local development (Next.js)

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

## Scripts

- `npm run dev` - Start the Next.js dev server
- `npm run build` - Build for production
- `npm run start` - Run the production build
- `npm run lint` - Lint the codebase

## Data and seeding

Card data lives in `cards.json`. The seed script (`prisma/load-cards.ts`) loads this into Postgres. Re-run `npx prisma db seed` any time `cards.json` changes.

## Roadmap (portfolio ready)

- [ ] Visual polish pass (typography, spacing, consistent UI states)
- [ ] Add a responsive, mobile-first deck builder layout
- [ ] Accessibility audit (keyboard DnD, focus states, contrast)
- [ ] Performance pass (image optimization, route-level code splitting)
- [ ] Improve empty/loading/error states with UX copy
- [ ] Add unit/integration tests for deck creation flows
- [ ] Add E2E tests for core user journeys
- [ ] CI pipeline (lint/test/build on pull requests)
- [ ] Deployment guide and environment config checklist
- [ ] Public demo data and a sample deck gallery
- [ ] SEO basics (metadata, OpenGraph, sitemap)
- [ ] Monitoring/analytics (error tracking + usage analytics)
- [ ] Add a short video walkthrough or GIF demo

## License

Licensed under the MIT License. See `LICENSE` for details.
