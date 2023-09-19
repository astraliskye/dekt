import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { DeckWithCreatorAndCards } from "../../../types";

export const deckRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().trim().min(1),
        description: z.string().trim().min(1).optional(),
        cards: z.object({ id: z.string(), position: z.number() }).array(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.deck.create({
        data: {
          name: input.name,
          description: input.description,
          cards: {
            createMany: {
              data: input.cards.map((card) => ({
                cardId: card.id,
                position: card.position,
              })),
            },
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
            position: z.number(),
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

      if (deck.creatorId !== ctx.session.user.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
        });
      }

      const [_, result] = await ctx.prisma.$transaction([
        ctx.prisma.deckCard.deleteMany({ where: { deckId: deck.id } }),
        ctx.prisma.deck.update({
          where: { id: input.id },
          data: {
            name: input.name,
            description: input.description,
            cards: {
              set: [],
              createMany: {
                data: input.cards.map((card) => ({
                  cardId: card.id,
                  position: card.position,
                })),
              },
            },
          },
        }),
      ]);

      return result;
    }),
  getCurrentUserCollection: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.deck.findMany({
      where: { creatorId: ctx.session.user.id },
      orderBy: { updatedAt: "desc" },
      include: {
        creator: true,
        cards: {
          orderBy: { position: "asc" },
          include: {
            card: {
              include: {
                stats: true,
                secondaryEffects: true,
              },
            },
          },
        },
      },
      take: 100,
    });
  }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.prisma.deck.findMany({
      take: 100,
      orderBy: { updatedAt: "desc" },
      include: {
        creator: true,
        cards: {
          orderBy: { position: "asc" },
          include: {
            card: {
              include: {
                stats: true,
                secondaryEffects: true,
              },
            },
          },
        },
      },
    });

    return result.map((deck) => ({
      ...deck,
      cards: deck.cards.map((card) => card.card),
    }));
  }),
  getById: publicProcedure
    .input(z.string())
    .query(async ({ input: deckId, ctx }): Promise<DeckWithCreatorAndCards> => {
      const result = await ctx.prisma.deck.findUnique({
        where: { id: deckId },
        include: {
          creator: true,
          cards: {
            orderBy: { position: "asc" },
            include: {
              card: {
                include: {
                  stats: true,
                  secondaryEffects: true,
                },
              },
            },
          },
        },
      });

      if (result === null) return Promise.reject();

      return Promise.resolve({
        ...result,
        cards: result.cards.map((card) => card.card),
      });
    }),
  deleteById: protectedProcedure
    .input(z.string())
    .mutation(async ({ input: deckId, ctx }) => {
      return ctx.prisma.deck.delete({ where: { id: deckId } });
    }),
});
