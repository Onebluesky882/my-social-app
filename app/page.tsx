import Header from "@/components/Header";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.from("posts").select();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("session  : ", session);
  return (
    <div className="flex justify-center">
      <h1 className="flex justify-between">homepage</h1>
      <pre>{JSON.stringify(data, null, 3)}</pre>
    </div>
  );
}
