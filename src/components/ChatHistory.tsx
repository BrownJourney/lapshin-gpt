'use client';

import { ChatMessage } from "@/types";

export default function ChatHistory({ history, generating, chatRef }: { history: ChatMessage[], generating: boolean, chatRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div className="flex flex-col gap-4 overflow-scroll pt-20 w-full pb-10 scrollbar-hide">
      {history.map((chatMsg: ChatMessage, index: number) => {
        return (
          <div key={index} className={`message flex opacity-90 bg-[#303030] border border-[#414141] p-3 px-6 rounded-2xl rounded-br-sm ${chatMsg.role === "user" ? "self-end max-w-2/4" : "self-start text-[#eeeeee] --assistant"}`}>
            <span className="font-normal text-wrap" dangerouslySetInnerHTML={{ __html: chatMsg.message }} />
          </div>
        )
      })}

      <div className={`loader ${generating ? "--loading" : ""}`}></div>

      <div ref={chatRef}></div>
    </div>
  )
}