"use client";

import Link from "next/link";
import { useState } from "react";
import { FaHome, FaUser } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { IoMdPhotos } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { BiSolidMessageAltDetail } from "react-icons/bi";

const MenuIndicator = () => {
  const pathname = usePathname();
  const Menus = [
    {
      name: "Home",
      icon: <FaHome className="text-white" size={25} />,
      dis: "translate-x-0",
      path: "/",
    },
    {
      name: "Profile",
      icon: <FaUser className="text-white" size={25} />,
      dis: "translate-x-16",
      path: "profile",
    },
    {
      name: "Message",
      icon: <BiSolidMessageAltDetail className="text-white" size={25} />,
      dis: "translate-x-32",
      path: "message",
    },
    {
      name: "Photos",
      icon: <IoMdPhotos className="text-white" size={25} />,
      dis: "translate-x-48",
      path: "photos",
    },
    {
      name: "Setting",
      icon: <IoSettings className="text-white" size={25} />,
      dis: "translate-x-64",
      path: "setting",
    },
  ];
  console.log("pathname :", pathname);

  const [active, setActive] = useState(0);

  const handleSubmit = (index: number) => {
    setActive(index);
  };
  return (
    <div className=" flex justify-center bg-blue-400 border-t-[4px] border-solid border-black">
      <div className="bg-blue-400 max-h-[4.4rem] px-6 rounded-t-xl ">
        <ul className="flex relative">
          <span
            className={`bg-blue-700 duration-300 ${Menus[active].dis} ${
              active && "border-black"
            } border-4   h-16 w-16 absolute -top-6 rounded-full   border-black`}
          >
            <span className="w-3.5 h-3.5 bg-transparent absolute top-5 -left-[18px] rounded-tr-[11px] shadow-[var(--my-shadow-left)]"></span>
            <span className="w-3.5 h-3.5 bg-transparent absolute top-5 -right-[18px] rounded-tl-[11px] shadow-[var(--my-shadow-right)]"></span>
          </span>
          {Menus.map((menu, i) => (
            <li key={i} className="w-16">
              <Link
                href="#"
                className="cursor-pointer flex items-center pt-6 flex-col"
                onClick={() => handleSubmit(i)}
              >
                <span
                  className={`flex duration-200 z-10  ${
                    active === i && "-mt-7"
                  }`}
                >
                  {menu.icon}
                </span>

                <span
                  className={`text-white text-sm  ${
                    active === i
                      ? "translate-y-5 mt-1 duration-300 opacity-100 "
                      : "opacity-0 translate-y-10"
                  } `}
                >
                  {menu.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default MenuIndicator;
