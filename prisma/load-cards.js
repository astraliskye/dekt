const { PrismaClient } = require("@prisma/client");
const { readFile } = require("fs/promises");

const prisma = new PrismaClient();

async function main() {
  const cardFileBuffer = await readFile("./cards.json");
  const cardFileString = cardFileBuffer.toString();
  const { cards } = JSON.parse(cardFileString);

  if (cards) {
    await prisma.$queryRaw`truncate "Card" cascade`;

    for (let i = 0; i < cards.length; i++) {
      const result = await prisma.card.create({
        data: {
          name: cards[i].name,
          type: cards[i].type,
          affinity: cards[i].affinity,
          ability: cards[i].ability,
          stats: cards[i].stats ? {
            createMany: {
              data: cards[i].stats.map((stat) => ({
                effect: stat.effect,
                amount: stat.amount,
                team: stat.team,
              })),
            },
          } : undefined,
          secondaryEffects: cards[i].secondaryEffects ? {
            createMany: {
              data: cards[i].secondaryEffects.map((se) => ({
                effect: se.effect,
                team: se.team,
              })),
            },
          } : undefined,
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
