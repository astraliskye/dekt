import React from "react";
import type { CardWithEffects } from "../../types";
import Container from "../elements/Container";
import H2 from "../elements/H2";
import CardListItem from "./CardListItem";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

type Props = {
  cards: CardWithEffects[];
  handleCardClick?: (cardId: string) => void;
};

const CardList = ({ cards, handleCardClick }: Props) => {
  const { setNodeRef } = useDroppable({ id: "droppable" });

  return (
    <Container>
      <H2>Cards</H2>
      <SortableContext items={cards.map((card) => card.id)}>
        <div ref={setNodeRef} className="flex flex-col gap-1 overflow-x-hidden">
          {cards.map((card) => (
            <CardListItem key={card.id} card={card} onClick={handleCardClick} />
          ))}
        </div>
      </SortableContext>
    </Container>
  );
};

export default CardList;
