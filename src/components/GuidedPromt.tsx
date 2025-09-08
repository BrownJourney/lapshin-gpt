"use client";

export default function GuidedPromt({ text }: { text: string }) {
  return (
    <div className="transition cursor-pointer flex-row px-10 py-3 border border-[#5D5D5D] bg-[#3A3A3A] hover:bg-[#585858] rounded-xl">
        <span>{text}</span>
    </div>
  )
}