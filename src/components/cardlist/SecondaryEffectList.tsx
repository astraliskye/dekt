import React from "react";
import { CardWithStatsAndEffects } from "../../server/api/routers/card";

type Props = {
  cards: CardWithStatsAndEffects[];
};

const SecondaryEffectList = ({ cards }: Props) => {
  const effects = cards.map((card) => card.effects).flat();

  if (effects.length === 0) return null;

  return (
    <div className="w-11/12">
      <h2 className="mx-auto w-fit border-b-2 border-primary pt-8 pb-2 text-center text-2xl">
        Secondary Effects
      </h2>
      <ul>
        {effects.map((e) => (
          <li
            className="border-b-2 border-primary border-opacity-25 py-2"
            key={e.id}
          >
            {e.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SecondaryEffectList;
