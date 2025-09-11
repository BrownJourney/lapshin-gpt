'use client';

import { useEffect, useState, useRef } from "react";

import Chatbox from "./Chatbox"
import ChatHistory from "./ChatHistory";

import { ChatMessage } from "@/types";

type APIResponse = {
  previousResponseId: string,
  response: string
};

export default function Chat({ setInitialized, setGenerating, generating }: { setInitialized: React.Dispatch<React.SetStateAction<boolean>>, setGenerating: React.Dispatch<React.SetStateAction<boolean>>, generating: boolean }) {
  const [history, setHistory] = useState<ChatMessage[]>([]);
  const [animLoading, setAnimLoading] = useState<boolean>(false);
  const [prevResponseId, setPrevResponseId] = useState<string>("");
  const chatRef = useRef<HTMLDivElement | null>(null);

  const addChatBubble = (text: ChatMessage["message"], role: ChatMessage["role"]): void => {
    setHistory(prev => [
      ...prev,
      {
        role: role,
        message: text
      }
    ]);
  };
  
  const sendPromt = async (promtText: string): Promise<void> => {
    if (generating) return;

    setInitialized(true);
    setGenerating(true);
    setAnimLoading(true);

    addChatBubble(promtText, "user");

    const endpoint = "/api/chat/";

    const res: APIResponse = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({
        payload: {
          text: promtText,
          id: prevResponseId
        } 
      })
    }).then(res => res.json());

    setPrevResponseId(res.previousResponseId);
    setAnimLoading(false);

    setTimeout(() => {
      let text: string = res.response
      text = text.replaceAll("<", "&lt;");
      text = text.replaceAll(">", "&gt;");
      text = text.replaceAll("$", "&dollar;");
      text = text.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');
      text = text.replace(/\*(.+?)\*/g, '<i>$1</i>');
      text = text.replace(/```[^\n]*\n([\s\S]*?)```/g, (_: string, codeContent: string): string => {
          codeContent = codeContent.replaceAll("<", "&lt;");
          codeContent = codeContent.replaceAll(">", "&gt;");
          return codeContent.trim();
      })
      text = text.replace(/`([^`]+?)`/g, '<code>$1</code>');
      text = text.replace(/^## (.*)/gm, '<h1>$1</h1>');
      text = text.replace(/^### (.*)/gm, '<h2>$1</h2>');
      text = text.replace(/\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^\s)]+)\)/g, (_m: string, text: string, url: string): string => {
        const isHttp = /^https?:\/\//i.test(url);
        const extra = isHttp ? ' target="_blank" rel="noopener noreferrer"' : '';
        return `<a href="${url}"${extra}>${text}</a>`;
      });

      text = text.replace(/---/g, `<div class="divider"></div>`)


      addChatBubble(text, "assistant");
      setGenerating(false);
    }, 250);
  };

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history])

  return (
    <div className="flex flex-col items-center justify-between h-screen p-4 lg:p-10 z-2 w-full sm:w-9/10 xl:w-2/4">
      <ChatHistory chatRef={chatRef} history={history} generating={animLoading} />
      <Chatbox generating={generating} sendPromt={sendPromt} />
    </div>
  )
}