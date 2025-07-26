import React, { useState } from "react";
import { api } from "../../utils/api";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import CardList from "../../components/cardlist/CardList";
import StatList from "../../components/cardlist/StatList";
import SecondaryEffectList from "../../components/cardlist/SecondaryEffectList";
import GadgetList from "../../components/cardlist/GadgetList";
import DeckCompositionMeter from "../../components/cardlist/DeckCompositionMeter";
import Link from "next/link";
import Loading from "../../components/elements/Loading";
import { useSession } from "next-auth/react";
import Head from "next/head";
import SecondaryButton from "../../components/elements/SecondaryButton";
import PrimaryButton from "../../components/elements/PrimaryButton";


const ViewDeck = () => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const [activeTab, setActiveTab] = useState<'cards' | 'stats' | 'effects' | 'gadgets'>('cards');
  const deckId = useRouter().query.deckId as string;
  const { data: session } = useSession();

  const { data: deck, isLoading } = api.deck.getById.useQuery(deckId);
  const deleteDeck = api.deck.deleteById.useMutation({
    onSuccess: async () => {
      await router.push(`/collection`);
    },
    onError: (error: { message: string }) => {
      console.error("Failed to delete deck:", error.message);
    },
  });

  if (isLoading) return <Loading />;
  if (!deck) return <ErrorPage statusCode={404} />;

  // Format the date in a more readable way
  const formatDate = (date: Date) => {
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Head>
        <title>{deck.name} - DEKT</title>
        <meta name="description" content={deck.description || `View details of ${deck.name} deck for Back 4 Blood`} />
      </Head>
      <main className="min-h-screen bg-light-secondary dark:bg-dark pb-12">
        {/* Hero section with deck info */}
        <div className="bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent">
          <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Back button */}
            <Link href="/browse" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary mb-6 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Browse
            </Link>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {deck.name}
                </h1>

                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold mr-2">
                      {deck.creator.name ? deck.creator.name.charAt(0).toUpperCase() : "?"}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {deck.creator.name || "Anonymous"}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    {formatDate(deck.updatedAt)}
                  </span>
                </div>

                {deck.description && (
                  <p className="text-gray-700 dark:text-gray-300 max-w-2xl">
                    {deck.description}
                  </p>
                )}
              </div>

              {/* Action buttons */}
              {session?.user?.id === deck.creatorId && (
                <div className="flex items-center gap-3">
                  <Link href={`/builder?deckId=${deck.id}`}>
                    <SecondaryButton>
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </span>
                    </SecondaryButton>
                  </Link>
                  <SecondaryButton onClick={() => setIsDeleting(true)}>
                    <span className="flex items-center gap-2 text-red-600 dark:text-red-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </span>
                  </SecondaryButton>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Deck content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Deck composition meter */}
          <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Deck Composition
            </h2>
            <DeckCompositionMeter cards={deck.cards} />
          </div>

          {/* Tabs navigation */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
            <button
              onClick={() => setActiveTab('cards')}
              className={`px-4 py-3 font-medium text-sm border-b-2 whitespace-nowrap ${activeTab === 'cards'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
            >
              Cards ({deck.cards.length})
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`px-4 py-3 font-medium text-sm border-b-2 whitespace-nowrap ${activeTab === 'stats'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
            >
              Statistics
            </button>
            <button
              onClick={() => setActiveTab('effects')}
              className={`px-4 py-3 font-medium text-sm border-b-2 whitespace-nowrap ${activeTab === 'effects'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
            >
              Secondary Effects
            </button>
            <button
              onClick={() => setActiveTab('gadgets')}
              className={`px-4 py-3 font-medium text-sm border-b-2 whitespace-nowrap ${activeTab === 'gadgets'
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
            >
              Gadgets & Equipment
            </button>
          </div>

          {/* Tab content */}
          <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            {activeTab === 'cards' && (
              <div className="h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent pr-2">
                <CardList cards={deck.cards} />
              </div>
            )}

            {activeTab === 'stats' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Deck Statistics
                </h3>
                <StatList cards={deck.cards} />
              </div>
            )}

            {activeTab === 'effects' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Secondary Effects
                </h3>
                <SecondaryEffectList cards={deck.cards} />
              </div>
            )}

            {activeTab === 'gadgets' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Gadgets & Equipment
                </h3>
                <GadgetList cards={deck.cards} />
              </div>
            )}
          </div>

          {/* Clone deck button */}
          <div className="mt-8 text-center">
            <Link href={`/builder`}>
              <PrimaryButton>
                <span className="flex items-center gap-2 px-4">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Create Similar Deck
                </span>
              </PrimaryButton>
            </Link>
          </div>
        </div>

        {/* Delete confirmation modal */}
        {isDeleting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-2xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Delete Deck
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                Are you sure you want to delete this deck? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <SecondaryButton onClick={() => setIsDeleting(false)}>
                  Cancel
                </SecondaryButton>
                <PrimaryButton onClick={() => deleteDeck.mutate(deck.id)}>
                  <span className="flex items-center gap-2 text-white">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Deck
                  </span>
                </PrimaryButton>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
};



export default ViewDeck;
