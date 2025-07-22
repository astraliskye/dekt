import { useState } from "react";
import type { CardWithEffects, DeckWithCreatorAndCards } from "../../types";
import { api } from "../../utils/api";
import SortableCardList from "../cardlist/SortableCardList";
import StatList from "../cardlist/StatList";
import GadgetList from "../cardlist/GadgetList";
import SecondaryEffectList from "../cardlist/SecondaryEffectList";
import DeckCompositionMeter from "../cardlist/DeckCompositionMeter";
import PrimaryButton from "../elements/PrimaryButton";
import SecondaryButton from "../elements/SecondaryButton";
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
import Card from "./Card";
import { sortedCards } from "../../utils/front-end";
import Loading from "../elements/Loading";

type Props = {
  deck?: DeckWithCreatorAndCards;
};

const DeckBuilder = ({ deck }: Props) => {
  const router = useRouter();
  const { data: allCards, isLoading } = api.card.getAll.useQuery();

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
  const [errorMessage, setErrorMessage] = useState("");
  const [showSaveForm, setShowSaveForm] = useState(false);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedAffinity, setSelectedAffinity] = useState<string>("All");

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

  // Filter cards based on search term, type, and affinity
  const getFilteredCards = () => {
    if (!allCards) return [];
    
    return sortedCards(allCards).filter((card) => {
      const matchesSearch = cardContainsTerm(searchTerm, card);
      const matchesType = selectedType === "All" || card.type === selectedType;
      const matchesAffinity = selectedAffinity === "All" || card.affinity === selectedAffinity;
      
      return matchesSearch && matchesType && matchesAffinity;
    });
  };

  // Get unique types and affinities for filter options
  const getFilterOptions = () => {
    if (!allCards) return { types: [], affinities: [] };
    
    const types = [...new Set(allCards.map(card => card.type))].sort();
    const affinities = [...new Set(allCards.map(card => card.affinity))].sort();
    
    return { types, affinities };
  };

  const { types, affinities } = getFilterOptions();
  const sensors = useSensors(touchSensor, mouseSensor)

  if (isLoading) return <Loading />;

  return (
    <>
      <Head>
        <title>Deck Builder - DEKT</title>
      </Head>
      <main className="min-h-screen bg-light-secondary dark:bg-dark">
        <DndContext
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 bg-white/90 dark:bg-dark-secondary/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
            <div className="px-4 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Deck Builder
                </h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    {cardList.length}/15 Cards
                  </div>
                  {cardList.length > 0 && (
                    <PrimaryButton onClick={() => setShowSaveForm(true)}>
                      Save Deck
                    </PrimaryButton>
                  )}
                </div>
              </div>
              
              {/* Deck Composition Meter */}
              {cardList.length > 0 && (
                <div className="mt-3">
                  <DeckCompositionMeter cards={cardList} />
                </div>
              )}
            </div>
          </div>

          {/* Save Form Modal */}
          {showSaveForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-2xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Save Your Deck
                  </h2>
                  <button
                    onClick={() => setShowSaveForm(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
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
            </div>
          )}

          {/* Content */}
          <div className="px-4 py-6 space-y-6">
            {/* Current Deck Section */}
            <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Your Deck
                </h2>
                {cardList.length === 0 && (
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Select cards below to build your deck
                  </span>
                )}
              </div>
              <SortableCardList
                cards={cardList}
                handleCardClick={removeCardFromList}
              />
            </div>

            {/* Deck Stats */}
            {cardList.length > 0 && (
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Statistics
                  </h3>
                  <StatList cards={cardList} />
                </div>

                <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Secondary Effects
                  </h3>
                  <SecondaryEffectList cards={cardList} />
                </div>

                <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Equipment
                  </h3>
                  <GadgetList cards={cardList} />
                </div>
              </div>
            )}

            {/* Card Collection Section */}
            <div className="space-y-6">
              {/* Filters */}
              <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Find Cards
                </h3>
                
                <div className="space-y-4">
                  {/* Search */}
                  <div>
                    <input
                      type="text"
                      placeholder="Search cards by name, type, or effects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  {/* Type and Affinity Filters */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="All">All Types</option>
                      {types.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    
                    <select
                      value={selectedAffinity}
                      onChange={(e) => setSelectedAffinity(e.target.value)}
                      className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="All">All Affinities</option>
                      {affinities.map((affinity) => (
                        <option key={affinity} value={affinity}>
                          {affinity}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Clear Filters */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedType("All");
                        setSelectedAffinity("All");
                      }}
                      className="text-sm text-primary hover:text-primary-dark transition-colors"
                    >
                      Clear filters
                    </button>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {getFilteredCards().length} cards available
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Grid */}
              <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Available Cards
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {getFilteredCards().map((card) => (
                    <Card
                      key={card.id}
                      card={card}
                      isSelected={cardList.some((c) => c.id === card.id)}
                      onClick={() => toggleCardInCollection(card)}
                    />
                  ))}
                </div>
                
                {getFilteredCards().length === 0 && (
                  <div className="text-center py-12">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0m6 0V5a2 2 0 00-2-2H9a2 2 0 00-2 2v1.306m8 0V7a2 2 0 012 2v6.414l-1.293-1.293a1 1 0 00-1.414 0L12 16.414l-2.293-2.293a1 1 0 00-1.414 0L7 15.414V9a2 2 0 012-2h8a2 2 0 012 2v-.694z" />
                    </svg>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                      No cards match your filters
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
                      Try adjusting your search or filter criteria
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DndContext>
      </main>
    </>
  );
};

// Helper function for card filtering
function cardContainsTerm(searchTerm: string, card: CardWithEffects) {
  if (!searchTerm) return true;
  
  const term = searchTerm.toLowerCase();
  
  if (
    card.name.toLowerCase().includes(term) ||
    card.type.toLowerCase().includes(term) ||
    card.affinity.toLowerCase().includes(term) ||
    card.originalEffects.toLowerCase().includes(term)
  ) {
    return true;
  }

  for (const stat of card.stats) {
    if (stat.effect.toLowerCase().includes(term)) {
      return true;
    }
  }

  return false;
}

export default DeckBuilder;
