"use client";

import { ModeToggle } from "./theme-switching";
import MobileMenu from "./MobileMenu";
import Link from "next/link";
import Image from "next/image";
import { useUserStore } from "@/lib/store/useStore";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Post } from "@/types/post-type";
type MenuProps = {
  href: string;
  style?: React.CSSProperties;
  image: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  name?: string | null;
};

// get user to show

const NavMenuProps = ({ href, image, name, style }: MenuProps) => {
  return (
    <Link href={href} className="flex items-center gap-2" style={style}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width ?? 20}
        height={image.height ?? 20}
        style={style}
      />
      <span style={style} className="text-sm">
        {name}
      </span>
    </Link>
  );
};
type UserEmail = Pick<Post["profiles"], "email">;
const Navbar = () => {
  const [email, setEmail] = useState<UserEmail[] | null>(null);
  const { setUser, userId } = useUserStore();
  const supabase = createClient();

  useEffect(() => {
    const storeUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };
    // ! problem here have 2 email seopostoffer@gmail.comwansing05@gmail.com
    const getEmail = async () => {
      const { data } = await supabase.from("profiles").select("email").single();
      if (data) setEmail([data]);
    };

    storeUser();
    getEmail();
  }, []);

  return (
    <div className="flex items-center  mx-auto h-12 justify-between   ">
      {/* left */}
      <div className="hidden lg:block ">
        <Link href={"/"} className="font-bold text-2xl text-primary">
          Website
        </Link>
      </div>
      {/* center */}
      <div className="  md:flex gap-4 ">
        {/* link */}
        <nav className="flex gap-2 text-primary">
          <NavMenuProps
            href={"/"}
            image={{
              src: "/home.png",
              alt: "homepage",
            }}
            name={"Homepage"}
          />
          <NavMenuProps
            href={"/"}
            image={{
              src: "/friends.png",
              alt: "friends",
            }}
            name={"friends"}
          />
          <NavMenuProps
            href={"/"}
            image={{
              src: "/stories.png",
              alt: "stories",
            }}
            name={"stories"}
          />
        </nav>
        {/* search bar */}
        <div className="hidden xl:flex p-2 bg-secondary items-center rounded-xl text-sm ">
          <input
            type="text"
            placeholder="search"
            className="bg-transparent outline-none"
          />
          <Image src="/search.png" alt={"search"} width={14} height={14} />
        </div>
      </div>
      {/* test get user */}
      <h1>{email && <p>{email.map((e) => e.email)}</p>}</h1>

      {/* ... */}
      <div>
        {/* right */}
        <div className=" flex items-center gap-2 xl:gap-8 justify-end  ">
          {/* right link  */}
          <div className="max-md:hidden flex gap-3 items-center">
            <NavMenuProps
              href={""}
              image={{
                src: "/people.png",
                alt: "",
              }}
            />
            <NavMenuProps
              href={""}
              image={{
                src: "/messages.png",
                alt: "messages",
              }}
            />{" "}
            <NavMenuProps
              href={""}
              image={{
                src: "/notifications.png",
                alt: "",
              }}
            />
          </div>
          {}
          <div className="hidden max-sm:flex">
            <MobileMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
