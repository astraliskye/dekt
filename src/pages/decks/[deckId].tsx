import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import CardList from "../../components/cardlist/CardList";
import GadgetList from "../../components/deckbuilder/GadgetList";
import SecondaryEffectList from "../../components/deckbuilder/SecondaryEffectList";
import StatList from "../../components/deckbuilder/StatList";
import { api } from "../../utils/api";

const ViewDeck: NextPage = () => {
  const { deckId } = useRouter().query as { deckId: string };

  if (!deckId) return <p>No deck id supplied</p>;

  const { data: deck } = api.deck.getById.useQuery(deckId);

  if (!deck) return <p>{`Deck with ID ${deckId} not found`}</p>;

  return (
    <div>
      <h1 className="text-center text-5xl">{deck.name}</h1>
      <div className="mx-auto flex flex-col gap-10">
        <CardList cards={deck.cards} />
        <StatList cards={deck.cards} />
        <SecondaryEffectList cards={deck.cards} />
        <GadgetList cards={deck.cards} />
      </div>
    </div>
  );
};

export default ViewDeck;
