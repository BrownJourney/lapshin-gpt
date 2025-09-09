export type ChatMessage = {
  role: "user" | "assistant" | "system";
  message: string;
}