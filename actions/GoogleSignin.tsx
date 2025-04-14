"use client";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";

const GoogleSignin = () => {
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
};
export default GoogleSignin;
