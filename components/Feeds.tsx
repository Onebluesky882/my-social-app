"use client";
import { Post } from "@/types/post-type";
import Image from "next/image";

const Feeds = ({ props }: { props: Post }) => {
  return (
    <div className="py-1 bg-card">
      {/* user */}
      <div className="flex justify-between items-center">
        <div className="py-3 flex items-center gap-4 text-secondary">
          <Image
            src={
              "https://images.pexels.com/photos/31585393/pexels-photo-31585393/free-photo-of-smiling-man-in-casual-white-jacket-on-black-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
            alt="31585393"
            height={40}
            width={40}
            className="rounded-full h-10 w-10 object-cover"
          />
          <span className="font-medium">{"props.title"}</span>
        </div>
        <span className=" text-2xl text-accent font-bold">...</span>
      </div>
      {/* des */}
      <div className="">
        <div className="w-full min-h-96 relative">
          <Image
            src={
              "https://images.pexels.com/photos/31585132/pexels-photo-31585132/free-photo-of-romantic-indoor-engagement-celebration.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
            alt=""
            fill
            className="object-cover rounded-md "
          />
        </div>
        <p className="text-secondary">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </p>
      </div>
      {/* interaction */}
      <FooterPost />
    </div>
  );
};

const FooterPost = () => {
  return (
    <div className="px-10 flex items-center  bg-accent p-1 rounded-sm justify-between text-sm">
      <div className="flex  bg-accent gap-8 ">
        <div className="flex  gap-4 rounded-2xl items-center">
          <Image
            src={"/like.png"}
            alt="like"
            width={16}
            height={16}
            className="cursor-pointer"
          />
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground">
            20
            <span className="text-muted-foreground">Likes</span>
          </span>
        </div>
        {/* here */}
        <div className="flex items-center gap-4  rounded-2xl">
          <Image
            src={"/comment.png"}
            alt="like"
            width={16}
            height={16}
            className="cursor-pointer"
          />
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground">
            20
            <span className="text-muted-foreground"> comments</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4  rounded-2xl ">
        <Image
          src={"/share.png"}
          alt="like"
          width={16}
          height={16}
          className="cursor-pointer"
        />
        <span>|</span>
        <span className="text-muted-foreground">
          20
          <span className="text-muted-foreground"> share</span>
        </span>
      </div>
    </div>
  );
};
export default Feeds;
