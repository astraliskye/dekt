import { Prisma } from "@prisma/client";
import { createTRPCRouter, publicProcedure } from "../trpc";

const include = Prisma.validator<Prisma.CardInclude>()({
  stats: true,
  effects: true
})

export const cardRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.card.findMany({
      include: include,
      orderBy: [{ type: "asc" }, { name: "asc" }],
    });
  }),
});

export type CardWithStatsAndEffects = Prisma.CardGetPayload<{
  include: typeof include
}>

export type DeckCardWithStatsAndEffects = Prisma.DeckCardGetPayload<{
  include: {
    card: {
      include: {
        stats: true
        effects: true
      }
    }
  }
}>
