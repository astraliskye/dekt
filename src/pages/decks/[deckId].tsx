import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import CardList from "../../components/cardlist/CardList";
import DeckComposition from "../../components/cardlist/DeckComposition";
import GadgetList from "../../components/deckbuilder/GadgetList";
import SecondaryEffectList from "../../components/deckbuilder/SecondaryEffectList";
import StatList from "../../components/deckbuilder/StatList";
import H1 from "../../components/elements/H1";
import { api } from "../../utils/api";

const ViewDeck: NextPage = () => {
  const { deckId } = useRouter().query as { deckId: string };

  if (!deckId) return <p>No deck id supplied</p>;

  const { data: deck } = api.deck.getById.useQuery(deckId);

  if (!deck) return <p>{`Deck with ID ${deckId} not found`}</p>;

  return (
    <>
      <Head>
        <title>{deck.name}</title>
        <meta property="og:title" content={deck.name} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://gleeful-pudding-f9510a.netlify.app/"
        />
        <meta
          property="og:image"
          content="https://gleeful-pudding-f9510a.netlify.app/images/cards/Flawless.webp"
        />
        <meta
          property="og:description"
          content="Theory craft your Back4Blood builds!"
        />
        <meta name="theme-color" content="#dc2626" />

        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="description"
          content="Theory craft your Back4Blood builds!"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <H1>{deck.name}</H1>
      <p className="mx-auto max-w-xl text-center">{deck.description}</p>
      <div className="mx-auto flex flex-col gap-10">
        <DeckComposition cards={deck.cards} />
        <CardList cards={deck.cards} />
        <StatList cards={deck.cards} />
        <SecondaryEffectList cards={deck.cards} />
        <GadgetList cards={deck.cards} />
      </div>
    </>
  );
};

export default ViewDeck;
