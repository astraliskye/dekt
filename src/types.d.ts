import type { Card, CardStat } from "@prisma/client";

export type CardWithEffects = Card & {
  stats: CardStat[];
};
