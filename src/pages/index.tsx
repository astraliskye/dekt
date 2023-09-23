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
      <main className="flex h-full flex-col items-center justify-center bg-white">
        <h1 className="flex items-center gap-4 pt-12 text-center text-4xl">
          Welcome to
          <Image
            alt="DEKT"
            src="/images/logo-plain.png"
            width={128}
            height={128}
          />
        </h1>
        <p className="max-w-2xl px-4 pb-12 text-center text-xl">
          The place for theory crafting your best Back 4 Blood builds!
        </p>
        <p className="px-4 text-center">
          Browse decks created by others, use their decks as inspiration, and
          create your own original decks to clean out those zombie hordes.
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
