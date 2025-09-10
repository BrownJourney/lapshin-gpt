"use client";

export default function GuidedPromt({ 
  text,
  promt,
  sendPromt 
}: {
    text: string,
    promt: string,
    sendPromt: React.Dispatch<React.SetStateAction<string>>
  }) {
  return (
    <div
      className="transition cursor-pointer flex-row px-10 py-3 border w-24/50 flex items-center justify-center text-center border-[#5D5D5D] bg-[#3A3A3A] hover:bg-[#585858] rounded-xl"
      onClick={() => sendPromt(promt)}
    >
      <span>{text}</span>
    </div>
  )
}