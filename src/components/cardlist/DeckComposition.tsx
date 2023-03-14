import React from "react";
import type { CardWithEffects } from "../../types";
import { cardBorderColor, sortedCards } from "../../utils/front-end";

type Props = {
  cards: CardWithEffects[];
};

const DeckComposition = ({ cards }: Props) => {
  return (
    <div className="mx-auto mt-8 flex h-2 w-60 border-2 border-light-shade dark:border-dark-tint">
      {sortedCards(cards).map((card) => {
        return (
          <div
            key={card.id}
            className={`${cardBorderColor(card)} w-4 border-2`}
          ></div>
        );
      })}
    </div>
  );
};

export default DeckComposition;
