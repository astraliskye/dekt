import type { NextPage } from "next";
import React, { useState } from "react";
import { api } from "../utils/api";
import Loading from "../components/elements/Loading";
import Error from "../components/elements/Error";
import DeckList from "../components/decklist/DeckList";
import Head from "next/head";

const Browse: NextPage = () => {
  const { data: decks, isLoading } = api.deck.getAll.useQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "name">("recent");

  if (isLoading) return <Loading />;
  if (!decks) return <Error message="No decks found" />;

  // Filter decks based on search term
  const filteredDecks = decks.filter(deck => 
    deck.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (deck.description && deck.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (deck.creator.name && deck.creator.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Sort decks based on selected option
  const sortedDecks = [...filteredDecks].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else {
      // For "popular" - this is a placeholder, you might want to implement actual popularity metrics
      return 0;
    }
  });

  return (
    <>
      <Head>
        <title>Browse Decks - DEKT</title>
        <meta name="description" content="Browse and discover Back 4 Blood decks created by the community" />
      </Head>
      <main className="min-h-screen bg-light-secondary dark:bg-dark pb-12">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent">
          <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Browse Decks
            </h1>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl">
              Discover and explore decks created by the community. Find inspiration for your next zombie-slaying adventure.
            </p>
          </div>
        </div>

        {/* Search and filter section */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="bg-white dark:bg-dark-secondary rounded-xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search Decks
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="search"
                    placeholder="Search by name, description, or creator"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
              <div className="sm:w-48">
                <label htmlFor="sort" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Sort By
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "recent" | "popular" | "name")}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="recent">Most Recent</option>
                  <option value="name">Name (A-Z)</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {filteredDecks.length} {filteredDecks.length === 1 ? 'Deck' : 'Decks'} Found
            </h2>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm("")}
                className="text-sm text-primary hover:text-primary-dark transition-colors"
              >
                Clear search
              </button>
            )}
          </div>

          {/* Deck list */}
          {filteredDecks.length > 0 ? (
            <DeckList decks={sortedDecks} />
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No decks found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your search or check back later for new decks
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Browse;
