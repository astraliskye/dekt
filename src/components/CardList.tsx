import React from "react";
import type { CardWithEffects } from "../types";

type Props = {
  cardList: CardWithEffects[];
  handleCardClick: (cardId: string) => void;
};

const CardList = ({ cardList, handleCardClick }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <h2 className="py-4 text-center text-3xl">Cards</h2>
      {cardList.length > 0 ? (
        cardList.map((card) => (
          <div
            key={card.id}
            className="flex h-8 w-full cursor-pointer select-none items-center rounded-lg bg-red-600 px-2 font-semibold text-white"
            onClick={() => handleCardClick(card.id)}
          >
            <p>{card.name}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-400">None</p>
      )}
    </div>
  );
};

export default CardList;
