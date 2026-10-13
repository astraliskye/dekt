import { Prisma } from "@prisma/client"
import { cardIncludeStatsAndEffects, deckIncludeCreator, deckIncludeCreatorAndCards } from "./db"

export type CardWithStatsAndEffects = Prisma.CardGetPayload<{
  include: typeof cardIncludeStatsAndEffects
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

export type DeckWithCreatorAndCards = Prisma.DeckGetPayload<{
  include: typeof deckIncludeCreatorAndCards
}>

export type DeckWithCreator = Prisma.DeckGetPayload<{
  include: typeof deckIncludeCreator
}>
