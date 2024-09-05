"use client";
import { SignInButton} from "@clerk/clerk-react";
import { useEffect } from "react";
import { useStoreUserEffect } from "./function/useStoreUserEffect";
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const { isLoading, isAuthenticated } = useStoreUserEffect();

  useEffect(()=> {
    if (isAuthenticated) {
      router.push('/trip')
    }
  },[isAuthenticated])

  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {!isAuthenticated ? (
          <div className="bg-red-400 rounded shadow-xl p-4">
            <SignInButton mode="modal" />
          </div>
        ) : null}
      </main>
  );
}


