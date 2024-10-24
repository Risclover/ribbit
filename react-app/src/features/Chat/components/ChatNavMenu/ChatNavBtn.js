import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatDate } from "features/Chat/utils/formatDate";
import { useSelectedChat } from "context/SelectedChat";

export const ChatNavBtn = ({
  chatThread,
  setShowCreateChatOverlay,
  setShowMessageInviteOverlay,
}) => {
  const { selectedChat, setSelectedChat, setPendingReceiver } =
    useSelectedChat();
  const isActive = selectedChat?.id === chatThread.id;
  const currentUser = useSelector((state) => state.session.user);
  const recipient = chatThread.users.find(
    (user) => user.id !== currentUser?.id
  );

  const [time, setTime] = useState("");

  useEffect(() => {
    const lastMessage = chatThread.messages?.[chatThread.messages.length - 1];
    if (lastMessage) {
      const formattedTime = new Date(lastMessage.createdAt).toLocaleString(
        "en-US",
        {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }
      );
      setTime(formattedTime);
    }
  }, [chatThread.messages]);

  return (
    <div
      className={`chat-window-chatnav${isActive ? " chatnav-active" : ""}`}
      onClick={() => {
        setShowCreateChatOverlay(false);
        setSelectedChat(chatThread);
        setPendingReceiver(null);
        setShowMessageInviteOverlay(false);
      }}
    >
      <img src={recipient?.profileImg} alt="User" />
      <div className="chat-window-chatnav-details">
        <div className="chat-window-chatnav-details-top">
          <span className="chat-window-chatnav-username">
            {recipient.username}
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
            ? (currentUser.username ===
              chatThread.messages[chatThread.messages.length - 1]?.sender
                .username
                ? "You: "
                : chatThread.messages[chatThread.messages.length - 1]?.sender
                    .username + ": ") +
              (chatThread.messages[
                chatThread.messages.length - 1
              ]?.content?.endsWith(".png") ||
              chatThread.messages[
                chatThread.messages.length - 1
              ]?.content.includes(".giphy")
                ? "🖼️"
                : chatThread.messages[chatThread.messages.length - 1]?.content)
            : ""}
        </div>
      </div>
    </div>
  );
};
