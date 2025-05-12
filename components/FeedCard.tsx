"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import PostGridImages from "./widget/PostGridImages";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { CustomSelect } from "./widget/CustomSelect";
import { IoIosCloseCircle } from "react-icons/io";
import { toast } from "sonner";

dayjs.extend(relativeTime);

type UpdatePostProps = {
  postId: string;
  content: string | null;
  imageUrls: string[] | null;
  userId: string;
  currentUserId?: string;
  handleUpdatePost: (postId: string, newContent: string) => void;
};
type FeedsPostProps = {
  content: string | null;
  createdAt: string;
  imageUrls: string[] | null;
  userId?: string | null;
};
type ProfileProps = {
  avatarUrl: string;
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
  postId,
  avatarUrl,
  content,
  createdAt,
  imageUrls,
  name,
  comments,
  likes,
  loves,
  shares,
  views,
  currentUserId,
  userId,
  handleUpdatePost,
}: FeedsPostProps & ProfileProps & FooterProps & UpdatePostProps) => {
  const [userLiked, setUserLiked] = useState(false);
  const [option, setOption] = useState(false);
  const [editing, setEditing] = useState(false);
  const [textBoxEdit, setTextBoxEdit] = useState<string>(content || "");
  const [updatePost, setUpdatePost] = useState();
  const toggleOption = () => {
    setOption((prev) => !prev);
  };

  // edit & delete button
  const handleOption = async (value: string) => {
    if (value === "edit") {
      setEditing(true);
      setOption(false);
    }
    if (value === "delete") console.log(value, "delete");
  };

  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const disableDivOutSide = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOption(false);
      }
    };

    document.addEventListener("click", disableDivOutSide);

    return () => {
      document.removeEventListener("click", disableDivOutSide);
    };
  }, []);

  return (
    <div className="py-1 bg-card  px-3   my-3 rounded-sm">
      {/* user */}

      <div className="flex justify-between items-center">
        <div className="py-3 flex items-center gap-4 text-secondary">
          <Image
            src={avatarUrl}
            alt={""}
            height={40}
            width={40}
            className="rounded-full h-10 w-10 object-cover"
          />
          <div>
            <h2 className="text-gray-100">{name}</h2>
            <p className="text-[12px] text-gray-100/50 ">
              {dayjs(createdAt).fromNow()}
            </p>
          </div>
        </div>
        {currentUserId === userId ? (
          <span
            onClick={toggleOption}
            className="mb-10 text-2xl text-gray-400 font-bold"
          >
            {option ? (
              <div
                ref={ref}
                className="relative cursor-pointer transition duration-300 ease hover:scale-110 z-50"
              >
                <IoIosCloseCircle
                  size={30}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOption(false);
                  }}
                  className="cursor-pointer transition duration-300 ease-in-out hover:scale-110 absolute z-50 inset-0 -top-3 -left-1"
                />
                <CustomSelect
                  options={["edit", "delete"]}
                  handleOption={handleOption}
                />
              </div>
            ) : (
              "..."
            )}
          </span>
        ) : (
          <div
            onClick={() =>
              toast("Only the post owner can edit or delete this post.")
            }
            className="text-xs text-muted-foreground"
          ></div>
        )}
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
        {editing ? (
          <div className="relative z-0 ">
            <textarea
              value={content as string}
              onChange={(e) => setTextBoxEdit(e.target.value)}
              className="w-full h-20 text-[14px] font-extralight outline-none p-2 border-1 border-gray-500  rounded-md resize-none"
              rows={4}
            />
            <button
              onClick={() => setEditing(false)}
              className="border-1 py-1 px-1  bg-red-400 text-[8px] rounded-xl absolute mx-2  font-extralight -translate-x-1 -translate-y-1   bottom-0 right-20"
            >
              cancel
            </button>
            <button
              onClick={() => handleUpdatePost(postId, textBoxEdit)}
              className="border-1 py-1 px-1  bg-green-900 text-[8px]  rounded-xl  absolute mx-2 font-extralight -translate-x-1 -translate-y-1   bottom-0 right-5 "
            >
              Save
            </button>
          </div>
        ) : (
          <p className="break-after-auto">{content}</p>
        )}
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
