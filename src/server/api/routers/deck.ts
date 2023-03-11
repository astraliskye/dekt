import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const deckRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().trim().min(1),
        description: z.string().trim().min(1).optional(),
        cards: z
          .object({
            id: z.string(),
          })
          .array(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.deck.create({
        data: {
          name: input.name,
          description: input.description,
          cards: {
            connect: input.cards,
          },
          creatorId: ctx.session.user.id,
        },
      });
    }),
  replace: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().trim().min(1),
        description: z.string().trim().min(1).optional(),
        cards: z
          .object({
            id: z.string(),
          })
          .array(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const deck = await ctx.prisma.deck.findUnique({
        where: { id: input.id },
      });

      if (!deck) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      if (deck.creatorId !== input.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      return ctx.prisma.deck.update({
        where: { id: input.id },
        data: {
          name: input.name,
          description: input.description,
          cards: {
            set: [],
            connect: input.cards,
          },
        },
      });
    }),
});
