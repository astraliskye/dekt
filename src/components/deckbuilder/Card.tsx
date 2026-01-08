import React from "react";
import { CardWithStatsAndEffects } from "../../server/api/routers/card";
import { cardBorderColor } from "../../utils/front-end";

type Props = {
  card: CardWithStatsAndEffects;
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
      )} relative flex h-32 w-24 sm:h-48 sm:w-36 md:h-56 md:w-40 cursor-pointer flex-col justify-between overflow-hidden rounded-xl border-3 bg-primary bg-cover text-center font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-xl ${isSelected ? "ring-4 ring-primary ring-opacity-50 scale-105" : ""
        }`}
      onClick={() => onClick()}
    >
      {/* Card name overlay */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-2">
        <p className="text-xs sm:text-sm md:text-base font-bold text-white leading-tight">
          {card.name}
        </p>
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default Card;
