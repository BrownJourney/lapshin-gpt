import Chat from "@/components/Chat";

export default function Home() {
  return (
    <div className="h-screen">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-4xl font-bold">Welcome to LapshinGPT</span>
          <span className="text-lg opacity-50 font-medium">The most advanced AI that knows everything about only one human</span>
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-3xl">
        <div className="sphere"></div>
      </div>

      <Chat />
    </div>
  );
}
