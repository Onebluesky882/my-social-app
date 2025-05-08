import { createClient } from "@/utils/supabase/server";

export default async function getPosts() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("posts").select(`*, profiles(*)`);

  if (error) console.error("Supabase error:", error);

  return data;
}
