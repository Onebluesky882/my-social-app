"use client";
import { useEffect, useState } from "react";
import { MenuProfile } from "./MenuProfile";
import { FaBell } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={` border-b-1 border-gray-800 bg-gray-800   ${
        isScrolled ? "bg-gray-800/50 backdrop-blur" : "bg-transparent"
      }`}
    >
      <div className="grid grid-cols-5 p-3">
        <div className=" flex col-span-1  justify-start items-center">
          <div className=" ">
            <FaUserCircle size={35} />
          </div>
        </div>
        <div className="flex col-span-3 md:justify-center md:gap-5 justify-center gap-2 pr-2    items-center">
          <div>
            <Image
              src={"/bluebird.png"}
              alt={"bluebrid"}
              width={50}
              height={50}
            />
          </div>

          <div className="flex gap-2"></div>
        </div>
        <div className="flex col-span-1 sm:col-span-1   justify-end items-center">
          <FaBell />
          <MenuProfile />
        </div>
      </div>
    </div>
  );
};
export default Header;
