import { PrismaClient } from "@prisma/client";
import { readFile } from "fs/promises";

const prisma = new PrismaClient();

type Stat = {
  effect: string;
  amount: string;
  team: boolean;
};

type Card = {
  name: string;
  type: string;
  affinity: string;
  originalEffects: string;
  image: string;
  stats: Stat[];
};

async function main() {
  console.log("Beginning to read cards from file...");
  const cardFileBuffer = await readFile("./cards.json");
  const cardFileString = cardFileBuffer.toString();
  const { cards } = JSON.parse(cardFileString) as { cards: Card[] };

  console.log("Read cards from file, starting card insertion...");

  if (cards) {
    console.log("Truncating card table...");
    await prisma.$queryRaw`truncate "Card" cascade`;

    console.log("Inserting cards...");
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];

      if (card !== undefined) {
        const result = await prisma.card.create({
          data: {
            name: card.name,
            type: card.type,
            affinity: card.affinity,
            originalEffects: card.originalEffects,
            image: card.image,
            stats: card.stats
              ? {
                  createMany: {
                    data: card.stats.map(
                      (stat: {
                        effect: string;
                        amount: string;
                        team: boolean;
                      }) => ({
                        effect: stat.effect,
                        amount: stat.amount,
                        team: stat.team,
                      })
                    ),
                  },
                }
              : undefined,
          },
        });

        console.log(result);
      }
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
