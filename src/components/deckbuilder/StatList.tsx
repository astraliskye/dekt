import React from "react";
import type { CardWithEffects } from "../../types";

type Props = {
  cards: CardWithEffects[];
};

const StatList: React.FC<Props> = ({ cards }) => {
  return (
    <div className="mx-auto max-w-lg">
      <h2 className="py-4 text-center text-3xl">Stats</h2>
      {statListFromCardList(cards).length > 0 ? (
        <ul className="list-disc">
          {statListFromCardList(cards).map((statPair) => (
            <li key={statPair[0]}>
              {`${
                statPair[0].charAt(0).toUpperCase() + statPair[0].substring(1)
              }:`}{" "}
              <span className="font-bold text-red-600">{`${statPair[1]}`}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-400">None</p>
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
