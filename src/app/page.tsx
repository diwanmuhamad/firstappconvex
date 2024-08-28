"use client";

import { useQuery, useConvexAuth } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SignInButton, SignOutButton } from "@clerk/clerk-react";
import { useEffect } from "react";

export default function Home() {
  const tasks = useQuery(api.tasks.get);
  const { isLoading, isAuthenticated } = useConvexAuth();

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
          {tasks?.map(({ _id, name }) => (
            <div key={_id} className="text-white">
              {name}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
