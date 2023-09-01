import React, { useLayoutEffect, useRef, useState } from "react";
import ChatWindowTitleBar from "./ChatWindowTitleBar";
import ChatWindowInput from "./ChatWindowInput/ChatWindowInput";
import ChatMessages from "./ChatWindowMessages/ChatMessages";

export default function ChatWindowRight({
  setOpenChat,
  selectedChat,
  setSelectedChat,
  receiver,
  messages,
  setDeleteOverlay,
  setMsgId,
  socket,
  messageInviteOverlay,
  setMessageInviteOverlay,
  newChatOverlay,
  userFound,
}) {
  const [selectedReaction, setSelectedReaction] = useState("");

  return (
    <div className="chat-window-right">
      <ChatWindowTitleBar
        setOpenChat={setOpenChat}
        selectedChat={selectedChat}
        newChatOverlay={newChatOverlay}
      />
      <ChatMessages
        receiver={receiver}
        messages={messages}
        setDeleteOverlay={setDeleteOverlay}
        setMsgId={setMsgId}
        selectedChat={selectedChat}
        selectedReaction={selectedReaction}
        setSelectedReaction={setSelectedReaction}
      />
      <ChatWindowInput
        selectedChat={selectedChat}
        receiver={receiver}
        socket={socket}
        selectedReaction={selectedReaction}
        setSelectedReaction={setSelectedReaction}
        messageInviteOverlay={messageInviteOverlay}
        setMessageInviteOverlay={setMessageInviteOverlay}
        setSelectedChat={setSelectedChat}
        userFound={userFound}
      />
    </div>
  );
}
