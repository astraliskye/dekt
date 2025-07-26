import React from "react";
import type { CardWithEffects } from "../../types";
import { cardBorderColor, sortedCards } from "../../utils/front-end";

type Props = {
  cards: CardWithEffects[];
};

const DeckCompositionMeter = ({ cards }: Props) => {
  // Calculate affinity distribution
  const affinityCount = cards.reduce((acc, card) => {
    acc[card.affinity] = (acc[card.affinity] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const getAffinityColor = (affinity: string) => {
    switch (affinity.toLowerCase()) {
      case 'brawn':
        return 'bg-brawn dark:bg-brawn-dark';
      case 'discipline':
        return 'bg-discipline dark:bg-discipline-dark';
      case 'fortune':
        return 'bg-fortune dark:bg-fortune-dark';
      case 'reflex':
        return 'bg-reflex dark:bg-reflex-dark';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-3">
      {/* Visual meter */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-0">
          Composition:
        </span>
        <div className="flex-1 flex h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600">
          {sortedCards(cards).map((card) => {
            const width = `${(1 / Math.max(cards.length, 15)) * 100}%`;
            return (
              <div
                key={card.id}
                className={`${cardBorderColor(card, 'bg-primary')} transition-all duration-200`}
                style={{ width }}
                title={`${card.name} (${card.affinity})`}
              />
            );
          })}
          {/* Empty slots */}
          {cards.length < 15 && (
            <div 
              className="bg-gray-100 dark:bg-gray-800 opacity-50"
              style={{ width: `${((15 - cards.length) / 15) * 100}%` }}
            />
          )}
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400 min-w-0">
          {cards.length}/15
        </span>
      </div>

      {/* Affinity breakdown */}
      {Object.keys(affinityCount).length > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(affinityCount).map(([affinity, count]) => (
            <div
              key={affinity}
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs"
            >
              <div className={`w-2 h-2 rounded-full ${getAffinityColor(affinity)}`} />
              <span className="text-gray-700 dark:text-gray-300">
                {affinity}: {count}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeckCompositionMeter;
