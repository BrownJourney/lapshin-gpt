"use client";

export default function GuidedPromt({ 
  text,
  promt,
  sendPromt 
}: {
    text: string,
    promt: string,
    sendPromt: (promtText: string) => Promise<void>
  }) {
  return (
    <div
      className="transition cursor-pointer flex-row px-5 lg:px-10 py-2 lg:py-3 border min-w-[200px] lg:w-24/50 flex items-center justify-center text-center border-[#5D5D5D] bg-[#3A3A3A] hover:bg-[#585858] rounded-xl"
      onClick={() => sendPromt(promt)}
    >
      <span>{text}</span>
    </div>
  )
}