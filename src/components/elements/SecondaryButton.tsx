import React from "react";

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
};

const SecondaryButton = ({ onClick, children }: Props) => {
  return (
    <button
      type="button"
      className="rounded-lg bg-light px-3 py-1 transition hover:bg-light-shade active:bg-gray-400"
      onClick={onClick ? () => onClick() : undefined}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
