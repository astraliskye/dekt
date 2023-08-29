import React from "react";
import type { CardWithEffects } from "../../types";
import CardListItem from "./CardListItem";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import DeckCompositionMeter from "./DeckCompositionMeter";

type Props = {
  cards: CardWithEffects[];
  handleCardClick?: (cardId: string) => void;
};

const CardList = ({ cards, handleCardClick }: Props) => {
  const { setNodeRef } = useDroppable({ id: "droppable" });

  if (cards.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center text-center text-2xl text-gray-500 ">
        <p>No cards in your deck yet!</p>
        <p>Use the bottom nav to add cards!</p>
      </div>
    );
  }

  return (
    <div className="flex w-64 flex-col items-center gap-4">
      <h2 className="mx-auto w-fit border-b-2 border-primary text-2xl">Deck</h2>

      <DeckCompositionMeter cards={cards} />

      <SortableContext items={cards.map((card) => card.id)}>
        <div ref={setNodeRef} className="flex w-64 flex-col gap-1">
          {cards.map((card) => (
            <CardListItem key={card.id} card={card} onClick={handleCardClick} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export default CardList;
