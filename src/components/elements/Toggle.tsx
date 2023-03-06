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
        <span className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-red-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:border-gray-600 dark:bg-gray-700"></span>
      </label>
    </>
  );
};

export default Toggle;
