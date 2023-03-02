import { useState } from "react";
import type { CardWithEffects } from "../types";
import { api } from "../utils/api";
import CardCollection from "./CardCollection";
import CardList from "./CardList";

const DeckBuilder: React.FC = () => {
  const { data: cards } = api.card.getAll.useQuery();
  const [cardList, setCardList] = useState([] as CardWithEffects[]);
  const [menuOpen, setMenuOpen] = useState(false);

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
      <div
        className={`fixed ${
          menuOpen ? "left-0" : "-left-96"
        } top-0 z-10 flex h-full w-96 flex-col overflow-auto border-r-2 border-r-red-600 bg-white p-4 transition-all`}
      >
        <div className="flex-grow">
          <CardList cardList={cardList} handleCardClick={removeCardFromList} />
        </div>
        <div className="flex">
          <button
            className="mx-auto rounded-lg px-3 py-1 transition hover:bg-gray-300 active:bg-gray-400"
            onClick={() => setMenuOpen(false)}
          >
            Close
          </button>
          <button className="mx-auto rounded-lg bg-red-600 px-3 py-1 text-white transition hover:bg-red-700 active:bg-red-900">
            Save Deck
          </button>
        </div>
      </div>

      <h1
        className={`text-center text-3xl font-semibold tracking-widest ${
          menuOpen ? "overflow-hidden" : ""
        }`}
      >
        DECK EDITOR
      </h1>
      <button
        className="mx-auto rounded-lg bg-red-600 px-3 py-1 text-white transition hover:bg-red-700 active:bg-red-900"
        onClick={() => setMenuOpen(true)}
      >
        Open Deck
      </button>
      {cards && (
        <CardCollection
          cards={cards}
          handleCardClick={toggleCardInCollection}
          cardList={cardList}
        />
      )}
    </div>
  );
};

export default DeckBuilder;
