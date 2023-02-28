import React from "react";
import type { CardWithEffects } from "../types";

type Props = {
  cards: CardWithEffects[];
  handleCardClick: (card: CardWithEffects) => void;
};

const CardCollection: React.FC<Props> = ({ cards, handleCardClick }) => {
  if (!cards || cards.length === 0)
    return (
      <div className="mx-auto flex w-fit flex-col flex-wrap items-center justify-center text-black">
        <h2 className="text-3xl">Card Collection</h2>
        No cards to display
      </div>
    );

  return (
    <>
      <input
        className="mx-auto rounded-lg border-2 px-2 py-1 transition hover:bg-gray-200"
        type="text"
        placeholder="Search cards..."
      />
      <div className="mx-auto flex w-fit select-none flex-wrap justify-center gap-4">
        {cards &&
          cards.map((card) => (
            <div
              key={card.id}
              className="transition-allhover:bg-red-700 h-[calc(35px*4)] w-[calc(25px*4)] cursor-pointer rounded-lg bg-red-600 p-2 text-center font-semibold text-white"
              onClick={() => handleCardClick(card)}
            >
              {card.name}
            </div>
          ))}
      </div>
    </>
  );
};

export default CardCollection;
