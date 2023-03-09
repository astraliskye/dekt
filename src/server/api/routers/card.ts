import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { z } from "zod";

export const cardRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.card.findMany({
      include: { stats: true },
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        cards: z.object({
          name: z.string(),
          type: z.string(),
          affinity: z.string(),
          image: z.string(),
          originalEffects: z.string(),
        }),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.card.create({
        data: {
          ...input,
          creatorId: ctx.session.user.id,
        },
      });
    }),
});
