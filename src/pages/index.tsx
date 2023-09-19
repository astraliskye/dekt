import type { NextPage } from "next";
import PrimaryButton from "../components/elements/PrimaryButton";
import SecondaryButton from "../components/elements/SecondaryButton";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>DEKT.</title>
      </Head>
      <main className="flex flex-col items-center justify-center">
        <h1 className="flex gap-4 py-12 text-center text-4xl">
          Welcome to
          <Image
            alt="DEKT"
            src="/images/logo-plain.png"
            width={92}
            height={92}
          />
        </h1>
        <p className="text-center text-lg">
          The place for theory crafting the best Back 4 Blood builds! Browse
          decks created by others, use their decks as
        </p>
        <div className="flex w-72 justify-between py-16">
          <Link href="/browse">
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
