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
      <div className="chat-window-title-btns">
        <button className="chat-window-close-btn" title="Minimize chat">
          <svg
            rpl=""
            fill="currentColor"
            height="16"
            icon-name="caret-down-outline"
            viewBox="0 0 20 20"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 13.125a.624.624 0 0 1-.442-.183l-5-5 .884-.884L10 11.616l4.558-4.558.884.884-5 5a.624.624 0 0 1-.442.183Z"></path>
          </svg>
        </button>
        <div></div>
        <button
          title="Close chat"
          className="chat-window-close-btn"
          onClick={() => setOpenChat(false)}
        >
          <TfiClose />
        </button>
      </div>
    </div>
  );
};
