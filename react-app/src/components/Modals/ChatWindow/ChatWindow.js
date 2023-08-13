import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import ChatWindowLeft from "./ChatWindowLeft/ChatWindowLeft";
import ChatWindowRight from "./ChatWindowRight/ChatWindowRight";
import "./ChatWindow.css";
import { useDispatch, useSelector } from "react-redux";
import { getChatThread, getUserChatThreads } from "../../../store/chats";
import { io } from "socket.io-client";
import ChatWindowDeleteOverlay from "./ChatWindowOverlays/ChatWindowDeleteOverlay";
import ChatWindowWelcomeOverlay from "./ChatWindowOverlays/ChatWindowWelcomeOverlay";
import ChatWindowNewChatOverlay from "./ChatWindowOverlays/ChatWindowNewChatOverlay";
let socket;

export default function ChatWindow({
  selectedChat,
  setOpenChat,
  setSelectedChat,
}) {
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.session.user);
  const chatThreads = useSelector((state) => state.chatThreads);

  const [msgId, setMsgId] = useState();
  const [newChatOverlay, setNewChatOverlay] = useState(false);
  const [welcomeOverlay, setWelcomeOverlay] = useState(
    Object.keys(chatThreads)?.length === 0 || !chatThreads ? true : false
  );
  const [deleteOverlay, setDeleteOverlay] = useState(false);

  const [receiver, setReceiver] = useState(
    selectedChat
      ? selectedChat?.users?.find((user) => user.id !== currentUser.id)
      : ""
  );
  const [lastMessage, setLastMessage] = useState();
  const [messages, setMessages] = useState(
    chatThreads &&
      selectedChat &&
      chatThreads[selectedChat.id] &&
      chatThreads[selectedChat.id].messages
      ? Object.values(chatThreads[selectedChat.id]?.messages)
      : []
  );

  useEffect(() => {
    dispatch(getUserChatThreads());
    handleOpenChatThread(selectedChat);
  }, [dispatch]);

  useEffect(() => {
    socket = io();

    socket.on("chat", (chat) => {
      setMessages((messages) => [...messages, chat]);
    });

    socket.on("new_message", (chat) => {
      setLastMessage(chat);
      console.log("last msg", lastMessage);
    });

    if (selectedChat?.id > -1) {
      socket.emit("join", {
        room: selectedChat?.id,
      });
    }
  }, [setMessages, setLastMessage, selectedChat?.id, currentUser, dispatch]);

  useEffect(() => {
    if (selectedChat && selectedChat.id > -1) {
      setMessages(
        chatThreads && selectedChat
          ? Object.values(chatThreads[selectedChat.id]?.messages)
          : []
      );
    }
  }, [chatThreads, selectedChat]);

  const handleOpenChatThread = (chatThread) => {
    if (!chatThread || !chatThread.users) {
      return; // or handle the error case appropriately
    }

    let id = chatThread.id;

    let otherPerson = chatThread.users.filter(
      (user) => user.id !== currentUser.id
    );

    setReceiver(otherPerson);
    dispatch(getChatThread(id));

    setOpenChat(true);
  };

  useEffect(() => {
    if (selectedChat && selectedChat.users) {
      setReceiver(
        selectedChat?.users.find((user) => user.id !== currentUser.id).username
      );
    }
  }, [selectedChat, currentUser.id]);

  return (
    <div className="chat-window-container">
      <ChatWindowLeft
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        handleOpenChatThread={handleOpenChatThread}
        receiver={receiver}
        setNewChatOverlay={setNewChatOverlay}
        setWelcomeOverlay={setWelcomeOverlay}
        lastMessage={lastMessage}
        socket={socket}
      />

      <ChatWindowRight
        setOpenChat={setOpenChat}
        selectedChat={selectedChat}
        receiver={receiver}
        messages={messages}
        setDeleteOverlay={setDeleteOverlay}
        setMsgId={setMsgId}
        socket={socket}
        newChatOverlay={newChatOverlay}
      />

      {deleteOverlay && (
        <ChatWindowDeleteOverlay
          socket={socket}
          msgId={msgId}
          setDeleteOverlay={setDeleteOverlay}
          selectedChat={selectedChat}
        />
      )}
      {welcomeOverlay && (
        <ChatWindowWelcomeOverlay setNewChatOverlay={setNewChatOverlay} />
      )}
      {newChatOverlay && (
        <ChatWindowNewChatOverlay
          setNewChatOverlay={setNewChatOverlay}
          setWelcomeOverlay={setWelcomeOverlay}
          setSelectedChat={setSelectedChat}
        />
      )}
    </div>
  );
}
