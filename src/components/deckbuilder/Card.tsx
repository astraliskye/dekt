import React from "react";
import type { CardWithEffects } from "../../types";
import { cardBorderColor } from "../../utils/front-end";

type Props = {
  card: CardWithEffects;
  isSelected: boolean;
  onClick: () => void;
};

const Card = ({ card, isSelected, onClick }: Props) => {
  return (
    <div
      className={`${cardBorderColor(
        card,
        "border-primary",
        isSelected
      )} relative flex h-[calc(35px*6)] w-[calc(25px*6)] border-collapse cursor-pointer flex-col justify-between overflow-hidden rounded-lg border-4 bg-primary bg-cover text-center font-semibold text-white transition-all hover:bg-red-700 md:h-[calc(35px*9)] md:w-[calc(25px*9)] md:p-2`}
      style={{
        backgroundImage: `url(https://dekt-card-images.s3.us-west-1.amazonaws.com/${card.image})`,
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
