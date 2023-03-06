import React, { useState } from "react";
import type { ChangeEvent } from "react";
import type { CardWithEffects } from "../../types";
import Card from "./Card";
import TextInput from "../elements/TextInput";

type Props = {
  cards: CardWithEffects[];
  handleCardClick: (card: CardWithEffects) => void;
  cardList: CardWithEffects[];
};

const CardCollection: React.FC<Props> = ({
  cards,
  handleCardClick,
  cardList,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  if (!cards || cards.length === 0)
    return (
      <div className="mx-auto flex w-fit flex-col flex-wrap items-center justify-center text-black">
        <h2 className="text-3xl">Card Collection</h2>
        No cards to display
      </div>
    );

  return (
    <>
      <TextInput
        placeholder="Search cards..."
        value={searchTerm}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
      />
      <div className="mx-auto flex w-fit select-none flex-wrap justify-center gap-4 md:max-w-[1100px]">
        {cards &&
          cards
            .filter(cardContainsTerm.bind(this, searchTerm))
            .sort((a, b) => {
              if (a.affinity > b.affinity) {
                return 1;
              } else if (a.affinity < b.affinity) {
                return -1;
              } else if (a.type > b.type) {
                return 1;
              } else if (a.type < b.type) {
                return -1;
              } else if (a.name > b.name) {
                return 1;
              } else if (a.name < b.name) {
                return -1;
              }

              return 0;
            })
            .map((card) => (
              <Card
                key={card.id}
                card={card}
                isSelected={cardList.filter((c) => c.id === card.id).length > 0}
                onClick={handleCardClick.bind(this, card)}
              />
            ))}
      </div>
    </>
  );
};

function cardContainsTerm(searchTerm: string, card: CardWithEffects) {
  if (
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.affinity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (card.ability &&
      card.ability.toLowerCase().includes(searchTerm.toLowerCase()))
  ) {
    return true;
  }

  for (const stat of card.stats) {
    if (stat.effect.toLowerCase().includes(searchTerm.toLowerCase()))
      return true;
  }

  for (const se of card.secondaryEffects) {
    if (se.effect.toLowerCase().includes(searchTerm.toLowerCase())) return true;
  }

  return false;
}

export default CardCollection;