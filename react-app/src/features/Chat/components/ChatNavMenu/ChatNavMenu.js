import React from "react";
import { useSelector } from "react-redux";
import { ChatNavBtn } from "./ChatNavBtn";

export const ChatNavMenu = ({ setSelectedChat }) => {
  const chatThreads = useSelector((state) => state.chatThreads);

  return (
    <div>
      {Object.values(chatThreads).map((chatThread) => (
        <ChatNavBtn
          key={chatThread.id}
          chatThread={chatThread}
          setSelectedChat={setSelectedChat}
        />
      ))}
    </div>
  );
};
