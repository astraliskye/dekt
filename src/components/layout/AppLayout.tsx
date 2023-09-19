import { useState } from "react";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  const [authMenuOpen, setAuthMenuOpen] = useState(false);

  return (
    <div onClick={() => setAuthMenuOpen(false)} className="h-screen">
      <Header menuOpen={authMenuOpen} setMenuOpen={setAuthMenuOpen} />
      <div className="h-full">{children}</div>
    </div>
  );
};

export default AppLayout;
