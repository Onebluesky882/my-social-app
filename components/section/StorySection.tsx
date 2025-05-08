"use client";
import { turnCutText } from "@/lib/utils";
import Image from "next/image";
const StorySection = () => {
  return (
    <div className="flex w-full  gap-2 overflow-x-auto no-scrollbar  scroll-smooth bg-black/90  pt-2 rounded-sm">
      <div className="flex gap-2 min-w-max px-4 ">
        <CreateStory />
        <DemoStoryFriend />
      </div>
    </div>
  );
};
const CreateStory = () => {
  return (
    <div className="relative h-[160px] w-[100px] rounded-md  -ml-2 bg-white/8 backdrop-blur-md shadow-md ">
      <div className="h-[120px] relative ">
        <Image
          src={
            "https://images.pexels.com/photos/31442386/pexels-photo-31442386/free-photo-of-contemplative-moment-at-binh-thu-n-seaside.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          }
          alt=""
          fill
          className="  rounded-t-md  object-cover"
        />
      </div>
      <span className="h-8 w-8 rounded-full inline-flex items-center justify-center absolute  left-1/2 -translate-x-1/2 -translate-y-1/2 border-3 border-gray-900 bg-blue-800">
        <Image src={"/svgexport-24.svg"} height={20} width={20} alt="" />
      </span>
      <div className="flex justify-center  mx-2  pt-2 ">
        <p className="text-center wrap-break-word font-extralight text-[10px] py-3">
          Create story
        </p>
      </div>
    </div>
  );
};
const StoryFriend = ({ src, name }: { src: string } & { name: string }) => {
  return (
    <div className="flex flex-col relative  h-[160px] w-[100px] mb-2 rounded-md   bg-white/8 backdrop-blur-md shadow-md ">
      <div className="h-full relative justify-center flex">
        <Image src={src} alt="" fill className="rounded-md object-cover" />
        <p className=" absolute mx-2 bottom-1 text-center text-white wrap-break-word  text-[10px] ">
          {String(turnCutText(name, 20))}
        </p>
      </div>
    </div>
  );
};
const DemoStoryFriend = () => {
  return (
    <>
      <StoryFriend
        src={
          "https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        }
        name={"sonya dafsfwfwfafsf asdfawfwf asfwfwgfagaasdfasfsfsfg"}
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
    </>
  );
};
export default StorySection;
