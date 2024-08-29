"use client";
import { SignInButton, SignOutButton } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useStoreUserEffect } from "./function/useStoreUserEffect";

export default function Home() {
  const { isLoading, isAuthenticated } = useStoreUserEffect();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!isAuthenticated ? (
        <div className="bg-red-400 rounded shadow-xl p-4">
          <SignInButton mode="modal" />
        </div>
      ) : (
        <div>
          <div className="bg-red-400 rounded shadow-xl p-4">
            <SignOutButton />
          </div>
        </div>
      )}
    </main>
  );
}
