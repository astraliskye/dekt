import React from "react";
import type { CardWithEffects } from "../../types";
import Container from "../elements/Container";
import H2 from "../elements/H2";
import CardListItem from "./CardListItem";
import { DndContext, useDroppable } from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

type Props = {
  cards: CardWithEffects[];
  moveCard: (index1: number, index2: number) => void;
  handleCardClick?: (cardId: string) => void;
};

const CardList = ({ cards, moveCard, handleCardClick }: Props) => {
  const { setNodeRef } = useDroppable({ id: "droppable" });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      moveCard(
        cards.findIndex((card) => card.id === active.id),
        cards.findIndex((card) => card.id === over.id)
      );
    }
  }

  return (
    <Container>
      <H2>Cards</H2>
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={cards.map((card) => card.id)}>
          <div ref={setNodeRef}>
            {cards.map((card) => (
              <CardListItem
                key={card.id}
                card={card}
                onClick={handleCardClick}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </Container>
  );
};

export default CardList;
