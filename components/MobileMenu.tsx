"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const MobileMenu = () => {
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  const menuHamburger = () => {
    setIsMobile((prev) => !prev);
  };

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(target) &&
        !buttonRef.current.contains(target)
      ) {
        setIsMobile(false);
      }
    };
    if (isMobile) {
      document.addEventListener("mousedown", handleOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [isMobile]);

  return (
    <div className=" flex ">
      <div
        ref={buttonRef}
        onClick={menuHamburger}
        className="flex flex-col cursor-pointer gap-[4.5px] relative z-50 "
      >
        <div
          className={`w-6 h-1 rounded-sm bg-primary ${
            isMobile ? "rotate-45 " : ""
          }origin-left  ease-out duration-500`}
        ></div>
        <div
          className={`w-6 h-1 rounded-sm bg-primary ${
            isMobile ? "opacity-0 " : ""
          }  ease-out duration-500`}
        ></div>{" "}
        <div
          className={`w-6 h-1 rounded-sm bg-primary ${
            isMobile ? "-rotate-45 " : ""
          }origin-left ease-out duration-500`}
        ></div>
      </div>
      {isMobile && (
        <div
          ref={menuRef}
          className="fixed  inset-0 top-20 bg-card z-[100] flex flex-col items-center justify-center gap-8 font-medium opacity-90"
        >
          <Link href="/">Home</Link>
          <div>Friend</div>
          <div>Stories</div>
          <div>Login</div>
        </div>
      )}
    </div>
  );
};
export default MobileMenu;
