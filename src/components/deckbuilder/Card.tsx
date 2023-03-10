import React from "react";
import type { CardWithEffects } from "../../types";

type Props = {
  card: CardWithEffects;
  isSelected: boolean;
  onClick: () => void;
};

const Card = ({ card, isSelected, onClick }: Props) => {
  let border = "transparent";

  if (isSelected) {
    border = "border-primary";
  } else {
    switch (card.affinity) {
      case "Reflex":
        border = "border-reflex-dark dark:border-reflex";
        break;
      case "Discipline":
        border = "border-discipline";
        break;
      case "Brawn":
        border = "border-brawn-dark dark:border-brawn";
        break;
      case "Fortune":
        border = "border-fortune-dark dark:border-fortune";
        break;
    }
  }

  return (
    <div
      className={`${border} relative flex h-[calc(35px*6)] w-[calc(25px*6)] border-collapse cursor-pointer flex-col justify-between overflow-hidden rounded-lg border-4 bg-primary bg-cover text-center font-semibold text-white transition-all hover:bg-red-700 md:h-[calc(35px*9)] md:w-[calc(25px*9)] md:p-2`}
      style={{
        backgroundImage: `url(/images/cards/${card.image})`,
      }}
      onClick={() => onClick()}
    >
      <p className="p-2 text-xs text-light md:text-xl">{card.name}</p>
      <p className="invisible bg-dark-tint bg-opacity-70 p-1 text-left text-xs text-light md:visible md:rounded-lg md:p-2 md:text-sm">
        {card.originalEffects}
      </p>
    </div>
  );
};

export default Card;
