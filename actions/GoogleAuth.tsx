"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";

export async function signInAction() {
  const handleSignin = async () => {
    const supabase = createClient();
    await (
      await supabase
    ).auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
  };
  return <Button onClick={handleSignin}>Google</Button>;
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
