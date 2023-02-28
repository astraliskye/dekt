import React from "react";
import type { CardWithEffects } from "../types";

type Props = {
  cardList: CardWithEffects[];
  handleCardClick: (cardId: string) => void;
};

function statListFromCardList(cards: CardWithEffects[]): [string, number][] {
  const statMap = new Map<string, number>();

  for (const card of cards) {
    for (const stat of card.stats) {
      statMap.set(stat.effect, statMap.get(stat.effect) || 0 + stat.amount);
    }
  }

  return [...statMap.entries()];
}

const CardList = ({ cardList, handleCardClick }: Props) => {
  return (
    <>
      <div className="flex flex-col gap-1">
        <h2 className="text-center text-3xl">Cards</h2>
        {cardList.map((card) => (
          <div
            key={card.id}
            className="flex h-8 w-48 cursor-pointer select-none items-center rounded-lg bg-red-600 px-2 font-semibold text-white"
            onClick={() => handleCardClick(card.id)}
          >
            <p>{card.name}</p>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-center text-3xl">Stats</h2>
        <ul className="list-disc">
          {statListFromCardList(cardList).map((statPair) => (
            <li key={statPair[0]}>{`${statPair[0]}: ${statPair[1]}`}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-center text-3xl">Secondary Effects</h2>
        <ul>
          {cardList
            .map((card) => card.secondaryEffects)
            .flat()
            .map((effect) => (
              <li key={effect.id} className="list-disc">
                {effect.effect}
              </li>
            ))}
        </ul>
      </div>
    </>
  );
};

export default CardList;
