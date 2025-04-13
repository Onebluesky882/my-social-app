"use client";
import Image from "next/image";
const Addpost = () => {
  return (
    <div className="p-4 flex justify-between">
      {/* avatar */}

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
      <div className=" ">
        <div className="flex gap-4">
          <textarea
            name="post"
            placeholder="what are you thinking"
            className="bg-secondary rounded-lg flex-1 outline-ring"
          ></textarea>
          <Image
            src={"/emoji.png"}
            alt="emoji"
            width={20}
            height={20}
            className=" self-end"
          />
          {/* text input */}
        </div>

        <div className="flex   gap-4">
          {/* post option */}
          <div className="flex  gap-2 text-secondary">
            <Image
              src={"/addimage.png"}
              alt="emoji"
              width={20}
              height={20}
              className=" self-end"
            />
            <span> photo </span>
          </div>
          <div className="flex gap-2 text-secondary">
            <Image
              src={"/addVideo.png"}
              alt="emoji"
              width={20}
              height={20}
              className=" self-end"
            />
            <span> Video </span>
          </div>
          <div className="flex gap-2 text-secondary">
            <Image
              src={"/addEvent.png"}
              alt="emoji"
              width={20}
              height={20}
              className=" self-end"
            />
            <span> Event </span>
          </div>
          <div className="flex  gap-2 text-secondary ">
            <Image
              src={"/poll.png"}
              alt="emoji"
              width={20}
              height={20}
              className=" self-end"
            />
            <span> Poll </span>
          </div>
        </div>

        <div className=""></div>
      </div>
    </div>
  );
};
export default Addpost;
