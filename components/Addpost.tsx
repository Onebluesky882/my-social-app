"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PostCard } from "./widget/PostCard";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/auth-js";
import { LoginForm } from "./widget/SingInForm";

type AddpostProp = {
  avatarUrl?: string;
  profileName?: string;
};

const Addpost = ({ avatarUrl, profileName }: AddpostProp) => {
  const [toggle, setToggle] = useState(false);
  const [isUser, setIsUser] = useState<User | null>(null);
  const postCard = useRef<HTMLDivElement | null>(null);
  const popUp = useRef<HTMLDivElement | null>(null);
  const signInFormRef = useRef<HTMLDivElement | null>(null);
  const supabase = createClient();

  const checkAuthUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      setIsUser(user);
    }
  };

  useEffect(() => {
    checkAuthUser();

    const closePopupOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        isUser &&
        postCard.current &&
        !postCard.current.contains(target) &&
        popUp.current &&
        !popUp.current.contains(target)
      ) {
        setToggle(false);
      }
      if (
        !isUser &&
        signInFormRef.current &&
        !signInFormRef.current.contains(target) &&
        popUp.current &&
        !popUp.current.contains(target)
      ) {
        setToggle(false);
      }
    };

    if (toggle) {
      document.addEventListener("mousedown", closePopupOutside);
    }

    return () => {
      document.removeEventListener("mousedown", closePopupOutside);
    };
  }, [toggle]);

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <>
      <div className="p-4 my-2 flex justify-between bg-card pt-6 sm:mt-12  max-sm:rounded-none rounded-2xl items-center max-sm:p-2 ">
        {isUser ? (
          <Image
            src={avatarUrl}
            alt="woman"
            width={100}
            height={100}
            className=" w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <Image
            src={"/avatar-1.png"}
            alt="avatar"
            width={100}
            height={100}
            className=" w-8 h-8 rounded-full object-cover"
          />
        )}

        <div className="flex w-full flex-col px-2      ">
          <div className="flex gap-4 items-center ">
            <span
              className="px-2  text-[11px] font-extralight rounded-xl flex-1  bg-black/10  py-2 md:py-3"
              onClick={handleToggle}
              ref={popUp}
            >
              share your mind {profileName}
            </span>

            <div className="flex  gap-2 text-secondary">
              <Image
                src={"/photo.png"}
                alt="emoji"
                width={15}
                height={15}
                className=" self-end"
                onClick={handleToggle}
              />
              <Image
                src={"/emoji.png"}
                alt="emoji"
                width={15}
                height={15}
                className=" self-end"
                onClick={handleToggle}
              />
            </div>

            {/* text input */}
          </div>
        </div>
      </div>
      {toggle && (
        <div className=" fixed  h-full z-30 w-full  inset-0 bg-background/80  flex items-center justify-center">
          <div ref={isUser ? postCard : signInFormRef}>
            {isUser ? (
              <PostCard closePopup={handleToggle} />
            ) : (
              <LoginForm closePopup={handleToggle} />
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Addpost;
