import { createClient } from "@/utils/supabase/server";

export async function getPosts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("posts")
    .select(`*, profiles(*)`)
    .order("created_at", { ascending: false });

  if (error) console.error("Supabase error:", error);

  return data ?? [];
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

  if (error) console.error("Supabase error:", error);

  return data;
}
