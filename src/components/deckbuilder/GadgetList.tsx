import React from "react";
import type { CardWithEffects } from "../../types";

type Props = {
  cards: CardWithEffects[];
};

const GadgetList = ({ cards }: Props) => {
  const gadgetCards = cards.filter((card) => card.gadget != null);

  if (gadgetCards.length === 0) return null;

  return (
    <div className="w-11/12">
      <h2 className="mx-auto w-fit border-b-2 border-primary pt-8 pb-2 text-center text-2xl">
        Gadgets
      </h2>
      <ul>
        {gadgetCards.map((card) => (
          <li
            className="border-b-2 border-primary border-opacity-25 py-2"
            key={card.id}
          >
            {card.gadget}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GadgetList;
