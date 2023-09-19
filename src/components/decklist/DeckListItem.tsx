import Link from "next/link";
import React from "react";
import type { DeckWithCreator } from "../../types";

type Props = {
  deck: DeckWithCreator;
};

const DeckListItem = ({ deck }: Props) => {
  return (
    <Link href={`/decks/${deck.id}`}>
      <div className="flex flex-col border-b-2 border-light-shade p-4 transition hover:bg-light-shade">
        <h2 className="py-2 text-2xl font-bold">{deck.name}</h2>
        <p>
          {deck.description && deck.description.length > 200
            ? deck.description.slice(0, 200)
            : deck.description}
        </p>
        <div className="flex w-full items-center justify-between py-1">
          <span className="text-xs text-gray-500">
            Created by {deck.creator.name}
          </span>
          <span className="text-xs text-gray-500">
            Last updated on {deck.updatedAt.toLocaleDateString()}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default DeckListItem;
