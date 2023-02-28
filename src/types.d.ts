import type { Card, CardStat, SecondaryEffect } from "@prisma/client";

export type CardWithEffects = Card & {
  stats: CardStat[];
  secondaryEffects: SecondaryEffect[];
};

export type CardWithStats = Card & { stats: CardStat[] };

export type CardWithSecondaryEffects = Card & {
  secondaryEffects: SecondaryEffect[];
};
