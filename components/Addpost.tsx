"use client";
import Image from "next/image";
import UploadImage from "./uploadImage";
import PostCard from "./widget/PostCard";
import { useEffect, useRef, useState } from "react";
const Addpost = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const postCard = useRef<HTMLDivElement | null>(null);
  const popUp = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const closePopupOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        popUp.current &&
        !popUp.current.contains(target) &&
        postCard.current &&
        !postCard.current.contains(target)
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

  return (
    <>
      <div className="p-4 flex justify-between bg-accent rounded-2xl my-2 z-0 ">
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
        <div className="flex w-full flex-col px-2 relative ">
          <div className={`flex gap-4  `}>
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
        <div ref={postCard} className="relative ">
          <PostCard onClick={handleToggle} />
        </div>
      )}
    </>
  );
};
export default Addpost;
