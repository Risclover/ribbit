import React from "react";
import ChatNav from "./ChatNav";
import CreateChatIcon from "../../../../images/create-chat-icon.png";

export default function ChatWindowLeft({
  setSelectedChat,
  selectedChat,
  handleOpenChatThread,
  receiver,
  setNewChatOverlay,
  setWelcomeOverlay,
  lastMessage,
  socket,
}) {
  return (
    <div className="chat-window-left">
      <ChatNav
        setSelectedChat={setSelectedChat}
        selectedChat={selectedChat}
        receiver={receiver}
        handleOpenChatThread={handleOpenChatThread}
        setWelcomeOverlay={setWelcomeOverlay}
        setNewChatOverlay={setNewChatOverlay}
        lastMessage={lastMessage}
        socket={socket}
      />
      <div className="chat-window-create-chat">
        <button onClick={() => setNewChatOverlay(true)}>
          <img src={CreateChatIcon} className="create-chat-icon" /> Create chat
        </button>
      </div>
    </div>
  );
}
