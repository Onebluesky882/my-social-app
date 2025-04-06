"use server";
import { cookies } from "next/headers";
import AuthClient from "./auth-client";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function authServer() {
  const cookiesStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookiesStore,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <AuthClient session={session} />;
}
