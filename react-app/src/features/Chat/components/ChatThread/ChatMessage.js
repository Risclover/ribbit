import React from "react";

export const ChatMessage = ({ message }) => {
  return (
    <div>
      {message.sender.username}: {message.content}
    </div>
  );
};
