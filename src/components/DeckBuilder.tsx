import { useState } from "react";
import type { CardWithEffects } from "../types";
import { api } from "../utils/api";
import CardCollection from "./CardCollection";
import CardList from "./CardList";

const DeckBuilder: React.FC = () => {
  const { data: cards } = api.card.getAll.useQuery();
  const [cardList, setCardList] = useState([] as CardWithEffects[]);

  const removeCardFromList = (cardId: string) =>
    setCardList(cardList.filter((c) => c.id !== cardId));

  const toggleCardInCollection = (card: CardWithEffects) => {
    const filteredList = cardList.filter((c) => c.id !== card.id);

    if (filteredList.length === cardList.length) {
      setCardList((prev) => [...prev, card]);
    } else {
      setCardList(() => filteredList);
    }
  };

  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-center text-3xl font-semibold tracking-widest">
        DECK EDITOR
      </h1>
      <button className="mx-auto rounded-lg bg-red-600 px-3 py-1 text-white transition hover:bg-red-700 active:bg-red-900">
        Save Deck
      </button>
      <CardList cardList={cardList} handleCardClick={removeCardFromList} />
      {cards && (
        <CardCollection
          cards={cards}
          handleCardClick={toggleCardInCollection}
        />
      )}
    </div>
  );
};

export default DeckBuilder;
