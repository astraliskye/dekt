import React from "react";
import type { CardWithEffects } from "../../types";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type Props = {
  cards: CardWithEffects[];
  handleCardClick?: (cardId: string) => void;
};

// Individual sortable card item component
const SortableCardItem = ({
  card,
  onClick,
  position
}: {
  card: CardWithEffects;
  onClick?: (id: string) => void;
  position: number;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getAffinityColor = (affinity: string) => {
    switch (affinity.toLowerCase()) {
      case 'brawn':
        return 'from-brawn/20 to-brawn/5 border-brawn dark:from-brawn-dark/20 dark:to-brawn-dark/5 dark:border-brawn-dark';
      case 'discipline':
        return 'from-discipline/20 to-discipline/5 border-discipline dark:from-discipline-dark/20 dark:to-discipline-dark/5 dark:border-discipline-dark';
      case 'fortune':
        return 'from-fortune/20 to-fortune/5 border-fortune dark:from-fortune-dark/20 dark:to-fortune-dark/5 dark:border-fortune-dark';
      case 'reflex':
        return 'from-reflex/20 to-reflex/5 border-reflex dark:from-reflex-dark/20 dark:to-reflex-dark/5 dark:border-reflex-dark';
      default:
        return 'from-gray-100 to-gray-50 border-gray-300 dark:from-gray-800 dark:to-gray-900 dark:border-gray-600';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative ${isDragging ? 'z-50 rotate-2 scale-105' : ''}`}
      {...attributes}
    >
      <div
        className={`
          relative flex items-center gap-4 p-4 rounded-xl border-2 
          bg-gradient-to-r ${getAffinityColor(card.affinity)}
          hover:shadow-lg hover:scale-[1.02] 
          transition-all duration-200 cursor-pointer
          ${isDragging ? 'shadow-2xl ring-4 ring-primary/30' : ''}
        `}
        onClick={onClick ? () => onClick(card.id) : undefined}
      >
        {/* Drag Handle */}
        <div
          className="flex flex-col gap-1 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
          {...listeners}
        >
          <div className="w-1 h-1 bg-current rounded-full"></div>
          <div className="w-1 h-1 bg-current rounded-full"></div>
          <div className="w-1 h-1 bg-current rounded-full"></div>
          <div className="w-1 h-1 bg-current rounded-full"></div>
          <div className="w-1 h-1 bg-current rounded-full"></div>
          <div className="w-1 h-1 bg-current rounded-full"></div>
        </div>

        {/* Card Image */}
        <div
          className="w-12 h-16 rounded-lg bg-cover bg-center shadow-md border border-gray-300 dark:border-gray-600 flex-shrink-0"
          style={{
            backgroundImage: `url(https://dekt-card-images.s3.us-west-1.amazonaws.com/${card.image})`,
          }}
        />

        {/* Card Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
              {card.name}
            </h3>
            <span className="text-xs px-2 py-1 rounded-full bg-white/50 dark:bg-black/20 text-gray-700 dark:text-gray-300 font-medium">
              {card.type}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
            {card.originalEffects}
          </p>
        </div>

        {/* Remove Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onClick) onClick(card.id);
          }}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"
          title="Remove from deck"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Position indicator */}
        <div className="absolute -left-2 -top-2 w-6 h-6 bg-primary text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
          {position + 1}
        </div>
      </div>
    </div>
  );
};

const SortableCardList = ({ cards, handleCardClick }: Props) => {
  const { setNodeRef } = useDroppable({ id: "droppable" });

  if (cards.length === 0) {
    return (
      <div className="w-full">
        {/* Fixed height container for empty state */}
        <div className="h-96 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/20 flex flex-col items-center justify-center text-center p-8">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Your deck is empty
          </h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm">
            Start building your deck by selecting cards from the collection below. You can add up to 15 cards.
          </p>
        </div>
        
        {/* Deck completion indicator for empty state */}
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Deck Progress
            </span>
            <span className="font-medium text-gray-900 dark:text-white">
              0/15 cards
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: '0%' }} />
          </div>
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Add 15 cards to complete your deck
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Fixed height scrollable container for deck cards */}
      <div className="h-96 overflow-y-auto border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50/50 dark:bg-gray-800/20 p-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
        <SortableContext items={cards.map((card) => card.id)} strategy={verticalListSortingStrategy}>
          <div ref={setNodeRef} className="space-y-3 min-h-full">
            {cards.map((card, index) => (
              <SortableCardItem
                key={card.id}
                card={card}
                onClick={handleCardClick}
                position={index}
              />
            ))}
          </div>
        </SortableContext>
      </div>

      {/* Deck completion indicator */}
      <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">
            Deck Progress
          </span>
          <span className="font-medium text-gray-900 dark:text-white">
            {cards.length}/15 cards
          </span>
        </div>
        <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(cards.length / 15) * 100}%` }}
          />
        </div>
        {cards.length < 15 && (
          <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
            Add {15 - cards.length} more card{15 - cards.length !== 1 ? 's' : ''} to complete your deck
          </p>
        )}
      </div>
    </div>
  );
};

export default SortableCardList;
