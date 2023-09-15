import React, { useEffect, useState } from "react";
import Link from "next/link";
import Auth from "./Auth";
import dektLogo from "./dekt-logo.png";
import Image from "next/image";
import { useRouter } from "next/router";

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
    <header className="sticky top-0 border-b-2 border-primary bg-white">
      <div className="flex items-center justify-between p-4">
        <div className="z-20 flex items-center gap-4 bg-white">
          <p
            className="cursor-pointer select-none"
            onClick={() => setNavOpen(!navOpen)}
          >
            <svg viewBox="0 0 100 80" width="32" height="32">
              <rect fill="#dc2626" width="100" height="12"></rect>
              <rect fill="#dc2626" y="30" width="100" height="12"></rect>
              <rect fill="#dc2626" y="60" width="100" height="12"></rect>
            </svg>
          </p>
          <Link href="/">
            <Image src={dektLogo} width={64} height={64} alt="website logo" />
          </Link>
        </div>
        <Auth menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </div>
      <nav
        className={`${
          navOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 z-50 flex h-screen flex-col items-center gap-4 overflow-hidden bg-white py-4 transition`}
      >
        <Link
          className="w-full cursor-pointer select-none py-2 px-12 text-center transition hover:bg-light-shade"
          href="/"
        >
          Home
        </Link>
        <Link
          className="w-full cursor-pointer select-none py-2 px-12 text-center transition hover:bg-light-shade"
          href="/builder"
        >
          Build
        </Link>
        <Link
          className="w-full cursor-pointer select-none py-2 px-12 text-center transition hover:bg-light-shade"
          href="/decks"
        >
          Browse
        </Link>
        <Link
          className="w-full cursor-pointer select-none py-2 px-12 text-center transition hover:bg-light-shade"
          href="/collection"
        >
          Your Collection
        </Link>
      </nav>
      {navOpen && (
        <div
          onClick={() => setNavOpen(false)}
          className="fixed top-0 z-40 h-screen w-screen bg-black opacity-50"
        ></div>
      )}
    </header>
  );
};

export default Header;
