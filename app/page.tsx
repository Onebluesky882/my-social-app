import AddPost from "@/components/Addpost";
import Feeds from "@/components/Feeds";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import { createServer } from "@/utils/supabase/server";

export default async function Home() {
  return (
    <div className=" grid outline-1 md:grid-cols-7 max-sm:grid-cols-1  ">
      <div className="hidden md:grid  col-span-1">left</div>
      <div className="bg-background h-[100px]  col-span-5">
        {/* section 1 input post */}

        {/* story  */}

        {/* post map */}
      </div>
      <div className="hidden md:grid col-span-1">right</div>
    </div>
  );
}
