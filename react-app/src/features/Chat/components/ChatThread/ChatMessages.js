import React from "react";
import { ChatMessage } from "./ChatMessage";

export const ChatMessages = ({ chat }) => {
  return (
    <div>
      {chat?.messages.map((message) => (
        <ChatMessage content={message.content} />
      ))}
    </div>
  );
};
