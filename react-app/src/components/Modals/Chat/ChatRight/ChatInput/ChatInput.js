import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createChatThread } from "@/store";

export default function ChatInput() {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");

  const handleSendChatMsg = (e) => {
    e.preventDefault();

    dispatch(createChatThread());
  };
  return (
    <div className="chat-input-container">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSendChatMsg}>Send</button>
    </div>
  );
}
