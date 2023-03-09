import React from "react";

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
  submit?: boolean;
};

const PrimaryButton = ({ onClick, children, submit }: Props) => {
  return (
    <button
      className="mx-auto rounded-lg bg-red-600 px-3 py-1 text-white transition hover:bg-red-700 active:bg-red-900"
      onClick={onClick ? () => onClick() : undefined}
      type={submit ? "submit" : "button"}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
