import React from "react";
import ChatNav from "./ChatNav";
import { useDispatch } from "react-redux";
import { createChatThread } from "../../../../store";

export default function ChatLeft() {
  const dispatch = useDispatch();
  const handleCreateThread = (e) => {
    e.preventDefault();

    dispatch(createChatThread());
  };
  return (
    <div className="chat-left-container">
      <ChatNav />
      <div className="chat-create-chat-btn-container">
        <button className="chat-create-chat-btn" onClick={handleCreateThread}>
          + Create Chat
        </button>
      </div>
    </div>
  );
}
