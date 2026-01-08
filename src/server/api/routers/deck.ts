import { Prisma, PrismaPromise } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

const deckIncludeCreatorCards = Prisma.validator<Prisma.DeckInclude>()({
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

const deckIncludeCreator = Prisma.validator<Prisma.DeckInclude>()({
  creator: true,
})

export type DeckWithCreatorAndCards = Prisma.DeckGetPayload<{
  include: typeof deckIncludeCreatorCards
}>

export type DeckWithCreator = Prisma.DeckGetPayload<{
  include: typeof deckIncludeCreator
}>

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

      const result = await ctx.prisma.$transaction([
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

      return result[1];
    }),
  getCurrentUserCollection: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.prisma.deck.findMany({
      take: 100,
      orderBy: { updatedAt: "desc" },
      include: deckIncludeCreatorCards
    });

    return result
  }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.prisma.deck.findMany({
      take: 100,
      orderBy: { updatedAt: "desc" },
      include: deckIncludeCreatorCards
    });

    return result;
  }),
  getById: publicProcedure
    .input(z.string())
    .query(async ({ input: deckId, ctx }) => {
      const result = await ctx.prisma.deck.findUnique({
        where: { id: deckId },
        include: deckIncludeCreatorCards
      });

      if (result === null) return Promise.reject();

      return result;
    }),
  deleteById: protectedProcedure
    .input(z.string())
    .mutation(async ({ input: deckId, ctx }) => {
      return ctx.prisma.deck.delete({ where: { id: deckId } });
    }),
});
