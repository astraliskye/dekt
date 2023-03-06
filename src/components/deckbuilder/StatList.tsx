import React from "react";
import type { CardWithEffects } from "../../types";

type Props = {
  cardList: CardWithEffects[];
};

const StatList: React.FC<Props> = ({ cardList }) => {
  return (
    <div>
      <h2 className="py-4 text-center text-3xl">Stats</h2>
      {statListFromCardList(cardList).length > 0 ? (
        <ul>
          {statListFromCardList(cardList).map((statPair) => (
            <li key={statPair[0]}>{`${statPair[0]}: ${statPair[1]}`}</li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">None</p>
      )}
    </div>
  );
};

function statListFromCardList(cards: CardWithEffects[]): [string, string][] {
  const statMap = new Map<string, string>();

  for (const card of cards) {
    for (const stat of card.stats) {
      const key: string = stat.effect + (stat.amount.includes("%") ? "%" : "");
      const amount =
        parseFloat(statMap.get(key) || "0") + parseFloat(stat.amount);
      statMap.set(key, amount.toString());
    }
  }

  return [...statMap.entries()].map((entry) => {
    if (entry[0].includes("%")) {
      entry[0] = entry[0].substring(0, entry[0].length - 1);
      entry[1] = entry[1] + "%";
    }

    return entry;
  });
}

export default StatList;
