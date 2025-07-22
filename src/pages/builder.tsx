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
      <>
        <Head>
          <title>Deck Builder - DEKT</title>
          <meta name="description" content="Build your perfect Back 4 Blood deck with our intuitive mobile-optimized deck builder." />
        </Head>
        <DeckBuilder />
      </>
    );

  const { data: deck, isLoading } = api.deck.getById.useQuery(deckId);

  if (isLoading) return <Loading />;
  if (!deck) return <ErrorPage statusCode={404} />;

  return (
    <>
      <Head>
        <title>Edit Deck - DEKT</title>
        <meta name="description" content="Edit your Back 4 Blood deck build with our mobile-optimized deck builder." />
      </Head>
      <DeckBuilder deck={deck} />
    </>
  );
};

export default Builder;
