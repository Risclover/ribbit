import React, { useState } from "react";
import {
  ChatWindowTitleBar,
  ChatWindowInput,
  ChatMessages,
} from "../ChatWindowRight";

export function ChatWindowRight({
  setOpenChat,
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
        newChatOverlay={newChatOverlay}
      />
      <ChatMessages
        receiver={receiver}
        messages={messages}
        setDeleteOverlay={setDeleteOverlay}
        setMsgId={setMsgId}
        selectedReaction={selectedReaction}
        setSelectedReaction={setSelectedReaction}
      />
      <ChatWindowInput
        receiver={receiver}
        socket={socket}
        selectedReaction={selectedReaction}
        setSelectedReaction={setSelectedReaction}
        messageInviteOverlay={messageInviteOverlay}
        setMessageInviteOverlay={setMessageInviteOverlay}
        userFound={userFound}
      />
    </div>
  );
}
