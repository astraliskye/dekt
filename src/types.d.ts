import type {
  Card,
  CardStat,
  Deck,
  SecondaryEffect,
  User,
} from "@prisma/client";

export type CardWithEffects = Card & {
  stats: CardStat[];
  secondaryEffects: SecondaryEffect[];
};

export type DeckWithCreator = Deck & {
  creator: User;
};

export type DeckWithCreatorAndCards = DeckWithCreator & {
  cards: CardWithEffects[];
};
