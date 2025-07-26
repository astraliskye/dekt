import React from "react";
import type { DeckWithCreatorAndCards } from "../../types";
import DeckListItem from "./DeckListItem";

type Props = {
  decks: DeckWithCreatorAndCards[];
};

const DeckList = ({ decks }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {decks.map((deck) => (
        <DeckListItem key={deck.id} deck={deck} />
      ))}
    </div>
  );
};

export default DeckList;
