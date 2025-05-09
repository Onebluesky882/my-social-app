import { getProfiles } from "@/actions/PostsAction";
import AddPost from "@/components/Addpost";
import Feeds from "@/components/Feeds";
import StorySection from "@/components/section/StorySection";

export default async function Home() {
  const profile = await getProfiles();

  return (
    <div className=" grid grid-cols-4    max-sm:grid-cols-1  bg-background -mt-1  overflow-x-hidden">
      <div className="hidden md:flex md:col-span-1">left</div>

      <div className=" sm:col-span-4 md:col-span-2  pt-5  max-sm:mt-8  ">
        {profile ? (
          profile?.map((avatar) => (
            <AddPost
              key={avatar.id}
              avatarUrl={avatar.avatar_url as unknown as string}
            />
          ))
        ) : (
          <div>
            <AddPost />
          </div>
        )}

        {profile?.map((avatar) => (
          <StorySection
            avatarProfile={avatar.avatar_url as unknown as string}
          />
        ))}

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
      <div className="hidden md:flex md:col-span-1 ">right</div>
    </div>
  );
}
