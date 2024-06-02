import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChatMessages } from "./ChatMessages";
import { getUserChatThreads } from "store";
import { getChatThread } from "store";

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
    dispatch(getUserChatThreads());
    dispatch(getChatThread(selectedChat));
  }, []);

  useEffect(() => {
    setSelectedChat(chat?.id);

    if (chat) setMessages(chat.messages);
    console.log("chat:", selectedChat);
  }, [dispatch, chat]);

  return (
    <div>
      <ChatMessages messages={messages} />
    </div>
  );
};
