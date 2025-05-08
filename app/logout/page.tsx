"use server";
import { signOutAction } from "@/actions/GoogleAuth";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function page() {
  return (
    <div className="bg-white">
      <form action={signOutAction}>
        <button type="submit">signout</button>
      </form>
    </div>
  );
}
