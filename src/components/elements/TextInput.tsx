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
      className="mx-auto rounded-lg border-2 border-light-shade bg-light px-2 py-1 transition hover:bg-light-shade focus:bg-light-shade dark:border-dark-tint dark:bg-dark dark:hover:bg-dark-tint dark:focus:bg-dark-tint"
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default TextInput;
