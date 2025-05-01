import Posts from "@/actions/PostsAction";
import AddPost from "@/components/Addpost";
import Feeds from "@/components/Feeds";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import StorySection from "@/components/section/StorySection";

export default async function Home() {
  const res = await Posts();
  const posts = await res.json();
  console.log(posts);
  return (
    <div className=" grid grid-cols-5    max-sm:grid-cols-1    ">
      <div className="hidden    col-span-1">left</div>
      <div className=" grid  col-span-3 px-1">
        <div className="px-2">
          {/* section 1 input post */}
          <AddPost />
          {/* story  */}
          <StorySection />
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
      </div>
      <div className="hidden md:grid col-span-1">right</div>
    </div>
  );
}
