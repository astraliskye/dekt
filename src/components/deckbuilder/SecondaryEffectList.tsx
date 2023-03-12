import React from "react";
import type { CardWithEffects } from "../../types";

type Props = {
  cardList: CardWithEffects[];
};

const SecondaryEffectList = ({ cardList }: Props) => {
  return (
    <div className="mx-auto max-w-xl">
      <h2 className="py-4 text-center text-3xl">Secondary Effects</h2>
      {cardList
        .map((card) => card.secondaryEffects)
        .filter((elem) => elem !== undefined)
        .flat().length > 0 ? (
        <ul className="list-disc">
          {cardList
            .map((card) => card.secondaryEffects)
            .flat()
            .map((se) => (
              <li key={se.id}>{se.effect}</li>
            ))}
        </ul>
      ) : (
        <p className="text-center text-gray-400">None</p>
      )}
    </div>
  );
};

export default SecondaryEffectList;
