import React, { useState } from "react";
import type { ChangeEvent } from "react";
import type { CardWithEffects } from "../../types";
import Card from "./Card";
import TextInput from "../elements/TextInput";
import { sortedCards } from "../../utils/front-end";
import { api } from "../../utils/api";
import Loading from "../elements/Loading";

type Props = {
  handleCardClick: (card: CardWithEffects) => void;
  cardList: CardWithEffects[];
};

const CardCollection: React.FC<Props> = ({ handleCardClick, cardList }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: cards, isLoading } = api.card.getAll.useQuery();

  if (isLoading) return <Loading />;

  if (!cards || cards.length === 0)
    return (
      <div className="mx-auto flex w-fit flex-col flex-wrap items-center justify-center text-black">
        <h2 className="text-3xl">Card Collection</h2>
        No cards to display
      </div>
    );

  return (
    <div className="flex flex-col items-center gap-8">
      <TextInput
        placeholder="Search cards..."
        value={searchTerm}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
      />
      <div className="mx-auto flex w-fit select-none flex-wrap justify-center gap-4 md:max-w-[1100px]">
        {cards &&
          sortedCards(cards)
            .filter(cardContainsTerm.bind(this, searchTerm))
            .map((card) => (
              <Card
                key={card.id}
                card={card}
                isSelected={cardList.filter((c) => c.id === card.id).length > 0}
                onClick={handleCardClick.bind(this, card)}
              />
            ))}
      </div>
    </div>
  );
};

function cardContainsTerm(searchTerm: string, card: CardWithEffects) {
  if (
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.affinity.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.originalEffects.toLowerCase().includes(searchTerm.toLowerCase())
  ) {
    return true;
  } else {
    for (const stat of card.stats) {
      if (stat.effect.toLowerCase().includes(searchTerm.toLowerCase()))
        return true;
    }
  }

  return false;
}

export default CardCollection;
