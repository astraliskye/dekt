import React from "react";

type Props = {
  children: React.ReactNode;
};

const H1 = ({ children }: Props) => {
  return <h1 className="py-8 text-center text-5xl">{children}</h1>;
};

export default H1;
