"use client";

import { useUserStore } from "@/lib/store/useStore";
import Image from "next/image";
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
type FeedsProps = {
  profile?: string;
  postImage?: string[] | null;
  postText?: string;
};

type FooterProps = {
  comments?: string[];
  likes?: string[];
  shares?: string[];
  views?: string[];
  loves?: string[];
  userLiked: boolean;
};
const Feeds = ({
  profile,
  postImage,
  postText,
  comments,
  likes,
  shares,
  views,
  loves,
}: FeedsProps & FooterProps) => {
  const { userId } = useUserStore();
  const [userLiked, setUserLiked] = useState(false);
  return (
    <div className="py-1 bg-card  px-3 rounded-xl my-3">
      {/* user */}
      <div className="flex justify-between items-center">
        <div className="py-3 flex items-center gap-4 text-secondary">
          {/* <Image
            src={profile}
            alt={profile}
            height={40}
            width={40}
            className="rounded-full h-10 w-10 object-cover"
          /> */}
          <span className="font-medium ">{"props.title"}</span>
        </div>
        <span className=" text-2xl text-accent font-bold">...</span>
      </div>
      {/* des */}
      <div className="">
        <div className="w-full min-h-96 relative">
          {/* demo */}

          <Image
            src={
              "https://images.pexels.com/photos/31442386/pexels-photo-31442386/free-photo-of-contemplative-moment-at-binh-thu-n-seaside.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
            alt=""
            fill
            className="w-50 h-50 object-cover"
          />
          {/* {postImage?.length ? (
            <Image
              src={postImage[0]}
              alt={postImage[0]}
              fill
              className="object-cover rounded-md "
            />
          ) : (
            <div></div>
          )} */}
        </div>
        <p className="break-after-auto">{postText}</p>
      </div>
      {/* interaction */}
      <FooterPost
        likes={likes}
        shares={shares}
        views={views}
        loves={loves}
        comments={comments}
        userLiked={userLiked}
      />
    </div>
  );
};

const FooterPost = ({
  userLiked,
  comments = ["comment", "comment", "comment"],
  likes = [
    "like",
    "like",
    "like",
    "like",
    "like",
    "like",
    "like",
    "like",
    "like",
    "like",
  ],
  shares = [
    "share",
    "share",
    "share",
    "share",
    "share",
    "share",
    "share",
    "share",
    "share",
    "share",
  ],
  views = [
    "views",
    "views",
    "views",
    "views",
    "views",
    "views",
    "views",
    "views",
    "views",
    "views",
  ],
  loves = [
    "love",
    "love",
    "love",
    "love",
    "love",
    "love",
    "love",
    "love",
    "love",
    "love",
  ],
}: FooterProps) => {
  return (
    <div className="px-5 flex items-center  py-2 rounded-sm justify-between text-sm">
      <div className="flex  bg-accent gap-8  align-end ">
        <div className="flex  gap-2 rounded-2xl items-center">
          {userLiked ? <FaHeart /> : <FaRegHeart />}
          <span>{loves.length}</span>

          <span className="text-muted-foreground">Likes</span>
          <FaCommentDots color="text-muted-foreground" className="ml-5" />
          <span>{comments.length}</span>
        </div>
        {/* here */}
      </div>

      <div className="flex items-center gap-4  rounded-2xl ">
        <FaShare />

        <span>{shares.length}</span>
      </div>
    </div>
  );
};
export default Feeds;
