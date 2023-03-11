import React from "react";

type Props = {
  message: string;
};

const Error = ({ message }: Props) => {
  return (
    <p className="text-center font-bold text-red-500 underline">
      Error: {message}
    </p>
  );
};

export default Error;
