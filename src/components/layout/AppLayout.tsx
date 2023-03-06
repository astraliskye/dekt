import Link from "next/link";
import { useState } from "react";
import Auth from "./Auth";
import Toggle from "../elements/Toggle";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div
      onClick={() => setMenuOpen(false)}
      className={(darkMode ? "dark bg-black" : "") + " min-h-screen"}
    >
      <header className="mx-auto flex w-11/12 items-center justify-between border-b-8 border-red-600 py-2 dark:bg-black dark:text-white">
        <p className="flex items-center gap-4 text-2xl font-semibold">
          <Link href="/">
            DEKT<span className="text-red-600">.</span>
          </Link>
          <Toggle checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </p>
        <Auth menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </header>
      <div className="mx-auto w-11/12 pt-10">{children}</div>
      <footer className="py-24"></footer>
    </div>
  );
};

export default AppLayout;
