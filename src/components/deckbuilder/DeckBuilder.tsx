import { useState } from "react";
import type { CardWithEffects } from "../../types";
import { api } from "../../utils/api";
import CardCollection from "./CardCollection";
import CardList from "./CardList";
import PrimaryButton from "../elements/PrimaryButton";
import SecondaryButton from "../elements/SecondaryButton";
import StatList from "./StatList";

const DeckBuilder: React.FC = () => {
  const { data: cards } = api.card.getAll.useQuery();
  const [cardList, setCardList] = useState([] as CardWithEffects[]);
  const [menuOpen, setMenuOpen] = useState(false);

  const removeCardFromList = (cardId: string) =>
    setCardList(cardList.filter((c) => c.id !== cardId));

  const toggleCardInCollection = (card: CardWithEffects) => {
    const filteredList = cardList.filter((c) => c.id !== card.id);

    if (filteredList.length === cardList.length) {
      if (cardList.length >= 15) {
        return;
      }

      setCardList((prev) => [...prev, card]);
    } else {
      setCardList(() => filteredList);
    }
  };

  return (
    <div className="flex flex-col items-center gap-10 dark:bg-black dark:text-white">
      <div
        className={`fixed ${
          menuOpen ? "left-0" : "-left-96"
        } top-0 z-10 flex h-full w-96 flex-col overflow-auto border-r-2 border-r-red-600 bg-white p-4 transition-all dark:bg-black`}
      >
        <div className="flex w-full">
          <SecondaryButton onClick={() => setMenuOpen(false)}>
            Close
          </SecondaryButton>
          <PrimaryButton>Save Deck</PrimaryButton>
        </div>
        <div className="flex-grow">
          <CardList cardList={cardList} handleCardClick={removeCardFromList} />
          <StatList cardList={cardList} />
        </div>
      </div>

      <h1
        className={`text-center text-3xl font-semibold tracking-widest ${
          menuOpen ? "overflow-hidden" : ""
        }`}
      >
        DECK EDITOR
      </h1>
      <PrimaryButton onClick={() => setMenuOpen(true)}>Open Deck</PrimaryButton>
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
