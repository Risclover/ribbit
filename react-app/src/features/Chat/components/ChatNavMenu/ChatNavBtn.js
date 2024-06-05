import { formatDate } from "features/Chat/utils/formatDate";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const ChatNavBtn = ({ chatThread, selectedChat, setSelectedChat }) => {
  const isActive = selectedChat && selectedChat?.id === chatThread.id;
  const currentUser = useSelector((state) => state.session.user);
  const recipient = chatThread.users.find((user) => user.id !== currentUser.id);
  const [time, setTime] = useState(() => {
    if (chatThread.messages) {
      new Date(
        chatThread.messages[chatThread.messages?.length - 1]?.createdAt
      ).toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
    }
  });

  useEffect(() => {
    if (chatThread.messages)
      setTime(
        new Date(
          chatThread.messages[chatThread.messages?.length - 1]?.createdAt
        ).toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
      );
  }, [chatThread.messages]);

  return (
    <div
      className={`chat-window-chatnav${isActive ? " chatnav-active" : ""}`}
      onClick={() => setSelectedChat(chatThread)}
    >
      <img src={recipient && recipient?.profile_img} alt="User" />
      <div className="chat-window-chatnav-details">
        <div className="chat-window-chatnav-details-top">
          <span className="chat-window-chatnav-username">
            {recipient.username}
          </span>
          <span className="chat-window-chatnav-date">
            {chatThread.messages && chatThread.messages.length
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
      </div>
    </div>
  );
};
