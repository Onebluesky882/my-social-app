import { createClient } from "@/utils/supabase/server";

export async function getPosts() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("posts")
    .select(`* , profiles(*)`)
    .order("created_at", { ascending: false });

  return data ?? [];
}
// todo
export async function updatePost() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const updateContent = {
    content: "",
  };
  if (user) {
    const { data } = await supabase
      .from("posts")
      .update(updateContent)
      .eq("id", user.id)
      .select("*, profiles(*)");

    return data ?? [];
  }
}

export async function getProfiles() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("id", user?.id as string);

  return data;
}
