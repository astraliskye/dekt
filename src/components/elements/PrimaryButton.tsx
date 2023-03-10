import React from "react";

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
  submit?: boolean;
};

const PrimaryButton = ({ onClick, children, submit }: Props) => {
  return (
    <button
      className="mx-auto rounded-lg bg-primary bg-center px-3 py-1 font-semibold text-light transition hover:bg-primary-shade active:bg-primary-shader active:bg-cover"
      onClick={onClick ? () => onClick() : undefined}
      type={submit ? "submit" : "button"}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
