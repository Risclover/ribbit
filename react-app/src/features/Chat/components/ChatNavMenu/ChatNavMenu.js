import React from "react";
import useSortedChatThreads from "features/Chat/hooks/useSortedChatThreads";
import { ChatNavBtn } from "./ChatNavBtn";

export function ChatNavMenu({
  selectedChat,
  setSelectedChat,
  setShowMessageInviteOverlay,
}) {
  const sortedChatThreads = useSortedChatThreads();

  return (
    <div className="chat-window-chatnav-container">
      {sortedChatThreads.length > 0 &&
        sortedChatThreads.map((chatThread) => (
          <ChatNavBtn
            key={chatThread.id}
            chatThread={chatThread}
            setSelectedChat={setSelectedChat}
            selectedChat={selectedChat}
            setShowMessageInviteOverlay={setShowMessageInviteOverlay}
          />
        ))}
    </div>
  );
}
