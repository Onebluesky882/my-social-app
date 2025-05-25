"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { IoSearch } from "react-icons/io5";
import { useBreakpoint } from "@/lib/useBreakpoint";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Database } from "@/database.types";
import { IoIosCloseCircle } from "react-icons/io";
import { LoginForm } from "./widget/SingInForm";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
const Navbar = () => {
  const { md } = useBreakpoint();
  const supabase = createClient();
  const [isUser, setIsUser] = useState<Profiles | null>(null);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const fetchUserAvatar = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("profiles")
          .select()
          .eq("id", user.id)
          .single();
        if (error) {
          console.log("Error fetching avatar:", error.message);
        } else {
          setIsUser(data);
        }
      } else {
        setIsUser(null);
      }
    };
    fetchUserAvatar();

    const { data: authListener } = supabase.auth.onAuthStateChange((event) => {
      if (
        event === "SIGNED_IN" ||
        event === "SIGNED_OUT" ||
        event === "TOKEN_REFRESHED"
      ) {
        fetchUserAvatar();
      }
    });
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <div className="fixed top-0  w-full z-999  border-b-1 border-b-white/10  bg-gray-950">
      <div className=" flex grid-cols-4  mx-2 items-center  h-14 justify-between  gap-2  ">
        {/* left */}
        <LeftSection md={md} />
        {/* middle */}
        <div className="flex col-span-2  ">
          <div className="max-sm:hidden flex items-center gap-2 xl:gap-8 justify-end  "></div>
        </div>
        {/* right section */}
        <RightSection isUser={isUser} login={login} setLogin={setLogin} />
      </div>
    </div>
  );
};

const LeftSection = ({ md }: { md: boolean }) => {
  return (
    <div className="flex gap-4 col-span-1 ">
      <div className=" flex">
        <Link href={"/"} className="font-bold text-2xl text-primary">
          MySocials App
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

const RightSection = ({
  isUser,
  login,
  setLogin,
}: {
  isUser: Profiles | null;
  login: boolean;
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="flex col-span-1 items-center mt-1">
      <div className="  flex gap-3 items-center">
        <span className="h-10 w-10 rounded-full  items-center justify-center   bg-gray-700 inline-flex">
          <Image src={"/bell.svg"} height={16} width={16} alt="" />
        </span>
        <span className="h-10 w-10 rounded-full  items-center justify-center    bg-gray-700 inline-flex">
          <Image src={"/message.svg"} height={20} width={20} alt="" />
        </span>

        {isUser ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative focus:outline-none">
                <Image
                  src={isUser.avatar_url as string}
                  alt="User Avatar"
                  width={36}
                  height={36}
                  className="rounded-full cursor-pointer"
                />
                <span className="h-3 w-3 rounded-full inline-flex items-center justify-center absolute translate-x-6 -translate-y-3 outline-2 outline-black bg-black">
                  <Image src={"/dropdown.svg"} height={20} width={20} alt="" />
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>{isUser.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup>
                <DropdownMenuRadioItem value="profile">
                  Profile
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="settings">
                  Settings
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="logout">
                  <Link href={"/logout"}>Logout</Link>
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <span className="relative" onClick={() => setLogin}>
            <Image
              src="/avatar-1.png"
              alt="Default Avatar"
              width={30}
              height={30}
            />
          </span>
        )}
        {login && (
          <div className="  fixed  h-full z-30 w-full  inset-0 bg-background/80  flex items-center justify-center">
            <div className="relative">
              <IoIosCloseCircle
                onClick={() => setLogin(false)}
                className="absolute right-1 text-gray-600 top-1"
                size={20}
              />
              <LoginForm />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Navbar;
