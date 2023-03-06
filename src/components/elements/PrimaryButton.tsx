import React from "react";

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
};

const PrimaryButton = ({ onClick, children }: Props) => {
  return (
    <button
      className="mx-auto rounded-lg bg-red-600 px-3 py-1 text-white transition hover:bg-red-700 active:bg-red-900"
      onClick={onClick ? () => onClick() : undefined}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
