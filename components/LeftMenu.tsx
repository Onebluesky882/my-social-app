"use client";
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";

const LeftMenu = () => {
  const [user, setUser] = useState<any | null>(null); // Initialize as null to represent no user
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user:", error.message);
      } else {
        setUser(user);
      }
    };

    fetchUser();
  }, [supabase]);

  return (
    <div className="">
      <h1>{user ? user.email : "No user logged in"}</h1>
    </div>
  );
};

export default LeftMenu;
