import React from "react";
import type { CardWithEffects } from "../../types";
import { sortedCards } from "../../utils/front-end";

type Props = {
  cards: CardWithEffects[];
};

const StatList: React.FC<Props> = ({ cards }) => {
  const statList = statListFromCardList(cards);

  if (statList.length === 0) return null;

  return (
    <div className="w-11/12">
      <h2 className="mx-auto w-fit border-b-2 border-primary pb-2 pt-8 text-center text-2xl">
        Stats
      </h2>
      <ul>
        {statList.map((statPair) => (
          <li className="py-1" key={statPair[0]}>
            {`${
              statPair[0].charAt(0).toUpperCase() + statPair[0].substring(1)
            }:`}{" "}
            <span className="font-bold text-red-600">{`${statPair[1]}`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

function statListFromCardList(cards: CardWithEffects[]): [string, string][] {
  const statMap = new Map<string, string>();

  for (const card of sortedCards(cards)) {
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
