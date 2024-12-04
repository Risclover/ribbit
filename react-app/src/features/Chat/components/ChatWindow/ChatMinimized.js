import { SelectedChatContext } from "context";
import React, { useContext } from "react";
import { useSelector } from "react-redux";

export default function ChatMinimized({ setMinimizeChat, setOpenChat }) {
  const { selectedChat, setSelectedChat } = useContext(SelectedChatContext);
  const chatThreads = useSelector((state) => state.chatThreads);

  const sortedThreads = Object.values(chatThreads).sort((a, b) => {
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
        new Date(bLastMessage.createdAt) - new Date(aLastMessage.createdAt)
      );
    }
  });

  return (
    <div
      onClick={() => {
        if (!selectedChat) {
          setSelectedChat(sortedThreads[0]);
        }
        setMinimizeChat(false);
      }}
      className="chat-minimized-container"
    >
      Chat
      <button className="chat-minimized-btn">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <polygon
            fill="#878a8c"
            points="11.649 9.882 18.262 3.267 16.495 1.5 9.881 8.114 3.267 1.5 1.5 3.267 8.114 9.883 1.5 16.497 3.267 18.264 9.881 11.65 16.495 18.264 18.262 16.497"
          ></polygon>
        </svg>
      </button>
    </div>
  );
}
