import React from "react";
import type { ChangeEvent } from "react";

type Props = {
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = ({ value, placeholder, onChange }: Props) => {
  return (
    <input
      className="mx-auto rounded-lg border-2 px-2 py-1 transition hover:bg-gray-200 dark:border-gray-800 dark:bg-black dark:hover:bg-gray-800"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default TextInput;
