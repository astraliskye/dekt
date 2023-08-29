import type { NextPage } from "next";
import Head from "next/head";
import DeckBuilder from "../components/deckbuilder/DeckBuilder";

const Builder: NextPage = () => {
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
      <main>
        <DeckBuilder />
      </main>
    </>
  );
};

export default Builder;
