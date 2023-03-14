import React from "react";

type Props = {
  lg?: boolean;
  children: React.ReactNode;
};

const Container = ({ lg, children }: Props) => {
  return (
    <div className={`mx-auto ${lg ? "w-full max-w-xl" : "w-full max-w-xs"}`}>
      {children}
    </div>
  );
};

export default Container;
