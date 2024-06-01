import React from "react";

export const ChatNavBtn = ({ chatThread, setSelectedChat }) => {
  const recipient = chatThread.users[0];
  return (
    <div onClick={() => setSelectedChat(chatThread.id)}>
      {recipient.username}
    </div>
  );
};
