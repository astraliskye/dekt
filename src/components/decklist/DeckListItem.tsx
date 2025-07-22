import Link from "next/link";
import React from "react";
import type { DeckWithCreator, DeckWithCreatorAndCards } from "../../types";
import Image from "next/image";

type Props = {
  deck: DeckWithCreatorAndCards;
};

const DeckListItem = ({ deck }: Props) => {
  // Function to get a random card image from the deck or a default
  const getCardImage = () => {
    if (deck.cards && deck.cards.length > 0) {
      const randomCard = deck.cards[Math.floor(Math.random() * deck.cards.length)];
      return randomCard!.image || "default-card.webp";
    }
    return "default-card.webp";
  };

  // Format the date in a more readable way
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      return `${Math.floor(diffDays / 7)} weeks ago`;
    } else {
      return date.toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <Link href={`/decks/${deck.id}`}>
      <div className="flex flex-col h-full bg-white dark:bg-dark-secondary rounded-xl shadow-md hover:shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:scale-[1.02]">
        {/* Card preview/header image */}
        <div className="relative h-40 w-full bg-gradient-to-r from-primary/30 to-primary/10 dark:from-primary/40 dark:to-primary/20 overflow-hidden">
          {deck.cards && deck.cards.length > 0 && (
            <div className="absolute inset-0 flex justify-center items-center opacity-20">
              <div className="transform -rotate-12">
                <Image
                  src={`https://dekt-card-images.s3.us-west-1.amazonaws.com/${getCardImage()}`}
                  alt="Deck preview"
                  width={120}
                  height={160}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
            <h2 className="text-xl font-bold text-white line-clamp-2">{deck.name}</h2>
          </div>
        </div>
        
        {/* Deck content */}
        <div className="flex-1 p-4">
          <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-4 mb-4">
            {deck.description || "No description provided."}
          </p>
          
          {/* Card count badge */}
          {deck.cards && (
            <div className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-xs font-medium mb-4">
              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              {deck.cards.length} cards
            </div>
          )}
        </div>
        
        {/* Footer with creator and date */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-800/30 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold mr-2">
              {deck.creator.name ? deck.creator.name.charAt(0).toUpperCase() : "?"}
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 truncate">
              {deck.creator.name || "Anonymous"}
            </span>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-500">
            {formatDate(deck.updatedAt)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default DeckListItem;
