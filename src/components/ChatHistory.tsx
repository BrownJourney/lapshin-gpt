'use client';

import { ChatMessage } from "@/types";

export default function ChatHistory({ history, setHistory, generating, chatRef }: { history: ChatMessage[], setHistory: any, generating: boolean, chatRef: any }) {
  return (
    <div className="flex flex-col gap-4 overflow-scroll pt-20 w-full pb-10">
      {history.map((chatMsg: ChatMessage, index: number) => {
        return (
          <div key={index} className={`message flex opacity-90 bg-[#303030] border border-[#414141] p-3 px-6 rounded-2xl ${chatMsg.role === "user" ? "self-end max-w-2/4" : "self-start --assistant"}`}>
            <span className="font-medium text-wrap">{chatMsg.message}</span>
          </div>
        )
      })}

      <div className={`loader ${generating ? "--loading" : ""}`}></div>

      <div ref={chatRef}></div>
    </div>
  )
}