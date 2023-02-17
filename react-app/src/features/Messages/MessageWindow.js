import React from "react";
import MessageList from "./MessageList";
import MessageFeed from "./MessageFeed";
import "./Messages.css";
export default function MessageWindow() {
  return (
    <div className="message-window-container">
      <MessageList />
      <MessageFeed />
    </div>
  );
}
