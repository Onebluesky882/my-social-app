import { createServer } from "@/utils/supabase/server";
import Image from "next/image";

export default async function Home() {
  const supabase = await createServer();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <div className="flex justify-center">
      <h1 className="flex justify-between">homepage</h1>
    </div>
  );
}
