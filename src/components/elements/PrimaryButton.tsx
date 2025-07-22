import React from "react";

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
  submit?: boolean;
  className?: string;
};

const PrimaryButton = ({ onClick, children, submit, className = "" }: Props) => {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:bg-primary-dark hover:shadow-xl hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark ${className}`}
      onClick={onClick ? () => onClick() : undefined}
      type={submit ? "submit" : "button"}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
