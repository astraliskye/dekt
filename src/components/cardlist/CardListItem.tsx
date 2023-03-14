import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import type { CardWithEffects } from "../../types";
import { cardBorderColor } from "../../utils/front-end";

type Props = {
  card: CardWithEffects;
  onClick?: (id: string) => void;
};

const CardListItem = ({ card, onClick }: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: card.id,
  });

  return (
    <div
      className={`${cardBorderColor(
        card
      )} flex h-10 w-full cursor-pointer select-none items-center rounded-lg border-2 px-2 font-semibold text-dark dark:text-light`}
      onClick={onClick ? () => onClick(card.id) : undefined}
      ref={setNodeRef}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        // backgroundImage: `linear-gradient(to right bottom, rgba(#000), rgba(#fff))), url('/images/cards/${card.image}')`,
      }}
      {...listeners}
      {...attributes}
    >
      <p>{card.name}</p>
    </div>
  );
};

export default CardListItem;
