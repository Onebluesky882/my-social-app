"use client";

import { createClient } from "@/utils/supabase/client";

export function LoginAuthGoogle() {
  const supabase = createClient();
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`, // Must match Supabase OAuth redirect
      },
    });

    if (error) {
      console.error("Google login error:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={handleGoogleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default LoginAuthGoogle;
