import React from "react";
import { useAppSelector } from "@/store";
import { formatDate } from "../../utils/formatDate";
import { useChatNavBtn } from "../../hooks/useChatNavBtn";

export const ChatNavBtn = ({
  chatThread,
  selectedChat,
  setSelectedChat,
  setActiveOverlay,
  OVERLAYS,
}) => {
  const currentUser = useAppSelector((state) => state.session.user);
  const { isActive, recipient, time } = useChatNavBtn({ chatThread });

  return (
    <div
      className={`chat-window-chatnav${isActive ? " chatnav-active" : ""}`}
      onClick={() => {
        setActiveOverlay(null);
        setSelectedChat(chatThread);
      }}
    >
      <img src={recipient?.profileImg} alt="User" />
      <div className="chat-window-chatnav-details">
        <div className="chat-window-chatnav-details-top">
          <span className="chat-window-chatnav-username">
            {recipient?.username}
          </span>
          <span className="chat-window-chatnav-date">
            {chatThread.messages?.length
              ? formatDate(
                  chatThread.messages[chatThread.messages.length - 1]?.createdAt
                ) === "Today"
                ? time
                : formatDate(
                    chatThread.messages[chatThread.messages.length - 1]
                      ?.createdAt
                  )
              : ""}
          </span>
        </div>
        <div className="chat-window-chatnav-details-bottom">
          {chatThread.messages?.length
            ? (currentUser?.username ===
              chatThread.messages[chatThread.messages.length - 1]?.sender
                ?.username
                ? "You: "
                : chatThread.messages[chatThread.messages.length - 1]?.sender
                    ?.username + ": ") +
              (chatThread.messages[
                chatThread.messages.length - 1
              ]?.content?.endsWith(".png") ||
              chatThread.messages[
                chatThread.messages.length - 1
              ]?.content?.includes(".giphy")
                ? "🖼️"
                : chatThread.messages[chatThread.messages.length - 1]?.content)
            : ""}
        </div>
      </div>
    </div>
  );
};
