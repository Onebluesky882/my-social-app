"use client";

import { Post } from "@/types/post-type";
import Feeds from "@/components/FeedCard";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function FeedsRealtime({
  initialPosts,
}: {
  initialPosts: Post[];
}) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel("posts-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        async (payload) => {
          const { data, error } = await supabase
            .from("posts")
            .select("*, profiles(*)")
            .eq("id", payload.new.id)
            .single();

          if (data) {
            setPosts((prev) => [data as Post, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Feeds
          key={post.id}
          content={String(post.content)}
          createdAt={String(post.created_at)}
          imageUrls={post.image_urls ?? []}
          avatar_url={post.profiles.avatar_url ?? "/avatar-1.png"}
          name={post.profiles.name}
        />
      ))}
    </div>
  );
}
