'use client';

import { motion } from "framer-motion";

import { useState } from "react";

import Chat from "@/components/Chat";

export default function Home() {
  const [generating, setGenerating] = useState<boolean>(false)
  const [initialized, setInitialized] = useState<boolean>(false)

  const renderMotionText = (text: string) => {
    return text.split("").map((char, i) => (
      <motion.span
        key={i}
        className="inline-block cursor-pointer"
        whileHover={{
          y: -8, // bump up
          scale: 1.2, // little grow
          transition: { type: "spring", stiffness: 400, damping: 10 },
        }}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))
  }

  return (
    <div className="h-screen flex flex-col items-center">
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-5 w-full ${initialized ? "pointer-events-none" : ""}`}>
        <div className={`flex transition px-4 duration-500 flex-col items-center gap-2 ${initialized ? "--hidden" : ""}`}>
          <span className="text-center text-2xl xl:text-4xl font-bold">
            {renderMotionText("Welcome to Lapshin GPT")}
          </span>
          <span className="text-center text-sm xl:text-lg opacity-50 font-medium">The most advanced AI that knows everything about only one human</span>
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
