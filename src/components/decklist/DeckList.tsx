import React from "react";
import type { DeckWithCreator } from "../../types";
import DeckListItem from "./DeckListItem";

type Props = {
  decks: DeckWithCreator[];
};

const DeckList = ({ decks }: Props) => {
  return (
    <div className="mx-auto flex max-w-7xl cursor-pointer flex-col gap-4">
      {decks.map((deck) => (
        <DeckListItem key={deck.id} deck={deck} />
      ))}
    </div>
  );
};

export default DeckList;
