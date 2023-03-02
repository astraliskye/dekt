import { PrismaClient } from "@prisma/client";
import { readFile } from "fs/promises";

const prisma = new PrismaClient();

async function main() {
  console.log("Beginning to read cards from file...");
  const cardFileBuffer = await readFile("./cards.json");
  const cardFileString = cardFileBuffer.toString();
  const { cards } = JSON.parse(cardFileString);

  console.log("Read cards from file, starting card insertion...");

  if (cards) {
    console.log("Truncating card table...");
    await prisma.$queryRaw`truncate "Card" cascade`;

    console.log("Inserting cards...");
    for (let i = 0; i < cards.length; i++) {
      const result = await prisma.card.create({
        data: {
          name: cards[i].name,
          type: cards[i].type,
          affinity: cards[i].affinity,
          ability: cards[i].ability,
          image: cards[i].image,
          stats: cards[i].stats
            ? {
                createMany: {
                  data: cards[i].stats.map((stat) => ({
                    effect: stat.effect,
                    amount: stat.amount,
                    team: stat.team,
                  })),
                },
              }
            : undefined,
          secondaryEffects: cards[i].secondaryEffects
            ? {
                createMany: {
                  data: cards[i].secondaryEffects.map((se) => ({
                    effect: se.effect,
                    team: se.team,
                  })),
                },
              }
            : undefined,
        },
      });

      console.log(result);
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
