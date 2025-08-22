import { useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import "../components/chatPage/Chat.css";

function Chat() {
  const [messages, setMessages] = useState<{ sender: "bot" | "user"; text: string }[]>([
    {
      sender: "bot",
      text: "안녕하세요. 저는 당신이 겪고 있는 상황을 함께 들어주고, 가정폭력 가능성을 조심스럽게 살펴보는 상담 보조 챗봇입니다.\n\n제가 드리는 판단은 단정이 아니라 참고용 안내이며, 더 깊은 상담이 필요할 수 있습니다. 편안하게 이야기해주시면, 가능한 한 따뜻하게 도와드리겠습니다🙂"
    }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
  };

  return (
    <div className="chat-container">
      <Title text="챗봇 상담" />
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input-box">
        <input
          type="text"
          placeholder="당신의 고민을 들려주세요"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button onClick={handleSend} text="전송" />
      </div>
    </div>
  );
}

export default Chat;
