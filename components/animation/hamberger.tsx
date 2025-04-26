import { Dispatch, SetStateAction } from "react";

type HamburgerMenuProps = {
  isOpen?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
};

export const HamburgerMenu = ({ isOpen, setIsOpen }: HamburgerMenuProps) => {
  return (
    <button className="fixed top-4 right-4 z-50 w-12 h-12 flex items-center justify-center">
      <div className="relative w-6 h-6">
        <span
          className={`absolute w-6 h-0.5 bg-black transform transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-0" : "-translate-y-2"
          }`}
        />
        <span
          className={`absolute w-6 h-0.5 bg-black transform transition-all duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`absolute w-6 h-0.5 bg-black transform transition-all duration-300 ${
            isOpen ? "-rotate-45 translate-y-0" : "translate-y-2"
          }`}
        />
      </div>
    </button>
  );
};
