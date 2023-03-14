import React from "react";

type Props = {
  children: React.ReactNode;
};

const H2 = ({ children }: Props) => {
  return <h2 className="py-5 text-center text-3xl">{children}</h2>;
};

export default H2;
