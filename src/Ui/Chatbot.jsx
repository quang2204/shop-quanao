import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { CloseOutlined } from "@ant-design/icons";

const ChatApp = ({ close }) => {
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
    // <div className="chat-container">
    //   <div style={{ boxShadow: " 2px 7px 14px 1px #cfc9c9" }}>
    //     {error && <div className="error-message">{error}</div>}
    //     <div className="flex gap-2 items-center bg-blue-400 rounded-t px-3 py-2 justify-between">
    //       <div className="flex gap-2 items-center">
    //         <img
    //           src="https://media-public.canva.com/r4Rpw/MAGLXGr4Rpw/1/tl.png"
    //           width={40}
    //           alt="img"
    //         />
    //         <h4 className="text-lg text-white">Trợ lý của Coza Store</h4>
    //       </div>
    //       <CloseOutlined
    //         onClick={close}
    //         className="text-white cursor-pointer"
    //       />
    //     </div>
    //     <div className="chat-messages">
    //       {messages.map((msg, idx) => (
    //         <div
    //           key={idx}
    //           className={`message ${msg.role} ${msg.isError ? "error" : ""}`}
    //         >
    //           <div className="message-header">
    //             <b>{msg.role === "user" ? "Bạn" : "Gemini"}</b>
    //             <span className="message-time">
    //               {formatTime(msg.timestamp)}
    //             </span>
    //           </div>
    //           <div className="message-content">{msg.text}</div>
    //         </div>
    //       ))}
    //       {loading && (
    //         <div className="message ai">
    //           <div className="message-header">
    //             <b>Gemini</b>
    //           </div>
    //           <div className="message-content loading">Đang trả lời...</div>
    //         </div>
    //       )}
    //       <div ref={messagesEndRef} />
    //     </div>

    //     <div className="chat-input">
    //       <input
    //         type="text"
    //         value={input}
    //         onChange={(e) => setInput(e.target.value)}
    //         onKeyDown={(e) => e.key === "Enter" && sendMessage()}
    //         placeholder="Nhập nội dung..."
    //         disabled={loading}
    //       />
    //       <button onClick={sendMessage} disabled={loading || !input.trim()}>
    //         {loading ? "Đang gửi..." : "Gửi"}
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div className="chatbot">
      <div className="chat-header">
        <div className="flex gap-2 items-center">
          <img
            src="https://media-public.canva.com/r4Rpw/MAGLXGr4Rpw/1/tl.png"
            alt="avatar"
            className="avatar"
          />
          <h3 className="chat-title">Chat bot của Coza store</h3>
        </div>
        <CloseOutlined onClick={close} className="close-btn" />
      </div>

      <div className="chat-body">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`message ${msg.role} ${msg.isError ? "error" : ""}`}
          >
            <div className="message-content">{msg.text}</div>
          </div>
        ))}

        {loading && (
          <div className="message ai">
            <div className="message-header">
              <b>Coza Store</b>
            </div>
            <div className="message-content">Đang trả lời...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <input
          type="text"
          placeholder="Enter your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          disabled={loading}
        />
        <button onClick={sendMessage} disabled={loading || !input.trim()}>
          ➤
        </button>
      </div>
    </div>
  );
};

export default ChatApp;
