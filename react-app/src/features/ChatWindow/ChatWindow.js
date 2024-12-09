import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { getChatThread, getUserChatThreads } from "@/store";
import {
  ChatWindowLeft,
  ChatWindowRight,
  ChatWindowDeleteOverlay,
  ChatWindowWelcomeOverlay,
  ChatWindowNewChatOverlay,
  ChatWindowMessageInviteOverlay,
} from "..";
import { SelectedChatContext } from "@/context";
import "./ChatWindow.css";

let socket;

export function ChatWindow({ setOpenChat }) {
  const dispatch = useDispatch();
  const { selectedChat } = useContext(SelectedChatContext);
  const currentUser = useSelector((state) => state.session.user);
  const chatThreads = useSelector((state) => state.chatThreads);

  const [userFound, setUserFound] = useState(false);
  const [msgId, setMsgId] = useState();
  const [newChatOverlay, setNewChatOverlay] = useState(false);
  const [welcomeOverlay, setWelcomeOverlay] = useState(
    Object.keys(chatThreads)?.length === 0 || !chatThreads ? true : false
  );
  const [deleteOverlay, setDeleteOverlay] = useState(false);
  const [messageInviteOverlay, setMessageInviteOverlay] = useState(false);
  const [receiver, setReceiver] = useState(
    selectedChat
      ? selectedChat?.users?.find((user) => user.id !== currentUser?.id)
      : ""
  );
  const [lastMessage, setLastMessage] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    dispatch(getUserChatThreads());
    handleOpenChatThread(selectedChat);
  }, [selectedChat, dispatch]);

  useEffect(() => {
    socket = io();

    socket.on("chat", (chat) => {
      setMessages((messages) => [...messages, chat]);
      dispatch(getUserChatThreads());
    });

    if (selectedChat) {
      socket.emit("join", {
        user: currentUser?.id,
        room: selectedChat,
      });
    }

    return () => {
      socket.disconnect();
    };
  }, [setMessages, selectedChat, currentUser]);

  useEffect(() => {
    if (
      chatThreads[selectedChat?.id] &&
      selectedChat &&
      selectedChat?.id > -1
    ) {
      setMessages(
        chatThreads && selectedChat
          ? Object.values(chatThreads[selectedChat?.id]?.messages)
          : []
      );
    }
  }, [chatThreads, selectedChat]);

  const handleOpenChatThread = (chatThread) => {
    if (!chatThread || !chatThread.users) {
      return; // or handle the error case appropriately
    }

    setMessages([]); // Clear messages before fetching new ones
    let id = chatThread.id;

    let otherPerson = chatThread.users.filter(
      (user) => user.id !== currentUser?.id
    );

    setReceiver(otherPerson);
    dispatch(getChatThread(id));
    setOpenChat(true);
  };

  useEffect(() => {
    if (selectedChat && selectedChat?.users) {
      setReceiver(
        selectedChat?.users.find((user) => user.id !== currentUser?.id).username
      );
    }
  }, [selectedChat, currentUser?.id]);

  return (
    <div className="chat-window-container">
      <ChatWindowLeft
        handleOpenChatThread={handleOpenChatThread}
        receiver={receiver}
        setNewChatOverlay={setNewChatOverlay}
        setWelcomeOverlay={setWelcomeOverlay}
        setMessageInviteOverlay={setMessageInviteOverlay}
        lastMessage={lastMessage}
        socket={socket}
      />

      <ChatWindowRight
        setOpenChat={setOpenChat}
        receiver={receiver}
        messages={messages}
        setDeleteOverlay={setDeleteOverlay}
        setMsgId={setMsgId}
        socket={socket}
        newChatOverlay={newChatOverlay}
        messageInviteOverlay={messageInviteOverlay}
        setMessageInviteOverlay={setMessageInviteOverlay}
        userFound={userFound}
      />

      {deleteOverlay && (
        <ChatWindowDeleteOverlay
          socket={socket}
          msgId={msgId}
          setDeleteOverlay={setDeleteOverlay}
        />
      )}
      {welcomeOverlay && (
        <ChatWindowWelcomeOverlay setNewChatOverlay={setNewChatOverlay} />
      )}
      {newChatOverlay && (
        <ChatWindowNewChatOverlay
          setNewChatOverlay={setNewChatOverlay}
          setWelcomeOverlay={setWelcomeOverlay}
          setMessageInviteOverlay={setMessageInviteOverlay}
          setUserFound={setUserFound}
          userFound={userFound}
        />
      )}
      {messageInviteOverlay && <ChatWindowMessageInviteOverlay />}
    </div>
  );
}
