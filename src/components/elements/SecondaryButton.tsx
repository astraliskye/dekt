import React from "react";

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

const SecondaryButton = ({ onClick, children, className = "" }: Props) => {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-dark-secondary px-6 py-3 font-semibold text-gray-700 dark:text-gray-300 shadow-md transition-all duration-200 hover:border-primary hover:text-primary hover:shadow-lg hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-dark ${className}`}
      onClick={onClick ? () => onClick() : undefined}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
