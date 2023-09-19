import React from "react";
import type { DeckWithCreator } from "../../types";
import DeckListItem from "./DeckListItem";

type Props = {
  decks: DeckWithCreator[];
};

const DeckList = ({ decks }: Props) => {
  return (
    <div className="flex flex-col">
      {decks.map((deck) => (
        <DeckListItem key={deck.id} deck={deck} />
      ))}
    </div>
  );
};

export default DeckList;
