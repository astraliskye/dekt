import React from "react";
import type { CardWithEffects } from "../../types";

type Props = {
  cardList: CardWithEffects[];
};

const GadgetList = ({ cardList }: Props) => {
  return (
    <div className="px-4">
      <h2 className="py-4 text-center text-3xl">Gadgets</h2>
      {cardList.filter((card) => card.gadget !== null).length > 0 ? (
        <ul className="list-disc">
          {cardList
            .filter((card) => card.gadget !== null)
            .map((card) => (
              <li key={card.id}>{card.gadget}</li>
            ))}
        </ul>
      ) : (
        <p className="text-gray-400">None</p>
      )}
    </div>
  );
};

export default GadgetList;
