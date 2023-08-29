import React from "react";
import type { ChangeEvent } from "react";

type Props = {
  value: string;
  placeholder: string;
  required?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const TextInput = ({ value, placeholder, required, onChange }: Props) => {
  return (
    <input
      className="mx-auto rounded-lg border-2 border-light-shade bg-white px-2 py-1 transition hover:bg-light-shade focus:bg-light-shade"
      type="text"
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
    />
  );
};

export default TextInput;
