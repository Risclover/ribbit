import React, { useEffect, useState } from "react";
import { TfiClose } from "react-icons/tfi";
import { useSelector } from "react-redux";

export default function ChatWindowTitleBar({
  selectedChat,
  setOpenChat,
  newChatOverlay,
}) {
  const currentUser = useSelector((state) => state.session.user);
  const [receiver, setReceiver] = useState(null);

  useEffect(() => {
    if (selectedChat && selectedChat.users) {
      setReceiver(
        selectedChat.users.find((user) => user.id !== currentUser.id)
      );
    }
  }, [selectedChat?.users, currentUser.id]);

  return (
    <div className="chat-thread-window-titlebar">
      {newChatOverlay ? "New Chat" : receiver?.username || ""}
      <span
        className="chat-window-close-btn"
        onClick={() => setOpenChat(false)}
      >
        <TfiClose />
      </span>
    </div>
  );
}
