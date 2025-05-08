import getPosts from "@/actions/PostsAction";
import Posts from "@/actions/PostsAction";
import AddPost from "@/components/Addpost";
import Feeds from "@/components/Feeds";
import StorySection from "@/components/section/StorySection";

export default async function Home() {
  const res = getPosts();
  console.log("res :", res);
  return (
    <div className=" grid grid-cols-4    max-sm:grid-cols-1  bg-background -mt-1  overflow-x-hidden">
      <div className="hidden  md:grid   col-span-1">left</div>

      <div className=" max-sm:col-span-1 col-span-2 pt-5  max-sm:mt-8">
        <AddPost />
        <StorySection />

        <Feeds />

        {/* post map */}

        {
          // <Feeds
          //   props={{
          //     id: 0,
          //     title: "",
          //     content: "",
          //   }}
          // />
        }
      </div>
      <div className="hidden md:grid col-span-1">right</div>
    </div>
  );
}
