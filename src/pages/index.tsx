import type { NextPage } from "next";
import Head from "next/head";
import PrimaryButton from "../components/elements/PrimaryButton";
import SecondaryButton from "../components/elements/SecondaryButton";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>DEKT</title>
        <meta property="og:title" content="DEKT" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://buildwithdekt.com" />
        <meta
          property="og:image"
          content="https://buildwithdekt.com/images/logo.png"
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
        <h1 className="py-12 text-center text-4xl">Welcome to DEKT!</h1>
        <p className="text-center text-lg">
          The place to theory craft Back 4 Blood builds to clear even the most
          difficult No Mercy lobbies.
        </p>
        <div className="mx-auto flex w-72 justify-between py-16">
          <Link href="/collection">
            <SecondaryButton>Browse Decks</SecondaryButton>
          </Link>
          <Link href="/builder">
            <PrimaryButton>Create Deck</PrimaryButton>
          </Link>
        </div>
      </main>
    </>
  );
};

export default Home;
