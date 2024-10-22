import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TfiClose } from "react-icons/tfi";
import { SelectedChatContext } from "@/context/SelectedChat";

export function ChatWindowTitleBar({ setOpenChat, newChatOverlay }) {
  const currentUser = useSelector((state) => state.session.user);
  const [receiver, setReceiver] = useState(null);

  const { selectedChat } = useContext(SelectedChatContext);

  useEffect(() => {
    if (selectedChat && selectedChat.users) {
      setReceiver(
        selectedChat.users.find((user) => user.id !== currentUser?.id)
      );
    }
  }, [selectedChat?.users, currentUser?.id]);

  return (
    <div className="chat-thread-window-titlebar">
      {newChatOverlay ? "New Chat" : receiver?.username || ""}
      {/* <button className="chat-window-close-btn" title="Minimize chat">
        <GoChevronDown />
      </button> */}
      <div></div>
      <button
        title="Close chat"
        className="chat-window-close-btn"
        onClick={() => setOpenChat(false)}
      >
        <TfiClose />
      </button>
    </div>
  );
}
