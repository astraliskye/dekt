import { Prisma } from "@prisma/client";

export const cardIncludeStatsAndEffects = Prisma.validator<Prisma.CardInclude>()({
  stats: true,
  effects: true
});

export const deckIncludeCreatorAndCards = Prisma.validator<Prisma.DeckInclude>()({
  creator: true,
  cards: {
    orderBy: { position: "asc" },
    include: {
      card: {
        include: {
          stats: true,
          effects: true,
        },
      },
    },
  },
})
