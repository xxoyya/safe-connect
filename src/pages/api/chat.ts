// React에서 사용할 수 있는 간단한 채팅 응답 함수

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatRequest {
  messages: ChatMessage[];
}

export interface ChatResponse {
  reply: string;
}

// 정해진 답변을 반환하는 함수
export function getChatResponse(request: ChatRequest): ChatResponse {
  const { messages } = request;
  
  if (!Array.isArray(messages)) {
    return { reply: "메시지 형식이 올바르지 않습니다." };
  }

  // 마지막 사용자 메시지 가져오기
  const lastUserMsg = [...messages].reverse().find((m: ChatMessage) => m.role === "user");
  const userText = lastUserMsg?.content?.toString() || "";

  let reply = "죄송해요, 이해하지 못했어요.";

  if (userText.includes("안녕")) reply = "안녕하세요! 무엇을 도와드릴까요?";
  else if (userText.includes("상담")) reply = "편하게 말씀해 주세요. 제가 함께 고민을 들어드릴게요🙂";
  else if (userText.includes("감사")) reply = "별말씀을요. 도움이 되었다니 기뻐요!";

  return { reply };
}

// 기본 export
export default getChatResponse;