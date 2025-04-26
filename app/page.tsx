import { createClient } from "@/utils/supabase/server";

export default async function Homepage() {
  const supabase = await createClient();

  const { data } = await supabase.from("posts").select("* , profiles(*)");

  return (
    <div className="bg-background">
      <h1>hello</h1>
      <pre>{JSON.stringify(data, null, 3)}</pre>
    </div>
  );
}
