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
      )} relative flex h-32 w-24 sm:h-48 sm:w-36 md:h-56 md:w-40 cursor-pointer flex-col justify-between overflow-hidden rounded-xl border-3 bg-primary bg-cover text-center font-semibold text-white transition-all duration-200 hover:scale-105 hover:shadow-xl ${
        isSelected ? "ring-4 ring-primary ring-opacity-50 scale-105" : ""
      }`}
      style={{
        backgroundImage: `url(https://dekt-card-images.s3.us-west-1.amazonaws.com/${card.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={() => onClick()}
    >
      {/* Card name overlay */}
      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-2">
        <p className="text-xs sm:text-sm md:text-base font-bold text-white leading-tight">
          {card.name}
        </p>
      </div>
      
      {/* Card effects overlay - visible on hover for mobile, always visible on desktop */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-2 opacity-0 hover:opacity-100 md:opacity-100 transition-opacity duration-200">
        <p className="text-xs sm:text-sm text-white leading-tight line-clamp-4">
          {card.originalEffects}
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
