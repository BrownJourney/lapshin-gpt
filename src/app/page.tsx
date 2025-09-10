'use client';

import { useState } from "react";

import Chat from "@/components/Chat";

export default function Home() {
  const [generating, setGenerating] = useState(false)
  const [initialized, setInitialized] = useState(false)

  return (
    <div className="h-screen flex flex-col items-center">
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-5 ${initialized ? "pointer-events-none" : ""}`}>
        <div className={`flex transition duration-500 flex-col items-center gap-2 ${initialized ? "--hidden" : ""}`}>
          <span className="text-4xl font-bold">Welcome to LapshinGPT</span>
          <span className="text-lg opacity-50 font-medium">The most advanced AI that knows everything about only one human</span>
        </div>
      </div>

      <div className="absolute w-screen h-screen top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none">
        <div className={`sphere ${initialized ? "--thinking" : ""}`}></div>
        <div className={`sphere --invalid --thinking ${generating ? "--generating" : ""}`}></div>
      </div>

      <Chat setInitialized={setInitialized} generating={generating} setGenerating={setGenerating} />
    </div>
  );
}
