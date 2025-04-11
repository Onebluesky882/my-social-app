"use client";

import { useEffect, useRef, useState } from "react";

const MobileMenu = () => {
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const menuHamburger = () => {
    setIsMobile((prev) => !prev);
  };

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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
    <div>
      <div
        className="flex flex-col cursor-pointer gap-[4.5px]"
        onClick={menuHamburger}
      >
        <div className="w-6 h-1 rounded-sm bg-primary"></div>
        <div className="w-6 h-1 rounded-sm bg-primary"></div>
        <div className="w-6 h-1 rounded-sm bg-primary"></div>
      </div>
      {isMobile && (
        <div
          ref={menuRef}
          className="flex flex-col items-center justify-center gap-8 font-medium absolute left-0 top-24 w-full h[calc(100vh-96px)] bg-card z-10"
        >
          <div
            onClick={() => {
              console.log("hello");
            }}
          >
            Home
          </div>
          <div>Friend</div>
          <div>Stories</div>
          <div>Login</div>
        </div>
      )}
    </div>
  );
};
export default MobileMenu;
