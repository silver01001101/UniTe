import { NextRequest } from "next/server";
import { streamMistralChat, type ChatMessage } from "@/lib/mistral";

export async function POST(req: NextRequest) {
  const { messages } = (await req.json()) as { messages: ChatMessage[] };

  if (!messages?.length) {
    return new Response("No messages provided", { status: 400 });
  }

  const stream = await streamMistralChat(messages);
  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
