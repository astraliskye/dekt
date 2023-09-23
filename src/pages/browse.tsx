import { NextPage } from "next";
import React from "react";
import { api } from "../utils/api";
import Loading from "../components/elements/Loading";
import Error from "../components/elements/Error";
import DeckList from "../components/decklist/DeckList";
import Head from "next/head";

const Browse: NextPage = () => {
  const { data: decks, isLoading } = api.deck.getAll.useQuery();

  if (isLoading) return <Loading />;
  if (!decks) return <Error message="No decks found" />;

  return (
    <>
      <Head>
        <title>Browse</title>
      </Head>
      <main>
        <h1 className="py-12 text-center text-4xl">Browse Decks</h1>
        <DeckList decks={decks} />
      </main>
    </>
  );
};

export default Browse;
