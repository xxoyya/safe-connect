/* AI 키가 필요한데.. 우선 넣어는 놨습니다 */

/*
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST만 허용됩니다." });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "messages 배열이 필요합니다." });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    const reply = completion.choices[0].message?.content || "응답이 없습니다.";
    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "OpenAI API 호출 실패" });
  }
}

*/

// 정해진 답변
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST만 허용됩니다." });

  const { messages } = req.body;
  if (!Array.isArray(messages)) return res.status(400).json({ error: "messages 배열 필요" });

  // 마지막 사용자 메시지 가져오기 (원본 훼손 X)
  const lastUserMsg = [...messages].reverse().find((m: any) => m.role === "user");
  const userText = lastUserMsg?.content?.toString() || "";

  let reply = "죄송해요, 이해하지 못했어요.";

  if (userText.includes("안녕")) reply = "안녕하세요! 무엇을 도와드릴까요?";
  else if (userText.includes("상담")) reply = "편하게 말씀해 주세요. 제가 함께 고민을 들어드릴게요🙂";
  else if (userText.includes("감사")) reply = "별말씀을요. 도움이 되었다니 기뻐요!";

  res.status(200).json({ reply });
}