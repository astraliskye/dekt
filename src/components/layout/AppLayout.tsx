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
      className={
        (darkMode ? "dark bg-dark text-light " : " bg-light text-dark ") +
        (menuOpen ? "overflow-hidden " : "overflow-auto ") +
        "h-screen"
      }
    >
      <header className="mx-auto flex min-h-[90px] w-11/12 items-center justify-between border-b-8 border-primary py-2">
        <p className="flex items-center gap-4 text-2xl font-semibold">
          <Link href="/">
            DEKT<span className="text-primary">.</span>
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
