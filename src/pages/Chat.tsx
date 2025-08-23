import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import botPrompt from "../components/chatPage/botPrompt.json"; // { content: "시스템 프롬프트" }
import "./Chat.css";
import { getChatResponse } from "./api/chat";

export type ChatMessage = {
  id: string;
  role: "bot" | "user";
  text: string;
  time?: string;
};

const initialMessages: ChatMessage[] = [
  {
    id: "m1",
    role: "bot",
    text:
      "안녕하세요. 저는 당신이 겪고 있는 상황을 함께 들어주고, 가정폭력 가능성을 조심스럽게 살펴보는 상담 보조 챗봇입니다.\n\n" +
      "제가 드리는 판단은 단정이 아니라 참고용 안내이며, 더 깊은 상담이 필요할 수 있습니다. 편안하게 이야기해주시면, 가능한 한 따뜻하게 도와드리겠습니다🙂",
    time: "any time",
  },
];

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  // 메시지 추가 시 스크롤 맨 아래로
  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length]);

  const nowLabel = () => {
    const d = new Date();
    let h = d.getHours();
    const m = d.getMinutes().toString().padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${ampm} ${h.toString().padStart(2, "0")}:${m}`;
  };

  const send = async () => {
    const text = input.trim();
    if (!text) return;

    // 사용자 메시지 먼저 추가
    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", text, time: nowLabel() };
    setMessages((prev) => {
      const newMessages = [...prev, userMsg];
      callApi(newMessages); // API 호출
      return newMessages;
    });
    setInput("");
  };

  // API 호출 함수
  const callApi = async (currentMessages: ChatMessage[]) => {
    try {
      // API 호출 대신 직접 함수 사용
      const response = await getChatResponse({
        messages: [
          { role: "system" as const, content: botPrompt.content },
          ...currentMessages.map((m) => ({
            role: (m.role === "bot" ? "assistant" : "user") as "user" | "assistant",
            content: m.text,
          })),
        ],
      });


      const reply: ChatMessage = {
        id: crypto.randomUUID(),
        role: "bot",
        text: response.reply || "응답을 불러오지 못했어요.",
        time: nowLabel(),
      };
      setMessages((prev) => [...prev, reply]);
    } catch {
      const errorMsg: ChatMessage = {
        id: crypto.randomUUID(),
        role: "bot",
        text: "에러가 발생했어요. 다시 시도해주세요.",
        time: nowLabel(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  return (
    <div className="chat-shell">
      <header className="chat-header">챗봇 상담</header>

      <div className="chat-body" ref={listRef}>
        {messages.map((m) => (
          <div key={m.id} className={`msg-row ${m.role === "user" ? "right" : "left"}`}>
            {m.role === "bot" && (
              <div className="avatar" aria-hidden>
                <img src={logo} alt="로고" />
              </div>
            )}

            <div className={`bubble ${m.role}`}>
              {m.text.split("\n\n").map((block, i) => (
                <p key={i} className="bubble-text">{block}</p>
              ))}
              {m.time && <div className="timestamp">{m.time}</div>}
            </div>

            {m.role === "user" && <div className="spacer" aria-hidden />}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          className="input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder="당신의 고민을 들려주세요"
          aria-label="메시지 입력"
        />
        <button className="send" onClick={send} aria-label="전송">➤</button>
      </div>
    </div>
  );
}
