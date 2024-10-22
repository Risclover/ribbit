import React from "react";
import useSortedChatThreads from "features/Chat/hooks/useSortedChatThreads";
import { ChatNavBtn } from "./ChatNavBtn";
import { useSelectedChat } from "context/SelectedChat";

export function ChatNavMenu({ setShowCreateChatOverlay, setShowMessageInviteOverlay }) {
  const sortedChatThreads = useSortedChatThreads();

  return (
    <div className="chat-window-chatnav-container">
      {sortedChatThreads.length > 0 &&
        sortedChatThreads.map((chatThread) => (
          <ChatNavBtn
            key={chatThread.id}
            chatThread={chatThread}
            setShowCreateChatOverlay={setShowCreateChatOverlay}
            setShowMessageInviteOverlay={setShowMessageInviteOverlay}
          />
        ))}
    </div>
  );
}
