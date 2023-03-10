import React from "react";

type Props = {
  checked: boolean;
  onChange: () => void;
};

const Toggle = ({ checked, onChange }: Props) => {
  return (
    <>
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          value={checked.toString()}
          onChange={() => onChange()}
          className="peer sr-only"
        />
        <span className="peer-focus:ring-blue peer h-6 w-11 rounded-full bg-light-shade after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] focus:outline-primary peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-2 dark:bg-dark-tint"></span>
      </label>
    </>
  );
};

export default Toggle;
