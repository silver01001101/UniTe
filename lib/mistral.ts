import { Mistral } from "@mistralai/mistralai";

export type ChatMessage = { role: "user" | "assistant" | "system"; content: string };

const SYSTEM_PROMPT = `You are UniTe's career advisor — a knowledgeable, warm, and practical guide helping UK students choose universities based on their career goals.

You have deep knowledge of:
- UK university strengths, rankings, and graduate employment outcomes
- UK internship markets by sector (finance, technology, law, consulting, engineering)
- Outreach and social mobility programmes at UK universities
- The UniTe Score (a composite score weighing academic quality, graduate employment, internship access, student satisfaction, and outreach provision)

When giving advice:
- Be specific about universities (name real places like UCL, LSE, Warwick, etc.)
- Link career goals to both academic programmes and internship/employer proximity
- Mention relevant DEI programmes when appropriate
- Keep responses concise — 3–5 paragraphs max
- If asked about a specific career, suggest 3–5 universities with reasons`;

export function createMistralClient() {
  return new Mistral({ apiKey: process.env.MISTRAL_API_KEY });
}

export async function streamMistralChat(
  messages: ChatMessage[]
): Promise<ReadableStream<Uint8Array>> {
  const client = createMistralClient();

  const allMessages: ChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages,
  ];

  const stream = await client.chat.stream({
    model: "mistral-small-latest",
    messages: allMessages as Parameters<typeof client.chat.stream>[0]["messages"],
  });

  return new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const chunk of stream) {
          const raw = chunk.data.choices[0]?.delta?.content ?? "";
          const text = typeof raw === "string" ? raw : "";
          if (text) controller.enqueue(encoder.encode(text));
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });
}
