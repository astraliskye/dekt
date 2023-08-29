import React from "react";
import type { ChangeEvent } from "react";

type Props = {
  value: string;
  placeholder: string;
  required?: boolean;
  area?: boolean;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

const TextArea = ({ value, placeholder, required, onChange }: Props) => {
  return (
    <textarea
      className="mx-auto rounded-lg border-2 border-light-shade bg-white px-2 py-1 transition hover:bg-light-shade focus:bg-light-shade"
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
    ></textarea>
  );
};

export default TextArea;
