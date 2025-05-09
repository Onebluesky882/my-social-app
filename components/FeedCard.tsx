"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import PostGridImages from "./widget/PostGridImages";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { createClient } from "@/utils/supabase/client";
import { Post } from "@/types/post-type";

dayjs.extend(relativeTime);

type FeedsPostProps = {
  content: string | null;
  createdAt: string;
  imageUrls: string[] | null;
  userId?: string | null;
};
type ProfileProps = {
  avatar_url: string;
  name: string;
};
type FooterProps = {
  comments?: string[];
  likes?: string[];
  shares?: string[];
  views?: string[];
  loves?: string[];
  userLiked?: boolean;
};
const Feeds = ({
  avatar_url,
  content,
  createdAt,
  imageUrls,
  name,
  comments,
  likes,
  loves,
  shares,
  views,
}: FeedsPostProps & ProfileProps & FooterProps) => {
  const [userLiked, setUserLiked] = useState(false);

  return (
    <div className="py-1 bg-card  px-3   my-3 rounded-sm">
      {/* user */}

      <div className="flex justify-between items-center">
        <div className="py-3 flex items-center gap-4 text-secondary">
          <Image
            src={avatar_url}
            alt={""}
            height={40}
            width={40}
            className="rounded-full h-10 w-10 object-cover"
          />
          <div>
            <h2 className="text-gray-100">{name}</h2>
            <p className="text-[12px] text-gray-100/50 ">
              {" "}
              {dayjs(createdAt).fromNow()}
            </p>
          </div>
        </div>
        <span className=" text-2xl text-accent font-bold">...</span>
      </div>
      {/* des */}
      <div className="">
        <div
          className={`${
            imageUrls?.length ? "flex" : "hidden"
          } w-full min-h-96 relative`}
        >
          {/* demo */}
          {imageUrls?.length &&
            imageUrls.map((image) => <PostGridImages images={[image]} />)}
        </div>
        <p className="break-after-auto">{content}</p>
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
      <div className="flex  gap-8  align-end ">
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
