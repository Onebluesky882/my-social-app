"use server";
import { signOutAction } from "@/actions/GoogleAuth";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Signout() {
  return (
    <form action={signOutAction}>
      <button type="submit">signout</button>
    </form>
  );
}
