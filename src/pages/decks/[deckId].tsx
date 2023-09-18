import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import CardList from "../../components/cardlist/CardList";
import SecondaryEffectList from "../../components/deckbuilder/SecondaryEffectList";
import StatList from "../../components/deckbuilder/StatList";
import { api } from "../../utils/api";
import GadgetList from "../../components/deckbuilder/GadgetList";
import Image from "next/image";
import Loading from "../../components/elements/Loading";

const ViewDeck: NextPage = () => {
  const { deckId } = useRouter().query as { deckId: string };

  if (!deckId) return <p>No deck id supplied</p>;

  const { data: deck, isLoading } = api.deck.getById.useQuery(deckId);

  if (isLoading) {
    return <Loading />;
  }

  if (!deck) return <p>{`Deck with ID ${deckId} not found`}</p>;

  return (
    <>
      <Head>
        <title>{deck.name}</title>
        <meta property="og:title" content={deck.name} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://buildwithdekt.com/" />
        <meta
          property="og:image"
          content="https://buildwithdekt.com/images/logo.png"
        />
        <meta
          property="og:description"
          content={deck.description || "No description"}
        />
        <meta name="theme-color" content="#dc2626" />

        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="description"
          content={deck.description || "No description"}
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h1 className="pt-12 text-center text-3xl font-bold">{deck.name}</h1>
        <p className="pb-12 text-center">{deck.description}</p>
        <div className="mx-auto flex w-11/12 flex-col items-center">
          <CardList cards={deck.cards} />
          <StatList cards={deck.cards} />
          <SecondaryEffectList cards={deck.cards} />
          <GadgetList cards={deck.cards} />
        </div>
      </main>
    </>
  );
};

export default ViewDeck;
