import React, { useState } from "react";
import type { CardWithEffects } from "../types";

type Props = {
  cards: CardWithEffects[];
  handleCardClick: (card: CardWithEffects) => void;
  cardList: CardWithEffects[];
};

const CardCollection: React.FC<Props> = ({
  cards,
  handleCardClick,
  cardList,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

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
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="mx-auto flex w-fit select-none flex-wrap justify-center gap-4">
        {cards &&
          cards.filter(cardContainsTerm.bind(this, searchTerm)).map((card) => (
            <div
              key={card.id}
              className="h-[calc(35px*4)] w-[calc(25px*4)] cursor-pointer rounded-lg bg-red-600 bg-cover p-2 text-center font-semibold text-white transition-all hover:bg-red-700"
              style={{
                backgroundImage: `url(/images/cards/${card.image})`,
                border:
                  cardList.filter((c) => c.id === card.id).length !== 0
                    ? "3px solid red"
                    : "3px solid transparent",
              }}
              onClick={() => handleCardClick(card)}
            >
              {card.name}
            </div>
          ))}
      </div>
    </>
  );
};

function cardContainsTerm(searchTerm: string, card: CardWithEffects) {
  if (
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.affinity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (card.ability &&
      card.ability.toLowerCase().includes(searchTerm.toLowerCase()))
  ) {
    return true;
  }

  for (const stat of card.stats) {
    if (stat.effect.toLowerCase().includes(searchTerm.toLowerCase()))
      return true;
  }

  for (const se of card.secondaryEffects) {
    if (se.effect.toLowerCase().includes(searchTerm.toLowerCase())) return true;
  }

  return false;
}

export default CardCollection;
