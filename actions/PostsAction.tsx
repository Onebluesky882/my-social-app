import { createClient } from "@/utils/supabase/server";

export default async function Posts() {
  const supabase = await createClient();
  const { data } = await supabase.from("posts").select();
  return Response.json(data);
}
