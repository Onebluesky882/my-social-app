import Posts from "@/actions/PostsAction";
import AddPost from "@/components/Addpost";
import Feeds from "@/components/Feeds";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import StorySection from "@/components/section/StorySection";

export default async function Home() {
  const res = await Posts();
  const posts = await res.json();

  return (
    <div className=" grid grid-cols-5    max-sm:grid-cols-1  bg-popover -mt-1  overflow-x-hidden">
      <div className="hidden  md:grid   col-span-1">left</div>

      <div className=" max-sm:col-span-1 pt-5  max-sm:mt-8">
        <AddPost />
        <StorySection />

        {/* story  */}

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
