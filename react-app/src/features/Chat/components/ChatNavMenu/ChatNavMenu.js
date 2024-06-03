import React from "react";
import useSortedChatThreads from "features/Chat/hooks/useSortedChatThreads";
import { ChatNavBtn } from "./ChatNavBtn";

export function ChatNavMenu({ setSelectedChat }) {
  const sortedChatThreads = useSortedChatThreads();

  console.log("sortedChatThreads:", sortedChatThreads);

  return (
    <div className="chat-window-chatnav-container">
      <div className="chat-window-chatnav-title">Chats</div>
      {sortedChatThreads.length > 0 &&
        sortedChatThreads.map((chatThread) => (
          <ChatNavBtn
            key={chatThread.id}
            chatThread={chatThread}
            setSelectedChat={setSelectedChat}
          />
        ))}
    </div>
  );
}
