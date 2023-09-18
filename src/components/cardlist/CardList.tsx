import React from "react";
import type { CardWithEffects } from "../../types";
import CardListItem from "./CardListItem";
import DeckCompositionMeter from "./DeckCompositionMeter";

type Props = {
  cards: CardWithEffects[];
};

const CardList = ({ cards }: Props) => {
  return (
    <div className="flex w-64 flex-col items-center gap-8">
      <h2 className="mx-auto w-fit border-b-2 border-primary text-2xl">
        Cards
      </h2>

      <DeckCompositionMeter cards={cards} />

      <div className="flex w-64 flex-col gap-1">
        {cards.map((card) => (
          <CardListItem key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
