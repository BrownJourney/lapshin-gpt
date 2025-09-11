'use client';

import { motion } from "framer-motion";

import { useEffect, useState } from "react";

import Chat from "@/components/Chat";

export default function Home() {
  const [generating, setGenerating] = useState<boolean>(false)
  const [initialized, setInitialized] = useState<boolean>(false)
  const [animating, setAnimating] = useState<boolean>(true)

  const renderMotionText = (text: string) => {
    // keeps words intact; break happens only between word spans
    return text.split(" ").map((word, wi) => (
      <span key={wi} className="inline-block mr-2">
        {word.split("").map((char, ci) => (
          <motion.span
            key={`${wi}-${ci}`}
            className="inline-block cursor-pointer"
            whileHover={{
              y: -8,
              scale: 0.8,
              transition: { type: "spring", stiffness: 400, damping: 10 },
            }}
          >
            {char}
          </motion.span>
        ))}
        {/* add the space after each word so layout stays natural */}
      </span>
    ));
  };

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false)
    }, 3000)
  })

  return (
    <div className="h-[100dvh] flex flex-col items-center pt-safe overflow-hidden">
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-5 w-full ${initialized ? "pointer-events-none" : ""}`}>
        <div className={`flex transition px-4 duration-500 flex-col items-center gap-2 ${initialized ? "--hidden" : ""}`}>
          <span className="text-center text-2xl xl:text-4xl font-bold title-anim">
            {renderMotionText("Вас приветствует LapshinGPT")}
          </span>
          <span className="text-center text-sm xl:text-lg opacity-50 font-medium subtitle-anim">Самая продвинутая нейронная сеть которая знает всю информацию об одном человеке</span>
        </div>
      </div>

      <div className="absolute w-screen h-screen top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none">
        <div className={`sphere ${initialized ? "--thinking" : ""}`}></div>
        <div className={`sphere --invalid --thinking ${generating ? "--generating" : ""}`}></div>
      </div>

      {!animating && (<Chat setInitialized={setInitialized} generating={generating} setGenerating={setGenerating} />)}
    </div>
  );
}
