import React from "react";
import type { CardWithEffects } from "../../types";

type Props = {
  cardList: CardWithEffects[];
  handleCardClick: (cardId: string) => void;
};

const CardList = ({ cardList, handleCardClick }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="mx-auto flex w-60 pt-8">
        {cardList
          .sort((a, b) => {
            if (a.affinity > b.affinity) return 1;
            else if (a.affinity < b.affinity) return -1;
            else return 0;
          })
          .map((card) => {
            let color = "transparent";

            switch (card.affinity) {
              case "Reflex":
                color = "#ABBBCB";
                break;
              case "Discipline":
                color = "#FEBBB5";
                break;
              case "Brawn":
                color = "#CAF6AA";
                break;
              case "Fortune":
                color = "#F6F586";
                break;
            }

            return (
              <div
                key={card.id}
                className="w-5"
                style={{ border: "2px solid " + color }}
              ></div>
            );
          })}
      </div>
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
