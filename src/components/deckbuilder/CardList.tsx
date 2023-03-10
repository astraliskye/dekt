import React from "react";
import type { CardWithEffects } from "../../types";

type Props = {
  cardList: CardWithEffects[];
  handleCardClick: (cardId: string) => void;
};

const CardList = ({ cardList, handleCardClick }: Props) => {
  return (
    <div>
      <div className="flex flex-col gap-1">
        <div className="mx-auto mt-8 flex h-2 w-60 border-2 border-light-shade dark:border-dark-tint">
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
                  color = "border-reflex-dark dark:border-reflex";
                  break;
                case "Discipline":
                  color = "border-discipline";
                  break;
                case "Brawn":
                  color = "border-brawn-dark dark:border-brawn";
                  break;
                case "Fortune":
                  color = "border-fortune-dark dark:border-fortune";
                  break;
              }

              return (
                <div key={card.id} className={`${color} w-4 border-2`}></div>
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
    </div>
  );
};

export default CardList;
