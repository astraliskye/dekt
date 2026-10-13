import { createTRPCRouter, publicProcedure } from "../trpc";
import { cardIncludeStatsAndEffects } from "../../../shared/db";
import type { CardWithStatsAndEffects } from "../../../shared/types";
import type { PrismaPromise } from "@prisma/client";

export const cardRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }): PrismaPromise<CardWithStatsAndEffects[]> => {
    return ctx.prisma.card.findMany({
      include: cardIncludeStatsAndEffects,
      orderBy: [{ type: "asc" }, { name: "asc" }],
    });
  }),
});
