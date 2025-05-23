"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // For redirecting after sign out

export function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false, callbackUrl: "/" }); // Redirect to home after sign out
    // router.push("/"); // Ensure redirection if callbackUrl doesn't trigger for some reason
  };

  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Engineering Drawings DMS</h1>
        <div>
          {status === "authenticated" && session?.user && (
            <div className="flex items-center space-x-3">
              <span className="text-sm">
                Welcome, {session.user.name || session.user.email}
              </span>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          )}
          {status === "unauthenticated" && (
            <span className="text-sm">You are not signed in.</span>
            // Optionally, add a Sign In button here if desired
            // <Button variant="secondary" size="sm" onClick={() => router.push('/')}>Sign In</Button>
          )}
           {/* You can add a loading indicator if status is "loading" */}
        </div>
      </div>
    </header>
  );
}
