'use client';

import { useState, useEffect, useRef } from "react";

import ResizableTextarea from "./ResizableTextarea"
import GuidedPromt from "./GuidedPromt"

type Promts = {
  name: string,
  text: string
}

export default function Chatbox({ sendPromt, generating }: { sendPromt: (promtText: string) => Promise<void>, generating: boolean }) {
  const [text, setText] = useState<string>('');
  const outerRef = useRef<HTMLDivElement | null>(null);   // animated wrapper
  const innerRef = useRef<HTMLTextAreaElement | null>(null);   // auto-sized content
  const buttonRef = useRef<HTMLDivElement | null>(null) // send button

  useEffect(() => {
    const outer: HTMLDivElement | null = outerRef.current;
    const inner: HTMLTextAreaElement | null = innerRef.current;
    if (!outer || !inner) return;

    const apply = (): void => {
      // read before any writes
      const prevBottom: number = outer.getBoundingClientRect().bottom;

      // measure target height (inner content)
      const h: number = inner.getBoundingClientRect().height;

      // include outer padding + borders so we don’t under/overshoot
      const cs: CSSStyleDeclaration = getComputedStyle(outer);
      const extra: number =
        parseFloat(cs.paddingTop) +
        parseFloat(cs.paddingBottom) +
        parseFloat(cs.borderTopWidth) +
        parseFloat(cs.borderBottomWidth);

      // write
      outer.style.height = `${h + extra}px`;

      // read after write and compensate scroll to prevent jump
      const nextBottom: number = outer.getBoundingClientRect().bottom;
      const delta: number = nextBottom - prevBottom;
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

  const promtWrapper = (): void => {
    if (generating) return;
    if (!text) return;
    sendPromt(text);
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      buttonRef.current?.click(); // simulate button click
    }
  };

  const recommendedPromts: Promts[] = [
    {
      name: "Общая информация",
      text: "Расскажи о себе",
    },
    {
      name: "Опыт работы",
      text: "Я хочу узнать о твоем опыте работы",
    },
    {
      name: "Достижения",
      text: "Какие у тебя есть личные достижения?",
    },
    {
      name: "Социальные сети",
      text: "Дай мне ссылки на свои соц.сети",
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-2 pt-5">
        <span className="text-sm uppercase opacity-50 font-medium">рекомендуемые запросы</span>

        <div className="flex flex-row gap-2 justify-between overflow-x-auto lg:overflow-hidden lg:flex-wrap scroll">
          {recommendedPromts.map(promt => {
            return (
              <GuidedPromt key={promt.name} text={promt.name} promt={promt.text} sendPromt={sendPromt} />
            )
          })}
        </div>
      </div>

      <div ref={outerRef} className="overflow-hidden transition-[height] duration-200 ease-out relative bg-[#373737] border border-[#606060] rounded-2xl flex flex-row align-center items-center">
        <ResizableTextarea
          ref={innerRef}
          value={text}
          onChange={(e : React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
          onInput={(e : React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="absolute bottom-0 lg:bottom-2 right-2 flex flex-row gap-2">
            <div ref={buttonRef} className={`transition duration-200 cursor-pointer bg-[url('../../public/send.svg')] opacity-50 rounded-full p-6 bg-center bg-no-repeat bg-size-[20px] hover:bg-[#474747] hover:opacity-100 ${text.length > 0 ? "--active" : "--inactive"}`} onClick={promtWrapper}></div>
        </div>
      </div>

      <span className="text-sm text-center font-normal opacity-50">LapshinGPT не может допускать ошибки. Никогда.</span>
    </div>
  )
}