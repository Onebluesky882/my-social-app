"use client";

import Link from "next/link";
import Image from "next/image";
import { useUserStore } from "@/lib/store/useStore";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Post } from "@/types/post-type";
import { IoSearch } from "react-icons/io5";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { Input } from "./ui/input";

type UserProfileImage = Pick<Post["profiles"], "avatar_url">;

const Navbar = () => {
  const { md } = useBreakpoint();
  const { setUser } = useUserStore();
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = useState<UserProfileImage | null>(null);

  useEffect(() => {
    const fetchUserAvatar = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setUser(user.id);
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", user.id)
          .single();
        if (error) {
          console.log("Error fetching avatar:", error.message);
        } else {
          setAvatarUrl(data);
          console.log("data :", data);
        }
      }
    };
    fetchUserAvatar();
  }, [setUser]);

  return (
    <div className="fixed top-0  w-full z-999  border-b-1 border-b-white/10 shadow bg-gray-950">
      <div className=" flex grid-cols-4  mx-2 items-center  h-14 justify-between  gap-2  ">
        {/* left */}
        <LeftSection md={md} />
        {/* middle */}
        <div className="flex col-span-2  ">
          <div className="max-sm:hidden flex items-center gap-2 xl:gap-8 justify-end  "></div>
        </div>
        {/* right section */}
        <RightSection avatarUrl={avatarUrl} />
      </div>
    </div>
  );
};

const LeftSection = ({ md }: any) => {
  return (
    <div className="flex gap-4 col-span-1 ">
      <div className=" flex">
        <Link href={"/"} className="font-bold text-2xl text-primary">
          Facebook2
        </Link>
      </div>

      <div className=" p-2 bg-secondary items-center rounded-xl text-sm    ">
        {md ? (
          <Input
            type="text"
            placeholder="search"
            className="h-5 text-[12px] "
          />
        ) : (
          <IoSearch />
        )}
      </div>
    </div>
  );
};

const RightSection = ({ avatarUrl }: any) => {
  return (
    <div className="flex col-span-1 items-center mt-1">
      <div className="  flex gap-3 items-center">
        <span className="h-10 w-10 rounded-full  items-center justify-center   bg-gray-700 inline-flex">
          <Image src={"/bell.svg"} height={16} width={16} alt="" />
        </span>
        <span className="h-10 w-10 rounded-full  items-center justify-center    bg-gray-700 inline-flex">
          <Image src={"/message.svg"} height={20} width={20} alt="" />
        </span>

        {avatarUrl?.avatar_url ? (
          <span className="relative ">
            <Image
              src={avatarUrl.avatar_url}
              alt="User Avatar"
              width={36}
              height={36}
              className="rounded-full"
              onClick={() => {}}
            />
            <span className="h-3 w-3 rounded-full inline-flex items-center justify-center absolute   translate-x-6 -translate-y-3 outline-2 outline-black bg-black">
              <Image src={"/dropdown.svg"} height={20} width={20} alt="" />
            </span>
          </span>
        ) : (
          <span className="relative">
            <Image
              src="/avatar-1.png"
              alt="Default Avatar"
              width={30}
              height={30}
            />
          </span>
        )}
      </div>
    </div>
  );
};
export default Navbar;
