import React from "react";
import type { CardWithEffects } from "../../types";
import Container from "../elements/Container";
import H2 from "../elements/H2";
import CardListItem from "./CardListItem";

type Props = {
  cards: CardWithEffects[];
};

const CardList = ({ cards }: Props) => {
  return (
    <Container>
      <H2>Cards</H2>
      <div className="flex flex-col gap-1">
        {cards.map((card) => (
          <CardListItem key={card.id} card={card} />
        ))}
      </div>
    </Container>
  );
};

export default CardList;
