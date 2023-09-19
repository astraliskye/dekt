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
            className={`${
              menuOpen ? "bg-light-shade" : ""
            } flex cursor-pointer select-none items-center gap-2 rounded-full px-2 py-2 transition hover:bg-light-shade`}
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
          >
            {sessionData.user?.image && (
              <Image
                src={sessionData.user.image}
                alt="profile picture"
                width={42}
                height={42}
                className="rounded-full"
              />
            )}
          </div>
          <div
            className={`${
              menuOpen
                ? "scale-y-100 opacity-100"
                : "hidden scale-y-90 opacity-0"
            } absolute top-16 right-0 z-50 flex w-36 origin-top flex-col gap-2 overflow-hidden rounded-lg border-2 border-light-shade bg-white py-2`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
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
