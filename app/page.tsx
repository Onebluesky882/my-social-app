import { Metadata } from "next";
import { cookies } from "next/headers";
import AuthServer from "./auth/auth-server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export const metadata: Metadata = {
  title: "slot mvp",
  description: "slot mvp",
};

export default async function Homepage() {
  const cookiesStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookiesStore,
  });
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
  if (error) {
    console.error("Session error:", error.message);
  }

  const { data: posts } = await supabase.from("posts").select();

  console.log("session : ", session);
  return (
    <div>
      <AuthServer />
      {session && <pre>{JSON.stringify(posts, null, 2)}</pre>}
      <h1>slotmvp</h1>
    </div>
  );
}
