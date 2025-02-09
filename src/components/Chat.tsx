import React, { useState } from "react";
import { sendChatMessage } from "../../services/api"; // We'll define this
import ReactMarkdown from "react-markdown";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Add the user message to the chat
    const newUserMessage: ChatMessage = {
      role: "user",
      content: inputValue,
    };
    setMessages((prev) => [...prev, newUserMessage]);

    // Send message to the backend
    try {
      const responseData = await sendChatMessage(inputValue);
      // The response from the orchestrator is likely an array of messages
      // For simplicity, we take the last message or join them
      const newAssistantMessage: ChatMessage = {
        role: "assistant",
        content: responseData.join("\n"),
      };
      setMessages((prev) => [...prev, newAssistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      // You could display an error message in the UI
    }

    setInputValue("");
  };

  return (
    <div className="chat-container">
      <div className="chat-header">AI Assistant</div>
      <div className="messages">
        {messages.map((m, index) => (
          <div
            key={index}
            className={`message ${m.role === "user" ? "user" : "assistant"}`}
          >
            {m.role === "user" ? (
              <strong>User:</strong>
            ) : (
              <strong>AI Assistant:</strong>
            )}
            <ReactMarkdown>{m.content}</ReactMarkdown>
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Type your question"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
