import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: AppLayoutProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div onClick={() => setMenuOpen(false)}>
      <header className="mx-auto flex w-11/12 items-center justify-between border-b-8 border-red-600 py-2">
        <p className="text-2xl font-semibold">
          <Link href="/">
            DEKT<span className="text-red-600">.</span>
          </Link>
        </p>
        <AuthShowcase menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </header>
      <div className="mx-auto w-11/12 pt-10">{children}</div>
      <footer className="py-24"></footer>
    </div>
  );
};

interface AuthShowcaseProps {
  menuOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
}

const AuthShowcase = ({ menuOpen, setMenuOpen }: AuthShowcaseProps) => {
  const { data: sessionData } = useSession();

  return (
    <div>
      {sessionData ? (
        <div className="relative flex items-center gap-4">
          <div
            className={`flex cursor-pointer select-none items-center gap-2 border-2 border-white px-4 py-2 transition ${
              menuOpen
                ? "border-r-red-600 border-t-red-600 bg-gray-200"
                : "hover:border-r-red-600 hover:border-t-red-600 hover:bg-gray-200"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
          >
            {sessionData.user?.image && (
              <Image
                src={sessionData.user.image}
                alt="profile picture"
                width="50"
                height="50"
                className="rounded-full"
              />
            )}
            <span>{sessionData.user?.name}</span>
          </div>
          <div
            className={`${
              menuOpen ? "scale-y-100" : "scale-y-0"
            } absolute top-16 right-0 z-50 flex w-36 origin-top flex-col gap-2 overflow-hidden border-2 border-gray-200 bg-white py-2 transition`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <span className="cursor-pointer px-2 py-1 transition hover:bg-gray-200">
              Edit Profile
            </span>
            <span className="cursor-pointer px-2 py-1 transition hover:bg-gray-200">
              About
            </span>
            <span className="cursor-pointer px-2 py-1 transition hover:bg-gray-200">
              Donate
            </span>
            <hr />
            <button
              className="w-full px-2 py-1 text-left transition hover:bg-gray-200"
              onClick={() => void signOut()}
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button
            className="border-2 border-white px-2 py-1 transition hover:border-r-red-600 hover:border-t-red-600 hover:bg-gray-200"
            onClick={() => void signIn("discord")}
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
};

export default AppLayout;
