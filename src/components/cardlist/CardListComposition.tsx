import React from "react";
import type { CardWithEffects } from "../../types";

type Props = {
  cards: CardWithEffects[];
};

const CardListComposition = ({ cards }: Props) => {
  return (
    <div className="mx-auto mt-8 flex h-2 w-60 border-2 border-light-shade dark:border-dark-tint">
      {cards
        .sort((a, b) => (a.affinity < b.affinity ? -1 : 1))
        .map((card) => {
          return (
            <div
              key={card.id}
              className={`${getBorderFromAffinity(card.affinity)} w-4 border-2`}
            ></div>
          );
        })}
    </div>
  );
};

function getBorderFromAffinity(affinity: string) {
  let color = "transparent";

  switch (affinity) {
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

  return color;
}

export default CardListComposition;
