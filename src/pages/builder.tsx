import type { NextPage } from "next";
import Head from "next/head";
import DeckBuilder from "../components/deckbuilder/DeckBuilder";
import { useRouter } from "next/router";
import { api } from "../utils/api";
import Loading from "../components/elements/Loading";
import ErrorPage from "next/error";

const Builder: NextPage = () => {
  const deckId = useRouter().query.deckId as string | undefined;

  if (!deckId)
    return (
      <main>
        <DeckBuilder />
      </main>
    );

  const { data: deck, isLoading } = api.deck.getById.useQuery(deckId);

  if (isLoading) return <Loading />;
  if (!deck) return <ErrorPage statusCode={404} />;

  return (
    <>
      <Head>
        <title>Builder</title>
      </Head>
      <main>
        <DeckBuilder deck={deck} />
      </main>
    </>
  );
};

export default Builder;
