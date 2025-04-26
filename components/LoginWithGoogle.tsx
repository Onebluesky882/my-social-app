"use client";

import { createClient } from "@/utils/supabase/client";
import { encodedRedirect } from "@/utils/utils";

const LoginWithGoogle = () => {
  const supabase = createClient();

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback` },
    });

    if (error) {
      return encodedRedirect("error", "sign-in", error.message);
    }
  };

  return <button onClick={handleSignIn}>Sign in with Google</button>;
};
export default LoginWithGoogle;
