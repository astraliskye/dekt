import React from "react";

type Props = {
  message: string;
};

const Error = ({ message }: Props) => {
  return (
    <main>
      <h1>Oops! Something went wrong!</h1>
      <p>{message}</p>
    </main>
  );
};

export default Error;
