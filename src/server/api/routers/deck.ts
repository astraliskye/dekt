import type {
  Card,
  CardStat,
  Deck,
  DeckCard,
  SecondaryEffect,
} from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

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
            createMany: {
              data: input.cards.map((card) => ({
                cardId: card.id,
                position: card.position,
              })),
            },
          },
        },
      });
    }),
  getCurrentUserCollection: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.deck.findMany({
      where: { creatorId: ctx.session.user.id },
      orderBy: { updatedAt: "desc" },
      include: {
        creator: true,
      },
    });
  }),
  getById: publicProcedure
    .input(z.string())
    .query(async ({ input: deckId, ctx }) => {
      const result:
        | (Deck & {
            cards: (DeckCard & {
              card: Card & {
                stats: CardStat[];
                secondaryEffects: SecondaryEffect[];
              };
            })[];
          })
        | null = await ctx.prisma.deck.findUnique({
        where: { id: deckId },
        include: {
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

      if (result === null) return null;

      return { ...result, cards: result.cards.map((card) => card.card) };
    }),
});
