// src/api/chat.ts
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

type ChatRequest = {
  messages: { role: "system" | "user" | "assistant"; content: string }[];
};

export async function getChatResponse(req: ChatRequest) {
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini", // 원하는 모델로 교체 가능
    messages: req.messages,
  });

  return {
    reply: completion.choices[0]?.message?.content ?? "",
  };
}
