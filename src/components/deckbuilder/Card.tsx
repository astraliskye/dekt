import React from "react";
import type { CardWithEffects } from "../../types";

type Props = {
  card: CardWithEffects;
  isSelected: boolean;
  onClick: () => void;
};

const Card = ({ card, isSelected, onClick }: Props) => {
  let borderColor = "transparent";

  switch (card.affinity) {
    case "Reflex":
      borderColor = "#ABBBCB";
      break;
    case "Discipline":
      borderColor = "#FEBBB5";
      break;
    case "Brawn":
      borderColor = "#CAF6AA";
      break;
    case "Fortune":
      borderColor = "#F6F586";
      break;
  }

  return (
    <div
      className={`relative flex h-[calc(35px*6)] w-[calc(25px*6)] cursor-pointer flex-col justify-between overflow-hidden rounded-lg border-2 border-[discipline] bg-red-600 bg-cover p-1 text-center font-semibold text-white transition-all hover:bg-red-700 md:h-[calc(35px*8)] md:w-[calc(25px*8)] md:p-2`}
      style={{
        backgroundImage: `url(/images/cards/${card.image})`,
        border: "2px solid " + (isSelected ? "red" : borderColor),
      }}
      onClick={() => onClick()}
    >
      <p className="text-xs text-white md:text-xl">{card.name}</p>
      <p className="rounded-lg bg-gray-800 bg-opacity-70 p-1 text-left text-xs text-white md:p-2 md:text-sm">
        {card.originalEffects}
      </p>
    </div>
  );
};

export default Card;
