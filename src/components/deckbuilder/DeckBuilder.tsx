import { useState } from "react";
import type { CardWithEffects, DeckWithCreatorAndCards } from "../../types";
import { api } from "../../utils/api";
import CardCollection from "./CardCollection";
import SortableCardList from "../cardlist/SortableCardList";
import StatList from "../cardlist/StatList";
import GadgetList from "../cardlist/GadgetList";
import SecondaryEffectList from "../cardlist/SecondaryEffectList";
import { useRouter } from "next/router";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import DeckForm from "./DeckForm";
import Head from "next/head";

enum ViewState {
  Collection,
  CardList,
  Form,
}

type Props = {
  deck?: DeckWithCreatorAndCards;
};

const DeckBuilder = ({ deck }: Props) => {
  const router = useRouter();

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      distance: 1,
    },
  });

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 1,
    },
  });

  const saveDeck = api.deck.create.useMutation({
    onSuccess: async () => {
      await router.push(`/collection`);
    },
    onError: (error: { message: string }) => {
      setErrorMessage(error.message);
    },
  });

  const replaceDeck = api.deck.replace.useMutation({
    onSuccess: async () => {
      await router.push(`/collection`);
    },
    onError: (error: { message: string }) => {
      setErrorMessage(error.message);
    },
  });

  const [cardList, setCardList] = useState(deck ? deck.cards : []);
  const [viewState, setViewState] = useState(ViewState.CardList);
  const [errorMessage, setErrorMessage] = useState("");

  const removeCardFromList = (cardId: string) =>
    setCardList(cardList.filter((c: CardWithEffects) => c.id !== cardId));

  const toggleCardInCollection = (card: CardWithEffects) => {
    const filteredList = cardList.filter((c: CardWithEffects) => c.id !== card.id);

    if (filteredList.length === cardList.length) {
      if (cardList.length >= 15) {
        return;
      }
      setCardList((prev: CardWithEffects[]) => [...prev, card]);
    } else {
      setCardList(() => filteredList);
    }
  };

  const handleSubmit = (name: string, description: string) => {
    if (deck) {
      replaceDeck.mutate({
        id: deck.id,
        name,
        description: description === "" ? undefined : description,
        cards: cardList.map((card: CardWithEffects, i: number) => ({ ...card, position: i })),
      });
    } else {
      saveDeck.mutate({
        name,
        description: description === "" ? undefined : description,
        cards: cardList.map((card: CardWithEffects, i: number) => ({ ...card, position: i })),
      });
    }
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const [i1, i2] = [
        cardList.findIndex((card: CardWithEffects) => card.id === active.id),
        cardList.findIndex((card: CardWithEffects) => card.id === over.id),
      ];

      setCardList((cards: CardWithEffects[]) => {
        const temp = cards.at(i1);

        if (temp !== undefined) {
          const result = cards.filter((card: CardWithEffects) => card.id !== temp.id);
          result.splice(i2, 0, temp);
          return [...result];
        }

        return [...cards];
      });
    }
  }

  const getViewTitle = () => {
    switch (viewState) {
      case ViewState.CardList:
        return "Your Deck";
      case ViewState.Collection:
        return "Card Collection";
      case ViewState.Form:
        return "Save Deck";
      default:
        return "Deck Builder";
    }
  };

  return (
    <>
      <Head>
        <title>Deck Builder - DEKT</title>
      </Head>
      <main className="min-h-screen bg-light-secondary dark:bg-dark pb-20">
        <DndContext
          onDragEnd={handleDragEnd}
          sensors={useSensors(touchSensor, mouseSensor)}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white/80 dark:bg-dark-secondary/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
            <div className="px-4 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {getViewTitle()}
                </h1>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    {cardList.length}/15 Cards
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 py-6">
            {viewState === ViewState.CardList && (
              <div className="space-y-6">
                {/* Deck Overview */}
                <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Current Build
                    </h2>
                    {cardList.length === 0 && (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Add cards to get started
                      </span>
                    )}
                  </div>
                  <SortableCardList
                    cards={cardList}
                    handleCardClick={removeCardFromList}
                  />
                </div>

                {/* Stats */}
                {cardList.length > 0 && (
                  <>
                    <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Deck Statistics
                      </h3>
                      <StatList cards={cardList} />
                    </div>

                    <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Secondary Effects
                      </h3>
                      <SecondaryEffectList cards={cardList} />
                    </div>

                    <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Gadgets & Equipment
                      </h3>
                      <GadgetList cards={cardList} />
                    </div>
                  </>
                )}
              </div>
            )}

            {viewState === ViewState.Collection && (
              <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6">
                <CardCollection
                  handleCardClick={toggleCardInCollection}
                  cardList={cardList}
                />
              </div>
            )}

            {viewState === ViewState.Form && (
              <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6">
                {errorMessage && (
                  <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-red-700 dark:text-red-400">{errorMessage}</p>
                  </div>
                )}
                {deck ? (
                  <DeckForm
                    submitForm={handleSubmit}
                    initialName={deck.name}
                    initialDescription={deck.description}
                  />
                ) : (
                  <DeckForm submitForm={handleSubmit} />
                )}
              </div>
            )}
          </div>

          {/* Mobile Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 z-20 bg-white dark:bg-dark-secondary border-t border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="flex">
              <button
                className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition-colors ${
                  viewState === ViewState.CardList
                    ? "bg-primary text-white"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
                onClick={() => setViewState(ViewState.CardList)}
              >
                <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span className="text-xs font-medium">Deck</span>
              </button>

              <button
                className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition-colors ${
                  viewState === ViewState.Collection
                    ? "bg-primary text-white"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
                onClick={() => setViewState(ViewState.Collection)}
              >
                <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span className="text-xs font-medium">Cards</span>
              </button>

              <button
                className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition-colors ${
                  viewState === ViewState.Form
                    ? "bg-primary text-white"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
                onClick={() => setViewState(ViewState.Form)}
                disabled={cardList.length === 0}
              >
                <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-xs font-medium">Save</span>
              </button>
            </div>
          </div>
        </DndContext>
      </main>
    </>
  );
};

export default DeckBuilder;
