import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import PrimaryButton from "../elements/PrimaryButton";

type Props = {
  menuOpen: boolean;
  setMenuOpen: (isOpen: boolean) => void;
};

const Auth = ({ menuOpen, setMenuOpen }: Props) => {
  const { data: sessionData } = useSession();

  return (
    <div>
      {sessionData ? (
        <div className="relative flex items-center gap-4">
          <div
            className={`flex cursor-pointer select-none items-center gap-2 border-2 border-white px-4 py-2 transition hover:bg-gray-200 dark:border-black dark:hover:bg-gray-800`}
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
              menuOpen ? "scale-y-100 opacity-100" : "scale-y-90 opacity-0"
            } absolute top-16 right-0 z-50 flex w-36 origin-top flex-col gap-2 overflow-hidden border-2 border-gray-200 bg-white py-2 transition-appear dark:border-gray-800 dark:bg-black`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <span className="cursor-pointer px-2 py-1 transition hover:bg-gray-200 dark:hover:bg-gray-800">
              Edit Profile
            </span>
            <span className="cursor-pointer px-2 py-1 transition hover:bg-gray-200 dark:hover:bg-gray-800">
              About
            </span>
            <span className="cursor-pointer px-2 py-1 transition hover:bg-gray-200 dark:hover:bg-gray-800">
              Donate
            </span>
            <hr />
            <button
              className="w-full px-2 py-1 text-left transition hover:bg-gray-200 dark:hover:bg-gray-800"
              onClick={() => void signOut()}
            >
              Sign Out
            </button>
          </div>
        </div>
      ) : (
        <div>
          <PrimaryButton onClick={() => void signIn("discord")}>
            Sign In
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default Auth;
