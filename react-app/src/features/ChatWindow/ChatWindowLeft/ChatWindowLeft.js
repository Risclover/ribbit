import React from "react";
import { ChatNav } from "../..";
import { liveChatIcons } from "../../../assets";

export function ChatWindowLeft({
  handleOpenChatThread,
  receiver,
  setNewChatOverlay,
  setWelcomeOverlay,
  setMessageInviteOverlay,
  lastMessage,
  socket,
}) {
  return (
    <div className="chat-window-left">
      <ChatNav
        receiver={receiver}
        handleOpenChatThread={handleOpenChatThread}
        setWelcomeOverlay={setWelcomeOverlay}
        setNewChatOverlay={setNewChatOverlay}
        setMessageInviteOverlay={setMessageInviteOverlay}
        lastMessage={lastMessage}
        socket={socket}
      />
      <div className="chat-window-create-chat">
        <button onClick={() => setNewChatOverlay(true)}>
          <img
            src={liveChatIcons.CreateChatIcon}
            className="create-chat-icon"
          />{" "}
          Create chat
        </button>
      </div>
    </div>
  );
}
