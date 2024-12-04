import { SelectedChatContext } from "context";
import React, { useContext, useEffect, useState } from "react";
import { TfiClose } from "react-icons/tfi";
import { useSelector } from "react-redux";

export const ChatTitleBar = ({
  showCreateChatOverlay,
  setShowChatWelcomeOverlay,
  showChatWelcomeOverlay,
  setOpenChat,
  setMinimizeChat,
}) => {
  const currentUser = useSelector((state) => state.session.user);
  const [receiver, setReceiver] = useState(null);

  const { selectedChat, setSelectedChat, pendingReceiver } =
    useContext(SelectedChatContext);

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
      {!showChatWelcomeOverlay && (
        <div className="chat-window-titlebar-left">
          {!showCreateChatOverlay && (
            <button
              className="chat-window-close-btn"
              onClick={() => {
                setSelectedChat(null);
                setShowChatWelcomeOverlay(true);
              }}
              title="Back"
            >
              <svg
                rpl=""
                fill="currentColor"
                height="16"
                icon-name="back-outline"
                viewBox="0 0 20 20"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 9.375H2.51l7.932-7.933-.884-.884-9 9a.625.625 0 0 0 0 .884l9 9 .884-.884-7.933-7.933H19v-1.25Z"></path>
              </svg>
            </button>
          )}
          {showCreateChatOverlay ? "New Chat" : receiver || ""}
        </div>
      )}
      {showChatWelcomeOverlay && <div></div>}
      <div className="chat-window-title-btns">
        <button
          className="chat-window-close-btn"
          title="Minimize chat"
          onClick={() => {
            setMinimizeChat(true);
          }}
        >
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
