import React from "react";
import type { CardWithEffects } from "../../types";
import { sortedCards } from "../../utils/front-end";
import Container from "../elements/Container";
import H2 from "../elements/H2";

type Props = {
  cards: CardWithEffects[];
};

const SecondaryEffectList = ({ cards }: Props) => {
  return (
    <Container lg>
      <H2>Secondary Effects</H2>
      <ul className="list-disc">
        {sortedCards(cards)
          .map((card) => card.secondaryEffects)
          .flat()
          .map((se) => (
            <li key={se.id}>{se.effect}</li>
          ))}
      </ul>
    </Container>
  );
};

export default SecondaryEffectList;
