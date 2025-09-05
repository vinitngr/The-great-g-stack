"use client"

import StackGenerator from "@/components/Generator";
import { Analytics } from "@vercel/analytics/next"
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <StackGenerator />
      <Analytics />
    </main>
  );
}
