import React from "react";
import Logo from "./Logo";
import Link from "next/link";
import Auth from "./Auth";

type Props = {
  menuOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
};

const Header = ({ menuOpen, setMenuOpen }: Props) => {
  return (
    <header className="mx-auto flex h-[60px] w-11/12 items-center justify-between border-b-2 border-primary py-2">
      <Link href="/">
        <Logo />
      </Link>
      <Auth menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </header>
  );
};

export default Header;
