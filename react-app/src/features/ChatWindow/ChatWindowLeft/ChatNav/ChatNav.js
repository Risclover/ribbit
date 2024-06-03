import React from "react";
import useSortedChatThreads from "features/Chat/hooks/useSortedChatThreads";
import { ChatNavBtn } from "./ChatNavBtn";
import "./ChatNav.css";

export function ChatNav({
  handleOpenChatThread,
  receiver,
  setWelcomeOverlay,
  setNewChatOverlay,
  setMessageInviteOverlay,
  lastMessage,
  socket,
}) {
  const sortedChatThreads = useSortedChatThreads();

  return (
    <div className="chat-window-chatnav-container">
      <div className="chat-window-chatnav-title">Chats</div>
      {sortedChatThreads.length > 0 &&
        sortedChatThreads.map((chatThread) => (
          <ChatNavBtn
            key={chatThread.id}
            chatThread={chatThread}
            handleOpenChatThread={handleOpenChatThread}
            receiver={receiver}
            setWelcomeOverlay={setWelcomeOverlay}
            setNewChatOverlay={setNewChatOverlay}
            setMessageInviteOverlay={setMessageInviteOverlay}
            lastMsg={lastMessage}
            socket={socket}
          />
        ))}
    </div>
  );
}
