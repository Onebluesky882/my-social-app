"use client";

import { ModeToggle } from "./theme-switching";
import MobileMenu from "./MobileMenu";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between h-24">
      {/* left */}
      <div>
        <Link href={"/"} className="font-bold text-2xl text-primary">
          slot MPV
        </Link>
      </div>
      {/* center */}
      <div className="hidden">middle</div>
      {/* right */}
      <div>
        <ModeToggle />

        <MobileMenu />
      </div>
    </div>
  );
};
export default Navbar;
