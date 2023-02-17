import React from "react";
import { BiMessageAdd } from "react-icons/bi";
import "./Messages.css";

export default function MessageList() {
  return (
    <div className="message-list">
      <div className="message-window-title">
        <span>Chat</span>{" "}
        <button className="add-chat-btn">
          <BiMessageAdd />
        </button>
      </div>
    </div>
  );
}
