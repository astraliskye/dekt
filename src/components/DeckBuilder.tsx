import type { Card } from "@prisma/client";
import { useState } from "react";
import { api } from "../utils/api";

const DeckBuilder: React.FC = () => {
  const { data: cards } = api.card.getAll.useQuery();
  const [cardList, setCardList] = useState([] as Card[]);

  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-center text-3xl font-semibold tracking-widest">
        DECK EDITOR
      </h1>
      <button className="mx-auto rounded-lg bg-red-600 px-3 py-1 text-white transition hover:bg-red-700 active:bg-red-900">
        Save Deck
      </button>
      <div className="flex flex-col items-center gap-2">
        {cardList.map((card) => (
          <div
            key={card.id}
            className="flex h-8 w-48 cursor-pointer select-none items-center rounded-lg bg-red-600 px-2 font-semibold text-white"
            onClick={() => {
              console.log(`Removing card ${card.id}`);
              setCardList(() => cardList.filter((c) => c.id !== card.id));
            }}
          >
            {card.name}
          </div>
        ))}
        {[...new Array(15 - cardList.length).keys()].map((key) => (
          <div
            key={key}
            className="flex h-8 w-48 cursor-pointer select-none items-center rounded-lg bg-red-600 px-2 font-semibold text-white"
          >
            {key}
          </div>
        ))}
      </div>
      <input
        className="mx-auto rounded-lg border-2 px-2 py-1 transition hover:bg-gray-200"
        type="text"
        placeholder="Search cards..."
      />
      <div className="mx-auto flex w-fit select-none flex-wrap justify-center gap-4">
        {cards &&
          cards.map((card) => (
            <div
              key={card.id}
              className="transition-allhover:bg-red-700 h-[calc(35px*4)] w-[calc(25px*4)] cursor-pointer rounded-lg bg-red-600 p-2 text-center font-semibold text-white"
              onClick={() => {
                const filteredList = cardList.filter((c) => c.id !== card.id);

                if (filteredList.length === cardList.length) {
                  setCardList((prev) => [...prev, card]);
                } else {
                  setCardList(() => filteredList);
                }
              }}
            >
              {card.name}
            </div>
          ))}
      </div>
    </div>
  );
};

export default DeckBuilder;
