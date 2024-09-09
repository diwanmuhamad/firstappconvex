"use client";
import { SignInButton } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
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
  const [isFirst, setIsFirst] = useState(true);

  console.log(isLoading);

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
          <h2 className="mt-[20px] text-white">Please wait...</h2>
        </div>
      ) : (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-[#000814]">
          {!isAuthenticated ? (
            <>
              <h3 className="text-white">MovinAI</h3>
              <h1 className="text-white text-xxxl mt-[15px] text-center">
                Explore Smarter. Travel Better. Discover the World.
              </h1>
              <h2 className="text-white text-justify mt-3">
                Your journey, perfectly tailored – from dream to destination
                with just a few clicks.
              </h2>
              <div className="bg-yellow-400 rounded shadow-xl p-4 mt-[50px]">
                <SignInButton mode="modal">Get Started</SignInButton>
              </div>
            </>
          ) : null}
        </main>
      )}
    </>
  );
}
