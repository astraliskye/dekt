import React, { useState } from "react";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import CardList from "../../components/cardlist/CardList";
import StatList from "../../components/cardlist/StatList";
import SecondaryEffectList from "../../components/cardlist/SecondaryEffectList";
import GadgetList from "../../components/cardlist/GadgetList";
import Link from "next/link";
import Loading from "../../components/elements/Loading";
import { useSession } from "next-auth/react";
import Head from "next/head";
import SecondaryButton from "../../components/elements/SecondaryButton";
import PrimaryButton from "../../components/elements/PrimaryButton";

const ViewDeck = () => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const deckId = useRouter().query.deckId as string;
  const { data: session } = useSession();

  const { data: deck, isLoading } = api.deck.getById.useQuery(deckId);
  const deleteDeck = api.deck.deleteById.useMutation({
    onSuccess: async () => {
      await router.push(`/collection`);
    },
    onError: (error: { message: string }) => {
      setErrorMessage(error.message);
    },
  });

  if (isLoading) return <Loading />;
  if (!deck) return <ErrorPage statusCode={404} />;

  return (
    <>
      <Head>
        <title>{deck.name}</title>
      </Head>
      <main className="mx-auto flex w-full max-w-2xl flex-col items-center">
        {session?.user?.id === deck.creatorId && (
          <div className="flex w-full items-center justify-end gap-4 py-4">
            <SecondaryButton onClick={() => setIsDeleting(true)}>
              Delete
            </SecondaryButton>
            <Link href={`/builder?deckId=${deck.id}`}>Edit</Link>
          </div>
        )}
        {isDeleting && (
          <>
            <div className="fixed z-10 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50">
              <DeleteConfirmation
                cancelDeleting={() => setIsDeleting(false)}
                deleteDeck={() => deleteDeck.mutate(deck.id)}
              />
            </div>
          </>
        )}
        <h1 className="pt-12 text-3xl font-bold">{deck.name}</h1>
        <p className="pb-8">{deck.description}</p>
        <CardList cards={deck.cards} />
        <StatList cards={deck.cards} />
        <SecondaryEffectList cards={deck.cards} />
        <GadgetList cards={deck.cards} />
      </main>
    </>
  );
};

type DeleteConfirmationProps = {
  cancelDeleting: () => void;
  deleteDeck: () => void;
};

const DeleteConfirmation = ({
  cancelDeleting,
  deleteDeck,
}: DeleteConfirmationProps) => {
  return (
    <div className="z-20 rounded-xl bg-white p-4">
      <p className="p-4">Are you sure you want to delete this deck?</p>
      <div className="flex justify-end gap-4 p-4">
        <SecondaryButton onClick={cancelDeleting}>No</SecondaryButton>
        <PrimaryButton onClick={deleteDeck}>Yes</PrimaryButton>
      </div>
    </div>
  );
};

export default ViewDeck;
