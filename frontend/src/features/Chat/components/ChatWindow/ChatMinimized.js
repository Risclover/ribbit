import React, { useContext } from "react";
import { SelectedChatContext } from "@/context";
import { useChatMinimized } from "../../hooks/useChatMinimized";
import { OpenChatContext } from "context/OpenChatContext";

export default function ChatMinimized({ setMinimizeChat }) {
  const { selectedChat, setSelectedChat } = useContext(SelectedChatContext);
  const { setOpenChat } = useContext(OpenChatContext);
  const { sortedThreads, handleClose } = useChatMinimized({
    setOpenChat,
    setMinimizeChat,
  });

  return (
    <div
      onClick={() => {
        if (!selectedChat && sortedThreads.length > 0) {
          setSelectedChat(sortedThreads[0]);
        }
        setMinimizeChat(false);
      }}
      className="chat-minimized-container"
    >
      Chat
      <button className="chat-minimized-btn" onClick={handleClose}>
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
