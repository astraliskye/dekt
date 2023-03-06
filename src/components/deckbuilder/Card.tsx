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
      className="relative h-[calc(35px*4)] w-[calc(25px*4)] cursor-pointer overflow-hidden rounded-lg bg-red-600 bg-cover p-2 text-center font-semibold text-white transition-all hover:bg-red-700 md:h-[calc(35px*8)] md:w-[calc(25px*8)]"
      style={{
        backgroundImage: `url(/images/cards/${card.image})`,
        border: "2px solid " + (isSelected ? "red" : borderColor),
      }}
      onClick={() => onClick()}
    >
      <p className="z-10 text-white">{card.name}</p>
    </div>
  );
};

export default Card;
