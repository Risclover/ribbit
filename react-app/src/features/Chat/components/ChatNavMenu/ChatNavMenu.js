import React from "react";
import { ChatNavBtn } from "./ChatNavBtn";
import { useSortedChatThreads } from "../../hooks";

export function ChatNavMenu({
  selectedChat,
  setSelectedChat,
  setShowMessageInviteOverlay,
  setShowChatWelcomeOverlay,
  setShowCreateChatOverlay,
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
            setShowChatWelcomeOverlay={setShowChatWelcomeOverlay}
            setShowCreateChatOverlay={setShowCreateChatOverlay}
          />
        ))}
    </div>
  );
}
