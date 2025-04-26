import { createClient } from "@/utils/supabase/server";

export default async function Homepage() {
  const supabase = await createClient();

  const { data } = await supabase.from("posts").select();

  return (
    <div>
      <pre>{JSON.stringify(data, null, 3)}</pre>
    </div>
  );
}
