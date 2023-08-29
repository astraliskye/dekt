import { useState } from "react";
import Header from "./Header";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      onClick={() => setMenuOpen(false)}
      className="min-h-screen bg-white text-black"
    >
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className="h-full">{children}</div>
    </div>
  );
};

export default AppLayout;
