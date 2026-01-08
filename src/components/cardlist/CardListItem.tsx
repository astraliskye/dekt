import { useSortable } from "@dnd-kit/sortable";
import React from "react";
import { CardWithStatsAndEffects } from "../../server/api/routers/card";
import { cardBorderColor } from "../../utils/front-end";

type Props = {
  card: CardWithStatsAndEffects;
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
      )} flex h-10 w-full cursor-pointer select-none items-center rounded-lg border-2 bg-light px-2 font-semibold text-dark dark:bg-dark dark:text-light`}
      onClick={onClick ? () => onClick(card.id) : undefined}
      ref={setNodeRef}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
      }}
      {...listeners}
      {...attributes}
    >
      <p>{card.name}</p>
    </div>
  );
};

export default CardListItem;
