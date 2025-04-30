"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { PostCard } from "./widget/PostCard";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/auth-js";
import { redirect } from "next/navigation";
import { LoginForm } from "./widget/SingInForm";
const Addpost = () => {
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
  console.log("toggle :", toggle);
  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  return (
    <>
      <div className="p-4 flex justify-between bg-accent rounded-2xl   z-0 ">
        <Image
          src={
            "https://images.pexels.com/photos/31442386/pexels-photo-31442386/free-photo-of-contemplative-moment-at-binh-thu-n-seaside.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
          alt="woman"
          width={40}
          height={40}
          className=" w-12 h-12 rounded-full object-cover"
        />
        {/* post */}
        <div className="flex w-full flex-col px-2  ">
          <div className={`flex gap-4 `}>
            <span
              className="px-2 bg-secondary rounded-lg flex-1 outline-none"
              onClick={handleToggle}
              ref={popUp}
            >
              what are you thinking
            </span>

            <div className="flex  gap-2 text-secondary">
              <Image
                src={"/photo.png"}
                alt="emoji"
                width={20}
                height={20}
                className=" self-end"
                onClick={handleToggle}
              />
            </div>
            <Image
              src={"/emoji.png"}
              alt="emoji"
              width={20}
              height={20}
              className=" self-end"
              onClick={handleToggle}
            />
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
