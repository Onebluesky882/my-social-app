"use server";

import { signOutAction } from "@/actions/GoogleAuth";
import { Button } from "@/components/ui/button";

export default async function page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800">
          Are you sure you want to sign out?
        </h1>
        <form action={signOutAction}>
          <Button type="submit" variant="destructive">
            Sign Out
          </Button>
        </form>
      </div>
    </div>
  );
}
