import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) {
      setError("Vui lòng nhập nội dung trước khi gửi");
      return;
    }

    setError(null);
    const userMessage = { role: "user", text: input, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/api/genai",
        {
          message: input,
        },
        {
          timeout: 30000,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      if (res.data.success) {
        const aiMessage = {
          role: "ai",
          text: res.data.reply,
          timestamp: new Date(),
          safetyRatings: res.data.safetyRatings,
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        throw new Error(res.data.message || "Lỗi không xác định từ server");
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        err.message ||
        "Lỗi kết nối đến AI, vui lòng thử lại sau";
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text: errorMsg,
          isError: true,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="chat-container">
      <h2 className="chat-header">🔮 Gemini Chat</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.role} ${msg.isError ? "error" : ""}`}
          >
            <div className="message-header">
              <b>{msg.role === "user" ? "Bạn" : "Gemini"}</b>
              <span className="message-time">{formatTime(msg.timestamp)}</span>
            </div>
            <div className="message-content">{msg.text}</div>
          </div>
        ))}
        {loading && (
          <div className="message ai">
            <div className="message-header">
              <b>Gemini</b>
            </div>
            <div className="message-content loading">Đang trả lời...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Nhập nội dung..."
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()}>
          {loading ? "Đang gửi..." : "Gửi"}
        </button>
      </div>

      <style jsx>{`
        .chat-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }

        .chat-header {
          text-align: center;
          color: #4a4a4a;
          margin-bottom: 20px;
        }

        .error-message {
          color: #d32f2f;
          background: #ffebee;
          padding: 8px 12px;
          border-radius: 4px;
          margin-bottom: 10px;
        }

        .chat-messages {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 15px;
          height: 400px;
          overflow-y: auto;
          margin-bottom: 15px;
          background: #f9f9f9;
        }

        .message {
          margin-bottom: 12px;
          padding: 8px 12px;
          border-radius: 8px;
          max-width: 80%;
          word-wrap: break-word;
        }

        .message.user {
          margin-left: auto;
          background: #e3f2fd;
          border-bottom-right-radius: 2px;
        }

        .message.ai {
          margin-right: auto;
          background: #f1f1f1;
          border-bottom-left-radius: 2px;
        }

        .message.error {
          background: #ffebee;
          color: #d32f2f;
        }

        .message-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 4px;
          font-size: 0.9em;
        }

        .message-time {
          color: #757575;
          font-size: 0.8em;
        }

        .message-content {
          line-height: 1.4;
        }

        .message-content.loading {
          color: #9e9e9e;
          font-style: italic;
        }

        .chat-input {
          display: flex;
          gap: 10px;
        }

        .chat-input input {
          flex: 1;
          padding: 10px;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
          font-size: 16px;
        }

        .chat-input button {
          padding: 10px 20px;
          background: #1976d2;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }

        .chat-input button:disabled {
          background: #b0bec5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default ChatApp;
