"use client";

import Image from "next/image";

const Stories = () => {
  const storyArray = Array.from({ length: 100 });
  return (
    <div className="p-2   text-sm shadow-md rounded-lg ">
      <div className="flex  gap-5 px-4 overflow-x-auto scrollbar-hide scroll-smooth ">
        {storyArray.map((_, index) => (
          <StoryDemo key={index} />
        ))}
      </div>
    </div>
  );
};
const StoryDemo = () => {
  return (
    <div className="flex-col flex items-center   cursor-pointer   ">
      <Image
        src="https://images.pexels.com/photos/15752372/pexels-photo-15752372/free-photo-of-camera-menu-on-screen.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        alt="camera menu"
        width={80}
        height={80}
        className="my-2   mx-5 p-2 rounded-full ring-2 ring-foreground aspect-square object-cover"
      />
      <span>name</span>
    </div>
  );
};
export default Stories;
