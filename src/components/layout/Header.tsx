import React, { useEffect, useState } from "react";
import Link from "next/link";
import Auth from "./Auth";
import Image from "next/image";
import { useRouter } from "next/router";
import ThemeToggle from "../elements/ThemeToggle";

type Props = {
  menuOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
};

const Header = ({ menuOpen, setMenuOpen }: Props) => {
  const [navOpen, setNavOpen] = useState(false);
  const { pathname } = useRouter();

  useEffect(() => {
    setNavOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-primary/20 bg-white/80 backdrop-blur-md dark:bg-dark/80 dark:border-primary/30">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="z-20 flex items-center gap-4">
          <button
            className="cursor-pointer select-none p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Toggle navigation menu"
          >
            <svg viewBox="0 0 100 80" width="20" height="20">
              <rect fill="currentColor" width="100" height="12" rx="6" className="text-primary"></rect>
              <rect fill="currentColor" y="30" width="100" height="12" rx="6" className="text-primary"></rect>
              <rect fill="currentColor" y="60" width="100" height="12" rx="6" className="text-primary"></rect>
            </svg>
          </button>
          <Link href="/" className="flex items-center">
            <Image
              src="/images/logo-plain.png"
              width={48}
              height={48}
              alt="DEKT logo"
              className="transition-transform hover:scale-105"
            />
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Auth menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </div>
      </div>

      {/* left nav drawer */}
      <nav
        className={`${
          navOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 z-50 flex h-screen w-80 flex-col overflow-hidden bg-white dark:bg-dark shadow-2xl transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-center">
            <Image
              src="/images/logo-plain.png"
              width={48}
              height={48}
              alt="DEKT logo"
            />
          </div>
        </div>
        
        <div className="flex flex-col py-4">
          <Link
            className="flex items-center gap-3 px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 transition-colors"
            href="/"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </Link>
          <Link
            className="flex items-center gap-3 px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 transition-colors"
            href="/builder"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
            </svg>
            Build Deck
          </Link>
          <Link
            className="flex items-center gap-3 px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 transition-colors"
            href="/browse"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Browse Decks
          </Link>
          <Link
            className="flex items-center gap-3 px-6 py-3 text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary dark:hover:bg-primary/20 transition-colors"
            href="/collection"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Your Collection
          </Link>
        </div>
      </nav>
      
      {navOpen && (
        <div
          onClick={() => setNavOpen(false)}
          className="fixed top-0 z-40 h-screen w-screen bg-black/50 backdrop-blur-sm"
        ></div>
      )}
    </header>
  );
};

export default Header;
