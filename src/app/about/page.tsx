"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function About() {
  const tasks = useQuery(api.tasks.get);
 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <p>Test</p>
    </main>
  );
}
