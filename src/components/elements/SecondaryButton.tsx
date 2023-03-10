import React from "react";

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
};

const SecondaryButton = ({ onClick, children }: Props) => {
  return (
    <button
      type="button"
      className="mx-auto rounded-lg bg-light px-3 py-1 transition hover:bg-light-shade active:bg-gray-400 dark:bg-dark dark:hover:bg-dark-tint dark:active:bg-gray-700"
      onClick={onClick ? () => onClick() : undefined}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
