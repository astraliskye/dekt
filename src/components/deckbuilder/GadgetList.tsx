import React from "react";
import type { CardWithEffects } from "../../types";
import { sortedCards } from "../../utils/front-end";
import Container from "../elements/Container";
import H2 from "../elements/H2";

type Props = {
  cards: CardWithEffects[];
};

const GadgetList = ({ cards }: Props) => {
  return (
    <Container lg>
      <H2>Gadgets</H2>
      <ul className="list-disc">
        {sortedCards(cards)
          .filter((card) => card.gadget !== null)
          .map((card) => (
            <li key={card.id}>{card.gadget}</li>
          ))}
      </ul>
    </Container>
  );
};

export default GadgetList;
