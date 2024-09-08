"use client";
import { SignInButton } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useStoreUserEffect } from "./function/useStoreUserEffect";
import { useRouter } from "next/navigation";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

// Loading icon for Spin
const antIcon = (
  <LoadingOutlined style={{ fontSize: 48, color: "white" }} spin />
);

export default function Home() {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useStoreUserEffect();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/trip");
    }
  }, [isAuthenticated]);

  return (
    <>
      {!isAuthenticated && isLoading ? (
        <div className="min-h-screen bg-[#000814] flex flex-col items-center justify-center">
          <Spin indicator={antIcon} />
          <h2 className="mt-[20px] text-white">Please wait, redirecting...</h2>
        </div>
      ) : (
        <main className="flex min-h-screen flex-col items-center p-24 bg-[#000814]">
          {!isAuthenticated ? (
            <>
              <h2 className="text-white text-4xl">MovinAI</h2>
              <div className="bg-yellow-400 rounded shadow-xl p-4">
                <SignInButton mode="modal">Get Started</SignInButton>
              </div>
            </>
          ) : null}
        </main>
      )}
    </>
  );
}
