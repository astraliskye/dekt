import React from "react";

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
};

const SecondaryButton = ({ onClick, children }: Props) => {
  return (
    <button
      type="button"
      className="mx-auto rounded-lg px-3 py-1 transition hover:bg-gray-300 active:bg-gray-400 dark:bg-black dark:hover:bg-gray-800 dark:active:bg-gray-700"
      onClick={onClick ? () => onClick() : undefined}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
