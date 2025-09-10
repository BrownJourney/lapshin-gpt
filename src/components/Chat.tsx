'use client';

import { useEffect, useState, useRef } from "react";

import Chatbox from "./Chatbox"
import ChatHistory from "./ChatHistory";

import { ChatMessage } from "@/types";

export default function Chat({ setInitialized, setGenerating, generating }: { setInitialized: any, setGenerating: any, generating: boolean }) {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const chatRef = useRef<HTMLDivElement | null>(null);

  const addChatBubble = (text: ChatMessage["message"], role: ChatMessage["role"]) => {
    setHistory(prev => [
      ...prev,
      {
        role: role,
        message: text
      }
    ]);
  };
  
  const sendPromt = (promtText: string) => {
    setInitialized(true);
    setGenerating(true);

    addChatBubble(promtText, "user");
    setTimeout(() => {
      setGenerating(false)
      setTimeout(() => {
        addChatBubble("Fuck you, i will not respond to your nonsense!", "assistant")
      }, 250)
    }, 3000)
  };

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history])

  return (
    <div className="flex flex-col items-center justify-between h-screen p-10 z-2 w-2/4">
      <ChatHistory chatRef={chatRef} history={history} setHistory={setHistory} generating={generating} />
      <Chatbox sendPromt={sendPromt} />
    </div>
  )
}