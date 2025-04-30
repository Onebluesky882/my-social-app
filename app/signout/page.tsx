"use server";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
export default async function Signout() {
  return (
    <form action={signOutAction}>
      <button type="submit">signout</button>
    </form>
  );
}
