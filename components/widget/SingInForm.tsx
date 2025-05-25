"use client";
import { Card } from "../ui/card";
import { Suspense } from "react";

import { createClient } from "../../utils/supabase/client";
import { redirect } from "next/navigation";

export const LoginForm = () => {
  const handleSignin = async () => {
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
    if (error) {
      return error.message;
    }
    redirect("/");
  };

  return (
    <Card className="  h-35 w-85 inset-0 z-40 bg-foreground flex items-center justify-center border-none">
      <Suspense>
        <div className="flex justify-between items-center ">
          <h2
            onClick={handleSignin}
            className="outline-1  rainbow-outline p-2  rounded-2xl shadow flex text-xl justify-end  text-background "
          >
            Signin with Google
          </h2>
        </div>
      </Suspense>
    </Card>
  );
};
