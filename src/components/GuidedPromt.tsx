"use client";

export default function GuidedPromt({ text, promt, setText }: { text: string, promt: string, setText: any }) {
  const shortcutPromt = () => {
    setText(promt)
  }

  return (
    <div className="transition cursor-pointer flex-row px-10 py-3 border border-[#5D5D5D] bg-[#3A3A3A] hover:bg-[#585858] rounded-xl" onClick={shortcutPromt}>
        <span>{text}</span>
    </div>
  )
}