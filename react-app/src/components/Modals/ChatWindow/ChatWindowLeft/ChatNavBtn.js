import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatThread, readAllMessages } from "../../../../store/chats";
import formatDate from "../ChatWindowRight/ChatWindowMessages/formatDate";

export default function ChatNavBtn({
  chatThread,
  setSelectedChat,
  selectedChat,
  handleOpenChatThread,
  setWelcomeOverlay,
  setNewChatOverlay,
  setMessageInviteOverlay,
  lastMsg,
  socket,
}) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const [receiver, setReceiver] = useState(null);
  const [sender, setSender] = useState();
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
  const [lastMessage, setLastMessage] = useState("");

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

  useEffect(() => {
    if (chatThread.users)
      setReceiver(() =>
        chatThread.users.find((user) => user.id !== currentUser.id)
      );
  }, [chatThread.users, currentUser.id]);

  useEffect(() => {
    // if (chatThread.messages && chatThread.messages.length > 0) {
    //   const lastMsg = chatThread.messages[chatThread.messages.length - 1];
    //   if (lastMsg.sender.id === currentUser.id) {
    //     setLastMessage(`You: ${lastMsg.content}`);
    //     if (lastMessage.slice(-4) === ".png") {
    //       setLastMessage("You: 🖼️");
    //     }
    //   } else {
    //     setLastMessage(`${lastMsg.sender?.username}: ${lastMsg.content}`);
    //     if (lastMessage.slice(-4) === ".png") {
    //       setLastMessage(`${lastMessage.sender?.username}: 🖼️`);
    //     }
    //   }
    // } else {
    //   setLastMessage("");
    // }

    if (chatThread.messages && chatThread.messages.length > 0) {
      const lastMsg = chatThread.messages[chatThread.messages.length - 1];
      setLastMessage(lastMsg.content);
      if (lastMsg.sender.id === currentUser.id) {
        setSender("You");
      } else {
        setSender(lastMsg.sender.username);
      }
    } else {
      setLastMessage("");
    }
  }, [chatThread.messages, currentUser.id]);

  const handleClick = (e) => {
    setWelcomeOverlay(false);
    setNewChatOverlay(false);
    setMessageInviteOverlay(false);
    setSelectedChat(chatThread);
    handleOpenChatThread(e, chatThread);
    dispatch(readAllMessages(selectedChat?.id));
    dispatch(getChatThread(selectedChat?.id));
  };

  const isActive = selectedChat && selectedChat?.id === chatThread.id;

  return (
    <div
      className={`chat-window-chatnav ${isActive ? "chatnav-active" : ""}`}
      onClick={handleClick}
    >
      <img src={receiver && receiver?.profile_img} alt="User" />
      <div className="chat-window-chatnav-details">
        <div className="chat-window-chatnav-details-top">
          <span className="chat-window-chatnav-username">
            {receiver && receiver?.username}
          </span>
          <span className="chat-window-chatnav-date">
            {chatThread.messages && chatThread.messages.length > 0
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
        <div className="chat-window-chatnav-last">
          {sender && sender !== "" ? sender + ": " : ""}
          {(lastMessage && lastMessage.slice(-4) === ".png") ||
          lastMessage.includes("giphy")
            ? "🖼️"
            : lastMessage}
        </div>
      </div>
    </div>
  );
}
