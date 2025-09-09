'use client';

import { useState } from "react";

import Chatbox from "./Chatbox"
import ChatHistory from "./ChatHistory";

import { ChatMessage } from "@/types";

export default function Chat({ setInitialized }: { setInitialized: any }) {
  const [history, setHistory] = useState<ChatMessage[]>([]);

  const sendPromt = (promtText: string) => {
    setInitialized(true);
  };

  return (
    <div className="flex flex-col items-center justify-between h-screen p-10 z-2">
      <ChatHistory history={history} setHistory={setHistory} />
      <Chatbox sendPromt={sendPromt} />
    </div>
  )
}