import type { Card, CardStat, SecondaryEffect } from "@prisma/client";

export type CardWithEffects = Card & {
  stats: CardStat[];
  secondaryEffects: SecondaryEffect[];
};
