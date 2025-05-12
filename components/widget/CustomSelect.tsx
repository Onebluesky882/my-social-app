import { useState } from "react";

type CustomSelectProps = {
  options: string[];
  handleOption: (value: string) => void;
};

export const CustomSelect = ({ handleOption, options }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev); //
  };

  return (
    <div className="relative " onClick={toggleDropdown}>
      <div className=" w-25 absolute  p-2 py-3 mx-2 -translate-x-25 z-30 bg-gray-700  rounded-sm">
        <div className="flex  flex-col justify-center gap-y-2">
          {options.map((item) => (
            <p
              className="rounded-sm flex hover:bg-red text-sm  outline-1 justify-center text-[12px] font-extralight"
              onClick={() => {
                handleOption(item);
                setIsOpen(false);
              }}
            >
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};
