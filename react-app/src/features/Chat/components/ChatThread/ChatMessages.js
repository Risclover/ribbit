import React from "react";
import { ChatMessage } from "./ChatMessage";

export const ChatMessages = ({ messages }) => {
  return (
    <div>
      {messages?.map((message) => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  );
};
