import React from "react";
import type { CardWithEffects } from "../../types";

type Props = {
  cards: CardWithEffects[];
};

const SecondaryEffectList = ({ cards }: Props) => {
  const secondaryEffects = cards.map((card) => card.secondaryEffects).flat();

  if (secondaryEffects.length === 0) return null;

  return (
    <div className="w-11/12">
      <h2 className="mx-auto w-fit border-b-2 border-primary pt-8 pb-2 text-center text-2xl">
        Secondary Effects
      </h2>
      <ul>
        {secondaryEffects.map((se) => (
          <li
            className="border-b-2 border-primary border-opacity-25 py-2"
            key={se.id}
          >
            {se.effect}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SecondaryEffectList;
