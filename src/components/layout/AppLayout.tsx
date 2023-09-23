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
      className="flex h-screen flex-col"
    >
      <Header menuOpen={authMenuOpen} setMenuOpen={setAuthMenuOpen} />
      <div className="mx-auto w-full max-w-4xl flex-grow bg-white shadow-xl shadow-black">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
