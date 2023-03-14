import React from "react";
import type { CardWithEffects } from "../../types";
import { sortedCards } from "../../utils/front-end";
import Container from "../elements/Container";
import H2 from "../elements/H2";

type Props = {
  cards: CardWithEffects[];
};

const StatList: React.FC<Props> = ({ cards }) => {
  return (
    <Container>
      <H2>Stats</H2>
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
    </Container>
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
