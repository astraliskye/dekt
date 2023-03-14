import React from "react";
import type { CardWithEffects } from "../../types";

type Props = {
  cards: CardWithEffects[];
};

const GadgetList = ({ cards }: Props) => {
  return (
    <div className="mx-auto max-w-xl">
      <h2 className="py-4 text-center text-3xl">Gadgets</h2>
      {cards.filter((card) => card.gadget !== null).length > 0 ? (
        <ul className="list-disc">
          {cards
            .filter((card) => card.gadget !== null)
            .map((card) => (
              <li key={card.id}>{card.gadget}</li>
            ))}
        </ul>
      ) : (
        <p className="text-center text-gray-400">None</p>
      )}
    </div>
  );
};

export default GadgetList;
