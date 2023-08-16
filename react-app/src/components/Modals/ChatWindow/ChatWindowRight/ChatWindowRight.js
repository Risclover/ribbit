import React, { useLayoutEffect, useRef, useState } from "react";
import ChatWindowTitleBar from "./ChatWindowTitleBar";
import ChatWindowInput from "./ChatWindowInput/ChatWindowInput";
import ChatMessages from "./ChatWindowMessages/ChatMessages";

export default function ChatWindowRight({
  setOpenChat,
  selectedChat,
  receiver,
  messages,
  setDeleteOverlay,
  setMsgId,
  socket,
  newChatOverlay,
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
      />
    </div>
  );
}
