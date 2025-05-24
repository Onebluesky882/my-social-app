"use client";

import { Post } from "@/types/post-type";
import Feeds from "@/components/FeedCard";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function FeedsRealtime({
  initialPosts,
}: {
  initialPosts: Post[];
}) {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [buttonEditing, setButtonEditing] = useState(false);
  const [textBoxEdit, setTextBoxEdit] = useState("");
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [_isEditing, setIsEditing] = useState(false);
  const supabase = createClient();
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        setUser(data.user.id);
      }
    };

    getUser();
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

  const handleUpdatePost = async (postId: string, newContent: string) => {
    const { error } = await supabase
      .from("posts")
      .update({ content: newContent })
      .eq("id", postId)
      .select();
    if (!error) {
      toast.success("post updated successfully");
    }

    // Optional: update local state for better UX (without waiting for real-time update)
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, content: newContent } : post
      )
    );
    setButtonEditing(false);
    setEditingPostId(null);
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => {
        const isEditing = editingPostId === post.id;

        return (
          <Feeds
            key={post.id}
            content={String(post.content)}
            createdAt={String(post.created_at)}
            imageUrls={post.image_urls ?? []}
            avatarUrl={post.profiles?.avatar_url ?? "/avatar-1.png"}
            name={post.profiles?.name ?? "unknown"}
            postId={post.id as string}
            handleUpdatePost={handleUpdatePost}
            isEditing={isEditing}
            setEditingPostId={setEditingPostId}
            textBoxEdit={textBoxEdit}
            setTextBoxEdit={setTextBoxEdit}
            setButtonEditing={setButtonEditing}
            buttonEditing={buttonEditing}
            setIsEditing={setIsEditing}
            authorId={post.author_id || "unknown"}
            userId={user as unknown as string}
          />
        );
      })}
    </div>
  );
}
