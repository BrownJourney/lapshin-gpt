# LapshinGPT — AI Portfolio

A lightweight, fast, and elegant personal AI portfolio and chat playground built with **Next.js**, **TypeScript**, and **Tailwind CSS**.  
LapshinGPT showcases projects, skills, and an interactive AI chat with small UX touches (animations, keyboard shortcuts, and thoughtful markdown rendering).

---

## ✨ Features

- **AI Chat Interface**
  - Prompt box with Enter-to-send (and Shift+Enter for newline)
  - Optional “guided prompts” chips
  - Markdown rendering with HTML escaping for safety
  - Keeps `previousResponseId` to link replies in a session

- **Polished UI/UX**
  - Tailwind CSS for responsive layout
  - Framer-like micro-animations for headings/letters
  - Dark, minimal aesthetic by default

- **Modern Web Stack**
  - Next.js App Router
  - TypeScript everywhere
  - ESLint already wired

---

## 🧱 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **UI:** Tailwind CSS
- **Animation:** Framer Motion (optional in components)
- **API:** `/api/chat` route for model calls (plug in your provider)
```bash
git clone https://github.com/BrownJourney/lapshin-gpt.git
cd lapshin-gpt
npm install
