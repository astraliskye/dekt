import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import { api } from "../utils/api";
import PrimaryButton from "../components/elements/PrimaryButton";
import DeckList from "../components/decklist/DeckList";
import Link from "next/link";
import Loading from "../components/elements/Loading";

const Collection: NextPage = () => {
  const { data: session } = useSession();
  const { data: decks, isLoading } =
    api.deck.getCurrentUserCollection.useQuery();

  if (isLoading) return <Loading />;

  if (!session)
    return (
      <>
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
        <title>Your Collection</title>
      </Head>
      <main className="mx-auto w-full max-w-2xl">
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
