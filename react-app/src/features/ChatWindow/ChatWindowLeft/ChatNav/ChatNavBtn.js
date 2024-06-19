import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatThread, readAllChatMessages } from "@/store";
import "./ChatNav.css";
import { SelectedChatContext } from "@/context/SelectedChat";
import { formatDate } from "features/ChatWindow/ChatWindowRight/ChatWindowInput/ChatWindowMessages/formatDate";

export function ChatNavBtn({
  chatThread,
  handleOpenChatThread,
  setWelcomeOverlay,
  setNewChatOverlay,
  setMessageInviteOverlay,
}) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const { selectedChat, setSelectedChat } = useContext(SelectedChatContext);

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
    dispatch(readAllChatMessages(selectedChat?.id));
    dispatch(getChatThread(selectedChat?.id));
  };

  const isActive = selectedChat && selectedChat?.id === chatThread.id;

  return (
    <div
      className={`chat-window-chatnav ${isActive ? "chatnav-active" : ""}`}
      onClick={handleClick}
    >
      <img src={receiver && receiver?.profileImg} alt="User" />
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

          {/* If the last message is an image (a URL with an image extension or to the Giphy API), use the portrait emoji */}
          {(lastMessage && lastMessage.slice(-4) === ".png") ||
          lastMessage.includes(".giphy")
            ? "🖼️"
            : lastMessage}
        </div>
      </div>
    </div>
  );
}
