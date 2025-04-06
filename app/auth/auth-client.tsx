"use client";

import { Button } from "@/app/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Session } from "@supabase/supabase-js";

const AuthClient = ({ session }: { session: Session | null }) => {
  const supabase = createClientComponentClient();

  const handleSubmit = async () => {
    // Call the sign-in method with the redirect URL
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (session) {
    }
  };

  return <Button onClick={handleSubmit}>google</Button>;
};
export default AuthClient;
