import Link from "next/link";
import React from "react";
import type { DeckWithCreator } from "../../types";

type Props = {
  deck: DeckWithCreator;
};

const DeckListItem = ({ deck }: Props) => {
  return (
    <Link href={`/decks/${deck.id}`}>
      <div className="flex min-h-[100px] flex-col rounded-lg border-2 border-light-shade p-4 transition hover:bg-light-shade dark:border-dark-tint dark:hover:bg-dark-tint">
        <h2 className="py-2 text-2xl font-bold capitalize">{deck.name}</h2>
        <p className="flex-grow">{deck.description}</p>
        <div className="flex w-full items-center justify-between">
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
