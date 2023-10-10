import React from "react";
import ChatNavBtn from "./ChatNavBtn";
import { useSelector } from "react-redux";
import "./ChatNav.css";

export default function ChatNav({
  setSelectedChat,
  selectedChat,
  handleOpenChatThread,
  receiver,
  setWelcomeOverlay,
  setNewChatOverlay,
  setMessageInviteOverlay,
  lastMessage,
  socket,
}) {
  const chatThreads = useSelector((state) => state.chatThreads);

  return (
    <div className="chat-window-chatnav-container">
      {Object.values(chatThreads).length > 0 &&
        Object.values(chatThreads)
          .sort((a, b) => {
            const aMessages = a.messages;
            const bMessages = b.messages;
            if (aMessages && bMessages) {
              const aLastMessage = aMessages[aMessages?.length - 1];
              const bLastMessage = bMessages[bMessages?.length - 1];

              if (aMessages?.length === 0 && bMessages?.length === 0) {
                return a.createdAt.localeCompare(b.createdAt);
              }

              if (aMessages?.length === 0) {
                return 1;
              }

              if (bMessages?.length === 0) {
                return -1;
              }

              return (
                new Date(bLastMessage.createdAt) -
                new Date(aLastMessage.createdAt)
              );
            }
          })
          .map((chatThread) => (
            <ChatNavBtn
              chatThread={chatThread}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
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
