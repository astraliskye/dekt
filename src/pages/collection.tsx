import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import { api } from "../utils/api";
import PrimaryButton from "../components/elements/PrimaryButton";
import DeckList from "../components/decklist/DeckList";
import Link from "next/link";

const Collection: NextPage = () => {
  const { data: session } = useSession();
  const { data: decks } = api.deck.getCurrentUserCollection.useQuery();

  if (!session)
    return (
      <>
        <Head>
          <title>DEKT</title>
          <meta property="og:title" content="DEKT" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://buildwithdekt.com/" />
          <meta
            property="og:image"
            content="https://buildwithdekt.com/images/logo.png"
          />
          <meta
            property="og:description"
            content="View your collection of Back 4 Blood decks"
          />
          <meta name="theme-color" content="#dc2626" />

          <meta name="twitter:card" content="summary_large_image" />

          <meta
            name="description"
            content="View your collection of Back 4 Blood decks"
          />
          <link rel="icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>

        <main className="py-12 text-center">
          <PrimaryButton onClick={() => void signIn("discord")}>
            Sign In
          </PrimaryButton>{" "}
          to see your collection!
        </main>
      </>
    );

  return (
    <>
      <Head>
        <title>DEKT</title>
        <meta property="og:title" content="DEKT" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://buildwithdekt.com/" />
        <meta
          property="og:image"
          content="https://buildwithdekt.com/images/logo.png"
        />
        <meta
          property="og:description"
          content="View your collection of Back 4 Blood decks"
        />
        <meta name="theme-color" content="#dc2626" />

        <meta name="twitter:card" content="summary_large_image" />

        <meta
          name="description"
          content="View your collection of Back 4 Blood decks"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        {decks && decks.length > 0 ? (
          <div>
            <h1 className="py-12 text-center text-4xl">Your Collection</h1>
            <DeckList decks={decks} />
          </div>
        ) : (
          <p className="py-12 text-center">
            Nothing in your collection yet! Try{" "}
            <Link
              className="rounded-md border-2 border-primary px-1"
              href="/builder"
            >
              Building a Deck
            </Link>
          </p>
        )}
      </main>
    </>
  );
};

export default Collection;
