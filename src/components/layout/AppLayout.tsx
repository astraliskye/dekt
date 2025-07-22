import { useState } from "react";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  const [authMenuOpen, setAuthMenuOpen] = useState(false);

  return (
    <div
      onClick={() => setAuthMenuOpen(false)}
      className="flex h-screen flex-col bg-light-secondary dark:bg-dark transition-colors"
    >
      <Header menuOpen={authMenuOpen} setMenuOpen={setAuthMenuOpen} />
      <div className="mx-auto w-full max-w-6xl flex-grow bg-white dark:bg-dark-secondary shadow-xl shadow-black/10 dark:shadow-black/30 transition-colors">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
