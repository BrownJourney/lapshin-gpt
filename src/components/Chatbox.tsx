'use client';

import { useState, useEffect, useRef } from "react";

import ResizableTextarea from "./ResizableTextarea"
import GuidedPromt from "./GuidedPromt"

export default function Chatbox({ sendPromt }: { sendPromt: any }) {
  const [text, setText] = useState('');
  const outerRef = useRef<HTMLDivElement | null>(null);   // animated wrapper
  const innerRef = useRef<HTMLDivElement | null>(null);   // auto-sized content

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const apply = () => {
      // read before any writes
      const prevBottom = outer.getBoundingClientRect().bottom;

      // measure target height (inner content)
      const h = inner.getBoundingClientRect().height;

      // include outer padding + borders so we don’t under/overshoot
      const cs = getComputedStyle(outer);
      const extra =
        parseFloat(cs.paddingTop) +
        parseFloat(cs.paddingBottom) +
        parseFloat(cs.borderTopWidth) +
        parseFloat(cs.borderBottomWidth);

      // write
      outer.style.height = `${h + extra}px`;

      // read after write and compensate scroll to prevent jump
      const nextBottom = outer.getBoundingClientRect().bottom;
      const delta = nextBottom - prevBottom;
      if (delta !== 0) window.scrollBy(0, delta);
    };

    // initial
    requestAnimationFrame(apply);

    // keep in sync with content changes without thrashing layout
    const ro = new ResizeObserver(() => {
      // batch to next frame so read/write happen together
      requestAnimationFrame(apply);
    });
    ro.observe(inner);

    return () => ro.disconnect();
  }, []);

  const promtWrapper = () => {
    sendPromt(text)
    setText("")
  }

  const recommendedPromts = [
    {
      name: "General Information",
      text: "Tell me about yourself",
    },
    {
      name: "Projects",
      text: "I want to learn about your projects",
    },
    {
      name: "Achievements",
      text: "Let me know about your achievements",
    },
  ]

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <span className="text-sm uppercase opacity-50 font-medium">recommended promts</span>

        <div className="flex flex-row gap-2">
          {recommendedPromts.map(promt => {
            return (
              <GuidedPromt key={promt.name} text={promt.name} promt={promt.text} setText={setText} />
            )
          })}
        </div>
      </div>

      <div ref={outerRef} className="overflow-hidden transition-[height] duration-200 ease-out relative bg-[#373737] border border-[#606060] rounded-2xl flex flex-row align-center items-center">
        <ResizableTextarea
          ref={innerRef}
          value={text}
          onChange={(e : React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
        />
        <div className="absolute bottom-2 right-2 flex flex-row gap-2">
            <div className={`transition duration-200 cursor-pointer bg-[url('../../public/send.svg')] opacity-50 rounded-full p-6 bg-center bg-no-repeat bg-size-[20px] hover:bg-[#474747] hover:opacity-100 ${text.length > 0 ? "--active" : "--inactive"}`} onClick={promtWrapper}></div>
        </div>
      </div>

      <span className="text-sm text-center font-normal opacity-50">LapshinGPT can’t make mistakes. All information is correct</span>
    </div>
  )
}