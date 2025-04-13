import AddPost from "@/components/Addpost";
import Feeds from "@/components/Feeds";
import LeftMenu from "@/components/LeftMenu";
import RightMenu from "@/components/RightMenu";
import Stories from "@/components/Stories";
import { createServer } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="flex gap-6  ">
      <div className="hidden xl:block outline-solid outline-red-500  outline-2 w-[20%] ">
        <LeftMenu />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="">
          <Stories />
          <AddPost />
          <Feeds />
        </div>
      </div>
      <div className="hidden xl:block w-[30%] outline-solid outline-red-500 ">
        <RightMenu />
      </div>
    </div>
  );
}
