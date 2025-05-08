"use client";
import Image from "next/image";
const StorySection = () => {
  return (
    <div className="flex w-full  gap-2 overflow-x-auto no-scrollbar  scroll-smooth border-y-2 border-black pt-2">
      <div className="flex gap-2 min-w-max px-4 ">
        <CreateStory />
        <StoryFriend
          src={
            "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
          name={"sonya"}
        />
        <StoryFriend
          src={
            "https://images.pexels.com/photos/3225529/pexels-photo-3225529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
          name={"alex"}
        />
        <StoryFriend
          src={
            "https://images.pexels.com/photos/31178989/pexels-photo-31178989/free-photo-of-balinese-street-adorned-with-penjor-decorations.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
          name={"peter"}
        />
        <StoryFriend
          src={
            "https://images.pexels.com/photos/119777/pexels-photo-119777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
          name={"Nana"}
        />
        <StoryFriend
          src={
            "https://images.pexels.com/photos/18144544/pexels-photo-18144544/free-photo-of-buddha-statue-in-a-temple.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
          name={"Nana"}
        />{" "}
        <StoryFriend
          src={
            "https://images.pexels.com/photos/119777/pexels-photo-119777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
          name={"Nana"}
        />{" "}
        <StoryFriend
          src={
            "https://images.pexels.com/photos/119777/pexels-photo-119777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
          name={"Nana"}
        />{" "}
        <StoryFriend
          src={
            "https://images.pexels.com/photos/119777/pexels-photo-119777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
          name={"Nana"}
        />{" "}
      </div>
    </div>
  );
};
const CreateStory = () => {
  return (
    <div className="relative h-[140px] w-[80px] rounded-md  -ml-2 bg-white/8 backdrop-blur-md shadow-md ">
      <div className="h-[80px] relative ">
        <Image
          src={
            "https://images.pexels.com/photos/31442386/pexels-photo-31442386/free-photo-of-contemplative-moment-at-binh-thu-n-seaside.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
          alt=""
          height={100}
          width={100}
          className="rounded-t-md object-cover"
        />
      </div>
      <span className="h-6 w-6 rounded-full inline-flex items-center justify-center absolute  left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-gray-900 bg-blue-800">
        <Image src={"/svgexport-24.svg"} height={20} width={20} alt="" />
      </span>
      <div className="grid mx-2 max-w-[60px] ">
        <p className="text-center wrap-break-word font-extralight text-[10px] py-3">
          Create story
        </p>
      </div>
    </div>
  );
};
const StoryFriend = ({ src, name }: { src: string } & { name: string }) => {
  return (
    <div className="relative h-[140px] w-[80px] mb-2 rounded-md   bg-white/8 backdrop-blur-md shadow-md ">
      <div className="h-full relative">
        <Image src={src} alt="" fill className="rounded-md object-cover" />
      </div>

      <div className="absolute mx-2 max-w-[60px]    translate-x-1  -translate-y-4  w-full ">
        <p className="text-center text-white wrap-break-word  text-[10px] ">
          {name}
        </p>
      </div>
    </div>
  );
};
export default StorySection;
