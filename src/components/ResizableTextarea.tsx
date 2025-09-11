'use client';

import { useEffect } from "react"

export default function ResizableTextarea({ ref, value, onChange }: { ref: React.RefObject<HTMLTextAreaElement | null>, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void }) {
  useEffect(() => {
    const minRows = 1,
      maxRows = 5;
    const el = ref.current;
    if (!el) return;

    // Start from minimal height
    el.rows = minRows;
    el.style.height = 'auto';

    // Grow to content
    el.style.height = `${el.scrollHeight}px`;

    const cs = window.getComputedStyle(el);
    const lineHeight = parseFloat(cs.lineHeight || '0') || 0;
    if (lineHeight) {
      const max = maxRows * lineHeight
        + parseFloat(cs.paddingTop)
        + parseFloat(cs.paddingBottom)
        + parseFloat(cs.borderTopWidth)
        + parseFloat(cs.borderBottomWidth);
      if (el.scrollHeight > max) el.style.height = `${max}px`;
    }
  }, [ref, value])

  return (
    <textarea
      onChange={onChange}
      value={value}
      ref={ref}
      id="promt"
      rows={1}
      placeholder="Введите запрос..."
      className="scrollbar-hide w-9/10 p-3 lg:p-5 resize-none bg-transparent hover:border-transparent hover:outline-none focus:outline-none"
      />
  )
}