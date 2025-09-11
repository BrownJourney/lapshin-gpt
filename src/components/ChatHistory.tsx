'use client';

import { ChatMessage } from "@/types";

export default function ChatHistory({ history, generating, chatRef }: { history: ChatMessage[], generating: boolean, chatRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div className="flex flex-col gap-4 overflow-scroll pt-20 w-full pb-10 scrollbar-hide">
      {history.map((chatMsg: ChatMessage, index: number) => {
        return (
          <div key={index} className={`message flex opacity-90 bg-[#303030] border border-[#414141] p-3 px-6 rounded-2xl rounded-br-sm ${chatMsg.role === "user" ? "self-end lg:max-w-2/4" : "self-start text-[#eeeeee] --assistant"}`}>
            <div ref={chatRef}></div>
            <div className="flex flex-row gap-2">
              {chatMsg.role === "assistant" && (<div className="bg-[url('../../public/ai.svg')] bg-center bg-no-repeat bg-contain min-w-[24px] min-h-[24px] h-[24px] invert"></div>)}
              <span className="font-normal text-wrap" dangerouslySetInnerHTML={{ __html: chatMsg.message }} />
            </div>
          </div>
        )
      })}

      <div className={`loader ${generating ? "--loading" : ""}`}></div>
    </div>
  )
}