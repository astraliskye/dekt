# DEKT

Theory crafting tool for constructing the perfect Back 4 Blood decks. Find the live tool [on my website](https://dekt.skyegibney.com)

[TODO: add video demo]

## Setting up DEKT

DEKT can be setup locally with two methods: Docker Compose, which will require docker and docker compose tools to be installed, or by using NextJS dev mode

### Docker Compose

1. Clone the repository: `git clone https://github.com/astraliskye/dekt`
2. Create .env file using the .env.example: `cp .env.example .env`
3. Configure each environment variable 
    - [TODO: list each environment variable]
4. Run `docker compose up -d` to create the necessary containers

#### First time setup

After performing the first four steps from the Docker Compose section, do this:

1. Hop into the app docker container: `docker exec -it dev-app bash`
2. Setup tables in the database: `npx prisma db push`
3. Seed database with card data from cards.json: `npx prisma db seed`

### NextJS Dev Server

Note: this requires you setting up your own PostgreSQL database, so go do that first. You will need the name of the database you are using as well as the credentials for an account that has permissions to run DDL operations on that database.

1. Clone the repository: `git clone https://github.com/astraliskye/dekt`
2. Create .env file using the .env.example: `cp .env.example .env`
3. Configure each environment variable
    - [TODO: list each environment variable, note to change .env to not use string interpolation]
4. Initialize database: `npx prisma db push`
5. Seed databse with card data from cards.json: `npx prisma db seed`

## Roadmap

- [ ] Robust automated testing framework
- [ ] CI/CD via GitHub actions
