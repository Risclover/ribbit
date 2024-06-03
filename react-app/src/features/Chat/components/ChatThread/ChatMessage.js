import React from "react";

export const ChatMessage = ({ message }) => {
  console.log("message:", message);
  return (
    <div>
      {message.sender.username}: {message.content}
    </div>
  );
};
