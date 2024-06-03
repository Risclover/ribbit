import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatMessages } from "./ChatMessages";
import { getUserChatThreads } from "store";

export const ChatThread = ({
  messages,
  setMessages,
  setSelectedChat,
  selectedChat,
}) => {
  const dispatch = useDispatch();
  const chatThreads = useSelector((state) => state.chatThreads);
  const user = useSelector((state) => state.session.user);
  const chat = Object.values(chatThreads).find(
    (chat) => chat.id === selectedChat
  );

  useEffect(() => {
    if (user) {
      dispatch(getUserChatThreads());
    }
  }, [user, dispatch]);

  // Update selected chat and messages when selectedChat or chatThreads changes
  useEffect(() => {
    const chat = Object.values(chatThreads).find(
      (chat) => chat.id === selectedChat
    );

    if (chat && chat.id !== selectedChat) {
      setSelectedChat(chat.id);
    }

    // Check if messages are different before setting them
    if (chat && JSON.stringify(chat.messages) !== JSON.stringify(messages)) {
      setMessages(chat.messages);
    }
  }, [selectedChat, chatThreads]); // Remove 'messages' from the dependencies

  return (
    <div>
      <ChatMessages messages={messages} />
    </div>
  );
};
