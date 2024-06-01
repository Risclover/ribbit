import React from "react";
import { useSelector } from "react-redux";
import { ChatMessages } from "./ChatMessages";

export const ChatThread = ({ selectedChat }) => {
  const chatThreads = useSelector((state) => state.chatThreads);

  const chat = Object.values(chatThreads).find(
    (chat) => chat.id === selectedChat
  );

  console.log("chat:", chat);

  return (
    <div>
      <ChatMessages chat={chat} />
    </div>
  );
};
