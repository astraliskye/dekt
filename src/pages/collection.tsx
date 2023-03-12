import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import { api } from "../utils/api";
import PrimaryButton from "../components/elements/PrimaryButton";
import DeckList from "../components/decklist/DeckList";

const Collection: NextPage = () => {
  const { data: session } = useSession();
  const { data: decks } = api.deck.getCurrentUserCollection.useQuery();

  if (!session)
    return (
      <>
        <p className="text-center">
          <PrimaryButton onClick={() => void signIn("discord")}>
            Sign In
          </PrimaryButton>{" "}
          to see your collection!
        </p>
      </>
    );

  return (
    <>
      <Head>
        <title>DEKT</title>
        <meta property="og:title" content="DEKT" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://gleeful-pudding-f9510a.netlify.app/"
        />
        <meta
          property="og:image"
          content="https://gleeful-pudding-f9510a.netlify.app/images/cards/Flawless.webp"
        />
        <meta property="og:description" content="Your deck collection" />
        <meta name="theme-color" content="#dc2626" />

        <meta name="twitter:card" content="summary_large_image" />

        <meta name="description" content="Your deck collection" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h1 className="py-12 text-center text-3xl">Your Collection</h1>

        {decks ? <DeckList decks={decks} /> : <p>Nothing to show!</p>}
      </main>
    </>
  );
};

export default Collection;
