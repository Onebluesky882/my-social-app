import AddPost from "@/components/Addpost";
import Feeds from "@/components/Feeds";
import LeftMenu from "@/components/LeftMenu";
import MobileMenu from "@/components/MobileMenu";
import { NewMenu } from "@/components/NewMenuMobile";
import RightMenu from "@/components/RightMenu";
import Stories from "@/components/Stories";
import { createServer } from "@/utils/supabase/server";
import { useEffect } from "react";

export default async function Home() {
  const supabase = await createServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="flex gap-6  ">
      <div className="hidden xl:block outline-solid  w-[20%] ">
        <LeftMenu />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="">
          <Stories />
          <AddPost />
          <Feeds
            props={{
              id: 0,
              title: "",
              content: "",
            }}
          />
        </div>
      </div>
      <div className="hidden xl:block w-[30%] outline-solid  ">
        <RightMenu />
      </div>
    </div>
  );
}
