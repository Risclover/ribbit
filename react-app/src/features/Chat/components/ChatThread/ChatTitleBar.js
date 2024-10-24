import { SelectedChatContext } from "context";
import React, { useContext, useEffect, useState } from "react";
import { TfiClose } from "react-icons/tfi";
import { useSelector } from "react-redux";

export const ChatTitleBar = ({ showCreateChatOverlay, setOpenChat }) => {
  const currentUser = useSelector((state) => state.session.user);
  const [receiver, setReceiver] = useState(null);

  const { selectedChat, pendingReceiver } = useContext(SelectedChatContext);

  useEffect(() => {
    if (pendingReceiver !== null) {
      setReceiver(pendingReceiver);
    } else if (selectedChat && selectedChat.users) {
      setReceiver(
        selectedChat.users.find((user) => user.id !== currentUser?.id).username
      );
    }
  }, [selectedChat?.users, currentUser?.id, pendingReceiver]);

  return (
    <div className="chat-thread-window-titlebar">
      {showCreateChatOverlay ? "New Chat" : receiver || ""}
      {/* <button className="chat-window-close-btn" title="Minimize chat">
        <GoChevronDown />
      </button> */}
      <div></div>
      <button
        aria-label="Close"
        title="Close chat"
        className="chat-window-close-btn"
        onClick={() => setOpenChat(false)}
      >
        <TfiClose />
      </button>
    </div>
  );
};
